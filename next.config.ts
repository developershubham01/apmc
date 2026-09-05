import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    // Assets are pre-optimized JPEGs; serve directly for reliable,
    // fast loading across all environments (including sandbox previews).
    unoptimized: true,
    remotePatterns: [],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
