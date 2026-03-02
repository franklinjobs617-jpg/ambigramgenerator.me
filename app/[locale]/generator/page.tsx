import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Generator2d from "@/components/Generator2d";
import { Sparkles, Pencil, HelpCircle } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/generator";

    // 定义多语言文案 (填充完整内容)
    const seo: Record<string, { title: string; description: string }> = {
        en: {
            title: "Free Ambigram Generator Online: Two-Name, Tattoo & Custom Designs",
            description: "Use the leading ambigram generator online free to create custom rotational and two word ambigrams. Download high-quality tattoo designs and explore calligraphy styles."
        },
        fr: {
            title: "Générateur d'Ambigramme en Ligne Gratuit : Tatouage et Designs Personnalisés",
            description: "Utilisez le meilleur générateur d'ambigrammes gratuit pour créer des designs rotationnels et à deux mots. Téléchargez des modèles de tatouage haute résolution."
        },
        de: {
            title: "Kostenloser Ambigramm Generator Online: Tattoo & Eigene Designs",
            description: "Nutzen Sie den führenden kostenlosen Ambigramm-Generator für rotationale Designs und Zwei-Wort-Kombinationen. Laden Sie hochwertige Tattoo-Vorlagen herunter."
        }
    };

    const current = seo[locale] || seo.en;

    return constructMetadata({
        title: current.title,
        description: current.description,
        path: path,
        locale: locale
    });
}

