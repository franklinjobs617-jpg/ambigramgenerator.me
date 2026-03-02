import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { constructMetadata } from "@/lib/seo";
import Generator2d from "@/components/Generator2d"; // 引入你的 2D 生成器
import {
    Printer,
    Layers,
    PenTool,
    CheckCircle2,
    Settings,
    Droplets,
    Image as ImageIcon,
    AlertCircle,
    ChevronRight
} from "lucide-react";

const DOMAIN = "https://www.ambigramgenerator.me";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/tattoo-stencil-maker";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Free Tattoo Stencil Maker | Printable Outlines & Lettering Generator",
            description: "Generate high-contrast tattoo stencils optimized for thermal printers. Create crisp fineline, lettering, and two-name ambigram outlines with transparent backgrounds."
        },
        de: {
            title: "Tattoo Stencil Maker | Vorlagen & Outlines kostenlos erstellen",
            description: "Erstelle gestochen scharfe Tattoo Stencils für Thermo-Drucker. Fineline, Lettering & 2-Namen Ambigramme. Transparenter Hintergrund. 100% kostenlos."
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

export default async function TattooStencilMakerPage({ params }: Props) {
    const { locale } = await params;

    // JSON-LD 结构化数据 (定义为 WebApplication/Tool)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": locale === 'de' ? "Tattoo Stencil Maker" : "Tattoo Stencil Maker",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": locale === 'de'
            ? "Erstelle gestochen scharfe Tattoo Stencils für Thermo-Drucker und EcoTank."
            : "Generate high-contrast tattoo stencils optimized for thermal printers.",
        "url": `${DOMAIN}/${locale === 'en' ? '' : locale + '/'}tattoo-stencil-maker`
    };

    // ========================================================================
    // 德语版本 (German) - 极致 SEO 与行业黑话版
    // ========================================================================
    if (locale === 'de') {
        return (
            <main className="bg-[#FDFDFF]">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                {/* Hero 区域 */}
                <section className="bg-gradient-to-b from-slate-900 to-slate-800 pt-32 pb-24 px-6 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-0" />
                    <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-indigo-500/30">
                            <CheckCircle2 size={16} /> Gestochen scharfe Outlines
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                            Kostenloser <span className="text-indigo-400">Tattoo Stencil Maker</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed mb-10">
                            Schluss mit unscharfen Kanten. Generiere hochkontrastige Lettering- und Ambigramm-Vorlagen, die dein Stencil Drucker fehlerfrei liest.
                        </p>
                    </div>
                </section>

                {/* 核心工具区域 - 直接嵌入 Generator2d */}
                <section className="relative -mt-12 px-6 pb-20 z-20">
                    <div className="container mx-auto max-w-5xl">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-2 md:p-8">
                            <div className="flex items-center justify-between mb-6 px-4 pt-4">
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Outline Generator</h2>
                                <div className="flex gap-3">
                                    <span className="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                                        <Printer size={14} /> Optimiert für Thermo-Drucker
                                    </span>
                                </div>
                            </div>

                            {/* 🔥 引入 2D 生成器 */}
                            <Generator2d />

                        </div>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                            <h2 className="text-3xl font-black text-[#1A1A1B] mb-8 tracking-tight">Warum Tätowierer unser Tool lieben</h2>

                            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm">
                                    <Printer size={28} className="text-indigo-600 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">Tattoo Stencil Drucker ready</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed font-medium">Egal ob klassischer Thermo-Drucker (Brother PJ) oder umgebauter Epson EcoTank: Unsere reinen S/W-Vorlagen garantieren fehlerfreie Matrizen ohne Graustufen-Matsch.</p>
                                </div>
                                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm">
                                    <Layers size={28} className="text-indigo-600 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">Transparenter Hintergrund</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed font-medium">Exportiere dein PNG mit transparentem Hintergrund. Perfekt, um die Outlines direkt in Procreate auf dem iPad weiterzubearbeiten.</p>
                                </div>
                                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm">
                                    <PenTool size={28} className="text-indigo-600 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">Fineline Tattoo Stencils</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed font-medium">Unsere Algorithmen sind für präzise Letterings optimiert. Die klaren Pfade lassen sich beim Stechen mühelos nachziehen.</p>
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-[#1A1A1B] mt-24 mb-8 tracking-tight border-b border-slate-100 pb-4">Tattoo Stencil Hacks & FAQ</h2>
                            <p className="text-slate-500 font-medium mb-8">Echtes Studio-Wissen für Beginner und Profis. So bekommst du die perfekte Matrize auf die Haut.</p>

                            <div className="space-y-6 not-prose">
                                {[
                                    {
                                        q: "Welcher Tattoo Stencil Drucker ist der beste?",
                                        a: "Für unterwegs schwören viele auf Thermo-Drucker (z.B. Brother PocketJet). Für extrem feine Fineline Tattoo Stencils setzen Studios zunehmend auf Inkjet-Drucker (wie den Epson EcoTank), die mit spezieller Stencil-Tinte befüllt werden. Unser Tool liefert für beide Systeme den perfekten Kontrast."
                                    },
                                    {
                                        q: "Welches Stencil Papier für Tattoos soll ich nutzen?",
                                        a: "Für Thermo-Drucker brauchst du Thermo-Matrizenpapier (z.B. das klassische Spirit Thermal Tattoo Transfer Paper). Wenn du die Tattoo Outline Vorlagen per Hand durchpaust, nimm normales Spirit Freehand Papier."
                                    },
                                    {
                                        q: "Gibt es eine Tattoo Stencil Flüssigkeit Alternative?",
                                        a: "Wenn dir dein Stencil Stuff ausgegangen ist: Ein klassischer Dettol-Mix oder grüne Seife (Green Soap) funktionieren zur Not. Old-School-Tätowierer nutzen manchmal sogar einfachen Deostift (z.B. Speed Stick), um den Abzug auf die Haut zu bringen – das klebt erstaunlich gut!"
                                    },
                                    {
                                        q: "Stencil falsch platziert? Hausmittel zum Entfernen?",
                                        a: "Ein bewährtes Hausmittel zum Tattoo Stencil entfernen ist hochprozentiger Reinigungsalkohol (Isopropylalkohol) oder Handdesinfektionsmittel. Auf ein Zewa geben und kräftig abwischen. Danach die Haut kurz beruhigen lassen, reinigen und die Matrize neu ansetzen."
                                    }
                                ].map((faq, i) => (
                                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                        <h4 className="text-lg font-bold text-slate-900 flex items-start gap-3">
                                            <Settings className="text-indigo-500 flex-shrink-0 mt-1" size={20} />
                                            {faq.q}
                                        </h4>
                                        <p className="text-slate-600 mt-3 ml-8 text-sm leading-relaxed font-medium">{faq.a}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Coming Soon 画大饼区域，占位图案长尾词 */}
                            <div className="mt-20 p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2.5rem] border border-indigo-100 not-prose">
                                <div className="inline-block bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Coming Soon</div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">Mehr als nur Text: Die Stencil Pattern Library</h3>
                                <p className="text-slate-600 font-medium mb-6">Wir bauen den Generator weiter aus! Bald musst du nicht mehr auf Pinterest nach Standard-Motiven suchen. Freu dich auf Generatoren für:</p>
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {["Rose Tattoo Stencil", "Skull Tattoos Stencils", "Pattern Geometric", "Medusa Outlines", "Mandala Vorlagen", "Cyber Sigilism"].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-sm font-bold text-indigo-900 bg-white/60 px-4 py-2 rounded-xl">
                                            <ChevronRight size={14} className="text-indigo-400" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        );
    }

    // ========================================================================
    // 英语版本 (Default / English Version) - 包含纯正英语纹身黑话
    // ========================================================================
    return (
        <main className="bg-[#FDFDFF]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="bg-gradient-to-b from-slate-900 to-slate-800 pt-32 pb-24 px-6 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-0" />
                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-indigo-500/30">
                        <CheckCircle2 size={16} /> Crisp & Clean Outlines
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                        Free <span className="text-indigo-400">Tattoo Stencil Maker</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed mb-10">
                        No more blurry edges. Generate high-contrast lettering and ambigram outlines perfectly optimized for your thermal stencil printer.
                    </p>
                </div>
            </section>

            {/* Embed Tool */}
            <section className="relative -mt-12 px-6 pb-20 z-20">
                <div className="container mx-auto max-w-5xl">
                    <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-2 md:p-8">
                        <div className="flex items-center justify-between mb-6 px-4 pt-4">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Outline Generator</h2>
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                                    <Printer size={14} /> Thermal Printer Ready
                                </span>
                            </div>
                        </div>
                        <Generator2d />
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="prose prose-lg prose-slate text-slate-700 max-w-none">
                        <h2 className="text-3xl font-black text-[#1A1A1B] mb-8 tracking-tight">Built for Tattoo Artists</h2>

                        <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                            <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm">
                                <Printer size={28} className="text-indigo-600 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Printer Optimized</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">Whether you use a Brother PocketJet or a converted Epson EcoTank, our pure B&W outputs guarantee flawless transfers with zero grayscale mush.</p>
                            </div>
                            <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm">
                                <Layers size={28} className="text-indigo-600 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Transparent Backgrounds</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">Export your PNG with a transparent background. Perfect for dropping straight into Procreate on your iPad for further tweaking.</p>
                            </div>
                            <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm">
                                <PenTool size={28} className="text-indigo-600 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Fineline Focus</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">Our algorithm ensures precise, sharp paths that won't blow out, making them effortless to trace during the tattoo session.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black text-[#1A1A1B] mt-24 mb-8 tracking-tight border-b border-slate-100 pb-4">Tattoo Stencil Hacks & FAQ</h2>

                        <div className="space-y-6 not-prose">
                            {[
                                {
                                    q: "What's the best tattoo stencil printer?",
                                    a: "For portability, thermal printers (like Brother PocketJet) are industry standard. For ultra-detailed fineline work, many studios are shifting to inkjet printers (like Epson EcoTank) filled with specialized stencil ink. Our generator provides the perfect contrast for both."
                                },
                                {
                                    q: "What stencil paper should I use?",
                                    a: "For thermal printers, use thermal transfer paper (like classic Spirit Thermal paper). If you're tracing the outline by hand, grab Spirit Freehand paper instead."
                                },
                                {
                                    q: "What's a good alternative to Stencil Stuff?",
                                    a: "If you're out of Stencil Stuff or Electrum: Green soap or a Dettol mix works in a pinch. Old-school artists sometimes even use unscented stick deodorant (like Speed Stick) to apply the stencil—it sticks surprisingly well!"
                                },
                                {
                                    q: "Placed the stencil wrong? How to remove it?",
                                    a: "It happens to the best of us! Isopropyl alcohol or strong alcohol-based hand sanitizer works best. Apply to a paper towel, wipe firmly, let the skin calm down for a minute, clean it, and reapply."
                                }
                            ].map((faq, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                    <h4 className="text-lg font-bold text-slate-900 flex items-start gap-3">
                                        <AlertCircle className="text-indigo-500 flex-shrink-0 mt-1" size={20} />
                                        {faq.q}
                                    </h4>
                                    <p className="text-slate-600 mt-3 ml-8 text-sm leading-relaxed font-medium">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}