import Link from "next/link";

import cn from "../lib/cn";

export default function LinksList(props: {
  files: {
    modifiedOn: string;
    relativePath: string;
    relativeUrl: string | undefined;
    fullPath: string;
    data: {
      [key: string]: any;
    };
  }[];
}) {
  return (
    <ul className="flex flex-col gap-4">
      {props.files.map((post, index) => {
        const url = post.relativeUrl ?? post.relativePath;
        return (
          <li key={url}>
            <Link
              href={url}
              className={cn(
                "w-full flex flex-col hover:border-blue-200 transition-all hover:shadow-lg hover:bg-blue-200/10 px-4 py-3 rounded-md",
                "border-transparent border-l-[4px] -ml-4",
                "text-gray-200"
              )}
            >
              <section className="flex flex-col sm:flex-row w-full justify-between">
                <h3 className="text-xl">
                  {post.data.title ?? post.relativePath}
                </h3>
                <p className="text-sm">
                  {post.modifiedOn || post.data.publishedAt}
                </p>
              </section>
              <p>{post.data.summary}</p>
            </Link>
            {index !== props.files.length - 1 && (
              <section className="border-b border-blue-400/20 pb-4 mr-4"></section>
            )}
          </li>
        );
      })}
    </ul>
  );
}
