import { writeFileSync } from "fs";
import { Feed } from "feed";

import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkRehype from "remark-rehype";

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import visit from "unist-util-visit";

export function getPostSlugs(folder) {
  const postsDirectory = join(process.cwd(), "data", folder);
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = [], folder) {
  const postsDirectory = join(process.cwd(), "data", folder);
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = [], folder = "posts") {
  const slugs = getPostSlugs(folder);

  // sort slugs lexically (they start with date anyway)
  slugs.sort((l, r) => r.localeCompare(l));

  const posts = slugs
    .filter((slug) => slug.endsWith("md"))
    .map((slug) => getPostBySlug(slug, fields, folder))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

function fixRelativeImages(options) {
  function imageVisitor(node) {
    // Sanitize URL by removing leading `/`
    const relativeUrl = node.url.replace(/^\//, "");

    node.url = new URL(relativeUrl, options.imagesAbsolutePath).href;
  }
  function linkVisitor(node) {
    // Sanitize URL by removing leading `/`
    const relativeUrl = node.url.replace(/^\//, "");

    node.url = new URL(relativeUrl, options.absolutePath).href;
  }

  function transform(tree) {
    if (options && options.absolutePath) {
      visit(tree, "image", imageVisitor);
      visit(tree, "link", linkVisitor);
    } else {
      throw Error("Missing required `absolutePath` option.");
    }
  }

  return transform;
}

async function markdownToHtml(markdown) {
  const result = await remark()
    .use(fixRelativeImages, {
      absolutePath: "https://tpetrina.com/",
      imagesAbsolutePath: "https://tpetrina.com/blog/",
    })
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown);

  const html = result.toString();
  return html;
}

// author
const toni = {
  name: "Toni Petrina",
  // email: "@.com",
  link: "https://tpetrina.com",
};

const feed = new Feed({
  title: "Toni Petrina's digital garden",
  description: "Something, something, code!",
  id: "http://tpetrina.com/",
  link: "http://tpetrina.com/",
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  //   image: "http://tpetrina.com/image.png",
  favicon: "http://tpetrina.com/favicon.ico",
  copyright: "All rights reserved 2022, Toni Petrina",
  updated: new Date(), // optional, default = today
  generator: "Feed for Node.js", // optional, default = 'Feed for Node.js'
  feedLinks: {
    rss: "https://tpetrina.com/rss.xml",
    json: "https://tpetrina.com/json",
    atom: "https://tpetrina.com/atom",
  },
  author: toni,
});

async function addPosts(folder) {
  const posts = getAllPosts(
    ["title", "slug", "publishedAt", "summary", "content"],
    folder
  ).map((post) => ({
    title: post.title,
    url: `https://tpetrina.com/${folder}/${post.slug}`,
    description: post.summary,
    content: post.content,
    date: parseDate(post.publishedAt),
    image: undefined,
  }));

  for (let i = 0; i < posts.length; ++i) {
    const post = posts[i];
    const html = await markdownToHtml(post.content);
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      content: html,
      author: [toni],
      // contributor: [toni],
      date: post.date,
      image: post.image,
    });
  }
}

await addPosts("posts", "blog");
await addPosts("til", "til");

// Output: RSS 2.0
writeFileSync("public/rss.xml", feed.rss2());

// Output: Atom 1.0
writeFileSync("public/atom", feed.atom1());

// Output: JSON Feed 1.0
writeFileSync("public/json", feed.json1());

function parseDate(input) {
  const p = input.split("-").map((x) => parseInt(x, 10));
  return new Date(p[0], p[1] - 1, p[2]);
}