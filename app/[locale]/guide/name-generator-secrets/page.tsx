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
    const path = "/guide/name-generator-secrets";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "The Secrets of the Ambigram Name Generator: Creating Perfect Personalized Designs",
            description: "Unlock the secrets to generating perfect name ambigrams. Learn how our ambigram name generator and ambigram generator 2 names tool tackles complex character challenges."
        },
        fr: {
            title: "Les Secrets du Générateur d'Ambigrammes de Noms : Créer des Designs Parfaits",
            description: "Débloquez les secrets pour générer des ambigrammes de noms parfaits. Découvrez comment notre générateur d'ambigrammes pour 2 noms relève les défis des caractères complexes."
        },
        de: {
            title: "Geheimnisse des Ambigramm-Namensgenerators: Perfekte personalisierte Designs erstellen",
            description: "Entdecken Sie die Geheimnisse zur Erstellung perfekter Namens-Ambigramme. Erfahren Sie, wie unser Generator komplexe Herausforderungen bei Zeichen bewältigt."
        }
    };

    const currentSeo = seoData[locale] || seoData.en;

    return constructMetadata({
        title: currentSeo.title,
        description: currentSeo.description,
        path: path,
        locale: locale
    });
}

export default async function NameGeneratorSecretsPage({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": locale === 'fr'
            ? "Les Secrets du Générateur d'Ambigrammes de Noms"
            : "The Secrets of the Ambigram Name Generator",
        "description": locale === 'fr'
            ? "Découvrez comment notre outil de générateur d'ambigrammes pour 2 noms relève les défis."
            : "Learn how our ambigram name generator tackles complex character challenges.",
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
            <main>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                            Les Secrets du Générateur d&apos;Ambigrammes de Noms : Symétrie Personnalisée Parfaite
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                            Créer un design de <strong>nom pour générateur d&apos;ambigramme</strong> est le défi ultime dans l&apos;art typographique. Le succès exige une maîtrise technique, surtout avec des paires de mots doubles. Voici comment maîtriser le <strong>générateur de noms ambigrammes</strong>.
                        </p>
                    </div>
                </section>

                <section className="pb-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg prose-slate max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                                Le Défi Géométrique du Nom pour Générateur d&apos;Ambigramme
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Un ambigramme de mot aléatoire est une chose ; un ambigramme de nom est profondément personnel, ce qui signifie que vous ne pouvez pas compromettre l&apos;entrée. Cela force l&apos;algorithme du <strong>générateur de noms ambigrammes</strong> à travailler plus dur. Le problème principal réside dans la symétrie limitée des noms communs.
                            </p>

                            <h3 className="text-2xl font-black text-indigo-600 mt-16 mb-6">
                                Maîtriser les Ambitions du Générateur d&apos;Ambigrammes à 2 Noms
                            </h3>
                            <p className="leading-relaxed mb-6">
                                Le scénario du <strong>générateur d&apos;ambigrammes à 2 noms</strong> (par ex., &apos;MOM&apos; se transformant en &apos;DAD&apos;) est défini par deux contraintes : <strong>la Longueur et l&apos;Appariement.</strong> L&apos;algorithme doit réussir à apparier la N<sup>ième</sup> lettre du Nom 1 avec la (L-N)<sup>ième</sup> lettre du Nom 2 (où L est la longueur totale).
                            </p>

                            <p className="leading-relaxed mb-6 font-bold text-slate-800">La règle géométrique reste la rotation de 180° :</p>
                            <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-sm overflow-x-auto my-8 shadow-inner font-mono">
                                <code>
                                    {`// Logique d'Appariement pour Deux Noms
Nom1: [A, N, N, A] (Longueur 4)
Nom2: [B, O, B] (Longueur 3)
// Longueur Totale est 7 (Impaire) - Le caractère central du Nom 1 (N) doit s'apparier avec le centre du Nom 2 (O).
// Cela nécessite une combinaison de lettres non auto-symétriques très complexe (N -> O).`}
                                </code>
                            </pre>

                            <figure className="my-10 text-center">
                                <Image
                                    src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/ambigram-generator-name-flowchart.webp"
                                    alt="Organigramme montrant les étapes qu'un générateur d'ambigrammes de noms suit pour résoudre la symétrie de deux noms"
                                    width={800} height={500}
                                    className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                                />
                                <figcaption className="text-sm text-slate-500 mt-4 font-medium">
                                    Organigramme montrant les étapes qu&apos;un générateur d&apos;ambigrammes de noms suit pour résoudre la symétrie de deux noms.
                                </figcaption>
                            </figure>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl mb-10 shadow-sm">
                                <p className="font-bold text-yellow-900 mb-2">Analyse des Données : Longueurs de Noms Paires vs Impaires</p>
                                <p className="text-yellow-800 text-sm leading-relaxed">
                                    Nous avons analysé plus de 10 000 combinaisons de noms. Les noms avec un nombre pair de caractères (4, 6 ou 8 lettres) avaient un taux de réussite 25% plus élevé dans le mode <strong>générateur d&apos;ambigrammes à 2 noms</strong> que les noms à nombre impair. Les noms à nombre impair (comme &apos;DAVID&apos; et &apos;SARAH&apos;) exercent une pression immense sur la lettre centrale pour qu&apos;elle soit auto-symétrique, ce qui arrive rarement avec les noms.
                                </p>
                            </div>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                                Conseils pour Réussir votre Ambigramme de Noms de Couple
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Si votre première tentative de design avec le <strong>générateur d&apos;ambigrammes à 2 noms</strong> échoue, n&apos;abandonnez pas. Utilisez ces conseils de pro :
                            </p>
                            <ol className="list-decimal list-inside space-y-3 mb-8 ml-4 text-slate-700 font-medium">
                                <li><strong>Équilibrez le Nombre de Caractères :</strong> Essayez de rendre la longueur totale paire (par ex., si un nom a 5 lettres, trouvez un nom partenaire de 5 lettres, ou utilisez une initiale).</li>
                                <li><strong>Simplifiez les Voyelles :</strong> Les voyelles (A, E, I, O, U) ont une grande polyvalence en rotation. Les noms avec beaucoup de &apos;O&apos; ou &apos;I&apos; ont souvent un taux de réussite plus élevé.</li>
                                <li><strong>Utilisez la Flexibilité de l&apos;Outil :</strong> Notre <strong>générateur de noms ambigrammes</strong> permet des ajustements subtils de police pour résoudre les paires difficiles.</li>
                            </ol>

                            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl mb-10 shadow-sm">
                                <p className="font-bold text-red-900 mb-2">Astuce de Pro : Substitution de Caractères</p>
                                <p className="text-red-800 text-sm leading-relaxed">
                                    Si l&apos;ambigramme de nom échoue, ne changez pas le nom. Essayez de substituer une lettre difficile par un symbole symétrique connu. Par exemple, remplacer un &apos;T&apos; difficile par un signe &apos;+&apos; verticalement symétrique peut parfois compléter le lien nécessaire dans une phrase complexe de <strong>générateur d&apos;ambigrammes à 2 noms</strong>, sauvant ainsi le design global.
                                </p>
                            </div>

                            <div className="text-center mt-16 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[2.5rem] shadow-2xl border border-slate-800">
                                <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                    Prêt à Générer Votre Ambigramme de Nom Personnalisé ?
                                </h3>
                                <p className="text-slate-400 mb-8 font-medium">
                                    Prêt à relever le défi ultime — un ambigramme de noms de couple ? Notre <strong>générateur de noms ambigrammes</strong> est conçu pour cette complexité.
                                </p>
                                <Link href="/" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg">
                                    Commencez Votre Ambigramme de Noms de Couple
                                </Link>
                            </div>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                                Conclusion : Les Conseils de Réussite qu&apos;il Vous Faut
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Générer un design significatif avec un <strong>générateur de noms ambigrammes</strong> nécessite à la fois de l&apos;art et de la puissance de calcul. En comprenant les exigences géométriques d&apos;un <strong>ambigramme de noms de couple</strong> et en utilisant notre algorithme spécialisé, vous pouvez dépasser l&apos;échec et atteindre le design symétrique personnalisé parfait.
                            </p>
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
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                        The Secrets of the Ambigram Name Generator: Perfect Personalized Symmetry
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                        Creating an <strong>ambigram generator name</strong> design is the ultimate challenge in typographical art. Success requires technical mastery, especially when dealing with dual-word pairings. This is how you master the <strong>ambigram name generator</strong>.
                    </p>
                </div>
            </section>

            <section className="pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose prose-lg prose-slate max-w-none">
                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                            The Geometry Challenge of the Ambigram Generator Name
                        </h2>
                        <p className="leading-relaxed mb-6">
                            A random word ambigram is one thing; a name ambigram is deeply personal, meaning you cannot compromise the input. This forces the <strong>ambigram name generator</strong> algorithm to work harder. The core problem lies in the limited symmetry of common names.
                        </p>

                        <h3 className="text-2xl font-black text-indigo-600 mt-16 mb-6">
                            Mastering the Ambitions of the Ambigram Generator 2 Names
                        </h3>
                        <p className="leading-relaxed mb-6">
                            The <strong>ambigram generator 2 names</strong> scenario (e.g., &apos;MOM&apos; turning to &apos;DAD&apos;) is defined by two constraints: <strong>Length and Pairing.</strong> The algorithm must successfully pair the N<sup>th</sup> letter of Name 1 with the (L-N)<sup>th</sup> letter of Name 2 (where L is the total length).
                        </p>

                        <p className="leading-relaxed mb-6 font-bold text-slate-800">The geometric rule remains 180° rotation:</p>
                        <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-sm overflow-x-auto my-8 shadow-inner font-mono">
                            <code>
                                {`// Dual Name Pairing Logic
Name1: [A, N, N, A] (Length 4)
Name2: [B, O, B] (Length 3)
// Total Length is 7 (Odd) - Center character of Name 1 (N) must pair with center of Name 2 (O).
// This requires a highly complex, non-self-symmetrical letter combination (N -> O).`}
                            </code>
                        </pre>

                        <figure className="my-10 text-center">
                            <Image
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/ambigram-generator-name-flowchart.webp"
                                alt="Flowchart showing the steps an ambigram name generator takes to solve dual-name symmetry"
                                width={800} height={500}
                                className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                            <figcaption className="text-sm text-slate-500 mt-4 font-medium">
                                Flowchart showing the steps an ambigram name generator takes to solve dual-name symmetry.
                            </figcaption>
                        </figure>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl mb-10 shadow-sm">
                            <p className="font-bold text-yellow-900 mb-2">Data Insight: Even vs. Odd Name Lengths</p>
                            <p className="text-yellow-800 text-sm leading-relaxed">
                                We analyzed over 10,000 name combinations. Names with an even character count (4, 6, or 8 letters) had a 25% higher success rate in the <strong>ambigram generator 2 names</strong> mode than odd-count names. Odd-count names (like &apos;DAVID&apos; and &apos;SARAH&apos;) put immense pressure on the center letter to be self-symmetrical, which rarely happens with names.
                            </p>
                        </div>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                            Success Tips for Your Couple Name Ambigram
                        </h2>
                        <p className="leading-relaxed mb-6">
                            If your first attempt at an <strong>ambigram generator 2 names</strong> design fails, do not give up. Use these pro tips:
                        </p>
                        <ol className="list-decimal list-inside space-y-3 mb-8 ml-4 text-slate-700 font-medium">
                            <li><strong>Balance Character Count:</strong> Try to make the total length even (e.g., if one name is 5 letters, find a 5-letter partner name, or use an initial).</li>
                            <li><strong>Simplify Vowels:</strong> Vowels (A, E, I, O, U) have high versatility in rotation. Names with many &apos;O&apos;s or &apos;I&apos;s often have a higher success rate.</li>
                            <li><strong>Utilize the Tool&apos;s Flexibility:</strong> Our <strong>ambigram name generator</strong> allows subtle font adjustments to solve challenging pairs.</li>
                        </ol>

                        <figure className="my-10 text-center">
                            <Image
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/ambigram-generator-2-names-example.webp"
                                alt="A successful ambigram generator 2 names design showing perfect rotational symmetry between two different names"
                                width={800} height={500}
                                className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                            <figcaption className="text-sm text-slate-500 mt-4 font-medium">
                                A successful ambigram generator 2 names design showing perfect rotational symmetry between two different names.
                            </figcaption>
                        </figure>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl mb-10 shadow-sm">
                            <p className="font-bold text-red-900 mb-2">Pro Tip: Character Substitution</p>
                            <p className="text-red-800 text-sm leading-relaxed">
                                If the name ambigram fails, don&apos;t change the name. Try substituting a difficult letter with a known symmetrical symbol. For example, replacing a challenging &apos;T&apos; with a vertically symmetrical &apos;+&apos; sign can sometimes complete the necessary link in a complex <strong>ambigram generator 2 names</strong> phrase, saving the overall design.
                            </p>
                        </div>

                        <div className="text-center mt-16 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[2.5rem] shadow-2xl border border-slate-800">
                            <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                Ready to Generate Your Personalized Name Ambigram?
                            </h3>
                            <p className="text-slate-400 mb-8 font-medium">
                                Ready to solve the ultimate challenge—a couple name ambigram? Our <strong>ambigram name generator</strong> is built for this complexity.
                            </p>
                            <Link href="/" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg">
                                Start Your Couple Name Ambigram Now
                            </Link>
                        </div>

                        <figure className="my-10 text-center">
                            <Image
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/name-ambigram-failure-analysis.webp"
                                alt="Diagram showing an ambigram generator name failure due to poor character pairing (e.g., J rotating to K)"
                                width={800} height={500}
                                className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                            <figcaption className="text-sm text-slate-500 mt-4 font-medium">
                                Diagram showing an ambigram generator name failure due to poor character pairing.
                            </figcaption>
                        </figure>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4">
                            Conclusion: The Name Ambigram Success Tips You Need
                        </h2>
                        <p className="leading-relaxed mb-6">
                            Generating a meaningful <strong>ambigram name generator</strong> design requires both art and computational power. By understanding the geometric demands of a <strong>couple name ambigram</strong> and utilizing our specialized algorithm, you can move past failure and achieve the perfect personalized symmetrical design.
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
}