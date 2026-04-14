"use client";

import { useState } from "react";
import { PenTool, Loader2, RotateCw, Download } from "lucide-react";
import { useTranslations } from 'next-intl';
// --- 1. 核心数据与辅助函数 (保留原生逻辑) ---

// 字形数据表
const glyphs_lookup: any = {
    new: [
        [
            ["a1", "a2i"], ["r2i"], ["c2i", "c1"], ["d2i"], ["e2i", "e1"], ["f1i"],
            ["g2i"], ["h2i", "h2"], ["i1"], ["j1", "j2"], ["k2i"], ["l1"],
            ["m2i", "m3"], ["n2i"], ["o2"], ["p1i"], ["q2"], ["r2i", "r1"],
            ["s2i", "s1"], ["t1i"], ["u2"], ["v1i", "v2"], ["w2", "w3"], ["x2"],
            ["y1i"], ["z1", "z2"],
        ],
        [
            ["a2"], ["h2"], ["c2", "c1"], ["d2"], ["e2", "e1"], ["f1"], ["g2"],
            ["h2"], ["i1"], ["j1", "j2"], ["k2"], ["l1"], ["m3", "m2"], ["n2"],
            ["o2"], ["p1"], ["q2"], ["r1", "r2"], ["s1", "s2"], ["t1"], ["u2"],
            ["v1", "v2"], ["w2", "w3"], ["x2"], ["y1"], ["z1", "z2"],
        ],
        [
            ["a2", "a1i"], ["h2"], ["c2", "c1"], ["d2"], ["e2", "e1"], ["f1"],
            ["g2"], ["h2"], ["i1"], ["j1", "j2"], ["k2"], ["l1"], ["m3", "m2"],
            ["n2"], ["o2"], ["p1"], ["q2"], ["r1", "r2"], ["s1", "s2"], ["t1"],
            ["u2"], ["v1", "v2"], ["w2", "w3"], ["x2"], ["y1"], ["z1", "z2"],
        ],
        100, // strokeWidth
        600, // height
    ],
    calligraphy: [
        [
            ["a2"], ["b2"], ["c2"], ["d2"], ["e2"], ["f1"], ["g2"], ["h2"], ["i1"],
            ["j1"], ["k2"], ["l1"], ["m3"], ["n2"], ["o2"], ["p2"], ["q2"], ["r1"],
            ["s1"], ["t1"], ["u2"], ["v2"], ["w2"], ["x2"], ["y1"], ["z1"],
        ],
        [
            ["a2"], ["b2"], ["c2"], ["d2"], ["e2"], ["f1"], ["g2"], ["h2"], ["i1"],
            ["j1"], ["k2"], ["l1"], ["m3"], ["n2"], ["o2"], ["p2"], ["q2"], ["r1"],
            ["s1"], ["t1"], ["u2"], ["v2"], ["w2"], ["x2"], ["y1"], ["z1"],
        ],
        [
            ["a2"], ["b2"], ["c2"], ["d2"], ["e2"], ["f1"], ["g2"], ["h2"], ["i1"],
            ["j1"], ["k2"], ["l1"], ["m3"], ["n2"], ["o2"], ["p2"], ["q2"], ["r1"],
            ["s1"], ["t1"], ["u2"], ["v2"], ["w2"], ["x2"], ["y1"], ["z1"],
        ],
        100,
        600,
    ],
};

// 辅助计算函数
const letterIndex = (letter: string) => letter.charCodeAt(0) - "a".charCodeAt(0);

const cartesian = (a: any[]) => {
    if (!a || a.length === 0) return [[]];
    return a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
};

const countStrokes = (structure: any[]) => {
    if (!Array.isArray(structure)) return 0;
    let strokes = 0;
    for (const glyph of structure) {
        strokes += parseInt(glyph[1]) || 0;
    }
    return strokes;
};

