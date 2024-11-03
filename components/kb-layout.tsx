import { PropsWithChildren } from "react";
import Layout from "./layout";
import Navigation from "./navigation";
import CodeTheme from "./code-theme";
import GiscusComments from "./giscus";
import { MarkdocNextJsPageProps } from "@markdoc/next.js";
import WriterInfo from "./writer-info";

export default function KBLayout({
  children,
  ...rest
}: PropsWithChildren<{}> & MarkdocNextJsPageProps) {
  const title = rest.markdoc?.frontmatter?.title ?? "";
  const summary = rest.markdoc?.frontmatter?.summary ?? "";
  const image = rest.markdoc?.file.path.replace("kb", "static/images") + ".png";

  return (
    <>
      <Layout
        title={`${title}`}
        description={summary}
        image={image}
        className="mb-20"
      >
        <Navigation />

        <Layout.Content>
          <header>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
            {summary && (
              <p className="border-l-[4px] border-blue-400 pl-2">{summary}</p>
            )}
          </header>

          <section className="my-4 ">
            <WriterInfo
              post={{
                publishedAt: rest.markdoc?.frontmatter.publishedAt ?? "",
                tags: rest.markdoc?.frontmatter.tags ?? [],
              }}
              readingTime={null}
            />
          </section>

          <main className="prose dark:prose-dark max-w-none">{children}</main>

          <section className="flex flex-col p-4 space-y-2">
            <hr className="border border-1 border-gray-300 dark:border-gray-600" />

            <section className="flex flex-row items-center space-x-4">
              <span>Change code theme:</span> <CodeTheme />
            </section>
          </section>

          <GiscusComments />
        </Layout.Content>
      </Layout>
    </>
  );
}
