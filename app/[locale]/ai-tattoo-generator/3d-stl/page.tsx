import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const QUICK_TEMPLATES = [
  {
    title: "Geometric Depth Layers",
    style: "Geometric",
    prompt:
      "Create a geometric tattoo concept with 3 distinct depth layers, clean edges suitable for STL conversion, minimal noise, high contrast black lines",
  },
  {
    title: "Minimalist Symbol Print",
    style: "Minimal",
    prompt:
      "Generate a minimalist symbol tattoo for 3D prototype printing, clean single-layer design, bold outline minimum 2mm thickness when scaled",
  },
  {
    title: "Typography Relief Model",
    style: "Blackwork",
    prompt:
      "Design bold typography tattoo for relief 3D printing, thick strokes minimum 3mm width at print scale, clear letter separation",
  },
  {
    title: "Floral Contour Export",
    style: "Line Art",
    prompt:
      "Create simplified floral tattoo contour for STL export, single continuous outline, no internal shading, petal shapes with minimum 2mm gaps",
  },
];

const PROMPT_LIBRARY = [
    {
      title: "Geometric Depth Layer STL",
      summary: "Clean geometric shapes with defined depth for 3D printing.",
      image: "/3d-stl/geometric-depth.png",
      alt: "Geometric tattoo concept with clear depth layers for 3D STL export",
      prompt:
        "Flat vector illustration of a geometric tattoo design, featuring overlapping shapes representing 3 distinct depth layers. Pure black ink on a pure white background, crisp solid lines, bold and chunky forms. Stencil style, high contrast, absolute no gradients, no shading. Perfect for 3D modeling relief.",
    },
    {
      title: "Minimalist Symbol Prototype",
      summary: "Simple iconic symbols optimized for small-scale 3D prints.",
      image: "/3d-stl/minimalist-symbol.png",
      alt: "Minimalist symbol tattoo design for 3D STL prototype printing",
      prompt:
        "Minimalist abstract symbol tattoo design, extremely thick bold single-stroke outline. Flat vector graphic style, pure black on a pure white background. Monochrome, highly simplified, no fine lines, no tiny details. High contrast stencil style, perfect clean edges for STL conversion.",
    },
    {
      title: "Typography Relief Model",
      summary: "Bold lettering designed for relief-style 3D printing.",
      image: "/3d-stl/typography-relief.png",
      alt: "Bold typography tattoo concept for relief-style 3D STL model",
      prompt:
        "Bold typography tattoo design, extremely thick block lettering. Flat vector style, solid pure black ink on a pure bright white background. Crisp letter separation, wide gaps, no overlapping parts, heavy font weight. High contrast, clean minimalist 3D relief style printable geometry.",
    },
    {
      title: "Floral Contour Export",
      summary: "Simplified floral outlines with printable geometry.",
      image: "/3d-stl/floral-contour.webp",
      alt: "Simplified floral tattoo contour for 3D STL export workflow",
      prompt:
        "Simplified floral silhouette tattoo design, continuous thick outline contour. Flat vector art, pure black lines on a pure white background. Wide gaps between petals, no internal shading, no intricate details. Minimalist line-art stencil, high contrast print-ready edge quality.",
    },
    {
      title: "Animal Silhouette Base",
      summary: "Clean animal silhouettes for desktop collectible prints.",
      image: "/3d-stl/animal-silhouette.png",
      alt: "Animal silhouette tattoo design for 3D collectible STL printing",
      prompt:
        "Clean minimalist silhouette tattoo of a wolf profile, solid pure black fill with sharp, defined smooth edges. Flat vector graphic, pure white background. No internal details, absolute high contrast, bold and recognizable icon, ready for 3D printable collectible extrusion.",
    },
    {
      title: "Mandala Layer Structure",
      summary: "Concentric mandala with separable depth rings.",
      image: "/3d-stl/mandala-layers.png",
      alt: "Mandala tattoo with concentric layers for multi-depth 3D STL",
      prompt:
        "Geometric mandala tattoo design, simplified into 4 distinct concentric rings. Extremely thick, bold black lines, wide negative space between elements. Flat vector illustration, pure white background. Symmetrical, absolutely no fine intricate filigree, crisp stamp stencil style.",
    },
    {
      title: "Script Name Emboss",
      summary: "Name typography prepared for embossed 3D surface.",
      image: "/3d-stl/script-emboss.webp",
      alt: "Script name tattoo prepared for embossed 3D STL surface",
      prompt:
        "Calligraphy script tattoo design reading 'Luna and Sol', thick flowing continuous lines. Flat vector graphic, pure black ink on a pure white background. Bold heavy strokes, no thin hairline flourishes, clean horizontal baseline. Minimalist embossed typography style.",
    },
    
  ];

const FAQS = [
  {
    q: "Why connect AI tattoo generation with STL export?",
    a: "STL adds physical validation. You can evaluate shape, depth, and readability before final production.",
  },
  {
    q: "Is STL export available in free plan?",
    a: "No. STL workflow is a premium feature designed for advanced users and maker scenarios.",
  },
  {
    q: "Can I print concepts directly without artist review?",
    a: "You can print prototypes, but tattoo-ready execution still requires artist review and stencil adjustments.",
  },
  {
    q: "What kind of styles convert better into 3D?",
    a: "High-contrast line-art and simplified blackwork tend to convert into cleaner printable geometry.",
  },
];

export const metadata: Metadata = {
  title: "AI Tattoo 3D STL Generator: Prototypes, Mockups & Print-Ready Designs",
  description:
    "Use our AI tattoo 3D STL generator for print-ready prototypes, studio mockups, gift models, and physical design validation workflows.",
};

export default function AITattoo3DSTLPage() {
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
                AI Tattoo 3D
                <br />
                <span className="text-muted-foreground">STL Export</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Move from AI tattoo concepts into 3D STL export workflows for
                prototypes, studio mockups, and physical design validation.
                Perfect for makers, gift creators, and professional studios.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/ai-tattoo-generator?style=line-art&prompt=Create%20a%20high-readability%20tattoo%20concept%20prepared%20for%20STL%20workflow"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-medium text-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
                >
                  Start STL-Ready Concept
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
                    STL-Ready Prompts
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
                href={`/ai-tattoo-generator?style=${item.style.toLowerCase().replace(' ', '-')}&prompt=${encodeURIComponent(
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
                12 curated STL-ready tattoo prompts
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
              FAQ: 3D STL Workflow
            </h2>
            <p className="mt-2 text-muted-foreground">
              Common questions about creating STL-ready tattoo designs
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
              Ready to create your 3D printable tattoo concept?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Use our professional tools to generate STL-ready designs in
              minutes.
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
