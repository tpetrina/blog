import ErrorPage from "next/error";
import { useRouter } from "next/router";
import React from "react";

import CodeTheme from "../../components/code-theme";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
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
    <Layout title={`${post.title}`} description={post.summary}>
      <Navigation />

      <article className="px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="flex flex-row items-center my-4 space-x-2">
          <span className="mr-2 flex flex-row items-center">
            <img
              className="rounded-full"
              src="/me.png"
              alt="Profile picture"
              width={32}
              height={32}
            />
          </span>
          <section className="flex flex-col">
            Toni Petrina
            <section className="flex flex-row items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
              <span>Published on {post.publishedAt}</span>
              <span>•</span>
              <span>{props.readingTime}</span>
            </section>
          </section>
        </p>

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

      <Footer />
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
