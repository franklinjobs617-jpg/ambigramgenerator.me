import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { Check, X, ArrowRight, Sparkles, Zap } from "lucide-react";

type Props = { params: { locale: string } };

// TDH: 覆盖核心竞品词群
// "flipscript ambigram generator" 880/月 KD=9
// "ambigram generator flipscript" 210/月 KD=1
// "flipscript ambigram generator free" 110/月 KD=8
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "Flipscript Alternative: Free Ambigram Generator with 3D & No Signup",
        description: "The best free Flipscript alternative. Create two-name ambigrams, export 3D STL files and download HD PNG — all free with no account required. Try it now.",
        path: "/flipscript-alternative",
        locale,
    });
}

// 对比数据 — 基于公开可验证的功能差异，不捏造
const comparison = [
    { feature: "Price", us: "Free", them: "Paid / subscription required" },
    { feature: "Two-name ambigram", us: true, them: true },
    { feature: "3D model generation", us: true, them: false },
    { feature: "STL export for 3D printing", us: true, them: false },
    { feature: "No account required", us: true, them: false },
    { feature: "No watermark on free download", us: true, them: false },
    { feature: "PNG download", us: true, them: "Paid only" },
    { feature: "Calligraphy / tattoo style", us: true, them: true },
    { feature: "GIF animation export", us: true, them: false },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Flipscript Alternative — Free Ambigram Generator",
        "description": "Free alternative to Flipscript for creating two-name ambigrams, 3D STL exports and HD PNG downloads without an account.",
        "url": "https://www.ambigramgenerator.me/flipscript-alternative"
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the best free alternative to Flipscript?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AmbigramGenerator.me is the most feature-complete free Flipscript alternative. It supports two-name ambigrams, 3D STL export for printing, HD PNG downloads, and requires no account or signup. Flipscript's core features require a paid subscription."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use Flipscript for free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Flipscript offers a limited free preview, but downloading high-resolution files and accessing advanced features requires a paid plan. AmbigramGenerator.me provides the same two-name ambigram functionality for free, with the addition of 3D STL export."
                }
            },
            {
                "@type": "Question",
                "name": "Does the free alternative support 3D ambigrams?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. AmbigramGenerator.me is one of the only free tools that generates 3D ambigrams and exports them as STL files ready for 3D printing. Flipscript does not offer 3D generation."
                }
            },
            {
                "@type": "Question",
                "name": "Is AmbigramGenerator.me really free with no watermark?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. You can create and download 2D ambigram PNG files at no cost with no watermark and no account required. The 3D STL export is also available for free."
                }
            }
        ]
    }
];

