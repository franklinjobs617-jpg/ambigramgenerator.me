import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Sparkles } from "lucide-react";

const DOMAIN = "https://www.ambigramgenerator.me";

// Página exclusivamente em português (pt-BR)
// Não usa constructMetadata pois "pt" não está no locale framework do site
// Canonical manual → /pt/gerador-ambigramas-nomes
//
// Queries GSC alvo (mercado ainda virgem — zero conteúdo pt-BR no site):
// "gerador de ambigramas"       — pos 39.75, 8 imp
// "ambigrama gerador"           — pos 23.1,  10 imp
// "criar ambigrama online grátis" — pos 11,  1 imp
// "gerador de ambigrama"        — pos 15,    1 imp
// "ambigrama 3d"                — pos 6.91,  81 imp (compartilhado com ES)
// Brazil: 40 cliques, 739 imp — fluxo vindo de páginas em inglês
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Gerador de Ambigramas com 2 Nomes Grátis — Online e Sem Cadastro",
        description: "Crie um ambigrama com dois nomes grátis. Gerador online: escreva 2 nomes, escolha o estilo, baixe PNG ou STL 3D. Sem cadastro, sem marca d'água.",
        alternates: {
            canonical: `${DOMAIN}/pt/gerador-ambigramas-nomes`,
        },
    };
}

// Exemplos de nomes populares para ambigramas no Brasil
const exemplosNomes = [
    { par: "Lucas / Ana", qualidade: "Excelente", motivo: "4 e 3 letras — simetria compacta e legível" },
    { par: "Mateus / Clara", qualidade: "Muito bom", motivo: "6 e 5 letras — equilíbrio visual natural" },
    { par: "Amor / Dor", qualidade: "Excelente", motivo: "Contraste clássico de tatuagem, muito solicitado" },
    { par: "Vida / Morte", qualidade: "Bom", motivo: "Contraste filosófico, design impactante" },
    { par: "Fé / Paz", qualidade: "Muito bom", motivo: "2–3 letras, resultado clean e elegante" },
    { par: "Guilherme / Lara", qualidade: "Difícil", motivo: "Comprimentos muito diferentes — tente Gui/Lara" },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Como criar um ambigrama com dois nomes grátis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Acesse o gerador de ambigramas, escreva o primeiro nome no campo superior e o segundo no campo inferior, escolha o estilo e clique em Gerar. O download do PNG é imediato e gratuito, sem necessidade de cadastro."
            }
        },
        {
            "@type": "Question",
            "name": "Quais nomes funcionam melhor para um ambigrama?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nomes com comprimento similar dão os melhores resultados. Pares como Lucas/Ana, Mateus/Clara ou Amor/Dor funcionam muito bem. Se os nomes têm comprimentos muito diferentes, experimente apelidos ou diminutivos."
            }
        },
        {
            "@type": "Question",
            "name": "Posso usar o ambigrama gerado para uma tatuagem?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim. Baixe o PNG em alta resolução e mostre ao seu tatuador como referência. Todos os designs são livres para uso pessoal e comercial, sem marca d'água."
            }
        },
        {
            "@type": "Question",
            "name": "Existe um gerador de ambigramas 3D grátis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim. O gerador 3D cria um objeto físico que mostra o primeiro nome de um lado e o segundo ao girá-lo 90°. Você pode baixar o arquivo STL e imprimir em qualquer impressora 3D."
            }
        },
        {
            "@type": "Question",
            "name": "O que é um ambigrama com dois nomes?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Um ambigrama com dois nomes é um design tipográfico que contém dois nomes diferentes em uma única imagem. Lido normalmente, aparece o primeiro nome. Girado 180°, aparece o segundo. Ideal para tatuagens de casal e presentes personalizados."
            }
        }
    ]
};

