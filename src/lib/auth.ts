import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        // console.log(token)
        session.user.id = token.sub as string
        session.user.name = token.name
        session.user.image = token.picture
        session.user.email = token.email
      }

      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};



