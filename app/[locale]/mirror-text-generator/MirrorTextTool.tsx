"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const MirrorTextTool = () => {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState(false);

    // Map for mirroring characters using Unicode
    const mirrorMap: Record<string, string> = {
        'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'Ꮈ', 'g': 'ǫ', 'h': 'ʜ', 'i': 'i', 'j': 'ꞁ',
        'k': 'ʞ', 'l': 'ꞁ', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 'ꙅ', 't': 'т',
        'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ʏ', 'z': 'ƹ',
        'A': 'A', 'B': 'ᙐ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꟻ', 'G': 'Ꭾ', 'H': 'H', 'I': 'I', 'J': 'Ⴑ',
        'K': '⋊', 'L': '⅃', 'M': 'M', 'N': 'И', 'O': 'O', 'P': 'ꟼ', 'Q': 'Ϙ', 'R': 'Я', 'S': 'Ꙅ', 'T': 'T',
        'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Ƹ',
        '1': 'I', '2': 'S', '3': 'Ɛ', '4': 'ᔭ', '5': 'ट', '6': '∂', '7': 'ᆃ', '8': '8', '9': '୧', '0': '0',
        '?': '⸮', '.': '.', ',': '⸁', '!': '!', ' ': ' '
    };

    const mirrorText = (str: string) => {
        return str
            .split('')
            .reverse() // Iron-ons need the order reversed too
            .map(char => mirrorMap[char] || char)
            .join('');
    };

    const result = mirrorText(input);

    const handleCopy = async () => {
        if (!result) return;
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Input Section */}
                <div className="relative">
                    <label className="block text-left text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider ml-2">
                        Normal Text
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type something here..."
                        className="w-full h-40 p-5 border-2 border-slate-100 rounded-3xl resize-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 outline-none transition-all text-lg text-slate-700 placeholder:text-slate-300"
                    ></textarea>
                </div>

                {/* Result Section */}
                <div className="relative">
                    <label className="block text-left text-sm font-bold text-emerald-500 mb-2 uppercase tracking-wider ml-2">
                        Mirrored Result
                    </label>
                    <div className="w-full h-40 p-5 border-2 border-emerald-100 rounded-3xl bg-emerald-50/30 relative flex items-center justify-center group overflow-hidden">
                        <p className="text-2xl font-bold text-slate-800 text-center break-all select-all tracking-wide px-4">
                            {result || <span className="text-emerald-200 italic font-normal text-lg">Your mirror text will appear here...</span>}
                        </p>

                        {input && (
                            <button
                                onClick={handleCopy}
                                className={`absolute bottom-4 right-4 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 ${copied ? 'bg-slate-800 shadow-slate-200' : 'bg-slate-800'
                                    }`}
                            >
                                {copied ? (
                                    <><Check size={16} /> Copied!</>
                                ) : (
                                    <><Copy size={16} /> Copy</>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MirrorTextTool;