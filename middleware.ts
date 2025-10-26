import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { SignJWT, decodeJwt, jwtVerify } from "jose";
// decodeJwt
// ✅ Берём проверку токена из NextAuth
// Он читает куку next-auth.session-token (__Secure-next-auth.session-token)
// и возвращает расшифрованный payload (email, sub, name, picture, iat/exp и т.д.).
import { getToken } from "next-auth/jwt";

// Minimal, strict auth flow:
// 1) Trust our own cookie JWT if signature+exp are valid.
// 2) Else, if a NextAuth session exists, mint our JWT and set it.
// 3) Else, redirect to /login.
// Pass-through: /login, /api/auth/*, /_next/*, /static/*, /assets/*, /favicon*
function isPassThrough(pathname: string) {
  return (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/favicon")
  );
}

export async function middleware(req: NextRequest) {
  //console.log('\x1b[34m%s\x1b[0m', 'req', req);
  /*  console.log('\x1b[31m%s\x1b[0m', 'Красный текст');
      console.log('\x1b[32m%s\x1b[0m', 'Зелёный текст');
      console.log('\x1b[33m%s\x1b[0m', 'Жёлтый текст');
      console.log('\x1b[34m%s\x1b[0m', 'Синий текст');  */
  const { pathname, search } = req.nextUrl;

  if (isPassThrough(pathname)) {
    console.log(
      "\x1b[33m%s\x1b[0m",
      `isPassThrough, редирект на ${pathname}${search}`
    );

    return NextResponse.next();
  }

  const loginUrl = new URL("/login", req.nextUrl.origin);

  loginUrl.searchParams.set("next", pathname + search);

  const appSecret =
    process.env.SERVER_JWT_SECRET || process.env.NEXTAUTH_SECRET;

  console.log('\x1b[36m%s\x1b[0m', `[ПОДПИСЬ] Ключ: "${appSecret}"`);

  if (!appSecret) {
    // Fail safe: no secret — don't allow access
    console.log("\x1b[31m%s\x1b[0m", "No appSecret, redirecting to /login");

    return NextResponse.redirect(loginUrl);
  }
  const key = new TextEncoder().encode(appSecret);

  // 1) 🔒 Служебный тестовый маршрут /test — ограничим доступ окружением
  if (pathname.startsWith("/test")) {
    const host = req.headers.get("host") || "";
    const allowed =
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1") ||
      host.endsWith("vercel.app");

    if (!allowed) {
      console.log("\x1b[31m%s\x1b[0m", "No test API on this domain!");

      return new NextResponse("Not Found", { status: 404 });
    }
  }
  // 1) Check our cookie JWT first
  const jwtCookie = req.cookies.get("jwt")?.value;

  if (jwtCookie) {
    // FIXME: закомментировать после тестов проверку просроченности
    const payload = decodeJwt(jwtCookie); // просто декодирует без верификации
    const exp = payload.exp; // Unix timestamp в секундах

    if (exp && Date.now() / 1000 > exp) {
      console.log('\x1b[31m%s\x1b[0m', "JWT просрочен");
      const res = NextResponse.redirect(loginUrl);
    } else {
      console.log('\x1b[32m%s\x1b[0m', "JWT действителен");
      return NextResponse.next();
    }
    //--------------------------------

    /* console.log("\x1b[32m%s\x1b[0m", "jwtCookie found, verifying...");
    try {
      console.log('\x1b[35m%s\x1b[0m', `[ПРОВЕРКА] Ключ: "${appSecret}"`); //
      await jwtVerify(jwtCookie, key, { algorithms: ["HS256"] });
      console.log("\x1b[32m%s\x1b[0m", "jwtCookie valid, proceeding...");

      return NextResponse.next();
    } catch (err) {
      // Invalid/expired — clear and continue to NextAuth fallback
      console.log("\x1b[31m%s\x1b[0m", "Something wrong with jwtCookie:", err);
      const res = NextResponse.next();

      console.log("\x1b[31m%s\x1b[0m", "Nullifying cookies");
      res.cookies.set("jwt", "", {
        path: "/",
        maxAge: 0,
        sameSite: "lax",
        httpOnly: true,
      });
      return NextResponse.redirect(loginUrl);
      // continue
    } */
  }

  // 2) Try NextAuth token (Google/OAuth-backed session)
  const gSession = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (gSession && (gSession as any).sub && (gSession as any).email) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "NextAuth session found, minting jwtCookie..."
    );
    const appJwt = await new SignJWT({
      sub: (gSession as any).sub,
      email: (gSession as any).email,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(key);

    console.log("\x1b[34m%s\x1b[0m", "Редирект на ${pathname}${search}");
    const res = NextResponse.next();

    res.cookies.set("jwt", appJwt, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res;
  }

  // 3) Neither our JWT nor NextAuth session — login
  console.log("\x1b[34m%s\x1b[0m", "Конечный редирект на /login");
  console.log("\x1b[31m%s\x1b[0m", "Обнуление cookies jwt");

  const redirect = NextResponse.redirect(loginUrl);

  redirect.cookies.set("jwt", "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    httpOnly: true,
  });

  return redirect;
}

export const config = {
  matcher: [
    "/",
    "/accounts",
    "/accounts/:path*",
    "/home",
    "/home/:path*",
    "/portfolio",
    "/portfolio/:path*",
    "/portfolio_balancer",
    "/portfolio_balancer/:path*",
    "/profile",
    "/profile/:path*",
    "/strategies",
    "/strategies/:path*",
    "/terminal",
    "/terminal/:path*",
    "/trading_history",
    "/trading_history/:path*",
    "/add_forex_account",
    "/add_forex_account/:path*",
    "/new_provider",
    "/new_provider/:path*",
  ],
};
