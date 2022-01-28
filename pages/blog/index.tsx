import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import Navigation from "../../components/navigation";
import { getAllPosts } from "../../lib/getPostBySlug";

export default function BlogPostsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <div className="mx-auto max-w-2xl">
      <Head>
        <title>Toni Petrina's digital garden</title>
        <meta name="description" content="Toni Petrina's digital garden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="px-8">
        <h1 className="text-2xl font-bold mb-4">Blog posts</h1>

        <ul className="space-y-8">
          {(props.allPosts || []).map((post) => (
            <li>
              {/* <pre className="">{JSON.stringify(post, null, 2)}</pre> */}
              <Link href={`/blog/${post.slug}`}>
                <a className="w-full flex flex-col">
                  <section className="flex flex-col sm:flex-row w-full">
                    <h3 className="text-xl w-full">{post.title}</h3>
                    <p className="text-sm text-gray-600 right mb-2">{post.publishedAt}</p>
                  </section>
                  <p>{post.summary}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "slug", "publishedAt", "summary"]);
  return {
    props: {
      allPosts,
    },
  };
};
