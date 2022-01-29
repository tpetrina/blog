import "../styles/globals.css";
import "../styles/main.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import "./css/prism-themes/prism-shades-of-purple.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
