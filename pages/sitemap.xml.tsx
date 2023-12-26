import { GetServerSidePropsContext } from "next";
import { getAllPosts } from "../lib/getPostBySlug";

const ROOT_URL = "https://tpetrina.com/";

function generateSitemap(posts: any[]) {
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
        <loc>${`${ROOT_URL}${page.slug}`}</loc>
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
  const posts = [
    ...(await getAllPosts(["publishedAt", "slug"])),
    ...(await getAllPosts(["publishedAt", "slug"], "til")),
  ];
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
