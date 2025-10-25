import NextAuth, { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const API_BASE = process.env.EXTERNAL_API_BASE ?? "https://api.fti-trade.com";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      // важно: нам нужен id_token
      authorization: { params: { prompt: "consent", access_type: "offline" } },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    /**
     * Первый заход после Google: в jwt приходит account/profile.
     * Здесь 1 раз обмениваем Google id_token на собственный JWT внешнего API
     * и кладём его в token.jwtToken. На последующих вызовах account отсутствует —
     * просто возвращаем token как есть.
     */
    async jwt({ token, account, profile }) {
      try {
        if (account?.id_token && profile) {
          const email =
            (profile as any).email ||
            (typeof token.email === "string" ? token.email : undefined);
          const name =
            (profile as any).name ||
            (typeof token.name === "string" ? token.name : undefined);

          const resp = await fetch(`${API_BASE}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idToken: account.id_token, // внешний API явно просит idToken
              email,
              name,
            }),
          }); console.log("[jwt] exchange result:", resp.status, await resp.clone().text());

          if (!resp.ok) {
            const text = await resp.text().catch(() => "");

            throw new Error(
              `auth/google failed: ${resp.status} ${resp.statusText} ${text}`,
            );
          }

          // разные бэки по-разному называют поле токена — подстрахуемся
          const data = await resp.json();

          token.jwtToken =
            data?.token ??
            data?.access_token ??
            data?.jwt ??
            data?.authorization_token ??
            null;
        }
      } catch (e) {
        console.error("[NextAuth][jwt] exchange error:", e);
        // опционально: можно прервать вход, но лучше пустить без JWT и дать UI показать 401 на /me
      }

      return token;
    },

    async session({ session, token }) {
      // прокидываем jwt наружу — userStore возьмёт его из session.jwtToken
      (session as any).jwtToken = (token as any).jwtToken ?? null;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
