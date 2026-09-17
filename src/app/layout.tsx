import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Noto_Sans_Devanagari, Noto_Sans_Gujarati } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { LanguageProvider } from "@/context/LanguageContext";
import { GoogleTranslateScript } from "@/components/site/GoogleTranslateScript";
import { CopyProtection } from "@/components/site/CopyProtection";
import { CookieConsent } from "@/components/site/CookieConsent";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  variable: "--font-noto-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://kirtirana.in";
const OG_IMAGE = "/images/kirti-rana/agriculture.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: " Navi Mumbai Merchants Chamber",
    template: "%s | Kirti Rana",
  },
  description:
    "Professional profile of Kirti Rana, Chairman of Navi Mumbai Merchants Chamber and Bombay Mudibazar Kariana Merchants Association, and a business presence in agriculture & trade at Navi Mumbai APMC Market.",
  keywords: [
    "Kirti Rana",
    "Navi Mumbai Merchants Chamber",
    "Bombay Mudibazar Kariana Merchants Association",
    "Kisan Kirti Agro",
    "Navi Mumbai APMC",
    "Turbhe APMC",
    "Merchant Community",
    "Agriculture Trade",
    "Maharashtra Business",
  ],
  authors: [{ name: "Kirti Rana" }],
  creator: "Kirti Rana",
  applicationName: "Kirti Rana",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Kirti Rana",
    title: "Kirti Rana | Business Leadership • Merchant Community • Agriculture & Trade",
    description:
      "Chairman – Navi Mumbai Merchants Chamber & Bombay Mudibazar Kariana Merchants Association. An established presence in Navi Mumbai's business and merchant community.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kirti Rana — Business Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirti Rana | Navi Mumbai Merchants Chamber",
    description:
      "Chairman – Navi Mumbai Merchants Chamber & Bombay Mudibazar Kariana Merchants Association.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={cn(
          jakartaSans.variable,
          inter.variable,
          notoDevanagari.variable,
          notoGujarati.variable,
          "antialiased bg-background text-foreground font-sans"
        )}
      >
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://kirtirana.in/#organization",
                    "name": "Navi Mumbai Merchants Chamber",
                    "url": "https://kirtirana.in",
                    "logo": "https://kirtirana.in/images/logo.png",
                    "description": "The apex commercial body representing 400+ wholesale merchants, processors and exporters across Asia's premier 50-acre APMC Turbhe complex.",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Central Facility Building, APMC Market-I, Phase-II, Sector 19, Turbhe",
                      "addressLocality": "Navi Mumbai",
                      "addressRegion": "Maharashtra",
                      "postalCode": "400705",
                      "addressCountry": "IN"
                    },
                    "leader": {
                      "@type": "Person",
                      "@id": "https://kirtirana.in/#person",
                      "name": "Shri Kirti Rana",
                      "jobTitle": "President & Chairman",
                      "description": "President of Navi Mumbai Merchants Chamber, trade veteran with 30+ years of leadership in agricultural commodities and wholesale market infrastructure."
                    }
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://kirtirana.in/#website",
                    "url": "https://kirtirana.in",
                    "name": "Navi Mumbai Merchants Chamber & Shri Kirti Rana Official Portal",
                    "publisher": {
                      "@id": "https://kirtirana.in/#organization"
                    }
                  }
                ]
              }),
            }}
          />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <BackToTop />
          <GoogleTranslateScript />
          <CopyProtection />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
