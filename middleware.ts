

// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 重点：在第一个括号内明确排除 sitemap.xml 和 robots.txt
  matcher: [
    // 1. 匹配国际化路由
    '/',
    '/(de|en|es|fr|it|ja|ko|zh)/:path*',

    // 2. 匹配其他页面，但排除特定的静态文件和文件夹
    // 修正后的正则：确保 sitemap|robots 被排除在外
    '/((?!api|_next|_vercel|sitemap\\.xml|robots\\.txt|.*\\..*).*)'
  ]
};