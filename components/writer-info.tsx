import Tags from "./tags";

export default function WriterInfo({
  post: { publishedAt, tags },
  readingTime,
}: any) {
  console.log("WriterInfo", { publishedAt, tags, readingTime });

  return (
    <div className="flex flex-row items-center space-x-2">
      <span className="mr-2 flex flex-row items-center">
        <img
          className="rounded-full"
          src="/me.png"
          alt="Profile picture"
          width={32}
          height={32}
        />
      </span>

      <span className="flex flex-col space-y-1">
        Toni Petrina
        <section className="flex flex-row items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
          <span>Published on {publishedAt}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </section>
        <Tags tags={tags} />
      </span>
    </div>
  );
}
