---
title: "Records simplify dependency injection for MediatR handlers"
publishedAt: "2022-11-07"
summary: "Writing MediatR handlers requires boilerplate. Records come to rescue"
tags: ["csharp", "mediatr"]
---

MediatR command handlers when used with dependency injection often feel... boilerplatey.

Let's look at an example handler with two injected services.

```csharp
public sealed class SendEmailCommandHandler
    : IRequestHandler<int, int>
{
    private readonly IEmailSender _emailSender;
    private readonly IUserRepository _userRepository;
    private readonly ILogger _logger;

    public SendEmailCommandHandler(
        IEmailSender emailSender,
        IUserRepository userRepository,
        ILogger logger
    )
    {
        _emailSender = emailSender;
        _userRepository = userRepository;
        _logger = logger;
    }

    // ...rest of the handler goes below
}
```

As seen on the above example, creating a constructor, fields and assigning them
is a bit repetitive. Even with modern tooling, it still feels as...not really
necessary.

Enter records. With its feature of primary constructors, the above code can be
simplified to:

```csharp
public sealed record SendEmailCommandHandler(
        IEmailSender _emailSender,
        IUserRepository _userRepository,
        ILogger _logger
    ) : IRequestHandler<int, int>
{
    // ...rest of the handler goes below
}
```

If you squint, it almost looks like a public method definition. Quite a nice
improvement: shorter file and easier on the eyes.
