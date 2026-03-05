import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import {
    Copy,
    Sparkles,
    Instagram,
    Twitter,
    MessageCircle,
    HelpCircle,
    ChevronRight,
    ArrowRight,
    Brain,
    Terminal,
    Wand2, User,
    Quote
} from "lucide-react";
import TextIllusionTools from "./TextIllusionTools";



type Props = {
    params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "Free Upside Down Text Generator (ɔoʇd ⅋ ʎdoɔ) & Glitch Maker",
        description: "Instantly flip, reverse, mirror, or glitch your text with our free online generator. Perfect for Instagram bios, Discord names, and social media. Copy and paste anywhere!",
        path: "/upside-down-text-generator",
        locale: locale,
    });
}

export default async function UpsideDownTextGeneratorPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Creative Text Effects & Upside Down Generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "A comprehensive suite of text tools including upside down text, backwards text, mirror text, and glitch text generators for easy copy and paste."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How to type upside down letters?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You don't need a special upside down keyboard. Our tool automatically converts standard letters into their corresponding upside-down Unicode characters. Just type, convert, and copy and paste."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the difference between upside down, backwards, and mirror text?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Upside down flips letters vertically. Backwards reverses the order of the string. Mirror text flips letters horizontally. Our generator supports all these styles."
                    }
                }
            ]
        }
    ];



    return (
        <main className="bg-[#FDFDFF] min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ==========================================
                1. HERO & CORE TOOL SECTION
            ========================================== */}
            <section className="bg-gradient-to-b from-indigo-50/80 to-white pt-32 pb-16 px-4 md:px-6 text-center">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/50 text-indigo-700 font-bold text-sm mb-6 shadow-sm border border-indigo-100">
                        <Wand2 size={16} /> 100% Free Copy & Paste Tool
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-slate-900 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Upside Down</span> Text Generator
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                        Let's be honest, the standard alphabet is getting boring. Break the pattern and turn the digital world on its head. Just type, flip, and <strong className="text-slate-900">copy and paste</strong>.
                    </p>


                    <TextIllusionTools />
                </div>
            </section>

            {/* ==========================================
                2. THE PSYCHOLOGY (深度 SEO 内容)
            ========================================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center"><Brain size={24} /></div>
                        <h2 className="text-3xl font-black text-slate-900">Why We're Obsessed with Flipped Text</h2>
                    </div>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p>Why does something as simple as <code>ʇxǝʇ pǝddıןɟ</code> feel so compelling? It's human nature.</p>
                        <ul className="space-y-4">
                            <li><strong className="text-slate-800">It Breaks Patterns:</strong> Our brains are wired to read left-to-right, top-to-bottom. Upside down text shatters that pattern, forcing a moment of focused attention. It's a digital stop sign in a sea of normal text.</li>
                            <li><strong className="text-slate-800">It Creates an In-Group:</strong> Using it in a Discord name or Instagram bio signals that you're part of a digital subculture that values creativity and uniqueness over corporate conformity.</li>
                            <li><strong className="text-slate-800">It's Just Plain Fun:</strong> In a world of polished, serious communication, a little bit of playful, visual chaos is refreshing.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. USE CASES (应用场景长尾词)
            ========================================== */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-black text-slate-900 text-center mb-16">A Practical Guide: Where to Use Flipped Text</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <Instagram size={40} className="mb-6 text-pink-500" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Instagram & TikTok Bios</h3>
                            <p className="text-slate-600 leading-relaxed">Use our <strong className="text-slate-800">upside down text for instagram</strong> feature to flip your name or a single keyword in your bio for maximum impact. Pro tip: Don't flip your entire bio, or it becomes unreadable.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <MessageCircle size={40} className="mb-6 text-blue-500" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Discord & Gaming</h3>
                            <p className="text-slate-600 leading-relaxed">This is where you can go wild. Use the <strong className="text-slate-800">upside down name generator</strong> to create an unforgettable handle that stands out in the server list. Highly popular in Roblox, Minecraft, and Fortnite.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <Twitter size={40} className="mb-6 text-sky-500" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Viral Social Posts</h3>
                            <p className="text-slate-600 leading-relaxed">Start a post on Facebook or X (Twitter) with an upside-down question to immediately pique curiosity and stop users from scrolling past your content.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. THE GEEKY PART: UNICODE EXPLAINED
            ========================================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center"><Terminal size={24} /></div>
                        <h2 className="text-3xl font-black text-slate-900">The Secret Behind the Flip: A Dive into Unicode</h2>
                    </div>

                    <div className="prose prose-lg text-slate-600 max-w-none mb-10">
                        <p>Many people search for <em>"how to type upside down letters"</em> thinking they need a special <strong>upside down keyboard</strong> or font. You don't. The real story is way cooler.</p>
                        <p>You're likely familiar with ASCII, the old standard for text. It was simple, but limited. Enter <strong>Unicode</strong>, a massive global library containing over 140,000 characters—including emojis (😂), ancient scripts, and mathematical symbols that just <em>happen</em> to look exactly like upside down letters.</p>
                        <p>Our generator is a powerful mapping tool. When you type 'A', it doesn't rotate an image; it instantly searches the Unicode library and replaces it with the corresponding character '∀'. This is why you can <strong>copy and paste upside down text</strong> securely anywhere.</p>
                    </div>

                    {/* Visual Character Map Table */}
                    <div className="overflow-x-auto bg-slate-50 rounded-2xl border border-slate-200">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                    <th className="p-4">Normal Input</th>
                                    <th className="p-4">Upside Down</th>
                                    <th className="p-4">Backwards</th>
                                    <th className="p-4 border-r-0">Mirror</th>
                                </tr>
                            </thead>
                            <tbody className="text-xl font-medium text-slate-800">
                                <tr className="border-b border-slate-200">
                                    <td className="p-4">a</td><td className="p-4 text-indigo-600">ɐ</td><td className="p-4 text-blue-600">a</td><td className="p-4 text-emerald-600 border-r-0">ɒ</td>
                                </tr>
                                <tr className="border-b border-slate-200">
                                    <td className="p-4">b</td><td className="p-4 text-indigo-600">q</td><td className="p-4 text-blue-600">b</td><td className="p-4 text-emerald-600 border-r-0">d</td>
                                </tr>
                                <tr>
                                    <td className="p-4">c</td><td className="p-4 text-indigo-600">ɔ</td><td className="p-4 text-blue-600">c</td><td className="p-4 text-emerald-600 border-r-0">ɔ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ==========================================
                5. CREATIVE TOOLBOX (高搜量竞品词覆盖)
            ========================================== */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-black mb-6">Beyond the Flip: Your Creative Text Toolbox</h2>
                    <p className="text-slate-300 text-lg mb-12 max-w-3xl">Flipping text is just the beginning. The same Unicode magic allows for a universe of other effects. Our top menu includes these other popular generators for a reason:</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-indigo-500 transition-colors">
                            <h3 className="text-xl font-bold mb-2">Backwards Text</h3>
                            <p className="text-slate-400 mb-6 text-sm">Reverses the character order. Great for puzzles or "spoiler" warnings.</p>
                            <div className="bg-slate-900 p-4 rounded-xl font-mono text-center text-blue-400">olleh (hello)</div>
                        </div>
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500 transition-colors">
                            <h3 className="text-xl font-bold mb-2">Mirror Text</h3>
                            <p className="text-slate-400 mb-6 text-sm">Flips text horizontally, creating a literal reflection. An uncanny effect.</p>
                            <div className="bg-slate-900 p-4 rounded-xl font-mono text-center text-emerald-400">oɘllɘH (Hello)</div>
                        </div>
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-pink-500 transition-colors">
                            <h3 className="text-xl font-bold mb-2">Glitch Text</h3>
                            <p className="text-slate-400 mb-6 text-sm">The king of chaos (Zalgo). Adds creepy, overlapping marks above/below letters.</p>
                            <div className="bg-slate-900 p-4 rounded-xl font-mono text-center text-pink-400">H̵̄͝ĕ̸̒l̸̟͘ḽ̷̈o̷ (Hello)</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-black text-slate-900 text-center mb-12 flex items-center justify-center gap-3">
                        <Sparkles size={32} className="text-indigo-500" /> Need a Different Text Effect?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* 推荐 Mirror Text 生成器 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group hover:border-emerald-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-black">⇄</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Mirror Text Generator</h3>
                                    <p className="text-sm text-emerald-600 font-bold uppercase tracking-wider">Flip Horizontally</p>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                If you are looking for a <strong className="text-slate-800">mirror text generator</strong> that flips your letters horizontally (like a reflection in a mirror), our dedicated tool is ready for you. It's the perfect way to create mysterious, code-like messages for escape rooms or unique design layouts.
                            </p>
                            <Link href="/mirror-text-generator" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors w-full justify-center">
                                Go to Mirror Text Generator <ArrowRight size={18} />
                            </Link>
                        </div>

                        {/* 推荐 Ambigram Generator (核心转化) */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group hover:border-indigo-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl font-black">∞</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Ambigram Generator</h3>
                                    <p className="text-sm text-indigo-600 font-bold uppercase tracking-wider">Professional Text Art</p>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Simple flips are fun, but Ambigrams are art. Use our core generator to create professional, symmetrical designs that are readable from both directions. A must-have for <strong className="text-slate-800">custom tattoo designs</strong> and logos.
                            </p>
                            <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors w-full justify-center">
                                Try Professional Generator <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* ==========================================
                6. THE UPSELL BRIDGE (转化至核心业务 Ambigram)
            ========================================== */}
            <section className="py-24 bg-gradient-to-b from-white to-indigo-50/50 border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 flex items-center justify-center gap-3">
                        <Sparkles size={32} className="text-indigo-500" /> The Final Frontier: From Trick to True Art
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
                        You've explored flips, mirrors, and glitches. You've mastered digital disruption. But what if you want to create something with lasting beauty and meaning? That's when you graduate from text <em>effects</em> to text <em>art</em>.
                    </p>

                    {/* 🖼️ 对比图 */}
                    {/* MJ Prompt: Split-screen graphic. Left side: basic upside down text 'ǝɯosǝʍɐ'. Right side: a beautifully designed, artistic, symmetrical Ambigram of the word 'Awesome' that is perfectly readable when rotated 180 degrees. Clean, professional background. --ar 16:9 */}
                    <div className="relative w-full max-w-4xl mx-auto rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl mb-12">
                        <Image
                            src="/images/upside-down-vs-ambigram.png"
                            alt="Comparison between simple upside down text and a custom designed professional Ambigram"
                            width={1200} height={675}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* 💡 HUMAN INJECTION REQUIRED 💡 - 高能 E-E-A-T 区域 */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-lg shadow-indigo-100/50 max-w-4xl mx-auto text-left mb-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-slate-100 opacity-50 pointer-events-none"><Quote size={120} /></div>

                        <div className="flex items-center gap-3 font-black text-indigo-900 mb-4 uppercase tracking-wider text-sm relative z-10">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center"><User className="text-indigo-600" size={16} /></div>
                            From the Creator:
                        </div>

                        <div className="text-slate-700 text-lg leading-relaxed relative z-10 italic">
                            <p>
                                I still remember the client who wanted to carry their kids, Leo and Mia, in a single tattoo. They didn't just want names; they wanted a transformation. That’s when I realized that a standard 'flipped text' tool is just a toy—it can't capture the soul of a design. A true Ambigram is a visual puzzle where every stroke lives a double life. I built this generator to bridge that gap, turning a complex art form into a tool you can use to create something meaningful.
                            </p>
                        </div>
                    </div>

                    <Link href="/" className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1">
                        Create a Custom Ambigram Now <ArrowRight size={22} />
                    </Link>
                </div>
            </section>

            {/* ==========================================
                7. FAQ SECTION
            ========================================== */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-black text-slate-900 mb-12 flex items-center justify-center gap-3">
                        <HelpCircle size={32} className="text-slate-400" /> Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        <details open className="group bg-slate-50 rounded-2xl border border-slate-100 open:bg-white open:ring-2 open:ring-indigo-100 transition-all duration-300">
                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                What is the difference between upside down, backwards, and mirror text?
                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full"><ChevronRight size={20} /></span>
                            </summary>
                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 mt-2 pt-4 prose">
                                <ul>
                                    <li><strong>Upside Down (Flip Text):</strong> Flips each letter vertically (a → ɐ).</li>
                                    <li><strong>Backwards (Reverse Text):</strong> Reverses the order of the string (abc → cba). Our tool includes a <strong>backwards text generator</strong> for this.</li>
                                    <li><strong>Mirror Text:</strong> Flips each letter horizontally, like looking in a mirror. We also feature a <strong>mirror text generator</strong> to achieve this exact effect.</li>
                                </ul>
                            </div>
                        </details>

                        <details open className="group bg-slate-50 rounded-2xl border border-slate-100 open:bg-white open:ring-2 open:ring-indigo-100 transition-all duration-300">
                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                Will this work on every device, game, and website?
                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full"><ChevronRight size={20} /></span>
                            </summary>
                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                                Almost! About 99% of modern smartphones, PCs, and social platforms (Instagram, TikTok, Twitter, Discord) render Unicode characters correctly. Very rarely, on a heavily outdated system or in a game with a strictly limited custom font, you might see a generic square box (☐) instead of the flipped letter. Always test it where you plan to use it!
                            </div>
                        </details>

                        <details open className="group bg-slate-50 rounded-2xl border border-slate-100 open:bg-white open:ring-2 open:ring-indigo-100 transition-all duration-300">
                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                Is this generator an upside down font I have to download?
                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full"><ChevronRight size={20} /></span>
                            </summary>
                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                                No, absolutely not. There is nothing to install or download. Because we use standard Unicode symbols to mimic the English alphabet, it functions as raw text. This means you can generate it here, click <strong>copy and paste</strong>, and paste it directly into any text field on the internet.
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </main>
    );
}