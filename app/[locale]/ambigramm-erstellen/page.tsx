import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import Generator2d from "@/components/Generator2d";
import { Sparkles, ArrowRight, Check, HelpCircle } from "lucide-react";

type Props = { params: { locale: string } };

// TDH — Semrush DE 数据
// "ambigramm erstellen"              210/月 KD=18
// "ambigramm aus zwei namen erstellen" 40/月
// "ambigramm erstellen kostenlos"     30/月
// "ambigramm namen erstellen"         20/月
// "ambigramm online erstellen"        20/月
// GSC: "ambigramm erstellen" 27展示 位置51 — 没有专属德语内容页导致排名低
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "Ambigramm Erstellen Kostenlos — Online Generator für Zwei Namen",
        description: "Ambigramm kostenlos online erstellen. Zwei Namen oder Wörter eingeben, Stil wählen, PNG herunterladen. Kein Konto erforderlich, kein Wasserzeichen.",
        path: "/ambigramm-erstellen",
        locale,
    });
}

const namenBeispiele = [
    { paar: "Lukas / Anna", qualität: "Ausgezeichnet", grund: "Gleiche Buchstanzahl — optimale Rotation" },
    { paar: "Leon / Lena", qualität: "Ausgezeichnet", grund: "4 Buchstaben, symmetrische Struktur" },
    { paar: "Liebe / Hass", qualität: "Sehr gut", grund: "Klassisches Kontrast-Konzept für Tattoos" },
    { paar: "Leben / Tod", qualität: "Gut", grund: "Philosophischer Kontrast, sehr beliebt" },
    { paar: "Maximilian / Eva", qualität: "Schwierig", grund: "Zu unterschiedliche Länge — Max/Eva versuchen" },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Ambigramm Generator — Ambigramm erstellen",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web Browser",
        "inLanguage": "de",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
        "description": "Kostenloser Online-Generator zum Erstellen von Ambigrammen mit zwei Namen oder Wörtern. PNG-Download ohne Konto.",
        "url": "https://www.ambigramgenerator.me/de/ambigramm-erstellen"
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Wie kann ich ein Ambigramm kostenlos erstellen?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Geben Sie ein oder zwei Wörter in den Generator ein, wählen Sie einen Stil und klicken Sie auf Generieren. Der PNG-Download ist sofort und kostenlos — ohne Konto oder Anmeldung."
                }
            },
            {
                "@type": "Question",
                "name": "Was ist ein Ambigramm aus zwei Namen?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ein Ambigramm mit zwei Namen ist ein typografisches Design, das zwei verschiedene Namen in einem einzigen Bild vereint. Normal gelesen erscheint der erste Name; um 180° gedreht erscheint der zweite. Ideal für Paar-Tattoos und persönliche Geschenke."
                }
            },
            {
                "@type": "Question",
                "name": "Welche Namen eignen sich am besten für ein Ambigramm?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Namen mit gleicher Buchstanzahl ergeben die besten Ergebnisse. Paare wie Lukas/Anna, Leon/Lena oder Liebe/Hass funktionieren sehr gut. Bei sehr unterschiedlichen Längen empfehlen sich Kurzformen oder Spitznamen."
                }
            },
            {
                "@type": "Question",
                "name": "Kann ich das erstellte Ambigramm für ein Tattoo verwenden?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja. Laden Sie das PNG in hoher Auflösung herunter und zeigen Sie es Ihrem Tätowierer als Referenz. Wählen Sie den Kalligrafie-Stil für die saubersten Linien. Alle Designs sind ohne Wasserzeichen und frei für persönliche und kommerzielle Nutzung."
                }
            }
        ]
    }
];

