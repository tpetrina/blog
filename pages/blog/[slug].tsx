import ErrorPage from "next/error";
import { useRouter } from "next/router";
import React from "react";

import CodeTheme from "../../components/code-theme";
import Footer from "../../components/footer";
import GiscusComments from "../../components/giscus";
import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
import WriterInfo from "../../components/writer-info";
import { getAllPosts, getPostBySlug } from "../../lib/getPostBySlug";
import { markdownToHtml } from "../../lib/markdownToHtml";

type Props = {
  post: any;
  readingTime: any;
};

export default function BlogPostPage(props: Props) {
  const { post } = props;

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const html = post.content;

  return (
    <Layout
      title={`${post.title}`}
      description={post.summary}
      image={post.image}
    >
      <Navigation />

      <Layout.Content>
        <article className="blog px-4">
          <header>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="border-l-[4px] border-blue-400 pl-2">
              {post.summary}
            </p>
          </header>

          <section className="my-4 ">
            <WriterInfo post={post} readingTime={props.readingTime} />
          </section>

          <div
            className="prose dark:prose-dark max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        <section className="flex flex-col p-4 space-y-2">
          <hr className="border border-1 border-gray-300 dark:border-gray-600" />

          <section className="flex flex-row items-center space-x-4">
            <span>Change code theme:</span> <CodeTheme />
          </section>
        </section>

        <GiscusComments />

        <Footer />
      </Layout.Content>
    </Layout>
  );
}

export type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(
    params.slug,
    [
      "title",
      "date",
      "slug",
      "author",
      "content",
      "ogImage",
      "coverImage",
      "publishedAt",
      "summary",
      "tags",
    ],
    "posts"
  );
  const { html: content, readingTime } = await markdownToHtml(
    post.content || ""
  );

  return {
    props: {
      post: {
        ...post,
        slug: params.slug,
        content,
      },
      readingTime,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}
