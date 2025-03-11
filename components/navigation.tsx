import cn from "../lib/cn";
import ActiveLink from "./active-link";
import ChangeThemeButton from "./change-theme-button";

const className = cn(
  "h-full hover:border-b-blue-400/20 border-b border-b-transparent flex flex-row items-center [&>*]:flex-1 [&>*]:text-center px-2",
  "text-white"
);
const activeClassName = "border-b-blue-400";

export default function Navigation() {
  return (
    <nav className="px-4 flex flex-row shadow-md fixed left-0 right-0 bg-surface-flat">
      <section className="max-w-4xl px-4 mx-auto flex flex-row items-center justify-between w-full">
        <ul className="grid grid-cols-6 h-full">
          <ActiveLink
            wrapper="li"
            activeClassName={activeClassName}
            className={className}
            href="/"
            exact
          >
            Home
          </ActiveLink>

          <ActiveLink
            wrapper="li"
            activeClassName={activeClassName}
            className={className}
            href="/blog"
          >
            Blog
          </ActiveLink>
          <ActiveLink
            wrapper="li"
            activeClassName={activeClassName}
            className={className}
            href="/til"
            title="Today I've learned"
          >
            TIL
          </ActiveLink>
          <ActiveLink
            wrapper="li"
            activeClassName={activeClassName}
            className={className}
            href="/kb"
            title="Knowledge base"
          >
            KB
          </ActiveLink>

          <ActiveLink
            wrapper="li"
            activeClassName={activeClassName}
            className={className}
            href="/presentations"
          >
            Presentations
          </ActiveLink>
        </ul>

        <section className="ml-auto py-2">
          <ChangeThemeButton />
        </section>
      </section>
    </nav>
  );
}
