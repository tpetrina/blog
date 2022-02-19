---
title: 'Game DevLog: Loading images'
publishedAt: "2020-12-05"
tags: ['gamedev']
ast: false
---

Images are the most common asset used in any game and loading them requires an ergonomic approach for the inner dev loop as well as sane defaults.

A simple bulk load might be done with:

```tsx
const [fighter, goblin, ghost] = await Promise.all([
  loadImage('characters/PC_fighter.png'),
  loadImage('characters/goblin.png'),
  // this is not a simple image
  loadAtlasFromConfiguration(Atlases.ghost),
]);
```

Where `loadImage` is a function returning a `Promise<Texture>` back. To load an image asynchronously, an `Image` is constructed and the `src` property is set. Then, `onload` and `onerror` are used to get the underlying `HTMLImageElement` and its size.

```tsx
export type Texture = {
  name: string;
  image: HTMLImageElement;
  aspect: number;
};

export function loadImage(name: string): Promise<Texture> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function() {
      console.log(`Loaded ${name}`);
      resolve({
        name: name,
        image: img,
        aspect: img.naturalWidth / img.naturalHeight,
      });
    };

    img.onerror = function(e) {
      console.log(`Error loading ${name}`);
      reject(new Error(`Error loading ${name}`));
    };

    img.src =
      name.startsWith('images') || name.startsWith('/images')
        ? name
        : `/images/${name}`;
  });
}
```

Notice that the paths should be absolute to ensure they load from any page within the game. The root folder for all images is `/images` (maybe it should be assets?) and the code tries to prepend the `/images` in case it is missing.

Some things to improve in the future:

1. When an error ocurrs, load a default image instead of crashing the app. A default image will be visible in the game and doesn't prevent the playtest.
2. Use a prebuild pass to generate a list of files that are available - writing paths manually is error prone.
3. Create an abstraction over `Texture` that replaces `HTMLImageElement` with `CanvasImageSource`. The latter is usable inside canvas as it can be drawn like an image. However, that might not play nicely with a WebGL renderer.

Additionally, loading a lot of resources requires writing the list of all assets at the beginning - kinda hard to have individual components load their respective assets. As list of assets required per screen grows or if the assets are loaded dynamically, the original example might not be ergonomic enough.
