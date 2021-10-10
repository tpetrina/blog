import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav>Blog</nav>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
