import { InferGetStaticPropsType } from "next";
import Link from "next/link";
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

      <main className="px-4">
        <H1>Today I Learned</H1>

        <section className="h-[20px]" />

        <p>A collection of daily a-ha moments.</p>

        <section className="h-[20px]" />

        <ul className="space-y-8">
          {(props.allPosts || []).map((post) => (
            <li>
              <Link href={`/til/${post.slug}`}>
                <a className="w-full flex flex-col">
                  <section className="flex flex-col sm:flex-row w-full">
                    <h3 className="text-xl w-full">{post.title}</h3>
                    <p className="text-sm text-gray-600 right mb-2">
                      {post.publishedAt}
                    </p>
                  </section>
                  <p>{post.summary}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(
    ["title", "slug", "publishedAt", "summary"],
    "til"
  );

  console.log(allPosts);
  return {
    props: {
      allPosts,
    },
  };
};
