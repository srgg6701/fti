import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // если есть кука — пускаем
  if (req.cookies.has("jwt")) return NextResponse.next();

  // иначе — на /login с возвратом
  const { pathname, search } = req.nextUrl;
  const url = req.nextUrl.clone();

  url.pathname = "/login";
  url.searchParams.set("next", pathname + search);

  return NextResponse.redirect(url);
}

// защищаем только нужные роуты + их подпути
export const config = {
  matcher: [
    "/accounts  ",
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
