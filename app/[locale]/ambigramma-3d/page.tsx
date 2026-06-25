import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import Generator3d from "@/components/Generator3d";
import { Sparkles, ArrowRight, Check, HelpCircle, Printer } from "lucide-react";

type Props = { params: { locale: string } };

// TDH — Semrush IT + GSC data
// "ambigramma con due nomi 3d"  17点击 160展示 位置5.78 CTR10.62% · Semrush 110/月 KD=15
// "ambigramma 3d"               1点击  9展示  位置6.67
// "ambigramme generator 3d"     0点击  23展示 位置6.7 CTR0%（manca pagina dedicata）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "Ambigramma 3D con Due Nomi Gratis — Generatore Online e File STL",
        description: "Crea un ambigramma 3D con due nomi gratis. Visualizza il modello in tempo reale, scarica il file STL per la stampa 3D. Senza registrazione, senza filigrana.",
        path: "/ambigramma-3d",
        locale,
    });
}

const useCases = [
    {
        icon: <Printer size={18} className="text-indigo-600" />,
        titolo: "Stampa 3D",
        desc: "Scarica il file STL e invialo a qualsiasi servizio di stampa 3D online, oppure stampalo tu stesso se hai una stampante 3D. L'oggetto fisico mostra il primo nome da un lato e il secondo dopo la rotazione di 90°.",
    },
    {
        icon: <Check size={18} className="text-indigo-600" />,
        titolo: "Regalo personalizzato",
        desc: "Un ambigramma 3D con due nomi è un regalo originale e unico — un oggetto da scrivania che nessun altro possiede. Perfetto per anniversari, matrimoni e compleanni.",
    },
    {
        icon: <Sparkles size={18} className="text-indigo-600" />,
        titolo: "Arte tipografica",
        desc: "Usa il file GIF animato per condividere il tuo ambigramma 3D sui social. Il design rotante mostra entrambi i nomi in modo spettacolare.",
    },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Generatore Ambigramma 3D",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web Browser",
        "inLanguage": "it",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
        "description": "Generatore gratuito di ambigrammi 3D con due nomi. Visualizzazione in tempo reale, download STL per stampa 3D e GIF animata.",
        "url": "https://www.ambigramgenerator.me/it/ambigramma-3d"
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Come creare un ambigramma 3D con due nomi gratis?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Inserisci il primo nome nel campo superiore e il secondo nel campo inferiore del generatore 3D, fai clic su Genera e scarica il file STL o il GIF animato. Nessun account richiesto."
                }
            },
            {
                "@type": "Question",
                "name": "Che cos'è un ambigramma 3D con due nomi?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Un ambigramma 3D con due nomi è un oggetto fisico (o modello digitale) che mostra il primo nome quando visto da un lato e il secondo nome quando ruotato di 90°. È la versione tridimensionale dell'ambigramma tradizionale, progettata per la stampa 3D."
                }
            },
            {
                "@type": "Question",
                "name": "Posso stampare in 3D il mio ambigramma?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sì. Scarica il file STL e invialo a qualsiasi servizio di stampa 3D online (come i3DMaker, 3D Hubs, Sculpteo) oppure stampalo direttamente se possiedi una stampante 3D. Il file è compatibile con tutti i principali software di slicing."
                }
            },
            {
                "@type": "Question",
                "name": "Quali nomi funzionano meglio per un ambigramma 3D?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I nomi con lo stesso numero di lettere producono i migliori risultati. Coppie come Luca/Anna, Marco/Sara o Amore/Odio funzionano molto bene. Se i nomi hanno lunghezze molto diverse, prova con diminutivi o soprannomi."
                }
            }
        ]
    }
];

