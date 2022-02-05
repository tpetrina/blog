---
title: "Top level async in node scripts"
publishedAt: "2022-02-05"
tags: node
---

To run async code in a script, use:

- `mjs` extension
- `NODE_OPTIONS='--experimental-json-modules'`

Inside `package.json`:

```json
"script-name": "NODE_OPTIONS='--experimental-json-modules' && node ./path/to/script.mjs",
```

Then write any kind of `async` code in the top level:

```js
await fs.writeFile("file");
```
