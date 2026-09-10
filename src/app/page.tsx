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
  Trophy,
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
    icon: Users,
    title: "400+ Spice Specialists",
    description:
      "Leading an apex association of 400+ spice processors, exporters, wholesalers, distributors and cold chain operators.",
  },
  {
    icon: Building2,
    title: "50-Acre Trade Complex",
    description:
      "Guiding operations and trade infrastructure across a dedicated 50-acre domestic & international spice trading complex.",
  },
  {
    icon: Sprout,
    title: "Agriculture & APMC",
    description:
      "Deeply connected with the wholesale agricultural trading ecosystem at the Navi Mumbai APMC Market, Turbhe.",
  },
  {
    icon: Trophy,
    title: "11+ Major Honours",
    description:
      "Recognized with prestigious honours including the Girnar Best Businessman Award (2008) and Global Business ICON Award (Dubai 2025).",
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
    src: "/images/association/salient-features-merchants-chamber.jpg",
    alt: "Salient Features of Navi Mumbai Merchants Chamber presentation",
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
      <section className="bg-mist py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Introduction"
            title="A Multifaceted Business Presence"
            description="Shri Kirti Rana's work spans merchant community leadership, agricultural trade, national trade advocacy and business development — anchored in Navi Mumbai's commercial ecosystem."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {introCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} variant="up" delay={i * 90} className="h-full">
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/30 transition-colors group-hover:bg-royal">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-700 text-navy">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {card.description}
                    </p>
                    <span
                      aria-hidden
                      className="mt-4 block h-0.5 w-8 rounded-full bg-gold transition-all duration-300 group-hover:w-14"
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
      <section className="relative overflow-hidden bg-gradient-to-r from-navy via-navy-800 to-royal py-14 text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow inline-flex items-center gap-2 text-gold">
                <Building2 className="h-4 w-4" />
                Apex Merchant Body
              </span>
              <h2 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-4xl font-700 leading-tight">
                Navi Mumbai Merchants&apos; Chamber
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                A 30+ year old association of 400+ spice processors, specialists, exporters, wholesalers, distributors, retailers and cold chain owners operating across a dedicated 50-acre complex for domestic and international trade.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
                  <p className="font-heading text-xl font-800 text-gold">30+ Years</p>
                  <p className="text-xs text-white/70">Established Legacy</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
                  <p className="font-heading text-xl font-800 text-gold">400+</p>
                  <p className="text-xs text-white/70">Member Network</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
                  <p className="font-heading text-xl font-800 text-gold">50 Acres</p>
                  <p className="text-xs text-white/70">Dedicated Trade Complex</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <LightboxImage
                src="/images/association/salient-features-merchants-chamber.jpg"
                alt="Navi Mumbai Merchants Chamber Salient Features Slide"
                caption="Salient Features of Navi Mumbai Merchants Chamber"
                overlay
                className="aspect-[16/10] rounded-2xl border-2 border-gold/40 ring-0 shadow-2xl"
                imgClassName="object-cover"
              />
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
      <section className="relative bg-mist py-16 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="APMC Market"
            title="Navi Mumbai APMC Market"
            description="APMC Market in Turbhe, Navi Mumbai, is a major wholesale agricultural trading ecosystem serving fruits, vegetables, grains, spices and onion-potato commodities."
          />

          {/* Location card */}
          <ScrollReveal variant="up" className="mt-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border bg-white p-6 text-center shadow-premium sm:flex-row sm:text-left">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal ring-1 ring-royal/20">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-royal font-600">
                  Location
                </p>
                <p className="mt-1 text-sm font-500 text-ink">
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
                className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-navy/20 bg-white p-8 text-center transition-all hover:border-gold hover:bg-gold-50/40"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold ring-1 ring-gold/30 transition-transform group-hover:scale-110">
                  <Store className="h-7 w-7" />
                </span>
                <span className="font-heading text-lg font-700 text-navy">
                  Explore APMC in Detail
                </span>
                <span className="text-sm text-ink-600">
                  Market overview, commodity rates &amp; resources
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-600 text-royal">
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
            <div className="rounded-2xl border-2 border-gold/40 bg-gold-50/30 p-6 shadow-sm">
              <span className="text-xs uppercase font-700 text-gold-700 tracking-wider">Girnar Award (2008)</span>
              <h3 className="mt-2 font-heading text-xl font-700 text-navy">Best Businessman Award</h3>
              <p className="mt-2 text-xs text-ink-600 leading-relaxed">
                Conferred by Bruhad Mumbai Gujarati Samaj Mumbai for outstanding business leadership.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-navy/20 bg-navy text-white p-6 shadow-sm">
              <span className="text-xs uppercase font-700 text-gold tracking-wider">Dubai (2025)</span>
              <h3 className="mt-2 font-heading text-xl font-700 text-white">Global Business ICON</h3>
              <p className="mt-2 text-xs text-white/80 leading-relaxed">
                Conferred at Glimpses Global Business ICON Awards in Dubai with international dignitaries.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-royal/20 bg-royal-50/50 p-6 shadow-sm">
              <span className="text-xs uppercase font-700 text-royal tracking-wider">CAIT New Delhi</span>
              <h3 className="mt-2 font-heading text-xl font-700 text-navy">Trade Development Award</h3>
              <p className="mt-2 text-xs text-ink-600 leading-relaxed">
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
              className="group inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 hover:-translate-y-0.5"
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
              className="group inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 hover:-translate-y-0.5"
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
      <section className="bg-mist py-16 lg:py-24">
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
              className="group inline-flex items-center gap-2 rounded-xl border border-navy/15 bg-white px-6 py-3.5 text-sm font-600 text-navy transition-all hover:border-gold hover:text-royal hover:-translate-y-0.5"
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
      role: "Business Venture",
      org: "Kisan Kirti Agro Pvt. Ltd.",
      icon: Wheat,
    },
  ];
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          {/* LEFT — portrait */}
          <ScrollReveal variant="left">
            <div className="relative mx-auto max-w-md">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/30 to-royal/20 blur-xl"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-gold/40 bg-navy shadow-premium-lg">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/images/kirti-rana/portrait-lead.jpg"
                    alt="Shri Kirti Rana"
                    fill
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
                    30+ Yrs
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
            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-ink-600">
              Shri Kirti Rana is an esteemed leader in India&apos;s trade and agricultural
              ecosystem. Serving as President of the <strong>Navi Mumbai Merchants Chamber</strong> (a 30+ year old association of 400+ spice processors and traders with a dedicated 50-acre complex) and Chairman of the <strong>Bombay Mudibazar Kariana Merchants Association</strong>, he actively champions trader welfare, fair market practices, and the national retail sector through CAIT.
            </p>

            <ul className="mt-7 space-y-3">
              {highlights.map((h) => {
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

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 hover:-translate-y-0.5"
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
    <section className="relative overflow-hidden bg-navy py-16 lg:py-24 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(22,78,154,0.25)_0%,transparent_70%)]" />
        <div className="absolute -left-1/4 bottom-0 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.15)_0%,transparent_70%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          <ScrollReveal variant="left">
            <span className="eyebrow inline-flex items-center gap-2 text-gold">
              <span aria-hidden className="inline-block h-px w-6 bg-gold/60" />
              Business
            </span>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-700 leading-tight">
              Kisan Kirti Agro Pvt. Ltd.
            </h2>
            <span aria-hidden className="mt-4 block gold-hairline" />
            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-white/75">
              Kisan Kirti Agro Pvt. Ltd. is the commercial agricultural enterprise
              associated with Kirti Rana, operating within the wholesale commodity and
              APMC trading ecosystem of Navi Mumbai.
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="flex items-center gap-2 text-sm font-600 text-gold">
                <Sprout className="h-4 w-4" />
                Agricultural Enterprise
              </p>
              <p className="mt-2 text-sm text-white/70">
                Engaged in wholesale supply chains, agricultural partnerships, and merchant trade facilitation across Maharashtra and Gujarat belts.
              </p>
            </div>

            <Link
              href="/business"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-600 text-navy shadow-gold-glow transition-all hover:bg-gold-600 hover:-translate-y-0.5"
            >
              View Business Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>

          <ScrollReveal variant="right">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/15">
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
  );
}

function GoldenMemoriesSection() {
  return (
    <section className="relative overflow-hidden bg-mist py-16 lg:py-24">
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
          <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold-50/60 p-5">
            <Quote className="h-5 w-5 shrink-0 text-gold-600" />
            <p className="text-sm text-ink-600">
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
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1.5 text-xs font-600 text-gold-600 ring-1 ring-gold/30">
                <Newspaper className="h-3.5 w-3.5" />
                National Trade Initiative
              </span>
              <h3 className="mt-4 font-heading text-2xl font-700 text-navy">
                Bharatiya Vyapar Mahotsav 2026
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                A premier multi-sector trade festival organized jointly by ITPO and CAIT at <strong>Bharat Mandapam, Pragati Maidan, New Delhi</strong> (12–15 August 2026), championing Aatmanirbhar Bharat and India&apos;s retail &amp; wholesale enterprise.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-mist p-4">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-royal font-600">
                    <Building2 className="h-3.5 w-3.5" /> Venue
                  </dt>
                  <dd className="mt-1 text-sm font-600 text-navy">
                    Bharat Mandapam, New Delhi
                  </dd>
                </div>
                <div className="rounded-xl border border-border bg-mist p-4">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-royal font-600">
                    <CalendarDays className="h-3.5 w-3.5" /> Dates
                  </dt>
                  <dd className="mt-1 text-sm font-600 text-navy">
                    12 to 15 August 2026
                  </dd>
                </div>
              </dl>
              <Link
                href="/media"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-600 text-royal transition hover:text-navy"
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
