"use client";

import { useState } from "react";
import { CheckCircle2, Crown, Sparkles } from "lucide-react";
import type { PaymentChannel } from "@/lib/payment-types";

type PlanId = "pro_monthly" | "pro_yearly";

type PricingBlockProps = {
    onSelectPlan: (planId: PlanId, channel: PaymentChannel) => void;
    loadingPlan?: PlanId | null;
    loadingChannel?: PaymentChannel | null;
    currentPlan?: string;
    currentCredits?: number;
};

export default function PricingBlock({
    onSelectPlan,
    loadingPlan,
    loadingChannel,
    currentPlan,
    currentCredits,
}: PricingBlockProps) {
    const [selectedChannel, setSelectedChannel] = useState<PaymentChannel>("stripe");
    const normalizedPlan = (currentPlan || "free").toLowerCase();
    const isProPlan =
        normalizedPlan.includes("pro") ||
        normalizedPlan.includes("premium") ||
        normalizedPlan.includes("ambigram");
    const isYearlyPlan =
        normalizedPlan.includes("year") ||
        normalizedPlan.includes("annual");
    const currentPlanLabel = isProPlan
        ? isYearlyPlan
            ? "Pro Yearly"
            : "Pro Monthly"
        : "Free";

    const primaryCta =
        "cursor-pointer rounded-full bg-[#4F39F6] text-white px-5 py-3 font-medium text-sm transition-all hover:bg-[#3f2fe0] hover:shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";
    const secondaryCta =
        "cursor-pointer rounded-full border border-[#4F39F6]/30 bg-[#4F39F6]/10 text-[#4F39F6] px-5 py-3 font-medium text-sm transition-all hover:bg-[#4F39F6]/15 hover:shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <section id="pricing" className="py-20 bg-muted/30 border-y border-border">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#4F39F6] mb-3">Upgrade</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Choose Your Plan</h2>
                    <p className="text-muted-foreground mt-3">Start free, then unlock pro quality when you are ready.</p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600">
                            Current plan: {currentPlanLabel}
                        </span>
                        {typeof currentCredits === "number" ? (
                            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">
                                Credits: {currentCredits}
                            </span>
                        ) : null}
                    </div>
                    <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-white p-1">
                        <button
                            type="button"
                            onClick={() => setSelectedChannel("stripe")}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                                selectedChannel === "stripe"
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            Stripe
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedChannel("paypal")}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                                selectedChannel === "paypal"
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            PayPal
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                            <Sparkles className="text-[#4F39F6]" size={18} />
                            Free
                        </div>
                        <p className="text-4xl font-bold mt-4">$0</p>
                        <p className="text-muted-foreground text-sm mt-2">Great for trying ideas and testing prompts.</p>
                        <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />2 guest generations / day</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />Standard resolution</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />Basic styles</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-[#4F39F6]/40 bg-[#4F39F6]/5 p-8 shadow-sm">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#4F39F6]/10 px-3 py-1 text-xs font-semibold text-[#4F39F6] tracking-wide">
                            <Crown size={14} />
                            PRO
                        </div>
                        <p className="text-4xl font-bold mt-4 text-foreground">$15<span className="text-base font-semibold text-muted-foreground">/month</span></p>
                        <p className="text-muted-foreground text-sm mt-1">or $72/year</p>
                        <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-[#4F39F6]" size={16} />666 credits per month</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-[#4F39F6]" size={16} />7,992 credits per year</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-[#4F39F6]" size={16} />HD downloads</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-[#4F39F6]" size={16} />Visualize + 3D STL export</li>
                        </ul>
                        <div className="mt-8 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => onSelectPlan("pro_monthly", selectedChannel)}
                                disabled={loadingPlan === "pro_monthly" || loadingPlan === "pro_yearly"}
                                className={primaryCta}
                            >
                                {loadingPlan === "pro_monthly" && loadingChannel === selectedChannel
                                    ? "Redirecting..."
                                    : selectedChannel === "paypal"
                                    ? "PayPal Monthly"
                                    : "Start Monthly"}
                            </button>
                            <button
                                onClick={() => onSelectPlan("pro_yearly", selectedChannel)}
                                disabled={loadingPlan === "pro_monthly" || loadingPlan === "pro_yearly"}
                                className={secondaryCta}
                            >
                                {loadingPlan === "pro_yearly" && loadingChannel === selectedChannel
                                    ? "Redirecting..."
                                    : selectedChannel === "paypal"
                                    ? "PayPal Yearly"
                                    : "Start Yearly"}
                            </button>
                        </div>
                        <p className="mt-3 text-xs text-slate-500">
                            Checkout channel: <span className="font-semibold text-slate-700">{selectedChannel === "stripe" ? "Stripe" : "PayPal"}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
