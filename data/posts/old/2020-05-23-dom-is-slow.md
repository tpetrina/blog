---
title: 'DOM is slow...'
publishedAt: "2020-05-01"
tags: ['javascript', 'dom', 'gamedev']
ast: false
---

In a simple loop

```ts
function render() {
  // init
  const now = new Date().getTime();
  const delta = now - last;

  // update
  for (let index = 0; index < entities.length; ++index) {
    const e = entities[index];
    e.x += ((100 * delta) / 1000) * e.dx;
    e.y += ((100 * delta) / 1000) * e.dy;

    if (e.x < 0 || e.x > document.body.clientWidth - e.w) {
      e.dx *= -1;
    }
    if (e.y < 0 || e.y > document.body.clientHeight - e.h) {
      e.dy *= -1;
    }
  }

  // render
  clear(ctx);
  for (let index = 0; index < entities.length; ++index) {
    const entity = entities[index];
    ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
  }

  // cleanup
  last = now;

  requestAnimationFrame(render);
}
```

On my machine the average FPS for 20000 entities is around 50. If I extract `document.body.clientWidth` and `document.body.clientHeight` into a global variable the FPS rises to 60 ocassionaly.

That really is surprising!