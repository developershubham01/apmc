"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "header" | "mobile" | "compact" | "institutional";
}

export function LanguageSwitcher({
  className,
  variant = "header",
}: LanguageSwitcherProps) {
  const { language, setLanguage, languages, currentLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div
        className={cn(
          "flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3",
          className
        )}
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Globe className="h-3.5 w-3.5 text-amber-400" />
          <span>Select Language / भाषा</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all",
                  isSelected
                    ? "border border-amber-500/70 bg-amber-500/20 text-amber-400 shadow-sm"
                    : "border border-white/10 bg-navy-900/60 text-white/80 hover:border-white/20 hover:text-white"
                )}
              >
                <div className="flex flex-col text-left leading-none">
                  <span className="font-extrabold">{lang.native}</span>
                  <span className="text-[0.62rem] text-slate-400 font-normal mt-0.5">
                    {lang.label}
                  </span>
                </div>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Institutional look matching the University / Government portal style in the image
  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Select Language"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-2.5 py-0.5 text-[0.72rem] font-semibold text-white shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-amber-400/70 hover:bg-white/15 focus:outline-none focus:ring-1 focus:ring-amber-400/50",
          open && "border-amber-400 bg-amber-500/20 text-amber-300"
        )}
      >
        <span className="text-white/90">
          {currentLanguage.code === "en"
            ? "Select Language"
            : `${currentLanguage.native} (${currentLanguage.short})`}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-amber-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-full z-[120] mt-1.5 w-48 rounded-xl border border-amber-500/30 bg-[#090e1d]/98 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95">
          <div className="px-3 py-1.5 border-b border-white/10 mb-1">
            <p className="text-[0.62rem] font-bold uppercase tracking-wider text-amber-400/90">
              Select Language
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors text-left",
                    isSelected
                      ? "bg-amber-500/20 text-amber-300 font-bold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-4.5 w-5.5 items-center justify-center rounded bg-white/10 text-[0.62rem] font-black text-amber-400">
                      {lang.short}
                    </span>
                    <div className="flex flex-col leading-none">
                      <span className="text-xs">{lang.native}</span>
                      <span className="text-[0.6rem] text-slate-400 font-normal mt-0.5">
                        {lang.label}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
