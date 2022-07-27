---
title: "MediatR: pros and cons"
publishedAt: "2022-07-27"
summary: "Using MediatR simplifies development, but has a cost."
tags: ["csharp", "mediatr"]
---

[MediatR](https://github.com/jbogard/MediatR) by Jimmy Boggard is an excellent
example of a small library doing one thing right and changing the development
landscape for C# web developers. It brings certain elegance and simplicity by decoupling callers and implementators.

Typical web application, whether .NET or .NET Core, is implemented with a MVC
pattern that looks something like (code intentionally simplified):

```csharp
public class UsersController : ControllerBase
{
    protected readonly IUsersService _service;

    public UsersController(IUsersService service)
    {
        _service = service;
    }

    [HttpGet]
    public UsersDto GetUsers()
    {
        return _service.GetUsers().ToDto();
    }
}
```

Even though this example is quite small and focused, it indicates the overall
growth direction for our types. Typically, as we add more HTTP handlers to our
controller, they are matched by a method in the interface. While controller
actions are still passthrough, the interface keeps growing. The implementation
for `IUsersService` grows as well.

After a while, implementation of said interface acquires dependencies of its
own. Whenever we instantiate `UsersService`, we also require its dependencies
to be created as well. This shouldn't generally be a problem if dependencies
are shared amongst methods, but they aren't always.

Consider two methods: `ChangeEmail` and `UploadProfile`. They might require
different implementations. E.g. changing an email might require an
implementation of `IEmailService` while uploading a picture might require blob
storage manipulation. With more complicated domains different _flows_ will
start to diverge.

The constructor of the service implementation has to acquire an instance of
every dependency and assign it to fields - even when unused. The list of
constructor's dependencies is a _union of all dependencies in the service
itself_. The service becomes a named module you can pass around.

Big classes become harder to understand, they introduce performance problems,
and sometimes even cause merge conflicts.

The worst offender is when two services start to have overlapping flows - it
becomes hard to decide where to put the logic at all!

## Enter `MediatR`

MediatR library inverts this growth - instead of ever growing fat services, each
controller action emits a request. Request gets handled by a handler and returns
a result back.

Let's go back to our controller for a bit:

```csharp
public class UsersController : ControllerBase
{
    protected readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public UsersDto GetUsers()
    {
        return _mediator.Send(new GetUsersCommand()).ToDto();
    }
}
```

Each method in the `IUserService` is now split out into a separate request and
a handler.

```csharp
public sealed record GetUsersCommand() : IRequest<Users>;

public sealed class GetUsersHandler
    : IRequestHandler<GetUsers, Users>
{
    public async Task<Users> Handle(
        GetUsers request,
        CancellationToken cancellationToken)
    {
        // implementation...
    }
}
```

So how is this better. First of all, a handler is more focused and has a single
responsibility now.
The dependency list of the handler only includes relevant dependencies that are
actually used in the implementation.
Finally, typical flow involves changing less files as the input, output and
the implementation are in a single file.

MediatR also has built in support for request pipelines - decorators that can
run before and after handler. This allows for adding cross cutting concerns
like logging, retries, transaction handling, and more.

## What are the drawbacks

Having `IMediator` as the sole dependency in controllers doesn't help with
navigation to implementation. Typically, the command will be next to its
handler, but some people really prefer having one class per file.

Fat services have issue with acquiring too many responsibilities. Single focused
handlers can have a negative effect of dispersing knowledge into too many files.

Ironically, shared dependencies between service methods now replicate accross
command handlers.

Cross cutting concerns handled by the pipeline behaviours introduce non-obvious
flows and can have subtle ordering issues.

## Conclusion?

Overall, more focused handlers (actually, micro services :P) bring clarity and
increase app performance. PRs tend to be better focused and just checking the
names of affected files is informative.

Lack of Go To Implementation can be mitigated by colocating commands with their
corresponding handlers.

Pipelines are optional, but they can simplify certain scenarios and can improve
overall observability of the system.

Additionally, implementation of notifications, that wasn't even mentioned
before, has its use cases. It's also tested, proven library with a sizeable
community of users.
