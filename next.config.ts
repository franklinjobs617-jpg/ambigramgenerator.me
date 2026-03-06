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
  allowedDevOrigins: ['http://localhost:3000', 'http://localhost:3001'], // 允许在开发环境中使用这些来源的图片
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml', // 明确指向静态资源，不经过页面路由
      },
    ];
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
        source: '/:locale(en|fr|de|es|it|ja|ko|zh)/generator',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|de|es|it|ja|ko|zh)/free-generator',
        destination: '/:locale',
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
export default withNextIntl(nextConfig);