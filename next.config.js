module.exports = {
  async rewrites() {
    return [{ source: '/api/:path*', destination: `https://api.fti-trade.com/:path*` }];
  },
} 
