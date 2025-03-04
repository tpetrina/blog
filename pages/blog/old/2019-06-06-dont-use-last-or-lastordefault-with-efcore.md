---
title: "Don't use Last or LastOrDefault with EF Core"
publishedAt: "2019-06-06"
tags: ["EF Core"]
ast: false
---

Entity Framework naturally uses LINQ extensions, but not all of them are translated to SQL. Some of them are executed on the client and there is no way of knowing before you start running the code.

For example, the statement `var last = db.Products.LastOrDefault()` will fetch all products and pick the last one from the memory.

The fix is easy: order descending and then pick the first one. SQL can translate that to `SELECT TOP 1` efficiently, but there is no equivalent for the last element.

The moral of the story is - don't use LINQ naively.