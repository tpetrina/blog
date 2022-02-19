---
title: 'A minimal ASP.NET Core application'
publishedAt: "2020-12-02"
tags: ['C#', 'ASP.NET Core']
ast: false
---

With the most recent C# 9 feature top-level statement, a simple ASP.NET Core server can be written in just one file:

```cs
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

Host.CreateDefaultBuilder()
    .ConfigureWebHostDefaults(webBuilder =>
    {
        webBuilder.Configure(app =>
        {
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsJsonAsync(new {
                        Message = "Hello world!"
                    });
                });
            });
        });
    })
    .Build()
    .Run();
```

Of course, a `csproj` file is still needed:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
  </PropertyGroup>

</Project>
```

Running the app with `dotnet run` and opening `http://localhost:5000` yields:

```
{"message":"Hello world!"}
```

Fun!
