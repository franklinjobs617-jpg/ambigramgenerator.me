import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight, BookOpen, HelpCircle, Sparkles } from "lucide-react";

type Props = { params: { locale: string } };

// TDH: 基于 GSC query — "ambigram art" 208次展示, "ambigram history" 相关词群
// 原文件内容是 advanced-3d-controls 的拷贝，path 也指向错误路由，全部修正
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/guide/ambigram-history-art";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "History of Ambigrams: Origin, Art & the Artists Who Defined It",
            description: "The complete history of ambigrams — from ancient letterforms to Scott Kim, John Langdon, Angels & Demons and today's digital generators. Who invented ambigrams and how the art evolved.",
        },
        fr: {
            title: "Histoire des Ambigrammes : Origines, Art et Artistes Fondateurs",
            description: "L'histoire complète des ambigrammes — des lettres anciennes à Scott Kim, John Langdon, Anges et Démons et les générateurs numériques d'aujourd'hui.",
        },
        de: {
            title: "Geschichte der Ambigramme: Ursprung, Kunst und die Künstler dahinter",
            description: "Die vollständige Geschichte der Ambigramme — von antiken Schriftformen über Scott Kim und John Langdon bis zu Angels & Demons und heutigen digitalen Generatoren.",
        },
    };

    const currentSeo = seoData[locale] || seoData.en;
    return constructMetadata({
        title: currentSeo.title,
        description: currentSeo.description,
        path,
        locale,
    });
}

// ── 共用数据 ──────────────────────────────────────────────────────────────────

const timeline = [
    {
        era: "Pre-1970s",
        title: "Ancient roots",
        body: "Rotational and mirror-symmetric letterforms appear throughout history — in medieval manuscripts, Islamic geometric calligraphy, and carved stone inscriptions. These were not called ambigrams, but the underlying principle of readable symmetry was already being explored.",
    },
    {
        era: "1970s–1980s",
        title: "Scott Kim and the formalization of ambigram art",
        body: "American designer and puzzle author Scott Kim created his first ambigrams in the 1970s and published Inversions (1981) — the first book dedicated to the art form. Kim's work established ambigrams as a legitimate typographic discipline and introduced systematic methods for letter-pair design.",
    },
    {
        era: "1977–1990s",
        title: "John Langdon and the term 'ambigram'",
        body: "John Langdon, a Philadelphia-based graphic designer, began creating symmetrical word designs independently in the late 1970s. Cognitive scientist Douglas Hofstadter coined the term 'ambigram' in 1983 to describe these designs. Langdon published Wordplay (1992), expanding awareness of the art form internationally.",
    },
    {
        era: "2000",
        title: "Angels & Demons: the mainstream breakthrough",
        body: "Dan Brown commissioned John Langdon to create four element ambigrams — Earth, Air, Fire, Water — for the Illuminati in Angels & Demons. The novel's global success exposed millions of readers to ambigrams for the first time and directly drove the first wave of online ambigram interest.",
    },
    {
        era: "2000s–2010s",
        title: "The tattoo era",
        body: "Ambigrams became one of the most searched tattoo styles online. 'Love/Pain' and 'Life/Death' symbiotograms spread across tattoo forums. The ambigram moved from typographic curiosity to mainstream body art, with dedicated tattoo artists specialising in the form.",
    },
    {
        era: "2010s–present",
        title: "Digital generators and 3D ambigrams",
        body: "Automated ambigram generators made the art accessible to anyone without design skills. The latest development is 3D ambigrams — physical objects that display one word from one angle and a different word when rotated 90° — exported as STL files for 3D printing.",
    },
];

