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
  callbacks: {
    async jwt({ token, account }) {
      // При авторизации через Google сохраняем id_token
      if (account?.provider === "google" && account.id_token) {
        (token as any).googleIdToken = account.id_token;
      }
      return token;
    },

    async session({ session, token }) {
      // Чтобы session тоже имела доступ к этому токену (если нужно)
      (session as any).googleIdToken = (token as any).googleIdToken;
      return session;
    },
  },
  // or all params together:
  //...authConfig,
  // session: { strategy: "jwt" },
  // callbacks: { authorized: () => true },
});
