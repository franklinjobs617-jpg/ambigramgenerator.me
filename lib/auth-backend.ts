export type RemoteAuthUser = {
  id?: string;
  email?: string;
  googleUserId?: string;
  name?: string;
  picture?: string;
  credits?: number;
  plan?: string;
};

const AUTH_APP_TYPE = process.env.AI_TATTOO_AUTH_APP_TYPE || "ambigr";

function parseNumberish(value: unknown): number | undefined {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
      ? Number(value)
      : NaN;
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function getAuthBackendBaseUrl(): string {
  const baseUrl =
    process.env.AUTH_BASE_URL ||
    process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
    "https://api.ambigramgenerator.me";

  return baseUrl.replace(/\/+$/, "");
}

export function getBearerTokenFromHeaders(headers: Headers): string | null {
  const authHeader = headers.get("authorization") || headers.get("Authorization");
  if (!authHeader) return null;
  if (!authHeader.toLowerCase().startsWith("bearer ")) return null;
  return authHeader.slice(7).trim();
}

export async function fetchAuthUserByToken(
  token: string
): Promise<RemoteAuthUser | null> {
  try {
    const authBaseUrl = getAuthBackendBaseUrl();
    const response = await fetch(
      `${authBaseUrl}/prod-api/g/getUser?type=${encodeURIComponent(
        AUTH_APP_TYPE
      )}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
          "X-App-Type": AUTH_APP_TYPE,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) return null;
    const payload = (await response.json()) as {
      data?: RemoteAuthUser & { credits?: unknown };
    };
    const user = payload?.data;
    if (!user) return null;

    const normalizedId = user.id || user.googleUserId || user.email;
    if (!normalizedId) return null;

    return {
      ...user,
      id: normalizedId,
      credits: parseNumberish(user.credits),
    };
  } catch {
    return null;
  }
}