export default async function FlipscriptAlternativePage({ params }: Props) {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        Flipscript Alternative
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Free Flipscript Alternative —{" "}
                        <span className="text-indigo-600">With 3D & No Signup</span>
                    </h1>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                        Everything Flipscript does, plus 3D STL export, GIF animation, and no account required. Free to use, no watermark, no paywall.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            <Sparkles size={15} /> Try Free — No Signup
                        </Link>
                        <Link
                            href="/3d-generator"
                            className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 px-7 py-4 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                        >
                            3D Generator <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-4xl space-y-16">

                    {/* QUICK VERDICT */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                        <p className="font-bold text-indigo-900 text-sm mb-2">Quick verdict</p>
                        <p className="text-slate-700 text-sm leading-relaxed">
                            <strong>If you need a free Flipscript alternative</strong> — AmbigramGenerator.me covers everything Flipscript does and adds 3D STL export and GIF animation, all without an account or subscription. If you have a budget and need the widest font library for commercial work, Flipscript remains the professional standard. For most users making tattoo references or 3D prints, the free option is more than enough.
                        </p>
                    </div>

                    {/* WHY USERS SEARCH FOR FLIPSCRIPT ALTERNATIVES */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-5">
                            Why people look for a Flipscript alternative
                        </h2>
                        <div className="space-y-3">
                            {[
                                ["Flipscript requires a paid plan for most downloads", "The free preview is low resolution and watermarked. High-res PNG and advanced features are behind a subscription."],
                                ["No 3D output", "Flipscript generates 2D ambigrams only. There is no way to export a 3D model or STL file for printing."],
                                ["Account required", "Flipscript requires signup even for basic use. Many users want to generate a quick design without creating an account."],
                            ].map(([title, desc]) => (
                                <div key={title} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100">
                                    <X size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm mb-1">{title}</p>
                                        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COMPARISON TABLE */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            AmbigramGenerator.me vs Flipscript
                        </h2>
                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="w-full min-w-[480px] text-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Feature</th>
                                        <th className="px-4 py-4 text-center text-xs font-bold text-indigo-600 uppercase tracking-widest">AmbigramGenerator.me</th>
                                        <th className="px-4 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Flipscript</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {comparison.map((row) => (
                                        <tr key={row.feature} className="hover:bg-slate-50/50">
                                            <td className="px-5 py-3.5 font-medium text-slate-700">{row.feature}</td>
                                            <td className="px-4 py-3.5 text-center">
                                                {typeof row.us === "boolean" ? (
                                                    <Check size={16} className="text-green-500 mx-auto" />
                                                ) : (
                                                    <span className="font-bold text-green-600 text-xs">{row.us}</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 text-center">
                                                {typeof row.them === "boolean" ? (
                                                    row.them
                                                        ? <Check size={16} className="text-slate-400 mx-auto" />
                                                        : <X size={16} className="text-red-300 mx-auto" />
                                                ) : (
                                                    <span className="text-slate-400 text-xs">{row.them}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-400 mt-3">
                            Comparison based on publicly available features as of 2026. Flipscript remains the best option for professional commercial work requiring the widest font range.
                        </p>
                    </div>

                    {/* WHAT WE OFFER */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            What you get with the free alternative
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                {
                                    icon: <Sparkles size={18} className="text-indigo-600" />,
                                    title: "Two-name ambigram generator",
                                    desc: "Enter two names or words and generate a rotational ambigram that reads one word right-side up and the other when rotated 180°. The core Flipscript use case, free.",
                                    href: "/two-word-ambigram-generator",
                                    cta: "Try two-name generator",
                                },
                                {
                                    icon: <Zap size={18} className="text-indigo-600" />,
                                    title: "3D STL export",
                                    desc: "Generate a physical 3D ambigram object and download the STL file for printing. Not available on Flipscript at any price tier.",
                                    href: "/3d-generator",
                                    cta: "Try 3D generator",
                                },
                                {
                                    icon: <Check size={18} className="text-indigo-600" />,
                                    title: "No watermark, no account",
                                    desc: "Download high-resolution PNG files immediately. No signup, no email verification, no watermark on the free tier.",
                                    href: "/",
                                    cta: "Generate now",
                                },
                                {
                                    icon: <ArrowRight size={18} className="text-indigo-600" />,
                                    title: "Tattoo-ready calligraphy styles",
                                    desc: "Choose from Blocky and Calligraphy styles optimised for clean lines that tattoo artists can work from directly.",
                                    href: "/ambigram-word-tattoos",
                                    cta: "See tattoo designs",
                                },
                            ].map((item) => (
                                <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.desc}</p>
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center gap-1.5 text-indigo-600 font-bold text-xs hover:underline"
                                    >
                                        {item.cta} <ArrowRight size={12} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* WHEN TO USE FLIPSCRIPT */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                        <h2 className="text-lg font-black text-slate-900 mb-3">When Flipscript is still the better choice</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            We believe in honest comparisons. There are cases where Flipscript remains the stronger option:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex gap-2"><Check size={14} className="text-slate-400 flex-shrink-0 mt-0.5" /><span><strong>Widest font library</strong> — Flipscript has a larger selection of font styles, particularly for complex scripts.</span></li>
                            <li className="flex gap-2"><Check size={14} className="text-slate-400 flex-shrink-0 mt-0.5" /><span><strong>Commercial projects with budget</strong> — for paid client work, Flipscript's professional reputation and support may be worth the cost.</span></li>
                            <li className="flex gap-2"><Check size={14} className="text-slate-400 flex-shrink-0 mt-0.5" /><span><strong>Long-form history</strong> — Flipscript has been running since the early 2000s and has an extensive track record.</span></li>
                        </ul>
                        <p className="text-slate-500 text-xs mt-4">For personal projects, tattoo references, and 3D printing, the free alternative covers everything you need.</p>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently asked questions</h2>
                        <div className="space-y-3">
                            {[
                                {
                                    q: "What is the best free alternative to Flipscript?",
                                    a: "AmbigramGenerator.me is the most complete free Flipscript alternative. It supports two-name ambigrams, 3D STL export, HD PNG downloads, and requires no account. Flipscript's core features require a paid subscription."
                                },
                                {
                                    q: "Can I use Flipscript for free?",
                                    a: "Flipscript offers a limited free preview, but high-resolution downloads and advanced features require a paid plan. AmbigramGenerator.me provides the same two-name ambigram functionality for free, with the addition of 3D STL export."
                                },
                                {
                                    q: "Does the free alternative support 3D ambigrams?",
                                    a: "Yes. AmbigramGenerator.me generates 3D ambigrams and exports them as STL files ready for 3D printing. This feature is not available on Flipscript at any price tier."
                                },
                                {
                                    q: "Is AmbigramGenerator.me really free with no watermark?",
                                    a: "Yes. 2D ambigram PNG downloads are free with no watermark and no account required. The 3D STL export is also free."
                                },
                                {
                                    q: "Does AmbigramGenerator.me work on mobile?",
                                    a: "Yes. The generator is fully responsive and works on mobile browsers. No app download is required — it runs directly in your phone's browser."
                                },
                            ].map(({ q, a }) => (
                                <div key={q} className="border border-slate-100 rounded-xl p-5 bg-white">
                                    <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-indigo-600 rounded-2xl p-10 text-white">
                        <h2 className="text-2xl font-black mb-3">Try the free Flipscript alternative</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
                            No account. No watermark. Two-name ambigrams, 3D STL export, and tattoo-ready styles — free.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                                <Sparkles size={15} /> Open Generator Free
                            </Link>
                            <Link href="/3d-generator" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                                3D STL Generator <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold text-indigo-200">
                            <Link href="/guide/best-online-tools" className="hover:text-white transition-colors">Full tool comparison</Link>
                            <Link href="/ambigram-word-tattoos" className="hover:text-white transition-colors">Tattoo ambigrams</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors">Pro plan</Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
