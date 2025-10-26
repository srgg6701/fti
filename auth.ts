import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
//import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/login" },
  providers: [
    Google({
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  // or all params together:
  //...authConfig,
  // session: { strategy: "jwt" },
  // callbacks: { authorized: () => true },
});
