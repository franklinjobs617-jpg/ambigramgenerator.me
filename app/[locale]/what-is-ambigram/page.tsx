import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    RotateCw,
    FlipHorizontal,
    Box,
    Info,
    Sparkles,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import { constructMetadata } from "@/lib/seo";

const DOMAIN = "https://www.ambigramgenerator.me";
type Props = {
    params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/what-is-ambigram";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "What is an Ambigram? 2026 Guide + 50 Unique Tattoo Designs",
            description: "Learn what an ambigram is, explore rotational and reflective styles, and try a free no-sign-up ambigram tattoo generator with practical examples."
        },
        fr: {
            title: "Qu'est-ce qu'un ambigramme ? Définition, types et exemples",
            description: "Guide détaillé sur ce qu'est un ambigramme. Apprenez la définition, explorez les types clés comme les ambigrammes rotationnels, réfléchis et découvrez leur histoire."
        },
        de: {
            title: "Was ist ein Ambigramm? Definition, Typen und Beispiele",
            description: "Ausführlicher Leitfaden darüber, was ein Ambigramm ist. Lernen Sie die Definition, entdecken Sie Typen wie rotationale Ambigramme und ihre faszinierende Geschichte."
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
export default async function WhatIsAmbigramPage({ params }: Props) {
    const { locale } = await params;
    const localizedPath = (path: string) => (locale === "en" ? path : `/${locale}${path}`);

    // JSON-LD (Article Schema)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": locale === 'fr' ? "Qu'est-ce qu'un ambigramme ?" : locale === 'de' ? "Was ist ein Ambigramm?" : "What is an Ambigram?",
        "description": "A comprehensive guide about ambigram definitions, types, and history.",
        "image": `${DOMAIN}/logo.png`,
        "author": { "@type": "Organization", "name": "AmbigramStudio" },
        "publisher": {
            "@type": "Organization",
            "name": "AmbigramStudio",
            "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` }
        },
        "datePublished": "2024-01-01"
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
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">Qu&apos;est-ce qu&apos;un Ambigramme ?</h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">Découvrez l&apos;art des mots qui révèlent des significations cachées lorsqu&apos;ils sont tournés ou reflétés.</p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">La Définition de l&apos;Ambigramme : La Symétrie en Typographie</h2>
                            <p>Un <strong>Ambigramme</strong> est une figure graphique qui peut être lue comme un ou plusieurs mots non seulement dans son orientation principale, mais aussi lorsqu&apos;elle est tournée ou reflétée. Essentiellement, c&apos;est un mot ou une phrase conçu pour posséder une forme spécifique de symétrie visuelle, mêlant art et logique.</p>

                            <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 my-10">
                                <p className="text-indigo-900 font-bold m-0 leading-relaxed italic">Le terme &quot;Ambigramme&quot; vient du préfixe latin <strong>ambi-</strong> (signifiant &quot;les deux&quot;) et <strong>-gramme</strong> (signifiant &quot;lettre&quot;).</p>
                            </div>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-6">Bref Historique et Impact Culturel</h3>
                            <p>Bien que des exemples de calligraphie symétrique remontent à des siècles, le terme a été popularisé par Douglas Hofstadter en 1979. Plus tard, le roman de Dan Brown <em>Anges et Démons</em> a cimenté la place de l&apos;ambigramme dans la culture populaire.</p>

                            <figure className="my-12 text-center">
                                <Image src="/images/180-rotational-ambigram-example.webp" alt="Exemple ambigramme rotation" width={600} height={400} className="rounded-[2.5rem] shadow-2xl border border-slate-200 mx-auto h-auto" />
                                <figcaption className="text-sm text-slate-400 mt-4 italic font-medium">Un exemple classique d&apos;ambigramme rotationnel à 180°.</figcaption>
                            </figure>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-20 mb-8 border-b border-slate-200 pb-4">Les Principaux Types d&apos;Ambigrammes</h2>
                            <div className="space-y-6 not-prose">
                                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3"><RotateCw className="text-indigo-600" /> Ambigrammes Rotationnels (180°)</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">C&apos;est le type le plus reconnu, où le mot se lit de la même manière (ou un mot différent) après une rotation de 180 degrés.</p>
                                </div>
                                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3"><FlipHorizontal className="text-indigo-600" /> Ambigrammes Réfléchis (Miroir)</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">Le mot reste lisible lorsqu&apos;il est vu à travers un miroir ou retourné horizontalement. Souvent utilisé dans les logos sur des surfaces réfléchissantes.</p>
                                </div>
                                <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-[60px]" />
                                    <h3 className="text-2xl font-black mb-4 flex items-center gap-3"><Box className="text-indigo-400" /> Ambigrammes 3D (Imprimables)</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed">Une variation technique moderne. Un objet physique conçu pour lire un mot d&apos;un côté et un autre du côté opposé.</p>
                                    <Link href={localizedPath("/3d-generator")} className="inline-flex items-center gap-2 text-indigo-400 font-bold mt-4 hover:text-white transition-colors">Explorer la technologie 3D <ArrowRight size={16} /></Link>
                                </div>
                            </div>

                            <div className="text-center mt-24 p-12 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[4rem] shadow-2xl border border-slate-800 text-white not-prose">
                                <h3 className="text-4xl font-black mb-6 tracking-tight italic">Prêt à créer le vôtre ?</h3>
                                <p className="text-slate-400 mb-10 font-medium text-lg">Utilisez notre créateur pour appliquer ces principes instantanément. C&apos;est gratuit et facile !</p>
                                <Link href={localizedPath("/generator")} className="inline-flex items-center gap-3 bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl active:scale-95">
                                    <Sparkles size={20} /> Lancer le Générateur
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
    // ========================================================================
    // 德语版本 (German Version) - 100% 完整且专业翻译
    // ========================================================================
    if (locale === 'de') {
        return (
            <main className="bg-[#FDFDFF]">
                {/* 注入 JSON-LD 结构化数据 */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                {/* Header Section */}
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center px-6 overflow-hidden">
                    <div className="container mx-auto text-center max-w-5xl space-y-8">
                        <div className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            Was ist ein <span className="text-indigo-500">Ambigramm?</span>
                        </div>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                            Entdecken Sie die Kunst der Wörter, die beim Drehen oder Spiegeln verborgene Bedeutungen offenbaren. Wir erklären Ihnen die <strong>Ambigramm-Definition</strong>, die verschiedenen Typen und die Geschichte.
                        </p>
                    </div>
                </section>

                <section id="definition" className="py-20 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4 tracking-tight">
                                Die Ambigramm-Definition: Symmetrie in der Typografie
                            </h2>

                            <p className="leading-relaxed mb-6">
                                Ein <strong>Ambigramm</strong> ist eine grafische Figur, die nicht nur in ihrer primären Ausrichtung, sondern auch gedreht oder gespiegelt als ein oder mehrere Wörter gelesen werden kann. Im Wesentlichen ist es ein Wort oder eine Phrase, die so gestaltet wurde, dass sie eine spezifische Form von visueller Symmetrie besitzt und dabei Kunstfertigkeit mit Logik verbindet.
                            </p>

                            {/* Info Box */}
                            <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-8 my-10 shadow-sm">
                                <p className="text-indigo-900 font-bold m-0 leading-relaxed italic text-lg flex items-center gap-3">
                                    <Info className="text-indigo-600" />
                                    Der Begriff &quot;Ambigramm&quot; leitet sich von der lateinischen Vorsilbe <strong>ambi-</strong> (beide) und der Endung <strong>-gramm</strong> (geschriebenes Zeichen/Buchstabe) ab.
                                </p>
                            </div>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4 tracking-tight">Kurze Geschichte und kultureller Einfluss</h3>
                            <p className="leading-relaxed mb-10">
                                Während Beispiele für symmetrische Kalligrafie Jahrhunderte zurückreichen, wurde der Begriff <strong>&quot;Ambigramm&quot;</strong> erst 1979 vom amerikanischen Wissenschaftler Douglas Hofstadter popularisiert. Später festigte Dan Browns Roman <em>Illuminati</em> (Angels &amp; Demons), in dem Ambigramme eine zentrale Rolle spielen, den Platz dieses Designs in der Popkultur.
                            </p>

                            <figure className="my-12 text-center">
                                <Image
                                    src="/images/180-rotational-ambigram-example.webp"
                                    alt="Beispiel für ein um 180 Grad drehbares Ambigramm"
                                    width={800} height={400}
                                    className="w-full max-w-2xl mx-auto h-auto rounded-[2.5rem] shadow-2xl border border-slate-200"
                                />
                                <figcaption className="text-sm text-slate-400 mt-4 font-medium italic">Ein klassisches Beispiel für ein um 180&deg; <strong>drehbares Ambigramm</strong>.</figcaption>
                            </figure>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-20 mb-10 border-b border-slate-200 pb-4 tracking-tight">Die wichtigsten Arten von Ambigrammen</h2>

                            <div className="space-y-8 not-prose">
                                {/* Type 1 */}
                                <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600"><RotateCw size={24} /></div>
                                        Rotations-Ambigramme (180&deg;)
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        Dies ist der bekannteste Typ, bei dem das Wort nach einer Drehung um <strong>180 Grad</strong> das gleiche (oder ein anderes) Wort ergibt. Zu dieser Kategorie gehört auch das <strong>Zwei-Namen-Ambigramm</strong>, bei dem Name A aufrecht und Name B auf dem Kopf stehend gelesen wird.
                                    </p>
                                </div>

                                {/* Type 2 */}
                                <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600"><FlipHorizontal size={24} /></div>
                                        Spiegel-Ambigramme (Reflective)
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-6">
                                        Das Wort bleibt lesbar, wenn es im Spiegel betrachtet oder horizontal/vertikal geklappt wird. Dies wird oft für Logos auf reflektierenden Oberflächen verwendet, um die Kontinuität zu wahren.
                                    </p>
                                    <div className="overflow-hidden rounded-[2rem]">
                                        <Image src="/images/reflective-ambigram-echo.webp" alt="Spiegel-Ambigramm Beispiel" width={600} height={300} className="w-full h-auto object-cover" />
                                    </div>
                                </div>

                                {/* Type 3 */}
                                <div className="p-10 bg-[#0F172A] text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-10 group-hover:bg-indigo-600/20 transition-colors duration-700" />
                                    <h3 className="text-2xl font-black mb-4 flex items-center gap-4 text-white">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400"><Box size={24} /></div>
                                        3D-Ambigramme (STL-Druckbar)
                                    </h3>
                                    <p className="text-slate-400 font-medium leading-relaxed mb-6">
                                        Eine hochtechnische Variante. Ein <strong>3D-Ambigramm</strong> ist ein physisches Objekt, das so konstruiert ist, dass es von vorne ein Wort und aus der 180-Grad-Gegenperspektive ein anderes Wort darstellt.
                                    </p>
                                    <Link href={localizedPath("/3d-generator")} className="inline-flex items-center gap-2 text-indigo-400 font-bold mt-4 hover:text-white transition-colors group">
                                        3D-Technologie entdecken <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Final CTA Box */}
                            <div className="text-center mt-32 p-12 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[4rem] shadow-2xl border border-slate-800 text-white not-prose relative overflow-hidden">
                                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/10 blur-[100px] pointer-events-none" />
                                <h3 className="text-4xl font-black mb-6 tracking-tight">Bereit für dein eigenes Design?</h3>
                                <p className="text-slate-400 mb-12 font-medium max-w-xl mx-auto text-lg leading-relaxed text-indigo-50/60">
                                    Nutzen Sie den weltweit vielseitigsten Ambigramm-Generator, um diese Prinzipien sofort anzuwenden. Es ist kostenlos, schnell und professionell.
                                </p>
                                <Link href={localizedPath("/generator")} className="inline-flex items-center gap-3 bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-900/40 active:scale-95">
                                    <Sparkles className="fill-current" size={20} />
                                    Kostenlosen Generator starten
                                </Link>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 英语版本及 Fallback (Default / English)
    // ========================================================================
    return (
        <main className="bg-[#FDFDFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">What is an Ambigram?</h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Discover the art of words that reveal hidden meanings when rotated or reflected. We break down the <strong>ambigram definition</strong>, types, and history.
                    </p>
                </div>
            </section>

            <section className="pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4 tracking-tight">The Ambigram Definition: Symmetry in Typography</h2>
                        <p className="leading-relaxed mb-6">
                            An <strong>Ambigram</strong> is a graphical figure that can be read as one or more words not only in its primary orientation but also when rotated or reflected. Essentially, it is a word or phrase crafted to possess a specific form of visual symmetry, blending artistry with logic.
                        </p>

                        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-8 my-10 shadow-sm">
                            <p className="text-lg italic">
                                <Info className="text-indigo-600" />
                                The term &quot;Ambigram&quot; itself comes from the Latin prefix <strong>ambi-</strong> (meaning &quot;both&quot;) and <strong>-gram</strong> (meaning &quot;letter&quot;).
                            </p>
                        </div>

                        <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4 tracking-tight">Brief History and Cultural Impact</h3>
                        <p className="leading-relaxed mb-10">
                            While examples of symmetrical calligraphy date back centuries, the term <strong>&quot;Ambigram&quot;</strong> was popularized by Douglas Hofstadter in his 1979 book, <em>G&ouml;del, Escher, Bach</em>. Later, Dan Brown&apos;s novel <em>Angels &amp; Demons</em> brought this curiosity into the mainstream.
                        </p>

                        <figure className="my-12 text-center">
                            <Image
                                src="/images/180-rotational-ambigram-example.webp"
                                alt="180 degree rotational ambigram example"
                                width={800} height={400}
                                className="w-full max-w-2xl mx-auto h-auto rounded-[2.5rem] shadow-2xl border border-slate-200"
                            />
                            <figcaption className="text-sm text-slate-400 mt-4 font-medium italic">A classic 180&deg; <strong>Rotational Ambigram</strong> example.</figcaption>
                        </figure>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-20 mb-10 border-b border-slate-200 pb-4 tracking-tight">Understanding the Key Types of Ambigrams</h2>

                        <div className="space-y-8 not-prose">
                            <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
                                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600"><RotateCw size={24} /></div>
                                    Rotational Ambigrams (180&deg;)
                                </h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    This is the most recognized type, where the word reads the same after being rotated 180 degrees. This category also includes the <strong>Two-Name Ambigram</strong>, where Word A is read right-side-up, and Word B is read upside-down.
                                </p>
                            </div>

                            <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500">
                                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600"><FlipHorizontal size={24} /></div>
                                    Reflective Ambigrams (Mirror)
                                </h3>
                                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                                    The word remains legible when viewed through a mirror. This is often used in professional logos involving reflective surfaces to maintain continuity.
                                </p>
                                <div className="overflow-hidden rounded-[2rem]">
                                    <Image src="/images/reflective-ambigram-echo.webp" alt="Reflective Ambigram" width={600} height={300} className="w-full h-auto object-cover" />
                                </div>
                            </div>

                            <div className="p-10 bg-[#0F172A] text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-10 group-hover:bg-indigo-600/20 transition-colors duration-700" />
                                <h3 className="text-2xl font-black mb-4 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400"><Box size={24} /></div>
                                    3D Ambigrams (STL Printable)
                                </h3>
                                <p className="text-slate-400 font-medium leading-relaxed mb-6">
                                    A highly technical physical object designed to read one word from the front and a different word from the 180-degree opposite view.
                                </p>
                                <Link href={localizedPath("/3d-generator")} className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-white transition-colors mb-6 group">
                                    Explore 3D Ambigram Technology <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <div className="overflow-hidden rounded-[2rem] border border-white/5 shadow-inner shadow-black">
                                    <Image src="/images/3d-ambigram-physical-object.webp" alt="3D Ambigram" width={600} height={300} className="w-full h-auto opacity-80" />
                                </div>
                            </div>
                        </div>

                        {/* Final CTA */}
                        <div className="text-center mt-32 p-12 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[4rem] shadow-2xl border border-slate-800 text-white not-prose relative overflow-hidden">
                            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/10 blur-[100px] pointer-events-none" />
                            <h3 className="text-4xl font-black mb-6 tracking-tight">Ready to Create Your Own?</h3>
                            <p className="text-slate-400 mb-12 font-medium max-w-xl mx-auto text-lg leading-relaxed">
                                Use the world&apos;s most versatile ambigram creator to apply these principles instantly. It&apos;s free, fast, and professional.
                            </p>
                            <Link href="/generator" className="inline-flex items-center gap-3 bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-900/40 active:scale-95">
                                <Sparkles className="fill-current" size={20} />
                                Launch Free Generator
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}
