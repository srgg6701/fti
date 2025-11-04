import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.fti-trade.com";

type CookieAttributes = {
  name: string;
  value: string;
  path?: string;
  expires?: Date;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

function splitSetCookieHeader(header: string): string[] {
  const cookies: string[] = [];
  let current = "";
  let i = 0;

  while (i < header.length) {
    const char = header[i];

    if (char === ",") {
      const rest = header.slice(i + 1);

      if (/^\s*[^=\s]+=/.test(rest)) {
        cookies.push(current.trim());
        current = "";
        i += 1;
        continue;
      }
    }

    current += char;
    i += 1;
  }

  if (current) {
    cookies.push(current.trim());
  }

  return cookies;
}

function parseCookie(setCookie: string): CookieAttributes | null {
  const segments = setCookie.split(";").map((segment) => segment.trim());

  if (segments.length === 0) {
    return null;
  }

  const [nameValue, ...attrPairs] = segments;
  const [name, value] = nameValue.split("=");

  if (!name || typeof value === "undefined") {
    return null;
  }

  const attributes: CookieAttributes = {
    name,
    value,
  };

  for (const attr of attrPairs) {
    const [attrNameRaw, attrValueRaw] = attr.split("=");
    const attrName = attrNameRaw?.toLowerCase();
    const attrValue = attrValueRaw?.trim();

    if (!attrName) continue;

    switch (attrName) {
      case "path":
        attributes.path = attrValue ?? "/";
        break;
      case "expires":
        attributes.expires = attrValue ? new Date(attrValue) : undefined;
        break;
      case "max-age":
        attributes.maxAge = attrValue ? Number(attrValue) : undefined;
        break;
      case "httponly":
        attributes.httpOnly = true;
        break;
      case "secure":
        attributes.secure = true;
        break;
      case "samesite":
        if (attrValue) {
          const lower = attrValue.toLowerCase();

          if (lower === "lax" || lower === "strict" || lower === "none") {
            attributes.sameSite = lower;
          }
        }
        break;
      default:
        // ignore other attributes like Domain
        break;
    }
  }

  return attributes;
}

function setResponseCookies(
  response: NextResponse,
  rawSetCookie: string | null,
  isHttps: boolean
) {
  if (!rawSetCookie) return;

  const cookieStrings = splitSetCookieHeader(rawSetCookie);

  for (const cookieString of cookieStrings) {
    const parsed = parseCookie(cookieString);

    if (!parsed) continue;

    if (!parsed.path) {
      parsed.path = "/";
    }

    if (parsed.secure && !isHttps) {
      parsed.secure = false;
    }

    response.cookies.set({
      name: parsed.name,
      value: parsed.value,
      path: parsed.path,
      httpOnly: parsed.httpOnly ?? false,
      secure: parsed.secure ?? false,
      sameSite: parsed.sameSite,
      expires: parsed.expires,
      maxAge: parsed.maxAge,
    });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendResponse = await fetch(`${API_BASE}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    },
    body: JSON.stringify(body),
  });

  const responseText = await backendResponse.text();

  const response = new NextResponse(responseText, {
    status: backendResponse.status,
  });

  backendResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") return;

    response.headers.set(key, value);
  });

  const rawSetCookie = backendResponse.headers.get("set-cookie");
  const isHttps = request.nextUrl.protocol === "https:";

  setResponseCookies(response, rawSetCookie, isHttps);

  return response;
}
