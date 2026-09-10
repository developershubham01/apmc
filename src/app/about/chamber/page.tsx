import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Users,
  ShieldCheck,
  TrendingUp,
  Store,
  Scale,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Globe2,
  FileText,
  MapPin,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";

export const metadata: Metadata = {
  title: "Navi Mumbai Merchants Chamber | Apex APMC Trade Body",
  description:
    "Official portal of Navi Mumbai Merchants Chamber — The apex commercial body representing 400+ wholesale merchants, processors and exporters across the 50-acre APMC Turbhe complex.",
  alternates: { canonical: "/about/chamber" },
};

const chamberKeyPillars = [
  {
    icon: Users,
    title: "400+ Enterprise Network",
    description:
      "Uniting leading agro-commodity processors, wholesale traders, spice exporters, and cold storage operators under a single authoritative apex federation.",
  },
  {
    icon: Building2,
    title: "50-Acre Turbhe Complex",
    description:
      "Administering Asia's largest dedicated wholesale spice, grain, and commodity trading complex at APMC Market-I and Market-II, Sector 19, Turbhe.",
  },
  {
    icon: ShieldCheck,
    title: "National Policy Advocacy",
    description:
      "Liaison with Union Ministries, GST Council, FSSAI, Spices Board, and State Governments to champion trader welfare and rationalize commercial taxation.",
  },
  {
    icon: Globe2,
    title: "Export Trade Promotion",
    description:
      "Facilitating phytosanitary certifications, international trade compliance, container logistics, and global market linkages for agri-commodity exporters.",
  },
  {
    icon: Scale,
    title: "Commercial Dispute Redressal",
    description:
      "Operating a permanent arbitration and mediation tribunal to resolve merchant commercial disputes equitably, upholding ethical trade standards.",
  },
  {
    icon: Store,
    title: "Market Modernization",
    description:
      "Pioneering digital auction systems, high-capacity cold storage, solar grid adoption, and computerized weighbridge infrastructure.",
  },
];

const milestones = [
  {
    year: "1990s",
    title: "Establishment at APMC Turbhe",
    description:
      "Founded to represent wholesale merchants shifting from congested South Mumbai markets to the newly planned 50-acre modern APMC complex at Navi Mumbai.",
  },
  {
    year: "2000s",
    title: "Infrastructure & Cold Chain Expansion",
    description:
      "Spearheaded creation of multi-storey commercial trade blocks, loading bay logistics, and high-capacity refrigerated warehousing.",
  },
  {
    year: "2017",
    title: "GST Advocacy & Rationalization",
    description:
      "Successfully led merchant representations to the Central GST Council, securing vital tax exemptions and simplified return procedures for essential commodities.",
  },
  {
    year: "2026+",
    title: "Digital Trade & Global Export Hub",
    description:
      "Connecting Navi Mumbai APMC with international trade corridors, digital price boards, and solar-powered sustainable market operations.",
  },
];

