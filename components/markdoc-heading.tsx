import * as React from "react";
import cn from "../lib/cn";

export function Heading({
  id = "",
  level = 1,
  children,
  className,
}: React.PropsWithChildren<{
  id?: string;
  level?: number;
  className?: string;
}>) {
  return React.createElement(
    `h${level}`,
    {
      id,
      className: cn("heading text-3xl md:text-5xl font-bold mb-4 text-white", className),
    },
    children
  );
}
