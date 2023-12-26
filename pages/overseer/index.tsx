import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "../../components/layout";

export default function AdminPage() {
  return (
    <Layout>
      <h1 className="text-3xl">Admin</h1>

      <LoginButton />
    </Layout>
  );
}

function LoginButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
