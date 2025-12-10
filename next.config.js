/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false, // Enable Next.js image optimization
    remotePatterns: [],
  },
  // Ensure proper routing
  trailingSlash: false,
}

module.exports = nextConfig

