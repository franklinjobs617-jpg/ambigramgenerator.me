import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import {
    UploadCloud,
    Wand2,
    Printer,
    Image as ImageIcon,
    Type,
    Zap,
    CheckCircle2,
    ChevronRight,
    HelpCircle,
    ArrowRight
} from "lucide-react";
import Generator2d from "@/components/Generator2d";

// 替换为您实际的域名
const DOMAIN = "https://www.ambigramgenerator.me";

type Props = {
    params: { locale: string };
};

export default async function TattooStencilMakerPage({ params }: Props) {
    // 6. Schema 标记：添加 SoftwareApplication 和 FAQPage
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Tattoo Stencil Maker Online",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "description": "An online tool to instantly convert photos, images, and text into printable black-and-white tattoo stencil outlines."
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What file formats are supported?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our tattoo stencil creator supports standard image formats including JPG and PNG. You can also directly type text to generate lettering stencils."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How to print your stencil?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Once converted, download the high-resolution image. You can print it directly using a thermal tattoo stencil printer (like Phomemo or Brother) using thermal transfer paper, or print it on standard paper to trace manually."
                    }
                }
            ]
        }
    ];

    return (
        <main className="bg-[#FDFDFF] min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ==========================================
                1. HERO & CORE TOOL SECTION (工具核心区)
            ========================================== */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                {/* 背景装饰 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    {/* H1 核心主词 */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                        Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Tattoo Stencil Maker</span> Online
                    </h1>

                    {/* Intro: 核心+长尾 */}
                    <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
                        Stop tracing by hand. Use our intelligent <strong className="text-slate-900">tattoo stencil generator</strong> to instantly <strong>convert photo to tattoo stencil</strong>. Perfect for artists and beginners—no iPad or expensive software required.
                    </p>

                    {/* 🛠️ 工具功能区 (占位符 - 请替换为您的真实 React 组件) */}
                    <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2.5rem] p-6 md:p-12 max-w-4xl mx-auto transition-all hover:border-indigo-300">
                        <Generator2d />
                        <p className="text-sm text-slate-400 mt-6 font-medium">
                            * Your uploaded photos are processed locally/securely. We instantly <strong>turn image into tattoo stencil</strong> outlines.
                        </p>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. 示例库 (Before vs After) - 极高转化率组件
            ========================================== */}
            <section className="pb-20 pt-10">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-8">See the Magic</h3>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
                        {/* Before */}
                        <div className="space-y-4">
                            <span className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Original Photo</span>
                            <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 relative">
                                {/* 占位图：请替换为真实的彩色照片 */}
                                <Image src="/images/example-photo-before.webp" alt="Original photo of a rose before tattoo stencil conversion" fill className="object-cover" />
                            </div>
                        </div>

                        {/* After */}
                        <div className="space-y-4">
                            <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center justify-center gap-2 w-max mx-auto"><Wand2 size={14} /> Generated Stencil</span>
                            <div className="aspect-square bg-white rounded-2xl overflow-hidden border-4 border-indigo-500 relative shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                                {/* 占位图：请替换为工具生成的纯线稿 - 严格使用您要求的 Alt 标签 */}
                                <Image src="/images/example-stencil-after.webp" alt="example of tattoo stencil generated by our tattoo stencil maker tool" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. H2 工具介绍 (How it works)
            ========================================== */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        {/* H2 副标题 */}
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Online Tattoo Stencil Generator</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Skip the tedious hand-tracing. Here is how you can easily <strong>convert photo to tattoo stencil</strong> in three simple steps.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                            <div className="text-6xl font-black text-slate-50 absolute -right-4 -top-6 group-hover:text-indigo-50 transition-colors">1</div>
                            <ImageIcon className="text-indigo-600 mb-6 relative z-10" size={36} />
                            <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Upload Your Art</h4>
                            <p className="text-slate-600 relative z-10 leading-relaxed">
                                Start by uploading your JPG or PNG file. Whether it's a realistic portrait or a custom ambigram text, our tool handles it all.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                            <div className="text-6xl font-black text-slate-50 absolute -right-4 -top-6 group-hover:text-indigo-50 transition-colors">2</div>
                            <Wand2 className="text-indigo-600 mb-6 relative z-10" size={36} />
                            <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Instant Conversion</h4>
                            <p className="text-slate-600 relative z-10 leading-relaxed">
                                Our algorithm applies edge-detection and binarization to instantly <strong>turn image into tattoo stencil</strong>. It removes shading and leaves crisp outlines.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-indigo-300 transition-colors">
                            <div className="text-6xl font-black text-slate-50 absolute -right-4 -top-6 group-hover:text-indigo-50 transition-colors">3</div>
                            <Printer className="text-indigo-600 mb-6 relative z-10" size={36} />
                            <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Download & Print</h4>
                            <p className="text-slate-600 relative z-10 leading-relaxed">
                                Download your high-res design. It's perfectly optimized for standard thermal printers. No need for a paid <strong>tattoo stencil app</strong>!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. H2 优势 (痛点补充 & 人工注入)
            ========================================== */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-100">
                        <h2 className="text-3xl font-black text-slate-900 mb-6">Why Use Our Tattoo Stencil Creator?</h2>

                        <div className="prose prose-lg text-slate-700 max-w-none mb-8">
                            <p>
                                Creating a stencil manually using carbon paper is time-consuming. Shaky hands can ruin straight lines, and tracing complex lettering or portraits takes hours.
                                Our <strong>tattoo stencil creator</strong> solves this by giving you absolute precision in seconds.
                            </p>
                        </div>

                        <ul className="grid sm:grid-cols-2 gap-4 mb-10">
                            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
                                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                                <span className="text-slate-700 font-medium">100% Free, no hidden subscriptions.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
                                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                                <span className="text-slate-700 font-medium">Zero grey shading (prevents printer jams).</span>
                            </li>
                            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
                                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                                <span className="text-slate-700 font-medium">Works perfectly on mobile phones.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
                                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                                <span className="text-slate-700 font-medium">Saves hours of manual tracing time.</span>
                            </li>
                        </ul>

                        {/* 💡 HUMAN INJECTION REQUIRED 💡 */}
                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl">
                            <div className="flex items-center gap-2 font-bold text-indigo-900 mb-2">
                                <Zap size={18} className="text-indigo-600" /> From the Developer:
                            </div>
                            <p className="text-indigo-800 italic m-0">
                                [TODO: 请用英文填写您的真实经验。例如：“As someone who loves Ambigrams, I noticed that tracing symmetrical text by hand always led to slight errors. I built this tool specifically with high-contrast edge detection so the lines are flawlessly sharp. It's basically a must-have if you're doing lettering or fine-line work.”]
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                5. H2 FAQ (长尾问题词)
            ========================================== */}
            <section className="pb-24 pt-10 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-black text-center text-slate-900 mb-12 flex items-center justify-center gap-3">
                        <HelpCircle size={32} className="text-indigo-500" /> Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        <details className="group bg-white rounded-2xl border border-slate-200 open:ring-2 open:ring-indigo-100 transition-all duration-300">
                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                What file formats are supported?
                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full">
                                    <ChevronRight size={20} />
                                </span>
                            </summary>
                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                                You can upload any standard <strong>JPG, JPEG, or PNG</strong> image files. For text tattoos, simply type your desired word into our generator, and we will handle the rest.
                            </div>
                        </details>

                        <details className="group bg-white rounded-2xl border border-slate-200 open:ring-2 open:ring-indigo-100 transition-all duration-300">
                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                How to print your stencil in the right size?
                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full">
                                    <ChevronRight size={20} />
                                </span>
                            </summary>
                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                                Once you download the generated outline, open the image on your computer or phone. You can scale the image size inside your printing dialog (e.g., set scale to 50% for a smaller arm tattoo) before sending it to your thermal tattoo printer or standard inkjet printer.
                            </div>
                        </details>

                        <details className="group bg-white rounded-2xl border border-slate-200 open:ring-2 open:ring-indigo-100 transition-all duration-300">
                            <summary className="font-bold text-lg text-slate-800 cursor-pointer p-6 flex justify-between items-center list-none marker:hidden">
                                Do I need to download a tattoo stencil app?
                                <span className="transition duration-300 group-open:rotate-180 text-indigo-500 bg-indigo-50 p-2 rounded-full">
                                    <ChevronRight size={20} />
                                </span>
                            </summary>
                            <div className="text-slate-600 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                                Not at all. Our tool is entirely web-based and fully responsive. It works perfectly on your iPhone, Android phone, or iPad browser without taking up any storage space.
                            </div>
                        </details>
                    </div>
                </div>
            </section>

            {/* ==========================================
                6. 底部 Footer 相关链接 (引导至页面 A / C)
            ========================================== */}
            <section className="py-16 bg-slate-900 text-center px-4">
                <div className="container mx-auto max-w-4xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Need more help or inspiration?</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/" className="bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 px-6 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700">
                            Try to use our ambigram generator <ArrowRight size={18} />
                        </Link>
                        <Link href="/tattoo-stencil-designs" className="bg-indigo-600 text-white hover:bg-indigo-500 px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/50">
                            Browse Free Stencil Gallery <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}