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
            title: "Ambigramm Generator: Ambigramm erstellen (2 Namen & Tattoo)",
            description: "Ambigramm erstellen: Gratis 2D/3D Tattoo Schriftzug Generator. Perfekt für Namen-Tattoos (2 Namen) & 3D-Druck (STL). Ohne Anmeldung!"
        }
        ,
        es: {
            title: "Generador de Ambigramas Gratis | Tatuajes de 2 Nombres y Letras 3D",
            description: "Crea ambigramas 2D y 3D gratis. El mejor generador para tatuajes de dos nombres y letras 3D para imprimir (STL). Sin registro y la mejor alternativa a Flipscript."
        },
        it: {
            title: "Generatore di Ambigrammi Gratis: Ambigramma con Due Nomi",
            description: "Crea un ambigramma con due nomi gratis. Il miglior generatore online per idee tatuaggio ambigramma e lettere 3D da stampare (file STL). Provalo subito!"
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

    // JSON-LD 结构化数据 (WebSite + SoftwareApplication + FAQPage)
    // FAQ 内容基于 GSC 高频 query，与 /faq 页面不重复（/faq 覆盖完整版）
    const faqByLocale: Record<string, { q: string; a: string }[]> = {
        en: [
            {
                q: "Is the ambigram generator really free?",
                a: "Yes. You can create and download 2D ambigram designs at no cost, with no account required. The 3D STL export is also available for free."
            },
            {
                q: "How do I make a two-name ambigram?",
                a: "Enter the first name in the top field and the second name in the bottom field, then click Generate. Names with similar letter counts produce the best results."
            },
            {
                q: "Can I use the generated ambigram for a tattoo?",
                a: "Yes. Download the high-resolution PNG and share it with your tattoo artist as a reference. All designs are free to use for personal and commercial purposes."
            },
        ],
        fr: [
            {
                q: "Le générateur d'ambigrammes est-il vraiment gratuit ?",
                a: "Oui. Vous pouvez créer et télécharger des ambigrammes 2D gratuitement, sans création de compte. L'export STL 3D est également disponible sans frais."
            },
            {
                q: "Comment créer un ambigramme avec deux prénoms ?",
                a: "Entrez le premier prénom dans le champ supérieur et le second dans le champ inférieur, puis cliquez sur Générer. Les prénoms de longueur similaire donnent les meilleurs résultats."
            },
            {
                q: "Puis-je utiliser l'ambigramme généré pour un tatouage ?",
                a: "Oui. Téléchargez le PNG en haute résolution et partagez-le avec votre tatoueur comme référence. Tous les designs sont libres d'utilisation."
            },
        ],
        de: [
            {
                q: "Ist der Ambigramm-Generator wirklich kostenlos?",
                a: "Ja. Sie können 2D-Ambigramme kostenlos erstellen und herunterladen, ohne ein Konto zu benötigen. Der 3D-STL-Export ist ebenfalls kostenlos verfügbar."
            },
            {
                q: "Wie erstelle ich ein Ambigramm mit zwei Namen?",
                a: "Geben Sie den ersten Namen in das obere Feld und den zweiten in das untere Feld ein, dann klicken Sie auf Generieren. Namen mit ähnlicher Buchstanzahl liefern die besten Ergebnisse."
            },
            {
                q: "Kann ich das generierte Ambigramm für ein Tattoo verwenden?",
                a: "Ja. Laden Sie das hochauflösende PNG herunter und zeigen Sie es Ihrem Tätowierer als Referenz. Alle Designs sind zur privaten und kommerziellen Nutzung freigegeben."
            },
        ],
        es: [
            {
                q: "¿El generador de ambigramas es realmente gratuito?",
                a: "Sí. Puedes crear y descargar diseños de ambigramas 2D de forma gratuita, sin necesidad de cuenta. La exportación STL 3D también está disponible sin coste."
            },
            {
                q: "¿Cómo creo un ambigrama con dos nombres?",
                a: "Escribe el primer nombre en el campo superior y el segundo en el campo inferior, luego haz clic en Generar. Los nombres con un número similar de letras producen los mejores resultados."
            },
            {
                q: "¿Puedo usar el ambigrama generado para un tatuaje?",
                a: "Sí. Descarga el PNG en alta resolución y compártelo con tu tatuador como referencia. Todos los diseños son de uso libre para fines personales y comerciales."
            },
        ],
        it: [
            {
                q: "Il generatore di ambigrammi è davvero gratuito?",
                a: "Sì. Puoi creare e scaricare design 2D gratuitamente, senza bisogno di account. L'esportazione STL 3D è anch'essa disponibile senza costi."
            },
            {
                q: "Come si crea un ambigramma con due nomi?",
                a: "Inserisci il primo nome nel campo superiore e il secondo nel campo inferiore, poi clicca su Genera. I nomi con un numero simile di lettere producono i risultati migliori."
            },
            {
                q: "Posso usare l'ambigramma generato per un tatuaggio?",
                a: "Sì. Scarica il PNG ad alta risoluzione e mostralo al tuo tatuatore come riferimento. Tutti i design sono liberi da utilizzare per uso personale e commerciale."
            },
        ],
    };

    const currentFaq = faqByLocale[locale] || faqByLocale.en;

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
                "url": DOMAIN,
                "applicationCategory": "DesignApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "description": "Free tool to create 2D and 3D ambigrams online. Design two-name tattoo ambigrams and export 3D printable STL files. No signup required.",
                "image": `${DOMAIN}/logo.png`,
                "screenshot": `${DOMAIN}/og-image.png`
            },
            {
                "@type": "FAQPage",
                "mainEntity": currentFaq.map(({ q, a }) => ({
                    "@type": "Question",
                    "name": q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": a
                    }
                }))
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