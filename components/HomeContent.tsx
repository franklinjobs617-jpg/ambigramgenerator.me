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
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between font-bold text-[#1A1A1B]"
            >
                <span className="pr-4">{question}</span>
                <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
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

    const applyInspiration = (wordA: string, wordB: string) => {
        setGlobalWordA(wordA);
        setGlobalWordB(wordB);
        document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" });
    };

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

    const inspirationPairs = [
        ["LOVE", "HATE"],
        ["ANGEL", "DEVIL"],
        ["LIFE", "DEATH"],
        ["HOPE", "FAITH"],
        ["TRUE", "FALSE"],
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

            <HeroSection onGenerate={handleHeroGenerate} />

            <section id="inspiration" className="border-t border-slate-100 bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-6 text-sm font-black text-slate-400">{t("Inspiration.title")}</p>
                    <div className="mx-auto flex max-w-4xl gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
                        {inspirationPairs.map((pair) => (
                            <button
                                key={pair.join("-")}
                                onClick={() => applyInspiration(pair[0], pair[1])}
                                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-bold text-[#666666] transition-all hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-sm"
                            >
                                {pair[0]} <ArrowRight size={14} className="text-slate-300" /> {pair[1]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section id="workspace" className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8">
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
                                    <Generator2d />
                                </motion.div>
                            ) : (
                                <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full bg-slate-950">
                                    <div className="w-full py-3 sm:py-4 text-center text-2xl sm:text-3xl font-black tracking-tight text-white">
                                        <h2>{t("Generator3D.title")}</h2>
                                        <p className="mt-1 text-sm text-slate-400">{t("Generator3D.subtitle")}</p>
                                    </div>
                                    <Generator3d incomingWordA={globalWordA} incomingWordB={globalWordB} triggerRender={generateTrigger} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mx-auto mt-4 max-w-4xl rounded-r-xl border-l-4 border-indigo-600 bg-indigo-50 p-4 sm:p-6 text-left shadow-sm">
                            <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1B]">{t("Workspace.tattooToolTitle")}</h2>
                            <p className="mt-2 text-sm text-[#666666]">
                                {t.rich("Workspace.tattooToolDesc", {
                                    bold: (chunks) => <strong>{chunks}</strong>,
                                    spanClass: (chunks) => <span className="font-bold text-indigo-600">{chunks}</span>,
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 sm:mb-16 text-center">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1B]">{t("HowItWorks.title")}</h2>
                        <p className="mt-4 font-medium text-[#666666]">{t("HowItWorks.subtitle")}</p>
                    </div>
                    <div className="grid gap-8 sm:gap-12 md:grid-cols-3">
                        {[
                            { step: "1", title: t("HowItWorks.step1Title"), desc: t("HowItWorks.step1Desc") },
                            { step: "2", title: t("HowItWorks.step2Title"), desc: t("HowItWorks.step2Desc") },
                            { step: "3", title: t("HowItWorks.step3Title"), desc: t("HowItWorks.step3Desc") },
                        ].map((item) => (
                            <div key={item.step} className="space-y-5 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 shadow-sm">
                                    <span className="text-2xl font-black text-indigo-600">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#1A1A1B]">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-[#666666]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="coreFeatures" className="bg-white py-16 sm:py-20 lg:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1B]">{t("CoreFeatures.mainTitle")}</h2>
                        <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-indigo-600 opacity-20" />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {coreFeatures.map((feature) => (
                            <div
                                key={feature.title}
                                className="group flex flex-col items-center rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 bg-white p-6 sm:p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/5"
                            >
                                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-[1.8rem] ${feature.bg} transition-transform duration-500 group-hover:scale-110`}>
                                    {feature.icon}
                                </div>
                                <h3 className="mb-3 text-xl font-bold tracking-tight text-[#1A1A1B]">{feature.title}</h3>
                                <p className="text-sm font-medium leading-relaxed text-slate-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-slate-100 bg-slate-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 sm:mb-16 text-center">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1B]">{t("Features.title")}</h2>
                        <p className="mt-4 font-medium text-[#666666]">{t("Features.subtitle")}</p>
                    </div>
                    <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: PenTool, title: t("Features.f1Title"), desc: t("Features.f1Desc"), color: "text-purple-600", bg: "bg-purple-100" },
                            { icon: Box, title: t("Features.f2Title"), desc: t("Features.f2Desc"), color: "text-blue-600", bg: "bg-blue-100" },
                            { icon: Gift, title: t("Features.f3Title"), desc: t("Features.f3Desc"), color: "text-indigo-600", bg: "bg-indigo-100" },
                            { icon: Lightbulb, title: t("Features.f4Title"), desc: t("Features.f4Desc"), color: "text-orange-600", bg: "bg-orange-100" },
                        ].map((card) => (
                            <div key={card.title} className="rounded-[1.6rem] sm:rounded-[2rem] bg-white p-6 sm:p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg} ${card.color}`}>
                                    <card.icon size={28} />
                                </div>
                                <h3 className="mb-3 text-lg font-bold leading-snug text-[#1A1A1B]">{card.title}</h3>
                                <p className="text-sm leading-relaxed text-[#666666]">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="examples" className="border-t border-slate-100 bg-[#F8FAFC] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="container mx-auto">
                    <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1B]">{t("Examples.title")}</h2>
                        <p className="font-medium italic text-slate-500">{t("Examples.subtitle")}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                        {galleryCards.map((card) => (
                            <div
                                key={card.title}
                                className={`group rounded-[2rem] sm:rounded-[2.5rem] p-4 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 ${card.dark ? "border-2 border-indigo-100 bg-white" : "border border-slate-200/60 bg-white"
                                    }`}
                            >
                                <div className={`relative mb-6 aspect-[4/3] overflow-hidden rounded-[1.8rem] ${card.dark ? "bg-slate-900" : "bg-slate-50"}`}>
                                    <Image
                                        src={card.src}
                                        alt={card.alt}
                                        fill
                                        className={`${card.dark ? "object-contain p-4" : "object-cover"} transition-transform duration-700 group-hover:scale-110`}
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                    />
                                    {card.badge ? (
                                        <div className="absolute right-4 top-4 rounded-xl bg-indigo-600/90 px-3 py-1.5 text-[10px] font-black text-white shadow-lg backdrop-blur-md">
                                            {card.badge}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="px-2 pb-2">
                                    <div className={`mb-1 text-lg font-black ${card.dark ? "text-indigo-600" : "text-[#1A1A1B]"}`}>{card.title}</div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{card.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-white">
                <div className="mx-auto max-w-4xl rounded-[2rem] sm:rounded-[3rem] border border-slate-700 bg-slate-800/50 p-5 sm:p-10 shadow-2xl">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black">{t("Comparison.title")}</h2>
                        <p className="mt-2 text-slate-400">{t("Comparison.subtitle")}</p>
                    </div>
                    <div className="overflow-x-auto rounded-3xl border border-slate-700">
                        <table className="w-full min-w-[680px] text-left">
                            <thead className="bg-slate-950 text-sm font-bold text-white">
                                <tr>
                                    <th className="p-5">{t("Comparison.headerFeature")}</th>
                                    <th className="bg-indigo-600 p-5">{t("Comparison.headerUs")}</th>
                                    <th className="p-5 text-slate-500">{t("Comparison.headerOthers")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50 text-sm font-bold text-slate-300">
                                <tr>
                                    <td className="p-5">{t("Comparison.priceLabel")}</td>
                                    <td className="p-5 text-emerald-400">{t("Comparison.priceUs")}</td>
                                    <td className="p-5 text-slate-500">{t("Comparison.priceOthers")}</td>
                                </tr>
                                <tr>
                                    <td className="p-5">{t("Comparison.modelLabel")}</td>
                                    <td className="p-5 text-emerald-400">{t("Comparison.modelUs")}</td>
                                    <td className="p-5 text-slate-500">{t("Comparison.modelOthers")}</td>
                                </tr>
                                <tr>
                                    <td className="p-5">{t("Comparison.twoNameLabel")}</td>
                                    <td className="p-5 text-emerald-400">{t("Comparison.twoNameUs")}</td>
                                    <td className="p-5 text-slate-500">{t("Comparison.twoNameOthers")}</td>
                                </tr>
                                <tr>
                                    <td className="p-5">{t("Comparison.formatLabel")}</td>
                                    <td className="p-5 text-white">{t("Comparison.formatUs")}</td>
                                    <td className="p-5 text-slate-500">{t("Comparison.formatOthers")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="faq" className="bg-[#F8FAFC] px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-10 sm:mb-16 text-center">
                        <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1B]">{t("FAQ.title")}</h2>
                        <p className="mt-4 font-medium text-[#666666]">{t("FAQ.subtitle")}</p>
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

            <section className="bg-light py-16 sm:py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-dark font-display">{t("CTA.title")}</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">{t("CTA.subtitle")}</p>
                    <Link
                        href="#workspace"
                        className="inline-flex items-center gap-3 rounded-full bg-indigo-600 px-7 sm:px-10 py-3.5 sm:py-4 text-base sm:text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl"
                    >
                        <i className="fa fa-magic" /> {t("CTA.button")}
                    </Link>
                </div>
            </section>
        </div>
    );
}

