---
title: "Avoid refactoring and changes in one PR"
publishedAt: "2023-02-21"
summary: "Mental model for code changes and refactoring is different, avoid doing both of them at once to simplify reviews"
tags: ["opinion"]
---

When making a feature or a fix, we are tempted to also refactor the code around
it. Unless it is really necessary to complete the feature, we should avoid
mixing both style of changes in the same PR.

If it is really unavoidable, then separating them into commits might simplify
comprehension and increase the benefit of code review. Even if you review your
own code, knowing if the diff is a change or merely a mechanical transformation
due to refactoring, it simplifies the review and increases the chance of
catching a bug.

This is even more important to follow in case of automated refactorings like
"extract interface", "extract method", removing or adding parameters to the
commonly used function. If the tool performing the refactoring is trustworthy,
code review can be almost entirely skipped.

But if same PR has a meaningful change - it's hard to spot it!

Bonus points for "style refactorings" - just don't mix style changes and code
changes in one go.

This is #Day2 of [#100DaysToOffload](https://100daystooffload.com/).
