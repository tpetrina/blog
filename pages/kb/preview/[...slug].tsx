/* eslint-disable @next/next/no-img-element */
import Tags from "../../../components/tags";
import { getAllKbFiles, getMarkdocFile } from "../../../lib/getKbArticles";

type Props = {
  post: any;
  readingTime: any;
};

export default function KbArticlePreviewPage(props: Props) {
  const { post } = props;

  return (
    <main className="preview flex flex-row w-full h-full items-center px-20 py-12">
      <section className="flex flex-row w-full h-full">
        <section className="space-y-8 self-center">
          <h1 className="text-5xl">{post.title}</h1>

          <section className="flex flex-col space-y-2">
            <p className="text-2xl">{post.summary}</p>
            <Tags tags={post.tags} className="text-xl" />
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
  const { data, content } = await getMarkdocFile(params.slug.join("/"));

  return {
    props: {
      post: {
        ...data,
        slug: params.slug,
        content: content,
      },
      readingTime: "0",
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllKbFiles();
  const paths = [
    ...posts.map(({ relativePath, folder }) => {
      return {
        params: {
          slug: [folder, ...relativePath.split("/").filter((x) => !!x)],
        },
      };
    }),
  ];

  return {
    paths,
    fallback: false,
  };
}
