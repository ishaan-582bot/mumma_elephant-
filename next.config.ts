import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'build',
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
