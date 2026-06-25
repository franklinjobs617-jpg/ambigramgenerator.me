import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HelpCircle, Sparkles, Flame } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

const DOMAIN = "https://www.ambigramgenerator.me";

type Props = { params: { locale: string } };

// constructMetadata 自动处理 hreflang：en ↔ it 双向声明
// 两个语言版本共享同一个 path，框架生成正确的 alternates
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const path = "/illuminati-ambigram";

    const seoData: Record<string, { title: string; description: string }> = {
        en: {
            title: "Illuminati Ambigram — Angels & Demons, John Langdon & Free Generator",
            description: "The Illuminati ambigrams from Angels & Demons explained: Earth, Air, Fire, Water designed by John Langdon. See how they work and generate your own free ambigram.",
        },
        // 意大利语TDH直接基于GSC query：ambigramma illuminati, ambigrammi angeli e demoni
        it: {
            title: "Ambigramma Illuminati — Angeli e Demoni, John Langdon e Generatore Gratis",
            description: "Gli ambigrammi Illuminati di Angeli e Demoni spiegati: Terra, Aria, Fuoco, Acqua disegnati da John Langdon. Scopri come funzionano e crea il tuo ambigramma gratis.",
        },
    };

    const currentSeo = seoData[locale] || seoData.en;
    return constructMetadata({
        title: currentSeo.title,
        description: currentSeo.description,
        path,
        locale,
    });
}

// ── 共用数据 ──────────────────────────────────────────────────────────────────

const elements = {
    en: [
        { name: "Earth", note: "The 'E' and mirrored 'H' are the key letter pair that makes this work." },
        { name: "Air", note: "Three letters — the tightest design challenge Langdon solved." },
        { name: "Fire", note: "The ascender of 'F' becomes the descender of the rotated 'e'." },
        { name: "Water", note: "The W/M relationship is the classic entry point for understanding ambigram design." },
    ],
    it: [
        { name: "Terra", note: "La doppia 'r' centrale crea un asse di simmetria naturale." },
        { name: "Aria", note: "Tre lettere: la sfida di design più compatta che Langdon abbia risolto." },
        { name: "Fuoco", note: "La 'F' e la 'o' finale si bilanciano dopo la rotazione di 180°." },
        { name: "Acqua", note: "La relazione A/W è il punto di partenza classico per capire il design degli ambigrammi." },
    ],
};

// ── Pagina Italiana ───────────────────────────────────────────────────────────
// Contenuto basato su query GSC:
// "ambigramma illuminati" pos 29.5
// "ambigrammi angeli e demoni" pos 37
// "ambigramma con due nomi" (utente già convinto → CTA diretta)

function ItalianPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Ambigramma Illuminati: i Design di Angeli e Demoni di John Langdon",
            "description": "Guida ai quattro ambigrammi degli elementi Illuminati dal romanzo di Dan Brown Angeli e Demoni, creati da John Langdon. Con generatore gratuito.",
            "author": { "@type": "Organization", "name": "AmbigramGenerator" },
            "publisher": { "@type": "Organization", "name": "AmbigramGenerator", "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` } },
            "datePublished": "2026-06-24",
            "dateModified": "2026-06-24",
            "url": `${DOMAIN}/it/illuminati-ambigram`,
            "inLanguage": "it"
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Cos'è l'ambigramma Illuminati di Angeli e Demoni?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Nel romanzo di Dan Brown Angeli e Demoni, gli Illuminati usano quattro ambigrammi come marchi segreti: Terra, Aria, Fuoco e Acqua. Ogni parola è progettata per essere leggibile sia in posizione normale che ruotata di 180°. I design sono stati creati dall'artista americano John Langdon, commissionati appositamente per il romanzo." }
                },
                {
                    "@type": "Question",
                    "name": "Chi ha creato gli ambigrammi Illuminati?",
                    "acceptedAnswer": { "@type": "Answer", "text": "John Langdon, un designer grafico e professore di tipografia di Philadelphia, ha creato i quattro ambigrammi degli elementi per Dan Brown. Brown ha persino chiamato il suo protagonista Robert Langdon in onore dell'artista." }
                },
                {
                    "@type": "Question",
                    "name": "Posso creare il mio ambigramma stile Illuminati gratis?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Sì. I design originali di Langdon sono protetti da copyright, ma puoi creare il tuo ambigramma rotazionale di qualsiasi parola con il generatore gratuito su AmbigramGenerator.me. Nessuna registrazione richiesta." }
                },
                {
                    "@type": "Question",
                    "name": "Cosa significa il tatuaggio ambigramma Illuminati?",
                    "acceptedAnswer": { "@type": "Answer", "text": "I tatuaggi ambigramma Illuminati sono tipicamente un riferimento ad Angeli e Demoni o al simbolismo della conoscenza nascosta. La forma dell'ambigramma — due letture in un solo design — è una metafora visiva del doppio significato nascosto, coerente con la mitologia degli Illuminati." }
                },
            ]
        }
    ];

    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="bg-gradient-to-b from-slate-900 to-slate-800 pt-32 pb-20 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-300 font-bold text-xs mb-6 uppercase tracking-wider">
                        <Flame size={12} /> Angeli e Demoni · John Langdon · Dan Brown
                    </div>
                    {/* H1 = query principale "ambigramma illuminati" */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-5 text-white">
                        Ambigramma Illuminati
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        Nel romanzo <em>Angeli e Demoni</em> di Dan Brown, gli Illuminati usano quattro <strong>ambigrammi degli elementi</strong> — Terra, Aria, Fuoco, Acqua — ognuno leggibile in entrambe le direzioni. Ecco la storia, come funzionano e come crearne uno gratis.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/it/ambigramma-con-due-nomi" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg">
                            <Sparkles size={15} /> Crea il Tuo Ambigramma Gratis
                        </Link>
                        <Link href="#elementi" className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                            I Quattro Elementi <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white p-6 md:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <article className="prose prose-lg prose-slate max-w-none text-slate-700">

                            {/* S1: Storia */}
                            <div id="storia" className="scroll-mt-28 mb-14">
                                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white flex-shrink-0"><BookOpen size={17} /></div>
                                    Come un romanzo ha reso famosi gli ambigrammi
                                </h2>
                                <p>
                                    Prima che Dan Brown pubblicasse <em>Angeli e Demoni</em> nel 2000, gli ambigrammi erano conosciuti quasi esclusivamente nei circoli della tipografia e del design grafico. Il romanzo cambiò tutto. Nella storia, gli Illuminati usano quattro <strong>ambigrammi brandizzati</strong> — uno per ogni elemento classico — come firma sulle scene del crimine. I design erano così colpenti che i lettori volevano vederli nella realtà.
                                </p>
                                <p>
                                    Brown non inventò i design per il libro: commissionò al <strong>vero artista John Langdon</strong> la creazione di quattro ambigrammi funzionanti. Il risultato è uno degli esempi più famosi di arte ambigrammatica nella cultura popolare — e uno dei motivi principali per cui le persone cercano generatori di ambigrammi ancora oggi.
                                </p>
                                <div className="not-prose bg-slate-50 border border-slate-100 rounded-2xl p-6 my-8">
                                    <p className="text-sm font-bold text-slate-900 mb-2">Il collegamento con la dualità</p>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Un ambigramma che si legge uguale da due direzioni è la metafora visiva perfetta per la mitologia degli Illuminati — significato nascosto, natura doppia, segreti visibili solo dall&apos;angolo giusto. È per questo che la forma ha risuonato così profondamente nei lettori e perché i <strong>tatuaggi ambigramma Illuminati</strong> restano popolari ancora oggi.
                                    </p>
                                </div>
                            </div>

                            {/* S2: John Langdon */}
                            <div id="john-langdon" className="scroll-mt-28 mb-14">
                                <h2 className="text-2xl font-black text-slate-900 mb-5">Chi è John Langdon?</h2>
                                <p>
                                    John Langdon è un designer grafico e professore di tipografia di Philadelphia che crea ambigrammi dalla fine degli anni &apos;70. È ampiamente riconosciuto come uno degli artisti che ha definito e reso popolare questa forma d&apos;arte.
                                </p>
                                <p>
                                    Dan Brown rimase così colpito dal lavoro di Langdon da chiamare il suo protagonista <strong>Robert Langdon</strong> in suo onore — un dettaglio che Brown ha confermato in varie interviste. I quattro ambigrammi degli elementi che compaiono in <em>Angeli e Demoni</em> sono design originali di Langdon, commissionati appositamente per il romanzo.
                                </p>
                                <div className="not-prose bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5 my-6">
                                    <p className="font-bold text-amber-900 text-sm mb-1">Nota sul copyright</p>
                                    <p className="text-amber-800 text-sm leading-relaxed">
                                        I design specifici Terra/Aria/Fuoco/Acqua sono opere originali protette da copyright di John Langdon. Per creare un <strong>ambigramma stile Illuminati</strong> per un tatuaggio o un progetto personale, usa il generatore gratuito per creare un nuovo design con la tua parola.
                                    </p>
                                </div>
                            </div>

                            {/* S3: Quattro elementi — query "ambigrammi angeli e demoni" */}
                            <div id="elementi" className="scroll-mt-28 mb-14">
                                <h2 className="text-2xl font-black text-slate-900 mb-2">
                                    I quattro ambigrammi degli elementi
                                </h2>
                                <p className="text-slate-500 text-sm mb-8">Come ogni design di Langdon ottiene la sua rotazione a 180°.</p>
                                <div className="not-prose space-y-4">
                                    {elements.it.map((el) => (
                                        <div key={el.name} className="border border-slate-100 rounded-2xl p-6 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg flex-shrink-0">
                                                {el.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-slate-900 mb-2">{el.name}</h3>
                                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">{el.note}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="not-prose mt-8 text-center">
                                    <Link href="/it/ambigramma-con-due-nomi" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors">
                                        Genera &quot;Fuoco&quot; o &quot;Terra&quot; gratis <Sparkles size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* S4: Tatuaggio */}
                            <div id="tatuaggio" className="scroll-mt-28 mb-14">
                                <h2 className="text-2xl font-black text-slate-900 mb-5">
                                    Ambigramma Illuminati come tatuaggio
                                </h2>
                                <p>
                                    Tra i quattro elementi, <strong>Fuoco</strong> e <strong>Terra</strong> sono i più richiesti come tatuaggi — Fuoco per i tratti angolari decisi, Terra per la soddisfazione visiva della rotazione. Entrambi funzionano bene in stile gotico blackletter o fine-line.
                                </p>
                                <ul>
                                    <li><strong>Singolo elemento:</strong> La scelta più comune. &quot;Fuoco&quot; o &quot;Acqua&quot; come tatuaggio su avambraccio o polso.</li>
                                    <li><strong>Tutti e quattro insieme:</strong> Disposti a croce o a diamante — un pezzo più ambizioso per manica o schiena.</li>
                                    <li><strong>Versione personalizzata:</strong> Genera un ambigramma con il tuo nome o una parola scelta, usando l&apos;estetica Illuminati come ispirazione.</li>
                                </ul>
                            </div>

                            {/* FAQ */}
                            <div id="faq" className="scroll-mt-28">
                                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0"><HelpCircle size={17} /></div>
                                    Domande frequenti
                                </h2>
                                <div className="not-prose space-y-3">
                                    {[
                                        { q: "Cos'è l'ambigramma Illuminati di Angeli e Demoni?", a: "Nel romanzo di Dan Brown, gli Illuminati usano quattro ambigrammi — Terra, Aria, Fuoco, Acqua — come marchi segreti. Ogni parola si legge uguale ruotata di 180°. I design sono stati creati da John Langdon, commissionati appositamente per il libro." },
                                        { q: "Chi ha creato gli ambigrammi di Angeli e Demoni?", a: "John Langdon, designer grafico e professore di tipografia di Philadelphia. Dan Brown ha chiamato il suo protagonista Robert Langdon in suo onore." },
                                        { q: "Posso creare un ambigramma stile Illuminati gratis?", a: "Sì. I design originali sono di copyright, ma puoi creare il tuo ambigramma di qualsiasi parola con il generatore gratuito. Nessuna registrazione, nessuna filigrana." },
                                        { q: "Cosa significa il tatuaggio ambigramma Illuminati?", a: "È tipicamente un riferimento ad Angeli e Demoni o al simbolismo della conoscenza nascosta. La dualità dell'ambigramma — due letture in un design — rispecchia la mitologia degli Illuminati." },
                                    ].map(({ q, a }) => (
                                        <div key={q} className="border border-slate-100 rounded-xl p-5">
                                            <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                            <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="border-t border-slate-100 pt-10 mt-10 text-center not-prose">
                                <h2 className="text-xl font-black text-slate-900 mb-3">Crea il tuo ambigramma</h2>
                                <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">Inserisci qualsiasi parola o due nomi e genera un ambigramma rotazionale stile Illuminati. Gratis, senza registrazione.</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <Link href="/it/ambigramma-con-due-nomi" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg">
                                        <Sparkles size={15} /> Generatore Gratuito
                                    </Link>
                                    <Link href="/3d-generator" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-7 py-3.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                        Versione 3D STL <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>

                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}

// ── English Page ──────────────────────────────────────────────────────────────

function EnglishPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Illuminati Ambigram: The Angels & Demons Designs by John Langdon",
            "description": "A guide to the four Illuminati element ambigrams from Dan Brown's Angels & Demons, designed by John Langdon.",
            "author": { "@type": "Organization", "name": "AmbigramGenerator" },
            "publisher": { "@type": "Organization", "name": "AmbigramGenerator", "logo": { "@type": "ImageObject", "url": `${DOMAIN}/logo.png` } },
            "datePublished": "2026-06-24",
            "dateModified": "2026-06-24",
            "url": `${DOMAIN}/illuminati-ambigram`,
            "inLanguage": "en"
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is the Illuminati ambigram from Angels & Demons?",
                    "acceptedAnswer": { "@type": "Answer", "text": "In Dan Brown's novel Angels & Demons, the Illuminati use four branded ambigrams — Earth, Air, Fire, Water — as calling cards. Each word reads the same when rotated 180°. The designs were created by real ambigram artist John Langdon, commissioned specifically for the book." }
                },
                {
                    "@type": "Question",
                    "name": "Who designed the Illuminati ambigrams in Angels & Demons?",
                    "acceptedAnswer": { "@type": "Answer", "text": "John Langdon, a Philadelphia-based graphic designer and typography professor. Dan Brown named his protagonist Robert Langdon in John's honor." }
                },
                {
                    "@type": "Question",
                    "name": "Can I generate my own Illuminati-style ambigram?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes. The specific Langdon designs are copyrighted, but you can create your own rotational ambigram of any word for free at AmbigramGenerator.me. No signup required." }
                },
                {
                    "@type": "Question",
                    "name": "What does an Illuminati ambigram tattoo mean?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Illuminati ambigram tattoos typically reference Angels & Demons or the broader symbolism of hidden knowledge and duality." }
                },
                {
                    "@type": "Question",
                    "name": "Which element makes the best ambigram tattoo?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Fire and Earth are the most popular. Fire has strong angular strokes at small sizes; Earth suits forearm or wrist placements." }
                }
            ]
        }
    ];

    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="bg-gradient-to-b from-slate-900 to-slate-800 pt-32 pb-20 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-300 font-bold text-xs mb-6 uppercase tracking-wider">
                        <Flame size={12} /> Angels & Demons · John Langdon · Illuminati
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-5 text-white">
                        The Illuminati Ambigram
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        Dan Brown&apos;s <em>Angels & Demons</em> introduced millions to ambigrams through the Illuminati&apos;s four elemental brands — <strong>Earth, Air, Fire, Water</strong> — each designed to read the same when rotated 180°. Here&apos;s the story, the design logic, and how to make your own.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg">
                            <Sparkles size={15} /> Create Your Own Free
                        </Link>
                        <Link href="#elements" className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                            See the Four Elements <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-10">

                        <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit hidden lg:block">
                            <nav className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-1">
                                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600 mb-4 px-3">On this page</h3>
                                {[["#story","The story"],["#john-langdon","John Langdon"],["#elements","Four elements"],["#tattoo","As a tattoo"],["#faq","FAQ"]].map(([href, label]) => (
                                    <Link key={href} href={href} className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all">
                                        <ArrowRight size={13} /> {label}
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        <div className="lg:w-3/4 bg-white p-6 md:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <article className="prose prose-lg prose-slate max-w-none text-slate-700">

                                <div id="story" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white flex-shrink-0"><BookOpen size={17} /></div>
                                        Why millions discovered ambigrams through a novel
                                    </h2>
                                    <p>Before Dan Brown published <em>Angels & Demons</em> in 2000, ambigrams were known mainly within typography and graphic design circles. The novel changed that overnight. In the story, the ancient secret society Illuminati used four <strong>branded ambigrams</strong> — one for each classical element — as calling cards left at murder scenes.</p>
                                    <p>Brown didn&apos;t invent the designs — he commissioned <strong>real ambigram artist John Langdon</strong> to create four working ambigrams for the novel. The result is one of the most famous examples of ambigram art in popular culture.</p>
                                    <div className="not-prose bg-slate-50 border border-slate-100 rounded-2xl p-6 my-8">
                                        <p className="text-sm font-bold text-slate-900 mb-2">The duality connection</p>
                                        <p className="text-sm text-slate-600 leading-relaxed">An ambigram readable from two directions is a perfect visual metaphor for the Illuminati mythology — hidden meaning, dual nature, secrets visible only from the right angle. This is why <strong>Illuminati ambigram tattoos</strong> remain popular today.</p>
                                    </div>
                                </div>

                                <div id="john-langdon" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">Who is John Langdon?</h2>
                                    <p>John Langdon is a Philadelphia-based graphic designer and typography professor who has been creating ambigrams since the late 1970s. Dan Brown named his fictional protagonist <strong>Robert Langdon</strong> in the artist&apos;s honor.</p>
                                    <div className="not-prose bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5 my-6">
                                        <p className="font-bold text-amber-900 text-sm mb-1">Note on copyright</p>
                                        <p className="text-amber-800 text-sm leading-relaxed">The specific Earth/Air/Fire/Water designs are John Langdon&apos;s copyrighted artwork. To create an <strong>Illuminati-style ambigram</strong> for personal use, generate a new design of your own word using the free generator.</p>
                                    </div>
                                </div>

                                <div id="elements" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8">The four Illuminati element ambigrams</h2>
                                    <div className="not-prose space-y-4">
                                        {elements.en.map((el) => (
                                            <div key={el.name} className="border border-slate-100 rounded-2xl p-6 flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg flex-shrink-0">{el.name[0]}</div>
                                                <div>
                                                    <h3 className="font-black text-slate-900 mb-2">{el.name}</h3>
                                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">{el.note}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="not-prose mt-8 text-center">
                                        <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors">
                                            Generate &quot;Earth&quot; or &quot;Fire&quot; <Sparkles size={14} />
                                        </Link>
                                    </div>
                                </div>

                                <div id="tattoo" className="scroll-mt-28 mb-14">
                                    <h2 className="text-2xl font-black text-slate-900 mb-5">Illuminati ambigram as a tattoo</h2>
                                    <p><strong>Fire</strong> and <strong>Earth</strong> are the most requested as tattoos — Fire for bold angular strokes, Earth for the satisfying visual rotation. Both work well in gothic blackletter or fine-line styles.</p>
                                    <ul>
                                        <li><strong>Single element:</strong> Most common. &quot;Fire&quot; or &quot;Water&quot; as a forearm or wrist piece.</li>
                                        <li><strong>All four together:</strong> Arranged as a cross or diamond — an ambitious sleeve or back piece.</li>
                                        <li><strong>Personalised version:</strong> Generate an ambigram of your own word in a similar style — using the Illuminati aesthetic as inspiration.</li>
                                    </ul>
                                    <div className="not-prose mt-6 flex flex-wrap gap-3">
                                        <Link href="/ambigram-word-tattoos" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            More tattoo ideas <ArrowRight size={14} />
                                        </Link>
                                        <Link href="/it/illuminati-ambigram" className="inline-flex items-center gap-2 border border-slate-200 text-slate-500 px-5 py-2.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            🇮🇹 Versione italiana
                                        </Link>
                                    </div>
                                </div>

                                <div id="faq" className="scroll-mt-28">
                                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0"><HelpCircle size={17} /></div>
                                        Frequently asked questions
                                    </h2>
                                    <div className="not-prose space-y-3">
                                        {[
                                            { q: "What is the Illuminati ambigram from Angels & Demons?", a: "In Dan Brown's novel, the Illuminati use four branded ambigrams — Earth, Air, Fire, Water — as calling cards. Each reads the same rotated 180°, created by real ambigram artist John Langdon." },
                                            { q: "Who designed the Illuminati ambigrams?", a: "John Langdon, a Philadelphia graphic designer and professor. Dan Brown named his protagonist Robert Langdon in his honor." },
                                            { q: "Can I generate my own Illuminati-style ambigram?", a: "Yes. The Langdon designs are copyrighted, but you can create your own rotational ambigram of any word for free here. No signup needed." },
                                            { q: "What does an Illuminati ambigram tattoo mean?", a: "It typically signals a connection to Angels & Demons or the symbolism of hidden knowledge — the ambigram form is a natural visual metaphor for dual meaning." },
                                            { q: "Which element makes the best tattoo?", a: "Fire and Earth are most popular. Fire has strong angular strokes at small sizes; Earth suits forearm or wrist placements." },
                                        ].map(({ q, a }) => (
                                            <div key={q} className="border border-slate-100 rounded-xl p-5">
                                                <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-10 mt-10 text-center not-prose">
                                    <h2 className="text-xl font-black text-slate-900 mb-3">Create your own ambigram</h2>
                                    <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">Enter any word or two names and generate a rotational ambigram in the Illuminati tradition. Free, no signup.</p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg">
                                            <Sparkles size={15} /> Free Ambigram Generator
                                        </Link>
                                        <Link href="/3d-generator" className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-7 py-3.5 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors">
                                            3D Version (STL) <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                    <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold text-indigo-600">
                                        <Link href="/what-is-ambigram" className="hover:underline">What is an ambigram?</Link>
                                        <Link href="/ambigram-word-tattoos" className="hover:underline">Tattoo ideas</Link>
                                        <Link href="/guide/ambigram-history-art" className="hover:underline">History of ambigrams</Link>
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

// ── 默认导出 ──────────────────────────────────────────────────────────────────

export default async function IlluminatiAmbigramPage({ params }: Props) {
    const { locale } = await params;
    if (locale === 'it') return <ItalianPage />;
    return <EnglishPage />;
}
