import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts } from "../../lib/getPostBySlug";

export default function BlogPostsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <h1>Blog posts</h1>

      {(props.allPosts || []).map((post) => (
        <>
          <pre>{JSON.stringify(post, null, 2)}</pre>
          <Link href={`/blog/${post.slug}`}>blog post</Link>
        </>
      ))}
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "slug", "date"]);
  return {
    props: {
      allPosts,
    },
  };
};
