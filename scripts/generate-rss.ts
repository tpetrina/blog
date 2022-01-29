import { writeFileSync } from "fs";
import { Feed } from "feed";
import { getAllPosts } from "../lib/getPostBySlug";

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
    json: "https://tpetrina.com/json",
    atom: "https://tpetrina.com/atom",
  },
  author: toni,
});

const posts = getAllPosts([
  "title",
  "slug",
  "publishedAt",
  "summary",
  "content",
]).map((post) => ({
  title: post.title,
  url: `https://tpetrina.com/blog/${post.slug}`,
  description: post.summary,
  content: post.content,
  date: parseDate(post.publishedAt),
  image: undefined,
}));

posts.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: post.url,
    link: post.url,
    description: post.description,
    content: post.content,
    author: [toni],
    // contributor: [toni],
    date: post.date,
    image: post.image,
  });
});

// Output: RSS 2.0
writeFileSync("public/rss.xml", feed.rss2());

// Output: Atom 1.0
writeFileSync("public/atom", feed.atom1());

// Output: JSON Feed 1.0
writeFileSync("public/json", feed.json1());

function parseDate(input: string) {
  const p = input.split("-").map((x) => parseInt(x, 10));
  return new Date(p[0], p[1] - 1, p[2]);
}
