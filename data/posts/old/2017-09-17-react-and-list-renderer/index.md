---
title: React and List renderer
publishedAt: "2017-09-17"
---

Rendering a list of items in React is kinda boring. It is typically done in the following fashion:

```jsx
// inside render()
<div>
{items.map((item, index) => <Item key={index} item={item} />}
</div>
```

Since every component can be written as a function, let's write a reusable list renderer. Our target syntax is:

```jsx
<List items={items} component={Item} />
```

There are two parameters: a list of items and a component used for each item. Here is the implementation for `List`:

```jsx
const List = ({ items, component: Component }) => (
  <div>{items.map((item, index) => <Component item={item} key={index} />)}</div>
);
```

### Fiber and returning arrays

The above implementation always wraps items in a `div` element which in some cases might not be what you want. Especially since that element is unreachable a bit.

Luckily, in React 16 a new rendering engine will allow components to return arrays. This means that the above `List` component can be simplified to:

```jsx
const List = ({ items, component: Component }) =>
  items.map((item, index) => <Component item={item} key={index} />);
```

There you go, simple and reusable and allows rendering lists in declarative fashion without escaping into js.

### Conclusion

The only drawback is that list item is always passed via `props.item` which prevents one from naming it a little bit better.

There you go, a generic `List` component.
