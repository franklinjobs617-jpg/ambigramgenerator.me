import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const QUICK_TEMPLATES = [
  {
    title: "Heartbeat + Two Names",
    style: "Line Art",
    prompt:
      "Create a clean heartbeat line with the names Emma and Noah for forearm tattoo, minimal line art, high readability",
  },
  {
    title: "Mirror Couple Script",
    style: "Minimal",
    prompt:
      "Generate mirrored couple tattoo design for Olivia and Liam, elegant script, balanced spacing, wrist placement",
  },
  {
    title: "Bold Traditional Pair",
    style: "Traditional",
    prompt:
      "Design bold traditional two-name tattoo with Ava and Mason, strong outline, chest placement",
  },
  {
    title: "Blackwork Name Lockup",
    style: "Blackwork",
    prompt:
      "Create blackwork two-name lockup for Sophia and Ethan, dense contrast, upper arm placement",
  },
];

const PROMPT_LIBRARY = [
  {
    title: "Two-Name Forearm Tattoo",
    summary: "Line-art, black ink, high legibility, stencil-ready.",
    image: "/name/4OAcw.webp",
    alt: "AI two-name forearm tattoo design for Mia and Lucas in line-art black ink style",
    prompt:
      "Create a two-name tattoo design for 'Mia' and 'Lucas' in clean line-art style, forearm placement, black ink only, high legibility at small size, balanced spacing, stencil-ready outlines, no background texture, no color, no watermark, exact spelling.",
  },
  {
    title: "Mirrored Couple Wrist Tattoo",
    summary: "Elegant script with controlled flourishes and clean baseline.",
    image: "/name/4PcTe.webp",
    alt: "Mirrored couple wrist tattoo concept for Lily and James with elegant script",
    prompt:
      "Generate a mirrored couple-name ambigram for 'Lily' and 'James', medium-size wrist tattoo concept, elegant script with controlled flourishes, strong baseline alignment, black ink monochrome, crisp edges for stencil transfer, exact readable letters, no decorative clutter.",
  },
  {
    title: "Heartbeat Name Inner Forearm Tattoo",
    summary: "Minimal ECG integration, high contrast, clean negative space.",
    image: "/name/625876806450ab6ffc4be1bc4f17c200_1775186334.webp",
    alt: "Heartbeat name tattoo design for Olivia and Noah on inner forearm",
    prompt:
      "Design a heartbeat-line name tattoo with 'Olivia' and 'Noah', minimalist inner-forearm composition, thin-to-medium stroke hierarchy, subtle ECG line integration, high contrast black-on-white, clear negative space, exact spelling, no gradient, no background scene.",
  },
  {
    title: "Wedding Name + Date Tattoo",
    summary: "Elegant hierarchy for names and date, readable at glance.",
    image: "/name/6468a95c0124ee51ef402817950e9e84_1775186749.webp",
    alt: "Wedding name and date tattoo concept with elegant typography for couple",
    prompt:
      "Create an elegant wedding tattoo concept with names 'Ava' and 'Liam' plus date '06.18.2027', refined typography, clean spacing and hierarchy, soft ornamental accents only, chest placement, monochrome black ink, stencil-friendly lines, readable text priority.",
  },
  {
    title: "Geometric Chest Name Tattoo",
    summary: "Symmetrical rhythm, medium-bold strokes, modern style.",
    image: "/name/8r5wt.webp",
    alt: "Geometric chest name tattoo design for Emma and Jack with bold structure",
    prompt:
      "Generate a geometric lettering tattoo for 'Emma' and 'Jack', chest placement, medium-bold strokes, symmetrical rhythm, modern minimal composition, black ink only, strong letter structure for distance readability, exact spelling, no distortion, no extra symbols.",
  },
  {
    title: "Traditional Shoulder Name Tattoo",
    summary: "Bold outline, serif accent, clear letter structure.",
    image: "/name/b13051907be2c51a18987876ca32385c_1775186703.webp",
    alt: "Traditional shoulder name tattoo concept for Chloe and Ben with bold outline",
    prompt:
      "Design a traditional-outline name tattoo for 'Chloe' and 'Ben', shoulder placement, subtle decorative serif influence, bold contour lines with simplified internal details, blackwork-ready readability, no color fill, no shading noise, exact text clarity.",
  },
  {
    title: "Feminine Script Upper-Arm Tattoo",
    summary: "High-contrast calligraphic flow with readable letterforms.",
    image: "/name/bfeYx.webp",
    alt: "Feminine script upper-arm tattoo design for Faith and Grace with clean readability",
    prompt:
      "Create an emotional two-word feminine script tattoo for 'Faith' and 'Grace', upper-arm placement, high-contrast calligraphic flow, graceful ligatures but readable letterforms, black ink only, balanced composition, stencil-ready edges, no ornate background.",
  },
  {
    title: "Symmetric Couple Lettering Tattoo",
    summary: "Forearm-friendly horizontal layout, distance readability.",
    image: "/name/d6530ad1e7ea1f77fbc3e55438517651_1775186784.webp",
    alt: "Symmetric couple lettering tattoo for Harper and Leo with forearm layout",
    prompt:
      "Generate symmetric couple lettering for 'Harper' and 'Leo', medium stroke thickness, forearm-friendly horizontal layout, high readability from distance, clean vector-like contour quality, monochrome black ink, exact spelling, no watermark, no extra objects.",
  },
  {
    title: "Fine-Line Couple Wrist Tattoo",
    summary: "Fine-line script with spacing tuned for small-area tattoos.",
    image: "/name/f1yLO.webp",
    alt: "Fine-line couple wrist tattoo concept for Aria and Miles in black ink",
    prompt:
      "Create a fine-line couple tattoo for 'Aria' and 'Miles', small wrist placement, elegant thin strokes but preserved readability, monochrome black ink, no blur, no watercolor effect, precise letter spacing, stencil-ready edges, exact spelling.",
  },
  {
    title: "Bold Ribcage Name Tattoo",
    summary: "Medium-thick high-contrast lettering for ribcage readability.",
    image: "/name/S7sVl.webp",
    alt: "Bold ribcage name tattoo design for Elena and Kai with high contrast lettering",
    prompt:
      "Generate a ribcage name tattoo for 'Elena' and 'Kai', medium-thick black strokes, structured serif-calligraphy hybrid, high readability from distance, minimal ornament, clean contour quality, no background objects, no extra symbols.",
  },
  {
    title: "Infinity + Two Names Tattoo",
    summary: "Infinity motif integrated with name hierarchy and clean flow.",
    image: "/name/ThU5J.webp",
    alt: "Infinity motif two-name tattoo concept for Nora and Evan on forearm",
    prompt:
      "Design a two-name tattoo with infinity symbol for 'Nora' and 'Evan', forearm composition, balanced hierarchy between names and symbol, black ink only, no excessive flourishes, smooth line continuity, stencil-friendly vector-like outline.",
  },
  {
    title: "Minimal Anniversary Name Tattoo",
    summary: "Minimal typography plus date lockup for elegant memory tattoos.",
    image: "/name/Xfcvy.webp",
    alt: "Minimal anniversary name tattoo with date lockup for Ivy and Logan",
    prompt:
      "Create a minimal anniversary tattoo with names 'Ivy' and 'Logan' plus date '09.14.2026', clean sans-serif + script blend, chest placement, black ink monochrome, precise alignment, readable at small scale, no texture, no gradient.",
  },
];

