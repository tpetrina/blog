import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <Head>
        <title>Toni Petrina's digital garden</title>
        <meta name="description" content="Toni Petrina's digital garden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="my-4">
        <ul>
          <Link href="/">Home</Link>
        </ul>
      </nav>

      <main className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16">
        <section className="flex flex-row w-full">
          <section className="flex flex-col">
            <h1 className="font-bold text-3xl mt-4 mr-4 text-black dark:text-white">
              Toni Petrina
            </h1>
            <p>Site Reliability Engineer @ Visma e-conomic a/s</p>
          </section>
          <section className="ml-auto">
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
