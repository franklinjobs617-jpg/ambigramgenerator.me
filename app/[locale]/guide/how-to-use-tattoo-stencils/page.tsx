import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import {
    BookOpen,
    Layers,
    Droplets,
    Eraser,
    AlertTriangle,
    CheckCircle2,
    Lightbulb,
    HelpCircle,
    ChevronRight,
    ArrowRight,
    Beaker
} from "lucide-react";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "How to Make, Apply & Remove a Tattoo Stencil (2026 Guide)",
        description: "The ultimate beginner's guide. Learn how to use tattoo stencil paper, transfer it to skin perfectly, and how to apply a stencil without Stencil Stuff.",
        path: "/guide/how-to-use-tattoo-stencils",
        locale: locale
    });
}

export default async function HowToTattooStencilPage({ params }: Props) {
    // 注入 HowTo 和 FAQ 结构化数据，霸占 Google 搜索的步骤面板！
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Transfer a Tattoo Stencil to Skin",
            "description": "A step-by-step guide on preparing the skin, applying the transfer gel, and placing the tattoo stencil paper correctly.",
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Prepare the Skin",
                    "text": "Shave the area and clean it thoroughly with green soap or rubbing alcohol to remove body oils."
                },
                {
                    "@type": "HowToStep",
                    "name": "Apply Transfer Solution",
                    "text": "Apply a thin, even layer of Stencil Stuff or a DIY alternative like deodorant. Do not make it too wet."
                },
                {
                    "@type": "HowToStep",
                    "name": "Place the Stencil",
                    "text": "Carefully place the stencil paper onto the skin, press firmly without sliding, and peel it off after 5 seconds."
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How to apply tattoo stencil without stencil stuff?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "If you don't have professional Stencil Stuff, the best alternative is a clear gel stick deodorant (like Speed Stick). Apply a thin layer to clean skin, let it become slightly tacky, and press your stencil paper onto it."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How to get tattoo stencil off skin?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "To remove a misplaced tattoo stencil, immediately wipe it with rubbing alcohol (70% isopropyl) or hand sanitizer. If it has dried, gently scrub with green soap or baby oil."
                    }
                }
            ]
        }
    ];

    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ==========================================
                HERO SECTION 
            ========================================== */}
            <section className="bg-gradient-to-b from-indigo-900 to-indigo-800 pt-32 pb-24 px-6 text-center text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-100 font-bold text-sm mb-6 backdrop-blur-sm">
                        <BookOpen size={16} />
                        Ultimate Beginner's Guide
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
                        How to Make, Apply & Remove a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">Tattoo Stencil</span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100/80 font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
                        Learn the professional way to use tattoo stencil paper, transfer flawless outlines to the skin, and discover DIY hacks for when you don't have professional supplies.
                    </p>
                </div>
            </section>

            {/* ==========================================
                CONTENT SECTION
            ========================================== */}
            <section className="pb-20 -mt-10 relative z-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Table of Contents (Sidebar) */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">In this guide</h3>
                                <Link href="#make" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"><Layers size={14} /> 1. Make the Stencil</Link>
                                <Link href="#apply" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"><Droplets size={14} /> 2. Transfer to Skin</Link>
                                <Link href="#diy-hacks" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"><Beaker size={14} /> 3. DIY Alternatives</Link>
                                <Link href="#remove" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"><Eraser size={14} /> 4. How to Remove</Link>
                                <Link href="#faq" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"><HelpCircle size={14} /> FAQs</Link>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:w-3/4 bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100">
                            <article className="prose prose-lg prose-slate text-slate-700 max-w-none">

                                {/* SECTION 1: Make */}
                                <div id="make" className="scroll-mt-28 mb-16">
                                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner"><Layers size={24} /></div>
                                        Step 1: How to Make a Tattoo Stencil
                                    </h2>
                                    <p>
                                        Before touching the skin, you need a perfect outline. Learning <strong>how to make a tattoo stencil</strong> is the foundation of a good tattoo. You have two main options:
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 my-8">
                                        {/* Card 1: Manual */}
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                            <h4 className="font-bold text-slate-900 m-0 mb-3 text-lg">Method A: Tracing by Hand</h4>
                                            <p className="text-sm text-slate-600 m-0 mb-4">Best for organic art. Place your design over carbon <strong>tattoo stencil paper</strong>. Trace the lines firmly with a pen to push the purple carbon ink onto the back of your design paper.</p>
                                        </div>
                                        {/* Card 2: Digital (Internal Link to Page 1!) */}
                                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 relative overflow-hidden">
                                            <div className="absolute -right-4 -top-4 text-indigo-100"><Lightbulb size={100} /></div>
                                            <h4 className="font-bold text-indigo-900 m-0 mb-3 text-lg relative z-10">Method B: The Digital Way</h4>
                                            <p className="text-sm text-indigo-800/80 m-0 mb-4 relative z-10">Best for text, lettering, and ambigrams. Generate a pure outline online and print it directly using a thermal printer.</p>
                                            {/* 🔥 极高转化率的内链 CTA 🔥 */}
                                            <Link href="/tattoo-stencil-maker" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow relative z-10 transition-all">
                                                Try our Free Stencil Maker <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 2: Transfer / Apply */}
                                <div id="apply" className="scroll-mt-28 mb-16">
                                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner"><Droplets size={24} /></div>
                                        Step 2: How to Transfer Tattoo Stencil to Skin
                                    </h2>
                                    <p>
                                        Now that your design is ready, figuring out <strong>how to apply a tattoo stencil</strong> properly is crucial. A blurry stencil will ruin the tattoo before you even pick up the machine.
                                    </p>

                                    {/* 🖼️ 图片 1: 完美转印展示 */}
                                    {/* Midjourney Prompt: Close up photography of a gloved hand peeling off a piece of purple tattoo transfer paper from an arm, revealing a perfectly crisp and dark purple tattoo stencil outline on the skin. Studio lighting, highly detailed, professional tattoo studio setting --ar 16:9 */}
                                    <figure className="my-8 rounded-2xl overflow-hidden border border-slate-100 shadow-md">
                                        <Image
                                            src="/images/peeling-tattoo-stencil.jpg"
                                            alt="Peeling off tattoo stencil paper to reveal a perfect transfer on skin"
                                            width={1200} height={675} unoptimized={true} className="w-full h-auto m-0"
                                        />
                                    </figure>

                                    <div className="space-y-4 text-slate-700 bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
                                        <h3 className="m-0 text-xl font-bold text-slate-900 mb-4">The Professional Application Process:</h3>
                                        <ol className="m-0 pl-5 space-y-2">
                                            <li><strong>Prep the Canvas:</strong> Shave the area completely (even if you don't see hair). Wipe the skin down with rubbing alcohol or Green Soap to strip away all natural body oils.</li>
                                            <li><strong>Apply the Gel:</strong> Rub a thin layer of professional stencil transfer gel (like <em>Stencil Stuff</em> or <em>Electrum</em>) onto the skin. Massage it in until it feels "tacky" and sticky, not wet.</li>
                                            <li><strong>Place & Press:</strong> Carefully lay your <strong>tattoo stencil paper</strong> onto the skin. Press down firmly and evenly with a paper towel. <strong>Do not slide or twist!</strong></li>
                                            <li><strong>Peel & Dry:</strong> Peel the paper off from one corner. Let the stencil dry for at least 10-15 minutes before you start tattooing.</li>
                                        </ol>
                                    </div>

                                    {/* 💡 HUMAN INJECTION REQUIRED 1 💡 */}
                                    <div className="mt-8 bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-400">
                                        <div className="flex items-center gap-2 text-blue-800 font-bold mb-2 uppercase tracking-wider text-sm"><AlertTriangle size={16} /> Artist's Pro Tip</div>
                                        <p className="m-0 text-slate-700 text-base italic">
                                            [TODO: Write 2 sentences about your personal experience with drying times. Example: "When I first started, I would start tattooing immediately after peeling the paper. Halfway through the outline, my stencil wiped completely off. Now I always let it dry for a full 15 minutes, or even use a hairdryer on the cool setting if I'm in a rush."]
                                        </p>
                                    </div>
                                </div>

                                {/* SECTION 3: DIY / No Stencil Stuff Hacks (High Search Volume) */}
                                <div id="diy-hacks" className="scroll-mt-28 mb-16">
                                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner"><Beaker size={24} /></div>
                                        DIY Hacks: Apply Without Stencil Stuff
                                    </h2>
                                    <p>
                                        What if you are practicing at home and run out of supplies? People constantly ask <strong>how to apply a tattoo stencil without stencil stuff</strong>. While professional products are best for real human skin, here are the most effective DIY alternatives for practice:
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                            <h4 className="font-bold text-amber-700 flex items-center gap-2 m-0 mb-2"><CheckCircle2 size={18} /> Deodorant Stick (Best)</h4>
                                            <p className="text-sm m-0 text-slate-600">A clear gel deodorant (like Speed Stick) is the classic old-school trick. It has the perfect tacky consistency to grab the purple ink. Apply a thin layer and stick.</p>
                                        </div>
                                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                            <h4 className="font-bold text-amber-700 flex items-center gap-2 m-0 mb-2"><CheckCircle2 size={18} /> Dettol / Antiseptic</h4>
                                            <p className="text-sm m-0 text-slate-600">Used in many countries, a mix of Dettol antiseptic liquid and a tiny bit of water works surprisingly well to transfer the stencil to fake skin.</p>
                                        </div>
                                    </div>

                                    <div className="bg-red-50 text-red-800 p-4 rounded-xl mt-4 text-sm font-medium flex gap-3">
                                        <AlertTriangle className="shrink-0 text-red-500" />
                                        <span><strong>Warning:</strong> We do not recommend using DIY methods like deodorant on actual clients due to cross-contamination risks. Only use these for practicing on fake skin or yourself.</span>
                                    </div>
                                </div>

                                {/* SECTION 4: Removal (Troubleshooting) */}
                                <div id="remove" className="scroll-mt-28 mb-16">
                                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 shadow-inner"><Eraser size={24} /></div>
                                        How to Get Tattoo Stencil Off Skin
                                    </h2>
                                    <p>
                                        You placed the stencil, but it's crooked or the placement is wrong. Don't panic! Knowing <strong>how to remove a tattoo stencil</strong> quickly is a life-saver.
                                    </p>

                                    {/* 🖼️ 图片 2: 擦除线稿 */}
                                    {/* Midjourney Prompt: A gloved hand wiping away a purple tattoo stencil from the skin using a paper towel soaked in rubbing alcohol. The skin looks slightly red but the purple ink is dissolving. High resolution, bright studio lighting --ar 16:9 */}
                                    <figure className="my-8 rounded-2xl overflow-hidden border border-slate-100 shadow-md">
                                        <Image
                                            src="/images/remove-tattoo-stencil.jpg"
                                            alt="Wiping off a misplaced tattoo stencil with alcohol"
                                            width={1200} height={675} unoptimized={true} className="w-full h-auto m-0"
                                        />
                                    </figure>

                                    <ul className="space-y-4">
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <strong>1. The Immediate Fix (Rubbing Alcohol):</strong> If the stencil is fresh, immediately spray it with 70% isopropyl alcohol or hand sanitizer. The high alcohol content dissolves the purple carbon ink instantly. Wipe it away with a paper towel.
                                        </li>
                                        <li className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <strong>2. The Stubborn Fix (Baby Oil / Coconut Oil):</strong> If the stencil has been drying for 20 minutes and alcohol isn't working, massage baby oil or coconut oil into the lines. Let it sit for a minute to break down the stencil gel, then wipe firmly.
                                        </li>
                                    </ul>

                                    {/* 💡 HUMAN INJECTION REQUIRED 2 💡 */}
                                    <div className="mt-6">
                                        <p className="text-slate-600 italic">
                                            [TODO: Write a brief personal tip about skin irritation. E.g., "Keep in mind, if you have to wipe the stencil off 3 or 4 times, the client's skin will get very red and irritated before you even start tattooing. Always take your time measuring before you press the paper down!"]
                                        </p>
                                    </div>
                                </div>

                                {/* ==========================================
                                    FAQ SECTION
                                ========================================== */}
                                <div id="faq" className="scroll-mt-28 border-t border-slate-100 pt-12">
                                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 mb-8 tracking-tight">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 shadow-inner"><HelpCircle size={24} /></div>
                                        Frequently Asked Questions
                                    </h2>

                                    <div className="space-y-4">
                                        <details className="group bg-slate-50 rounded-2xl open:bg-white open:ring-1 open:ring-indigo-200 open:shadow-lg transition-all duration-300">
                                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                                How to make a tattoo stencil without transfer paper?
                                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full">
                                                    <ChevronRight size={20} />
                                                </span>
                                            </summary>
                                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed text-base">
                                                If you don't have carbon transfer paper, you can use parchment paper (baking paper). Draw your design heavily with a sharp, non-toxic gel pen. Apply a layer of deodorant to the skin, and press the inked side of the parchment paper onto the skin. It won't last as long as a real stencil, but it works for quick DIY practice.
                                            </div>
                                        </details>

                                        <details className="group bg-slate-50 rounded-2xl open:bg-white open:ring-1 open:ring-indigo-200 open:shadow-lg transition-all duration-300">
                                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                                How long should I let the tattoo stencil dry?
                                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full">
                                                    <ChevronRight size={20} />
                                                </span>
                                            </summary>
                                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed text-base">
                                                You should let the stencil dry for a minimum of 10 to 15 minutes before you begin tattooing. If you touch it immediately after peeling the paper, it will smudge. Once fully dried, a good stencil should be difficult to wipe off.
                                            </div>
                                        </details>

                                        <details className="group bg-slate-50 rounded-2xl open:bg-white open:ring-1 open:ring-indigo-200 open:shadow-lg transition-all duration-300">
                                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                                How do I keep my stencil from wiping off while tattooing?
                                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full">
                                                    <ChevronRight size={20} />
                                                </span>
                                            </summary>
                                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed text-base">
                                                Always work from the bottom up. If you start at the top, your hand will rest on the lower part of the stencil and wipe it away. Also, instead of wiping away excess tattoo ink forcefully, gently "dab" or "pat" the skin with your paper towel to preserve the purple stencil lines beneath.
                                            </div>
                                        </details>
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