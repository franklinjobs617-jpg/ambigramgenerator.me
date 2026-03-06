import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import {
    CheckSquare,
    BookOpen,
    Heart,
    Palette,
    History,
    AlertTriangle,
    Image as ImageIcon,
    Quote,
    ChevronRight
} from "lucide-react";

const DOMAIN = "https://www.ambigramgenerator.me";

// 1. TDK: 覆盖所有关键词变体
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "The Love Pain Ambigram Tattoo: Meaning, Designs & History",
        description: "A deep dive into the iconic love pain ambigram tattoo. Explore the meaning behind the design, discover love and pain tattoo designs, and generate your own.",
        alternates: {
            canonical: `${DOMAIN}/love-pain-ambigram-tattoo`,
        }
    };
}

export default async function LovePainAmbigramPage() {
    // Schema: 明确声明这是一篇关于视觉艺术作品的文章
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        "name": "The Love Pain Ambigram Tattoo",
        "alternateName": "Pain Love Tattoo",
        "description": "An iconic ambigram design where the word 'Love' reads as 'Pain' when rotated 180 degrees, often used for tattoos."
    };

    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Header Section (Hero) */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 text-slate-900">
                        The Love Pain Ambigram Tattoo
                    </h1>
                    <p className="text-slate-500 font-medium italic text-lg max-w-2xl mx-auto">
                        Meaning, Designs, and the History of the Ultimate Optical Illusion
                    </p>
                </div>
            </section>

            <section className="pb-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* ==========================================
                            LEFT SIDEBAR: Table of Contents
                        ========================================== */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">On this page</h3>
                                <Link href="#introduction" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Introduction</Link>
                                <Link href="#meaning" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> The Deep Meaning</Link>
                                <Link href="#designs" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Style & Designs</Link>
                                <Link href="#history" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> History</Link>
                                <Link href="#create" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Create Your Own</Link>
                            </nav>
                        </aside>

                        {/* ==========================================
                            RIGHT CONTENT: Main Article (Prose)
                        ========================================== */}
                        <div className="lg:w-3/4 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <article className="prose prose-lg prose-slate text-slate-700 max-w-none">

                                {/* Section 1: Intro & Visual Anchor */}
                                <div id="introduction" className="scroll-mt-28 mb-16">
                                    <p className="lead text-xl text-slate-600 font-medium">
                                        It is arguably the most famous optical illusion in modern tattoo history. A design that reads 'Love' one way, and 'Pain' when flipped. In this ultimate guide, we explore the deep meaning, history, and various design styles of this iconic piece of word art.
                                    </p>

                                    {/* 
                                        🖼️ [图片生成任务 A] - The Hero Image
                                        文件名: love-pain-ambigram-tattoo-design.jpg
                                        Alt 标签: A high-quality love pain ambigram tattoo design in gothic style
                                        MJ Prompt: a masterpiece tattoo flash art design, the word "Love" is designed as a rotational ambigram that reads as "Pain" when turned upside down, intricate gothic blackletter font, sharp and clean vector lines, pure black ink on a textured white paper background, dramatic studio lighting, ultra high detail, centered composition --ar 16:9 --no shading or color
                                    */}
                                    {/* hover旋转180° */}
                                    <div className="relative aspect-video bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm my-10 group flex flex-col items-center justify-center text-center">


                                        <Image
                                            src="/images/love-pain-ambigram-tattoo-design.avif"
                                            alt="A high-quality love pain ambigram tattoo design in gothic style"
                                            width={600} height={400}
                                            className="object-cover transition-transform duration-700 group-hover:rotate-180"
                                        />

                                    </div>
                                </div>

                                {/* Section 2: The Meaning */}
                                <div id="meaning" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600"><Heart size={20} /></div>
                                        The Deep Meaning Behind the Illusion
                                    </h2>
                                    <p>
                                        Why has this specific <strong>love pain ambigram</strong> resonated with millions? The answer lies in its profound philosophical depth. It visually represents the universal truth that love and pain are two sides of the same coin. This isn't just a clever design; it's a statement about the human condition.
                                    </p>
                                    <blockquote className="border-l-4 border-red-400 bg-red-50/50 p-6 rounded-r-2xl text-red-900 font-medium italic my-8">
                                        "To love is to be vulnerable. To open your heart means accepting the risk of it being broken. The <strong>love pain ambigram tattoo</strong> captures this duality in a single, powerful symbol."
                                    </blockquote>
                                    <p>
                                        For many, this design serves as a permanent reminder of past heartbreaks, a celebration of resilience, or a philosophical acceptance of love's inherent risks. It is often referred to simply as the <strong>pain love tattoo</strong>.
                                    </p>
                                </div>

                                {/* Section 3: Designs & Styles */}
                                <div id="designs" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Palette size={20} /></div>
                                        Love and Pain Tattoo Designs: A Style Guide
                                    </h2>
                                    <p>
                                        While the concept is singular, the execution can vary dramatically. If you are looking for <strong>love and pain tattoo designs</strong>, the font style is the most critical decision.
                                        Once you've chosen your style, you can use our <Link href="/tattoo-stencil-maker" className="text-indigo-600 font-bold hover:underline">tattoo stencil maker</Link> to generate a clean line-art file for your artist.
                                    </p>

                                    <h3 className="text-xl font-bold mt-8 mb-4">The Classic Gothic / Blackletter Style</h3>
                                    <p>
                                        The wrist and forearm remain the most popular spots for this design. If you are a beginner applying this at home, follow our guide on <Link href="/guide/how-to-use-tattoo-stencils" className="text-indigo-600 font-bold hover:underline">how to use tattoo stencils</Link> to avoid smudging the intricate lines.
                                    </p>
                                    <h3 className="text-xl font-bold mt-8 mb-4">The Modern Minimalist / Fine Line Style</h3>
                                    <p>
                                        A more recent trend is to strip the design down to its bare essentials. A fine-line <strong>love ambigram</strong> that flips to 'Pain' uses only thin, consistent line weights. This style is much harder to design correctly, as there is no shading to hide imperfections, but the result is an elegant and subtle piece perfect for smaller placements like the wrist or ankle.
                                    </p>

                                    {/* 
                                        ✍️ [人工注入任务: E-E-A-T 增强]
                                    */}
                                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-6 mt-8 shadow-sm">
                                        <p className="font-bold text-amber-900 m-0 mb-2 flex items-center gap-2"><Quote size={16} /> Designer's Technical Note:</p>
                                        <p className="m-0 text-amber-800 leading-relaxed italic">
                                            From my experience designing ambigrams and reviewing thousands of user-generated examples, one pattern appears repeatedly: not every word pair can realistically form a clean ambigram.
                                        </p>
                                        <p className="m-0 text-amber-800 leading-relaxed italic">

                                            People frequently request combinations like “Strength / Courage” or “Life / Journey.” While these phrases sound meaningful, they are structurally difficult to convert into a rotational ambigram. The problem is purely typographic.
                                        </p>
                                        <p className="m-0 text-amber-800 leading-relaxed italic">

                                            The reason the <strong>love pain ambigram</strong> works so well is because both words share the same number of letters and similar vertical structures. Letters like  <strong>L, O, V, E </strong> can be creatively mapped to  <strong>P, A, I, N </strong> with relatively balanced strokes and rotation symmetry.

                                            In contrast, trying to transform a five-letter word into a seven-letter word introduces severe layout conflicts. The spacing becomes uneven, the stroke density changes dramatically, and the rotation axis loses visual balance. Even experienced ambigram artists struggle to resolve these mismatches without heavily distorting the typography.
                                            <p className="m-0 text-amber-800 leading-relaxed italic">

                                                Professional ambigram design is therefore less about forcing two words to match and more about discovering pairs that naturally share structural symmetry. This is why combinations like  <strong>love / pain </strong>,  <strong>love / hate </strong>, or  <strong>life / death </strong> appear so frequently in successful ambigram tattoos.

                                                In practice, the best ambigram results come from word pairs that already contain visual harmony before any transformation begins.
                                            </p>
                                        </p>
                                    </div>
                                </div>

                                {/* Section 4: History */}
                                <div id="history" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><History size={20} /></div>
                                        The History of This Iconic Ambigram
                                    </h2>
                                    <p>
                                        While the concept of ambigrams is centuries old, the specific <strong>love pain ambigram tattoo</strong>  gained mainstream popularity in the late 1990s and early 2000s, largely thanks to the rise of online tattoo galleries and forums. Artists like John Langdon (who coined the term "ambigram" for Dan Brown's <em>Angels & Demons</em>) and Scott Kim were pioneers in the field, showcasing what was possible with symmetrical typography.
                                    </p>
                                    <p>
                                        The "Love/Pain" design became a viral sensation because it was one of the first "symbiotograms" (an ambigram where the word changes) that was both emotionally powerful and visually stunning. It moved from a niche typographic puzzle to a mainstream symbol of emotional depth.
                                    </p>
                                </div>

                                {/* Section 5: CTA / Outro */}
                                <div id="create" className="scroll-mt-28 border-t border-slate-100 pt-12 text-center">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] mb-4 tracking-tight">
                                        Ready to Design Your Own Word Tattoo?
                                    </h2>
                                    <p className="text-slate-600 mb-8">
                                        Inspired by the <strong>love pain ambigram</strong>? While this specific dual-word design requires a custom touch, you can use our generator to experiment with perfectly symmetrical single-word ambigrams for your name or other meaningful words.
                                    </p>
                                    <Link href="/" className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg">
                                        Launch Free Ambigram Generator
                                    </Link>
                                </div>

                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}