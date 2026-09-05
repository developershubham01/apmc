import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ExternalLink,
  Store,
  CalendarDays,
  Info,
  ArrowRight,
  Building2,
  Phone,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { MarketCard } from "@/components/site/MarketCard";
import { CTASection } from "@/components/site/CTASection";
import { markets } from "@/data/markets";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Navi Mumbai APMC Market | Kirti Rana",
  description:
    "Navi Mumbai APMC Market in Turbhe is a major wholesale agricultural trading ecosystem serving fruits, vegetables, grains, spices and onion-potato commodities.",
  alternates: { canonical: "/apmc" },
};

const marketInfo = [
  { icon: MapPin, label: "Location", value: siteConfig.apmcAddress },
  {
    icon: Clock,
    label: "Timings",
    value: "Early morning to evening (verify with official source)",
  },
  {
    icon: CalendarDays,
    label: "Trading Days",
    value: "Refer to official Mumbai APMC portal for holidays",
  },
  {
    icon: Building2,
    label: "Market Type",
    value: "Wholesale Agricultural Produce Market",
  },
];

export default function ApmcPage() {
  return (
    <>
      <PageHeader
        eyebrow="APMC Market"
        title="Navi Mumbai APMC Market"
        description="APMC Market in Turbhe, Navi Mumbai, is a major wholesale agricultural trading ecosystem serving fruits, vegetables, grains, spices and onion-potato commodities."
        crumbs={[{ label: "APMC" }]}
      />

      {/* Market Overview */}
      <section id="market-overview" className="bg-white py-16 lg:py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <SectionHeading
                align="left"
                eyebrow="Market Overview"
                title="A Wholesale Trading Ecosystem"
              />
              <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-ink-600">
                The Navi Mumbai APMC Market, located at Turbhe along the
                Thane-Belapur Road, is one of the major wholesale agricultural
                produce markets serving the Mumbai Metropolitan Region. It
                brings together farmers, commission agents, wholesalers and
                retailers across multiple commodity segments.
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ink-600">
                The market is organised into dedicated sections — fruit,
                vegetable, grain, spice, and onion &amp; potato — each operating
                with its own auction and trading rhythm. Daily arrivals and
                prices are published through the official Mumbai APMC portal.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={siteConfig.dailyRatesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-600 text-white transition-all hover:bg-navy-700 hover:-translate-y-0.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  Daily Market Rates
                </a>
                <Link
                  href="#market-information"
                  className="inline-flex items-center gap-2 rounded-xl border border-navy/15 bg-white px-5 py-3 text-sm font-600 text-navy transition-all hover:border-gold hover:text-royal"
                >
                  Market Information
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-border shadow-premium-lg">
                <div className="img-zoom relative aspect-[4/3]">
                  <Image
                    src="/images/apmc/market-yard.jpg"
                    alt="Navi Mumbai APMC market yard"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
                    APMC Turbhe
                  </p>
                  <p className="mt-1 font-heading text-xl font-700 text-white">
                    Navi Mumbai Wholesale Market Yard
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Market Categories */}
      <section className="relative bg-mist py-16 lg:py-24">
        <div aria-hidden className="absolute inset-0 bg-heritage-grid opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Market Categories"
            title="Five Commodity Markets"
            description="The APMC is organised into dedicated wholesale trading sections, each serving a distinct category of agricultural produce."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market, i) => (
              <MarketCard key={market.slug} market={market} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed market sections */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {markets.map((market, i) => {
            const Icon = market.icon;
            const reverse = i % 2 === 1;
            return (
              <div
                key={market.slug}
                id={market.slug}
                className="scroll-mt-24 grid items-center gap-8 lg:gap-12 lg:grid-cols-2"
              >
                <ScrollReveal variant={reverse ? "right" : "left"} className={reverse ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden rounded-2xl ring-1 ring-border shadow-premium">
                    <div className="img-zoom relative aspect-[16/10]">
                      <Image
                        src={market.image}
                        alt={market.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"
                      />
                      <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-royal shadow-premium ring-1 ring-white/60">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal variant={reverse ? "left" : "right"} className={reverse ? "lg:order-1" : ""}>
                  <span className="eyebrow inline-flex items-center gap-2 text-royal">
                    <span aria-hidden className="inline-block h-px w-6 bg-gold" />
                    Market {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-700 text-navy">
                    {market.title}
                  </h3>
                  <span aria-hidden className="mt-3 block gold-hairline" />
                  <p className="mt-4 text-pretty text-base leading-relaxed text-ink-600">
                    {market.longDescription}
                  </p>
                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                      Traded Commodities
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {market.commodities.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-mist px-3 py-1 text-xs font-500 text-ink-600 ring-1 ring-border"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Market Information */}
      <section id="market-information" className="bg-mist py-16 lg:py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Market Information"
            title="Location, Timings & Resources"
            description="Essential information for visiting or engaging with the Navi Mumbai APMC Market. Verify current timings with the official source."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {marketInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <ScrollReveal key={info.label} variant="up" delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-premium">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal ring-1 ring-royal/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-xs uppercase tracking-[0.14em] text-royal font-600">
                      {info.label}
                    </p>
                    <p className="mt-1.5 text-sm font-500 text-ink leading-relaxed">
                      {info.value}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Official resources */}
          <ScrollReveal variant="up" className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-premium">
              <div className="border-b border-border bg-navy px-6 py-4">
                <h3 className="flex items-center gap-2 font-heading text-base font-700 text-white">
                  <Store className="h-5 w-5 text-gold" />
                  Official Resources
                </h3>
              </div>
              <div className="divide-y divide-border">
                <a
                  href={siteConfig.mumbaiApmcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-mist"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-royal-50 text-royal ring-1 ring-royal/20">
                      <ExternalLink className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-600 text-navy">Mumbai APMC — Official Website</p>
                      <p className="text-xs text-ink-600">mumbaiapmc.org</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-royal transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={siteConfig.dailyRatesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-mist"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-600 ring-1 ring-gold/30">
                      <ExternalLink className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-600 text-navy">Daily Market Prices</p>
                      <p className="text-xs text-ink-600">Official daily rates portal</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-royal transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Disclaimer */}
          <ScrollReveal variant="up" className="mt-8">
            <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold-50/60 p-5">
              <Info className="h-5 w-5 shrink-0 text-gold-600" />
              <p className="text-sm text-ink-600">
                This is a static informational website. Market timings, holidays
                and daily prices are subject to change — always confirm with the
                official Mumbai APMC portal before planning a visit or trade.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Daily Rates"
        icon={Phone}
        title="Today's APMC Market Rates"
        description="Market prices are published through the official Mumbai APMC portal. This website does not display live prices."
        buttons={[
          {
            label: "View Official Daily Rates",
            href: siteConfig.dailyRatesUrl,
            external: true,
            variant: "primary",
          },
          {
            label: "View Gallery",
            href: "/gallery",
            variant: "secondary",
          },
        ]}
      />
    </>
  );
}
