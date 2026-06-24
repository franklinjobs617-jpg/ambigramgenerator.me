import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { Check, X, Minus, ExternalLink, ArrowRight, Star } from "lucide-react";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/guide/best-online-tools";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Best Ambigram Generator Online Free (2026): Honest Comparison",
            description: "An honest comparison of the best free ambigram generators: Flipscript, Lingojam, and AmbigramGenerator.me — covering two-name support, 3D output, and no-signup download."
        },
        fr: {
            title: "Meilleur Générateur d'Ambigramme Gratuit (2026) : Comparaison Honnête",
            description: "Comparaison honnête des meilleurs outils gratuits : Flipscript, Lingojam et AmbigramGenerator.me — support deux noms, export 3D et téléchargement sans inscription."
        },
        de: {
            title: "Bester Kostenloser Ambigramm-Generator (2026): Ehrlicher Vergleich",
            description: "Ein ehrlicher Vergleich der besten kostenlosen Ambigramm-Generatoren: Flipscript, Lingojam und AmbigramGenerator.me — Zwei-Namen-Support, 3D-Export und Download ohne Anmeldung."
        }
    };

    const currentSeo = seoData[locale] || seoData.en;

    return constructMetadata({
        title: currentSeo.title,
        description: currentSeo.description,
        path: path,
        locale: locale
    });
}

// ── 数据层 ──────────────────────────────────────────────────────────────────

const tools = [
    {
        name: "AmbigramGenerator.me",
        url: "/",
        tagline: "Free · 2D + 3D · No signup",
        description: "The only free tool that generates both 2D calligraphic ambigrams and exportable 3D STL files. Best for tattoo references and 3D printing projects.",
        pros: [
            "Two-name / two-word ambigram (free)",
            "3D STL export for printing",
            "No account required",
            "No watermark on downloads",
            "Multiple font styles (Blocky, Calligraphy)",
        ],
        cons: [
            "Smaller font library vs Flipscript",
            "Algorithm occasionally struggles with very long names",
        ],
        features: {
            twoName: true,
            threeD: true,
            noSignup: true,
            noWatermark: true,
            tattooStyle: true,
            free: true,
        },
        bestFor: "Two-name tattoo designs & 3D printing",
        rating: 4,
    },
    {
        name: "Flipscript",
        url: "https://www.flipscript.com",
        tagline: "Paid · Professional quality",
        description: "The professional standard for ambigram design. Excellent output quality and the widest font range. Paid plans required for most downloads.",
        pros: [
            "Highest output quality",
            "Widest font selection",
            "Long history and reputation",
        ],
        cons: [
            "Most features require paid plan",
            "No 3D export",
            "Watermarked free downloads",
        ],
        features: {
            twoName: true,
            threeD: false,
            noSignup: false,
            noWatermark: false,
            tattooStyle: true,
            free: false,
        },
        bestFor: "Professional / commercial projects with budget",
        rating: 4,
    },
    {
        name: "Lingojam",
        url: "https://lingojam.com/AmbigramGenerator",
        tagline: "Free · Single word only",
        description: "A quick and simple single-word ambigram tool. Good for testing whether your word works as an ambigram, but limited for two-name designs.",
        pros: [
            "Completely free",
            "Instant results",
            "Good for single-word testing",
        ],
        cons: [
            "Single word only — no two-name support",
            "No download option (screenshot only)",
            "Very limited font choices",
            "No 3D output",
        ],
        features: {
            twoName: false,
            threeD: false,
            noSignup: true,
            noWatermark: true,
            tattooStyle: false,
            free: true,
        },
        bestFor: "Quick single-word checks only",
        rating: 2,
    },
];

const featureRows = [
    { key: "twoName", label: "Two-name / two-word support" },
    { key: "threeD", label: "3D STL export" },
    { key: "noSignup", label: "No account required" },
    { key: "noWatermark", label: "No watermark on free download" },
    { key: "tattooStyle", label: "Tattoo-ready calligraphy style" },
    { key: "free", label: "Fully free to use" },
] as const;

