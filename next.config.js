/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: "true",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
