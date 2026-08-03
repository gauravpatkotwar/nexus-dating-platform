const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  swcMinify: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
