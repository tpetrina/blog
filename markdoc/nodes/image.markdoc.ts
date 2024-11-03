import { nodes } from "@markdoc/markdoc";
import Image from "../../components/image.tsx";

export default {
  ...nodes.image,
  render: Image,
};
