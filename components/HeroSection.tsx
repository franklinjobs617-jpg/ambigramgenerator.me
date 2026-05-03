"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Box, PenTool, PlayCircle, Wand2, Zap, Sparkles } from "lucide-react";

interface HeroSectionProps {
    onGenerate: (wordA: string, wordB: string, tab: "3d" | "2d") => void;
}

export default function HeroSection({ onGenerate }: HeroSectionProps) {
    const t = useTranslations("HomePage.HeroSection");

    const [wordA, setWordA] = useState("");
    const [wordB, setWordB] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const features = [
        {
            id: "3d",
            title: t("slide3DTitle"),
            desc: t("slide3DDesc"),
            liveLabel: t("slide3DLiveLabel"),
            image: "/images/3d-perfect-case.gif",
            bg: "bg-[#0f172a]",
        },
        {
            id: "2d",
            title: t("slide2DTitle"),
            desc: t("slide2DDesc"),
            liveLabel: t("slide2DLiveLabel"),
            image: "/images/2d-tattoo-case.png",
            bg: "bg-[#fcfcf9]",
        },
    ] as const;

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
    }, [features.length]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 4200);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const handleAISuggest = () => {
        const pairs: Record<string, string> = {
            LOVE: "HATE",
            ANGEL: "DEVIL",
            LIFE: "DEATH",
            TRUE: "FALSE",
        };
        const upperA = wordA.toUpperCase().trim();
        setWordB(pairs[upperA] || "ALWAYS");
    };

    const handleGenerate = (tab: "3d" | "2d") => {
        const finalWordA = wordA || "LOVE";
        const finalWordB = wordB || "HATE";
        onGenerate(finalWordA, finalWordB, tab);
        document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" });
    };

    const currentFeature = features[activeIndex] ?? features[0];

    return (
        <section className="relative overflow-hidden bg-[#FDFDFF] px-4 pt-20 pb-12 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
            {/* Background accents */}
            <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-indigo-100/60 blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-purple-100/40 blur-[80px] -z-10" />

            <div className="mx-auto w-full max-w-7xl">
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_540px] lg:gap-12 xl:gap-16">
                    {/* ===== Left: Content ===== */}
                    <div className="space-y-6 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-600 shadow-sm backdrop-blur-sm">
                            <Sparkles size={13} />
                            {t("step1Label")}
                        </div>

                        {/* Heading */}
                        <h1 className="text-[2rem] leading-tight sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black tracking-tight text-[#1A1A1B] lg:leading-[1.08]">
                            {t("titleP1")}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500">
                                {t("titleP2")}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mx-auto max-w-md text-[15px] font-medium leading-relaxed text-slate-500 lg:mx-0">
                            {t.rich("subtitle", { bold: (chunks) => <strong className="text-slate-700">{chunks}</strong> })}
                        </p>

                        {/* Input Card */}
                        <div className="mx-auto max-w-lg lg:mx-0">
                            <div className="rounded-2xl border border-indigo-100/70 bg-white/90 p-4 shadow-[0_8px_40px_-12px_rgba(79,70,229,0.13)] backdrop-blur-sm">
                                {/* Word inputs */}
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder={t("inputWordAPlaceholder")}
                                        value={wordA}
                                        autoFocus
                                        onChange={(e) => setWordA(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") handleGenerate("2d"); }}
                                        className="min-w-0 flex-1 rounded-xl border-2 border-slate-100 bg-slate-50/70 px-4 py-3 font-bold text-[#1A1A1B] text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                    />
                                    <div className="relative min-w-0 flex-1">
                                        <input
                                            type="text"
                                            placeholder={t("inputWordBPlaceholder")}
                                            value={wordB}
                                            onChange={(e) => setWordB(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") handleGenerate("2d"); }}
                                            className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/70 px-4 py-3 pr-11 font-bold text-[#1A1A1B] text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAISuggest}
                                            title="AI Suggest pair"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-indigo-100 bg-white p-1.5 text-indigo-500 shadow-sm transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-600 active:scale-90"
                                        >
                                            <Wand2 size={15} />
                                        </button>
                                    </div>
                                </div>

                                {/* Generate buttons */}
                                <div className="mt-3 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleGenerate("3d")}
                                        onMouseEnter={() => { setActiveIndex(0); setIsPaused(true); }}
                                        onMouseLeave={() => setIsPaused(false)}
                                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 px-4 py-3 text-white shadow-md shadow-indigo-200/60 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
                                    >
                                        <Box size={18} className="transition-transform group-hover:rotate-12" />
                                        <span className="font-black text-sm">{t("btnGenerate3D")}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleGenerate("2d")}
                                        onMouseEnter={() => { setActiveIndex(1); setIsPaused(true); }}
                                        onMouseLeave={() => setIsPaused(false)}
                                        className="group relative flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-indigo-200 bg-white px-4 py-3 text-indigo-700 transition-all hover:border-indigo-400 hover:bg-indigo-50 active:scale-[0.98]"
                                    >
                                        <PenTool size={17} className="transition-transform group-hover:-rotate-12" />
                                        <span className="font-black text-sm">{t("btnGenerate2D")}</span>
                                        <span className="absolute -top-2.5 right-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-2.5 py-0.5 text-[10px] font-black text-white shadow-sm">
                                            <Zap size={8} fill="currentColor" /> {t("badgeTattoo")}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mt-3 flex flex-wrap justify-center gap-x-4 text-[11px] font-semibold tracking-wide text-slate-400 lg:justify-start">
                                <span className="flex items-center gap-1"><PenTool size={11} className="text-indigo-400" />{t("tagTattoos")}</span>
                                <span className="flex items-center gap-1"><Box size={11} className="text-indigo-400" />{t("tag3DPrints")}</span>
                            </div>
                        </div>
                    </div>

                    {/* ===== Right: Preview Card ===== */}
                    <div
                        className="relative mx-auto w-full max-w-[440px] lg:max-w-none"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-18px_rgba(0,0,0,0.12)]">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t("slide3DLiveLabel")}</p>
                                <div className="flex gap-1 rounded-full bg-slate-100 p-0.5">
                                    {features.map((feature, index) => (
                                        <button
                                            key={feature.id}
                                            type="button"
                                            onClick={() => setActiveIndex(index)}
                                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${
                                                activeIndex === index
                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                    : "text-slate-500 hover:text-slate-700"
                                            }`}
                                        >
                                            {feature.id.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Preview */}
                            <div className={`relative h-[280px] sm:h-[340px] lg:h-[380px] ${currentFeature.bg}`}>
                                {currentFeature.id === "3d" && (
                                    <div
                                        className="absolute inset-0 opacity-15"
                                        style={{
                                            backgroundImage: "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)",
                                            backgroundSize: "28px 28px",
                                        }}
                                    />
                                )}
                                <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                                    <PlayCircle size={12} className="text-indigo-300" />
                                    {currentFeature.liveLabel}
                                </div>
                                <div className="relative h-full w-full p-5 sm:p-6">
                                    <Image
                                        src={currentFeature.image}
                                        alt={currentFeature.title}
                                        fill
                                        unoptimized
                                        className={`object-contain transition-all duration-700 ${currentFeature.id === "2d" ? "mix-blend-multiply" : ""}`}
                                    />
                                </div>
                            </div>

                            {/* Info footer */}
                            <div className="border-t border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
                                <h3 className="text-base font-black text-slate-900">{currentFeature.title}</h3>
                                <p className="mt-0.5 text-[13px] text-slate-500 leading-relaxed">{currentFeature.desc}</p>
                                <div className="mt-2.5 flex items-center gap-1.5">
                                    {features.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setActiveIndex(index)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                index === activeIndex ? "w-7 bg-indigo-600" : "w-1.5 bg-indigo-200"
                                            }`}
                                            aria-label={`Switch to preview ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
