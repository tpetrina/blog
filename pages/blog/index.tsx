import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Footer from "../../components/footer";

import { H1 } from "../../components/heading";
import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
import { getAllPosts } from "../../lib/getPostBySlug";

export default function BlogPostsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <Navigation />

      <main className="px-4">
        <H1>Blog posts</H1>

        <section className="h-[20px]" />

        <ul className="space-y-8">
          {(props.allPosts || []).map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="w-full flex flex-col"
              >
                <section className="flex flex-col sm:flex-row w-full">
                  <h3 className="text-xl w-full">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 right mb-2">
                    {post.publishedAt}
                  </p>
                </section>
                <p>{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "slug", "publishedAt", "summary"]);
  allPosts.sort((l, r) => r.publishedAt.localeCompare(l.publishedAt));

  return {
    props: {
      allPosts,
    },
  };
};
