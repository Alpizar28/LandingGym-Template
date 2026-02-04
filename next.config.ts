import type { NextConfig } from "next";

const isExport = process.env.EXPORT_MODE === 'true';

const nextConfig: NextConfig = {
  output: isExport ? 'export' : undefined,
  images: {
    unoptimized: isExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
