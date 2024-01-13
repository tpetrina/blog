---
title: "Nextjs and 'Cannot read properties of null' error"
publishedAt: "2024-01-13"
summary: "When running in production (inside Docker), a strange error about React hooks being null happened. Downgrade fixed it."
tags: ["React", "nextjs"]
---

The following error happens only in production:

```
TypeError: Cannot read properties of null (reading 'useContext')
```

For context, the app is built as standalone as it is deployed with a Docker container (not on Vercel).

The error makes no sense as it is saying the React hook is being null. The error location points to a `swr` library and a line of code that merely uses the hook.

The solution: downgrade from `13.4.6` to `13.4.5`.
