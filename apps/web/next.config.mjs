/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hk/mortgage-engine", "@hk/shared-types", "@hk/ui"],
};

export default nextConfig;
