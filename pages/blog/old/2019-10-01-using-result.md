---
title: 'Pros and cons of using Result<T> (ASP.NET Core)'
publishedAt: "2019-10-01"
tags: ['C#', 'functional programming']
ast: false
---

Communicating errors from the domain layer to the application layer can be done using error codes or by throwing exceptions. In typical SaaS products we don't want to pay the cost of throwing exceptions for the errors that occur, but weren't truly exceptional - things like validation or general business logic errors.

On the other hand error codes are typically returned from the function which leaves little space for the _real_ return value of our functions. Since using `out` or `ref` is out of the question (in `async` functions especially) using a construct such as `Result<T>` (also known as a `Either<Error, TResult>` monad) can be used. So let's look at some code:

```csharp
// Good starting point.
public sealed class Result<T>
{
    public T Value { get; }
    public bool IsError { get; private set; }

    public Result(T value)
    {
        Value = value;
    }

    // singleton error
    public static Result<T> Error = new Result<T>(default)
    {
        IsError = true
    };
}
```

## Refactoring

Now it is time to refactor our code. Methods that return `T` should switch to returning `Result<T>`.

> For void methods either a `Unit` type might suffice or forcing `void` methods to return `bool`. Third alternative is to introduce a non-generic `Result` type.

Let's take a look at simple forecast service:

```csharp
public interface IWeatherForecastService
{
    Result<IEnumerable<WeatherForecast>> GetForecast(string city);
}
```

An implementation could look like:

```csharp
public Result<IEnumerable<WeatherForecast>> GetForecast(string city)
{
    return Result.From<IEnumerable<WeatherForecast>>(
        _api
            .Get(city)
            .Select(f => new WeatherForecast
            {
                // ... mapping
            })
            .ToArray()
    );
}
```

That cast...is impractical, but unfortunately unavoidable. The `From` method cannot infer from `T[]` that we want `IEnumerable<T>`. And certainly we don't want to always use either the constructor or the static method to create our result. Simple solution is to use _implicit operators_ which will be defined on the `Result<T>` class:

```csharp
public static implicit operator Result<T>(T value)
    => new Result<T>(value);
```

And now the above code is simplified to:

```csharp
public Result<IEnumerable<WeatherForecast>> GetForecast(string city)
{
    if (string.IsNullOrEmpty(city))
    {
        return Result<IEnumerable<WeatherForecast>>.Error;
    }

    // clean mapping from T to Result<T>
    return _api
            .Get(city)
            .Select(f => new WeatherForecast
            {
                // ... mapping
            })
            .ToArray();
}
```

## Errors

In the first example a generic singleton error is introduced and used in the above example, but handling it is slightly verbose and cannot be customized. Since errors come in many shapes and forms, we can always abstract them as generic type hierarchy:

```csharp
public class DomainError {}
```

Which can be used as a base class for our true errors:

```csharp
public class ValidationError : DomainError
{
    public string Error { get; }

    public ValidationError(string error) => Error = error;
}
```

Let's enhance our `Result<T>` and add validation to the above example:

```csharp
public sealed class Result<T>
{
    public DomainError DomainError { get; private set; }

    public Result(DomainError domainError)
    {
        DomainError = domainError;
        IsError = true;
    }

    // implicit conversion for errors
    public static implicit operator Result<T>(DomainError domainError)
        => new Result<T>(domainError);
}

public Result<IEnumerable<WeatherForecast>> GetForecast(string city)
{
    if (string.IsNullOrEmpty(city))
    {
        // from DomainError to Result<T>
        return new ValidationError("City must not be empty");
    }

    // ...
}
```

## Handling `Result<T>` in the controller

Now it is time to handle both the success and the result in our controller layer. Domain errors are internal errors represented by our domain layer. On the other hand, when serving application over HTTP layer in a typical RESTful fashion, HTTP error codes should be used instead.

Validation errors should yield status code 400 (bad request) and all other generic errors should yield status code 500 (internal server error).

```csharp
[HttpGet]
public ActionResult<IEnumerable<WeatherForecast>> Get(string city)
{
    var result = weatherForecastService.GetForecast(city);

    if (result.IsError)
    {
        switch (result.DomainError)
        {
            case ValidationError ve:
                return BadRequest(ve.Error);
            default:
                return StatusCode(500);
        }
    }

    return Ok(result);
}
```

The above method is generic and can be put into a `BaseController` to handle all services returning `Result<T>`:

```csharp
[HttpGet]
public ActionResult<IEnumerable<WeatherForecast>> Get(string city)
    => Handle(weatherForecastService.GetForecast(city));

public ActionResult<T> Handle<T>(Result<T> result)
{
    if (result.IsError)
    {
        switch (result.DomainError)
        {
            case ValidationError ve:
                return BadRequest(ve.Error);
            default:
                return StatusCode(500);
        }
    }

    return Ok(result);
}
```

## Contagious results...

In a more complicated example a function returning `Result<T>` might call another function that returns `Result<U>`. Errors should be propagated to the caller and all parts of the chain must check for errors - similar to how `async/await` changes the entire caller tree.

Doing the check and aborting might seem a bit verbose:

```csharp
public Result<T> Foo()
{
    var result = _bar.Get();
    if (result.Error is object) return result.Error;

    // continue using result.Value below...
}
```

Can we simplify extracting both the value and a potential error somehow? We could use the deconstruction feature introduced in C# 7. Let's add a `Deconstruct` method to simplify testing and decomposition of `Result<T>` class.

```csharp
public void Deconstruct(out T value, out DomainError error)
{
    value = Value;
    error = DomainError;
}
```

Now we can simplify the above code:

```csharp
public Result<T> Foo()
{
    var (value, error) = _bar.Get();
    if (error is object) return error;

    // continue using result.Value below...
}

```

## Bonus: C# 8 pattern matching

Let's see how far we can go by using pattern matching:

```csharp
// try to find maximum temperature for all days

return weatherForecastService.GetForecast(city) switch
{
    var (r, e) when e is null => r.Max(temp => temp.MaxTemp),
    var (_, e) => e, // error case
};

// alternative form where errors are handled first
return weatherForecastService.GetForecast(city) switch
{
    var (_, e) when e is object => e,
    var (r, _) => r.Max(temp => temp.MaxTemp),
}
```

## Functional constructs

Instead of pattern matching a fluent API could be used:

```csharp
return _foo.Do()
    // only invoked when there are no errors
    .Map(f => /* */);

public static Result<TR> Map<T, TR>(
    this Result<T> result,
    Func<T, TR> foo)
{
    if (result.IsError)
        return result.DomainError;

    return foo(result.Value);
}

public static Result<TR> Map<T, TR>(
    this Result<T> result,
    Func<T, Result<TR>> foo)
{
    if (result.IsError)
        return result.DomainError;

    return foo(result.Value);
}
```

Check out [language-ext](https://github.com/louthy/language-ext) to see more functional stuff implemented in C#.

## Potential issues

Switching to more functional, pipeline like form of error handling has its benefits, but what are potential downfalls?

The most obvious one is ignoring errors mid-execution and instead of aborting (propagating error to the caller) the code simply proceeds execution. This swallows the error end might be a source of bugs.

Second problem is the verbosity in handling the errors on the inside. While having a global error handler is nice for an entire layer, combining `Result<>` with `Task<>` and `IEnumerable<>` adds quite a few characters to the screen.

The last problem is the lack of informative errors in the signature. While F# can easily display all possible errors along the expected result, in C# we resort to class hierarchy and error inheritance. If anything, we should always strive for more functional approach due to various benefits in program composeability.

Happy coding!
