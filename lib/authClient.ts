const AUTH_COOKIE_NAME = "jwt";
let isRedirectingToLogin = false;

export const clearAuthCookie = () => {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
};

export const redirectToLogin = () => {
  if (typeof window === "undefined" || isRedirectingToLogin) return;

  isRedirectingToLogin = true;

  const nextPath = `${window.location.pathname}${window.location.search}`;
  const params = new URLSearchParams();

  if (nextPath && !nextPath.startsWith("/login")) {
    params.set("next", nextPath);
  }

  const query = params.toString();

  window.location.href = query ? `/login?${query}` : "/login";
};

export const handleUnauthorizedRedirect = () => {
  clearAuthCookie();
  redirectToLogin();
};
