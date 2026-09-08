"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { cn } from "@/lib/utils";

type LightboxImageProps = {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  overlay?: boolean;
  priority?: boolean;
};

/**
 * A single image that opens in a lightbox on click.
 */
export function LightboxImage({
  src,
  alt,
  caption,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className,
  imgClassName,
  overlay = false,
  priority = false,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const items: LightboxItem[] = [{ src, alt, caption }];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block w-full overflow-hidden rounded-2xl ring-1 ring-border focus-visible:ring-2 focus-visible:ring-gold",
          className
        )}
        aria-label={`Open image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill={imgClassName?.includes("object") ?? false}
          width={!imgClassName?.includes("object") ? 1200 : undefined}
          height={!imgClassName?.includes("object") ? 800 : undefined}
          sizes={sizes}
          priority={priority}
          className={cn(
            "transition-transform duration-700 group-hover:scale-106",
            imgClassName
          )}
        />
        {overlay && (
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95"
          />
        )}
        <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white opacity-0 ring-1 ring-white/25 backdrop-blur transition-all duration-300 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
        {caption && overlay && (
          <div className="absolute inset-x-0 bottom-0 p-4 text-left">
            <p className="text-sm font-600 text-white">{caption}</p>
          </div>
        )}
      </button>
      <Lightbox
        items={items}
        index={open ? 0 : null}
        onClose={() => setOpen(false)}
        onNavigate={() => {}}
      />
    </>
  );
}
