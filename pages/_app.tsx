import "../styles/globals.css";
import "../styles/main.css";

import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import KBLayout from "../components/kb-layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  if (!!pageProps.markdoc) {
    return (
      <>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <KBLayout markdoc={pageProps.markdoc} >
              <Component {...pageProps} markdoc={pageProps.markdoc} />
            </KBLayout>
          </ThemeProvider>
        </SessionProvider>
      </>
    );
  }

  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
export default MyApp;
