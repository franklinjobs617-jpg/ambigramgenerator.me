import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import {
    Copy,
    RefreshCw,
    Sparkles,
    MonitorPlay,
    HelpCircle,
    ChevronRight,
    ArrowRight,
    Type,
    PenTool,
    Quote
} from "lucide-react";
import MirrorTextTool from "./MirrorTextTool";
const DOMAIN = "https://www.ambigramgenerator.me";

// 1. TDK (Title, Description, Keywords) - 严格保护 Exact Match 关键词
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Free Mirror Text Generator 🔄 (Reverse & Flip Words)",
        description: "Instantly create reversed and mirrored text with our free online mirror text generator. Plus, quick guides on how to mirror text in Word, Canva, and Google Docs.",
        alternates: {
            canonical: `${DOMAIN}/mirror-text-generator`,
        }
    };
}

export default async function MirrorTextGeneratorPage() {
    // 2. Schema.org 结构化数据 - 暗箱操作：把高搜量长尾词塞进 FAQ，抢占“零点击”面板
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Mirror Text Generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "A free online tool to generate horizontally flipped mirror text using Unicode characters."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How to mirror text on Canva?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Type your text, download that specific page as a transparent PNG, re-upload the PNG to Canva, select it, and click 'Flip Horizontal' on the top toolbar."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How to mirror text in Word?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Insert a Text Box and type your word. Right-click the border, select Format Shape, go to the Effects tab (pentagon icon), select 3D Rotation, and type exactly 180° in the X Rotation box."
                    }
                }
            ]
        }
    ];

    return (
        <main className="bg-[#FDFDFF] min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ==========================================
                1. HERO & CORE TOOL SECTION (权重最高区)
            ========================================== */}
            <section className="bg-gradient-to-b from-slate-50 to-white pt-32 pb-16 px-4 md:px-6 text-center">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-slate-900 leading-tight">
                        Free Mirror Text Generator  🔄
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                        Ever tried to read a t-shirt in a selfie? Everything is backward. Our <strong>mirror text generator</strong> does exactly that—but on purpose. Type below to generate instant reversed letters.
                    </p>
                    <MirrorTextTool />
                </div>
            </section>

            {/* ==========================================
                2. EXPLAINER (包含 LSI 词汇)
            ========================================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center"><Type size={24} /></div>
                        <h2 className="text-3xl font-black text-slate-900">What Actually is a Mirrored Text Generator?</h2>
                    </div>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p>If you’ve ever looked at the front of an ambulance and noticed the word is printed backward (so it reads correctly in a rearview mirror), you already understand <strong>mirror texting</strong>.</p>
                        <p>A true <strong>mirrored text generator</strong> doesn't just reverse the order of the letters (like <code>hello</code> to <code>olleh</code>). It actually flips the letters themselves horizontally using obscure Unicode symbols. It turns a standard "c" into a "ɔ" and an "e" into an "ɘ". Because these are text characters and not images, you can copy and paste them directly into Instagram, Discord, or WhatsApp.</p>
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. SOFTWARE GUIDE (长尾痛点截流区 - 严格保护词组)
            ========================================== */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <MonitorPlay size={40} className="mx-auto mb-4 text-emerald-500" />
                        <h2 className="text-3xl font-black text-slate-900 mb-4">How to Mirror Text in Design Software</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our online tool above is perfect for quick social media posts. But if you need to flip a specific, beautiful font for a t-shirt print or poster, Unicode won't help. Here is the ultimate cheat sheet for popular apps.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Canva */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">How to mirror text on Canva</h3>
                            <p className="text-slate-600 mb-4">Canva makes it surprisingly tricky to flip text directly. Here is the best workaround:</p>
                            <ol className="list-decimal pl-5 space-y-2 text-slate-700 font-medium">
                                <li>Type your text using your chosen font and save/download that specific page as a PNG with a transparent background.</li>
                                <li>Re-upload that PNG back into your Canva design.</li>
                                <li>Select the image, click <strong>Flip</strong> on the top toolbar, and choose <strong>Flip Horizontal</strong>. Done!</li>
                            </ol>
                        </div>

                        {/* Word */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">How to mirror text in Word</h3>
                            <p className="text-slate-600 mb-4">Microsoft Word actually has a hidden 3D tool perfect for this. If you are wondering <strong>how to mirror a text in Word</strong> for a printable iron-on transfer, follow these steps:</p>
                            <ol className="list-decimal pl-5 space-y-2 text-slate-700 font-medium">
                                <li>Go to <strong>Insert</strong> &gt; <strong>Text Box</strong> and type your word.</li>
                                <li>Right-click the text box border and select <strong>Format Shape</strong>.</li>
                                <li>Go to <strong>Effects</strong> (the pentagon icon) &gt; <strong>3D Rotation</strong>.</li>
                                <li>In the <strong>X Rotation</strong> box, type exactly <code>180°</code>. Your text will instantly flip.</li>
                            </ol>
                        </div>

                        {/* Google Docs */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">How to mirror text in Google Docs</h3>
                            <p className="text-slate-600 mb-4">You can't flip standard text directly on a Doc page, but the Drawing tool makes it easy:</p>
                            <ol className="list-decimal pl-5 space-y-2 text-slate-700 font-medium">
                                <li>Click <strong>Insert</strong> &gt; <strong>Drawing</strong> &gt; <strong>New</strong>.</li>
                                <li>Add a text box and type your phrase.</li>
                                <li>Click the text box to select it, then click <strong>Actions</strong> &gt; <strong>Rotate</strong> &gt; <strong>Flip horizontally</strong>.</li>
                                <li>Hit "Save and Close" to drop it into your document.</li>
                            </ol>
                        </div>
                    </div>

                    {/* 💡 HUMAN INJECTION REQUIRED 1 (E-E-A-T) 💡 */}
                    <div className="mt-10 bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 text-emerald-100 opacity-50"><Quote size={80} /></div>
                        <p className="font-bold text-emerald-900 mb-2 relative z-10">Designer's Frustration (From the Creator):</p>
                        <div className="text-emerald-800 italic relative z-10">
                            <p>

                                I totally get that frustration—honestly, ruining three good shirts is a painful way to learn a lesson!

                                There’s nothing worse than peeling back a transfer only to realize the text is backward. I used to spend way too much time wrestling with Canva just to figure out the mirroring trick for iron-ons. That’s exactly why I started this page: to keep all these "wish I knew this sooner" formatting tips in one spot so nobody else has to waste time (or perfectly good t-shirts) like I did.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. THE UPSELL BRIDGE (转化漏斗至 Ambigram)
            ========================================== */}
            <section className="py-24 bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 flex items-center justify-center gap-3">
                        <Sparkles size={32} className="text-indigo-500" /> Upgrade Your Design: From Mirror Text to True Ambigrams
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
                        Writing things backward is a fun trick. But if you are looking for a unique tattoo, a mind-bending logo, or true symmetry, a simple horizontal flip isn't enough.
                    </p>

                    {/* 🖼️ IMAGE PLACEHOLDER */}
                    {/* MJ Prompt: A clean, modern split-screen graphic. Left side: The word 'HOPE' written in simple backward mirrored text. Right side: A highly artistic, gothic-style Ambigram of the word 'HOPE' that looks beautifully symmetrical and is readable in a mirror. White background, highly detailed. --ar 16:9 */}
                    <div className="relative w-full max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl mb-12">
                        <Image
                            src="/images/mirror-text-vs-ambigram.jpg"
                            alt="Comparison between simple mirror text generator output and a custom symmetrical Ambigram design"
                            width={1200} height={675}
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="prose prose-lg text-slate-600 max-w-3xl mx-auto mb-10">
                        <p>While a mirror generator flips letters blindly, our core <strong>Ambigram Generator</strong> uses intelligent design logic to weave letters together into a symmetrical masterpiece that reads the same from multiple directions.</p>
                    </div>

                    <Link href="/" className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1">
                        <PenTool size={20} /> Create a Custom Ambigram Now
                    </Link>
                </div>
            </section>

            {/* ==========================================
                5. FAQ SECTION (站内权重互传)
            ========================================== */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center justify-center gap-3">
                        <HelpCircle size={32} className="text-slate-400" /> Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        <details open className="group bg-white rounded-2xl border border-slate-200 open:ring-2 open:ring-emerald-100 transition-all duration-300">
                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                What is the difference between a mirror generator and an upside-down generator?
                                <span className="transition duration-300 group-open:rotate-180 text-emerald-500 bg-emerald-50 p-2 rounded-full"><ChevronRight size={20} /></span>
                            </summary>
                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                                A mirror generator flips text horizontally (left-to-right), making it readable only in a reflection. An upside-down generator flips text vertically (top-to-bottom). If you want to make your text do a handstand instead, check out our dedicated <Link href="/upside-down-text-generator" className="text-indigo-600 font-bold hover:underline">upside down text generator</Link> tool.
                            </div>
                        </details>

                        <details open className="group bg-white rounded-2xl border border-slate-200 open:ring-2 open:ring-emerald-100 transition-all duration-300">
                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                Will this mirrored text show up correctly on iPhones and Androids?
                                <span className="transition duration-300 group-open:rotate-180 text-emerald-500 bg-emerald-50 p-2 rounded-full"><ChevronRight size={20} /></span>
                            </summary>
                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                                Yes. Because the tool generates standard Unicode symbols rather than custom fonts, your <strong>mirror texting</strong> will display correctly on almost all modern smartphones, browsers, and social media apps like Instagram and TikTok.
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </main>
    );
}