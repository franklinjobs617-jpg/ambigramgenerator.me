import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/guide/advanced-3d-controls";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Advanced 3D Ambigram Controls: Mastering Lighting and Axis Rotation",
            description: "Move beyond basic designs. Learn to use advanced controls within our ambigram generator software to create new ambigram generator-level 3D renders with dynamic lighting and rotation."
        },
        fr: {
            title: "Contrôles Avancés d'Ambigramme 3D : Maîtriser l'Éclairage et la Rotation",
            description: "Allez au-delà des designs basiques. Apprenez à utiliser les contrôles avancés de notre logiciel générateur d'ambigrammes pour créer des rendus 3D professionnels avec éclairage dynamique."
        },
        de: {
            title: "Fortgeschrittene 3D-Ambigramm-Steuerung: Beherrschung von Beleuchtung und Achsenrotation",
            description: "Gehen Sie über einfache Designs hinaus. Lernen Sie, fortgeschrittene Steuerungen in unserer Ambigramm-Generator-Software zu nutzen, um professionelle 3D-Renders zu erstellen."
        }
    };

    const currentSeo = seoData[locale] || seoData.en;

    return constructMetadata({
        title: currentSeo.title,
        description: currentSeo.description,
        path: path,
        locale: locale,
        image: "https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/advanced-3d-controls-lighting.webp"
    });
}


