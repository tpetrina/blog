---
title: "Makefile and env vars"
publishedAt: "2022-07-13"
tags: makefile
summary: Inject env vars into specific targets
---

I love Makefiles - they allow me to create a local alias for a oft run terminal
command.

Recently, I needed to specify an environment variable for one target only and I
wanted to avoid passing it through `-e` parameter. Here is an example:

```makefile
inmemory: build ## Runs all tests against inmemory db
	dotnet test --no-build

sql: ## Runs all tests against SQL server provided through SqlServerConnectionString env var
	dotnet test --no-build
```

Since the command being run is the same, the `sql` target needed additional env
var set. Adding `export SqlServerConnectionString=...` as the first line under
the `sql` target doesn't help - each line is executed separately.

## Solution

The solution was extremely simple, here is a full example:

```makefile
inmemory: build ## Runs all tests against inmemory db
	dotnet test --no-build

sql: export SqlServerConnectionString := Server=.;Database=;User=;Password=;
sql: ## Runs all tests against SQL server provided through SqlServerConnectionString env var
	dotnet test --no-build
```

Same target can be specified multiple times - either to specify targets to be
ran before. Or, in this case, exporting an env var to be used in all lines of
the target.
