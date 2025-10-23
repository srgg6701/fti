module.exports = {
  async rewrites() {
    return [
      // let Next.js (next-auth) handle its own API endpoints locally
      { source: '/api/auth/providers', destination: '/api/auth/providers' },
      { source: '/api/auth/signin', destination: '/api/auth/signin' },
      // allow signin with provider segment (e.g. /api/auth/signin/google)
      { source: '/api/auth/signin/:provider*', destination: '/api/auth/signin/:provider*' },
      { source: '/api/auth/signout', destination: '/api/auth/signout' },
      // optionally allow signout with provider segment
      { source: '/api/auth/signout/:provider*', destination: '/api/auth/signout/:provider*' },
      { source: '/api/auth/session', destination: '/api/auth/session' },
      { source: '/api/auth/csrf', destination: '/api/auth/csrf' },
      // callback for any provider (e.g. /api/auth/callback/google)
      { source: '/api/auth/callback/:provider*', destination: '/api/auth/callback/:provider*' },

      // proxy all other /api/* calls to external API
      { source: '/api/:path*', destination: 'https://api.fti-trade.com/:path*' },
    ];
  },
  images: {
    domains: [
      'public.bnbstatic.com',
      'yt3.googleusercontent.com',
      'avatars.mds.yandex.net',
      'altcoinsbox.com',
      'api.fti-trade.com',
    ],
  },
};
