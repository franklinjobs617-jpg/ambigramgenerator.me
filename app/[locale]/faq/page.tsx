import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle, ShieldCheck, Download, DollarSign, Globe, RotateCw } from "lucide-react";
import { constructMetadata } from "@/lib/seo"; // 引入封装的 SEO 函数
// 辅助函数
const DOMAIN = "https://www.ambigramgenerator.me";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/faq";

    const seo: Record<string, { title: string; description: string }> = {
        en: {
            title: "FAQ | Ambigram Generator - Usage, Rights & Features",
            description: "Frequently asked questions about our ambigram generator service, usage, and features. Learn about commercial rights and file formats."
        },
        fr: {
            title: "FAQ | Générateur d'Ambigramme - Utilisation et Fonctionnalités",
            description: "Questions fréquemment posées sur notre service de générateur d'ambigrammes. En savoir plus sur les droits commerciaux et les formats de fichiers."
        },
        de: {
            title: "FAQ | Ambigramm Generator - Nutzung, Rechte & Funktionen",
            description: "Häufig gestellte Fragen zu unserem Ambigramm-Generator-Service. Erfahren Sie mehr über gewerbliche Nutzungsrechte und Dateiformate."
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


export default async function FaqPage({ params }: Props) {
    const { locale } = await params;

    // 🌟 FAQ 结构化数据 (帮助 Google 抓取并直接在搜索结果显示 FAQ)
    const faqData = [
        {
            q: locale === 'fr' ? "Qu'est-ce qu'un ambigramme ?" : locale === 'de' ? "Was ist ein Ambigramm?" : "What is an ambigram?",
            a: locale === 'fr' ? "Un ambigramme est un design typographique qui peut être lu comme un ou plusieurs mots lorsqu'il est vu sous différentes orientations." : locale === 'de' ? "Ein Ambigramm ist ein typografisches Design, das aus verschiedenen Blickwinkeln als ein oder mehrere Wörter gelesen werden kann." : "An ambigram is a typographical design that may be read as one or more words when viewed from different orientations, typically rotated 180 degrees."
        },
        // ... 此处省略其他项，代码逻辑会循环生成
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    const FaqCard = ({ q, a, icon: Icon }: { q: string, a: React.ReactNode, icon: any }) => (
        <details className="group bg-white border border-slate-100 rounded-[2rem] mb-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
            <summary className="list-none cursor-pointer p-8 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-open:bg-indigo-600 group-open:text-white transition-colors duration-300">
                        <Icon size={24} />
                    </div>
                    <span className="text-xl font-bold text-[#1A1A1B] tracking-tight">{q}</span>
                </div>
                <ChevronDown className="text-slate-300 group-open:rotate-180 transition-transform duration-300" size={24} />
            </summary>
            <div className="px-8 pb-8 pt-2 ml-16">
                <div className="text-slate-600 leading-relaxed font-medium">
                    {a}
                </div>
            </div>
        </details>
    );

    // ========================================================================
    // 法语版本 (French)
    // ========================================================================
    if (locale === 'fr') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Questions Fréquemment Posées</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">Tout ce que vous devez savoir sur notre générateur d&apos;ambigrammes.</p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FaqCard icon={HelpCircle} q="Qu'est-ce qu'un ambigramme ?" a="Un ambigramme est un design typographique qui peut être lu comme un ou plusieurs mots lorsqu'il est vu sous différentes orientations, généralement tourné à 180 degrés. Certains ambigrammes peuvent également être lus comme des mots différents selon la direction de visualisation, créant un effet visuel intrigant parfait pour les tatouages, les logos et les expressions artistiques." />
                        <FaqCard icon={DollarSign} q="Votre générateur d'ambigrammes est-il gratuit ?" a="Oui, notre générateur d'ambigrammes est complètement gratuit. Vous pouvez créer, personnaliser et télécharger autant d'ambigrammes que vous le souhaitez sans frais cachés ni abonnement. Nous croyons en l'accessibilité des outils créatifs pour tous." />
                        <FaqCard icon={Globe} q="Puis-je utiliser les ambigrammes à des fins commerciales ?" a={<>Oui, vous pouvez utiliser les ambigrammes créés pour des usages personnels et commerciaux (tatouages, logos, produits). Cependant, vous ne pouvez pas revendiquer la technologie du générateur comme la vôtre. Pour plus de détails, consultez nos <Link href="/terms" className="text-indigo-600 font-bold hover:underline">Conditions d&apos;Utilisation</Link>.</>} />
                        <FaqCard icon={Download} q="Quels formats de fichiers sont disponibles ?" a="Notre générateur permet de télécharger des fichiers PNG haute résolution (idéal pour le numérique et l'impression avec transparence) ainsi que des versions SVG vectorielles pour les travaux de design professionnel nécessitant une mise à l'échelle infinie." />
                        <FaqCard icon={RotateCw} q="Pourquoi mon ambigramme ne rend-il pas bien une fois retourné ?" a={<>La lisibilité dépend de la compatibilité des lettres. Si le résultat ne vous convient pas, essayez : <ul className="list-disc pl-5 mt-4 space-y-2"><li>D&apos;utiliser des mots plus courts (3-6 lettres)</li><li>De changer de police</li><li>D&apos;expérimenter avec des synonymes</li></ul></>} />
                        <FaqCard icon={ShieldCheck} q="Stockez-vous les ambigrammes que je crée ?" a="Non. Tout le traitement se fait localement dans votre navigateur. Vos créations ne sont jamais envoyées sur nos serveurs, garantissant une confidentialité totale." />
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
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Häufig gestellte Fragen</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">Alles, was Sie über unseren Ambigramm-Generator wissen müssen.</p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FaqCard icon={HelpCircle} q="Was ist ein Ambigramm?" a="Ein Ambigramm ist ein typografisches Design, das aus verschiedenen Blickwinkeln, meist um 180 Grad gedreht, als ein oder mehrere Wörter gelesen werden kann. Einige Ambigramme können je nach Blickrichtung sogar unterschiedliche Wörter darstellen – perfekt für Tattoos, Logos und Kunst." />
                        <FaqCard icon={DollarSign} q="Ist der Generator kostenlos?" a="Ja, unser Generator ist absolut kostenlos. Sie können unbegrenzt Ambigramme erstellen, anpassen und herunterladen, ohne versteckte Kosten oder Abonnements. Wir fördern kreative Freiheit für jeden." />
                        <FaqCard icon={Globe} q="Gewerbliche Nutzung erlaubt?" a={<>Ja, die erstellten Designs dürfen für private und kommerzielle Zwecke genutzt werden. Sie dürfen jedoch nicht behaupten, die zugrunde liegende Technologie selbst entwickelt zu haben. Details finden Sie in unseren <Link href="/terms" className="text-indigo-600 font-bold hover:underline">Nutzungsbedingungen</Link>.</>} />
                        <FaqCard icon={Download} q="Welche Dateiformate gibt es?" a="Wir bieten hochauflösende PNG-Dateien (mit Transparenz für Druck & Web) sowie SVG-Vektorgrafiken für professionelle Designarbeiten an, die ohne Qualitätsverlust skaliert werden können." />
                        <FaqCard icon={RotateCw} q="Warum sieht mein Ambigramm nicht gut aus?" a={<>Die Qualität hängt von der Buchstabenkombination ab. Tipps zur Verbesserung: <ul className="list-disc pl-5 mt-4 space-y-2"><li>Kürzere Wörter verwenden (3-6 Zeichen)</li><li>Schriftart wechseln</li><li>Mit ähnlichen Wörtern experimentieren</li></ul></>} />
                        <FaqCard icon={ShieldCheck} q="Werden meine Designs gespeichert?" a="Nein. Die gesamte Verarbeitung findet lokal in Ihrem Browser statt. Ihre Designs werden niemals auf unsere Server übertragen – für maximale Privatsphäre." />
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

            <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-32 pb-20 px-6 text-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Frequently Asked Questions</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">Everything you need to know about our ambigram generator.</p>
                </div>
            </section>

            <section className="pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FaqCard icon={HelpCircle} q="What is an ambigram?" a="An ambigram is a typographical design that may be read as one or more words when viewed from different orientations, typically rotated 180 degrees. Some ambigrams can also be read as different words depending on the viewing direction, creating an intriguing visual effect perfect for tattoos, logos, and artistic expressions." />
                    <FaqCard icon={DollarSign} q="Is your ambigram generator free to use?" a="Yes, our ambigram generator is completely free to use. You can create, customize, and download as many ambigrams as you want without any hidden costs or subscription fees. We believe in making creative tools accessible to everyone." />
                    <FaqCard icon={Globe} q="Can I use the generated ambigrams commercially?" a={<>Yes, you can use the ambigrams created with our generator for both personal and commercial purposes (tattoos, logos, merchandise). However, you may not claim the generator itself as your own. Review our <Link href="/terms" className="text-indigo-600 font-bold hover:underline">Terms of Service</Link> for details.</>} />
                    <FaqCard icon={Download} q="What file formats can I download my ambigram in?" a="Our generator allows you to download your ambigrams in high-resolution PNG format, which is ideal for digital displays and printing. For professional design work, you can also capture SVG versions for scalable vector graphics." />
                    <FaqCard icon={RotateCw} q="Why doesn't my ambigram look good when rotated?" a={<>Creating effective ambigrams depends on letter compatibility. If it doesn&apos;t look good, try: <ul className="list-disc pl-5 mt-4 space-y-2"><li>Using shorter words (3-6 letters)</li><li>Choosing different fonts</li><li>Experimenting with similar-looking words</li></ul></>} />
                    <FaqCard icon={ShieldCheck} q="Do you store the ambigrams I create?" a="No, we do not store any of the ambigrams you create. All processing happens locally in your browser, and your creations are not sent to our servers. This ensures your privacy and means you have full control." />
                    <FaqCard icon={MessageCircle} q="Can I request new fonts or features?" a="Absolutely! If you have suggestions for new fonts or features, please reach out via our feedback form. We value user input and update our tool based on community needs." />
                </div>
            </section>
        </main>
    );
}