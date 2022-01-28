import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ActiveLink from "../components/active-link";
import Footer from "../components/footer";

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <Head>
        <title>Toni Petrina's digital garden</title>
        <meta name="description" content="Toni Petrina's digital garden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="my-8 px-8">
        <ul className="flex flex-row items-center space-x-8">
          <ActiveLink
            wrapper="li"
            activeClassName="font-bold hover:underline underline-offset-4"
            href="/"
          >
            Home
          </ActiveLink>

          {/* <ActiveLink
            wrapper="li"
            activeClassName="underline underline-offset-4"
            href="/blog"
          >
            Blog
          </ActiveLink> */}
        </ul>
      </nav>

      <main className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16 mx-8">
        <section className="flex flex-col-reverse sm:flex-row w-full">
          <section className="flex flex-col mr-8">
            <h1 className="font-bold text-3xl mt-4 mr-4 mb-2 text-black dark:text-white">
              Toni Petrina
            </h1>
            <h2 className="mb-4">
              Site Reliability Engineer @ Visma e-conomic a/s
            </h2>
            <p>
              Hi, I am Toni and welcome to my blog/scratchpad/digital garden.
              Some of the writings will be chronologically added as blog posts,
              but some will be permanently curated.
            </p>
          </section>
          <section className="min-w-[150px] w-[150px] h-[150px]">
            <Image
              className="rounded-full"
              src="/me.png"
              alt="Profile picture"
              width={150}
              height={150}
            />
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
