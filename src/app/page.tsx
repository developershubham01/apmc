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
  Clock,
  ExternalLink,
  Quote,
  Newspaper,
  Images,
  Building2,
  Wheat,
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

const introCards = [
  {
    icon: Users,
    title: "Merchant Community",
    description:
      "Representing and serving the interests of traders, merchants and enterprises across Navi Mumbai.",
  },
  {
    icon: Sprout,
    title: "Agriculture & Trade",
    description:
      "Engaged with the agricultural trading ecosystem at the Navi Mumbai APMC Market, Turbhe.",
  },
  {
    icon: MapPin,
    title: "Navi Mumbai",
    description:
      "An established presence in one of Maharashtra's most important commercial regions.",
  },
  {
    icon: Crown,
    title: "Business Leadership",
    description:
      "Chairmanship of two merchant organizations guiding community and trade development.",
  },
];

const achievementImages = [
  {
    src: "/images/events/conference.jpg",
    alt: "Business conference hall before a merchant chamber event",
    caption: "Merchant Chamber Conference",
    category: "Conferences",
  },
  {
    src: "/images/events/trade-meeting.jpg",
    alt: "Business meeting setup at a merchant association meeting",
    caption: "Merchant Meeting",
    category: "Merchant Meetings",
  },
  {
    src: "/images/events/felicitations.jpg",
    alt: "Ceremonial stage with garlands at a felicitation event",
    caption: "Felicitations",
    category: "Felicitations",
  },
  {
    src: "/images/events/community.jpg",
    alt: "Community gathering hall before a merchant community meeting",
    caption: "Community Activity",
    category: "Community Activities",
  },
  {
    src: "/images/apmc/market-yard.jpg",
    alt: "Navi Mumbai APMC market yard",
    caption: "APMC Trade Visit",
    category: "Business Events",
  },
  {
    src: "/images/kirti-rana/agriculture.jpg",
    alt: "Agricultural landscape — golden wheat field",
    caption: "Agriculture & Trade Engagement",
    category: "Professional Meetings",
  },
];

