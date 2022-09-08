import "../styles/globals.css";
import "../styles/main.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
