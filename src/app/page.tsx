import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Sprout,
  MapPin,
  Crown,
  ArrowRight,
  ChevronRight,
  Store,
  TrendingUp,
  CalendarDays,
  Quote,
  Newspaper,
  Images,
  Building2,
  Wheat,
  Award,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";
import { OrganizationCard } from "@/components/site/OrganizationCard";
import { MarketCard } from "@/components/site/MarketCard";
import { BoardMemberCard } from "@/components/site/BoardMemberCard";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { AchievementsGallery } from "@/components/site/AchievementsGallery";
import { LightboxImage } from "@/components/site/LightboxImage";
import { organizations } from "@/data/organizations";
import { markets } from "@/data/markets";
import { boardMembers } from "@/data/boardMembers";
import { galleryItems } from "@/data/gallery";
import { siteConfig } from "@/data/site";
import { officialAwards } from "@/data/awards";

const introCards = [
  {
    icon: Globe2,
    title: "Pride of Asia — 250 Acres",
    description:
      "Asia's largest Swadeshi APMC Trading Hub spread across 200–250 acres in Navi Mumbai, Maharashtra.",
  },
  {
    icon: Users,
    title: "12,000+ License Holders",
    description:
      "Empowering 12,000+ licensed merchants & 50,000+ families trading in 400+ spices & agro commodities.",
  },
  {
    icon: Store,
    title: "3,500+ Daily Trucks",
    description:
      "Facilitating daily national & international supply chains for 3,500+ transport trucks and logistics.",
  },
  {
    icon: Wheat,
    title: "1 Lakh+ Tons Volume",
    description:
      "Handling 100,000+ tons of fruits, spices & herbs — supplying from 0.500g samples to 10-ton bulk orders worldwide.",
  },
];

const achievementImages = [
  {
    src: "/images/kirti-rana/global-business-icon-award-dubai.jpg",
    alt: "Shri Kirti Rana receiving the Global Business Icon Award in Dubai",
    caption: "Global Business ICON Award — Dubai 2025",
    category: "Felicitations",
  },
  {
    src: "/images/events/bharatiya-vyapar-mahotsav-2026.jpg",
    alt: "Bharatiya Vyapar Mahotsav 2026 Invitation Flyer — Bharat Mandapam, New Delhi",
    caption: "Bharatiya Vyapar Mahotsav 2026 — CAIT & ITPO",
    category: "Conferences",
  },
  {
    src: "/images/events/bjp-vyapari-aghadi-meeting.jpg",
    alt: "Shri Kirti Rana with BJP Vyapari Aghadi Maharashtra Pradesh leadership",
    caption: "BJP Vyapari Aghadi Maharashtra Pradesh",
    category: "Merchant Meetings",
  },
  {
    src: "/images/nmmc-logo.png",
    alt: "Navi Mumbai Merchants Chamber Official Seal Emblem",
    caption: "Chamber Salient Features & 50-Acre Complex",
    category: "Business Events",
  },
  {
    src: "/images/awards/achievements-awards-record.jpg",
    alt: "Official Honours Archive document listing 11 awards",
    caption: "Official Honours Archive — 11 Awards",
    category: "Felicitations",
  },
  {
    src: "/images/apmc/spice-market.jpg",
    alt: "Navi Mumbai APMC spice market",
    caption: "APMC Spice Market Trade Engagement",
    category: "Professional Meetings",
  },
];

