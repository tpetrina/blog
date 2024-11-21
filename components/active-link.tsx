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
    exact?: boolean;
  }
) {
  const router = useRouter();
  const {
    className,
    activeClassName,
    wrapper: Component = "section",
    exact,
    ...rest
  } = props;

  const isActive = exact
    ? router.asPath === rest.href.toString()
    : router.asPath.startsWith(rest.href.toString());

  return (
    <Component className={cn(className, isActive ? activeClassName : "")}>
      <Link {...rest} />
    </Component>
  );
}
