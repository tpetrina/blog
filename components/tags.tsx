export default function Tags({ tags }: { tags: string | string[] }) {
  const arr = typeof tags === "string" ? [tags] : tags || [];

  return (
    <ul className="flex flex-row items-center space-x-2 text-xs font-mono text-gray-500">
      {(arr || []).map((t) => (
        <li key={t}>{`#${t}`}</li>
      ))}
    </ul>
  );
}
