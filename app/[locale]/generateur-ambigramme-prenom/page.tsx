import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Sparkles } from "lucide-react";

const DOMAIN = "https://www.ambigramgenerator.me";

// Page française exclusivement — canonical /fr/generateur-ambigramme-prenom
// Pas de constructMetadata car cette page n'a pas d'équivalent dans d'autres langues
// Queries GSC ciblés:
// "ambigramme prénom" pos 14.12 CTR 13.56% (59 imp)
// "générateur d'ambigramme 2 mots" pos 10.17 CTR 33.33% (6 imp)
// "ambigramme tatouage" pos 7.5 CTR 25% (4 imp)
// "générateur d'ambigrammes" pos 17.7 (224 imp, 0 clics — manque de contenu)
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Générateur d'Ambigramme Prénom Gratuit — 2 Prénoms en 1 Design",
        description: "Créez un ambigramme avec deux prénoms gratuitement. Générateur en ligne : entrez 2 mots, choisissez le style, téléchargez PNG ou STL 3D. Sans inscription.",
        alternates: {
            canonical: `${DOMAIN}/fr/generateur-ambigramme-prenom`,
        },
    };
}

// Exemples de prénoms populaires pour les ambigrammes
const exemplesPrenoms = [
    { paire: "Lucas / Emma", qualite: "Excellent", raison: "5 et 4 lettres — équilibre visuel naturel" },
    { paire: "Léa / Tom", qualite: "Très bon", raison: "3 lettres chacun — symétrie parfaite" },
    { paire: "Marie / Marc", qualite: "Très bon", raison: "4–5 lettres, lettres complémentaires" },
    { paire: "Amour / Douleur", qualite: "Bon", raison: "Contraste classique pour tatouage" },
    { paire: "Vie / Mort", qualite: "Bon", raison: "3–4 lettres, design percutant" },
    { paire: "Alexandre / Marie", qualite: "Difficile", raison: "Longueurs très différentes — essayez Alex/Marie" },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Comment créer un ambigramme avec deux prénoms gratuitement ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Allez sur le générateur d'ambigramme, entrez le premier prénom dans le champ supérieur et le second dans le champ inférieur, choisissez votre style et cliquez sur Générer. Le téléchargement PNG est immédiat et gratuit, sans création de compte."
            }
        },
        {
            "@type": "Question",
            "name": "Quels prénoms fonctionnent le mieux pour un ambigramme ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Les prénoms de longueur similaire donnent les meilleurs résultats. Des paires comme Lucas/Emma, Léa/Tom ou Marie/Marc fonctionnent très bien. Si les prénoms ont des longueurs très différentes, essayez des diminutifs ou des surnoms."
            }
        },
        {
            "@type": "Question",
            "name": "Peut-on utiliser l'ambigramme généré pour un tatouage ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui. Téléchargez le PNG en haute résolution et montrez-le à votre tatoueur comme référence. Tous les designs sont libres d'utilisation pour usage personnel et commercial, sans filigrane."
            }
        },
        {
            "@type": "Question",
            "name": "Qu'est-ce qu'un ambigramme avec deux prénoms ?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Un ambigramme avec deux prénoms est un design typographique qui contient deux prénoms différents dans une seule image. Lu normalement, on voit le premier prénom. Retourné à 180°, le second apparaît. C'est l'idéal pour les tatouages de couple ou les cadeaux personnalisés."
            }
        }
    ]
};

