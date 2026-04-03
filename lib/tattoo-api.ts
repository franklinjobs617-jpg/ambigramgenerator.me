export type TattooStyle = "line-art" | "traditional" | "minimal" | "blackwork";

export interface GenerateTattooRequest {
    prompt: string;
    style: TattooStyle;
    placement: string;
    size: string;
    locale: string;
}

export interface GenerateTattooResponse {
    jobId: string;
    status: "queued" | "processing" | "completed" | "failed";
    previewUrl?: string;
    finalUrl?: string;
    errorCode?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function createMockSvg(prompt: string, style: TattooStyle) {
    const safePrompt = prompt.slice(0, 36);
    const styleLabel = style.replace("-", " ").toUpperCase();
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#bg)"/>
      <rect x="72" y="72" width="880" height="880" rx="40" fill="none" stroke="#6366f1" stroke-width="6" opacity="0.55"/>
      <text x="512" y="424" text-anchor="middle" fill="#e2e8f0" font-size="42" font-family="Arial" opacity="0.85">AI TATTOO PREVIEW</text>
      <text x="512" y="502" text-anchor="middle" fill="#a5b4fc" font-size="32" font-family="Arial" opacity="0.9">${styleLabel}</text>
      <text x="512" y="596" text-anchor="middle" fill="#ffffff" font-size="38" font-family="Arial" font-weight="bold">${safePrompt.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>
      <text x="512" y="684" text-anchor="middle" fill="#94a3b8" font-size="24" font-family="Arial">Powered by fal.ai + FLUX (mock)</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export async function generateTattoo(req: GenerateTattooRequest): Promise<GenerateTattooResponse> {
    await sleep(1400);
    const jobId = `job_${Date.now()}`;
    const output = createMockSvg(req.prompt, req.style);

    return {
        jobId,
        status: "completed",
        previewUrl: output,
        finalUrl: output,
    };
}

export async function getGenerationStatus(jobId: string): Promise<GenerateTattooResponse> {
    await sleep(300);
    return {
        jobId,
        status: "completed",
    };
}
