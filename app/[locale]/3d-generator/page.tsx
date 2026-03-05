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
    PlayCircle,
    Key,
    Printer,
    Layers,
    Settings,
    Feather
} from "lucide-react";

type Props = {
    params: Promise<{ locale: string }>
};

// 1. SEO Metadata (保持优化后的 TDK)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/3d-generator";

    const seo: Record<string, { title: string; description: string }> = {
        en: {
            title: "Free 3D Text to STL Generator & Ambigram Creator", // H1 对应
            description: "Convert text to STL files for 3D printing freely. Create dual-perspective ambigrams, custom name keychains, and 3D desk plates without CAD skills."
        },
        fr: {
            title: "Générateur Texte vers STL : Ambigramme 3D & Porte-clés Gratuit",
            description: "Convertissez du texte en fichier STL pour l'impression 3D. Créez des ambigrammes, des porte-clés personnalisés et des plaques de bureau sans logiciel CAO."
        },
        de: {
            title: "Text zu STL Generator: Kostenloser 3D Ambigramm & Schlüsselanhänger Maker",
            description: "Wandeln Sie Text in STL-Dateien um. Erstellen Sie 3D-Ambigramme, individuelle Schlüsselanhänger und Namensschilder ohne CAD-Kenntnisse."
        }
    };

    const current = seo[locale] || seo.en;

    return constructMetadata({
        title: current.title,
        description: current.description,
        path: path,
        locale: locale
    });
}

