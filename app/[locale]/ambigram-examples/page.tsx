import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import {
    LayoutGrid,
    Zap,
    Heart,
    Music,
    PenTool,
    BookOpen,
    Image as ImageIcon,
    Quote
} from "lucide-react";

const DOMAIN = "https://www.ambigramgenerator.me";

// 1. TDK 配置：主关键词前置
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Stunning Ambigram Examples: Love/Pain, Logos & Tattoos",
        description: "Explore our ultimate library of ambigram examples. Featuring the famous 'Love Pain' ambigram, ABBA's mirror logo, and creative tattoo style inspiration.",
        alternates: {
            canonical: `${DOMAIN}/ambigram-examples`,
        }
    };
}

export default async function AmbigramExamplesPage() {
    // 2. 结构化数据：组合拳 (Collection + Q&A)
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Ambigram Examples & Design Style Inspiration",
            "description": "A comprehensive gallery and guide covering ambigram words, tattoos, and logo designs."
        },
        {
            "@context": "https://schema.org",
            "@type": "QAPage",
            "mainEntity": {
                "@type": "Question",
                "name": "What is the group whose logo is a mirror ambigram?",
                "text": "Which famous music group uses a mirror ambigram as their official logo?",
                "answerCount": 1,
                "datePublished": "2024-03-20T08:00:00+08:00",
                "author": {
                    "@type": "Person",
                    "name": "Ambigram Designer"
                },
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The answer is the Swedish pop supergroup ABBA. Their iconic logo with the reversed 'B' creates a perfect mirror ambigram (ᗅᗺᗷᗅ).",
                    "datePublished": "2024-03-20T09:00:00+08:00",
                    "url": "https://www.ambigramgenerator.me/ambigram-examples#abba-answer",
                    "upvoteCount": 10,
                    "author": {
                        "@type": "Person",
                        "name": "Ambigram Specialist"
                    }
                }
            }
        }
    ]

    return (
        <main className="bg-[#F8FAFC] min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ==========================================
                HERO SECTION (H1 & Intro)
            ========================================== */}
            <section className="bg-white pt-32 pb-16 px-4 md:px-6 border-b border-slate-200">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                        Stunning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Ambigram Examples</span> & Design Inspiration
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                        You are here because you want to see the impossible. You are looking for <strong>ambigram examples</strong> that defy logic. Whether you are a designer hunting for a new <strong>logo ambigram</strong> concept or a tattoo enthusiast searching for the perfect ink, you have found the definitive gallery.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="#love-pain" className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-bold transition-colors">Love/Pain</Link>
                        <Link href="#logos" className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-bold transition-colors">ABBA Logo</Link>
                        <Link href="#tattoos" className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-bold transition-colors">Tattoos</Link>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl py-16 flex flex-col lg:flex-row gap-16">

                {/* LEFT CONTENT COLUMN (文章主体) */}
                <div className="lg:w-2/3 space-y-20">

                    {/* BLOCK 1: Words (Intro) */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <BookOpen className="text-indigo-500" size={28} /> The Classic Illusions: Ambigram Words Examples
                        </h2>
                        <div className="prose prose-lg text-slate-600 max-w-none">
                            <p>
                                When you start exploring this art form, the first thing you look for is classic <strong>ambigram words examples</strong>. These are single words that read the same when rotated. The most requested <strong>ambigram example</strong> in history is often a person's own name. But before you customize, look at the classics:
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                                <li className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 font-bold text-slate-700"><span className="text-indigo-500">●</span> "Hope" (A perfect starter word)</li>
                                <li className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 font-bold text-slate-700"><span className="text-indigo-500">●</span> "Faith" (Often cursive style)</li>
                            </ul>
                            <p>
                                Each <strong>example of ambigram words</strong> in our collection demonstrates a different technique, from the "Bar-and-Stem" method to negative space manipulation.
                            </p>
                        </div>
                    </section>

                    {/* BLOCK 2: Love/Pain Sniper (核心狙击) */}
                    <section id="love-pain" className="mt-8 bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-pink-100 text-pink-600 rounded-xl"><Heart size={24} /></div>
                            <h2 className="text-3xl font-black text-slate-900">The "Love / Pain" Sniper Section</h2>
                        </div>

                        <div className="prose prose-lg text-slate-600 max-w-none">
                            <p>
                                If you are looking for the most iconic dual-meaning design, you are looking for the
                                <Link href={'/love-pain-ambigram-tattoo'} className="text-indigo-600 hover:underline">
                                    <strong> ambigram love pain</strong>
                                </Link>
                                tattoo.
                            </p>




                            <Image
                                src="/images/ambigram-love-pain-example.jpg"
                                alt="Classic ambigram love pain tattoo design optical illusion"
                                width={600}
                                height={400}
                                className="object-cover"
                            />


                            <p className="py-4">
                                This is a specific type of design called a "Symbiotogram." It reads "Love" one way, and when you rotate it 180 degrees, it reads "Pain." The <strong>ambigram love pain</strong> design is a masterpiece because it connects two opposing emotions in one single glyph. The vertical stroke of the 'L' becomes the 'P', and the 'V' transforms into the 'A'.
                            </p>
                        </div>
                    </section>

                    {/* BLOCK 3: Logo & ABBA (核心狙击) */}
                    <section id="logos" className="mt-8">
                        <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <LayoutGrid className="text-indigo-500" size={28} /> Brand Identity: Ambigram Logo Examples
                        </h2>
                        <div className="prose prose-lg text-slate-600 max-w-none">
                            <p>Can a company logo read the same backwards? Yes. A <strong>logo ambigram</strong> is a powerful tool for brands that want to project symmetry and balance.</p>

                            {/* 🌟 TRIVIA BOX FOR SNIPPET */}
                            <div className="bg-indigo-700 p-8 rounded-2xl my-8 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-10"><Music size={100} /></div>
                                <h3 className="text-indigo-500 font-bold uppercase tracking-wider text-sm mb-2">Famous Trivia Answer</h3>
                                <p className="text-xl font-bold mb-4">"What is the group whose logo is a mirror ambigram?"</p>
                                <p>
                                    The answer is <strong>ABBA</strong>. The Swedish pop group uses a logo where the first 'B' is reversed (ᗅᗺᗷᗅ). This simple flip creates a perfect vertical symmetry. Because of this, ABBA is the most famous <strong>group whose logo is a mirror ambigram</strong>. It’s not just a band name; it’s a design icon.
                                </p>
                            </div>

                            <p>
                                Other famous <strong>ambigram logo</strong> designs include Sun Microsystems (rotational) and DMC (mirror style).
                                To learn more about the fascinating evolution of this art form, read our deep dive into
                                <Link href="/guide/ambigram-history-art" className="text-indigo-600 font-bold hover:underline">Ambigram History & Art</Link>.
                            </p>
                        </div>
                    </section>

                    {/* BLOCK 4: Tattoos & Styles */}
                    <section id="tattoos" className="mt-8">
                        <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <PenTool className="text-indigo-500" size={28} /> Skin Art: Ambigram Tattoos Examples
                        </h2>
                        <div className="prose prose-lg text-slate-600 max-w-none">
                            <p>
                                The body is a moving canvas. When searching for <strong>ambigram tattoos examples</strong>, placement is everything. The forearm allows the design to twist and reveal its secret, while the wrist is perfect for smaller pieces. Make sure you know <Link href="/guide/how-to-use-tattoo-stencils" className="text-indigo-600 font-bold hover:underline">how to use tattoo stencils</Link> properly to get a clean transfer.
                            </p>

                            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Defining the Ambigram Style</h3>

                            {/* Style Gallery Grid */}
                            <div className="grid sm:grid-cols-3 gap-6 not-prose">

                                {/* Style 1: Minimalist */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm group">


                                    <div className="relative aspect-[4/5] bg-slate-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">

                                        <Image
                                            src="/images/ambigram-style-minimalist.jpg"
                                            alt="ambigram style minimal tattoo design example"
                                            width={300}
                                            height={400}
                                        />

                                    </div>
                                    <div className="font-bold text-slate-900">Minimalist</div>
                                    <div className="text-xs text-slate-500">Fine Line & Clean</div>
                                </div>

                                {/* Style 2: Gothic */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm group">


                                    <div className="relative aspect-[4/5] bg-slate-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">

                                        <Image
                                            src="/images/ambigram-style-gothic.jpg"
                                            alt="ambigram style gothic tattoo design example"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                    <div className="font-bold text-slate-900">Gothic</div>
                                    <div className="text-xs text-slate-500">Classic & Sharp</div>
                                </div>

                                {/* Style 3: Script */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm group">


                                    <div className="relative aspect-[4/5] bg-slate-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                                        <Image
                                            src="/images/ambigram-style-script.jpg"
                                            alt="ambigram style script tattoo design example"
                                            width={300}
                                            height={400}
                                        />
                                    </div>
                                    <div className="font-bold text-slate-900">Script</div>
                                    <div className="text-xs text-slate-500">Elegant & Flowing</div>
                                </div>
                            </div>

                            <p className="mt-6">
                                Your choice of <strong>ambigram style</strong> dictates readability. Gothic is the classic choice for the "Love/Pain" design.
                                Planning a couple's tattoo? Check out our tutorial on <Link href="/tutorial/two-name-ambigram" className="text-indigo-600 font-bold hover:underline">how to create a two-name ambigram</Link>.
                            </p>
                        </div>
                    </section>

                    {/* BLOCK 5: Definition (Long Tail) */}
                    <section className="bg-white p-8 rounded-3xl border border-slate-200">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">Ambigram Definition and Examples</h2>
                        <p className="text-slate-600 leading-relaxed">
                            For the curious, an <strong>ambigram meaning and example</strong> would be the word "swims". It is a natural ambigram...
                            For a comprehensive breakdown of all types (including 3D and figure-ground), see our guide: <Link href="/what-is-ambigram" className="text-indigo-600 font-bold hover:underline">What is an Ambigram?</Link>
                        </p>
                    </section>

                </div>

                {/* RIGHT SIDEBAR (Sticky CTA) */}
                <aside className="lg:w-1/3">
                    <div className="sticky top-32 space-y-8">
                        {/* Generator CTA Widget */}
                        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl text-center">
                            <Zap size={40} className="mx-auto text-yellow-400 mb-4" />
                            <h3 className="text-2xl font-black mb-4">Create Your Own Ambigram</h3>
                            <p className="text-slate-400 mb-8 text-sm">
                                You've seen the examples. Now turn <strong>your name</strong> into a symmetrical masterpiece.
                            </p>
                            <Link href="/" className="block w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/50">
                                Launch Generator
                            </Link>
                        </div>


                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                            <div className="flex items-center gap-2 font-bold text-indigo-900 mb-3">
                                <Quote size={18} /> Designer's Tip:
                            </div>
                            <p className="text-sm text-indigo-800 italic">
                                The biggest headache in ambigram design is Character Weight. Mapping a wide letter like "M" onto a thin "I" often makes the design look lopsided. If the visual density doesn't match perfectly, the flip just won't work.
                            </p>
                            <p className="text-sm text-indigo-800 italic">

                                My take on style:
                                I love the Gothic/Blackletter style for this. Its vertical, repetitive strokes (minims) are basically a "cheat code"—they allow you to disguise different letters as each other much more easily than clean, modern fonts. The sharp serifs also let you hide the "extra" lines needed to make the secondary word readable without ruining the art.

                            </p>
                            <div className="mt-6 text-sm text-slate-500">
                                <p>Want to master the tool? <br /> Unlock our <Link href="/guide/name-generator-secrets" className="text-indigo-600 font-bold hover:underline">Name Generator Secrets</Link>.</p>
                            </div>
                        </div>
                    </div>
                </aside>

            </div>
        </main>
    );
}