function FeatureIcon({ value }: { value: boolean | "partial" }) {
    if (value === true) return <Check size={16} className="text-green-500 mx-auto" />;
    if (value === false) return <X size={16} className="text-red-400 mx-auto" />;
    return <Minus size={16} className="text-slate-400 mx-auto" />;
}

function Stars({ rating }: { rating: number }) {
    return (
        <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={13} className={i <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"} />
            ))}
        </span>
    );
}

// ── 英文内容 ─────────────────────────────────────────────────────────────────

function EnglishContent() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs mb-5 uppercase tracking-wider">
                        Updated June 2026 · 3 tools compared
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Best Ambigram Generator Online Free (2026)
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        An honest comparison of the three most-used free ambigram tools — what each does well, where each falls short, and which one fits your specific use case.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="container mx-auto max-w-5xl">

                    {/* Quick verdict */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-12">
                        <p className="font-bold text-indigo-900 mb-1 text-sm">Quick verdict</p>
                        <p className="text-slate-700 text-sm leading-relaxed">
                            If you need a <strong>free two-name ambigram</strong> for a tattoo or 3D print — AmbigramGenerator.me is the only tool that covers both without a paywall. If you have a budget and need the highest quality font range, Flipscript is the professional standard. If you just want to check whether a single word works as an ambigram in 10 seconds, Lingojam is fine.
                        </p>
                    </div>

                    {/* Feature comparison table */}
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Feature Comparison</h2>
                    <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-14">
                        <table className="w-full min-w-[540px] text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-48">Feature</th>
                                    {tools.map(t => (
                                        <th key={t.name} className="px-4 py-4 text-center text-xs font-bold text-slate-700">
                                            <p>{t.name.split(".")[0]}</p>
                                            <p className="font-normal text-slate-400 mt-0.5">{t.tagline}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {featureRows.map(row => (
                                    <tr key={row.key} className="hover:bg-slate-50/50">
                                        <td className="px-5 py-3 text-slate-600 font-medium">{row.label}</td>
                                        {tools.map(t => (
                                            <td key={t.name} className="px-4 py-3 text-center">
                                                <FeatureIcon value={t.features[row.key]} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="bg-slate-50">
                                    <td className="px-5 py-3 text-slate-600 font-medium">Overall rating</td>
                                    {tools.map(t => (
                                        <td key={t.name} className="px-4 py-3">
                                            <div className="flex justify-center"><Stars rating={t.rating} /></div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Tool cards */}
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Tool Reviews</h2>
                    <div className="space-y-8 mb-14">
                        {tools.map((tool, i) => (
                            <div key={tool.name} className={`bg-white rounded-2xl border p-7 ${i === 0 ? "border-indigo-200 shadow-md shadow-indigo-50" : "border-slate-100"}`}>
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-black text-slate-900">{tool.name}</h3>
                                            {i === 0 && <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">This site</span>}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Stars rating={tool.rating} />
                                            <span className="text-xs text-slate-400">{tool.tagline}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">Best for: {tool.bestFor}</span>
                                </div>
                                <p className="text-slate-600 text-sm mb-5 leading-relaxed">{tool.description}</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Pros</p>
                                        <ul className="space-y-1.5">
                                            {tool.pros.map(p => (
                                                <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <Check size={13} className="text-green-500 flex-shrink-0 mt-0.5" /> {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">Cons</p>
                                        <ul className="space-y-1.5">
                                            {tool.cons.map(c => (
                                                <li key={c} className="flex items-start gap-2 text-sm text-slate-700">
                                                    <X size={13} className="text-red-400 flex-shrink-0 mt-0.5" /> {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-5 pt-5 border-t border-slate-100">
                                    {i === 0 ? (
                                        <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                                            Try it free <ArrowRight size={14} />
                                        </Link>
                                    ) : (
                                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:border-slate-300 transition-colors">
                                            Visit {tool.name} <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Use case guide */}
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Which Tool Should You Use?</h2>
                    <div className="space-y-3 mb-14">
                        {[
                            {
                                q: "I want a free two-name ambigram for a tattoo",
                                a: "AmbigramGenerator.me — the only free option with two-name support and no watermark on downloads.",
                                href: "/two-word-ambigram-generator"
                            },
                            {
                                q: "I need a 3D ambigram file to send to a 3D printer",
                                a: "AmbigramGenerator.me — the only tool on this list with free STL export.",
                                href: "/3d-generator"
                            },
                            {
                                q: "I just want to check if a single word works as an ambigram",
                                a: "Lingojam is fine for a quick sanity check, but it has no download option.",
                                href: null
                            },
                            {
                                q: "I need the highest quality for a paid commercial project",
                                a: "Flipscript has the widest font library and best output quality — worth the cost for professional work.",
                                href: null
                            },
                        ].map(({ q, a, href }) => (
                            <div key={q} className="flex gap-4 p-5 bg-white rounded-xl border border-slate-100">
                                <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0 mt-2" />
                                <div>
                                    <p className="font-bold text-slate-900 text-sm mb-1">{q}</p>
                                    <p className="text-slate-600 text-sm">{a}{" "}
                                        {href && <Link href={href} className="text-indigo-600 font-bold hover:underline">Try it →</Link>}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-indigo-600 rounded-2xl p-10 text-white">
                        <h2 className="text-2xl font-black mb-3">Ready to create your ambigram?</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">Free, no signup, no watermark. Generate a two-name or two-word ambigram in seconds.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-7 py-3 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors">
                            Open Free Generator <ArrowRight size={15} />
                        </Link>
                    </div>

                </div>
            </section>
        </main>
    );
}

// ── 法语内容 ─────────────────────────────────────────────────────────────────

function FrenchContent() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs mb-5 uppercase tracking-wider">
                        Mis à jour juin 2026 · 3 outils comparés
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Meilleur Générateur d&apos;Ambigramme Gratuit (2026)
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Comparaison honnête des trois outils gratuits les plus utilisés — points forts, points faibles, et lequel correspond à votre cas d&apos;usage.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-12">
                        <p className="font-bold text-indigo-900 mb-1 text-sm">Verdict rapide</p>
                        <p className="text-slate-700 text-sm leading-relaxed">
                            Pour un <strong>ambigramme gratuit avec deux prénoms</strong> pour un tatouage ou une impression 3D, AmbigramGenerator.me est le seul outil qui couvre les deux sans abonnement payant. Pour le meilleur résultat professionnel avec un budget, Flipscript est la référence. Pour vérifier rapidement si un seul mot fonctionne en ambigramme, Lingojam suffit.
                        </p>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 mb-6">Comparaison des fonctionnalités</h2>
                    <div className="overflow-x-auto rounded-2xl border border-slate-100 mb-14">
                        <table className="w-full min-w-[540px] text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-48">Fonctionnalité</th>
                                    {tools.map(t => (
                                        <th key={t.name} className="px-4 py-4 text-center text-xs font-bold text-slate-700">
                                            <p>{t.name.split(".")[0]}</p>
                                            <p className="font-normal text-slate-400 mt-0.5">{t.tagline}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { key: "twoName" as const, label: "Support deux noms / deux mots" },
                                    { key: "threeD" as const, label: "Export STL 3D" },
                                    { key: "noSignup" as const, label: "Sans inscription" },
                                    { key: "noWatermark" as const, label: "Sans filigrane sur le téléchargement" },
                                    { key: "tattooStyle" as const, label: "Style calligraphique pour tatouage" },
                                    { key: "free" as const, label: "Entièrement gratuit" },
                                ].map(row => (
                                    <tr key={row.key} className="hover:bg-slate-50/50">
                                        <td className="px-5 py-3 text-slate-600 font-medium">{row.label}</td>
                                        {tools.map(t => (
                                            <td key={t.name} className="px-4 py-3 text-center">
                                                <FeatureIcon value={t.features[row.key]} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center bg-indigo-600 rounded-2xl p-10 text-white">
                        <h2 className="text-2xl font-black mb-3">Prêt à créer votre ambigramme ?</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">Gratuit, sans inscription, sans filigrane.</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-7 py-3 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors">
                            Ouvrir le Générateur Gratuit <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

// ── 默认导出 ──────────────────────────────────────────────────────────────────

export default async function BestOnlineToolsPage({ params }: Props) {
    const { locale } = await params;
    if (locale === 'fr') return <FrenchContent />;
    return <EnglishContent />;
}
