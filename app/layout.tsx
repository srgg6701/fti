import { Metadata, Viewport } from 'next';
// TODO: check if we really need this:
import clsx from 'clsx';

import '@/styles/globals.css';
import '@/styles/xtra.css';
import '@/styles/text-colors.css';
import '@/styles/bg.css';
import '@/styles/style-modals.css';
import '@/styles/fonts.css';
import '@/styles/circular-progress.css';

import { siteConfig } from '@/config/site';
//import { ThemeAutoSwitch } from '@/app/ThemeAutoSwitch';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/navbar';
import Footer from '@/components/footer';

import { Providers } from './providers';

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
      <body
        className={clsx(
          'text-foreground bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )} /*  */
      >
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
            <Navbar />
            <main className="container mx-auto flex-grow py-6">{children}</main>
            <Footer />
            {/* <ThemeAutoSwitch /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
