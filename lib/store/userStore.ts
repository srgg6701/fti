import { create } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
  initializeUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  email: null,

  login: (email) => {
    // we can do that as the server already set HTTP-only cookie `jwt`;
    set({ isAuthenticated: true, email });
  },

  logout: async () => {
    set({ isAuthenticated: false, email: null });
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  },

  initializeUser: async () => {
    try {
      // Soft verification without auto-redirect (we don't use apiFetch to avoid jumping to /login on public pages)
      const res = await fetch("/api/auth/me", { credentials: "include" });

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
