import type { Metadata } from "next";
import { Award, Quote, Images } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { AchievementsGallery, type MasonryImage } from "@/components/site/AchievementsGallery";
import { CTASection } from "@/components/site/CTASection";

export const metadata: Metadata = {
  title: "Achievements & Golden Memories | Kirti Rana",
  description:
    "A visual archive of business events, merchant meetings, conferences, felicitations and community activities featuring Kirti Rana.",
  alternates: { canonical: "/achievements" },
};

const achievements: MasonryImage[] = [
  {
    src: "/images/events/conference.jpg",
    alt: "Business conference hall before a merchant chamber event",
    caption: "Merchant Chamber Conference",
    category: "Conferences",
  },
  {
    src: "/images/events/trade-meeting.jpg",
    alt: "Business meeting setup at a merchant association meeting",
    caption: "Merchant Association Meeting",
    category: "Merchant Meetings",
  },
  {
    src: "/images/events/felicitations.jpg",
    alt: "Ceremonial stage with garlands at a felicitation event",
    caption: "Felicitation Ceremony",
    category: "Felicitations",
  },
  {
    src: "/images/events/community.jpg",
    alt: "Community gathering hall before a merchant community meeting",
    caption: "Community Gathering",
    category: "Community Activities",
  },
  {
    src: "/images/apmc/market-yard.jpg",
    alt: "Navi Mumbai APMC market yard visit",
    caption: "APMC Trade Engagement",
    category: "Business Events",
  },
  {
    src: "/images/kirti-rana/agriculture.jpg",
    alt: "Agricultural landscape engagement",
    caption: "Agriculture & Trade Engagement",
    category: "Professional Meetings",
  },
  {
    src: "/images/apmc/fruit-market.jpg",
    alt: "Fruit market trade visit",
    caption: "Fruit Market Trade Visit",
    category: "Business Events",
  },
  {
    src: "/images/apmc/spice-market.jpg",
    alt: "Spice market trade visit",
    caption: "Spice Market Engagement",
    category: "Professional Meetings",
  },
  {
    src: "/images/apmc/grain-market.jpg",
    alt: "Grain market trade visit",
    caption: "Grain Market Trade Visit",
    category: "Business Events",
  },
];

const categories = [
  "Business Events",
  "Merchant Meetings",
  "Conferences",
  "Felicitations",
  "Community Activities",
  "Professional Meetings",
];

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        title="Achievements & Golden Memories"
        description="A visual archive of business events, merchant meetings, conferences, felicitations and community activities. Captions are kept generic where event details are not verified."
        crumbs={[{ label: "Achievements" }]}
      />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 items-center">
            <ScrollReveal variant="up" className="lg:col-span-2">
              <SectionHeading
                align="left"
                eyebrow="Visual Archive"
                title="Moments of Leadership & Community"
                description="From merchant chamber conferences to community gatherings and trade engagements at the APMC, these photographs capture the breadth of activity Kirti Rana is associated with."
              />
            </ScrollReveal>
            <ScrollReveal variant="up" delay={120}>
              <div className="rounded-2xl border border-border bg-mist p-6 text-center">
                <Award className="mx-auto h-10 w-10 text-gold" />
                <p className="mt-3 font-heading text-3xl font-800 text-navy">
                  {categories.length}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                  Activity Categories
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Category chips */}
          <ScrollReveal variant="up" className="mt-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-gold/30 bg-gold-50/50 px-3.5 py-1.5 text-xs font-600 text-gold-600"
                >
                  {c}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AchievementsGallery images={achievements} showFilters />
        </div>
      </section>

      {/* Note */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="up">
            <div className="flex items-start gap-3 rounded-2xl border-l-4 border-gold bg-gold-50/50 p-5">
              <Quote className="h-5 w-5 shrink-0 text-gold-600" />
              <p className="text-sm text-ink-600">
                These photographs are presented as a visual record. Specific
                event names, dates and achievements are not fabricated —
                verified details will be added as information becomes available.
                Where a caption is unavailable, the label &ldquo;Event
                Photograph&rdquo; is used.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Continue"
        icon={Images}
        title="Explore the Full Gallery & Media"
        description="Browse the complete gallery of business, APMC, events and media coverage."
        buttons={[
          { label: "Open Gallery", href: "/gallery", variant: "primary" },
          { label: "View Media", href: "/media", variant: "secondary" },
        ]}
      />
    </>
  );
}
