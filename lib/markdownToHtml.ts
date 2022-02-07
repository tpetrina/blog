import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import readingTime from "remark-reading-time";
import remarkRehype from "remark-rehype";
import visit from "unist-util-visit";

function fixRelativeImages(options: any) {
  function visitor(node: any) {
    // Sanitize URL by removing leading `/`
    const relativeUrl = node.url.replace(/^\//, "");

    node.url = new URL(relativeUrl, options.absolutePath).href;
  }

  function transform(tree: any) {
    if (options && options.absolutePath) {
      visit(tree, "image", visitor);
    } else {
      throw Error("Missing required `absolutePath` option.");
    }
  }

  return transform;
}

export async function markdownToHtml(markdown: string) {
  // @ts-ignore
  const result = await remark()
    // .use(fixRelativeImages, { absolutePath: "http://localhost:3000/blog/" })
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .use(readingTime)
    .process(markdown);

  return {
    html: result.toString(),
    readingTime: (result.data.readingTime as any).text,
  };
}
