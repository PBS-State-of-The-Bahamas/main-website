/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "admin.sigmabahamas1914.org"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_TOKEN: process.env.NEXT_PUBLIC_TOKEN,
  },
};

module.exports = nextConfig;
