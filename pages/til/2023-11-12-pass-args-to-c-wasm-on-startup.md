---
title: "Pass args to C# WASM on startup"
summary: "Blazor doesn't support passing args, but there is a workaround"
publishedAt: "2023-11-12"
tags: ["dotnet", "wasm", "blazor"]
---

I needed to get the host URL from WASM/Blazor class library - the simplest option seemed to pass the args on startup. However, that is not supported.

Blazor class library comes with the following initialization method:

```csharp
private static async Task Main(string[] args)
```

And in js we initialize Blazor with the following (` autostart`` is set to  `false`):

```js
await Blazor.start("args", "are", "ignored");
```

While it would be awesome to just pass args directly, it is not possible. Luckily, a workaround is available with Blazor calling a special init function that we can expose. More info at [GitHub issue](https://github.com/dotnet/aspnetcore/issues/24461#issuecomment-667068936).

Final code is:

```html
<script>
  window.startupParams = function () {
    return [window.location.toString()];
  };
</script>
<script src="_framework/blazor.webassembly.js" autostart="false"></script>
```

Finally, C# code is adjusted to read it in a very crude way:

```csharp
var startupParams = js.Invoke<string[]>("startupParams");

var hostUrl = new Uri(startupParams?.Length > 0
    ? startupParams[0]
    : "http://localhost:3000");
```
