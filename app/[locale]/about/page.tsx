import type { Metadata } from "next";
import Link from "next/link";
import {
    Lightbulb,
    GitFork,
    Type,
    Box,
    BookOpen,
    Users,
} from "lucide-react";
import { constructMetadata } from "@/lib/seo";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/about";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "About Us | AmbigramGenerator.me",
            description: "Learn about AmbigramGenerator.me, our vision, the open-source technology we use, and our commitment to content and community."
        },
        fr: {
            title: "À propos de nous | AmbigramGenerator.me",
            description: "Découvrez AmbigramGenerator.me, notre vision, la technologie open-source que nous utilisons et notre engagement envers la communauté."
        },
        de: {
            title: "Über uns | AmbigramGenerator.me",
            description: "Erfahren Sie mehr über AmbigramGenerator.me, unsere Vision, die genutzte Open-Source-Technologie und unser Engagement für die Community."
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

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    // ========================================================================
    // 内容渲染逻辑 (If/Else 渲染)
    // ========================================================================



    if (locale === 'fr') {
        return (
            <main className="">

                <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-24 border-b border-indigo-100/50">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-2xl md:text-5xl font-black text-[#1A1A1B] tracking-tight mb-4">

                            About AmbigramGenerator.me
                        </h1>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-16">
                            <aside className="lg:w-1/4 lg:sticky lg:top-32 h-fit">
                                <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                    <h3 className="font-black text-slate-900 mb-4 px-2 uppercase tracking-widest text-xs text-indigo-600">Sur cette page</h3>
                                    <Link href="#vision" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Notre Vision</Link>
                                    <Link href="#technology" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Technologie Open Source</Link>
                                    <Link href="#section-2d-engine" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Moteur 2D</Link>
                                    <Link href="#section-3d-engine" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Moteur 3D</Link>
                                    <Link href="#content" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Contenu et Expertise</Link>
                                    <Link href="#community" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Communauté</Link>
                                </nav>
                            </aside>

                            <div className="lg:w-3/4 ">
                                <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                                    <div id="vision" className="mt-12">
                                        <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><Lightbulb className="text-indigo-600" /> Notre Vision : Redéfinir la Typographie</h2>
                                        <p>Chez AmbigramGenerator.me, nous croyons que la typographie doit être dynamique, artistique et accessible à tous. Notre vision centrale est de transformer un texte statique en illusions d&apos;optique captivantes — les ambigrammes — qui défient la perception et célèbrent la créativité. Nous visons à être la ressource en ligne de référence pour les novices comme pour les designers chevronnés.</p>
                                    </div>

                                    <div id="technology" className="mt-12">
                                        <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><GitFork className="text-indigo-600" /> La Technologie derrière la Magie : Engagement Open Source</h2>
                                        <p>Nous croyons en la transparence. Si notre design d&apos;expérience utilisateur (UX) et l&apos;optimisation des performances sont gérés en interne, la puissance de calcul brute est alimentée par des efforts communautaires exceptionnels. Nous sommes fiers d&apos;utiliser les projets open-source suivants :</p>
                                    </div>

                                    <div id="section-2d-engine" className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mt-12">
                                        <h3 className="text-xl lg:text-2xl font-black text-indigo-600 mt-0 flex items-center gap-3"><Type /> Moteur de Génération 2D</h3>
                                        <p>Notre moteur de rendu 2D fondateur est basé sur le travail innovant partagé par :</p>
                                        <ul className="list-disc pl-6 space-y-2 font-medium">
                                            <li><strong>Dépôt Source :</strong> <Link href="https://github.com/TheDressedMoleRat/thedressedmolerat.github.io" className="text-indigo-600 underline">TheDressedMoleRat</Link></li>
                                            <li><strong>Contribution :</strong> Ce projet fournit les algorithmes de base pour créer des ambigrammes 2D symétriques et rotationnels.</li>
                                        </ul>
                                    </div>

                                    <div id="section-3d-engine" className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mt-12">
                                        <h3 className="text-xl lg:text-2xl font-black text-indigo-600 mt-0 flex items-center gap-3"><Box /> Moteur de Visualisation 3D</h3>
                                        <p>Pour nos ambigrammes 3D immersifs, nous utilisons l&apos;une des bibliothèques JavaScript 3D les plus puissantes au monde :</p>
                                        <ul className="list-disc pl-6 space-y-2 font-medium">
                                            <li><strong>Dépôt Source :</strong> <Link href="https://github.com/mrdoob/three.js" className="text-indigo-600 underline">mrdoob/three.js</Link></li>
                                            <li><strong>Contribution :</strong> Three.js nous permet de rendre des transformations géométriques complexes dans le navigateur.</li>
                                        </ul>
                                    </div>

                                    <div id="content" className="mt-12">
                                        <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><BookOpen className="text-indigo-600" /> Au-delà des Outils : Création de Contenu de Valeur</h2>
                                        <p>Un outil ne vaut que par les informations qui l&apos;entourent. Nous nous engageons à publier du contenu original approfondi :</p>
                                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                                <h4 className="font-black mb-2">Tutoriels</h4>
                                                <p className="text-sm m-0">Guides étape par étape pour affiner vos créations.</p>
                                            </div>
                                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                                <h4 className="font-black mb-2">Théorie</h4>
                                                <p className="text-sm m-0">Exploration de l&apos;histoire et des styles (miroir, rotation).</p>
                                            </div>
                                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                                <h4 className="font-black mb-2">Showcase</h4>
                                                <p className="text-sm m-0">Mise en avant des meilleures applications réelles.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="community" className="bg-gradient-to-br from-slate-900 to-[#1A1A1B] text-white p-12 rounded-[3rem] shadow-2xl mt-12">
                                        <h2 className="text-3xl font-black text-white mt-0 flex items-center gap-4"><Users className="text-indigo-400" /> Rejoignez Notre Communauté</h2>
                                        <p className="text-slate-300 font-medium leading-relaxed">Vos suggestions guident nos mises à jour. Si vous avez une demande de fonctionnalité ou un rapport de bug, n&apos;hésitez pas à nous contacter. Nous faisons évoluer la plateforme en fonction de vos besoins réels.</p>
                                        <p className="text-indigo-300 font-black mt-6 m-0 text-xl italic">Merci de créer avec nous !</p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    } else if (locale === 'de') {
        return (
            <main className="bg-[#FDFDFF]">

                <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-24 border-b border-indigo-100/50">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-2xl md:text-5xl font-black text-[#1A1A1B] tracking-tight mb-4">

                            About AmbigramGenerator.me
                        </h1>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-16">
                            <aside className="lg:w-1/4 lg:sticky lg:top-32 h-fit">
                                <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                    <h3 className="font-black text-slate-900 mb-4 px-2 uppercase tracking-widest text-xs text-indigo-600">Auf dieser Seite</h3>
                                    <Link href="#vision" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Unsere Vision</Link>
                                    <Link href="#technology" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Open-Source-Technologie</Link>
                                    <Link href="#section-2d-engine" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">2D-Engine</Link>
                                    <Link href="#section-3d-engine" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">3D-Engine</Link>
                                    <Link href="#content" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Inhalte & Expertise</Link>
                                    <Link href="#community" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Community</Link>
                                </nav>
                            </aside>

                            <div className="lg:w-3/4 ">
                                <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                                    <div id="vision" className="mt-12">
                                        <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><Lightbulb className="text-indigo-600" /> Unsere Vision: Typografie neu definieren</h2>
                                        <p>Bei AmbigramGenerator.me glauben wir, dass Typografie dynamisch, künstlerisch und für jeden zugänglich sein sollte. Unsere Kernvision ist es, statischen Text in faszinierende optische Täuschungen — Ambigramme — zu verwandeln, die die Wahrnehmung herausfordern und Kreativität feiern. Wir streben danach, die ultimative Online-Ressource für Amateure und erfahrene Designer zu sein.</p>
                                    </div>

                                    <div id="technology" className="mt-12">
                                        <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><GitFork className="text-indigo-600" /> Die Technologie dahinter: Engagement für Open Source</h2>
                                        <p>Wir glauben an Transparenz. Während UX-Design und Site-Performance intern verwaltet werden, wird die Rechenleistung durch außergewöhnliche Community-Bemühungen ermöglicht. Wir sind stolz darauf, die folgenden Open-Source-Projekte zu nutzen:</p>
                                    </div>

                                    <div id="section-2d-engine" className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mt-12">
                                        <h3 className="text-xl lg:text-2xl font-black text-indigo-600 mt-0 flex items-center gap-3"><Type /> 2D Ambigramm-Generierungs-Engine</h3>
                                        <p>Unsere grundlegende 2D-Engine basiert auf der innovativen Arbeit von:</p>
                                        <ul className="list-disc pl-6 space-y-2 font-medium">
                                            <li><strong>Repository:</strong> <Link href="https://github.com/TheDressedMoleRat/thedressedmolerat.github.io" className="text-indigo-600 underline">TheDressedMoleRat</Link></li>
                                            <li><strong>Beitrag:</strong> Dieses Projekt liefert die Kernalgorithmen für symmetrische und rotationale 2D-Ambigramme.</li>
                                        </ul>
                                    </div>

                                    <div id="section-3d-engine" className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mt-12">
                                        <h3 className="text-xl lg:text-2xl font-black text-indigo-600 mt-0 flex items-center gap-3"><Box /> 3D Ambigramm-Visualisierungs-Engine</h3>
                                        <p>Für unsere immersiven 3D-Ambigramme nutzen wir eine der weltweit leistungsstärksten JavaScript-3D-Bibliotheken:</p>
                                        <ul className="list-disc pl-6 space-y-2 font-medium">
                                            <li><strong>Repository:</strong> <Link href="https://github.com/mrdoob/three.js" className="text-indigo-600 underline">mrdoob/three.js</Link></li>
                                            <li><strong>Beitrag:</strong> Three.js ermöglicht uns komplexe geometrische Transformationen direkt im Browser.</li>
                                        </ul>
                                    </div>

                                    <div id="content" className="mt-12">
                                        <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><BookOpen className="text-indigo-600" /> Mehr als Tools: Wertvolle Inhalte schaffen</h2>
                                        <p>Ein Tool ist nur so gut wie die Informationen darüber. Wir veröffentlichen tiefgreifende, originelle Inhalte:</p>
                                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                                <h4 className="font-black mb-2">Tutorials</h4>
                                                <p className="text-sm m-0">Schritt-für-Schritt-Anleitungen zur Verfeinerung Ihrer Ambigramme.</p>
                                            </div>
                                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                                <h4 className="font-black mb-2">Theorie</h4>
                                                <p className="text-sm m-0">Erkundung von Geschichte und Stilen (Spiegelung, Rotation).</p>
                                            </div>
                                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                                <h4 className="font-black mb-2">Showcase</h4>
                                                <p className="text-sm m-0">Erfolgreiche reale Anwendungen von Ambigrammen.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="community" className="bg-gradient-to-br from-slate-900 to-[#1A1A1B] text-white p-12 rounded-[3rem] shadow-2xl mt-12">
                                        <h2 className="text-3xl font-black text-white mt-0 flex items-center gap-4"><Users className="text-indigo-400" /> Treten Sie unserer Community bei</h2>
                                        <p className="text-slate-300 font-medium leading-relaxed">Vorschläge treiben unsere Updates an. Wenn Sie Funktionswünsche oder Fehlerberichte haben, kontaktieren Sie uns bitte. Wir entwickeln die Plattform basierend auf echten Nutzerbedürfnissen ständig weiter.</p>
                                        <p className="text-indigo-300 font-black mt-6 m-0 text-xl italic">Vielen Dank für Ihren Besuch!</p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 英语版本 (Default / English Version) - 100% 完整原文
    // ========================================================================
    return (
        <main className="bg-[#FDFDFF]">

            <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-24 border-b border-indigo-100/50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl md:text-5xl font-black text-[#1A1A1B] tracking-tight mb-4">
                        About AmbigramGenerator.me
                    </h1>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Table of Contents */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-32 h-fit">
                            <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h3 className="font-black text-slate-900 mb-4 px-2 uppercase tracking-widest text-xs text-indigo-600">On this page</h3>
                                <Link href="#vision" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Our Vision</Link>
                                <Link href="#technology" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Open Source Commitment</Link>
                                <Link href="#section-2d-engine" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">2D Engine</Link>
                                <Link href="#section-3d-engine" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">3D Engine</Link>
                                <Link href="#content" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Valuable Content</Link>
                                <Link href="#community" className="block p-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Join Us</Link>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:w-3/4 ">
                            <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                                <div id="vision" className="mt-2">
                                    <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><Lightbulb className="text-indigo-600" /> Our Vision: Redefining Typography</h2>
                                    <p>At AmbigramGenerator.me, we believe typography should be dynamic, artistic, and accessible to everyone. Our core vision is to transform static text into captivating optical illusions—ambigrams—that challenge perception and celebrate creativity. We aim to be the definitive resource online for exploring this unique art form.</p>
                                </div>

                                <div id="technology" className="mt-12">
                                    <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><GitFork className="text-indigo-600" /> The Technology Behind the Magic: Commitment to Open Source</h2>
                                    <p>We believe in transparency and giving credit where credit is due. While our UX design and site performance optimization are handled in-house, the heavy computational lifting is powered by exceptional community efforts. We proudly acknowledge the following key projects:</p>
                                </div>

                                <div id="section-2d-engine" className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mt-12">
                                    <h3 className="text-xl lg:text-2xl font-black text-indigo-600 mt-0 flex items-center gap-3"><Type /> 2D Ambigram Generation Engine</h3>
                                    <p>Our foundational 2D rendering engine is based on the innovative work shared by:</p>
                                    <ul className="list-disc pl-6 space-y-2 font-medium">
                                        <li><strong>Source Repository:</strong> <Link href="https://github.com/TheDressedMoleRat/thedressedmolerat.github.io" className="text-indigo-600 underline">TheDressedMoleRat</Link></li>
                                        <li><strong>Contribution:</strong> This project provides the core algorithms necessary for creating symmetrical and rotational 2D ambigrams.</li>
                                    </ul>
                                </div>

                                <div id="section-3d-engine" className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mt-12">
                                    <h3 className="text-xl lg:text-2xl font-black text-indigo-600 mt-0 flex items-center gap-3"><Box /> 3D Ambigram Visualization Engine</h3>
                                    <p>For our interactive and immersive 3D ambigrams, we utilize one of the world&apos;s most powerful JavaScript 3D libraries:</p>
                                    <ul className="list-disc pl-6 space-y-2 font-medium">
                                        <li><strong>Source Repository:</strong> <Link href="https://github.com/mrdoob/three.js" className="text-indigo-600 underline">mrdoob/three.js</Link></li>
                                        <li><strong>Contribution:</strong> Three.js enables us to render complex geometric transformations and provide a fluid viewing experience.</li>
                                    </ul>
                                </div>

                                <div id="content" className="mt-12">
                                    <h2 className="text-xl lg:text-3xl font-black text-[#1A1A1B] flex items-center gap-4"><BookOpen className="text-indigo-600" /> Beyond the Tools: Creating Valuable Content</h2>
                                    <p>A tool is only as good as the information surrounding it. To provide genuine value, we are committed to publishing in-depth, original content:</p>
                                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                            <h4 className="font-black mb-2 text-slate-900">Tutorials</h4>
                                            <p className="text-sm m-0 text-slate-500">Step-by-step guides on how to refine your output.</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                            <h4 className="font-black mb-2 text-slate-900">Theory</h4>
                                            <p className="text-sm m-0 text-slate-500">Exploring history, styles, and typographic challenges.</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                            <h4 className="font-black mb-2 text-slate-900">Showcases</h4>
                                            <p className="text-sm m-0 text-slate-500">Featuring successful real-world applications.</p>
                                        </div>
                                    </div>
                                </div>

                                <div id="community" className="bg-gradient-to-br from-slate-900 to-[#1A1A1B] text-white p-12 rounded-[3rem] shadow-2xl mt-12 group">
                                    <h2 className="text-3xl font-black text-white mt-0 flex items-center gap-4"><Users className="text-indigo-400 group-hover:scale-110 transition-transform" /> Join Our Community</h2>
                                    <p className="text-slate-300 font-medium leading-relaxed">We value user feedback highly. Your suggestions drive our updates. If you have a feature request or an idea for a new article, please reach out. We are continuously evolving the platform.</p>
                                    <p className="text-indigo-300 font-black mt-6 m-0 text-xl italic tracking-tight underline decoration-indigo-500/30 underline-offset-8">Thank you for visiting and creating with us!</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}