const isDev = process.env.NODE_ENV !== 'production';
const API_BASE = (process.env.API_BASE ?? 'https://fti-trade.online/api').replace(/\/$/, ''); /* 'https://api.fti-trade.com' */

module.exports = isDev ? {
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_BASE}/:path*` }];
  },
} : {};
