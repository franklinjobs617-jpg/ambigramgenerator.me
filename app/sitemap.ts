


import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const domain = 'https://www.ambigramgenerator.me'
    const locales = ['en', 'fr', 'de']

    // 路由列表：使用空字符串 '' 代表首页，确保路径以 / 开头
    const routes = [
        '', // 首页
        '/3d-generator',
        '/about',
        '/faq',
        '/privacy',
        '/tattoo-design',
        '/terms',
        '/what-is-ambigram',
        '/guide/2d-vs-3d-design',
        '/guide/advanced-3d-controls',
        '/guide/ambigram-history-art',
        '/guide/best-online-tools',
        '/guide/flipscript-principles',
        '/guide/name-generator-secrets',
        '/guide/ultimate-free-generator',
        '/tutorial/multi-word-guide',
        '/tutorial/tattoo-design',
        '/tutorial/two-name-ambigram',
    ]

    return routes.flatMap((route) =>
        locales.map((locale) => {
            const isDefaultEn = locale === 'en'
            const isHomepage = route === ''

            // 🌟 核心逻辑：处理 URL
            let url: string
            if (isDefaultEn && isHomepage) {
                // 只有英语首页带 /
                url = `${domain}/`
            } else {
                // 其他情况：默认 En 不带前缀，Fr/De 带前缀，且拼接 route 后不加 /
                const langPrefix = isDefaultEn ? '' : `/${locale}`
                url = `${domain}${langPrefix}${route}`
            }

            return {
                url: url,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: getPriority(route),
                // 🌟 配置 SEO 语言互联标签 (hreflang)
                // 这里的 alternates 也必须遵循同样的斜杠规则
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