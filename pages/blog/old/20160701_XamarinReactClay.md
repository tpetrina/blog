---
title: Meet Clay - React inspired view library for Xamarin.Forms
publishedAt: "2016-07-01"
tags: ["xamarin", "clay", "reactjs"]
---

[React](https://facebook.github.io/react/) surprised the world with its elegant approach towards building UIs and, in effect, apps. Instead of separating views from view models, they are tightly bundled together into a component which is first and foremost functional. After it took the web world by storm, [React.Native](https://facebook.github.io/react-native/) did the same for iOS and later Android apps (and even later, UWP apps).

As a C# developer working with Xamarin.Forms, although XAML has lots of virtues, react-based approach is something that I would love to see in my C#/XAML workflow. After all, if they can build it on top of HTML, we sure can do it on top of XAML.

This is by no means first attempt at building React like framework for C#. [NReact](https://github.com/demigor/nreact) is a library for all XAML based platforms trying to achieve that, but with a somewhat strange syntax. Example:

```csharp
class TodoApp : NComponent
{
  protected object[] Items { get { return GetState<object[]>(Properties.Items, null); } set { SetState(Properties.Items, value); } }
  protected string Text { get { return GetState<string>(Properties.Text, null); } set { SetState(Properties.Text, value); } }

  public override NElement Render()
  {
    var items = Items;

    return
      new NXaml<StackPanel>().
            HorizontalAlignment(HorizontalAlignment.Center).
            Children(
              new NXaml<TextBlock>().Text("TODO").FontSize(24).HorizontalAlignment(HorizontalAlignment.Center),
              new TodoList { Items = this.Items },
              new NXaml<StackPanel>().Orientation(Orientation.Horizontal).
                Children(
                  new NXaml<TextBox>().Text(Text).TextChanged(OnChange).Width(200),
                  new NXaml<Button>().Click(OnAdd).Content("Add #" + (Items.Length + 1))));
  }
}
```

Its use of fluent syntax and generic types strays from the equivalent XAML code.

For [Clay](https://github.com/massivepixel/clay) a different approach is used. Instead of wrapping existing classes into helpers that can create a virtual DOM, new classes were created that mimic the old ones so that the resulting syntax doesn't look so alien to those building Xamarin.Forms views in C#. Example:

```csharp
public class SimpleTestView : ClayView
{
    readonly ICommand ClickCommand;

    public SimpleTestView()
    {
        ClickCommand = new Command(Click);
    }

    void Click()
    {
        Application.Current.MainPage.DisplayAlert("alert", "hello world", "ok");
    }

    public override View Render()
    {
        return new StackLayout
        {
            VerticalOptions = LayoutOptions.Center,
            Children =
            {
                new Label
                {
                    Text = "Welcome to Xamarin Forms!",
                    HorizontalOptions = LayoutOptions.Center
                },
                new Button
                {
                    Text = "Click me",
                    Command = ClickCommand
                }
            }
        };
    }
}
```

Much cleaner, but there are some problems with this approach:

1.  Xamarin.Forms is built with Pages as root elements. We need to be able to represent them as well.
2.  `ListView`, `DataTemplate`, `DataTemplateSelector` are special concepts that also need to be represented virtually
3.  `ControlTemplates`
4.  Attached properties, behaviors, effects and triggers are also problematic although some concepts might become obsolete when using Clay
5.  Custom renderers are also

We'll explore these details in upcoming posts.
