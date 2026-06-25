import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import Generator2d from "@/components/Generator2d";
import { Sparkles, ArrowRight, Check, HelpCircle, PenTool } from "lucide-react";

type Props = { params: { locale: string } };

// TDH — 覆盖核心词群（基于GSC+Semrush数据）
// "ambigram tattoo generator"      350点击 4173展示 位置12.46
// "ambigram tattoo generator free"  87点击  873展示 位置9.7
// "tattoo ambigram generator"       24点击  345展示 位置15.62
// "ambigram tattoo generator online free" 20点击
// IT: "ambigramma tatuaggio" 24展示 位置9.46
// FR: "ambigramme tatouage" / "tatouage ambigramme" 各有展示
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Ambigram Tattoo Generator Free — Two-Name & Word Designs Online",
            description: "Free ambigram tattoo generator: create two-name or two-word rotational designs online and download tattoo-ready PNG. No signup, no watermark.",
        },
        it: {
            // IT query: "ambigramma tatuaggio" pos 9.46
            title: "Generatore Ambigramma Tatuaggio Gratis — Due Nomi Online",
            description: "Generatore di ambigrammi per tatuaggi gratis. Crea design rotazionali con due nomi online e scarica PNG pronto per il tatuatore. Senza registrazione.",
        },
        fr: {
            // FR query: "ambigramme tatouage" / "tatouage ambigramme"
            title: "Générateur d'Ambigramme Tatouage Gratuit — Deux Prénoms en Ligne",
            description: "Générateur d'ambigramme pour tatouage gratuit. Créez des designs rotationnels avec deux prénoms et téléchargez le PNG pour votre tatoueur. Sans inscription.",
        },
        es: {
            title: "Generador de Ambigramas para Tatuajes Gratis — Dos Nombres Online",
            description: "Generador de ambigramas para tatuajes gratis. Crea diseños rotacionales con dos nombres y descarga PNG listo para tu tatuador. Sin registro.",
        },
        de: {
            title: "Ambigramm Tattoo Generator Kostenlos — Zwei Namen Online",
            description: "Kostenlosen Ambigramm Tattoo Generator: Erstellen Sie rotationsfähige Designs mit zwei Namen online und laden Sie ein PNG für Ihren Tätowierer herunter.",
        },
    };

    const current = seoData[locale] || seoData.en;
    return constructMetadata({
        title: current.title,
        description: current.description,
        path: "/ambigram-tattoo-generator",
        locale,
    });
}

// ── 共用数据 ──────────────────────────────────────────────────────────────────

const styleTips = [
    {
        style: "Calligraphy",
        best: "Best for tattoos",
        desc: "Flowing strokes and curved letterforms produce clean lines that transfer well to skin. The preferred style for most tattoo artists working from a reference.",
    },
    {
        style: "Blocky",
        best: "Bold & modern",
        desc: "Strong geometric strokes for a bold, modern look. Works well for larger placements like forearms and upper arms where size allows more detail.",
    },
];

const placements = [
    { spot: "Inner wrist", note: "Natural 180° flip — just rotate the arm. Works well for smaller 4–6 letter designs." },
    { spot: "Forearm", note: "Most popular placement. Enough space for 6–10 letter designs with good readability." },
    { spot: "Sternum", note: "Ideal for longer two-name designs. The flip is revealed when bending forward." },
    { spot: "Back of neck", note: "Single-word rotational ambigrams work well here. Compact and discreet." },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Ambigram Tattoo Generator",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Free online ambigram tattoo generator. Create two-name and two-word rotational designs and download PNG files for tattoo reference.",
        "url": "https://www.ambigramgenerator.me/ambigram-tattoo-generator"
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I create a free ambigram tattoo generator design?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Enter one word or two names in the generator below, choose Calligraphy style for tattoo work, click Generate, and download the PNG. No signup required. Share the PNG with your tattoo artist as a reference."
                }
            },
            {
                "@type": "Question",
                "name": "What ambigram style works best for tattoos?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Calligraphy style produces the cleanest tattoo results. Its flowing strokes and curved letterforms translate better to skin than sharp geometric styles. For bold forearm placements, Blocky style also works well."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use the generated design directly for my tattoo?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use the downloaded PNG as a reference for your tattoo artist. A professional artist will adapt the design to your body placement and adjust line weights for the tattooing process. The PNG is tattoo-ready as a starting reference."
                }
            },
            {
                "@type": "Question",
                "name": "What size should a tattoo ambigram be?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A minimum of 6 cm width is recommended for two-name ambigrams so both words remain legible over time as ink settles. Inner wrist placements typically work at 4–5 cm; forearm placements can go up to 15 cm."
                }
            },
            {
                "@type": "Question",
                "name": "Is the ambigram tattoo generator free with no watermark?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. PNG downloads are free with no watermark and no account required. The generated design is yours to use for personal and commercial purposes."
                }
            }
        ]
    }
];

