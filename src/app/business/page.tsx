import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Wheat,
  Sprout,
  Store,
  TrendingUp,
  ArrowRight,
  Info,
  Building2,
  MapPin,
  Scale,
  ShieldCheck,
  Globe2,
  FileCheck2,
  Users2,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Commercial Services & Business Profile | Kirti Rana",
  description:
    "Explore the commercial enterprises, agro-commodity export desk, dispute redressal cell, and merchant welfare services steered by Shri Kirti Rana.",
  alternates: { canonical: "/business" },
};

// Business Profile Data
const businessInfo = {
  name: "Kisan Kirti Agro Pvt. Ltd.",
  type: "Private Limited Company",
  sector: "Agro-Commodity Trade, Warehousing & Export Facilitation",
  region: "Navi Mumbai APMC, Maharashtra, India",
  director: "Shri Kirti Rana & Associates",
  headquarters: "Turbhe APMC Commercial Complex, Navi Mumbai - 400705",
  coreFocus: "Grains, Spices, Pulses, Oilseeds & Cold Storage Logistics",
  status: "Active Commercial Entity",
};

const overviewItems = [
  {
    icon: Sprout,
    title: "Agriculture & Trade",
    description:
      "Aligned with the agricultural trading activity centred around the Navi Mumbai APMC market complex.",
  },
  {
    icon: Store,
    title: "APMC Ecosystem",
    description:
      "Operating within one of Asia's largest dedicated wholesale agricultural and spice trading hubs.",
  },
  {
    icon: TrendingUp,
    title: "Export & Commerce",
    description:
      "Focused on trade facilitation, container logistics, and high-volume agricultural supply chains.",
  },
  {
    icon: Building2,
    title: "Corporate Governance",
    description:
      "Incorporated as a private limited commercial entity under the stewardship of Shri Kirti Rana.",
  },
];

const exportServices = [
  {
    title: "Phytosanitary & FSSAI Compliance",
    desc: "Facilitating quality testing, food safety certifications, and customs quarantine clearances for international consignments.",
  },
  {
    title: "Cold Chain Logistics & Warehousing",
    desc: "Connecting exporters with state-of-the-art temperature-controlled storage across the 50-acre Turbhe APMC complex.",
  },
  {
    title: "Direct Port Linkages (JNPA)",
    desc: "Strategic proximity to Jawaharlal Nehru Port (Nhava Sheva), enabling rapid container stuffing and global sea-freight dispatch.",
  },
  {
    title: "Global Buyer-Seller Meets",
    desc: "Organizing bilateral delegations with Middle Eastern, European, and Southeast Asian spice and agro-commodity importers.",
  },
];

const disputeFeatures = [
  {
    title: "Permanent Chamber Tribunal",
    desc: "Conducted under the arbitration rules of Navi Mumbai Merchants Chamber and Bombay Mudibazar Kariana Merchants Association.",
  },
  {
    title: "Equitable & Binding Settlements",
    desc: "Resolving weight discrepancies, quality disputes, payment delays, and transit claims swiftly without court delays.",
  },
  {
    title: "Neutral Merchant Conciliators",
    desc: "Presided over by senior veteran trade arbitrators with deep domain knowledge of agricultural commodity contracts.",
  },
  {
    title: "Confidential & Transparent",
    desc: "Protecting commercial reputation while ensuring 100% adherence to agreed wholesale market payment terms.",
  },
];

