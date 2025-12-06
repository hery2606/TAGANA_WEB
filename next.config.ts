import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/TAGANA_WEB',
  assetPrefix: '/TAGANA_WEB/',
};

export default nextConfig;