const goldenMemories = [
  {
    src: "/images/events/conference.jpg",
    alt: "Merchant chamber conference stage",
    caption: "Event Photograph",
  },
  {
    src: "/images/events/community.jpg",
    alt: "Merchant community gathering",
    caption: "Event Photograph",
  },
  {
    src: "/images/events/felicitations.jpg",
    alt: "Felicitation ceremony stage",
    caption: "Event Photograph",
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
            description="Kirti Rana's work spans merchant community leadership, agricultural trade and business development — anchored in Navi Mumbai's commercial ecosystem."
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

      {/* 5. Organizations */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Organizations"
            title="Leadership of Merchant Organizations"
            description="Kirti Rana serves as Chairman of two merchant community organizations, representing traders and enterprises across the region."
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
        <div aria-hidden className="absolute inset-0 bg-heritage-grid opacity-50" />
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
                  Market overview, timings & official resources
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
        eyebrow="Official Resource"
        icon={TrendingUp}
        title="Today's APMC Market Rates"
        description="Market prices are published through the official Mumbai APMC portal. This website is static and does not display live prices — please refer to the official source for daily rates."
        buttons={[
          {
            label: "View Official Daily Rates",
            href: siteConfig.dailyRatesUrl,
            external: true,
            variant: "primary",
          },
          {
            label: "About APMC Market",
            href: "/apmc",
            variant: "secondary",
          },
        ]}
      />

      {/* 10. Achievements */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Achievements"
            title="Achievements & Golden Memories"
            description="A visual archive of business events, merchant meetings, conferences, felicitations and community activities. Captions are kept generic where event details are not verified."
          />
          <div className="mt-12">
            <AchievementsGallery images={achievementImages} />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/achievements"
              className="group inline-flex items-center gap-2 rounded-xl border border-navy/15 bg-white px-6 py-3.5 text-sm font-600 text-navy transition-all hover:border-gold hover:text-royal hover:-translate-y-0.5"
            >
              View All Achievements
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
            description="A curated view across Kirti Rana's business, organizations, APMC market, events and media."
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
        description="For business enquiries, organization matters or general information, reach out through the contact page."
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
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div aria-hidden className="absolute inset-0 bg-heritage-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          {/* LEFT — portrait */}
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

          {/* RIGHT — content */}
          <ScrollReveal variant="right">
            <SectionHeading
              align="left"
              eyebrow="About"
              title="About Kirti Rana"
            />
            <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-ink-600">
              Kirti Rana is associated with Navi Mumbai&apos;s business and
              merchant community and serves in leadership roles within merchant
              organizations. His work centres on community representation,
              business development and agricultural trade within the region's
              commercial ecosystem.
            </p>

            <ul className="mt-7 space-y-3">
              {highlights.map((h) => {
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

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 hover:-translate-y-0.5"
            >
              Read Full Profile
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
      <div aria-hidden className="absolute inset-0 bg-navy-grid opacity-40" />
      <div
        aria-hidden
        className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-royal/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />
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
              Kisan Kirti Agro Pvt. Ltd. is the business association of Kirti
              Rana, positioned within the agriculture and trade ecosystem of
              Navi Mumbai. The venture aligns with the region's agricultural
              trading activity centred around the APMC market.
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="flex items-center gap-2 text-sm font-600 text-gold">
                <Sprout className="h-4 w-4" />
                Information Status
              </p>
              <p className="mt-2 text-sm text-white/70">
                Business information to be updated. Detailed company
                information will be added once verified.
              </p>
            </div>

            <Link
              href="/business"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-600 text-navy shadow-gold-glow transition-all hover:bg-gold-600 hover:-translate-y-0.5"
            >
              View Business Page
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
      <div aria-hidden className="absolute inset-0 bg-heritage-grid opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Golden Memories"
          title="Golden Memories of Mr. Kirti Rana's Life"
          description="A visual storytelling of milestones and moments. Where specific dates are unavailable, captions remain as 'Event Photograph' rather than fabricated timelines."
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
              These photographs are presented as visual memories. Verified
              dates and detailed captions will be added as information becomes
              available.
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
          title="Media Coverage"
          description="Featured press coverage of Kirti Rana's work in the merchant community."
        />
        <ScrollReveal variant="up" className="mt-12">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-5 items-center">
            <div className="md:col-span-2">
              <LightboxImage
                src="/images/media/newspaper-texture.jpg"
                alt="Vyapar Kesari newspaper coverage of Kirti Rana"
                caption="Featured in Vyapar Kesari"
                overlay
                className="aspect-[4/5] ring-0"
                imgClassName="object-cover"
              />
            </div>
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1.5 text-xs font-600 text-gold-600 ring-1 ring-gold/30">
                <Newspaper className="h-3.5 w-3.5" />
                Featured in Vyapar Kesari
              </span>
              <h3 className="mt-4 font-heading text-2xl font-700 text-navy">
                Press Coverage in Vyapar Kesari
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Kirti Rana's contributions to the merchant community have been
                featured in Vyapar Kesari, a publication covering trade and
                commerce. The original newspaper clipping is available for
                viewing in the media page.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-mist p-4">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-royal font-600">
                    <Newspaper className="h-3.5 w-3.5" /> Publication
                  </dt>
                  <dd className="mt-1 text-sm font-600 text-navy">
                    Vyapar Kesari
                  </dd>
                </div>
                <div className="rounded-xl border border-border bg-mist p-4">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-royal font-600">
                    <CalendarDays className="h-3.5 w-3.5" /> Date
                  </dt>
                  <dd className="mt-1 text-sm font-600 text-navy">
                    To be updated
                  </dd>
                </div>
              </dl>
              <Link
                href="/media"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-600 text-royal transition hover:text-navy"
              >
                View Media Page
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
