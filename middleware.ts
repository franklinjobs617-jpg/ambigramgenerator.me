import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 建议只保留这个通用的正则，它已经涵盖了语言前缀和根路径，同时排除了静态资源
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};