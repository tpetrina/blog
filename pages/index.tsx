import Image from "next/image";

import Footer from "../components/footer";
import Layout from "../components/layout";
import Navigation from "../components/navigation";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <Navigation />

      <main className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16 px-4">
        <section className="flex flex-col-reverse sm:flex-row w-full">
          <section className="flex flex-col mr-8">
            <h1 className="font-bold text-3xl md:text-5xl mt-4 mr-4 mb-2 text-black dark:text-white">
              Toni Petrina
            </h1>
            <h2 className="mb-4 text-gray-800 dark:text-gray-100">
              Site Reliability Engineer @ Visma e-conomic a/s
            </h2>
            <p className="text-gray-700 dark:text-gray-100">
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
    </Layout>
  );
};

export default Home;
