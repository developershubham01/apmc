"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import {
  galleryItems as defaultGalleryItems,
  galleryFilters,
  type GalleryItem,
  type GalleryCategory,
} from "@/data/gallery";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { cn } from "@/lib/utils";

type GalleryGridProps = {
  items?: GalleryItem[];
  filters?: ("ALL" | GalleryCategory)[];
  className?: string;
};

export function GalleryGrid({
  items = defaultGalleryItems,
  filters = galleryFilters,
  className,
}: GalleryGridProps) {
  const [active, setActive] = useState<"ALL" | GalleryCategory>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [liveItems, setLiveItems] = useState<GalleryItem[]>(items);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.items && Array.isArray(data.items) && data.items.length > 0) {
          setLiveItems(data.items);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live gallery items, using defaults:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(
    () => (active === "ALL" ? liveItems : liveItems.filter((i) => i.category === active)),
    [active, liveItems]
  );

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      filtered.map((i) => ({
        src: i.src,
        alt: i.alt,
        caption: i.caption,
      })),
    [filtered]
  );

  return (
    <div className={className}>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-600 uppercase tracking-[0.12em] transition-all",
              active === f
                ? "bg-navy text-white shadow-premium"
                : "bg-mist text-ink-600 ring-1 ring-border hover:bg-royal-50 hover:text-royal"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px]">
        {filtered.map((item, idx) => (
          <button
            key={`${item.src}-${idx}`}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            className={cn(
              "group relative overflow-hidden rounded-xl bg-mist shadow-premium ring-1 ring-border transition-all duration-300 hover:shadow-premium-lg focus-visible:ring-2 focus-visible:ring-gold",
              item.span === "wide" && "sm:col-span-2",
              item.span === "tall" && "sm:row-span-2"
            )}
            aria-label={`Open image: ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-106"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95"
            />
            {/* Zoom icon */}
            <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white opacity-0 ring-1 ring-white/25 backdrop-blur transition-all duration-300 group-hover:opacity-100">
              <Maximize2 className="h-4 w-4" />
            </span>
            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 p-3 text-left">
              <p className="text-[0.62rem] uppercase tracking-[0.14em] text-gold/90">
                {item.category}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs font-500 text-white">
                {item.caption ?? item.alt}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
