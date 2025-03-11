// @ts-nocheck
import { Feed } from "feed";
import { writeFileSync } from "fs";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import { visit } from "unist-util-visit";

import { getAllMarkdownFilesFromFolder } from "../lib/getKbArticles";

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
  id: "https://tpetrina.com/",
  link: "https://tpetrina.com/",
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  //   image: "http://tpetrina.com/image.png",
  favicon: "https://tpetrina.com/favicon.ico",
  copyright: "All rights reserved 2024, Toni Petrina",
  updated: new Date(), // optional, default = today
  generator: "Toni Petrina RSS Feed", // optional, default = 'Feed for Node.js'
  feedLinks: {
    rss: "https://tpetrina.com/rss.xml",
    json: "https://tpetrina.com/json",
    atom: "https://tpetrina.com/atom",
  },
  author: toni,
  ttl: 3600,
});

async function addPosts(posts) {
  const mapped = posts.map((post) => {
    const fragment = !!post.fragment ? `${post.fragment}/` : "";
    return {
      title: post.title,
      url: `https://tpetrina.com/${fragment}${post.slug}`,
      description: post.summary,
      content: post.content,
      date: parseDate(post.publishedAt),
      image: undefined,
    };
  });

  for (let i = 0; i < mapped.length; ++i) {
    const post = mapped[i];
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

const posts = [
  ...(await getAllMarkdownFilesFromFolder("blog", ["content"])).map((file) => ({
    ...file,
    publishedAt: file.publishedAt || file.modifiedOn.toISOString(),
    slug: file.relativeUrl,
    fragment: "",
  })),
];
posts.sort((l, r) =>
  l.publishedAt < r.publishedAt ? 1 : l.publishedAt > r.publishedAt ? -1 : 0
);

await addPosts(posts);

// Output: RSS 2.0
writeFileSync("public/rss.xml", feed.rss2());

// Output: Atom 1.0
writeFileSync("public/atom", feed.atom1());

// Output: JSON Feed 1.0
writeFileSync("public/json", feed.json1());

function dateOrStringToString(input) {
  if (typeof input === "string") {
    return input;
  }
  return input.toISOString();
}

function parseDate(input) {
  try {
    const p = dateOrStringToString(input)
      .split("-")
      .map((x) => parseInt(x, 10));
    return new Date(p[0], p[1] - 1, p[2]);
  } catch (e) {
    console.error(`Error parsing date ${input}`);
    return new Date();
  }
}
