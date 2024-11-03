import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Footer from "../../components/footer";
import { H1 } from "../../components/heading";
import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
import { getAllPosts } from "../../lib/getPostBySlug";

export default function TodayILearnedPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <Navigation />

      <Layout.Content>
        <main className="px-4">
          <H1>Today I Learned</H1>

          <section className="h-[20px]" />

          <p className="py-4 text-gray-800 dark:text-gray-200 px-2 italic">
            A collection of daily a-ha moments. Sometimes to just copy/paste,
            sometimes to remember what do avoid, other times a handy reminder
            how difficult learning all these technologies can be.
          </p>

          <section className="h-[20px]" />

          <ul className="space-y-8">
            {(props.allPosts || []).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/til/${post.slug}`}
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
      </Layout.Content>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(
    ["title", "slug", "publishedAt", "summary"],
    "til"
  );
  allPosts.sort((l, r) => r.publishedAt.localeCompare(l.publishedAt));

  return {
    props: {
      allPosts,
    },
  };
};
