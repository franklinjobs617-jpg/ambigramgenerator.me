import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'fr', 'de', 'es', 'it', 'pt'] as const;
const defaultLocale = 'en'
export { locales, defaultLocale };

export default getRequestConfig(async ({ requestLocale }: any) => {
    const locale = await requestLocale;
    const safeLocale = locales.includes(locale as any) ? locale : defaultLocale;
    return {
        locale: safeLocale,
        messages: (await import(`../messages/${safeLocale}.json`)).default
    };
});
