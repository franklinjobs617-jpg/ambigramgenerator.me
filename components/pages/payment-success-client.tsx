"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Sparkles,
} from "lucide-react";
import { verifyPayment } from "@/lib/payment-gateway-client";
import type { PaymentChannel, PaymentVerifyRequest } from "@/lib/payment-types";
import { useAuth } from "@/components/providers/auth-provider";
import { trackEvent } from "@/lib/analytics";

type VerifyStatus = "verifying" | "success" | "pending" | "error";

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function normalizePlanLabel(rawPlan?: string): string {
  const normalized = (rawPlan || "free").toLowerCase();
  if (
    normalized.includes("pro") ||
    normalized.includes("premium") ||
    normalized.includes("ambigram")
  ) {
    if (normalized.includes("year") || normalized.includes("annual")) {
      return "Pro Yearly";
    }
    return "Pro Monthly";
  }
  return "Free";
}

export function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser, user } = useAuth();
  const [status, setStatus] = useState<VerifyStatus>("verifying");
  const [message, setMessage] = useState("Verifying your payment status...");
  const [attemptCount, setAttemptCount] = useState(0);
  const [redirectSeconds, setRedirectSeconds] = useState<number | null>(null);
  const successRedirectTimerRef = useRef<number | null>(null);
  const successCountdownTimerRef = useRef<number | null>(null);
  const channelParam = searchParams.get("channel");

  const verifyRequest = useMemo<PaymentVerifyRequest | null>(() => {
    const channel: PaymentChannel =
      channelParam === "paypal" || channelParam === "stripe"
        ? channelParam
        : searchParams.get("session_id")
        ? "stripe"
        : "paypal";

    const sessionId = searchParams.get("session_id") || undefined;
    const orderId = searchParams.get("order_id") || undefined;
    const legacyToken = searchParams.get("token") || searchParams.get("ba_token");
    const subscriptionId =
      searchParams.get("subscription_id") || legacyToken || undefined;
    const payerId =
      searchParams.get("payer_id") ||
      searchParams.get("PayerID") ||
      searchParams.get("payerID") ||
      undefined;

    if (!sessionId && !orderId && !subscriptionId) {
      return null;
    }

    return {
      channel,
      sessionId,
      orderId,
      subscriptionId,
      payerId,
      paypalIntent: subscriptionId
        ? "subscription"
        : orderId
        ? "capture"
        : undefined,
    };
  }, [channelParam, searchParams]);

  useEffect(() => {
    let cancelled = false;

    const runVerification = async () => {
      if (!verifyRequest) {
        setStatus("error");
        setMessage("Missing payment identifier. Please contact support if you were charged.");
        return;
      }

      const maxAttempts = verifyRequest.channel === "stripe" ? 30 : 12;

      for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        if (cancelled) return;
        setAttemptCount(attempt);

        const result = await verifyPayment(verifyRequest);
        if (!result.ok) {
          if (attempt === maxAttempts) {
            setStatus("error");
            setMessage(result.error.message || "Could not verify payment.");
            trackEvent("pay_verify_fail", {
              channel: verifyRequest.channel,
              code: result.error.code,
              attempt,
            });
            return;
          }
          setMessage("Finalizing your payment. Please wait...");
          await wait(2000);
          continue;
        }

        if (result.data.paymentStatus === "paid") {
          await refreshUser();
          setStatus("success");
          setMessage("Payment confirmed and credits were updated.");
          trackEvent("pay_verify_success", {
            channel: verifyRequest.channel,
            paymentStatus: result.data.paymentStatus,
          });

          const postPaymentRedirect = window.sessionStorage.getItem(
            "postPaymentRedirect"
          );
          const delayMs = 4000;
          setRedirectSeconds(Math.floor(delayMs / 1000));
          successCountdownTimerRef.current = window.setInterval(() => {
            setRedirectSeconds((current) => {
              if (typeof current !== "number") return null;
              if (current <= 1) return 0;
              return current - 1;
            });
          }, 1000);
          if (postPaymentRedirect) {
            window.sessionStorage.removeItem("postPaymentRedirect");
            successRedirectTimerRef.current = window.setTimeout(() => {
              router.replace(postPaymentRedirect);
            }, delayMs);
          }
          return;
        }

        if (result.data.paymentStatus === "pending") {
          if (attempt === maxAttempts) {
            setStatus("pending");
            setMessage("Payment is still processing. Credits should update shortly.");
            return;
          }
          setMessage("Payment is processing. We are checking again...");
          await wait(2000);
          continue;
        }

        setStatus("error");
        setMessage("Payment was not completed. Please retry from pricing.");
        trackEvent("pay_verify_fail", {
          channel: verifyRequest.channel,
          code: "PAYMENT_NOT_COMPLETED",
        });
        return;
      }
    };

    void runVerification();
    return () => {
      cancelled = true;
      if (successRedirectTimerRef.current !== null) {
        window.clearTimeout(successRedirectTimerRef.current);
      }
      if (successCountdownTimerRef.current !== null) {
        window.clearInterval(successCountdownTimerRef.current);
      }
    };
  }, [refreshUser, router, verifyRequest]);

  const displayId =
    verifyRequest?.subscriptionId ||
    verifyRequest?.orderId ||
    verifyRequest?.sessionId ||
    "-";
  const channelLabel = verifyRequest?.channel === "paypal" ? "PayPal" : "Stripe";
  const planLabel = normalizePlanLabel(user?.plan);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-12 sm:px-6">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {status === "verifying" ? (
          <div className="text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-indigo-600" />
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
              Verifying payment
            </h1>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
            <p className="mt-1 text-xs text-slate-500">
              Attempt {attemptCount} / {verifyRequest?.channel === "stripe" ? 30 : 12}
            </p>
          </div>
        ) : null}

        {status === "success" ? (
          <div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white ring-2 ring-emerald-200">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              </div>
              <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                Payment Confirmed
              </p>
              <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
                Payment successful
              </h1>
              <p className="mt-2 text-sm text-slate-600">{message}</p>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-[120px_1fr] border-b border-slate-200 px-4 py-3 text-sm">
                <span className="font-semibold text-slate-900">Payment ID</span>
                <span className="truncate text-slate-600">{displayId}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] border-b border-slate-200 px-4 py-3 text-sm">
                <span className="font-semibold text-slate-900">Channel</span>
                <span className="text-slate-600">{channelLabel}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] border-b border-slate-200 px-4 py-3 text-sm">
                <span className="font-semibold text-slate-900">Plan</span>
                <span className="text-slate-600">{planLabel}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] px-4 py-3 text-sm">
                <span className="font-semibold text-slate-900">Credits</span>
                <span className="text-slate-600">
                  {typeof user?.credits === "number" ? user.credits : "-"}
                </span>
              </div>
            </div>

            {typeof redirectSeconds === "number" && redirectSeconds > 0 ? (
              <p className="mt-3 text-center text-xs text-slate-500">
                Redirecting automatically in {redirectSeconds}s...
              </p>
            ) : null}

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/ai-tattoo-generator"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Back to Generator
              </Link>
              <Link
                href="/ai-tattoo-generator#pricing"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Open Pricing
              </Link>
            </div>
          </div>
        ) : null}

        {status === "pending" ? (
          <div className="text-center">
            <Clock3 className="mx-auto h-10 w-10 text-amber-500" />
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
              Payment processing
            </h1>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Check Again
              </button>
              <Link
                href="/ai-tattoo-generator"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Back to Generator
              </Link>
            </div>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-red-500" />
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
              Payment verification failed
            </h1>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/ai-tattoo-generator#pricing"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Retry Checkout
              </Link>
              <Link
                href="/ai-tattoo-generator"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Back to Generator
              </Link>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
