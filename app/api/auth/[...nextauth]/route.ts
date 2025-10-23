import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  debug: true, // временно
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("\x1b[34m%s\x1b[0m", "REDIRECT callback:", { url, baseUrl });

      const u = new URL(url, baseUrl);

      // если нас тянет на /login?next=..., уводим на целевую страницу
      if (u.pathname === "/login") {
        const next = u.searchParams.get("next") || "/";

        console.log("/login", { url, baseUrl, next });

        return `${baseUrl}${next}`;
      }
      console.log("!login", { url, baseUrl });
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
