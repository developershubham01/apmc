import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Crown,
  Users,
  Wheat,
  ArrowRight,
  ChevronRight,
  Target,
  Handshake,
  MapPin,
  Quote,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";
import { organizations } from "@/data/organizations";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About Kirti Rana",
  description:
    "Profile of Kirti Rana — Chairman of Navi Mumbai Merchants Chamber and Bombay Mudibazar Kariana Merchants Association, and business presence in agriculture & trade at Navi Mumbai APMC.",
  alternates: { canonical: "/about" },
};

const roles = [
  {
    role: "Chairman",
    org: "Navi Mumbai Merchants Chamber",
    icon: Crown,
  },
  {
    role: "Chairman",
    org: "Bombay Mudibazar Kariana Merchants Association",
    icon: Users,
  },
  {
    role: "Business Association",
    org: "Kisan Kirti Agro Pvt. Ltd.",
    icon: Wheat,
  },
];

const values = [
  {
    icon: Target,
    title: "Community Representation",
    description:
      "Voicing the interests and concerns of the merchant and trading community within civic and market forums.",
  },
  {
    icon: Handshake,
    title: "Business Development",
    description:
      "Encouraging growth, networking and fair trade practices across the merchant ecosystem.",
  },
  {
    icon: Wheat,
    title: "Agriculture & Trade",
    description:
      "Engagement with the agricultural trading ecosystem at the Navi Mumbai APMC Market, Turbhe.",
  },
  {
    icon: MapPin,
    title: "Regional Presence",
    description:
      "An established presence in Navi Mumbai's commercial landscape across Maharashtra.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Kirti Rana"
        description="An established business leader in Navi Mumbai's merchant community, serving as Chairman of two merchant organizations and engaged in agriculture & trade."
        crumbs={[{ label: "About" }]}
      />

      {/* Profile */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <div className="relative mx-auto max-w-md">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/20 to-royal/10 blur-xl"
                />
                <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-gold/40 bg-gradient-to-br from-navy to-navy-700 shadow-premium-lg">
                  <div className="relative aspect-[4/5]">
                    <div aria-hidden className="absolute inset-0 bg-navy-grid opacity-40" />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(80% 60% at 50% 20%, rgba(201,162,39,0.25) 0%, transparent 60%)",
                      }}
                    />
                    <div className="relative flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                      <span className="inline-flex h-32 w-32 items-center justify-center rounded-2xl bg-white/5 ring-2 ring-gold/40">
                        <span className="font-heading text-5xl font-800 text-gold-gradient">
                          KR
                        </span>
                      </span>
                      <p className="mt-6 font-heading text-2xl font-700 text-white">
                        Kirti Rana
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold/90">
                        Business Leader
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 border-t border-white/10 bg-black/20 px-6 py-4">
                    <Wheat className="h-4 w-4 text-gold" />
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-white/70">
                      Navi Mumbai • Maharashtra
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <SectionHeading
                align="left"
                eyebrow="Profile"
                title="A Leader of the Merchant Community"
              />
              <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-ink-600">
                Kirti Rana is associated with Navi Mumbai&apos;s business and
                merchant community and serves in leadership roles within
                merchant organizations. His work centres on community
                representation, business development and agricultural trade
                within the region's commercial ecosystem.
              </p>

              <ul className="mt-7 space-y-3">
                {roles.map((h) => {
                  const Icon = h.icon;
                  return (
                    <li
                      key={h.org}
                      className="flex items-center gap-4 rounded-xl border border-border bg-mist p-4 transition-colors hover:border-gold/40"
                    >
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-gold ring-1 ring-gold/30">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                          {h.role}
                        </p>
                        <p className="text-sm font-600 text-navy">{h.org}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-7 rounded-2xl border-l-4 border-gold bg-gold-50/50 p-5">
                <Quote className="h-5 w-5 text-gold-600" />
                <p className="mt-2 text-sm italic leading-relaxed text-ink-600">
                  &ldquo;Serving the merchant community with leadership,
                  integrity and a commitment to fair trade and collective
                  progress.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Focus Areas"
            title="Areas of Engagement"
            description="The core themes that define Kirti Rana's professional involvement."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} variant="up" delay={i * 90} className="h-full">
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/30 transition-colors group-hover:bg-royal">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-700 text-navy">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {v.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organizations summary */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Organizations"
            title="Chamber & Association Leadership"
            description="Kirti Rana chairs two merchant community organizations."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {organizations.map((org, i) => (
              <ScrollReveal key={org.slug} variant="up" delay={i * 120}>
                <Link
                  href="/organizations"
                  className="group flex h-full items-start gap-5 rounded-2xl border border-border bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg hover:border-gold/40"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/30">
                    <Crown className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                      {org.designation}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-700 leading-tight text-navy">
                      {org.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-600">{org.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-600 text-royal">
                      View Details
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Explore"
        title="Discover the Business & APMC Ecosystem"
        description="Learn more about Kisan Kirti Agro Pvt. Ltd. and the Navi Mumbai APMC Market."
        buttons={[
          { label: "View Business", href: "/business", variant: "primary" },
          { label: "Explore APMC", href: "/apmc", variant: "secondary" },
        ]}
      />
    </>
  );
}
