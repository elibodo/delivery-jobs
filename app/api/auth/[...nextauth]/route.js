import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import Employer from "@models/employers";
import { connectToDB } from "@utils/database";
import CredentialProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
          const employer = await Employer.findOne({ email });
          if (!employer) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(
            password,
            employer.password
          );
          if (!passwordsMatch) {
            return null;
          }
          return true;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
