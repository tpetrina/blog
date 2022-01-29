import Head from "next/head";
import React from "react";

export type LayoutProps = {
  className?: string;
};
export default function Layout(props: React.PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Head>
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
        <meta name="robots" content="follow, index" />
      </Head>
      <section className={`mx-auto max-w-2xl px-2 ${props.className ?? ""}`}>
        {props.children}
      </section>
    </>
  );
}
