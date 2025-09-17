// lib/store/userStore.ts
import { create } from 'zustand';
// import Cookies from 'js-cookie';           // ❌ Убираем

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
  initializeUser: () => Promise<void>; // ⬅ асинхронная, мягкая проверка
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  email: null,

  login: (email) => {
    // Сервер уже поставил HTTP-only cookie `jwt`; этого достаточно.
    set({ isAuthenticated: true, email });
    // ❌ никаких sessionStorage/небезопасных кук
  },

  logout: () => {
    set({ isAuthenticated: false, email: null });
    // опционально: вызвать fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    // и игнорировать ответ — middleware дальше всё защитит
  },

  initializeUser: async () => {
    try {
      // мягкая проверка без авто-редиректа (не используем apiFetch, чтобы не прыгать на /login на публичных страницах)
      const res = await fetch('/api/auth/me', { credentials: 'include' });

      if (!res.ok) {
        set({ isAuthenticated: false, email: null });

        return;
      }
      const data: { user?: { email?: string } } = await res.json();

      set({ isAuthenticated: true, email: data.user?.email ?? null });
    } catch {
      set({ isAuthenticated: false, email: null });
    }
  },
}));