export default async function GeneratorPage({ params }: Props) {
    const { locale } = await params;

    // 🌟 JSON-LD 结构化数据
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "2D Ambigram Generator",
        "operatingSystem": "Web",
        "applicationCategory": "DesignApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Create custom rotational and two word ambigrams for tattoos and logos for free."
    };

    const FaqBox = ({ q, a }: { q: string, a: string }) => (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                <HelpCircle className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                {q}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed ml-8">{a}</p>
        </div>
    );

    // ========================================================================
    // 法语版本 (French)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                            <Sparkles size={14} /> Le meilleur créateur d&apos;ambigrammes
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900">Outil de Génération <br /><span className="text-indigo-600">Ambigramme 2D</span></h1>
                        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Le premier créateur d&apos;ambigrammes pour les designs rotationnels, réfléchis et à deux prénoms. Obtenez votre PNG ou SVG haute résolution gratuitement.</p>
                        <div className="pt-4">
                            <Link href="#generator-tool" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">Commencer le Design</Link>
                        </div>
                    </div>
                </section>

                <section id="generator-tool" className="py-12 scroll-mt-24 px-6">
                    <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-4 shadow-2xl border border-slate-100">
                        <Generator2d />
                    </div>
                </section>

                <section className="py-32 bg-slate-50 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-slate-900">Galerie d&apos;Inspiration</h2>
                            <p className="text-slate-500 mt-4">Découvrez les possibilités de notre créateur d&apos;ambigrammes 2D.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Noms de Couple", desc: "ex: Sarah / John", img: "/images/Two-name ambigram showing Sarah upright and John when rotated 180 degrees.webp" },
                                { title: "Mot Unique Significatif", desc: "ex: Trust", img: "/images/Tattoo-style TRUST ambigram with thick, smooth strokes suitable for permanent ink.webp" },
                                { title: "Concepts Opposés", desc: "ex: Vie / Mort", img: "/images/Animated GIF of ILLUSION rotating 180 degrees while maintaining readability.webp" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm hover:-translate-y-2 transition-all">
                                    <Image src={item.img} alt={item.title} width={400} height={300} className="rounded-[2rem] w-full h-auto mb-6" />
                                    <div className="px-4 pb-4 text-center">
                                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                        <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-white px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black text-center mb-16">Questions Fréquemment Posées</h2>
                        <div className="space-y-6">
                            <FaqBox q="Est-ce gratuit pour un usage commercial ?" a="Oui, tous les designs générés sont libres de droits pour un usage personnel et commercial. Nous n'appliquons aucun filigrane." />
                            <FaqBox q="Pourquoi mon résultat semble-t-il flou ?" a="Le flou provient souvent de l'aperçu basse résolution. Utilisez toujours le bouton de téléchargement PNG Haute Résolution pour obtenir le graphique net." />
                            <FaqBox q="Puis-je créer des logos avec cet outil ?" a="Absolument. Sélectionnez le style Moderne pour une sortie vectorielle nette, parfaite pour les marques." />
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 德语版本 (German)
    // ========================================================================
    if (locale === 'de') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900">Kostenloser <br /><span className="text-indigo-600">2D Ambigramm Generator</span></h1>
                        <p className="text-xl text-slate-500 font-medium">Erstellen Sie professionelle rotationale und Zwei-Namen-Ambigramme. Kostenlose Downloads in hoher Auflösung.</p>
                        <div className="pt-4">
                            <Link href="#generator-tool" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">Jetzt gestalten</Link>
                        </div>
                    </div>
                </section>
                <section id="generator-tool" className="py-12 px-6">
                    <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-4 shadow-2xl border border-slate-100 overflow-hidden">
                        <Generator2d />
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 英语版本 (Default / English)
    // ========================================================================
    return (
        <main className="bg-[#FDFDFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-xs font-bold text-indigo-600 uppercase tracking-widest shadow-sm">
                        <Sparkles size={14} /> The World&apos;s Best Ambigram Creator
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900">
                        2D Ambigram <br />
                        <span className="text-indigo-600 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Free Online Tool</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        The premier <strong>ambigram creator</strong> for rotational, reflective, and <strong>two-name ambigrams</strong>. Get your high-resolution PNG or SVG for free.
                    </p>
                    <div className="pt-4">
                        <Link href="#generator-tool" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1">
                            Start Designing Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Generator Component Area */}
            <section id="generator-tool" className="py-12 scroll-mt-24 px-6">
                <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-4 shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                    <Generator2d />
                </div>
            </section>

            {/* Inspiration Gallery */}
            <section className="py-32 bg-slate-50 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Inspiration Gallery</h2>
                        <p className="text-slate-500 font-medium text-lg">See what&apos;s possible with our 2D ambigram creator.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 group">
                            <Image src="/images/Two-name ambigram showing Sarah upright and John when rotated 180 degrees.webp" alt="Sarah/John" width={400} height={300} className="rounded-[2rem] w-full h-auto mb-6" />
                            <div className="px-4 pb-4 text-center">
                                <h3 className="text-xl font-bold mb-1">Couple&apos;s Names</h3>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Sarah / John</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 group">
                            <Image src="/images/Tattoo-style TRUST ambigram with thick, smooth strokes suitable for permanent ink.webp" alt="Trust" width={400} height={300} className="rounded-[2rem] w-full h-auto mb-6" />
                            <div className="px-4 pb-4 text-center">
                                <h3 className="text-xl font-bold mb-1">Meaningful Word</h3>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Trust</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 group">
                            <Image src="/images/Animated GIF of ILLUSION rotating 180 degrees while maintaining readability.webp" alt="Life/Death" width={400} height={300} className="rounded-[2rem] w-full h-auto mb-6" />
                            <div className="px-4 pb-4 text-center">
                                <h3 className="text-xl font-bold mb-1">Opposing Concepts</h3>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Life / Death</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guides Section */}
            <section className="py-32 bg-white px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Mastering the <br />Free Ambigram Creator</h2>
                            <p className="text-slate-600 leading-relaxed font-medium">Our algorithm is designed to find perfect symmetrical solutions. To achieve best results:</p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                                    <p className="text-sm text-slate-500"><strong className="text-slate-900 block mb-1">Balance Length:</strong> Try to use words of similar character counts for better visual center mapping.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                                    <p className="text-sm text-slate-500"><strong className="text-slate-900 block mb-1">Tattoo Optimized:</strong> Use calligraphy styles for thicker junctions, ideal for skin permanence.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-indigo-100/50 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                            <Image src="/images/Diagram illustrating letter-mapping in a two-name rotation.webp" alt="Mapping Diagram" width={600} height={400} className="relative rounded-[2.5rem] shadow-2xl border border-slate-100 w-full" />
                        </div>
                    </div>

                    <div className="mt-32">
                        <h2 className="text-3xl font-black text-center mb-16">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FaqBox q="Is it free for commercial use?" a="Yes! All designs are free for personal and commercial use (tattoos, logos, products). No watermarks." />
                            <FaqBox q="Why does my design look blurry?" a="Previews are low-res. Always use the Download High-Res PNG button for clean lines." />
                            <FaqBox q="Can I create logos?" a="Absolutely. Many users choose our Modern style for scalable, professional vector outputs." />
                            <FaqBox q="How to get a tattoo stencil?" a="Generate your design, download the High-Res PNG, and show it to your professional artist." />
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 bg-indigo-600 text-white text-center px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
                <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">Ready to Flip?</h2>
                    <p className="text-indigo-100 text-xl font-medium">Design your unique masterpiece in seconds. Fast, free, and stunning.</p>
                    <Link href="/free-generator" className="inline-flex items-center gap-3 bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-transform active:scale-95">
                        <Pencil size={24} /> Launch 3D Mode
                    </Link>
                </div>
            </section>
        </main>
    );
}