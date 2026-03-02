import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import {
    Info, EyeOff, BarChart3, Settings, Cookie,
    Users, Lock, Mail,
    ChevronRight, Sliders, ExternalLink
} from "lucide-react";

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
    const path = "/privacy";

    const seo: Record<string, { title: string; description: string }> = {
        en: {
            title: "Privacy Policy | AmbigramGenerator.me",
            description: "Privacy policy for AmbigramGenerator.me, explaining how we handle your data and protect your privacy."
        },
        fr: {
            title: "Politique de Confidentialité | AmbigramGenerator.me",
            description: "Politique de confidentialité pour AmbigramGenerator.me, expliquant comment nous traitons vos données et protégeons votre vie privée."
        },
        de: {
            title: "Datenschutzerklärung | AmbigramGenerator.me",
            description: "Datenschutzerklärung für AmbigramGenerator.me, die erklärt, wie wir mit Ihren Daten umgehen und Ihre Privatsphäre schützen."
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
export default async function PrivacyPage({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": locale === 'fr' ? "Politique de Confidentialité" : locale === 'de' ? "Datenschutzerklärung" : "Privacy Policy",
        "url": getUrl(locale, "/privacy"),
        "lastReviewed": "2025-10-30",
        "mainEntity": {
            "@type": "Article",
            "headline": "Privacy and Data Handling Policy",
            "author": { "@type": "Organization", "name": "AmbigramStudio" }
        }
    };

    const SidebarLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
        <Link href={href} className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all group">
            <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400" />
            {children}
        </Link>
    );

    const PolicySection = ({ id, icon: Icon, title, children }: { id: string, icon: any, title: string, children: React.ReactNode }) => (
        <div id={id} className="scroll-mt-28 mb-16 last:mb-0">
            <h2 className="text-2xl font-black text-[#1A1A1B] flex items-center gap-4 mb-6 tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Icon size={20} />
                </div>
                {title}
            </h2>
            <div className="text-slate-600 leading-relaxed font-medium space-y-4 prose-strong:text-[#1A1A1B] prose-strong:font-black">
                {children}
            </div>
        </div>
    );

    // ========================================================================
    // 法语版本 (French)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF] min-h-screen">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Politique de Confidentialité</h1>
                        <p className="text-xl text-slate-400 font-medium italic">Dernière mise à jour : 30 octobre 2025</p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-12">
                            <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                                <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                    <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">Sommaire</h3>
                                    <SidebarLink href="#introduction">1. Introduction</SidebarLink>
                                    <SidebarLink href="#no-collect">2. Non-collecte</SidebarLink>
                                    <SidebarLink href="#collect">3. Données collectées</SidebarLink>
                                    <SidebarLink href="#use">4. Utilisation</SidebarLink>
                                    <SidebarLink href="#cookies">5. Cookies</SidebarLink>
                                    <SidebarLink href="#google-adsense">6. Publicité</SidebarLink>
                                    <SidebarLink href="#contact">7. Contact</SidebarLink>
                                </nav>
                            </aside>

                            <div className="lg:w-3/4 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                                <PolicySection id="introduction" icon={Info} title="1. Introduction">
                                    <p>Bienvenue sur AmbigramGenerator.me (le &quot;Service&quot;). Nous nous engageons à protéger votre vie privée. Cette politique explique comment nous traitons vos informations lors de l&apos;utilisation de notre générateur d&apos;ambigrammes.</p>
                                    <p>En utilisant notre site, vous acceptez la collecte et l&apos;utilisation des informations conformément à cette politique.</p>
                                </PolicySection>

                                <PolicySection id="no-collect" icon={EyeOff} title="2. Ce que nous ne collectons PAS">
                                    <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6">
                                        <p className="m-0 font-bold text-indigo-900">Engagement de confidentialité : Nous ne collectons ni ne stockons :</p>
                                        <ul className="list-disc ml-6 mt-2 text-indigo-800 text-sm space-y-1">
                                            <li>Le texte que vous saisissez dans le générateur.</li>
                                            <li>Les ambigrammes que vous créez.</li>
                                            <li>Vos informations d&apos;identification personnelle.</li>
                                        </ul>
                                    </div>
                                </PolicySection>

                                <PolicySection id="collect" icon={BarChart3} title="3. Informations que nous pouvons collecter">
                                    <p>Pour l&apos;analyse et l&apos;amélioration du service, nous pouvons collecter des données anonymes :</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Données d&apos;utilisation agrégées (nombre de visiteurs, fonctions utilisées).</li>
                                        <li>Type de navigateur, système d&apos;exploitation et source de référence.</li>
                                        <li>Pages visitées et temps passé.</li>
                                    </ul>
                                </PolicySection>

                                <PolicySection id="google-adsense" icon={ExternalLink} title="4. Google AdSense et Publicité">
                                    <p>Nous affichons des publicités via <strong>Google AdSense</strong>. Google utilise des cookies pour diffuser des annonces basées sur vos visites passées sur ce site ou d&apos;autres sites.</p>
                                    <p>Vous pouvez désactiver la publicité personnalisée dans vos <Link href="https://myadcenter.google.com/" className="text-indigo-600 underline">Paramètres Google Ads</Link>.</p>
                                </PolicySection>

                                <PolicySection id="contact" icon={Mail} title="5. Contactez-nous">
                                    <p>Pour toute question : <Link href="mailto:privacy@ambigramgenerator.me" className="text-indigo-600 font-bold hover:underline">privacy@ambigramgenerator.me</Link></p>
                                </PolicySection>
                            </div>
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
            <main className="bg-[#FDFDFF] min-h-screen">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">Datenschutzerklärung</h1>
                    <p className="text-xl text-slate-400 font-medium italic text-center">Zuletzt aktualisiert: 30. Oktober 2025</p>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex flex-col lg:flex-row gap-12">
                            <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                                <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                    <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3 text-left">Inhalt</h3>
                                    <SidebarLink href="#introduction">1. Einführung</SidebarLink>
                                    <SidebarLink href="#no-collect">2. Keine Datenerhebung</SidebarLink>
                                    <SidebarLink href="#cookies">3. Cookies</SidebarLink>
                                    <SidebarLink href="#google-adsense">4. Werbung</SidebarLink>
                                    <SidebarLink href="#contact">5. Kontakt</SidebarLink>
                                </nav>
                            </aside>

                            <div className="lg:w-3/4 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                                <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                                    <PolicySection id="introduction" icon={Info} title="1. Einführung">
                                        <p>Willkommen bei AmbigramGenerator.me. Wir nehmen den Schutz Ihrer Daten sehr ernst. Diese Erklärung erläutert unseren Umgang mit Informationen.</p>
                                    </PolicySection>

                                    <PolicySection id="no-collect" icon={EyeOff} title="2. Was wir NICHT speichern">
                                        <p>Wir betonen ausdrücklich, dass wir folgende Daten nicht erfassen:</p>
                                        <ul className="list-disc ml-6 space-y-2">
                                            <li>Eingegebene Texte im Generator.</li>
                                            <li>Die von Ihnen erstellten Ambigramme.</li>
                                            <li>Persönliche Identifikationsmerkmale.</li>
                                        </ul>
                                    </PolicySection>

                                    <PolicySection id="google-adsense" icon={Sliders} title="3. Google AdSense">
                                        <p>Wir nutzen <strong>Google AdSense</strong> zur Finanzierung dieses Dienstes. Google verwendet Cookies, um Anzeigen basierend auf Ihren Besuchen zu schalten.</p>
                                    </PolicySection>

                                    <PolicySection id="contact" icon={Mail} title="4. Kontakt">
                                        <p>Bei Fragen: <Link href="mailto:privacy@ambigramgenerator.me" className="text-indigo-600 font-bold hover:underline">privacy@ambigramgenerator.me</Link></p>
                                    </PolicySection>
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

            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight  leading-tight">Privacy Policy</h1>
                <p className="text-xl text-slate-400 font-medium italic">Last Updated: October 30, 2025</p>
            </section>

            <section className="pb-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Table of Contents */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3 text-left">On this page</h3>
                                <SidebarLink href="#introduction">1. Introduction</SidebarLink>
                                <SidebarLink href="#no-collect">2. Data We Don&apos;t Collect</SidebarLink>
                                <SidebarLink href="#collect">3. Information We Collect</SidebarLink>
                                <SidebarLink href="#use">4. Use of Information</SidebarLink>
                                <SidebarLink href="#cookies">5. Cookies</SidebarLink>
                                <SidebarLink href="#security">6. Data Security</SidebarLink>
                                <SidebarLink href="#google-adsense">7. Advertising Disclosure</SidebarLink>
                                <SidebarLink href="#contact">8. Contact Us</SidebarLink>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:w-3/4 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <article className="prose prose-lg prose-slate text-slate-700 max-w-none">

                                <PolicySection id="introduction" icon={Info} title="1. Introduction">
                                    <p>Welcome to AmbigramGenerator.me (the &quot;Service&quot;). We are committed to protecting your privacy. This policy explains how we handle your data when using our generator.</p>
                                    <p>By using our website, you agree to the collection and use of information in accordance with this policy.</p>
                                </PolicySection>

                                <PolicySection id="no-collect" icon={EyeOff} title="2. Information We Don&apos;t Collect">
                                    <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-8 shadow-sm">
                                        <p className="m-0 font-black text-indigo-900 text-lg mb-3">Your Privacy is Native</p>
                                        <p className="m-0 text-indigo-800 leading-relaxed">We want to emphasize that <strong>we do not collect or store</strong> any of the following:</p>
                                        <ul className="list-disc ml-6 mt-4 space-y-2 text-indigo-900 font-bold">
                                            <li>Any text you input into the generator.</li>
                                            <li>The ambigrams you create using our service.</li>
                                            <li>Personal identification information.</li>
                                        </ul>
                                    </div>
                                </PolicySection>

                                <PolicySection id="collect" icon={BarChart3} title="3. Information We May Collect">
                                    <p>For analytics and service improvement, we may collect anonymous, non-personal information:</p>
                                    <ul className="list-disc ml-6 space-y-2 font-medium">
                                        <li>Aggregate usage data (visitor counts, popular features).</li>
                                        <li>Browser type, operating system, and referral source.</li>
                                        <li>Pages visited and time spent on each page.</li>
                                    </ul>
                                </PolicySection>

                                <PolicySection id="use" icon={Settings} title="4. How We Use Information">
                                    <p>We use the anonymous information to optimize our website, understand user interaction, and fix technical bugs.</p>
                                </PolicySection>

                                <PolicySection id="cookies" icon={Cookie} title="5. Cookies">
                                    <p>We use small text files (cookies) to enhance experience. They do not collect personal info and can be disabled in your browser settings.</p>
                                </PolicySection>

                                <PolicySection id="security" icon={Lock} title="6. Data Security">
                                    <p>Since your ambigram creations are processed <strong>in your browser</strong> and not on our servers, designs are safe from unauthorized server access.</p>
                                </PolicySection>

                                <PolicySection id="google-adsense" icon={ExternalLink} title="7. Google AdSense & Advertising">
                                    <p>We display ads through <strong>Google AdSense</strong>. Google uses the DoubleClick DART cookie to serve ads based on your visits to this and other sites.</p>
                                    <p>Opt-out via <Link href="https://policies.google.com/technologies/ads" className="text-indigo-600 underline font-bold">Google Privacy Policy</Link>.</p>
                                </PolicySection>

                                <PolicySection id="contact" icon={Mail} title="8. Contact Us">
                                    <p>Questions? Reach us at: <Link href="mailto:privacy@ambigramgenerator.me" className="text-indigo-600 font-bold hover:underline">privacy@ambigramgenerator.me</Link></p>
                                </PolicySection>

                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}