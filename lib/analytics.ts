export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
    if (typeof window === "undefined") return;

    const payload = {
        event: eventName,
        ...params,
        timestamp: new Date().toISOString(),
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
}

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}
