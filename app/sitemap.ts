import { MetadataRoute } from 'next'

const baseUrl = 'https://ambigramgenerator.me'

const locales = ['en', 'fr', 'de', 'es', 'it']

const multiLangPages = [
  '',
  '/3d-generator',
  '/about',
  '/best-ai-tattoo-generator',
  '/faq',
  '/privacy',
  '/tattoo-design',
  '/tattoo-stencil-maker',
  '/terms',
  '/upside-down-text-generator',
  '/what-is-ambigram',
  '/guide/2d-vs-3d-design',
  '/guide/advanced-3d-controls',
  '/guide/ambigram-history-art',
  '/guide/best-online-tools',
  '/guide/flipscript-principles',
  '/guide/how-to-use-tattoo-stencils',
  '/guide/name-generator-secrets',
  '/guide/ultimate-free-generator',
  '/tutorial/multi-word-guide',
  '/tutorial/tattoo-design',
  '/tutorial/two-name-ambigram',
]

const englishOnlyPages = [
  '/ambigram-examples',
  '/love-pain-ambigram',
  '/ambigram-word-tattoos',
  '/guide/words-that-spell-words-upside-down',
  '/mirror-text-generator',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []

  multiLangPages.forEach((page) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : page.includes('guide') || page.includes('tutorial') ? 0.7 : 0.8,
        alternates: {
          languages: locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}${page}`
            return acc
          }, {} as Record<string, string>),
        },
      })
    })
  })

  englishOnlyPages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  return sitemapEntries
}