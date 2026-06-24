import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, HelpCircle, ArrowRight, Sparkles, Check } from "lucide-react";

const DOMAIN = "https://www.ambigramgenerator.me";

// Metadata: canonical fisso IT, nessun alternates (pagina esclusivamente italiana)
// Non usiamo constructMetadata perché questa pagina non ha versioni in altre lingue
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Ambigramma con Due Nomi Gratis — Generatore Online Gratis",
        description: "Crea subito il tuo ambigramma con due nomi gratis. Generatore online: inserisci i due nomi, scegli lo stile, scarica PNG o STL 3D. Nessuna registrazione.",
        alternates: {
            canonical: `${DOMAIN}/it/ambigramma-con-due-nomi`,
        },
    };
}

export default async function AmbigrammaConDueNomiPage() {

    // Query GSC di riferimento per i contenuti:
    // "ambigramma con due nomi generatore" pos 2.7 CTR 48%
    // "ambigramma con due nomi gratis" pos 2.51 CTR 52%
    // "crea ambigramma" pos 3.96 CTR 43%
    // "ambigramma con due nomi online" pos 3.21 CTR 36%
    // "ambigramma con due nomi 3d" pos 5.78 CTR 11%
    // "ambigramma tatuaggio" pos 9.46
    // "ambigramma nomi" pos 6.32
    // "ambigramma esempi" pos 10.97

    const coppiePopolari = [
        { coppia: "Marco / Sara", risultato: "Ottimo", motivo: "Stessa lunghezza, buona simmetria rotazionale" },
        { coppia: "Luca / Anna", risultato: "Ottimo", motivo: "4 lettere ciascuno, lettere ben compatibili" },
        { coppia: "Amore / Odio", risultato: "Eccellente", motivo: "Classico assoluto, bilanciamento perfetto" },
        { coppia: "Vita / Morte", risultato: "Buono", motivo: "Contrasto forte, molto richiesto" },
        { coppia: "Fede / Pace", risultato: "Buono", motivo: "4 lettere, stile spirituale" },
        { coppia: "Alessandra / Marco", risultato: "Difficile", motivo: "Lunghezze molto diverse — prova con soprannomi" },
    ];

    // FAQPage Schema — domande basate direttamente sui query GSC italiani
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Come si crea un ambigramma con due nomi gratis?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Vai al generatore su ambigramgenerator.me, inserisci il primo nome nel campo superiore e il secondo nel campo inferiore, scegli lo stile e premi Genera. Il download è gratuito e senza registrazione."
                }
            },
            {
                "@type": "Question",
                "name": "Quali nomi funzionano meglio per un ambigramma?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I nomi con lo stesso numero di lettere danno i risultati migliori. Coppie come Marco/Sara, Luca/Anna, Amore/Odio funzionano molto bene. Se i nomi hanno lunghezze diverse, prova abbreviazioni o soprannomi."
                }
            },
            {
                "@type": "Question",
                "name": "È possibile creare un ambigramma con due nomi in 3D?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sì. Il generatore 3D crea un oggetto fisico che mostra il primo nome da un lato e il secondo dall'altro. Puoi scaricare il file STL e stamparlo con qualsiasi stampante 3D."
                }
            },
            {
                "@type": "Question",
                "name": "L'ambigramma generato si può usare per un tatuaggio?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sì. Il file PNG scaricabile è in alta risoluzione e può essere mostrato direttamente al tatuatore come riferimento. È libero da copyright per uso personale e commerciale."
                }
            },
            {
                "@type": "Question",
                "name": "Ambigramma con due nomi: quanto costa?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Il generatore base è completamente gratuito. Puoi creare e scaricare design 2D senza pagare nulla. La versione 3D STL è disponibile senza costi aggiuntivi."
                }
            }
        ]
    };

    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ── HERO: utente arriva già con intento chiaro, CTA immediata ── */}
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Gratis · Nessuna Registrazione · Download Immediato
                    </div>
                    {/* H1 = query principale GSC */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Ambigramma con <span className="text-indigo-600">Due Nomi</span> Gratis
                    </h1>
                    <p className="text-slate-500 text-lg mb-8">
                        Inserisci i due nomi, genera il design, scarica subito. Perfetto per tatuaggi, regali e stampa 3D.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="/two-word-ambigram-generator"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-colors hover:bg-indigo-700"
                        >
                            <Sparkles size={16} /> Crea Ambigramma Gratis
                        </Link>
                        {/* query "ambigramma con due nomi 3d" — seconda CTA */}
                        <Link
                            href="/3d-generator"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-700"
                        >
                            Versione 3D STL <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* SIDEBAR — solo desktop */}
                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="space-y-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">In questa pagina</h3>
                                {[
                                    ["#come-fare", "Come fare"],
                                    ["#quali-nomi", "Quali nomi scegliere"],
                                    ["#tatuaggio", "Per il tatuaggio"],
                                    ["#3d", "Versione 3D"],
                                    ["#faq", "Domande frequenti"],
                                ].map(([href, label]) => (
                                    <Link key={href} href={href} className="flex items-center gap-2 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all">
                                        <ChevronRight size={14} /> {label}
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        {/* CONTENUTO */}
                        <div className="lg:w-3/4 bg-white p-6 md:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <article className="prose prose-lg prose-slate text-slate-700 max-w-none">

                                {/* ── SEZIONE 1: Come fare — risponde a "crea ambigramma" e "generatore" ── */}
                                <div id="come-fare" className="scroll-mt-28 mb-14">
                                    {/* H2 = variante query "ambigramma con due nomi online" */}
                                    <h2 className="text-2xl font-black text-slate-900 mb-6">
                                        Come creare un ambigramma con due nomi online
                                    </h2>
                                    <div className="not-prose space-y-3 mb-8">
                                        {[
                                            ["1", "Inserisci i due nomi", "Scrivi il primo nome nel campo in alto e il secondo in basso. Il generatore accetta nomi italiani, stranieri e qualsiasi parola."],
                                            ["2", "Scegli lo stile", "Blocky per un look deciso, Calligraphy per tatuaggi e scritte eleganti. L'anteprima si aggiorna in tempo reale."],
                                            ["3", "Scarica gratis", "Clicca Download per ottenere il PNG in alta risoluzione. Nessuna filigrana, nessun account richiesto."],
                                        ].map(([n, titolo, desc]) => (
                                            <div key={n} className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/40">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">{n}</div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm mb-1">{titolo}</p>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="not-prose">
                                        <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                                            Vai al Generatore <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </div>

                                {/* ── SEZIONE 2: Quali nomi — risponde a "ambigramma nomi" e "ambigramma esempi" ── */}
                                <div id="quali-nomi" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-4">
                                        Quali nomi funzionano meglio?
                                    </h2>
                                    <p>
                                        La qualità di un <strong>ambigramma con due nomi</strong> dipende quasi interamente dalla compatibilità delle lettere dopo la rotazione di 180°. La regola pratica più importante: <strong>nomi con lo stesso numero di lettere danno sempre i risultati migliori</strong>.
                                    </p>

                                    <div className="not-prose overflow-x-auto rounded-2xl border border-slate-100 my-6">
                                        <table className="w-full min-w-[480px] text-left text-sm">
                                            <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                                                <tr>
                                                    <th className="px-4 py-3">Coppia</th>
                                                    <th className="px-4 py-3">Qualità</th>
                                                    <th className="px-4 py-3">Perché</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {coppiePopolari.map((item) => (
                                                    <tr key={item.coppia} className="align-top">
                                                        <td className="px-4 py-3 font-bold text-indigo-700">{item.coppia}</td>
                                                        <td className="px-4 py-3 text-slate-700">{item.risultato}</td>
                                                        <td className="px-4 py-3 text-slate-500 text-xs">{item.motivo}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5 not-prose">
                                        <p className="font-bold text-amber-900 text-sm mb-1">Consiglio pratico</p>
                                        <p className="text-amber-800 text-sm leading-relaxed">
                                            Se il tuo nome ha molte lettere (es. "Alessandra"), prova con la versione abbreviata ("Ale") o un soprannome. Un ambigramma leggibile con 4–6 lettere vale molto più di uno confuso con 10.
                                        </p>
                                    </div>
                                </div>

                                {/* ── SEZIONE 3: Tatuaggio — risponde a "ambigramma tatuaggio" ── */}
                                <div id="tatuaggio" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-4">
                                        Ambigramma tatuaggio: come usare il design
                                    </h2>
                                    <p>
                                        Il tatuaggio ambigramma con due nomi è uno dei più richiesti in Italia perché racconta due persone in un solo segno. Ecco cosa sapere prima di andare dal tatuatore:
                                    </p>
                                    <ul>
                                        <li><strong>Dimensione minima:</strong> almeno 6 cm di larghezza perché entrambi i nomi restino leggibili nel tempo.</li>
                                        <li><strong>Stile consigliato:</strong> usa lo stile Calligraphy del generatore per ottenere linee più morbide, ideali per la pelle.</li>
                                        <li><strong>Come consegnare il file:</strong> scarica il PNG e mandalo al tatuatore via WhatsApp o email come riferimento visivo.</li>
                                        <li><strong>Posizione:</strong> polso interno, avambraccio e sterno sono i posti più scelti — la rotazione di 180° deve essere un gesto naturale.</li>
                                    </ul>
                                    <div className="not-prose mt-4">
                                        <Link href="/ambigram-word-tattoos" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-5 py-3 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            Altre idee tatuaggio <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                                {/* ── SEZIONE 4: 3D — risponde a "ambigramma con due nomi 3d" ── */}
                                <div id="3d" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-4">
                                        Ambigramma con due nomi in 3D
                                    </h2>
                                    <p>
                                        Il generatore 3D crea un oggetto fisico che mostra il primo nome da una direzione e il secondo ruotando l'oggetto di 90°. È un regalo originale e personalizzato — un oggetto da scrivania che nessun altro ha.
                                    </p>
                                    <p>
                                        Scarichi il file <strong>STL</strong> e lo mandi a qualsiasi servizio di stampa 3D online (es. Craftcloud, Sculpteo) oppure lo stampi in autonomia se hai una stampante 3D.
                                    </p>
                                    <div className="not-prose mt-4">
                                        <Link href="/3d-generator" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors">
                                            Prova il Generatore 3D <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </div>

                                {/* ── FAQ — query diretti GSC come domande ── */}
                                <div id="faq" className="scroll-mt-28">
                                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"><HelpCircle size={18} /></div>
                                        Domande frequenti
                                    </h2>
                                    <div className="not-prose space-y-3">
                                        {[
                                            {
                                                q: "Come si crea un ambigramma con due nomi gratis?",
                                                a: "Vai al generatore, inserisci i due nomi nei campi appositi e clicca Genera. Il download del PNG è immediato e gratuito, senza account."
                                            },
                                            {
                                                q: "Quali nomi funzionano meglio per un ambigramma?",
                                                a: "Nomi con lo stesso numero di lettere: Marco/Sara, Luca/Anna, Amore/Odio. Lunghezze diverse riducono la qualità del risultato — in quel caso usa abbreviazioni."
                                            },
                                            {
                                                q: "Si può fare un ambigramma con due nomi in 3D?",
                                                a: "Sì. Il generatore 3D produce un file STL stampabile: l'oggetto mostra il primo nome da un lato e il secondo ruotandolo. Ottimo come regalo personalizzato."
                                            },
                                            {
                                                q: "L'ambigramma generato va bene per un tatuaggio?",
                                                a: "Sì. Scarica il PNG ad alta risoluzione e mostralo al tuo tatuatore come riferimento. È libero da copyright."
                                            },
                                            {
                                                q: "Quanto costa creare un ambigramma con due nomi?",
                                                a: "Il generatore 2D è completamente gratuito. Puoi creare e scaricare quanti design vuoi senza pagare e senza registrarti."
                                            },
                                        ].map(({ q, a }) => (
                                            <div key={q} className="border border-slate-100 rounded-xl p-5">
                                                <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA FINALE */}
                                <div className="border-t border-slate-100 pt-10 mt-10 text-center not-prose">
                                    <p className="text-slate-500 text-sm mb-5">Pronto? Il generatore è gratuito e non richiede registrazione.</p>
                                    <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg">
                                        Crea il Tuo Ambigramma Gratis <ArrowRight size={17} />
                                    </Link>
                                    <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold text-indigo-600">
                                        <Link href="/3d-generator" className="hover:underline">Generatore 3D STL</Link>
                                        <Link href="/ambigram-word-tattoos" className="hover:underline">Idee Tatuaggi</Link>
                                        <Link href="/two-word-ambigram-generator" className="hover:underline">Generatore Due Parole</Link>
                                    </div>
                                </div>

                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
