import NextLink from "next/link";

type LinkProps = {
  href: string;
  title?: string;
};

export default function Link({ href, ...props }: LinkProps) {
  const fixedHref = href.toString().replace(".md", "");

  return <NextLink href={fixedHref} {...props} />;
}
