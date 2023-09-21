import captureWebsite from "capture-website";
import { getAllPosts } from "./utils.mjs";

const posts = getAllPosts(["slug"]);
const tils = getAllPosts(["slug"], "til");

async function generateImage(type, slug) {
  const url = `http://localhost:3000/${type}/preview/${slug}`;
  const fileName = `public/static/images/${slug}.png`;

  await captureWebsite.file(url, fileName, {
    overwrite: true,
    width: 1200,
    height: 630,
    styles: [
      `body {
    }`,
    ],
  });
}

posts.forEach(({ slug }) => generateImage("blog", slug));
tils.forEach(({ slug }) => generateImage("til", slug));
