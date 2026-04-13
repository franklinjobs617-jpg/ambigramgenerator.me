"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Download,
    Info,
    Lock,
    Loader2,
    Sparkles,
    X,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { trackEvent } from "@/lib/analytics";
import { PAYMENTS_ENABLED } from "@/lib/payment-config";
import { createPayment } from "@/lib/payment-gateway-client";
import type { PaymentChannel } from "@/lib/payment-types";
import { generateTattoo, TattooApiError, type TattooResolution, type TattooStyle } from "@/lib/tattoo-api";
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

type HelperTone = "tip" | "success" | "warning" | "error";

type Props = {
    locale: string;
};

const STYLE_OPTIONS: Array<{ value: TattooStyle; title: string; desc: string }> = [
    { value: "line-art", title: "Line Art", desc: "Clean outlines for minimal tattoo direction." },
    { value: "traditional", title: "Traditional", desc: "Bold stroke composition with iconic tattoo feel." },
    { value: "minimal", title: "Minimal", desc: "Simple geometric style focused on readability." },
    { value: "blackwork", title: "Blackwork", desc: "Dense black structure, ideal for cover-up concepts." },
];

const HERO_STYLE_CARDS: Array<{
    id: string;
    label: string;
    value: TattooStyle;
    hint: string;
    image: string;
}> = [
    {
        id: "fine-line",
        label: "Fine Line",
        value: "line-art",
        hint: "Clean and delicate outlines",
        image: "/images/flower-tattoo-stencil-minimalist.jpg",
    },
    {
        id: "traditional",
        label: "Traditional",
        value: "traditional",
        hint: "Bold strokes and strong contrast",
        image: "/images/spider-tattoo-stencil-traditional.jpg",
    },
    {
        id: "blackwork",
        label: "Blackwork",
        value: "blackwork",
        hint: "Dense ink for cover-up concepts",
        image: "/images/skull-tattoo-stencils-outline.jpg",
    },
    {
        id: "minimal",
        label: "Minimal",
        value: "minimal",
        hint: "Geometric and lightweight look",
        image: "/images/geometric-tattoo-stencil-pattern.jpg",
    },
    {
        id: "japanese",
        label: "Japanese",
        value: "traditional",
        hint: "Flowing composition and symbolism",
        image: "/images/snake-tattoo-stencil-wrap.jpg",
    },
    {
        id: "realism",
        label: "Realism",
        value: "line-art",
        hint: "Detailed forms for portrait concepts",
        image: "/images/lion-tattoo-stencil-realistic.jpg",
    },
    {
        id: "ornamental",
        label: "Ornamental",
        value: "minimal",
        hint: "Elegant symmetry and fine patterns",
        image: "/images/butterfly-tattoo-stencil-outline.jpg",
    },
    {
        id: "geometric",
        label: "Geometric",
        value: "minimal",
        hint: "Pattern-based sacred geometry",
        image: "/images/geometric-tattoo-stencil-pattern.jpg",
    },
    {
        id: "chicano",
        label: "Chicano",
        value: "blackwork",
        hint: "High-contrast script and realism mix",
        image: "/images/skull-tattoo-stencils-outline.jpg",
    },
    {
        id: "calligraphy",
        label: "Calligraphy",
        value: "line-art",
        hint: "Flowing lettering with strong rhythm",
        image: "/images/cross-tattoo-stencil-gothic.jpg",
    },
    {
        id: "neo-traditional",
        label: "Neo Traditional",
        value: "traditional",
        hint: "Vivid structure with modern details",
        image: "/images/rose-tattoo-stencil-design-outline.jpg",
    },
    {
        id: "tribal",
        label: "Tribal",
        value: "blackwork",
        hint: "Bold symbolic lines and shapes",
        image: "/images/snake-tattoo-stencil-wrap.jpg",
    },
    {
        id: "watercolor",
        label: "Watercolor",
        value: "traditional",
        hint: "Soft painterly transitions",
        image: "/images/cherry-blossom-tattoo-stencil.jpg",
    },
    {
        id: "dotwork",
        label: "Dotwork",
        value: "line-art",
        hint: "Precision shading using point texture",
        image: "/images/lily-tattoo-stencil-design.png",
    },
    {
        id: "cyber",
        label: "Cyber Sigil",
        value: "blackwork",
        hint: "Experimental dark texture",
        image: "/images/cyber-sigilism-tattoo-stencil.jpg",
    },
];

const HERO_GALLERY_IMAGES = [
    {
        title: "Stencil precision",
        image: "/images/tattoo-design-showcase.jpg",
    },
    {
        title: "Contrast planning",
        image: "/images/ai-tattoo-comparison-hero.jpg",
    },
    {
        title: "Artist-ready lines",
        image: "/images/rose-tattoo-stencil-design-outline.jpg",
    },
];

const SEO_SHOWCASE_IMAGES = [
    {
        title: "AI tattoo generator from text: forearm stencil",
        image: "/images/tattoo-stencil-maker-hero.jpg",
    },
    {
        title: "tattoo ai generator free: line-art flower concept",
        image: "/images/flower-tattoo-stencil-minimalist.jpg",
    },
    {
        title: "ai tattoo cover up generator blackwork example",
        image: "/images/skull-tattoo-stencils-outline.jpg",
    },
    {
        title: "ai name tattoo generator calligraphy direction",
        image: "/images/cross-tattoo-stencil-gothic.jpg",
    },
    {
        title: "realistic lion tattoo blueprint for artist handoff",
        image: "/images/lion-tattoo-stencil-realistic.jpg",
    },
    {
        title: "minimal geometric tattoo layout from prompt",
        image: "/images/geometric-tattoo-stencil-pattern.jpg",
    },
    {
        title: "traditional rose tattoo draft and line weight",
        image: "/images/rose-tattoo-stencil-design-outline.jpg",
    },
    {
        title: "japanese-style snake tattoo flow placement",
        image: "/images/snake-tattoo-stencil-wrap.jpg",
    },
];

