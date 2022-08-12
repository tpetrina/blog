---
title: "Notes from reading swr source code"
publishedAt: "2022-08-08"
description: "Reading source code from battle tested open source projects leads to learning fun concepts and utilities"
---

Source code at [GitHub vercel/swr](https://github.com/vercel/swr).

How to check if we are using the latest version of React:

```ts
export const IS_REACT_LEGACY = !React.useId;
```

Is this running on server?

```ts
export const isWindowDefined = typeof window != "undefined";
export const IS_SERVER = !isWindowDefined || "Deno" in window;
```

This snippet! Helps when using withing Next.

```ts
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
export const useIsomorphicLayoutEffect = IS_SERVER
  ? useEffect
  : useLayoutEffect;
```

I forgot that `useState` doesn't have to be destructured!

```ts
const rerender = useState<Record<string, unknown>>({})[1];
```

And now, for the ultimate "rerender" hack:

```ts
if (IS_REACT_LEGACY) {
  rerender({});
} else {
  (React as any).startTransition(() => rerender({}));
}
```

Now I need to read up on `startTransition` and how it works.

Finally, this whole file is ripe for stealing and embedding! [web-preset.ts](https://github.com/vercel/swr/blob/main/_internal/utils/web-preset.ts). Especially for projects that need to detect online presence and are maybe not using SWR.

This was fun! The source will require re-reading as there are many more hidden gems inside it. Especially related to typing.
