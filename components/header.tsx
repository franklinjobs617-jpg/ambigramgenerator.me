"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useRouter, usePathname } from "@/i18n/routing"; // 确保从你的 i18n 配置中引入
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/components/providers/auth-provider";
import LoginModal from "@/components/LoginModal";
import {
    ChevronDown, Menu, X,
    Box, BookOpen,
    Info, ShieldCheck, Flame,
    Globe, Check, User, LogOut, Settings, CreditCard
} from "lucide-react";

export default function Header() {
    const t = useTranslations("Header");
    const tNav = useTranslations("HomePage.Navigation");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const { user, isLoading, login, logout } = useAuth();

    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 语言选择器状态
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: "en", name: "English", flag: "US" },
        { code: "fr", name: "Français", flag: "FR" },
        { code: "de", name: "Deutsch", flag: "DE" },
        { code: "es", name: "Español", flag: "ES" },
        { code: "it", name: "Italiano", flag: "IT" },
    ];

    const currentLang = languages.find(l => l.code === locale) || languages[0];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const handleClickOutside = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) setIsLangOpen(false);
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setIsUserMenuOpen(false);
        };
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsLangOpen(false);
    };

    // 菜单数据
    const navData = [
        {
            id: "generators",
            icon: <Box size={18} className="text-blue-600" />,
            links: [
                { label: t("nav.generators.items.3d"), href: "/3d-generator", badge: "hot" },
                { label: "AI Tattoo Generator", href: "/ai-tattoo-generator", badge: "hot" },
                { label: t("nav.generators.items.tattooStencil"), href: "/tattoo-stencil-maker", badge: "hot" },
                { label: t("nav.generators.items.upsideDown"), href: "/upside-down-text-generator", },
                { label: t("nav.generators.items.mirrorGenerator"), href: "/mirror-text-generator", },
            ]
        },
        {
            id: "guides",
            icon: <Info size={18} className="text-purple-600" />,
            links: [
                { label: t("nav.guides.items.whatIs"), href: "/what-is-ambigram" },
                { label: t("nav.guides.items.examples"), href: "/ambigram-examples" },
                { label: t("nav.guides.items.wordTattoos"), href: "/ambigram-word-tattoos" },
                { label: t("nav.guides.items.lovePain"), href: "/love-pain-ambigram" },
                { label: t("nav.guides.items.upsideDownWords"), href: "/guide/words-that-spell-words-upside-down" },
                { label: t("nav.guides.items.history"), href: "/guide/ambigram-history-art" },
                { label: t("nav.guides.items.principles"), href: "/guide/flipscript-principles" },
                { label: t("nav.guides.items.bestTools"), href: "/guide/best-online-tools" },
                { label: t("nav.generators.items.twoName"), href: "/tutorial/two-name-ambigram" },
                { label: t("nav.generators.items.tattoo"), href: "/tutorial/tattoo-design" },
                { label: t("nav.guides.items.bestAiTattooGenerator"), href: "/best-ai-tattoo-generator" },
            ]
        },
        {
            id: "tutorials",
            icon: <BookOpen size={18} className="text-orange-600" />,
            links: [
                { label: t("nav.tutorials.items.multiWord"), href: "/tutorial/multi-word-guide" },
                { label: t("nav.tutorials.items.tattooDesign"), href: "/tutorial/tattoo-design" },
                { label: t("nav.tutorials.items.advanced3d"), href: "/guide/advanced-3d-controls" },
                { label: t("nav.tutorials.items.secrets"), href: "/guide/name-generator-secrets" },
            ]
        },
        {
            id: "support",
            icon: <ShieldCheck size={18} className="text-green-600" />,
            links: [
                { label: t("nav.support.items.faq"), href: "/faq" },
                { label: t("nav.support.items.about"), href: "/about" },
                { label: t("nav.support.items.privacy"), href: "/privacy" },
                { label: t("nav.support.items.terms"), href: "/terms" },
            ]
        }
    ];


    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm" : "bg-transparent py-5"}`}>
                <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <Image src="/logo.png" alt="Logo" width={200} height={36} className="rounded-lg"  />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden xl:flex items-center gap-2">
                            {navData.map((menu) => (
                                <div key={menu.id} className="relative" onMouseEnter={() => setActiveMenu(menu.id)} onMouseLeave={() => setActiveMenu(null)}>
                                    <button className={`flex items-center gap-1 px-4 py-2 text-[14.5px] font-bold rounded-xl transition-all ${activeMenu === menu.id ? "bg-indigo-50 text-indigo-600" : `text-slate-900 hover:bg-slate-50/10`}`}>
                                        {t(`nav.${menu.id}.title`)}
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === menu.id ? "rotate-180" : ""}`} />
                                    </button>
                                    <AnimatePresence>
                                        {activeMenu === menu.id && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 mt-2 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 overflow-hidden text-slate-900">
                                                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 mb-2">
                                                    <div className="p-2 bg-indigo-50 rounded-lg">{menu.icon}</div>
                                                    <span className="font-black text-indigo-600 text-sm tracking-widest">{t(`nav.${menu.id}.title`)}</span>
                                                </div>
                                                {menu.links.map((link) => (
                                                    <Link key={link.href} href={link.href} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-indigo-50 transition-colors group">
                                                        <span className="text-[14px] font-semibold text-slate-700 group-hover:text-indigo-600">{link.label}</span>
                                                        {link.badge && <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5"><Flame size={10} fill="currentColor" /> HOT</span>}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* 🌐 Desktop Language Selector */}
                        <div className="hidden md:block relative" ref={langRef}>
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${scrolled ? "hover:bg-slate-100 text-slate-600" : "hover:bg-white/10 "}`}
                            >
                                <Globe size={18} className={scrolled ? "text-indigo-600" : " "} />
                                <span>{currentLang.flag}</span>
                                <ChevronDown size={12} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden text-slate-900">
                                        {languages.map(lang => (
                                            <button key={lang.code} onClick={() => handleLocaleChange(lang.code)} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${locale === lang.code ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50 text-slate-600"}`}>
                                                <div className="flex items-center gap-3"><span>{lang.flag}</span>{lang.name}</div>
                                                {locale === lang.code && <Check size={14} />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* User Menu / Login Button */}
                        {mounted && !isLoading && (
                            <div className="hidden sm:block relative" ref={userMenuRef}>
                                {user ? (
                                    <>
                                        <button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
                                        >
                                            {user.avatarUrl || user.picture ? (
                                                <Image
                                                    src={user.avatarUrl || user.picture || ""}
                                                    alt={user.name}
                                                    width={28}
                                                    height={28}
                                                    className="rounded-full object-cover"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <User size={14} className="text-gray-600" />
                                                </div>
                                            )}
                                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {isUserMenuOpen && (
                                                <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 8 }} className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 overflow-hidden">
                                                    {/* User Info */}
                                                    <div className="px-3 py-2.5 border-b border-gray-100 mb-1">
                                                        <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                        {user.credits !== undefined && (
                                                            <div className="flex items-center gap-1 mt-1">
                                                                <CreditCard size={12} className="text-gray-600" />
                                                                <span className="text-xs font-medium text-gray-600">{user.credits} credits</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Link href="/settings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                                                        <Settings size={15} />
                                                        Settings
                                                    </Link>
                                                    <button onClick={() => { logout(); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                                                        <LogOut size={15} />
                                                        Sign out
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsLoginModalOpen(true)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
                                    >
                                        <User size={16} />
                                        <span>{tNav("logIn")}</span>
                                    </button>
                                )}
                            </div>
                        )}

                        <Link href={"/#workspace"} className="hidden sm:block bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95 cursor-pointer">
                            {t("button")}
                        </Link>

                        <button onClick={() => setIsMobileOpen(true)} className="xl:hidden w-10 h-10 flex items-center justify-center text-slate-900 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all cursor-pointer">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Login Modal */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

            {/* 3. MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-0 z-[200] bg-white flex flex-col text-slate-900">
                        <div className="p-6 flex items-center justify-between border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">A</div>
                                <span className="font-bold">{t("logo")}</span>
                            </div>
                            <button onClick={() => setIsMobileOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-600"><X size={24} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* 🌐 Mobile Language Switcher */}
                            <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 tracking-widest mb-4 ml-2">Select Language</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {languages.map(lang => (
                                        <button key={lang.code} onClick={() => handleLocaleChange(lang.code)} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border-2 transition-all ${locale === lang.code ? "bg-white border-indigo-600 shadow-sm" : "bg-transparent border-transparent text-slate-500"}`}>
                                            <span className="text-2xl">{lang.flag}</span>
                                            <span className="text-xs font-bold">{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {navData.map((menu) => (
                                <div key={menu.id} className="border-b border-slate-50 pb-4">
                                    <button onClick={() => setActiveMobileAccordion(activeMobileAccordion === menu.id ? null : menu.id)} className={`w-full flex items-center justify-between py-2 font-bold text-lg ${activeMobileAccordion === menu.id ? "text-indigo-600" : "text-slate-800"}`}>
                                        <div className="flex items-center gap-3">{menu.icon}{t(`nav.${menu.id}.title`)}</div>
                                        <ChevronDown className={`transition-transform ${activeMobileAccordion === menu.id ? "rotate-180" : ""}`} />
                                    </button>
                                    <AnimatePresence>
                                        {activeMobileAccordion === menu.id && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-indigo-50/50 rounded-2xl mt-2">
                                                {menu.links.map((link) => (
                                                    <Link key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)} className="flex items-center justify-between p-4 font-semibold text-slate-600 active:bg-indigo-100 transition-colors">
                                                        {link.label}
                                                        {link.badge && <span className="bg-orange-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black tracking-wider italic">Hot</span>}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-slate-100 space-y-3">
                            {user ? (
                                <>
                                    {/* User Info */}
                                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-2xl mb-2">
                                        {user.avatarUrl || user.picture ? (
                                            <Image width={40} height={40} src={user.avatarUrl || user.picture || ""} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center">
                                                <User size={20} className="text-indigo-600" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm text-slate-800 truncate">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { logout(); setIsMobileOpen(false); }} className="w-full flex items-center justify-center gap-2 border-2 border-red-100 text-red-600 py-3 rounded-2xl font-bold hover:bg-red-50 transition-all cursor-pointer">
                                        <LogOut size={18} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => { setIsMobileOpen(false); setIsLoginModalOpen(true); }} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all cursor-pointer">
                                    <User size={18} />
                                    {tNav("logIn")}
                                </button>
                            )}
                            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 active:scale-95 transition-all cursor-pointer">
                                {t("button")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
