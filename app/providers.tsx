"use client";

import type { ThemeProviderProps } from "next-themes";

import { ReactNode, useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useUserStore } from "@/lib/store/userStore";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const initializeUser = useUserStore((s) => s.initializeUser);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Call initialize only when we already have a jwt cookie
    const hasJwt =
      typeof document !== "undefined" && document.cookie.includes("jwt=");

    if (!hasJwt) return;
    initializeUser();
  }, [mounted, initializeUser]);

  if (!mounted) {
    return null;
  }

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
