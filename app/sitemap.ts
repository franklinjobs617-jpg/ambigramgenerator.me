import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const domain = 'https://www.ambigramgenerator.me'
    const locales = ['en', 'fr', 'de']

    const routes = [
        '', // 首页
        '/3d-generator', '/about', '/faq', '/free-generator', '/generator',
        '/privacy', '/tattoo-design', '/terms', '/what-is-ambigram',
        '/guide/2d-vs-3d-design', '/guide/advanced-3d-controls', '/guide/ambigram-history-art',
        '/guide/best-online-tools', '/guide/flipscript-principles', '/guide/name-generator-secrets',
        '/guide/ultimate-free-generator', '/tutorial/multi-word-guide', '/tutorial/tattoo-design',
        '/tutorial/two-name-ambigram',
    ]

    return routes.flatMap((route) =>
        locales.map((locale) => {
            const isDefaultEn = locale === 'en'
            const isHomepage = route === ''

            let url: string
            if (isDefaultEn && isHomepage) {
                url = `${domain}/`
            } else {
                const langPrefix = isDefaultEn ? '' : `/${locale}`
                url = `${domain}${langPrefix}${route}`
            }

            return {
                url: url,
                lastModified: new Date(),
                changeFrequency: 'monthly', // 修复类型问题
                priority: getPriority(route),
                alternates: {
                    languages: {
                        en: isHomepage ? `${domain}/` : `${domain}${route}`,
                        fr: `${domain}/fr${route}`,
                        de: `${domain}/de${route}`,
                    },
                },
            }
        })
    )
}

function getPriority(path: string): number {
    if (path === '') return 1.0
    if (path.includes('generator')) return 0.9
    if (path.startsWith('/guide') || path.startsWith('/tutorial')) return 0.8
    return 0.5
}