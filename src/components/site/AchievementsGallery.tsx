"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { cn } from "@/lib/utils";

export type MasonryImage = {
  src: string;
  alt: string;
  caption: string;
  category: string;
};

type AchievementsGalleryProps = {
  images: MasonryImage[];
  className?: string;
  showFilters?: boolean;
};

export function AchievementsGallery({
  images,
  className,
  showFilters = false,
}: AchievementsGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [active, setActive] = useState<string>("ALL");

  const categories = useMemo(() => {
    const set = new Set(images.map((i) => i.category));
    return ["ALL", ...Array.from(set)];
  }, [images]);

  const filtered = useMemo(
    () => (active === "ALL" ? images : images.filter((i) => i.category === active)),
    [active, images]
  );

  const lightboxItems: LightboxItem[] = useMemo(
    () => filtered.map((i) => ({ src: i.src, alt: i.alt, caption: i.caption })),
    [filtered]
  );

  return (
    <div className={className}>
      {showFilters && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-600 uppercase tracking-[0.12em] transition-all",
                active === c
                  ? "bg-navy text-white shadow-premium"
                  : "bg-mist text-ink-600 ring-1 ring-border hover:bg-royal-50 hover:text-royal"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {filtered.map((img, idx) => (
          <button
            key={`${img.src}-${idx}`}
            type="button"
            onClick={() => setIndex(idx)}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl bg-mist shadow-premium ring-1 ring-border transition-all duration-300 hover:shadow-premium-lg focus-visible:ring-2 focus-visible:ring-gold break-inside-avoid"
            aria-label={`Open image: ${img.alt}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-106"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95"
              />
              <span
                className={cn(
                  "absolute left-3 top-3 rounded-full bg-gold/95 px-2.5 py-1 text-[0.62rem] font-700 uppercase tracking-[0.14em] text-navy"
                )}
              >
                {img.category}
              </span>
              <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white opacity-0 ring-1 ring-white/25 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <p className="text-sm font-600 text-white">{img.caption}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        items={lightboxItems}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </div>
  );
}
