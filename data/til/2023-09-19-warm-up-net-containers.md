---
title: "Warm up .NET containers"
publishedAt: "2023-09-19"
tags: ["csharp", "k8s"]
summary: "Use readiness probe to warm up container before using it"
---

One of the apps I deployed to Kubernetes used Roslyn in its hot path. The first
request would always be slow and I wanted to "warm it up" by calling it at least
once. This also could serve as a nice way to trigger alerts if things start
failing.

The first implementation followed this article from Mark Vincze [Running ASP.NET Core in auto-scaling containers? Warm up!](https://blog.markvincze.com/running-asp-net-core-in-auto-scaling-containers-warm-up/), but I had issues with the following code:

```csharp
private string GetFullUrl(string relativeUrl) =>
    $"{Request.Scheme}://{Request.Host}{relativeUrl}";
```

Unfortunately, when running in the cluster, the host was wrong and it throw
errors. I needed a way for the `/ready` endpoint to correctly call itself.

After scouring the web, I ended up with the following code:

```csharp
public ReadyController(IServer server)
{
    this.server = server;
}

private string GetFullUrl(string relativeUrl)
{
    var addressFeature = server.Features.Get<IServerAddressesFeature>();
    var address = addressFeature
        ?.Addresses?.FirstOrDefault()
        ?.Replace("[::]", "localhost");

    if (address is null)
    {
        return $"{Request.Scheme}://{Request.Host}{relativeUrl}";
    }

    return $"{address}{relativeUrl}";
}
```

This worked like a charm. The replacement is because the address I got when
running in the cluster was `http://[::]:8080`. Luckily, this worked for me, but
it might not be bulletproof solution for your situation.

Alternatively, I could have just called the business logic directly which would
initialize the same code path that the controller was using - but I insisted on
warming up via HTTP calls.

Let me know in the comments below if there is a better way or if this has
different limitations.
