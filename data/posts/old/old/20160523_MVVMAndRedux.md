---
title: MVVM, data stores and Redux
publishedAt: "2016-05-23"
tags: ["xamarin.forms", "redux", "mvvm"]
slug: "mvvm-data-redux"
---

MVVM (Model-View-ViewModel) is the default pattern for most XAML based apps. It forces separating all code used for one screen into separate parts. View is the UI part (XAML or coded) while the model is usually raw data retrieved from database, web service or constructed on the fly. Model is usually too raw to display in the UI and shouldn't contain any business logic. It is also supposed to be a simple POCO (Plain Old C# Object) class, although some logic can be added to it.

Functionality such as validation and data aggregation/formatting is placed in a corresponding one or more `ViewModels` which are then bound to XAML views. Binding is a fundamental feature found in XAML based UI-s used for connecting UI with data on the backing `ViewModel` and to connect simple UI interaction to corresponding commands in the view model (e.g. clicking a button).

This three-layer architecture describes most applications pretty well and when used with binding, simplifies development. Models usually come from server and simply deserialized from JSON. They are then processed into bindable `ViewModels` which fit naturally into XAML. However, MVVM as a pattern doesn't provide any guidance on how data should be stored or fetched. For example, one might only use in memory data and fetch it on the fly, or it could also be stored in flat files, SQL or some other kind of database, or even a key-value store such as [Akavache](https://github.com/akavache/Akavache).

## Simple data fetching

Data stores typically use some sort of a [repository pattern](https://msdn.microsoft.com/en-us/library/ff649690.aspx) while data fetching is done via services. View models can access both by either using DI ([dependency injection](https://en.wikipedia.org/wiki/Dependency_injection)) or IoC container ([Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control)).

For example, one might fetch data using web service injected via DI using the following fragment:

```csharp
public class UserViewModel : ViewModelBase
{
  private UserModel user;
  public UserModel User
  {
    get { return user; }
    set { Set (ref user, value); }
  }

  public UserViewModel (IDataService dataService)
  {
    this.dataService = dataService;
  }

  public Task LoadAsync ()
  {
    User = await dataService.GetUserDataAsync ();
  }
}
```

Although this code is very common in most MVVM codebases, most of the time data is reused across different pages and different view models. This brings us to the following problems:

- Who owns the most recent version of data?
- Who owns the logic for fetching data?
- Where to place caching and error handling?
- How can we notify subjects when data changes?

It is obvious that we have to extract fetching into services and storage into repositories. But then again, it is hard to do this uniformly and boilerplate can get in the way. Since multiple view models might access the same data, fetching needs to be synchronized to prevent redundancy and since data is now taken out of the view model, messaging is used to signal changes for all interested subjects.

## Uniform data lookup

Let's extract data into a repository which will satisfy the following rules:

- It will contain the most recent version.
- It will notify interested subjects when the data changes

We might start with a simple class like this:

```csharp
public class UserStore
{
  public UserModel User { get; set; }
}
```

This rather naive approach shows that it is hard to restrict changes to models and its properties which means it is hard to either notify subscribers or to serialize changes once they are made.

We should hide setters and provide our own set of functions that can modify data. Our store is now changed to this:

```csharp
public class UserStore
{
  public UserModel User { get; private set; }

  public void Login(UserModel user)
  {
    User = user;
    Notify();
    SaveChangesAsync();
  }

  public void Logout()
  {
    User = null;
    Notify();
    SaveChangesAsync();
  }
}
```

This is much simpler now, easier to test (depending on the omitted implementation for notification and changes). However, although data is now in a single store accessible to all view models, we still need to connect it to our services which usually contain asynchronous flow for fetching data via web services.

Can we do better?

## Why Redux?

Before even showing how we will refactor the above code in the vein of [Redux](https://github.com/reactjs/redux), let's analyze what we have here and what we want. First of all, we want a simpler way of declaring stores containing a set of entities. Those stores might include things like logging, backing up to a flat file or database, validation and notifications. Sometimes stores can be really simple and serve merely as an in-memory cache without all these extras.

So how can we simplify declaration of such stores and how can we quickly add functionality to such stores without lots of base classes? One possible answer is using Redux which is described as _predictable_ store container and is quite simplistic in its nature. It is also built upon principles which make extensibility a piece of cake.

Since Redux is a javascript library, we need to port it to C#. Although there are couple of ports already for C# ([Redux.NET](https://github.com/GuillaumeSalles/redux.NET) and [Reducto](https://github.com/pshomov/reducto)), and it is a really simple library we will build it from scratch. This will give us an additional insight into why each part is important and how we can use it to build modern applications and how it can be combined with MVVM.

In the next post we will start from a very simple store and gradually build up from there. Resulting code will be available as a NuGet package and source code can be found at Github repository [YAXL.Redux](https://github.com/massivepixel/yaxl.redux).

Happy coding!
