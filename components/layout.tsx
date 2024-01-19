import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export type LayoutProps = {
  className?: string;
};

export type MetaProps = {
  description?: string;
  type?: "website";
  title?: string;
  image?: string;
};

const default_image = `https://tpetrina.com/static/images/banner.png`;

export default function Layout(
  props: React.PropsWithChildren<LayoutProps & MetaProps>
) {
  const router = useRouter();
  const {
    title = "Toni Petrina's digital garden",
    description = "A small corner of the internet reserved for never ending discovery of new stuff",
    type = "website",
    image = default_image,
  } = props;
  const url = `https://tpetrina.com${router.asPath}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fixImageUrl(image)} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="tpetrina.com" />
        <meta name="twitter:site" content="@tonipetrina1" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fixImageUrl(image)} />

        {/* LinkedIn */}
        <meta name="author" content="Toni Petrina" />
      </Head>

      <section className={`mx-auto max-w-3xl px-2 ${props.className ?? ""}`}>
        {props.children}
      </section>
    </>
  );
}

function fixImageUrl(url: string) {
  if (url.startsWith("https://tpetrina.com")) return url;

  if (url.startsWith("/")) {
    return "https://tpetrina.com" + url;
  }

  return "https://tpetrina.com" + "/" + url;
}
