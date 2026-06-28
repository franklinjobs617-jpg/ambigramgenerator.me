import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import Generator2d from "@/components/Generator2d";
import { Sparkles, ArrowRight, Check, HelpCircle } from "lucide-react";

type Props = { params: { locale: string } };

// TDH — Semrush FR + GSC data
// "générateur d'ambigramme"    70/月 KD=10
// "générateur d'ambigrammes"   30/月
// "générateur d'ambigramme 2 mots" 20/月
// GSC: "générateur d'ambigrammes" 224展示 0点击 位置17.7
// GSC: "ambigramme tatouage" 7展示 位置6.86 — /fr/ambigram-tattoo-generator已覆盖
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({
        title: "Générateur d'Ambigramme Gratuit — 2D, Tatouage & Deux Mots en Ligne",
        description: "Générateur d'ambigramme gratuit en ligne. Entrez un mot ou deux prénoms, choisissez le style et téléchargez le PNG. Sans inscription, sans filigrane.",
        path: "/generateur-ambigramme",
        locale,
    });
}

const exemplesCas = [
    {
        titre: "Ambigramme avec deux prénoms",
        desc: "Entrez deux prénoms — le premier se lit normalement, le second apparaît en retournant le design à 180°. Idéal pour les tatouages de couple.",
        exemple: "Ex : Lucas / Emma, Léa / Tom",
        href: "/fr/generateur-ambigramme-prenom",
        cta: "Guide prénoms →",
    },
    {
        titre: "Ambigramme d'un seul mot",
        desc: "Entrez un seul mot qui se lira à l'identique après rotation à 180°. Fonctionne mieux avec des mots courts ayant des lettres symétriques.",
        exemple: "Ex : NOON, SWIMS, LEVEL",
        href: "/",
        cta: "Essayer →",
    },
    {
        titre: "Ambigramme pour tatouage",
        desc: "Choisissez le style Calligraphie pour des lignes douces adaptées à la peau. Téléchargez le PNG et montrez-le à votre tatoueur comme référence.",
        exemple: "Style conseillé : Calligraphie",
        href: "/fr/ambigram-tattoo-generator",
        cta: "Générateur tatouage →",
    },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Générateur d'Ambigramme Gratuit",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web Browser",
        "inLanguage": "fr",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
        "description": "Générateur d'ambigramme gratuit en ligne. Créez des ambigrammes 2D avec un ou deux mots, téléchargez PNG sans inscription.",
        "url": "https://www.ambigramgenerator.me/fr/generateur-ambigramme"
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Comment créer un ambigramme gratuit en ligne ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Entrez un mot ou deux prénoms dans le générateur ci-dessus, choisissez un style (Calligraphie ou Bloc), cliquez sur Générer et téléchargez le PNG. Aucun compte requis, aucun filigrane."
                }
            },
            {
                "@type": "Question",
                "name": "Quelle est la différence entre un ambigramme rotatif et un ambigramme à deux mots ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Un ambigramme rotatif lit le même mot après rotation à 180°. Un ambigramme à deux mots lit un premier mot normalement et un deuxième mot après rotation. Le générateur supporte les deux formes."
                }
            },
            {
                "@type": "Question",
                "name": "Quel style choisir pour un ambigramme tatouage ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Choisissez le style Calligraphie pour les tatouages. Ses traits fluides et ses formes de lettres courbées se traduisent mieux sur la peau que les styles géométriques. Le style Bloc convient aux placements plus grands comme l'avant-bras."
                }
            },
            {
                "@type": "Question",
                "name": "Le générateur d'ambigramme est-il vraiment gratuit et sans filigrane ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oui. Le téléchargement PNG est entièrement gratuit, sans filigrane et sans création de compte. Les invités reçoivent 2 crédits, les comptes gratuits reçoivent 5 crédits. Un crédit = une génération 1K."
                }
            }
        ]
    }
];

