"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Store,
  Users,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-[#040817] text-white min-h-[85vh] lg:min-h-[88vh] flex items-center pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-20"
      aria-label="Navi Mumbai Merchants Chamber — Official Organization Portal"
    >
      {/* Background Architectural Layer - 80% Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero/chamber-headquarters-hero.jpg"
          alt="Navi Mumbai Merchants Chamber & APMC Trade Center"
          fill
          priority
          className="object-cover object-center sm:object-[center_right] opacity-80 scale-100"
        />

        {/* Focused Directional Scrim: 80% image visibility across the canvas with dark left backing for 100% text contrast */}
        <div className="absolute inset-0 bg-[#040817]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040817]/95 via-[#050e24]/85 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040817] via-transparent to-[#040817]/60" />
      </div>

      {/* Atmospheric Radial Lighting for Depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <div className="absolute left-1/4 -top-28 -translate-x-1/2 h-[600px] w-[950px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.12)_0%,transparent_70%)]" />
        <div className="absolute left-1/4 bottom-0 -translate-x-1/2 h-[500px] w-[850px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(22,78,154,0.25)_0%,transparent_70%)]" />
      </div>

      {/* Main Left-Aligned Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-left flex flex-col items-start">
        {/* Top Authority Pill Badge */}
        <ScrollReveal variant="up" delay={0}>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-[#07132a]/90 px-3.5 py-1.5 text-xs font-bold text-amber-300 shadow-md backdrop-blur-md mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">
              {t("hero.badge", "Navi Mumbai APMC Market Complex • Estd. 30+ Years")}
            </span>
            <Sparkles className="h-3.5 w-3.5 text-amber-400 ml-0.5" />
          </div>
        </ScrollReveal>

        {/* Main Headline: Navi Mumbai Merchants Chamber */}
        <ScrollReveal variant="up" delay={50}>
          <h1 className="font-heading font-extrabold tracking-tight text-white text-3xl sm:text-5xl lg:text-6xl leading-[1.12] max-w-3xl">
            <span className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {t("hero.titleLine1", "Navi Mumbai")}
            </span>
            <span className="block text-gold-gradient drop-shadow-[0_4px_24px_rgba(245,158,11,0.45)] mt-1 font-black">
              {t("hero.titleLine2", "Merchants Chamber")}
            </span>
          </h1>
        </ScrollReveal>

        {/* President Leadership Banner */}
        <ScrollReveal variant="up" delay={150}>
          <div className="mt-4 flex justify-start">
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 rounded-2xl border border-amber-400/50 bg-[#07132a]/95 p-2 pl-2.5 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all hover:bg-[#0c1f44] hover:border-amber-400 hover:scale-[1.02]"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-amber-400/80 bg-navy-950 shadow-md">
                <Image
                  src="/images/kirti-rana/portrait-lead.jpg"
                  alt="Shri Kirti Rana - President"
                  fill
                  className="object-cover object-top transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.68rem] font-extrabold uppercase tracking-widest text-amber-400">
                    President & Chairman
                  </span>
                  <span className="text-white/50">•</span>
                  <span className="text-[0.68rem] font-semibold text-slate-200">
                    30+ Yrs Service
                  </span>
                </div>
                <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1">
                  Shri Kirti Rana
                  <ChevronRight className="h-3.5 w-3.5 text-amber-400 opacity-90 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </div>
        </ScrollReveal>

        {/* Chamber Core Summary */}
        <ScrollReveal variant="up" delay={200}>
          <p className="mt-4 max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-slate-100 font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {t(
              "hero.description",
              "Serving as the premier commercial body of Navi Mumbai APMC, orchestrating domestic and global trade across a dedicated 50-acre wholesale complex at Turbhe. Championing merchant welfare, export facilitation, and modern market infrastructure for over three decades."
            )}
          </p>
        </ScrollReveal>

        {/* Chamber 3 Core Pillars */}
        <ScrollReveal variant="up" delay={240}>
          <div className="mt-5 flex flex-wrap items-center justify-start gap-2.5 sm:gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-xl border border-amber-400/40 bg-[#07132a]/95 px-3.5 py-2 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <Users className="h-4 w-4 text-amber-400 shrink-0" />
              <span>{t("hero.pillar1", "400+ Enterprise Network")}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-amber-400/40 bg-[#07132a]/95 px-3.5 py-2 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <Building2 className="h-4 w-4 text-amber-300 shrink-0" />
              <span>{t("hero.pillar2", "50-Acre Trade Complex")}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-[#07132a]/95 px-3.5 py-2 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{t("hero.pillar3", "National Policy Advocacy")}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Action CTAs */}
        <ScrollReveal variant="up" delay={280}>
          <div className="mt-7 flex flex-wrap items-center justify-start gap-3">
            <Link
              href="/apmc"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-7 py-3.5 text-sm font-black text-slate-950 shadow-[0_6px_25px_rgba(245,158,11,0.45)] transition-all hover:brightness-110 hover:-translate-y-0.5"
            >
              <Store className="h-4 w-4 stroke-[2.5]" />
              {t("hero.exploreChamber", "Explore Trade Hub")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
            </Link>
            <Link
              href="/apmc#market-rates"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/60 bg-[#07132a]/95 px-6 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all hover:bg-[#0c1f44] hover:border-amber-400 hover:-translate-y-0.5"
            >
              <TrendingUp className="h-4 w-4 text-amber-400" />
              {t("hero.viewRates", "Daily Wholesale Rates")}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-amber-400" />
            </Link>
            <Link
              href="/organizations"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-[#07132a]/90 px-6 py-3.5 text-sm font-bold text-slate-100 shadow-[0_6px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all hover:bg-[#0c1f44] hover:text-white hover:border-white/50 hover:-translate-y-0.5"
            >
              <Building2 className="h-4 w-4 text-amber-300" />
              {t("nav.organizations", "Organizations")}
            </Link>
          </div>
        </ScrollReveal>

        {/* Quick Metrics Bar */}
        <ScrollReveal variant="up" delay={320}>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl w-full border-t border-white/20 pt-6">
            <MetricCard value="30+ Yrs" label={t("hero.statLegacy", "30+ Years Legacy")} />
            <MetricCard value="400+" label={t("hero.statNetwork", "400+ Member Network")} />
            <MetricCard value="50 Acres" label={t("hero.statComplex", "50-Acre Complex")} />
            <MetricCard value="5 Hubs" label={t("hero.statMarkets", "5 APMC Markets")} />
          </div>
        </ScrollReveal>
      </div>

      {/* Elegant Wave Divider */}
      <div aria-hidden className="absolute bottom-0 inset-x-0">
        <svg
          className="block w-full h-[32px] sm:h-[48px] text-white"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,32 C360,10 720,45 1080,20 C1260,8 1380,25 1440,32 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-amber-400/35 bg-[#060e22]/95 p-3.5 text-left backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.7)] transition-all hover:bg-[#0a1838] hover:border-amber-400/70 hover:scale-[1.02]">
      <span className="block font-heading text-2xl sm:text-3xl font-black text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]">
        {value}
      </span>
      <span className="mt-1 block text-[0.72rem] font-bold uppercase tracking-wider text-slate-200">
        {label}
      </span>
    </div>
  );
}
