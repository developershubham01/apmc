"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import {
  mediaCategories,
  entriesFor,
  type MediaCategorySlug,
  type MediaEntry,
} from "@/data/media";
import { MediaCategoryBar } from "./MediaCategoryBar";
import { MediaEntryCard } from "./MediaEntryCard";
import { SectionHeading } from "./SectionHeading";
import { CTASection } from "./CTASection";

type Props = {
  slug: MediaCategorySlug;
};

/**
 * Shared body for /media/events, /media/social-activities and /media/news.
 * Page-level files supply the PageHeader + metadata for each route.
 */
export function MediaCategoryPageBody({ slug }: Props) {
  const category = mediaCategories.find((c) => c.slug === slug);
  const defaultEntries = entriesFor(slug);
  const [entries, setEntries] = useState<MediaEntry[]>(defaultEntries);

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/media?category=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.items && Array.isArray(data.items) && data.items.length > 0) {
          setEntries(data.items);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live media, using defaults:", err);
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!category) return null;

  const others = mediaCategories.filter((c) => c.slug !== slug);

  return (
    <>
      <MediaCategoryBar current={slug} />

      {/* Intro + entries */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={category.eyebrow}
            title={category.label}
            description={category.description}
          />

          <div className="mt-12 space-y-8">
            {entries.map((entry, i) => (
              <MediaEntryCard
                key={entry.id}
                entry={entry}
                index={i}
                flip={i % 2 === 1}
              />
            ))}
          </div>

          {/* Honesty note, consistent with the /media page tone */}
          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-50/50 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm text-ink-600">
              Programme details are indicative and are being compiled for the
              archive. Verified dates, venues and photographs will be added as
              they become available.
            </p>
          </div>

          {/* Cross-links to the sibling sections */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/media/${other.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-mist/60 p-5 transition-all hover:border-amber-500/50 hover:bg-amber-50/30 hover:shadow-premium"
              >
                <div>
                  <p className="text-[0.66rem] font-700 uppercase tracking-[0.16em] text-amber-600">
                    {other.eyebrow}
                  </p>
                  <p className="mt-1 font-heading text-lg font-700 text-navy transition-colors group-hover:text-royal">
                    {other.label}
                  </p>
                  <p className="mt-1 text-xs text-ink-600">{other.tagline}</p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-amber-400 ring-1 ring-amber-500/30 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Connect"
        title="For Media & Press Enquiries"
        description="Members of the press are welcome to reach out for statements, interviews or coverage-related information."
        buttons={[
          { label: "Contact Us", href: "/contact", variant: "primary" },
          { label: "All Media", href: "/media", variant: "secondary" },
        ]}
      />
    </>
  );
}
