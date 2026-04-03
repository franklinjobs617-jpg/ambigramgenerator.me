"use client";

import { Link } from "@/i18n/routing";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { markSubscriptionActive } from "@/lib/billing-api";
import { trackEvent } from "@/lib/analytics";

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const plan = searchParams.get("plan");
        const safePlan = plan === "pro_yearly" ? "pro_yearly" : "pro_monthly";
        markSubscriptionActive(safePlan);
        trackEvent("checkout_success", {
            sessionId: searchParams.get("session_id") || "",
            planId: safePlan,
        });
    }, [searchParams]);

    return (
        <main className="bg-[#FDFDFF] min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-xl mx-auto rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
                <CheckCircle2 className="mx-auto text-emerald-500" size={48} />
                <h1 className="text-3xl font-black text-slate-900 mt-4">Payment Successful</h1>
                <p className="text-slate-600 mt-3">Your Pro access is now active on this device.</p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/ai-tattoo-generator" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black hover:bg-indigo-700 transition">
                        Back to Generator
                    </Link>
                    <Link href="/ai-tattoo-generator/3d-stl" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition">
                        Explore 3D STL
                    </Link>
                </div>
            </div>
        </main>
    );
}
