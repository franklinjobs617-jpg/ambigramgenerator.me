"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
    ArrowRight,
    ChevronDown,
    Crown,
    Download,
    Loader2,
    Sparkles,
    Wand2,
} from "lucide-react";
import type { SubscriptionStatus } from "@/lib/billing-api";
import { createCheckoutSession, getSubscriptionStatus } from "@/lib/billing-api";
import { trackEvent } from "@/lib/analytics";
import { generateTattoo, type TattooStyle } from "@/lib/tattoo-api";
import UpgradeModal from "./UpgradeModal";
import PricingBlock from "./PricingBlock";

type FlowState =
    | "idle"
    | "generating"
    | "generated"
    | "free_limit_hit"
    | "upgrade_modal"
    | "checkout_pending"
    | "checkout_success"
    | "checkout_cancel";

type Props = {
    locale: string;
};

const DAILY_FREE_LIMIT = 3;

const STYLE_OPTIONS: Array<{ value: TattooStyle; title: string; desc: string }> = [
    { value: "line-art", title: "Line Art", desc: "Clean outlines for minimal tattoo direction." },
    { value: "traditional", title: "Traditional", desc: "Bold stroke composition with iconic tattoo feel." },
    { value: "minimal", title: "Minimal", desc: "Simple geometric style focused on readability." },
    { value: "blackwork", title: "Blackwork", desc: "Dense black structure, ideal for cover-up concepts." },
];

const PROMPT_TEMPLATES = [
    {
        label: "Names",
        prompt: "Create an ai name tattoo generator result for Emma and Noah in clean line art style",
    },
    {
        label: "Cover-up",
        prompt: "Design ai tattoo cover up generator concept with blackwork floral layers for old wrist tattoo",
    },
    {
        label: "Couple",
        prompt: "Generate romantic couple ambigram tattoo using two names and mirrored symmetry",
    },
];

const FAQS = [
    {
        q: "What is an ai tattoo generator and how does it work?",
        a: "An ai tattoo generator converts your text prompt into a tattoo concept image. You choose style, placement and size, then generate instantly.",
    },
    {
        q: "Is this tattoo ai generator free to use?",
        a: "Yes. Free plan includes 3 generations per day. You can upgrade to Pro for unlimited generations and premium exports.",
    },
    {
        q: "Can I use this as an ai tattoo cover up generator?",
        a: "Yes. Choose Blackwork style and describe your existing tattoo area in the prompt for stronger cover-up concepts.",
    },
    {
        q: "Do I get high-resolution files?",
        a: "HD downloads are part of Pro. Free includes standard resolution previews for concept validation.",
    },
];

function getUsageStorageKey() {
    return `ai_tattoo_daily_usage_${new Date().toISOString().slice(0, 10)}`;
}

function readDailyUsage() {
    if (typeof window === "undefined") return 0;
    const raw = window.localStorage.getItem(getUsageStorageKey());
    const value = Number(raw || 0);
    return Number.isNaN(value) ? 0 : value;
}

function writeDailyUsage(value: number) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(getUsageStorageKey(), String(value));
}

