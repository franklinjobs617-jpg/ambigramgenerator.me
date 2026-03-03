import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
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
  async redirects() {
    return [
      {
        source: '/generator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/free-generator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|de)/generator',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|de)/free-generator',
        destination: '/:locale',
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
export default withNextIntl(nextConfig);