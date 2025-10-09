import { siteConfig } from "@/config/site";
import { useUserStore } from "@/lib/store/userStore";

const innerItems = siteConfig.innerItems;
/* function toApiPath(endpoint: string) {
  // принимаем '/auth/login' или '/api/auth/login' — оба варианта ок
  if (endpoint.startsWith("/api/")) return endpoint;

  return endpoint.startsWith("/") ? `/api${endpoint}` : `/api/${endpoint}`;
} */

export class AuthError extends Error {
  public status: number;
  constructor(message = "Authentication required", status = 401) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

export async function apiFetch<T = any>(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<T> {
  const opts: RequestInit = {
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(init.headers || {}),
    },
    ...init,
  };

  const res = await fetch(input, opts);

  const contentType = res.headers.get("content-type") || "";
  const hasJson = contentType.includes("application/json");
  let payload: any = null;

  try {
    if (hasJson) payload = await res.json();
    else payload = await res.text();
  } catch {
    // ignore parse errors
  }

  if (res.status === 401 || res.status === 403) {
    // Обновляем состояние стора — пользователь не аутентифицирован
    try {
      useUserStore.setState({
        isAuthenticated: false,
        email: null,
        user: null,
      });
    } catch {}

    // Классический клиентский редирект на /login?next=..., если мы в браузере
    if (typeof window !== "undefined") {
      const current = window.location.pathname + window.location.search;

      if (!current.startsWith(innerItems.login.href)) {
        const next = encodeURIComponent(current);

        // replace чтобы не добавлять запись в history
        window.location.replace(`${innerItems.login.href}?next=${next}`);
      }
    }

    throw new AuthError(
      (payload && payload.message) || "Unauthorized",
      res.status,
    );
  }

  if (!res.ok) {
    const message =
      (payload && payload.message) ||
      payload ||
      `Request failed with status ${res.status}`;
    const err: any = new Error(message);

    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload as T;
}
// FIXME: remove this function after switching to the real API
export async function apiFetch2<T>(endpoint: string): Promise<T> {
  // имитация задержки
  await new Promise((resolve) => setTimeout(resolve, Number("400")));

  try {
    const mod = await import(`@/mockData/${endpoint}.ts`);

    return mod.default as T;
  } catch {
    throw new Error(`Mock not found for: mockData/${endpoint}.ts`);
  }
}
