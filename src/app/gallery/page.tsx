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
        backgroundImage="/images/events/trade-meeting.jpg"
        imageOpacity={90}
      />

      <section className="bg-white py-16 lg:py-24 border-b border-[#D1E7DD]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="up" className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow inline-flex items-center gap-2 text-[#059669] font-bold">
                  <Images className="h-4 w-4" />
                  Visual Archive
                </span>
                <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#042017]">
                  Browse by Category
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[#ECFDF5] px-4 py-2 text-sm font-bold text-[#047857] border border-[#D1E7DD]">
                <Images className="h-4 w-4 text-[#059669]" />
                {galleryItems.length} items
              </div>
            </div>
          </ScrollReveal>

          <GalleryGrid items={galleryItems} filters={galleryFilters} />

          <ScrollReveal variant="up" className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-5 shadow-sm">
              <Info className="h-5 w-5 shrink-0 text-[#059669]" />
              <p className="text-sm text-[#4B5563]">
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
