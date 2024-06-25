import NextAuth from "next-auth/next";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import CredentialProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

export const dynamic = "force-dynamic";

const handler = NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectToDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.accountType = token.type;
        session.user.name = token.name;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.type = user.accountType;
        token.name = user.name;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
