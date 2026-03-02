import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Generator3d from "@/components/Generator3d";
import { constructMetadata } from "@/lib/seo";
import {
    Box,
    Sparkles,
    Zap,
    Gift,
    GraduationCap,
    Download,
    Cpu,
    MousePointer2,
    ChevronRight,
    HelpCircle,
    PlayCircle
} from "lucide-react";


type Props = {
    params: { locale: string };
};

// 1. SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/3d-generator"; // 当前页面路径

    // 定义多语言文案
    const seo: Record<string, { title: string; description: string }> = {
        en: {
            title: "3D Ambigram Generator: Free STL File, 3D Printing & GIF Creator",
            description: "Use our dedicated 3D ambigram generator to create rotational designs for 3D printing. Download high-quality STL files, GIF previews, and get printing tips."
        },
        fr: {
            title: "Générateur d'Ambigramme 3D : Fichiers STL Gratuits et Impression 3D",
            description: "Utilisez notre générateur d'ambigrammes 3D pour créer des designs pour l'impression 3D. Téléchargez des fichiers STL, des aperçus GIF et obtenez des conseils d'impression."
        },
        de: {
            title: "3D Ambigramm Generator: Kostenlose STL-Dateien & 3D-Druck Creator",
            description: "Erstellen Sie mit unserem 3D-Ambigramm-Generator Designs für den 3D-Druck. Laden Sie hochwertige STL-Dateien und GIF-Vorschauen kostenlos herunter."
        }
    };

    const current = seo[locale] || seo.en;

    // 使用工具函数生成包含 Canonical, Hreflang, OpenGraph 的完整元数据
    return constructMetadata({
        title: current.title,
        description: current.description,
        path: path,
        locale: locale
    });
}

