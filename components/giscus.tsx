import Giscus from "@giscus/react";

export default function GiscusComments() {
  return (
    <>
      <section className="giscus" />

      <Giscus
        repo="tpetrina/blog-comments"
        repoId="R_kgDOHzz59Q"
        category="Announcements"
        categoryId="DIC_kwDOHzz59c4CQxRZ"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="en"
        loading="eager"
      />
    </>
  );
}
