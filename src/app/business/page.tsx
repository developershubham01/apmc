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
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Kisan Kirti Agro Pvt. Ltd. | Kirti Rana",
  description:
    "Kisan Kirti Agro Pvt. Ltd. — the business association of Kirti Rana, positioned within the agriculture and trade ecosystem of Navi Mumbai APMC.",
  alternates: { canonical: "/business" },
};

// Editable business data structure — update here when verified info is available.
const businessInfo = {
  name: "Kisan Kirti Agro Pvt. Ltd.",
  type: "Private Limited Company",
  sector: "Agriculture & Trade",
  region: "Navi Mumbai, Maharashtra",
  // The following fields are intentionally left as "to be updated"
  // to avoid fabricating business details.
  established: "Information to be updated",
  turnover: "Information to be updated",
  employees: "Information to be updated",
  products: "Information to be updated",
  certifications: "Information to be updated",
};

const overviewItems = [
  {
    icon: Sprout,
    title: "Agriculture & Trade",
    description:
      "Aligned with the agricultural trading activity centred around the Navi Mumbai APMC market.",
  },
  {
    icon: Store,
    title: "APMC Ecosystem",
    description:
      "Operating within one of Maharashtra's major wholesale agricultural trading ecosystems.",
  },
  {
    icon: TrendingUp,
    title: "Business Development",
    description:
      "Focused on trade and commerce linked to the region's agricultural produce supply chain.",
  },
  {
    icon: Building2,
    title: "Private Limited",
    description:
      "Incorporated as a private limited company under the Kirti Rana business association.",
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business"
        title="Kisan Kirti Agro Pvt. Ltd."
        description="The business association of Kirti Rana, positioned within the agriculture and trade ecosystem of Navi Mumbai."
        crumbs={[{ label: "Business" }]}
      />

      {/* Overview */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <SectionHeading
                align="left"
                eyebrow="Overview"
                title="Rooted in Agriculture & Trade"
              />
              <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-ink-600">
                Kisan Kirti Agro Pvt. Ltd. is the business association of Kirti
                Rana, positioned within the agriculture and trade ecosystem of
                Navi Mumbai. The venture aligns with the region&apos;s
                agricultural trading activity centred around the APMC market at
                Turbhe.
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ink-600">
                As a private limited company, Kisan Kirti Agro operates within
                the framework of India&apos;s agricultural produce and trading
                landscape, supporting commerce linked to the regional supply
                chain.
              </p>

              <div className="mt-7 rounded-2xl border-l-4 border-gold bg-gold-50/50 p-5">
                <p className="flex items-center gap-2 text-sm font-600 text-gold-600">
                  <Info className="h-4 w-4" />
                  Information Status
                </p>
                <p className="mt-2 text-sm text-ink-600">
                  Business information to be updated. Detailed company
                  information will be added once verified.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-border shadow-premium-lg">
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
                    className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
                    Agriculture &amp; Trade
                  </p>
                  <p className="mt-1 font-heading text-xl font-700 text-white">
                    Rooted in India&apos;s agricultural heritage
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Info grid */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Profile"
            title="Business Profile"
            description="Key business details. Fields marked 'to be updated' will be completed once verified information is available."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {overviewItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} variant="up" delay={i * 80} className="h-full">
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/30 transition-colors group-hover:bg-royal">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-700 text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Data table */}
          <ScrollReveal variant="up" className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-premium">
              <div className="border-b border-border bg-navy px-6 py-4">
                <h3 className="font-heading text-base font-700 text-white">
                  Company Information
                </h3>
              </div>
              <dl className="divide-y divide-border">
                {[
                  { label: "Company Name", value: businessInfo.name },
                  { label: "Entity Type", value: businessInfo.type },
                  { label: "Sector", value: businessInfo.sector },
                  { label: "Region", value: businessInfo.region },
                  { label: "Established", value: businessInfo.established },
                  { label: "Turnover", value: businessInfo.turnover },
                  { label: "Employees", value: businessInfo.employees },
                  { label: "Products / Services", value: businessInfo.products },
                  { label: "Certifications", value: businessInfo.certifications },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="text-sm font-600 text-royal">{row.label}</dt>
                    <dd
                      className={`text-sm sm:col-span-2 ${
                        row.value === "Information to be updated"
                          ? "italic text-ink-600/60"
                          : "text-ink"
                      }`}
                    >
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
        eyebrow="Explore"
        icon={MapPin}
        title="Connected to the APMC Ecosystem"
        description="Kisan Kirti Agro operates within the Navi Mumbai APMC market region. Explore the market and its trading categories."
        buttons={[
          { label: "Explore APMC Market", href: "/apmc", variant: "primary" },
          { label: "View Organizations", href: "/organizations", variant: "secondary" },
        ]}
      />
    </>
  );
}
