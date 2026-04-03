export interface CheckoutRequest {
    planId: "pro_monthly" | "pro_yearly";
    locale: string;
    sourcePage: string;
}

export interface CheckoutResponse {
    checkoutUrl: string;
    sessionId: string;
}

export interface SubscriptionStatus {
    isPro: boolean;
    planId?: "pro_monthly" | "pro_yearly";
    renewAt?: string;
}

const SUBSCRIPTION_STORAGE_KEY = "ambigram_subscription_status_v1";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getLocalePrefix(locale: string) {
    return locale === "en" ? "" : `/${locale}`;
}

export async function createCheckoutSession(req: CheckoutRequest): Promise<CheckoutResponse> {
    await sleep(800);
    const sessionId = `cs_test_${Date.now()}`;
    const localePrefix = getLocalePrefix(req.locale);

    return {
        checkoutUrl: `${localePrefix}/ai-tattoo-generator/checkout/success?session_id=${sessionId}&plan=${req.planId}`,
        sessionId,
    };
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
    await sleep(120);
    if (typeof window === "undefined") return { isPro: false };
    const raw = window.localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    if (!raw) return { isPro: false };

    try {
        return JSON.parse(raw) as SubscriptionStatus;
    } catch {
        return { isPro: false };
    }
}

export function markSubscriptionActive(planId: "pro_monthly" | "pro_yearly") {
    if (typeof window === "undefined") return;
    const renewAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const status: SubscriptionStatus = { isPro: true, planId, renewAt };
    window.localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(status));
}

export function clearSubscription() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(SUBSCRIPTION_STORAGE_KEY);
}
