// lib/seo.ts
import type { Metadata } from "next";

const DOMAIN = "https://www.ambigramgenerator.me";

// 生成带语言前缀的 URL
// en -> https://.../path
// fr -> https://.../fr/path
export const getUrl = (locale: string, path: string) => {
    if (path === '' && locale === 'en') return `${DOMAIN}/${path}`;
    const langPath = locale === 'en' ? '' : `/${locale}`;
    return `${DOMAIN}${langPath}${path}`;
};

interface SeoConfig {
    title: string;
    description: string;
    path: string; // 当前页面的路径，例如 "/generator"
    locale: string; // 当前语言
    image?: string;
}

// 🌟 核心封装函数
export function constructMetadata({ title, description, path, locale, image = "/logo.png" }: SeoConfig): Metadata {
    const canonicalUrl = getUrl(locale, path);

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            // 🌟 在这里统一配置所有 hreflang，所有调用此函数的页面都会自动生效
            languages: {
                "en": getUrl("en", path),
                "fr": getUrl("fr", path),
                "de": getUrl("de", path),
                "es": getUrl("es", path),
                "it": getUrl("it", path),
                "x-default": getUrl("en", path), // x-default 指向默认英语版
            },
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            images: [{ url: image }],
            type: "website",
            siteName: "AmbigramGenerator",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}