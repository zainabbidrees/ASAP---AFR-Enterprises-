/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // AFR uses trailing-slash URLs everywhere (e.g. /manufacturer/, /part-types/electronics/).
  trailingSlash: true,
  // Two dev servers in one checkout corrupt each other's chunks by sharing
  // .next. Set NEXT_DIST_DIR to give a second server its own build directory.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
