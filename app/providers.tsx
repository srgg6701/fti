"use client";

import type { ThemeProviderProps } from "next-themes";

import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/system";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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

  console.log(
    "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  );

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
