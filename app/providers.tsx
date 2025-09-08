'use client';

import { HeroUIProvider } from '@heroui/system';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: any;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider {...themeProps}>
      <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
    </NextThemesProvider>
  );
}