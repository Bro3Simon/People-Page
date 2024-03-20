/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.datocms-assets.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
