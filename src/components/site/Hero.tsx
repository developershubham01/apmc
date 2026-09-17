"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  ShieldCheck,
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
      className="relative overflow-hidden bg-[#042017] text-white min-h-[85vh] lg:min-h-[88vh] flex items-center pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-20"
      aria-label="Navi Mumbai Merchants Chamber — Official Organization Portal"
    >
      {/* Background Architectural Layer - 90% Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero/chamber-headquarters-hero.jpg"
          alt="Navi Mumbai Merchants Chamber & APMC Trade Center"
          fill
          priority
          className="object-cover object-center sm:object-[center_right] opacity-90 scale-100"
        />

        {/* Focused Directional Scrim: 90% image visibility across the canvas with crisp left backing for text contrast */}
        <div className="absolute inset-0 bg-[#042017]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#042017]/90 via-[#06281E]/75 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#042017] via-transparent to-[#042017]/50" />
      </div>

      {/* Atmospheric Radial Lighting for Depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <div className="absolute left-1/4 -top-28 -translate-x-1/2 h-[600px] w-[950px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.25)_0%,transparent_70%)]" />
        <div className="absolute left-1/4 bottom-0 -translate-x-1/2 h-[500px] w-[850px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)]" />
      </div>

      {/* Main Left-Aligned Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-left flex flex-col items-start">
        {/* Top Authority Pill Badge */}
        <ScrollReveal variant="up" delay={0}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#042017]/90 px-4 py-1.5 text-xs font-bold text-white shadow-md backdrop-blur-md mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]"></span>
            </span>
            <span className="tracking-tight text-white/90">
              {t("hero.badge", "Navi Mumbai APMC Market Complex • Estd. 30+ Years")}
            </span>
            <Sparkles className="h-3.5 w-3.5 text-[#10B981] ml-0.5" />
          </div>
        </ScrollReveal>

        {/* Main Headline: Navi Mumbai Merchants Chamber */}
        <ScrollReveal variant="up" delay={50}>
          <h1 className="font-heading font-extrabold tracking-tight text-white text-3xl sm:text-5xl lg:text-6xl leading-[1.12] max-w-3xl">
            <span className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {t("hero.titleLine1", "Navi Mumbai")}
            </span>
            <span className="block text-meta-gradient drop-shadow-[0_4px_24px_rgba(5,150,105,0.5)] mt-1 font-black">
              {t("hero.titleLine2", "Merchants Chamber")}
            </span>
          </h1>
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

        {/* Chamber 3 Core Pillars (Meta Pill Badges) */}
        <ScrollReveal variant="up" delay={240}>
          <div className="mt-5 flex flex-wrap items-center justify-start gap-2.5 sm:gap-3 max-w-4xl w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-sm shrink-0 whitespace-nowrap">
              <Users className="h-4 w-4 text-[#10B981] shrink-0" />
              <span>{t("hero.pillar1", "400+ Enterprise Network")}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-sm shrink-0 whitespace-nowrap">
              <Building2 className="h-4 w-4 text-[#10B981] shrink-0" />
              <span>{t("hero.pillar2", "250-Acre Trade Hub")}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-sm shrink-0 whitespace-nowrap">
              <ShieldCheck className="h-4 w-4 text-[#34D399] shrink-0" />
              <span>{t("hero.pillar3", "National Policy Advocacy")}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Meta Signature Dual-CTA Pattern */}
        <ScrollReveal variant="up" delay={280}>
          <div className="mt-8 flex flex-wrap items-center justify-start gap-3.5 max-w-4xl w-full">
            {/* Meta Primary CTA: Emerald Pill */}
            <Link
              href="/apmc"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#059669] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#047857] hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
            >
              <Store className="h-4 w-4 stroke-[2.5]" />
              {t("hero.exploreChamber", "Explore Trade Hub")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
            </Link>

            {/* Meta Tertiary CTA */}
            <Link
              href="/organizations"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white shadow-sm backdrop-blur-xl transition-all hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
            >
              <Building2 className="h-4 w-4 text-[#10B981]" />
              {t("nav.organizations", "Organizations")}
            </Link>
          </div>
        </ScrollReveal>

        {/* Quick Metrics Bar (Meta card-icon-feature tiles) */}
        <ScrollReveal variant="up" delay={320}>
          <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full border-t border-white/15 pt-6">
            <MetricCard value="30+ Yrs" label={t("hero.statLegacy", "30+ Years Legacy")} />
            <MetricCard value="400+" label={t("hero.statNetwork", "400+ Member Network")} />
            <MetricCard value="250 Acres" label={t("hero.statComplex", "250-Acre Complex")} />
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
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 sm:px-5 sm:py-4 text-left backdrop-blur-xl shadow-sm transition-all hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] min-w-0 flex flex-col justify-center">
      <p className="font-heading text-xl sm:text-2xl font-black text-white shrink-0 leading-none">{value}</p>
      <p className="mt-1.5 text-[0.68rem] font-extrabold uppercase tracking-wider text-slate-100 leading-tight">
        {label}
      </p>
    </div>
  );
}
