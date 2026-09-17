import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Trophy,
  Globe2,
  Building2,
  Users2,
  Images,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { LightboxImage } from "@/components/site/LightboxImage";
import { CTASection } from "@/components/site/CTASection";
import { officialAwards } from "@/data/awards";

export const metadata: Metadata = {
  title: "Achievements & Honours | Kirti Rana",
  description:
    "Official archive of awards, international recognitions, merchant leadership milestones, and community honours conferred upon Shri Kirti Rana.",
  alternates: { canonical: "/achievements" },
};

const featuredPhotoShowcase = [
  {
    src: "/images/kirti-rana/global-business-icon-award-dubai.jpg",
    alt: "Shri Kirti Rana receiving the Global Business Icon Award in Dubai",
    title: "Global Business ICON Award — Dubai 2025",
    badge: "International Award",
    description:
      "Conferred with the prestigious Global Business ICON Award in Dubai in the presence of distinguished UAE and Indian dignitaries and trade leaders.",
  },
  {
    src: "/images/events/bharatiya-vyapar-mahotsav-2026.jpg",
    alt: "Bharatiya Vyapar Mahotsav 2026 at Bharat Mandapam, New Delhi",
    title: "Bharatiya Vyapar Mahotsav 2026 (Bharat Mandapam)",
    badge: "National Trade Expo",
    description:
      "Joint initiative of ITPO & CAIT at Bharat Mandapam, Pragati Maidan, New Delhi — with leadership representation by Shri Kirti Rana.",
  },
  {
    src: "/images/events/bjp-vyapari-aghadi-meeting.jpg",
    alt: "Shri Kirti Rana with BJP Vyapari Aghadi Maharashtra Pradesh leadership",
    title: "BJP Vyapari Aghadi Maharashtra Pradesh Leadership",
    badge: "State Leadership",
    description:
      "State-level coordination and policy dialogue for trader welfare, market infrastructure and commercial reforms across Maharashtra.",
  },
  {
    src: "/images/nmmc-logo.png",
    alt: "Navi Mumbai Merchants Chamber Official Seal Logo",
    title: "Navi Mumbai Merchants Chamber — 30+ Years & 50-Acre Complex",
    badge: "Apex Chamber",
    description:
      "Official presentation outlining the 400+ member spice network, 30+ years of stewardship, and 50-acre dedicated spice and commodities complex.",
  },
];

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recognitions & Milestones"
        title="Achievements & Official Honours"
        description="A verified archive of business leadership awards, international honours, chamber milestones and community recognitions conferred upon Shri Kirti Rana."
        crumbs={[{ label: "Achievements" }]}
        backgroundImage="/images/events/conference.jpg"
        imageOpacity={90}
      />

      {/* Featured Award Highlights Banner */}
      <section className="bg-white py-14 lg:py-18 border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Girnar Best Businessman Award Card */}
            <ScrollReveal variant="left">
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#D1E7DD] bg-gradient-to-br from-[#F0FDF4] via-white to-[#ECFDF5] p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#042017] text-[#10B981] shadow-sm">
                    <Trophy className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-[#047857]">
                      Best Businessman Award (2008)
                    </span>
                    <h3 className="font-heading text-2xl font-extrabold text-[#042017]">
                      Girnar Award
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4B5563]">
                  Organized and conferred by <strong>Bruhad Mumbai Gujarati Samaj — Mumbai</strong> in recognition of outstanding commercial enterprise, community integrity, and contribution to Mumbai&apos;s wholesale merchant landscape.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#D1E7DD] pt-4 text-xs font-semibold text-[#047857]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#059669]" />
                    Verified Official Honor
                  </span>
                  <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-[#047857] border border-[#D1E7DD]">
                    Girnar Award
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Global Business ICON Award Dubai Card */}
            <ScrollReveal variant="right">
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#059669] bg-[#042017] p-8 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#059669] text-white shadow-sm">
                    <Globe2 className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-[#10B981]">
                      International Recognition (2025)
                    </span>
                    <h3 className="font-heading text-2xl font-extrabold text-white">
                      Global Business ICON Award
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200">
                  Conferred at the <strong>Glimpses Global Business ICON Awards in Dubai</strong>, honoring exceptional cross-border trade leadership, agricultural commodity stewardship, and international merchant collaboration.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-xs font-semibold text-[#10B981]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#10B981]" />
                    Dubai, United Arab Emirates
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-white border border-white/20">
                    Global Icon
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Verified Photo Showcase Gallery & Policy Milestones */}
      <section id="milestones" className="scroll-mt-28 bg-[#F0FDF4] py-16 lg:py-24 border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Event Photography & Policy Milestones"
            title="Photographic Record of Leadership & Policy Reforms"
            description="Verified photographs capturing international felicitations, national trade summits at Bharat Mandapam, and merchant leadership meetings."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {featuredPhotoShowcase.map((item, idx) => (
              <ScrollReveal key={item.src} variant="up" delay={idx * 100}>
                <div className="group overflow-hidden rounded-3xl border border-[#D1E7DD] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#059669]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                    <LightboxImage
                      src={item.src}
                      alt={item.alt}
                      title={item.title}
                      description={item.description}
                      category={item.badge}
                      caption={item.title}
                      overlay
                      className="h-full w-full ring-0"
                      imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-[#042017]/80 px-3.5 py-1 text-xs font-bold text-[#10B981] backdrop-blur-md">
                      {item.badge}
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="font-heading text-xl font-bold text-[#042017] group-hover:text-[#059669]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11 Official Awards & Felicitations Section */}
      <section id="awards" className="scroll-mt-28 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3 items-start">
            <div className="lg:sticky lg:top-24">
              <ScrollReveal variant="left">
                <span className="eyebrow inline-flex items-center gap-2 text-[#059669] font-bold">
                  <Award className="h-4 w-4" />
                  Official Register
                </span>
                <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-bold text-[#042017] leading-tight">
                  11 Major Awards &amp; Recognitions
                </h2>
                <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-[#059669]" />
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#4B5563]">
                  Transcribed directly from the official achievements archive document, reflecting decades of service across national federations, community trusts, and commerce associations.
                </p>

                <div className="mt-8 rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#042017] text-[#10B981]">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-heading text-xl font-bold text-[#042017]">11 Awards</p>
                      <p className="text-xs uppercase tracking-wider text-[#047857] font-bold">Verified Citations</p>
                    </div>
                  </div>
                </div>

                {/* Original Document Lightbox Preview */}
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-widest font-bold text-[#4B5563] mb-2">
                    Original Document Archive:
                  </p>
                  <LightboxImage
                    src="/images/awards/achievements-awards-record.jpg"
                    alt="Original Achievements Document Slide"
                    title="Official Achievements Archive — 11 Major Awards"
                    description="Transcribed directly from the official achievements archive document, detailing 11 state, national, and community awards conferred upon Shri Kirti Rana."
                    category="Official Archive"
                    caption="Official Achievements Document — 11 Awards List"
                    overlay
                    className="aspect-[16/9] rounded-2xl border border-[#D1E7DD] ring-0 shadow-sm"
                    imgClassName="object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Awards Cards Grid */}
            <div className="lg:col-span-2 space-y-4">
              {officialAwards.map((award, i) => (
                <ScrollReveal key={award.id} variant="up" delay={i * 50}>
                  <div
                    className={`rounded-2xl border p-6 transition-all duration-300 hover:shadow-md ${
                      award.highlight
                        ? "border-[#059669] bg-[#F0FDF4] shadow-sm"
                        : "border-[#D1E7DD] bg-white hover:border-[#059669]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#042017] text-xs font-bold text-[#10B981]">
                          #{award.id}
                        </span>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#042017]">
                          {award.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] border border-[#D1E7DD]">
                        {award.badge}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm font-bold text-[#047857]">
                      {award.organization} {award.year && `(${award.year})`}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                      {award.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Explore Further"
        icon={Images}
        title="View Full Photographic Gallery & Media"
        description="Browse the complete gallery of merchant conferences, APMC market categories, and press coverage."
        buttons={[
          { label: "Open Full Gallery", href: "/gallery", variant: "primary" },
          { label: "Media & Press", href: "/media", variant: "secondary" },
        ]}
      />
    </>
  );
}
