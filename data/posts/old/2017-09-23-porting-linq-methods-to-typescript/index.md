---
title: Porting LINQ methods to Typescript
publishedAt: "2017-09-23"
---

Of course [Lodash](http://lodash.com) is great, but coming from C# I miss LINQ naming. For example, let's see how we can write `firstOrDefault` method.

First step is to extend the built in `Array<T>` interface:

```typescript
declare global {
  interface Array<T> {
    firstOrDefault(predicate: (element: T) => boolean): T | null
  }
}
```

Nothing wrong with that. The implementation is simple:

```typescript
if (!Array.prototype.firstOrDefault) {
  Array.prototype.firstOrDefault = function<T>(
    predicate: (element: T) => boolean
  ): T | null {
    if (!predicate) {
      if (this.length === 0) return null
      return this[0]
    }

    for (let i = 0; i < this.length; ++i) {
      if (predicate(this[i])) return this[i]
    }

    return null
  }
}
```

There you go. Funky indentation provided by [Prettier](https://prettier.io) Example usage is:

```typescript
let items = getItems()
const first = items.firstOrDefault(item => /* smth */)
```