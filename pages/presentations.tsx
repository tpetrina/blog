import { NextPage } from "next";

import { H1, H2 } from "../components/heading";
import Layout from "../components/layout";
import Navigation from "../components/navigation";
import Presentations from "../components/presentations/presentations";
import Videos from "../components/presentations/videos";

const PresentationsPage: NextPage = () => {
  return (
    <Layout>
      <Navigation />

      <main className="px-4">
        <H1>Presentations</H1>

        <H2>Youtube</H2>
        <Videos />

        <div className="h-[20px]"></div>

        <H2>Presentations</H2>
        <Presentations />
        
        <div className="h-[60px]"></div>
      </main>
    </Layout>
  );
};

export default PresentationsPage;
