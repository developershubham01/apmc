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
      className="inline-flex items-center gap-0.5 rounded-full bg-white p-0.5 border border-[#D1E7DD] shadow-sm"
      role="group"
      aria-label="Text Size Adjustment"
    >
      <button
        type="button"
        onClick={() => handleSetSize("sm")}
        title="Decrease Font Size (A-)"
        aria-label="Decrease Font Size"
        className={`h-5 px-2 rounded-full text-[0.68rem] font-bold transition-all ${
          fontSize === "sm"
            ? "bg-[#059669] text-white shadow-sm"
            : "text-[#042017] hover:text-[#059669] hover:bg-[#ECFDF5]"
        }`}
      >
        A-
      </button>
      <button
        type="button"
        onClick={() => handleSetSize("base")}
        title="Reset Font Size (A)"
        aria-label="Default Font Size"
        className={`h-5 px-2 rounded-full text-[0.68rem] font-bold transition-all ${
          fontSize === "base"
            ? "bg-[#059669] text-white shadow-sm"
            : "text-[#042017] hover:text-[#059669] hover:bg-[#ECFDF5]"
        }`}
      >
        A
      </button>
      <button
        type="button"
        onClick={() => handleSetSize("lg")}
        title="Increase Font Size (A+)"
        aria-label="Increase Font Size"
        className={`h-5 px-2 rounded-full text-[0.68rem] font-bold transition-all ${
          fontSize === "lg"
            ? "bg-[#059669] text-white shadow-sm"
            : "text-[#042017] hover:text-[#059669] hover:bg-[#ECFDF5]"
        }`}
      >
        A+
      </button>
    </div>
  );
}
