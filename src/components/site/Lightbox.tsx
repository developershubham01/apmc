"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
  description?: string;
  category?: string;
};

type LightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, goNext, goPrev, onClose]);

  if (!open || index === null) return null;
  const current = items[index];
  if (!current) return null;

  // Resolve title and description with fallback hierarchy
  const displayTitle = current.title || current.caption || current.alt;
  const displayDescription =
    current.description ||
    (current.title && current.caption !== current.title ? current.caption : undefined) ||
    "Official photographic record of Navi Mumbai Merchants Chamber and APMC wholesale commercial operations.";

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-between bg-[#042017]/95 p-3 sm:p-5 backdrop-blur-xl select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      {/* Top Header Bar inside Modal */}
      <header
        className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 rounded-2xl bg-[#042017]/90 border border-[#059669]/50 px-4 py-3 shadow-2xl backdrop-blur-md shrink-0 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Official Crest & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-9 w-9 shrink-0 rounded-full border-2 border-[#059669] overflow-hidden bg-white shadow-sm">
            <Image
              src="/images/nmmc-logo.png"
              alt="Chamber Crest"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-white text-xs sm:text-sm tracking-tight truncate">
                Navi Mumbai Merchants Chamber
              </span>
              {current.category && (
                <span className="hidden sm:inline-flex rounded-full bg-[#059669] px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white">
                  {current.category}
                </span>
              )}
            </div>
            <p className="text-[0.7rem] sm:text-xs font-semibold text-[#10B981] truncate mt-0.5">
              {displayTitle}
            </p>
          </div>
        </div>

        {/* Right: Counter & Close Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white border border-white/20">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#BF2B26] hover:bg-[#9C1E1A] text-white border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            aria-label="Close viewer"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>
      </header>

      {/* Main Image Display Area */}
      <div
        className="relative flex-1 my-2 flex items-center justify-center w-full max-w-6xl mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-4 z-20 inline-flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#042017]/80 text-white border-2 border-[#059669] transition-all duration-200 hover:bg-[#059669] hover:scale-110 active:scale-95 backdrop-blur-md shadow-2xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
          </button>
        )}

        {/* Centered Image with Border & Glow */}
        <div className="relative flex flex-col items-center justify-center max-h-[64vh] sm:max-h-[70vh] max-w-5xl w-full p-2">
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="max-h-[62vh] sm:max-h-[68vh] max-w-full w-auto h-auto object-contain rounded-2xl border-2 border-[#059669] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-transform duration-300 animate-[fade-in_0.3s_ease]"
          />
        </div>

        {/* Next Button */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-4 z-20 inline-flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#042017]/80 text-white border-2 border-[#059669] transition-all duration-200 hover:bg-[#059669] hover:scale-110 active:scale-95 backdrop-blur-md shadow-2xl"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Bottom Description Footer Box */}
      <footer
        className="w-full max-w-5xl mx-auto shrink-0 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl bg-[#042017]/90 border border-[#059669]/50 p-4 sm:p-5 text-center shadow-2xl backdrop-blur-md">
          {/* Title on Mobile */}
          <h4 className="font-heading text-sm sm:text-base font-extrabold text-white sm:hidden mb-1">
            {displayTitle}
          </h4>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-200 max-w-4xl mx-auto leading-relaxed font-medium">
            {displayDescription}
          </p>

          {/* Keyboard hint */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[0.68rem] text-slate-400 font-semibold">
            <ZoomIn className="h-3 w-3 text-[#10B981]" />
            <span>Use ← → arrow keys to navigate • Press ESC to close</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function LightboxTrigger({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold text-[#059669] transition hover:text-[#047857]",
        className
      )}
    >
      {children}
    </button>
  );
}
