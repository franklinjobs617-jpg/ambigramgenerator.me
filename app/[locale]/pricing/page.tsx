import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { Check, X, Sparkles, Zap } from "lucide-react";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "Pricing — Free vs Pro Ambigram Generator",
        description: "Ambigram Generator pricing: free plan with 5 credits, Pro at $15/month for 666 credits, HD downloads and 3D STL export. No hidden fees.",
        path: "/pricing",
        locale,
    });
}

const features = [
    { label: "Credits", free: "5 credits total", pro: "666 credits / month" },
    { label: "Output quality", free: "1K standard", pro: "1K + 2K HD" },
    { label: "3D STL export", free: false, pro: true },
    { label: "Visualize 3D model", free: false, pro: true },
    { label: "HD downloads", free: false, pro: true },
    { label: "No daily limits", free: false, pro: true },
    { label: "All styles", free: true, pro: true },
    { label: "PNG download", free: true, pro: true },
    { label: "No watermark", free: true, pro: true },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ambigram Generator Pricing",
    "description": "Free and Pro plans for AmbigramGenerator.me. Free: 5 credits. Pro: $15/month for 666 credits, HD downloads, and 3D STL export.",
    "url": "https://www.ambigramgenerator.me/pricing",
    "offers": [
        {
            "@type": "Offer",
            "name": "Free Plan",
            "price": "0",
            "priceCurrency": "USD",
            "description": "5 credits to explore the generator. 1K output (1 credit), no HD or 3D STL."
        },
        {
            "@type": "Offer",
            "name": "Pro Plan",
            "price": "15",
            "priceCurrency": "USD",
            "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "15",
                "priceCurrency": "USD",
                "unitText": "month"
            },
            "description": "666 credits/month, HD downloads, 3D STL export, no daily limits."
        }
    ]
};

export default async function PricingPage({ params }: Props) {
    return (
        <main className="bg-[#FDFDFF] min-h-screen pt-32 pb-20 px-4">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER */}
            <div className="text-center mb-14 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs mb-5 uppercase tracking-wider">
                    UPGRADE
                </div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
                    Choose Your Plan
                </h1>
                <p className="text-slate-500 text-lg">
                    Start free, unlock pro quality when you&apos;re ready.
                </p>
            </div>

            {/* PLAN CARDS */}
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-16">

                {/* Free */}
                <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
                    <div className="mb-6">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Free</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black text-slate-900">$0</span>
                        </div>
                        <p className="text-slate-400 text-sm mt-2">Great for trying ideas and testing designs.</p>
                    </div>

                    {/* Credit explainer */}
                    <div className="bg-slate-50 rounded-xl p-4 mb-6 space-y-1.5 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Guest (no login)</span>
                            <span className="font-bold text-slate-700">2 credits</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Free account</span>
                            <span className="font-bold text-slate-700">5 credits total</span>
                        </div>
                        <div className="border-t border-slate-100 pt-1.5 mt-1.5 flex justify-between text-xs text-slate-400">
                            <span>1K output</span><span>1 credit</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>2K output</span><span>2 credits</span>
                        </div>
                    </div>

                    <Link
                        href="/#workspace"
                        className="block w-full text-center py-3.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors text-sm"
                    >
                        Try Free
                    </Link>
                </div>

                {/* Pro */}
                <div className="relative bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200">
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                            <Sparkles size={10} /> Most Popular
                        </span>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-2">Pro</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black">$15</span>
                            <span className="text-indigo-200 font-medium">/month</span>
                        </div>
                        <p className="text-indigo-200 text-sm mt-1">or $72/year <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full ml-1">Save 60%</span></p>
                        <p className="text-indigo-100 text-sm mt-2">For heavy users, tattoo artists and 3D makers.</p>
                    </div>

                    {/* Credit explainer */}
                    <div className="bg-white/10 rounded-xl p-4 mb-6 space-y-1.5 text-sm">
                        <div className="flex justify-between">
                            <span className="text-indigo-200">Credits per month</span>
                            <span className="font-bold text-white">666</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-indigo-200">Credits per year</span>
                            <span className="font-bold text-white">7,992</span>
                        </div>
                        <div className="border-t border-white/10 pt-1.5 mt-1.5 flex justify-between text-xs text-indigo-300">
                            <span>1K output</span><span>1 credit</span>
                        </div>
                        <div className="flex justify-between text-xs text-indigo-300">
                            <span>2K HD output</span><span>2 credits</span>
                        </div>
                    </div>

                    <Link
                        href="/ai-tattoo-generator"
                        className="block w-full text-center py-3.5 rounded-xl bg-white font-bold text-indigo-600 hover:bg-indigo-50 transition-colors text-sm shadow-lg"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Zap size={15} /> Start Pro — $15/month
                        </span>
                    </Link>
                    <p className="text-center text-indigo-300 text-xs mt-3">Cancel anytime · No hidden fees</p>
                </div>
            </div>

            {/* FEATURE COMPARISON TABLE */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-black text-slate-900 mb-6 text-center">Full comparison</h2>
                <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <div className="px-5 py-3">Feature</div>
                        <div className="px-5 py-3 text-center">Free</div>
                        <div className="px-5 py-3 text-center text-indigo-600">Pro</div>
                    </div>
                    {features.map((f, i) => (
                        <div key={f.label} className={`grid grid-cols-3 border-b border-slate-50 text-sm ${i === features.length - 1 ? "border-b-0" : ""}`}>
                            <div className="px-5 py-3.5 font-medium text-slate-700">{f.label}</div>
                            <div className="px-5 py-3.5 text-center">
                                {typeof f.free === "boolean" ? (
                                    f.free
                                        ? <Check size={16} className="text-green-500 mx-auto" />
                                        : <X size={16} className="text-slate-300 mx-auto" />
                                ) : (
                                    <span className="text-slate-500 text-xs">{f.free}</span>
                                )}
                            </div>
                            <div className="px-5 py-3.5 text-center">
                                {typeof f.pro === "boolean" ? (
                                    f.pro
                                        ? <Check size={16} className="text-indigo-500 mx-auto" />
                                        : <X size={16} className="text-slate-300 mx-auto" />
                                ) : (
                                    <span className="font-bold text-indigo-600 text-xs">{f.pro}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA bottom */}
                <div className="text-center mt-10">
                    <Link
                        href="/ai-tattoo-generator"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg"
                    >
                        <Sparkles size={15} /> Get Pro — $15/month
                    </Link>
                    <p className="text-slate-400 text-xs mt-3">or $72/year · Cancel anytime</p>
                </div>
            </div>
        </main>
    );
}