const merchantServices = [
  {
    title: "APMC Trading License Facilitation",
    desc: "Assisting new traders and processors in securing authorized APMC market licenses and godown allotments.",
  },
  {
    title: "Banking & Working Capital Liaison",
    desc: "Facilitating warehouse receipt financing, cash credit limits, and priority lending with nationalized & private banks.",
  },
  {
    title: "GST & Tax Advisory Desk",
    desc: "Providing guidance on reverse charge mechanisms, mandee tax exemptions, and simplified filing procedures.",
  },
  {
    title: "Merchant Social Security & Medical Aid",
    desc: "Emergency welfare funds, health insurance camps, and vocational aid for market workers and trader families.",
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Commercial Services"
        title="Business Enterprises & Merchant Services"
        description="Comprehensive commercial infrastructure, agro-commodity export desk, dispute redressal cell, and corporate ventures under Shri Kirti Rana."
        crumbs={[{ label: "Business" }]}
      />

      {/* 1. Overview & Kisan Kirti Agro */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <SectionHeading
                align="left"
                eyebrow="Commercial Venture"
                title="Kisan Kirti Agro Pvt. Ltd."
              />
              <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-ink-600">
                <strong>Kisan Kirti Agro Pvt. Ltd.</strong> represents the commercial enterprise of Shri Kirti Rana, positioned at the nexus of India&apos;s wholesale agricultural trading ecosystem.
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ink-600">
                Headquartered in Navi Mumbai with direct operational linkages across the 50-acre APMC Turbhe market, the company facilitates bulk commodity sourcing, grading, cold chain storage, and domestic distribution for spices, grains, pulses, and oilseeds.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#export"
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-royal hover:-translate-y-0.5"
                >
                  <Globe2 className="h-4 w-4 text-gold" />
                  Export Desk
                  <ArrowRight className="h-4 w-4 text-gold" />
                </Link>
                <Link
                  href="#dispute"
                  className="inline-flex items-center gap-2 rounded-xl border border-navy/20 bg-mist px-5 py-3 text-sm font-bold text-navy transition-all hover:border-gold hover:text-royal hover:bg-white"
                >
                  <Scale className="h-4 w-4 text-royal" />
                  Dispute Redressal
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-xl border border-navy/20 bg-mist px-5 py-3 text-sm font-bold text-navy transition-all hover:border-gold hover:text-royal hover:bg-white"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Merchant Welfare
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-border shadow-premium-lg">
                <div className="img-zoom relative aspect-[4/3]">
                  <Image
                    src="/images/kirti-rana/agriculture.jpg"
                    alt="Agriculture and trade — golden wheat field at sunrise"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
                    Agro-Commodity Leadership
                  </p>
                  <p className="mt-1 font-heading text-xl sm:text-2xl font-extrabold text-white">
                    Connecting Indian Agriculture to Global Markets
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Agro-Commodity Export Desk */}
      <section id="export" className="bg-mist py-16 lg:py-24 scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Global Trade"
            title="Agro-Commodity Export Desk"
            description="Facilitating worldwide export clearances, quality grading, and direct port connectivity from Navi Mumbai APMC."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {exportServices.map((service, i) => (
              <ScrollReveal key={service.title} variant="up" delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/30">
                    <Globe2 className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                    {service.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trade Dispute Redressal Cell */}
      <section id="dispute" className="bg-white py-16 lg:py-24 scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ScrollReveal variant="left">
                <span className="eyebrow inline-flex items-center gap-2 text-royal">
                  <Scale className="h-4 w-4 text-gold" />
                  Arbitration Tribunal
                </span>
                <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
                  Trade Dispute Redressal Cell
                </h2>
                <span aria-hidden className="mt-4 block gold-hairline" />
                <p className="mt-5 text-base leading-relaxed text-ink-600">
                  Established under the auspices of the Navi Mumbai Merchants Chamber and Bombay Mudibazar Kariana Merchants Association, the Dispute Redressal Cell provides an authoritative, neutral commercial arbitration forum for wholesale traders across Maharashtra and Gujarat.
                </p>
                <div className="mt-6 rounded-2xl border border-gold/40 bg-gold-50/50 p-5">
                  <p className="font-heading text-sm font-bold text-navy flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold-600" />
                    Over 95% Amicable Resolution Rate
                  </p>
                  <p className="mt-1 text-xs text-ink-600 leading-relaxed">
                    Protecting commercial harmony, averting protracted legal battles, and sustaining inter-merchant trust for over three decades.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {disputeFeatures.map((item, i) => (
                <ScrollReveal key={item.title} variant="up" delay={i * 80}>
                  <div className="rounded-2xl border border-border bg-mist p-5 transition-all hover:bg-white hover:shadow-premium">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-gold">
                      <Scale className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3.5 font-heading text-base font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-600">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Merchant Welfare & Services */}
      <section id="services" className="bg-mist py-16 lg:py-24 scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Merchant Support"
            title="Merchant Welfare & Institutional Services"
            description="Dedicated administrative, banking, and welfare mechanisms supporting 400+ wholesale trade enterprises."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {merchantServices.map((service, i) => (
              <ScrollReveal key={service.title} variant="up" delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-900 text-emerald-300 ring-1 ring-emerald-500/30">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                    {service.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Company Information Table */}
          <ScrollReveal variant="up" className="mt-14">
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-premium">
              <div className="border-b border-border bg-navy px-6 sm:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-gold" />
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                    Corporate Register — Kisan Kirti Agro Pvt. Ltd.
                  </h3>
                </div>
                <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <dl className="divide-y divide-border">
                {[
                  { label: "Company Name", value: businessInfo.name },
                  { label: "Entity Type", value: businessInfo.type },
                  { label: "Primary Sector", value: businessInfo.sector },
                  { label: "Operational Region", value: businessInfo.region },
                  { label: "Board Leadership", value: businessInfo.director },
                  { label: "Corporate Office", value: businessInfo.headquarters },
                  { label: "Core Commodity Specialization", value: businessInfo.coreFocus },
                  { label: "Operational Status", value: businessInfo.status },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 px-6 sm:px-8 py-4 sm:grid-cols-3 sm:gap-4 hover:bg-mist/50 transition-colors"
                  >
                    <dt className="text-sm font-bold text-royal">{row.label}</dt>
                    <dd className="text-sm sm:col-span-2 text-ink font-medium">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Explore Further"
        icon={MapPin}
        title="Connected to the 50-Acre APMC Ecosystem"
        description="Discover the 5 specialized commodity wholesale markets and daily price boards across Turbhe."
        buttons={[
          { label: "Explore APMC Market", href: "/apmc", variant: "primary" },
          { label: "View Organizations", href: "/organizations", variant: "secondary" },
        ]}
      />
    </>
  );
}
