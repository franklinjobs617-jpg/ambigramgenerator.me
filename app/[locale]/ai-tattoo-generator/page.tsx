import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import AITattooStudio from "@/components/AITattooStudio";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return {
        ...constructMetadata({
        title: "AI Tattoo Generator Free: From Text to Tattoo Design | AmbigramGenerator",
        description:
            "Use our ai tattoo generator to create tattoo designs from text. Start with 2 guest tries, then continue with login and credits for more generations.",
        path: "/ai-tattoo-generator",
        locale,
        }),
        keywords: [
            "ai tattoo generator",
            "tattoo ai generator free",
            "ai tattoo generator from text",
            "ai tattoo cover up generator",
            "ai name tattoo generator",
            "tattoo stencil generator",
        ],
    };
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
                text: "You can start with 2 guest generations daily. After that, log in and continue with credits.",
            },
        },
        {
            "@type": "Question",
            name: "Can I generate tattoos from text only?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. You can describe subject, style, and placement in plain text and generate tattoo concepts without uploading an image.",
            },
        },
        {
            "@type": "Question",
            name: "How should I write a better tattoo prompt?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Use a clear structure: subject, style, placement, and detail level. This usually improves line quality and concept consistency.",
            },
        },
        {
            "@type": "Question",
            name: "Can this tool help with cover-up tattoo ideas?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Describe your old tattoo location and choose higher-contrast styles for stronger cover-up concept direction.",
            },
        },
        {
            "@type": "Question",
            name: "Is this page mobile-friendly?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The generator is optimized for mobile interaction with compact preview flow and touch-friendly style selection.",
            },
        },
        {
            "@type": "Question",
            name: "Can I use generated images directly for tattooing?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Use generated images as concept references. Final tattoo-ready preparation should be reviewed and adjusted by a professional artist.",
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
