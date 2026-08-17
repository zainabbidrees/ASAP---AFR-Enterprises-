/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // AFR uses trailing-slash URLs everywhere (e.g. /manufacturer/, /part-types/electronics/).
  trailingSlash: true,
};

export default nextConfig;
