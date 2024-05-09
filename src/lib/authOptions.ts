import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email Address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) throw new Error("Seems your email is incorrect");

        if (!credentials?.password)
          throw new Error("Please provide a password");

        // bcrypt not working
        // const isPasswordCorrect = await bcrypt.compare(
        //   credentials?.password,
        //   user.password
        // );

        const isPasswordCorrect = credentials?.password === user.password;

        if (!isPasswordCorrect) throw new Error("Password is incorrect");

        if (!user.emailVerified)
          throw new Error("Please verify your email first");

        const { password, ...userWithoutPass } = user;

        return userWithoutPass;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
