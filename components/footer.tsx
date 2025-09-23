"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { getUrlSegments } from "@/lib/utils";
import { LogoFTI } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { checkRouteAside } from "@/lib/utils";

export default function Footer() {
  const urlFirstSegment = getUrlSegments(usePathname, 1);

  if (checkRouteAside(urlFirstSegment)) return null;

  return (
    <footer className="py-[60px] relative">
      <div className="mx-auto flex max-w-[430px] flex-col items-center gap-[2.5rem] px-4">
        <LogoFTI className="h-[27px] w-[55px]" />
        <nav className="block w-full justify-between text-center min-[480px]:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              className={`${urlFirstSegment === item.href ? "" : "opacity-60 hover:opacity-100"} block`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 text-sm opacity-60">
          <div>+7 999 999 99 99</div>
          <div>name@gmail.com</div>
        </div>
        <div className="text-center text-sm tracking-[-0.4px] opacity-60">
          <div>Copyright © 2025 TenWeb. All rights reserved.</div>
          <div>
            Address: 40 E Main St, Suite 721, Newark, DE 19711, United States
          </div>
        </div>
      </div>
      <Link
        className="text-zinc-800"
        href="/api/test"
        style={{ position: "absolute", bottom: "25px", marginLeft: "25px" }}
      >
        API test
      </Link>
    </footer>
  );
}
