export type SiteConfig = typeof siteConfig;

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
export const siteConfig = {
  name: "Fintech Trade Innovation",
  description: "App for fintech services",
  // items order matters since it defines the menu's order appearance
  navItems: [
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
  ],
  innerItems: {
    auth: {
      register: {
        header: "Create account",
        href: "/auth/register",
      },
      login: {
        header: "Login",
        href: "/auth/login",
      },
      logout: {
        header: "Logout",
        href: "/auth/logout",
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
    terminal: {
      header: "Terminal",
      href: "/terminal",
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
