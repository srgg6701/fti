/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://138.124.31.142:3001/api/:path*',
      },
    ];
  },};

module.exports = nextConfig;
