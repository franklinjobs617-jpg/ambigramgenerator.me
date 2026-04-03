import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import AITattooStudio from "@/components/AITattooStudio";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "AI Tattoo Generator Free: From Text to Tattoo Design | AmbigramGenerator",
        description:
            "Use our ai tattoo generator to create tattoo designs from text. No sign-up, fast prompts, cover-up ideas, name templates, and upgrade-ready pro exports.",
        path: "/ai-tattoo-generator",
        locale,
    });
}

export default async function AITattooGeneratorPage({ params }: Props) {
    const { locale } = await params;

    const faq = [
        {
            "@type": "Question",
            name: "What is an ai tattoo generator?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "An ai tattoo generator turns your text prompt into tattoo concepts you can preview and download.",
            },
        },
        {
            "@type": "Question",
            name: "Is this tattoo ai generator free?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The free plan supports 3 generations daily, with Pro plans for unlimited outputs and premium exports.",
            },
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                name: "AI Tattoo Generator",
                description:
                    "Create tattoo concepts from text, choose styles, and move from free generation to pro exports.",
            },
            {
                "@type": "SoftwareApplication",
                name: "AI Tattoo Generator",
                applicationCategory: "DesignApplication",
                operatingSystem: "Web Browser",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                },
                description:
                    "AI tattoo generator from text with style templates, name prompts, cover-up direction, and premium exports.",
            },
            {
                "@type": "HowTo",
                name: "How to use the AI Tattoo Generator",
                step: [
                    { "@type": "HowToStep", name: "Write prompt", text: "Describe concept, style, placement and size in one clear prompt." },
                    { "@type": "HowToStep", name: "Generate preview", text: "Pick style and generate your tattoo concept instantly." },
                    { "@type": "HowToStep", name: "Refine and export", text: "Iterate output, then download or upgrade for HD and STL workflow." },
                ],
            },
            {
                "@type": "FAQPage",
                mainEntity: faq,
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <AITattooStudio locale={locale} />
        </>
    );
}
