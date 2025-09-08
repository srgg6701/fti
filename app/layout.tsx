import { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
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
      <body>
        <Providers
          themeProps={{
            attribute: 'class',
            defaultTheme: 'dark',
            enableSystem: false,
          }}
        >
          <div
            className="relative m-auto flex h-screen max-w-[1440px] flex-col px-10 md:px-[55.38px]"
            id="main-wrapper"
          >
            <main className="container mx-auto flex-grow py-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
