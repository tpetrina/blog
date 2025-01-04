---
title: "Things I've learned about Tailwind"
publishedAt: "2020-04-22"
tags: ["Tailwind", "Frontend", "TIL"]
summary: "Turns out not only I won't hate Tailwind, I actually love it!"
ast: false
---

[Tailwind](https://tailwindcss.com/) is awesome! Tons of utility classes means that one of the [two hardest problems](https://martinfowler.com/bliki/TwoHardThings.html) in computer science is solved: naming. Small adjustments no longer require naming or complicated selectors. Let's see an example:

```jsx
// It might be hard to think of a name every time.
// Also, what is the class doing anyway here?
<div className="my-cool-class"></div>
```

Becomes:

```jsx
// Ah! So this is column with space between elements.
<div className="flex flex-col space-y-2"></div>
```

Finally I can get rid of my half-baked `stack-large` classes. Tailwind is not the only solution for "naming" problem. Another cool approach is to use [styled-components](https://styled-components.com/) to create unnamed style changes. Let's see an example:

```jsx
<div
  css={`
    display: flex;
    flex-direction: column;

    & > * + * {
      margin-top: 0.5rem;
    }
  `}
></div>
```

But this is obviously more verbose and requires more keystrokes!

## Use semantic sizing instead of numbers

Using class like `space-y-6` doesn't tell you much. Sure, it might mean `1.5rem`, but it doesn't conwey any semantic meaning. Code generation to the rescue! Tailwind allows creation of utility classes based on a configuration. The default configuration creates all the styles you can find in their documentation, but it can be extended to create additional ones.

Example extension:

```js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      spacing: {
        "page-inset": "40px",
        "form-spacing": "24px",
        xxsmall: "2px",
        xsmall: "4px",
        small: "8px",
        medium: "16px",
        large: "24px",
        xlarge: "32px",
        xxlarge: "40px",
      },
    },
  },
};
```

This creates _extra_ utility classes and we can use `space-y-form-spacing` or `p-page-inset`.

## Purge that CSS!

However, our semantic additions come with a cost. Utility classes are generated for all variations and all screen sizes - most of them will be unused. Our development `tailwind.generated.css` has 1.1Mb! But our release version only 29Kb! With all those unused styles purged by PurgeCSS we can rest assured that unused utilities are not present in the final CSS file.

## Caveat

Not everyone likes these utility classes. One of the chief problems is reusability. Copy-pasting 10 different styles in a sequence quickly becomes annoying.

However, paired with React (our setup), the reusability lies in the components, not in copy-pasted `className=""`. And if there really are CSS classes that are sufficiently complicated and will be reused, it is easy to create such classes. This hybrid approach yields the best results. Some elements are adjusted on the fly and require no reuse, other elements require common classes which are still built by hand.
