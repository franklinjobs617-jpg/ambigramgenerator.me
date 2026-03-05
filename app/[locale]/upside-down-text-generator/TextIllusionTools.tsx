"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RotateCw, Sparkles, Trash2, ChevronRight, Zap } from "lucide-react";

// --- 1. 核心 Unicode 映射表 ---
const CHAR_MAPS: any = {
    upsideDown: {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ',
        'k': 'ʞ', 'l': 'ן', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ',
        'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        'A': '∀', 'B': 'ᗺ', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ',
        'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥',
        'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
        '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
        '.': '˙', ',': '\'', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
        '<': '>', '>': '<', '_': '‾', '&': '⅋', '"': '„'
    },
    mirror: {
        'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'Ꮈ', 'g': 'ǫ', 'h': 'ʜ', 'i': 'i', 'j': 'ꞁ',
        'k': 'ʞ', 'l': 'Ꮈ', 'm': 'm', 'n': 'ᴎ', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'я', 's': 'ꙅ', 't': 'ƚ',
        'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'γ', 'z': 'ƹ',
        'A': 'A', 'B': 'ᙱ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꟻ', 'G': 'Ꭾ', 'H': 'H', 'I': 'I', 'J': 'Ⴑ',
        'K': '⋊', 'L': '⅃', 'M': 'M', 'N': 'И', 'O': 'O', 'P': 'ꟼ', 'Q': 'Ϙ', 'R': 'Я', 'S': 'Ꙅ', 'T': 'T',
        'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Ƹ'
    }
};

type Mode = 'upsideDown' | 'backwards' | 'mirror' | 'glitch';

export default function TextIllusionTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [activeMode, setActiveMode] = useState<Mode>('upsideDown');
    const [copied, setCopied] = useState(false);

    // --- 2. 转换逻辑引擎 ---
    const transformText = (text: string, mode: Mode) => {
        if (!text) return "";

        switch (mode) {
            case 'backwards':
                return text.split("").reverse().join("");

            case 'upsideDown':
                return text.split("").reverse().map(char => CHAR_MAPS.upsideDown[char] || char).join("");

            case 'mirror':
                return text.split("").map(char => CHAR_MAPS.mirror[char] || char).join("");

            case 'glitch':
                const glitchChars = ["\u0300", "\u0301", "\u0302", "\u0303", "\u0304", "\u0305", "\u0306", "\u0307", "\u0308", "\u0309", "\u030A"];
                return text.split("").map(char => char + glitchChars[Math.floor(Math.random() * glitchChars.length)] + glitchChars[Math.floor(Math.random() * glitchChars.length)]).join("");

            default:
                return text;
        }
    };

    // 监听输入或模式变化
    useEffect(() => {
        setOutput(transformText(input, activeMode));
    }, [input, activeMode]);

    // 复制功能
    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-6 md:p-8 max-w-4xl mx-auto overflow-hidden">

            {/* 🌟 模式切换 Tabs (EaseMate 风格) */}
            <div className="flex flex-wrap justify-center border-b border-slate-100 mb-8 gap-2 md:gap-4">
                {[
                    { id: 'upsideDown', label: 'Upside Down', icon: <RotateCw size={14} /> },
                    { id: 'backwards', label: 'Backwards', icon: <ChevronRight size={14} className="rotate-180" /> },
                    { id: 'mirror', label: 'Mirror Art', icon: <Sparkles size={14} /> },
                    { id: 'glitch', label: 'Glitch Style', icon: <Zap size={14} /> },
                ].map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id as Mode)}
                        className={`flex items-center gap-2 px-5 py-3 font-bold text-sm transition-all relative ${activeMode === mode.id
                            ? 'text-indigo-600'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {mode.icon}
                        {mode.label}
                        {activeMode === mode.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* 🌟 输入与输出区域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Input Box */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center px-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Normal Text</label>
                        <button onClick={() => setInput("")} className="text-slate-300 hover:text-rose-500 transition-colors">
                            <Trash2 size={14} />
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your text here..."
                        className="w-full h-56 p-6 bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] resize-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white outline-none transition-all text-xl font-bold text-slate-800 placeholder:text-slate-300 shadow-inner"
                    ></textarea>
                </div>

                {/* Output Box */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center px-2">
                        <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Illusion Result</label>
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-black uppercase">Ready</span>
                    </div>
                    <div className="w-full h-56 p-6 border-2 border-slate-100 rounded-[1.8rem] bg-white relative flex items-center justify-center group hover:border-indigo-200 transition-all shadow-sm">

                        {/* 动态背景装饰 */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>

                        <p className={`text-3xl font-black text-slate-900 text-center break-all select-all leading-tight ${activeMode === 'glitch' ? 'tracking-tighter' : ''}`}>
                            {output || "..."}
                        </p>

                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className={`absolute bottom-4 right-4 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-0 ${copied
                                ? 'bg-emerald-500 text-white shadow-emerald-200'
                                : 'bg-[#1A1A1B] text-white shadow-slate-200 hover:bg-indigo-600'
                                }`}
                        >
                            {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* 🌟 底部贴心提示 */}
            <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-16 h-16 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold tracking-tight">
                        Used by <span className="text-indigo-600">2,400+ designers</span> for social bio & tattoos.
                    </p>
                </div>
                <p className="text-[10px] text-slate-400 font-medium italic">
                    * Results are generated using standard Unicode characters.
                </p>
            </div>
        </div>
    );
}