import { nodes } from "@markdoc/markdoc";
import Link from "../../components/link.tsx";

export default {
  ...nodes.link,
  render: Link,
};
