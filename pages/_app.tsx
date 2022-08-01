import "../styles/globals.css";
import "../styles/main.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Script from "next/script";

// import "./css/prism-themes/prism-shades-of-purple.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      
      <Script src="https://giscus.app/client.js"
        data-repo="tpetrina/blog"
        data-repo-id="R_kgDOGv3Ndw"
        data-category="Announcements"
        data-category-id="DIC_kwDOGv3Nd84CQjf0"
        data-mapping="og:title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async />
      {/*
      <script src="https://giscus.app/client.js"
        data-repo="tpetrina/blog"
        data-repo-id="R_kgDOGv3Ndw"
        data-category="Announcements"
        data-category-id="DIC_kwDOGv3Nd84CQjf0"
        data-mapping="og:title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
      */}
    </>
  );
}
export default MyApp;
