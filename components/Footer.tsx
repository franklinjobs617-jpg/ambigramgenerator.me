"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
    Twitter,
    Instagram,
    Github,
    Mail,
    Box,
    ChevronUp,
    Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
    const t = useTranslations("Footer");
    const tNav = useTranslations("Header.nav");
    const currentLocale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const langRef = useRef<HTMLDivElement>(null);
    const [isLangOpen, setIsLangOpen] = useState(false);
    // 🌟 2. 监听全局点击事件
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // 如果点击的目标不在 langRef 容器内，则关闭菜单
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };

        // 仅在菜单打开时添加监听器，提高性能
        if (isLangOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // 清理函数
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLangOpen]);
    const languages = [
        { code: "en", name: "English", flag: "US" },
        { code: "fr", name: "Français", flag: "FR" },
        { code: "de", name: "Deutsch", flag: "DE" },
        { code: "es", name: "Español", flag: "ES" },
        { code: "it", name: "Italiano", flag: "IT" },

    ];

    const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

    const handleLocaleChange = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/') || `/${newLocale}`;
        router.push(newPath);
        setIsLangOpen(false);
    };

    const footerLinks = [
        {
            title: t("col1Title"),
            links: [
                { label: tNav("generators.items.3d"), href: "/3d-generator" },
                { label: "Two Word Ambigram Generator", href: "/two-word-ambigram-generator" },
                { label: "AI Tattoo Generator", href: "/ai-tattoo-generator" },
                { label: tNav("generators.items.twoName"), href: "/tutorial/two-name-ambigram" },
                { label: tNav("generators.items.upsideDown"), href: "/upside-down-text-generator", },
                { label: tNav("generators.items.mirrorGenerator"), href: "/mirror-text-generator", },
            ],
        },
        {
            title: t("col2Title"),
            links: [
                { label: tNav("guides.items.whatIs"), href: "/what-is-ambigram" },
                { label: tNav("guides.items.examples"), href: "/ambigram-examples" },
                { label: tNav("guides.items.wordTattoos"), href: "/ambigram-word-tattoos" },
                { label: tNav("guides.items.lovePain"), href: "/love-pain-ambigram" },
                { label: tNav("guides.items.upsideDownWords"), href: "/guide/words-that-spell-words-upside-down" },
                { label: tNav("guides.items.history"), href: "/guide/ambigram-history-art" },
                { label: tNav("guides.items.principles"), href: "/guide/flipscript-principles" },
                { label: tNav("guides.items.bestTools"), href: "/guide/best-online-tools" },
                { label: tNav("guides.items.bestAiTattooGenerator"), href: "/best-ai-tattoo-generator" },
                { label: tNav("generators.items.tattoo"), href: "/tutorial/tattoo-design" },
            ],
        },
        {
            title: t("col3Title"),
            links: [
                { label: tNav("tutorials.items.multiWord"), href: "/tutorial/multi-word-guide" },
                { label: tNav("tutorials.items.tattooDesign"), href: "/tutorial/tattoo-design" },
                { label: tNav("tutorials.items.advanced3d"), href: "/guide/advanced-3d-controls" },
                { label: tNav("tutorials.items.secrets"), href: "/guide/name-generator-secrets" },
            ],
        },
        {
            title: t("col4Title"),
            links: [
                { label: tNav("support.items.faq"), href: "/faq" },
                { label: tNav("support.items.about"), href: "/about" },
                { label: tNav("support.items.privacy"), href: "/privacy" },
                { label: tNav("support.items.terms"), href: "/terms" },
            ],
        },
    ];

    return (
        <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden relative">
            {/* 背景光影效果 */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -z-0" />

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform duration-500">
                                A
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">AmbigramGenerator</span>
                        </Link>

                        <div className="space-y-6">
                            <p className="text-slate-500 font-medium leading-relaxed max-w-sm text-[15px]">
                                {t("description")}
                            </p>

                            {/* 🌐 语言切换器：已移动到此处 */}
                            <div className="relative inline-block" ref={langRef}>
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-[13px] font-bold text-slate-300 hover:bg-slate-800 hover:border-slate-700 transition-all active:scale-95 shadow-sm cursor-pointer"
                                >
                                    <Globe size={14} className="text-indigo-400" />
                                    <span className="opacity-80">{currentLang.flag}</span>
                                    {currentLang.name}
                                    <ChevronUp size={14} className={`text-slate-600 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isLangOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute bottom-full left-0 mb-4 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-[100] backdrop-blur-xl"
                                        >
                                            <div className="px-3 py-2 text-[10px] font-black text-slate-500 border-b border-slate-800 mb-1 ">
                                                {t("selectLanguage")}
                                            </div>
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLocaleChange(lang.code)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all ${currentLocale === lang.code
                                                        ? "bg-indigo-600 text-white"
                                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                        }`}
                                                >
                                                    <span className="text-base">{lang.flag}</span>
                                                    {lang.name}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: <Twitter size={18} />, href: "#" },
                                { icon: <Instagram size={18} />, href: "#" },
                                { icon: <Github size={18} />, href: "#" },
                                { icon: <Mail size={18} />, href: "mailto:support@ambigramgenerator.me" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerLinks.map((column, i) => (
                        <div key={i} className="col-span-1 lg:col-span-2 space-y-6">
                            <div className="font-black text-indigo-400 ">
                                {column.title}
                            </div>
                            <ul className="space-y-4">
                                {column.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-[14.5px] font-bold text-slate-500 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-10">

                    <p className="text-sm font-bold text-slate-500">
                        {t("rights", { year: currentYear })}
                    </p>
                    <p className="text-[12px] font-black text-slate-600 flex items-center">
                        <Box size={12} className="text-indigo-500" /> {t("builtFor")}
                    </p>

                </div>
            </div>
        </footer>
    );
}
