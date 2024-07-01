---
title: "Coerce null and undefined to empty string with Zod"
summary: "Parse, don't validate. And use safe defaults"
tags: ["zod", "typescript"]
---

I love using [zod](https://zod.dev/) for parsing in TypeScript. Getting Zod to
default to empty string when parsing null or undefined is a bit...hard.

Luckily, it is easy to write extensions for it:

```tsx
// This class has other extensions
export class zx {
  static string(): z.ZodEffects<z.ZodString, string, unknown> {
    return z.preprocess((arg) => {
      if (arg === null || arg === undefined) {
        return "";
      }

      if (typeof arg === "string") {
        return arg;
      }
      if (typeof arg === "number") {
        return arg.toString();
      }

      return "";
    }, z.string());
  }
}
```

It correctly parses `undefined` and `null` as `''`.

Primary use case is to force form values to be initialized to the empty string
instead of using `undefined` or `null` when binding to `<input>`.
