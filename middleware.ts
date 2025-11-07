import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

// ====== НАСТРОЙКИ ======

// === Цвета для консоли ===
// 31 -- красный
// 32 -- зелёный
// 33 -- жёлтый
// 34 -- синий
// 35 -- пурпурный
// 36 -- голубой
// 37 -- белый
// 90 -- серый

const COOKIE_NAME = "jwt";

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
  const url = req.nextUrl;
  const { pathname, search } = url;

  if (isPassThrough(pathname)) {
    console.log(
      "\x1b[34m%s\x1b[0m",
      `[AUTH] isPassThrough, go next �?" to ${pathname}${search}`
    );

    return NextResponse.next();
  }

  const loginUrl = new URL("/login", url.origin);
  loginUrl.searchParams.set("next", pathname + search);

  const jwtCookie = req.cookies.get(COOKIE_NAME)?.value;

  if (jwtCookie) {
    console.log("\x1b[36m%s\x1b[0m", "[AUTH] Has JWT");

    try {
      decodeJwt(jwtCookie);
      return NextResponse.next();
    } catch (error) {
      console.warn(
        "\x1b[33m%s\x1b[0m",
        `[AUTH] JWT decode error: ${(error as Error).message}`
      );
      const redirect = NextResponse.redirect(loginUrl);
      redirect.cookies.delete(COOKIE_NAME);

      return redirect;
    }
  }

  console.warn(
    "\x1b[33m%s\x1b[0m",
    `[AUTH] No jwt. Is login? ${pathname.startsWith("/login")}`
  );

  if (!pathname.startsWith("/login")) {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      `[AUTH] No auth. Redirect to ${loginUrl.pathname}`
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
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
  //runtime: "nodejs",
};
