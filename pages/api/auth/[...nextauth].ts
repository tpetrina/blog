import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "tpetrina" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Logging in with credentials...");

        if (
          credentials?.username !== process.env.CREDENTIALS_USERNAME &&
          credentials?.password !== process.env.CREDENTIALS_PASSWORD
        ) {
          console.error("Invalid credentials");
          return null;
        }

        console.log("Logged in!");

        return {
          id: 1,
          username: "tpetrina",
          email: "admin@tpetrina.com",
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
