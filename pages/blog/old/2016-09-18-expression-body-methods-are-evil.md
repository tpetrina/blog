---
title: Expression body methods are evil
publishedAt: "2016-09-18"
---

Creating a new controller with default action in ASP.NET can be easy. Let's take a look at some hastily written code:

```csharp
public class FailController : Controller
{
  public void Index() => View();
}
```

Opening `localhost:5000/fail` yields blank page. Huh? Let's try `localhost:5000/fail/index`.

Still nothing...

Before madness strikes in notice that the action doesn't return anything. Let's fix that:

```csharp
public class FailController : Controller
{
  public ActionResult Index() => View();
}
```

Now everything works and we can resume coding.
