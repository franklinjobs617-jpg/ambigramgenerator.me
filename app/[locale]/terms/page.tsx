import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import {
    CheckSquare,
    Settings,
    Gavel,
    Copyright,
    Type,
    ShieldCheck,
    AlertTriangle,
    Scale,
    RefreshCw,
    Globe,
    Mail,
    ChevronRight
} from "lucide-react";

// 辅助函数
const DOMAIN = "https://www.ambigramgenerator.me";
const getUrl = (locale: string, path: string) => {
    const langPath = locale === 'en' ? '' : `/${locale}`;
    return `${DOMAIN}${langPath}${path}`;
};

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/terms";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Terms of Service | AmbigramGenerator.me",
            description: "Terms of service for using AmbigramGenerator.me, including usage rights and restrictions."
        },
        fr: {
            title: "Conditions d'Utilisation | AmbigramGenerator.me",
            description: "Conditions d'utilisation d'AmbigramGenerator.me, incluant les droits d'utilisation et les restrictions."
        },
        de: {
            title: "Nutzungsbedingungen (AGB) | AmbigramGenerator.me",
            description: "Nutzungsbedingungen für AmbigramGenerator.me, einschließlich Nutzungsrechten und Einschränkungen."
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

export default async function TermsPage({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": locale === 'fr' ? "Conditions d'Utilisation" : "Terms of Service",
        "description": "Legal terms and conditions for AmbigramGenerator.me",
        "url": getUrl(locale, "/terms"),
        "lastReviewed": "2025-10-30",
        "publisher": {
            "@type": "Organization",
            "name": "AmbigramGenerator.me",
            "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` }
        }
    };

    // ========================================================================
    // 法语版本 (French Version)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF] min-h-screen">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                {/* Header Section */}
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4">Conditions d&apos;Utilisation</h1>
                        <p className="text-slate-400 font-medium italic">Dernière mise à jour : 30 octobre 2025</p>
                    </div>
                </section>

                <section className="pb-12">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Table of Contents (Sidebar) */}
                            <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                                <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                    <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">Sommaire</h3>
                                    <Link href="#acceptance" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Acceptation</Link>
                                    <Link href="#service" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Description</Link>
                                    <Link href="#conduct" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Conduite</Link>
                                    <Link href="#ip" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Propriété</Link>
                                    <Link href="#contact" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Contact</Link>
                                </nav>
                            </aside>

                            {/* Main Content */}
                            <div className="lg:w-3/4 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                                <article className="prose prose-lg prose-slate text-slate-700 max-w-none">

                                    <div id="acceptance" className="scroll-mt-28 mb-12">
                                        <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><CheckSquare size={20} /></div>
                                            1. Acceptation des Conditions
                                        </h2>
                                        <p>En accédant à ou en utilisant AmbigramGenerator.me (le &quot;Service&quot;), vous acceptez d&quot;être lié par ces Conditions d&quot;Utilisation. Si vous n&quot;acceptez pas ces conditions, vous ne pouvez pas utiliser le Service.</p>
                                    </div>

                                    <div id="service" className="scroll-mt-28 mb-12">
                                        <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Settings size={20} /></div>
                                            2. Description du Service
                                        </h2>
                                        <p>AmbigramGenerator.me fournit des outils en ligne gratuits pour générer des ambigrammes. Notre Service permet aux utilisateurs de saisir du texte, de sélectionner des styles et de générer des aperçus téléchargeables.</p>
                                        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mt-6">
                                            <p className="font-bold text-indigo-900 m-0 mb-2">Reconnaissance Open Source :</p>
                                            <p className="m-0 text-sm text-indigo-800 leading-relaxed">Veuillez noter que la logique de génération de notre Service repose sur des projets open source publics. Nous remercions les développeurs originaux et adhérons aux licences respectives. Plus d&quot;infos sur notre page À Propos.</p>
                                        </div>
                                    </div>

                                    <div id="conduct" className="scroll-mt-28 mb-12">
                                        <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Gavel size={20} /></div>
                                            3. Conduite de l&apos;Utilisateur
                                        </h2>
                                        <p>Lors de l&apos;utilisation de notre Service, vous acceptez de ne pas :</p>
                                        <ul className="list-disc ml-6 space-y-2 font-medium">
                                            <li>Saisir du texte illégal, nuisible, menaçant, abusif ou obscène.</li>
                                            <li>Utiliser le Service à des fins illégales.</li>
                                            <li>Tenter d&apos;interférer avec le Service ou ses serveurs.</li>
                                        </ul>
                                    </div>

                                    <div id="ip" className="scroll-mt-28 mb-12">
                                        <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Copyright size={20} /></div>
                                            4. Propriété Intellectuelle
                                        </h2>
                                        <p>Le Service et son contenu original sont la propriété de AmbigramGenerator.me. <strong>Concernant les ambigrammes que vous créez :</strong> vous conservez tous les droits sur ces créations spécifiques. Vous êtes libre de les utiliser à des fins personnelles ou commerciales.</p>
                                    </div>

                                    <div id="contact" className="scroll-mt-28 border-t border-slate-100 pt-12 text-center">
                                        <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center justify-center gap-4 mb-6 tracking-tight">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Mail size={20} /></div>
                                            11. Contactez-nous
                                        </h2>
                                        <p>Si vous avez des questions, contactez-nous à : <Link href="mailto:support@ambigramgenerator.me" className="text-indigo-600 font-bold hover:underline">support@ambigramgenerator.me</Link></p>
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
    // 英语版本 (English / Default Version)
    // ========================================================================
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Header Section */}
            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4">Terms of Service</h1>
                    <p className="text-slate-400 font-medium italic">Last Updated: October 30, 2025</p>
                </div>
            </section>

            <section className="pb-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Table of Contents (Sidebar) */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">On this page</h3>
                                <Link href="#acceptance" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Acceptance</Link>
                                <Link href="#service" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Service</Link>
                                <Link href="#conduct" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Conduct</Link>
                                <Link href="#ip" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Intellectual Property</Link>
                                <Link href="#fonts" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Fonts</Link>
                                <Link href="#law" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Law</Link>
                                <Link href="#contact" className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all"><ChevronRight size={14} /> Contact</Link>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:w-3/4 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <article className="prose prose-lg prose-slate text-slate-700 max-w-none">

                                <div id="acceptance" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><CheckSquare size={20} /></div>
                                        1. Acceptance of Terms
                                    </h2>
                                    <p>By accessing or using AmbigramGenerator.me (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use the Service.</p>
                                </div>

                                <div id="service" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Settings size={20} /></div>
                                        2. Service & Open Source
                                    </h2>
                                    <p>AmbigramGenerator.me provides free online tools for generating ambigrams. Our Service allows users to input text, select styles, and generate previews.</p>
                                    <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mt-6 shadow-sm">
                                        <p className="font-bold text-indigo-900 m-0 mb-2 underline decoration-indigo-200 decoration-2">Open Source Acknowledgment:</p>
                                        <p className="m-0 text-sm text-indigo-800 leading-relaxed">Our core logic is built upon exceptional community efforts and open-source libraries. We adhere to all respective licenses. See our <Link href="/about" className="font-bold underline hover:text-indigo-600 transition-colors">About Us</Link> page for technical details.</p>
                                    </div>
                                </div>

                                <div id="conduct" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Gavel size={20} /></div>
                                        3. User Conduct
                                    </h2>
                                    <p>You agree not to input unlawful, abusive, or harmful text, nor attempt to disrupt our servers or violate local/international laws using our generator.</p>
                                </div>

                                <div id="ip" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Copyright size={20} /></div>
                                        4. Intellectual Property
                                    </h2>
                                    <p>While we own the platform functionality, <strong>you retain all rights to the specific ambigrams you create</strong>. You are free to use them commercially or personally.</p>
                                </div>

                                <div id="fonts" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Type size={20} /></div>
                                        5. Font Licensing
                                    </h2>
                                    <p>Fonts are either open-source or used with permission. You are granted a license for the resulting designs. Use of fonts independently may require separate licensing.</p>
                                </div>

                                <div id="law" className="scroll-mt-28 mb-16">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Globe size={20} /></div>
                                        10. Governing Law
                                    </h2>
                                    <p>These Terms shall be governed by the laws of the jurisdiction in which the service is based.</p>
                                </div>

                                <div id="contact" className="scroll-mt-28 border-t border-slate-100 pt-12 text-center">
                                    <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center justify-center gap-4 mb-6 tracking-tight">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Mail size={20} /></div>
                                        11. Contact Us
                                    </h2>
                                    <p>Questions? Reach us at: <Link href="mailto:support@ambigramgenerator.me" className="text-indigo-600 font-bold hover:underline">support@ambigramgenerator.me</Link></p>
                                </div>

                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}