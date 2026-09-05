import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://kirtirana.in";
const OG_IMAGE = "/images/kirti-rana/agriculture.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kirti Rana | Navi Mumbai Merchants Chamber",
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
    icon: "/favicon.svg",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          poppins.variable,
          inter.variable,
          notoDevanagari.variable,
          "antialiased bg-background text-foreground font-sans"
        )}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1 pt-[76px]">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
