---
title: "asyncThrottle and higher order functions in Typescript"
publishedAt: "2024-01-13"
tags: ["typescript", "functional programming"]
summary: "Typing async higher order functions in Typescript is fun"
---

In a previous post [Fun with Typescript and Higher Order Functions](/blog/2019-06-06-fun-with-typescript-higher-order-functions) I wrote about higher order functions and Typescript. It served as a base for the `asyncThrottle` function I was writing up until the part where it wasn't :D

Naive implementation for the async version of throttle looked like this:

```typescript
function asyncThrottle<T extends (...args: any[]) => any>(
  func: T,
  timeout: number
): T {
  let t: NodeJS.Timeout | undefined;

  return function replacement(...args: Parameters<T>): ReturnType<T> {
    return new Promise<any>((resolve) => {
      if (!!t) {
        clearTimeout(t);
      }

      t = setTimeout(() => {
        resolve(func(...args));
      }, timeout);
    });
  };
}
```

Howver, that doesn't work and `replacement` shows the following error:

```
Type '(...args: Parameters<T>) => ReturnType<T>' is not assignable to type 'T'.
  '(...args: Parameters<T>) => ReturnType<T>' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint '(...args: any[]) => any'
```

The real problem is that the inner function is using a `Promise` and needs full typing. We aren't just calling the passed function, we need to construct something using its parameters and return types.

So we need to fix it a bit. We need to change the return type from `T` to `(...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>`. The helper `Awaited` is available in the latest version of Typescript, but if you don't have it, it is easy to implement.

```typescript
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
```

Second, the `Promise<any>` now becomes `Promise<Awaited<ReturnType<T>>>`

## Solution

```typescript
function asyncThrottle<T extends (...args: any[]) => any>(
  func: T,
  timeout: number
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  let t: NodeJS.Timeout | undefined;

  return function replacement(
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    return new Promise<Awaited<ReturnType<T>>>((resolve) => {
      if (!!t) {
        clearTimeout(t);
      }

      t = setTimeout(() => {
        resolve(func(...args));
      }, timeout);
    });
  };
}
```
