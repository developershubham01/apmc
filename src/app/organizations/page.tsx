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
  Trophy,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { OrganizationCard } from "@/components/site/OrganizationCard";
import { LightboxImage } from "@/components/site/LightboxImage";
import { CTASection } from "@/components/site/CTASection";
import { organizations } from "@/data/organizations";

export const metadata: Metadata = {
  title: "Merchant Organizations & Leadership | Kirti Rana",
  description:
    "Shri Kirti Rana serves as President of Navi Mumbai Merchants Chamber (30+ Years, 400+ Members, 50-Acre Complex), Chairman of Bombay Mudibazar Kariana Merchants Association, and National Leader in CAIT.",
  alternates: { canonical: "/organizations" },
};

const focusAreas = [
  {
    icon: Building2,
    title: "17 Constituent Associations",
    description:
      "Apex body uniting 17 conservator & constituent associations representing over 1,000+ member firms.",
  },
  {
    icon: Users,
    title: "50,000+ Merchant Families",
    description:
      "Over 50,000 families engaged in the national & international trade of 400+ spices and agro commodities.",
  },
  {
    icon: Handshake,
    title: "ITPO & CAIT Joint Initiative",
    description:
      "Steering national commercial expos including Bharatiya Vyapar Mahotsav 2026 at Bharat Mandapam, New Delhi.",
  },
];

export default function OrganizationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Organizations"
        title="Merchant Organizations & Leadership"
        description="Shri Kirti Rana holds apex leadership roles across premier merchant chambers, state commercial forums, and national trader federations."
        crumbs={[{ label: "Organizations" }]}
        backgroundImage="/images/hero/hero-chamber-bg.jpg"
        imageOpacity={90}
      />

      {/* Overview Cards */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {organizations.map((org, i) => (
              <OrganizationCard key={org.slug} organization={org} index={i} detailed />
            ))}
          </div>
        </div>
      </section>

      {/* Focus Pillars */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="In Focus"
            title="Strategic Pillars of Merchant Leadership"
            description="Guiding trade infrastructure, policy representation, and merchant solidarity."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {focusAreas.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={f.title} variant="up" delay={i * 90} className="h-full">
                  <div className="group h-full rounded-2xl border border-border bg-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-premium-lg">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-amber-400 ring-1 ring-amber-500/30 transition-colors group-hover:bg-royal">
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
              <div
                id={org.shortName.toLowerCase()}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-white shadow-premium"
              >
                {/* Secondary anchor for full slug */}
                <span id={org.slug} className="scroll-mt-28 block h-0 w-0" aria-hidden />
                <div className="grid lg:grid-cols-12">
                  {/* Left branding banner */}
                  <div className="lg:col-span-4 relative overflow-hidden bg-navy p-8 lg:p-10 text-white flex flex-col justify-between">
                    <div
                      aria-hidden
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-2xl"
                    />
                    <div className="relative">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-amber-400 ring-1 ring-amber-500/40">
                        <Building2 className="h-7 w-7" />
                      </span>
                      <p className="mt-5 text-[0.66rem] uppercase tracking-[0.18em] text-amber-400 font-bold">
                        {org.shortName}
                      </p>
                      <h3 className="mt-1 font-heading text-2xl font-700 leading-tight">
                        {org.name}
                      </h3>
                      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1.5 ring-1 ring-amber-500/40">
                        <Crown className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-xs font-700 text-amber-300">
                          {org.designation} • Kirti Rana
                        </span>
                      </div>
                    </div>

                    {org.image && (
                      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/30 bg-white p-4 flex items-center justify-center shadow-lg">
                        <LightboxImage
                          src={org.image}
                          alt={org.name}
                          caption={org.name}
                          overlay
                          className="aspect-[16/10] ring-0"
                          imgClassName="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right content */}
                  <div className="lg:col-span-8 p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <p className="text-sm italic text-royal font-500">{org.tagline}</p>
                      <p className="mt-3 text-base leading-relaxed text-ink-700">
                        {org.description}
                      </p>

                      {org.stats && org.stats.length > 0 && (
                        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {org.stats.map((st) => (
                            <div
                              key={st.label}
                              className="rounded-xl border border-amber-500/30 bg-amber-50/40 p-3 text-center"
                            >
                              <p className="font-heading text-lg font-700 text-navy">{st.value}</p>
                              <p className="text-[0.7rem] uppercase tracking-wider text-amber-600 font-700">
                                {st.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-6">
                        <p className="text-xs uppercase tracking-[0.14em] text-amber-600 font-700">
                          Key Highlights &amp; Mandate
                        </p>
                        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                          {org.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2.5 text-sm text-ink"
                            >
                              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-amber-200">
                                <Check className="h-3 w-3" />
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <p className="text-xs uppercase tracking-[0.14em] text-amber-600 font-700">
                          Focus Areas
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {org.focus.map((f) => (
                            <span
                              key={f}
                              className="rounded-full bg-mist px-3 py-1 text-xs font-500 text-ink-600 ring-1 border border-border"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-border">
                      <Link
                        href="/board"
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-3 text-sm font-700 text-slate-950 shadow-gold-glow transition-all hover:from-amber-400 hover:to-yellow-400 hover:-translate-y-0.5"
                      >
                        View Board of Directors
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-600 text-navy transition-all hover:border-amber-500 hover:text-amber-700 hover:-translate-y-0.5"
                      >
                        Chamber Enquiries
                      </Link>
                    </div>
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
        description="For organization-related enquiries, trade complex matters or membership information, reach out through the contact page."
        buttons={[
          { label: "Contact Us", href: "/contact", variant: "primary" },
          { label: "View Board", href: "/board", variant: "secondary" },
        ]}
      />
    </>
  );
}