export default async function Ambigramma3DPage({ params }: Props) {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-800 pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-300 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Printer size={12} /> Stampa 3D · STL · GIF Animata
                    </div>
                    {/* H1 = query principale GSC */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white">
                        Ambigramma 3D con Due Nomi{" "}
                        <span className="text-indigo-400">Gratis</span>
                    </h1>
                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                        Crea il tuo ambigramma 3D con due nomi, visualizzalo in tempo reale e scarica il file STL per la stampa 3D o il GIF animato per i social. Senza registrazione, senza filigrana.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="#generatore"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            <Sparkles size={15} /> Genera il Tuo Ambigramma 3D
                        </Link>
                        <Link
                            href="/it/ambigramma-con-due-nomi"
                            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                        >
                            Versione 2D <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* GENERATOR 3D */}
            <section id="generatore" className="px-4 py-8 scroll-mt-24 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <Generator3d />
                </div>
            </section>

            {/* Pro hook */}
            <section className="px-4 pb-8 bg-slate-950">
                <div className="max-w-7xl mx-auto rounded-2xl border border-indigo-900/50 bg-indigo-950/50 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                                    <Sparkles size={10} /> Pro
                                </span>
                                <span className="text-xs text-slate-400">Versione gratuita: crediti limitati · qualità standard</span>
                            </div>
                            <p className="text-sm font-bold text-white">Vuoi più crediti o output HD?</p>
                            <p className="text-xs text-slate-400 mt-0.5">Pro: 666 crediti/mese, output 2K HD e file STL illimitati.</p>
                        </div>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            <Sparkles size={14} /> Vedi i Prezzi
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-4xl space-y-14">

                    {/* COME FUNZIONA */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Come creare un ambigramma 3D con due nomi
                        </h2>
                        <div className="space-y-3">
                            {[
                                ["1", "Inserisci i due nomi", "Scrivi il primo nome nel campo superiore e il secondo nel campo inferiore. I nomi con lo stesso numero di lettere danno i migliori risultati."],
                                ["2", "Genera e visualizza", "Clicca su Genera per creare il modello 3D. Usa la visualizzazione interattiva per ruotare e controllare il design da tutti gli angoli."],
                                ["3", "Scarica STL o GIF", "Scarica il file STL per la stampa 3D o il GIF animato per condividere sui social. Senza account, senza filigrana."],
                            ].map(([n, titolo, desc]) => (
                                <div key={n} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">{n}</div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm mb-1">{titolo}</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CASI D'USO */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Cosa puoi fare con un ambigramma 3D
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {useCases.map((uc) => (
                                <div key={uc.titolo} className="bg-white border border-slate-100 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                            {uc.icon}
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm">{uc.titolo}</h3>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed">{uc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NOMI MIGLIORI */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Quali nomi funzionano meglio?
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5">
                            La qualità di un ambigramma 3D dipende dalla compatibilità delle lettere dopo la rotazione di 90°. I nomi con lo stesso numero di lettere e forme complementari producono i risultati più leggibili.
                        </p>

                        {/* SVG illustrazione */}
                        <div className="flex justify-center mb-6">
                            <svg viewBox="0 0 340 80" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
                                <rect width="340" height="80" rx="16" fill="#0F172A"/>
                                <text x="85" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#818CF8">Luca</text>
                                <text x="170" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fill="#475569">↻ 90°</text>
                                <text x="255" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#A5B4FC">Anna</text>
                            </svg>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="w-full min-w-[460px] text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Coppia di nomi</th>
                                        <th className="px-4 py-3 text-left">Qualità</th>
                                        <th className="px-4 py-3 text-left">Perché</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { coppia: "Luca / Anna", qualità: "Eccellente", motivo: "4 lettere ciascuno — simmetria perfetta" },
                                        { coppia: "Marco / Sara", qualità: "Molto buona", motivo: "5 e 4 lettere — equilibrio visivo naturale" },
                                        { coppia: "Amore / Odio", qualità: "Eccellente", motivo: "Classico contrasto, molto richiesto" },
                                        { coppia: "Matteo / Laura", qualità: "Buona", motivo: "6 lettere ciascuno — funziona bene" },
                                        { coppia: "Alessandro / Eva", qualità: "Difficile", motivo: "Lunghezze molto diverse — prova Alex/Eva" },
                                    ].map((ex) => (
                                        <tr key={ex.coppia} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-3 font-bold text-indigo-700">{ex.coppia}</td>
                                            <td className="px-4 py-3 text-slate-700">{ex.qualità}</td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">{ex.motivo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
                            <p className="font-bold text-amber-900 text-sm mb-1">Consiglio pratico</p>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                Se i nomi hanno lunghezze molto diverse, usa diminutivi o soprannomi. Un ambigramma 3D leggibile con 4–5 lettere vale molto più di un design confuso con 10 lettere.
                            </p>
                        </div>
                    </div>

                    {/* DIFFERENZA 2D vs 3D */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-5">
                            Ambigramma 2D vs Ambigramma 3D — qual è la differenza?
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                {
                                    tipo: "Ambigramma 2D",
                                    desc: "Design tipografico piatto. Si legge il primo nome normalmente e il secondo ruotando l'immagine di 180°. Ideale per tatuaggi, loghi e stampa su carta.",
                                    href: "/it/ambigramma-con-due-nomi",
                                    cta: "Generatore 2D →",
                                    tag: "Per tatuaggi",
                                },
                                {
                                    tipo: "Ambigramma 3D",
                                    desc: "Oggetto fisico tridimensionale. Si legge il primo nome da un lato e il secondo ruotando l'oggetto di 90°. Perfetto per stampa 3D, regali e arte da scrivania.",
                                    href: "#generatore",
                                    cta: "Generatore 3D ↑",
                                    tag: "Per stampa 3D",
                                },
                            ].map((item) => (
                                <div key={item.tipo} className="border border-slate-100 rounded-2xl p-5 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-bold text-slate-900">{item.tipo}</h3>
                                        <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{item.tag}</span>
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.desc}</p>
                                    <Link href={item.href} className="inline-flex items-center gap-1.5 text-indigo-600 font-bold text-xs hover:underline">
                                        {item.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                                <HelpCircle size={17} />
                            </div>
                            Domande frequenti
                        </h2>
                        <div className="space-y-3">
                            {[
                                { q: "Come creare un ambigramma 3D con due nomi gratis?", a: "Inserisci i due nomi nel generatore sopra, clicca Genera e scarica il file STL. Nessun account richiesto, nessuna filigrana." },
                                { q: "Che cos'è un ambigramma 3D con due nomi?", a: "Un oggetto fisico che mostra il primo nome da un lato e il secondo dopo la rotazione di 90°. È la versione tridimensionale dell'ambigramma tradizionale, progettata per la stampa 3D." },
                                { q: "Posso stampare in 3D il mio ambigramma?", a: "Sì. Scarica il file STL e invialo a qualsiasi servizio di stampa 3D online o stampalo con la tua stampante 3D. Il file è compatibile con tutti i principali software di slicing." },
                                { q: "Quali nomi funzionano meglio per un ambigramma 3D?", a: "I nomi con lo stesso numero di lettere: Luca/Anna, Marco/Sara, Amore/Odio. Se le lunghezze sono molto diverse, usa diminutivi o soprannomi." },
                                { q: "Qual è la differenza tra ambigramma 2D e 3D?", a: "L'ambigramma 2D è un design piatto ideale per tatuaggi e loghi. L'ambigramma 3D è un oggetto fisico tridimensionale che si legge diversamente a seconda dell'angolo di visione, perfetto per la stampa 3D e i regali." },
                            ].map(({ q, a }) => (
                                <div key={q} className="border border-slate-100 rounded-xl p-5 bg-white">
                                    <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LINK INTERNI */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                        <p className="font-bold text-slate-900 text-sm mb-4">Altre risorse in italiano</p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/it/ambigramma-con-due-nomi" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Ambigramma Due Nomi 2D <ArrowRight size={13} />
                            </Link>
                            <Link href="/it/ambigram-tattoo-generator" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Ambigramma Tatuaggio <ArrowRight size={13} />
                            </Link>
                            <Link href="/it/illuminati-ambigram" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Ambigramma Illuminati <ArrowRight size={13} />
                            </Link>
                            <Link href="/it/ambigram-name-generator" className="inline-flex items-center gap-1.5 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                Ambigramma Nome <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-slate-900 rounded-2xl p-10 text-white">
                        <h2 className="text-2xl font-black mb-3">Crea il tuo ambigramma 3D</h2>
                        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                            Inserisci due nomi e genera il tuo modello 3D unico. Gratis, senza registrazione.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="#generatore" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                                <Sparkles size={15} /> Genera Ambigramma 3D
                            </Link>
                            <Link href="/it/ambigramma-con-due-nomi" className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                                Versione 2D <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
