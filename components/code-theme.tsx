import Head from "next/head";
import { useState } from "react";

export default function CodeTheme() {
  const [theme, setTheme] = useState("shadesofpurple");

  function updateTheme(newTheme: string) {
    setTheme(newTheme);
  }

  const themeUrl =
    theme === "shadesofpurple"
      ? `/static/prism-themes/prism-shades-of-purple.css`
      : `https://unpkg.com/prismjs@0.0.1/themes/prism-${theme}.css`;

  return (
    <>
      <Head>
        {/* Prism themes */}
        <link
          rel="preload"
          href="/static/prism-themes/prism-shades-of-purple.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-coy.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          as="script"
        />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-funky.css"
          as="script"
        />
        <link href={themeUrl} rel="stylesheet" />
      </Head>

      <section className="flex flex-row items-center relative">
        <select
          onChange={(e) => updateTheme(e.target.value)}
          value={theme}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="shadesofpurple">Shades of Purple</option>
          <option value="okaidia">Okaidia</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="coy">Coy</option>
          <option value="funky">Funky</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </section>
    </>
  );
}