export default function GenerateurAmbigrammePrenomPage() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Gratuit · Sans Inscription · Téléchargement Immédiat
                    </div>
                    {/* H1 = query principale GSC "ambigramme prénom" */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Générateur d&apos;Ambigramme <span className="text-indigo-600">Prénom</span> Gratuit
                    </h1>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                        Créez un ambigramme avec deux prénoms en quelques secondes. Idéal pour les tatouages de couple, cadeaux personnalisés et impression 3D. Entrez les prénoms, générez, téléchargez.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="/two-word-ambigram-generator"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            <Sparkles size={15} /> Créer Mon Ambigramme Gratuitement
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

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-3xl space-y-14">

                    {/* COMMENT FAIRE — "générateur d'ambigramme 2 mots" */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Comment créer un ambigramme avec 2 prénoms
                        </h2>
                        <div className="space-y-3">
                            {[
                                ["1", "Entrez les deux prénoms", "Tapez le premier prénom dans le champ du haut et le second dans celui du bas. Le générateur accepte tous les prénoms français, étrangers et mots courants."],
                                ["2", "Choisissez le style", "Calligraphie pour les tatouages et designs élégants, Bloc pour un rendu moderne et audacieux. L'aperçu se met à jour en temps réel."],
                                ["3", "Téléchargez gratuitement", "Cliquez sur Télécharger pour obtenir le PNG en haute résolution. Aucun filigrane, aucun compte requis."],
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
                        <div className="mt-6">
                            <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                                Essayer le Générateur <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* EXEMPLES — "ambigramme prénom" */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">
                            Quels prénoms choisir pour un ambigramme ?
                        </h2>
                        <p className="text-slate-500 text-sm mb-6">Les meilleures combinaisons ont une longueur similaire et des lettres complémentaires après rotation à 180°.</p>

                        {/* SVG illustration — symétrie rotationnelle */}
                        <div className="flex justify-center mb-8">
                            <svg viewBox="0 0 320 80" className="w-full max-w-xs" xmlns="http://www.w3.org/2000/svg">
                                <rect width="320" height="80" rx="16" fill="#EEF2FF"/>
                                <text x="80" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fontWeight="bold" fill="#4338CA">Lucas</text>
                                <text x="160" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fill="#94A3B8">↻ 180°</text>
                                <text x="240" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fontWeight="bold" fill="#6366F1">Emma</text>
                            </svg>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="w-full min-w-[460px] text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Paire de prénoms</th>
                                        <th className="px-4 py-3 text-left">Qualité</th>
                                        <th className="px-4 py-3 text-left">Pourquoi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {exemplesPrenoms.map((ex) => (
                                        <tr key={ex.paire} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-3 font-bold text-indigo-700">{ex.paire}</td>
                                            <td className="px-4 py-3 text-slate-700">{ex.qualite}</td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">{ex.raison}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
                            <p className="font-bold text-amber-900 text-sm mb-1">Conseil pratique</p>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                Si vos prénoms ont des longueurs très différentes (ex. Alexandre et Léa), essayez des diminutifs ou surnoms. Un ambigramme lisible avec 4–6 lettres vaut mieux qu&apos;un design confus avec 10.
                            </p>
                        </div>
                    </div>

                    {/* TATOUAGE — "ambigramme tatouage" */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Ambigramme prénom pour tatouage
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Le tatouage ambigramme avec deux prénoms est l&apos;une des idées les plus originales pour immortaliser deux personnes en un seul signe. Avant de prendre rendez-vous avec votre tatoueur :
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            {[
                                ["Taille minimale recommandée", "Au moins 6 cm de largeur pour que les deux prénoms restent lisibles dans le temps."],
                                ["Style conseillé", "Choisissez le style Calligraphie du générateur pour des lignes plus douces, idéales pour la peau."],
                                ["Comment transmettre le fichier", "Téléchargez le PNG et envoyez-le à votre tatoueur par email ou message comme référence visuelle."],
                                ["Emplacement", "Poignet intérieur, avant-bras et sternum sont les plus populaires — la rotation à 180° doit être un geste naturel."],
                            ].map(([titre, desc]) => (
                                <li key={titre} className="flex gap-3">
                                    <span className="font-bold text-slate-900 flex-shrink-0">{titre} :</span>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>
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
                                    q: "Comment créer un ambigramme avec deux prénoms gratuitement ?",
                                    a: "Allez sur le générateur, entrez les deux prénoms et cliquez sur Générer. Le téléchargement PNG est immédiat et gratuit, sans compte requis."
                                },
                                {
                                    q: "Quels prénoms fonctionnent le mieux pour un ambigramme ?",
                                    a: "Les prénoms de longueur similaire : Lucas/Emma, Léa/Tom, Marie/Marc. Si les longueurs sont très différentes, utilisez des diminutifs."
                                },
                                {
                                    q: "Peut-on utiliser l'ambigramme pour un tatouage ?",
                                    a: "Oui. Téléchargez le PNG haute résolution et montrez-le à votre tatoueur comme référence. Libre d'utilisation sans filigrane."
                                },
                                {
                                    q: "Existe-t-il une version 3D de l'ambigramme prénom ?",
                                    a: "Oui. Le générateur 3D crée un objet physique qui affiche le premier prénom d'un côté et le second après rotation. Fichier STL téléchargeable pour impression 3D."
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
                        <h2 className="text-2xl font-black mb-3">Prêt à créer votre ambigramme ?</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
                            Entrez deux prénoms et générez votre design unique. Gratuit, sans inscription, sans filigrane.
                        </p>
                        <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors">
                            Générer Mon Ambigramme <ArrowRight size={15} />
                        </Link>
                        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold text-indigo-200">
                            <Link href="/3d-generator" className="hover:text-white transition-colors">Générateur 3D STL</Link>
                            <Link href="/ambigram-word-tattoos" className="hover:text-white transition-colors">Idées Tatouages</Link>
                            <Link href="/guide/ambigram-history-art" className="hover:text-white transition-colors">Histoire des Ambigrammes</Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
