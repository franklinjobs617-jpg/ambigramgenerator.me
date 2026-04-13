import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Canceled | AmbigramGenerator",
  description: "Payment was canceled. Return to pricing to retry checkout anytime.",
  alternates: {
    canonical: "/payment/cancel",
  },
};

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-12 sm:px-6">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-center sm:p-8">
        <AlertCircle className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Payment canceled</h1>
        <p className="mt-2 text-sm text-slate-600">
          No charge was made. You can return to pricing any time to complete checkout.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/ai-tattoo-generator#pricing"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white hover:bg-indigo-700"
          >
            Back to Pricing
          </Link>
          <Link
            href="/ai-tattoo-generator"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Back to Generator
          </Link>
        </div>
      </section>
    </main>
  );
}
