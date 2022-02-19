---
title: Using render prop to render lists in React
publishedAt: "2017-12-07"
---

Render props are awesome! Let's write a flexible list renderer with them in mind. Given an example list `list = [1,2,3,4]` we will render it with the following snippet:

```jsx
<List items={this.list}>
{ num => <span>{num}.</span>}
</List>
```

And the trivial implementation of the `List` component is:

```jsx
const List = ({ items, children }) =>
  items.map((item, index) => children(item, index))
```

Which can be shortened to:

```jsx
const List = ({ items, children }) =>
  items.map(children)
```

   Note: This only works in React 16 since we are returning an array from the `List` component.

Voilà!