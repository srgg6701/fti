import { Metadata, Viewport } from 'next';
import clsx from 'clsx';

import '@/styles/globals.css';
import '@/styles/xtra.css';
import { Providers } from './providers';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('text-foreground bg-background min-h-screen font-sans antialiased')}>
        <Providers
          themeProps={{
            attribute: 'class',
            defaultTheme: 'dark',
            enableSystem: false,
            value: {
              light: 'light',
              dark: 'dark',
              memberLight: 'memberLight',
              memberDark: 'memberDark',
              partnerLight: 'partnerLight',
              partnerDark: 'partnerDark',
            },
          }}
        >
          <div className="relative flex h-screen flex-col">
            <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
