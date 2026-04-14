import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Download, Wand2, HelpCircle, Users, Palette, Compass } from "lucide-react";
import Generator2d from "@/components/Generator2d";
import { constructMetadata } from "@/lib/seo";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/two-word-ambigram-generator";

    const seo: Record<string, { title: string; description: string }> = {
        en: {
            title: "Free Two Word & Two Name Ambigram Generator | Tattoo + PNG Download",
            description:
                "Use our free ambigram generator for two names and two words. Create tattoo-ready designs online and download PNG results instantly.",
        },
        fr: {
            title: "Free Two Word & Two Name Ambigram Generator | Tattoo + PNG Download",
            description:
                "Generate two-word and two-name ambigram concepts instantly. Create online free and download clean PNG references.",
        },
        de: {
            title: "Free Two Word & Two Name Ambigram Generator | Tattoo + PNG Download",
            description:
                "Create two-word and two-name ambigram designs online free. Great for tattoo ideas, logo concepts, and PNG export.",
        },
    };

    const current = seo[locale] || seo.en;
    return constructMetadata({
        title: current.title,
        description: current.description,
        path,
        locale,
    });
}

export default async function TwoWordAmbigramGeneratorPage({ params }: Props) {
    const { locale } = await params;
    const surfaceCardClass =
        "group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/70";
    const iconChipClass =
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition-colors duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-100";
    const actionButtonClass =
        "inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5";

    const appJsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Two Word Ambigram Generator",
        operatingSystem: "Web",
        applicationCategory: "DesignApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
            "Create two word ambigram and free ambigram generator two names concepts online, then download PNG results.",
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "How does a two word ambigram generator work?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "It maps letter shapes from word one and word two into a rotational design. For best output, use short words with similar length and high-symmetry letters.",
                },
            },
            {
                "@type": "Question",
                name: "Can I use this as a two word ambigram generator tattoo tool?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Generate a design, test multiple outputs, then download PNG and share references with your tattoo artist for final stencil refinement.",
                },
            },
            {
                "@type": "Question",
                name: "Is this ambigram generator two words tool free download?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can generate online and download PNG designs without signup.",
                },
            },
            {
                "@type": "Question",
                name: "Can I use this as a free ambigram generator two names tool?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Enter two names directly, generate options, and export PNG references for tattoo or design discussions.",
                },
            },
        ],
    };

    const examples = [
        {
            title: "Faith / Fear",
            hint: "High-contrast concept for two-word tattoo direction",
            image: "/images/Tattoo-style TRUST ambigram with thick, smooth strokes suitable for permanent ink.webp",
        },
        {
            title: "Love / Hate",
            hint: "Useful for opposites and symbolic duality",
            image: "/images/Animated GIF of ILLUSION rotating 180 degrees while maintaining readability.webp",
        },
        {
            title: "Name / Name",
            hint: "Good starting point for two-name ambigram ideas",
            image: "/images/Two-name ambigram showing Sarah upright and John when rotated 180 degrees.webp",
        },
    ];

    const faqs = [
        {
            q: "How do I get better results for ambigram generator two words?",
            a: "Use two words with similar letter count, avoid very long words, and try multiple style outputs. Symmetric letters like A, H, I, M, O, T, U, V, W often improve readability.",
        },
        {
            q: "Can I use this two word ambigram generator tattoo online free before a real tattoo session?",
            a: "Yes. This is ideal for pre-consultation. Generate several concepts, download PNG references, and let your artist finalize line thickness and skin-fit details.",
        },
        {
            q: "Is this also a free ambigram generator two names tool?",
            a: "Yes. You can enter two names directly in the two-word fields, generate multiple options, and download PNG references for discussion.",
        },
        {
            q: "Does two word ambigram generator free download include commercial use?",
            a: "You can use generated concepts as creative references. For final commercial assets, always verify typography and legal usage requirements in your workflow.",
        },
        {
            q: "I found free ambigram generator two names reddit threads. Is this similar?",
            a: "Yes. This page gives you the same quick experimentation flow many Reddit users look for, but with built-in generation, rotation preview, and direct PNG download.",
        },
        {
            q: "What if my two words do not generate a clean ambigram?",
            a: "Try shorter words, swap letter order, or use name variants. If exact pairing is difficult, start from the strongest concept and refine manually with your designer or artist.",
        },
    ];

    const pageTitle =
        locale === "fr" || locale === "de"
            ? "Two Word Ambigram Generator Online Free"
            : "Two Word Ambigram Generator Online Free";

    return (
        <main className="bg-[#FDFDFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                        <Sparkles size={14} /> Free Tool
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                        {pageTitle}
                    </h1>
                    <p className="mx-auto max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
                        Create clean rotational designs with our <strong>two word ambigram generator</strong>. You can
                        also use it as a <strong>free ambigram generator two names</strong> workflow by entering two
                        names and comparing versions before download.
                    </p>
                    <p className="mx-auto max-w-2xl text-sm text-slate-500">
                        If you searched for <strong>two name ambigram generator free</strong>, this page is built for
                        that exact task: create fast, compare, then download.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-1">
                        <Link
                            href="#two-word-tool"
                            className="inline-flex items-center justify-center rounded-2xl border border-indigo-600 bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200"
                        >
                            Start Generating
                        </Link>
                        <Link
                            href="/tutorial/two-name-ambigram"
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-100"
                        >
                            Read Two-Name Guide
                        </Link>
                    </div>
                </div>
            </section>

            <section id="two-word-tool" className="px-6 pb-16 scroll-mt-24">
                <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-indigo-100/40">
                    <Generator2d mode="two-word" />
                </div>
            </section>

            <section className="px-6 py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className={surfaceCardClass}>
                            <span className={iconChipClass}>
                                <Wand2 size={22} />
                            </span>
                            <h2 className="mt-4 text-xl font-black text-slate-900">Two words, one readable design</h2>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                Type two words and generate multiple options quickly. Rotate each result to check
                                readability before you choose one.
                            </p>
                        </div>
                        <div className={surfaceCardClass}>
                            <span className={iconChipClass}>
                                <Users size={22} />
                            </span>
                            <h2 className="mt-4 text-xl font-black text-slate-900">Perfect for two names</h2>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                Enter two names directly to build couple tattoos, friendship marks, or matching name
                                concepts in one place. If you need a <strong>free ambigram generator two names tattoo</strong>{" "}
                                workflow, start here and export PNG references.
                            </p>
                        </div>
                        <div className={surfaceCardClass}>
                            <span className={iconChipClass}>
                                <Palette size={22} />
                            </span>
                            <h2 className="mt-4 text-xl font-black text-slate-900">Better for tattoo consultations</h2>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                Choose calligraphy for heavier strokes and clearer references when discussing a tattoo
                                with your artist.
                            </p>
                        </div>
                        <div className={surfaceCardClass}>
                            <span className={iconChipClass}>
                                <Download size={22} />
                            </span>
                            <h2 className="mt-4 text-xl font-black text-slate-900">Easy PNG download</h2>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                After generating, you can download PNG files directly and keep only the versions you
                                like.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Two Word Ambigram Examples</h2>
                        <p className="mt-3 text-slate-600">
                            Sample outputs to help you choose the right direction before generating your own.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {examples.map((item) => (
                            <article
                                key={item.title}
                                className="group rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/70"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-slate-200">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(min-width: 1024px) 30vw, 92vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                                <p className="mt-1 text-sm text-slate-600">{item.hint}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 bg-slate-50 border-y border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 text-center">
                        How To Use This Two Word Ambigram Generator
                    </h2>
                    <ol className="mt-8 grid gap-4 sm:grid-cols-3">
                        <li className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/60">
                            <strong className="block text-slate-900 mb-1">1. Enter two words</strong>
                            Keep words short and similar length for stronger rotational readability.
                        </li>
                        <li className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/60">
                            <strong className="block text-slate-900 mb-1">2. Generate and compare</strong>
                            Test multiple versions, then rotate previews to verify both-word legibility.
                        </li>
                        <li className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/60">
                            <strong className="block text-slate-900 mb-1">3. Download PNG</strong>
                            Save the best output and share it for tattoo, logo, or custom print workflows.
                        </li>
                    </ol>
                    <p className="mt-6 text-sm text-slate-600 leading-relaxed">
                        Looking for an <strong>ambigram generator two words</strong> workflow? This page keeps it
                        simple: input two words (or two names), generate, rotate, and download.
                    </p>
                </div>
            </section>

            <section className="px-6 py-16 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 text-center">FAQ</h2>
                    <div className="mt-8 space-y-4">
                        {faqs.map((item) => (
                            <article
                                key={item.q}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/60"
                            >
                                <h3 className="text-lg font-bold text-slate-900 flex items-start gap-2">
                                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 transition-colors duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-100">
                                        <HelpCircle size={16} />
                                    </span>
                                    {item.q}
                                </h3>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.a}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/generator"
                            className={`${actionButtonClass} border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-100`}
                        >
                            <Compass size={16} className="mr-1" />
                            Open Main 2D Generator
                        </Link>
                        <Link
                            href="/ambigram-word-tattoos"
                            className={`${actionButtonClass} border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-100`}
                        >
                            <Sparkles size={16} className="mr-1" />
                            Ambigram Tattoo Ideas
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
