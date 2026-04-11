import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  serverExternalPackages: ['nodemailer'],
};

export default nextConfig;
