import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { PROTECTED_ROUTES } from "./lib/shared/protectedRoutes";

export function middleware(req: NextRequest) {
  // skip on Vercel
  const testUrl = req.nextUrl;

  if (testUrl.pathname.startsWith("/test")) {
    const host = req.headers.get("host") || "";

    if (
      !(
        host.startsWith("localhost") ||
        host.startsWith("127.0.0.1") ||
        host.endsWith("vercel.app")
      )
    ) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  console.log("req", req);

  /* if (
    host.endsWith(".vercel.app") // FIXME: remove this condition as soon as remote authentification works
  )
    return NextResponse.next(); */

  // if we have cookies, let it go where they wanted
  if (req.cookies.has("jwt")) {
    console.log("Has jwt");

    return NextResponse.next();
  }
  console.log("Has NO jwt");

  // otherwist to the /login page
  const { pathname, search } = req.nextUrl;

  // Avoid redirect loop: if user already requests the login page or public assets/APIs, allow it.
  if (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone();

  url.pathname = "/login";
  url.searchParams.set("next", pathname + search);
  console.log("Redirect url:", url);

  return NextResponse.redirect(url);
}

// protected pages
export const config = {
  matcher: PROTECTED_ROUTES,
};
