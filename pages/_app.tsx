import "../styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";

import "./css/prism-themes/prism-shades-of-purple.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
