import { useUserStore } from "@/lib/store/userStore";

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
  console.log("%capiFetch called for ", "color: lightskyblue", input);
  // INFO: look at .sources\dev-clarifications\request-headers.md
  // Build headers robustly by using the Headers *CONSTRUCTOR*.
  // This supports incoming headers as plain objects, arrays, or Headers instances.
  const hdrs = new Headers(init.headers as HeadersInit);

  // Ensure we accept JSON responses by default.
  if (!hdrs.has("Accept")) {
    hdrs.set("Accept", "application/json");
  }

  // Detect if a Content-Type header is already provided.
  const hasContentType = hdrs.has("Content-Type");
  const body = init.body;

  // Detect body types that should NOT get a JSON Content-Type automatically.
  // FormData and URLSearchParams set their own appropriate content type / boundaries.
  const bodyIsFormData =
    typeof FormData !== "undefined" && body instanceof FormData;
  const bodyIsURLSearchParams =
    typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams;

  // If there is a body and the caller didn't set Content-Type,
  // and the body is not FormData / URLSearchParams, default to JSON.
  if (
    body != null &&
    !hasContentType &&
    !bodyIsFormData &&
    !bodyIsURLSearchParams
  ) {
    hdrs.set("Content-Type", "application/json");
  }

  // Always include credentials by default to forward cookies / session.
  const opts: RequestInit = {
    credentials: "include",
    headers: hdrs,
    ...init,
  };
  const color = input.toString().includes("/statistics/strategies")
    ? "yellow"
    : input.toString().includes("/statistics/universal-equity")
      ? "orangered"
      : "darkorange";

  //console.groupCollapsed("%capiFetch", `color: ${color}`);
  //console.log({ input, opts });

  const res = await fetch(input, opts);

  //console.log(`%cres for ${input}`, `color: ${color}`, res);
  //console.groupEnd();
  // Check response content-type before attempting to parse JSON.
  const contentType = res.headers.get("content-type") || "";
  const hasJson = contentType.includes("application/json");
  let payload: any = null;

  try {
    if (hasJson) payload = await res.json();
    else payload = await res.text();

    /* console.log(`%cpayload for ${input}`, `color: ${color}`, {
      contentType,
      hasJson,
      input,
      res,
      payload,
    }); */
  } catch (e) {
    console.log("Error parsing response payload as JSON/text:", e);
    // Ignore parse errors — we'll surface status/errors below.
  }

  if (res.status === 401 || res.status === 403) {
    // Update the user store to mark the user as unauthenticated.
    try {
      useUserStore.setState({
        isAuthenticated: false,
        email: null,
        user: null,
      });
    } catch(е) {
      console.log("Error updating user store on auth error:", е);
    }

    // Throw a specialized AuthError so callers can handle auth flows separately.
    throw new AuthError(
      (payload && payload.message) || "Unauthorized",
      res.status,
    );
  }

  if (!res.ok) {
    // Build an error object: prefer structured payload.message, otherwise raw payload or status.
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
  // Simulate a delay for mock responses.
  await new Promise((resolve) => setTimeout(resolve, Number("400")));

  try {
    const mod = await import(`@/mockData/${endpoint}.ts`);

    return mod.default as T;
  } catch {
    throw new Error(`Mock not found for: mockData/${endpoint}.ts`);
  }
}