export default async function ThreeDGeneratorPage({ params }: Props) {
    const { locale } = await params;

    // 🌟 JSON-LD 1: SoftwareApplication (工具本体)
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Text to STL Ambigram Generator",
        "operatingSystem": "Web",
        "applicationCategory": "DesignApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": "Text to STL conversion, 3D Keychain Maker, Dual-Word Ambigram, Watertight Mesh",
        "description": "Free online tool to convert text into dual-perspective 3D models and STL files for printing."
    };

    // 🌟 JSON-LD 2: FAQPage (新增：为了抢占 SERP 问答位)
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the best font size for 3D printing?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For standard 0.4mm nozzles, we recommend a minimum font thickness of 3mm. Our generator automatically optimizes wall thickness to ensure your Ambigram doesn't break."
                }
            },
            {
                "@type": "Question",
                "name": "How do I fix 3D printed letters falling over?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Adhesion issues are common. Use a brim or raft in your slicer (Cura/PrusaSlicer). Our generator also creates a flat base option which guarantees stability without supports."
                }
            },
            {
                "@type": "Question",
                "name": "Can I print these STL files with Resin?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! The STL files are watertight high-quality meshes, perfect for both FDM (PLA/PETG) and SLA/Resin printers."
                }
            }
        ]
    };

    // 优化的 FAQ 组件：使用 H3 作为标题
    const FaqBox = ({ q, a }: { q: string, a: string }) => (
        <article className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                <HelpCircle className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
                {q}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed ml-8">{a}</p>
        </article>
    );

    // ========================================================================
    // 🇫🇷 法语 & 🇩🇪 德语 (保持原样，重点优化英语)
    // 为节省篇幅，此处省略 FR/DE 代码，实际部署时请保留你原来的 FR/DE 代码块
    // 如果需要我也贴出 FR/DE 的优化版，请告诉我。
    // 下面重点展示经过“大师级诊断”重构的英语版本。
    // ========================================================================
    // ========================================================================
    // 🇫🇷 法语版本 (French Version)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
    // 🇺🇸 英语版本 (Default / English) - 深度优化版
    // ========================================================================
    return (
        <main className="bg-[#FDFDFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Section 1: Hero (H1) */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent -z-10" />
                <div className="container mx-auto text-center max-w-5xl space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                        <Printer size={14} className="fill-current" /> Free 3D Printing Tool
                    </div>
                    {/* H1: 完美覆盖核心词 Text to STL & Ambigram */}
                    <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.05]">
                        Free 3D Text to STL Generator <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600">& Ambigram Creator</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                        Convert words into ready-to-print 3D models. Create custom <strong>keychains</strong>, <strong>desk name plates</strong>, and dual-perspective illusions without CAD skills.
                    </p>
                    <div className="pt-6">
                        <Link href="#generator-tool" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95">
                            Create STL File Now <ChevronRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section 2: Creative Ideas (H2 -> H3) - 语义增强：Ambigram */}
            <section className="py-12 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-24 space-y-4">
                        {/* H2: 引导应用场景 */}
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Creative Ideas: What Can You 3D Print with Text?</h2>
                        <p className="text-slate-500 text-lg font-medium">From functional tags to mind-bending art.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* H3: Keychains */}
                        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                <Key size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Custom 3D Keychains & Name Tags</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Enable the "Loop" mode to create personalized PLA or PETG keychains instantly.</p>
                        </div>
                        {/* H3: Name Plates */}
                        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                                <Box size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Professional Desk Name Plates</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Generate "Dual-View" name plates. A perfect desk accessory that shows your name and title.</p>
                        </div>
                        {/* H3: Ambigram Gifts - 补全 Ambigram 关键词 */}
                        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                <Gift size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Mind-Blowing Ambigram & Optical Illusion Gifts</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">Create a 90-degree illusion. The ultimate unique gift for makers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Generator Tool */}
            <section id="generator-tool" className="py-20 px-6 mt-24">
                <div className="container mx-auto max-w-7xl relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-t-xl font-bold text-sm tracking-widest uppercase z-10 shadow-lg">
                        New: Keychain Loop Mode
                    </div>
                    <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                        <div className="relative group w-full h-full bg-slate-950">
                            <Generator3d />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Step-by-Step (H2 -> H3) - 增加切片软件关键词 */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Tutorial</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Step-by-Step: How to Use the Word to STL Generator</h2>
                        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">From text to physical object in minutes.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 relative">
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

                        {/* H3 Step 1 */}
                        <div className="relative md:text-right pr-0 md:pr-12">
                            <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">1</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Step 1: Input & Customize Your Text</h3>
                            <p className="text-slate-600">Enter two words. Toggle "Keychain Loop" for hanging items. Adjust spacing for readability.</p>
                        </div>
                        <div className="md:block hidden" />

                        {/* H3 Step 2 */}
                        <div className="md:block hidden" />
                        <div className="relative pl-12 md:pl-12">
                            <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">2</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Step 2: Download Your Optimized STL File</h3>
                            <p className="text-slate-600">Get a water-tight STL file. Our algorithm ensures the Ambigram mesh is manifold and print-ready.</p>
                        </div>

                        {/* H3 Step 3 - LSI: Cura, PrusaSlicer */}
                        <div className="relative md:text-right pr-0 md:pr-12">
                            <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">3</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Step 3: Slice for Your Printer (FDM/Resin)</h3>
                            <p className="text-slate-600">Import STL into <strong>Cura, PrusaSlicer, or Bambu Studio</strong>. Orient flat on the bed for maximum adhesion.</p>
                        </div>
                        <div className="md:block hidden" />

                        {/* H3 Step 4 */}
                        <div className="md:block hidden" />
                        <div className="relative pl-12 md:pl-12">
                            <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">4</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Step 4: Print & Showcase Your Work</h3>
                            <p className="text-slate-600">Start printing. Share your dual-perspective 3D text on social media!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Pro Settings (H2 -> H3 -> H4) - 严谨的层级结构 */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Deep Dive */}
                        <div>
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Expert Advice</span>
                            {/* H2 */}
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 mb-6 leading-tight">
                                Pro Settings for <br /> <span className="text-indigo-600">Perfect 3D Text Prints</span>
                            </h2>

                            {/* H3: Deep Dive */}
                            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Settings size={20} /> Deep Dive into Technical Parameters
                            </h3>

                            <div className="space-y-6">
                                <article className="flex gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0"><Cpu size={24} /></div>
                                    <div>
                                        {/* H4 */}
                                        <h4 className="font-bold text-slate-900">Infill Density: Why 15-20% is the Sweet Spot</h4>
                                        <p className="text-sm text-slate-500">For decorative Ambigrams, 15% infill provides enough internal strength without wasting filament.</p>
                                    </div>
                                </article>
                                <article className="flex gap-4">
                                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0"><Layers size={24} /></div>
                                    <div>
                                        {/* H4 */}
                                        <h4 className="font-bold text-slate-900">Wall Line Count: Strengthening Thin Fonts</h4>
                                        <p className="text-sm text-slate-500">Set walls to 3 (approx 1.2mm). This prevents thin parts of letters from snapping.</p>
                                    </div>
                                </article>
                                <article className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0"><Feather size={24} /></div>
                                    <div>
                                        {/* H4 */}
                                        <h4 className="font-bold text-slate-900">Layer Height: 0.16mm for Fine Detail</h4>
                                        <p className="text-sm text-slate-500">Thinner layers make the "illusion" transition smoother and the text more legible.</p>
                                    </div>
                                </article>
                            </div>
                        </div>

                        {/* Right Column: Cheat Sheet (H3) - 逻辑上作为总结或速查 */}
                        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
                            {/* H3 */}
                            <h3 className="text-2xl font-bold mb-8 border-b border-slate-700 pb-4 flex items-center gap-2">
                                <Zap size={24} className="text-yellow-400" /> ⚡ Quick Print Cheat Sheet
                            </h3>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Material</p>
                                    <p className="font-bold text-lg">PLA / PETG</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Nozzle</p>
                                    <p className="font-bold text-lg">0.4mm Standard</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Bed Temp</p>
                                    <p className="font-bold text-lg">60°C</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Speed</p>
                                    <p className="font-bold text-lg">50mm/s</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Supports</p>
                                    <p className="font-bold text-lg text-green-400">No (Self-Supporting Design)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: Why Choose Us (H2) - 补充 Ambigram 描述 */}
            <section className="py-24 px-6 bg-[#FDFDFF] border-t border-slate-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12">Why Choose Our 3D Ambigram & Text Tool?</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">🎨 For Painters & Makers</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Unlike generic text generators, our <strong>3D Ambigram Creator</strong> builds geometry specifically for light and shadow play. Great for post-processing with sanding and painting.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">🏫 For STEM Education</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Teachers use this tool to explain spatial reasoning. It turns a simple "Text to STL" task into a lesson about geometry and perspective illusions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 7: FAQ (H2 -> H3) - 针对长尾问题 */}
            <section className="py-32 bg-[#F8FAFC]">
                <div className="container mx-auto max-w-4xl px-6">
                    <h2 className="text-4xl font-black mb-16 text-center tracking-tight">3D Printing Text FAQ (Common Troubleshooting)</h2>
                    <div className="space-y-6">
                        {/* 使用 H3 提问，覆盖长尾词 */}
                        <FaqBox
                            q="What is the best font size for 3D printing?"
                            a="For a standard 0.4mm nozzle, we recommend a font thickness of at least 3mm. Our tool automatically handles the scaling to ensure the Ambigram is printable."
                        />
                        <FaqBox
                            q="How do I fix 3D printed letters falling over?"
                            a="Adhesion is key. If your letters detach, try adding a 'Brim' in your slicer settings, or use our 'Base Stand' feature to generate a solid foundation."
                        />
                        <FaqBox
                            q="Can I use two different words for the Ambigram?"
                            a="Absolutely. This is a 'Dual-Word' generator. Enter 'Love' and 'Hate', and the 3D model will show different words depending on the viewing angle."
                        />
                    </div>
                </div>
            </section>

            {/* Section 8: CTA */}
            <section className="py-40 bg-slate-950 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter italic">Start Creating Your Custom 3D Text Now</h2>
                <Link href="/" className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-2xl active:scale-95">
                    <PlayCircle size={24} /> Generate 3D Model
                </Link>
            </section>
        </main>
    );
}