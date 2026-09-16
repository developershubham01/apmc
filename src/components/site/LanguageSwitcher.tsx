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
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981]">
          <Globe className="h-3.5 w-3.5 text-[#10B981]" />
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
                    ? "border border-[#059669] bg-[#059669]/20 text-[#10B981] shadow-sm"
                    : "border border-white/10 bg-[#042017]/60 text-white/80 hover:border-white/20 hover:text-white"
                )}
              >
                <div className="flex flex-col text-left leading-none">
                  <span className="font-extrabold">{lang.native}</span>
                  <span className="text-[0.62rem] text-slate-400 font-normal mt-0.5">
                    {lang.label}
                  </span>
                </div>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-[#10B981] shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Institutional look for light-themed top bar
  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      {/* Trigger Button — Dark text on light background */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Select Language"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-[#D1E7DD] bg-white px-3 py-1 text-[0.72rem] font-bold text-[#042017] shadow-sm transition-all duration-150 hover:border-[#059669] hover:bg-[#ECFDF5] focus:outline-none focus:ring-1 focus:ring-[#059669]/50",
          open && "border-[#059669] bg-[#ECFDF5] text-[#059669]"
        )}
      >
        <Globe className="h-3 w-3 text-[#059669]" />
        <span>
          {currentLanguage.code === "en"
            ? "Select Language"
            : `${currentLanguage.native} (${currentLanguage.short})`}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-[#059669] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-full z-[120] mt-1.5 w-48 rounded-2xl border border-[#D1E7DD] bg-white p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95">
          <div className="px-3 py-1.5 border-b border-[#D1E7DD] mb-1">
            <p className="text-[0.62rem] font-bold uppercase tracking-wider text-[#059669]">
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
                    "flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-colors text-left",
                    isSelected
                      ? "bg-[#ECFDF5] text-[#059669] font-bold border border-[#059669]/20"
                      : "text-[#042017] hover:bg-[#F0FDF4] hover:text-[#059669]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-4.5 w-5.5 items-center justify-center rounded bg-[#ECFDF5] text-[0.62rem] font-black text-[#059669] border border-[#D1E7DD]">
                      {lang.short}
                    </span>
                    <div className="flex flex-col leading-none">
                      <span className="text-xs">{lang.native}</span>
                      <span className="text-[0.6rem] text-[#4B5563] font-normal mt-0.5">
                        {lang.label}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-[#059669]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
