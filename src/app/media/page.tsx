import type { Metadata } from "next";
import Link from "next/link";
import {
  Newspaper,
  CalendarDays,
  FileText,
  ChevronRight,
  Quote,
  Info,
  ArrowRight,
  CalendarRange,
  HeartHandshake,
  Megaphone,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { LightboxImage } from "@/components/site/LightboxImage";
import { CTASection } from "@/components/site/CTASection";
import { MediaCategoryBar } from "@/components/site/MediaCategoryBar";
import {
  mediaCategories,
  entriesFor,
  type MediaCategorySlug,
} from "@/data/media";

export const metadata: Metadata = {
  title: "Media & Press Coverage | Kirti Rana",
  description:
    "Media desk of Kirti Rana — events, social activities, news and press coverage including the Vyapar Kesari feature for contributions to the merchant community and trade.",
  alternates: { canonical: "/media" },
};

const categoryMeta: Record<
  MediaCategorySlug,
  { Icon: typeof Newspaper; image: string; imageAlt: string }
> = {
  events: {
    Icon: CalendarRange,
    image: "/images/events/trade-meeting.jpg",
    imageAlt: "Merchant leaders at a chamber trade meeting",
  },
  "social-activities": {
    Icon: HeartHandshake,
    image: "/images/events/community.jpg",
    imageAlt: "Community welfare gathering",
  },
  news: {
    Icon: Megaphone,
    image: "/images/apmc/fruit-market.jpg",
    imageAlt: "Wholesale fruit market at the APMC yard",
  },
};

const mediaFeatures = [
  {
    publication: "Vyapar Kesari",
    date: "To be updated",
    coverage: "Merchant community & trade",
    image: "/images/media/newspaper-texture.jpg",
    title: "Featured in Vyapar Kesari",
    summary:
      "Kirti Rana's contributions to the merchant community have been featured in Vyapar Kesari, a publication covering trade and commerce.",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media & Press"
        title="Media & Press Coverage"
        description="Press coverage of Kirti Rana's work in the merchant community and agricultural trade. Featured publications and coverage are documented here."
        crumbs={[{ label: "Media" }]}
        icon={Newspaper}
      />

      {/* Section selector (dropdown + quick pills) */}
      <MediaCategoryBar />

      {/* Media Desk — category cards */}
      <section className="bg-white py-14 lg:py-20" aria-label="Media desk sections">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore the Media Desk"
            title="Events, Social Activities & News"
            description="The media desk is organised into three sections. Use the dropdown above or open a section below to browse it in full."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {mediaCategories.map((category, i) => {
              const { Icon, image, imageAlt } = categoryMeta[category.slug];
              const count = entriesFor(category.slug).length;
              return (
                <ScrollReveal key={category.slug} variant="up" delay={i * 80}>
                  <Link
                    href={`/media/${category.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-premium transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-premium-lg"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={image}
                        alt={imageAlt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"
                      />
                      <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.66rem] font-700 uppercase tracking-[0.12em] text-navy ring-1 ring-gold/40">
                        <Icon className="h-3 w-3 text-gold-600" />
                        {count} {count === 1 ? "entry" : "entries"}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[0.66rem] font-700 uppercase tracking-[0.16em] text-royal">
                        {category.eyebrow}
                      </p>
                      <h3 className="mt-1.5 font-heading text-xl font-700 text-navy transition-colors group-hover:text-royal">
                        {category.label}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                        {category.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-600 text-royal">
                        Open section
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured coverage */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured Coverage"
            title="Featured in Vyapar Kesari"
            description="Kirti Rana's work in the merchant community has been recognized in the press. Click the newspaper image to view it in the lightbox."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-5 items-start">
            {/* Newspaper image */}
            <ScrollReveal variant="left" className="lg:col-span-2">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-gold/15 to-royal/10 blur-xl"
                />
                <div className="relative">
                  <LightboxImage
                    src="/images/media/newspaper-texture.jpg"
                    alt="Vyapar Kesari newspaper coverage of Kirti Rana"
                    caption="Featured in Vyapar Kesari — Press Coverage"
                    overlay
                    className="aspect-[4/5] ring-2 ring-gold/30"
                    imgClassName="object-cover"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-[0.66rem] font-700 uppercase tracking-[0.14em] text-gold">
                    <Newspaper className="h-3.5 w-3.5" />
                    Press Clipping
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal variant="right" className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1.5 text-xs font-600 text-gold-600 ring-1 ring-gold/30">
                <Newspaper className="h-3.5 w-3.5" />
                Featured in Vyapar Kesari
              </span>
              <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-700 text-navy">
                Press Coverage in Vyapar Kesari
              </h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-ink-600">
                Kirti Rana&apos;s contributions to the merchant community have
                been featured in Vyapar Kesari, a publication covering trade and
                commerce. The coverage highlights his role in merchant community
                leadership and engagement with the trading ecosystem.
              </p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
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
                <div className="rounded-xl border border-border bg-mist p-4">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-royal font-600">
                    <FileText className="h-3.5 w-3.5" /> Coverage
                  </dt>
                  <dd className="mt-1 text-sm font-600 text-navy">
                    Merchant community &amp; trade
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-xl border border-navy/15 bg-white px-5 py-3 text-sm font-600 text-navy transition-all hover:border-gold hover:text-royal"
                >
                  View Gallery
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Quote */}
          <ScrollReveal variant="up" className="mt-14">
            <figure className="mx-auto max-w-3xl rounded-2xl border-l-4 border-gold bg-gold-50/50 p-6 text-center">
              <Quote className="mx-auto h-6 w-6 text-gold-600" />
              <blockquote className="mt-3 text-pretty text-base italic leading-relaxed text-ink-600">
                &ldquo;Recognition in the press reflects the trust and
                confidence of the merchant community in collective
                leadership.&rdquo;
              </blockquote>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Coverage list */}
      <section className="bg-mist py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="All Coverage"
            title="Press & Media Features"
            description="A summary of press features. Additional verified coverage will be added as it becomes available."
          />
          <div className="mt-10 space-y-4">
            {mediaFeatures.map((m) => (
              <ScrollReveal key={m.title} variant="up">
                <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-premium sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold ring-1 ring-gold/30">
                      <Newspaper className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                        {m.publication}
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-700 text-navy">
                        {m.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-600">{m.summary}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 text-sm">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.14em] text-royal font-600">
                        Date
                      </p>
                      <p className="font-600 text-navy">{m.date}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="up" className="mt-8">
            <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold-50/50 p-5">
              <Info className="h-5 w-5 shrink-0 text-gold-600" />
              <p className="text-sm text-ink-600">
                Publication details are kept generic where the verified date and
                specifics are not clearly available. Details will be updated
                once confirmed.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Connect"
        title="For Media & Press Enquiries"
        description="Members of the press are welcome to reach out for statements, interviews or coverage-related information."
        buttons={[
          { label: "Contact Us", href: "/contact", variant: "primary" },
          { label: "About Kirti Rana", href: "/about", variant: "secondary" },
        ]}
      />
    </>
  );
}
