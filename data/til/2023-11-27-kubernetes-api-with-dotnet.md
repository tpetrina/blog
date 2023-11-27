---
title: "Kubernetes API with .NET"
summary: "Do stuff in your clusters directly from your app"
publishedAt: "2023-11-27"
tags: ["dotnet", "kubernetes"]
---

A straightforward and simple library named [KubernetesClient](https://github.com/kubernetes-client/csharp) allows .NET applications to manipulate Kubernetes cluster.

First step: obtain the config. This can be done either with:

```csharp
// Local development
var config = KubernetesClientConfiguration.BuildConfigFromConfigFile();

// Or after deployed in a cluster
var config = KubernetesClientConfiguration.InClusterConfig();
```

Then, create a new client instance:

```csharp
var client = new Kubernetes(config);
```

Finally, let's list available namespaces:

```csharp
var namespaces = client.CoreV1.ListNamespace();
foreach (var namespace in namespaces)
{
    Console.WriteLine(namespace.Name());
}
```
