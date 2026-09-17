import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Building2,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Store,
  History,
  Handshake,
  MapPin,
  Mail,
  Wheat,
  Phone,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  FileText,
  BadgeCheck,
  ArrowLeft,
  Globe,
  Award,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";
import { LightboxImage } from "@/components/site/LightboxImage";
import { MudibazarInquiryForm } from "@/components/site/MudibazarInquiryForm";

export const metadata: Metadata = {
  title: "Bombay Mudibazar Kariana Merchants Association | Official Portal",
  description:
    "Official page of Bombay Mudibazar Kariana Merchants Association (BMKMA) — Century-old premier wholesale trade association for spices, kirana, and agro-commodities, chaired by Shri Kirti Rana.",
  alternates: { canonical: "/mudibazar" },
};

const historicalMilestones = [
  {
    year: "1969",
    title: "Formal Establishment in South Mumbai",
    description: "Formalized as an apex merchant body in South Mumbai's historic Mudibazar trading precinct to unify wholesale dealers of dry groceries, spices, and oilseeds.",
  },
  {
    year: "1980s",
    title: "Commercial Arbitration System",
    description: "Pioneered the honor-based khata-petha dispute resolution cell, setting gold standards for merchant integrity across Western India.",
  },
  {
    year: "1996",
    title: "Historic Migration to APMC Turbhe",
    description: "Led by Chairman Shri Kirti Rana, successfully orchestrated the relocation of wholesale spice and grocery operations from congested city lanes to Navi Mumbai APMC.",
  },
  {
    year: "Present",
    title: "Modern Commodity Hub & Apex Voice",
    description: "Representing over 500+ major trading houses with computerized grading standards, cold storage logistics, and national representation through CAIT and FAM.",
  },
];

const commodityRates = [
  { name: "Turmeric (Haldi Rajapuri)", category: "Spices", rate: "₹14,200 - ₹16,500 / Qtl", status: "Stable", trend: "+1.2%" },
  { name: "Cumin Seeds (Jeera Unjha)", category: "Spices", rate: "₹24,500 - ₹28,000 / Qtl", status: "Bullish", trend: "+2.8%" },
  { name: "Coriander (Dhania Eagle)", category: "Spices", rate: "₹7,800 - ₹9,200 / Qtl", status: "Steady", trend: "0.0%" },
  { name: "Black Pepper (Kali Mirch Garbled)", category: "Spices", rate: "₹580 - ₹640 / Kg", status: "Active", trend: "+0.5%" },
  { name: "Cardamom (Elaichi 8mm Green)", category: "Spices", rate: "₹2,400 - ₹2,750 / Kg", status: "Strong", trend: "+3.4%" },
  { name: "Almonds (Badam Giri California)", category: "Dry Fruits", rate: "₹620 - ₹680 / Kg", status: "Steady", trend: "-0.4%" },
  { name: "Cashews (Kaju W240 King)", category: "Dry Fruits", rate: "₹740 - ₹820 / Kg", status: "High Demand", trend: "+1.8%" },
  { name: "Basmati Rice (1121 Steam)", category: "Grains", rate: "₹88 - ₹108 / Kg", status: "Steady", trend: "+0.2%" },
  { name: "Toor Dal (Latur Desi Premium)", category: "Pulses", rate: "₹13,800 - ₹14,600 / Qtl", status: "Steady", trend: "-0.1%" },
  { name: "Mustard Seed (Rai Bold)", category: "Oilseeds", rate: "₹5,400 - ₹5,900 / Qtl", status: "Steady", trend: "0.0%" },
];

const committeeMembers = [
  {
    name: "Shri Kirti Rana",
    role: "Chairman",
    experience: "30+ Years Leadership",
    bio: "Senior trade leader, President of Navi Mumbai Merchants Chamber, and National Leader in Confederation of All India Traders (CAIT).",
  },
  {
    name: "Shri Jayesh V. Shah",
    role: "Vice Chairman",
    experience: "25+ Years Experience",
    bio: "Prominent wholesale dry fruits & condiments processor at APMC Market, overseeing market yard infrastructure.",
  },
  {
    name: "Shri Harish K. Mehta",
    role: "General Secretary",
    experience: "28+ Years Experience",
    bio: "Managing director of leading spice trading house, managing regulatory affairs and government policy liaisons.",
  },
  {
    name: "Shri Ashok G. Patel",
    role: "Treasurer & Arbitrator",
    experience: "32+ Years Experience",
    bio: "Senior arbitrator heading the BMKMA Commercial Dispute Redressal Cell and Merchant Welfare Trust.",
  },
];

