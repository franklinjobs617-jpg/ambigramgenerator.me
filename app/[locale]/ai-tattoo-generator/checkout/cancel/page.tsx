"use client";

import { Link } from "@/i18n/routing";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CheckoutCancelPage() {
    const router = useRouter();

    useEffect(() => {
        trackEvent("checkout_cancel", { sourcePage: "ai-tattoo-generator" });
        router.replace("/payment/cancel?channel=stripe");
    }, [router]);

    return (
        <main className="bg-[#FDFDFF] min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <XCircle className="mx-auto text-amber-500" size={48} />
                <h1 className="text-3xl font-black text-slate-900 mt-4">Checkout Canceled</h1>
                <p className="text-slate-600 mt-3">Redirecting to payment cancel page...</p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/payment/cancel?channel=stripe" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black hover:bg-indigo-700 transition">
                        Continue
                    </Link>
                </div>
            </div>
        </main>
    );
}
