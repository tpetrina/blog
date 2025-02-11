---
title: When you hit NuGet edge case with strange version
tags:
  - dotnet
publishedAt: 2025-02-11
---
.NET Restore step started failing with the following error:
```
/usr/share/dotnet/sdk/8.0.405/NuGet.targets(174,5): error : '1.0.0-0125124' is not a valid version string. (Parameter 'value') [
```

This was quite unexpected as previous build worked like a charm. Searching the entire codebase could not reveal the source of the issue. What is this mystical version `1.0.0-0125124`? Where is it coming from?

After debugging and browsing and getting frustrated, I stumbled upon the issue:
Running `git rev-parse --short HEAD` gave `0125124` which was a number. It is usually a combination of letters and digits, but this time it "appeared" as a number which NuGet doesn't like!

The SHA7 was used to version the API. What a coincidence!