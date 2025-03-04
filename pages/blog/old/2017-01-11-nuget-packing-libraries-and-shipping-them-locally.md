---
title: NuGet packing libraries and shipping them locally
publishedAt: "2017-01-11"
---

Using NuGet packages is a lot of fun and we should definitively [Nugetize](https://github.com/NuGet/Home/wiki/NuGetizer-3000) all the things! But managing NuGet packages and publishing them is not so trivial. What if you just want to reuse your library in many projects but have the ability to mail that assembly?

The solution is to simply package your libraries and then ship the resulting `nupkg` files *along* your new code. So we have two questions we need to answer: how to pack up the library and how to reference `nupkg` which is in your local folder.

> One might ask why go through these steps if you can simply reference the dll and distribute the assembly directly.

>While in simple cases that is sufficient, if the library references other NuGet packages your consumer project might not be aware of those! Using NuGet allows you to distribute assemblies along with *their* dependencies.

> Also, I am a big fan of just using MyGet or NuGet or even setting up a private feed, but sometimes you just don't want to bother with the correct metadata, updating, versioning, etc. The process described here should be used in those corner cases where setting up proper pipeline takes way too much resources for little gain.

### Step 1: creating NuGet package from your library

First, install NuGet command line tool and ensure it is the latest version (3.5). Once you are done with that, open command line and navigate to the source code for your library.

Once there, simply type

```
nuget pack YourLibrary.csproj -IncludeReferencedProjects -Prop Configuration=Release
```

And voila, you got your project packed up. Don't worry about metadata, you won't publish this on NuGet anyway.

Now take the generated `YourLibrary.1.0.0.nupkg` and copy it. We'll paste it in the second step.

### Step 2: referencing local NuGet package

Paste the copied library *into* a folder near the package consumer. For example, if you have a git repo called `MyCoolApp`, create a folder inside and name it `NuGet` and paste it there.

While still in your command line, navigate to the `.sln` file for your consumer project. Create a file named `NuGet.config` with the following content:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="LocalNuget" value=".\NuGet" />
  </packageSources>
</configuration>
```

It is important that the value above has to be a relative path from the folder containing both the `.sln` and `NuGet.config` file to the folder created and which contains your `nupkg` file(s).

### Step 4: profit!

Now open your solution file and you can actually install NuGet package from your local folder.

If you add both the NuGet packages and the configured `NuGet.config` file to the source control, whenever you pull down the source code, everything will work.