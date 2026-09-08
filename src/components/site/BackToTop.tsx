"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 480);
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 20; // r = 20

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-premium-lg ring-1 ring-gold/50 transition-all duration-300 hover:-translate-y-1 hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:bottom-6 sm:right-6",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      {/* Progress ring */}
      <svg
        aria-hidden
        viewBox="0 0 44 44"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          strokeWidth="2.5"
          className="stroke-white/15"
        />
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-gold transition-[stroke-dashoffset] duration-150"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
