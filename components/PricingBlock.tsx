"use client";

import { CheckCircle2, Crown, Sparkles } from "lucide-react";

type PlanId = "pro_monthly" | "pro_yearly";

type PricingBlockProps = {
    onSelectPlan: (planId: PlanId) => void;
    loadingPlan?: PlanId | null;
};

export default function PricingBlock({ onSelectPlan, loadingPlan }: PricingBlockProps) {
    return (
        <section id="pricing" className="py-20 bg-slate-50 border-y border-slate-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-xs tracking-[0.2em] uppercase font-black text-indigo-600 mb-3">Upgrade</p>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900">Choose Your Plan</h2>
                    <p className="text-slate-500 mt-3 font-medium">Start free, then unlock pro quality when you are ready.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-900 font-black">
                            <Sparkles className="text-indigo-500" size={18} />
                            Free
                        </div>
                        <p className="text-4xl font-black mt-4">$0</p>
                        <p className="text-slate-500 text-sm mt-2">Great for trying ideas and testing prompts.</p>
                        <ul className="mt-6 space-y-3 text-sm text-slate-700">
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />3 generations / day</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />Standard resolution</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} />Basic styles</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 shadow-xl text-white">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black tracking-wide">
                            <Crown size={14} />
                            PRO
                        </div>
                        <p className="text-4xl font-black mt-4">$15<span className="text-base font-semibold text-indigo-100">/month</span></p>
                        <p className="text-indigo-100 text-sm mt-1">or $72/year</p>
                        <ul className="mt-6 space-y-3 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} />Unlimited generations</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} />HD downloads</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={16} />Visualize + 3D STL export</li>
                        </ul>
                        <div className="mt-8 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => onSelectPlan("pro_monthly")}
                                disabled={loadingPlan === "pro_monthly" || loadingPlan === "pro_yearly"}
                                className="rounded-xl bg-white text-indigo-700 px-4 py-3 font-black text-sm hover:bg-indigo-50 transition disabled:opacity-60"
                            >
                                {loadingPlan === "pro_monthly" ? "Redirecting..." : "Start Monthly"}
                            </button>
                            <button
                                onClick={() => onSelectPlan("pro_yearly")}
                                disabled={loadingPlan === "pro_monthly" || loadingPlan === "pro_yearly"}
                                className="rounded-xl bg-indigo-500/60 border border-indigo-300/50 text-white px-4 py-3 font-black text-sm hover:bg-indigo-500 transition disabled:opacity-60"
                            >
                                {loadingPlan === "pro_yearly" ? "Redirecting..." : "Start Yearly"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
