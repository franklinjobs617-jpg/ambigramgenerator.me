import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import Header from "@/components/header";
import { AuthProvider } from "@/components/providers/auth-provider";
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ambigram Generator: Free 2D & 3D Two-Name Tattoo Maker & STL",
  description: "Create free 2D & 3D ambigrams online. The best tool for two-name tattoo designs and 3D printable STLs. Mobile-friendly Flipscript alternative with no signup.",
  metadataBase: new URL("https://www.ambigramgenerator.me"),
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-N55FBP8DJ2" />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3383070348689557"
          crossOrigin="anonymous"
        ></Script>
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ti80pje0n3");
              `,
          }}
        />
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
