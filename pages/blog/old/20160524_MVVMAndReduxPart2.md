---
title: Implementing Redux in C# (Part 1)
publishedAt: "2016-05-24"
tags: ["xamarin.forms", "redux", "mvvm"]
slug: "mvvm-data-redux-2"
---

This is the first part in the series about porting Redux to C# and using it to build MVVM based apps. In the [last](/blog/mvvm-data-redux) post we introduced the concept of stores as a replacement for our repositories and in this post we will see how to create such stores.

So without further ado, let's write our simplest store ever!

```csharp
public class Store<T>
{
  public T State { get; private set; }

  public Store (T initialState)
  {
    State = initialState;
  }
}
```

Stores cannot be simpler than that! You can think about store as a simple container for some data. But this store is _too_ simple, you cannot change data inside it! If one wants to be able to change data inside this container, we need either a public setter or a method that will use the private setter. Using public setter might do the trick, but we want to control how changes are made. When application grows in complexity, the number of public methods grow drastically. Adding validation, logging, caching becomes clumsy.

Instead of adding public methods that mutate the underlying data, functional concepts come to the rescue! What happens if we extract a mutating method into a pure function? Instead of writing:

```csharp
public void Change()
{
  // apply changes to this.State
}
```

We can rewrite it as a pure function:

```csharp
// TState since it is a generic method
public static TState Change(TState previousState)
{
  var newState = /* apply changes to previousState */;
  return newState;
}
```

So far so good. So what happens when we have multiple methods mutating the same data? Can we add additional parameters to those functions? To combine multiple methods changing same data we have to introduce a new concept - _reducer_.

## Reducer

Reducer is a pure function that takes previous state and an action describing what needs to change and returns a new state. Here is an example:

```csharp
public static TState Reduce(TState previousState, object action)
{
  if (action == "change") return /* let's change something */;
  return previousState;
}
```

Action can be anything here: instead of using `System.Object` you might use an interface, a base class or anything else that describes your action. It can be a simple value or a complex object containing everything needed to identify action and any extra parameters.

Let's enhance our stores with reducers:

```csharp
using ActionType = System.Object;
public delegate T Reducer<T> (T state, ActionType action);

public class Store<T>
{
  Reducer<T> reducer;
  public T State { get; private set; }

  public Store (Reducer<T> reducer, T initialState)
  {
    this.reducer = reducer;
    State = initialState;
  }
}
```

Now that our stores know how to change, they need to understand requests. We will add a method for that and we will name it `Dispatch`:

```csharp
public void Dispatch (ActionType action)
{
  State = reducer (State, action);
}
```

Whenever an action is dispatched, store updates its internal state in a very predictable fashion. The reducer should be quite easy to write and test. Since `ActionType` is aliased, it is really easy to replace the default action type to something else like `IAction` interface or even a base class for all actions.

## Notifications for listeners

Store will have multiple consumers and they might want to know when the store changes. MVVM applications traditionally use some sort of pub/sub service like MVVMLight's `IMessenger`. Anything can be used here, but for this example we will use simple event. Final code looks something like this:

```csharp
using ActionType = System.Object;

public delegate T Reducer<T> (T state, ActionType action);

public class Store<T>
{
  Reducer<T> reducer;

  public T State { get; private set; }

  public delegate void SubscribeDelegate (T state);
  public event SubscribeDelegate Subscribe;

  public Store (Reducer<T> reducer, T initialState)
  {
    this.reducer = reducer;
    State = initialState;
  }

  public ActionType Dispatch (ActionType action)
  {
    State = reducer (State, action);
    Subscribe?.Invoke (State);

    return action;
  }
}
```

## Small example

Let's write a small example using the store defined above:

```csharp
var store = new Store<int> ((state, action) => state, 10);
Console.WriteLine ($"Initial state = {store.State}");

store.Subscribe += number => Console.WriteLine ($"State changed to {number}");
store.Dispatch (null);
```

The output is:

```
Initial state = 10
State changed to 10
```

Let's add more logic to the reducer and implement basic counter:

```csharp
var store = new Store<int> ((state, action) =>
      {
	if (action is int)
          return (int)action;
	if (action is string && (string)action == "+")
          return state + 1;
	if (action is string && (string)action == "-")
          return state - 1;

	return state;
      }, 10);
Console.WriteLine ($"Initial state = {store.State}");

store.Subscribe += number => Console.WriteLine ($"State changed to {number}");
store.Dispatch ("+");
store.Dispatch ("-");
store.Dispatch (8);
store.Dispatch ("-");
store.Dispatch ("-");
```

Once run, program outputs:

```
Initial state = 10
State changed to 11
State changed to 10
State changed to 8
State changed to 7
State changed to 6
```

## Other ways to write reducers

Writing stores in this manner is rather simple. If reducer becomes too large, each case can be extracted into separate methods. [Reducto](https://github.com/pshomov/reducto) implements reducers using a simple state machine switching over action type. Each action is defined as a separate type without a base class. This concept can easily be applied in this case since reducer always has to return a new state over existing one.

In the next post we will consider how we can implement asynchronous methods.

Happy coding!
