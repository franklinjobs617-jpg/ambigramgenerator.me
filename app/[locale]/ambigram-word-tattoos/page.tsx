import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import {
    BookOpen,
    Sparkles,
    PenTool,
    Type,
    AlertTriangle,
    Image as ImageIcon,
    ArrowRight,
    Quote
} from "lucide-react";

const DOMAIN = "https://www.ambigramgenerator.me";

// TDK 优化：覆盖 "List", "Ideas", "Double Meaning"
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Ambigram Word Tattoos: The Ultimate Double Mean List & Ideas",
        description: "Looking for tattoos that say two words in one? Explore our comprehensive ambigram words list, double meaning tattoo ideas, and design guides for your next ink.",
        alternates: {
            canonical: `${DOMAIN}/ambigram-word-tattoos`,
        }
    };
}

export default async function AmbigramWordTattoosPage() {
    // Schema: 包含文章和解答易混淆概念的 FAQ
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Ambigram Word Tattoos: Ideas and Double Meaning List",
            "description": "A comprehensive guide to ambigram word tattoos, featuring a list of double meaning words and design ideas."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What are tattoos that say two words in one called?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Tattoos that say two words in one depending on how you look at them are called 'Symbiotogram Ambigrams'. For example, a design that reads 'Love' one way and 'Pain' upside down."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is an ambigram the same as a palindrome tattoo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. A palindrome (like 'RADAR') reads the same forwards and backwards in standard text. An ambigram is a visual design that reads the same (or differently) when rotated or mirrored."
                    }
                }
            ]
        }
    ];

    return (
        <main className="bg-[#F8FAFC] min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section className="bg-white pt-32 pb-16 px-4 md:px-6 border-b border-slate-200">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Ambigram Word Tattoos:</span> Designs & Ideas
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                        Looking for ink that shifts perspective? From symmetrical <strong>ambigram name tattoos</strong> to deep, <strong>double meaning ambigram tattoo</strong> designs, explore the ultimate guide and word list for your next piece of skin art.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-4xl py-16 space-y-20">

                {/* ==========================================
                    2. DOUBLE MEANING (解决最核心的用户意图)
                ========================================== */}
                <section>
                    <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <Sparkles className="text-indigo-500" size={28} /> Tattoos That Say Two Words in One
                    </h2>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p>
                            Many people search for <strong>tattoo words with two meanings</strong>. In the tattoo world, <strong>tattoos that say two words in one</strong> are technically called <em>Symbiotograms</em>.
                        </p>
                        <p>
                            This is the holy grail of a <strong>double meaning ambigram tattoo</strong>. The artist manipulates the typography so that when you look at it right-side up, you read Word A. When you flip it 180 degrees, you read Word B. It is a powerful way to express duality, such as life/death, saint/sinner, or family/friends.
                        </p>


                        <div className="my-8 bg-slate-100 rounded-2xl border border-slate-200 p-8 text-center flex justify-center">

                            <Image src="/images/double-meaning-ambigram-tattoo.jpg"
                                alt="Double meaning ambigram tattoo showing Saint and Sinner" width={600} height={400} />
                        </div>
                    </div>
                </section>

                {/* ==========================================
                    3. THE LIST (SEO 流量池 - 针对 "ambigram words list")
                ========================================== */}
                <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <BookOpen className="text-indigo-500" size={28} /> The Ultimate Ambigram Words List
                    </h2>
                    <p className="text-slate-600 text-lg mb-8">
                        Not every word can be flipped elegantly. If you are brainstorming <strong>ambigram tattoo ideas</strong>, here is a curated <strong>ambigram words list</strong> featuring words with natural symmetry or popular <strong>deep meaning double meaning word ambigram words list</strong> pairings.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Column 1 */}
                        <div>
                            <h3 className="font-bold text-xl text-slate-900 mb-4 border-b pb-2">Single Word (Rotational)</h3>
                            <ul className="space-y-3 text-slate-700 font-medium">
                                <li>✨ <strong className="text-indigo-600">Family</strong> (A timeless classic)</li>
                                <li>✨ <strong className="text-indigo-600">Hope</strong> (Easiest to design)</li>
                                <li>✨ <strong className="text-indigo-600">Faith</strong> (Great for script fonts)</li>
                                <li>✨ <strong className="text-indigo-600">Forever</strong></li>
                                <li>✨ <strong className="text-indigo-600">Loyalty</strong></li>
                                <li>✨ <strong className="text-indigo-600">Tattoo</strong> (Yes, a meta <em>tattoo that says tattoo</em> is a fun rotational design!)</li>
                            </ul>
                        </div>
                        {/* Column 2 */}
                        <div>
                            <h3 className="font-bold text-xl text-slate-900 mb-4 border-b pb-2">Double Meaning (Symbiotograms)</h3>
                            <ul className="space-y-3 text-slate-700 font-medium">
                                <li>🔄 <strong className="text-purple-600">Love / Pain</strong> (The most famous)</li>
                                <li>🔄 <strong className="text-purple-600">Saint / Sinner</strong></li>
                                <li>🔄 <strong className="text-purple-600">Life / Death</strong></li>
                                <li>🔄 <strong className="text-purple-600">Family / Forever</strong></li>
                                <li>🔄 <strong className="text-purple-600">Save Me / I'm Fine</strong> (Mental health awareness)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ==========================================
                    4. DEMOGRAPHICS & STYLES (针对 Female & Names)
                ========================================== */}
                <section className="my-8">
                    <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3 my-8">
                        <PenTool className="text-indigo-500" size={28} /> Ambigram Tattoo Designs & Demographics
                    </h2>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p>
                            Browsing <strong>ambigram tattoo images</strong> online will show you that styles vary wildly based on personal taste and placement.
                        </p>

                        <h3 className="py-4 text-2xl">Ambigram Tattoos for Females</h3>
                        <p>
                            While heavy Gothic script was popular in the 90s, modern <strong>ambigram tattoos for females</strong> heavily favor the "Fine Line" or "Elegant Cursive" aesthetic. These styles use thin, sweeping loops to connect the inverted letters, making the design look like a delicate piece of jewelry, perfect for the collarbone, spine, or inner wrist.
                        </p>
                        <div className="my-8 bg-slate-100 rounded-2xl border border-slate-200 p-8 text-center flex justify-center">
                            <Image src="/images/ambigram-word-tattoo-female.jpg" alt="Ambigram Tattoo for Females" width={600} height={400} />
                        </div>

                        <h3 className="py-4 text-2xl">Ambigram Name Tattoos</h3>
                        <p>
                            Getting your own name, or your child's name, is arguably the most requested design. <strong>Ambigram name tattoos</strong> require custom typography because every letter combination is unique. If you want to see how your name looks flipped, our <Link href="/" className="text-indigo-600 font-bold hover:underline">online generator</Link> is the best place to start drafting.
                        </p>
                    </div>
                </section>

                {/* ==========================================
                    5. E-E-A-T: 概念纠错 & 专家建议
                ========================================== */}
                <section className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl">
                    <h2 className="text-2xl md:text-3xl font-black mb-6">Let's Clear Up the Confusion About Ambigrams </h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div>
                            <h3 className="text-xl font-bold text-indigo-300 mb-2">Ambigram vs. Palindrome Tattoo</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                People often confuse these. A <strong>palindrome tattoo</strong> is a word spelled the same forwards and backwards in standard text (e.g., M-A-D-A-M). An ambigram relies on the <em>visual shape</em> of the letters when physically turned upside down.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-indigo-300 mb-2">Ambigram vs. Tattoo Anagram</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                An anagram rearranges letters to form a new word (Listen ➔ Silent). A <strong>tattoo anagram</strong> doesn't flip or rotate; it just scrambles the letters. Ambigrams are purely optical illusions.
                            </p>
                        </div>
                    </div>

                    {/* 💡 HUMAN INJECTION REQUIRED (E-E-A-T) 💡 */}
                    <div className="bg-white/10 border-l-4 border-yellow-400 p-6 rounded-r-2xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 font-bold text-yellow-400 mb-3 uppercase tracking-widest text-sm">
                            <AlertTriangle size={18} /> Artist's Warning Before You Ink
                        </div>
                        <div className="text-slate-200 italic font-medium leading-relaxed">
                            <p>
                                Pro tip from someone who designs ambigrams every day: avoid making your ambigram tattoo too small. Ambigrams often merge letter shapes in unusual ways, which already pushes the limits of readability. If the tattoo is tiny, ink can spread over time and blur those delicate details. The result? What once looked clever can slowly turn into an unreadable blob. Always give your design enough space so the lines can stay clean as it ages.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ==========================================
                    6. BOTTOM CTA (引流)
                ========================================== */}
                <section className="text-center pb-12 border-t border-slate-200 py-16">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Stop Searching, Start Creating</h2>
                    <p className="text-lg text-slate-600 mb-8">
                        You've seen the <strong>ambigram tattoo designs</strong>. Now it's time to see your own words come to life.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-1">
                        Try the Ambigram Generator <ArrowRight size={20} />
                    </Link>
                </section>

            </div>
        </main>
    );
}