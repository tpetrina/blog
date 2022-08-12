import ErrorPage from "next/error";
import { useRouter } from "next/router";
import React from "react";

import CodeTheme from "../../components/code-theme";
import Footer from "../../components/footer";
import GiscusComments from "../../components/giscus";
import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
import Tags from "../../components/tags";
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

      <article className="blog px-4">
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
          <section className="flex flex-col space-y-1">
            Toni Petrina
            <section className="flex flex-row items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
              <span>Published on {post.publishedAt}</span>
              <span>•</span>
              <span>{props.readingTime}</span>
            </section>
            <Tags tags={props.post.tags} />
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

      <GiscusComments />

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
