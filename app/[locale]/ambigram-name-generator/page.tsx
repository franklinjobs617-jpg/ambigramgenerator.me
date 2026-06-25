import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import Generator2d from "@/components/Generator2d";
import { Sparkles, ArrowRight, Check, HelpCircle, User } from "lucide-react";

type Props = { params: { locale: string } };

// TDH — 基于 GSC query 数据
// "ambigram name generator"  点击6  展示209  位置21.98
// "name ambigram generator"  点击4  展示76   位置41.96
// "ambigram name maker"      点击8  展示138  位置18.57
// "create ambigram names free" 展示39 位置20.28
// Semrush: ambigram name generator 110/月 KD=10
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Ambigram Name Generator Free — Turn Your Name into a Rotational Design",
            description: "Free ambigram name generator: enter any name and create a rotational ambigram design online. Download PNG for tattoos, gifts and personalized art. No signup.",
        },
        it: {
            // IT signal: "ambigramma nomi" 91展示 位置6.32, "ambigramma" 314展示
            title: "Generatore Ambigramma Nome Gratis — Design Rotazionale con il Tuo Nome",
            description: "Generatore di ambigrammi per nomi gratis. Inserisci qualsiasi nome e crea un design rotazionale online. Scarica PNG per tatuaggi e regali personalizzati.",
        },
        de: {
            // DE signal: "ambigramm erstellen" 27展示 位置51
            title: "Ambigramm Name Generator Kostenlos — Deinen Namen als rotierendes Design",
            description: "Kostenloser Ambigramm-Name-Generator: Gib einen Namen ein und erstelle ein rotationsfähiges Design online. PNG für Tattoos und Geschenke herunterladen.",
        },
        es: {
            title: "Generador de Ambigramas de Nombres Gratis — Diseño Rotacional Online",
            description: "Generador de ambigramas de nombres gratis. Escribe cualquier nombre y crea un diseño rotacional online. Descarga PNG para tatuajes y regalos personalizados.",
        },
    };

    const current = seoData[locale] || seoData.en;
    return constructMetadata({
        title: current.title,
        description: current.description,
        path: "/ambigram-name-generator",
        locale,
    });
}

// ── 共用数据 ──────────────────────────────────────────────────────────────────

const useCases = [
    {
        icon: <User size={18} className="text-indigo-600" />,
        title: "Single name tattoo",
        desc: "Enter your own name or a loved one's name to create a rotational ambigram where the name reads the same when rotated 180°. Perfect as a personal tattoo design.",
        example: "Try: EMMA, ANNA, LEVEL, NOON",
    },
    {
        icon: <Sparkles size={18} className="text-indigo-600" />,
        title: "Name + word pairing",
        desc: "Enter a name in the first field and a meaningful word in the second. The generator creates a design where one reads right-side up and the other appears when rotated.",
        example: "Try: SARAH / LOVE, JAMES / SOUL",
    },
    {
        icon: <Check size={18} className="text-indigo-600" />,
        title: "Couple & family names",
        desc: "Merge two names into one rotational design — the most popular use case for ambigram name generators. One name appears normally, the other after a 180° rotation.",
        example: "Try: LUKE / ANNA, MARK / MARY",
    },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Ambigram Name Generator",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Free online ambigram name generator. Enter any name and create a rotational ambigram design. Download PNG for tattoos, gifts and personalized art.",
        "url": "https://www.ambigramgenerator.me/ambigram-name-generator"
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does an ambigram name generator work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "An ambigram name generator maps the letters of your name onto a rotational design. Each letter is paired with the letter it needs to become after 180° rotation. For a single-name ambigram, the name reads the same upside down. For a two-name ambigram, one name appears normally and the other appears when rotated."
                }
            },
            {
                "@type": "Question",
                "name": "Which names work best for an ambigram?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Names with natural rotational symmetry work best: ANNA, EMMA, NOON, LEVEL read the same upside down. For two-name ambigrams, names with similar letter counts work best — pairs like LUKE/ANNA, MARK/MARY, or LOVE/PAIN produce the cleanest results."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use the generated name ambigram for a tattoo?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Download the PNG and bring it to your tattoo artist as a reference. Choose the Calligraphy style for the cleanest tattoo lines. Your artist can adjust the line weights and sizing for your specific placement."
                }
            },
            {
                "@type": "Question",
                "name": "Is the ambigram name generator really free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Creating and downloading 2D ambigram name designs is completely free with no watermark and no signup required."
                }
            }
        ]
    }
];

