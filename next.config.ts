import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // This will ignore all ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