const timelineFr = [
    { era: "Avant 1970", title: "Racines anciennes", body: "Des lettres symétriques rotatives apparaissent dans les manuscrits médiévaux, la calligraphie islamique et les inscriptions gravées. Le principe de symétrie lisible était déjà exploré." },
    { era: "1970–1980", title: "Scott Kim et la formalisation", body: "Le designer américain Scott Kim crée ses premiers ambigrammes dans les années 1970 et publie Inversions (1981), le premier livre dédié à cette forme d'art." },
    { era: "1977–1990", title: "John Langdon et le mot 'ambigram'", body: "Le designer John Langdon développe ses designs symétriques indépendamment. Douglas Hofstadter invente le terme 'ambigram' en 1983. Langdon publie Wordplay en 1992." },
    { era: "2000", title: "Anges et Démons : percée grand public", body: "Dan Brown commande à John Langdon quatre ambigrammes des éléments pour les Illuminati. Le succès mondial du roman expose des millions de lecteurs à l'art des ambigrammes." },
    { era: "2000–2010", title: "L'ère du tatouage", body: "Les ambigrammes deviennent l'un des styles de tatouage les plus recherchés en ligne. 'Love/Pain' et 'Life/Death' se répandent sur les forums de tatouage." },
    { era: "2010–présent", title: "Générateurs numériques et 3D", body: "Les générateurs automatiques rendent l'art accessible à tous. Les ambigrammes 3D — objets physiques affichant un mot d'un côté et un autre après rotation — représentent la dernière évolution." },
];

// ── Page anglaise ─────────────────────────────────────────────────────────────

function EnglishPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "History of Ambigrams: Origin, Art and the Artists Who Defined It",
            "description": "The complete history of ambigrams from ancient letterforms to Scott Kim, John Langdon, Angels & Demons and today's digital generators.",
            "author": { "@type": "Organization", "name": "AmbigramGenerator" },
            "publisher": { "@type": "Organization", "name": "AmbigramGenerator", "logo": { "@type": "ImageObject", "url": "https://www.ambigramgenerator.me/logo.png" } },
            "datePublished": "2026-06-24",
            "dateModified": "2026-06-24",
            "url": "https://www.ambigramgenerator.me/guide/ambigram-history-art",
            "inLanguage": "en"
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Who invented ambigrams?",
                    "acceptedAnswer": { "@type": "Answer", "text": "No single person invented ambigrams — symmetrical letterforms appear throughout history. However, Scott Kim (Inversions, 1981) and John Langdon (Wordplay, 1992) are the two artists most credited with formalizing ambigram design as a discipline. The term 'ambigram' itself was coined by cognitive scientist Douglas Hofstadter in 1983." }
                },
                {
                    "@type": "Question",
                    "name": "What is the history of ambigrams?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Ambigrams have roots in ancient symmetric letterforms, but emerged as a named art form in the 1970s–80s through the work of Scott Kim and John Langdon. They reached mainstream awareness through Dan Brown's Angels & Demons (2000), then became a major tattoo trend in the 2000s. Digital generators and 3D-printed ambigrams represent the current frontier." }
                },
                {
                    "@type": "Question",
                    "name": "What is the difference between an ambigram and a palindrome?",
                    "acceptedAnswer": { "@type": "Answer", "text": "A palindrome reads the same forwards and backwards in standard text (e.g., RADAR). An ambigram is a visual/typographic design that reads the same or differently when rotated or mirrored — it relies on how letters look, not just their sequence." }
                },
                {
                    "@type": "Question",
                    "name": "Who made ambigrams famous?",
                    "acceptedAnswer": { "@type": "Answer", "text": "John Langdon made ambigrams famous worldwide through the four Earth/Air/Fire/Water designs he created for Dan Brown's Angels & Demons in 2000. Scott Kim's earlier book Inversions was important within design circles, but Angels & Demons reached a global general audience." }
                }
            ]
        }
    ];

    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <BookOpen size={12} /> History · Art · Origins
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        History of Ambigrams
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        From ancient symmetric letterforms to Scott Kim, John Langdon, <em>Angels & Demons</em>, and today's 3D generators — the complete story of ambigram art and the people who shaped it.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Sidebar */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-1">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">On this page</h3>
                                {[
                                    ["#timeline", "Timeline"],
                                    ["#scott-kim", "Scott Kim"],
                                    ["#john-langdon", "John Langdon"],
                                    ["#angels-demons", "Angels & Demons"],
                                    ["#today", "Ambigrams today"],
                                    ["#faq", "FAQ"],
                                ].map(([href, label]) => (
                                    <Link key={href} href={href} className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all">
                                        <ArrowRight size={13} /> {label}
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        {/* Main */}
                        <div className="lg:w-3/4 bg-white p-6 md:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <article className="prose prose-lg prose-slate max-w-none text-slate-700">

                                {/* Timeline */}
                                <div id="timeline" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8">Ambigram history: a timeline</h2>
                                    <div className="not-prose space-y-4">
                                        {timeline.map((item, i) => (
                                            <div key={i} className="flex gap-5">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                                                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-slate-100 mt-2" />}
                                                </div>
                                                <div className="pb-8">
                                                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{item.era}</span>
                                                    <h3 className="font-black text-slate-900 mt-1 mb-2">{item.title}</h3>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Scott Kim */}
                                <div id="scott-kim" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">Scott Kim: the first systematic ambigram artist</h2>
                                    <p>
                                        Scott Kim is an American designer, author, and puzzle creator who began exploring inversional letterforms in the early 1970s. His 1981 book <em>Inversions</em> was the first dedicated study of ambigram design — it classified different types (rotational, reflective, figure-ground, chain) and showed through hundreds of examples that nearly any word could be designed as an ambigram with sufficient skill.
                                    </p>
                                    <p>
                                        Kim's contribution was methodological: he showed that ambigram creation follows principles, not just intuition. His work influenced an entire generation of typographers and puzzle designers, and established ambigrams as a discipline worth taking seriously.
                                    </p>
                                </div>

                                {/* John Langdon */}
                                <div id="john-langdon" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">John Langdon: the artist who made ambigrams famous</h2>
                                    <p>
                                        John Langdon developed his symmetrical word designs independently of Scott Kim, beginning in the late 1970s. Where Kim approached ambigrams as visual puzzles, Langdon approached them as graphic design — focusing on elegance, readability, and emotional resonance.
                                    </p>
                                    <p>
                                        His 1992 book <em>Wordplay</em> expanded international awareness of the form. But his most significant contribution came in 2000, when Dan Brown commissioned him to create the four element ambigrams for <em>Angels & Demons</em>. Brown was so influenced by Langdon's work that he named his protagonist Robert Langdon in the artist's honor.
                                    </p>
                                    <div className="not-prose mt-4">
                                        <Link href="/illuminati-ambigram" className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors">
                                            The Illuminati ambigrams explained <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                                {/* Angels & Demons */}
                                <div id="angels-demons" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">Angels & Demons: the mainstream breakthrough</h2>
                                    <p>
                                        Before 2000, ambigrams were appreciated by typographers, puzzle enthusiasts, and design students. <em>Angels & Demons</em> changed that scale entirely. The four Illuminati element ambigrams — <strong>Earth, Air, Fire, Water</strong> — appeared throughout the novel and became cultural touchstones. Readers who had never encountered the word "ambigram" searched for generators and examples online.
                                    </p>
                                    <p>
                                        The novel directly created the first large-scale consumer demand for ambigram creation tools. It is the single event most responsible for why "ambigram generator" is a significant search term today.
                                    </p>
                                </div>

                                {/* Today */}
                                <div id="today" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">Ambigrams today: tattoos, generators, and 3D printing</h2>
                                    <p>
                                        The 2000s and 2010s transformed ambigrams from art-world curiosity to mainstream tattoo style. "Love/Pain," "Life/Death," and two-name ambigrams became staples of tattoo studios worldwide. The emotional resonance of a design that reads two things depending on orientation proved ideal for body art.
                                    </p>
                                    <p>
                                        Digital generators democratized the form — anyone can now create a passable ambigram without design training. The current frontier is <strong>3D ambigrams</strong>: physical objects that show one word from one viewing angle and a completely different word when rotated 90°. These can be exported as STL files and 3D printed as desk objects, jewelry, or gifts.
                                    </p>
                                    <div className="not-prose mt-6 flex flex-wrap gap-3">
                                        <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                                            <Sparkles size={14} /> Try the Free Generator
                                        </Link>
                                        <Link href="/3d-generator" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            3D Generator (STL) <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div id="faq" className="scroll-mt-28">
                                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0"><HelpCircle size={17} /></div>
                                        Frequently asked questions
                                    </h2>
                                    <div className="not-prose space-y-3">
                                        {[
                                            { q: "Who invented ambigrams?", a: "No single person invented ambigrams — symmetric letterforms appear throughout history. Scott Kim (Inversions, 1981) and John Langdon (Wordplay, 1992) are the two artists most credited with formalizing the discipline. The term 'ambigram' was coined by Douglas Hofstadter in 1983." },
                                            { q: "What is the history of ambigrams?", a: "Ambigrams emerged as a named art form in the 1970s–80s through Scott Kim and John Langdon, reached mainstream awareness through Angels & Demons (2000), became a tattoo trend in the 2000s, and have evolved into 3D-printed objects today." },
                                            { q: "What is the difference between an ambigram and a palindrome?", a: "A palindrome reads the same forwards and backwards in standard text (e.g., RADAR). An ambigram is a visual design that reads the same or differently when rotated or mirrored — it relies on letterform shape, not letter sequence." },
                                            { q: "Who made ambigrams famous?", a: "John Langdon made ambigrams famous globally through the four Illuminati element designs in Angels & Demons (2000). Scott Kim was foundational within design circles earlier, but the novel reached a worldwide general audience." },
                                        ].map(({ q, a }) => (
                                            <div key={q} className="border border-slate-100 rounded-xl p-5">
                                                <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Internal links */}
                                <div className="border-t border-slate-100 pt-10 mt-10 not-prose">
                                    <p className="font-bold text-slate-900 text-sm mb-4">Continue exploring</p>
                                    <div className="flex flex-wrap gap-3">
                                        <Link href="/what-is-ambigram" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">What is an ambigram? <ArrowRight size={13} /></Link>
                                        <Link href="/illuminati-ambigram" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">Illuminati ambigrams <ArrowRight size={13} /></Link>
                                        <Link href="/ambigram-word-tattoos" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">Ambigram tattoos <ArrowRight size={13} /></Link>
                                    </div>
                                </div>

                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// ── Page française ────────────────────────────────────────────────────────────

function FrenchPage() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <BookOpen size={12} /> Histoire · Art · Origines
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Histoire des Ambigrammes
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Des lettres symétriques antiques à Scott Kim, John Langdon, <em>Anges et Démons</em> et les générateurs 3D d&apos;aujourd&apos;hui.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white p-6 md:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <article className="prose prose-lg prose-slate max-w-none text-slate-700">

                            <h2 className="text-2xl font-black text-slate-900 mb-8">Chronologie de l&apos;histoire des ambigrammes</h2>
                            <div className="not-prose space-y-4 mb-14">
                                {timelineFr.map((item, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="flex flex-col items-center">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                                            {i < timelineFr.length - 1 && <div className="w-px flex-1 bg-slate-100 mt-2" />}
                                        </div>
                                        <div className="pb-8">
                                            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{item.era}</span>
                                            <h3 className="font-black text-slate-900 mt-1 mb-2">{item.title}</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="not-prose border-t border-slate-100 pt-8 flex flex-wrap gap-3">
                                <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                                    <Sparkles size={14} /> Générateur Gratuit
                                </Link>
                                <Link href="/illuminati-ambigram" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                    Ambigrammes Illuminati <ArrowRight size={14} />
                                </Link>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}

// ── 默认导出 ──────────────────────────────────────────────────────────────────

export default async function AmbigramHistoryArtPage({ params }: Props) {
    const { locale } = await params;
    if (locale === 'fr') return <FrenchPage />;
    return <EnglishPage />;
}
