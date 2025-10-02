import { siteConfig } from "@/config/site";
function toApiPath(endpoint: string) {
  // принимаем '/auth/login' или '/api/auth/login' — оба варианта ок
  if (endpoint.startsWith("/api/")) return endpoint;

  return endpoint.startsWith("/") ? `/api${endpoint}` : `/api/${endpoint}`;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(toApiPath(endpoint), {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      const from = window.location.pathname + window.location.search;

      sessionStorage.setItem("reauth_from", from);
      window.location.href = siteConfig.innerItems.login.href; // согласовано с middleware
    }
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    let details = "";

    try {
      details = JSON.stringify(await res.json());
    } catch {}
    throw new Error(`API error: ${res.status}${details ? ` ${details}` : ""}`);
  }

  return res.json() as Promise<T>;
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
