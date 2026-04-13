import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AUTH_APP_TYPE = process.env.AI_TATTOO_AUTH_APP_TYPE || "ambigr";

function getBackendBaseUrl() {
  const value =
    process.env.AI_TATTOO_BACKEND_URL ||
    process.env.NEXT_PUBLIC_AI_TATTOO_BACKEND_URL ||
    "https://ytdlp.vistaflyer.com";
  return value.replace(/\/+$/, "");
}

function buildAuthHeader(req: NextRequest) {
  const direct = req.headers.get("authorization");
  if (direct) return direct;
  const raw = req.headers.get("x-auth-token");
  if (!raw) return "";
  return raw.toLowerCase().startsWith("bearer ") ? raw : `Bearer ${raw}`;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { status: "failed", code: "INVALID_JSON", message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const backendUrl = `${getBackendBaseUrl()}/api/tattoo/flux/create`;
  const authHeader = buildAuthHeader(req);
  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const realIp = req.headers.get("x-real-ip") || "";
  const userAgent = req.headers.get("user-agent") || "";
  const appType = req.headers.get("x-app-type") || req.headers.get("x-product-type") || AUTH_APP_TYPE;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "User-Agent": userAgent,
    "X-App-Type": appType,
    "X-Product-Type": appType,
  };
  if (authHeader) headers.Authorization = authHeader;
  if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;
  if (realIp) headers["X-Real-IP"] = realIp;

  try {
    const resp = await fetch(backendUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await resp.text();
    let payload: unknown = {};
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = {
        status: "failed",
        code: "BACKEND_BAD_JSON",
        message: "Generation service returned an unexpected response. Please retry in a moment.",
      };
    }

    return NextResponse.json(payload, { status: resp.status });
  } catch {
    return NextResponse.json(
      {
        status: "failed",
        code: "BACKEND_UNREACHABLE",
        message: "Generation backend is unavailable. Please retry shortly.",
      },
      { status: 502 },
    );
  }
}