export default function AITattooStudio({ locale }: Props) {
    const [flowState, setFlowState] = useState<FlowState>("idle");
    const [style, setStyle] = useState<TattooStyle>("line-art");
    const [prompt, setPrompt] = useState("Create ai tattoo generator design for the word 'Trust' in minimal line art style");
    const [placement, setPlacement] = useState("forearm");
    const [size, setSize] = useState("medium");
    const [generatedUrl, setGeneratedUrl] = useState<string>("");
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
    const [loadingPlan, setLoadingPlan] = useState<"pro_monthly" | "pro_yearly" | null>(null);
    const [usageCount, setUsageCount] = useState(0);
    const [subscription, setSubscription] = useState<SubscriptionStatus>({ isPro: false });
    const [helperText, setHelperText] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        setUsageCount(readDailyUsage());
        getSubscriptionStatus().then(setSubscription).catch(() => setSubscription({ isPro: false }));
    }, []);

    useEffect(() => {
        const presetPrompt = searchParams.get("prompt");
        const presetStyle = searchParams.get("style") as TattooStyle | null;
        if (presetPrompt) setPrompt(presetPrompt);
        if (presetStyle && STYLE_OPTIONS.some((item) => item.value === presetStyle)) {
            setStyle(presetStyle);
        }
    }, [searchParams]);

    const remaining = useMemo(() => {
        if (subscription.isPro) return "Unlimited";
        return Math.max(0, DAILY_FREE_LIMIT - usageCount).toString();
    }, [subscription.isPro, usageCount]);

    const scrollTo = (id: string) => {
        if (typeof window === "undefined") return;
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleUseStyle = (nextStyle: TattooStyle) => {
        setStyle(nextStyle);
        trackEvent("cta_click", { section: "style", style: nextStyle });
        scrollTo("studio");
    };

    const handleUsePrompt = (nextPrompt: string) => {
        setPrompt(nextPrompt);
        trackEvent("cta_click", { section: "prompt_template" });
        scrollTo("studio");
    };

    const handleGenerate = async () => {
        const cleanPrompt = prompt.trim();
        if (cleanPrompt.length < 6) {
            setHelperText("Please enter a more detailed prompt (at least 6 characters).");
            return;
        }
        setHelperText("");

        trackEvent("generate_click", { style, placement, size, flowState });

        if (!subscription.isPro && usageCount >= DAILY_FREE_LIMIT) {
            setFlowState("free_limit_hit");
            setIsUpgradeOpen(true);
            trackEvent("upgrade_view", { trigger: "free_limit_hit" });
            return;
        }

        setFlowState("generating");
        try {
            const result = await generateTattoo({
                prompt: cleanPrompt,
                style,
                placement,
                size,
                locale,
            });

            if (result.status === "completed" && result.finalUrl) {
                setGeneratedUrl(result.finalUrl);
                setFlowState("generated");
                trackEvent("generate_success", { style, hasImage: true });

                if (!subscription.isPro) {
                    const nextUsage = usageCount + 1;
                    setUsageCount(nextUsage);
                    writeDailyUsage(nextUsage);
                }
                return;
            }

            setFlowState("idle");
            setHelperText("Generation returned no result. Please try another prompt.");
        } catch {
            setFlowState("idle");
            setHelperText("Generation failed. Please try again.");
        }
    };

    const handleSelectPlan = async (planId: "pro_monthly" | "pro_yearly") => {
        trackEvent("checkout_start", { planId, sourcePage: "ai-tattoo-generator" });
        setLoadingPlan(planId);
        setFlowState("checkout_pending");
        try {
            const session = await createCheckoutSession({
                planId,
                locale,
                sourcePage: "ai-tattoo-generator",
            });
            window.location.href = session.checkoutUrl;
        } catch {
            setFlowState("upgrade_modal");
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                        {/* Left Content */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground mb-6">
                                <Sparkles className="h-3.5 w-3.5" />
                                AI Tattoo Generator
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                                AI Tattoo Generator:
                                <span className="text-primary"> Free, Fast, No Sign-up</span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                                Create custom concepts with our <strong className="text-foreground">ai tattoo generator</strong> in seconds. Start with a <strong className="text-foreground">tattoo ai generator free</strong> flow, then upgrade for HD downloads, Visualize, and 3D STL output.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    onClick={() => {
                                        trackEvent("cta_click", { section: "hero", action: "start_free" });
                                        scrollTo("studio");
                                    }}
                                    className="cursor-pointer px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                                >
                                    Start Free
                                </button>
                                <button
                                    onClick={() => {
                                        trackEvent("cta_click", { section: "hero", action: "see_examples" });
                                        scrollTo("examples");
                                    }}
                                    className="cursor-pointer px-5 py-2.5 rounded-full border border-border bg-background font-medium text-sm transition-all hover:bg-muted hover:shadow-sm active:scale-[0.98]"
                                >
                                    See Examples
                                </button>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">Daily free quota: {remaining}</p>
                        </div>

                        {/* Right Preview Card */}
                        <div className="lg:col-span-7">
                            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live Preview</span>
                                    <span className="text-xs text-muted-foreground">State: {flowState}</span>
                                </div>
                                <div className="rounded-xl overflow-hidden bg-muted/30 border border-border aspect-[16/10]">
                                    <Image
                                        src={generatedUrl || "https://placehold.co/920x620/f4f4f5/a1a1aa?text=AI+Tattoo+Preview"}
                                        alt="ai tattoo generator preview"
                                        width={920}
                                        height={620}
                                        unoptimized
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={() => scrollTo("studio")}
                                    className="cursor-pointer mt-4 w-full rounded-full bg-foreground text-background py-3 font-medium text-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.99]"
                                >
                                    Generate from Text
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">How It Works</span>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-2">From Prompt to Tattoo in 3 Steps</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { step: "01", title: "Write Prompt", desc: "Describe style, concept, body placement and vibe clearly." },
                            { step: "02", title: "Generate", desc: "Choose a style and generate your ai tattoo generator preview." },
                            { step: "03", title: "Refine & Export", desc: "Iterate, compare versions, then download or unlock Pro exports." },
                        ].map((item) => (
                            <div key={item.step} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold">{item.step}</span>
                                    <h3 className="font-semibold">{item.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                <button
                                    onClick={() => scrollTo("studio")}
                                    className="cursor-pointer mt-4 text-sm font-medium text-primary transition-colors hover:underline underline-offset-4"
                                >
                                    Open Studio
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Styles Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">Style</span>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Choose a Style</h2>
                        </div>
                        <button
                            onClick={() => scrollTo("studio")}
                            className="cursor-pointer hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Go to Studio <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {STYLE_OPTIONS.map((item) => (
                            <div key={item.value} className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mt-2 min-h-[48px] leading-relaxed">{item.desc}</p>
                                <button
                                    onClick={() => handleUseStyle(item.value)}
                                    className="cursor-pointer mt-4 w-full rounded-full bg-foreground text-background py-2.5 text-sm font-medium transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                                >
                                    Use This Style
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prompt Templates Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">Prompt Templates</span>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-2">Use Prompt and Generate Faster</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {PROMPT_TEMPLATES.map((item, index) => (
                            <div key={item.label} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded bg-muted text-xs font-medium">{index + 1}</span>
                                    <h3 className="font-semibold">{item.label}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.prompt}</p>
                                <button
                                    onClick={() => handleUsePrompt(item.prompt)}
                                    className="cursor-pointer mt-4 rounded-full border border-primary/20 bg-primary/5 text-primary px-4 py-2 text-sm font-medium transition-all hover:bg-primary/10 hover:shadow-sm active:scale-[0.98]"
                                >
                                    Use Prompt
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Studio Section */}
            <section id="studio" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <span className="text-xs font-medium text-primary uppercase tracking-wider">Studio</span>
                                <h2 className="text-2xl sm:text-3xl font-bold mt-1">Generate Your Tattoo</h2>
                            </div>
                            <button
                                onClick={() => {
                                    setIsUpgradeOpen(true);
                                    setFlowState("upgrade_modal");
                                    trackEvent("upgrade_view", { trigger: "studio_button" });
                                }}
                                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-medium transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                            >
                                <Crown className="h-4 w-4" />
                                Unlock Pro
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                            {/* Input Panel */}
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="ai-tattoo-prompt" className="block text-sm font-medium mb-2">Prompt</label>
                                    <textarea
                                        id="ai-tattoo-prompt"
                                        name="prompt"
                                        value={prompt}
                                        onChange={(event) => setPrompt(event.target.value)}
                                        className="w-full rounded-xl border border-border bg-background p-4 min-h-[130px] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none"
                                        placeholder="Describe your tattoo idea..."
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label htmlFor="ai-tattoo-style" className="block text-xs font-medium text-muted-foreground mb-1.5">Style</label>
                                        <select
                                            id="ai-tattoo-style"
                                            name="style"
                                            value={style}
                                            onChange={(event) => setStyle(event.target.value as TattooStyle)}
                                            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                                        >
                                            {STYLE_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.title}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="ai-tattoo-placement" className="block text-xs font-medium text-muted-foreground mb-1.5">Placement</label>
                                        <select
                                            id="ai-tattoo-placement"
                                            name="placement"
                                            value={placement}
                                            onChange={(event) => setPlacement(event.target.value)}
                                            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                                        >
                                            <option value="forearm">Forearm</option>
                                            <option value="wrist">Wrist</option>
                                            <option value="chest">Chest</option>
                                            <option value="back">Back</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="ai-tattoo-size" className="block text-xs font-medium text-muted-foreground mb-1.5">Size</label>
                                        <select
                                            id="ai-tattoo-size"
                                            name="size"
                                            value={size}
                                            onChange={(event) => setSize(event.target.value)}
                                            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                                        >
                                            <option value="small">Small</option>
                                            <option value="medium">Medium</option>
                                            <option value="large">Large</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={flowState === "generating" || flowState === "checkout_pending"}
                                    className="cursor-pointer w-full rounded-full bg-primary text-primary-foreground py-3.5 font-medium text-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {flowState === "generating" ? (
                                        <span className="inline-flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Generating...
                                        </span>
                                    ) : "Generate Tattoo"}
                                </button>

                                <p className="text-xs text-muted-foreground" aria-live="polite">
                                    {helperText || "Tip: include style + body placement + mood for better results."}
                                </p>
                            </div>

                            {/* Result Panel */}
                            <div className="rounded-xl border border-border bg-muted/20 p-5">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Result</p>
                                <div className="rounded-lg border border-border bg-card overflow-hidden aspect-[4/3] flex items-center justify-center">
                                    {generatedUrl ? (
                                        <Image src={generatedUrl} alt="generated tattoo result" width={920} height={620} unoptimized className="w-full h-full object-cover" />
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No result yet. Click generate to start.</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <a
                                        href={generatedUrl || "#"}
                                        download="ai-tattoo-generator-result.png"
                                        onClick={() => trackEvent("cta_click", { section: "studio", action: "download" })}
                                        className={`inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-all ${generatedUrl ? "cursor-pointer bg-foreground text-background hover:opacity-90 hover:shadow-md active:scale-[0.98]" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
                                    >
                                        <Download className="h-4 w-4" />
                                        Download
                                    </a>
                                    <button
                                        onClick={() => {
                                            setIsUpgradeOpen(true);
                                            setFlowState("upgrade_modal");
                                            trackEvent("upgrade_view", { trigger: "studio_visualize" });
                                        }}
                                        className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 text-primary py-2.5 text-sm font-medium transition-all hover:bg-primary/20 hover:shadow-sm active:scale-[0.98]"
                                    >
                                        <Wand2 className="h-4 w-4" />
                                        Visualize (Pro)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Examples/Explore Section */}
            <section id="examples" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">Explore Next</span>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-2">Specialized Tattoo Pages</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
                            <h3 className="font-semibold">ai name tattoo generator</h3>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Templates and layouts for couple names and emotional typography.</p>
                            <div className="mt-4 flex flex-col gap-2">
                                <Link href="/ai-tattoo-generator/names" className="text-sm font-medium text-primary transition-colors hover:underline underline-offset-4">
                                    Open Names Page
                                </Link>
                                <Link href="/ai-tattoo-generator?style=line-art&prompt=Create%20a%20two-name%20tattoo%20for%20Emma%20and%20Noah%20with%20clean%20line%20art" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                    Use Names Template
                                </Link>
                            </div>
                        </div>
                        <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
                            <h3 className="font-semibold">ai tattoo cover up generator</h3>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">High-density composition prompts for old-ink cover-up use cases.</p>
                            <div className="mt-4 flex flex-col gap-2">
                                <Link href="/ai-tattoo-generator/cover-up" className="text-sm font-medium text-primary transition-colors hover:underline underline-offset-4">
                                    Open Cover-up Page
                                </Link>
                                <Link href="/ai-tattoo-generator?style=blackwork&prompt=Create%20a%20blackwork%20cover-up%20tattoo%20with%20floral%20layers%20for%20old%20wrist%20ink" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                    Use Cover-up Template
                                </Link>
                            </div>
                        </div>
                        <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
                            <h3 className="font-semibold">3D STL tattoo outputs</h3>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Bridge tattoo concepts to printable objects and 3D-ready files.</p>
                            <div className="mt-4 flex flex-col gap-2">
                                <Link href="/ai-tattoo-generator/3d-stl" className="text-sm font-medium text-primary transition-colors hover:underline underline-offset-4">
                                    Open 3D/STL Page
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsUpgradeOpen(true);
                                        setFlowState("upgrade_modal");
                                        trackEvent("upgrade_view", { trigger: "stl_card" });
                                    }}
                                    className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-foreground text-left"
                                >
                                    Unlock STL Export
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Block */}
            <PricingBlock onSelectPlan={handleSelectPlan} loadingPlan={loadingPlan} />

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">FAQ</h2>
                    <div className="space-y-3">
                        {FAQS.map((item, index) => (
                            <div
                                key={item.q}
                                className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="cursor-pointer w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                                >
                                    <span className="font-medium pr-4">{item.q}</span>
                                    <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`} />
                                </button>
                                <div className={`grid transition-all duration-200 ${openFaq === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <button
                            onClick={() => {
                                trackEvent("cta_click", { section: "faq_final", action: "back_to_studio" });
                                scrollTo("studio");
                            }}
                            className="cursor-pointer rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium text-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                        >
                            Start Generating Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Mobile Fixed CTA */}
            <div className="fixed bottom-4 left-4 right-4 sm:hidden z-50">
                <button
                    onClick={() => scrollTo("studio")}
                    className="cursor-pointer w-full rounded-full bg-primary text-primary-foreground py-3.5 font-medium text-sm shadow-lg transition-all hover:opacity-90 hover:shadow-xl active:scale-[0.99]"
                >
                    Start Free in Studio
                </button>
            </div>

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={isUpgradeOpen}
                onClose={() => setIsUpgradeOpen(false)}
                onSelectPlan={handleSelectPlan}
                loadingPlan={loadingPlan}
            />
        </div>
    );
}
