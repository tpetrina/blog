---
title: Deconstructing arrays in C#7
publishedAt: "2017-09-17"
---

C#7 introduces new feature - [object deconstruction](https://docs.microsoft.com/en-us/dotnet/csharp/deconstruct). Tuples have built-in support for deconstruction, but for user defined types a deconstructor must be defined.

Which means that out of the box array deconstruction is not possible. Luckily for us, it is quite easy to add using extension methods. A user named `ufcpp` suggested the following [code](https://github.com/dotnet/csharplang/issues/874#issuecomment-327696774):

```csharp
public static class Extensions
{
    public static void Deconstruct<T>(this T[] arr, out T first, out Span<T> rest)
    {
        first = arr.Length > 0 ? arr[0] : default(T);
        rest = new Span<T>(arr).Slice(1);
    }
}
```

> Note: to use `Span<T>` add a prerelease package `System.Memory`.

This allows us to write the following code:

```csharp
var (first, _) = new[] { 0, 1, 2, 3, 4 };
// first is now 0
```

To extract more than one element a new extension method can be added that has the signature `public static void Deconstruct<T>(this T[] arr, out T first, out T second, out Span<T> rest)`. It is obvious that to extract first N parameters we need a method that handles N parameters.

But, if we enable deconstruction of `Span<T>` with the following code:

```csharp
public static void Deconstruct<T>(this Span<T> span, out T first, out Span<T> rest)
{
    first = span.Length > 0 ? span[0] : default(T);
    rest = span.Slice(1);
}
```

It is now possible to write LISPy code:

```csharp
var (first, (second, _)) = new[] { 0, 1, 2, 3, 4 };
var (x, (y, (z, _))) = new[] { 0, 1, 2, 3, 4 };
```

But if too many parenthesis give you headache, consider writing overloads for desired number of parameters to extract.