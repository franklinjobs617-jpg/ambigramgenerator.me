"use client";

import { useState, useSyncExternalStore } from "react";

// Original geometric glyphs drawn on a 100 × 160 grid.
const mPath = "M9 137 L22 23 L50 81 L78 23 L91 137";
const glyphs = {
    M: <path d={mPath} />,
    W: <path d={mPath} transform="rotate(180 50 80)" />,
    O: <ellipse cx="50" cy="80" rx="38" ry="59" />,
    S: <path d="M83 36 C73 24 59 20 45 20 C26 20 14 32 14 49 C14 66 28 74 50 80 C72 86 86 94 86 111 C86 128 74 140 55 140 C41 140 27 136 17 124" />,
};

const samples = {
    SOS: { letters: ["S", "O", "S"], rotated: "SOS" },
    MOM: { letters: ["M", "O", "M"], rotated: "WOW" },
    MOW: { letters: ["M", "O", "W"], rotated: "MOW" },
} as const;

// Keep the static drawing and caption usable before hydration and without JavaScript.
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function WordRotationCard({ word }: { word: keyof typeof samples }) {
    const interactive = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
    const [turned, setTurned] = useState(false);
    const sample = samples[word];
    const angle = turned ? 180 : 0;

    return (
        <figure className="m-0 min-w-0 rounded-2xl border border-indigo-100 bg-white p-3 sm:p-4">
            <div className="flex aspect-[9/5] items-center justify-center rounded-xl bg-indigo-50 px-3">
                <svg
                    viewBox="0 0 360 160"
                    aria-hidden="true"
                    focusable="false"
                    className="block w-full max-w-[17rem] text-indigo-950"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <g
                        className="motion-safe:transition-transform motion-safe:duration-300"
                        style={{ transform: `rotate(${angle}deg)`, transformOrigin: "50% 50%", transformBox: "view-box" }}
                    >
                        {sample.letters.map((letter, index) => (
                            <g key={index} transform={`translate(${10 + index * 120} 0)`}>
                                {glyphs[letter]}
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
            <figcaption className="mt-3 text-sm leading-5 text-slate-700">
                Original SVG. Upright: <strong>{word}</strong>. After a half-turn: <strong>{sample.rotated}</strong>.
            </figcaption>
            <div className="mt-3 flex items-center justify-between gap-2">
                <button
                    type="button"
                    disabled={!interactive}
                    aria-label={`Rotate 180°: ${word} sample`}
                    aria-pressed={turned}
                    onClick={() => setTurned(!turned)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-indigo-700 px-3 py-2 text-sm font-bold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 disabled:invisible"
                >
                    Rotate 180°
                </button>
                <span role="status" aria-atomic="true" className="shrink-0 text-sm font-semibold tabular-nums text-slate-700">
                    {angle}°<span className="sr-only">: {turned ? sample.rotated : word}</span>
                </span>
            </div>
        </figure>
    );
}
