import { SVGProps } from "react";

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  {
    name: "Facebook",
    href: "https://facebook.com/toni.petrina",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/tonipetrina1",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/tpetrina",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Mastodon",
    href: "https://hachyderm.io/@tpetrina",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill="currentColor"
          d="M20.94 14c-.28 1.41-2.44 2.96-4.97 3.26c-1.31.15-2.6.3-3.97.24c-2.25-.11-4-.54-4-.54v.62c.32 2.22 2.22 2.35 4.03 2.42c1.82.05 3.44-.46 3.44-.46l.08 1.65s-1.28.68-3.55.81c-1.25.07-2.81-.03-4.62-.5c-3.92-1.05-4.6-5.24-4.7-9.5l-.01-3.43c0-4.34 2.83-5.61 2.83-5.61C6.95 2.3 9.41 2 11.97 2h.06c2.56 0 5.02.3 6.47.96c0 0 2.83 1.27 2.83 5.61c0 0 .04 3.21-.39 5.43M18 8.91c0-1.08-.3-1.91-.85-2.56c-.56-.63-1.3-.96-2.23-.96c-1.06 0-1.87.41-2.42 1.23l-.5.88l-.5-.88c-.56-.82-1.36-1.23-2.43-1.23c-.92 0-1.66.33-2.23.96C6.29 7 6 7.83 6 8.91v5.26h2.1V9.06c0-1.06.45-1.62 1.36-1.62c1 0 1.5.65 1.5 1.93v2.79h2.07V9.37c0-1.28.5-1.93 1.51-1.93c.9 0 1.35.56 1.35 1.62v5.11H18V8.91Z"
        />
      </svg>
    ),
    rel: "me",
  },
];

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
              rel={!!item.rel ? item.rel : undefined}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-200">
            &copy; Toni Petrina
          </p>
        </div>
      </div>
    </footer>
  );
}
