import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import Image from "next/image";
import {
    CheckCircle2,
    Type,
    Scale,
    Heart,
    Star,
    Zap,
    MousePointer2,
    MapPin,
    MessageSquare,
    Eye
} from "lucide-react";

// 辅助函数
const DOMAIN = "https://www.ambigramgenerator.me";
const getUrl = (locale: string, path: string) => {
    const langPath = locale === 'en' ? '' : `/${locale}`;
    return `${DOMAIN}${langPath}${path}`;
};

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/tattoo-design";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Ambigram Tattoo Design Guide & Ideas | AmbigramGenerator.me",
            description: "The definitive guide to ambigram tattoos. Learn to choose the best ambigram fonts, ideal placements, and get design ideas for a perfect, legible two-name ambigram tattoo."
        },
        fr: {
            title: "Guide de Design et Idées de Tatouage Ambigramme | AmbigramGenerator.me",
            description: "Le guide définitif des tatouages ambigrammes. Apprenez à choisir les meilleures polices, les emplacements idéaux et obtenez des idées pour un tatouage parfait et lisible."
        },
        de: {
            title: "Ambigramm Tattoo Design Guide & Ideen | AmbigramGenerator.me",
            description: "Der ultimative Leitfaden für Ambigramm-Tattoos. Lernen Sie, die besten Schriftarten und Platzierungen zu wählen, für ein perfektes, lesbares Tattoo."
        }
    };

    const current = seoData[locale] || seoData.en;

    return constructMetadata({
        title: current.title,
        description: current.description,
        path: path,
        locale: locale
    });
}

