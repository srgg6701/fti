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
    terminal: {
      header: "Terminal",
      href: "/terminal",
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
    login: {
      header: "Login",
      href: "/login",
    },
    logout: {
      header: "Logout",
      href: "/logout",
    },
  },
};

const endpoint = "https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/";
const endpointCurrencies = `${endpoint}currencies/`;
const endpointBalances = `${endpoint}people/`;

export { endpointCurrencies, endpointBalances };
