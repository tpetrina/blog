---
title: "Generic topics in programming are nearly useless"
publishedAt: "2023-01-16"
summary: "Programming has become a field so wide that most discussions about general topics or principles becomes void"
tags: ["opinion"]
---

Reading blog posts and opinions is an essential way to learn new ideas in our
ever growing tech world. Discussions that take place around them are an
excellent way to learn about certain situations that you haven't been part of.
The context matters so much that certain high-level comments about broad tools
and topics is uselss without providing the said context.

For example, these are the two articles that spawned this observation:

- [Objection to ORM hatred](https://www.jakso.me/blog/objection-to-orm-hatred)
- [Testing Without Mocks: A Pattern Language](https://www.jamesshore.com/v2/projects/testing-without-mocks/testing-without-mocks)

As you can see, topics like ORM and testing are almost immediately leading to
non-productive discussions. The back and forth should be interesting as it
should cover a broad range of experiences across time, languages and tools, but
unfortunately nowadays it rarely does so.

## Why the context matters?

Languages are different and so are ecosystems around them. What problem you are
solving and with which tools matters a lot. Someone building a CLI tool in Rust
can and should learn from someone building their app in C# or Ruby - but there
is a limit of transferring experiences.

Both topics, data access with ORMs and testing with mocks, are so wide in their
scope that each participant only thinks of their own worldview when they discuss
the topic. And when such a loaded term is used by multiple participants, each
participant defends _their_ idea in _their_ head and is basing arguments from
_their_ experience which, given the breadth of the languages, frameworks, tools
and sheer history behind them, almost makes their comment useless to others.

In short - if you had an experience on one project and are basing your comments
on that without giving context, you are in fact making things worse as the other
participant has _their own_ context which almost certainly doesn't match yours!
You are talking past each other only because the word you use is the same - the
word that depends heavily on the context and one participant doesn't think of
anything but their own experience during the discussion.

So C# developer using `AutoMoq` talking about mocks with a developer from Ruby
that is actually talking about fakes when they say mock doesn't help either side.
And readers will be frustrated as generic comments vaguely alluding to their
issues or benefits cannot be reconciled with their current experience. Teaching
without context is not possible.

I used to love reading and learning from people's experiences, but without
providing context for the particular experience, chances are that vague comments
cannot actually help someone learning. We can and we must do better by providing
context - which language, which framework, and, most importantly, which problem!

Not all projects are the same in scope, lifecycle and style. Read heavy app can
be developed differently from rich domain one. Some apps can be data driven,
some others are throwaway procedural code. Your choices influence and constrain
the way the code is written. One size doesn't fit all and neither does one
philosophy.

For example, if the app is data driven, heavy mocks are not nearly as effective
as stubs or just plain data in data out approach. On the other side, if the code
requires a lot of coordination and the code doesn't contain a lot of state
transformation, but merely orchestrates different external resources using
interaction based tests helps way more than state based tests. One is not better
than the other - one is merely better suited for the domain than the other.

If we are supposed to use the best tool for the job, then when discussing the
tool, also discuss the job at hand. Otherwise you are arguing whether or not the
hammers are good or bad without discussing why are you even planning on using
one.

## Don't get personal

Lastly, other people's choices don't mean that you have to adapt them. Just
because someone chose to write SQL or to use ORM is not a golden rule and that
we all have to start doing the same.

Comments feel very defensive and passive aggressive. As if everyone is a
preacher or a recruiter. That alone makes discussion seem more like flame wars
rather than exchanging knowledge and experiences.

## Takeaway

Just provide context when discussing general topics - others might appreciate
the missing bit.