const FAQS = [
  {
    q: "How do I write a strong ai name tattoo generator prompt?",
    a: "Include two names, style, placement, and readability goal. Example: two-name line-art forearm tattoo, clean stencil, high contrast.",
  },
  {
    q: "What is the best placement for two-name tattoos?",
    a: "Forearm, wrist, and upper arm usually keep letter clarity best. Very curved areas may reduce readability.",
  },
  {
    q: "Can these outputs be used directly as final tattoo stencils?",
    a: "Use them as concept drafts. Final stencil cleanup should always be done by your tattoo artist.",
  },
  {
    q: "How can I improve letter readability?",
    a: "Use shorter names, avoid extra flourishes, increase stroke thickness, and test at small size before finalizing.",
  },
];

export const metadata: Metadata = {
  title: "AI Name Tattoo Generator: Two-Name, Couple & Heartbeat Ideas",
  description:
    "Use our ai name tattoo generator for couple names, heartbeat templates, mirrored scripts, and stencil-friendly two-name tattoo concepts.",
};

export default function AITattooNamesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Section - Clean Grid Layout */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 py-16 sm:py-20 lg:py-28 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                Specialized Page
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                AI Name Tattoo
                <br />
                <span className="text-muted-foreground">Generator</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Generate beautiful and readable two-name tattoos for couples,
                heartbeat layouts, mirrored scripts, and anniversary concepts.
                Every preset here is designed for tattoo use, not generic
                typography.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/ai-tattoo-generator?style=line-art&prompt=Create%20a%20clean%20two-name%20tattoo%20for%20Emma%20and%20Noah%20on%20forearm"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Start with Two-Name Template
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-tattoo-generator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm transition-all hover:bg-secondary active:scale-[0.98]"
                >
                  Open Main Studio
                </Link>
              </div>
            </div>

            {/* Image Grid - Bento Style */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-12 grid-rows-6 gap-2 sm:gap-3 aspect-square sm:aspect-[4/3]">
                {/* Large featured image */}
                <div className="col-span-7 row-span-4 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted">
                  <Image
                    src={PROMPT_LIBRARY[0].image}
                    alt={PROMPT_LIBRARY[0].alt}
                    fill
                    sizes="(max-width: 1024px) 60vw, 30vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-wider">
                      Featured
                    </span>
                    <p className="text-white font-semibold text-sm sm:text-base mt-0.5">
                      {PROMPT_LIBRARY[0].title}
                    </p>
                  </div>
                </div>
                {/* Top right image */}
                <div className="col-span-5 row-span-3 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted">
                  <Image
                    src={PROMPT_LIBRARY[1].image}
                    alt={PROMPT_LIBRARY[1].alt}
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover"
                  />
                </div>
                {/* Bottom left image */}
                <div className="col-span-4 row-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted">
                  <Image
                    src={PROMPT_LIBRARY[2].image}
                    alt={PROMPT_LIBRARY[2].alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 15vw"
                    className="object-cover"
                  />
                </div>
                {/* Bottom middle image */}
                <div className="col-span-4 row-span-3 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted">
                  <Image
                    src={PROMPT_LIBRARY[3].image}
                    alt={PROMPT_LIBRARY[3].alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 15vw"
                    className="object-cover"
                  />
                </div>
                {/* Bottom right small image */}
                <div className="col-span-4 row-span-3 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted">
                  <Image
                    src={PROMPT_LIBRARY[4].image}
                    alt={PROMPT_LIBRARY[4].alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 15vw"
                    className="object-cover"
                  />
                </div>
                {/* Stats card */}
                <div className="col-span-3 row-span-2 rounded-2xl sm:rounded-3xl bg-foreground text-background p-3 sm:p-4 flex flex-col justify-center">
                  <p className="text-2xl sm:text-3xl font-bold">12+</p>
                  <p className="text-[10px] sm:text-xs text-background/70 mt-1">
                    Curated Prompts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Templates */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Quick Start Templates
              </h2>
              <p className="mt-2 text-muted-foreground">
                Choose a template to get started instantly
              </p>
            </div>
            <Link
              href="/ai-tattoo-generator"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group"
            >
              Open Studio
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_TEMPLATES.map((item, index) => (
              <Link
                key={item.title}
                href={`/ai-tattoo-generator?style=${item.style.toLowerCase()}&prompt=${encodeURIComponent(
                  item.prompt
                )}`}
                className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-border bg-background hover:border-foreground/20 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                    {item.style}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                  {item.prompt}
                </p>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Use Template
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Library - Grid Layout */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Prompt Library
              </h2>
              <p className="mt-2 text-muted-foreground">
                12 curated tattoo-ready prompts
              </p>
            </div>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {PROMPT_LIBRARY.map((item) => (
              <article
                key={item.title}
                className="group flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 hover:shadow-sm transition-all duration-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4 sm:p-5">
                  <h3 className="font-semibold text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                  <details className="mt-4 group/details">
                    <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground transition-colors list-none flex items-center gap-2">
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-open/details:rotate-180" />
                      View Full Prompt
                    </summary>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed p-3 rounded-lg bg-muted/50">
                      {item.prompt}
                    </p>
                  </details>
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/ai-tattoo-generator?prompt=${encodeURIComponent(
                        item.prompt
                      )}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-medium transition-all hover:opacity-90 active:scale-[0.98]"
                    >
                      Use This Prompt
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              FAQ: Name Tattoo Prompts
            </h2>
            <p className="mt-2 text-muted-foreground">
              Common questions about creating name tattoo designs
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, index) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 transition-all duration-200"
                open={index === 0}
              >
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none font-medium text-foreground text-left">
                  {item.q}
                  <ChevronDown className="w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="relative rounded-3xl border border-border bg-muted/30 p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground max-w-2xl mx-auto text-balance">
              Ready to create your personalized name tattoo?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Use our professional tools to generate unique two-name tattoo
              designs in minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ai-tattoo-generator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Start Designing Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
