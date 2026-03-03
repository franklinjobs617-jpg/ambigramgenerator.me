import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent"; // 引入你的客户端组件
import { constructMetadata } from "@/lib/seo";

// 辅助函数：构建 URL
const DOMAIN = "https://www.ambigramgenerator.me";
const getUrl = (locale: string) => {
    return `${DOMAIN}${locale === 'en' ? '' : `/${locale}`}`;
};

type Props = {
    params: { locale: string };
};

// 1. 动态生成 SEO Metadata (服务端执行)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    // 默认英语 SEO
    // let title = "Free 3D Ambigram Generator | Two-Name Tattoo Design & STL";
    //  let description = "Create unique 3D and 2D ambigrams instantly. The #1 free tool for two-name tattoo designs and 3D printable STLs. A better Flipscript alternative with no signup.";

    // 法语 SEO 
    // if (locale === 'fr') {
    //     title = "Générateur d'Ambigramme Gratuit: 2D/3D, Tatouage & STL";
    //     description = "Créez des ambigrammes 3D/2D gratuits. Idéal pour tatouages 2 prénoms et fichiers STL. Alternative à Flipscript sans inscription et optimisée pour mobile.";
    // }

    const seoData: Record<string, { title: string; description: string }> = {

        en: {
            title: "Ambigram Generator: Free 2D & 3D Two-Name Tattoo Maker & STL",
            description: "Create free 2D & 3D ambigrams online. The best tool for two-name tattoo designs and 3D printable STLs. Mobile-friendly Flipscript alternative with no signup."
        },
        fr: {
            title: "Générateur d'Ambigramme Gratuit: 2D/3D, Tatouage & STL",
            description: "Créez des ambigrammes 3D/2D gratuits. Idéal pour tatouages 2 prénoms et fichiers STL. Alternative à Flipscript sans inscription et optimisée pour mobile."
        },
        de: {
            title: "Ambigramm Generator: Kostenlos Ambigramm erstellen (2 Namen)",
            description: "Ambigramm erstellen: Gratis 2D/3D Generator für Tattoo Vorlagen (2 Namen) & 3D Schriftzug. Ohne Anmeldung & die beste Flipscript Alternative. Mobil optimiert."
        }
        ,
        es: {
            title: "Generador de Ambigramas Gratis | Tatuajes de 2 Nombres y Letras 3D",
            description: "Crea ambigramas 2D y 3D gratis. El mejor generador para tatuajes de dos nombres y letras 3D para imprimir (STL). Sin registro y la mejor alternativa a Flipscript."
        }
    }
    const current = seoData[locale] || seoData.en;

    return constructMetadata({
        title: current.title,
        description: current.description,
        path: '',
        locale: locale
    });
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