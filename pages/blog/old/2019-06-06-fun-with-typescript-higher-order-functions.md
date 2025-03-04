---
title: "Fun with Typescript and Higher Order Functions"
publishedAt: "2019-06-06"
tags: ["typescript", "functional programming"]
summary: "Typing higher order functions in Typescript is fun"
ast: false
---

Functional programming is fun and building higher order functions in regular JavaScript is straightforward. Let's build one such function: `once` - a function that accepts another function as parameter and returns a function that caches the result (so it is only invoked once):

```js
function once(fn) {
  let isRun = false;
  let result;
  return function () {
    if (!isRun) {
      isRun = true;
      result = fn.apply(null, arguments);
    }

    return result;
  };
}
```

Looks decent. If you are worried about caching result _per_ parameters, that is a topic for another day. And a great exercise for the reader :)

It becomes slightly prettier when using ES6 and spread operator:

```js
function once(fn) {
  let isRun = false;
  let result;
  return function (...args) {
    if (!isRun) {
      isRun = true;
      result = fn(...args);
    }

    return result;
  };
}
```

Much better. Let's use it!

```js
function sum(a, b) {
  return a + b;
}

const sumOnce = once(sum);
```

Ok, so let's port it to TypeScript and add types. What type will we use for the argument? It is a function, but with variable number of parameters. We could use `(...args: any[]) => any`, but that will hide the original types and make the `sumOnce` useless!

Luckily, we can use type inference and higher order types `ReturnType<T>` and `Parameters<T>`. But what is T?

We will pretend that our function type is generic and extends functions with arbitrary number of parameters:

```typescript
function once<T extends (...args: any[]) => any>(fn: T);
```

Now we can type `result` using the higher order type:

```typescript
let result: ReturnType<T>;
```

And instead of using `...args: any[]` we can infer the original parameters:

```typescript
  return function(...args: Parameters<T>) {
```

Which completes our typing and `sumOnce` has the original `(number, number) -> number` signature.

---

Final code is:

```typescript
function once<T extends (...args: any[]) => any>(fn: T) {
  let isRun = false;
  let result: ReturnType<T>;
  return function (...args: Parameters<T>) {
    if (!isRun) {
      isRun = true;
      result = fn(...args);
    }

    return result;
  };
}
```
