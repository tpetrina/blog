import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";

import cn from "../lib/cn";

export default function ActiveLink(
  props: React.PropsWithChildren<LinkProps> & {
    wrapper: React.ElementType;
    className?: string;
    activeClassName: string;
    title?: string;
  }
) {
  const router = useRouter();
  const {
    className,
    activeClassName,
    wrapper: Component = "section",
    ...rest
  } = props;

  return (
    <Component
      className={cn(
        className,
        router.asPath === rest.href ? activeClassName : ""
      )}
    >
      <Link {...rest} />
    </Component>
  );
}