export default async function GenerateurAmbigrammePage({ params }: Props) {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Gratuit · Sans Inscription · Téléchargement Immédiat
                    </div>
                    {/* H1 = query principale "générateur d'ambigramme" */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Générateur d&apos;Ambigramme{" "}
                        <span className="text-indigo-600">Gratuit en Ligne</span>
                    </h1>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                        Créez un ambigramme avec un mot ou deux prénoms en quelques secondes.
                        Téléchargez le PNG pour vos tatouages, cadeaux et impressions 3D.
                        Gratuit, sans compte, sans filigrane.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="#generateur"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            <Sparkles size={15} /> Créer Mon Ambigramme
                        </Link>
                        <Link
                            href="/3d-generator"
                            className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 px-7 py-4 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                        >
                            Version 3D STL <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* GENERATOR */}
            <section id="generateur" className="px-4 pb-8 scroll-mt-24">
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
                                <span className="text-xs text-slate-400">Gratuit : crédits limités · résolution standard</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900">Téléchargement HD ou export STL 3D ?</p>
                            <p className="text-xs text-slate-500 mt-0.5">Pro : 666 crédits/mois, output 2K HD et fichiers STL imprimables en 3D.</p>
                        </div>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            <Sparkles size={14} /> Voir les Tarifs
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-4xl space-y-14">

                    {/* COMMENT UTILISER */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Comment utiliser le générateur d&apos;ambigramme
                        </h2>
                        <div className="space-y-3">
                            {[
                                ["1", "Entrez un mot ou deux prénoms", "Un seul mot pour un ambigramme rotatif, ou deux prénoms pour un design où chacun s'affiche selon l'orientation. Le générateur accepte toutes les langues."],
                                ["2", "Choisissez le style", "Calligraphie pour les tatouages et les designs élégants — traits fluides et courbes adaptés à la peau. Bloc pour un rendu moderne et audacieux."],
                                ["3", "Téléchargez le PNG", "Cliquez sur Télécharger pour obtenir le PNG en haute résolution. Aucun filigrane, aucun compte requis. Partagez-le avec votre tatoueur ou imprimez-le."],
                            ].map(([n, titre, desc]) => (
                                <div key={n} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">{n}</div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm mb-1">{titre}</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CAS D'USAGE */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Que peut-on créer avec ce générateur ?
                        </h2>
                        <div className="space-y-4">
                            {exemplesCas.map((cas) => (
                                <div key={cas.titre} className="bg-white border border-slate-100 rounded-2xl p-5">
                                    <h3 className="font-bold text-slate-900 text-sm mb-2">{cas.titre}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-2">{cas.desc}</p>
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{cas.exemple}</span>
                                        <Link href={cas.href} className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                                            {cas.cta}
                                        </Link>
                                    </div>
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
                            Questions fréquentes
                        </h2>
                        <div className="space-y-3">
                            {[
                                {
                                    q: "Comment créer un ambigramme gratuit en ligne ?",
                                    a: "Entrez un mot ou deux prénoms ci-dessus, choisissez un style, cliquez sur Générer et téléchargez le PNG. Aucun compte requis, aucun filigrane."
                                },
                                {
                                    q: "Quelle est la différence entre un ambigramme rotatif et un ambigramme à deux mots ?",
                                    a: "Un ambigramme rotatif lit le même mot après rotation à 180°. Un ambigramme à deux mots lit un premier mot normalement et un deuxième après rotation. Le générateur supporte les deux."
                                },
                                {
                                    q: "Quel style choisir pour un ambigramme tatouage ?",
                                    a: "Choisissez le style Calligraphie — ses traits fluides se traduisent mieux sur la peau. Le style Bloc convient aux placements plus grands comme l'avant-bras."
                                },
                                {
                                    q: "Le générateur est-il vraiment gratuit et sans filigrane ?",
                                    a: "Oui. Le téléchargement PNG est entièrement gratuit, sans filigrane et sans compte. Les invités reçoivent 2 crédits, les comptes gratuits 5 crédits. 1 crédit = 1 génération 1K."
                                },
                                {
                                    q: "Existe-t-il une version 3D du générateur d'ambigramme ?",
                                    a: "Oui. Le générateur 3D crée un objet physique qui affiche le premier mot d'un côté et le second après rotation à 90°. Téléchargeable en STL pour l'impression 3D."
                                },
                            ].map(({ q, a }) => (
                                <div key={q} className="border border-slate-100 rounded-xl p-5 bg-white">
                                    <p className="font-bold text-slate-900 text-sm mb-2">{q}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA FINAL */}
                    <div className="text-center bg-indigo-600 rounded-2xl p-10 text-white">
                        <h2 className="text-2xl font-black mb-3">Créez votre ambigramme maintenant</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
                            Entrez un mot ou deux prénoms et générez votre design unique.
                            Gratuit, sans inscription, sans filigrane.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="#generateur" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                                <Sparkles size={15} /> Générer Gratuitement
                            </Link>
                            <Link href="/3d-generator" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                                Générateur 3D STL <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold text-indigo-200">
                            <Link href="/fr/generateur-ambigramme-prenom" className="hover:text-white transition-colors">Ambigramme Prénom</Link>
                            <Link href="/fr/ambigram-tattoo-generator" className="hover:text-white transition-colors">Tatouage Ambigramme</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors">Tarifs Pro</Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
