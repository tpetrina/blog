import { InferGetStaticPropsType } from "next";
import Layout from "../../../components/layout";
import Navigation from "../../../components/navigation";
import { getAllKbFiles } from "../../../lib/getKbArticles";

export default function Previews(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <Navigation />

      <ul>
        {props.paths.map((path) => {
          const relativeUrl = path.params.slug.join("/");
          return (
            <li key={relativeUrl}>
              <a target="_blank" href={`/kb/preview/${relativeUrl}`}>
                {relativeUrl}
              </a>
            </li>
          );
        })}
      </ul>

      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllKbFiles();
  const paths = [
    ...posts.map(({ relativePath }) => {
      return {
        params: {
          slug: relativePath.split("/").filter((x) => !!x),
        },
      };
    }),
    {
      params: {
        slug: [""],
      },
    },
  ];

  return {
    props: {
      paths,
    },
  };
}
