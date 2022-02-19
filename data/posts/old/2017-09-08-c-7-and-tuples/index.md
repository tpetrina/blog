---
title: C#7 and tuples
publishedAt: "2017-09-08"
---

C# 7 is fun! Tuples are awesome and allow one to quickly swap variables:

```csharp
(x, y) = (y, x);
```

Not only that, let's say you have the following class:

```csharp
public class Vector2
{
    public int X { get; }
    public int Y { get; }

    public Vector2(int x, int y)
    {
        X = x;
        Y = y;
    }
}
```

The constructor can be simplified to the following:

```csharp
public Vector2(int x, int y) => (X, Y) = (x, y);
```

One can even play with fluent validation:

```csharp
public struct Message
{
    public string Text { get; }
    public string Sender { get; }

    public Message(string text, string sender)
        => (Text, Sender) = (text.EnsureNotNull(), sender ?? string.Empty);
}

public static class Extensions
{
    public static T EnsureNotNull<T>(this T o) where T : class
        => o is null
        ? throw new ArgumentNullException()
        : o;
}
```

Notice the use of new [throw expressions](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7#throw-expressions) feature.
