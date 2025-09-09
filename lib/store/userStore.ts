import { create } from 'zustand';
import Cookies from 'js-cookie';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
  initializeUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  email: null,

  login: (email) => {
    set({ isAuthenticated: true, email });
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('email', email);

      Cookies.set('isAuthenticated', 'true', {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
      });
    }
  },

  logout: () => {
    set({ isAuthenticated: false, email: null });

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('email');

      Cookies.remove('isAuthenticated');
    }
  },

  initializeUser: () => {
    if (typeof window !== 'undefined') {
      const isAuthenticatedSession = sessionStorage.getItem('isAuthenticated') === 'true';
      const emailSession = sessionStorage.getItem('email');

      const isAuthenticatedCookie = Cookies.get('isAuthenticated') === 'true';

      if (isAuthenticatedSession && emailSession) {
        set({
          isAuthenticated: true,
          email: emailSession,
        });
      } else if (isAuthenticatedCookie) {
        set({
          isAuthenticated: true,
          email: null,
        });
        sessionStorage.setItem('isAuthenticated', 'true');
      }
    }
  },
}));
