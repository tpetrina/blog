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
  readingTime: any;
};

export default function TodayILearnedPage(props: Props) {
  const { post } = props;

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const html = post.content;

  return (
    <Layout title={`${post.title}`}>
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
            <section className="flex flex-row items-center space-x-1 text-sm text-gray-700">
              <span>Published on {post.publishedAt}</span>
              <span>•</span>
              <span>{props.readingTime}</span>
            </section>
          </section>
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
    ],
    "til"
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
  const posts = getAllPosts(["slug"], "til");

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
