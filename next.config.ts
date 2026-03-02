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
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
export default withNextIntl(nextConfig);
