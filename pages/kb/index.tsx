import { formatDate } from "date-fns";
import { InferGetStaticPropsType } from "next";

import { H1 } from "../../components/heading";
import Layout from "../../components/layout";
import LinksList from "../../components/links-list";
import Navigation from "../../components/navigation";
import { getAllKbFiles } from "../../lib/getKbArticles";

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <Navigation />

      <Layout.Content asChild>
        <main className="px-4">
          <H1>Knowledge base</H1>
          <section className="h-[20px]" />
          <LinksList files={props.files} />
        </main>
      </Layout.Content>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      files: (await getAllKbFiles()).map((kb) => ({
        ...kb,
        relativePath: `/${kb.folder}/${kb.relativePath.replace(".md", "")}`,
        modifiedOn: formatDate(kb.modifiedOn, "yyyy-MM-dd"),
      })),
    },
  };
}
