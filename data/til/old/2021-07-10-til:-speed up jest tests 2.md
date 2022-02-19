---
title: "TIL: Speed up jest tests (2)"
publishedAt: "2021-07-10"
tags: ["today-i-learned", "jest", "esbuild"]
ast: false
summary: "Use esbuild-jest to speed up TypeScript tests"
---

[Last time](2021-07-05-til:-speed%20up%20jest%20tests/) some `jest.config.js` trickery was used to speed up Jest tests.

However, there is something that can make it faster - better compiler. And in this case it is [esbuild](https://github.com/evanw/esbuild).

First, add packages `esbuild` and `esbuild-jest`. Then add the following to `jest.config.js`:

```js
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
```

Also, remove `preset: "ts-jest",` from `jest.config.js` if found. From more than 3 seconds to 0.12s. Fantastic!
