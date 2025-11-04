"use client";

import type { ThemeProviderProps } from "next-themes";

import { ReactNode, useEffect } from "react";
import { HeroUIProvider } from "@heroui/system";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useUserStore } from "@/lib/store/userStore";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
  initialIsAuth?: boolean;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({
  children,
  themeProps,
  initialIsAuth,
}: ProvidersProps) {
  const router = useRouter();

  console.log(
    "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  );

  useEffect(() => {
    if (typeof initialIsAuth !== "boolean") return;

    let hasStateChanged = false;

    useUserStore.setState((state) => {
      if (state.isAuthenticated === initialIsAuth) {
        return state;
      }

      hasStateChanged = true;

      if (initialIsAuth) {
        return {
          ...state,
          isAuthenticated: true,
        };
      }

      return {
        ...state,
        isAuthenticated: false,
        email: null,
        user: null,
      };
    });

    if (initialIsAuth) {
      const { user } = useUserStore.getState();

      if (!user || hasStateChanged) {
        void useUserStore
          .getState()
          .initializeUser()
          .catch((error) => {
            console.log(
              "%cFailed to initialize user from initial auth state",
              "color: orangered",
              error
            );
          });
      }
    }
  }, [initialIsAuth]);

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          {children}
        </GoogleOAuthProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
