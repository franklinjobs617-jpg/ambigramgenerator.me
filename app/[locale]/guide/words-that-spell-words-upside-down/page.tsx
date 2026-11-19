import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    CheckSquare,
    BookOpen,
    Zap,
    ChevronRight,
    RotateCw,
    Quote
} from "lucide-react";
import WordRotationCard from "./WordRotationCard";

const DOMAIN = "https://www.ambigramgenerator.me";
const description = "See which words read the same upside down in 180° lettering examples. Learn why MOM can become WOW, when MOW stays MOW, and how font shape matters.";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Words That Spell Words Upside Down: Rotational Ambigram List (MOW, POD, SWIMS)",
        description: locale === "en" ? description : "MOW/WOW, POD/BOP, MOM/WOW, SWIMS — the complete rotational ambigram and upside-down word list. What makes a natural rotational ambigram, and how to generate your own.",
        alternates: {
            canonical: `${DOMAIN}/guide/words-that-spell-words-upside-down`,
        }
    };
}

const examples = [
    { word: "SOS", reading: "SOS", reason: "The two S shapes trade places and each stays S. O stays O." },
    { word: "MOM", reading: "WOW", reason: "Both M shapes become W. O stays O." },
    { word: "MOW", reading: "MOW", reason: "The last W becomes the first M, and the first M becomes the last W." },
    { word: "POD", reading: "Unverified", reason: "A reading needs a specific drawing and its rotated view." },
    { word: "SWIMS", reading: "SWIMS", reason: "Possible with S and I shapes that stay legible and matching M/W shapes." },
    { word: "NOON", reading: "NOON", reason: "Possible with N and O shapes that stay legible after a half-turn." },
];

const faq = [
    {
        question: "Does MOW spell WOW upside down?",
        answer: "With purpose-drawn M and W shapes that turn into each other and an O that stays O, MOW reads MOW after a half-turn. With the same shapes, MOM can read WOW.",
    },
    {
        question: "What does POD spell upside down?",
        answer: "POD has no universal 180° reading. You need a specific design and its rotated view to establish what it reads.",
    },
    {
        question: "What word can read the same backwards and upside down?",
        answer: "NOON reads the same backwards and can be drawn to read the same after a half-turn. SWIMS can read the same after a half-turn in suitable lettering. It spells SMIWS backwards.",
    },
    {
        question: "Can any two words form an ambigram?",
        answer: "Some letter shapes are hard to reconcile in a single design. Try a few pairs and read the resulting artwork in both orientations.",
    },
];

const articleSummary = "Learn how a 180° turn reverses the order of the letters and turns each shape. The reading depends on how the word is drawn.";

const englishJsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Words That Spell Words Upside Down",
        description: articleSummary,
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
        })),
    },
];