const SEO_CONTENT_BLOCKS = [
    {
        title: "Wide Style Range with Customization Options",
        description:
            "Choose from fine line, blackwork, geometric, watercolor, realism, and traditional directions in one ai tattoo generator from text workflow. Each style card is paired with image references so users can compare look, contrast, and line behavior before generating.",
        bullets: [
            "Compare visual directions quickly before you commit to one idea.",
            "See how line weight and black density change across styles.",
            "Pick a style reference and generate with fewer prompt rewrites.",
        ],
        images: [
            "/images/skull-tattoo-stencils-outline.jpg",
            "/images/rose-tattoo-stencil-design-outline.jpg",
            "/images/lion-tattoo-stencil-realistic.jpg",
        ],
    },
    {
        title: "Prompt-to-Stencil Workflow Built for Decision Speed",
        description:
            "The page combines a large prompt box, direct style selection, and live preview so users can evaluate concepts quickly. This structure mirrors how real tattoo decisions happen: concept first, style second, then artist-ready direction.",
        bullets: [
            "Start from one prompt box and iterate in a predictable flow.",
            "Switch styles fast with image-based cards on desktop and mobile.",
            "Move to name, cover-up, or 3D pages when you need deeper tools.",
        ],
        images: [
            "/images/tattoo-stencil-maker-hero.jpg",
            "/images/tattoo-design-showcase.jpg",
            "/images/ai-tattoo-comparison-hero.jpg",
        ],
    },
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

const RESOLUTION_OPTIONS: Array<{ value: TattooResolution; label: string; credits: number }> = [
    { value: "1K", label: "1K", credits: 1 },
    { value: "2K", label: "2K", credits: 2 },
];

const FAQS = [
    {
        q: "What is an ai tattoo generator and how does it work?",
        a: "An ai tattoo generator converts your text prompt into a tattoo concept image. You choose style, placement and size, then generate instantly.",
    },
    {
        q: "Is this tattoo ai generator free to use?",
        a: "You can try 2 guest generations daily. After that, please log in and continue with credits.",
    },
    {
        q: "Can I use this as an ai tattoo cover up generator?",
        a: "Yes. Choose Blackwork style and describe your existing tattoo area in the prompt for stronger cover-up concepts.",
    },
    {
        q: "Do I get high-resolution files?",
        a: "HD downloads are part of Pro. Guest mode includes standard previews for concept validation.",
    },
    {
        q: "Can I generate tattoos from just text without uploading a photo?",
        a: "Yes. The core flow is text-first. You can describe the subject, style, body placement, and mood, then generate a tattoo concept directly.",
    },
    {
        q: "What prompt format gives the best result?",
        a: "Use this sequence: subject + style + placement + detail level. Example: 'Minimal lotus forearm tattoo, fine line, black ink, stencil-ready edges.'",
    },
    {
        q: "How is this different from a general image generator?",
        a: "This page is tuned for tattoo intent, so outputs focus more on line readability, contrast, and stencil suitability rather than generic art style rendering.",
    },
    {
        q: "Can beginners use this tool before visiting an artist?",
        a: "Yes. It is designed for pre-consultation planning. You can prepare references and discuss revisions with your tattoo artist more efficiently.",
    },
    {
        q: "Can I use it for name tattoos and couple tattoos?",
        a: "Yes. Name, couple, and lettering prompts are supported. You can also open dedicated pages for more specific name-tattoo templates.",
    },
    {
        q: "Does this support cover-up tattoo ideas?",
        a: "Yes. Use higher-contrast styles like blackwork and describe the old tattoo location for better cover-up direction.",
    },
    {
        q: "Will generated images be exactly tattoo-ready?",
        a: "Treat them as strong concept drafts. Final line optimization, skin fit, and safety decisions should always be confirmed by a professional artist.",
    },
    {
        q: "Is the ai tattoo generator from text suitable for mobile?",
        a: "Yes. Mobile UX keeps preview and input in a compact flow, and style selection uses a bottom sheet for faster single-hand use.",
    },
];

export default function AITattooStudio({ locale }: Props) {
    const { user, login } = useAuth();
    const [flowState, setFlowState] = useState<FlowState>("idle");
    const [style, setStyle] = useState<TattooStyle>("line-art");
    const [resolution, setResolution] = useState<TattooResolution>("1K");
    const [prompt, setPrompt] = useState("Create ai tattoo generator design for the word 'Trust' in minimal line art style");
    const placement = "forearm";
    const size = "medium";
    const [generatedUrl, setGeneratedUrl] = useState<string>("");
    const [resultMode, setResultMode] = useState<"guest" | "paid" | null>(null);
    const [resultResolution, setResultResolution] = useState<TattooResolution>("1K");
    const [isDownloading, setIsDownloading] = useState(false);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
    const [loadingPlan, setLoadingPlan] = useState<"pro_monthly" | "pro_yearly" | null>(null);
    const [loadingChannel, setLoadingChannel] = useState<PaymentChannel | null>(null);
    const [helperText, setHelperText] = useState("");
    const [helperTone, setHelperTone] = useState<HelperTone>("tip");
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isStylePanelOpen, setIsStylePanelOpen] = useState(false);
    const [isMobileStyleSheetOpen, setIsMobileStyleSheetOpen] = useState(false);
    const [heroStyleId, setHeroStyleId] = useState(HERO_STYLE_CARDS[0]?.id ?? "fine-line");
    const stylePanelRef = useRef<HTMLDivElement | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const presetPrompt = searchParams.get("prompt");
        const presetStyle = searchParams.get("style") as TattooStyle | null;
        const presetResolution = searchParams.get("resolution");
        if (presetPrompt) setPrompt(presetPrompt);
        if (presetStyle && STYLE_OPTIONS.some((item) => item.value === presetStyle)) {
            setStyle(presetStyle);
        }
        if (presetResolution === "1K" || presetResolution === "2K") {
            setResolution(presetResolution);
        }
    }, [searchParams]);

    const scrollTo = (id: string) => {
        if (typeof window === "undefined") return;
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        if (!isStylePanelOpen) return;
        const closePanel = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!stylePanelRef.current?.contains(target)) {
                setIsStylePanelOpen(false);
            }
        };
        document.addEventListener("mousedown", closePanel);
        return () => document.removeEventListener("mousedown", closePanel);
    }, [isStylePanelOpen]);

    useEffect(() => {
        const selected = HERO_STYLE_CARDS.find((item) => item.id === heroStyleId);
        if (selected?.value === style) return;
        const fallback = HERO_STYLE_CARDS.find((item) => item.value === style);
        if (fallback) setHeroStyleId(fallback.id);
    }, [heroStyleId, style]);

    useEffect(() => {
        if (!isMobileStyleSheetOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMobileStyleSheetOpen]);

    const handleUseStyle = (nextStyle: TattooStyle, options?: { scroll?: boolean }) => {
        setStyle(nextStyle);
        trackEvent("cta_click", { section: "style", style: nextStyle });
        if (options?.scroll ?? true) {
            scrollTo("studio");
        }
    };

    const handleUsePrompt = (nextPrompt: string) => {
        setPrompt(nextPrompt);
        trackEvent("cta_click", { section: "prompt_template" });
        scrollTo("studio");
    };

    const handleGenerate = async () => {
        const cleanPrompt = prompt.trim();
        if (cleanPrompt.length < 1) {
            setHelperText("Please enter your tattoo idea first.");
            setHelperTone("warning");
            return;
        }
        setHelperText("");
        setHelperTone("tip");

        trackEvent("generate_click", { style, placement, size, resolution, flowState });

        setFlowState("generating");
        try {
            const result = await generateTattoo({
                prompt: cleanPrompt,
                style,
                placement,
                size,
                resolution,
                locale,
            });

            if (result.status === "completed" && result.finalUrl) {
                setGeneratedUrl(result.finalUrl);
                setFlowState("generated");
                setResultMode(result.access?.mode ?? null);
                if (result.access?.resolution === "1K" || result.access?.resolution === "2K") {
                    setResultResolution(result.access.resolution);
                } else {
                    setResultResolution(resolution);
                }
                if (result.access?.mode === "guest" && result.access?.guestQuota) {
                    const left = result.access.guestQuota.attempts_left;
                    setHelperText(
                        left > 0
                            ? `Generated successfully. Guest tries left today: ${left}.`
                            : "Generated successfully. Guest tries are now used up for today."
                    );
                    setHelperTone("success");
                } else if (result.access?.remainingCredits !== undefined) {
                    const used = result.access.creditsUsed;
                    if (used !== undefined) {
                        const debitHint = result.access.debitStatus === "pending" ? " Debit is processing in background." : "";
                        setHelperText(`Generated successfully. Used ${used} credits (${resolution}), estimated remaining: ${result.access.remainingCredits}.${debitHint}`);
                    } else {
                        setHelperText(`Generated successfully. Remaining credits: ${result.access.remainingCredits}.`);
                    }
                    setHelperTone("success");
                } else {
                    setHelperText("Generated successfully. Try another prompt for more versions.");
                    setHelperTone("success");
                }
                trackEvent("generate_success", { style, hasImage: true });
                return;
            }

            setFlowState("idle");
            setHelperText("No image was returned this time. Please try again in a moment.");
            setHelperTone("error");
        } catch (error) {
            setFlowState("idle");
            if (error instanceof TattooApiError) {
                if (error.code === "GUEST_LIMIT_EXCEEDED") {
                    setFlowState("free_limit_hit");
                    setHelperText("Guest trials are used up. Please log in and continue with credits.");
                    setHelperTone("warning");
                    setIsUpgradeOpen(true);
                    return;
                }
                if (error.code === "LOGIN_REQUIRED") {
                    setFlowState("free_limit_hit");
                    setHelperText("Please log in to continue generating with credits.");
                    setHelperTone("warning");
                    return;
                }
                if (error.code === "PAYMENT_REQUIRED") {
                    setFlowState("free_limit_hit");
                    setHelperText("Credits are insufficient. Please purchase credits to continue.");
                    setHelperTone("warning");
                    setIsUpgradeOpen(true);
                    return;
                }
                setHelperText(error.message || "Generation failed. Please try again.");
                setHelperTone("error");
                return;
            }
            setHelperText("Generation service is temporarily unavailable. Please retry shortly.");
            setHelperTone("error");
        }
    };

    const handleSelectPlan = async (
        planId: "pro_monthly" | "pro_yearly",
        channel: PaymentChannel = "stripe",
    ) => {
        trackEvent("checkout_start", { planId, channel, sourcePage: "ai-tattoo-generator" });
        if (!PAYMENTS_ENABLED) {
            setHelperText("Payments are temporarily unavailable. Please try again shortly.");
            setHelperTone("warning");
            return;
        }
        if (!user?.email || !user?.googleUserId) {
            setHelperText("Please log in first. Your payment must be linked to your account.");
            setHelperTone("warning");
            await login();
            return;
        }

        setLoadingPlan(planId);
        setLoadingChannel(channel);
        setFlowState("checkout_pending");
        try {
            if (typeof window !== "undefined") {
                const returnUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
                window.sessionStorage.setItem("postPaymentRedirect", returnUrl);
            }

            const created = await createPayment({
                channel,
                planCode: planId,
                project: "ambigramgenerator",
                googleUserId: user.googleUserId,
            });

            if (!created.ok) {
                setHelperText(created.error.message || "Failed to create checkout. Please retry.");
                setHelperTone("error");
                setFlowState("upgrade_modal");
                return;
            }

            if (channel === "stripe") {
                if (!created.data.checkoutUrl) {
                    setHelperText("Billing service did not return a checkout URL. Please retry.");
                    setHelperTone("error");
                    setFlowState("upgrade_modal");
                    return;
                }
                trackEvent("checkout_redirect", {
                    planId,
                    channel,
                    sourcePage: "ai-tattoo-generator",
                });
                window.location.assign(created.data.checkoutUrl);
                return;
            }

            const approvalUrl = created.data.approvalUrl;
            const subscriptionId = created.data.subscriptionId;
            const orderId = created.data.orderId;
            if (approvalUrl) {
                trackEvent("checkout_redirect", {
                    planId,
                    channel,
                    sourcePage: "ai-tattoo-generator",
                });
                window.location.assign(approvalUrl);
                return;
            }
            if (subscriptionId || orderId) {
                const token = subscriptionId || orderId;
                const fallbackPaypalUrl = `https://www.paypal.com/checkoutnow?token=${encodeURIComponent(token || "")}`;
                trackEvent("checkout_redirect", {
                    planId,
                    channel,
                    sourcePage: "ai-tattoo-generator",
                });
                window.location.assign(fallbackPaypalUrl);
                return;
            }
            setHelperText("PayPal checkout link was not returned. Please retry.");
            setHelperTone("error");
            setFlowState("upgrade_modal");
        } catch (error) {
            const message = error instanceof Error ? error.message : "";
            setHelperText(message || "Checkout is temporarily unavailable. Please retry.");
            setHelperTone("error");
            setFlowState("upgrade_modal");
        } finally {
            setLoadingPlan(null);
            setLoadingChannel(null);
        }
    };

    const primaryCta =
        "cursor-pointer rounded-2xl bg-indigo-600 text-white font-bold text-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]";
    const primaryCtaWide =
        "cursor-pointer w-full rounded-2xl bg-indigo-600 text-white font-bold text-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]";
    const heroPrimaryCta =
        "cursor-pointer rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_18px_36px_-18px_rgba(79,70,229,0.9)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300";
    const primaryCtaSoft =
        "cursor-pointer rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-700 font-semibold text-sm transition-all hover:bg-indigo-100 hover:shadow-sm active:scale-[0.98]";
    const linkCta =
        "cursor-pointer text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline underline-offset-4";
    const quickPromptChips = [
        "Minimal lotus wrist tattoo, black fine line, airy spacing",
        "Two-name couple tattoo Emma + Noah, clean forearm lettering",
        "Blackwork floral cover-up for old wrist tattoo, high contrast",
        "Geometric wolf chest tattoo, sharp linework and balanced symmetry",
    ];
    const isBusy = flowState === "generating" || flowState === "checkout_pending";
    const promptCharacters = prompt.trim().length;
    const selectedResolutionInfo = RESOLUTION_OPTIONS.find((item) => item.value === resolution) ?? RESOLUTION_OPTIONS[0];
    const canDownload = Boolean(generatedUrl) && resultMode === "paid";

    const handleDownloadPreview = async () => {
        if (!generatedUrl) return;
        if (!canDownload) {
            setHelperTone("warning");
            setHelperText("Download is available for paid generations only. Please unlock with credits first.");
            setIsUpgradeOpen(true);
            trackEvent("upgrade_view", { trigger: "download_locked" });
            return;
        }

        setIsDownloading(true);
        try {
            const response = await fetch(generatedUrl, { cache: "no-store" });
            if (!response.ok) {
                throw new Error("DOWNLOAD_FETCH_FAILED");
            }
            const blob = await response.blob();
            const objectUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = `ai-tattoo-${resultResolution.toLowerCase()}-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(objectUrl);
            setHelperTone("success");
            setHelperText("Download started.");
            trackEvent("cta_click", { section: "preview", action: "download_success", resolution: resultResolution });
        } catch {
            const fallbackLink = document.createElement("a");
            fallbackLink.href = generatedUrl;
            fallbackLink.target = "_blank";
            fallbackLink.rel = "noopener noreferrer";
            fallbackLink.click();
            setHelperTone("tip");
            setHelperText("Opened image in a new tab. You can save it from there.");
            trackEvent("cta_click", { section: "preview", action: "download_fallback", resolution: resultResolution });
        } finally {
            setIsDownloading(false);
        }
    };

    const handleRandomPrompt = () => {
        const randomPrompt = quickPromptChips[Math.floor(Math.random() * quickPromptChips.length)];
        setPrompt(randomPrompt);
        setHelperText("Random prompt loaded. Press Ctrl/Cmd + Enter to generate.");
        setHelperTone("tip");
        trackEvent("cta_click", { section: "studio", action: "random_prompt" });
    };

    const handleHeroGenerate = () => {
        if (isBusy) return;
        const cleanPrompt = prompt.trim();
        if (cleanPrompt.length < 1) {
            setHelperText("Please enter your tattoo idea first.");
            setHelperTone("warning");
            return;
        }
        setHelperText("");
        setHelperTone("tip");
        trackEvent("cta_click", { section: "hero", action: "generate" });
        const runGenerate = handleGenerate();
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            window.setTimeout(() => scrollTo("studio-preview"), 180);
        }
        void runGenerate;
    };

    const selectedHeroStyle = useMemo(() => {
        return HERO_STYLE_CARDS.find((item) => item.id === heroStyleId) ?? HERO_STYLE_CARDS[0];
    }, [heroStyleId]);

    const heroPreviewState = useMemo<"idle" | "generating" | "generated">(() => {
        if (flowState === "generating") return "generating";
        if (generatedUrl) return "generated";
        return "idle";
    }, [flowState, generatedUrl]);
    const isHeroIdle = heroPreviewState === "idle";
    const shouldShowMobilePreviewFirst = !isHeroIdle;
    const inputOrderClass = shouldShowMobilePreviewFirst ? "order-2 lg:order-1" : "order-1 lg:order-1";
    const previewOrderClass = shouldShowMobilePreviewFirst ? "order-1 lg:order-2" : "order-2 lg:order-2";

    const handleHeroStyleSelect = (card: (typeof HERO_STYLE_CARDS)[number]) => {
        setHeroStyleId(card.id);
        handleUseStyle(card.value, { scroll: false });
        setIsStylePanelOpen(false);
        setIsMobileStyleSheetOpen(false);
        trackEvent("cta_click", { section: "hero_style", styleLabel: card.label, style: card.value });
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#FDFDFF] font-sans text-[#1A1A1B] selection:bg-indigo-100">
            {/* Hero Section */}
            <section
                id="studio"
                className="relative overflow-x-clip pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(180deg,#F6F5FF_0%,#F2F5FF_46%,#FDFDFF_100%)]"
            >
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-indigo-200/70 blur-3xl" />
                    <div className="absolute -left-20 bottom-2 h-72 w-72 rounded-full bg-violet-200/60 blur-3xl" />
                    <div className="absolute -right-12 top-6 h-64 w-64 rounded-full bg-sky-200/55 blur-3xl" />
                    <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/65 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            Tattoo Studio Tool
                        </div>
                        <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                            AI Tattoo Generator
                        </h1>
                        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-pretty">
                            This ai tattoo generator from text turns your idea into a clean stencil direction in seconds.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.03fr_0.97fr] items-start">
                        <div className={`${inputOrderClass} rounded-[2rem] border border-slate-200/90 bg-white/94 p-5 sm:p-6 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.32)] backdrop-blur-sm`}>
                            <div className="flex items-center justify-between mb-3">
                                <label htmlFor="hero-main-prompt" className="text-sm font-semibold text-[#1A1A1B]">
                                    Describe your tattoo idea
                                </label>
                                <span className="text-xs text-slate-500">{promptCharacters} chars</span>
                            </div>
                            <textarea
                                id="hero-main-prompt"
                                name="hero-main-prompt"
                                value={prompt}
                                onChange={(event) => setPrompt(event.target.value)}
                                onKeyDown={(event) => {
                                    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                                        event.preventDefault();
                                        handleHeroGenerate();
                                    }
                                }}
                                className="w-full rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 min-h-[138px] sm:min-h-[190px] text-sm text-[#1A1A1B] transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 resize-none"
                                placeholder="Example: blackwork floral wrist cover-up, high contrast center, stencil-ready edges."
                            />

                            <div className="mt-4 relative hidden lg:block" ref={stylePanelRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsStylePanelOpen((prev) => !prev)}
                                    className="cursor-pointer w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition-all hover:border-indigo-200 hover:bg-indigo-50/50"
                                >
                                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected style</span>
                                    <span className="mt-1 flex items-center justify-between text-sm font-semibold text-[#1A1A1B]">
                                        {selectedHeroStyle.label}
                                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isStylePanelOpen ? "rotate-180" : ""}`} />
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-200 ease-out ${isStylePanelOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_20px_52px_-34px_rgba(15,23,42,0.32)]">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Pick visual style</p>
                                            <div className="max-h-[320px] overflow-y-auto pr-1">
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                                    {HERO_STYLE_CARDS.map((item) => (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            onClick={() => handleHeroStyleSelect(item)}
                                                            className={`cursor-pointer text-left rounded-xl border overflow-hidden transition-all ${heroStyleId === item.id ? "border-indigo-300 shadow-sm" : "border-slate-200 hover:border-indigo-200"}`}
                                                            aria-label={`Choose ${item.label} style`}
                                                        >
                                                            <div className="relative aspect-[5/4]">
                                                                <Image src={item.image} alt={`${item.label} tattoo style`} fill sizes="160px" className="object-cover" />
                                                            </div>
                                                            <div className="p-2">
                                                                <p className="text-xs font-semibold text-[#1A1A1B]">{item.label}</p>
                                                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{item.hint}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 lg:hidden">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsStylePanelOpen(false);
                                        setIsMobileStyleSheetOpen(true);
                                    }}
                                    className="cursor-pointer w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition-all hover:border-indigo-200 hover:bg-indigo-50/50"
                                >
                                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Style</span>
                                    <span className="mt-1 flex items-center justify-between text-sm font-semibold text-[#1A1A1B]">
                                        {selectedHeroStyle.label}
                                        <ChevronRight className="h-4 w-4 text-slate-400" />
                                    </span>
                                </button>
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-3 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resolution</p>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    {RESOLUTION_OPTIONS.map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => setResolution(item.value)}
                                            className={`cursor-pointer rounded-xl border px-3 py-2 text-left transition-all ${
                                                resolution === item.value
                                                    ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                                                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200"
                                            }`}
                                        >
                                            <p className="text-sm font-semibold">{item.label}</p>
                                            <p className="text-[11px] mt-0.5">Uses {item.credits} credit{item.credits > 1 ? "s" : ""}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-3 sm:hidden">
                                <button
                                    type="button"
                                    onClick={handleRandomPrompt}
                                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-700"
                                >
                                    Try a sample prompt
                                </button>
                            </div>

                            <div className="mt-4 hidden sm:flex flex-wrap gap-2">
                                {quickPromptChips.slice(0, 3).map((chip) => (
                                    <button
                                        key={chip}
                                        type="button"
                                        onClick={() => {
                                            setPrompt(chip);
                                            setHelperText("Template applied. Press Generate Tattoo.");
                                            setHelperTone("tip");
                                            trackEvent("cta_click", { section: "hero", action: "quick_prompt" });
                                        }}
                                        className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-700"
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                                <button onClick={handleHeroGenerate} disabled={isBusy} className={`${heroPrimaryCta} group w-full sm:w-auto px-7 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed`}>
                                    {flowState === "generating" ? (
                                        <span className="inline-flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Generating...
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2">
                                            Generate Tattoo
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                        </span>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollTo("styles")}
                                    className="cursor-pointer w-full sm:w-auto rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-indigo-200 hover:text-indigo-700"
                                >
                                    Browse Styles
                                </button>
                            </div>
                            <div
                                className={`mt-3 rounded-xl border px-3 py-2.5 text-xs ${
                                    helperTone === "success"
                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                        : helperTone === "warning"
                                          ? "border-amber-200 bg-amber-50 text-amber-700"
                                          : helperTone === "error"
                                            ? "border-rose-200 bg-rose-50 text-rose-700"
                                            : "border-slate-200 bg-slate-50 text-slate-600"
                                }`}
                                aria-live="polite"
                            >
                                <div className="flex items-start gap-2">
                                    {helperTone === "success" ? (
                                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                                    ) : helperTone === "warning" ? (
                                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                    ) : helperTone === "error" ? (
                                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                    ) : (
                                        <Info className="h-4 w-4 shrink-0 mt-0.5" />
                                    )}
                                    <span>
                                        {helperText || `Tip: include subject + style + placement for better results. Current output: ${selectedResolutionInfo.label} (${selectedResolutionInfo.credits} credit${selectedResolutionInfo.credits > 1 ? "s" : ""}). Guest mode allows 2 tries per day.`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div id="studio-preview" className={`${previewOrderClass} rounded-[2rem] border border-slate-200/90 bg-white/94 p-4 sm:p-5 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.32)] backdrop-blur-sm`}>
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Live Preview</p>
                                <span className="text-xs font-medium text-slate-500">
                                    {heroPreviewState === "idle" ? "Ready to generate" : heroPreviewState === "generating" ? "Generating..." : "Result ready"}
                                </span>
                            </div>

                            <div
                                className={`relative rounded-[1.5rem] border border-slate-200 bg-white overflow-hidden ${
                                    isHeroIdle ? "min-h-[170px] sm:min-h-[360px]" : "min-h-[250px] sm:min-h-[360px]"
                                }`}
                            >
                                {heroPreviewState === "generated" ? (
                                    <>
                                        <Image
                                            src={generatedUrl}
                                            alt="AI tattoo generator result preview"
                                            fill
                                            unoptimized
                                            sizes="(min-width: 1024px) 42vw, 92vw"
                                            className="object-cover"
                                        />
                                        <div className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                                            Preview Ready
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
                                        <div className="absolute right-3 top-3 rounded-full bg-indigo-600/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                                            {resultResolution}
                                        </div>
                                    </>
                                ) : heroPreviewState === "generating" ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-indigo-50 text-center px-6">
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        </span>
                                        <p className="mt-4 text-sm font-semibold text-[#1A1A1B]">Generating your tattoo draft</p>
                                        <p className="mt-1 text-xs text-slate-500">Adjusting style contrast and line clarity...</p>
                                    </div>
                                ) : (
                                    <div className={`flex h-full flex-col gap-2.5 p-2.5 ${isHeroIdle ? "min-h-[170px] sm:min-h-[360px]" : "min-h-[250px] sm:min-h-[360px]"}`}>
                                        <div className="relative h-full sm:h-[58%] min-h-[140px] sm:min-h-[198px] overflow-hidden rounded-xl border border-slate-200">
                                            <Image
                                                src={selectedHeroStyle.image}
                                                alt={`${selectedHeroStyle.label} style preview`}
                                                fill
                                                sizes="(min-width: 1024px) 34vw, 92vw"
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 py-2.5">
                                                <p className="text-xs font-semibold text-white">{selectedHeroStyle.label}</p>
                                                <p className="text-[11px] text-white/80">{selectedHeroStyle.hint}</p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:grid grid-cols-3 gap-2.5 flex-1 min-h-[64px] sm:min-h-[128px]">
                                            {HERO_GALLERY_IMAGES.map((item) => (
                                                <div key={item.title} className="relative overflow-hidden rounded-xl border border-slate-200">
                                                    <Image src={item.image} alt={item.title} fill sizes="220px" className="object-cover" />
                                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-2.5 py-2">
                                                        <p className="text-[11px] font-semibold text-white">{item.title}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="sm:hidden text-[11px] text-slate-500 px-1">
                                            Preview follows your selected style. Generate to see your final tattoo result.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {heroPreviewState === "generated" && (
                                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-[#1A1A1B]">Result Tools</p>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {canDownload
                                                    ? `Download unlocked (${resultResolution})`
                                                    : "Download is locked for guest results"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleDownloadPreview}
                                                disabled={isDownloading || !generatedUrl}
                                                className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                                                    canDownload
                                                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                                        : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200"
                                                } disabled:opacity-60 disabled:cursor-not-allowed`}
                                            >
                                                {canDownload ? <Download className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                                                {isDownloading ? "Preparing..." : canDownload ? "Download PNG" : "Download (Paid)"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleHeroGenerate}
                                                disabled={isBusy}
                                                className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-indigo-200 hover:text-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                Generate Again
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-3 hidden sm:grid grid-cols-4 gap-2">
                                {HERO_STYLE_CARDS.slice(0, 4).map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleHeroStyleSelect(item)}
                                        className={`cursor-pointer overflow-hidden rounded-xl border text-left transition-all ${heroStyleId === item.id ? "border-indigo-300 ring-1 ring-indigo-200" : "border-slate-200 hover:border-indigo-200"}`}
                                        aria-label={`Quick select ${item.label}`}
                                    >
                                        <div className="relative aspect-[1.15/1]">
                                            <Image src={item.image} alt={item.label} fill sizes="120px" className="object-cover" />
                                        </div>
                                        <p className="truncate px-2 py-1.5 text-[11px] font-semibold text-[#1A1A1B]">{item.label}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Style Sheet */}
            <div className={`fixed inset-0 z-[70] lg:hidden ${isMobileStyleSheetOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <button
                    type="button"
                    aria-label="Close style picker"
                    onClick={() => setIsMobileStyleSheetOpen(false)}
                    className={`absolute inset-0 bg-black/45 transition-opacity duration-200 ${isMobileStyleSheetOpen ? "opacity-100" : "opacity-0"}`}
                />
                <div
                    className={`absolute inset-x-0 bottom-0 rounded-t-[2rem] border-t border-slate-200 bg-white px-4 pt-4 pb-6 shadow-[0_-24px_48px_-26px_rgba(15,23,42,0.5)] transition-transform duration-300 ease-out ${
                        isMobileStyleSheetOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <p className="text-base font-semibold text-[#1A1A1B]">Style</p>
                            <p className="text-xs text-slate-500 mt-0.5">Choose visual direction before generating</p>
                        </div>
                        <button
                            type="button"
                            aria-label="Close style picker panel"
                            onClick={() => setIsMobileStyleSheetOpen(false)}
                            className="cursor-pointer rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="max-h-[58vh] overflow-y-auto pr-1">
                        <div className="grid grid-cols-3 gap-2.5">
                            {HERO_STYLE_CARDS.map((item) => (
                                <button
                                    key={`mobile-${item.id}`}
                                    type="button"
                                    onClick={() => handleHeroStyleSelect(item)}
                                    className={`cursor-pointer text-left rounded-xl border overflow-hidden transition-all ${
                                        heroStyleId === item.id ? "border-indigo-300 ring-1 ring-indigo-100 shadow-sm" : "border-slate-200"
                                    }`}
                                    aria-label={`Choose ${item.label} style`}
                                >
                                    <div className="relative aspect-square">
                                        <Image src={item.image} alt={`${item.label} tattoo style`} fill sizes="120px" className="object-cover" />
                                    </div>
                                    <div className="p-1.5">
                                        <p className="text-[11px] font-semibold text-[#1A1A1B] truncate">{item.label}</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{item.hint}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">How It Works</span>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-2">From Prompt to Tattoo in 3 Steps</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { step: "01", title: "Write Prompt", desc: "Describe style, concept, body placement and vibe clearly." },
                            { step: "02", title: "Generate", desc: "Choose a style and generate your ai tattoo generator preview." },
                            { step: "03", title: "Refine & Export", desc: "Iterate, compare versions, then download or unlock Pro exports." },
                        ].map((item) => (
                            <button
                                key={item.step}
                                type="button"
                                onClick={() => scrollTo("studio")}
                                className="group cursor-pointer text-left rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
                                aria-label={`Open studio from step ${item.step}`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">{item.step}</span>
                                    <h3 className="font-semibold">{item.title}</h3>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                <span className={`${linkCta} mt-4 inline-flex items-center gap-1`}>
                                    Open Studio <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Styles Section */}
            <section id="styles" className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Style</span>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Choose a Tattoo Style</h2>
                            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl">
                                Explore visual styles for your ai tattoo generator workflow, from fine line to bold blackwork and watercolor-inspired concepts.
                            </p>
                        </div>
                        <button
                            onClick={() => scrollTo("studio")}
                            className="cursor-pointer hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-[#1A1A1B]"
                        >
                            Go to Studio <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {HERO_STYLE_CARDS.map((item) => (
                            <button
                                key={`style-section-${item.id}`}
                                type="button"
                                onClick={() => {
                                    setHeroStyleId(item.id);
                                    handleUseStyle(item.value);
                                }}
                                className="group cursor-pointer text-left rounded-[1.5rem] border border-slate-200 bg-white p-3 transition-all hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
                                aria-label={`Use style ${item.label}`}
                            >
                                <div className="relative aspect-[1.2/1] overflow-hidden rounded-xl border border-slate-200">
                                    <Image src={item.image} alt={`${item.label} tattoo style reference`} fill sizes="(min-width: 1024px) 20vw, 44vw" className="object-cover" />
                                </div>
                                <h3 className="font-semibold mt-3">{item.label}</h3>
                                <p className="text-sm text-slate-500 mt-1 min-h-[40px] leading-relaxed line-clamp-2">{item.hint}</p>
                                <span className={`${primaryCtaWide} mt-3 py-2.5 inline-flex items-center justify-center`}>
                                    Use This Style
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO + Visual Content Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-7xl mx-auto space-y-14">
                    {SEO_CONTENT_BLOCKS.map((block, index) => (
                        <div key={block.title} className="grid gap-8 lg:grid-cols-2 lg:items-center">
                            <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Style Guide</span>
                                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#101828]">{block.title}</h2>
                                <p className="mt-4 text-base leading-relaxed text-slate-600">{block.description}</p>
                                <ul className="mt-4 space-y-2">
                                    {block.bullets.map((item) => (
                                        <li key={item} className="text-sm text-slate-600 leading-relaxed">
                                            • {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`${index % 2 === 1 ? "lg:order-1" : ""} rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-sm`}>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative col-span-2 aspect-[1.8/1] overflow-hidden rounded-2xl border border-slate-200">
                                        <Image src={block.images[0]} alt={`${block.title} hero visual`} fill sizes="(min-width: 1024px) 44vw, 96vw" className="object-cover" />
                                    </div>
                                    <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                                        <Image src={block.images[1]} alt={`${block.title} reference one`} fill sizes="(min-width: 1024px) 20vw, 46vw" className="object-cover" />
                                    </div>
                                    <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                                        <Image src={block.images[2]} alt={`${block.title} reference two`} fill sizes="(min-width: 1024px) 20vw, 46vw" className="object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#101828]">More Tattoo Image References for Better Prompt Writing</h3>
                        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-4xl">
                            Use these references to improve prompt clarity, compare composition, and find a visual direction faster across
                            <span className="font-semibold text-[#1A1A1B]"> ai tattoo generator</span>,
                            <span className="font-semibold text-[#1A1A1B]"> tattoo ai generator free</span>, and
                            <span className="font-semibold text-[#1A1A1B]"> ai tattoo generator from text</span>.
                        </p>
                        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {SEO_SHOWCASE_IMAGES.map((item) => (
                                <div key={item.title} className="rounded-[1.25rem] border border-slate-200 bg-white overflow-hidden shadow-sm">
                                    <div className="relative aspect-[1.15/1]">
                                        <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover" />
                                    </div>
                                    <p className="px-3 py-2.5 text-xs text-slate-600 leading-relaxed">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Prompt Templates Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Prompt Templates</span>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-2">Use Prompt and Generate Faster</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {PROMPT_TEMPLATES.map((item, index) => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleUsePrompt(item.prompt)}
                                className="group cursor-pointer text-left rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
                                aria-label={`Use prompt template ${item.label}`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded bg-indigo-50 text-xs font-semibold text-indigo-600">{index + 1}</span>
                                    <h3 className="font-semibold">{item.label}</h3>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.prompt}</p>
                                <span className={`${primaryCtaSoft} mt-4 px-4 py-2 inline-flex items-center justify-center`}>
                                    Use Prompt
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Examples/Explore Section */}
            <section id="examples" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Explore Next</span>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-2">Specialized Tattoo Pages</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link href="/ai-tattoo-generator/names" className="group cursor-pointer rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-md">
                            <h3 className="font-semibold">ai name tattoo generator</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Templates and layouts for couple names and emotional typography.</p>
                            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                                Open Names Page <ArrowRight className="h-3.5 w-3.5" />
                            </div>
                        </Link>
                        <Link href="/ai-tattoo-generator/cover-up" className="group cursor-pointer rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-md">
                            <h3 className="font-semibold">ai tattoo cover up generator</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">High-density composition prompts for old-ink cover-up use cases.</p>
                            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                                Open Cover-up Page <ArrowRight className="h-3.5 w-3.5" />
                            </div>
                        </Link>
                        <Link href="/ai-tattoo-generator/3d-stl" className="group cursor-pointer rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-md">
                            <h3 className="font-semibold">3D STL tattoo outputs</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Bridge tattoo concepts to printable objects and 3D-ready files.</p>
                            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                                Open 3D/STL Page <ArrowRight className="h-3.5 w-3.5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Pricing Block */}
            <PricingBlock
                onSelectPlan={handleSelectPlan}
                loadingPlan={loadingPlan}
                loadingChannel={loadingChannel}
                currentPlan={user?.plan}
                currentCredits={user?.credits}
            />

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">FAQ</h2>
                    <div className="space-y-3">
                        {FAQS.map((item, index) => (
                            <div
                                key={item.q}
                                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all hover:border-indigo-200 hover:shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="cursor-pointer w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-medium pr-4">{item.q}</span>
                                    <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`} />
                                </button>
                                <div className={`grid transition-all duration-200 ${openFaq === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{item.a}</p>
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
                            className={`${primaryCta} px-6 py-3`}
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
                    className="cursor-pointer w-full rounded-2xl bg-indigo-600 text-white py-3.5 font-semibold text-sm shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl active:scale-[0.99]"
                >
                    Open Tattoo Studio
                </button>
            </div>

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={isUpgradeOpen}
                onClose={() => setIsUpgradeOpen(false)}
                onSelectPlan={handleSelectPlan}
                loadingPlan={loadingPlan}
                loadingChannel={loadingChannel}
                currentPlan={user?.plan}
                currentCredits={user?.credits}
            />
        </div>
    );
}
