---
title: "Android, Flatlist, custom refresh control"
publishedAt: "2024-05-22"
summary: "Maybe we should always spread props?"
tags: ["react-native", "android"]
---

So apparently just passing a simple wrapper (don't ask why) control to Flatlist
breaks Android.

![A preview](/blog/2024-05-22-before.jpeg)

If you inline the code, it just works.

![A preview](/blog/2024-05-22-after.jpeg)

The solution, thanks to [Stack Overflow post](https://stackoverflow.com/a/70843272/671469)
is to simply pass additional, hidden props to the underlying control.

![A preview](/blog/2024-05-22-fix-android.jpeg)

Happy coding!
