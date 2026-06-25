import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight, BookOpen, HelpCircle, Sparkles, PenTool } from "lucide-react";

type Props = { params: { locale: string } };

// TDH: 低搜索量但高外链价值页面
// 主词: john langdon ambigram (Semrush无数据但实际有搜索)
// 次词: who designed illuminati ambigrams, angels and demons ambigram artist
// 外链目标: 纹身博客、字体设计社区、Dan Brown粉丝网站
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "John Langdon Ambigrams — The Artist Behind Angels & Demons",
        description: "John Langdon is the real ambigram artist who designed the Illuminati element ambigrams for Dan Brown's Angels & Demons. His design philosophy, letter-pairing method, and how to create your own.",
        path: "/john-langdon-ambigram",
        locale,
    });
}

const letterPairs = [
    { pair: "M / W", logic: "The most natural rotational pair — M becomes W and W becomes M after 180°. The basis of countless ambigram designs." },
    { pair: "d / q  ·  b / p", logic: "Ascender and descender pairs. The dot or counter-form flips sides, but the letterform remains recognisable." },
    { pair: "n / u", logic: "Open-bowl letters that invert cleanly. A staple of Langdon's approach to shorter words." },
    { pair: "H · I · O · X", logic: "Self-symmetric letters — they read the same after 180° rotation without modification. The 'free' letters in any ambigram." },
    { pair: "s / s  ·  z / z", logic: "S and Z are rotationally symmetric — they appear identical when rotated, making them ambigram-friendly in either position." },
];

const timeline = [
    {
        year: "Late 1970s",
        event: "John Langdon begins creating symmetrical word designs as a graphic designer in Philadelphia, working independently of the emerging field.",
    },
    {
        year: "1983",
        event: "Cognitive scientist Douglas Hofstadter coins the term 'ambigram' in his book Metamagical Themas, giving the art form its name.",
    },
    {
        year: "1992",
        event: "Langdon publishes Wordplay, a collection of his ambigram designs that brings the art form to a wider design audience internationally.",
    },
    {
        year: "1998–2000",
        event: "Dan Brown commissions Langdon to create four element ambigrams — Earth, Air, Fire, Water — for the Illuminati secret society in Angels & Demons.",
    },
    {
        year: "2000",
        event: "Angels & Demons is published. The novel exposes millions of readers worldwide to ambigram art for the first time, transforming it from niche typography into mainstream culture.",
    },
    {
        year: "2003",
        event: "The Da Vinci Code is published. Dan Brown names his protagonist Robert Langdon — a permanent tribute to John Langdon's influence on his work.",
    },
    {
        year: "2009",
        event: "Angels & Demons is adapted into a film starring Tom Hanks. The element ambigrams appear on screen, cementing their place in popular culture.",
    },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "John Langdon: The Ambigram Artist Behind Angels & Demons",
        "description": "A profile of John Langdon, the Philadelphia graphic designer who created the Illuminati element ambigrams for Dan Brown's Angels & Demons, and an explanation of his design methodology.",
        "author": { "@type": "Organization", "name": "AmbigramGenerator" },
        "publisher": {
            "@type": "Organization",
            "name": "AmbigramGenerator",
            "logo": { "@type": "ImageObject", "url": "https://www.ambigramgenerator.me/logo.png" }
        },
        "datePublished": "2026-06-25",
        "dateModified": "2026-06-25",
        "url": "https://www.ambigramgenerator.me/john-langdon-ambigram",
        "about": {
            "@type": "Person",
            "name": "John Langdon",
            "jobTitle": "Graphic Designer, Typography Professor",
            "description": "American graphic designer and ambigram artist, creator of the Illuminati element ambigrams for Dan Brown's Angels & Demons."
        }
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Who is John Langdon?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "John Langdon is a Philadelphia-based graphic designer and typography professor who has been creating ambigrams since the late 1970s. He is best known for designing the four element ambigrams (Earth, Air, Fire, Water) for Dan Brown's Angels & Demons. Dan Brown named his protagonist Robert Langdon in his honor."
                }
            },
            {
                "@type": "Question",
                "name": "Did John Langdon design the Illuminati ambigrams?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. John Langdon created all four element ambigrams — Earth, Air, Fire, Water — for the Illuminati secret society in Dan Brown's Angels & Demons. These were original commissioned works, not invented by Dan Brown. The designs are Langdon's copyrighted artwork."
                }
            },
            {
                "@type": "Question",
                "name": "Why is the character Robert Langdon named after John Langdon?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dan Brown was so inspired by John Langdon's ambigram work that he named his fictional protagonist Robert Langdon in the artist's honor. Brown has confirmed this in multiple interviews. The character first appeared in Angels & Demons (2000) and went on to become the hero of The Da Vinci Code and other novels."
                }
            },
            {
                "@type": "Question",
                "name": "Can I create a John Langdon-style ambigram?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. While John Langdon's specific designs are copyrighted, the underlying methodology — pairing letters that mirror each other under 180° rotation — can be applied to any word. An ambigram generator lets you create your own rotational word design using the same letter-pairing principles Langdon pioneered."
                }
            }
        ]
    }
];

