import { GetServerSidePropsContext } from "next";

import {
  getAllKbFiles,
  getAllMarkdownFilesFromFolder,
} from "../lib/getKbArticles";
import { isDevelopment } from "./_document";

const ROOT_URL = isDevelopment()
  ? "http://localhost:3000/"
  : "https://tpetrina.com/";

function generateSitemap(
  posts: {
    publishedAt: string;
    path: string;
  }[]
) {
  const pages: string[] = ["", "presentations", "blog", "til"];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
      <url>
        <loc>${`${ROOT_URL}${page}`}</loc>
      </url>`
        )
        .join("")}
      ${posts
        .map(
          (page) => `
      <url>
        <loc>${`${ROOT_URL}${page.path}`}</loc>
        <lastmod>${page.publishedAt}</lastmod>
      </url>`
        )
        .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  // We generate the XML sitemap with all examples
  const posts: { publishedAt: string; path: string }[] = [
    ...(await getAllMarkdownFilesFromFolder(".")).map((file) => ({
      publishedAt: file.publishedAt,
      path: file.relativeUrl.startsWith("./")
        ? file.relativeUrl.replace("./", "")
        : file.relativeUrl,
    })),
  ];

  console.log(posts);

  posts.sort((l, r) =>
    l.publishedAt < r.publishedAt ? 1 : l.publishedAt > r.publishedAt ? -1 : 0
  );
  const sitemap = generateSitemap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
