import Prism from "prismjs";
import "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-yaml";
import { PropsWithChildren, useEffect, useRef } from "react";

export function CodeBlock({
  children,
  "data-language": language,
}: PropsWithChildren<{ "data-language": string }>) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current, false, () => {});
    }
  }, [children]);

  return (
    <div className="code" aria-live="polite">
      <pre ref={ref} className={`language-${language}`}>
        {children}
      </pre>
    </div>
  );
}