// ── 意大利语页面 ──────────────────────────────────────────────────────────────

function ItalianPage() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Gratis · Senza Registrazione
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Generatore di <span className="text-indigo-600">Ambigramma Tatuaggio</span> Gratis
                    </h1>
                    <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                        Crea il tuo design rotazionale con due nomi, scarica il PNG e mostralo al tuo tatuatore. Nessuna registrazione, nessuna filigrana.
                    </p>
                </div>
            </section>
            <section className="px-4 pb-8">
                <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-indigo-100/40">
                    <Generator2d />
                </div>
                <div className="max-w-7xl mx-auto mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Consiglio tatuaggio</p>
                            <p className="text-slate-500 text-xs mt-0.5">Usa lo stile <strong>Caligrafia</strong> per linee più morbide, ideali per la pelle. Dimensione minima consigliata: 6 cm.</p>
                        </div>
                        <Link href="/it/ambigramma-con-due-nomi" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm whitespace-nowrap hover:underline">
                            Guida completa <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-3xl space-y-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">Come usare il generatore per tatuaggi</h2>
                        <div className="space-y-3">
                            {[
                                ["1", "Inserisci i due nomi", "Scrivi il primo nome nel campo superiore e il secondo nel campo inferiore."],
                                ["2", "Scegli lo stile Caligrafia", "Per i tatuaggi, la caligrafia produce le linee più pulite e adatte alla pelle."],
                                ["3", "Scarica il PNG", "Condividi il file con il tuo tatuatore come riferimento visivo. Senza filigrana."],
                            ].map(([n, t, d]) => (
                                <div key={n} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
                                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs flex-shrink-0">{n}</div>
                                    <div><p className="font-bold text-slate-900 text-sm mb-0.5">{t}</p><p className="text-slate-500 text-xs leading-relaxed">{d}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center bg-indigo-600 rounded-2xl p-8 text-white">
                        <h2 className="text-xl font-black mb-3">Vuoi saperne di più?</h2>
                        <p className="text-indigo-100 text-sm mb-5">Leggi la guida completa sugli ambigrammi per tatuaggi con due nomi.</p>
                        <Link href="/it/ambigramma-con-due-nomi" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                            Guida Ambigramma Due Nomi <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

// ── 法语页面 ──────────────────────────────────────────────────────────────────

function FrenchPage() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Gratuit · Sans Inscription
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Générateur d&apos;Ambigramme <span className="text-indigo-600">Tatouage</span> Gratuit
                    </h1>
                    <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                        Créez un design rotationnel avec deux prénoms, téléchargez le PNG et montrez-le à votre tatoueur. Sans inscription, sans filigrane.
                    </p>
                </div>
            </section>
            <section className="px-4 pb-8">
                <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-indigo-100/40">
                    <Generator2d />
                </div>
                <div className="max-w-7xl mx-auto mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Conseil tatouage</p>
                            <p className="text-slate-500 text-xs mt-0.5">Utilisez le style <strong>Calligraphie</strong> pour des lignes plus douces, idéales pour la peau. Largeur minimale recommandée : 6 cm.</p>
                        </div>
                        <Link href="/fr/generateur-ambigramme-prenom" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm whitespace-nowrap hover:underline">
                            Guide complet <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-center bg-indigo-600 rounded-2xl p-8 text-white">
                        <h2 className="text-xl font-black mb-3">Besoin de plus de détails ?</h2>
                        <p className="text-indigo-100 text-sm mb-5">Consultez le guide complet pour créer un ambigramme avec deux prénoms pour votre tatouage.</p>
                        <Link href="/fr/generateur-ambigramme-prenom" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                            Guide Ambigramme Prénom <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

// ── 英语主页面 ────────────────────────────────────────────────────────────────

function EnglishPage() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <PenTool size={12} /> Free Tattoo Generator · No Signup
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Ambigram Tattoo Generator{" "}
                        <span className="text-indigo-600">Free Online</span>
                    </h1>
                    <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                        Create a two-name or two-word ambigram tattoo design, download the PNG, and bring it to your artist. Free, no signup, no watermark.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link href="#generator" className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg">
                            <Sparkles size={15} /> Generate Tattoo Design
                        </Link>
                        <Link href="/ambigram-word-tattoos" className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                            Word ideas for tattoos <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* GENERATOR */}
            <section id="generator" className="px-4 pb-8 scroll-mt-24">
                <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-indigo-100/40">
                    <Generator2d />
                </div>

                {/* Pro hook */}
                <div className="max-w-7xl mx-auto mt-5 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-transparent p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                                    <Sparkles size={10} /> Pro
                                </span>
                                <span className="text-xs text-slate-400">Free plan: limited credits · standard resolution</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900">Want HD downloads for your tattoo artist?</p>
                            <p className="text-xs text-slate-500 mt-0.5">Pro gives you 666 credits/month, 2K HD output and 3D STL export.</p>
                        </div>
                        <Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors whitespace-nowrap flex-shrink-0">
                            <Sparkles size={14} /> See Pricing
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-4xl space-y-14">

                    {/* HOW TO USE */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">How to create your tattoo ambigram design</h2>
                        <div className="space-y-3">
                            {[
                                ["1", "Enter your word or two names", "Type a single word for a rotational ambigram, or enter two names to create a design that reads one name right-side up and the other upside down."],
                                ["2", "Choose Calligraphy style", "For tattoo work, Calligraphy produces the cleanest lines. Flowing strokes translate better to skin than sharp geometric styles."],
                                ["3", "Generate and download PNG", "Download the result and send it to your tattoo artist as a reference. No watermark, no account needed."],
                                ["4", "Let your artist refine it", "The PNG is a tattoo-ready reference. Your artist will adapt line weights and size to your specific placement."],
                            ].map(([n, t, d]) => (
                                <div key={n} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">{n}</div>
                                    <div><p className="font-bold text-slate-900 text-sm mb-1">{t}</p><p className="text-slate-500 text-sm leading-relaxed">{d}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* STYLE GUIDE */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">Which style to choose for a tattoo</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {styleTips.map((s) => (
                                <div key={s.style} className="bg-white border border-slate-100 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-black text-slate-900">{s.style}</span>
                                        <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{s.best}</span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PLACEMENT GUIDE */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">Best placements for an ambigram tattoo</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {placements.map((p) => (
                                <div key={p.spot} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-xl">
                                    <Check size={15} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{p.spot}</p>
                                        <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{p.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0"><HelpCircle size={17} /></div>
                            Frequently asked questions
                        </h2>
                        <div className="space-y-3">
                            {[
                                { q: "How do I create a free ambigram tattoo design?", a: "Enter one word or two names in the generator above, choose Calligraphy style, click Generate, and download the PNG. No signup. Share the PNG with your tattoo artist as a reference." },
                                { q: "What style works best for ambigram tattoos?", a: "Calligraphy style produces the cleanest tattoo results — flowing strokes translate better to skin. For bold forearm placements, Blocky style also works well at larger sizes." },
                                { q: "Can I use the generated design directly for my tattoo?", a: "Use the PNG as a reference for your tattoo artist. A professional artist will adapt the design to your placement and adjust line weights for the tattooing process." },
                                { q: "What size should an ambigram tattoo be?", a: "A minimum of 6 cm width is recommended for two-name designs so both words remain legible over time. Inner wrist placements work at 4–5 cm; forearm can go up to 15 cm." },
                                { q: "Is the ambigram tattoo generator free with no watermark?", a: "Yes. PNG downloads are free with no watermark and no account required. The design is yours to use for personal and commercial purposes." },
                            ].map(({ q, a }) => (
                                <div key={q} className="border border-slate-100 rounded-xl p-5 bg-white">
                                    <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* INTERNAL LINKS */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                        <p className="font-bold text-slate-900 text-sm mb-4">More ambigram resources</p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/ambigram-word-tattoos" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Word ideas for tattoos <ArrowRight size={13} />
                            </Link>
                            <Link href="/love-pain-ambigram" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Love/Pain ambigram <ArrowRight size={13} />
                            </Link>
                            <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Two-name generator <ArrowRight size={13} />
                            </Link>
                            <Link href="/flipscript-alternative" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Flipscript alternative <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

// ── 默认导出 ──────────────────────────────────────────────────────────────────

export default async function AmbigramTattooGeneratorPage({ params }: Props) {
    const { locale } = await params;
    if (locale === "it") return <ItalianPage />;
    if (locale === "fr") return <FrenchPage />;
    return <EnglishPage />;
}
