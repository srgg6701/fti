"use client";
import type { status } from "@/types/ui";

import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/navbar";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@heroui/input";

import { PROTECTED_ROUTES } from "@/lib/shared/protectedRoutes";
import { checkRouteAside, getUrlSegments } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import SortingModal from "@/components/pop-ups/sorting";
import FilterModal from "@/components/pop-ups/filter";
import Backtesting from "@/components/pop-ups/backtesting";
import Notification from "@/components/pop-ups/notification";
import AssetsList from "@/components/pop-ups/assets-list";
import Trades from "@/components/pop-ups/trades";
import Notice from "@/components/pop-ups/notice";
import InviteFriends from "@/components/pop-ups/invite-friends";
import notifications from "@/mockData/notifications";
import Invest from "@/components/pop-ups/invest";
import { Icon, menuIcons } from "@/components/icons";
import "@/styles/style-navbar.css";
import { useUserStore } from "@/lib/store/userStore";

function isProtectedPath(pathname: string) {
  if (!pathname) return false;

  return PROTECTED_ROUTES.some((pattern) => {
    const base = pattern.replace(/\/:path\*$/, "");

    return pathname === base || pathname.startsWith(base + "/");
  });
}

export const Navbar = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const navBarContainer = useRef<HTMLDivElement | null>(null);

  // ЕДИНЫЙ источник правды для меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    setIsMenuOpen(false); // закрываем при смене маршрута
  }, [pathname]);

  // Пример: если нужен особый кейс для защищённых страниц, используйте `isProtected`.
  // (например, скрывать некоторые публичные элементы или сбрасывать состояние)
  // if (isProtected) { ... }

  // ВОЗВРАЩАЮ исходную сигнатуру утилиты — передаём сам хук
  const urlFirstSegment = getUrlSegments(usePathname, 1);
  const urlSecondSegment = getUrlSegments(usePathname, 2);

  const params = useSearchParams();
  const backtestingOpen = params.get("backtesting");
  const investOpen = params.get("invest");
  const noticeOpen = params.get("notice");
  const notificationOpen = params.get("notification");
  const tradeOpen = params.get("trade");
  const assetListOpen = params.get("asset-list");
  const inviteOpen = params.get("invite");

  const [isNotificationOpen, setNotificationOpen] =
    useState<boolean>(!!notificationOpen);
  const [isAssetsListOpen, setAssetsListOpen] =
    useState<boolean>(!!assetListOpen);
  const [isTradeOpen, setTradeOpen] = useState<boolean>(!!tradeOpen);
  const [isNoticeOpen, setNoticeOpen] = useState<boolean>(!!noticeOpen);
  const [isBacktestingOpen, setBacktestingOpen] =
    useState<boolean>(!!backtestingOpen);
  const [isInvestOpen, setInvestOpen] = useState<boolean>(!!investOpen);
  const [isInviteOpen, setInviteOpen] = useState<boolean>(!!inviteOpen);

  const [search_text, setSearch] = useState("");
  const [status, setStatus] = useState<status>("idle");
  const [isNotificationsOpen, setNotifications] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("alphabetical");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (checkRouteAside(urlFirstSegment)) return null;

  let pageHeader = "";

  switch (urlFirstSegment) {
    case "/home":
      pageHeader = "Home";
      break;
    case "/people":
      pageHeader = "Referral system";
      break;
    case "/strategies":
      pageHeader = urlSecondSegment?.includes("strategy")
        ? "Strategy"
        : "Strategies";
      break;
    case "/news":
      pageHeader = "News";
      break;
    case "/profile":
      pageHeader = "Profile";
      break;
    case "/accounts":
      pageHeader = "Accounts";
      break;
    case "/pricing":
      pageHeader = "Tariff Plan";
      break;
    case "/update":
      pageHeader = "Update";
      break;
    case "/verification":
      pageHeader = "Verification";
      break;
    default:
      break;
  }

  const items = siteConfig.navItems;

  const menuList = () => {
    return (
      <>
        {items.map((item) => {
          const iconName = item.href.split("/")[1] as keyof typeof menuIcons;
          const active = urlFirstSegment === item.href;

          return (
            (isAuthenticated || !isProtectedPath(item.href)) && (
              <li key={item.href} className="flex list-none items-center">
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`menu-item flex items-center gap-3 ${active ? "" : "opacity-60 hover:opacity-100"}`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)} // закрыть меню после перехода
                >
                  {Icon({ ...menuIcons[iconName], color: "white" })}
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          );
        })}
      </>
    );
  };

  const MenuRightSide = ({
    className,
    style,
    onClick,
  }: {
    className?: string;
    onClick: () => void;
    style?: React.CSSProperties;
  }) => (
    <div className={className || ""} id="exit-link" style={style}>
      <Image
        alt="Show notifications"
        className="mr-5 inline-block"
        height={20}
        src="/assets/images/icons/bell.png"
        title="Show notifications"
        width={20}
        onClick={onClick}
      />
      <Link
        className="mr-10 inline-block"
        href={siteConfig.innerItems.profile.href}
        onClick={() => setIsMenuOpen(false)}
      >
        <Image
          alt="Account"
          height={24}
          src="/assets/images/icons/user-account.svg"
          style={{ minWidth: 24, minHeight: 24 }}
          title="Your account"
          width={24}
        />
      </Link>
      <Link
        className="menu-item color-ultra-violet font-bold whitespace-nowrap"
        href={siteConfig.innerItems.logout.href}
        onClick={() => setIsMenuOpen(false)}
      >
        Exit
      </Link>
    </div>
  );

  async function getData() {
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 3500));
      setStatus("success");
    } finally {
      setTimeout(() => setStatus("idle"), 1000);
    }
  }

  const filterDataEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") getData();
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
      <Image
        alt={alt}
        height={14}
        src={`/assets/images/service/${action}.svg`}
        width={14}
      />
    </button>
  );

  const Notifications = ({ onClick }: { onClick: () => void }) => (
    <aside className="fixed top-0 right-0 z-[900] h-full w-[460px] bg-[#030303]">
      <button
        className="fixed top-10 right-10 z-[901] cursor-pointer"
        onClick={onClick}
      >
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
      {status === "loading" ? (
        <div className="mb-[-4] bg-blue-200 p-4 text-black">
          Data is loading...
        </div>
      ) : (
        <HeroUINavbar
          ref={navBarContainer}
          aria-label="Main"
          as="nav"
          id="navbar-container"
          isMenuOpen={isMenuOpen}
          maxWidth="xl"
          onMenuOpenChange={setIsMenuOpen}
        >
          {/* desktop */}
          <NavbarContent className="navbar-justify-around basis-1/5 items-center sm:basis-full">
            <div className="block-strategies flex w-full justify-between pt-[40px]">
              <div className="min-w-[240px] min-2xl:flex">
                <h1 className="mr-[1vw] leading-[27px]" id="page-header">
                  {pageHeader}
                </h1>
                {(pageHeader === "Strategies" || pageHeader === "Accounts") && (
                  <div className="relative flex gap-[5px] max-2xl:-mb-10 max-2xl:translate-y-[20px]">
                    <Image
                      alt="Search"
                      className="absolute left-[13px] top-[15px] z-10"
                      height={10}
                      src="/assets/images/service/search-white.svg"
                      width={10}
                    />
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
                <ul className="mr-5 flex items-center gap-[50px]">
                  {menuList()}
                </ul>
              </div>

              <div className="hidden items-center lg:flex">
                <MenuRightSide
                  className="flex"
                  onClick={() => setNotifications(!isNotificationsOpen)}
                />
              </div>
            </div>
          </NavbarContent>

          {/* mobile */}
          <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
            {/* Тоггл не завязываем на isAuthenticated — иначе иногда нечем открыть меню */}
            <NavbarMenuToggle
              aria-controls="main-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarContent>

          {/* HeroUI сам монтирует/порталит */}
          <NavbarMenu className="top-0 z-[1000] !h-full" id="main-menu">
            <button
              className="fixed right-[66px] top-[14px] cursor-pointer"
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                alt="Close menu"
                height={36}
                src="/assets/images/cross/cross-light.svg"
                width={36}
              />
            </button>

            <ul className="mx-4 mt-2 flex flex-col gap-2">
              {menuList()}
              <li className="flex list-none items-center">
                <MenuRightSide
                  className="py-2"
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                  onClick={() => setNotifications(!isNotificationsOpen)}
                />
              </li>
            </ul>
          </NavbarMenu>
        </HeroUINavbar>
      )}

      {/* Notifications panel */}
      {isNotificationsOpen && (
        <Notifications onClick={() => setNotifications(false)} />
      )}

      <SortingModal
        currentSort={currentSort}
        isOpen={isSortingOpen}
        onApply={(sortType) => setCurrentSort(sortType)}
        onClose={() => setIsSortingOpen(false)}
      />
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <Backtesting
        isOpen={isBacktestingOpen}
        onClose={() => setBacktestingOpen(false)}
      />
      <Invest isOpen={isInvestOpen} onClose={() => setInvestOpen(false)} />
      <Notification
        isOpen={isNotificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
      <AssetsList
        isOpen={isAssetsListOpen}
        onClose={() => setAssetsListOpen(false)}
      />
      <Trades isOpen={isTradeOpen} onClose={() => setTradeOpen(false)} />
      <Notice isOpen={isNoticeOpen} onClose={() => setNoticeOpen(false)} />
      <InviteFriends
        isOpen={isInviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
};