// ── 意大利语版本 ──────────────────────────────────────────────────────────────

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
                        Generatore di <span className="text-indigo-600">Ambigramma Nome</span> Gratis
                    </h1>
                    <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                        Inserisci qualsiasi nome e crea un ambigramma rotazionale online. Scarica il PNG per tatuaggi, regali e arte personalizzata. Senza registrazione.
                    </p>
                </div>
            </section>
            <section className="px-4 pb-8">
                <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-indigo-100/40">
                    <Generator2d />
                </div>
            </section>
            <section className="py-10 px-4">
                <div className="container mx-auto max-w-3xl space-y-6">
                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
                        <p className="font-bold text-amber-900 text-sm mb-1">Consiglio per i nomi</p>
                        <p className="text-amber-800 text-sm leading-relaxed">
                            I migliori risultati si ottengono con nomi di 4–6 lettere. Per due nomi, scegli coppie con lo stesso numero di lettere: LUCA/ANNA, MARCO/SARA funzionano molto bene.
                        </p>
                    </div>
                    <div className="text-center">
                        <Link href="/it/ambigramma-con-due-nomi" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                            Guida Ambigramma Due Nomi <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

// ── 德语版本 ──────────────────────────────────────────────────────────────────

function GermanPage() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Kostenlos · Ohne Anmeldung
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Ambigramm <span className="text-indigo-600">Name Generator</span> Kostenlos
                    </h1>
                    <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                        Gib einen Namen ein und erstelle ein rotationsfähiges Ambigramm-Design online. PNG für Tattoos und Geschenke herunterladen. Ohne Anmeldung.
                    </p>
                </div>
            </section>
            <section className="px-4 pb-8">
                <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-indigo-100/40">
                    <Generator2d />
                </div>
            </section>
            <section className="py-10 px-4">
                <div className="container mx-auto max-w-3xl">
                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
                        <p className="font-bold text-amber-900 text-sm mb-1">Tipp für Namen</p>
                        <p className="text-amber-800 text-sm leading-relaxed">
                            Die besten Ergebnisse erzielen Sie mit Namen mit 4–6 Buchstaben. Für zwei Namen wählen Sie Paare mit ähnlicher Buchstabenzahl: ANNA/LUKE, EMMA/MARK funktionieren sehr gut.
                        </p>
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
                        <User size={12} /> Free Name Generator · No Signup
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Ambigram Name Generator{" "}
                        <span className="text-indigo-600">Free Online</span>
                    </h1>
                    <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                        Enter any name and create a rotational ambigram design online. Download PNG for tattoos, personalized gifts and art. Free, no signup, no watermark.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link href="#generator" className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg">
                            <Sparkles size={15} /> Generate Name Ambigram
                        </Link>
                        <Link href="/two-word-ambigram-generator" className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                            Two-name generator <ArrowRight size={14} />
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
                                <span className="text-xs text-slate-400">Free: limited credits · standard resolution</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900">Need HD for your tattoo artist or 3D printing?</p>
                            <p className="text-xs text-slate-500 mt-0.5">Pro gives 666 credits/month, 2K HD output and 3D STL export.</p>
                        </div>
                        <Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors whitespace-nowrap flex-shrink-0">
                            <Sparkles size={14} /> See Pricing
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-4xl space-y-14">

                    {/* USE CASES */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">How to use the ambigram name generator</h2>
                        <div className="space-y-4">
                            {useCases.map((uc) => (
                                <div key={uc.title} className="bg-white border border-slate-100 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">{uc.icon}</div>
                                        <h3 className="font-bold text-slate-900 text-sm">{uc.title}</h3>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-2">{uc.desc}</p>
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{uc.example}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* WHICH NAMES WORK BEST */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-5">Which names work best?</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                            Not all names produce equally readable ambigrams. The quality depends on how well each letter pairs with its rotational counterpart. Here&apos;s what makes a name ambigram work:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            {[
                                { label: "Self-symmetric names", examples: "ANNA, EMMA, NOON, LEVEL", note: "Read exactly the same upside down — the ideal case", good: true },
                                { label: "Similar-length pairs", examples: "LUKE / ANNA, MARK / SARA", note: "For two-name ambigrams, equal letter count = best balance", good: true },
                                { label: "Symmetry-friendly letters", examples: "A, H, I, M, O, T, U, V, W, X", note: "These letters have natural rotational partners", good: true },
                                { label: "Very different lengths", examples: "Alexander / Ana", note: "Try shortened versions: Alex / Ana works much better", good: false },
                            ].map(({ label, examples, note, good }) => (
                                <div key={label} className="border border-slate-100 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Check size={14} className={good ? "text-green-500" : "text-red-400"} />
                                        <span className="font-bold text-slate-900 text-sm">{label}</span>
                                    </div>
                                    <p className="font-mono text-xs text-indigo-600 mb-1">{examples}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">{note}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
                            <p className="font-bold text-amber-900 text-sm mb-1">Practical tip</p>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                If your name is long (8+ letters), try a nickname or initials first. A clean 4–6 letter ambigram is far more readable than a complex long design. You can always ask your tattoo artist to extend the design once the core letters work.
                            </p>
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
                                { q: "How does an ambigram name generator work?", a: "It maps the letters of your name onto a rotational design — each letter is paired with the letter it needs to become after 180° rotation. For a single name, the name reads the same upside down. For two names, one appears normally and the other when rotated." },
                                { q: "Which names work best for an ambigram?", a: "Names with natural rotational symmetry work best: ANNA, EMMA, NOON read the same upside down. For two-name ambigrams, similar letter counts work best — LUKE/ANNA, MARK/MARY produce the cleanest results." },
                                { q: "Can I use the generated name ambigram for a tattoo?", a: "Yes. Download the PNG and bring it to your tattoo artist as a reference. Choose Calligraphy style for the cleanest lines. Your artist will adjust line weights and sizing for your placement." },
                                { q: "Is the ambigram name generator really free?", a: "Yes. Creating and downloading 2D name ambigram designs is completely free — no watermark, no signup required." },
                                { q: "What's the difference between a name ambigram and a two-name ambigram?", a: "A single-name ambigram reads the same word when rotated 180°. A two-name ambigram reads one name right-side up and a different name when rotated — the most popular choice for couple and family tattoos." },
                            ].map(({ q, a }) => (
                                <div key={q} className="border border-slate-100 rounded-xl p-5 bg-white">
                                    <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RELATED LINKS */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                        <p className="font-bold text-slate-900 text-sm mb-4">Related generators</p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Two-name generator <ArrowRight size={13} />
                            </Link>
                            <Link href="/ambigram-tattoo-generator" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Tattoo ambigram generator <ArrowRight size={13} />
                            </Link>
                            <Link href="/3d-generator" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                3D name ambigram <ArrowRight size={13} />
                            </Link>
                            <Link href="/ambigram-word-tattoos" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Ambigram word ideas <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

// ── 默认导出 ──────────────────────────────────────────────────────────────────

export default async function AmbigramNameGeneratorPage({ params }: Props) {
    const { locale } = await params;
    if (locale === "it") return <ItalianPage />;
    if (locale === "de") return <GermanPage />;
    return <EnglishPage />;
}