// 加载图片资源
const getGlyphImage = async (name: string, style: string) => {
    return new Promise<HTMLImageElement | HTMLCanvasElement>((resolve) => {
        const glyph = new Image();
        // ⚠️ 注意：Next.js 中 public 文件夹是根路径，所以路径为 /glyph images/...
        const folder = "/glyph images/" + style + "/";
        glyph.src = folder + name + ".png";
        glyph.onload = () => resolve(glyph);
        glyph.onerror = () => {
            // 容错处理：如果图片不存在，生成空白 Canvas 占位
            const units = parseInt(name[1]) || 1;
            const strokeWidth = glyphs_lookup[style][3];
            const height = glyphs_lookup[style][4];
            const canvas = document.createElement("canvas");
            canvas.width = units * strokeWidth;
            canvas.height = height;
            resolve(canvas);
        };
    });
};

const getPossibleGlyphs = (words: string[], style: string) => {
    let glyphs: any[][] = [[], []];
    let starters = glyphs_lookup[style][0];
    let middlers = glyphs_lookup[style][1];
    let enders = glyphs_lookup[style][2];

    for (let wordIndex = 0; wordIndex < 2; wordIndex++) {
        const glyphList = glyphs[wordIndex];
        const word = words[wordIndex];
        if (!word || word.length === 0) continue;
        // 首字母
        if (starters[letterIndex(word[0])]) {
            glyphList.push(starters[letterIndex(word[0])]);
        }
        // 中间字母
        for (let letterPos = 1; letterPos < word.length - 1; letterPos++) {
            if (middlers[letterIndex(word[letterPos])]) {
                glyphList.push(middlers[letterIndex(word[letterPos])]);
            }
        }
        // 尾字母
        if (word.length > 1) {
            if (enders[letterIndex(word[word.length - 1])]) {
                glyphList.push(enders[letterIndex(word[word.length - 1])]);
            }
        }
    }
    return glyphs;
};

// --- 2. 子组件：单个 Ambigram 图片 (处理旋转交互) ---
const AmbigramItem = ({ src, alt, fileName }: { src: string, alt: string, fileName: string }) => {
    const [angle, setAngle] = useState(0);

    return (
        <div
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/80"
            onClick={() => setAngle(prev => prev + 180)}
        >
            <img
                src={src}
                alt={alt}
                className="h-auto w-full bg-slate-100 transition-transform duration-500 ease-in-out"
                style={{ transform: `rotate(${angle}deg)` }}
                width={320}
                height={240}
            />
            <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-white/30 bg-slate-900/65 p-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <RotateCw size={16} />
            </div>
            <a
                href={src}
                download={fileName}
                onClick={(event) => event.stopPropagation()}
                className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700"
                aria-label="Download PNG"
            >
                <Download size={12} />
                PNG
            </a>
        </div>
    );
};

type Generator2dProps = {
    mode?: "default" | "two-word";
};

