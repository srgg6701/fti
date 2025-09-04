/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://138.124.31.142:3001/api/:path*',
      },
    ];
  },};

module.exports = nextConfig;
