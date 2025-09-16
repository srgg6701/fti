export async function api(input: RequestInfo, init: RequestInit = {}) {
  const res = await fetch(input, { ...init, credentials: 'include' }); // cookie поедет сама

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('reauth_from', window.location.pathname);
      window.location.href = '/';
    }
    throw new Error('Unauthorized');
  }

  return res;
}
