import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 允许所有 HTTPS 域名的图片
      },
      {
        protocol: 'http',
        hostname: '**', // 允许所有 HTTP 域名的图片（如果需要）
      },
    ],
  },
  eslint: {
    // 警告：这将允许即使有 ESLint 错误也能完成生产构建
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 警告：这将允许即使有 TypeScript 错误也能完成生产构建
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
export default withNextIntl(nextConfig);
