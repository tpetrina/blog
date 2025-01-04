import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Giscus = dynamic(() => import("@giscus/react"), {
  ssr: false,
});

export default function GiscusComments() {
  const { theme } = useTheme();
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
        theme={theme}
        lang="en"
        loading="eager"
      />
    </>
  );
}
