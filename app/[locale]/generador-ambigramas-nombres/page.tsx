import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Sparkles } from "lucide-react";

const DOMAIN = "https://www.ambigramgenerator.me";

// Página exclusivamente en español — canonical /es/generador-ambigramas-nombres
// Queries GSC objetivo:
// "generador de ambigramas" pos 12.5 CTR 25% (8 imp)
// "ambigrama generador 2 nombres" pos 10 CTR 9.09% (11 imp)
// "ambigrama 3d" pos 6.91 CTR 6.17% (81 imp)
// "creador de ambigramas" pos 11.67 CTR 33.33% (3 imp)
// "ambigrama generador gratis" pos 10.33 CTR 33.33% (3 imp)
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Generador de Ambigramas con 2 Nombres Gratis — Online y Sin Registro",
        description: "Crea un ambigrama con dos nombres gratis. Generador online: escribe 2 nombres, elige el estilo, descarga PNG o STL 3D. Sin registro, sin marca de agua.",
        alternates: {
            canonical: `${DOMAIN}/es/generador-ambigramas-nombres`,
        },
    };
}

const ejemplosNombres = [
    { par: "Carlos / María", calidad: "Excelente", razon: "6 y 5 letras — equilibrio visual natural" },
    { par: "Luis / Ana", calidad: "Muy bueno", razon: "4 y 3 letras — simetría compacta" },
    { par: "Amor / Odio", calidad: "Excelente", razon: "Clásico de tatuaje, contraste poderoso" },
    { par: "Vida / Muerte", calidad: "Bueno", razon: "Contraste filosófico muy solicitado" },
    { par: "Alejandro / Laura", calidad: "Difícil", razon: "Longitudes muy distintas — prueba Ale/Laura" },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "¿Cómo crear un ambigrama con dos nombres gratis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Entra al generador de ambigramas, escribe el primer nombre en el campo superior y el segundo en el inferior, elige el estilo y haz clic en Generar. La descarga del PNG es inmediata y gratuita, sin necesidad de cuenta."
            }
        },
        {
            "@type": "Question",
            "name": "¿Qué nombres funcionan mejor para un ambigrama?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Los nombres con longitud similar dan los mejores resultados. Pares como Carlos/María, Luis/Ana o Amor/Odio funcionan muy bien. Si los nombres tienen longitudes muy distintas, prueba con diminutivos o apodos."
            }
        },
        {
            "@type": "Question",
            "name": "¿Puedo usar el ambigrama generado para un tatuaje?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí. Descarga el PNG en alta resolución y muéstraselo a tu tatuador como referencia. Todos los diseños son de uso libre para uso personal y comercial, sin marca de agua."
            }
        },
        {
            "@type": "Question",
            "name": "¿Existe un generador de ambigramas 3D gratis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí. El generador 3D crea un objeto físico que muestra el primer nombre desde un lado y el segundo al rotarlo 90°. Puedes descargar el archivo STL e imprimirlo en 3D."
            }
        },
        {
            "@type": "Question",
            "name": "¿Qué es un ambigrama con dos nombres?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Un ambigrama con dos nombres es un diseño tipográfico que contiene dos nombres distintos en una sola imagen. Leído normalmente se ve el primer nombre; al girarlo 180° aparece el segundo. Es ideal para tatuajes de pareja y regalos personalizados."
            }
        }
    ]
};