export default async function TattooDesignPage({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": locale === 'fr'
            ? "Le Guide Définitif du Design de Tatouage Ambigramme"
            : locale === 'de'
                ? "Der ultimative Leitfaden für Ambigramm-Tattoos"
                : "The Definitive Ambigram Tattoo Design Guide",
        "description": locale === 'fr'
            ? "Apprenez à concevoir des tatouages ambigrammes lisibles et durables."
            : "Master the art of permanent symmetry with our professional tattoo design guide.",
        "image": `${DOMAIN}/logo.png`,
        "author": { "@type": "Organization", "name": "AmbigramStudio" },
        "publisher": { "@type": "Organization", "name": "AmbigramStudio", "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` } }
    };

    // ========================================================================
    // 法语版本 (French)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                            Le Guide Définitif du Design de <span className="text-indigo-500">Tatouage Ambigramme</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                            Maîtrisez l&apos;art de la symétrie permanente. Utilisez les résultats de notre générateur et suivez ces conseils professionnels pour un tatouage impeccable.
                        </p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">1. Choisir les meilleures polices</h2>
                            <p>Contrairement aux designs numériques, les tatouages sont sujets à la diffusion de l&apos;encre et au vieillissement. Le facteur le plus critique pour un tatouage durable est le style de la police.</p>

                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="p-8 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-[2rem] shadow-sm">
                                    <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2 mb-3"><Type size={20} />Clarté et traits épais</h3>
                                    <p className="text-indigo-800/80 text-sm leading-relaxed font-medium">Évitez les polices ultra-fines. Des lignes épaisses et constantes réduisent le risque de diffusion de l&apos;encre avec le temps.</p>
                                </div>
                                <div className="p-8 bg-slate-50 border-l-4 border-slate-400 rounded-r-[2rem] shadow-sm">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-3"><Scale size={20} />Calligraphie vs Bloc</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed font-medium">Pour les ambigrammes à deux noms, une police de style &quot;bloc&quot; stylisée est souvent plus sûre et plus facile à exécuter avec précision.</p>
                                </div>
                            </div>

                            <Image src="/images/tattoo-font-selection-impact.png" alt="Comparaison de polices pour tatouage" width={800} height={500} className="rounded-[2rem] shadow-2xl border border-slate-100" />

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-20 mb-6 border-b border-slate-200 pb-4">2. Préparation et Emplacement</h2>
                            <p>Un tatouage à deux prénoms est profondément personnel. Suivez cette liste pour garantir des résultats optimaux.</p>

                            <div className="space-y-6 my-10 not-prose">
                                {[
                                    { icon: Scale, t: "La taille est cruciale", d: "Votre ambigramme doit être assez grand. S'il est trop petit, les connexions subtiles entre les lettres fusionneront." },
                                    { icon: MapPin, t: "Emplacement idéal", d: "Les zones plates et larges sont préférables : avant-bras, haut du dos ou poignet intérieur." },
                                    { icon: MessageSquare, t: "Consultez votre artiste", d: "Apportez toujours le fichier haute résolution de notre générateur pour créer un pochoir parfait." },
                                    { icon: Eye, t: "Testez le design", d: "Imprimez le design et fixez-le sur votre peau pour vérifier la lisibilité sous votre propre perspective." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5 items-start p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0"><item.icon size={24} /></div>
                                        <div><h4 className="font-bold text-slate-900">{item.t}</h4><p className="text-slate-500 text-sm mt-1">{item.d}</p></div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-3xl font-black text-center text-[#1A1A1B] mb-12">Idées de Tatouage Populaires</h2>
                            <div className="grid md:grid-cols-3 gap-6 not-prose">
                                {[
                                    { icon: Heart, iconCol: "text-rose-500", t: "Couples & Amour", list: ["Amour / Haine", "Foi / Confiance", "Maman / Papa"], img: "https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/early-ambigram-style-calligraphy.webp" },
                                    { icon: Star, iconCol: "text-amber-500", t: "Valeurs Personnelles", list: ["Vie / Mort", "Destin / Choix", "Saint / Pécheur"], img: "https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/4-step infographic for ambigram tattoo preparation.webp" },
                                    { icon: Zap, iconCol: "text-blue-500", t: "Inspiration", list: ["Rêve / Réalité", "Guerrier / Soigneur", "Croire / Réussir"], img: "https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/3-panel collage of ambigram tattoos.webp" }
                                ].map((card, i) => (
                                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-lg text-center flex flex-col">
                                        <card.icon className={`mx-auto mb-4 ${card.iconCol}`} size={32} />
                                        <h3 className="font-black text-slate-900 mb-4">{card.t}</h3>
                                        <ul className="text-slate-500 text-sm space-y-1 mb-6 flex-1">
                                            {card.list.map(l => <li key={l}>{l}</li>)}
                                        </ul>
                                        <Image src={card.img} alt={card.t} width={300} height={200} className="rounded-2xl w-full h-auto object-cover" />
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-24 p-12 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[3.5rem] shadow-2xl border border-slate-800 text-white not-prose">
                                <h3 className="text-3xl font-black mb-4 tracking-tight">Prêt à créer votre tatouage ?</h3>
                                <p className="text-slate-400 mb-10 font-medium">Utilisez notre générateur gratuit pour obtenir un fichier haute résolution prêt pour votre tatoueur.</p>
                                <Link href="/" className="inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-900/40">
                                    Lancer le Générateur
                                </Link>
                            </div>
                        </article>
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
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                            Der ultimative <span className="text-indigo-500">Ambigramm Tattoo</span> Design Guide
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">Meistern Sie die Kunst der permanenten Symmetrie. Nutzen Sie unseren Generator und folgen Sie diesen Tipps für ein perfektes Tattoo.</p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">1. Die besten Schriftarten wählen</h2>
                            <p>Im Gegensatz zu digitalen Designs unterliegen Tattoos der Alterung und dem &quot;Verlaufen&quot; der Tinte. Der wichtigste Faktor für ein langlebiges Ambigramm-Tattoo ist der Schriftstil.</p>

                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="p-8 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-[2rem] shadow-sm font-medium">
                                    <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2 mb-3"><Type size={20} />Klarheit und dicke Linien</h3>
                                    <p className="text-indigo-800/80 text-sm leading-relaxed">Vermeiden Sie extrem dünne Schriften. Dicke Linien reduzieren das Risiko, dass die Tinte mit der Zeit verläuft.</p>
                                </div>
                                <div className="p-8 bg-slate-50 border-l-4 border-slate-400 rounded-r-[2rem] shadow-sm font-medium">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-3"><Scale size={20} />Kalligraphie vs. Block</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">Für Ambigramme mit zwei Namen ist ein stilisierter Block-Stil oft sicherer und präziser umsetzbar.</p>
                                </div>
                            </div>

                            <Image src="/images/tattoo-font-selection-impact.png" alt="Schriftartenvergleich Tattoos" width={800} height={500} className="rounded-[2rem] shadow-xl border border-slate-200" />

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-20 mb-6 border-b border-slate-200 pb-4">2. Vorbereitung & Platzierung</h2>
                            <ul className="space-y-4 not-prose mb-10">
                                {[
                                    { t: "Größe ist entscheidend", d: "Ihr Ambigramm muss groß genug sein, damit die Verbindungen zwischen den Buchstaben nicht verschwimmen." },
                                    { t: "Ideale Platzierung", d: "Flache, große Areale sind am besten: Unterarm, oberer Rücken oder das innere Handgelenk." },
                                    { t: "Künstler-Beratung", d: "Bringen Sie die hochauflösende Datei unseres Generators immer mit zu Ihrem Tätowierer." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                        <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" />
                                        <div><span className="font-bold text-slate-900 block">{item.t}</span><span className="text-slate-500 text-sm">{item.d}</span></div>
                                    </li>
                                ))}
                            </ul>

                            <div className="text-center mt-20 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[3rem] shadow-2xl text-white not-prose border border-slate-800">
                                <h3 className="text-3xl font-black mb-6">Bereit für Ihr Meisterwerk?</h3>
                                <Link href="/" className="inline-block bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg">
                                    Tattoo Generator starten
                                </Link>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 英语版本 (Default / English Version)
    // ========================================================================
    return (
        <main className="bg-[#FDFDFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Header Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                        The Definitive <span className="text-indigo-500">Ambigram Tattoo</span> Design Guide
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Master the art of permanent symmetry. Use our generator output and follow these professional tips for a flawless tattoo design.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4 tracking-tight">1. Choosing the Best Fonts for Tattoos</h2>
                        <p className="leading-relaxed mb-6">
                            Unlike digital designs, tattoos are susceptible to ink &quot;bleeding&quot; and aging. The most critical
                            factor for a lasting <strong>Ambigram tattoo</strong> is the font style. We recommend designs
                            that minimize fine lines and maximize stroke thickness to ensure legibility for decades.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                            <div className="p-8 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-[2.5rem] shadow-sm transition-all hover:shadow-md">
                                <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-3 mb-4">
                                    <Type size={24} className="text-indigo-600" />
                                    Clarity and Thicker Strokes
                                </h3>
                                <p className="text-indigo-800/80 text-sm leading-relaxed font-medium">Avoid ultra-thin fonts. Thick, consistent lines reduce the risk of ink diffusion (blowout) over time, ensuring your design remains legible.</p>
                            </div>
                            <div className="p-8 bg-slate-50 border-l-4 border-slate-400 rounded-r-[2.5rem] shadow-sm transition-all hover:shadow-md">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-4">
                                    <Scale size={24} className="text-slate-600" />
                                    Calligraphy vs. Block
                                </h3>
                                <p className="text-slate-600/80 text-sm leading-relaxed font-medium">For long words or <strong>two-name ambigrams</strong>, a stylized block font is often safer and easier for the artist to execute with precision.</p>
                            </div>
                        </div>

                        <figure className="my-12 text-center">
                            <Image
                                src="/images/tattoo-font-selection-impact.png"
                                alt="Side-by-side comparison of thick-stroke ambigram vs thin strokes"
                                width={800} height={500} unoptimized
                                className="w-full h-auto rounded-[2.5rem] shadow-2xl border border-slate-100"
                            />
                            <figcaption className="text-sm text-slate-400 mt-4 font-medium italic">Comparison showing clarity and ink bleeding effects over time.</figcaption>
                        </figure>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-20 mb-6 border-b border-slate-200 pb-4 tracking-tight">2. Preparation & Placement</h2>
                        <p className="leading-relaxed mb-6">A <strong>Two-Name Ambigram</strong> tattoo is deeply personal. The process requires extra care to ensure both words read clearly. Follow this checklist for best results.</p>

                        <div className="space-y-4 my-10 not-prose">
                            {[
                                { icon: Scale, t: "Sizing is Key", d: "Your ambigram must be large enough. If it's too small, the subtle connections will merge over time." },
                                { icon: MapPin, t: "Ideal Placement", d: "Flat areas are best: outer forearm, upper back, or inner wrist are highly recommended." },
                                { icon: MessageSquare, t: "Consult Your Artist", d: "Bring high-resolution files to your artist to ensure the stencil matches the design perfectly." },
                                { icon: Eye, t: "Test the Design", d: "Print and tape it onto your skin to verify both words read correctly from your perspective." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-sm"><item.icon size={28} /></div>
                                    <div>
                                        <h4 className="text-lg font-black text-slate-900 tracking-tight">{item.t}</h4>
                                        <p className="text-slate-500 text-sm mt-1 leading-relaxed font-medium">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-24 not-prose">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-12 text-center tracking-tight">Popular Ambigram Tattoo Ideas</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { icon: Heart, col: "text-rose-500", t: "Couples & Love", l: ["Love / Hate", "Faith / Trust", "Mom / Dad"], img: "https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/early-ambigram-style-calligraphy.webp" },
                                    { icon: Star, col: "text-amber-500", t: "Personal Values", l: ["Life / Death", "Destiny / Choice", "Sinner / Saint"], img: "/images/4-step infographic for ambigram tattoo preparation.webp" },
                                    { icon: Zap, col: "text-blue-500", t: "Inspirational", l: ["Believe / Achieve", "Warrior / Healer", "Dream / Reality"], img: "/images/3-panel collage of ambigram tattoos.webp" }
                                ].map((card, i) => (
                                    <div key={i} className="bg-white p-6 rounded-[3rem] border border-slate-100 shadow-lg text-center group hover:-translate-y-2 transition-all duration-500">
                                        <card.icon className={`mx-auto mb-4 ${card.col} transition-transform group-hover:scale-110`} size={32} />
                                        <h3 className="font-black text-slate-900 mb-4 tracking-tight">{card.t}</h3>
                                        <ul className="text-slate-500 text-xs font-bold space-y-1 mb-8 opacity-70">
                                            {card.l.map(item => <li key={item}>{item}</li>)}
                                        </ul>
                                        <div className="overflow-hidden rounded-[2rem]">
                                            <Image src={card.img} alt={card.t} width={300} height={200} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center mt-32 p-12 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[4rem] shadow-2xl border border-slate-800 text-white not-prose relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-10" />
                            <h3 className="text-4xl font-black mb-6 tracking-tight">Ready to Create Your Masterpiece?</h3>
                            <p className="text-slate-400 mb-12 font-medium max-w-xl mx-auto text-lg leading-relaxed text-indigo-100/60">
                                Design your unique two-name ambigram in seconds. High-resolution files optimized for your tattoo artist.
                            </p>
                            <Link href="/" className="inline-flex items-center gap-3 bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-900/40 active:scale-95">
                                <Zap className="fill-current" size={20} />
                                Launch Tattoo Generator
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}