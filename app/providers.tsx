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
  const [initialized, setInitialized] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Always call initializeUser so backend can validate httpOnly cookie.
    // Do not rely on document.cookie (httpOnly cookies are not readable from JS).
    let alive = true;

    (async () => {
      try {
        const ok = await initializeUser();
        if (!alive) return;
        setInitialized(ok);
      } catch {
        if (alive) setInitialized(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [mounted, initializeUser]);

  // Пока неизвестен статус аутентификации — скрываем UI (можно заменить на лоадер)
  if (!mounted || initialized === null) {
    return null;
  }

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
