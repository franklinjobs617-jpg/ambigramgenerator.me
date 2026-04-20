"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";
import { useTranslations } from "next-intl";
import { Box, Crown, Heart, PenTool, PlayCircle, Printer, ScanLine, Sparkles, Star, Wand2, Zap } from "lucide-react";

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
            readyLabel: t("slide3DReadyLabel"),
            image: "/images/3d-perfect-case.gif",
            bg: "bg-[#0f172a]",
            tabLabel: "3D",
        },
        {
            id: "2d",
            title: t("slide2DTitle"),
            desc: t("slide2DDesc"),
            liveLabel: t("slide2DLiveLabel"),
            readyLabel: t("slide2DReadyLabel"),
            image: "/images/2d-tattoo-case.png",
            bg: "bg-[#fcfcf9]",
            tabLabel: "2D",
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

    const scrollToWorkspace = () => {
        document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" });
    };

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

    const handleActionClick = (modeIndex: number) => {
        setActiveIndex(modeIndex);
        const selectedTab = modeIndex === 0 ? "3d" : "2d";
        const finalWordA = wordA || "LOVE";
        const finalWordB = wordB || "HATE";

        onGenerate(finalWordA, finalWordB, selectedTab);
        scrollToWorkspace();
    };

    const buildAiTattooHref = (mode: "design" | "tryon") => {
        const prompt = wordA.trim() || wordB.trim()
            ? `Create a tattoo design using ${wordA || "Love"} and ${wordB || "Hate"}, clean line art, forearm placement`
            : "Minimal lotus forearm tattoo, black line art, stencil-ready";
        const params = new URLSearchParams({
            prompt,
            style: "line-art",
            mode,
        });
        return `/ai-tattoo-generator?${params.toString()}`;
    };

    const currentFeature = features[activeIndex] ?? features[0];

    return (
        <section className="relative overflow-hidden home-bg px-4 pt-20 pb-14 sm:pt-24 sm:pb-20 lg:pt-28">
            <div className="absolute top-0 right-0 h-[720px] w-[720px] rounded-full bg-indigo-50/60 blur-[110px] -z-10 translate-x-1/3 -translate-y-1/4" />

            <div className="mx-auto grid w-full max-w-7xl items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-5 sm:space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                        <div className="flex text-[#FF9D42]">
                            {[...Array(5)].map((_, index) => (
                                <Star key={index} size={14} fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-xs font-black text-slate-500">{t("ratingText")}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.05] tracking-tight text-[#1A1A1B]">
                        {t("titleP1")}
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{t("titleP2")}</span>
                    </h1>

                    <p className="mx-auto max-w-xl text-sm sm:text-base font-medium leading-relaxed text-[#666666] lg:mx-0">
                        {t.rich("subtitle", { bold: (chunks) => <strong>{chunks}</strong> })}
                    </p>

                    <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-3.5 sm:p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3 text-left">
                            <div>
                                <p className="text-xs font-black uppercase tracking-wider text-indigo-600">AI Tattoo Focus</p>
                                <p className="mt-1 text-sm font-semibold text-[#1A1A1B]">Text to tattoo + body try-on in one tap</p>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-white px-2.5 py-1 text-[11px] font-bold text-indigo-600">
                                <Sparkles size={12} /> New
                            </span>
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            <Link
                                href={buildAiTattooHref("design")}
                                onClick={() => trackEvent("cta_click", { section: "hero_ai_tattoo", action: "open_generator", sourcePage: "home" })}
                                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white transition-all hover:bg-indigo-500"
                            >
                                Open AI Tattoo <Wand2 size={15} />
                            </Link>
                            <Link
                                href={buildAiTattooHref("tryon")}
                                onClick={() => trackEvent("cta_click", { section: "hero_ai_tattoo", action: "open_tryon", sourcePage: "home" })}
                                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-indigo-300 bg-white px-4 py-2.5 text-sm font-black text-indigo-700 transition-all hover:bg-indigo-50"
                            >
                                Try On Body <ScanLine size={15} />
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-indigo-100/60 bg-white/90 px-3 sm:px-4 py-4 sm:py-5 shadow-[0_20px_50px_rgba(79,70,229,0.1)] backdrop-blur-sm">
                        <form className="flex flex-col gap-6">
                            <div className="space-y-3 text-left">
                                <div className="ml-2 flex items-center gap-2">
                                    <div className="h-3 w-1 rounded-full bg-indigo-500" />
                                    <span className="text-[11px] font-black tracking-wider text-indigo-500">{t("step1Label")}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder={t("inputWordAPlaceholder")}
                                        value={wordA}
                                        autoFocus
                                        onChange={(event) => setWordA(event.target.value)}
                                        className="flex-1 rounded-2xl border-2 border-transparent bg-slate-50 p-3 lg:px-5 lg:py-4 font-bold text-[#1A1A1B] outline-none transition-all placeholder:text-slate-400 shadow-sm focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                                    />

                                    <div className="relative flex-1 group">
                                        <input
                                            type="text"
                                            placeholder={t("inputWordBPlaceholder")}
                                            value={wordB}
                                            onChange={(event) => setWordB(event.target.value)}
                                            className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-3 pr-14 lg:px-5 lg:py-4 font-bold text-[#1A1A1B] outline-none transition-all placeholder:text-slate-400 shadow-sm focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAISuggest}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-indigo-50 bg-white p-2.5 text-indigo-600 shadow-md transition-all hover:bg-indigo-600 hover:text-white active:scale-95 group-hover:scale-110"
                                        >
                                            <Wand2 size={18} className="transition-transform group-hover:rotate-12" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-left">
                                <div className="ml-2 flex items-center gap-2">
                                    <div className="h-3 w-1 rounded-full bg-indigo-500" />
                                    <span className="text-[11px] font-black tracking-wider text-indigo-500">{t("step2Label")}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="button"
                                        onMouseEnter={() => {
                                            setActiveIndex(0);
                                            setIsPaused(true);
                                        }}
                                        onMouseLeave={() => setIsPaused(false)}
                                        onClick={() => handleActionClick(0)}
                                        className="group relative flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-4 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] active:scale-95 lg:gap-3 lg:px-6 lg:py-5"
                                    >
                                        <Box size={22} className="transition-transform group-hover:rotate-12" />
                                        <span className="font-black tracking-wide">{t("btnGenerate3D")}</span>
                                        <div className="absolute inset-0 translate-y-full skew-y-12 bg-white/20 transition-transform duration-500 group-hover:translate-y-0" />
                                    </button>

                                    <button
                                        type="button"
                                        onMouseEnter={() => {
                                            setActiveIndex(1);
                                            setIsPaused(true);
                                        }}
                                        onMouseLeave={() => setIsPaused(false)}
                                        onClick={() => handleActionClick(1)}
                                        className="group relative flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-indigo-600 bg-white p-4 text-indigo-600 transition-all hover:bg-indigo-50 active:scale-95 lg:gap-3 lg:px-6 lg:py-5"
                                    >
                                        <PenTool size={20} className="transition-transform group-hover:-rotate-12" />
                                        <span className="font-black tracking-wide">{t("btnGenerate2D")}</span>

                                        <div className="absolute -top-3 right-4 flex items-center rounded-full border-2 border-white bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-1 text-[10px] lg:text-sm font-black text-white shadow-lg animate-bounce-subtle">
                                            {t("badgeTattoo")} <Zap size={10} fill="currentColor" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <style jsx>{`
                            @keyframes bounce-subtle {
                                0%,
                                100% {
                                    transform: translateY(0);
                                }
                                50% {
                                    transform: translateY(-4px);
                                }
                            }
                            .animate-bounce-subtle {
                                animation: bounce-subtle 3s infinite ease-in-out;
                            }
                        `}</style>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-[11px] font-bold tracking-widest text-slate-400 lg:justify-start">
                            <span className="flex items-center gap-1.5">
                                <PenTool size={14} className="text-indigo-400" /> {t("tagTattoos")}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Printer size={14} className="text-indigo-400" /> {t("tag3DPrints")}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Heart size={14} className="text-indigo-400" /> {t("tagGifts")}
                            </span>
                        </div>
                        <p className="flex items-center justify-center gap-2 text-sm font-bold text-indigo-600/90 lg:justify-start">
                            <Crown size={16} /> {t("scarcityText")}
                        </p>
                    </div>
                </div>

                <div
                    className="relative mx-auto w-full max-w-[560px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_32px_80px_-22px_rgba(0,0,0,0.14)]">
                        <div className="border-b border-slate-100 px-4 sm:px-6 py-4">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-xs sm:text-sm font-semibold text-slate-500">Live Preview Modes</p>
                                <div className="flex items-center gap-2">
                                    {features.map((feature, index) => (
                                        <button
                                            key={feature.id}
                                            type="button"
                                            onClick={() => setActiveIndex(index)}
                                            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${activeIndex === index
                                                ? "bg-indigo-600 text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                }`}
                                        >
                                            {feature.tabLabel}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`relative h-[320px] sm:h-[400px] lg:h-[460px] ${currentFeature.bg}`}>
                            {currentFeature.id === "3d" && (
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)",
                                        backgroundSize: "32px 32px",
                                    }}
                                />
                            )}
                            <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                                <PlayCircle size={14} className={currentFeature.id === "3d" ? "text-indigo-300" : "text-purple-400"} />
                                {currentFeature.liveLabel}
                            </div>
                            <div className="relative h-full w-full p-4 sm:p-8">
                                <Image
                                    src={currentFeature.image}
                                    alt={currentFeature.title}
                                    fill
                                    unoptimized
                                    className={`object-contain transition-transform duration-700 ${currentFeature.id === "2d" ? "mix-blend-multiply" : ""}`}
                                />
                            </div>
                        </div>

                        <div className="px-5 sm:px-6 py-5 sm:py-6">
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <h3 className="text-xl sm:text-2xl font-black leading-tight text-slate-900">{currentFeature.title}</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-500">{currentFeature.desc}</p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-indigo-500">{currentFeature.readyLabel}</p>
                            <div className="mt-4 flex items-center gap-1.5">
                                {features.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-indigo-600" : "w-2 bg-indigo-200"}`}
                                        aria-label={`Switch to preview ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

