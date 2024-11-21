---
title: Error running script with Roslyn
tags:
  - efcore
---
When using package `Microsoft.EntityFramework.Sqlite` in `CSharpScript`, the following error may ocurr.

```Unhandled exception. System.TypeInitializationException: The type initializer for 'Microsoft.EntityFrameworkCore.Sqlite.Storage.Internal.SqliteTypeMappingSource' threw an exception.
 ---> System.TypeLoadException: Method 'ToJsonTyped' in type 'Microsoft.EntityFrameworkCore.Sqlite.Storage.Json.Internal.SqliteJsonByteArrayReaderWriter' from assembly 'Microsoft.EntityFrameworkCore.Sqlite, Version=9.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60' does not have an implementation.
```

The issue is the following:
- The target library is `Microsoft.EntityFrameworkCore.Sqlite` `9.0.0`
- The program is compiled with .NET 8 (`net8.0`)
- The invalid version of `System.Text.Json` is picked up

The solution is to switch .NET version to .NET 9 (`net9.0`) for now.