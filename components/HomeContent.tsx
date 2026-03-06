"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl"; // 引入 i18n
import Generator3d from "@/components/Generator3d";
import Generator2d from "@/components/Generator2d";
import HeroSection from "@/components/HeroSection";
import {
    Box, PenTool, ChevronDown, Gift, Lightbulb, Sparkles, ArrowRight, Users, Palette, CheckCircle2
} from "lucide-react";

// --- FAQ Component ---
const FaqItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-2xl border border-slate-100 mb-4 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-[#1A1A1B]"
            >
                <span>{question}</span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-5 text-[#666666] text-sm leading-relaxed border-t border-slate-50 pt-4"
                    >
                        {answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function HomeContent() {
    // 使用命名空间 HomePage
    const t = useTranslations('HomePage');

    const [activeTab, setActiveTab] = useState<'3d' | '2d'>('2d');

    // 🌟 1. 定义全局共享状态
    const [globalWordA, setGlobalWordA] = useState("");
    const [globalWordB, setGlobalWordB] = useState("");

    // 🌟 2. 定义一个触发器
    const [generateTrigger, setGenerateTrigger] = useState(0);

    // 这个函数会传给 HeroSection
    const handleHeroGenerate = (wordA: string, wordB: string, tab: '3d' | '2d') => {
        setGlobalWordA(wordA);
        setGlobalWordB(wordB);
        setActiveTab(tab);
        setGenerateTrigger(prev => prev + 1);
    };

    // 社交弹窗状态
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowToast(true), 3000);
        const hideTimer = setTimeout(() => setShowToast(false), 8000);
        return () => { clearTimeout(timer); clearTimeout(hideTimer); };
    }, []);

    const applyInspiration = (a: string, b: string) => {
        setGlobalWordA(a);
        setGlobalWordB(b);
        document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
    };

    const features = [
        {
            icon: <Users className="w-8 h-8 text-indigo-600" />,
            title: t('CoreFeatures.item1.title'),
            desc: t('CoreFeatures.item1.desc'),
            bg: "bg-indigo-50"
        },
        {
            icon: <Users className="w-8 h-8 text-blue-600" />,
            title: t('CoreFeatures.item2.title'),
            desc: t('CoreFeatures.item2.desc'),
            bg: "bg-blue-50"
        },
        {
            icon: <Palette className="w-8 h-8 text-purple-600" />,
            title: t('CoreFeatures.item3.title'),
            desc: t('CoreFeatures.item3.desc'),
            bg: "bg-purple-50"
        },
        {
            icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
            title: t('CoreFeatures.item4.title'),
            desc: t('CoreFeatures.item4.desc'),
            bg: "bg-emerald-50"
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFF] font-sans text-[#1A1A1B] selection:bg-indigo-100">
            {/* 💡 社交反馈弹窗 */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="fixed bottom-24 left-8 z-[100] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl p-3 pr-6 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-inner">
                            <Sparkles size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-medium">1 min ago in Paris</span>
                            <span className="text-sm font-bold text-[#1A1A1B]">Someone generated a "Leo/Love" STL.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <HeroSection onGenerate={handleHeroGenerate} />

            {/* 3. INSPIRATION LIBRARY */}
            <section id="inspiration" className="py-16 px-6 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-sm font-black text-slate-400 mb-6">{t('Inspiration.title')}</div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[["LOVE", "HATE"], ["ANGEL", "DEVIL"], ["LIFE", "DEATH"], ["HOPE", "FAITH"], ["TRUE", "FALSE"]
                        ].map((pair, idx) => (
                            <button
                                key={idx}
                                onClick={() => applyInspiration(pair[0], pair[1])}
                                className="bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-full text-sm font-bold text-[#666666] hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 hover:shadow-sm transition-all flex items-center gap-2"
                            >
                                {pair[0]} <ArrowRight size={14} className="text-slate-300" /> {pair[1]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. THE UNIFIED WORKSPACE */}
            <section id="workspace" className="px-6 max-w-7xl mx-auto scroll-mt-24">
                <div className="bg-white rounded-[3rem] p-4 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-100">
                    <div className="flex justify-center mb-6 pt-4">
                        <div className="bg-slate-100 p-1.5 rounded-full flex gap-1">
                            <button onClick={() => setActiveTab('3d')} className={`flex items-center gap-2 px-10 py-3 rounded-full text-sm font-bold transition-all ${activeTab === '3d' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:text-[#1A1A1B]'}`}>
                                <Box size={16} /> {t('Workspace.tab3d')}
                            </button>
                            <button onClick={() => setActiveTab('2d')} className={`flex items-center gap-2 px-10 py-3 rounded-full text-sm font-bold transition-all ${activeTab === '2d' ? 'bg-[#1A1A1B] text-white shadow-md' : 'text-slate-500 hover:text-[#1A1A1B]'}`}>
                                <PenTool size={16} /> {t('Workspace.tab2d')}
                            </button>
                        </div>
                    </div>

                    <div className="relative rounded-[2.5rem] overflow-hidden min-h-[650px]">
                        <AnimatePresence mode="wait">
                            {activeTab === '2d' ? (
                                <motion.div key="2d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white">
                                    <Generator2d />

                                </motion.div>

                            ) : (
                                <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full  bg-slate-950">
                                    <div className="text-3xl font-black text-white tracking-tight w-full text-center py-4">
                                        <h2> {t('Generator3D.title')}</h2>
                                        <p className="text-slate-400 text-sm mt-1">{t('Generator3D.subtitle')}</p>
                                    </div>
                                    <Generator3d
                                        incomingWordA={globalWordA}
                                        incomingWordB={globalWordB}
                                        triggerRender={generateTrigger}
                                    />
                                </motion.div>
                            )}


                        </AnimatePresence>
                        <div className="max-w-4xl mx-auto bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl text-left shadow-sm mt-4">
                            <h2 className="text-xl font-bold text-[#1A1A1B]">{t('Workspace.tattooToolTitle')}</h2>
                            <p className="text-[#666666] text-sm mt-2">
                                {t.rich('Workspace.tattooToolDesc', {
                                    bold: (chunks) => <strong>{chunks}</strong>,
                                    spanClass: (chunks) => <span className="text-indigo-600 font-bold">{chunks}</span>
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. HOW IT WORKS */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#1A1A1B]">{t('HowItWorks.title')}</h2>
                        <p className="text-[#666666] mt-4 font-medium">{t('HowItWorks.subtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {[
                            { step: "1", title: t('HowItWorks.step1Title'), desc: t('HowItWorks.step1Desc') },
                            { step: "2", title: t('HowItWorks.step2Title'), desc: t('HowItWorks.step2Desc') },
                            { step: "3", title: t('HowItWorks.step3Title'), desc: t('HowItWorks.step3Desc') }
                        ].map((s, i) => (
                            <div key={i} className="text-center space-y-5">
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                                    <span className="text-2xl font-black text-indigo-600">{s.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#1A1A1B]">{s.title}</h3>
                                <p className="text-[#666666] text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="coreFeatures" className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1B] tracking-tight">
                            {t('CoreFeatures.mainTitle')}
                        </h2>
                        <div className="w-16 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full opacity-20"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 hover:-translate-y-2 text-center flex flex-col items-center"
                            >
                                <div className={`w-20 h-20 ${feature.bg} rounded-[1.8rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#1A1A1B] mb-3 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. WHAT CAN YOU CREATE? */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#1A1A1B]">{t('Features.title')}</h2>
                        <p className="text-[#666666] mt-4 font-medium">{t('Features.subtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: PenTool, title: t('Features.f1Title'), desc: t('Features.f1Desc'), color: "text-purple-600", bg: "bg-purple-100" },
                            { icon: Box, title: t('Features.f2Title'), desc: t('Features.f2Desc'), color: "text-blue-600", bg: "bg-blue-100" },
                            { icon: Gift, title: t('Features.f3Title'), desc: t('Features.f3Desc'), color: "text-indigo-600", bg: "bg-indigo-100" },
                            { icon: Lightbulb, title: t('Features.f4Title'), desc: t('Features.f4Desc'), color: "text-orange-600", bg: "bg-orange-100" },
                        ].map((card, i) => (
                            <div key={i} className="p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6`}><card.icon size={28} /></div>
                                <h3 className="text-lg font-bold mb-3 leading-snug text-[#1A1A1B]">{card.title}</h3>
                                <p className="text-[#666666] text-sm leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. GALLERY / EXAMPLES */}
            {/* 7. GALLERY / EXAMPLES */}
            <section id="examples" className="py-24 px-6 bg-[#F8FAFC] border-t border-slate-100">
                <div className="container mx-auto">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-[#1A1A1B] tracking-tight mb-4">
                            {t('Examples.title')}
                        </h2>
                        <p className="text-slate-500 font-medium italic">
                            {t('Examples.subtitle')}
                        </p>
                    </div>

                    {/* Grid Container: Mobile Scroll -> Desktop Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* --- Example 1: Sarah/John --- */}
                        <div className="group bg-white rounded-[2.5rem] p-4 border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2">
                            <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-slate-50 mb-6">
                                <Image
                                    src="/images/tatto-2-name-example.webp"
                                    alt="Two-Name Ambigram Sarah John"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </div>
                            <div className="px-2 pb-2">
                                <div className="font-black text-lg text-[#1A1A1B] mb-1">{t('Examples.ex1Title')}</div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('Examples.ex1Desc')}</p>
                            </div>
                        </div>

                        {/* --- Example 2: Trust --- */}
                        <div className="group bg-white rounded-[2.5rem] p-4 border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2">
                            <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-slate-50 mb-6">
                                <Image
                                    src="/images/tatto-2-name-example-generate.webp"
                                    alt="Tattoo Style Trust"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </div>
                            <div className="px-2 pb-2">
                                <div className="font-black text-lg text-[#1A1A1B] mb-1">{t('Examples.ex2Title')}</div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('Examples.ex2Desc')}</p>
                            </div>
                        </div>

                        {/* --- Example 3: 3D Print 1 --- */}
                        <div className="group bg-white rounded-[2.5rem] p-4 border-2 border-indigo-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2">
                            <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-slate-900 mb-6">
                                <Image
                                    src="/images/2-name-Ambigram-example-generate.webp"
                                    alt="3D Print Ambigram"
                                    fill
                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                                {/* Glassmorphism Badge */}
                                <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg">
                                    {t('Examples.ex3Badge')}
                                </div>
                            </div>
                            <div className="px-2 pb-2">
                                <div className="font-black text-lg text-indigo-600 mb-1">{t('Examples.ex3Title')}</div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('Examples.ex3Desc')}</p>
                            </div>
                        </div>

                        {/* --- Example 4: 3D Print 2 (GIF) --- */}
                        <div className="group bg-white rounded-[2.5rem] p-4 border-2 border-indigo-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2">
                            <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-slate-900 mb-6">
                                <Image
                                    src="/images/Animated-GIF-of-ILLUSION-rotating.webp"
                                    alt="Animated 3D Illusion"
                                    fill
                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                                <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg">
                                    {t('Examples.ex4Badge')}
                                </div>
                            </div>
                            <div className="px-2 pb-2">
                                <div className="font-black text-lg text-indigo-600 mb-1">{t('Examples.ex4Title')}</div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('Examples.ex4Desc')}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 8. COMPETITOR COMPARISON */}
            <section className="py-24 px-6 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-[3rem] p-10 border border-slate-700 shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black">{t('Comparison.title')}</h2>
                        <p className="text-slate-400 mt-2">{t('Comparison.subtitle')}</p>
                    </div>
                    <div className="overflow-hidden rounded-3xl border border-slate-700">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950 text-white text-sm font-bold">
                                <tr>
                                    <th className="p-5">{t('Comparison.headerFeature')}</th>
                                    <th className="p-5 bg-indigo-600">{t('Comparison.headerUs')}</th>
                                    <th className="p-5 text-slate-500">{t('Comparison.headerOthers')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-bold text-slate-300 divide-y divide-slate-700/50">
                                <tr><td className="p-5">{t('Comparison.priceLabel')}</td><td className="p-5 text-emerald-400">{t('Comparison.priceUs')}</td><td className="p-5 text-slate-500">{t('Comparison.priceOthers')}</td></tr>
                                <tr><td className="p-5">{t('Comparison.modelLabel')}</td><td className="p-5 text-emerald-400">{t('Comparison.modelUs')}</td><td className="p-5 text-slate-500">{t('Comparison.modelOthers')}</td></tr>
                                <tr><td className="p-5">{t('Comparison.twoNameLabel')}</td><td className="p-5 text-emerald-400">{t('Comparison.twoNameUs')}</td><td className="p-5 text-slate-500">{t('Comparison.twoNameOthers')}</td></tr>
                                <tr><td className="p-5">{t('Comparison.formatLabel')}</td><td className="p-5 text-white">{t('Comparison.formatUs')}</td><td className="p-5 text-slate-500">{t('Comparison.formatOthers')}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {/* 9. FAQ SECTION */}
            <section id="faq" className="py-32 px-6 bg-[#F8FAFC]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#1A1A1B]">{t('FAQ.title')}</h2>
                        <p className="text-[#666666] mt-4 font-medium">{t('FAQ.subtitle')}</p>
                    </div>
                    <div className="space-y-2">
                        {/* 修复：使用 t.rich 处理所有可能带有 <bold> 标签的翻译 */}
                        <FaqItem question={t('FAQ.q1')} answer={t.rich('FAQ.a1', { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem question={t('FAQ.q2')} answer={t.rich('FAQ.a2', { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem question={t('FAQ.q3')} answer={t.rich('FAQ.a3', { bold: (chunks) => <strong>{chunks}</strong> })} />
                        <FaqItem question={t('FAQ.q4')} answer={t.rich('FAQ.a4', { bold: (chunks) => <strong>{chunks}</strong> })} />

                        {/* a5 比较特殊，包含列表，保持原样或确保 json 结构正确 */}
                        <FaqItem
                            question={t('FAQ.q5')}
                            answer={<>{t('FAQ.a5')}<ul className="list-disc pl-6 mt-2 space-y-1"><li>{t('FAQ.a5Li1')}</li><li>{t('FAQ.a5Li2')}</li><li>{t('FAQ.a5Li3')}</li></ul></>}
                        />

                        <FaqItem question={t('FAQ.q6')} answer={t.rich('FAQ.a6', { bold: (chunks) => <strong>{chunks}</strong> })} />

                        {/* 🔴 报错的罪魁祸首在这里：a7 */}
                        <FaqItem question={t('FAQ.q7')} answer={t.rich('FAQ.a7', { bold: (chunks) => <strong>{chunks}</strong> })} />

                        <FaqItem question={t('FAQ.q8')} answer={t.rich('FAQ.a8', { bold: (chunks) => <strong>{chunks}</strong> })} />
                    </div>
                </div>
            </section>

            <section className="py-20 bg-light">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display font-bold text-dark mb-4">
                        {t('CTA.title')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        {t('CTA.subtitle')}
                    </p>
                    <Link href="#workspace"
                        className="bg-indigo-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3">
                        <i className="fa fa-magic"></i> {t('CTA.button')}
                    </Link>
                </div>
            </section>

        </div>
    );
}