type ImageProps = {
  src: string;
  alt?: string;
  title?: string;
};

export default function Image({ src, ...props }: ImageProps) {
  // Fix src and remove everything before public
  const fixedSrc = src.substring(src.indexOf("public") + "public".length);

  return <img src={fixedSrc} {...props} />;
}
