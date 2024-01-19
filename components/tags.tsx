import cn from "../lib/cn";

export default function Tags({
  tags,
  className,
}: {
  tags: string | string[];
  className?: string;
}) {
  const arr = typeof tags === "string" ? [tags] : tags || [];

  return (
    <ul
      className={cn(
        "tags flex flex-row items-center space-x-2 text-xs font-mono",
        className
      )}
    >
      {(arr || []).map((t) => (
        <li key={t}>{`#${t}`}</li>
      ))}
    </ul>
  );
}