// --- 3. 主组件: Generator2d ---
export default function Generator2d({ mode = "default" }: Generator2dProps) {
    const t = useTranslations('Generator2D');
    const isTwoWordMode = mode === "two-word";
    const [wordA, setWordA] = useState("love");
    const [wordB, setWordB] = useState("pain");
    const [inputText, setInputText] = useState("Hello");
    const [style, setStyle] = useState("calligraphy"); // 默认为 calligraphy，因为它是 "Best for Tattoos"
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const preparedInput = isTwoWordMode ? `${wordA.trim()} ${wordB.trim()}` : inputText;
    const lengthGap = Math.abs(wordA.trim().length - wordB.trim().length);
    const fileStem = (isTwoWordMode ? `${wordA}-${wordB}` : inputText)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "ambigram";
    const quickPairs: Array<[string, string]> = [
        ["love", "pain"],
        ["hope", "fear"],
        ["life", "death"],
        ["anna", "john"],
    ];
    const fieldClass =
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-900 transition-all duration-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";
    const selectClass =
        "w-full appearance-none cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-all duration-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";
    const primaryButtonClass =
        "flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-600 bg-indigo-600 px-6 py-3 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70";
    const quickChipClass =
        "rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700";
    const panelSurfaceClass =
        "mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-100/40 md:p-8";
    const applyQuickPair = (nextA: string, nextB: string) => {
        setWordA(nextA);
        setWordB(nextB);
        setGeneratedImages([]);
    };
    const swapWords = () => {
        const nextA = wordB;
        const nextB = wordA;
        setWordA(nextA);
        setWordB(nextB);
        setGeneratedImages([]);
    };

    const generateAmbigrams = async () => {
        if (!preparedInput) return;
        if (isTwoWordMode) {
            if (!wordA.trim() || !wordB.trim()) {
                alert("Please enter both words.");
                return;
            }
            if (/[^a-zA-Z]/.test(wordA) || /[^a-zA-Z]/.test(wordB)) {
                alert("Please use only letters in each word.");
                return;
            }
        } else if (/[^a-zA-Z\s]/.test(preparedInput)) {
            alert("Please use only letters and spaces.");
            return;
        }

        setIsLoading(true);
        setGeneratedImages([]); // 清空旧结果

        // 解析单词
        let words = preparedInput.toLowerCase().trim().split(/\s+/).filter((w) => w);
        let doubleWords = true;

        if (isTwoWordMode && words.length !== 2) {
            alert("Please enter exactly two words.");
            setIsLoading(false);
            return;
        } else if (words.length > 2) {
            alert("Please use one or two words.");
            setIsLoading(false);
            return;
        } else if (words.length === 0) {
            alert("Please type something first.");
            setIsLoading(false);
            return;
        } else if (words.length === 1) {
            words = [words[0], words[0]];
            doubleWords = false;
        }

        // 核心算法
        try {
            const glyphs = getPossibleGlyphs(words, style);
            let permutsA = cartesian(glyphs[0]);
            let permutsB = cartesian(glyphs[1]);
            let matchingCombos = [];

            if (doubleWords) {
                for (let permutA of permutsA) {
                    for (let permutB of permutsB) {
                        permutA = Array.isArray(permutA) ? permutA : [permutA];
                        permutB = Array.isArray(permutB) ? permutB : [permutB];
                        if (countStrokes(permutA) === countStrokes(permutB)) {
                            matchingCombos.push([permutA, permutB]);
                        }
                    }
                }
            } else {
                for (let i of permutsA) {
                    matchingCombos.push([i, i]);
                }
            }

            if (matchingCombos.length === 0) {
                alert(`Could not match "${words[0]}" with "${words[1]}". Try shorter words or different spellings.`);
                setIsLoading(false);
                return;
            }

            // 限制生成数量，防止浏览器卡死 (原逻辑是分块处理，这里简化为生成前12个)
            const combosToProcess = matchingCombos.slice(0, 12);
            const newImages: string[] = [];

            for (const combo of combosToProcess) {
                let width = countStrokes(combo[0]);
                const strokeWidth = glyphs_lookup[style][3];
                width += 3;
                width *= strokeWidth;

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = glyphs_lookup[style][4];
                const ctx = canvas.getContext("2d");

                if (ctx) {
                    // 背景色：Tailwind gray-200 #E5E7EB
                    ctx.fillStyle = "#E5E7EB";
                    ctx.fillRect(0, 0, width, canvas.height);

                    // 绘制正向单词
                    let x = 0;
                    for (const glyph of combo[0]) {
                        const glyphImage = await getGlyphImage(glyph, style);
                        ctx.drawImage(glyphImage, x, 0);
                        x += strokeWidth * countStrokes([glyph]);
                    }

                    // 旋转画布
                    ctx.rotate(Math.PI);

                    // 绘制反向单词 (在旋转后的坐标系中)
                    x = 0;
                    for (const glyph of combo[1]) {
                        const glyphImage = await getGlyphImage(glyph, style);
                        ctx.drawImage(glyphImage, x - canvas.width, -canvas.height);
                        x += strokeWidth * countStrokes([glyph]);
                    }

                    newImages.push(canvas.toDataURL());
                }
            }

            setGeneratedImages(newImages);
        } catch (e) {
            console.error(e);
            alert("Generation failed. Please try different words.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="generator2d">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600">
                        {t('subtitle')}
                    </p>
                </div>

                <div className={panelSurfaceClass}>
                    {/* 输入控制区 */}
                    {isTwoWordMode ? (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="ambigenerator_word_1" className="mb-2 block text-sm font-bold text-slate-700">
                                    Word Pair
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        id="ambigenerator_word_1"
                                        placeholder="Word 1 (e.g. love)"
                                        className={fieldClass}
                                        value={wordA}
                                        onChange={(e) => setWordA(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && generateAmbigrams()}
                                    />
                                    <input
                                        type="text"
                                        id="ambigenerator_word_2"
                                        placeholder="Word 2 (e.g. pain)"
                                        className={fieldClass}
                                        value={wordB}
                                        onChange={(e) => setWordB(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && generateAmbigrams()}
                                    />
                                </div>
                                <p className="mt-2 text-[12px] text-slate-500">
                                    {lengthGap <= 1
                                        ? "Good pair. Word lengths are balanced."
                                        : "Tip: Use similar word lengths for cleaner symmetry."}
                                </p>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    {quickPairs.map(([a, b]) => (
                                        <button
                                            key={`${a}-${b}`}
                                            type="button"
                                            onClick={() => applyQuickPair(a, b)}
                                            className={quickChipClass}
                                        >
                                            {a} / {b}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={swapWords}
                                        className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-100"
                                    >
                                        Swap
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3 items-end">
                                <div className="sm:max-w-[260px]">
                                    <label htmlFor="style_dropdown" className="mb-2 block text-sm font-bold text-slate-700">
                                        {t('styleLabel')}
                                    </label>
                                    <select
                                        id="style_dropdown"
                                        className={selectClass}
                                        value={style}
                                        onChange={(e) => setStyle(e.target.value)}
                                    >
                                        <option value="new">{t('styleBlocky')}</option>
                                        <option value="calligraphy">{t('styleCalligraphy')}</option>
                                    </select>
                                </div>
                                <button
                                    onClick={generateAmbigrams}
                                    disabled={isLoading}
                                    className={`${primaryButtonClass} sm:min-w-[230px] sm:w-auto whitespace-nowrap`}
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : <><PenTool size={18} /> Generate Two-Word</>}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div className="md:col-span-3">
                                <label htmlFor="ambigenerator_input" className="mb-2 block text-sm font-bold text-slate-700">
                                    {t('inputLabel')}
                                </label>
                                <input
                                    type="text"
                                    id="ambigenerator_input"
                                    placeholder={t('inputPlaceholder')}
                                    className={fieldClass}
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && generateAmbigrams()}
                                />
                            </div>
                            <div>
                                <label htmlFor="style_dropdown" className="mb-2 block text-sm font-bold text-slate-700">
                                    {t('styleLabel')}
                                </label>
                                <select
                                    id="style_dropdown"
                                    className={selectClass}
                                    value={style}
                                    onChange={(e) => setStyle(e.target.value)}
                                >
                                    <option value="new">{t('styleBlocky')}</option>
                                    <option value="calligraphy">{t('styleCalligraphy')}</option>
                                </select>
                            </div>
                            <button
                                onClick={generateAmbigrams}
                                disabled={isLoading}
                                className={`${primaryButtonClass} text-lg`}
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <><PenTool size={18} /> {t('buttonGenerate')}</>}
                            </button>
                        </div>
                    )}

                    {/* 结果展示区 */}
                    <div className="mt-8 border-t border-slate-200 pt-6">
                        {generatedImages.length === 0 && !isLoading && (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-500">
                                <p>{t('emptyStateText')}</p>
                            </div>
                        )}

                        {generatedImages.length > 0 && (
                            <>
                                <p className="mb-6 text-center text-sm font-medium text-slate-500">
                                    {t('rotationHint')}
                                </p>
                                <div id="ambigrams" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {generatedImages.map((imgSrc, index) => (
                                        <AmbigramItem
                                            key={index}
                                            src={imgSrc}
                                            alt={t('altTextResult', { index: index + 1 })}
                                            fileName={`${fileStem}-${index + 1}.png`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
