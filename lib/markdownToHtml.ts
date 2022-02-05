import { remark } from "remark";
import html from "remark-html";
import readingTime from "remark-reading-time";
import visit from "unist-util-visit";
import prism from "remark-prism";

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
  const result = await remark()
    .use(fixRelativeImages, { absolutePath: "http://localhost:3000/blog/" })
    // @ts-ignore
    .use(html as unknown as any, {
      sanitize: false,
    })
    .use(prism as unknown as any)
    .use(readingTime as unknown as any)
    .process(markdown);

  return {
    html: result.toString(),
    readingTime: (result.data.readingTime as any).text,
  };
}
