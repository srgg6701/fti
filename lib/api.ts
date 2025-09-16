const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  // handle problematic session
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('reauth_from', window.location.pathname);
      window.location.href = '/'; // redirect to the entry point
    }
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    // for server's messages if there are any
    let details = '';

    try {
      details = JSON.stringify(await res.json());
    } catch {}
    throw new Error(`API error: ${res.status}${details ? ` ${details}` : ''}`);
  }

  return res.json();
}