export default async function ThreeDGeneratorPage({ params }: Props) {
    const { locale } = await params;

    // 🌟 JSON-LD 结构化数据 (SoftwareApplication)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "3D Ambigram Generator",
        "operatingSystem": "Web",
        "applicationCategory": "DesignApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Create rotational designs for 3D printing. Download high-quality STL files and GIF previews."
    };

    const FaqBox = ({ q, a }: { q: string, a: string }) => (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                <HelpCircle className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                {q}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed ml-8">{a}</p>
        </div>
    );

    // ========================================================================
    // 法语版本 (French)
    // ========================================================================
    // ========================================================================
    // 🇫🇷 法语版本 (French Version)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                {/* Header Section (FR) */}
                <section className="bg-[#1A1A1B] text-white py-24 lg:py-36 px-6 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/15 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto text-center max-w-5xl space-y-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                            <Zap size={14} className="fill-current" /> Ingénierie Avancée
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white">
                            Donnez vie à vos mots <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600">en relief 3D</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            Créez des ambigrammes 3D interactifs pour l&apos;impression 3D. Téléchargez instantanément des <strong>fichiers STL</strong> ou des <strong>GIFs</strong> animés gratuitement.
                        </p>
                        <div className="pt-6">
                            <Link href="#generator-tool" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95">
                                Commencer à Générer <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* What Can You Create? (FR) */}
                <section className="py-12 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-24 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Que pouvez-vous créer ?</h2>
                            <p className="text-slate-500 text-lg font-medium">Transformez vos mots en objets tangibles et fascinants.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                    <Box size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Art de Bureau Unique</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Créez une pièce décorative qui révèle un secret lors de sa rotation à 180 degrés.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                                    <Gift size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Cadeaux Personnalisés</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Fusionnez deux prénoms ou mots significatifs en un seul bel objet physique.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                    <GraduationCap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Modèles Éducatifs</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Idéal pour les makerspaces afin de démontrer les principes de symétrie et de géométrie.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Generator Tool (FR) */}
                <section id="generator-tool" className="py-20 px-6 mt-24">
                    <div className="container mx-auto max-w-7xl bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                        <div className="relative group w-full h-full  bg-slate-950">
                            <Generator3d />
                            <div className="absolute bottom-10 right-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                                <div className="bg-indigo-600/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                                    <MousePointer2 size={12} /> Interaction Activée
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Science Section (FR) */}
                <section className="py-40 bg-white border-t border-slate-50 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-10 text-left">
                                <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Fonctionnement du <br /><span className="text-indigo-600">Générateur STL</span></h2>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed">Notre générateur utilise un algorithme spécialisé qui calcule les trajectoires d&apos;extrusion optimales et la géométrie des ombres pour la lisibilité physique.</p>
                                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200/50 shadow-inner">
                                    <p className="text-slate-600 text-sm leading-relaxed m-0 font-medium italic underline decoration-indigo-200 decoration-4 underline-offset-8">
                                        Le logiciel utilise une <strong>technique de section transversale</strong> pour générer le corps solide. Cela crée un fichier STL propre, optimisé pour les imprimantes FDM et SLA.
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-10 bg-indigo-600/5 rounded-full blur-[100px] -z-10" />
                                <Image src="/images/3d-printed-object-demo.webp" alt="Ambigramme imprimé en 3D" width={600} height={400} className="rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-white w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section (FR) */}
                <section className="py-32 bg-[#F8FAFC]">
                    <div className="container mx-auto max-w-4xl px-6 text-center">
                        <h2 className="text-4xl font-black mb-16 tracking-tight">FAQ du Générateur 3D</h2>
                        <div className="space-y-6 text-left">
                            <FaqBox
                                q="Qu'est-ce qu'un fichier STL ?"
                                a="Le STL est le format standard pour l'impression 3D. Utilisez un logiciel de 'slicing' comme Cura ou PrusaSlicer pour préparer votre modèle."
                            />
                            <FaqBox
                                q="Pourquoi créer un GIF d'abord ?"
                                a="L'aperçu GIF animé vous permet de vérifier l'illusion visuelle sous les deux angles avant de lancer une impression physique de plusieurs heures."
                            />
                            <FaqBox
                                q="Puis-je utiliser deux mots différents ?"
                                a="Oui ! Notre générateur est conçu pour fusionner n'importe quels deux mots en un seul objet géométrique cohérent."
                            />
                        </div>
                    </div>
                </section>
            </main>
        );
    }
    // ========================================================================
    // 德语版本 (German)
    // ========================================================================
    // ========================================================================
    // 🇩🇪 德语版本 (German Version)
    // ========================================================================
    if (locale === 'de') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                {/* Header Section (DE) */}
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center px-6 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/15 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto max-w-5xl space-y-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                            <Zap size={14} className="fill-current" /> High-End-Technik
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
                            Erlebe deine Worte <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600">in echter 3D-Dimension</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            Erstellen Sie atemberaubende, interaktive 3D-Ambigramme für den 3D-Druck. Laden Sie druckfertige <strong>STL-Dateien</strong> oder animierte <strong>GIFs</strong> sofort kostenlos herunter.
                        </p>
                        <div className="pt-6">
                            <Link href="#generator-tool" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95">
                                Jetzt Generator starten <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* What Can You Create? (DE) */}
                <section className="py-12 px-6">
                    <div className="container mx-auto max-w-7xl text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-20">Was kannst du erschaffen?</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                    <Box size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Einzigartige Schreibtischkunst</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Ein faszinierendes Objekt für dein Büro, das erst beim Drehen sein Geheimnis preisgibt.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                                    <Gift size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Persönliche Geschenke</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Verschmelzen Sie zwei Namen oder bedeutungsvolle Worte zu einem wunderschönen 3D-Objekt.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                    <GraduationCap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Bildungsmodelle</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Perfekt für Makerspaces, um Prinzipien der Geometrie und des 3D-Drucks spielerisch zu lehren.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Generator Component Container (DE) */}
                <section id="generator-tool" className="py-20 px-6 mt-24">
                    <div className="container mx-auto max-w-7xl bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden w-full h-full  bg-slate-950">
                        <Generator3d />
                    </div>
                </section>

                {/* Science Section (DE) */}
                <section className="py-40 bg-white border-t border-slate-50 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-10 text-left text-[#1A1A1B]">
                                <h2 className="text-5xl font-black tracking-tight leading-tight">Wie der STL <br /><span className="text-indigo-600">Generator funktioniert</span></h2>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed">Unser Generator nutzt einen spezialisierten Algorithmus, der optimale Extrusionspfade und Schattengeometrien für physische Lesbarkeit berechnet.</p>
                                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200/50 shadow-inner">
                                    <p className="text-slate-600 text-sm leading-relaxed m-0 font-medium italic underline decoration-indigo-200 decoration-4 underline-offset-8">
                                        Die Software nutzt eine <strong>Querschnittstechnik</strong>, um den soliden Körper zu erzeugen. Dies schafft eine saubere STL-Datei, optimiert für FDM- und SLA-Drucker.
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <Image src="/images/3d-printed-object-demo.webp" alt="Physisches Ambigramm Modell" width={600} height={400} className="rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-white w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section (DE) */}
                <section className="py-32 bg-[#F8FAFC]">
                    <div className="container mx-auto max-w-4xl px-6 text-center">
                        <h2 className="text-4xl font-black mb-16 tracking-tight">Häufig gestellte Fragen (3D)</h2>
                        <div className="space-y-6 text-left text-[#1A1A1B]">
                            <FaqBox
                                q="Was ist eine STL-Datei?"
                                a="STL ist das Standardformat für den 3D-Druck. Nutzen Sie Slicer-Programme wie Cura, um das Modell für Ihren Drucker vorzubereiten."
                            />
                            <FaqBox
                                q="Warum erst ein GIF rendern?"
                                a="Die GIF-Vorschau ermöglicht es Ihnen, die optische Täuschung aus beiden Winkeln zu prüfen, bevor Sie einen stundenlangen Druck starten."
                            />
                        </div>
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

            {/* Header Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent -z-10" />
                <div className="container mx-auto text-center max-w-5xl space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                        <Zap size={14} className="fill-current" /> Advanced Engineering
                    </div>
                    <h1 className="text-2xl md:text-6xl font-black tracking-tight leading-[0.95]">
                        Bring Your Words <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600">to Life in 3D</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                        Create stunning, interactive 3D ambigrams for 3D printing. Download print-ready <strong>STL files</strong> or animated <strong>GIFs</strong> instantly.
                    </p>
                    <div className="pt-6">
                        <Link href="#generator-tool" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95">
                            Start Generating Now <ChevronRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Bento Grid */}
            <section className="py-12 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">What Can You Create?</h2>
                        <p className="text-slate-500 text-lg font-medium">Tangible, mind-bending objects for any occasion.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                <Box size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Unique Desk Art</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Create a conversation-starting piece that reveals its secret upon rotation.</p>
                        </div>
                        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                                <Gift size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Personalized Gifts</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Design a special gift by merging two names or words into one object.</p>
                        </div>
                        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                <GraduationCap size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Educational Models</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Perfect for makerspaces to demonstrate symmetry and 3D printing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Generator Integration Section */}
            <section id="generator-tool" className="py-20 px-6 mt-24">
                <div className="container mx-auto max-w-7xl bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                    {/* The Component Wrapper */}
                    <div className="relative group w-full h-full  bg-slate-950">
                        <Generator3d />
                        <div className="absolute bottom-10 right-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-indigo-600/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                                <MousePointer2 size={12} /> Interaction Enabled
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Science Section */}
            <section className="py-40 bg-white border-t border-slate-50 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10 text-left">
                            <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">How the STL <br /><span className="text-indigo-600">Generator Works</span></h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">Our 3D generator uses a specialized algorithm that calculates optimal extrusion paths and shadow geometry necessary for physical legibility.</p>
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200/50 shadow-inner">
                                <p className="text-slate-600 text-sm leading-relaxed m-0 font-medium italic underline decoration-indigo-200 decoration-4 underline-offset-8">
                                    The software utilizes a <strong>cross-sectioning technique</strong> to generate the solid body. This creates a clean, watertight STL file perfectly optimized for FDM and SLA printers.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-10 bg-indigo-600/5 rounded-full blur-[100px] -z-10" />
                            <Image src="/images/3d-printed-object-demo.webp" alt="3D Printed Ambigram" width={600} height={400} className="rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-white w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Area */}
            <section className="py-32 bg-[#F8FAFC]">
                <div className="container mx-auto max-w-4xl px-6">
                    <h2 className="text-4xl font-black mb-16 text-center tracking-tight">3D Generation FAQ</h2>
                    <div className="space-y-6">
                        <FaqBox q="What is an STL file?" a="STL is the standard format for 3D printing. Use a slicer program like Cura or PrusaSlicer to prepare the downloaded model for your printer." />
                        <FaqBox q="Why render a GIF first?" a="The animated GIF allows you to verify the visual illusion from both angles before committing to a multi-hour physical print." />
                        <FaqBox q="Can I use custom text?" a="Yes! Our generator is designed to map any two words you provide into a single geometrical object." />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 bg-slate-950 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter italic">Ready to Print?</h2>
                <Link href="/generator" className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-2xl active:scale-95">
                    <PlayCircle size={24} /> Create Your 3D Art Now
                </Link>
            </section>
        </main>
    );
}

// 模拟动态占位组件
const motion_h1_placeholder = ({ children, className }: any) => <h1 className={className}>{children}</h1>;