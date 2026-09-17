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
  title?: string;
  description?: string;
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
    () =>
      filtered.map((i) => ({
        src: i.src,
        alt: i.alt,
        caption: i.caption,
        title: i.title || i.caption || i.alt,
        description: i.description || (i.title && i.caption !== i.title ? i.caption : undefined) || i.alt,
        category: i.category,
      })),
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
                "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                active === c
                  ? "bg-[#042017] text-white shadow-sm"
                  : "bg-[#F0FDF4] text-[#042017] border border-[#D1E7DD] hover:bg-white hover:border-[#059669]"
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
            className="group relative mb-4 block w-full overflow-hidden rounded-[28px] bg-white border border-[#D1E7DD] transition-all duration-300 hover:border-[#059669] hover:shadow-[0_16px_40px_-10px_rgba(4,32,23,0.12)] focus-visible:ring-2 focus-visible:ring-[#059669] break-inside-avoid"
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
                className="absolute inset-0 bg-gradient-to-t from-[#042017]/90 via-[#042017]/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95"
              />
              <span
                className={cn(
                  "absolute left-4 top-4 rounded-full bg-[#042017]/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md"
                )}
              >
                {img.category}
              </span>
              <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 ring-1 ring-white/30 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <p className="text-sm font-bold text-white tracking-tight">{img.caption}</p>
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
