"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl"; // 引入 i18n
import {
    Box, PenTool, Star,
    Printer, Heart, Crown,
    Zap, PlayCircle, Wand2
} from "lucide-react";

interface HeroSectionProps {
    onGenerate: (wordA: string, wordB: string, tab: '3d' | '2d') => void;
}

export default function HeroSection({ onGenerate }: HeroSectionProps) {
    const t = useTranslations('HomePage.HeroSection'); // 初始化翻译 Hook

    const [wordA, setWordA] = useState("");
    const [wordB, setWordB] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const inputBRef = useRef<HTMLInputElement>(null);

    // 将 features 的文案改为动态获取
    const features = [
        {
            id: '3d',
            title: t('slide3DTitle'),
            desc: t('slide3DDesc'),
            liveLabel: t('slide3DLiveLabel'),
            readyLabel: t('slide3DReadyLabel'),
            image: "/images/3d-perfect-case.gif",
            bg: "bg-[#0f172a]",
        },
        {
            id: '2d',
            title: t('slide2DTitle'),
            desc: t('slide2DDesc'),
            liveLabel: t('slide2DLiveLabel'),
            readyLabel: t('slide2DReadyLabel'),
            image: "/images/2d-tattoo-case.png",
            bg: "bg-[#fcfcf9]",
        }
    ];

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
    }, [features.length]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const scrollToWorkspace = () => {
        document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAISuggest = () => {
        const pairs: { [key: string]: string } = { "LOVE": "HATE", "ANGEL": "DEVIL", "LIFE": "DEATH", "TRUE": "FALSE" };
        const upperA = wordA.toUpperCase().trim();
        setWordB(pairs[upperA] || "ALWAYS");
    };

    const handleActionClick = (modeIndex: number) => {
        setActiveIndex(modeIndex);
        const selectedTab = modeIndex === 0 ? '3d' : '2d';
        const finalWordA = wordA || "LOVE";
        const finalWordB = wordB || "HATE";

        scrollToWorkspace();
        onGenerate(finalWordA, finalWordB, selectedTab);

        const element = document.getElementById('workspace');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative pt-24 pb-20 px-4 overflow-hidden home-bg">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/60 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-6">

                {/* 左侧：操作面板 */}
                <div className="space-y-6 text-center lg:text-left z-10">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        <div className="flex text-[#FF9D42]">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span className="text-xs font-black text-slate-500">{t('ratingText')}</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-[#1A1A1B]">
                        {t('titleP1')}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            {t('titleP2')}
                        </span>
                    </h1>

                    <p className="text-[#666666] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {t.rich('subtitle', { bold: (chunks) => <strong>{chunks}</strong> })}
                    </p>

                    <div className="bg-white/80 backdrop-blur-sm px-3 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-100/50">
                        <form className="flex flex-col gap-6">
                            {/* Step 1: Input Section */}
                            <div className="space-y-3 text-left">
                                <div className="flex items-center gap-2 ml-2">
                                    <div className="w-1 h-3 bg-indigo-500 rounded-full" />
                                    <span className="text-[11px] font-black text-indigo-500  tracking-wider">{t('step1Label')}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder={t('inputWordAPlaceholder')}
                                        value={wordA}
                                        autoFocus
                                        onChange={(e) => setWordA(e.target.value)}
                                        className="flex-1 bg-slate-50 border-2 border-transparent rounded-2xl p-3 lg:px-5 lg:py-4 font-bold text-[#1A1A1B] outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400 shadow-sm"
                                    />

                                    <div className="flex-1 relative group">
                                        <input
                                            type="text"
                                            ref={inputBRef}
                                            placeholder={t('inputWordBPlaceholder')}
                                            value={wordB}
                                            onChange={(e) => setWordB(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-3 lg:px-5 lg:py-4 font-bold text-[#1A1A1B] outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400 pr-14 shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAISuggest}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-white text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-md group-hover:scale-110 active:scale-95 border border-indigo-50"
                                        >
                                            <Wand2 size={18} className="group-hover:rotate-12 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Button Section */}
                            <div className="space-y-3 text-left">
                                <div className="flex items-center gap-2 ml-2">
                                    <div className="w-1 h-3 bg-indigo-500 rounded-full" />
                                    <span className="text-[11px] font-black text-indigo-500  tracking-wider">{t('step2Label')}</span>
                                </div>

                                <div className="flex flex-row gap-3">
                                    {/* 3D Button */}
                                    <button
                                        type="button"
                                        onMouseEnter={() => { setActiveIndex(0); setIsPaused(true); }}
                                        onMouseLeave={() => setIsPaused(false)}
                                        onClick={() => handleActionClick(0)}
                                        className="flex-1 bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-4 lg:px-6 lg:py-5 rounded-2xl font-black flex items-center justify-center gap-2 lg:gap-3 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all active:scale-95 shadow-lg relative overflow-hidden group"
                                    >
                                        <Box size={22} className="group-hover:rotate-12 transition-transform" />
                                        <span className="tracking-wide">{t('btnGenerate3D')}</span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12" />
                                    </button>

                                    {/* 2D Button */}
                                    <button
                                        type="button"
                                        onMouseEnter={() => { setActiveIndex(1); setIsPaused(true); }}
                                        onMouseLeave={() => setIsPaused(false)}
                                        onClick={() => handleActionClick(1)}
                                        className="flex-1 bg-white border-2 border-indigo-600 text-indigo-600 p-4 lg:px-6 lg:py-5 rounded-2xl font-black flex items-center justify-center gap-2 lg:gap-3 hover:bg-indigo-50 transition-all active:scale-95 relative group overflow-visible"
                                    >
                                        <PenTool size={20} className="group-hover:-rotate-12 transition-transform" />
                                        <span className="tracking-wide">{t('btnGenerate2D')}</span>

                                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-amber-400 text-white text-[10px] lg:text-sm px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center  animate-bounce-subtle">
                                            {t('badgeTattoo')} <Zap size={10} fill="currentColor" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <style jsx>{`
                            @keyframes bounce-subtle {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-4px); }
                            }
                            .animate-bounce-subtle {
                                animation: bounce-subtle 3s infinite ease-in-out;
                            }
                        `}</style>
                    </div>

                    <div className="space-y-5">
                        <div className="flex flex-wrap justify-center lg:justify-start gap-5 text-[11px] font-bold text-slate-400 tracking-widest">
                            <span className="flex items-center gap-1.5"><PenTool size={14} className="text-indigo-400" /> {t('tagTattoos')}</span>
                            <span className="flex items-center gap-1.5"><Printer size={14} className="text-indigo-400" /> {t('tag3DPrints')}</span>
                            <span className="flex items-center gap-1.5"><Heart size={14} className="text-indigo-400" /> {t('tagGifts')}</span>
                        </div>
                        <p className="text-sm font-bold text-indigo-600/90 flex items-center justify-center lg:justify-start gap-2">
                            <Crown size={16} /> {t('scarcityText')}
                        </p>
                    </div>
                </div>

                {/* 右侧：交互式动态预览 */}
                <div
                    className="relative z-10 max-w-[540px] mx-auto lg:ml-auto w-full flex flex-col justify-center h-[560px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative h-[480px] w-full">
                        {features.map((item, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={item.id}
                                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform
                                        ${isActive
                                            ? 'z-20 opacity-100 translate-x-0 scale-100'
                                            : 'z-10 opacity-0 translate-x-12 scale-95 pointer-events-none'}
                                    `}
                                >
                                    <div className={`h-full rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] flex flex-col ${item.bg}`}>
                                        <div className="relative flex-1 flex items-center justify-center p-8">
                                            {item.id === '3d' && (
                                                <div className="absolute inset-0 opacity-20"
                                                    style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                                                </div>
                                            )}
                                            <div className="absolute top-6 left-6 z-30 bg-black/30 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                                                <PlayCircle size={14} className={item.id === '3d' ? 'text-indigo-300' : 'text-purple-400'} />
                                                {item.liveLabel}
                                            </div>
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={item.image} alt={item.title} fill unoptimized
                                                    className={`object-contain transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-90'} ${item.id === '2d' ? 'mix-blend-multiply' : ''}`}
                                                />
                                            </div>
                                        </div>
                                        <div className={`p-8 ${item.id === '3d' ? 'bg-white' : 'bg-transparent border-t border-slate-100'}`}>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="text-2xl font-black text-slate-900 leading-tight">{item.title}</div>
                                            </div>
                                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* 底部指示器 */}
                    <div className="flex items-center gap-3 mt-8 px-4">
                        <div className="flex gap-1.5">
                            {features.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-10 bg-indigo-600' : 'w-2 bg-indigo-200'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}