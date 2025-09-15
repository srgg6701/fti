'use client';
import { useState, useRef } from 'react';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from '@heroui/navbar';
import Link from 'next/link';
// FIXME: clarify if we can get rid from clsx and remove if we can
//import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@heroui/input';

import { checkRouteAside, getUrlSegments } from '@/lib/utils';
import { siteConfig } from '@/config/site';
//import { ThemeSwitch } from '@/components/theme-switch';
import { useUserStore } from '@/lib/store/userStore';
import { filterData } from '@/components/dataSections';
import SortingModal from '@/components/pop-ups/sorting';
import FilterModal, { type FilterState } from '@/components/pop-ups/filter';
import notifications from '@/mockData/notifications';

import { Icon, menuIcons } from '../icons';
import '@/styles/style-navbar.css';

export const Navbar = () => {
  const navBarContainer = useRef<HTMLElement | null>(null);

  // TODO: Check if it makes sense to leave it here:
  const { isAuthenticated } = useUserStore();
  const urlFirstSegment = getUrlSegments(usePathname, 1);
  const urlSecondSegment = getUrlSegments(usePathname, 2);

  const [search_text, setSearch] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isNotificationsOpen, setNotifications] = useState(false);
  // SORT
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('alphabetical');
  // FILTER
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    growthType: 'all',
    strategyType: 'stocks',
    winningRatio: 1,
    posIndicator: 0,
  });

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
      if (urlSecondSegment?.includes('strategy')) {
        pageHeader = 'Strategy';
        console.log('pageHeader', pageHeader);
        break;
      }
      pageHeader = 'Strategies';
      break;
    case '/news':
      pageHeader = 'News';
      break;
    case '/account':
      pageHeader = 'Account';
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

  const Exit = ({ className, onClick }: { className?: string; onClick: () => void }) => (
    <div className={className || ''} id="exit-link">
      <Image
        alt="Show notifications"
        className="mr-3 inline-block"
        height="16"
        src="/assets/images/icons/bell.png"
        style={{ height: '16px' }}
        title="Show notifications"
        width="16"
        onClick={onClick}
      />
      <Link className="menu-item color-ultra-violet whitespace-nowrap" href="/logout">
        Exit
      </Link>
    </div>
  );

  async function getData() {
    console.log('Get data...');
    setStatus('loading');
    try {
      /* await apiFetch('/auth/search', {
        method: 'GET',
        body: JSON.stringify({ query: search_text }),
        }); */
      /****** send request to the endpoint to get the confirmation code ******/
      await new Promise((r) => setTimeout(r, 3500));
      console.log('Get data...');
      setStatus('success');
      //router.push('/login');
    } catch (e) {
      //setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 1000);
    }
  }

  const filterDataEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      getData();
      //e.preventDefault(); // если нужно отменить сабмит формы
      filterData(`Enter: filtered data by ${search_text}`);
    }
  };
  // TODO: clairify if we have the button to call this function
  const filterDataClick = () => {
    getData();
    filterData(`Click: filtered data by ${search_text}`);
  };

  const SetSearchCommands = ({
    action,
    alt,
    title,
    onClick,
  }: {
    action: string;
    alt: string;
    title: string;
    onClick: () => void;
  }) => (
    <button
      className="standard-block-decoration-40 bg-translusent-light w-[40px] p-[13px]"
      title={title}
      type="button"
      onClick={onClick}
    >
      <Image alt={alt} height={14} src={`/assets/images/service/${action}.svg`} width={14} />
    </button>
  );

  const Notifications = ({ onClick }: { onClick: () => void }) => (
    <aside className="scroller vertical top-0 right-0 z-40 h-full w-[460px] bg-[#030303]">
      <button className="fixed top-10 right-10 z-42 cursor-pointer" onClick={onClick}>
        <Image
          alt="Close pop-up"
          height={36}
          src="/assets/images/cross/cross-light.svg"
          width={36}
        />
      </button>
      <div className="row is-vertical h-full max-w-[460px] overflow-y-auto px-10">
        <h3 className="aside mb-[30px] pt-20 pb-5">Notifications</h3>
        {notifications.map((note) => (
          <div key={note.id} className="[scroll-snap-align:start] py-2.5">
            <div className="flex gap-2.5">
              <div>{note.title}</div>
              <div className="opacity-30">{note.timeAgo}</div>
            </div>
            <div className="opacity-50">{note.preview}</div>
          </div>
        ))}
      </div>
    </aside>
  );

  return (
    <>
      {status === 'loading' ? (
        <div className="mb-[-4] bg-blue-200 p-4 text-black">Data is loading...</div>
      ) : (
        <HeroUINavbar
          ref={navBarContainer}
          aria-label="Main"
          as="nav"
          id="navbar-container"
          maxWidth="xl"
        >
          {/* desktop */}
          <NavbarContent className="navbar-justify-around basis-1/5 items-center sm:basis-full">
            <div className="block-strategies flex w-full justify-between pt-[40px]">
              <div className="min-w-[240px] min-2xl:flex">
                <h1 className="mr-[1vw] leading-[27px]" id="page-header">
                  {pageHeader}
                </h1>
                {pageHeader === 'Strategies' && (
                  <div className="flex gap-[5px] max-2xl:-mb-10 max-2xl:translate-y-[20px]">
                    <Input
                      className="standard-block-decoration-40"
                      placeholder="Enter your search request"
                      type="search"
                      value={search_text}
                      onKeyDown={filterDataEnter}
                      onValueChange={setSearch}
                    />
                    <SetSearchCommands
                      action="sort"
                      alt="Sort search results"
                      title="Click to sort records"
                      onClick={() => setIsSortingOpen(!isSortingOpen)}
                    />
                    <SetSearchCommands
                      action="set"
                      alt="Set search results"
                      title="Click to filter records by search string"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    />
                  </div>
                )}
              </div>
              <div className="hidden lg:flex" id="menu-container">
                <ul className="flex items-center gap-[50px]">{menuList()}</ul>
                {/* <ThemeSwitch /> */}
              </div>
              <div className="hidden items-center lg:flex">
                <Exit onClick={() => setNotifications(!isNotificationsOpen)} />
              </div>
            </div>
          </NavbarContent>
          {/* mobile */}
          <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
            {/* <ThemeSwitch /> */}
            {isAuthenticated && (
              <NavbarMenuToggle aria-controls="main-menu" aria-label="Open menu" />
            )}
          </NavbarContent>
          {isAuthenticated && (
            <NavbarMenu id="main-menu">
              <ul className="mx-4 mt-2 flex flex-col gap-2">
                {menuList()}
                <li className="flex list-none items-center">
                  <Exit className="py-2" onClick={() => setNotifications(!isNotificationsOpen)} />
                </li>
              </ul>
            </NavbarMenu>
          )}
        </HeroUINavbar>
      )}
      <SortingModal
        currentSort={currentSort}
        isOpen={isSortingOpen}
        onApply={(sortType) => {
          setCurrentSort(sortType);
        }}
        onClose={() => setIsSortingOpen(false)}
      />
      <FilterModal
        initialFilters={filters}
        isOpen={isFilterOpen}
        onApply={(newFilters) => {
          setFilters(newFilters);
          // Ваша логика фильтрации
        }}
        onClose={() => setIsFilterOpen(false)}
      />
      {isNotificationsOpen && <Notifications onClick={() => setNotifications(false)} />}
    </>
  );
};
