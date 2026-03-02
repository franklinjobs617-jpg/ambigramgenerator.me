import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
// 简单的辅助函数模拟 (如果你没有 utils，可以直接用这个)
const DOMAIN = "https://www.ambigramgenerator.me";
const getUrl = (locale: string, path: string) => `${DOMAIN}${locale === 'en' ? '' : `/${locale}`}${path}`;
const getAlternates = (locale: string, path: string) => {
    return {
        canonical: getUrl(locale, path),
        languages: {
            "en": getUrl("en", path),
            "fr": getUrl("fr", path), // 假设你有法语版
            "x-default": getUrl("en", path),
        }
    };
};

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/guide/2d-vs-3d-design";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "2D vs. 3D Ambigram Design: Choosing Your Generator for the Ultimate Effect",
            description: "Master the difference between 2D and 3D ambigram generator tools. Learn when to use a 3d ambigram generator for printing versus a 2d ambigram generator for tattoos."
        },
        fr: {
            title: "Design d'Ambigramme 2D vs 3D : Choisir votre Générateur pour un Effet Ultime",
            description: "Maîtrisez la différence entre les outils de génération d'ambigrammes 2D et 3D. Apprenez quand utiliser un générateur 3D pour l'impression ou un générateur 2D pour les tatouages."
        },
        de: {
            title: "2D vs. 3D Ambigramm-Design: Den richtigen Generator für den ultimativen Effekt wählen",
            description: "Meistern Sie den Unterschied zwischen 2D- und 3D-Ambigramm-Generatoren. Erfahren Sie, wann Sie einen 3D-Generator für den Druck oder einen 2D-Generator für Tattoos verwenden sollten."
        }
    };

    const currentSeo = seoData[locale] || seoData.en;

    return constructMetadata({
        title: currentSeo.title,
        description: currentSeo.description,
        path: path,
        locale: locale,
        image: "https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/2d-3d-ambigram-comparison.webp"
    });
}

