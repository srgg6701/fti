import { NextRequest, NextResponse } from "next/server";
import { SignJWT, decodeJwt, jwtVerify } from "jose";

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
const JWT_TTL_SEC = 60 * 60; // 1h

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

// Чтение секрета (единый для подписи/верификации)
function getKey() {
  const secret = process.env.SERVER_JWT_SECRET || process.env.AUTH_SECRET;

  if (!secret) {
    console.error(
      "\x1b[31m%s\x1b[0m", // Красный
      "[AUTH] Missing SERVER_JWT_SECRET/AUTH_SECRET",
    );
    throw new Error("Missing JWT secret");
  }

  return new TextEncoder().encode(secret);
}

// Подписываем наш HS256-JWT
async function mintAppJwt(payload: Record<string, unknown>) {
  const key = getKey();
  const now = Math.floor(Date.now() / 1000);
  const exp = now + JWT_TTL_SEC;

  console.log(
    "\x1b[36m%s\x1b[0m", // Голубой
    `[AUTH] Minting app JWT, exp=${new Date(exp * 1000).toISOString()}`,
  );

  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(key);
}

// Проверяем наш JWT из cookie
async function verifyAppJwt(token: string) {
  try {
    const key = getKey();
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });

    console.debug(
      "\x1b[32m%s\x1b[0m", // Зелёный
      "[AUTH] App JWT verified",
    );

    return payload;
  } catch (e) {
    console.warn(
      "\x1b[33m%s\x1b[0m", // Жёлтый
      `[AUTH] App JWT invalid: ${(e as Error).message}`,
    );

    return null;
  }
}

// Оборачиваем кастомной логикой, чтобы получить req.auth от Auth.js
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;

  if (isPassThrough(pathname)) {
    console.log(
      "\x1b[34m%s\x1b[0m", // Синий
      `[AUTH] isPassThrough, go next — to ${pathname}${search}`,
    );

    return NextResponse.next();
  }

  const loginUrl = new URL("/login", url.origin);

  //const loginUrl = new URL("/login", req.nextUrl.origin);
  loginUrl.searchParams.set("next", pathname + search);

  // Синий
  //console.log("\x1b[34m%s\x1b[0m", `[AUTH] Middleware hit: ${pathname}`);

  // 1) Пытаемся пройти с нашим JWT
  const jwtCookie = req.cookies.get(COOKIE_NAME)?.value;

  if (jwtCookie) {
    console.log(
      "\x1b[36m%s\x1b[0m", // Голубой
      `[AUTH] Has JWT`,
      jwtCookie,
    );
    //const payload = await verifyAppJwt(existing);
    const payload = decodeJwt(jwtCookie);

    if (payload) {
      const exp = payload.exp; // Unix timestamp в секундах
      const redirect = NextResponse.redirect(loginUrl);

      console.log(
        "\x1b[34m%s\x1b[0m", // Синий
        "[AUTH] got payload",
        payload,
      );

      try {
        if (exp && Date.now() / 1000 > exp) {
          console.warn(
            "\x1b[33m%s\x1b[0m",
            `[AUTH] JWT expired, redirect to ${loginUrl}`,
          );
          redirect.cookies.delete(COOKIE_NAME); // удаляем на том же ответе

          return redirect;
        }
        console.log(
          "\x1b[34m%s\x1b[0m", // Синий
          "[AUTH] JWT is OK, go further",
        );

        return NextResponse.next();
      } catch (e) {
        console.error(
          "\x1b[31m%s\x1b[0m", // Красный
          `[AUTH] JWT decode error: ${(e as Error).message}`,
        );
        redirect.cookies.delete(COOKIE_NAME); // удаляем на том же ответе

        return redirect;
      }
    }
  } else {
    console.warn(
      "\x1b[33m%s\x1b[0m", // Жёлтый
      `[AUTH] No jwt. Is login? ${pathname.startsWith("/login")}`,
    );
  }

  // 3) Ни JWT, ни Google — уходим на /login
  const isLogin = pathname.startsWith("/login");

  if (!isLogin) {
    //const loginUrl = new URL("/login", url.origin);
    //loginUrl.searchParams.set("next", pathname); // чтобы вернуться назад после логина

    console.warn(
      "\x1b[33m%s\x1b[0m", // Жёлтый
      `[AUTH] No auth. Redirect to ${loginUrl.pathname}`,
    );

    return NextResponse.redirect(loginUrl);
  }

  // Для /login — пропускаем
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