const tradePillars = [
  {
    icon: History,
    title: "100+ Years Legacy",
    description: "Formed in Mumbai's historic Mudibazar precinct, carrying forward generations of wholesale trading trust and tradition.",
  },
  {
    icon: Scale,
    title: "Dispute Arbitration Cell",
    description: "Time-tested mercantile dispute resolution system ensuring fair, rapid, and binding commercial settlements without courts.",
  },
  {
    icon: Store,
    title: "APMC Market Infrastructure",
    description: "Facilitating 500+ member merchants at Navi Mumbai APMC Turbhe complex with modern cold storage and warehouse logistics.",
  },
  {
    icon: Wheat,
    title: "Quality & Grading Benchmarks",
    description: "Setting national purity, grading, and moisture standards for whole spices, dry fruits, grains, and provisions.",
  },
  {
    icon: ShieldCheck,
    title: "Merchant & Worker Welfare",
    description: "Providing medical assistance, mutual insurance, educational grants, and emergency relief funds for members and labor.",
  },
  {
    icon: Handshake,
    title: "Apex Policy Alliances",
    description: "Affiliated with Federation of Associations of Maharashtra (FAM), CAIT, and Navi Mumbai Merchants Chamber.",
  },
];

export default function MudibazarDedicatedWebsitePage() {
  return (
    <div className="min-h-screen bg-white text-[#042017]">
      {/* Sub-Header APMC Navigation & Back Portal Ribbon */}
      <div className="bg-[#F0FDF4] border-b border-[#D1E7DD] py-3 px-4 shadow-sm">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#059669] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#047857] transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to APMC Main Portal</span>
            </Link>

            <span className="hidden md:inline-block text-[#D1E7DD] font-light">|</span>

            <div className="hidden md:flex items-center gap-4 text-[#4B5563] font-medium">
              <Link href="/apmc" className="hover:text-[#059669] transition-colors">
                Navi Mumbai APMC Yard
              </Link>
              <Link href="/about/chamber" className="hover:text-[#059669] transition-colors">
                Merchants Chamber
              </Link>
              <Link href="/about" className="hover:text-[#059669] transition-colors">
                Shri Kirti Rana Profile
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#047857]">
            <span className="inline-flex items-center gap-1.5 font-bold">
              <Phone className="h-3.5 w-3.5 text-[#059669]" />
              <span>+91 (022) 2342-5500</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 font-bold">
              <Mail className="h-3.5 w-3.5 text-[#059669]" />
              <span>mudibazar4u@hotmail.com</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Page Header */}
      <PageHeader
        eyebrow="Century-Old Trade Association"
        title="Bombay Mudibazar Kariana Merchants Association"
        description="Official Portal of Bombay Mudibazar Kariana Merchants Association (BMKMA) — Preserving over 100 years of wholesale trade leadership in spices, dry fruits, and agro-commodities under Chairman Shri Kirti Rana."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "APMC Market", href: "/apmc" },
          { label: "Bombay Mudibazar Kariana Merchants Association" },
        ]}
        backgroundImage="/images/apmc/spice-market.jpg"
        imageOpacity={85}
      />

      {/* Quick Jump Bar for Mudibazar Sections */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#D1E7DD] py-3 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#042017]">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <a
              href="#overview"
              className="rounded-full bg-[#F0FDF4] border border-[#D1E7DD] px-3.5 py-1.5 hover:bg-[#059669] hover:text-white transition-all shrink-0"
            >
              Overview
            </a>
            <a
              href="#commodity-rates"
              className="rounded-full bg-[#F0FDF4] border border-[#D1E7DD] px-3.5 py-1.5 hover:bg-[#059669] hover:text-white transition-all shrink-0"
            >
              Wholesale Rates
            </a>
            <a
              href="#history"
              className="rounded-full bg-[#F0FDF4] border border-[#D1E7DD] px-3.5 py-1.5 hover:bg-[#059669] hover:text-white transition-all shrink-0"
            >
              Heritage History
            </a>
            <a
              href="#dispute-cell"
              className="rounded-full bg-[#F0FDF4] border border-[#D1E7DD] px-3.5 py-1.5 hover:bg-[#059669] hover:text-white transition-all shrink-0"
            >
              Arbitration Cell
            </a>
            <a
              href="#committee"
              className="rounded-full bg-[#F0FDF4] border border-[#D1E7DD] px-3.5 py-1.5 hover:bg-[#059669] hover:text-white transition-all shrink-0"
            >
              Executive Committee
            </a>
            <a
              href="#contact-section"
              className="rounded-full bg-[#F0FDF4] border border-[#D1E7DD] px-3.5 py-1.5 hover:bg-[#059669] hover:text-white transition-all shrink-0"
            >
              Helpdesk &amp; Offices
            </a>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#059669] hover:underline"
          >
            <span>Return to APMC Portal</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Profile & Hero Section */}
      <section id="overview" className="relative overflow-hidden bg-white py-16 lg:py-20 border-b border-[#D1E7DD]">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <div>
                <span className="eyebrow inline-flex items-center gap-2 text-[#059669] font-bold">
                  <History className="h-4 w-4" />
                  HERITAGE WHOLESALE ASSOCIATION
                </span>
                <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#042017] leading-tight">
                  A Legacy of Trust in Wholesale Kariana &amp; Spice Trade
                </h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-[#059669]" />
                <p className="mt-6 text-base text-[#4B5563] leading-relaxed">
                  The <strong className="text-[#042017] font-bold">Bombay Mudibazar Kariana Merchants Association (BMKMA)</strong> is one of the most venerable trade bodies in Maharashtra, established to unify wholesale merchants operating in the historic trading precincts of South Mumbai.
                </p>
                <p className="mt-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  Chaired by <strong className="text-[#042017] font-semibold">Shri Kirti Rana</strong>, the Association has steered the community through major historical transformations — from traditional ledger trade in South Mumbai&apos;s Mudibazar to state-of-the-art warehouse infrastructure at the Navi Mumbai APMC complex.
                </p>

                {/* Key Metrics */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#D1E7DD] pt-6">
                  <div className="rounded-xl bg-[#F0FDF4] p-4 border border-[#D1E7DD]">
                    <span className="block font-heading text-2xl font-black text-[#042017]">
                      100+ Yrs
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#047857] mt-1 block">
                      Historic Legacy
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#F0FDF4] p-4 border border-[#D1E7DD]">
                    <span className="block font-heading text-2xl sm:text-3xl font-black text-[#059669]">
                      500+
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#047857] mt-1 block">
                      Trading Houses
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#F0FDF4] p-4 border border-[#D1E7DD] col-span-2 sm:col-span-1">
                    <span className="block font-heading text-2xl font-black text-[#042017]">
                      100%
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#047857] mt-1 block">
                      Arbitration Integrity
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full bg-[#059669] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#047857] hover:-translate-y-0.5"
                  >
                    <Users className="h-4 w-4" />
                    <span>Chairman Shri Kirti Rana</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about/chamber"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#042017] bg-white px-7 py-3.5 text-sm font-bold text-[#042017] transition-all hover:bg-[#042017] hover:text-white hover:-translate-y-0.5"
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Navi Mumbai Merchants Chamber</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <div className="relative mx-auto max-w-lg">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-2 border-[#059669] shadow-2xl bg-white">
                  <LightboxImage
                    src="/images/kirti-rana/agriculture.jpg"
                    alt="Wholesale Kariana & Spice Commodity Operations"
                    title="Bombay Mudibazar Kariana Merchants Association"
                    description="Premier wholesale kariana and spice trade association established in 1969, representing centuries of trading tradition and merchant unity in Mumbai."
                    category="MUDIBAZAR TRADITION"
                    caption="Bombay Mudibazar Kariana Merchants Association — Wholesale Tradition"
                    priority
                    className="h-full w-full rounded-none border-0 ring-0"
                    imgClassName="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#042017]/90 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl bg-[#042017]/90 p-4 backdrop-blur-md border border-white/10 text-white z-10">
                    <p className="text-[0.7rem] font-bold uppercase tracking-widest text-[#10B981]">
                      Mudibazar Wholesale Tradition
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Bombay Mudibazar Kariana Merchants Association
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Live Wholesale Commodity Price Ticker Section */}
      <section id="commodity-rates" className="py-16 bg-[#F0FDF4] border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#D1E7DD] pb-6">
            <div>
              <span className="eyebrow text-[#059669] font-bold">DAILY WHOLESALE BENCHMARKS</span>
              <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-extrabold text-[#042017]">
                Live Wholesale Commodity Indicative Ticker
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#4B5563]">
                Daily price bands for spices, dry fruits, pulses, and oilseeds at Bombay Mudibazar &amp; APMC Turbhe.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#D1E7DD] px-3 py-1 text-xs font-bold text-[#047857] self-start sm:self-auto shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#059669] animate-pulse" />
              Live Market Rates
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {commodityRates.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-[#D1E7DD] bg-white p-4 shadow-sm hover:border-[#059669] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-wider text-[#047857]">
                    <span>{c.category}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[0.62rem] font-extrabold ${
                        c.trend.startsWith("+")
                          ? "bg-emerald-100 text-emerald-800"
                          : c.trend.startsWith("-")
                          ? "bg-rose-100 text-rose-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {c.trend}
                    </span>
                  </div>
                  <h4 className="mt-2 font-heading text-sm font-bold text-[#042017] leading-snug">
                    {c.name}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="block font-heading text-base font-black text-[#059669]">
                    {c.rate}
                  </span>
                  <span className="text-[0.7rem] text-slate-500 font-medium">
                    Status: {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[0.75rem] text-slate-500 text-center italic">
            * Wholesale indicative price bands published for member information. Actual auction transactions depend on quality grade, moisture percentage, and bag sizes at APMC yard.
          </p>
        </div>
      </section>

      {/* Historical Milestones & APMC Migration */}
      <section id="history" className="py-16 lg:py-24 bg-white border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="TRADING HERITAGE"
            title="Evolution of Bombay Mudibazar"
            description="From South Mumbai's century-old ledger bazaars to Asia's premier wholesale agricultural terminal at Navi Mumbai APMC."
            align="center"
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {historicalMilestones.map((m, idx) => (
              <div
                key={m.year}
                className="relative rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-6 transition-all hover:-translate-y-1 hover:border-[#059669] hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#042017] text-[#10B981] font-heading text-lg font-black shadow-md mb-4">
                  {idx + 1}
                </div>
                <span className="inline-block font-heading text-2xl font-black text-[#059669]">
                  {m.year}
                </span>
                <h3 className="mt-2 font-heading text-base font-bold text-[#042017]">
                  {m.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guiding Association Pillars */}
      <section className="py-16 lg:py-24 bg-[#F0FDF4] border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FOUNDATIONAL MANDATE"
            title="Core Pillars of BMKMA"
            description="Preserving ethical merchant values while providing modern commercial arbitration, quality standards, and welfare."
            align="left"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tradePillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-[#D1E7DD] bg-white p-7 shadow-sm transition-all hover:border-[#059669] hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#042017] text-[#10B981] mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#042017]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dispute Arbitration Cell Special Feature */}
      <section id="dispute-cell" className="py-16 lg:py-24 bg-[#042017] text-white border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow text-[#10B981] font-bold inline-flex items-center gap-2">
                <Scale className="h-4 w-4" />
                COMMERCIAL ARBITRATION CELL
              </span>
              <h2 className="mt-2 font-heading text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Binding Commercial Trade Dispute Redressal
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-[#059669]" />
              <p className="mt-6 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                The **Bombay Mudibazar Kariana Merchants Association** operates a century-old commercial dispute arbitration bench. When business disagreements over quality specs, payment timelines, or delivery contracts arise between member merchants, processors, or buyers, the Association provides neutral, binding mediation.
              </p>

              <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                  <span>100% Integrity record with zero court escalation requirements</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                  <span>Senior merchant arbitrators with deep commodity grading knowledge</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />
                  <span>Rapid 14-day hearing and settlement timeline</span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#contact-section"
                  className="inline-flex items-center gap-2 rounded-full bg-[#059669] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#047857] transition-all shadow-lg"
                >
                  <FileText className="h-4 w-4" />
                  <span>Submit Arbitration Petition</span>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[#059669]/40 bg-gradient-to-b from-[#083526] to-[#041a12] p-8 text-white shadow-2xl">
              <h3 className="font-heading text-xl font-bold text-[#10B981] mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Arbitration Procedure Steps
              </h3>
              <ol className="space-y-4 text-xs sm:text-sm text-slate-200">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-bold text-xs">1</span>
                  <span><strong>Lodge Petition:</strong> Member merchant submits dispute petition along with invoice copies &amp; trade contract terms.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-bold text-xs">2</span>
                  <span><strong>Bench Assignment:</strong> BMKMA Committee appoints a 3-member neutral merchant arbitration bench.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-bold text-xs">3</span>
                  <span><strong>Hearing &amp; Commodity Inspection:</strong> Bench inspects physical commodity samples and hears both trading parties.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#059669] text-white font-bold text-xs">4</span>
                  <span><strong>Final Award:</strong> Binding settlement order issued for immediate financial or inventory compliance.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Directory Section */}
      <section id="committee" className="py-16 lg:py-24 bg-white border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="LEADERSHIP DIRECTORY"
            title="BMKMA Executive Committee"
            description="Distinguished trade leaders guiding the association and safeguarding merchant rights."
            align="center"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {committeeMembers.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-6 shadow-sm hover:border-[#059669] hover:bg-white hover:shadow-md transition-all text-center flex flex-col justify-between"
              >
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#042017] text-[#10B981] font-heading text-xl font-bold border-2 border-[#059669] mb-4 shadow-md">
                    {m.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  <span className="inline-block rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-[0.68rem] font-extrabold uppercase text-[#047857] mb-2">
                    {m.role}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-[#042017]">
                    {m.name}
                  </h3>
                  <p className="text-xs text-[#059669] font-semibold mt-1">
                    {m.experience}
                  </p>
                  <p className="mt-3 text-xs text-[#4B5563] leading-relaxed">
                    {m.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <span className="text-[0.72rem] font-bold text-slate-500">
                    BMKMA Committee Bench
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Office Information */}
      <section id="contact-section" className="py-16 lg:py-24 bg-[#F0FDF4] border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow text-[#059669] font-bold">GET IN TOUCH</span>
              <h2 className="mt-1 font-heading text-2xl sm:text-4xl font-extrabold text-[#042017]">
                Association Offices &amp; Helpdesk
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                Connect with the Bombay Mudibazar Kariana Merchants Association secretariat for membership, arbitration petitions, or trade verification certificates.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 border border-[#D1E7DD] shadow-sm">
                  <MapPin className="h-6 w-6 text-[#059669] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#042017]">
                      Navi Mumbai APMC Office
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      Central Facility Building, APMC Market-I, Phase-II, Sector 19, Turbhe, Navi Mumbai - 400705, Maharashtra, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 border border-[#D1E7DD] shadow-sm">
                  <Building2 className="h-6 w-6 text-[#059669] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#042017]">
                      South Mumbai Historic Office
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      Mudibazar Trading Precinct, Mandvi / Masjid Bunder, Mumbai - 400009, Maharashtra, India.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-[#D1E7DD] shadow-sm">
                    <Phone className="h-5 w-5 text-[#059669] shrink-0" />
                    <div className="text-xs">
                      <span className="block text-slate-500 font-semibold">Phone Helpline</span>
                      <strong className="text-[#042017] font-bold">+91 (022) 2342-5500</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-[#D1E7DD] shadow-sm">
                    <Mail className="h-5 w-5 text-[#059669] shrink-0" />
                    <div className="text-xs">
                      <span className="block text-slate-500 font-semibold">Official Email</span>
                      <strong className="text-[#042017] font-bold">mudibazar4u@hotmail.com</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry & Membership Form Box */}
            <MudibazarInquiryForm />
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <CTASection
        variant="navy"
        eyebrow="Preserving Wholesale Tradition"
        title="Connect with Bombay Mudibazar Kariana Merchants Association"
        description="Join over 500+ wholesale trading houses across Maharashtra benefiting from market arbitration, commodity quality standards, and apex policy advocacy."
        buttons={[
          { label: "Return to Main APMC Portal", href: "/", variant: "secondary" },
          { label: "Contact BMKMA Secretariat", href: "/contact", variant: "primary" },
        ]}
      />
    </div>
  );
}
