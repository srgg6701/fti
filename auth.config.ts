// FIXME: remove if it is not in use
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
} satisfies NextAuthConfig;
