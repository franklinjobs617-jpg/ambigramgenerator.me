"use client";

import { useState } from "react";
import { PenTool, Loader2, RotateCw } from "lucide-react";
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
const AmbigramItem = ({ src, alt }: { src: string, alt: string }) => {
    const [angle, setAngle] = useState(0);

    return (
        <div
            className="relative bg-gray-100 rounded-xl overflow-hidden shadow-md cursor-pointer group border border-gray-200"
            onClick={() => setAngle(prev => prev + 180)}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-auto transition-transform duration-500 ease-in-out"
                style={{ transform: `rotate(${angle}deg)` }}
                width={320}
                height={240}
            />
            <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <RotateCw size={16} />
            </div>
        </div>
    );
};

// --- 3. 主组件: Generator2d ---
export default function Generator2d() {
    const t = useTranslations('Generator2D');
    const [inputText, setInputText] = useState("Hello");
    const [style, setStyle] = useState("calligraphy"); // 默认为 calligraphy，因为它是 "Best for Tattoos"
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);

    const generateAmbigrams = async () => {
        if (!inputText) return;
        if (/[^a-zA-Z\s]/.test(inputText)) {
            alert("Please use only letters and spaces.");
            return;
        }

        setIsLoading(true);
        setGeneratedImages([]); // 清空旧结果

        // 解析单词
        let words = inputText.toLowerCase().trim().split(/\s+/).filter((w) => w);
        let doubleWords = true;

        if (words.length > 2) {
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

                <div className="max-w-4xl mx-auto bg-slate-50/50 rounded-3xl border border-gray-200 p-6 md:p-8 shadow-xl">
                    {/* 输入控制区 */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="md:col-span-3">
                            <label htmlFor="ambigenerator_input" className="block text-gray-700 mb-2 font-bold text-sm">
                                {t('inputLabel')}
                            </label>
                            <input
                                type="text"
                                id="ambigenerator_input"
                                placeholder={t('inputPlaceholder')}
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && generateAmbigrams()}
                            />
                        </div>
                        <div>
                            <label htmlFor="style_dropdown" className="block text-gray-700 mb-2 font-bold text-sm">
                                {t('styleLabel')}
                            </label>
                            <select
                                id="style_dropdown"
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
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
                            className="w-full bg-slate-900 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all hover:shadow-lg text-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <><PenTool size={18} /> {t('buttonGenerate')}</>}
                        </button>
                    </div>

                    {/* 结果展示区 */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        {generatedImages.length === 0 && !isLoading && (
                            <div className="text-center py-10 text-gray-400">
                                <p>{t('emptyStateText')}</p>
                            </div>
                        )}

                        {generatedImages.length > 0 && (
                            <>
                                <p className="text-center text-gray-500 mb-6 text-sm font-medium">
                                    {t('rotationHint')}
                                </p>
                                <div id="ambigrams" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {generatedImages.map((imgSrc, index) => (
                                        <AmbigramItem
                                            key={index}
                                            src={imgSrc}
                                            alt={t('altTextResult', { index: index + 1 })}
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