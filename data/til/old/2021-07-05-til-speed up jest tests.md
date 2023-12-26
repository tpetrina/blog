---
title: "TIL: Speed up jest tests"
publishedAt: "2021-07-05"
tags: ["today-i-learned", "jest"]
ast: false
summary: "A modest speed-up for ts-jest"
---

To speed up Jest tests paired with `ts-jest`, add the following to `jest.config.js`:

```
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  maxWorkers: 1,
```
