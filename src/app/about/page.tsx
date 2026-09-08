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
  Award,
  Trophy,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";
import { LightboxImage } from "@/components/site/LightboxImage";
import { organizations } from "@/data/organizations";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About Shri Kirti Rana",
  description:
    "Biography and profile of Shri Kirti Rana — President of Navi Mumbai Merchants Chamber (30+ Years, 400+ Members, 50-Acre Spice Complex), Chairman of Bombay Mudibazar Kariana Merchants Association, and National Trade Leader.",
  alternates: { canonical: "/about" },
};

const roles = [
  {
    role: "President / Chairman",
    org: "Navi Mumbai Merchants Chamber (30+ Yrs, 400+ Members, 50-Acre Complex)",
    icon: Crown,
  },
  {
    role: "National Leadership",
    org: "Confederation of All India Traders (CAIT)",
    icon: ShieldCheck,
  },
  {
    role: "Chairman",
    org: "Bombay Mudibazar Kariana Merchants Association",
    icon: Users,
  },
  {
    role: "Commercial Enterprise",
    org: "Kisan Kirti Agro Pvt. Ltd.",
    icon: Wheat,
  },
];

const values = [
  {
    icon: Target,
    title: "Merchant Representation",
    description:
      "Advocating for 400+ spice and commodity merchants, processors, exporters and retailers in policy, civic and statutory forums.",
  },
  {
    icon: Handshake,
    title: "Trade Development",
    description:
      "Spearheading major initiatives including Bharatiya Vyapar Mahotsav 2026 at Bharat Mandapam, New Delhi with ITPO & CAIT.",
  },
  {
    icon: Building2,
    title: "50-Acre Trade Complex",
    description:
      "Fostering state-of-the-art warehousing, processing and cold chain infrastructure for international spice & condiment trade.",
  },
  {
    icon: Trophy,
    title: "Decades of Excellence",
    description:
      "Recipient of 11+ prestigious honours including the Girnar Best Businessman Award (2008) and Global Business ICON Award (Dubai 2025).",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Shri Kirti Rana"
        description="A distinguished commercial leader and trade advocate, steering the Navi Mumbai Merchants Chamber, traditional wholesale associations, and nationwide trader forums."
        crumbs={[{ label: "About" }]}
      />

      {/* Profile Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <div className="relative mx-auto max-w-md">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/30 to-royal/20 blur-xl"
                />
                <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-gold/50 bg-navy shadow-premium-lg">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src="/images/kirti-rana/portrait-lead.jpg"
                      alt="Shri Kirti Rana"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-heading text-2xl font-700 text-white">
                        Shri Kirti Rana
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-gold font-600">
                        President — Navi Mumbai Merchants Chamber
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-6 py-3.5 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <Wheat className="h-4 w-4 text-gold" />
                      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-white/80 font-500">
                        Navi Mumbai • Maharashtra
                      </span>
                    </div>
                    <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[0.68rem] font-700 text-gold uppercase tracking-wider">
                      30+ Yrs Legacy
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right">
              <SectionHeading
                align="left"
                eyebrow="Profile"
                title="A Pillar of India's Merchant & Spice Trade"
              />
              <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-ink-600">
                Shri Kirti Rana is a prominent leader in India&apos;s commercial, agricultural
                and wholesale trading arena. Serving as President of the <strong>Navi Mumbai Merchants Chamber</strong> (an apex body representing 400+ spice processors, exporters, wholesalers and cold chain owners across a dedicated 50-acre complex) and Chairman of the <strong>Bombay Mudibazar Kariana Merchants Association</strong>, he has spent decades championing merchant rights and trade modernization.
              </p>

              <ul className="mt-7 space-y-3">
                {roles.map((h) => {
                  const Icon = h.icon;
                  return (
                    <li
                      key={h.org}
                      className="flex items-center gap-4 rounded-xl border border-border bg-mist p-3.5 transition-colors hover:border-gold/40"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-gold ring-1 ring-gold/30">
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
                  &ldquo;Serving the merchant community with dedication, fostering fair trade practices, and building world-class infrastructure for Indian commerce.&rdquo;
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/achievements"
                  className="group inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 hover:-translate-y-0.5"
                >
                  <Award className="h-4 w-4 text-gold" />
                  View 11 Verified Awards
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/organizations"
                  className="group inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-600 text-navy transition-all hover:border-gold hover:text-royal hover:-translate-y-0.5"
                >
                  Chamber Details
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Salient Features Presentation Slide Section */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Association Strengths"
            title="Navi Mumbai Merchants Chamber — Salient Features"
            description="Key pillars of the association representing the domestic and international spice trade."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <LightboxImage
                src="/images/association/salient-features-merchants-chamber.jpg"
                alt="Navi Mumbai Merchants Chamber Salient Features Slide"
                caption="Official Salient Features Slide — Navi Mumbai Merchants Chamber"
                overlay
                className="aspect-[16/10] rounded-2xl border border-border ring-0 shadow-premium"
                imgClassName="object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h4 className="font-heading text-lg font-700 text-navy">
                  30+ Year Old Established Association
                </h4>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                  Comprising spice processors, spice specialists, exporters, wholesalers, distributors, retailers and cold chain owners across Maharashtra.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h4 className="font-heading text-lg font-700 text-navy">
                  400+ Spices &amp; Condiments Specialist Members
                </h4>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                  A high-volume specialist member base representing the backbone of India&apos;s spice trade and exports.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h4 className="font-heading text-lg font-700 text-navy">
                  Dedicated 50-Acre Complex
                </h4>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                  Operating within a dedicated 50-acre complex tailored for domestic and international trade of spices and condiments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Focus Areas"
            title="Key Areas of Engagement"
            description="The core pillars that define Shri Kirti Rana's leadership."
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

      {/* Organizations */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Organizations"
            title="Chamber & Association Leadership"
            description="Apex trade bodies and organizations led by Shri Kirti Rana."
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
