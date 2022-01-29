import React from "react";

export type LayoutProps = {
  className?: string;
};
export default function Layout(props: React.PropsWithChildren<LayoutProps>) {
  return (
    <section className={`mx-auto max-w-2xl px-2 ${props.className ?? ""}`}>
      {props.children}
    </section>
  );
}
