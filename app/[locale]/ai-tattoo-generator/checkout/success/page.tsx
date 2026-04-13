"use client";

import { Link } from "@/i18n/routing";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        const params = new URLSearchParams();
        params.set("channel", "stripe");
        if (sessionId) params.set("session_id", sessionId);
        trackEvent("checkout_success", {
            sessionId: sessionId || "",
        });
        router.replace(`/payment/success?${params.toString()}`);
    }, [router, searchParams]);

    return (
        <main className="bg-[#FDFDFF] min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-xl mx-auto rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
                <CheckCircle2 className="mx-auto text-emerald-500" size={48} />
                <h1 className="text-3xl font-black text-slate-900 mt-4">Payment Successful</h1>
                <p className="text-slate-600 mt-3">Verifying order and syncing your credits...</p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/payment/success?channel=stripe" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black hover:bg-indigo-700 transition">
                        Continue
                    </Link>
                    <Link href="/ai-tattoo-generator" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition">
                        Back to Generator
                    </Link>
                </div>
            </div>
        </main>
    );
}
