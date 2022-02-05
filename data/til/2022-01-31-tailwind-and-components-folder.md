---
title: "Tailwind and components folder"
publishedAt: "2022-01-31"
---

I was curious to see that classes in my components had zero effect, especially with dark mode. After digging a bit, it was a misconfiguration issue.
Next.js usually has pages in the `pages/` folder and components in the `components/` folder. When filling `tailwind.config.js` don't forget to add _both_ folders:

```js
content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
```

Usually all the code is found in `src/` folder so this is easily forgotten.
