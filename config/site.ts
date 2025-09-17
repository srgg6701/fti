export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Fintech Trade Innovation',
  description: 'App for fintech services',
  navItems: [
    {
      label: 'Home',
      href: '/home',
      protected: true,
    },
    {
      label: 'People',
      href: '/people',
      protected: true,
    },
    {
      label: 'Strategies',
      href: '/strategies',
      protected: true,
    },
    {
      label: 'Pricing',
      href: '/pricing',
      protected: false,
    },
    {
      label: 'News',
      href: '/news',
      protected: true,
    },
    /* {
      label: 'Account',
      href: '/account',
      protected: true,
    } ,*/
    /* {
      label: 'Logout',
      href: '/logout',
      protected: true,
    }, */
  ],
};

const endpoint = 'https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/';
const endpointCurrencies = `${endpoint}currencies/`;
const endpointBalances = `${endpoint}people/`;

export { endpointCurrencies, endpointBalances };
