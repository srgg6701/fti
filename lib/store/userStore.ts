import { create } from "zustand";

import { siteConfig } from "@/config/site";

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
      await fetch(`/api${siteConfig.innerItems.auth.logout.href}`, {
        method: "POST",
        credentials: "include",
      });
    },

    initializeUser: async () => {
      if (initPromise) return initPromise;

      initPromise = (async () => {
        try {
          // FIXME: can we change this to use apiFetch?
          let res = await fetch(`/api${siteConfig.innerItems.auth.me.href}`, {
            credentials: "include",
          });

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
          }

          // Попробуем обновить access-token через refresh endpoint
          if (res.status === 401 || res.status === 403) {
            // FIXME: can we change this to use apiFetch?
            const r = await fetch(
              `/api${siteConfig.innerItems.auth.refresh.href}`,
              {
                method: "POST",
                credentials: "include",
              },
            );

            if (r.ok) {
              // после refresh — повторный /me
              const me = await fetch(
                `/api${siteConfig.innerItems.auth.me.href}`,
                {
                  credentials: "include",
                },
              );

              if (me.ok) {
                const data2: { user?: ApiUser } = await me.json();

                if (data2.user) {
                  set({
                    isAuthenticated: true,
                    email: data2.user.email,
                    user: data2.user,
                  });

                  return true;
                }
              }
              // fallback: если refresh вернул payload с user
              try {
                const payload = await r.json();

                if (payload.user) {
                  set({
                    isAuthenticated: true,
                    email: payload.user.email,
                    user: payload.user,
                  });

                  return true;
                }
              } catch(e) {
                console.log("Error parsing refresh payload:", e);
              }
            }
          }

          set({ isAuthenticated: false, email: null, user: null });

          return false;
        } catch (e){
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
