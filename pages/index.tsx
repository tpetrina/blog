import type { NextPage } from "next";
import Image from "next/image";

import Footer from "../components/footer";
import Layout from "../components/layout";
import Navigation from "../components/navigation";

const Home: NextPage = () => {
  return (
    <Layout>
      <Navigation />

      <Layout.Content>
        <main className="px-4 flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16">
          <section className="flex flex-col-reverse sm:flex-row w-full">
            <section className="flex flex-col mr-8">
              <h1 className="font-bold text-3xl md:text-5xl mt-4 mr-4 mb-2 text-black dark:text-white">
                Toni Petrina
              </h1>
              <h2 className="mb-4 text-gray-800 dark:text-gray-100 font-light">
                Lead Site Reliability Engineer @ Visma e-conomic a/s
              </h2>
              <p className="text-gray-700 dark:text-gray-100">
                Hi, I am Toni and welcome to my blog/scratchpad/digital garden.
                Some of the writings will be chronologically added as blog
                posts, but some will be notes that are permanently curated.
              </p>

              <h3 className="mt-8 mb-2 text-xl font-light">What do I do?</h3>
              <p>
                My day job as a Lead SRE means writing YAML, Terraform, writing
                pipelines, checking infrastructure, and reading logs. A lot of
                logs.
              </p>

              <h3 className="mt-8 mb-2 text-xl font-light">
                What else do I do?
              </h3>
              <p>
                My hobbies include writing more code as a &quot;proper&quot;
                full-stack engineer from database to frontend, including mobile.
                Check out some of my projects at{" "}
                <a
                  className="text-blue-400 hover:underline"
                  href="https://massivepixel.co"
                  target="_blank"
                  rel="noreferrer"
                >
                  Massive Pixel
                </a>
                .
              </p>

              <h3 className="mt-8 mb-2 text-xl font-light">
                Projects I am working on:
              </h3>

              <section>
                <ul className="list-disc list-inside">
                  <li>
                    <a
                      className="text-blue-400 hover:underline"
                      href="https://efplayground.io"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Entity Framework Playground
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blue-400 hover:underline"
                      href="https://gigsheets.app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GigSheets - simplifying touring musicians&apos; lives
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blue-400 hover:underline"
                      href="https://darchie.io"
                    >
                      Darchie - ZeroOps platform for .NET applications
                    </a>
                  </li>
                </ul>
              </section>

              <p className="mt-8">
                This blog is open source and can be found at{" "}
                <a
                  className="text-blue-400 hover:underline"
                  href="https://github.com/tpetrina/blog"
                  target="_blank"
                  rel="noreferrer"
                >
                  tpetrina/blog
                </a>
              </p>

              <h3 className="mt-8 mb-2 text-xl font-light">
                Do I do anything else outside of computers?
              </h3>
              <p>
                I play some sports on a weekly basis and am an amateur actor.
              </p>
            </section>

            <section className="min-w-[150px] w-[150px] h-[150px]">
              <Image
                className="rounded-full border-[1px] border-[#eae1cb] shadow-lg shadow-[#171717]"
                src="/me.png"
                alt="Profile picture"
                width={150}
                height={150}
              />
            </section>
          </section>
        </main>

        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default Home;
