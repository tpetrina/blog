import { useRouter } from "next/router";
import ErrorPage from "next/error";
import React from "react";
import { getAllPosts, getPostBySlug } from "../../lib/getPostBySlug";
import { markdownToHtml } from "../../lib/markdownToHtml";
import Navigation from "../../components/navigation";
import Head from "next/head";
import Image from "next/image";

type Props = {
  post: any;
};

export default function BlogPostPage(props: Props) {
  const { post } = props;

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <section className="mx-auto max-w-2xl">
      <Head>
        <title>
          {post.title} | {post.publishedAt}
        </title>
      </Head>

      <Navigation />

      <article className="px-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>

        <p className="flex flex-row items-center my-4">
          <span className="mr-2">
            <Image
              className="rounded-full"
              src="/me.png"
              alt="Profile picture"
              width={32}
              height={32}
            />
          </span>
          Toni Petrina | {post.publishedAt}
        </p>

        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </section>
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

  console.log({ post, content });

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
