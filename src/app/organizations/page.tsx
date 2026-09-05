import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Crown,
  Check,
  ChevronRight,
  Users,
  Handshake,
  Target,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { OrganizationCard } from "@/components/site/OrganizationCard";
import { CTASection } from "@/components/site/CTASection";
import { organizations } from "@/data/organizations";

export const metadata: Metadata = {
  title: "Merchant Organizations | Kirti Rana",
  description:
    "Kirti Rana serves as Chairman of the Navi Mumbai Merchants Chamber and the Bombay Mudibazar Kariana Merchants Association.",
  alternates: { canonical: "/organizations" },
};

const focusAreas = [
  {
    icon: Users,
    title: "Merchant Representation",
    description:
      "Representing traders, merchants and enterprises in civic and market forums.",
  },
  {
    icon: Handshake,
    title: "Community Welfare",
    description:
      "Initiatives supporting the welfare and solidarity of the merchant community.",
  },
  {
    icon: Target,
    title: "Trade Facilitation",
    description:
      "Encouraging fair trade practices and smoother business operations.",
  },
];

export default function OrganizationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Organizations"
        title="Merchant Organizations"
        description="Kirti Rana serves as Chairman of two merchant community organizations, representing traders and enterprises across Navi Mumbai and the wider Bombay mercantile community."
        crumbs={[{ label: "Organizations" }]}
      />

      {/* Cards */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {organizations.map((org, i) => (
              <OrganizationCard key={org.slug} organization={org} index={i} detailed />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed sections */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="In Focus"
            title="Focus Areas of the Organizations"
            description="The shared themes that guide the work of both merchant organizations."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {focusAreas.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={f.title} variant="up" delay={i * 90} className="h-full">
                  <div className="group h-full rounded-2xl border border-border bg-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/30 transition-colors group-hover:bg-royal">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-700 text-navy">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {f.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed org blocks */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {organizations.map((org, i) => (
            <ScrollReveal key={org.slug} variant="up">
              <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-premium">
                <div className="grid lg:grid-cols-3">
                  {/* Left band */}
                  <div className="relative overflow-hidden bg-navy p-8 lg:p-10 text-white">
                    <div aria-hidden className="absolute inset-0 bg-navy-grid opacity-40" />
                    <div
                      aria-hidden
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl"
                    />
                    <div className="relative">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-gold ring-1 ring-gold/40">
                        <Building2 className="h-7 w-7" />
                      </span>
                      <p className="mt-5 text-[0.66rem] uppercase tracking-[0.18em] text-gold/90">
                        {org.shortName}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-700 leading-tight">
                        {org.name}
                      </h3>
                      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 ring-1 ring-gold/30">
                        <Crown className="h-3.5 w-3.5 text-gold" />
                        <span className="text-xs font-600 text-gold">
                          {org.designation} • Kirti Rana
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right content */}
                  <div className="lg:col-span-2 p-8 lg:p-10">
                    <p className="text-sm italic text-royal">{org.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {org.description}
                    </p>

                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                        Key Highlights
                      </p>
                      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {org.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-sm text-ink"
                          >
                            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold/30">
                              <Check className="h-3 w-3" />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                        Focus
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {org.focus.map((f) => (
                          <span
                            key={f}
                            className="rounded-full bg-mist px-3 py-1 text-xs font-500 text-ink-600 ring-1 ring-border"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/board"
                      className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-600 text-white transition-all hover:bg-navy-700 hover:-translate-y-0.5"
                    >
                      View Board of Directors
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Connect"
        title="Engage With the Merchant Community"
        description="For organization-related enquiries and membership information, reach out through the contact page."
        buttons={[
          { label: "Contact Us", href: "/contact", variant: "primary" },
          { label: "View Board", href: "/board", variant: "secondary" },
        ]}
      />
    </>
  );
}
