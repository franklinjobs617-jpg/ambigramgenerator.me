import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";

// 辅助函数：构建完整的 URL
const DOMAIN = "https://www.ambigramgenerator.me";


type Props = {
    params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/tutorial/two-name-ambigram";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Two Name Ambigram Generator: Create Perfect 2-Word & Double Name Designs Instantly",
            description: "Master the art of the two name ambigram generator. Learn secrets for perfect 2 names ambigram designs, ideal for tattoos and logos. Free 2 word ambigram generator tutorial."
        },
        fr: {
            title: "Générateur d'Ambigramme à Deux Noms : Créer des Designs Parfaits de Double Prénom",
            description: "Maîtrisez l'art du générateur d'ambigrammes à deux noms. Apprenez les secrets pour des designs parfaits à 2 noms, idéaux pour les tatouages et les logos. Tutoriel gratuit."
        },
        de: {
            title: "Zwei-Namen Ambigramm Generator: Perfekte 2-Wort & Doppelnamen-Designs erstellen",
            description: "Meistern Sie die Kunst des Zwei-Namen Ambigramm Generators. Erfahren Sie Geheimnisse für perfekte Designs mit 2 Namen, ideal für Tattoos und Logos. Kostenloses Tutorial."
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
export default async function TwoNameAmbigramTutorial({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": locale === "fr"
            ? "Le guide définitif pour l'utilisation d'un générateur d'ambigrammes à deux noms"
            : "The Definitive Guide to Using a Two Name Ambigram Generator",
        "description": locale === "fr"
            ? "Apprenez à transformer deux noms en ambigrammes époustouflants avec notre guide pro."
            : "Learn how to transform two names into stunning ambigrams with our pro guide.",
        "image": `${DOMAIN}/logo.png`,
        "author": { "@type": "Organization", "name": "AmbigramStudio", "url": DOMAIN },
        "publisher": { "@type": "Organization", "name": "AmbigramStudio", "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` } },
        "datePublished": "2026-02-01T08:00:00+08:00",
        "dateModified": new Date().toISOString(),
    };

    if (locale === "fr") {
        // ========================================================================
        // 法语版本 (French Version)
        // ========================================================================
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                {/* Header Section */}
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
                            Le Guide Définitif pour l&apos;Utilisation d&apos;un Générateur d&apos;Ambigrammes à Deux Noms
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                            Ce tutoriel va droit au but. Nous nous concentrons uniquement sur la transformation de deux noms ou deux mots en ambigrammes époustouflants grâce à notre générateur gratuit. Parfait pour les couples, les logos et les tatouages à fort impact.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                                Pourquoi les Ambigrammes à Double Mot sont plus Difficiles qu&apos;on ne le Pense
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Générer un ambigramme d&apos;un seul mot repose sur une symétrie prévisible. Lorsque vous introduisez un deuxième mot ou nom — en ciblant des mots-clés comme <strong>générateur d&apos;ambigramme 2 noms</strong> ou <strong>générateur d&apos;ambigramme pour 2 noms</strong> — la complexité explose. Les combinaisons de lettres s&apos;alignent rarement parfaitement pour la rotation ou la réflexion.
                            </p>
                            <p className="leading-relaxed mb-6">
                                Pour réussir ici, vous avez besoin d&apos;un moteur puissant. Notre outil s&apos;appuie sur des algorithmes avancés pour tenter des combinaisons là où les plus simples échouent. Cependant, l&apos;affinement de la saisie par l&apos;utilisateur est crucial.
                            </p>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                                Le Défi de la Cartographie des Lettres
                            </h3>
                            <p className="leading-relaxed mb-6">
                                La clé de tout bon ambigramme est de trouver des lettres qui se transforment en d&apos;autres lettres nécessaires au point de symétrie (par exemple, le &apos;M&apos; se transformant en &apos;W&apos; à l&apos;envers). Avec deux noms, vous résolvez essentiellement deux puzzles indépendants simultanément.
                            </p>
                            <p className="leading-relaxed mb-6">
                                Lorsque vous visez les meilleurs résultats pour les requêtes de <strong>générateur d&apos;ambigramme gratuit à 2 mots</strong>, concentrez-vous sur les noms contenant des lettres hautement symétriques (A, H, I, M, O, T, U, V, W, X, Y).
                            </p>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                                Étape par Étape : Générer Votre Ambigramme Double
                            </h3>
                            <p className="leading-relaxed mb-6">
                                Voici le flux de travail éprouvé pour maximiser votre succès lors de l&apos;utilisation du <strong>générateur d&apos;ambigramme à deux noms</strong> :
                            </p>
                            <ol className="list-decimal list-inside leading-relaxed space-y-3 mb-8 ml-4 font-medium">
                                <li>Naviguez vers l&apos;interface du Générateur 2D sur AmbigramGenerator.me.</li>
                                <li>Saisissez le premier nom/mot dans la Ligne 1.</li>
                                <li>Saisissez le deuxième nom/mot dans la Ligne 2.</li>
                                <li>Sélectionnez la transformation souhaitée (Rotationnelle ou Réflexive).</li>
                                <li>Générez et examinez le résultat initial.</li>
                            </ol>

                            <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mb-10 shadow-sm">
                                <p className="text-indigo-900 font-medium m-0 leading-relaxed">
                                    Vous aurez besoin de patience. Parfois, le logiciel nécessite plusieurs tentatives pour trouver un chemin valide entre deux mots disparates.
                                </p>
                            </div>

                            <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-sm overflow-x-auto my-8 shadow-inner font-mono text-left">
                                <code>
                                    {`function resoudreSymetrieDouble(motA, motB) {
    // Implique une cartographie matricielle complexe basee sur des tables de rotation.
    if (verifierCompatibiliteLettres(motA, motB)) {
        return renduAmbigramme(motA, motB);
    } else {
        return "Echec de symetrie : Ajustez les lettres saisies."; 
    }
}`}
                                </code>
                            </pre>

                            <figure className="my-10 text-center">
                                <Image
                                    src="/images/two-name-ambigram-input-screen.png"
                                    alt="Interface montrant les champs de saisie pour deux noms"
                                    width={800} height={400}
                                    className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                                />
                                <figcaption className="text-sm text-slate-500 mt-4 font-medium italic">
                                    Un ambigramme à deux noms réussi pour &quot;Anna&quot; et &quot;John&quot;, démontrant un alignement parfait.
                                </figcaption>
                            </figure>

                            <p className="leading-relaxed mb-6">
                                Nous avons testé le logiciel avec les noms &quot;MARK&quot; et &quot;KRAM&quot; (un retournement direct de lettres). Observez le résultat ci-dessous. Le logiciel a réussi à cartographier la structure M/W/K, prouvant sa capacité à gérer les transformations de lettres quasi-parfaites nécessaires pour des noms doubles fluides.
                            </p>

                            <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                                Avis d&apos;Expert : Les Pièges à Éviter
                            </h3>
                            <p className="leading-relaxed mb-6">
                                Beaucoup d&apos;utilisateurs échouent avec les designs à double mot parce qu&apos;ils ne tiennent pas compte de l&apos;espacement et du poids visuel. Lorsque le logiciel produit un design, ne l&apos;acceptez pas tel quel. Analysez le flux.
                            </p>
                            <p className="leading-relaxed mb-6 text-slate-700">
                                N&apos;essayez pas d&apos;ambigrammes à deux mots où les mots doivent se lire parfaitement à l&apos;envers ET de droite à gauche, à moins que les mots ne soient de parfaits opposés palindromiques (comme l&apos;exemple &apos;MARK/KRAM&apos;). Pour les noms complexes, acceptez que le second mot soit probablement une représentation hautement stylisée, presque abstraite, du texte original.
                            </p>

                            <blockquote className="bg-[#F8FBFF] border-l-4 border-blue-600 rounded-r-2xl p-6 my-10 italic shadow-sm text-slate-600 font-medium">
                                &quot;De nombreux outils gratuits forceront des lettres incompatibles ensemble, ce qui donnera un non-sens visuel. Nous recommandons de se concentrer sur des noms plus courts (&lt;6 caractères) jusqu&apos;à ce que vous maîtrisiez les capacités du logiciel.&quot;
                            </blockquote>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                                Optimiser pour les Tatouages Ambigrammes
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Le terme de recherche <strong>générateur de tatouage ambigramme</strong> est hautement commercial. Lors de la conception d&apos;une encre permanente, la clarté n&apos;est pas négociable. Assurez-vous que les lettres transformées sont toujours lisibles, même si elles sont abstraites.
                            </p>

                            <div className="text-center mt-16 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[2.5rem] shadow-2xl border border-slate-800">
                                <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                    Explorez plus de Designs et de Générateurs d&apos;Ambigrammes !
                                </h3>
                                <p className="text-slate-400 mb-8 font-medium">
                                    Visitez notre page d&apos;accueil pour découvrir divers styles d&apos;ambigrammes et accéder à nos autres générateurs puissants.
                                </p>
                                <Link href="/" className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg">
                                    Retour à l&apos;Accueil
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                                <Image src="/images/two-name-input-interface.png" alt="Interface deux noms" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                                <Image src="/images/successful-dual-word-example.png" alt="Exemple double mot réussi" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                                <Image src="/images/ambigram-design-error-visual.png" alt="Erreur de design visuel" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                            </div>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4 text-left">
                                Conclusion : Conquérir l&apos;Ambigramme Double
                            </h2>
                            <p className="leading-relaxed mb-10">
                                Maîtriser le <strong>générateur d&apos;ambigramme à deux noms</strong> est moins une question d&apos;outil que de compréhension des conflits inhérents aux lettres. En ciblant des lettres symétriques et en itérant patiemment, vous pouvez obtenir des résultats époustouflants.
                            </p>

                            <div className="text-center mb-10">
                                <Link href="/" className="inline-block px-10 py-5 bg-indigo-600 text-white rounded-full text-xl font-bold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-xl">
                                    Générez Votre Ambigramme à Deux Noms Maintenant !
                                </Link>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 英语版本及所有其他语言的 Fallback
    // ========================================================================
    return (
        <main className="bg-[#FDFDFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Header Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
                        The Definitive Guide to Using a Two Name Ambigram Generator
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                        This tutorial cuts the fluff. We focus solely on transforming two names or two words into stunning ambigrams using our free generator. Perfect for couples, logos, and high-impact tattoos.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                            Why Dual-Word Ambigrams Are Harder Than You Think
                        </h2>
                        <p className="leading-relaxed mb-6">
                            Generating a single-word ambigram relies on predictable symmetry. When you introduce a second word or name—targeting keywords like <strong>ambigram generator 2 names</strong> or <strong>2 names ambigram generator</strong>—the complexity explodes. The letter combinations rarely align perfectly for rotation or reflection.
                        </p>
                        <p className="leading-relaxed mb-6">
                            To succeed here, you need a powerful engine. Our tool leverages advanced algorithms to attempt combinations where simpler ones fail. However, user input refinement is crucial.
                        </p>

                        <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                            The Challenge of Letter Mapping
                        </h3>
                        <p className="leading-relaxed mb-6">
                            The key to any good ambigram is finding letters that transform into other necessary letters at the point of symmetry (e.g., &apos;M&apos; turning into &apos;W&apos; upside down). With two names, you are essentially solving two independent puzzles simultaneously.
                        </p>
                        <p className="leading-relaxed mb-6">
                            When aiming for the best results for <strong>free 2 word ambigram generator</strong> queries, focus on names with highly symmetric letters (A, H, I, M, O, T, U, V, W, X, Y).
                        </p>

                        <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                            Step-by-Step: Generating Your Dual Ambigram
                        </h3>
                        <p className="leading-relaxed mb-6">
                            Here is the proven workflow to maximize your success when using the <strong>two name ambigram generator</strong>:
                        </p>
                        <ol className="list-decimal list-inside leading-relaxed space-y-3 mb-8 ml-4 font-medium">
                            <li>Navigate to the 2D Generator interface on AmbigramGenerator.me.</li>
                            <li>Input the first name/word into Line 1.</li>
                            <li>Input the second name/word into Line 2.</li>
                            <li>Select the desired transformation (Rotational or Reflectional).</li>
                            <li>Generate and review the initial output.</li>
                        </ol>

                        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mb-10 shadow-sm text-left">
                            <p className="text-indigo-900 font-medium m-0 leading-relaxed text-left">
                                You will need patience. Sometimes the software requires several attempts to find a valid path between two disparate words.
                            </p>
                        </div>

                        <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-sm overflow-x-auto my-8 shadow-inner font-mono text-left">
                            <code>
                                {`// Conceptual algorithmic challenge snippet
function solveDualSymmetry(wordA, wordB) {
    // Involves complex matrix mapping based on letter rotation tables.
    if (checkLetterCompatibility(wordA, wordB)) {
        return renderAmbigram(wordA, wordB);
    } else {
        // Requires user input adjustment.
        return "Symmetry Failed: Adjust input letters."; 
    }
}`}
                            </code>
                        </pre>

                        <figure className="my-10 text-center">
                            <Image
                                src="/images/two-name-ambigram-input-screen.png"
                                alt="Interface showing Line 1 and Line 2 input fields for two names"
                                width={800} height={400}
                                className="w-full max-w-2xl mx-auto h-auto rounded-[2rem] shadow-xl border border-slate-200"
                            />
                            <figcaption className="text-sm text-slate-500 mt-4 font-medium italic">
                                A successful dual-name ambigram for &quot;Anna&quot; and &quot;John&quot;, demonstrating perfect alignment.
                            </figcaption>
                        </figure>

                        <p className="leading-relaxed mb-6">
                            We tested the software with the names &quot;MARK&quot; and &quot;KRAM&quot; (a direct letter flip). Observe the output below. The software successfully mapped the M/W/K structure, proving its ability to handle near-perfect letter transformations required for seamless dual names.
                        </p>

                        <h3 className="text-2xl font-black text-indigo-600 mt-12 mb-4">
                            Expert Insight: Pitfalls to Avoid
                        </h3>
                        <p className="leading-relaxed mb-6">
                            Many users fail with dual-word designs because they don&apos;t account for spacing and visual weight. When the software outputs a design, don&apos;t just accept it. Analyze the flow.
                        </p>
                        <p className="leading-relaxed mb-6 text-slate-700">
                            Do not attempt two-word ambigrams where the words must read perfectly backward AND upside down, unless the words are perfect palindromic opposites (like the &apos;MARK/KRAM&apos; example). For complex names, accept that the second word will likely be a highly stylized representation of the original text.
                        </p>

                        <blockquote className="bg-[#F8FBFF] border-l-4 border-blue-600 rounded-r-2xl p-6 my-10 italic shadow-sm text-slate-600 font-medium">
                            &quot;Many free tools will force incompatible letters together, resulting in visual nonsense. We recommend focusing on shorter names (&lt;6 characters) until you master the software&apos;s capabilities.&quot;
                        </blockquote>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-6 border-b border-slate-200 pb-4">
                            Optimizing for Ambigram Tattoos
                        </h2>
                        <p className="leading-relaxed mb-6">
                            The search term <strong>ambigram tattoo generator</strong> is highly commercial. When designing for permanent ink, clarity is non-negotiable. Ensure the transformed letters are still legible, even if abstract.
                        </p>

                        <div className="text-center mt-16 p-10 bg-gradient-to-br from-slate-900 to-[#1A1A1B] rounded-[2.5rem] shadow-2xl border border-slate-800">
                            <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                Explore More Ambigram Designs and Generators!
                            </h3>
                            <p className="text-slate-400 mb-8 font-medium">
                                Visit our homepage to discover various ambigram styles and access our other powerful generators.
                            </p>
                            <Link href="/" className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg">
                                Go to Homepage
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                            <Image src="/images/two-name-input-interface.png" alt="Input interface" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                            <Image src="/images/successful-dual-word-example.png" alt="Dual word example" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                            <Image src="/images/ambigram-design-error-visual.png" alt="Design error visual" width={400} height={300} className="rounded-[2rem] shadow-xl border border-slate-200 w-full h-auto" />
                        </div>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-16 mb-6 border-b border-slate-200 pb-4 text-left">
                            Conclusion: Conquering the Dual Ambigram
                        </h2>
                        <p className="leading-relaxed mb-10">
                            Mastering the <strong>two name ambigram generator</strong> is less about the tool and more about understanding the inherent letter conflicts. By iterating patiently, you can achieve stunning results that satisfy high design intent.
                        </p>

                        <div className="text-center mb-10">
                            <Link href="/" className="inline-block px-10 py-5 bg-indigo-600 text-white rounded-full text-xl font-bold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-xl">
                                Generate Your Two-Name Ambigram Now!
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}