import type { NextRequest } from "next/server";

import { SignJWT, decodeJwt } from "jose";
import { NextResponse } from "next/server";

// ✅ Берём проверку токена из NextAuth
// Он читает куку next-auth.session-token (__Secure-next-auth.session-token)
// и возвращает расшифрованный payload (email, sub, name, picture, iat/exp и т.д.).
import { getToken } from "next-auth/jwt";

/**
 * ГЛАВНАЯ ИДЕЯ:
 * - middleware НИКОГДА не общается с Google и не "ждёт ответа" от Google.
 * - Вся проверка (state/PKCE/обмен code→tokens/валидация id_token) делается на /api/auth/callback/google внутри NextAuth.
 * - Если вход успешен, NextAuth ставит сессионную куку.
 * - Здесь мы просто проверяем: есть ли валидный токен NextAuth? Если да — пускаем. Если нет — редиректим на /login.
 */
export async function middleware(req: NextRequest) {
  //console.log('\x1b[34m%s\x1b[0m', 'req', req);
  /*  console.log('\x1b[31m%s\x1b[0m', 'Красный текст');
      console.log('\x1b[32m%s\x1b[0m', 'Зелёный текст');
      console.log('\x1b[33m%s\x1b[0m', 'Жёлтый текст');
      console.log('\x1b[34m%s\x1b[0m', 'Синий текст');  */
  const url = req.nextUrl;
  const { pathname, search } = url;
  // 🚧
  const loginUrl = new URL("/login", req.nextUrl.origin);

  loginUrl.searchParams.set("next", pathname + search);

  const appSecret =
    process.env.SERVER_JWT_SECRET || process.env.NEXTAUTH_SECRET;

  let key = new TextEncoder().encode(appSecret);

  // 1) 🔒 Служебный тестовый маршрут /test — ограничим доступ окружением
  if (pathname.startsWith("/test")) {
    const host = req.headers.get("host") || "";
    const allowed =
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1") ||
      host.endsWith("vercel.app");

    if (!allowed) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  // 2) 🛂 Разрешаем маршруты, которые нельзя блокировать:
  //    - вся аутентификация NextAuth, включая /api/auth/callback/*
  //    - служебные ассеты/бандлы
  //    - сама страница /login (чтобы избежать петель)
  const isPassThrough =
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/api/auth") || // ⚠️ важно: callback/error/signin/signout
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/favicon");

  if (isPassThrough) {
    console.log("\x1b[33m%s\x1b[0m", `pass не пройден, редирект на ${url}`);

    return NextResponse.next();
  }

  // 3) 🔑 Проверка авторизации:
  //    Если пользователь только что успешно прошёл Google OAuth,
  //    NextAuth уже поставил сессионную куку -> getToken вернёт объект-пейлоад.
  const token = await getToken({ req }); // читает next-auth.session-token

  console.log("\x1b[32m%s\x1b[0m", "token", token);

  /*{ читатель/декодер уже созданного сервером JWT-токена NextAuth
  name: 'Sergey Cleftsow',
  email: 'srgg.next@gmail.com',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocIhKT1CjoNVIsICw2qIkLHzkM63BBnpuB6iqCqc8KUoX34ACg8=s96-c',
  sub: '100022084306780759683',
  iat: 1761150498,
  exp: 1763742498,
  jti: '2165f2ec-ab3b-41ab-b7d7-5a8a369e1e90'
  }*/
  // if we have cookies, let it go where they wanted

  // 3.1) (необязательно) Можем посмотреть, что именно вернулось из токена.
  //      Это и есть "данные после авторизации через Google" (но уже в виде JWT-пейлоада NextAuth).
  //      Полезно для отладки — потом лучше убрать.
  // if (token) {
  //   console.log("Auth OK:", {
  //     sub: token.sub,                   // Google user id
  //     email: token.email,               // email из профиля
  //     name: token.name,                 // имя
  //     picture: token.picture,           // аватар
  //     iat: token.iat, exp: token.exp,   // времена выпуска/истечения
  //   });
  // }
  console.log(
    `
******************************************************************
`
  );

  if (token) {
    if (!appSecret) {
      throw new Error("SERVER_JWT_SECRET is missing");
    }

    const appJwt = await new SignJWT({ sub: token.sub, email: token.email })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(key);

    const res = NextResponse.next();

    res.cookies.set("jwt", appJwt, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    console.log(
      "\x1b[34m%s\x1b[0m",
      `token получен, пользователь авторизован и будет отправлен на ${url}, appJwt: ${appJwt}`
    );

    // ✅ Авторизован — пропускаем к защищённой странице
    return res;
  } else {
    console.log(
      "\x1b[33m%s\x1b[0m",
      `token не получен, редирект не выполняется`
    );
  }

  // ✅ JWT in cookies?
  const jwt = req.cookies.get("jwt")?.value;
  console.log("Cookies", req.cookies);
  console.log(
    "-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/"
  );
  console.log("jwt", jwt);

  if (!jwt || jwt.split(".").length !== 3) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `JWT отсутствует или некорректен, редирект на ${req.nextUrl.origin}/login`
    );
    // не JWT → чистим и директим на /login
    const nxtRedirect = NextResponse.redirect(loginUrl);

    nxtRedirect.cookies.set("jwt", "", {
      path: "/",
      maxAge: 0,
      sameSite: "lax",
      httpOnly: true,
    });

    return nxtRedirect;
  }

  try {
    /* const { payload } = await jwtVerify(jwt!, key!, {
      algorithms: ["HS256"],
    }); */
    const decodedJwt = decodeJwt(jwt);
    console.log(decodedJwt.exp);
    // опционально явная проверка exp (jwtVerify уже проверяет):
    const now = Math.floor(Date.now() / 1000);

    if (decodedJwt.exp && decodedJwt.exp > now) {
      console.log("\x1b[32m%s\x1b[0m", `payload есть и он не просрочен

      decodedJwt.exp: ${decodedJwt.exp}
      now: ${now}
      difference: ${decodedJwt.exp - now}

`);

      return NextResponse.next();
    }
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", "JWT verification error:", e);
  }

  const res = NextResponse.redirect(loginUrl);

  res.cookies.set("jwt", "", { path: "/", maxAge: 0, sameSite: "lax" });

  return res;
}

/**
 * matcher — список защищённых страниц, для которых включается middleware.
 * (Он не трогает другие страницы/маршруты вне этого списка.)
 */
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