export default async function WordsUpsideDownPage({ params }: PageProps) {
    const { locale } = await params;
    const isEnglish = locale === "en";
    // The shared locale route leaves the existing non-English variant as it was.
    const quickAnswers = [
        { word: "MOW", rotated: "WOW", result: "Different word", note: "M can rotate into W in many simple type styles." },
        { word: "MOM", rotated: "WOW", result: "Different word", note: "A common natural upside-down word pair." },
        { word: "POD", rotated: "MOD / BOP", result: "Different word", note: "Font dependent; rounded fonts work best." },
        { word: "SWIMS", rotated: "SWIMS", result: "Same word", note: "Classic same upside-down and backwards answer." },
        { word: "NOON", rotated: "NOON", result: "Same word", note: "Works well in symmetric uppercase lettering." },
    ];

    // 2. Schema: Article + FAQ (针对脑筋急转弯词汇)
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Words That Spell Words Upside Down: MOW/WOW, POD and SWIMS List",
            "description": "A practical guide to upside-down words that remain readable or change meaning when rotated 180 degrees.",
            "author": { "@type": "Person", "name": "Ambigram Specialist" }
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Does MOW spell WOW upside down?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. MOW can read as WOW when rotated 180 degrees in many simple fonts because M visually becomes W while O remains O."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What does POD spell upside down?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "POD can look like MOD or BOP when rotated, depending on the font style. It is a font-dependent upside-down word pair."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What word is the same upside down and backwards?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The most famous word that is the same upside down and backwards is 'SWIMS'. This is known as a natural rotational ambigram."
                    }
                }
            ]
        }
    ];

    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(isEnglish ? englishJsonLd : jsonLd) }} />

            {/* Header Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-6 uppercase tracking-wider">
                        <RotateCw size={14} /> Optical Illusion Word List
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 text-slate-900">
                        Words That Spell <span className="text-indigo-600">Words Upside Down</span>
                    </h1>
                    <p className="text-slate-500 font-medium italic text-lg max-w-2xl mx-auto">
                        {isEnglish ? (
                            <>With purpose-drawn letters, <strong>SOS</strong> and <strong>MOW</strong> can read the same after a 180° turn, and <strong>MOM</strong> can read <strong>WOW</strong>. The result depends on the letter shapes.</>
                        ) : "Quick answers for MOW/WOW, POD, MOM/WOW, SWIMS, and other natural ambigram words."}
                    </p>
                </div>
            </section>

            <section className="pb-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* LEFT SIDEBAR: TOC */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">On this page</h3>
                                <Link href="#intro" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> The Phenomenon</Link>
                                <Link href="#same-words" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Read Same Upside Down</Link>
                                <Link href="#different-words" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Flip for New Meaning</Link>
                                <Link href="#meaning" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Ambigram Meaning</Link>
                                <Link href="#swims" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> {'The "SWIMS" Secret'}</Link>
                            </nav>
                        </aside>

                        {/* RIGHT CONTENT: Main Article */}
                        <div className={isEnglish
                            ? "min-w-0 lg:w-3/4 bg-white px-4 py-8 sm:p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
                            : "lg:w-3/4 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"}>
                            <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                                {isEnglish ? <EnglishGuide /> : <>
                                <div id="intro" className="scroll-mt-28 mb-16">
                                    <div className="not-prose mb-10 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-sm">
                                        <div className="border-b border-indigo-100 bg-indigo-50/70 px-5 py-4">
                                            <h2 className="text-lg font-black text-slate-900">Quick upside-down word answers</h2>
                                            <p className="mt-1 text-sm text-slate-600">Use this table first if you searched for a specific word pair.</p>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full min-w-[680px] text-left text-sm">
                                                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                                                    <tr>
                                                        <th className="px-5 py-3">Word</th>
                                                        <th className="px-5 py-3">Upside-down result</th>
                                                        <th className="px-5 py-3">Type</th>
                                                        <th className="px-5 py-3">What to know</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {quickAnswers.map((item) => (
                                                        <tr key={item.word} className="align-top">
                                                            <td className="px-5 py-4 font-black text-slate-900">{item.word}</td>
                                                            <td className="px-5 py-4 font-black text-indigo-700">{item.rotated}</td>
                                                            <td className="px-5 py-4 text-slate-700">{item.result}</td>
                                                            <td className="px-5 py-4 text-slate-600">{item.note}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <p className="lead text-xl text-slate-600 font-medium">
                                        Have you ever turned your phone upside down and realized that a word on the screen still makes perfect sense? This is no accident—it&apos;s a fascinating typographical phenomenon where <strong>words spell words upside down</strong> through rotational symmetry.
                                    </p>
                                    <p>
                                        In this guide, we’ve compiled the ultimate list of <strong>words that are the same upside down</strong>, explored the hidden <strong>ambigram meaning</strong>, and solved the riddle of the word that stays the same even when flipped and mirrored.
                                    </p>
                                </div>

                                {/* SECTION 2: Words that stay the same */}
                                <div id="same-words" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><CheckSquare size={20} /></div>
                                        Words That Read the Same Upside Down
                                    </h2>
                                    <p>
                                        Some <strong>words look the same upside down</strong> because their letters have natural rotational symmetry. For example, letters like &apos;o&apos;, &apos;s&apos;, &apos;x&apos;, &apos;z&apos;, &apos;H&apos;, &apos;I&apos;, &apos;N&apos;, and &apos;M&apos; are the building blocks of these visual illusions.
                                    </p>

                                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 not-prose my-10">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Top &quot;Same Both Ways&quot; Word List:</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {['NOON', 'SIS', 'MOW', 'SOS', 'DEED', 'XOXO'].map(word => (
                                                <div key={word} className="bg-white p-4 rounded-xl border border-slate-200 text-center font-black text-2xl tracking-widest text-indigo-600 shadow-sm transition-transform hover:rotate-180">
                                                    {word}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-6 text-sm text-slate-500 italic text-center">Try rotating your screen! These words <strong>read same upside down</strong> without changing a single letter.</p>
                                    </div>
                                </div>
                                <div className="relative aspect-video bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm my-10 flex flex-col items-center justify-center text-center">
                                    <Image
                                        src="/images/swims-upside-down-demonstration.jpg"
                                        alt="The word SWIMS shown normally and rotated 180 degrees"
                                        width={1920}
                                        height={1080}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* SECTION 3: Different Meaning */}
                                <div id="different-words" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"><RotateCw size={20} /></div>
                                        Words That Change Meaning When Flipped
                                    </h2>
                                    <p>
                                        Even more impressive are the <strong>words that can be read upside down</strong> to reveal a totally different word. This occurs when one letter rotates to form another (like &apos;d&apos; turning into &apos;p&apos;, or &apos;m&apos; into &apos;w&apos;).
                                    </p>
                                    <ul>
                                        <li><strong>MOW</strong> flipped upside down often reads as <strong>WOW</strong></li>
                                        <li><strong>MOM</strong> flipped upside down spells <strong>WOW</strong></li>
                                        <li><strong>POD</strong> flipped upside down can read as <strong>MOD</strong> or <strong>BOP</strong> depending on the font</li>
                                        <li><strong>NO</strong> flipped upside down spells <strong>ON</strong></li>
                                    </ul>
                                </div>

                                {/* SECTION 4: What is a rotational ambigram */}
                                <div id="rotational-ambigram" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><RotateCw size={20} /></div>
                                        What is a rotational ambigram?
                                    </h2>
                                    <p>
                                        A <strong>rotational ambigram</strong> is a word or design that can be rotated 180° and still be read — either as the same word or as a completely different word. The words above (MOW, SWIMS, NOON) are <em>natural</em> rotational ambigrams: they work in standard fonts without any artistic modification.
                                    </p>
                                    <p>
                                        Most ambigrams, however, are <em>designed</em> rotational ambigrams — where a typographer or generator carefully shapes each letter so that it reads as one letter right-side up and a different letter when rotated. This is how the classic <strong>Love/Pain ambigram</strong> works: &apos;L&apos; rotates to become &apos;P&apos;, and &apos;V&apos; becomes &apos;A&apos;.
                                    </p>

                                    <div className="not-prose bg-slate-50 rounded-2xl border border-slate-100 p-6 my-8">
                                        <h3 className="font-bold text-slate-900 text-sm mb-4">Natural rotational ambigrams — why they work</h3>
                                        <div className="space-y-3 text-sm text-slate-600">
                                            {[
                                                { word: "MOW → WOW", reason: "M rotates to W; O stays O; W rotates to M" },
                                                { word: "POD → BOP", reason: "P rotates to d/q; O stays O; D rotates to p/b" },
                                                { word: "SWIMS", reason: "S rotates to S; W↔M; I stays I — same word both ways" },
                                                { word: "MOM → WOW", reason: "M↔W; O stays O; M↔W — same transformation" },
                                                { word: "NOON", reason: "N rotates to N; O stays O — perfect palindrome ambigram" },
                                            ].map(({ word, reason }) => (
                                                <div key={word} className="flex gap-3 p-3 bg-white rounded-xl border border-slate-100">
                                                    <span className="font-black text-indigo-600 min-w-[100px] flex-shrink-0 font-mono text-xs">{word}</span>
                                                    <span className="text-xs leading-relaxed">{reason}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <p>
                                        The key insight: <strong>rotational ambigrams rely on letter pairs that mirror each other under 180° rotation</strong>. Letters like M/W, d/q, b/p, n/u, and s/z are the building blocks. When you find a word where every letter has a natural rotational partner, you have a natural ambigram.
                                    </p>
                                </div>

                                {/* SECTION 5: Ambigram Meaning (renumbered) */}
                                <div id="meaning" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><BookOpen size={20} /></div>
                                        Understanding Ambigram Meaning
                                    </h2>
                                    <p>
                                        To truly grasp the <strong>ambigram meaning</strong>, you have to look beyond simple text. An ambigram is a typographic art form where a design is created to have multiple orientations.
                                    </p>
                                    <p>
                                        While the words above are &quot;natural&quot; ambigrams (they work in standard fonts), the <strong>ambigram definition</strong> usually refers to custom-designed calligraphy where letters are stylistically altered to ensure they flip perfectly.
                                    </p>

                                    {/* 
    ✍️ [人工注入任务: E-E-A-T 增强 - 个人发现故事]
*/}
                                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-6 mt-8 shadow-sm">
                                        <p className="font-bold text-amber-900 m-0 mb-2 flex items-center gap-2">
                                            <Quote size={16} /> From the Curator:
                                        </p>

                                        <p className="m-0 text-amber-800 leading-relaxed italic">
                                            I still remember the first time I tried to design a <strong>love pain ambigram</strong>.
                                            At the beginning, I assumed it would be extremely difficult because the two words feel
                                            emotionally opposite and visually unrelated. But after sketching dozens of letter
                                            combinations on paper, I realized something interesting: the structures of
                                            <strong>LOVE</strong> and <strong>PAIN</strong> actually align surprisingly well when rotated.
                                            <br /><br />
                                            That moment was a small breakthrough for me. It showed that great ambigrams are rarely
                                            forced — they emerge when two words already share hidden visual symmetry. This discovery
                                            is exactly what inspired many of the design rules we later implemented inside the
                                            Ambigram Generator. When users type word pairs like <strong>love / pain</strong>, the tool
                                            recognizes this natural balance and can generate far cleaner rotational ambigrams.
                                        </p>
                                    </div>
                                </div>

                                {/* SECTION 5: The Sniper Word (SWIMS) */}
                                <div id="swims" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white"><Zap size={20} /></div>
                                        What word is the same upside down and backwards?
                                    </h2>
                                    <p>
                                        The most common answer to the puzzle <em>&quot;<strong>what word is the same upside down and backwards</strong>?&quot;</em> is <strong>SWIMS</strong>.
                                    </p>
                                    <div className="p-6 bg-slate-900 text-white rounded-2xl text-center shadow-lg my-8">
                                        <p className="text-4xl font-mono tracking-tighter mb-2">SWIMS</p>
                                        <p className="text-sm text-slate-400 uppercase tracking-widest">Rotational & Backwards Symmetry</p>
                                    </div>
                                    <p>
                                        Because &apos;S&apos; rotates to &apos;S&apos;, &apos;W&apos; rotates to &apos;M&apos;, and &apos;I&apos; remains &apos;I&apos;, the word <strong>reads the same upside down</strong> as it does right-side up. It&apos;s the ultimate example of a natural rotational ambigram.
                                    </p>
                                </div>

                                {/* CTA Section */}
                                <div id="create" className="scroll-mt-28 border-t border-slate-100 pt-12 text-center">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] mb-4 tracking-tight">
                                        Want to Test Your Own Upside-Down Word?
                                    </h2>
                                    <p className="text-slate-600 mb-8">
                                        If these natural <strong>words that read the same upside down</strong> inspired you, try your own name or word pair in the generator and check whether the letters can become a readable ambigram.
                                    </p>
                                    <Link href="/" className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg">
                                        Try the Free Ambigram Generator <ArrowRight size={18} className="ml-2" />
                                    </Link>

                                    {/* 内链导航 */}
                                    <div className="mt-12 pt-8 border-t border-slate-50 flex flex-wrap justify-center gap-6 text-sm font-bold text-indigo-600">
                                        <Link href="/ambigram-word-tattoos" className="hover:underline">Ambigram Tattoo Ideas</Link>
                                        <Link href="/ambigram-examples" className="hover:underline">Ambigram Examples Gallery</Link>
                                        <Link href="/mirror-text-generator" className="hover:underline">Mirror Text Generator</Link>
                                    </div>
                                </div>

                                </>}
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function EnglishGuide() {
    return (
        <>
            <section id="intro" className="not-prose scroll-mt-28">
                <h2 className="text-xl font-black text-slate-900">Quick upside-down word answers</h2>
                <p className="mt-2 text-base text-slate-700">
                    These readings describe what specific letter shapes can do. To test a word, turn the whole design 180°.
                </p>
                <div className="mt-5 overflow-hidden rounded-2xl border border-indigo-100">
                    <table className="w-full text-left text-sm leading-snug">
                        <thead className="bg-indigo-50 text-slate-900">
                            <tr>
                                <th scope="col" className="px-2 py-3 sm:px-4">Upright</th>
                                <th scope="col" className="px-2 py-3 sm:px-4">After 180°</th>
                                <th scope="col" className="px-2 py-3 sm:px-4">What makes it work</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-100">
                            {examples.map(({ word, reading, reason }) => (
                                <tr key={word} className="align-top">
                                    <th scope="row" className="px-2 py-3 font-bold text-slate-900 sm:px-4">{word}</th>
                                    <td className="px-2 py-3 font-bold text-indigo-800 sm:px-4">{reading}</td>
                                    <td className="px-2 py-3 text-slate-700 sm:px-4">{reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="same-words" className="not-prose mt-12 scroll-mt-28">
                <h2 className="text-xl font-black text-slate-900">Try a half-turn</h2>
                <p className="mb-5 mt-2 text-base text-slate-700">
                    Use Rotate 180° to turn each drawing. The captions give both readings.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                    <WordRotationCard word="SOS" />
                    <WordRotationCard word="MOM" />
                    <WordRotationCard word="MOW" />
                </div>
            </section>

            <section id="different-words" className="mt-12 scroll-mt-28 space-y-3">
                <h2 className="text-xl font-black text-slate-900">Why MOM and MOW turn differently</h2>
                <p>{articleSummary}</p>
                <p>
                    The last letter moves into first place as it turns. In a design where M turns into W, W turns
                    into M, and O stays O, the last M in MOM becomes the first W in WOW. In MOW, the last W
                    turns into the first M and the first M turns into the last W. The reading stays MOW.
                </p>
            </section>

            <section id="rotational-ambigram" className="mt-10 scroll-mt-28 space-y-3">
                <h2 className="text-xl font-black text-slate-900">What is a rotational ambigram?</h2>
                <p>
                    A rotational ambigram is lettering that can be read again after a turn. For a 180° design, the
                    second reading can be the same word, as with the SOS drawing, or a different word, as with the
                    MOM/WOW drawing. Each reading depends on the actual strokes.
                </p>
            </section>

            <section id="meaning" className="mt-10 scroll-mt-28 space-y-3">
                <h2 className="text-xl font-black text-slate-900">A half-turn, a mirror flip, and upside-down text</h2>
                <p>
                    A mirror flip reflects the design across an axis. A Unicode upside-down text tool substitutes
                    characters that resemble turned letters. Rotating a text box in Microsoft Word turns the existing
                    lettering, so readability still depends on the font.
                </p>
            </section>

            <section id="swims" className="mt-10 scroll-mt-28 space-y-3">
                <h2 className="text-xl font-black text-slate-900">Same backwards and same upside down</h2>
                <p>
                    A palindrome reads the same when you reverse the spelling. NOON is a palindrome and can also
                    be drawn to survive a half-turn with suitable N and O shapes. SWIMS spells SMIWS backwards.
                    In selected lettering, the two S shapes trade places, W and M trade places and turn into each other,
                    and the I stays I. That can make the rotated design read SWIMS.
                </p>
            </section>

            <section className="mt-10 space-y-3">
                <h2 className="text-xl font-black text-slate-900">How to check a word yourself</h2>
                <p>
                    Choose a specific drawing, turn the entire word 180°, and have someone read both directions
                    before showing them the intended answers. Treat a hard-to-read example as experimental.
                </p>
            </section>

            <section id="faq" className="mt-10 scroll-mt-28">
                <h2 className="text-xl font-black text-slate-900">Frequently asked questions</h2>
                <dl className="mt-4 space-y-4">
                    {faq.map(({ question, answer }) => (
                        <div key={question}>
                            <dt className="font-bold text-slate-900">{question}</dt>
                            <dd className="mt-1">{answer}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section id="create" className="mt-10 scroll-mt-28 border-t border-slate-100 pt-8">
                <h2 className="text-xl font-black text-slate-900">Try your own two-word design</h2>
                <p className="mt-3">
                    Open the <Link href="/two-word-ambigram-generator" className="font-semibold text-indigo-700 underline underline-offset-2">2D two-word ambigram generator</Link> and compare both orientations before saving a design.
                </p>
                <div className="mt-12 pt-8 border-t border-slate-50 flex flex-wrap justify-center gap-6 text-sm font-bold text-indigo-600">
                    <Link href="/ambigram-word-tattoos" className="hover:underline">Ambigram Tattoo Ideas</Link>
                    <Link href="/ambigram-examples" className="hover:underline">Ambigram Examples Gallery</Link>
                    <Link href="/mirror-text-generator" className="hover:underline">Mirror Text Generator</Link>
                </div>
            </section>
        </>
    );
}

function ArrowRight(props: { size: number; className?: string }) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    )
}
