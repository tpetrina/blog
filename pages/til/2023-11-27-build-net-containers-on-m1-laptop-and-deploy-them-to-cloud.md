---
title: "Build .NET containers on M1 laptop and deploy them to cloud"
publishedAt: "2023-11-27"
summary: "The correct way to containerize .NET apps on M1 laptop, but still be able to deploy them to x86_64 cluster"
---

After failing to deploy a Docker container built on M1 laptop, I finally found
about the official example [dotnet-docker](https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md).

```dockerfile
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG TARGETARCH
WORKDIR /source

COPY app.csproj app.csproj
RUN dotnet restore -a $TARGETARCH

COPY . .
RUN dotnet publish -a $TARGETARCH --no-restore -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT [ "dotnet", "app.dll" ]
```

To build it, run `docker build --pull -t app --platform linux/amd64 .`. This can
be pushed to regular registry (I use DigitalOcean) and will work inside `amd64`
clusters.

A cool command found in that repo is:

`docker inspect APP-TAG -f "{{.Os}}\{{.Architecture}}"`

That will print out the architecture of the container you've built.

