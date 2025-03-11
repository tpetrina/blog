import { formatDate } from "date-fns";
import { InferGetStaticPropsType } from "next";

import Footer from "../../components/footer";
import { H1 } from "../../components/heading";
import Layout from "../../components/layout";
import LinksList from "../../components/links-list";
import Navigation from "../../components/navigation";
import { getAllMarkdownFilesFromFolder } from "../../lib/getKbArticles";
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
            files={props.allPosts.map((post) => ({
              relativePath: `/blog/${post.slug}`,
              relativeUrl: `/blog/${post.slug}`,
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
  const allPosts = (await getAllMarkdownFilesFromFolder("blog")).map((md) => ({
    ...md,
    relativePath: md.relativeUrl,
    modifiedOn: formatDate(md.modifiedOn, "yyyy-MM-dd"),
  }));

  allPosts.sort((l, r) => r.publishedAt.localeCompare(l.publishedAt));

  return {
    props: {
      allPosts,
    },
  };
};
