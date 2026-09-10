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
  FileCheck,
  Handshake,
  MapPin,
  Mail,
  Wheat,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";

export const metadata: Metadata = {
  title: "Bombay Mudibazar Kariana Merchants Association | Historic Trade Body",
  description:
    "Official page of Bombay Mudibazar Kariana Merchants Association — Century-old premier wholesale trade association for spices, kirana and agro-commodities, chaired by Shri Kirti Rana.",
  alternates: { canonical: "/about/bombay-mudibazar" },
};

const historicalPillars = [
  {
    icon: History,
    title: "Century-Old Heritage",
    description:
      "Rooted in Mumbai's historic Mudibazar (South Mumbai), representing generations of traditional kariana, grocery, and condiment wholesalers.",
  },
  {
    icon: Scale,
    title: "Arbitration & Trade Ethics",
    description:
      "Time-honoured commercial dispute resolution system maintaining absolute merchant trust and settlement reliability across Western India.",
  },
  {
    icon: Store,
    title: "Market Transition to APMC",
    description:
      "Pioneered the strategic relocation of wholesale spice and grain trade operations from congested inner-city bazaars to Navi Mumbai APMC Turbhe.",
  },
  {
    icon: Wheat,
    title: "Commodity Quality Standards",
    description:
      "Setting purity, grading, and packaging benchmarks for dry fruits, whole spices, pulses, edible oils, and essential food items.",
  },
  {
    icon: ShieldCheck,
    title: "Merchant Welfare & Security",
    description:
      "Providing financial assistance, medical security, and mutual aid funds for member trading houses, staff, and market workers.",
  },
  {
    icon: Handshake,
    title: "Apex Inter-Trade Alliances",
    description:
      "Affiliated closely with Federation of Associations of Maharashtra (FAM) and national commodity trade networks.",
  },
];

const commodityCategories = [
  { name: "Whole & Ground Spices", items: "Turmeric, Cumin, Coriander, Black Pepper, Cardamom, Cloves" },
  { name: "Dry Fruits & Nuts", items: "Almonds, Cashews, Raisins, Pistachios, Walnuts" },
  { name: "Grains & Pulses", items: "Basmati Rice, Wheat, Moong, Chana, Toor Dal, Urad" },
  { name: "Oilseeds & Condiments", items: "Mustard, Sesame Seeds, Fenugreek, Asafoetida (Hing)" },
];

export default function BombayMudibazarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Historic Trade Heritage"
        title="Bombay Mudibazar Kariana Merchants Association"
        description="Preserving over a century of traditional wholesale trade excellence in spices, kariana, and agro-commodities under the stewardship of Chairman Shri Kirti Rana."
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Bombay Mudibazar Kariana Merchants Association" },
        ]}
      />

      {/* Main Profile & History Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <div>
                <span className="eyebrow text-gold font-bold">HERITAGE TRADE BODY</span>
                <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy leading-tight">
                  A Legacy of Trust in Wholesale Kariana &amp; Spice Trade
                </h2>
                <div className="mt-4 gold-hairline" />
                <p className="mt-6 text-base text-ink-600 leading-relaxed">
                  The <strong className="text-navy font-bold">Bombay Mudibazar Kariana Merchants Association (BMKMA)</strong> is one of the most venerable and respected trade bodies in Maharashtra, established to unify wholesale merchants operating in the historic trading precincts of South Mumbai.
                </p>
                <p className="mt-4 text-sm sm:text-base text-ink-600 leading-relaxed">
                  Chaired by <strong className="text-navy font-semibold">Shri Kirti Rana</strong>, the Association has steered the community through major historical transformations — from traditional ledger trade in South Mumbai&apos;s Mudibazar to state-of-the-art warehouse infrastructure at the Navi Mumbai APMC complex.
                </p>

                {/* Key Metrics */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-border pt-6">
                  <div className="rounded-xl bg-mist p-4 border border-border">
                    <span className="block font-heading text-2xl font-black text-royal">
                      100+ Yrs
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 mt-1 block">
                      Historic Legacy
                    </span>
                  </div>
                  <div className="rounded-xl bg-mist p-4 border border-border">
                    <span className="block font-heading text-2xl font-black text-gold-600">
                      500+
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 mt-1 block">
                      Trading Houses
                    </span>
                  </div>
                  <div className="rounded-xl bg-mist p-4 border border-border col-span-2 sm:col-span-1">
                    <span className="block font-heading text-2xl font-black text-navy">
                      100%
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 mt-1 block">
                      Arbitration Integrity
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-premium hover:bg-navy-700 transition-all hover:-translate-y-0.5"
                  >
                    <Users className="h-4 w-4 text-gold" />
                    <span>Chairman Shri Kirti Rana</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about/chamber"
                    className="inline-flex items-center gap-2 rounded-xl border border-royal/30 bg-royal-50 px-6 py-3 text-sm font-bold text-royal hover:bg-royal/10 transition-all"
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Navi Mumbai Merchants Chamber</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <div className="relative mx-auto max-w-lg">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-amber-400/40 shadow-2xl">
                  <Image
                    src="/images/kirti-rana/agriculture.jpg"
                    alt="Wholesale Kariana & Spice Commodity Operations"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-navy-950/90 p-4 backdrop-blur-md border border-white/10 text-white">
                    <p className="text-[0.7rem] font-bold uppercase tracking-widest text-gold">
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

      {/* Core Functions & Historical Mandate */}
      <section className="bg-mist py-16 lg:py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Key Functions"
            title="Guiding Pillars of BMKMA"
            description="Preserving traditional mercantile ethos while adapting to modern regulatory and distribution dynamics."
            align="center"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {historicalPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border bg-white p-7 shadow-premium transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:shadow-premium-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 ring-1 ring-gold/30 mb-5">
                    <Icon className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-ink-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commodity Spectrum Covered */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trade Portfolio"
            title="Major Commodity Segments"
            description="The key agricultural and grocery categories regulated and traded by member merchants."
            align="left"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {commodityCategories.map((cat, idx) => (
              <div
                key={cat.name}
                className="rounded-2xl border border-border bg-mist/60 p-6 hover:bg-white hover:border-gold/50 hover:shadow-md transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                  Segment 0{idx + 1}
                </span>
                <h4 className="mt-2 font-heading text-base font-bold text-navy">
                  {cat.name}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-ink-600 leading-relaxed">
                  {cat.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Sections & Contact */}
      <section className="bg-[#050b1a] text-white py-16 lg:py-20 border-t border-amber-500/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Heritage Trade Association
              </span>
              <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Leadership Under Chairman Shri Kirti Rana
              </h3>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                The Bombay Mudibazar Kariana Merchants Association continues to champion merchant unity, ethical wholesale practices, and active participation in state-level trade federations.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="flex items-center justify-between rounded-2xl bg-white/10 p-4 text-white hover:bg-amber-400 hover:text-slate-950 font-bold transition-all"
              >
                <span>About Shri Kirti Rana</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/board"
                className="flex items-center justify-between rounded-2xl bg-white/10 p-4 text-white hover:bg-amber-400 hover:text-slate-950 font-bold transition-all"
              >
                <span>Governing Board of Directors</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gold p-4 text-slate-950 font-black hover:bg-gold-400 shadow-gold-glow transition-all uppercase tracking-wider text-xs"
              >
                <span>Connect With Secretariat</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Wholesale Network"
        title="Connect With Maharashtra's Premier Merchant Bodies"
        description="Learn more about our trade advocacy, APMC market infrastructure, and wholesale commodity networks."
        buttons={[
          { label: "Explore APMC Markets", href: "/apmc", variant: "primary" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}
