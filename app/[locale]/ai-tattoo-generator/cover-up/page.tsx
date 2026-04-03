import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const QUICK_TEMPLATES = [
  {
    title: "Floral Blackout Cover",
    style: "Blackwork",
    prompt:
      "Create a dense floral blackout cover-up tattoo design for forearm, dark botanical elements, high coverage, thick black ink",
  },
  {
    title: "Geometric Overlay",
    style: "Geometric",
    prompt:
      "Generate geometric overlay cover-up tattoo, sacred geometry patterns, medium-dark shading, upper arm placement",
  },
  {
    title: "Dark Wildlife Camouflage",
    style: "Realism",
    prompt:
      "Design realistic dark wildlife cover-up tattoo, wolf or raven theme, heavy shading for scar coverage, shoulder placement",
  },
  {
    title: "Neo-Traditional Rose",
    style: "Neo-Traditional",
    prompt:
      "Create neo-traditional rose cover-up design, bold outlines, rich dark fills, forearm placement, high contrast",
  },
];

const PROMPT_LIBRARY = [
  {
    title: "Blackout Floral Forearm Cover-Up",
    summary: "Dense botanical blackwork with high coverage for old tattoos.",
    image: "/coverup/cover1.webp",
    alt: "Blackout floral cover-up tattoo design for forearm with dense botanical elements",
    prompt:
      "Create a dense blackout floral cover-up tattoo for forearm placement, dark botanical elements including roses and leaves, heavy black saturation for maximum coverage of existing tattoo, bold outlines with solid fills, no color, no watermark, stencil-ready design.",
  },
  {
    title: "Geometric Sacred Overlay",
    summary:
      "Sacred geometry patterns with layered depth for seamless coverage.",
    image: "/coverup/cover2.webp",
    alt: "Geometric sacred geometry cover-up tattoo with layered mandala patterns",
    prompt:
      "Generate a geometric cover-up tattoo using sacred geometry patterns, mandala-inspired layered design, medium-to-dark shading gradients, upper arm placement, precise linework with dotwork accents, black ink only, suitable for covering faded tribal tattoos.",
  },
  {
    title: "Dark Raven Realism Cover",
    summary:
      "Photorealistic raven with heavy shadows for scar and tattoo coverage.",
    image: "/coverup/cover3.webp",
    alt: "Realistic dark raven cover-up tattoo with heavy shadow work",
    prompt:
      "Design a photorealistic raven cover-up tattoo, dramatic dark shading with deep blacks, feather detail with shadow depth, shoulder to upper arm placement, suitable for covering old black tattoos or scars, monochrome black ink, high contrast composition.",
  },
  {
    title: "Neo-Traditional Rose Cluster",
    summary: "Bold rose composition with rich dark fills for forearm coverage.",
    image: "/coverup/cover4.webp",
    alt: "Neo-traditional rose cluster cover-up tattoo with bold outlines",
    prompt:
      "Create a neo-traditional rose cluster cover-up tattoo, three overlapping roses with bold black outlines, rich dark gradient fills, decorative leaves, forearm placement, high contrast between light and shadow areas, stencil-friendly design for covering old script tattoos.",
  },
  {
    title: "Japanese Koi Blackwork",
    summary: "Traditional koi fish with wave patterns for large area coverage.",
    image: "/coverup/cover5.webp",
    alt: "Japanese koi fish blackwork cover-up tattoo with wave patterns",
    prompt:
      "Generate a Japanese-style koi fish cover-up tattoo in blackwork style, dynamic wave patterns, bold traditional composition, half-sleeve placement, heavy black fills with white negative space, suitable for covering multiple small tattoos, no color, clean stencil lines.",
  },
  {
    title: "Dark Forest Silhouette",
    summary: "Dense treeline silhouette for band-style coverage around arm.",
    image: "/coverup/cover6.webp",
    alt: "Dark forest silhouette band cover-up tattoo design",
    prompt:
      "Design a dark forest silhouette cover-up tattoo, dense pine treeline forming armband, solid black silhouettes with gradient sky, forearm or bicep band placement, continuous wrap-around composition, ideal for covering bracelet or band tattoos, monochrome black ink.",
  },
  {
    title: "Ornamental Mandala Shield",
    summary: "Intricate mandala with dense patterns for centered coverage.",
    image: "/coverup/cover7.webp",
    alt: "Ornamental mandala shield cover-up tattoo with intricate patterns",
    prompt:
      "Create an ornamental mandala cover-up tattoo, shield-shaped composition with intricate geometric patterns, dotwork and linework combination, chest or back placement, dense center for maximum coverage, radiating design that hides irregular shapes, black ink only.",
  },
  {
    title: "Blackwork Snake Wrap",
    summary:
      "Serpent design with coiling composition for linear scar coverage.",
    image: "/coverup/cover8.webp",
    alt: "Blackwork snake wrap cover-up tattoo with coiling design",
    prompt:
      "Generate a blackwork snake cover-up tattoo, coiling serpent with detailed scales, wrapping composition ideal for linear scars or text, forearm placement, bold black fills with fine scale detail, dramatic head positioning, stencil-ready outlines, no color.",
  },
  {
    title: "Dark Peony Composition",
    summary: "Oversized peony bloom with dark shading for maximum coverage.",
    image: "/coverup/cover9.webp",
    alt: "Dark peony cover-up tattoo with oversized bloom composition",
    prompt:
      "Design a dark peony cover-up tattoo, oversized single bloom with multiple petal layers, heavy black shading from center outward, subtle leaf accents, upper arm or thigh placement, soft edges blending into skin, ideal for covering circular or irregular old tattoos.",
  },
  {
    title: "Tribal Blackout Refresh",
    summary: "Modern blackwork overlay to transform outdated tribal designs.",
    image: "/coverup/cover10.webp",
    alt: "Tribal blackout refresh cover-up tattoo with modern blackwork",
    prompt:
      "Create a tribal blackout refresh cover-up tattoo, modern blackwork patterns overlaying old tribal, geometric shapes with solid fills, shoulder to upper arm flow, seamless integration with existing black ink, dense coverage design, no color, bold contemporary style.",
  },
  {
    title: "Dark Botanical Sleeve Section",
    summary: "Mixed botanical elements for half-sleeve coverage projects.",
    image: "/coverup/cover11.webp",
    alt: "Dark botanical half-sleeve cover-up tattoo with mixed flowers",
    prompt:
      "Generate a dark botanical cover-up tattoo for half-sleeve, mixed flowers including roses, peonies, and dahlias, heavy dark shading throughout, continuous flowing composition, black ink only, suitable for covering multiple scattered tattoos, stencil-ready with clear outlines.",
  },
  {
    title: "Geometric Blackout Panel",
    summary: "Abstract geometric panel design for rectangular scar coverage.",
    image: "/coverup/cover12.webp",
    alt: "Geometric blackout panel cover-up tattoo with abstract shapes",
    prompt:
      "Design a geometric blackout panel cover-up tattoo, abstract shapes with solid black sections, clean geometric boundaries, forearm inner placement, ideal for covering rectangular scars or text blocks, precise edges with gradient transitions, modern minimalist aesthetic, no color.",
  },
];