export default function ChamberAboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Apex Commercial Body"
        title="Navi Mumbai Merchants Chamber"
        description="The premier trade federation orchestrating domestic and international agro-commodity commerce across Asia's largest 50-acre APMC wholesale complex."
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Navi Mumbai Merchants Chamber" },
        ]}
      />

      {/* Overview Section with Architectural Focus */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <div>
                <span className="eyebrow text-gold font-bold">ESTABLISHED 30+ YEARS</span>
                <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy leading-tight">
                  The Apex Commercial Voice of Wholesale Agri-Trade
                </h2>
                <div className="mt-4 gold-hairline" />
                <p className="mt-6 text-base text-ink-600 leading-relaxed">
                  The <strong className="text-navy font-bold">Navi Mumbai Merchants Chamber</strong> stands as the principal governing commercial organization representing over 400 wholesale enterprises, exporters, and processing units at the Agricultural Produce Market Committee (APMC) complex in Turbhe, Navi Mumbai.
                </p>
                <p className="mt-4 text-sm sm:text-base text-ink-600 leading-relaxed">
                  Under the visionary leadership of <strong className="text-navy font-semibold">President Shri Kirti Rana</strong>, the Chamber serves as the vital bridge between grassroots agricultural producers, wholesale distributors, international trade buyers, and government statutory bodies.
                </p>

                {/* Quick Chamber Highlights */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                  <div className="rounded-xl bg-mist p-4 border border-border/80">
                    <span className="block font-heading text-2xl sm:text-3xl font-black text-royal">
                      400+
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 mt-1 block">
                      Member Enterprises
                    </span>
                  </div>
                  <div className="rounded-xl bg-mist p-4 border border-border/80">
                    <span className="block font-heading text-2xl sm:text-3xl font-black text-gold-600">
                      50 Acres
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 mt-1 block">
                      Trade Complex Area
                    </span>
                  </div>
                  <div className="rounded-xl bg-mist p-4 border border-border/80">
                    <span className="block font-heading text-2xl sm:text-3xl font-black text-navy">
                      5 Hubs
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 mt-1 block">
                      APMC Commodity Markets
                    </span>
                  </div>
                  <div className="rounded-xl bg-mist p-4 border border-border/80">
                    <span className="block font-heading text-2xl sm:text-3xl font-black text-emerald-600">
                      30+ Yrs
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 mt-1 block">
                      Institutional Legacy
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/board"
                    className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-premium hover:bg-navy-700 transition-all hover:-translate-y-0.5"
                  >
                    <Users className="h-4 w-4 text-gold" />
                    <span>Governing Board of Directors</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/apmc"
                    className="inline-flex items-center gap-2 rounded-xl border border-royal/30 bg-royal-50 px-6 py-3 text-sm font-bold text-royal hover:bg-royal/10 transition-all"
                  >
                    <Store className="h-4 w-4" />
                    <span>Explore 50-Acre Complex</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <div className="relative mx-auto max-w-lg">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-amber-400/40 shadow-2xl">
                  <Image
                    src="/images/hero/chamber-headquarters-hero.jpg"
                    alt="Navi Mumbai Merchants Chamber Headquarters and APMC Trade Center"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-navy-950/90 p-4 backdrop-blur-md border border-white/10 text-white">
                    <p className="text-[0.7rem] font-bold uppercase tracking-widest text-gold">
                      APMC Trade Center • Turbhe
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Navi Mumbai Merchants Chamber Central Secretariat
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Objectives & Key Pillars */}
      <section className="bg-mist py-16 lg:py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Key Responsibilities"
            title="Core Objectives & Strategic Mandate"
            description="Empowering the wholesale merchant community through modern infrastructure, transparent trading frameworks, and robust policy representation."
            align="center"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chamberKeyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-border bg-white p-7 shadow-premium transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:shadow-premium-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50 text-royal ring-1 ring-royal/20 mb-5">
                    <Icon className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-ink-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chamber Institutional Milestones */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Historical Journey"
            title="Three Decades of Trade Leadership"
            description="Key milestones in the evolution of Navi Mumbai Merchants Chamber from market relocation to a global agro-trading hub."
            align="left"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className="relative rounded-2xl border border-border bg-mist/60 p-6 transition-all hover:bg-white hover:border-gold/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-heading text-xl font-black text-royal">
                    {m.year}
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold-600 text-xs font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-navy">
                  {m.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-ink-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Secretariat Contact Box */}
      <section className="bg-[#050b1a] text-white py-16 lg:py-20 border-t border-amber-500/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Chamber Secretariat
              </span>
              <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Official Head Office &amp; Administration
              </h3>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                The administrative secretariat operates daily to serve registered merchants, process trade dispute applications, coordinate with APMC authorities, and issue trade advisories.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 border border-white/10">
                  <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-200">
                    <strong className="block text-white font-bold mb-0.5">Secretariat Address</strong>
                    Central Facility Building, APMC Market-I, Phase-II, Sector 19, Turbhe, Navi Mumbai - 400705
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 border border-white/10">
                  <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-200">
                    <strong className="block text-white font-bold mb-0.5">Contact &amp; Helpdesk</strong>
                    <span>chamber@nmmc-apmc.org</span>
                    <span className="block text-slate-400 mt-1">+91 (022) 2788-1000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Navigation Links */}
            <div className="rounded-3xl border border-amber-500/30 bg-navy-900/80 p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-heading text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span>Related Sections</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-slate-200 hover:bg-white/10 hover:text-gold transition-colors"
                    >
                      <span>About Shri Kirti Rana</span>
                      <ChevronRight className="h-4 w-4 text-gold" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/bombay-mudibazar"
                      className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-slate-200 hover:bg-white/10 hover:text-gold transition-colors"
                    >
                      <span>Bombay Mudibazar Kariana Association</span>
                      <ChevronRight className="h-4 w-4 text-gold" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/board"
                      className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-slate-200 hover:bg-white/10 hover:text-gold transition-colors"
                    >
                      <span>Governing Board Directory</span>
                      <ChevronRight className="h-4 w-4 text-gold" />
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-xs font-bold text-navy shadow-gold-glow hover:bg-gold-400 transition-colors uppercase tracking-wider"
              >
                <span>Connect With Chamber</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Merchant Services"
        title="Access Wholesale Rates, Trade Advisory & Member Facilities"
        description="Connect with the Navi Mumbai Merchants Chamber for trade disputes, export facilitation, and APMC market operations."
        buttons={[
          { label: "View Daily Rates", href: "/apmc#market-rates", variant: "primary" },
          { label: "Contact Chamber", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}
