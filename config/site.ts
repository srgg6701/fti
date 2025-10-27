export type SiteConfig = typeof siteConfig;
export interface MenuItem {
  label: string;
  href: string;
}
export interface NavItem extends MenuItem {
  protected: boolean;
}

export const routeAliases = {
  home: "home",
  people: "people",
  strategies: "strategies",
  pricing: "pricing",
  news: "news",
};
/* export const routeAliasesSecond = {
  homeStrategies: `${routeAliases.home}/strategies`,
}; */
export const navItems: NavItem[] = [
  {
    label: "Home",
    href: `/${routeAliases.home}`,
    protected: true,
  },
  {
    label: "People",
    href: `/${routeAliases.people}`,
    protected: true,
  },
  {
    label: "Strategies",
    href: `/${routeAliases.strategies}`,
    protected: true,
  },
  {
    label: "Pricing",
    href: `/${routeAliases.pricing}`,
    protected: false,
  },
  {
    label: "News",
    href: `/${routeAliases.news}`,
    protected: true,
  },
];
const policiesPath = "/policies";

export const navItemsBottom: MenuItem[] = [
  {
    label: "Privacy Policy",
    href: `${policiesPath}/privacy-policy`,
  },
  {
    label: "Refund Policy",
    href: `${policiesPath}/refund-policy`,
  },
  {
    label: "Terms of Services",
    href: `${policiesPath}/terms-of-services`,
  },
];

export const siteConfig = {
  name: "Fintech Trade Innovation",
  description: "App for fintech services",
  // items order matters since it defines the menu's order appearance
  navItems,
  navItemsBottom,
  innerItems: {
    auth: {
      register: {
        header: "Create account",
        href: "/auth/register",
      },
      login: {
        header: "Login",
        href: "/auth/login",
        href_ui: "/login",
      },
      logout: {
        header: "Logout",
        href: "/auth/logout",
        href_ui: "/logout",
      },
      me: {
        header: "My data",
        href: "/auth/me",
      },
      refresh: {
        header: "Refresh token",
        href: "/auth/refresh",
      },
    },
    subscriptions: {
      user_subscriptions: {
        header: "User subscriptions",
        href: "/subscriptions/user-subscriptions",
      },
    },
    accounts: {
      header: "Accounts",
      href: "/accounts",
    },
    balance: {
      equity: {
        account: {
          header: "Account",
          getEndpointUrl: (accountId: number) =>
            `balance/equity/account/${accountId}/current`,
        },
        chart: {
          header: "Chart",
          href: "/balance/equity/chart",
        },
      },
      status: {
        header: "Balance",
        href: "/balance/status",
      },
    },
    notifications: {
      get: {
        all: {
          header: "Notifications",
          href: "/notifications",
        },
      },
      handle: {
        header: "Mark as read",
        href: (id: string) => `/notifications/${id}/read`,
      },
    },
    portfolio: {
      header: "Portfolio",
      href: "/portfolio",
    },
    portfolio_balancer: {
      header: "Portfolio balancer",
      href: "/portfolio_balancer",
    },
    profile: {
      header: "Profile",
      href: "/profile",
    },
    personal_information: {
      header: "Profile",
      href: "/profile/personal-information",
    },
    equity: {
      header: "Equity",
      href: "/statistics/universal-equity",
    },
    terminal: {
      header: "Terminal",
      href: "/terminal",
    },
    statistics: {
      header: "Statistics",
      strategies: {
        href: "/statistics/strategies",
      },
    },
    trade_systems: {
      header: "Trade systems",
      href: "/trade-systems",
    },
    trading_accounts: {
      user_accounts: {
        header: "Trading accounts",
        href: "/trading-accounts/user-accounts",
      },
    },
    trading_history: {
      header: "Trading history",
      href: "/trading_history",
    },
    add_forex_account: {
      header: "Add forex account",
      href: "/add_forex_account",
    },
    new_provider: {
      header: "New provider",
      href: "/new_provider",
    },
  },
};

const endpoint = "https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/";
const endpointCurrencies = `${endpoint}currencies/`;
const endpointBalances = `${endpoint}people/`;

export { endpointCurrencies, endpointBalances };
