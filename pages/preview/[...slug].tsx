import Tags from "../../components/tags";
import { getAllMarkdownFilesFromFolder } from "../../lib/getKbArticles";
import { getPostByRelativePath } from "../../lib/getPostBySlug";
import { markdownToHtml } from "../../lib/markdownToHtml";

type Props = {
  post: any;
  readingTime: any;
};

export default function BlogPostPreviewPage(props: Props) {
  const { post } = props;

  return (
    <main className="preview flex flex-row w-full h-full items-center px-20 py-12">
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
    slug: string[];
  };
};

export async function getStaticProps({ params }: Params) {
  const post = await getPostByRelativePath(params.slug.join("/"), [
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
  ]);
  const { html: content, readingTime } = await markdownToHtml(
    post.content || ""
  );

  return {
    props: {
      post: {
        ...post,
        content,
      },
      readingTime,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllMarkdownFilesFromFolder(".");
  const paths = posts.map(({ relativePath }) => {
    return {
      params: {
        slug: relativePath.split("/").filter((x) => !!x && x !== "."),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