const FAQS = [
  {
    q: "How do I know if my old tattoo can be covered?",
    a: "Most tattoos can be covered with the right design. Darker, larger designs work best for covering old ink. Very dark or large existing tattoos may need laser fading first.",
  },
  {
    q: "What styles work best for cover-up tattoos?",
    a: "Blackwork, neo-traditional, and dark realism styles offer the best coverage due to their heavy shading and bold fills. Geometric patterns also work well for structured coverage.",
  },
  {
    q: "Can cover-up tattoos hide scars too?",
    a: "Yes, many cover-up designs can incorporate and camouflage scars. Designs with organic shapes and heavy shading tend to work best for scar coverage.",
  },
  {
    q: "How much larger should a cover-up tattoo be?",
    a: "Generally, cover-up tattoos need to be 20-30% larger than the original to ensure complete coverage and allow for design flexibility.",
  },
];

export const metadata: Metadata = {
  title: "AI Tattoo Cover-Up Generator: Blackwork, Floral & Geometric Designs",
  description:
    "Use our AI cover-up tattoo generator for blackwork designs, floral overlays, geometric patterns, and scar coverage concepts tailored for tattoo transformation.",
};

export default function AITattooCoverUpPage() {
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
                AI Cover-Up Tattoo
                <br />
                <span className="text-muted-foreground">Generator</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Transform old tattoos and scars with intelligent cover-up
                designs. Generate blackwork, floral overlays, geometric
                patterns, and dark realism concepts optimized for maximum
                coverage.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/ai-tattoo-generator?style=blackwork&prompt=Create%20a%20dense%20blackwork%20cover-up%20tattoo%20for%20forearm"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-medium text-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                >
                  Start with Cover-Up Template
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-tattoo-generator"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm transition-all hover:bg-secondary hover:shadow-sm active:scale-[0.98]"
                >
                  Open Main Studio
                </Link>
              </div>
            </div>

            {/* Image Grid - Bento Style */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-12 gap-2 sm:gap-3">
                {/* Large featured image */}
                <div className="col-span-7 row-span-4 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted aspect-[1]">
                  <Image
                    src={PROMPT_LIBRARY[0].image}
                    alt={PROMPT_LIBRARY[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 30vw"
                    className="object-cover object-center"
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
                <div className="col-span-5 row-span-3 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted aspect-[1]">
                  <Image
                    src={PROMPT_LIBRARY[1].image}
                    alt={PROMPT_LIBRARY[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 20vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Bottom left image */}
                <div className="col-span-4 row-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted aspect-[1]">
                  <Image
                    src={PROMPT_LIBRARY[2].image}
                    alt={PROMPT_LIBRARY[2].alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 15vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Bottom middle image */}
                <div className="col-span-4 row-span-3 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted aspect-[1]">
                  <Image
                    src={PROMPT_LIBRARY[3].image}
                    alt={PROMPT_LIBRARY[3].alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 15vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Bottom right image */}
                <div className="col-span-4 row-span-3 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-muted aspect-[1]">
                  <Image
                    src={PROMPT_LIBRARY[4].image}
                    alt={PROMPT_LIBRARY[4].alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 15vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Stats card */}
                <div className="col-span-3 row-span-2 rounded-2xl sm:rounded-3xl bg-foreground text-background p-3 sm:p-4 flex flex-col justify-center">
                  <p className="text-2xl sm:text-3xl font-bold">12+</p>
                  <p className="text-[10px] sm:text-xs text-background/70 mt-1">
                    Cover-Up Prompts
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
                className="cursor-pointer group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-border bg-background hover:border-foreground/20 hover:shadow-md transition-all duration-200"
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
                12 curated cover-up tattoo prompts
              </p>
            </div>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {PROMPT_LIBRARY.map((item) => (
              <article
                key={item.title}
                className="cursor-pointer group flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 hover:shadow-md transition-all duration-200"
              >
                <div className="relative aspect-[1] overflow-hidden bg-muted">
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
                      className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-medium transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
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
              FAQ: Cover-Up Tattoo Prompts
            </h2>
            <p className="mt-2 text-muted-foreground">
              Common questions about creating cover-up tattoo designs
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, index) => (
              <details
                key={item.q}
                className="cursor-pointer group rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 hover:shadow-sm transition-all duration-200"
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
              Ready to transform your old tattoo?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Use our professional tools to generate intelligent cover-up
              designs in minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ai-tattoo-generator"
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
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
