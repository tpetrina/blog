type Parameter = string | undefined | null;

export default function cn(...classes: Parameter[]): string | undefined {
  if (classes.length === 0) {
    return undefined;
  }
  if (classes.length === 1) {
    return classes[0] || undefined;
  }

  const parts = classes
    .filter((c) => !!c)
    .join(" ")
    .split(" ")
    .filter((c) => !!c);

  const seen = new Set<string>();
  for (let i = parts.length - 1; i >= 0; i--) {
    const c = parts[i];
    if (!c) {
      continue;
    }
    const index = c.lastIndexOf("-");
    if (index !== -1) {
      const prefix = c.substring(0, index);
      if (seen.has(prefix)) {
        parts[i] = "";
      } else {
        seen.add(prefix);
      }
    }
  }

  console.log({ parts, seen });

  return parts.join(" ");
}
