import Link from "next/link";

import cn from "../lib/cn";

export default function LinksList(props: {
  files: {
    modifiedOn: string;
    relativePath: string;
    fullPath: string;
    data: {
      [key: string]: any;
    };
  }[];
}) {
  return (
    <ul className="flex flex-col gap-4">
      {props.files.map((post, index) => (
        <li key={post.relativePath}>
          <Link
            href={post.relativePath}
            className={cn(
              "w-full flex flex-col hover:border-blue-200 transition-all hover:shadow-lg hover:bg-blue-200/10 px-4 py-3 rounded-md",
              "border-transparent border-l-[4px] -ml-4"
            )}
          >
            <section className="flex flex-col sm:flex-row w-full justify-between">
              <h3 className="text-xl">
                {post.data.title ?? post.relativePath}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {post.modifiedOn || post.data.publishedAt}
              </p>
            </section>
            <p>{post.data.summary}</p>
          </Link>
          {index !== props.files.length - 1 && (
            <section className="border-b border-blue-400/20 pb-4 mr-4"></section>
          )}
        </li>
      ))}
    </ul>
  );
}
