import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
import { getAllPosts, getPostBySlug } from "../../lib/getPostBySlug";
import { markdownToHtml } from "../../lib/markdownToHtml";

type Props = {
  post: any;
};

export default function BlogPostPage(props: Props) {
  const { post } = props;

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const html = post.content;

  return (
    <Layout>
      <Head>
        <title>
          {post.title} | {post.publishedAt}
        </title>
      </Head>

      <Navigation />

      <article className="px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="flex flex-row items-center my-4">
          <span className="mr-2 flex flex-row items-center">
            <img
              className="rounded-full"
              src="/me.png"
              alt="Profile picture"
              width={32}
              height={32}
            />
          </span>
          Toni Petrina |
          <em className="ml-1 text-sm">Published on {post.publishedAt}</em>
        </p>

        <div
          className="prose dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </Layout>
  );
}

export type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "publishedAt",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        slug: params.slug,
        content,
      },
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
