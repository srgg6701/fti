"use client";
import type { status } from "@/types/ui";
import type { NotificationsData, Notifications } from "@/types/apiData";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

import { PROTECTED_ROUTES } from "@/lib/shared/protectedRoutes";
import { checkRouteAside, getUrlSegments } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { apiFetch } from "@/lib/api";
import SortingModal from "@/components/pop-ups/sorting";
import FilterModal from "@/components/pop-ups/filter";
import Backtesting from "@/components/pop-ups/backtesting";
import Notification from "@/components/pop-ups/notification";
import AssetsList from "@/components/pop-ups/assets-list";
import Trades from "@/components/pop-ups/trades";
import Notice from "@/components/pop-ups/notice";
import InviteFriends from "@/components/pop-ups/invite-friends";
//import notifications from "@/mockData/notifications";
import Invest from "@/components/pop-ups/invest";
import { Icon, menuIcons } from "@/components/icons";
import "@/styles/style-navbar.css";
import StrategiesSearchSortFilter from "@/components/strategies-search-sort-filter";
import { useUserStore } from "@/lib/store/userStore";

const items = siteConfig.navItems;
const innerItems = siteConfig.innerItems;

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
  const [notifications, setNotificationsData] = useState<NotificationsData[]>(
    [],
  );
  const pathname = usePathname();

  useLayoutEffect(() => {
    setIsMenuOpen(false); // закрываем при смене маршрута
  }, [pathname]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userNotifications = await apiFetch<Notifications>(
          `/api${innerItems.notifications.get.all.href}`,
        );

        setNotificationsData(userNotifications?.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (isAuthenticated) fetchNotifications();
  }, [isAuthenticated]);

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

  const [status, setStatus] = useState<status>("idle");
  const [isNotificationsOpen, setNotifications] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("alphabetical");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSortingOpen = () => {
    setIsSortingOpen(!isSortingOpen);
  };
  const handleFilteringOpen = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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
    case "/policies":
      switch (urlSecondSegment) {
        case "/terms-of-services":
          pageHeader = "Terms of Services";
          break;
        case "/privacy-policy":
          pageHeader = "Privacy Policy";
          break;
        case "/refund-policy":
          pageHeader = "Refund Policy";
          break;
      }
      break;
    default:
      break;
  }

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
    <div
      className={`${className || ""} cursor-pointer`}
      id="exit-link"
      style={style}
    >
      {isAuthenticated ? (
        <>
          <Image
            alt="Show notifications"
            className="mr-5 inline-block"
            height={20}
            src="/assets/images/icons/bell.png"
            title="Show notifications"
            width={20}
            onClick={() => {
              onClick();
              setIsMenuOpen(false);
            }}
          />
          <Link
            className="mr-10 inline-block"
            href={innerItems.profile.href}
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
            href={innerItems.auth.logout.href_ui}
            onClick={() => setIsMenuOpen(false)}
          >
            Exit
          </Link>
        </>
      ) : (
        <Link className="menu-item" href={innerItems.auth.login.href_ui}>
          Login
        </Link>
      )}
    </div>
  );

  const calculateNotificationTimeAgo = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const notificator = () => (
    <div className="h-[8px] w-[8px] bg-[var(--color-blue-canonical)] rounded-[50%]" />
  );

  const Notifications = ({ onClick }: { onClick: () => void }) => (
    <aside className="fixed top-0 right-0 z-[40] h-full w-[460px] bg-[#030303]">
      <button
        className="fixed top-10 right-10 z-[41] cursor-pointer"
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
        {(notifications.length &&
          notifications.map((note) => (
            <button
              key={note.id}
              className={`[scroll-snap-align:start] py-2.5 hover:-mx-10 hover:px-10 ${note.isRead && "bg-light-middle cursor-pointer"} text-left`}
              title={`${(note.isRead && "Click to mark it read") || ""}`}
              onClick={() => markAsRead(note)}
            >
              <div className="flex gap-2.5 items-center">
                <div>{note.title}</div>
                {note.isRead && notificator()}
                <div className="opacity-30">
                  {calculateNotificationTimeAgo(note.createdAt)}
                </div>
              </div>
              <div className="opacity-50">{note.content}</div>
            </button>
          ))) || (
          <div className="items-center flex flex-col pt-20">
            <Image
              alt="No notifications"
              className="mb-5"
              height={77}
              src="/assets/images/bell.jpg"
              width={64}
            />
            <p className="opacity-50">No notifications yet</p>
            <p className="opacity-30 text-sm">
              You will see important updates here
            </p>
          </div>
        )}
      </div>
    </aside>
  );

  const markAsRead = (note: NotificationsData) => {
    if (note.isRead) return;

    const path = `/api${innerItems.notifications.handle.href(note.id)}`;

    apiFetch(path, {
      method: "PUT",
    })
      .then(() => {
        // Обновляем список уведомлений после пометки как прочитанное
        setNotificationsData((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === note.id
              ? {
                  ...notification,
                  isRead: true,
                  readAt: new Date().toISOString(),
                }
              : notification,
          ),
        );
      })
      .catch((error) => {
        console.error("Error marking notification as read:", error);
      });
  };

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
                  <StrategiesSearchSortFilter
                    handleFiltering={handleFilteringOpen}
                    handleSorting={handleSortingOpen}
                    {...{ setStatus }}
                  />
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
