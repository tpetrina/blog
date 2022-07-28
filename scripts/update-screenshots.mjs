import captureWebsite from "capture-website";
import { getAllPosts } from "./utils.mjs";

const posts = getAllPosts(["slug"]);
console.log(posts);

async function generateImage(slug) {
  console.log("starting...");
  const url = `http://localhost:3000/blog/preview/${slug}`;
  const fileName = `public/static/images//${slug}.png`;

  await captureWebsite.file(url, fileName, {
    overwrite: true,
    width: 1200,
    height: 630,
    styles: [
      `body {
    }`,
    ],
  });
  console.log("done!");
}

posts.forEach((post) => generateImage(post.slug));
