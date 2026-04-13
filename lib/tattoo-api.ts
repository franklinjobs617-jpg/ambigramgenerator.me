import { getStoredAuthToken } from "@/lib/auth-session";

export type TattooStyle = "line-art" | "traditional" | "minimal" | "blackwork";
export type TattooResolution = "1K" | "2K";

export interface GenerateTattooRequest {
  prompt: string;
  style: TattooStyle;
  placement: string;
  size: string;
  resolution: TattooResolution;
  locale: string;
}

export interface GenerateTattooResponse {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  previewUrl?: string;
  finalUrl?: string;
  errorCode?: string;
  code?: string;
  message?: string;
  pollAfterMs?: number;
  access?: {
    mode?: "guest" | "paid";
    userEmail?: string;
    remainingCredits?: number;
    creditsUsed?: number;
    resolution?: TattooResolution;
    debitStatus?: "pending" | "completed" | "failed";
    guestQuota?: {
      daily_limit: number;
      attempts_used: number;
      attempts_left: number;
    };
  };
}

export class TattooApiError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(message: string, status: number, code: string, details?: unknown) {
    super(message);
    this.name = "TattooApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const POLL_INTERVAL_MS = 1100;
const POLL_TIMEOUT_MS = 120_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function sanitizeUserMessage(value: unknown): string {
  if (typeof value !== "string") return "";
  const raw = value.trim();
  if (!raw) return "";
  if (/<\/?[a-z][\s\S]*>/i.test(raw)) return "";
  const compact = raw.replace(/\s+/g, " ").trim();
  return compact.length > 180 ? `${compact.slice(0, 177)}...` : compact;
}

function parseErrorPayload(payload: unknown, fallbackStatus: number) {
  if (!isRecord(payload)) {
    return {
      message: "Generation failed. Please try again.",
      code: "GENERATION_FAILED",
    };
  }
  const sanitizedMessage = sanitizeUserMessage(payload.message);
  const message = sanitizedMessage || "Generation failed. Please try again.";
  const code = typeof payload.code === "string" && payload.code.trim()
    ? payload.code.trim()
    : fallbackStatus === 401
      ? "LOGIN_REQUIRED"
      : fallbackStatus === 402
        ? "PAYMENT_REQUIRED"
        : fallbackStatus === 429
          ? "GUEST_LIMIT_EXCEEDED"
          : "GENERATION_FAILED";
  return { message, code };
}

function buildHeaders(): HeadersInit {
  const token = getStoredAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["X-Auth-Token"] = token;
  }
  return headers;
}

function normalizeResponse(payload: unknown): GenerateTattooResponse {
  if (!isRecord(payload)) {
    throw new TattooApiError("Generation failed. Invalid response payload.", 502, "INVALID_RESPONSE", payload);
  }
  return payload as unknown as GenerateTattooResponse;
}

async function fetchTattooJson(url: string, init: RequestInit): Promise<GenerateTattooResponse> {
  const response = await fetch(url, init);
  const text = await response.text();
  let payload: unknown = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = {
      message: text || "Generation failed. Please try again.",
      code: "BACKEND_BAD_JSON",
    };
  }

  if (!response.ok) {
    const parsed = parseErrorPayload(payload, response.status);
    throw new TattooApiError(parsed.message, response.status, parsed.code, payload);
  }

  return normalizeResponse(payload);
}

async function createTattooTask(req: GenerateTattooRequest): Promise<GenerateTattooResponse> {
  return fetchTattooJson("/api/ai-tattoo/create", {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(req),
    cache: "no-store",
  });
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function getGenerationStatus(jobId: string): Promise<GenerateTattooResponse> {
  const encoded = encodeURIComponent(jobId);
  return fetchTattooJson(`/api/ai-tattoo/status?taskId=${encoded}`, {
    method: "GET",
    headers: buildHeaders(),
    cache: "no-store",
  });
}

export async function generateTattoo(req: GenerateTattooRequest): Promise<GenerateTattooResponse> {
  let task = {} as GenerateTattooResponse;
  try {
    task = await createTattooTask(req);
  } catch (error) {
    if (error instanceof TattooApiError && error.status === 404) {
      throw new TattooApiError(
        "Async generation endpoint is not available yet. Please deploy the latest backend and retry.",
        502,
        "ASYNC_ENDPOINT_UNAVAILABLE",
        error.details,
      );
    }
    throw error;
  }

  if (task.status === "completed") {
    return task;
  }
  if (task.status === "failed") {
    throw new TattooApiError(
      task.message || "Generation failed. Please try again.",
      502,
      task.code || "GENERATION_FAILED",
      task,
    );
  }
  if (!task.jobId) {
    throw new TattooApiError("Generation task was created without jobId.", 502, "MISSING_JOB_ID", task);
  }

  const startedAt = Date.now();
  let current = task;
  while (Date.now() - startedAt <= POLL_TIMEOUT_MS) {
    const waitMsRaw = typeof current.pollAfterMs === "number" ? current.pollAfterMs : POLL_INTERVAL_MS;
    const waitMs = Math.max(600, Math.min(5000, waitMsRaw));
    await sleep(waitMs);

    current = await getGenerationStatus(task.jobId);
    if (current.status === "completed") {
      return current;
    }
    if (current.status === "failed") {
      throw new TattooApiError(
        current.message || "Generation failed. Please try again.",
        502,
        current.code || "GENERATION_FAILED",
        current,
      );
    }
  }

  throw new TattooApiError(
    "Generation is taking longer than expected. Please retry in a moment.",
    504,
    "GENERATION_TIMEOUT",
    { jobId: task.jobId },
  );
}
