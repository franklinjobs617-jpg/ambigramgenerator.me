import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, X, Star, Zap, Box, CreditCard, UserX, ImageOff, ArrowRight, Trophy, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tattoo Generators 2026: Compare Top Tools | AmbigramGenerator",
  description: "Compare the best AI tattoo generators of 2026. Discover why AmbigramGenerator.me stands out with superior text accuracy, 3D printing support, STL export, and no credit card required.",
  keywords: ["AI tattoo generator", "best tattoo generator", "ambigram generator", "3D tattoo design", "STL export tattoo", "free tattoo generator"],
  openGraph: {
    title: "Best AI Tattoo Generators 2026: Compare Top Tools",
    description: "Compare the best AI tattoo generators of 2026. Discover why AmbigramGenerator.me stands out with superior text accuracy and 3D support.",
    images: ["/images/ai-tattoo-comparison-hero.jpg"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tattoo Generators 2026",
    description: "Compare the best AI tattoo generators of 2026.",
    images: ["/images/ai-tattoo-comparison-hero.jpg"],
  },
  alternates: {
    canonical: "/best-3d-generator",
  },
};

const comparisonData = [
  {
    feature: "Text Accuracy",
    featureCn: "Text Accuracy",
    ambigram: 5,
    adobe: 3,
    blackink: 4,
    canva: 3,
  },
  {
    feature: "3D Support",
    featureCn: "3D Support",
    ambigram: 5,
    adobe: 2,
    blackink: 3,
    canva: 1,
  },
  {
    feature: "STL Export",
    featureCn: "STL Export",
    ambigram: true,
    adobe: false,
    blackink: false,
    canva: false,
  },
  {
    feature: "Free to Use",
    featureCn: "Free to Use",
    ambigram: true,
    adobe: "Paid",
    blackink: "Paid",
    canva: "Limited",
  },
  {
    feature: "No Sign-up Required",
    featureCn: "No Sign-up Required",
    ambigram: true,
    adobe: false,
    blackink: false,
    canva: false,
  },
  {
    feature: "No Watermark",
    featureCn: "No Watermark",
    ambigram: true,
    adobe: false,
    blackink: false,
    canva: false,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const CheckOrX = ({ value }: { value: boolean | string }) => {
  if (typeof value === "string") {
    return <span className="text-sm text-gray-500">{value}</span>;
  }
  return value ? (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
      <Check className="w-4 h-4 text-emerald-600" />
    </div>
  ) : (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
      <X className="w-4 h-4 text-red-500" />
    </div>
  );
};

const features = [
  {
    icon: Zap,
    title: "Exceptional Text Accuracy",
    titleCn: "Exceptional Text Accuracy",
    description: "Our specialized algorithm ensures every letter is perfectly formed and symmetrical.",
    descriptionCn: "Our professional algorithm ensures every letter is perfectly formed and symmetrical.",
  },
  {
    icon: Box,
    title: "STL Export for 3D Printing",
    titleCn: "STL Export for 3D Printing",
    description: "Transform your design into a physical object for a unique gift or mockup.",
    descriptionCn: "Convert your designs into physical objects to create unique gifts or models.",
  },
  {
    icon: CreditCard,
    title: "100% Free, No Credit Card",
    titleCn: "100% Free, No Credit Card",
    description: "Full access to all features without any payment or credit card required.",
    descriptionCn: "Full access to all features without any payment or credit card required.",
  },
  {
    icon: UserX,
    title: "No Sign-up Required",
    titleCn: "No Sign-up Required",
    description: "Start creating immediately without creating an account or sharing personal data.",
    descriptionCn: "Start creating immediately without creating an account or sharing personal data.",
  },
  {
    icon: ImageOff,
    title: "No Watermarks",
    titleCn: "No Watermarks",
    description: "Download your designs in full quality without any watermarks or branding.",
    descriptionCn: "Download high-quality designs without any watermarks or branding.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Precision",
    titleCn: "AI-Powered Precision",
    description: "Advanced AI ensures perfect symmetry and readability from any angle.",
    descriptionCn: "Advanced AI ensures perfect symmetry and readability from any angle.",
  },
];

const faqs = [
  {
    question: "What is an AI tattoo generator?",
    questionCn: "What is an AI tattoo generator?",
    answer: "An AI tattoo generator is a tool that uses artificial intelligence to create tattoo designs based on your inputs, such as text or descriptions.",
    answerCn: "An AI tattoo generator is a tool that uses artificial intelligence to create tattoo designs based on your inputs, such as text or descriptions.",
  },
  {
    question: "Why is AmbigramGenerator.me the best choice?",
    questionCn: "Why is AmbigramGenerator.me the best choice?",
    answer: "AmbigramGenerator.me stands out for its exceptional text accuracy, complete 3D support, STL export for 3D printing, and free access without sign-up.",
    answerCn: "AmbigramGenerator.me stands out for its superior text accuracy, full 3D support, STL export for 3D printing, and free access without registration.",
  },
  {
    question: "Can I use the designs for a real tattoo?",
    questionCn: "Can I use the designs for a real tattoo?",
    answer: "Yes, designs generated by AmbigramGenerator.me are ready to be used for real tattoos. However, we recommend consulting a professional tattoo artist for the final application.",
    answerCn: "Yes, designs generated by AmbigramGenerator.me are ready to be used for real tattoos. However, we recommend consulting a professional tattoo artist for the final application.",
  },
];

export default function BestAiTattooGeneratorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-orange-50/30">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best AI Tattoo Generators 2026: Compare Top Tools",
            "description": "Comprehensive comparison of top AI tattoo generators, highlighting AmbigramGenerator.me's superior text accuracy and 3D support.",
            "image": "/images/ai-tattoo-comparison-hero.jpg",
            "author": {
              "@type": "Organization",
              "name": "AmbigramGenerator.me"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AmbigramGenerator.me"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "/best-3d-generator"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-transparent to-orange-100/30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-violet-200 shadow-sm mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">4.8/5 Rating • 1,200+ Users</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Best AI Tattoo Generators{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-orange-500">
                  2026
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Compare the top <strong className="text-violet-700">AI tattoo generator</strong> tools. 
                Discover why AmbigramGenerator.me leads with{" "}
                <strong className="text-orange-600">STL export</strong> and{" "}
                <strong className="text-violet-700">zero barrier to entry</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/3d-generator"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-full font-semibold text-lg shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Try Free Generator
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#comparison"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all duration-300"
                >
                  View Comparison
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-400/20 to-orange-400/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <Image
                  src="/images/ai-tattoo-comparison-hero.jpg"
                  alt="AI tattoo generator comparison showing elegant ambigram designs with professional typography"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-violet-600 text-white text-sm font-medium rounded-full">
                  #1 Rated Tool
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">
              Feature Comparison
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Stack Up Against Competitors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See why AmbigramGenerator.me is the preferred choice for tattoo enthusiasts and professionals.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 shadow-xl bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-violet-600 to-violet-700">
                  <th className="px-6 py-5 text-left text-white font-semibold">Feature</th>
                  <th className="px-6 py-5 text-center text-white font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-300" />
                      AmbigramGenerator.me
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-white/90 font-medium">Adobe Firefly</th>
                  <th className="px-6 py-5 text-center text-white/90 font-medium">Blackink.ai</th>
                  <th className="px-6 py-5 text-center text-white/90 font-medium">Canva</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-violet-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-5 bg-violet-50/50">
                      <div className="flex justify-center">
                        {typeof row.ambigram === "number" ? (
                          <StarRating rating={row.ambigram} />
                        ) : (
                          <CheckOrX value={row.ambigram} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        {typeof row.adobe === "number" ? (
                          <StarRating rating={row.adobe} />
                        ) : (
                          <CheckOrX value={row.adobe} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        {typeof row.blackink === "number" ? (
                          <StarRating rating={row.blackink} />
                        ) : (
                          <CheckOrX value={row.blackink} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        {typeof row.canva === "number" ? (
                          <StarRating rating={row.canva} />
                        ) : (
                          <CheckOrX value={row.canva} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {comparisonData.map((row, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                  {row.feature}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-2 bg-violet-50 rounded-lg">
                    <span className="text-xs text-violet-700 font-medium">Ambigram</span>
                    {typeof row.ambigram === "number" ? (
                      <StarRating rating={row.ambigram} />
                    ) : (
                      <CheckOrX value={row.ambigram} />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-600">Adobe</span>
                    {typeof row.adobe === "number" ? (
                      <StarRating rating={row.adobe} />
                    ) : (
                      <CheckOrX value={row.adobe} />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-600">Blackink</span>
                    {typeof row.blackink === "number" ? (
                      <StarRating rating={row.blackink} />
                    ) : (
                      <CheckOrX value={row.blackink} />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-600">Canva</span>
                    {typeof row.canva === "number" ? (
                      <StarRating rating={row.canva} />
                    ) : (
                      <CheckOrX value={row.canva} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-violet-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why AmbigramGenerator.me Stands Out
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our tool stands out with its unique ability to handle{" "}
                <strong className="text-violet-700">text tattoo geometry and symmetry</strong>. 
                Unlike other AI generators that focus on general images, we specialize in 
                textual precision, essential for tattoos.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-100 to-orange-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-400/10 to-orange-400/10 rounded-3xl blur-xl" />
              <Image
                src="/images/stl-export-feature.jpg"
                alt="3D STL export feature demonstration showing a white marble ambigram sculpture for 3D printing"
                width={600}
                height={450}
                className="relative w-full h-auto rounded-2xl shadow-xl border border-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">
              Key Advantages
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Perfect Tattoo Designs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Insight */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border-l-4 border-emerald-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-emerald-800">
                  Expert Insight: Text Accuracy is Crucial
                </h3>
              </div>
              <p className="text-lg text-emerald-700 leading-relaxed">
                For text tattoos, accuracy is everything. A general AI generator like DALL-E or 
                MidJourney may struggle to reproduce letters correctly and the symmetry needed 
                for a quality ambigram. That's why <strong>AmbigramGenerator.me</strong> is 
                the best choice for text tattoos — our specialized algorithm ensures 
                perfect letterforms every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Image */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Stunning Tattoo Designs Created with Our Tool
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the quality and precision that sets AmbigramGenerator.me apart from the competition.
            </p>
          </div>
          <figure className="max-w-4xl mx-auto">
            <Image
              src="/images/tattoo-design-showcase.jpg"
              alt="Collection of professional ambigram tattoo designs showing various typography styles and symmetrical patterns created with AmbigramGenerator.me"
              width={900}
              height={500}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <figcaption className="text-center text-sm text-gray-500 mt-4">
              Examples of ambigram tattoo designs created using AmbigramGenerator.me's AI-powered tool.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-violet-50/50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">
                FAQ
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-violet-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* FAQ Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": faqs.map((faq) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": faq.answer
                    }
                  }))
                })
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-violet-700 to-orange-500 p-8 lg:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
                Ready to Create Your Perfect Tattoo?
              </h2>
              <p className="text-lg lg:text-xl text-violet-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                Join over 1,200 users who have discovered the power of AmbigramGenerator.me. 
                Start creating professional tattoo designs today — completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/3d-generator"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-violet-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Try Free AI Tattoo Generator
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Author */}
      <section className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-violet-800 mb-3">About the Author</h3>
            <p className="text-gray-600 leading-relaxed">
              This article was written by the AmbigramGenerator.me team, composed of designers 
              and SEO experts specializing in tattoo creation and ambigram designs. With over 
              5 years of experience in the field, we strive to provide the most accurate 
              information and effective tools for tattoo enthusiasts.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}