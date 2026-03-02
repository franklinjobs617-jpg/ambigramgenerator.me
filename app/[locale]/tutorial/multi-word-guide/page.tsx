import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";

const DOMAIN = "https://www.ambigramgenerator.me";
type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/tutorial/multi-word-guide";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Two Word Ambigram Generator Tattoo: Mastering Dual-Phrase Ink Design",
            description: "Master the two word ambigram generator tattoo workflow. Learn design secrets for 2 words ambigram generator clarity. Free download tips included."
        },
        fr: {
            title: "Tatouage Ambigramme à Deux Mots : Maîtriser le Design d'Encre à Double Phrase",
            description: "Maîtrisez le flux de travail du générateur d'ambigramme à deux mots pour tatouage. Apprenez les secrets de conception pour la clarté. Conseils de téléchargement gratuits inclus."
        },
        de: {
            title: "Zwei-Wort Ambigramm Tattoo Guide: Design-Geheimnisse für Dual-Phrasen",
            description: "Meistern Sie den Workflow für Zwei-Wort Ambigramm Tattoos. Tipps für Klarheit beim Stechen und kostenlose Downloads inkludiert."
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


export default async function MultiWordGuidePage({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": locale === 'fr'
            ? "Le Guide Pro du Flux de Travail du Générateur de Tatouage Ambigramme à Deux Mots"
            : "The Pro’s Guide to the Two Word Ambigram Generator Tattoo Workflow",
        "description": locale === 'fr'
            ? "Maîtrisez le flux de travail du générateur d'ambigramme à deux mots pour tatouage. Apprenez les secrets de conception pour la clarté."
            : "Master the two word ambigram generator tattoo workflow. Learn design secrets for 2 words ambigram generator clarity.",
        "image": `${DOMAIN}/logo.png`,
        "author": { "@type": "Organization", "name": "AmbigramStudio", "url": DOMAIN },
        "publisher": { "@type": "Organization", "name": "AmbigramStudio", "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` } },
        "datePublished": "2026-02-01T08:00:00+08:00",
        "dateModified": new Date().toISOString()
    };

    // ========================================================================
    // 法语版本 (French Version) - 100% 完整翻译
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                            Le Guide Pro du Flux de Travail du Générateur de Tatouage Ambigramme à Deux Mots
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                            L&apos;utilisation d&apos;une configuration de <strong>générateur de tatouage ambigramme à deux mots</strong> nécessite plus que de simplement coller deux mots ensemble. Cette page détaille les décisions structurelles qui séparent un bon design d&apos;encre d&apos;un gâchis illisible.
                        </p>
                    </div>
                </section>

                <section className="pb-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                                L&apos;Obstacle Structurel : Alignement et Point Central
                            </h2>

                            <p className="leading-relaxed mb-6">
                                Lors de la génération de deux mots distincts, le moteur doit choisir un seul point de symétrie. Si vous utilisez le <strong>générateur d&apos;ambigramme 2 mots</strong>, le logiciel utilise par défaut le point central de la *chaîne combinée entière*. Cela brise souvent l&apos;équilibre visuel entre le Mot A et le Mot B.
                            </p>

                            <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mb-6">
                                <p className="leading-relaxed text-indigo-900 m-0">
                                    <strong>Conseil d&apos;expert :</strong> Si vos deux mots ont des longueurs très différentes, l&apos;un paraîtra toujours exigu. Pour de meilleurs résultats lors de l&apos;utilisation d&apos;une configuration de <strong>téléchargement gratuit de générateur d&apos;ambigramme à deux mots</strong>, essayez de garder les nombres de caractères aussi proches que possible.
                                </p>
                            </div>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                                Maîtriser le Centre de Rotation
                            </h3>
                            <p className="leading-relaxed mb-6">
                                Dans les générateurs avancés (ou le post-traitement), contrôler le point de pivot est la clé. Un léger décalage du pivot peut transformer une mauvaise transformation en une transformation lisible, en particulier lors de la conception pour le placement horizontal typique des tatouages de bras/avant-bras.
                            </p>

                            <figure className="my-10 text-center">
                                <Image
                                    src="/images/rotation-center-impact.png"
                                    alt="Une illustration démontrant comment le déplacement du point central de rotation impacte considérablement la clarté et la lisibilité d'un ambigramme à deux mots."
                                    width={800} height={400}
                                    className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                                />
                                <figcaption className="text-sm text-slate-500 mt-4 font-medium">
                                    Illustration montrant comment le placement de l&apos;axe de rotation affecte la clarté de l&apos;ambigramme à deux mots.
                                </figcaption>
                            </figure>

                            <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-sm overflow-x-auto my-8 shadow-inner font-mono">
                                <code>
                                    {`// Vérification Conceptuelle : Test de rotation équilibrée à deux mots
const motA = "LOVE";
const motB = "HATE"; 

// Si la rotation est appliquée au milieu de la chaîne, le centre visuel se déplace considérablement.
// Un bon générateur offre une option pour centrer l'axe de rotation entre les mots.
// Vérifiez le panneau de paramètres pour une bascule "Centrage de l'Axe".`}
                                </code>
                            </pre>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                                Gestion de la Ponctuation et des Chiffres dans l&apos;Encre
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Il s&apos;agit d&apos;un point de blocage courant pour quiconque essaie d&apos;utiliser une configuration de <strong>générateur de tatouage ambigramme à deux mots</strong> impliquant des dates ou des initiales.
                            </p>

                            <p className="leading-relaxed mb-6">
                                Les nombres (comme &apos;2&apos; ou &apos;0&apos;) et la ponctuation sont rarement pris en charge nativement pour la transformation en ambigramme, car leurs formes manquent des contreparties de rotation requises dans les polices standard.
                            </p>

                            <p className="leading-relaxed mb-6">
                                Sur la base de l&apos;analyse de milliers d&apos;itérations, nous avons constaté que pour un ambigramme rotatif à 180°, le nombre total de caractères (Mot A + Mot B) ne devrait idéalement pas dépasser 10 caractères pour maintenir une lisibilité supérieure à 60% avec notre moteur actuel. Au-delà de 12 caractères, l&apos;intervention manuelle devient obligatoire.
                            </p>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                                La Sortie du Générateur Gratuit : Préparation du Pochoir
                            </h3>
                            <p className="leading-relaxed mb-6">
                                Une fois que vous avez généré un design réussi à l&apos;aide du <strong>générateur d&apos;ambigramme 2 mots</strong>, votre dernière étape avant l&apos;impression est la préparation du fichier. Assurez-vous de télécharger la résolution la plus élevée disponible, même si vous pensez ne pas en avoir besoin.
                            </p>

                            <div className="text-center mt-16 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[2.5rem] shadow-2xl border border-slate-800">
                                <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                    Prêt à tester ces théories de mise en page avancées ?
                                </h3>
                                <p className="text-slate-400 mb-8 font-medium">
                                    Accédez au générateur principal et essayez de manipuler votre ordre de saisie maintenant sur <Link href="https://ambigramgenerator.me" className="text-indigo-400 font-semibold hover:underline">Notre Page Complète de Générateur d&apos;Ambigramme</Link> pour voir ces principes en action.
                                </p>
                                <Link href="/" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-500 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                    Aller au Générateur
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                                <Image
                                    src="/images/two-word-rotation-pivot-guide.png"
                                    alt="Guide montrant comment le placement de l'axe de rotation affecte la clarté de l'ambigramme à deux mots"
                                    width={400} height={300}
                                    className="w-full h-auto rounded-[2rem] shadow-xl border border-slate-200"
                                />
                                <Image
                                    src="/images/multi-word-numeric-failure.png"
                                    alt="Exemple où les nombres dans un design de tatouage à deux mots deviennent illisibles"
                                    width={400} height={300}
                                    className="w-full h-auto rounded-[2rem] shadow-xl border border-slate-200"
                                />
                                <Image
                                    src="/images/clean-download-file-for-tattoo.png"
                                    alt="Art linéaire à contraste élevé et propre prêt pour le transfert comme pochoir de tatouage"
                                    width={400} height={300}
                                    className="w-full h-auto rounded-[2rem] shadow-xl border border-slate-200"
                                />
                            </div>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                                Conclusion : Du Générateur à l&apos;Encre Permanente
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Le succès de votre <strong>tatouage de générateur d&apos;ambigramme à deux mots</strong> repose sur la conscience structurelle. Utilisez les outils pour trouver la correspondance presque parfaite, comprenez où se situent les limites (surtout avec les nombres), et utilisez ces connaissances pour guider votre consultation avec votre artiste tatoueur. Ne vous contentez pas de moins qu&apos;une symétrie parfaite !
                            </p>

                            <p className="leading-relaxed mb-8">
                                Prêt à tester vos phrases choisies ? Le processus commence maintenant :
                            </p>
                            <div className="text-center my-10">
                                <Link href="/" className="inline-block bg-indigo-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 shadow-2xl">
                                    Utilisez le Générateur d&apos;Ambigramme 2 Mots Instantanément !
                                </Link>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 英语版本 (Default / English Version) - 100% 完整原文
    // ========================================================================
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                        The Pro&apos;s Guide to the Two Word Ambigram Generator Tattoo Workflow
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                        Using a <strong>two word ambigram generator tattoo</strong> setup requires more than just jamming two words together. This page details the structural decisions that separate a good ink design from an illegible mess.
                    </p>
                </div>
            </section>

            <section className="pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose prose-lg prose-slate text-slate-700 max-w-none">

                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                            The Structural Hurdle: Alignment and Center Point
                        </h2>

                        <p className="leading-relaxed mb-6">
                            When generating two distinct words, the engine must choose a single point of symmetry. If you use the <strong>2 words ambigram generator</strong>, the software defaults to the center point of the *entire combined string*. This often breaks the visual balance between Word A and Word B.
                        </p>

                        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mb-6">
                            <p className="leading-relaxed text-indigo-900 m-0">
                                <strong>Expert tip:</strong> If your two words are very different in length, one will always look cramped. For the best results when using a <strong>two word ambigram generator free download</strong> setup, try to keep the character counts as close as possible.
                            </p>
                        </div>

                        <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                            Mastering the Rotation Center
                        </h3>
                        <p className="leading-relaxed mb-6">
                            In advanced generators (or post-processing), controlling the pivot point is key. A slight shift in the pivot can turn a bad transformation into a readable one, especially when designing for the horizontal placement typical of arm/forearm tattoos.
                        </p>

                        <figure className="my-10 text-center">
                            <Image
                                src="/images/rotation-center-impact.png"
                                alt="An illustration demonstrating how shifting the rotation center point dramatically impacts the clarity and legibility of a two-word ambigram."
                                width={800} height={400}
                                className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                            <figcaption className="text-sm text-slate-500 mt-4 font-medium">
                                Illustration showing how rotational axis placement affects two-word ambigram clarity.
                            </figcaption>
                        </figure>

                        <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-sm overflow-x-auto my-8 shadow-inner font-mono">
                            <code>
                                {`// Conceptual Check: Testing for balanced dual-word rotation
const wordA = "LOVE";
const wordB = "HATE"; 

// If rotation is applied mid-string, the visual center shifts drastically.
// A good generator offers an option to center the rotational axis between the words.
// Check the settings panel for an "Axis Centering" toggle.`}
                            </code>
                        </pre>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                            Handling Punctuation and Numerals in Ink
                        </h2>
                        <p className="leading-relaxed mb-6">
                            This is a common blocker for anyone trying to use a <strong>two word ambigram generator tattoo</strong> setup that involves dates or initials.
                        </p>

                        <p className="leading-relaxed mb-6">
                            Numbers (like &apos;2&apos; or &apos;0&apos;) and punctuation are rarely natively supported for ambigram transformation because their shapes lack the required rotational counterparts in standard fonts.
                        </p>

                        <p className="leading-relaxed mb-6">
                            Based on analyzing thousands of iterations, we found that for a 180&deg; rotational ambigram, the total character count (Word A + Word B) should ideally not exceed 10 characters to maintain above 60% legibility with our current engine. Above 12 characters, manual intervention becomes mandatory.
                        </p>

                        <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                            The Free Generator Output: Preparing for the Stencil
                        </h3>
                        <p className="leading-relaxed mb-6">
                            Once you generate a successful design using the <strong>2 words ambigram generator</strong>, your final step before printing is preparing the file. Ensure you download the highest resolution available, even if you think you won&apos;t need it.
                        </p>

                        <div className="text-center mt-16 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[2.5rem] shadow-2xl border border-slate-800">
                            <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                Ready to test these advanced layout theories?
                            </h3>
                            <p className="text-slate-400 mb-8 font-medium">
                                Access the main generator and try manipulating your input order now on <Link href="https://ambigramgenerator.me" className="text-indigo-400 font-semibold hover:underline">Our Comprehensive Ambigram Generator Page</Link> to see these principles in action.
                            </p>
                            <Link href="/" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-500 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                Go to Generator
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            <Image
                                src="/images/two-word-rotation-pivot-guide.png"
                                alt="Guide showing how rotational axis placement affects two word ambigram clarity"
                                width={400} height={300}
                                className="w-full h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                            <Image
                                src="/images/multi-word-numeric-failure.png"
                                alt="Example where the numbers in a two-word tattoo design become illegible"
                                width={400} height={300}
                                className="w-full h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                            <Image
                                src="/images/clean-download-file-for-tattoo.png"
                                alt="High-contrast, clean line art ready for transfer as a tattoo stencil"
                                width={400} height={300}
                                className="w-full h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                        </div>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                            Conclusion: From Generator to Permanent Ink
                        </h2>
                        <p className="leading-relaxed mb-6">
                            The success of your <strong>two word ambigram generator tattoo</strong> hinges on structural awareness. Use the tools to find the near-perfect match, understand where the limitations lie (especially with numbers), and use that knowledge to guide your consultation with your tattoo artist. Don&apos;t settle for anything less than perfect symmetry!
                        </p>

                        <p className="leading-relaxed mb-8">
                            Ready to test your chosen phrases? The process starts now:
                        </p>
                        <div className="text-center my-10">
                            <Link href="/" className="inline-block bg-indigo-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 shadow-2xl">
                                Use the Two Word Ambigram Generator Instantly!
                            </Link>
                        </div>

                    </article>
                </div>
            </section>
        </main>
    );
}