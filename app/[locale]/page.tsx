import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent"; // 引入你的客户端组件

// 辅助函数：构建 URL
const DOMAIN = "https://www.ambigramgenerator.me";
const getUrl = (locale: string) => {
    return `${DOMAIN}${locale === 'en' ? '' : `/${locale}`}`;
};

type Props = {
    params: Promise<{ locale: string }>;
};

// 1. 动态生成 SEO Metadata (服务端执行)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const canonicalUrl = getUrl(locale);

    // 默认英语 SEO
    let title = "Free 3D Ambigram Generator | Two-Name Tattoo Design & STL";
    let description = "Create unique 3D and 2D ambigrams instantly. The #1 free tool for two-name tattoo designs and 3D printable STLs. A better Flipscript alternative with no signup.";

    // 法语 SEO
    if (locale === 'fr') {
        title = "Générateur d'Ambigramme 3D Gratuit | Tatouage 2 Prénoms & STL";
        description = "Créez des ambigrammes 3D et 2D uniques instantanément. Le meilleur outil gratuit pour les tatouages à deux prénoms et l'impression 3D (STL). Une meilleure alternative à Flipscript sans inscription.";
    }

    // 德语 SEO
    if (locale === 'de') {
        title = "Kostenloser Ambigramm Generator | 2 Namen & 3D Schriftzug erstellen";
        description = "Kostenlos 3D & 2D Ambigramme erstellen. Das beste Tool für Tattoo Vorlagen (2 Namen) und 3D-Druck (STL). 100% kostenlos & ohne Anmeldung. Die Flipscript Alternative.";
    }

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                "en": `${DOMAIN}/`,
                "fr": `${DOMAIN}/fr`,
                "de": `${DOMAIN}/de`,
            }
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: 'website',
            siteName: 'AmbigramGenerator',
            images: [
                {
                    url: '/logo.png', // 确保 public 目录下有这个图
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/logo.png'],
        },
    };
}

// 2. 页面主入口
export default async function HomePage({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据 (SoftwareApplication + WebSite)
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": "AmbigramGenerator",
                "url": DOMAIN,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${DOMAIN}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "SoftwareApplication",
                "name": "Ambigram Generator",
                "applicationCategory": "DesignApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "1250",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "description": "Free tool to create 3D ambigrams and two-name tattoo designs.",
                "image": `${DOMAIN}/logo.png`
            }
        ]
    };

    return (
        <>
            {/* 注入 SEO 结构化数据 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 加载客户端交互组件 */}
            <HomeContent />
        </>
    );
}