export default async function AmbigrammErstellenPage({ params }: Props) {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Kostenlos · Ohne Anmeldung · Sofort-Download
                    </div>
                    {/* H1 = Hauptkeyword "ambigramm erstellen" */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Ambigramm Erstellen{" "}
                        <span className="text-indigo-600">Kostenlos Online</span>
                    </h1>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                        Zwei Namen oder Wörter eingeben, Stil auswählen, PNG herunterladen.
                        Perfekt für Paar-Tattoos, persönliche Geschenke und 3D-Druck.
                        Kostenlos, ohne Konto, ohne Wasserzeichen.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="#generator"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            <Sparkles size={15} /> Ambigramm jetzt erstellen
                        </Link>
                        <Link
                            href="/3d-generator"
                            className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 px-7 py-4 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                        >
                            3D-Version (STL) <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* GENERATOR */}
            <section id="generator" className="px-4 pb-8 scroll-mt-24">
                <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-indigo-100/40">
                    <Generator2d />
                </div>

                {/* Pro hook */}
                <div className="max-w-7xl mx-auto mt-5 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-transparent p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                                    <Sparkles size={10} /> Pro
                                </span>
                                <span className="text-xs text-slate-400">Kostenlose Version: begrenzte Credits · Standardauflösung</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900">HD-Download und 3D-STL-Export gewünscht?</p>
                            <p className="text-xs text-slate-500 mt-0.5">Pro: 666 Credits/Monat, 2K HD-Output und 3D-druckbare STL-Dateien.</p>
                        </div>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            <Sparkles size={14} /> Preise ansehen
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-4xl space-y-14">

                    {/* WIE ERSTELLEN — "ambigramm online erstellen" */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Ambigramm online erstellen — in 3 Schritten
                        </h2>
                        <div className="space-y-3">
                            {[
                                ["1", "Zwei Namen oder Wörter eingeben", "Ersten Namen ins obere Feld, zweiten Namen ins untere Feld. Der Generator verarbeitet alle deutschen Namen, fremdsprachige Namen und beliebige Wörter."],
                                ["2", "Stil auswählen", "Kalligrafie für Tattoos und elegante Designs, Blocky für moderne, markante Looks. Die Vorschau wird in Echtzeit aktualisiert."],
                                ["3", "Kostenlos herunterladen", "PNG in hoher Auflösung herunterladen — kein Konto, kein Wasserzeichen. Sofort einsatzbereit für Ihren Tätowierer oder 3D-Drucker."],
                            ].map(([n, titel, beschr]) => (
                                <div key={n} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">{n}</div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm mb-1">{titel}</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">{beschr}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ZWEI NAMEN — "ambigramm aus zwei namen erstellen" */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">
                            Ambigramm aus zwei Namen erstellen
                        </h2>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                            Ein Ambigramm mit zwei Namen ist ein typografisches Design, das beide Namen in einem einzigen Bild vereint.
                            Normal gelesen erscheint der erste Name — um 180° gedreht erscheint der zweite.
                            Die Qualität hängt vor allem von der Buchstanzahl und der Kompatibilität der Buchstabenformen ab.
                        </p>

                        {/* SVG — Rotations-Illustration */}
                        <div className="flex justify-center mb-8">
                            <svg viewBox="0 0 340 80" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
                                <rect width="340" height="80" rx="16" fill="#EEF2FF"/>
                                <text x="85" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#4338CA">Lukas</text>
                                <text x="170" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fill="#94A3B8">↻ 180°</text>
                                <text x="255" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#6366F1">Anna</text>
                            </svg>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="w-full min-w-[480px] text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Namenspaar</th>
                                        <th className="px-4 py-3 text-left">Qualität</th>
                                        <th className="px-4 py-3 text-left">Warum</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {namenBeispiele.map((ex) => (
                                        <tr key={ex.paar} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-3 font-bold text-indigo-700">{ex.paar}</td>
                                            <td className="px-4 py-3 text-slate-700">{ex.qualität}</td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">{ex.grund}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
                            <p className="font-bold text-amber-900 text-sm mb-1">Praktischer Tipp</p>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                Bei sehr unterschiedlichen Namenslängen (z.B. Maximilian und Eva) empfiehlt sich eine
                                Kurzform oder ein Spitzname. Ein lesbares Ambigramm mit 4–6 Buchstaben ist deutlich
                                besser als ein unlesbares Design mit 10 Buchstaben.
                            </p>
                        </div>
                    </div>

                    {/* AMBIGRAMM NAMEN ERSTELLEN — tattoo use case */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Ambigramm für Tattoos — Namen erstellen
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Das Ambigramm-Tattoo mit zwei Namen ist eine der originellsten Ideen,
                            um zwei Menschen in einem einzigen Symbol zu vereinen.
                            Vor dem Termin mit Ihrem Tätowierer:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            {[
                                ["Mindestgröße", "Mindestens 6 cm Breite, damit beide Namen über Zeit lesbar bleiben."],
                                ["Empfohlener Stil", "Kalligrafie-Stil für weichere Linien, die besser auf der Haut funktionieren."],
                                ["Datei übergeben", "PNG herunterladen und per E-Mail oder WhatsApp an den Tätowierer senden."],
                                ["Platzierung", "Inneres Handgelenk, Unterarm und Brustbein sind am beliebtesten — die 180°-Drehung muss eine natürliche Geste sein."],
                            ].map(([titel, beschr]) => (
                                <li key={titel} className="flex gap-3">
                                    <span className="font-bold text-slate-900 flex-shrink-0">{titel}:</span>
                                    <span>{beschr}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link href="/ambigram-tattoo-generator" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Tattoo Ambigramm Generator <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                                <HelpCircle size={17} />
                            </div>
                            Häufig gestellte Fragen
                        </h2>
                        <div className="space-y-3">
                            {[
                                {
                                    q: "Wie kann ich ein Ambigramm kostenlos erstellen?",
                                    a: "Namen oder Wörter oben eingeben, auf Generieren klicken, PNG herunterladen — kostenlos, ohne Konto, ohne Wasserzeichen."
                                },
                                {
                                    q: "Was ist ein Ambigramm aus zwei Namen?",
                                    a: "Ein typografisches Design, das zwei Namen in einem Bild vereint. Normal gelesen erscheint der erste Name; um 180° gedreht erscheint der zweite. Ideal für Paar-Tattoos."
                                },
                                {
                                    q: "Welche Namen eignen sich am besten?",
                                    a: "Namen mit gleicher Buchstanzahl: Lukas/Anna, Leon/Lena, Liebe/Hass. Bei sehr unterschiedlichen Längen Kurzformen verwenden."
                                },
                                {
                                    q: "Kann ich das Ambigramm für ein Tattoo verwenden?",
                                    a: "Ja. PNG herunterladen und dem Tätowierer als Referenz zeigen. Kalligrafie-Stil für die saubersten Linien wählen. Ohne Wasserzeichen, frei für persönliche und kommerzielle Nutzung."
                                },
                                {
                                    q: "Gibt es auch einen 3D-Ambigramm Generator?",
                                    a: "Ja. Der 3D-Generator erstellt ein physisches Objekt, das den ersten Namen von einer Seite und den zweiten nach 90°-Drehung zeigt. STL-Datei für den 3D-Druck herunterladen."
                                },
                            ].map(({ q, a }) => (
                                <div key={q} className="border border-slate-100 rounded-xl p-5 bg-white">
                                    <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-indigo-600 rounded-2xl p-10 text-white">
                        <h2 className="text-2xl font-black mb-3">Ihr Ambigramm erstellen</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
                            Zwei Namen eingeben und Ihr einzigartiges Design generieren.
                            Kostenlos, ohne Anmeldung, ohne Wasserzeichen.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="#generator" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                                <Sparkles size={15} /> Ambigramm erstellen
                            </Link>
                            <Link href="/3d-generator" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                                3D STL Generator <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold text-indigo-200">
                            <Link href="/ambigram-tattoo-generator" className="hover:text-white transition-colors">Tattoo Generator</Link>
                            <Link href="/flipscript-alternative" className="hover:text-white transition-colors">Flipscript Alternative</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors">Pro-Preise</Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
