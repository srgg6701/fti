import { create } from "zustand";

import { siteConfig } from "@/config/site";
import { handleUnauthorizedRedirect } from "@/lib/authClient";

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
  initializeUser: () => Promise<boolean>;
}

export const useUserStore = create<UserState>((set) => {
  // Deduplicate concurrent initializeUser calls
  let initPromise: Promise<boolean> | null = null;

  return {
    isAuthenticated: false,
    email: null,
    user: null,

    login: (user) => {
      set({ isAuthenticated: true, email: user.email, user });
    },

    logout: async () => {
      set({ isAuthenticated: false, email: null, user: null });
      // FIXME: can we change this to use apiFetch?
      try {
        await fetch(`/api${siteConfig.innerItems.auth.logout.href}`, {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.log("Logout request failed:", error);
      } finally {
        handleUnauthorizedRedirect();
      }
    },

    initializeUser: async () => {
      if (initPromise) return initPromise;

      initPromise = (async () => {
        try {
          // FIXME: can we change this to use apiFetch?
          let res = await fetch(`/api${siteConfig.innerItems.auth.me.href}`, {
            credentials: "include",
          });

          console.log("%cMe request result", "color: lime", res);

          if (res.ok) {
            const data: { user?: ApiUser } = await res.json();

            if (data.user) {
              set({
                isAuthenticated: true,
                email: data.user.email,
                user: data.user,
              });

              return true;
            }
          } else if (res.status === 401 || res.status === 403) {
            handleUnauthorizedRedirect();
          }
          set({ isAuthenticated: false, email: null, user: null });

          return false;
        } catch (e) {
          console.log("Error in initializeUser:", e);
          set({ isAuthenticated: false, email: null, user: null });

          return false;
        } finally {
          // allow future attempts
          initPromise = null;
        }
      })();

      return initPromise;
    },
  };
});