const goldenMemories = [
  {
    src: "/images/kirti-rana/global-business-icon-award-dubai.jpg",
    alt: "Mr. Kirti Rana receiving the Global Business Icon Award in Dubai",
    caption: "Global Business ICON Award Presentation — Dubai 2025",
  },
  {
    src: "/images/events/bharatiya-vyapar-mahotsav-2026.jpg",
    alt: "Bharatiya Vyapar Mahotsav 2026 Flyer at Bharat Mandapam",
    caption: "Bharatiya Vyapar Mahotsav 2026 — Bharat Mandapam, New Delhi",
  },
  {
    src: "/images/events/bjp-vyapari-aghadi-meeting.jpg",
    alt: "BJP Vyapari Aghadi Maharashtra Pradesh Leadership Meeting",
    caption: "BJP Vyapari Aghadi Maharashtra Pradesh Meeting",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 2. Hero */}
      <Hero />

      {/* 3. Introduction */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Introduction"
            title="SOME SALIENT FEATURES OF OUR ASSOCIATION"
            description="Shri Kirti Rana's work spans merchant community leadership, agricultural trade, national trade advocacy and business development — anchored in Navi Mumbai's commercial ecosystem."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {introCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} variant="up" delay={i * 90} className="h-full">
                  <div className="group h-full rounded-2xl border border-[#D1E7DD] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#059669] hover:shadow-md">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#042017] text-[#10B981] ring-1 ring-[#059669]/30 transition-colors group-hover:bg-[#059669] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-bold text-[#042017]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                      {card.description}
                    </p>
                    <span
                      aria-hidden
                      className="mt-4 block h-0.5 w-8 rounded-full bg-[#059669] transition-all duration-300 group-hover:w-14"
                    />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. About Kirti Rana */}
      <AboutSection />

      {/* Salient Features Highlight Banner */}
      <section className="relative overflow-hidden bg-white py-16 text-[#042017] border-y border-[#D1E7DD]">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero/chamber-headquarters-hero.jpg"
            alt="Navi Mumbai Merchants Chamber 50-Acre Complex"
            fill
            className="object-cover object-center opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow inline-flex items-center gap-2 text-[#059669] font-bold">
                <Building2 className="h-4 w-4" />
                Apex Merchant Body
              </span>
              <h2 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-[#042017]">
                Navi Mumbai Merchants&apos; Chamber
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                A 30+ year old association of 400+ spice processors, specialists, exporters, wholesalers, distributors, retailers and cold chain owners operating across a dedicated 50-acre complex for domestic and international trade.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] px-4 py-2.5 shadow-sm">
                  <p className="font-heading text-xl font-bold text-[#042017]">30+ Years</p>
                  <p className="text-xs text-[#047857] font-semibold">Established Legacy</p>
                </div>
                <div className="rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] px-4 py-2.5 shadow-sm">
                  <p className="font-heading text-xl font-bold text-[#059669]">400+</p>
                  <p className="text-xs text-[#047857] font-semibold">Member Network</p>
                </div>
                <div className="rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] px-4 py-2.5 shadow-sm">
                  <p className="font-heading text-xl font-bold text-[#042017]">50 Acres</p>
                  <p className="text-xs text-[#047857] font-semibold">Dedicated Trade Complex</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative h-60 w-60 sm:h-72 sm:w-72 shrink-0 overflow-hidden rounded-full border-4 border-[#059669] bg-white p-4 shadow-2xl ring-8 ring-[#059669]/10 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/nmmc-logo.png"
                  alt="Navi Mumbai Merchants Chamber Official Seal Emblem"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Organizations */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Organizations"
            title="Leadership of Merchant Organizations"
            description="Shri Kirti Rana serves in apex leadership across regional, state and national merchant bodies representing traders and enterprises."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {organizations.map((org, i) => (
              <OrganizationCard key={org.slug} organization={org} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Business */}
      <BusinessSection />

      {/* 7. APMC Market + 8. Market Categories */}
      <section className="relative bg-[#F0FDF4] py-16 lg:py-24 border-y border-[#D1E7DD]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="APMC Market"
            title="Navi Mumbai APMC Market"
            description="APMC Market in Turbhe, Navi Mumbai, is a major wholesale agricultural trading ecosystem serving fruits, vegetables, grains, spices and onion-potato commodities."
          />

          {/* Location card */}
          <ScrollReveal variant="up" className="mt-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-[#D1E7DD] bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#059669] ring-1 ring-[#059669]/20">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#047857] font-bold">
                  Location
                </p>
                <p className="mt-1 text-sm font-semibold text-[#042017]">
                  {siteConfig.apmcAddress}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Market categories */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market, i) => (
              <MarketCard key={market.slug} market={market} index={i} />
            ))}
            {/* CTA tile */}
            <ScrollReveal variant="up" delay={markets.length * 90} className="h-full">
              <Link
                href="/apmc"
                className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#059669]/40 bg-white p-8 text-center transition-all hover:border-[#059669] hover:bg-[#ECFDF5] shadow-sm"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#042017] text-[#10B981] ring-1 ring-[#059669]/30 transition-transform group-hover:scale-110">
                  <Store className="h-7 w-7" />
                </span>
                <span className="font-heading text-lg font-bold text-[#042017]">
                  Explore APMC in Detail
                </span>
                <span className="text-sm text-[#4B5563]">
                  Market overview, commodity rates &amp; resources
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#059669]">
                  View APMC Page
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 9. Daily Market Rates CTA */}
      <CTASection
        variant="navy"
        eyebrow="Market Rates"
        icon={TrendingUp}
        title="APMC Wholesale Commodity Rates"
        description="View daily indicative rate bands for Fruits, Vegetables, Grains, Spices and Onion-Potato wholesale markets."
        buttons={[
          {
            label: "Explore Market Rates",
            href: "/apmc",
            variant: "primary",
          },
          {
            label: "View Official Portal",
            href: siteConfig.dailyRatesUrl,
            external: true,
            variant: "secondary",
          },
        ]}
      />

      {/* 10. Achievements */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Achievements"
            title="Achievements & Official Honours"
            description="A verified archive of business awards, international honours from Dubai, national trade recognitions and merchant community milestones."
          />

          {/* Top 3 Award Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border-2 border-[#D1E7DD] bg-[#F0FDF4] p-6 shadow-sm">
              <span className="text-xs uppercase font-bold text-[#047857] tracking-wider">Girnar Award (2008)</span>
              <h3 className="mt-2 font-heading text-xl font-bold text-[#042017]">Best Businessman Award</h3>
              <p className="mt-2 text-xs text-[#4B5563] leading-relaxed">
                Conferred by Bruhad Mumbai Gujarati Samaj Mumbai for outstanding business leadership.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#059669] bg-[#042017] text-white p-6 shadow-sm">
              <span className="text-xs uppercase font-bold text-[#10B981] tracking-wider">Dubai (2025)</span>
              <h3 className="mt-2 font-heading text-xl font-bold text-white">Global Business ICON</h3>
              <p className="mt-2 text-xs text-white/85 leading-relaxed">
                Conferred at Glimpses Global Business ICON Awards in Dubai with international dignitaries.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#D1E7DD] bg-[#F0FDF4] p-6 shadow-sm">
              <span className="text-xs uppercase font-bold text-[#047857] tracking-wider">CAIT New Delhi</span>
              <h3 className="mt-2 font-heading text-xl font-bold text-[#042017]">Trade Development Award</h3>
              <p className="mt-2 text-xs text-[#4B5563] leading-relaxed">
                Honored by CAIT Research & Trade Development Society for leadership in national commerce.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <AchievementsGallery images={achievementImages} />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/achievements"
              className="group inline-flex items-center gap-2 rounded-full bg-[#059669] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#047857] hover:-translate-y-0.5"
            >
              View All 11 Verified Awards &amp; Citations
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Golden Memories */}
      <GoldenMemoriesSection />

      {/* 12. Board Preview */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Board of Directors"
            title="Navi Mumbai Merchants Chamber — Board"
            description="The leadership body of the Navi Mumbai Merchants Chamber, chaired by Kirti Rana."
          />
          <div className="mt-12 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {boardMembers.slice(0, 4).map((m, i) => (
              <BoardMemberCard key={m.name} member={m} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/board"
              className="group inline-flex items-center gap-2 rounded-full bg-[#042017] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#059669] hover:-translate-y-0.5"
            >
              View Full Board
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. Media Coverage */}
      <MediaPreviewSection />

      {/* 14. Gallery Preview */}
      <section className="bg-[#F0FDF4] py-16 lg:py-24 border-y border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="A Visual Journey"
            description="A curated view across Shri Kirti Rana's business, organizations, APMC market, events and media."
          />
          <div className="mt-12">
            <GalleryGrid items={galleryItems.slice(0, 8)} />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-[#059669] bg-white px-7 py-3.5 text-sm font-bold text-[#042017] transition-all hover:bg-[#059669] hover:text-white hover:-translate-y-0.5 shadow-sm"
            >
              <Images className="h-4 w-4" />
              Open Full Gallery
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 15. Contact CTA */}
      <CTASection
        variant="light"
        eyebrow="Get in Touch"
        icon={Building2}
        title="Connect With Us"
        description="For business enquiries, chamber matters or general information, reach out through the contact page."
        buttons={[
          { label: "Send Enquiry", href: "/contact", variant: "primary" },
          { label: "About Kirti Rana", href: "/about", variant: "secondary" },
        ]}
      />
    </>
  );
}

