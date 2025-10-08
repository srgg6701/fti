import { create } from "zustand";

export type ApiUser = {
  id: number;
  email: string;
  username: string;
  default_language_id: number;
  start_page: string;
  is_ban: boolean;
  tour_step: number;
};

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  user: ApiUser | null;
  login: (user: ApiUser) => void;
  logout: () => void;
  initializeUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  email: null,
  user: null,

  login: (user) => {
    set({ isAuthenticated: true, email: user.email, user });
  },

  logout: async () => {
    set({ isAuthenticated: false, email: null, user: null });
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  },

  initializeUser: async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });

      if (!res.ok) {
        set({ isAuthenticated: false, email: null, user: null });

        return;
      }
      const data: { user?: ApiUser } = await res.json();

      if (data.user) {
        set({ isAuthenticated: true, email: data.user.email, user: data.user });
      } else {
        set({ isAuthenticated: false, email: null, user: null });
      }
    } catch {
      set({ isAuthenticated: false, email: null, user: null });
    }
  },
}));
