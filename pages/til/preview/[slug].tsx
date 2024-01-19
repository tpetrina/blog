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
    <main className="flex flex-row w-full h-full items-center px-20 py-12 preview">
      <section className="flex flex-row w-full h-full">
        <section className="space-y-8 self-center">
          <h1 className="text-5xl">{post.title}</h1>

          <section className="flex flex-col space-y-2">
            <p className="text-2xl">{post.summary}</p>
            <Tags tags={props.post.tags} className="text-xl" />
          </section>
        </section>

        <section className="ml-auto self-start">
          <img
            className="rounded-full shadow-md shadow-black border-cyan-400 border-2"
            src="/me.png"
            alt="Profile picture"
            width={160}
            height={160}
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
