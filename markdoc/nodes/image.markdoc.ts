import { nodes } from "@markdoc/markdoc";
import Image from "../../components/image";

export default {
  ...nodes.image,
  render: Image,
};
