"use client";

import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { saveAs } from 'file-saver';
import GIF from 'gif.js';
import { letterData } from '@/lib/letterData';
import { useTranslations } from 'next-intl';

interface Generator3dProps {
    incomingWordA?: string;
    incomingWordB?: string;
    triggerRender?: number;
}

export default function Generator3d({ incomingWordA, incomingWordB, triggerRender }: Generator3dProps) {
    const t = useTranslations('HomePage.Generator3D');
    const [firstText, setFirstText] = useState("LOVE");
    const [lastText, setLastText] = useState("HATE");
    const [isHighQuality, setIsHighQuality] = useState(false);
    const [generateBase, setGenerateBase] = useState(false);
    const [autoRotate, setAutoRotate] = useState(false);

    const [isGenerating, setIsGenerating] = useState(false);

    // GIF 相关状态
    const [isRenderingGif, setIsRenderingGif] = useState(false);
    const [gifText, setGifText] = useState("Render GIF");

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const workerRef = useRef<Worker | null>(null);

    // 专门用于存取排版宽度的 Ref
    const constructionRef = useRef<any>(null);
    // 专门用于 GIF 的 Refs
    const gifRendererRef = useRef<any>(null);
    const gifDataRef = useRef<any>(null);

    // ==========================================
    // 联动响应：接收 HeroSection 传来的词并触发生成
    // ==========================================
    useEffect(() => {
        if (incomingWordA) setFirstText(incomingWordA);
        if (incomingWordB) setLastText(incomingWordB);

        if (triggerRender && triggerRender > 0) {
            setTimeout(() => {
                triggerGenerateAction(incomingWordA || "LOVE", incomingWordB || "HATE");
            }, 100);
        }
    }, [incomingWordA, incomingWordB, triggerRender]);

    // ==========================================
    // 1. 初始化 Three.js 场景
    // ==========================================
    useEffect(() => {
        if (!canvasRef.current) return;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            logarithmicDepthBuffer: true,
            antialias: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true // ⚠️ GIF 截图必须开启此项
        });
        renderer.setClearColor(0x121212);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        const width = 300;
        const rect = canvasRef.current.getBoundingClientRect();
        const aspectRatio = rect.height / rect.width;

        const camera = new THREE.OrthographicCamera(width / -2 + 40, width / 2 + 40, width / 2 * aspectRatio, width / -2 * aspectRatio, 0.01, 10000);
        camera.position.set(40, 40, 40);
        cameraRef.current = camera;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', () => {
            if (sceneRef.current && cameraRef.current && rendererRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        });
        controlsRef.current = controls;

        const scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0x101010));

        for (let i = 0; i < 10; i++) {
            const light1 = new THREE.PointLight(0xffffff, 0.08, 0, 2);
            light1.position.set(-300 + 100 * i, 300, 500);
            scene.add(light1);
            const light2 = new THREE.PointLight(0xffcccc, 0.12, 0, 2);
            light2.position.set(2000, 400, -300 - 100 * i);
            scene.add(light2);
        }
        sceneRef.current = scene;

        const handleResize = () => {
            if (!canvasRef.current || !rendererRef.current || !cameraRef.current || !sceneRef.current) return;
            const width = canvasRef.current.clientWidth;
            const height = canvasRef.current.clientHeight;

            const aspect = height / width;
            const cam = cameraRef.current;
            cam.top = (cam.right - cam.left) * aspect / 2;
            cam.bottom = (cam.right - cam.left) * aspect / -2;
            cam.updateProjectionMatrix();

            rendererRef.current.setSize(width, height, false);
            rendererRef.current.render(sceneRef.current, cam);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (controlsRef.current) controlsRef.current.update();

            // GIF 录制逻辑
            if (gifDataRef.current && gifRendererRef.current && rendererRef.current && cameraRef.current) {
                const data = gifDataRef.current;
                const gif = gifRendererRef.current;
                const dom = rendererRef.current.domElement;

                const updateCam = (x: number, y: number, z: number, w: number) => {
                    const cam = cameraRef.current!;
                    const size = new THREE.Vector2();
                    rendererRef.current!.getSize(size);
                    const aspect = size.y / size.x;
                    cam.position.set(x, y, z);
                    cam.left = w / -2;
                    cam.right = w / 2;
                    cam.top = (cam.right - cam.left) * aspect / 2 + 10;
                    cam.bottom = (cam.right - cam.left) * aspect / -2 + 10;
                    cam.updateProjectionMatrix();
                    if (controlsRef.current) controlsRef.current.update();
                };

                switch (data.state) {
                    case 0: case 2: case 4:
                        gif.addFrame(dom, { delay: data.pauseDelay, copy: true });
                        data.step = 0;
                        data.state++;
                        break;
                    case 1:
                        gif.addFrame(dom, { delay: data.frameDelay, copy: true });
                        updateCam(
                            (data.a.x - data.b.x) * (1 - (data.step / data.frameAmount)) + data.b.x,
                            (data.a.y - data.b.y) * (1 - (data.step / data.frameAmount)) + data.b.y,
                            (data.a.z - data.b.z) * (1 - (data.step / data.frameAmount)) + data.b.z,
                            (data.a.width - data.b.width) * (1 - (data.step / data.frameAmount)) + data.b.width
                        );
                        data.step++;
                        if (data.step > data.frameAmount) {
                            updateCam(data.b.x, data.b.y, data.b.z, data.b.width);
                            data.state++;
                        }
                        break;
                    case 3:
                        gif.addFrame(dom, { delay: data.frameDelay, copy: true });
                        updateCam(
                            (data.b.x - data.c.x) * (1 - (data.step / data.frameAmount)) + data.c.x,
                            (data.b.y - data.c.y) * (1 - (data.step / data.frameAmount)) + data.c.y,
                            (data.b.z - data.c.z) * (1 - (data.step / data.frameAmount)) + data.c.z,
                            (data.b.width - data.c.width) * (1 - (data.step / data.frameAmount)) + data.c.width
                        );
                        data.step++;
                        if (data.step > data.frameAmount) {
                            updateCam(data.c.x, data.c.y, data.c.z, data.c.width);
                            data.state++;
                        }
                        break;
                    case 5:
                        gif.addFrame(dom, { delay: data.frameDelay, copy: true });
                        updateCam(
                            (data.c.x - data.a.x) * (1 - (data.step / data.frameAmount)) + data.a.x,
                            (data.c.y - data.a.y) * (1 - (data.step / data.frameAmount)) + data.a.y,
                            (data.c.z - data.a.z) * (1 - (data.step / data.frameAmount)) + data.a.z,
                            (data.c.width - data.a.width) * (1 - (data.step / data.frameAmount)) + data.a.width
                        );
                        data.step++;
                        if (data.step > data.frameAmount) {
                            updateCam(data.a.x, data.a.y, data.a.z, data.a.width);
                            data.state++;
                        }
                        break;
                    case 6:
                        gif.render();
                        data.state++;
                        break;
                }
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (workerRef.current) workerRef.current.terminate();
            renderer.dispose();
        };
    }, []);

    useEffect(() => {
        if (controlsRef.current && !isRenderingGif) {
            controlsRef.current.autoRotate = autoRotate;
            controlsRef.current.autoRotateSpeed = -4;
        }
    }, [autoRotate, isRenderingGif]);

    // ==========================================
    // 2. 构造算法
    // ==========================================
    const buildConstruction = (firstWord: string, lastWord: string, minimize: boolean) => {
        let tempConstruction: any = {};
        const setWord = (key: string, word: string) => {
            tempConstruction[key + "Word"] = word;
            tempConstruction[key] = [];
            word = word.toUpperCase();
            let pos = 0;

            const lData = letterData as Record<string, any>;

            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                if (char === " ") { pos += 20; continue; }
                if (lData[char]) {
                    tempConstruction[key].push({
                        letter: char,
                        profiles: lData[char].max,
                        width: lData[char].width,
                        pos: pos
                    });
                    pos += lData[char].width + 3;
                }
            }
            tempConstruction[key + "Width"] = pos - 3;
        };
        const sumScore = (key: string) => tempConstruction[key].reduce((acc: number, curr: any) => acc + curr.profiles, 0);
        const simplify = (key: string, override = false) => {
            let target = 3;
            while (target > 1) {
                for (let i = 0; i < tempConstruction[key].length; i++) {
                    const lData = letterData as any;
                    if (tempConstruction[key][i].profiles === target && (tempConstruction[key][i].profiles === lData[tempConstruction[key][i].letter].max || override)) {
                        tempConstruction[key][i].profiles--;
                        return true;
                    }
                }
                target--;
            }
            return false;
        };

        setWord("first", firstWord || "Default");
        setWord("last", lastWord || "Example");

        let override = false;
        while (sumScore("first") > sumScore("last")) {
            if (!simplify("first", override)) {
                if (override || minimize) break;
                if (window.confirm("First word is too complex!")) override = true;
                else return null;
            }
        }
        while (sumScore("first") < sumScore("last")) {
            if (!simplify("last", override)) {
                if (override || minimize) break;
                if (window.confirm("Second word is too complex!")) override = true;
                else return null;
            }
        }

        if (sumScore("first") < sumScore("last") && !minimize) {
            let i = 0;
            while (sumScore("first") < sumScore("last")) {
                let toAdd = { ...tempConstruction.first[i] };
                tempConstruction.first.push(toAdd); i++;
            }
            let j = tempConstruction.first.length;
            while (sumScore("first") > sumScore("last")) {
                j--; tempConstruction.first[j].profiles--;
            }
        }
        if (sumScore("first") > sumScore("last") && !minimize) {
            let i = 0;
            while (sumScore("first") > sumScore("last")) {
                let toAdd = { ...tempConstruction.last[i] };
                tempConstruction.last.push(toAdd); i++;
            }
            let j = tempConstruction.last.length;
            while (sumScore("first") < sumScore("last")) {
                j--; tempConstruction.last[j].profiles--;
            }
        }
        return tempConstruction;
    };

    // ==========================================
    // 3. 核心生成模型逻辑
    // ==========================================
    const triggerGenerateAction = (word1: string, word2: string) => {
        const scene = sceneRef.current;
        if (!scene) return;
        setIsGenerating(true);

        for (let i = scene.children.length - 1; i >= 0; i--) {
            if (scene.children[i] instanceof THREE.Mesh) scene.remove(scene.children[i]);
        }

        const construction = buildConstruction(word1, word2, false);
        if (!construction) { setIsGenerating(false); return; }

        constructionRef.current = construction;

        if (workerRef.current) workerRef.current.terminate();
        workerRef.current = new Worker('/worker.js');
        const loader = new THREE.ObjectLoader();

        // 🌟 修复点：彻底还原了接收 Web Worker 模型的逻辑！
        workerRef.current.onmessage = (msg) => {
            if (msg.data.type === "Add") {
                const adding = loader.parse(msg.data.geometry);
                scene.add(adding);

                if (msg.data.after) {
                    if (msg.data.after.r) adding.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), msg.data.after.r);
                    if (msg.data.after.x) adding.translateX(msg.data.after.x);
                    if (msg.data.after.y) adding.translateY(msg.data.after.y);
                    if (msg.data.after.z) adding.translateZ(msg.data.after.z);
                }
            } else if (msg.data.type === "Del") {
                const toRemove = scene.getObjectByName(msg.data.name);
                if (toRemove) scene.remove(toRemove);
            } else if (msg.data.type === "Clear") {
                for (let i = scene.children.length - 1; i >= 0; i--) {
                    if (scene.children[i] instanceof THREE.Mesh) {
                        scene.remove(scene.children[i]);
                    }
                }
            } else if (msg.data.type === "Done") {
                setIsGenerating(false);
                if (workerRef.current) {
                    workerRef.current.terminate();
                    workerRef.current = null;
                }
            }
        };

        workerRef.current.postMessage([construction, generateBase, isHighQuality, false, false]);
    };

    // 组件内部的点击事件
    const handleUserClickGenerate = () => {
        triggerGenerateAction(firstText, lastText);
    };

    // ==========================================
    // 4. GIF 与 下载功能
    // ==========================================
    const handleMakeGif = () => {
        const c = constructionRef.current;
        if (!c) return alert("Please generate the 3D model first!");

        setIsRenderingGif(true);
        setGifText("Recording... 0%");

        if (controlsRef.current) {
            controlsRef.current.autoRotate = false;
            controlsRef.current.enabled = false;
        }

        const gif = new GIF({
            workers: 4,
            quality: 10,
            background: "0x111111",
            workerScript: '/gif.worker.js'
        });

        gif.on('progress', (p: number) => {
            setGifText(`Recording... ${Math.floor(p * 100)}%`);
        });

        gif.on('finished', (blob: Blob) => {
            saveAs(blob, `${c.firstWord}_${c.lastWord}_Render.gif`);
            setIsRenderingGif(false);
            setGifText("Render GIF");
            if (controlsRef.current) controlsRef.current.enabled = true;
            gifDataRef.current = null;
            gifRendererRef.current = null;
        });

        gifRendererRef.current = gif;

        const maxW = Math.max(c.firstWidth || 0, c.lastWidth || 0);
        gifDataRef.current = {
            pauseDelay: 1000, frameDelay: 30, frameAmount: 50,
            a: { x: maxW * 1.5, y: maxW * 1.5, z: maxW * 1.5, width: Math.hypot(c.firstWidth, c.lastWidth) * 1.4 },
            b: { x: 0, y: 0, z: maxW * 1.5 + c.lastWidth / 2, width: c.firstWidth * 1.2 },
            c: { x: maxW * 1.5 + c.firstWidth / 2, y: 0, z: 0, width: c.lastWidth * 1.2 },
            state: 0, step: 0
        };
    };

    const handleDownloadSTL = () => {
        if (!sceneRef.current) return;
        const exporter = new STLExporter();
        const toSave = exporter.parse(sceneRef.current);
        const blob = new Blob([toSave], { type: 'text/plain' });
        saveAs(blob, `${firstText}_${lastText}.stl`);
    };

    const setCameraPosition = (x: number, y: number, z: number) => {
        if (cameraRef.current && controlsRef.current) {
            cameraRef.current.position.set(x, y, z);
            cameraRef.current.lookAt(0, 0, 0);
            controlsRef.current.update();
        }
    };

    return (
        <>
            <div className="text-3xl font-black text-white tracking-tight w-full text-center py-4">
                {t('title')}
                <p className="text-slate-400 text-sm mt-1">{t('subtitle')}</p>
            </div>

            <section className="w-full h-full flex flex-col lg:flex-row gap-8 p-6 md:p-10">

                {/* 左侧控制面板 */}
                <div className="lg:w-1/3 flex flex-col gap-8">

                    {/* 标题区 */}
                    <div className="space-y-2">
                        <div className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                            <span className="w-8 h-1 bg-indigo-500 rounded-full inline-block"></span>
                            {t('settingsTitle')}
                        </div>
                        <p className="text-slate-400 text-sm">{t('subtitle')}</p>
                    </div>

                    {/* 表单区 */}
                    <div className="space-y-5">
                        <div className="space-y-4">
                            <div className="group">
                                <label htmlFor="first" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors">
                                    {t('firstWordLabel')}
                                </label>
                                <input
                                    type="text"
                                    id="first"
                                    placeholder={t('firstWordPlaceholder')}
                                    pattern="^[A-Za-z ]*$"
                                    value={firstText}
                                    onChange={(e) => setFirstText(e.target.value)}
                                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3.5 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="last" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors">
                                    {t('secondWordLabel')}
                                </label>
                                <input
                                    type="text"
                                    id="last"
                                    placeholder={t('secondWordPlaceholder')}
                                    pattern="^[A-Za-z ]*$"
                                    value={lastText}
                                    onChange={(e) => setLastText(e.target.value)}
                                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3.5 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="bg-[#1e293b]/50 rounded-xl p-4 border border-slate-700/50 space-y-3">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{t('highQualityLabel')}</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={isHighQuality} onChange={(e) => setIsHighQuality(e.target.checked)} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </div>
                            </label>
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{t('generateBaseLabel')}</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={generateBase} onChange={(e) => setGenerateBase(e.target.checked)} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* 生成按钮 */}
                    <div className="mt-auto pt-4">
                        <button
                            onClick={handleUserClickGenerate}
                            disabled={isGenerating || isRenderingGif}
                            className={`w-full py-4 rounded-xl font-black text-lg text-white shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]
                        ${(isGenerating || isRenderingGif)
                                    ? 'bg-slate-700 cursor-not-allowed opacity-70'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/25'
                                }`}
                        >
                            {isGenerating ? (
                                <><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> {t('btnGenerating')}</>
                            ) : (
                                <>{t('btnGenerate')}</>
                            )}
                        </button>
                    </div>
                </div>

                {/* 右侧渲染画布与工具栏 */}
                <div className="lg:w-2/3 flex flex-col gap-6">

                    {/* 3D Canvas 容器 */}
                    <div className="flex-1 relative bg-black/40 rounded-[2rem] border-2 border-slate-800/50 shadow-inner overflow-hidden min-h-[400px] group">
                        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing outline-none" />
                    </div>

                    {/* 底部工具栏 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* 视角控制器 */}
                        <div className="bg-[#1e293b] p-2 rounded-2xl flex items-center justify-between gap-2 border border-slate-700">
                            <button
                                onClick={() => setCameraPosition(0, 0, 150)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                            >
                                {t('viewFirst')}
                            </button>
                            <button
                                onClick={() => setCameraPosition(150, 0, 0)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                            >
                                {t('viewSecond')}
                            </button>
                            <button
                                onClick={() => setCameraPosition(100, 100, 100)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                            >
                                {t('viewIso')}
                            </button>
                            <div className="w-px h-6 bg-slate-700 mx-1"></div>
                            <label className="flex items-center justify-center px-3 cursor-pointer" title={t('autoRotate')}>
                                <input type="checkbox" checked={autoRotate} onChange={(e) => setAutoRotate(e.target.checked)} disabled={isRenderingGif} className="h-5 w-5 rounded border-slate-600 text-indigo-600 focus:ring-offset-0 bg-slate-800" />
                            </label>
                        </div>

                        {/* 导出按钮组 */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleMakeGif}
                                disabled={isGenerating || isRenderingGif}
                                className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-transparent
                            ${isRenderingGif
                                        ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800'
                                        : 'bg-[#1e293b] text-emerald-400 border-slate-700 hover:border-emerald-500 hover:text-emerald-300 hover:bg-emerald-900/20'}`}
                            >
                                {isRenderingGif ? <span className="animate-pulse">{t('btnRecordingGif')}</span> : <>{t('btnRenderGif')}</>}
                            </button>

                            <button
                                onClick={handleDownloadSTL}
                                disabled={isGenerating || isRenderingGif}
                                className="flex-1 py-3 rounded-2xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 active:scale-95"
                            >
                                {t('btnDownloadStl')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}