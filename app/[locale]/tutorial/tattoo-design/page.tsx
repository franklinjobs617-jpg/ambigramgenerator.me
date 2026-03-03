import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";

// 辅助函数
const DOMAIN = "https://www.ambigramgenerator.me";
type Props = {
    params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/tutorial/tattoo-design";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Create Ambigram Tattoo Generator: Guide for Perfect Ink Designs",
            description: "The definitive guide on how to create ambigram tattoo generator designs. Use our free tool for clear, lasting ink. Essential tips for your tattoo ambigram generator session."
        },
        fr: {
            title: "Créer un Tatouage Ambigramme : Le Guide Ultime pour des Designs Parfaits",
            description: "Le guide définitif sur la création de designs de tatouage ambigramme. Utilisez notre outil gratuit pour une encre claire et durable. Conseils essentiels pour votre session."
        },
        de: {
            title: "Ambigramm Tattoo erstellen: Guide für perfekte Tattoo-Vorlagen",
            description: "Der definitive Leitfaden zur Erstellung von Ambigramm-Tattoo-Vorlagen. Nutzen Sie unser kostenloses Tool für klare Designs. Profi-Tipps für Ihr nächstes Tattoo."
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

export default async function TattooDesignTutorialPage({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": locale === 'fr'
            ? "Le guide essentiel pour créer des designs de tatouage ambigramme"
            : "The Essential Workflow to Create Ambigram Tattoo Generator Designs",
        "description": locale === 'fr'
            ? "Apprenez à concevoir des tatouages ambigrammes lisibles et durables avec notre guide complet."
            : "Learn how to design legible and lasting ambigram tattoos with our complete workflow guide.",
        "image": `${DOMAIN}/logo.png`,
        "author": { "@type": "Organization", "name": "AmbigramStudio", "url": DOMAIN },
        "publisher": { "@type": "Organization", "name": "AmbigramStudio", "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` } },
        "datePublished": "2026-02-01T08:00:00+08:00",
        "dateModified": new Date().toISOString()
    };

    // ========================================================================
    // 法语版本 (French Version)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
                            Le Flux de Travail Essentiel pour Créer des Tatouages Ambigrammes
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                            Les tatouages sont permanents. Votre ambigramme doit être impeccable. Ce guide vous montre exactement comment utiliser notre générateur pour un art prêt pour le tatouage.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                                Étape 1 : Choisir la Lisibilité plutôt que la Complexité
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Lors de la recherche d&apos;un <strong>générateur de tatouage ambigramme</strong>, la plupart des utilisateurs privilégient le style au détriment de l&apos;aspect pratique. Grosse erreur. Un design mal rendu ressemblera à de l&apos;art abstrait après un an de vieillissement.
                            </p>
                            <p className="leading-relaxed mb-6">
                                Pour les tatouages, nous recommandons fortement de s&apos;en tenir aux <strong>ambigrammes rotationnels (180°)</strong> ou aux <strong>ambigrammes par réflexion (miroir)</strong> simples. Les polices complexes augmentent considérablement le risque d&apos;illisibilité.
                            </p>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                                Le Choix de la Police : Votre Meilleur Allié ou Pire Ennemi
                            </h3>
                            <p className="leading-relaxed mb-6">
                                La police sélectionnée est critique. Évitez initialement les polices script trop stylisées ou fines. Vous avez besoin de formes de lettres épaisses et claires capables de résister à la diffusion de l&apos;encre.
                            </p>

                            <figure className="my-10 text-center">
                                <Image
                                    src="/images/font-comparison-bold-vs-script-ambigram.png"
                                    alt="Comparaison visuelle entre une police grasse et une police script fine pour ambigramme"
                                    width={800} height={450}
                                    className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                                />
                                <figcaption className="text-sm text-slate-500 mt-4 font-medium">
                                    Comparaison de polices montrant la différence de clarté entre une police grasse et une police script fine.
                                </figcaption>
                            </figure>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4 text-left">
                                Générer Votre Concept de Tatouage
                            </h3>
                            <p className="leading-relaxed mb-6">
                                Utilisez l&apos;outil avec le texte choisi. Si vous visez un <strong>tatouage ambigramme</strong>, assurez-vous que la longueur du texte est courte (3 à 5 lettres max) pour les meilleurs résultats.
                            </p>

                            <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-sm overflow-x-auto my-8 shadow-inner font-mono">
                                <code>
                                    {`// Point de contrôle pour le design de tatouage
const ParametresTatouage = {
    Symetrie: "Rotationnelle 180", // Recommandé pour la clarté
    GraissePolice: "Gras/Serif",    // Essentiel pour la tenue
    LongueurTexte: "< 6 Caractères" // Idéal pour la lisibilité
};`}
                                </code>
                            </pre>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                                Étape 2 : Traduire le Design Numérique en Encre
                            </h2>
                            <p className="leading-relaxed mb-6">
                                C&apos;est ici que la plupart des utilisateurs échouent. Le fichier de sortie n&apos;est *pas* le pochoir de tatouage final.
                            </p>
                            <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mb-10 shadow-sm">
                                <p className="text-indigo-900 font-medium m-0 leading-relaxed">
                                    Ne supposez jamais que le logiciel organisera intelligemment vos deux mots dans l&apos;espace (côte à côte ou superposés). Il traite l&apos;entrée comme une séquence unique. Imprimez toujours votre design à la taille prévue et montrez-le à votre artiste pour une revue finale sur papier pochoir.
                                </p>
                            </div>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                                Étape 3 : Finalisation et Téléchargement
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Une fois que vous avez un design que vous aimez, téléchargez le fichier haute résolution. Notre générateur assure une sortie propre pour une utilisation immédiate par votre tatoueur.
                            </p>

                            <div className="text-center mt-16 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[2.5rem] shadow-2xl border border-slate-800">
                                <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                    Comprendre la théorie est la première étape.
                                </h3>
                                <p className="text-slate-400 mb-8 font-medium">
                                    Passez à la pratique ! Rendez-vous sur l&apos;interface principale sur <Link href="/" className="text-indigo-400 font-semibold hover:underline">AmbigramGenerator.me</Link> et commencez à expérimenter.
                                </p>
                                <Link href="/" className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg">
                                    Retour à l&apos;accueil
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                                <Image src="/images/tattoo-font-selection-impact.png" alt="Impact de la police" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                                <Image src="/images/clear-tattoo-ready-ambigram.png" alt="Ambigramme clair" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                                <Image src="/images/consulting-tattoo-artist-stencil.png" alt="Consultation tatoueur" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                            </div>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4 text-left">
                                Conclusion : Votre Encre, Perfectionnée
                            </h2>
                            <p className="leading-relaxed mb-10">
                                Pour réussir votre tatouage, donnez la priorité à la clarté. Utilisez notre outil comme carnet de croquis initial, validez la lisibilité et consultez un professionnel.
                            </p>

                            <div className="text-center mb-10">
                                <Link href="/" className="inline-block px-10 py-5 bg-indigo-600 text-white rounded-full text-xl font-bold hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl">
                                    Concevez votre tatouage maintenant !
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

            {/* Header Section (EN) */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
                        The Essential Workflow to Create Ambigram Tattoo Generator Designs
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                        Tattoos are permanent. Your ambigram must be flawless. This guide cuts through the noise to show you exactly how to leverage our free generator for tattoo-ready art.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose prose-lg prose-slate text-slate-700 max-w-none">

                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                            Step 1: Choosing Readability Over Complexity
                        </h2>
                        <p className="leading-relaxed mb-6">
                            When searching for an <strong>ambigram tattoo generator</strong>, most users prioritize cool factor over practicality. Big mistake. A poorly rendered design will look like abstract art after a year of fading.
                        </p>
                        <p className="leading-relaxed mb-6">
                            For tattoos, we strongly recommend sticking to <strong>Rotational (180&deg;) Ambigrams</strong> or simple <strong>Reflectional (Mirror) Ambigrams</strong>. Complex typefaces drastically increase the risk of illegibility.
                        </p>

                        <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                            Font Choice: Your Biggest Ally or Worst Enemy
                        </h3>
                        <p className="leading-relaxed mb-6">
                            The font selected in the generator is critical. Avoid overly stylized or thin script fonts initially. You need thick, clear letterforms that can withstand tattooing ink spread.
                        </p>

                        <figure className="my-10 text-center">
                            <Image
                                src="/images/font-comparison-bold-vs-script-ambigram.png"
                                alt="A visual comparison showing a bold, serif font ambigram next to a thin, script font ambigram after 180-degree rotation"
                                width={800} height={450}
                                className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                            <figcaption className="text-sm text-slate-500 mt-4 font-medium">
                                Font comparison showcasing the difference in clarity between a bold font and a thin script font for ambigrams.
                            </figcaption>
                        </figure>

                        <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                            Generating Your Tattoo Concept
                        </h3>
                        <p className="leading-relaxed mb-6">
                            Use the tool with your chosen text. If you are aiming for an <strong>ambigram generator tattoo</strong>, ensure the text length is short (3-5 letters max) for the best results.
                        </p>

                        <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-sm overflow-x-auto my-8 shadow-inner font-mono text-left">
                            <code>
                                {`// Conceptual Checkpoint for Tattoo Design
const TattooSettings = {
    Symmetry: "Rotational 180", // Recommended default for clarity
    FontWeight: "Bold/Serif",    // Essential for ink retention
    TextLength: "< 6 Characters" // Best practice for legibility
};`}
                            </code>
                        </pre>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                            Step 2: Translating Digital Design to Ink
                        </h2>
                        <p className="leading-relaxed mb-6">
                            This is where most online generator users fail. The output file is *not* the final tattoo stencil.
                        </p>
                        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mb-10 shadow-sm text-left">
                            <p className="text-indigo-900 font-medium m-0 leading-relaxed">
                                Never assume the software will intelligently arrange your two words spatially. Always print your final design at the intended size and take it to your artist for a final review on stencil paper.
                            </p>
                        </div>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                            Step 3: Finalizing and Downloading
                        </h2>
                        <p className="leading-relaxed mb-6">
                            Once you have a design you love and have verified its legibility, download the high-resolution file. Our generator ensures the output is clean for immediate use.
                        </p>

                        <div className="text-center mt-16 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[2.5rem] shadow-2xl border border-slate-800">
                            <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                Understanding the theory is step one.
                            </h3>
                            <p className="text-slate-400 mb-8 font-medium">
                                To put this into practice, head over to the main generator interface and start experimenting immediately.
                            </p>
                            <Link href="/" className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg">
                                Go to Homepage
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                            <Image src="/images/tattoo-font-selection-impact.png" alt="Font weight impact" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                            <Image src="/images/clear-tattoo-ready-ambigram.png" alt="Tattoo ready ambigram" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                            <Image src="/images/consulting-tattoo-artist-stencil.png" alt="Artist consultation" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                        </div>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                            Conclusion: Your Ink, Perfected
                        </h2>
                        <p className="leading-relaxed mb-10">
                            To successfully <strong>create ambigram tattoo generator</strong> art, you must prioritize font clarity and design simplicity. This disciplined approach ensures your art remains permanent and beautiful.
                        </p>

                        <div className="text-center mb-10">
                            <Link href="/" className="inline-block px-10 py-5 bg-indigo-600 text-white rounded-full text-xl font-bold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-xl">
                                Start Designing Your Tattoo Ambigram Now!
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}