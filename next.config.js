/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "admin.sigmabahamas1914.org"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sigmabahamas1914.org',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
