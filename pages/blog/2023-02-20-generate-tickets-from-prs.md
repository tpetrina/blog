---
title: "Generate tickets from PRs, not the other way round"
publishedAt: "2023-02-20"
summary: "Work is the ultimate goal, auto-generate tickets"
tags: ["opinion"]
---

All projects require some form of tracking, be it super simple like a TODO list,
a Trello board or a full blown JIRA backlog. Whenever a ticketing system is
introduced, PRs usually refer to the ticket. With sufficient automation, merging
a PR can even close the corresponding ticket!

However, once tickets become a measure of work, _all_ the work must be tracked
in JIRA for transparency sake.

Even worse, it can be demanded that _no work is done without a corresponding
JIRA ticket_.

Which is...not ideal. If we want to be agile, then this is a serious drawback!
How can we say we use [Individuals and interactions over processes and tools](https://agilemanifesto.org/)
if we require such bureaucracy for every code change?

The alternative to the workflow JIRA ticket -> PR is to simply invert the flow.

1. Create a PR with a tag e.g. `TICKET - Updating NuGet packages`
2. Bot checks PRs created with this prefix. Once found, it creates a JIRA ticket
   and fills title, description and any other meaningful content.
3. Bot edits the PR title and replaces `TICKET` with `456` or whatever system
   one is using.

The benefits of this are numerous.

- Small changes stop being onerous.
- The rationale for a change stays in the source control next to the affected
  code
- The developer flow is unimpeded

That's it! As simple as that we have obtained the perfect mix between increased
developer productivity while satisfying project management requirements. Also,
for small changes the source of truth is actually in the source control, not the
other way round.

This is #Day1 of [#100DaysToOffload](https://100daystooffload.com/).