export default function GeneradorAmbigramasNombresPage() {
    return (
        <main className="bg-[#FDFDFF] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HERO */}
            <section className="bg-gradient-to-b from-indigo-50/60 to-white pt-32 pb-16 px-4 text-center">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs mb-5 uppercase tracking-wider">
                        <Check size={12} /> Gratis · Sin Registro · Descarga Inmediata
                    </div>
                    {/* H1 = query principal "generador de ambigramas" + "2 nombres" */}
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Generador de Ambigramas con <span className="text-indigo-600">2 Nombres</span> Gratis
                    </h1>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                        Crea tu ambigrama personalizado en segundos. Perfecto para tatuajes de pareja, regalos y modelos 3D. Escribe los dos nombres, genera y descarga.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="/two-word-ambigram-generator"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            <Sparkles size={15} /> Crear Mi Ambigrama Gratis
                        </Link>
                        <Link
                            href="/3d-generator"
                            className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 px-7 py-4 rounded-xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                        >
                            Versión 3D STL <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4">
                <div className="container mx-auto max-w-3xl space-y-14">

                    {/* CÓMO HACER */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            Cómo crear un ambigrama con 2 nombres online
                        </h2>
                        <div className="space-y-3">
                            {[
                                ["1", "Escribe los dos nombres", "Introduce el primer nombre en el campo superior y el segundo en el inferior. El generador acepta nombres en español, inglés y cualquier idioma."],
                                ["2", "Elige el estilo", "Caligrafía para tatuajes y diseños elegantes, Bloque para un resultado moderno y audaz. La vista previa se actualiza en tiempo real."],
                                ["3", "Descarga gratis", "Haz clic en Descargar para obtener el PNG en alta resolución. Sin marca de agua, sin cuenta necesaria."],
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
                                Ir al Generador <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* EJEMPLOS */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-3">
                            ¿Qué nombres funcionan mejor?
                        </h2>
                        <p className="text-slate-500 text-sm mb-6">Los mejores resultados se obtienen con nombres de longitud similar y letras complementarias tras la rotación a 180°.</p>

                        {/* SVG — ilustración rotación */}
                        <div className="flex justify-center mb-8">
                            <svg viewBox="0 0 320 80" className="w-full max-w-xs" xmlns="http://www.w3.org/2000/svg">
                                <rect width="320" height="80" rx="16" fill="#EEF2FF"/>
                                <text x="80" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="#4338CA">Carlos</text>
                                <text x="160" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fill="#94A3B8">↻ 180°</text>
                                <text x="240" y="48" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="#6366F1">María</text>
                            </svg>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="w-full min-w-[460px] text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Par de nombres</th>
                                        <th className="px-4 py-3 text-left">Calidad</th>
                                        <th className="px-4 py-3 text-left">Por qué</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {ejemplosNombres.map((ex) => (
                                        <tr key={ex.par} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-3 font-bold text-indigo-700">{ex.par}</td>
                                            <td className="px-4 py-3 text-slate-700">{ex.calidad}</td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">{ex.razon}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
                            <p className="font-bold text-amber-900 text-sm mb-1">Consejo práctico</p>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                Si tus nombres tienen longitudes muy distintas (ej. Alejandro y Ana), prueba con diminutivos o apodos. Un ambigrama legible con 4–6 letras es mucho mejor que un diseño confuso con 10.
                            </p>
                        </div>
                    </div>

                    {/* AMBIGRAMA 3D — expandido para cubrir "ambigrama 3d" (81 imp, pos 6.91) */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Ambigrama 3D con dos nombres
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5">
                            El generador 3D crea un objeto físico tridimensional que muestra el primer nombre desde un ángulo y el segundo nombre al girarlo 90°. Es la evolución del ambigramma 2D clásico — en lugar de una imagen plana, obtienes un modelo real que puedes imprimir.
                        </p>

                        {/* SVG ilustración 3D */}
                        <div className="flex justify-center mb-6">
                            <svg viewBox="0 0 340 90" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
                                <rect width="340" height="90" rx="16" fill="#0F172A"/>
                                <text x="60" y="35" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#94A3B8">Vista frontal</text>
                                <text x="60" y="62" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill="#818CF8">Carlos</text>
                                <text x="170" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fill="#475569">↻ 90°</text>
                                <text x="280" y="35" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#94A3B8">Vista lateral</text>
                                <text x="280" y="62" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill="#A5B4FC">María</text>
                            </svg>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-3 mb-5">
                            {[
                                { titulo: "Impresión 3D", desc: "Descarga el STL y envíalo a cualquier servicio de impresión 3D online — o imprímelo si tienes impresora." },
                                { titulo: "Regalo original", desc: "Un objeto de escritorio único que muestra dos nombres según el ángulo. Perfecto para aniversarios y bodas." },
                                { titulo: "GIF animado", desc: "Exporta un GIF del modelo rotando para compartir en redes sociales y mostrar ambos nombres en movimiento." },
                            ].map(({ titulo, desc }) => (
                                <div key={titulo} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="font-bold text-slate-900 text-sm mb-1">{titulo}</p>
                                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5 text-sm">
                            <p className="font-bold text-indigo-900 mb-1">2D vs 3D — ¿cuál elegir?</p>
                            <div className="grid sm:grid-cols-2 gap-3 mt-2">
                                <div>
                                    <p className="font-bold text-slate-700 text-xs mb-1">Ambigrama 2D</p>
                                    <p className="text-slate-500 text-xs leading-relaxed">Imagen plana. Ideal para tatuajes, logos y descarga PNG. Gratis sin límites.</p>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-700 text-xs mb-1">Ambigrama 3D</p>
                                    <p className="text-slate-500 text-xs leading-relaxed">Objeto físico imprimible. Ideal para regalos y arte de escritorio. Descarga STL.</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/3d-generator" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors">
                            Probar el Generador 3D <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* TATUAJE */}
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Ambigrama para tatuaje con nombres
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-600">
                            {[
                                ["Tamaño mínimo recomendado", "Al menos 6 cm de ancho para que ambos nombres sigan siendo legibles con el tiempo."],
                                ["Estilo recomendado", "Usa el estilo Caligrafía del generador para líneas más suaves, ideales para la piel."],
                                ["Cómo entregar el archivo", "Descarga el PNG y mándalo a tu tatuador por WhatsApp o email como referencia visual."],
                                ["Ubicación", "Muñeca interior, antebrazo y esternón son las más populares — la rotación de 180° debe ser un gesto natural."],
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
                            Preguntas frecuentes
                        </h2>
                        <div className="space-y-3">
                            {[
                                { q: "¿Cómo crear un ambigrama con dos nombres gratis?", a: "Entra al generador, escribe los dos nombres y haz clic en Generar. La descarga del PNG es inmediata y gratuita, sin cuenta necesaria." },
                                { q: "¿Qué nombres funcionan mejor para un ambigrama?", a: "Nombres de longitud similar: Carlos/María, Luis/Ana, Amor/Odio. Si las longitudes son muy distintas, usa diminutivos." },
                                { q: "¿Puedo usar el ambigrama para un tatuaje?", a: "Sí. Descarga el PNG en alta resolución y muéstraselo a tu tatuador como referencia. Sin marca de agua, libre de uso." },
                                { q: "¿Existe un generador de ambigramas 3D gratis?", a: "Sí. El generador 3D produce un archivo STL imprimible que muestra un nombre por lado al rotar el objeto." },
                                { q: "¿Qué es un ambigrama con dos nombres?", a: "Un diseño tipográfico que contiene dos nombres en una sola imagen. Visto normalmente se lee el primero; girado 180° aparece el segundo. Ideal para tatuajes de pareja." },
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
                        <h2 className="text-2xl font-black mb-3">¿Listo para crear tu ambigrama?</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
                            Introduce dos nombres y genera tu diseño único. Gratis, sin registro, sin marca de agua.
                        </p>
                        <Link href="/two-word-ambigram-generator" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors">
                            Generar Mi Ambigrama <ArrowRight size={15} />
                        </Link>
                        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold text-indigo-200">
                            <Link href="/3d-generator" className="hover:text-white transition-colors">Generador 3D STL</Link>
                            <Link href="/ambigram-word-tattoos" className="hover:text-white transition-colors">Ideas para Tatuajes</Link>
                            <Link href="/guide/ambigram-history-art" className="hover:text-white transition-colors">Historia de los Ambigramas</Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