export default async function JohnLangdonAmbigramPage({ params }: Props) {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 pt-32 pb-20 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-300 font-bold text-xs mb-6 uppercase tracking-wider">
                        <PenTool size={12} /> Graphic Designer · Philadelphia · Since 1970s
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-5 text-white">
                        John Langdon — The Ambigram Artist Behind <em>Angels & Demons</em>
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        Before Dan Brown&apos;s novel made ambigrams famous worldwide, John Langdon had spent two decades perfecting the art of rotational typography. His Earth, Air, Fire, Water designs for the Illuminati are the most recognised ambigrams ever created — and the reason millions of people search for ambigram generators today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/illuminati-ambigram"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg"
                        >
                            <BookOpen size={15} /> The Illuminati Ambigrams
                        </Link>
                        <Link
                            href="#create"
                            className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                        >
                            Create Your Own <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* SIDEBAR */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-1">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">On this page</h3>
                                {[
                                    ["#who", "Who is John Langdon"],
                                    ["#commission", "The Angels & Demons commission"],
                                    ["#methodology", "His design methodology"],
                                    ["#letter-pairs", "Key letter pairs"],
                                    ["#timeline", "Timeline"],
                                    ["#create", "Create your own"],
                                    ["#faq", "FAQ"],
                                ].map(([href, label]) => (
                                    <Link key={href} href={href} className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all">
                                        <ArrowRight size={13} /> {label}
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        {/* MAIN */}
                        <div className="lg:w-3/4 bg-white p-6 md:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <article className="prose prose-lg prose-slate max-w-none text-slate-700">

                                {/* WHO IS JOHN LANGDON */}
                                <div id="who" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white flex-shrink-0">
                                            <PenTool size={17} />
                                        </div>
                                        Who is John Langdon?
                                    </h2>
                                    <p>
                                        John Langdon is a Philadelphia-based graphic designer, author, and typography professor who began creating symmetrical word designs in the late 1970s. Working independently of the academic circles that were beginning to study visual symmetry, Langdon developed what would become known as <strong>ambigrams</strong> — typographic designs that read the same, or as a different word, when rotated or reflected.
                                    </p>
                                    <p>
                                        He is not merely the artist who designed the <em>Angels & Demons</em> ambigrams — he is one of the people who <strong>created the discipline itself</strong>. His 1992 book <em>Wordplay</em> was the first major collection of ambigram art published for a general audience, and it established both the vocabulary and the craft standards that practitioners still reference today.
                                    </p>
                                    <div className="not-prose bg-indigo-50 border border-indigo-100 rounded-2xl p-6 my-8">
                                        <p className="text-sm font-bold text-indigo-900 mb-2">The Robert Langdon connection</p>
                                        <p className="text-sm text-indigo-800 leading-relaxed">
                                            Dan Brown was so profoundly influenced by John Langdon&apos;s work that he named his fictional protagonist <strong>Robert Langdon</strong> in the artist&apos;s honor. The character — a Harvard symbologist — first appeared in Angels & Demons (2000) and went on to become one of the best-selling fictional characters in publishing history. Brown has confirmed the tribute in multiple interviews.
                                        </p>
                                    </div>
                                </div>

                                {/* THE COMMISSION */}
                                <div id="commission" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">
                                        The <em>Angels & Demons</em> commission
                                    </h2>
                                    <p>
                                        When Dan Brown was writing <em>Angels & Demons</em>, he needed four functional ambigrams to serve as the Illuminati&apos;s branded symbols — one for each classical element. These were not decorative flourishes; they were central to the plot. The designs had to be genuinely readable in both orientations, visually striking, and typographically coherent.
                                    </p>
                                    <p>
                                        Brown commissioned John Langdon to create all four. The brief was clear: Earth, Air, Fire, and Water — each as a rotational ambigram where the word reads identically after a 180° rotation. Langdon delivered four original designs that became the most recognisable ambigrams ever produced.
                                    </p>
                                    <p>
                                        The importance of this commission cannot be overstated. Before 2000, ambigrams were appreciated by typographers and puzzle enthusiasts. After the novel&apos;s global success — and the 2009 film adaptation — they became a mainstream cultural phenomenon. The direct line from that commission to the existence of every ambigram generator online today is clear.
                                    </p>
                                    <div className="not-prose bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5 my-6">
                                        <p className="font-bold text-amber-900 text-sm mb-1">Copyright note</p>
                                        <p className="text-amber-800 text-sm leading-relaxed">
                                            The specific Earth, Air, Fire, and Water ambigram designs are John Langdon&apos;s original copyrighted works. To create an ambigram of your own word or name using the same rotational principles, use the free generator below.
                                        </p>
                                    </div>
                                </div>

                                {/* METHODOLOGY */}
                                <div id="methodology" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">
                                        Langdon&apos;s design methodology
                                    </h2>
                                    <p>
                                        What made Langdon&apos;s work distinctive was not just technical skill but a systematic approach to the relationship between letterforms. His core insight was that <strong>ambigram design is fundamentally about letter pairing</strong> — finding or creating pairs of letters that can share the same physical form when one is rotated 180°.
                                    </p>
                                    <p>
                                        The process Langdon developed works broadly like this: write the word forwards, then write it backwards underneath. Identify which letter in the top row needs to pair with which letter in the bottom row. Then design a letterform that satisfies both readings simultaneously — often requiring significant creative distortion of standard letter shapes.
                                    </p>
                                    <p>
                                        The constraint is demanding. Every letter in position <em>n</em> from the left must work as the letter in position <em>n</em> from the right after rotation. For a five-letter word, that means the first letter must pair with the fifth, the second with the fourth, and the third must be self-symmetric.
                                    </p>
                                    <div className="not-prose bg-slate-50 border border-slate-100 rounded-2xl p-6 my-6">
                                        <p className="font-bold text-slate-900 text-sm mb-3">The WATER example</p>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                            In Langdon&apos;s Water ambigram, W must pair with R (positions 1 and 5), A must pair with E (positions 2 and 4), and T at the centre must be self-symmetric. The W/M relationship (standard in ambigrams) doesn&apos;t directly apply here — instead, W must transform into a convincing R, and A into a convincing E. This is the specific creative challenge that makes long-word ambigrams rare and impressive.
                                        </p>
                                    </div>
                                </div>

                                {/* LETTER PAIRS */}
                                <div id="letter-pairs" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">
                                        Key letter pairs in ambigram design
                                    </h2>
                                    <p className="text-slate-500 text-sm mb-6">
                                        These are the letter relationships that Langdon and other ambigram artists return to repeatedly. Understanding them is the foundation of any ambigram design.
                                    </p>
                                    <div className="not-prose space-y-3">
                                        {letterPairs.map((lp) => (
                                            <div key={lp.pair} className="border border-slate-100 rounded-2xl p-5 flex items-start gap-4">
                                                <div className="font-black text-indigo-600 text-sm font-mono bg-indigo-50 px-3 py-2 rounded-lg flex-shrink-0 min-w-[80px] text-center">
                                                    {lp.pair}
                                                </div>
                                                <p className="text-slate-600 text-sm leading-relaxed">{lp.logic}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* TIMELINE */}
                                <div id="timeline" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8">Timeline</h2>
                                    <div className="not-prose space-y-0">
                                        {timeline.map((item, i) => (
                                            <div key={i} className="flex gap-5">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                                                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-slate-100 mt-1" />}
                                                </div>
                                                <div className="pb-7">
                                                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{item.year}</span>
                                                    <p className="text-slate-600 text-sm leading-relaxed mt-1">{item.event}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CREATE YOUR OWN */}
                                <div id="create" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">
                                        Create your own Langdon-style ambigram
                                    </h2>
                                    <p>
                                        John Langdon&apos;s specific designs are copyrighted — but the letter-pairing principles he pioneered are available to anyone. An ambigram generator applies the same rotational logic to any word or pair of names you enter: it maps each letter to its rotational counterpart and produces a design that reads in both orientations.
                                    </p>
                                    <p>
                                        The most popular use cases are the same as the ones that made Langdon famous: single words that read identically when rotated (like his element designs), and two-name ambigrams where one name appears right-side up and another appears when the design is flipped — the format used for countless tattoos and personalised gifts.
                                    </p>
                                    <div className="not-prose mt-6 flex flex-wrap gap-3">
                                        <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg">
                                            <Sparkles size={15} /> Free Ambigram Generator
                                        </Link>
                                        <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            Two-Name Generator <ArrowRight size={14} />
                                        </Link>
                                        <Link href="/3d-generator" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            3D STL Generator <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div id="faq" className="scroll-mt-28">
                                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                                            <HelpCircle size={17} />
                                        </div>
                                        Frequently asked questions
                                    </h2>
                                    <div className="not-prose space-y-3">
                                        {[
                                            {
                                                q: "Who is John Langdon?",
                                                a: "John Langdon is a Philadelphia-based graphic designer and typography professor who has been creating ambigrams since the late 1970s. He is best known for designing the four Illuminati element ambigrams for Dan Brown's Angels & Demons. Dan Brown named his protagonist Robert Langdon in his honor.",
                                            },
                                            {
                                                q: "Did John Langdon design the Illuminati ambigrams?",
                                                a: "Yes. John Langdon created all four element ambigrams — Earth, Air, Fire, Water — for Angels & Demons. These were original commissioned works. The designs are Langdon's copyrighted artwork.",
                                            },
                                            {
                                                q: "Why is Robert Langdon named after John Langdon?",
                                                a: "Dan Brown was so inspired by John Langdon's ambigram work that he named his fictional protagonist Robert Langdon in the artist's honor. Brown has confirmed this in multiple interviews.",
                                            },
                                            {
                                                q: "Can I create a John Langdon-style ambigram?",
                                                a: "Yes. While Langdon's specific designs are copyrighted, the letter-pairing principles he pioneered can be applied to any word using an ambigram generator. Enter any name or word to create your own rotational design.",
                                            },
                                            {
                                                q: "What is John Langdon's design methodology?",
                                                a: "Langdon's approach is based on letter pairing — finding or designing pairs of letters that can share the same physical form when one is rotated 180°. Write the word forwards, then backwards, and design a letterform that satisfies both readings simultaneously.",
                                            },
                                        ].map(({ q, a }) => (
                                            <div key={q} className="border border-slate-100 rounded-xl p-5">
                                                <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* INTERNAL LINKS */}
                                <div className="border-t border-slate-100 pt-10 mt-10 not-prose">
                                    <p className="font-bold text-slate-900 text-sm mb-4">Continue exploring</p>
                                    <div className="flex flex-wrap gap-3">
                                        <Link href="/illuminati-ambigram" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            The Illuminati Ambigrams <ArrowRight size={13} />
                                        </Link>
                                        <Link href="/guide/ambigram-history-art" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            History of Ambigrams <ArrowRight size={13} />
                                        </Link>
                                        <Link href="/what-is-ambigram" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            What is an Ambigram? <ArrowRight size={13} />
                                        </Link>
                                        <Link href="/ambigram-word-tattoos" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            Ambigram Tattoo Ideas <ArrowRight size={13} />
                                        </Link>
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
