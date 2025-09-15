const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* let authToken: string | null = null; // можно заменить на Zustand

export function setAuthToken(token: string | null) {
  authToken = token;
} */

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
