"use client";

import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, Settings2, Check, X, Info, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const STORAGE_KEY = "apmc_cookie_consent_v1";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  timestamp: string;
}

export function CookieConsent() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Preference state
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [preferencesEnabled, setPreferencesEnabled] = useState(true);

  useEffect(() => {
    setMounted(true);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Show after a gentle 800ms delay to avoid layout shift on load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const parsed: CookiePreferences = JSON.parse(saved);
        setAnalyticsEnabled(parsed.analytics ?? true);
        setPreferencesEnabled(parsed.preferences ?? true);
      }
    } catch {
      // Fallback
      setIsVisible(true);
    }
  }, []);

  // Listen for global re-open requests (e.g. from footer links)
  useEffect(() => {
    const handleOpen = () => {
      setIsModalOpen(true);
    };

    window.addEventListener("open-cookie-preferences", handleOpen);
    return () => window.removeEventListener("open-cookie-preferences", handleOpen);
  }, []);

  const saveConsent = (analytics: boolean, preferences: boolean) => {
    const consentData: CookiePreferences = {
      necessary: true,
      analytics,
      preferences,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
      // Set a 1-year persistent cookie
      document.cookie = `apmc_cookie_consent=accepted; max-age=31536000; path=/; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }

    setAnalyticsEnabled(analytics);
    setPreferencesEnabled(preferences);
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleEssentialOnly = () => {
    saveConsent(false, false);
  };

  const handleSavePreferences = () => {
    saveConsent(analyticsEnabled, preferencesEnabled);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Compact Right-Aligned Floating Cookie Banner */}
      {isVisible && (
        <aside
          aria-label="Cookie Consent Banner"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-[350px] animate-in fade-in-0 slide-in-from-bottom-5 duration-300"
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/50 bg-[#060e22]/95 p-4 shadow-[0_16px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            {/* Ambient gold glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/15 blur-xl"
            />

            {/* Header: Icon + Title + Close button */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-500/60 bg-amber-500/15 text-amber-400">
                  <Cookie className="h-4 w-4" />
                </div>
                <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                  {t("cookies.title", "Cookie Preferences")}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleEssentialOnly}
                aria-label="Close and use essential cookies"
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Short Body Text */}
            <p className="mt-2.5 text-[0.78rem] leading-relaxed text-slate-200">
              {t(
                "cookies.shortDesc",
                "We use cookies to enhance navigation, secure session data, and deliver live APMC rates."
              )}
            </p>

            {/* Action Buttons */}
            <div className="mt-3.5 flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
              >
                <Settings2 className="h-3 w-3" />
                <span>{t("cookies.customize", "Customize")}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-[0.72rem] font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-all"
                >
                  {t("cookies.essentialOnly", "Essential")}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-3.5 py-1.5 text-[0.72rem] font-bold text-slate-950 shadow-md hover:brightness-110 transition-all"
                >
                  <Check className="h-3 w-3 stroke-[3]" />
                  <span>{t("cookies.acceptAll", "Accept All")}</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Detailed Cookie Preferences Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-2 border-amber-500/50 bg-[#07132a] text-white sm:max-w-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/60 bg-amber-500/15 text-amber-400">
                <Cookie className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="font-heading text-lg font-bold text-white">
                  {t("cookies.title", "Cookie & Privacy Preferences")}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-300 mt-0.5">
                  Manage how cookies and localized session tokens are utilized during your visit.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {/* 1. Necessary Cookies */}
            <div className="rounded-xl border border-amber-500/30 bg-white/5 p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">
                    {t("cookies.necessary", "Strictly Necessary")}
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald-300">
                  {t("cookies.alwaysActive", "Always Active")}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                {t(
                  "cookies.necessaryDesc",
                  "Essential for core navigation, language selection, security, and portal session integrity."
                )}
              </p>
            </div>

            {/* 2. Analytics & Performance */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-amber-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">
                    {t("cookies.analytics", "Analytics & Performance")}
                  </span>
                </div>
                <Switch
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                  className="data-[state=checked]:bg-amber-500"
                  aria-label="Toggle Analytics Cookies"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                {t(
                  "cookies.analyticsDesc",
                  "Helps us optimize APMC market rate loading times and analyze portal engagement anonymously."
                )}
              </p>
            </div>

            {/* 3. Personalization & Preferences */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-amber-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-royal-300" />
                  <span className="text-sm font-bold text-white">
                    {t("cookies.preferences", "Personalization & Cache")}
                  </span>
                </div>
                <Switch
                  checked={preferencesEnabled}
                  onCheckedChange={setPreferencesEnabled}
                  className="data-[state=checked]:bg-amber-500"
                  aria-label="Toggle Personalization Cookies"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                {t(
                  "cookies.preferencesDesc",
                  "Remembers modal dismiss states, announcement alerts, and custom view filters."
                )}
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            >
              {t("cookies.essentialOnly", "Essential Only")}
            </button>
            <button
              type="button"
              onClick={handleSavePreferences}
              className="rounded-xl border border-amber-500/60 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-300 transition-all hover:bg-amber-500/20"
            >
              {t("cookies.save", "Save Choices")}
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-md transition-all hover:brightness-110"
            >
              {t("cookies.acceptAll", "Accept All")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
