---
title: import 'api' not import '../../../../../../api' with create-react-app and TypeScript
publishedAt: "2018-02-08"
tags: ["typescript"]
---

Absolute imports are better than relative ones, just ask your mailman. Aptly named article [Say Goodbye to ‘../../../..’ in your TypeScript Imports](https://decembersoft.com/posts/say-goodbye-to-relative-paths-in-typescript-imports/) explains how to enable absolute imports in your regular TypeScript based projects, but for `create-react-app` using `create-react-app-typescript` (check it out at [GitHub repo](https://github.com/wmonk/create-react-app-typescript/)) it cannot work since we cannot edit `webpack.config.js`.

But there is hope! Follow these steps (if you have working CRA app with TypeScript setup):

 1. Add `react-app-rewired`:

    ```npm install -save-dev react-app-rewired```

 2. Add `config-overrides.js` to your root file with the following configuration:

```js
const path = require("path")

/* config-overrides.js */

function srcPath(subdir) {
  return path.join(__dirname, subdir)
}

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias.api = srcPath("src/api")
  console.dir(config)
  return config
}
```

 3. Update your `tsconfig.json` file:

```json
{
  "baseUrl": ".",
  "paths": {
    "api": [ "src/api/index" ]
  }
}
```

Since I have an `src/api/index.ts` file I can now write `import {} from "api"` no matter which file I am editing. It is easy to add additional mappings but remember to update both the overrides and the TypeScript configuration file.