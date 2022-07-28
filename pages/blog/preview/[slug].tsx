import Tags from "../../../components/tags";
import { getAllPosts, getPostBySlug } from "../../../lib/getPostBySlug";
import { markdownToHtml } from "../../../lib/markdownToHtml";

type Props = {
  post: any;
  readingTime: any;
};

export default function BlogPostPreviewPage(props: Props) {
  const { post } = props;

  return (
    <main className="flex flex-row w-full h-full bg-gray-50 text-gray-800 items-center px-20 py-12">
      <section className="flex flex-row w-full">
        <section className="space-y-8">
          <h1 className="text-5xl">{post.title}</h1>

          <section className="flex flex-col space-y-2">
            <p className="text-2xl">{post.summary}</p>
            <Tags tags={props.post.tags} className="text-xl" />
          </section>
        </section>
        <section className="ml-auto">
          <img
            className="rounded-full shadow-2xl"
            src="/me.png"
            alt="Profile picture"
            width={150}
            height={150}
          />
        </section>
      </section>
    </main>
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
