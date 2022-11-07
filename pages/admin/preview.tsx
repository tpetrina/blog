import Markdoc from "@markdoc/markdoc";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";

export default function PreviewPage() {
  const [content, setContent] = useState(null);
  const ref = useRef();

  useEffect(() => {
    fetch(`/api/preview`, { headers: { Accept: "application/json" } })
      .then((r) => r.json())
      .then((r) => setContent(r));
  }, []);

  if (!content) {
    return (
      <Layout>
        <h1 className="font-bold text-3xl md:text-5xl mt-4 mr-4 mb-2 text-black dark:text-white">
          Preview
        </h1>

        <p>Loading...</p>
      </Layout>
    );
  }

  const components = {};
  const preview = Markdoc.renderers.react(content, React, { components });

  function doIt() {
    fetch(`/api/preview`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: ref.current?.value ?? "",
    })
      .then((r) => r.json())
      .then((r) => setContent(r));
  }

  return (
    <Layout>
      <h1 className="font-bold text-3xl md:text-5xl mt-4 mr-4 mb-2 text-black dark:text-white">
        Preview
      </h1>

      <button onClick={doIt}>Do it!</button>

      <div className="grid grid-cols-2">
        <textarea ref={ref} className="w-full">
          # Hello
        </textarea>
        <div className="prose dark:prose-dark max-w-none">{preview}</div>
      </div>
    </Layout>
  );
}
