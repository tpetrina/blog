import { InferGetStaticPropsType } from "next";
import Link from "next/link";

import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
import { getAllMarkdownFilesFromFolder } from "../../lib/getKbArticles";

export default function Preview({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Navigation />
      <Layout.Content asChild>
        <main className="px-4">
          <ul className="flex flex-col gap-4">
            {posts.map((p) => (
              <li key={p.slug} className="flex flex-col justify-between">
                <Link href={`/preview/${p.relativePath}`}>{p.title}</Link>
                <span>{p.relativePath}</span>
              </li>
            ))}
          </ul>
        </main>
      </Layout.Content>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllMarkdownFilesFromFolder(".");

  posts.sort((a, b) => {
    return a.relativePath.localeCompare(b.relativePath);
  });

  return {
    props: {
      posts: posts.map(({ modifiedOn, ...p }) => ({
        ...p,
      })),
    },
  };
}
