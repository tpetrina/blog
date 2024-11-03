import { H1 } from "../components/heading";
import Layout from "../components/layout";
import Navigation from "../components/navigation";

export default function NotFoundPage() {
  return (
    <Layout>
      <Navigation />

      <Layout.Content>
        <div className="px-4">
          <H1>Uh-oh, no such page! :(</H1>

          <p>Nothing to see here.</p>
        </div>
      </Layout.Content>
    </Layout>
  );
}
