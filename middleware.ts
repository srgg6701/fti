import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // skip on Vercel
  const host = req.headers.get("host") ?? "";

  if (host.endsWith(".vercel.app")) return NextResponse.next();

  // if we have cookies, let it go where they wanted
  if (req.cookies.has("jwt")) {
    console.log("Has jwt");

    return NextResponse.next();
  }
  console.log("Has NO jwt");

  // otherwist to the /login page
  const { pathname, search } = req.nextUrl;
  const url = req.nextUrl.clone();

  url.pathname = "/login";
  url.searchParams.set("next", pathname + search);
  console.log("Redirect url:", url);

  return NextResponse.redirect(url);
}

// protected pages
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
