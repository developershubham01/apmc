"use client";

import { useEffect, useState } from "react";

type FontSize = "sm" | "base" | "lg";

export function AccessibilityControls() {
  const [fontSize, setFontSize] = useState<FontSize>("base");

  useEffect(() => {
    const saved = localStorage.getItem("nmmc_font_size") as FontSize | null;
    if (saved && (saved === "sm" || saved === "base" || saved === "lg")) {
      setFontSize(saved);
      applyFontSize(saved);
    }
  }, []);

  const applyFontSize = (size: FontSize) => {
    const root = document.documentElement;
    if (size === "sm") {
      root.style.fontSize = "92%";
    } else if (size === "lg") {
      root.style.fontSize = "108%";
    } else {
      root.style.fontSize = "100%";
    }
  };

  const handleSetSize = (size: FontSize) => {
    setFontSize(size);
    applyFontSize(size);
    try {
      localStorage.setItem("nmmc_font_size", size);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-md bg-white/10 p-0.5 border border-white/15 backdrop-blur-sm"
      role="group"
      aria-label="Text Size Adjustment"
    >
      <button
        type="button"
        onClick={() => handleSetSize("sm")}
        title="Decrease Font Size (A-)"
        aria-label="Decrease Font Size"
        className={`h-5 px-1.5 rounded text-[0.68rem] font-bold transition-all ${
          fontSize === "sm"
            ? "bg-amber-400 text-slate-950 shadow-sm"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
      >
        A-
      </button>
      <button
        type="button"
        onClick={() => handleSetSize("base")}
        title="Reset Font Size (A)"
        aria-label="Default Font Size"
        className={`h-5 px-1.5 rounded text-[0.68rem] font-bold transition-all ${
          fontSize === "base"
            ? "bg-amber-400 text-slate-950 shadow-sm"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
      >
        A
      </button>
      <button
        type="button"
        onClick={() => handleSetSize("lg")}
        title="Increase Font Size (A+)"
        aria-label="Increase Font Size"
        className={`h-5 px-1.5 rounded text-[0.68rem] font-bold transition-all ${
          fontSize === "lg"
            ? "bg-amber-400 text-slate-950 shadow-sm"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
      >
        A+
      </button>
    </div>
  );
}
