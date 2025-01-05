---
title: "Generic telemetry opt-out"
publishedAt: "2023-09-21"
summary: "Various tools require different flags to opt-out from telemetry. Can we simplify this?"
tags: ["opinion"]
---

As I was reading the information about opting out from [Storybook](https://storybook.js.org/docs/react/configure/telemetry/) (a library for UI testing in frontend world), I wanted to go and add it to my shell configuration and ensure it is always set to
opt-out.

It would be as simple as adding `export STORYBOOK_DISABLE_TELEMETRY=1` to my
`.zshrc` file.

As I was doing so, the next thought was to collect all such statements in a
generic list and keep it as a gist or public list of "known opt-outs".

But then I realized - it would be awesome to have a generic `TELEMETRY_DISABLE`
statement that _all_ tools would read and support by default. This would reduce
the need to _know_ which tools might need it or not. A solution for all tools
everyehere.

As I was opening GitHub to start a gist I realized that this could be improved
even more - how about make everything opt-in instead of opt-out? No telemetry
enabled without explicitly choosing to do so.

What a world would that be!

But that won't happen so I am back to building a list of telemetry flags...