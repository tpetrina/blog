import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";

async function generate() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = (
    await globby([
      "pages/**/*.tsx",
      "!pages/_*.tsx",
      "!pages/api",
      "!pages/404.tsx",
    ])
  )
    .filter((page) => page.indexOf("[") === -1)
    .map((page) => page.replace(/(.*?)\/index.tsx/, "$1.tsx"));

  const posts = await globby(["posts/**/*.md"]);
  console.log(posts);

  const urls = pages
    .map((page) => {
      const path = page.replace("pages", "").replace(".tsx", "");
      const route = path === "/index" ? "" : path;

      return `
        <url>
            <loc>${`https://tpetrina.com${route}`}</loc>
        </url>
      `;
    })
    .concat(
      posts.map((post) => {
        const path = post.replace(/^posts\//, "/blog/").replace(".md", "");
        const route = path;
        return `
      <url>
          <loc>${`https://tpetrina.com${route}`}</loc>
      </url>
    `;
      })
    )
    .join("");

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", formatted);
}

generate();
