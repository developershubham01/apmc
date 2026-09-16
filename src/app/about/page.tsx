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
        backgroundImage="/images/hero/chamber-headquarters-hero.jpg"
        imageOpacity={90}
      />

      {/* Profile Section */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-b border-[#D1E7DD]">
        {/* Subtle Architectural Watermark — visible but clearly separate from content */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero/chamber-headquarters-hero.jpg"
            alt="Chamber Complex Architectural Backdrop"
            fill
            className="object-cover object-center opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
            <ScrollReveal variant="left">
              <div className="relative mx-auto max-w-md">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#059669]/30 to-[#10B981]/20 blur-xl"
                />
                <div className="relative overflow-hidden rounded-[2rem] border-2 border-[#059669] bg-[#042017] shadow-xl">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
                    <LightboxImage
                      src="/images/kirti-rana/portrait-lead.jpg"
                      alt="Shri Kirti Rana"
                      caption="Shri Kirti Rana — President, Navi Mumbai Merchants Chamber"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-full w-full rounded-none border-0 ring-0"
                      imgClassName="object-cover object-top"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#042017]/95 via-[#042017]/50 to-transparent"
                    />
                    <div className="pointer-events-none absolute bottom-3 left-4 right-4 z-10">
                      <p className="font-heading text-2xl font-extrabold text-white drop-shadow">
                        Shri Kirti Rana
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#10B981] font-bold mt-0.5">
                        President — Navi Mumbai Merchants Chamber
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/15 bg-[#042017] px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <Wheat className="h-4 w-4 text-[#10B981]" />
                      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-white/90 font-semibold">
                        Navi Mumbai • Maharashtra
                      </span>
                    </div>
                    <span className="rounded-full bg-[#059669]/30 border border-[#059669]/50 px-3 py-0.5 text-[0.68rem] font-bold text-[#34D399] uppercase tracking-wider">
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
              <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-[#4B5563]">
                Shri Kirti Rana is a prominent leader in India&apos;s commercial, agricultural
                and wholesale trading arena. Serving as President of the <strong className="text-[#042017] font-bold">Navi Mumbai Merchants Chamber</strong> (an apex body representing 400+ spice processors, exporters, wholesalers and cold chain owners across a dedicated 50-acre complex) and Chairman of the <strong className="text-[#042017] font-bold">Bombay Mudibazar Kariana Merchants Association</strong>, he has spent decades championing merchant rights and trade modernization.
              </p>

              <ul className="mt-7 space-y-3">
                {roles.map((h) => {
                  const Icon = h.icon;
                  return (
                    <li
                      key={h.org}
                      className="flex items-center gap-4 rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-3.5 transition-colors hover:border-[#059669]"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#042017] text-[#10B981] ring-1 ring-[#059669]/30">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-[#047857] font-bold">
                          {h.role}
                        </p>
                        <p className="text-sm font-bold text-[#042017]">{h.org}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-7 rounded-2xl border-l-4 border-[#059669] bg-[#F0FDF4] p-5">
                <Quote className="h-5 w-5 text-[#059669]" />
                <p className="mt-2 text-sm italic leading-relaxed text-[#042017]">
                  &ldquo;Serving the merchant community with dedication, fostering fair trade practices, and building world-class infrastructure for Indian commerce.&rdquo;
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/achievements"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#059669] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#047857] hover:-translate-y-0.5"
                >
                  <Award className="h-4 w-4" />
                  View 11 Verified Awards
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/organizations"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#042017] bg-white px-6 py-3.5 text-sm font-bold text-[#042017] transition-all hover:bg-[#042017] hover:text-white hover:-translate-y-0.5"
                >
                  Chamber Details
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Salient Features Presentation Slide Section */}
      <section className="bg-[#F0FDF4] py-16 lg:py-24 border-b border-[#D1E7DD]">
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
                className="aspect-[16/10] rounded-2xl border-2 border-[#D1E7DD] ring-0 shadow-md bg-white"
                imgClassName="object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-[#D1E7DD] bg-white p-6 shadow-sm">
                <h4 className="font-heading text-lg font-bold text-[#042017]">
                  30+ Year Old Established Association
                </h4>
                <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                  Comprising spice processors, spice specialists, exporters, wholesalers, distributors, retailers and cold chain owners across Maharashtra.
                </p>
              </div>

              <div className="rounded-2xl border border-[#D1E7DD] bg-white p-6 shadow-sm">
                <h4 className="font-heading text-lg font-bold text-[#042017]">
                  400+ Spices &amp; Condiments Specialist Members
                </h4>
                <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                  A high-volume specialist member base representing the backbone of India&apos;s spice trade and exports.
                </p>
              </div>

              <div className="rounded-2xl border border-[#D1E7DD] bg-white p-6 shadow-sm">
                <h4 className="font-heading text-lg font-bold text-[#042017]">
                  Dedicated 50-Acre Complex
                </h4>
                <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
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
                  <div className="group h-full rounded-2xl border border-[#D1E7DD] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#059669] hover:shadow-md">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#042017] text-[#10B981] ring-1 ring-[#059669]/30 transition-colors group-hover:bg-[#059669] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-bold text-[#042017]">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
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
      <section className="bg-[#F0FDF4] py-16 lg:py-24 border-t border-[#D1E7DD]">
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
                  className="group flex h-full items-start gap-5 rounded-2xl border border-[#D1E7DD] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-[#059669]"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#042017] text-[#10B981] ring-1 ring-[#059669]/30">
                    <Crown className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#047857] font-bold">
                      {org.designation}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-bold leading-tight text-[#042017]">
                      {org.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#4B5563]">{org.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#059669]">
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
