import { MetadataRoute } from 'next'

const baseUrl = 'https://www.ambigramgenerator.me'

const locales = ['en', 'fr', 'de', 'es', 'it']

const localizedUrl = (locale: string, page: string) => {
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  return `${baseUrl}${localePrefix}${page}`
}

const multiLangPages = [
  '',
  '/3d-generator',
  '/about',
  '/ai-tattoo-generator',
  '/ai-tattoo-generator/cover-up',
  '/ai-tattoo-generator/names',
  '/ai-tattoo-generator/3d-stl',
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
  '/two-word-ambigram-generator',
]

const englishOnlyPages = [
  '/ambigram-examples',
  '/love-pain-ambigram',
  '/ambigram-word-tattoos',
  '/guide/words-that-spell-words-upside-down',
  '/mirror-text-generator',
  '/illuminati-ambigram',
  '/pricing',
  '/flipscript-alternative',
  '/ambigram-tattoo-generator',
  '/ambigram-name-generator',
  '/john-langdon-ambigram',
]

// 意大利语专属落地页
const italianOnlyPages = [
  '/ambigramma-con-due-nomi',
  '/ambigramma-3d',
]

// 法语专属落地页
const frenchOnlyPages = [
  '/generateur-ambigramme-prenom',
  '/generateur-ambigramme',
]

// 西班牙语专属落地页
const spanishOnlyPages = [
  '/generador-ambigramas-nombres',
]

// 德语专属落地页
const germanOnlyPages = [
  '/ambigramm-erstellen',
  '/ambigramm-zwei-namen',
]

// 葡萄牙语专属落地页
const portugueseOnlyPages = [
  '/gerador-ambigramas-nomes',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []

  multiLangPages.forEach((page) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: localizedUrl(locale, page),
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : page.includes('guide') || page.includes('tutorial') ? 0.7 : 0.8,
        alternates: {
          languages: locales.reduce((acc, lang) => {
            acc[lang] = localizedUrl(lang, page)
            return acc
          }, { 'x-default': localizedUrl('en', page) } as Record<string, string>),
        },
      })
    })
  })

  englishOnlyPages.forEach((page) => {
    sitemapEntries.push({
      url: localizedUrl('en', page),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  italianOnlyPages.forEach((page) => {
    sitemapEntries.push({
      url: localizedUrl('it', page),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    })
  })

  frenchOnlyPages.forEach((page) => {
    sitemapEntries.push({
      url: localizedUrl('fr', page),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    })
  })

  spanishOnlyPages.forEach((page) => {
    sitemapEntries.push({
      url: localizedUrl('es', page),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    })
  })

  portugueseOnlyPages.forEach((page) => {
    sitemapEntries.push({
      url: localizedUrl('pt', page),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    })
  })

  germanOnlyPages.forEach((page) => {
    sitemapEntries.push({
      url: localizedUrl('de', page),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    })
  })

  return sitemapEntries
}