export default async function Advanced3dControlsPage({ params }: Props) {
    const { locale } = await params;

    // ========================================================================
    // 法语版本 (French Version)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main>
                {/* Header Section (FR) */}
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl lg:text-5xl font-display font-extrabold mb-4">
                            Contrôles Avancés d&apos;Ambigramme 3D : Maîtriser l&apos;Éclairage et la Rotation d&apos;Axe
                        </h1>
                        <p className="text-xl max-w-3xl mx-auto callout">
                            Si vous cherchez à obtenir des résultats de niveau <strong>nouveau générateur d&apos;ambigramme</strong>, vous devez maîtriser le rendu 3D. La différence entre un modèle simple et un rendu professionnel réside dans les <strong>contrôles avancés d&apos;ambigramme</strong>—spécifiquement, l&apos;éclairage, la science des matériaux et les axes de rotation personnalisés.
                        </p>
                    </div>
                </section>

                {/* Content Section (FR) */}
                <section id="definition" className="pb-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose lg:prose-xl max-w-none text-gray-700">
                            <h2 className="text-3xl font-display font-bold text-dark mb-6 border-b pb-3 text-[#1A1A1B]">
                                Au-delà des Bases : Pourquoi l&apos;Éclairage est la Nouvelle Symétrie
                            </h2>
                            <p className="leading-relaxed mb-6">
                                En 2D, la symétrie est absolue. En 3D, la symétrie est souvent *implicite* à travers une illusion d&apos;optique, et la lumière est l&apos;outil principal. Tout <strong>logiciel générateur d&apos;ambigramme</strong> professionnel doit permettre à l&apos;utilisateur un contrôle granulaire sur la source de lumière pour s&apos;assurer que les ombres définissent correctement le mot secondaire.
                            </p>

                            <h3 className="text-2xl font-display font-semibold text-secondary mt-12 mb-4 text-indigo-600">
                                1. Éclairage Dynamique : La Clé du Succès de l&apos;Ambigramme 3D
                            </h3>
                            <p className="leading-relaxed mb-6">
                                Utilisant une technologie comme Three.js, notre outil simule la physique du monde réel. Vous devez positionner la source de lumière avec soin :
                            </p>
                            <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                                <li><strong>Éclairage Axial :</strong> Les sources lumineuses placées directement sur l&apos;axe de rotation principal (180°) détruisent souvent l&apos;effet en minimisant les ombres critiques.</li>
                                <li><strong>Projecteurs Inclinés :</strong> Les meilleurs résultats pour les effets d&apos;<strong>ambigramme à éclairage 3D</strong> proviennent de projecteurs positionnés à un angle vertical de 45°, maximisant la profondeur et la séparation des ombres.</li>
                            </ul>

                            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto my-8 font-mono">
                                <code>
                                    {`// Concept d'implémentation d'éclairage Three.js
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(5, 10, 7); // Accent sur l'angle de 45 degrés
scene.add(directionalLight);`}
                                </code>
                            </pre>

                            <figure className="my-8 text-center">
                                <img
                                    src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/advanced-3d-controls-lighting.webp"
                                    alt="Diagramme montrant l'effet de différents angles de source lumineuse sur un modèle d'ambigramme 3d"
                                    className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                    loading="lazy"
                                />
                                <figcaption className="text-sm text-gray-500 mt-2">
                                    Diagramme montrant l&apos;effet de différents angles de source lumineuse sur un modèle d&apos;ambigramme 3d.
                                </figcaption>
                            </figure>

                            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 mb-6" role="alert">
                                <p className="font-bold">L&apos;Importance du Matériau : Brillant vs Mat</p>
                                <p className="mt-2">
                                    Le choix du matériau est critique. Une finition métallique brillante (Haute Spécularité) amplifie considérablement les reflets, confondant parfois le spectateur et brisant l&apos;illusion. Inversement, une finition mate et non réfléchissante (Faible Spécularité) absorbe la lumière ambiante et repose uniquement sur l&apos;ombre, rendant l&apos;effet d&apos;ambigramme plus fiable pour les impressions 3D physiques.
                                </p>
                            </div>

                            <h2 className="text-3xl font-display font-bold text-dark mt-16 mb-6 border-b pb-3 text-[#1A1A1B]">
                                2. Maîtriser les Contrôles Avancés : Rotation et Exportation
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Pour vraiment <strong>créer de nouveaux designs de générateur d&apos;ambigramme</strong>, vous avez besoin de contrôler chaque degré des axes X, Y et Z. Ce n&apos;est pas seulement pour la visualisation ; c&apos;est pour préparer le fichier pour une fabrication spécialisée ou un rendu haut de gamme.
                            </p>

                            <h3 className="text-2xl font-display font-semibold text-secondary mt-12 mb-4 text-indigo-600">
                                Manipulation Personnalisée des Axes
                            </h3>
                            <p className="leading-relaxed mb-6">
                                La plupart des générateurs forcent une simple rotation de l&apos;axe Z à 180°. Notre <strong>logiciel générateur d&apos;ambigramme</strong> permet des ajustements minutieux. Pour les designs complexes à plusieurs mots, décaler le centre de rotation de seulement 0,5 unité le long de l&apos;axe X peut faire la différence entre l&apos;échec et le succès.
                            </p>

                            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-6" role="alert">
                                <p className="font-bold">Avertissement d&apos;Expert : Intégrité du Maillage</p>
                                <p className="mt-2">
                                    Bien que de nombreux tutoriels de base prétendent que vous pouvez &quot;créer de nouveaux effets de générateur d&apos;ambigramme&quot; en utilisant des logiciels 3D gratuits simples, ils manquent d&apos;optimisation du maillage géométrique sous-jacent. Si l&apos;extrusion initiale de vecteur 2D vers 3D est médiocre, aucun ajustement manuel de l&apos;éclairage ne corrigera l&apos;intégrité défectueuse du maillage du fichier STL final. Utilisez des outils professionnels dès le départ.
                                </p>
                            </div>

                            <figure className="my-8 text-center">
                                <img
                                    src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/ambigram-generator-software-controls.webp"
                                    alt="Vue détaillée du panneau de contrôles avancés d'ambigramme montrant les curseurs d'axe de rotation"
                                    className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                    loading="lazy"
                                />
                                <figcaption className="text-sm text-gray-500 mt-2">
                                    Vue détaillée du panneau de contrôles avancés d&apos;ambigramme montrant les curseurs d&apos;axe de rotation.
                                </figcaption>
                            </figure>

                            <div className="text-center mt-16 p-8 bg-primary bg-indigo-600 text-white rounded-xl shadow-lg border border-primary-dark">
                                <h3 className="text-2xl font-display font-bold mb-4 text-white">
                                    Maîtrisez l&apos;Environnement 3D Aujourd&apos;hui
                                </h3>
                                <p className="text-lg mb-6 text-indigo-100">
                                    Prêt à aller au-delà du 2D de base ? Cliquez ici pour accéder au **logiciel générateur d&apos;ambigramme** qui vous permet de créer facilement de nouveaux effets d&apos;ambigramme en manipulant l&apos;environnement 3D.
                                </p>
                                <Link href="/" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                    Débloquer les Contrôles Avancés 3D Maintenant !
                                </Link>
                            </div>

                            <figure className="my-8 text-center">
                                <img
                                    src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/3d-ambigram-stl-export-quality.webp"
                                    alt="Comparaison d'un fichier d'exportation STL basse résolution vs haute résolution"
                                    className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                    loading="lazy"
                                />
                                <figcaption className="text-sm text-gray-500 mt-2">
                                    Comparaison d&apos;un fichier d&apos;exportation STL basse résolution vs haute résolution provenant du logiciel générateur.
                                </figcaption>
                            </figure>

                            <h2 className="text-3xl font-display font-bold text-dark mt-16 mb-6 border-b pb-3 text-[#1A1A1B]">
                                Conclusion : L&apos;Avenir du Logiciel de Design d&apos;Ambigramme
                            </h2>
                            <p className="leading-relaxed mb-6">
                                Le <strong>logiciel générateur d&apos;ambigramme</strong> du futur doit être capable de rendu 3D dynamique. Maîtriser les <strong>contrôles avancés d&apos;ambigramme</strong> comme la lumière et l&apos;axe est la compétence nécessaire pour exploiter pleinement ce médium artistique. Arrêtez de vous contenter de designs plats et commencez à travailler en trois dimensions.
                            </p>

                            <p className="leading-relaxed mb-6">Prêt à tirer parti de ces contrôles avancés ?</p>
                            <p className="text-center my-10">
                                <Link href="/" className="inline-block px-8 py-4 bg-secondary bg-green-600 text-white rounded-full text-xl font-bold hover:bg-green-700 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                    Débloquer les Contrôles Avancés 3D Maintenant !
                                </Link>
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
            {/* Header Section (EN) */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-display font-extrabold mb-4">
                        Advanced 3D Ambigram Controls: Mastering Lighting and Axis Rotation
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto callout">
                        If you seek to <strong>create new ambigram generator</strong>-level results, you must master 3D rendering. The difference between a simple
                        model and a professional render lies in the <strong>advanced ambigram controls</strong>—specifically,
                        lighting, material science, and custom rotation axes.
                    </p>
                </div>
            </section>

            {/* Content Section (EN) */}
            <section id="definition" className="pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose lg:prose-xl max-w-none text-gray-700">
                        <h2 className="text-3xl font-display font-bold text-dark mb-6 border-b pb-3 text-[#1A1A1B]">
                            Beyond the Basics: Why Lighting is the New Symmetry
                        </h2>
                        <p className="leading-relaxed mb-6">
                            In 2D, symmetry is absolute. In 3D, symmetry is often *implied*
                            through optical illusion, and light is the primary tool. Any professional <strong>ambigram
                                generator software</strong> must allow the user granular control over the light source to
                            ensure the shadows correctly define the secondary word.
                        </p>

                        <h3 className="text-2xl font-display font-semibold text-secondary mt-12 mb-4 text-indigo-600">
                            1. Dynamic Lighting: The Key to 3D Ambigram Success
                        </h3>
                        <p className="leading-relaxed mb-6">
                            Using technology like Three.js, our tool simulates real-world
                            physics. You must position the light source carefully:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                            <li><strong>Axial Lighting:</strong> Light sources placed directly on the main rotation axis
                                (180°) will often destroy the effect by minimizing critical shadows.</li>
                            <li><strong>Angled Spotlights:</strong> The best results for <strong>3d lighting
                                ambigram</strong> effects come from spotlights positioned at a 45° vertical
                                angle, maximizing the depth and shadow separation.</li>
                        </ul>

                        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto my-8 font-mono">
                            <code>
                                {`// Three.js Lighting Implementation Concept
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(5, 10, 7); // 45-degree angle emphasis
scene.add(directionalLight);`}
                            </code>
                        </pre>

                        <figure className="my-8 text-center">
                            <img
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/advanced-3d-controls-lighting.webp"
                                alt="Diagram showing the effect of different light source angles on a 3d ambigram model"
                                data-seo-name="advanced-3d-controls-lighting"
                                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                loading="lazy"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2">
                                Diagram showing the effect of different light source angles on a 3d ambigram model.
                            </figcaption>
                        </figure>

                        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 mb-6" role="alert">
                            <p className="font-bold">Material Matters: Glossy vs. Matte</p>
                            <p className="mt-2">
                                The material choice is critical. A glossy metallic finish (High Specularity) dramatically
                                amplifies reflections, sometimes confusing the viewer and breaking the illusion. Conversely,
                                a
                                matte, non-reflective finish (Low Specularity) absorbs ambient light and relies purely on
                                the
                                shadow, making the ambigram effect more reliable for physical 3D prints (see comparison
                                below).
                            </p>
                        </div>

                        <h2 className="text-3xl font-display font-bold text-dark mt-16 mb-6 border-b pb-3 text-[#1A1A1B]">
                            2. Mastering Advanced Ambigram Controls: Rotation and Export
                        </h2>
                        <p className="leading-relaxed mb-6">
                            To truly <strong>create new ambigram generator</strong> designs, you
                            need control over every degree of the X, Y, and Z axes. This is not just for viewing; it&apos;s for
                            preparing the file for specialized manufacturing or high-end rendering.
                        </p>

                        <h3 className="text-2xl font-display font-semibold text-secondary mt-12 mb-4 text-indigo-600">
                            Custom Axis Manipulation
                        </h3>
                        <p className="leading-relaxed mb-6">
                            Most generators force a simple 180° Z-axis rotation. Our
                            <strong>ambigram generator software</strong> allows for minute adjustments. For complex
                            multi-word designs, shifting the rotation center by just 0.5 units along the X-axis can be the
                            difference between failure and success.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-6" role="alert">
                            <p className="font-bold">Expert Warning: Mesh Integrity</p>
                            <p className="mt-2">
                                While many basic tutorials claim you can &quot;create new ambigram generator&quot; effects using
                                simple
                                free 3D software, they lack the underlying geometric mesh optimization. If the initial 2D
                                vector-to-3D extrusion is poor, no amount of manual lighting adjustment will fix the flawed
                                mesh integrity of the final STL file. Use professional-grade tools from the start.
                            </p>
                        </div>

                        <figure className="my-8 text-center">
                            <img
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/ambigram-generator-software-controls.webp"
                                alt="Detailed view of the advanced ambigram controls panel showing rotation axis sliders and material options"
                                data-seo-name="ambigram-generator-software-controls"
                                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                loading="lazy"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2">
                                Detailed view of the advanced ambigram controls panel showing rotation axis sliders and
                                material options.
                            </figcaption>
                        </figure>

                        <div className="text-center mt-16 p-8 bg-primary bg-indigo-600 text-white rounded-xl shadow-lg border border-primary-dark">
                            <h3 className="text-2xl font-display font-bold mb-4 text-white">
                                Master the 3D Environment Today
                            </h3>
                            <p className="text-lg mb-6 text-indigo-100">
                                Ready to move beyond basic 2D? Click here to access the **ambigram generator software** that
                                allows you to easily create new ambigram generator effects by manipulating the 3D
                                environment.
                            </p>
                            <Link href="/"
                                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                Unlock Advanced 3D Ambigram Controls Now!
                            </Link>
                        </div>

                        <figure className="my-8 text-center">
                            <img
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/3d-ambigram-stl-export-quality.webp"
                                alt="Comparison of a low-resolution vs. high-resolution STL export file from ambigram generator software"
                                data-seo-name="3d-ambigram-stl-export-quality"
                                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                loading="lazy"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2">
                                Comparison of a low-resolution vs. high-resolution STL export file from ambigram generator
                                software.
                            </figcaption>
                        </figure>

                        <h2 className="text-3xl font-display font-bold text-dark mt-16 mb-6 border-b pb-3 text-[#1A1A1B]">
                            Conclusion: The Future of Ambigram Design Software
                        </h2>
                        <p className="leading-relaxed mb-6">
                            The <strong>ambigram generator software</strong> of the future must
                            be capable of dynamic 3D rendering. Mastering <strong>advanced ambigram controls</strong> like
                            light and axis is the necessary skill to fully exploit this artistic medium. Stop settling for
                            flat designs and start working in three dimensions.
                        </p>

                        <p className="leading-relaxed mb-6">Ready to leverage these advanced controls?</p>
                        <p className="text-center my-10">
                            <Link href="/"
                                className="inline-block px-8 py-4 bg-secondary bg-green-600 text-white rounded-full text-xl font-bold hover:bg-green-700 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                Unlock Advanced 3D Ambigram Controls Now!
                            </Link>
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
}