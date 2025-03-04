---
title: React-like approach for building Xamarin.Forms applications
publishedAt: "2016-07-07"
tags: ["xamarin", "xamarin.forms", "clay", "reactjs"]
---

As a library for building HTML/JS apps, [React](https://facebook.github.io/react/) has some unique features: JSX for mixing JS and HTML, declarative and component oriented aspects of building UIs and leverages several functional ideas that differentiate it from 'classic' UI frameworks.

Since HTML and XAML are somewhat similar, can we reuse concepts in our C#/XAML based applications? Here is a motivating example using React:

```js
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  },
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```

JSX enables mixing HTML and JavaScript code instead of separating it. In XAML based apps XAML part is always separated from the code behind and it is also separated from the matching `ViewModel` (when using [MVVM](https://en.wikipedia.org/wiki/Model–view–viewmodel)).

Our ideal syntax in C# would be something like:

```csharp
public class HelloMessage : Component
{
  public string Name { get; set; }

  public override Node Render()
    => <Label Text="Hello {Name}" />;
}

VirtualDOM.Render(new HelloMessage { Name = "John"}, page);
```

<!--more-->

...if we could write XAML inside C# code without breaking the compiler.

React is specific for its use of virtual DOM. `Render` function doesn't emit real UI components, instead it is creating a virtual DOM representing the real DOM that will be created later. For example, the above JSX implementation is actually transpiled to:

```js
// <div>Hello {this.props.name}</div>
return React.createElement('div', null, 'Hello ', this.props.name);
```

Before building our own JSX like transpiler for XAML snippets inside C# we could replicate the basic functions creating virtual DOM representation. Let's name our node building function `h` (taken from [virtual-dom](https://github.com/Matt-Esch/virtual-dom) library) which enables us to write valid C# code:

```csharp
public override Node Render()
    => h("Label", new Props
       {
         { Text, $"Hello {Name}" }
       };
// or even
public override Node Render()
    => h(new Label
       {
         Text = $"Hello {Name}"
       };
```

Even though it is just an implementation detail, the 'h' function is extremely important. It helps build virtual tree which will be used for rendering, diffing and patching. Encouraged by this rather simplistic helper function, let's assume we have all blocks in place and build rather simple counter app. Code for the main component:

```csharp
public class Counter : ClayComponent<int>
{
    public override Node Render()
        => h(new StackLayout
        {
            VerticalOptions = LayoutOptions.Center,
            Children =
            {
                new Label
                {
                    Text = $"Current value = {State}"
                },
                new Button
                {
                    Text = "+",
                    Command = new Command(inc)
                }
            }
        });

    void inc() => SetState(State + 1);
}
```

Although we would love to make it as short as

```csharp
public class Counter : ClayComponent<int>
{
    public override Node Render()
        => <StackLayout VerticalOptions="Center">
             <Label Text="Current value = {State}" />
             <Button Text="+" Command={inc} />
           </StackLayout>

    void inc() => SetState(State + 1);
}
```

We have to settle for the longer version until someone writes a transpiler for C#.

Source code for this post is taken from [Clay](https://github.com/MassivePixel/Clay) library which is still at conceptual stage.
\

