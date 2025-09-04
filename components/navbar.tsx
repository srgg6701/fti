'use client';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from '@heroui/navbar';
import Link from 'next/link';
//import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { Icon, menuIcons } from './icons';

import { checkRouteAside, getUrlSegments } from '@/lib/utils';
import { siteConfig } from '@/config/site';
//import { ThemeSwitch } from '@/components/theme-switch';
import { useUserStore } from '@/lib/store/userStore';

export const Navbar = () => {
  // TODO: Check if it makes sense to leave it here:
  const { isAuthenticated } = useUserStore();
  const urlFirstSegment = getUrlSegments(usePathname, 1);
  const urlSecondSegment = getUrlSegments(usePathname, 2);

  if (checkRouteAside(urlFirstSegment)) return null;

  let pageHeader = '';

  switch (urlFirstSegment) {
    case '/home':
      pageHeader = 'Home';
      break;
    case '/people':
      pageHeader = 'People';
      break;
    case '/strategies':
      if (urlSecondSegment?.[2]?.includes('strategy')) {
        pageHeader = urlSecondSegment.toLocaleUpperCase() + urlSecondSegment.slice(1);
        break;
      }
      pageHeader = 'Strategies';
      break;
    case '/news':
      pageHeader = 'News';
      break;
    case '/accounts':
      pageHeader = 'Accounts';
      break;
    case '/profile':
      pageHeader = 'Profile';
      break;
    case '/frame':
      pageHeader = 'Frame';
      break;
    case '/frame256':
      pageHeader = 'Frame 256';
      break;
    case '/meaning':
      pageHeader = 'Meaning';
      break;
    case '/news3':
      pageHeader = 'News 3';
      break;
    case '/tariffplan':
      pageHeader = 'Tariff Plan';
      break;
    case '/update':
      pageHeader = 'Update';
      break;
    case '/verification':
      pageHeader = 'Verification';
      break;
    default:
      break;
  }

  const items = siteConfig.navItems; /* .filter((item) => {
    if (item.protected && !isAuthenticated) return false;
    if (item.label === 'Logout' && !isAuthenticated) return false;
    return true;
  }) */

  const menuList = () => (
    <>
      {items.map((item) => {
        const iconName = item.href.split('/')[1] as keyof typeof menuIcons;

        return (
          <li key={item.href} className="flex list-none items-center">
            <Link
              aria-current={urlFirstSegment === item.href ? 'page' : undefined}
              className={`menu-item flex items-center gap-3 ${urlFirstSegment === item.href ? '' : 'opacity-60 hover:opacity-100'}`}
              href={item.href}
            >
              {Icon({
                ...menuIcons[iconName],
                color: 'white', // TODO: make color self-customizing
              })}
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );

  const Exit = ({ className }: { className?: string }) => (
    <Link className={className || ''} href="/logout">
      <Image
        alt="Exit"
        className="mr-3 inline-block"
        height="16"
        src="/assets/images/icons/bell.png"
        style={{ height: '16px' }}
        width="16"
      />
      <strong className="menu-item color-ultra-violet">Exit</strong>
    </Link>
  );

  return (
    <HeroUINavbar aria-label="Main" as="nav" maxWidth="xl">
      {/* desktop */}
      <NavbarContent className="navbar-justify-around basis-1/5 items-center sm:basis-full">
        <div className="flex w-full justify-between pt-[46.5px]">
          <h1 className="leading-[27px]">{pageHeader}</h1>
          <div className="hidden lg:flex">
            <ul className="flex items-center gap-[50px]">{menuList()}</ul>
            {/* <ThemeSwitch /> */}
          </div>
          <div className="hidden items-center lg:flex">
            <Exit />
          </div>
        </div>
      </NavbarContent>
      {/* mobile */}
      <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
        {/* <ThemeSwitch /> */}
        {isAuthenticated && <NavbarMenuToggle aria-controls="main-menu" aria-label="Open menu" />}
      </NavbarContent>
      {isAuthenticated && (
        <NavbarMenu id="main-menu">
          <ul className="mx-4 mt-2 flex flex-col gap-2">
            {menuList()}
            <li className="flex list-none items-center">
              <Exit className="py-2" />
            </li>
          </ul>
        </NavbarMenu>
      )}
    </HeroUINavbar>
  );
};