/* ---------------- Inline section components ---------------- */

function AboutSection() {
  const highlights = [
    {
      role: "President / Chairman",
      org: "Navi Mumbai Merchants Chamber (30+ Yrs, 400+ Members)",
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
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-b border-[#D1E7DD]">
      {/* Subtle Architectural Watermark */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/hero/chamber-headquarters-hero.jpg"
          alt="Navi Mumbai Merchants Chamber Complex"
          fill
          className="object-cover object-center opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          {/* LEFT — portrait with 100% visual clarity */}
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
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="h-full w-full rounded-none border-0 ring-0"
                    imgClassName="object-cover object-top"
                  />
                  {/* Subtle clean bottom gradient for name readability only */}
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

          {/* RIGHT — content */}
          <ScrollReveal variant="right">
            <SectionHeading
              align="left"
              eyebrow="Profile"
              title="About Shri Kirti Rana"
            />
            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-[#4B5563]">
              Shri Kirti Rana is an esteemed leader in India&apos;s trade and agricultural
              ecosystem. Serving as President of the <strong className="text-[#042017] font-bold">Navi Mumbai Merchants Chamber</strong> (a 30+ year old association of 400+ spice processors and traders with a dedicated 50-acre complex) and Chairman of the <strong className="text-[#042017] font-bold">Bombay Mudibazar Kariana Merchants Association</strong>, he actively champions trader welfare, fair market practices, and the national retail sector through CAIT.
            </p>

            <ul className="mt-7 space-y-3">
              {highlights.map((h) => {
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

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#059669] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#047857] hover:-translate-y-0.5"
            >
              Read Full Biography
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function BusinessSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 text-[#042017] border-y border-[#D1E7DD]">
      {/* Subtle Architectural Watermark */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/hero/hero-trading-bg.jpg"
          alt="Commodity Trade Complex"
          fill
          className="object-cover object-center opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          <ScrollReveal variant="left">
            <span className="eyebrow inline-flex items-center gap-2 text-[#059669] font-bold">
              <span aria-hidden className="inline-block h-0.5 w-6 rounded-full bg-[#059669]" />
              Business
            </span>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-tight text-[#042017]">
              Kisan Kirti Agro Pvt. Ltd.
            </h2>
            <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-[#059669]" />
            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-[#4B5563]">
              Kisan Kirti Agro Pvt. Ltd. is the commercial agricultural enterprise
              associated with Kirti Rana, operating within the wholesale commodity and
              APMC trading ecosystem of Navi Mumbai.
            </p>

            <div className="mt-7 rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-5 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-bold text-[#042017]">
                <Sprout className="h-4 w-4 text-[#059669]" />
                Agricultural Enterprise
              </p>
              <p className="mt-2 text-sm text-[#4B5563]">
                Engaged in wholesale supply chains, agricultural partnerships, and merchant trade facilitation across Maharashtra and Gujarat belts.
              </p>
            </div>

            <Link
              href="/business"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#059669] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#047857] hover:-translate-y-0.5"
            >
              View Business Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>

          <ScrollReveal variant="right">
            <div className="relative overflow-hidden rounded-3xl border-2 border-[#059669] shadow-xl bg-white">
              <div className="relative aspect-[4/3]">
                <LightboxImage
                  src="/images/kirti-rana/agriculture.jpg"
                  alt="Agriculture and trade — golden wheat field at sunrise"
                  caption="Rooted in India's agricultural heritage — Agriculture & Trade"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full rounded-none border-0 ring-0"
                  imgClassName="object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#042017]/80 via-transparent to-transparent"
                />
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 z-10">
                <p className="text-xs uppercase tracking-[0.18em] text-[#10B981] font-bold">
                  Agriculture &amp; Trade
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-white">
                  Rooted in India&apos;s agricultural heritage
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function GoldenMemoriesSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0FDF4] py-16 lg:py-24 border-b border-[#D1E7DD]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Golden Memories"
          title="Golden Memories of Mr. Kirti Rana's Leadership"
          description="A photographic record of international summits, trade conventions and felicitations across his career."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Feature photo */}
          <ScrollReveal variant="scale" className="lg:col-span-2">
            <LightboxImage
              src={goldenMemories[0].src}
              alt={goldenMemories[0].alt}
              caption={goldenMemories[0].caption}
              overlay
              className="aspect-[16/9] ring-0"
              imgClassName="object-cover"
            />
          </ScrollReveal>
          {/* Supporting */}
          <div className="grid gap-5">
            {goldenMemories.slice(1).map((m, i) => (
              <ScrollReveal key={m.src} variant="up" delay={i * 120}>
                <LightboxImage
                  src={m.src}
                  alt={m.alt}
                  caption={m.caption}
                  overlay
                  className="aspect-[16/9] ring-0"
                  imgClassName="object-cover"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal variant="up" className="mt-8">
          <div className="flex items-start gap-3 rounded-2xl border border-[#D1E7DD] bg-white p-5 shadow-sm">
            <Quote className="h-5 w-5 shrink-0 text-[#059669]" />
            <p className="text-sm text-[#4B5563]">
              Capturing momentous occasions from Dubai to New Delhi and Mumbai — celebrating decades of dedicated service to India&apos;s merchant community.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function MediaPreviewSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Media & Press"
          title="Media Coverage & Events"
          description="Featured press coverage and national trade event flyers featuring Shri Kirti Rana."
        />
        <ScrollReveal variant="up" className="mt-12">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-5 items-center">
            <div className="md:col-span-2">
              <LightboxImage
                src="/images/events/bharatiya-vyapar-mahotsav-2026.jpg"
                alt="Bharatiya Vyapar Mahotsav 2026 Poster"
                caption="Bharatiya Vyapar Mahotsav 2026 — ITPO & CAIT, Bharat Mandapam"
                overlay
                className="aspect-[3/4] ring-0"
                imgClassName="object-cover"
              />
            </div>
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-bold text-[#047857] ring-1 ring-[#059669]/30">
                <Newspaper className="h-3.5 w-3.5" />
                National Trade Initiative
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold text-[#042017]">
                Bharatiya Vyapar Mahotsav 2026
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                A premier multi-sector trade festival organized jointly by ITPO and CAIT at <strong>Bharat Mandapam, Pragati Maidan, New Delhi</strong> (12–15 August 2026), championing Aatmanirbhar Bharat and India&apos;s retail &amp; wholesale enterprise.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#D1E7DD] bg-[#F0FDF4] p-4">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#047857] font-bold">
                    <Building2 className="h-3.5 w-3.5" /> Venue
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#042017]">
                    Bharat Mandapam, New Delhi
                  </dd>
                </div>
                <div className="rounded-xl border border-[#D1E7DD] bg-[#F0FDF4] p-4">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#047857] font-bold">
                    <CalendarDays className="h-3.5 w-3.5" /> Dates
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#042017]">
                    12 to 15 August 2026
                  </dd>
                </div>
              </dl>
              <Link
                href="/media"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#059669] transition hover:text-[#047857]"
              >
                View Full Media &amp; Events Page
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
