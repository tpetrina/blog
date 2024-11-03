import ActiveLink from "./active-link";
import ChangeThemeButton from "./change-theme-button";

export default function Navigation() {
  return (
    <nav className="py-4 px-4 flex flex-row items-center shadow-md fixed left-0 right-0 bg-surface-flat">
      <section className="max-w-4xl px-4 mx-auto flex flex-row items-center justify-between w-full">
        <ul className="flex flex-row items-center gap-8">
          <ActiveLink
            wrapper="li"
            activeClassName="font-bold"
            className="hover:underline underline-offset-4"
            href="/"
          >
            Home
          </ActiveLink>

          <ActiveLink
            wrapper="li"
            activeClassName="font-bold"
            className="hover:underline underline-offset-4"
            href="/blog"
          >
            Blog
          </ActiveLink>
          <ActiveLink
            wrapper="li"
            activeClassName="font-bold"
            className="hover:underline underline-offset-4"
            href="/til"
            title="Today I've learned"
          >
            TIL
          </ActiveLink>
          <ActiveLink
            wrapper="li"
            activeClassName="font-bold"
            className="hover:underline underline-offset-4"
            href="/kb"
            title="Knowledge base"
          >
            KB
          </ActiveLink>

          <ActiveLink
            wrapper="li"
            activeClassName="font-bold"
            className="hover:underline underline-offset-4"
            href="/presentations"
          >
            Presentations
          </ActiveLink>
        </ul>

        <section className="ml-auto">
          <ChangeThemeButton />
        </section>
      </section>
    </nav>
  );
}
