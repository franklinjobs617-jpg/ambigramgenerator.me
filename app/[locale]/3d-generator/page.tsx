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
    // ========================================================================
    // 🇫🇷 法语版本 (French / Français)
    // SEO Focus: STL gratuit, Porte-clés 3D, Plaque de bureau, Ambigramme
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

                {/* Section 1: Hero */}
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto text-center max-w-5xl space-y-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                            <Printer size={14} className="fill-current" /> Outil d&apos;impression 3D Gratuit
                        </div>
                        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.05]">
                            Générateur Texte vers STL 3D <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600">& Créateur d&apos;Ambigrammes</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            Convertissez vos mots en modèles 3D prêts à imprimer. Créez des <strong>porte-clés</strong>, des <strong>plaques de bureau</strong> et des illusions d&apos;optique sans compétence en CAO.
                        </p>
                        <div className="pt-6">
                            <Link href="#generator-tool" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95">
                                Créer un fichier STL <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section 2: Creative Ideas */}
                <section className="py-12 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-24 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Idées Créatives : Que pouvez-vous imprimer ?</h2>
                            <p className="text-slate-500 text-lg font-medium">De l&apos;utile à l&apos;art visuel époustouflant.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                    <Key size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Porte-clés 3D Personnalisés</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Activez le mode &quot;Anneau&quot; pour créer instantanément des porte-clés en PLA ou PETG avec des prénoms.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                                    <Box size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Plaques de Bureau Professionnelles</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Générez des plaques nominatives à double perspective. L&apos;accessoire de bureau parfait.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                    <Gift size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Cadeaux Ambigrammes Uniques</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Créez une illusion à 90 degrés. Le cadeau ultime pour les makers et les geeks.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Generator Tool */}
                <section id="generator-tool" className="py-20 px-6 mt-24">
                    <div className="container mx-auto max-w-7xl relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-t-xl font-bold text-sm tracking-widest uppercase z-10 shadow-lg">
                            Nouveau : Mode Porte-clés
                        </div>
                        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="relative group w-full h-full bg-slate-950">
                                <Generator3d />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Tutorial */}
                <section className="py-24 px-6 bg-slate-50">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-16">
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Tutoriel</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Étapes : Comment utiliser le générateur STL</h2>
                            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Du texte à l&apos;objet physique en quelques minutes.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 relative">
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
                            <div className="relative md:text-right pr-0 md:pr-12">
                                <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">1</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Étape 1 : Saisir et Personnaliser</h3>
                                <p className="text-slate-600">Entrez deux mots. Activez l&apos;option &quot;Porte-clés&quot; (Keychain Loop) pour les objets à suspendre.</p>
                            </div>
                            <div className="md:block hidden" />
                            <div className="md:block hidden" />
                            <div className="relative pl-12 md:pl-12">
                                <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">2</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Étape 2 : Télécharger le STL</h3>
                                <p className="text-slate-600">Obtenez un fichier STL étanche. Notre algorithme assure que le maillage est parfait pour l&apos;impression.</p>
                            </div>
                            <div className="relative md:text-right pr-0 md:pr-12">
                                <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">3</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Étape 3 : Slicer (Cura/Prusa)</h3>
                                <p className="text-slate-600">Importez le STL dans <strong>Cura, PrusaSlicer ou Bambu Studio</strong>. Imprimez à plat pour une adhérence maximale.</p>
                            </div>
                            <div className="md:block hidden" />
                            <div className="md:block hidden" />
                            <div className="relative pl-12 md:pl-12">
                                <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">4</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Étape 4 : Imprimer et Admirer</h3>
                                <p className="text-slate-600">Lancez l&apos;impression. Partagez votre texte 3D à double perspective sur les réseaux sociaux !</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Pro Settings */}
                <section className="py-24 px-6 bg-white">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Conseils d&apos;Expert</span>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 mb-6 leading-tight">
                                    Paramètres pour une <br /> <span className="text-indigo-600">Impression Parfaite</span>
                                </h2>
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Settings size={20} /> Détails Techniques
                                </h3>
                                <div className="space-y-6">
                                    <article className="flex gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0"><Cpu size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Remplissage (Infill) : 15-20%</h4>
                                            <p className="text-sm text-slate-500">Pour les ambigrammes décoratifs, 15% suffisent pour la solidité sans gaspiller de filament.</p>
                                        </div>
                                    </article>
                                    <article className="flex gap-4">
                                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0"><Layers size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Parois (Walls) : 3 lignes</h4>
                                            <p className="text-sm text-slate-500">Réglez les murs sur 3. Cela évite que les parties fines des lettres ne cassent.</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
                                <h3 className="text-2xl font-bold mb-8 border-b border-slate-700 pb-4 flex items-center gap-2">
                                    <Zap size={24} className="text-yellow-400" /> ⚡ Fiche Express (Cheat Sheet)
                                </h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Matériau</p>
                                        <p className="font-bold text-lg">PLA / PETG</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Buse (Nozzle)</p>
                                        <p className="font-bold text-lg">0.4mm Standard</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Plateau</p>
                                        <p className="font-bold text-lg">60°C</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Vitesse</p>
                                        <p className="font-bold text-lg">50mm/s</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Supports</p>
                                        <p className="font-bold text-lg text-green-400">Non Requis (Design Auto-portant)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 6: FAQ */}
                <section className="py-32 bg-[#F8FAFC]">
                    <div className="container mx-auto max-w-4xl px-6">
                        <h2 className="text-4xl font-black mb-16 text-center tracking-tight">FAQ Impression 3D (Dépannage)</h2>
                        <div className="space-y-6">
                            <FaqBox
                                q="Quelle taille de police pour l'impression 3D ?"
                                a="Pour une buse standard de 0,4 mm, nous recommandons une épaisseur minimale de 3 mm. Notre outil gère l'échelle automatiquement."
                            />
                            <FaqBox
                                q="Comment empêcher les lettres de se décoller ?"
                                a="L'adhérence est clé. Utilisez une 'Bordure' (Brim) dans votre slicer, ou utilisez notre fonction 'Base Stand' pour générer un socle solide."
                            />
                            <FaqBox
                                q="Puis-je utiliser deux mots différents ?"
                                a="Absolument. C'est un générateur 'Double Mot'. Entrez 'Amour' et 'Haine', et le modèle 3D changera selon l'angle de vue."
                            />
                        </div>
                    </div>
                </section>

                {/* Section 7: CTA */}
                <section className="py-40 bg-slate-950 text-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter italic">Créez votre Texte 3D Maintenant</h2>
                    <Link href="/" className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-2xl active:scale-95">
                        <PlayCircle size={24} /> Générer le Modèle 3D
                    </Link>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 🇩🇪 德语版本 (German / Deutsch)
    // SEO Focus: Text zu STL, 3D Druck Schlüsselanhänger, Namensschilder
    // ========================================================================
    if (locale === 'de') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto text-center max-w-5xl space-y-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                            <Printer size={14} className="fill-current" /> Kostenloses 3D-Druck-Tool
                        </div>
                        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.05]">
                            Kostenloser Text-zu-STL Generator <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600">& Ambigramm Ersteller</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            Wandeln Sie Wörter in druckfertige 3D-Modelle um. Erstellen Sie individuelle <strong>Schlüsselanhänger</strong>, <strong>Namensschilder</strong> und optische Täuschungen ohne CAD-Kenntnisse.
                        </p>
                        <div className="pt-6">
                            <Link href="#generator-tool" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95">
                                STL-Datei jetzt erstellen <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-24 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Kreative Ideen: Was können Sie drucken?</h2>
                            <p className="text-slate-500 text-lg font-medium">Von nützlichen Tags bis hin zu verblüffender Kunst.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                    <Key size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">3D Schlüsselanhänger & Tags</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Aktivieren Sie den &quot;Ösen-Modus&quot;, um sofort personalisierte PLA- oder PETG-Anhänger zu erstellen.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                                    <Box size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Professionelle Namensschilder</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Erzeugen Sie &quot;Dual-View&quot; Schreibtischschilder. Ein perfektes Accessoire, das Namen und Titel zeigt.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                    <Gift size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Optische Täuschung als Geschenk</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Erschaffen Sie eine 90-Grad-Illusion. Das ultimative, einzigartige Geschenk für Maker.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="generator-tool" className="py-20 px-6 mt-24">
                    <div className="container mx-auto max-w-7xl relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-t-xl font-bold text-sm tracking-widest uppercase z-10 shadow-lg">
                            Neu: Schlüsselanhänger-Modus
                        </div>
                        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="relative group w-full h-full bg-slate-950">
                                <Generator3d />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 bg-slate-50">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-16">
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Anleitung</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Schritt-für-Schritt: Text zum 3D-Druck</h2>
                            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Vom Wort zum physischen Objekt in Minuten.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 relative">
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
                            <div className="relative md:text-right pr-0 md:pr-12">
                                <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">1</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Schritt 1: Text eingeben</h3>
                                <p className="text-slate-600">Geben Sie zwei Wörter ein. Aktivieren Sie die &quot;Schlaufe&quot; (Loop), wenn Sie es aufhängen möchten.</p>
                            </div>
                            <div className="md:block hidden" />
                            <div className="md:block hidden" />
                            <div className="relative pl-12 md:pl-12">
                                <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">2</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Schritt 2: STL herunterladen</h3>
                                <p className="text-slate-600">Sie erhalten eine wasserdichte STL-Datei. Unser Algorithmus sorgt für eine druckbare Geometrie.</p>
                            </div>
                            <div className="relative md:text-right pr-0 md:pr-12">
                                <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">3</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Schritt 3: Slicen (Cura/Prusa)</h3>
                                <p className="text-slate-600">Import in <strong>Cura, PrusaSlicer oder Bambu Studio</strong>. Flach auf das Druckbett legen für beste Haftung.</p>
                            </div>
                            <div className="md:block hidden" />
                            <div className="md:block hidden" />
                            <div className="relative pl-12 md:pl-12">
                                <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">4</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Schritt 4: Drucken & Zeigen</h3>
                                <p className="text-slate-600">Starten Sie den Druck. Teilen Sie Ihren 3D-Text mit Doppeleffekt auf Social Media!</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 bg-white">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Expertenrat</span>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 mb-6 leading-tight">
                                    Einstellungen für <br /> <span className="text-indigo-600">Perfekte Text-Drucke</span>
                                </h2>
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Settings size={20} /> Technische Parameter
                                </h3>
                                <div className="space-y-6">
                                    <article className="flex gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0"><Cpu size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Fülldichte (Infill): 15-20%</h4>
                                            <p className="text-sm text-slate-500">Für dekorative Ambigramme reichen 15% für die Stabilität völlig aus.</p>
                                        </div>
                                    </article>
                                    <article className="flex gap-4">
                                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0"><Layers size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Wandlinien (Walls): 3 Linien</h4>
                                            <p className="text-sm text-slate-500">Setzen Sie Wände auf 3. Dies verhindert das Brechen dünner Buchstabenteile.</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
                                <h3 className="text-2xl font-bold mb-8 border-b border-slate-700 pb-4 flex items-center gap-2">
                                    <Zap size={24} className="text-yellow-400" /> ⚡ Druck-Spickzettel (Cheat Sheet)
                                </h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Material</p>
                                        <p className="font-bold text-lg">PLA / PETG</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Düse (Nozzle)</p>
                                        <p className="font-bold text-lg">0.4mm Standard</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Druckbett</p>
                                        <p className="font-bold text-lg">60°C</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Geschw.</p>
                                        <p className="font-bold text-lg">50mm/s</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Stützen (Supports)</p>
                                        <p className="font-bold text-lg text-green-400">Nicht benötigt (Self-Supporting)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-[#F8FAFC]">
                    <div className="container mx-auto max-w-4xl px-6">
                        <h2 className="text-4xl font-black mb-16 text-center tracking-tight">3D-Druck FAQ (Fehlerbehebung)</h2>
                        <div className="space-y-6">
                            <FaqBox
                                q="Welche Schriftgröße ist optimal?"
                                a="Für eine 0,4mm Düse empfehlen wir eine Mindestdicke von 3mm. Unser Tool skaliert dies automatisch für die Druckbarkeit."
                            />
                            <FaqBox
                                q="Wie verhindere ich, dass Buchstaben umfallen?"
                                a="Haftung ist der Schlüssel. Nutzen Sie 'Brim' (Rand) im Slicer oder unsere 'Basis-Stand'-Funktion für ein festes Fundament."
                            />
                            <FaqBox
                                q="Kann ich zwei verschiedene Wörter nutzen?"
                                a="Absolut. Das ist ein 'Dual-Word' Generator. Geben Sie 'Liebe' und 'Hass' ein, und das Modell zeigt je nach Winkel ein anderes Wort."
                            />
                        </div>
                    </div>
                </section>

                <section className="py-40 bg-slate-950 text-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter italic">Starten Sie Ihren 3D-Druck jetzt</h2>
                    <Link href="/" className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-2xl active:scale-95">
                        <PlayCircle size={24} /> 3D-Modell generieren
                    </Link>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 🇪🇸 西班牙语版本 (Spanish / Español)
    // SEO Focus: Generador Texto a STL, Llaveros 3D, Placas de nombre
    // ========================================================================
    if (locale === 'es') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto text-center max-w-5xl space-y-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                            <Printer size={14} className="fill-current" /> Herramienta de Impresión 3D Gratis
                        </div>
                        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.05]">
                            Generador de Texto a STL 3D <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600">& Creador de Ambigramas</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            Convierte palabras en modelos 3D listos para imprimir. Crea <strong>llaveros</strong>, <strong>placas de escritorio</strong> e ilusiones ópticas sin saber CAD.
                        </p>
                        <div className="pt-6">
                            <Link href="#generator-tool" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95">
                                Crear Archivo STL <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-24 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Ideas Creativas: ¿Qué puedes imprimir?</h2>
                            <p className="text-slate-500 text-lg font-medium">Desde utilidad práctica hasta arte visual.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                    <Key size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Llaveros 3D Personalizados</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Activa el modo &quot;Anilla&quot; para crear llaveros con nombres en PLA o PETG al instante.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                                    <Box size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Placas de Escritorio (Name Plates)</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Genera identificadores de &quot;Doble Vista&quot;. El accesorio de oficina perfecto.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                    <Gift size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Regalos de Ilusión Óptica</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Crea una ilusión de 90 grados. El regalo único definitivo para makers.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="generator-tool" className="py-20 px-6 mt-24">
                    <div className="container mx-auto max-w-7xl relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-t-xl font-bold text-sm tracking-widest uppercase z-10 shadow-lg">
                            Nuevo: Modo Llavero
                        </div>
                        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="relative group w-full h-full bg-slate-950">
                                <Generator3d />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 bg-slate-50">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-16">
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Tutorial</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Paso a Paso: De Texto a Impresión 3D</h2>
                            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Obtén tu objeto físico en minutos.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 relative">
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
                            <div className="relative md:text-right pr-0 md:pr-12">
                                <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">1</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Paso 1: Escribe y Personaliza</h3>
                                <p className="text-slate-600">Introduce dos palabras. Activa &quot;Llavero&quot; (Loop) si deseas colgarlo.</p>
                            </div>
                            <div className="md:block hidden" />
                            <div className="md:block hidden" />
                            <div className="relative pl-12 md:pl-12">
                                <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">2</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Paso 2: Descargar STL</h3>
                                <p className="text-slate-600">Obtén un archivo STL hermético (watertight). Nuestro algoritmo asegura que la malla sea imprimible.</p>
                            </div>
                            <div className="relative md:text-right pr-0 md:pr-12">
                                <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">3</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Paso 3: Laminar (Cura/Prusa)</h3>
                                <p className="text-slate-600">Importa en <strong>Cura, PrusaSlicer o Bambu Studio</strong>. Imprime plano para mejor adhesión.</p>
                            </div>
                            <div className="md:block hidden" />
                            <div className="md:block hidden" />
                            <div className="relative pl-12 md:pl-12">
                                <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">4</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Paso 4: Imprimir y Exhibir</h3>
                                <p className="text-slate-600">Inicia la impresión. ¡Comparte tu texto 3D de doble perspectiva en redes sociales!</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 bg-white">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Consejo Experto</span>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 mb-6 leading-tight">
                                    Configuración para <br /> <span className="text-indigo-600">Impresión Perfecta</span>
                                </h2>
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Settings size={20} /> Parámetros Técnicos
                                </h3>
                                <div className="space-y-6">
                                    <article className="flex gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0"><Cpu size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Relleno (Infill): 15-20%</h4>
                                            <p className="text-sm text-slate-500">Para ambigramas decorativos, 15% es suficiente para dar solidez sin gastar filamento.</p>
                                        </div>
                                    </article>
                                    <article className="flex gap-4">
                                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0"><Layers size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Paredes (Walls): 3 líneas</h4>
                                            <p className="text-sm text-slate-500">Configura perímetros en 3. Esto evita que las partes finas de las letras se rompan.</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
                                <h3 className="text-2xl font-bold mb-8 border-b border-slate-700 pb-4 flex items-center gap-2">
                                    <Zap size={24} className="text-yellow-400" /> ⚡ Guía Rápida (Cheat Sheet)
                                </h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Material</p>
                                        <p className="font-bold text-lg">PLA / PETG</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Boquilla</p>
                                        <p className="font-bold text-lg">0.4mm Estándar</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Cama</p>
                                        <p className="font-bold text-lg">60°C</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Velocidad</p>
                                        <p className="font-bold text-lg">50mm/s</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Soportes</p>
                                        <p className="font-bold text-lg text-green-400">No Requeridos (Diseño Auto-portante)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-[#F8FAFC]">
                    <div className="container mx-auto max-w-4xl px-6">
                        <h2 className="text-4xl font-black mb-16 text-center tracking-tight">FAQ Impresión 3D (Solución de problemas)</h2>
                        <div className="space-y-6">
                            <FaqBox
                                q="¿Qué tamaño de fuente es ideal?"
                                a="Para una boquilla de 0.4 mm, recomendamos un grosor mínimo de 3 mm. Nuestra herramienta escala esto automáticamente."
                            />
                            <FaqBox
                                q="¿Cómo evito que las letras se despeguen?"
                                a="La adhesión es clave. Usa una 'Balsa' (Brim) en tu laminador, o usa nuestra función 'Base Stand' para generar una base sólida."
                            />
                            <FaqBox
                                q="¿Puedo usar dos palabras diferentes?"
                                a="Absolutamente. Este es un generador de 'Doble Palabra'. Escribe 'Amor' y 'Odio', y el modelo 3D cambiará según el ángulo."
                            />
                        </div>
                    </div>
                </section>

                <section className="py-40 bg-slate-950 text-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter italic">Comienza a Crear tu Texto 3D</h2>
                    <Link href="/" className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-2xl active:scale-95">
                        <PlayCircle size={24} /> Generar Modelo 3D
                    </Link>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 🇮🇹 意大利语版本 (Italian / Italiano)
    // SEO Focus: Da Testo a STL, Portachiavi 3D, Targhette
    // ========================================================================
    if (locale === 'it') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent -z-10" />
                    <div className="container mx-auto text-center max-w-5xl space-y-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                            <Printer size={14} className="fill-current" /> Tool di Stampa 3D Gratuito
                        </div>
                        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.05]">
                            Generatore Testo STL 3D <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600">& Creatore di Ambigrammi</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            Converti parole in modelli 3D pronti per la stampa. Crea <strong>portachiavi</strong>, <strong>targhette da scrivania</strong> e illusioni ottiche senza esperienza CAD.
                        </p>
                        <div className="pt-6">
                            <Link href="#generator-tool" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95">
                                Crea File STL <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-24 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Idee Creative: Cosa puoi stampare?</h2>
                            <p className="text-slate-500 text-lg font-medium">Dall&apos;utilità pratica all&apos;arte visiva.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                    <Key size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Portachiavi 3D Personalizzati</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Attiva la modalità &quot;Anello&quot; per creare istantaneamente portachiavi con nomi in PLA o PETG.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                                    <Box size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Targhette da Scrivania (Name Plates)</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Genera targhette a &quot;Doppia Vista&quot;. L&apos;accessorio da ufficio perfetto.</p>
                            </div>
                            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                    <Gift size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1A1B] mb-4 tracking-tight">Regali Illusione Ottica</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">Crea un&apos;illusione a 90 gradi. Il regalo unico definitivo per i maker.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="generator-tool" className="py-20 px-6 mt-24">
                    <div className="container mx-auto max-w-7xl relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-2 rounded-t-xl font-bold text-sm tracking-widest uppercase z-10 shadow-lg">
                            Nuovo: Modo Portachiavi
                        </div>
                        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="relative group w-full h-full bg-slate-950">
                                <Generator3d />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 bg-slate-50">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-16">
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Tutorial</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Passo dopo Passo: Da Testo a Stampa 3D</h2>
                            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Ottieni il tuo oggetto fisico in pochi minuti.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 relative">
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
                            <div className="relative md:text-right pr-0 md:pr-12">
                                <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">1</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Passo 1: Scrivi e Personalizza</h3>
                                <p className="text-slate-600">Inserisci due parole. Attiva &quot;Anello&quot; (Loop) se desideri appenderlo.</p>
                            </div>
                            <div className="md:block hidden" />
                            <div className="md:block hidden" />
                            <div className="relative pl-12 md:pl-12">
                                <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">2</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Passo 2: Scarica STL</h3>
                                <p className="text-slate-600">Ottieni un file STL a tenuta stagna (watertight). Il nostro algoritmo assicura che la mesh sia stampabile.</p>
                            </div>
                            <div className="relative md:text-right pr-0 md:pr-12">
                                <div className="absolute top-0 right-0 md:-right-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:translate-x-1/2">3</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Passo 3: Slicing (Cura/Prusa)</h3>
                                <p className="text-slate-600">Importa in <strong>Cura, PrusaSlicer o Bambu Studio</strong>. Stampa piatto per una migliore adesione.</p>
                            </div>
                            <div className="md:block hidden" />
                            <div className="md:block hidden" />
                            <div className="relative pl-12 md:pl-12">
                                <div className="absolute top-0 left-0 md:-left-6 w-12 h-12 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center justify-center font-bold z-10 md:-translate-x-1/2">4</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Passo 4: Stampa ed Esponi</h3>
                                <p className="text-slate-600">Avvia la stampa. Condividi il tuo testo 3D a doppia prospettiva sui social media!</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 bg-white">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Consiglio Esperto</span>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 mb-6 leading-tight">
                                    Impostazioni per <br /> <span className="text-indigo-600">Stampa Perfetta</span>
                                </h2>
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Settings size={20} /> Parametri Tecnici
                                </h3>
                                <div className="space-y-6">
                                    <article className="flex gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0"><Cpu size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Riempimento (Infill): 15-20%</h4>
                                            <p className="text-sm text-slate-500">Per ambigrammi decorativi, il 15% è sufficiente per dare solidità senza sprecare filamento.</p>
                                        </div>
                                    </article>
                                    <article className="flex gap-4">
                                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0"><Layers size={24} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Pareti (Walls): 3 linee</h4>
                                            <p className="text-sm text-slate-500">Imposta i perimetri su 3. Questo evita che le parti sottili delle lettere si rompano.</p>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
                                <h3 className="text-2xl font-bold mb-8 border-b border-slate-700 pb-4 flex items-center gap-2">
                                    <Zap size={24} className="text-yellow-400" /> ⚡ Scheda Rapida (Cheat Sheet)
                                </h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Materiale</p>
                                        <p className="font-bold text-lg">PLA / PETG</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Ugello</p>
                                        <p className="font-bold text-lg">0.4mm Standard</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Piatto</p>
                                        <p className="font-bold text-lg">60°C</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Velocità</p>
                                        <p className="font-bold text-lg">50mm/s</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Supporti</p>
                                        <p className="font-bold text-lg text-green-400">Non Richiesti (Design Auto-portante)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-[#F8FAFC]">
                    <div className="container mx-auto max-w-4xl px-6">
                        <h2 className="text-4xl font-black mb-16 text-center tracking-tight">FAQ Stampa 3D (Risoluzione problemi)</h2>
                        <div className="space-y-6">
                            <FaqBox
                                q="Che dimensione del carattere è ideale?"
                                a="Per un ugello da 0.4 mm, raccomandiamo uno spessore minimo di 3 mm. Il nostro strumento scala tutto automaticamente."
                            />
                            <FaqBox
                                q="Come evito che le lettere si stacchino?"
                                a="L'adesione è fondamentale. Usa un 'Brim' (Bordo) nel tuo slicer, o usa la nostra funzione 'Base Stand' per generare una base solida."
                            />
                            <FaqBox
                                q="Posso usare due parole diverse?"
                                a="Assolutamente. Questo è un generatore 'Doppia Parola'. Scrivi 'Amore' e 'Odio', e il modello 3D cambierà in base all'angolo."
                            />
                        </div>
                    </div>
                </section>

                <section className="py-40 bg-slate-950 text-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter italic">Inizia a Creare il tuo Testo 3D</h2>
                    <Link href="/" className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-2xl active:scale-95">
                        <PlayCircle size={24} /> Genera Modello 3D
                    </Link>
                </section>
            </main>
        );
    }
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
                            <div className="text-3xl font-black text-white tracking-tight w-full text-center py-4">
                                <h2> 3D Ambigram Generator</h2>
                            </div>
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
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Step-by-Step: How to Use the Word to Ambigram STL Generator</h2>
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