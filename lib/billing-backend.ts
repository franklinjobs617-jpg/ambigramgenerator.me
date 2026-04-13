export function getBillingBackendBaseUrl(): string {
  const candidates = [
    process.env.BILLING_BASE_URL,
    process.env.NEXT_PUBLIC_BILLING_BASE_URL,
    process.env.AUTH_BASE_URL,
    process.env.NEXT_PUBLIC_AUTH_BASE_URL,
    "https://api.ambigramgenerator.me",
  ];
  const baseUrl =
    candidates.find(
      (item) => typeof item === "string" && item.trim().length > 0
    )?.trim() || "";

  return baseUrl.replace(/\/+$/, "");
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const { timeoutMs = 15000, ...requestInit } = init;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...requestInit,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
