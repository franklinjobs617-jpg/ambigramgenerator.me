import type { PaymentPlanCode } from "@/lib/payment-types";

export const PAYMENTS_ENABLED =
  process.env.NEXT_PUBLIC_PAYMENTS_ENABLED !== "false";

export const BILLING_BASE_URL =
  process.env.NEXT_PUBLIC_BILLING_BASE_URL ||
  process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
  "https://api.ambigramgenerator.me";

export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

export function isKnownPlanCode(value: string): value is PaymentPlanCode {
  return value === "pro_monthly" || value === "pro_yearly";
}

export function mapPlanCodeToBackend(planCode: PaymentPlanCode): string {
  const map: Record<PaymentPlanCode, string> = {
    pro_monthly:
      process.env.BILLING_PLAN_PRO_MONTHLY || "ambigram_pro_monthly",
    pro_yearly:
      process.env.BILLING_PLAN_PRO_YEARLY || "ambigram_pro_yearly",
  };

  return map[planCode];
}
