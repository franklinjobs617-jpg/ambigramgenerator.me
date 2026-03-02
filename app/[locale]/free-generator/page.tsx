import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Generator3d from "@/components/Generator3d";
import { constructMetadata } from "@/lib/seo"; // 引入封装的 SEO 函数
import {
    Zap, CheckCircle2, Download, Settings,
    Unlock, Printer, Briefcase, Gift, BookOpen,
} from "lucide-react"; // 假设您使用的是 lucide-react

// 辅助函数
const DOMAIN = "https://www.ambigramgenerator.me";
const getUrl = (locale: string, path: string) => {
    const langPath = locale === 'en' ? '' : `/${locale}`;
    return `${DOMAIN}${langPath}${path}`;
};

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/free-generator";

    const seo: Record<string, { title: string; description: string }> = {
        en: {
            title: "Free 3D Ambigram Generator | Create Ambigrams Online",
            description: "Our free 3D ambigram generator lets you create stunning word art for 3D printing. Design custom ambigrams online without any fees or limitations and download as STL."
        },
        fr: {
            title: "Générateur d'Ambigramme 3D Gratuit | Créer en ligne",
            description: "Notre générateur d'ambigrammes 3D gratuit vous permet de créer de l'art textuel pour l'impression 3D. Concevez des ambigrammes personnalisés sans frais ni limites et téléchargez-les en STL."
        },
        de: {
            title: "Kostenloser 3D Ambigramm Generator | Online erstellen",
            description: "Mit unserem kostenlosen 3D-Ambigramm-Generator erstellen Sie beeindruckende Wortkunst für den 3D-Druck. Entwerfen Sie online Ambigramme ohne Gebühren und laden Sie diese als STL herunter."
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

export default async function FreeGeneratorPage({ params }: Props) {
    const { locale } = await params;

    // 🌟 结构化数据 (SoftwareApplication)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Free 3D Ambigram Generator",
        "operatingSystem": "Web",
        "applicationCategory": "DesignApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Create stunning 3D ambigrams for 3D printing at no cost. Download as STL files."
    };

    const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1B] mb-3">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
        </div>
    );

    const UseCaseCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
        <div className="text-center p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-6">
                <Icon size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1B] mb-3">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );

    // ========================================================================
    // 法语版本 (French)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                {/* Hero Section */}
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                                Générateur d&apos;Ambigramme <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">3D Gratuit</span>
                            </h1>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                                Créez des ambigrammes 3D époustouflants pour l&apos;impression 3D sans aucun coût. Téléchargez vos créations sous forme de fichiers STL de haute qualité.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="#generator" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">Générer maintenant</Link>
                                <Link href="#features" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">Fonctionnalités</Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative group">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
                            <div className="relative bg-slate-800/50 p-12 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-sm text-center transform hover:rotate-2 transition-transform duration-700">
                                <div className="text-6xl md:text-8xl font-black text-indigo-400 mb-6 tracking-tighter italic">FREE</div>
                                <div className="w-20 h-1.5 bg-slate-600 mx-auto my-8 rounded-full" />
                                <div className="text-6xl md:text-8xl font-black text-purple-400 tracking-tighter italic rotate-180">ART</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-32 px-6">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center mb-20 space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Fonctionnalités incluses</h2>
                            <p className="text-slate-500 text-lg font-medium">Des outils puissants sans aucune restriction.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard icon={CheckCircle2} title="100% Gratuit" desc="Aucun coût caché, aucune période d'essai, aucun filigrane. Créez et téléchargez librement." />
                            <FeatureCard icon={CheckCircle2} title="Aperçu 3D Instantané" desc="Visualisez votre ambigramme en temps réel grâce à notre visionneuse 3D interactive." />
                            <FeatureCard icon={Download} title="Exportation STL" desc="Téléchargez vos modèles au format STL standard, prêt pour n'importe quelle imprimante 3D." />
                            <FeatureCard icon={Settings} title="Options Avancées" desc="Contrôlez la qualité, ajoutez un socle et optimisez le maillage pour l'impression." />
                            <FeatureCard icon={Zap} title="Animation GIF" desc="Générez facilement un GIF rotatif pour partager vos créations sur les réseaux sociaux." />
                            <FeatureCard icon={Unlock} title="Créations Illimitées" desc="Créez autant de designs que vous le souhaitez. Votre imagination est la seule limite." />
                        </div>
                    </div>
                </section>

                {/* Generator Component Container */}
                <section id="generator" className="py-20 px-6 scroll-mt-24">
                    <div className="container mx-auto max-w-7xl bg-slate-950 rounded-[3.5rem] p-4 shadow-2xl border border-slate-100 overflow-hidden">
                        <Generator3d />
                    </div>
                </section>

                <section className="py-32 bg-slate-50 px-6">
                    <div className="container mx-auto max-w-7xl text-center">
                        <h2 className="text-4xl font-black mb-20">Cas d&apos;utilisation</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <UseCaseCard icon={Printer} title="Impression 3D" desc="Créez des objets physiques uniques montrant différents mots selon l'angle." />
                            <UseCaseCard icon={Briefcase} title="Logos & Branding" desc="Concevez des logos mémorables avec des significations cachées pour vos projets." />
                            <UseCaseCard icon={Gift} title="Cadeaux Personnalisés" desc="Réalisez des œuvres d'art personnalisées incroyables pour vos amis et votre famille." />
                            <UseCaseCard icon={BookOpen} title="Art Éducatif" desc="Un outil fantastique pour enseigner la perspective et la géométrie de façon ludique." />
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 德语版本 (German)
    // ========================================================================
    if (locale === 'de') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                                Kostenloser <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">3D Generator</span>
                            </h1>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                                Erstellen Sie atemberaubende 3D-Ambigramme für den 3D-Druck völlig kostenlos. Laden Sie Ihre Kreationen als hochwertige STL-Dateien herunter.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="#generator" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">Jetzt erstellen</Link>
                                <Link href="#features" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">Funktionen</Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative group">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
                            <div className="relative bg-slate-800/50 p-12 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-sm text-center transform hover:rotate-2 transition-transform duration-700">
                                <div className="text-6xl md:text-8xl font-black text-indigo-400 mb-6 tracking-tighter italic uppercase">Free</div>
                                <div className="w-20 h-1.5 bg-slate-600 mx-auto my-8 rounded-full" />
                                <div className="text-6xl md:text-8xl font-black text-purple-400 tracking-tighter italic uppercase rotate-180">Art</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-32 px-6">
                    <div className="container mx-auto max-w-7xl text-center">
                        <h2 className="text-4xl lg:text-5xl font-black mb-20 tracking-tight text-[#1A1A1B]">Funktionen, die Sie lieben werden</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                            <FeatureCard icon={CheckCircle2} title="100% Kostenlos" desc="Keine versteckten Kosten, keine Testphasen, keine Wasserzeichen. Erstellen und laden Sie frei herunter." />
                            <FeatureCard icon={CheckCircle2} title="Sofortige 3D-Vorschau" desc="Sehen Sie Ihr Ambigramm in Echtzeit in einem interaktiven 3D-Viewer zum Leben erwachen." />
                            <FeatureCard icon={Download} title="STL-Datei-Export" desc="Laden Sie Ihre Kreationen im Standard-STL-Format herunter, bereit für jeden 3D-Drucker." />
                            <FeatureCard icon={Settings} title="Erweiterte Optionen" desc="Steuern Sie die Qualität, fügen Sie eine Basis hinzu und optimieren Sie das Modell für den Druck." />
                            <FeatureCard icon={Zap} title="GIF-Animation" desc="Rendern und laden Sie eine rotierende GIF-Animation herunter, um Ihre Kunst online zu teilen." />
                            <FeatureCard icon={Unlock} title="Unbegrenzt erstellen" desc="Erstellen Sie so viele Ambigramme, wie Sie möchten. Nur Ihre Fantasie setzt die Grenzen." />
                        </div>
                    </div>
                </section>

                <section id="generator" className="py-20 px-6 scroll-mt-24 text-[#1A1A1B]">
                    <div className="container mx-auto max-w-7xl bg-slate-950 rounded-[3.5rem] p-4 shadow-2xl border border-slate-100 overflow-hidden">
                        <Generator3d />
                    </div>
                </section>

                <section className="py-32 bg-slate-50 px-6">
                    <div className="container mx-auto max-w-7xl text-center">
                        <h2 className="text-4xl font-black mb-20">Anwendungsbeispiele</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <UseCaseCard icon={Printer} title="3D-Druck" desc="Erstellen Sie einzigartige physische Objekte, die je nach Winkel unterschiedliche Wörter zeigen." />
                            <UseCaseCard icon={Briefcase} title="Logos & Branding" desc="Entwerfen Sie unvergessliche Logos mit versteckten Bedeutungen für Ihre Projekte." />
                            <UseCaseCard icon={Gift} title="Personalisierte Geschenke" desc="Machen Sie unglaubliche Geschenke für Freunde und Familienmitglieder." />
                            <UseCaseCard icon={BookOpen} title="Bildungskunst" desc="Ein fantastisches Werkzeug, um Perspektive und Geometrie spielerisch zu lehren." />
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

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                            <Zap size={14} className="fill-current" /> Unlimited Access
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                            Free 3D Ambigram <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Generator</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                            Create stunning 3D ambigrams for 3D printing at no cost with our powerful free generator. Download your creations as high-quality STL files.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="#generator" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">Generate for Free</Link>
                            <Link href="#features" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">View Features</Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
                        <div className="relative bg-slate-800 p-12 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-sm text-center transform -rotate-1 hover:rotate-0 transition-transform duration-700">
                            <div className="text-6xl md:text-8xl font-black text-indigo-400 mb-6 tracking-tighter italic uppercase">Free</div>
                            <div className="w-20 h-1.5 bg-slate-600 mx-auto my-8 rounded-full" />
                            <div className="text-6xl md:text-8xl font-black text-purple-400 tracking-tighter italic uppercase rotate-180">Art</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#1A1A1B]">Features You&apos;ll Love</h2>
                        <p className="text-slate-500 text-lg font-medium">Powerful tools with zero limitations.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard icon={CheckCircle2} title="100% Free" desc="No hidden costs, no trial periods, no watermarks. Create and download 3D models completely free." />
                        <FeatureCard icon={CheckCircle2} title="Instant 3D Preview" desc="See your ambigram come to life in a real-time, interactive 3D viewer." />
                        <FeatureCard icon={Download} title="STL File Export" desc="Download your creations in the standard STL format, ready for any 3D printer." />
                        <FeatureCard icon={Settings} title="Advanced Options" desc="Control generation quality, add a base, and optimize the model for better printing results." />
                        <FeatureCard icon={Zap} title="GIF Animation" desc="Easily render and download a rotating GIF animation to share your creation online." />
                        <FeatureCard icon={Unlock} title="Unlimited Creations" desc="Create as many ambigrams as you want with no restrictions. Your imagination is the only limit." />
                    </div>
                </div>
            </section>

            {/* Generator Integration */}
            <section id="generator" className="py-20 px-6 scroll-mt-24">
                <div className="container mx-auto max-w-7xl bg-slate-950 rounded-[3.5rem] p-4 shadow-2xl border border-slate-100 overflow-hidden">
                    <Generator3d />
                </div>
            </section>

            {/* Use Cases Section */}
            <section id="uses" className="py-32 bg-slate-50 px-6">
                <div className="container mx-auto max-w-7xl text-center text-[#1A1A1B]">
                    <h2 className="text-4xl font-black mb-20">Free Ambigram Use Cases</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <UseCaseCard icon={Printer} title="3D Printing" desc="Create unique physical objects that show different words from different angles." />
                        <UseCaseCard icon={Briefcase} title="Logos & Branding" desc="Design memorable logos with hidden meanings for businesses or personal projects." />
                        <UseCaseCard icon={Gift} title="Personalized Gifts" desc="Make incredible, personalized artwork and gifts for friends and family members." />
                        <UseCaseCard icon={BookOpen} title="Educational Art" desc="A fantastic tool for teaching about perspective, geometry, and creative design." />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 bg-white text-center px-6">
                <div className="max-w-3xl mx-auto space-y-10">
                    <h2 className="text-5xl lg:text-6xl font-black tracking-tight">Start Creating Your 3D Ambigram For Free</h2>
                    <p className="text-lg text-slate-500 font-medium">No signups, no credit cards, just pure creativity.</p>
                    <Link href="#generator" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20">
                        Launch Free Generator
                    </Link>
                </div>
            </section>
        </main>
    );
}