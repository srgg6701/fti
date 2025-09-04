'use client';
import { usePathname } from 'next/navigation';
import { LogoFTI } from '@/components/icons';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { getUrlSegments } from './navbar';
import { checkRouteAside } from '@/lib/utils';

export default function Footer() {
  const urlFirstSegment = getUrlSegments(usePathname, 1);
  if (checkRouteAside(urlFirstSegment)) return null;

  return (
    <footer className="py-[60px]">
      <div className="mx-auto flex flex-col max-w-[430px] items-center gap-[2.5rem] px-4">
        <LogoFTI className="h-[27px] w-[55px]" />
        <nav className="block min-[480px]:flex w-full text-center justify-between">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${urlFirstSegment === item.href ? '' : 'opacity-60 hover:opacity-100'} block`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 text-sm opacity-60">
          <div>+7 999 999 99 99</div>
          <div>name@gmail.com</div>
        </div>
        <div className="text-sm text-center tracking-[-0.4px] opacity-60">
          <div>Copyright © 2025 TenWeb. All rights reserved.</div>
          <div>Address: 40 E Main St, Suite 721, Newark, DE 19711, United States</div>
        </div>
      </div>
    </footer>
  );
}
