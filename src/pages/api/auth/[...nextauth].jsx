import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function findUserByCredentials(credentials) {
  try {
    await client.connect();
    const users = client.db(process.env.DB_NAME).collection("users");
    const user = await users.findOne({
      username: credentials.username,
      password: credentials.password,
    });

    return user;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return null;
  } finally {
    await client.close();
  }
}

export const authOptions = {
  session: { jwt: true },
  secret: process.env.NEXTAUTH_URL,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await findUserByCredentials(credentials);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};
export default NextAuth(authOptions);
