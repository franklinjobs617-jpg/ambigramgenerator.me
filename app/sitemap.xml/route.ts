import { NextResponse } from 'next/server';

const DOMAIN = 'https://www.ambigramgenerator.me';
const locales = ['en', 'fr', 'de'];

const routes = [
    '', '/3d-generator', '/about', '/faq', '/free-generator', '/generator',
    '/privacy', '/tattoo-design', '/terms', '/what-is-ambigram',
    '/guide/2d-vs-3d-design', '/guide/advanced-3d-controls', '/guide/ambigram-history-art',
    '/guide/best-online-tools', '/guide/flipscript-principles', '/guide/name-generator-secrets',
    '/guide/ultimate-free-generator', '/tutorial/multi-word-guide', '/tutorial/tattoo-design',
    '/tutorial/two-name-ambigram'
];

function getPriority(path: string): string {
    if (path === '') return '1.0';
    if (path.includes('generator')) return '0.9';
    if (path.startsWith('/guide') || path.startsWith('/tutorial')) return '0.8';
    return '0.5';
}

export async function GET() {
    const lastModified = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    routes.forEach((route) => {
        locales.forEach((locale) => {
            const isDefaultEn = locale === 'en';
            const isHomepage = route === '';

            // 组装当前 URL
            let locUrl = '';
            if (isDefaultEn && isHomepage) locUrl = `${DOMAIN}/`;
            else locUrl = `${DOMAIN}${isDefaultEn ? '' : `/${locale}`}${route}`;

            xml += `\n  <url>\n    <loc>${locUrl}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${getPriority(route)}</priority>`;

            // 组装 hreflang
            locales.forEach((altLocale) => {
                const isAltEn = altLocale === 'en';
                let altUrl = '';
                if (isAltEn && isHomepage) altUrl = `${DOMAIN}/`;
                else altUrl = `${DOMAIN}${isAltEn ? '' : `/${altLocale}`}${route}`;

                if (isAltEn) {
                    xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${altUrl}" />`;
                }
                xml += `\n    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}" />`;
            });

            xml += `\n  </url>`;
        });
    });

    xml += `\n</urlset>`;

    // 强制返回 XML 头信息，跳过所有 UI 渲染逻辑
    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
        },
    });
}