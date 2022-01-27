import { remark } from "remark";
import html from "remark-html";

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
  const result = await remark()
    .use(fixRelativeImages, { absolutePath: "http://localhost:3000/blog/" })
    .use(html as unknown as any)
    .process(markdown);
  return result.toString();
}
