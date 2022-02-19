---
title: 'Typescript, Map with generic keys (part 1)'
publishedAt: "2020-05-01"
tags: ['typescript', 'functional programming']
ast: false
---

ES6 comes with built-in [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) structure that holds key-value pairs. While great in most cases, the default implementation doesn't work with arbitrary keys - it only works with numbers and strings (and objects via reference equality). If you require keys that are complex objects with custom equality, the built-in implementation won't suffice.

_Time to roll our own_

We start rather simple:

```ts
class TMap<TKey, TValue> {
  constructor() {}

  set(key: TKey, value: TValue): this {
    return this; // for chaining
  }

  get(key: TKey): TValue | undefined {
    return undefined;
  }

  has(key: TKey): boolean {
    return false; // technically true
  }
}
```

So how dow we implement these methods? And how do we differentiate between two instances? For that we'll turn to a special interface:

```ts
interface IEquality<T extends IEquality<T>> {
  equals(other: T): boolean;
  hashCode(): number;
}
```

Any class that implements this interface will be usable as key since now we can differentiate objects.

```ts
// a simple Hex class
class Hex implements IEquality<Hex> {
  constructor(public readonly row: number, public readonly col: number) {}

  equals(other: Hex) {
    return other.row === this.row && other.col === this.col;
  }

  hashCode(): number {
    let hash = 13;
    hash = hash * 7 + this.row;
    hash = hash * 7 + this.col;
    return hash;
  }
}
```

We use prime numbers for computing hash efficiently and with as little collisions as possible. Let's adjust the signature of our `TMap<>` class to: `class TMap<TKey extends IEquality<any>, TValue>`. Now our implementation can reference those two methods.

So, onto implementation. The internal structure will be implemented as a buckets list. Buckets are actually an instance of `Map<K, V>` from ES6 where `K` is number = object's hash code and the value is `{ key: TKey, value: TValue }[]`. So the key will help us reduce the number of equality checks between keys when storing or retrieving. Each value in a bucket is a list of our true key-value pairs where keys share the same hash code. This way we can quickly find a bucket from hash code and then iterate over all entries to find a match.

Our class looks like this:

```ts
class TMap<TKey extends IEquality<any>, TValue> {
  buckets: Map<number, { key: TKey; value: TValue }[]>;
  length: number = 0;

  constructor() {
    this.buckets = new Map();
  }
}
```

## `set`

Implementation is simple: first find a bucket. If there isn't one, create it and exit. Don't forget to adjust size! If there is a bucket with the given key it is necessary to check if there is already such a key in the list by using explicit equality check.

```ts
class TMap<TKey extends IEquality<any>, TValue> {
  set(key: TKey, value: TValue): this {
    const hashCode = key.hashCode();
    let bucket = this.buckets.get(hashCode);

    if (!bucket) {
      // easy case, just create a new bucket and we're done
      bucket = [{ key, value }];
      this.buckets.set(hashCode, bucket);
      this.length++;
    } else {
      for (let index = 0; index < bucket.length; index++) {
        const kvp = bucket[index];
        if (kvp.key.equals(key)) {
          // overwrite existing
          kvp.value = value;
          return this;
        }
      }

      // insert a new pair in this bucket
      bucket.push({ key, value });
      this.length++;
    }

    return this;
  }
}
```

Phew, that was a big one! Let's now add retrieval.

## `get`

```ts
class TMap<TKey extends IEquality<any>, TValue> {
  get(key: TKey): TValue | undefined {
    const hashCode = key.hashCode();
    let bucket = this.buckets.get(hashCode);
    if (!bucket) {
      return undefined;
    }

    for (let index = 0; index < bucket.length; index++) {
      const element = bucket[index];
      if (element.key.equals(key)) {
        return element.value;
      }
    }

    return undefined;
  }
}
```

## `has`

Since `has` is similar to `get` it should be straightforward to implement. The algorithm has to be reused since the value might be `undefined` to begin with.

If the value is known to not be `undefined`, the implementation could be simplified to `has(key) { return !!this.get(key); }`, but in general it the implementation must allow for `null` or `undefined`.

```ts
class TMap<TKey extends IEquality<any>, TValue> {
  has(key: TKey): boolean {
    const hashCode = key.hashCode();
    let bucket = this.buckets.get(hashCode);

    if (!!bucket) {
      for (let index = 0; index < bucket.length; index++) {
        const element = bucket[index];
        if (element.key.equals(key)) {
          return true;
        }
      }
    }

    return false;
  }
}
```

## Conclusion

So now we have a custom implementation of `Map` that works with custom key types...provided they have the necessary shape. There are several issues with this implementation:

1. It doesn't support numbers or strings as keys
2. It doesn't implement `Map<K,V>` shape completely (no `delete` yet)

In the next posts we will solve both problems and even go beyond what we set out to do in order to implement some interesting higher order functions.
