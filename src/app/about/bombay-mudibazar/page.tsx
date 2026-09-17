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
import { LightboxImage } from "@/components/site/LightboxImage";

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
        backgroundImage="/images/apmc/spice-market.jpg"
        imageOpacity={90}
      />

      {/* Dedicated Portal Banner Bar */}
      <div className="bg-gradient-to-r from-[#042017] via-[#083526] to-[#042017] py-6 px-4 border-b border-[#D97706]/40 text-white">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-amber-400 block">
                OFFICIAL DEDICATED SITE
              </span>
              <h3 className="font-heading text-base font-bold text-white">
                Looking for the standalone Mudibazar Association Website?
              </h3>
            </div>
          </div>
          <Link
            href="/mudibazar"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md hover:from-amber-500 hover:to-amber-600 transition-all"
          >
            <span>Visit Dedicated Mudibazar Website</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Main Profile & History Section with Architectural Focus & High Visibility Background */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-b border-[#D1E7DD]">
        {/* Subtle Architectural Watermark */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/apmc/spice-market.jpg"
            alt="Spice Market Background"
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <div>
                <span className="eyebrow inline-flex items-center gap-2 text-[#059669] font-bold">
                  <History className="h-4 w-4" />
                  HERITAGE TRADE BODY
                </span>
                <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#042017] leading-tight">
                  A Legacy of Trust in Wholesale Kariana &amp; Spice Trade
                </h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-[#059669]" />
                <p className="mt-6 text-base text-[#4B5563] leading-relaxed">
                  The <strong className="text-[#042017] font-bold">Bombay Mudibazar Kariana Merchants Association (BMKMA)</strong> is one of the most venerable and respected trade bodies in Maharashtra, established to unify wholesale merchants operating in the historic trading precincts of South Mumbai.
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

      {/* Core Functions & Historical Mandate */}
      <section className="bg-[#F0FDF4] py-16 lg:py-24 border-b border-[#D1E7DD]">
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
                  className="rounded-2xl border border-[#D1E7DD] bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#059669] hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#042017] text-[#10B981] ring-1 ring-[#059669]/30 mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#042017]">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#4B5563] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commodity Spectrum Covered */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#D1E7DD]">
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
                className="rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-6 hover:bg-white hover:border-[#059669] hover:shadow-md transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#047857]">
                  Segment 0{idx + 1}
                </span>
                <h4 className="mt-2 font-heading text-base font-bold text-[#042017]">
                  {cat.name}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {cat.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Sections & Contact */}
      <section className="bg-[#F0FDF4] text-[#042017] py-16 lg:py-20 border-t border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#047857]">
                Heritage Association Office
              </span>
              <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-[#042017]">
                Tradition Meets Modern Trade Leadership
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl">
                The Bombay Mudibazar Kariana Merchants Association maintains strong liaisons with state and central trade federations, ensuring ethical commercial dispute arbitration, transparent commodity benchmarks, and merchant welfare.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-[#D1E7DD] shadow-sm">
                  <MapPin className="h-5 w-5 text-[#059669] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#4B5563]">
                    <strong className="block text-[#042017] font-bold mb-0.5">Association Office</strong>
                    Mudibazar Precinct, South Mumbai &amp; APMC Commodity Complex, Turbhe, Navi Mumbai
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-[#D1E7DD] shadow-sm">
                  <Mail className="h-5 w-5 text-[#059669] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#4B5563]">
                    <strong className="block text-[#042017] font-bold mb-0.5">Liaison Contact</strong>
                    <span>mudibazar@apmc-merchants.org</span>
                    <span className="block text-[#047857] font-bold mt-1">+91 (022) 2342-5500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Navigation Links */}
            <div className="rounded-3xl border border-[#D1E7DD] bg-white p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="font-heading text-base font-bold text-[#042017] mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#059669]" />
                  <span>Related Sections</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="flex items-center justify-between rounded-xl bg-[#F0FDF4] p-3 text-[#042017] hover:bg-[#ECFDF5] hover:text-[#059669] transition-colors border border-[#D1E7DD]"
                    >
                      <span>About Shri Kirti Rana</span>
                      <ChevronRight className="h-4 w-4 text-[#059669]" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/chamber"
                      className="flex items-center justify-between rounded-xl bg-[#F0FDF4] p-3 text-[#042017] hover:bg-[#ECFDF5] hover:text-[#059669] transition-colors border border-[#D1E7DD]"
                    >
                      <span>Navi Mumbai Merchants Chamber</span>
                      <ChevronRight className="h-4 w-4 text-[#059669]" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/apmc"
                      className="flex items-center justify-between rounded-xl bg-[#F0FDF4] p-3 text-[#042017] hover:bg-[#ECFDF5] hover:text-[#059669] transition-colors border border-[#D1E7DD]"
                    >
                      <span>Navi Mumbai APMC Market</span>
                      <ChevronRight className="h-4 w-4 text-[#059669]" />
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#059669] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#047857] transition-all uppercase tracking-wider"
              >
                <span>Connect With Association</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Agricultural Commerce"
        title="Explore India's Spice & Commodity Trading Ecosystem"
        description="Learn more about commodity varieties, daily wholesale rate bands, and market governance."
        buttons={[
          { label: "Explore APMC Markets", href: "/apmc", variant: "primary" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}
