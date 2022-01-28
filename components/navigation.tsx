import ActiveLink from "./active-link";

export default function Navigation() {
  return (
    <nav className="my-8 px-8">
      <ul className="flex flex-row items-center space-x-8">
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
      </ul>
    </nav>
  );
}
