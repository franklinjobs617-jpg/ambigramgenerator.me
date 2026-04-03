"use client";

import { Link } from "@/i18n/routing";
import { useEffect } from "react";
import { XCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CheckoutCancelPage() {
    useEffect(() => {
        trackEvent("checkout_cancel", { sourcePage: "ai-tattoo-generator" });
    }, []);

    return (
        <main className="bg-[#FDFDFF] min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <XCircle className="mx-auto text-amber-500" size={48} />
                <h1 className="text-3xl font-black text-slate-900 mt-4">Checkout Canceled</h1>
                <p className="text-slate-600 mt-3">No charge was made. You can continue using the free plan anytime.</p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/ai-tattoo-generator" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black hover:bg-indigo-700 transition">
                        Back to Generator
                    </Link>
                    <Link href="/ai-tattoo-generator#pricing" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition">
                        View Pricing
                    </Link>
                </div>
            </div>
        </main>
    );
}