export default function GeradorAmbigramasNomesPage() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Grátis · Sem Cadastro · Download Imediato
                    </div>
                    {/* H1 = query principal pt-BR */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Gerador de Ambigramas com{" "}
                        <span className="text-indigo-600">2 Nomes</span> Grátis
                    </h1>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                        Crie seu ambigrama personalizado em segundos. Perfeito para tatuagens de casal, presentes e modelos 3D. Escreva os dois nomes, gere e baixe.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="/two-word-ambigram-generator"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            <Sparkles size={15} /> Criar Meu Ambigrama Grátis
                        </Link>
                        <Link
                            href="/3d-generator"
                            className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 px-7 py-4 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                        >
                            Versão 3D STL <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-3xl space-y-14">

                    {/* COMO CRIAR */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Como criar um ambigrama com 2 nomes online
                        </h2>
                        <div className="space-y-3">
                            {[
                                ["1", "Escreva os dois nomes", "Digite o primeiro nome no campo superior e o segundo no campo inferior. O gerador aceita nomes em português, inglês e qualquer idioma."],
                                ["2", "Escolha o estilo", "Caligrafia para tatuagens e designs elegantes, Bloco para um resultado moderno e marcante. A prévia atualiza em tempo real."],
                                ["3", "Baixe grátis", "Clique em Baixar para obter o PNG em alta resolução. Sem marca d'água, sem conta necessária."],
                            ].map(([n, titulo, desc]) => (
                                <div key={n} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">{n}</div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm mb-1">{titulo}</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                                Ir para o Gerador <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* QUAIS NOMES */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">
                            Quais nomes funcionam melhor?
                        </h2>
                        <p className="text-slate-500 text-sm mb-6">
                            Os melhores resultados surgem com nomes de comprimento similar e letras complementares após a rotação de 180°.
                        </p>

                        {/* SVG — ilustração rotação */}
                        <div className="flex justify-center mb-8">
                            <svg viewBox="0 0 320 80" className="w-full max-w-xs" xmlns="http://www.w3.org/2000/svg">
                                <rect width="320" height="80" rx="16" fill="#EEF2FF"/>
                                <text x="80" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="#4338CA">Lucas</text>
                                <text x="160" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fill="#94A3B8">↻ 180°</text>
                                <text x="240" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="#6366F1">Ana</text>
                            </svg>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="w-full min-w-[460px] text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Par de nomes</th>
                                        <th className="px-4 py-3 text-left">Qualidade</th>
                                        <th className="px-4 py-3 text-left">Por quê</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {exemplosNomes.map((ex) => (
                                        <tr key={ex.par} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-3 font-bold text-indigo-700">{ex.par}</td>
                                            <td className="px-4 py-3 text-slate-700">{ex.qualidade}</td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">{ex.motivo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
                            <p className="font-bold text-amber-900 text-sm mb-1">Dica prática</p>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                Se os seus nomes têm comprimentos muito diferentes (ex. Guilherme e Ana), experimente apelidos ou diminutivos. Um ambigrama legível com 4–6 letras vale muito mais do que um design confuso com 10.
                            </p>
                        </div>
                    </div>

                    {/* AMBIGRAMA 3D */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Ambigrama 3D com dois nomes
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            O gerador 3D cria um objeto físico que mostra o primeiro nome de um ângulo e o segundo ao girá-lo 90°. É um presente original e personalizado — um objeto de mesa que ninguém mais tem.
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5">
                            Baixe o arquivo <strong>STL</strong> e envie para qualquer serviço de impressão 3D online ou imprima você mesmo se tiver uma impressora 3D.
                        </p>
                        <Link
                            href="/3d-generator"
                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors"
                        >
                            Experimentar o Gerador 3D <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* TATUAGEM */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Ambigrama para tatuagem com nomes
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            A tatuagem de ambigrama com dois nomes é uma das ideias mais originais para homenagear duas pessoas em um único símbolo. Antes de agendar com seu tatuador:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            {[
                                ["Tamanho mínimo recomendado", "Pelo menos 6 cm de largura para que ambos os nomes permaneçam legíveis com o tempo."],
                                ["Estilo recomendado", "Use o estilo Caligrafia do gerador para linhas mais suaves, ideais para a pele."],
                                ["Como entregar o arquivo", "Baixe o PNG e envie ao seu tatuador por WhatsApp ou e-mail como referência visual."],
                                ["Localização", "Pulso interno, antebraço e esterno são os mais populares — a rotação de 180° deve ser um gesto natural."],
                            ].map(([titulo, desc]) => (
                                <li key={titulo} className="flex gap-3">
                                    <span className="font-bold text-slate-900 flex-shrink-0">{titulo}:</span>
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
                            Perguntas frequentes
                        </h2>
                        <div className="space-y-3">
                            {[
                                {
                                    q: "Como criar um ambigrama com dois nomes grátis?",
                                    a: "Acesse o gerador, escreva os dois nomes e clique em Gerar. O download do PNG é imediato e gratuito, sem cadastro necessário."
                                },
                                {
                                    q: "Quais nomes funcionam melhor para um ambigrama?",
                                    a: "Nomes de comprimento similar: Lucas/Ana, Mateus/Clara, Amor/Dor. Se os comprimentos são muito diferentes, use apelidos ou diminutivos."
                                },
                                {
                                    q: "Posso usar o ambigrama para uma tatuagem?",
                                    a: "Sim. Baixe o PNG em alta resolução e mostre ao seu tatuador como referência. Sem marca d'água, livre para uso pessoal e comercial."
                                },
                                {
                                    q: "Existe um gerador de ambigramas 3D grátis?",
                                    a: "Sim. O gerador 3D produz um arquivo STL imprimível que mostra um nome de cada lado ao girar o objeto. Ótimo como presente personalizado."
                                },
                                {
                                    q: "O que é um ambigrama com dois nomes?",
                                    a: "Um design tipográfico que contém dois nomes em uma única imagem. Lido normalmente aparece o primeiro; girado 180° aparece o segundo. Ideal para tatuagens de casal."
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
                        <h2 className="text-2xl font-black mb-3">Pronto para criar seu ambigrama?</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
                            Escreva dois nomes e gere seu design único. Grátis, sem cadastro, sem marca d&apos;água.
                        </p>
                        <Link
                            href="/two-word-ambigram-generator"
                            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors"
                        >
                            Gerar Meu Ambigrama <ArrowRight size={15} />
                        </Link>
                        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold text-indigo-200">
                            <Link href="/3d-generator" className="hover:text-white transition-colors">Gerador 3D STL</Link>
                            <Link href="/ambigram-word-tattoos" className="hover:text-white transition-colors">Ideias de Tatuagens</Link>
                            <Link href="/guide/ambigram-history-art" className="hover:text-white transition-colors">História dos Ambigramas</Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
