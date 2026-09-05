import type { Metadata } from "next";
import { Images, Info } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { galleryItems, galleryFilters } from "@/data/gallery";
import { CTASection } from "@/components/site/CTASection";

export const metadata: Metadata = {
  title: "Gallery | Kirti Rana",
  description:
    "A curated gallery of business, organizations, APMC market, events, board and media coverage featuring Kirti Rana.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Gallery"
        description="A visual journey across Kirti Rana's business, organizations, the APMC market, events, board and media — with a filterable grid and full lightbox viewer."
        crumbs={[{ label: "Gallery" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="up" className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow text-royal">Visual Archive</span>
                <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-700 text-navy">
                  Browse by Category
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm text-ink-600 ring-1 ring-border">
                <Images className="h-4 w-4 text-gold" />
                {galleryItems.length} items
              </div>
            </div>
          </ScrollReveal>

          <GalleryGrid items={galleryItems} filters={galleryFilters} />

          <ScrollReveal variant="up" className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold-50/50 p-5">
              <Info className="h-5 w-5 shrink-0 text-gold-600" />
              <p className="text-sm text-ink-600">
                Use the filter tabs to browse by category. Click any image to
                open the lightbox — navigate with the arrow keys or on-screen
                buttons, and press ESC to close.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Continue"
        title="More to Explore"
        description="View the achievements archive or read the media coverage of Kirti Rana."
        buttons={[
          { label: "Achievements", href: "/achievements", variant: "primary" },
          { label: "Media Coverage", href: "/media", variant: "secondary" },
        ]}
      />
    </>
  );
}
