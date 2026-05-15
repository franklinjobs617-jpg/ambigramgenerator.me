"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Generator3d from "@/components/Generator3d";
import Generator2d from "@/components/Generator2d";
import HeroSection from "@/components/HeroSection";
import { ArrowRight, Box, CheckCircle2, ChevronDown, Gift, Lightbulb, Palette, PenTool, Sparkles, Users } from "lucide-react";

type WorkspaceTab = "3d" | "2d";

function FaqItem({ question, answer }: { question: string; answer: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-indigo-100 hover:shadow-md">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between font-bold text-[#1A1A1B]"
            >
                <span className="pr-4">{question}</span>
                <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-500" : ""}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-50 px-5 sm:px-6 pb-5 pt-4 text-sm leading-relaxed text-[#666666]"
                    >
                        {answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function HomeContent() {
    const t = useTranslations("HomePage");

    const [activeTab, setActiveTab] = useState<WorkspaceTab>("2d");
    const [globalWordA, setGlobalWordA] = useState("");
    const [globalWordB, setGlobalWordB] = useState("");
    const [generateTrigger, setGenerateTrigger] = useState(0);
    const [showToast, setShowToast] = useState(false);

    const handleHeroGenerate = (wordA: string, wordB: string, tab: WorkspaceTab) => {
        setGlobalWordA(wordA);
        setGlobalWordB(wordB);
        setActiveTab(tab);
        setGenerateTrigger((prev) => prev + 1);
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowToast(true), 3000);
        const hideTimer = setTimeout(() => setShowToast(false), 8000);
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const coreFeatures = [
        {
            icon: <Users className="h-8 w-8 text-indigo-600" />,
            title: t("CoreFeatures.item1.title"),
            desc: t("CoreFeatures.item1.desc"),
            bg: "bg-indigo-50",
        },
        {
            icon: <Users className="h-8 w-8 text-blue-600" />,
            title: t("CoreFeatures.item2.title"),
            desc: t("CoreFeatures.item2.desc"),
            bg: "bg-blue-50",
        },
        {
            icon: <Palette className="h-8 w-8 text-purple-600" />,
            title: t("CoreFeatures.item3.title"),
            desc: t("CoreFeatures.item3.desc"),
            bg: "bg-purple-50",
        },
        {
            icon: <CheckCircle2 className="h-8 w-8 text-emerald-600" />,
            title: t("CoreFeatures.item4.title"),
            desc: t("CoreFeatures.item4.desc"),
            bg: "bg-emerald-50",
        },
    ];

    const galleryCards = [
        {
            src: "/images/tatto-2-name-example.webp",
            alt: "Two-Name Ambigram Sarah John",
            title: t("Examples.ex1Title"),
            desc: t("Examples.ex1Desc"),
            dark: false,
            badge: null,
        },
        {
            src: "/images/tatto-2-name-example-generate.webp",
            alt: "Tattoo Style Trust",
            title: t("Examples.ex2Title"),
            desc: t("Examples.ex2Desc"),
            dark: false,
            badge: null,
        },
        {
            src: "/images/2-name-Ambigram-example-generate.webp",
            alt: "3D Print Ambigram",
            title: t("Examples.ex3Title"),
            desc: t("Examples.ex3Desc"),
            dark: true,
            badge: t("Examples.ex3Badge"),
        },
        {
            src: "/images/Animated-GIF-of-ILLUSION-rotating.webp",
            alt: "Animated 3D Illusion",
            title: t("Examples.ex4Title"),
            desc: t("Examples.ex4Desc"),
            dark: true,
            badge: t("Examples.ex4Badge"),
        },
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFF] font-sans text-[#1A1A1B] selection:bg-indigo-100">
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.92 }}
                        className="fixed bottom-24 left-4 lg:left-8 z-[100] hidden sm:flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 pr-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-inner">
                            <Sparkles size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-400">1 min ago in Paris</span>
                            <span className="text-sm font-bold text-[#1A1A1B]">Someone generated a &quot;Leo/Love&quot; STL.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero - contains H1 */}
            <HeroSection onGenerate={handleHeroGenerate} />

            {/* Workspace - moved up, right after Hero */}
            <section id="workspace" className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div className="rounded-[1.75rem] sm:rounded-[3rem] border border-slate-100 bg-white p-3 sm:p-4 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.05)]">
                    <div className="mb-5 sm:mb-6 flex justify-center pt-3 sm:pt-4">
                        <div className="grid w-full max-w-md grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1 sm:rounded-full">
                            <button
                                onClick={() => setActiveTab("3d")}
                                className={`inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-full px-4 sm:px-8 py-3 text-sm font-bold transition-all ${activeTab === "3d"
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                    : "text-slate-500 hover:text-[#1A1A1B]"
                                    }`}
                            >
                                <Box size={16} /> {t("Workspace.tab3d")}
                            </button>
                            <button
                                onClick={() => setActiveTab("2d")}
                                className={`inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-full px-4 sm:px-8 py-3 text-sm font-bold transition-all ${activeTab === "2d"
                                    ? "bg-[#1A1A1B] text-white shadow-md"
                                    : "text-slate-500 hover:text-[#1A1A1B]"
                                    }`}
                            >
                                <PenTool size={16} /> {t("Workspace.tab2d")}
                            </button>
                        </div>
                    </div>

                    <div className="relative min-h-[460px] sm:min-h-[560px] lg:min-h-[650px] overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem]">
                        <AnimatePresence mode="wait">
                            {activeTab === "2d" ? (
                                <motion.div key="2d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white">
                                    <Generator2d incomingWordA={globalWordA} incomingWordB={globalWordB} triggerGenerate={generateTrigger} />
                                </motion.div>
                            ) : (
                                <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full bg-slate-950" style={{ height: '100%', minHeight: '460px' }}>
                                    <div className="w-full py-3 sm:py-4 text-center text-2xl sm:text-3xl font-black tracking-tight text-white">
                                        <h2>{t("Generator3D.title")}</h2>
                                        <p className="mt-1 text-sm text-slate-400">{t("Generator3D.subtitle")}</p>
                                    </div>
                                    <Generator3d incomingWordA={globalWordA} incomingWordB={globalWordB} triggerRender={generateTrigger} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-transparent p-5 sm:p-6 text-left">
                            <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1B]">{t("Workspace.tattooToolTitle")}</h2>
                            <p className="mt-2 text-sm text-[#666666] leading-relaxed">
                                {t.rich("Workspace.tattooToolDesc", {
                                    bold: (chunks) => <strong>{chunks}</strong>,
                                    spanClass: (chunks) => <span className="font-bold text-indigo-600">{chunks}</span>,
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Tattoo Generator - compact banner */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <Link
                    href="/ai-tattoo-generator"
                    className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-5 transition-all hover:border-indigo-200 hover:shadow-lg"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                            <Sparkles size={22} />
                        </div>
                        <div>
                            <h2 className="text-base font-black text-[#1A1A1B]">{t("AIBanner.title")}</h2>
                            <p className="text-sm text-slate-500">{t("AIBanner.desc")}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all group-hover:bg-indigo-700 group-hover:shadow-lg">
                        {t("AIBanner.cta")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            </section>

            {/* How It Works */}
            <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 sm:mb-14 text-center">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1B]">{t("HowItWorks.title")}</h2>
                        <p className="mt-3 font-medium text-sm text-[#666666]">{t("HowItWorks.subtitle")}</p>
                    </div>
                    <div className="relative grid gap-8 md:grid-cols-3">
                        {[
                            { step: "1", title: t("HowItWorks.step1Title"), desc: t("HowItWorks.step1Desc") },
                            { step: "2", title: t("HowItWorks.step2Title"), desc: t("HowItWorks.step2Desc") },
                            { step: "3", title: t("HowItWorks.step3Title"), desc: t("HowItWorks.step3Desc") },
                        ].map((item, i) => (
                            <div key={item.step} className="relative space-y-4 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/80 shadow-sm ring-1 ring-indigo-100">
                                    <span className="text-xl font-black text-indigo-600">{item.step}</span>
                                </div>
                                {i < 2 && (
                                    <div className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-indigo-200 to-transparent md:block" />
                                )}
                                <h3 className="text-lg font-bold text-[#1A1A1B]">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-[#666666]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 sm:mb-14 text-center">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1B]">{t("CoreFeatures.mainTitle")}</h2>
                        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-indigo-600/30" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {coreFeatures.map((feature) => (
                            <div
                                key={feature.title}
                                className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50"
                            >
                                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} transition-transform duration-300 group-hover:scale-110`}>
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 text-sm font-bold tracking-tight text-[#1A1A1B]">{feature.title}</h3>
                                <p className="text-xs leading-relaxed text-slate-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 sm:mt-20 text-center">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1B]">{t("Features.title")}</h2>
                        <p className="mt-3 font-medium text-sm text-[#666666]">{t("Features.subtitle")}</p>
                    </div>
                    <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: PenTool, title: t("Features.f1Title"), desc: t("Features.f1Desc"), color: "text-purple-600", bg: "bg-purple-50", ring: "ring-purple-100" },
                            { icon: Box, title: t("Features.f2Title"), desc: t("Features.f2Desc"), color: "text-blue-600", bg: "bg-blue-50", ring: "ring-blue-100" },
                            { icon: Gift, title: t("Features.f3Title"), desc: t("Features.f3Desc"), color: "text-indigo-600", bg: "bg-indigo-50", ring: "ring-indigo-100" },
                            { icon: Lightbulb, title: t("Features.f4Title"), desc: t("Features.f4Desc"), color: "text-orange-600", bg: "bg-orange-50", ring: "ring-orange-100" },
                        ].map((card) => (
                            <div key={card.title} className="group rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50">
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} ${card.color} ring-1 ${card.ring}`}>
                                    <card.icon size={22} />
                                </div>
                                <h3 className="mb-2 text-sm font-bold leading-snug text-[#1A1A1B]">{card.title}</h3>
                                <p className="text-xs leading-relaxed text-[#666666]">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Examples */}
            <section id="examples" className="bg-[#F8FAFC] px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-10 sm:mb-14 max-w-3xl text-center">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1B]">{t("Examples.title")}</h2>
                        <p className="mt-3 font-medium text-sm text-slate-500">{t("Examples.subtitle")}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {galleryCards.map((card) => (
                            <div
                                key={card.title}
                                className="group rounded-2xl border border-slate-200/60 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50"
                            >
                                <div className={`relative mb-3 aspect-[4/3] overflow-hidden rounded-xl ${card.dark ? "bg-slate-900" : "bg-slate-50"}`}>
                                    <Image
                                        src={card.src}
                                        alt={card.alt}
                                        fill
                                        className={`${card.dark ? "object-contain p-3" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                    />
                                    {card.badge ? (
                                        <div className="absolute right-3 top-3 rounded-lg bg-indigo-600/90 px-2.5 py-1 text-[9px] font-black text-white shadow-lg backdrop-blur-sm">
                                            {card.badge}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="px-1 pb-1">
                                    <div className="mb-1 text-sm font-bold text-[#1A1A1B]">{card.title}</div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{card.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="bg-gradient-to-b from-slate-900 to-slate-950 px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-white">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 sm:mb-10 text-center">
                        <h2 className="text-2xl sm:text-3xl font-black">{t("Comparison.title")}</h2>
                        <p className="mt-3 text-sm text-slate-400">{t("Comparison.subtitle")}</p>
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-slate-700/60 bg-white/[0.03] backdrop-blur-sm">
                        <table className="w-full min-w-[600px] text-left">
                            <thead className="text-sm font-bold text-white">
                                <tr>
                                    <th className="p-4 sm:p-5 text-slate-300">{t("Comparison.headerFeature")}</th>
                                    <th className="bg-indigo-600/90 p-4 sm:p-5 rounded-tr-none">{t("Comparison.headerUs")}</th>
                                    <th className="p-4 sm:p-5 text-slate-500">{t("Comparison.headerOthers")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-sm font-bold">
                                <tr className="transition-colors hover:bg-white/[0.02]">
                                    <td className="p-4 sm:p-5 text-slate-300">{t("Comparison.priceLabel")}</td>
                                    <td className="p-4 sm:p-5 text-emerald-400">{t("Comparison.priceUs")}</td>
                                    <td className="p-4 sm:p-5 text-slate-500">{t("Comparison.priceOthers")}</td>
                                </tr>
                                <tr className="transition-colors hover:bg-white/[0.02]">
                                    <td className="p-4 sm:p-5 text-slate-300">{t("Comparison.modelLabel")}</td>
                                    <td className="p-4 sm:p-5 text-emerald-400">{t("Comparison.modelUs")}</td>
                                    <td className="p-4 sm:p-5 text-slate-500">{t("Comparison.modelOthers")}</td>
                                </tr>
                                <tr className="transition-colors hover:bg-white/[0.02]">
                                    <td className="p-4 sm:p-5 text-slate-300">{t("Comparison.twoNameLabel")}</td>
                                    <td className="p-4 sm:p-5 text-emerald-400">{t("Comparison.twoNameUs")}</td>
                                    <td className="p-4 sm:p-5 text-slate-500">{t("Comparison.twoNameOthers")}</td>
                                </tr>
                                <tr className="transition-colors hover:bg-white/[0.02]">
                                    <td className="p-4 sm:p-5 text-slate-300">{t("Comparison.formatLabel")}</td>
                                    <td className="p-4 sm:p-5 text-white">{t("Comparison.formatUs")}</td>
                                    <td className="p-4 sm:p-5 text-slate-500">{t("Comparison.formatOthers")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-10 sm:mb-14 text-center">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1B]">{t("FAQ.title")}</h2>
                        <p className="mt-3 font-medium text-sm text-[#666666]">{t("FAQ.subtitle")}</p>
                    </div>
                    <div className="space-y-3">
                        <FaqItem question={t("FAQ.q1")} answer={t.rich("FAQ.a1", { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem question={t("FAQ.q2")} answer={t.rich("FAQ.a2", { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem question={t("FAQ.q3")} answer={t.rich("FAQ.a3", { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem question={t("FAQ.q4")} answer={t.rich("FAQ.a4", { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem
                            question={t("FAQ.q5")}
                            answer={
                                <>
                                    {t("FAQ.a5")}
                                    <ul className="mt-2 list-disc space-y-1 pl-6">
                                        <li>{t("FAQ.a5Li1")}</li>
                                        <li>{t("FAQ.a5Li2")}</li>
                                        <li>{t("FAQ.a5Li3")}</li>
                                    </ul>
                                </>
                            }
                        />
                        <FaqItem question={t("FAQ.q6")} answer={t.rich("FAQ.a6", { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem question={t("FAQ.q7")} answer={t.rich("FAQ.a7", { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem question={t("FAQ.q8")} answer={t.rich("FAQ.a8", { bold: (chunks) => <strong>{chunks}</strong> })} />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 py-16 sm:py-24">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.3),transparent_60%)]" />
                <div className="relative mx-auto max-w-3xl px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{t("CTA.title")}</h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-indigo-100 leading-relaxed">{t("CTA.subtitle")}</p>
                    <Link
                        href="#workspace"
                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-indigo-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-indigo-50"
                    >
                        <Sparkles size={20} /> {t("CTA.button")}
                    </Link>
                </div>
            </section>
        </div>
    );
}
