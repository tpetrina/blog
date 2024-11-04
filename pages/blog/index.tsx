import { InferGetStaticPropsType } from "next";

import Footer from "../../components/footer";
import { H1 } from "../../components/heading";
import Layout from "../../components/layout";
import LinksList from "../../components/links-list";
import Navigation from "../../components/navigation";
import { getAllPosts } from "../../lib/getPostBySlug";

export default function BlogPostsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <Navigation />

      <Layout.Content>
        <main className="px-4">
          <H1>Blog posts</H1>

          <section className="h-[20px]" />

          <LinksList
            files={props.allPosts.slice(0, 2).map((post) => ({
              relativePath: `/blog/${post.slug}`,
              modifiedOn: post.publishedAt,
              fullPath: "",
              data: post,
            }))}
          />
        </main>

        <Footer />
      </Layout.Content>
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
