module.exports = {
  async rewrites() {
    return [{ source: '/api/:path*', destination: `https://api.fti-trade.com/:path*` }];
  },
   images: {
    domains: ['public.bnbstatic.com', 'yt3.googleusercontent.com', 'avatars.mds.yandex.net', 'altcoinsbox.com'],
  },
} 
