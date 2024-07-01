import { nodes } from "@markdoc/markdoc";
import { CodeBlock } from "../../components/code-block";

export const fence = {
  render: CodeBlock,
  attributes: nodes.fence.attributes,
};
