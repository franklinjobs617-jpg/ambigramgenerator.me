"use client";

import { useState } from "react";
import { X, CheckCircle2, Crown } from "lucide-react";
import type { PaymentChannel } from "@/lib/payment-types";

type PlanId = "pro_monthly" | "pro_yearly";

type UpgradeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelectPlan: (planId: PlanId, channel: PaymentChannel) => void;
    loadingPlan?: PlanId | null;
    loadingChannel?: PaymentChannel | null;
    currentPlan?: string;
    currentCredits?: number;
};

export default function UpgradeModal({
    isOpen,
    onClose,
    onSelectPlan,
    loadingPlan,
    loadingChannel,
    currentPlan,
    currentCredits,
}: UpgradeModalProps) {
    const [selectedChannel, setSelectedChannel] = useState<PaymentChannel>("stripe");
    if (!isOpen) return null;
    const normalizedPlan = (currentPlan || "free").toLowerCase();
    const isYearly = normalizedPlan.includes("year");
    const isPro =
        normalizedPlan.includes("pro") ||
        normalizedPlan.includes("premium") ||
        normalizedPlan.includes("ambigram");
    const currentPlanLabel = isPro ? (isYearly ? "Pro Yearly" : "Pro Monthly") : "Free";

    return (
        <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-sm p-4 flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-100 shadow-2xl p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                    aria-label="Close"
                >
                    <X size={18} className="mx-auto" />
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black tracking-wide">
                        <Crown size={14} />
                        Upgrade to Pro
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-4">Free limit reached</h3>
                    <p className="text-slate-500 mt-2">Unlock unlimited generations and premium exports now.</p>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
                        <span className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600">
                            Current plan: {currentPlanLabel}
                        </span>
                        {typeof currentCredits === "number" ? (
                            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">
                                Credits: {currentCredits}
                            </span>
                        ) : null}
                    </div>
                    <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
                        <button
                            type="button"
                            onClick={() => setSelectedChannel("stripe")}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                                selectedChannel === "stripe"
                                    ? "bg-indigo-600 text-white"
                                    : "text-slate-600 hover:bg-white"
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
                                    : "text-slate-600 hover:bg-white"
                            }`}
                        >
                            PayPal
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 p-6">
                        <p className="text-sm font-black text-slate-900">Pro Monthly</p>
                        <p className="text-3xl font-black text-slate-900 mt-2">$15<span className="text-sm text-slate-400">/month</span></p>
                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />666 credits monthly</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />HD downloads</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />Visualize mode</li>
                        </ul>
                        <button
                            onClick={() => onSelectPlan("pro_monthly", selectedChannel)}
                            disabled={loadingPlan === "pro_monthly" || loadingPlan === "pro_yearly"}
                            className="mt-5 w-full rounded-xl bg-indigo-600 text-white py-3 font-black hover:bg-indigo-700 transition disabled:opacity-60"
                        >
                            {loadingPlan === "pro_monthly" && loadingChannel === selectedChannel
                                ? "Redirecting..."
                                : selectedChannel === "paypal"
                                ? "PayPal Monthly"
                                : "Choose Monthly"}
                        </button>
                    </div>

                    <div className="rounded-2xl border-2 border-indigo-500 p-6 bg-indigo-50/60">
                        <p className="text-sm font-black text-indigo-700">Pro Yearly</p>
                        <p className="text-3xl font-black text-slate-900 mt-2">$72<span className="text-sm text-slate-400">/year</span></p>
                        <p className="text-xs text-indigo-700 font-semibold mt-1">Save 60% vs monthly</p>
                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />7,992 credits yearly</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />4x upscaled downloads</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />3D STL export</li>
                        </ul>
                        <button
                            onClick={() => onSelectPlan("pro_yearly", selectedChannel)}
                            disabled={loadingPlan === "pro_monthly" || loadingPlan === "pro_yearly"}
                            className="mt-5 w-full rounded-xl bg-indigo-700 text-white py-3 font-black hover:bg-indigo-800 transition disabled:opacity-60"
                        >
                            {loadingPlan === "pro_yearly" && loadingChannel === selectedChannel
                                ? "Redirecting..."
                                : selectedChannel === "paypal"
                                ? "PayPal Yearly"
                                : "Choose Yearly"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