export default function GuidePage() {
    return (
        <main>
            {/* Header Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-display font-extrabold mb-4">
                        2D vs. 3D Ambigram Design: When to Choose Your Generator
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto callout">
                        The visual constraints change drastically when moving from flat vectors to three-dimensional models. Choosing the right tool—a
                        <strong> 2d ambigram generator</strong> or a specialized <strong>3d ambigram generator</strong>—is
                        the difference between a successful design and a confusing sculpture.
                    </p>
                </div>
            </section>

            {/* Article Content */}
            <section id="definition" className="pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose lg:prose-xl max-w-none text-gray-700">

                        {/* Section 1: 2D Principles */}
                        <h2 className="text-3xl font-display font-bold text-dark mb-6 border-b pb-3 text-[#1A1A1B]">
                            The Foundation: Understanding 2D Ambigram Principles
                        </h2>
                        <p className="leading-relaxed mb-6">
                            A 2D ambigram (like those created using the <strong>ambigram generator flipscript</strong> setting) relies solely on plane geometry. The
                            design only cares about the X and Y coordinates; depth is irrelevant. This is ideal for logos,
                            tattoos, and graphic design where the output must be a single, flat image.
                        </p>

                        <h3 className="text-2xl font-display font-semibold text-secondary mt-12 mb-4 text-indigo-600">
                            Code Constraint: Planar Rotation
                        </h3>
                        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto my-8">
                            <code>
                                {`// 2D Rotation: Simple Vector Transformation
// The entire vector set is rotated around a single Z-axis pivot point.
function rotate_2d_ambigram(vectors, angle=180) {
    // Rotation matrix applied only to X and Y coordinates.
    return matrix_transform(vectors, angle);
}`}
                            </code>
                        </pre>

                        <figure className="my-8 text-center">
                            <img
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/2d-ambigram-generator-example.webp"
                                alt="A clean, flat 2D ambigram design showing perfect horizontal rotation"
                                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                loading="lazy"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2">
                                A clean, flat 2D ambigram design showing perfect horizontal rotation.
                            </figcaption>
                        </figure>

                        {/* Section 2: 3D Generator */}
                        <h2 className="text-3xl font-display font-bold text-dark mt-16 mb-6 border-b pb-3 text-[#1A1A1B]">
                            The Leap: What Defines a 3D Ambigram Generator?
                        </h2>
                        <p className="leading-relaxed mb-6">
                            The complexity explodes in three dimensions. A true <strong>3d ambigram generator</strong> must account for the Z-axis (depth) and how light
                            interacts with the surface. The word&apos;s identity depends on the *viewpoint* and *lighting
                            angle*, not just rotation.
                        </p>

                        <p className="leading-relaxed mb-6">
                            3D ambigrams are typically realized as sculptures, models for 3D
                            printing, or intricate digital renders. Their application is physical, making them far more
                            challenging to execute than simple 2D vectors.
                        </p>

                        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto my-8">
                            <code>
                                {`// 3D Rotation: Perspective and Shadow Calculation
// The rotation must account for X, Y, and Z axes, plus rendering of shadows.
function render_3d_ambigram(model_data, light_source_angle) {
    // 3D modeling and lighting algorithms are far more intensive.
    // The geometry is often NOT a perfect 180° rotation on one plane.
    return calculate_shadow_and_perspective(model_data, light_source_angle);
}`}
                            </code>
                        </pre>

                        <figure className="my-8 text-center">
                            <img
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/2d-3d-ambigram-comparison.webp"
                                alt="Comparison of a single word in 2D planar rotation versus its 3D volumetric rotation, showing distinct visual effects."
                                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                loading="lazy"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2">
                                We took the simple word &quot;MOM&quot;. In 2D, the transformation is easy—each letter is
                                self-symmetrical. However, in 3D, the geometry must be warped to ensure the shadow or
                                perspective maintains the symmetry from both viewpoints. Observe how the 3D model (see image
                                below) achieves this illusion using non-linear slopes, a feature impossible in the 2D plane.
                            </figcaption>
                        </figure>

                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6" role="alert">
                            <p className="font-bold">[LIGHTING DEPENDENCY WARNING] CRITICAL 3D INSIGHT:</p>
                            <p>
                                Unlike a 2D ambigram, which is perfect regardless of how you print it, a 3D ambigram often
                                fails without proper lighting. The word transformation relies on the shadow cast. A
                                professional <strong>3d ambigram generator</strong> should allow you to preview the design
                                under different light sources before committing to 3D printing, which is a feature often
                                overlooked by free, basic tools.
                            </p>
                        </div>

                        <figure className="my-8 text-center">
                            <img
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/3d-ambigram-generator-render.webp"
                                alt="A complex 3D ambigram sculpture model viewed from two opposing angles, reading different words"
                                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                loading="lazy"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2">
                                A complex 3D ambigram sculpture model viewed from two opposing angles, reading different words.
                            </figcaption>
                        </figure>

                        {/* Section 3: Choosing the Tool */}
                        <h3 className="text-2xl font-display font-semibold text-secondary mt-12 mb-4 text-indigo-600">
                            Choosing the Right Tool for the Job
                        </h3>
                        <p className="leading-relaxed mb-6">
                            If your final product is a digital file or tattoo stencil, stick to
                            a <strong>2d ambigram generator</strong>. If you are planning a physical object (like a desktop
                            ornament or a complex display piece), you need a dedicated <strong>3d ambigram generator</strong> capable of outputting STL or OBJ files.
                        </p>

                        <div className="text-center mt-16 p-8 bg-primary bg-indigo-600 text-white rounded-xl shadow-lg border border-primary-dark">
                            <h3 className="text-2xl font-display font-bold mb-4 text-white">
                                Ready to Experience True 3D Ambigram Art?
                            </h3>
                            <p className="text-lg mb-6">
                                Ready to experience the power of the Z-axis? Test our 3D Ambigram Generator features now by
                                inputting your word and toggling the &apos;3D View&apos; option to see the complex geometry in action.
                            </p>
                            <a href="/"
                                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                Try Our 3D Ambigram Generator
                            </a>
                        </div>

                        <figure className="my-8 text-center">
                            <img
                                src="https://pub-6a88cf89018f42d1a3fa4400f9d3896f.r2.dev/guide-image/3d-printed-ambigram-model.webp"
                                alt="A photo of a finished 3D printed ambigram object showing its physical form"
                                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-xl border border-gray-300"
                                loading="lazy"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2">
                                A photo of a finished 3D printed ambigram object showing its physical form.
                            </figcaption>
                        </figure>

                        <h2 className="text-3xl font-display font-bold text-dark mt-16 mb-6 border-b pb-3 text-[#1A1A1B]">
                            Conclusion: The Ultimate Ambigram Dimension
                        </h2>
                        <p className="leading-relaxed mb-6">
                            Both 2D and <strong>3d ambigram generator</strong> tools serve
                            crucial, distinct purposes. 2D offers portable clarity; 3D offers an interactive, physical
                            experience. Understanding the geometric demands of each is the key to maximizing your design
                            success.
                        </p>

                        <p className="leading-relaxed mb-6">Ready to try creating a model that works in three dimensions?</p>
                        <p className="text-center my-10">
                            <a href="/"
                                className="inline-block px-8 py-4 bg-secondary bg-green-600 text-white rounded-full text-xl font-bold hover:bg-green-700 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                                Test our 3D Ambigram Generator features now!
                            </a>
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
}