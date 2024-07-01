import { Config, Node, RenderableTreeNode, Tag } from "@markdoc/markdoc";
import { Heading } from "../../components/markdoc-heading";

function generateID(
  children: RenderableTreeNode[],
  attributes: Record<string, any>
) {
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }

  return children
    .filter((child) => typeof child === "string")
    .join(" ")
    .replace(/[?]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export const heading = {
  render: Heading,
  children: ["inline"],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = generateID(children, attributes);

    return new Tag(
      // TODO: figure out type
      this.render as unknown as any,
      {
        ...attributes,
        id,
      },
      children
    );
  },
};
