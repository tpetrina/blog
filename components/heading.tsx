import React from "react";

type HeadingProps = {
  className?: string;
};
const styles = {
  h1: "font-bold text-3xl md:text-5xl mt-4 mr-4 mb-2 text-gray-100 dark:text-white",
  h2: "font-bold text-2xl md:text-4xl mt-4 mr-4 mb-2 text-gray-100 dark:text-white",
};

export function H1(props: React.PropsWithChildren<HeadingProps>) {
  return <h1 className={`${styles.h1}`}>{props.children}</h1>;
}

export function H2(props: React.PropsWithChildren<HeadingProps>) {
  return <h2 className={`${styles.h2}`}>{props.children}</h2>;
}
