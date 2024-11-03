import { join } from "path";
import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllKbFiles } from "../../lib/getKbArticles";
import { formatDate } from "date-fns";
import { H1 } from "../../components/heading";
import cn from "../../lib/cn";

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <Navigation />

      <Layout.Content asChild>
        <main className="">
          <H1>Knowledge base</H1>

          <section className="h-[20px]" />

          <ul className="space-y-2 my-2">
            {props.files.map((post) => (
              <li key={post.relativePath}>
                <Link
                  href={join("kb", post.relativePath.replace(".md", ""))}
                  className={cn(
                    "w-full flex flex-col hover:border-blue-200 transition-all hover:shadow-lg",
                    "border-transparent border-l-[4px] -ml-4 pl-4  "
                  )}
                >
                  <section className="flex flex-col sm:flex-row w-full justify-between">
                    <h3 className="text-xl">
                      {post.data.title ?? post.relativePath}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {post.modifiedOn || post.data.publishedAt}
                    </p>
                  </section>
                  <p>{post.data.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
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
        modifiedOn: formatDate(kb.modifiedOn, "yyyy-MM-dd"),
      })),
    },
  };
}
