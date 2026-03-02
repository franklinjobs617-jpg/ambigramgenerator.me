import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    // 暂时注释掉这里，看看是否是图片配置导致的问题
    /*
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // 先写死一个测试
      },
    ],
    */
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
export default withNextIntl(nextConfig);