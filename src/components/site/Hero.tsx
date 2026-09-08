"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Wheat,
  Sparkles,
  Award,
  Trophy,
  ShieldCheck,
  Globe2,
  Tv,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    id: "dubai",
    src: "/images/kirti-rana/global-business-icon-award-dubai.jpg",
    label: "Global Icon Award (Dubai)",
    tag: "Dubai 2025",
    badge: "🏆 Global Business ICON Awardee",
    caption: "Shri Kirti Rana receiving the Global Business ICON Award in Dubai",
  },
  {
    id: "fadnavis",
    src: "/images/media/dcm-devendra-fadnavis-kirti-rana-felicitation.jpg",
    label: "With DCM Devendra Fadnavis",
    tag: "TV1 Live",
    badge: "🤝 Felicitating DCM Devendra Fadnavis",
    caption: "Felicitating DCM Devendra Fadnavis at Navi Mumbai Leaders Conference",
  },
  {
    id: "portrait",
    src: "/images/kirti-rana/portrait-lead.jpg",
    label: "Leadership Portrait",
    tag: "President",
    badge: "🏛️ Navi Mumbai Merchants Chamber",
    caption: "President — Navi Mumbai Merchants Chamber (30+ Years Legacy)",
  },
  {
    id: "mahotsav",
    src: "/images/events/bharatiya-vyapar-mahotsav-2026.jpg",
    label: "Vyapar Mahotsav 2026",
    tag: "New Delhi",
    badge: "🇮🇳 Bharat Mandapam, New Delhi",
    caption: "Bharatiya Vyapar Mahotsav 2026 — CAIT & ITPO Initiative",
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const current = heroSlides[activeSlide];

  return (
    <section
      className="relative overflow-hidden bg-navy-950 text-white min-h-[90vh] flex items-center pt-24 pb-16 lg:py-28"
      aria-label="Kirti Rana — introduction"
    >
      {/* Background Architectural Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-chamber-bg.jpg"
          alt="Navi Mumbai Merchants Chamber Architectural Background"
          fill
          priority
          quality={90}
          className="object-cover object-center opacity-25 scale-105 filter blur-[1px]"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70" />
        <div aria-hidden className="absolute inset-0 bg-heritage-grid opacity-20" />
      </div>

      {/* Ambient Lighting Orbs */}
      <div
        aria-hidden
        className="absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-gold/15 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-1/4 h-[520px] w-[520px] rounded-full bg-royal/25 blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-12">
          {/* LEFT: Content & Badging */}
          <div className="lg:col-span-7">
            {/* Top Official Association Pill */}
            <ScrollReveal variant="up">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-navy-900/90 px-4 py-1.5 shadow-gold-glow backdrop-blur-md">
                <div className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden bg-white p-0.5 ring-1 ring-gold shadow-sm">
                  <Image src="/images/logo.png" alt="Navi Mumbai Merchants Chamber Logo" fill className="object-contain" />
                </div>
                <span className="text-xs font-700 tracking-wide text-gold uppercase">
                  Navi Mumbai Merchants&apos; Chamber
                </span>
                <span className="hidden sm:inline-block h-3 w-px bg-gold/40" />
                <span className="hidden sm:inline-flex items-center gap-1 text-[0.7rem] font-600 text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Estd. 30+ Years
                </span>
              </div>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal variant="up" delay={80}>
              <h1 className="mt-5 font-heading font-800 tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
                KIRTI RANA
              </h1>
            </ScrollReveal>

            {/* Designations with Icons */}
            <ScrollReveal variant="up" delay={160}>
              <div className="mt-5 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-600 text-amber-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold/20 text-gold border border-gold/40">
                    <Building2 className="h-3.5 w-3.5" />
                  </span>
                  <span>President / Chairman — Navi Mumbai Merchants Chamber</span>
                </div>
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-600 text-white/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-white/80 border border-white/20">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                  </span>
                  <span>National Leadership — Confederation of All India Traders (CAIT)</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm sm:text-base font-500 text-white/75">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-white/60 border border-white/15">
                    <Wheat className="h-3.5 w-3.5 text-amber-400" />
                  </span>
                  <span>Chairman — Bombay Mudibazar Kariana Merchants Association</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Bio Description */}
            <ScrollReveal variant="up" delay={240}>
              <p className="mt-6 max-w-2xl text-pretty text-base sm:text-lg leading-relaxed text-white/80">
                Pioneering leader of Maharashtra and India&apos;s wholesale agricultural and spice trade.
                Leading <strong>400+ spice processors, exporters and cold chain owners</strong> across a dedicated{" "}
                <strong>50-acre commercial complex</strong> at Navi Mumbai APMC, Turbhe.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="up" delay={320}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-700 text-navy shadow-gold-glow transition-all hover:bg-gold-400 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Explore Profile
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/achievements"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gold/50 bg-white/10 px-5 py-3.5 text-sm font-600 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-gold hover:-translate-y-0.5"
                >
                  <Trophy className="h-4 w-4 text-gold" />
                  11 Verified Honours
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/organizations"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/30 px-5 py-3.5 text-sm font-600 text-white/85 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                >
                  Organizations
                </Link>
              </div>
            </ScrollReveal>

            {/* Quick Metrics Bar */}
            <ScrollReveal variant="up" delay={400}>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15 pt-6">
                <MetricCard value="30+ Yrs" label="Chamber Legacy" />
                <MetricCard value="400+" label="Merchant Network" />
                <MetricCard value="50 Acres" label="Dedicated Complex" />
                <MetricCard value="11+" label="Honours & Awards" />
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: High-Impact Image Card & Slide Switcher */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="scale" delay={140}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Glowing Border */}
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-gold/40 via-royal/30 to-gold/20 blur-xl opacity-70"
                />

                {/* Main Image Showcase Card */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-gold/60 bg-navy-900 shadow-2xl">
                  {/* Photo Container with uncropped, clean framing */}
                  <div className="relative aspect-[4/4.8] w-full overflow-hidden bg-navy-950">
                    <Image
                      src={current.src}
                      alt={current.caption}
                      fill
                      priority
                      quality={95}
                      className="object-contain object-center transition-all duration-700"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/30"
                    />

                    {/* Floating Top Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-navy-950/90 px-3 py-1 text-[0.72rem] font-700 uppercase tracking-wider text-gold shadow-md backdrop-blur-md">
                        <Sparkles className="h-3 w-3 text-gold" />
                        {current.tag}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/30">
                        <Award className="h-4 w-4 text-gold" />
                      </div>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/15 bg-navy-950/85 p-3.5 backdrop-blur-lg">
                      <p className="text-xs font-700 text-gold uppercase tracking-wider">
                        {current.badge}
                      </p>
                      <p className="mt-1 text-xs font-500 text-white/90 leading-snug line-clamp-2">
                        {current.caption}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Slide Thumbnail Tabs */}
                  <div className="grid grid-cols-4 gap-1 border-t border-white/15 bg-navy-950/95 p-2">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={cn(
                          "relative flex flex-col items-center justify-center rounded-xl p-1.5 text-center transition-all",
                          activeSlide === idx
                            ? "bg-gold/20 border border-gold text-gold shadow-sm"
                            : "bg-white/5 border border-transparent text-white/60 hover:bg-white/10 hover:text-white"
                        )}
                        aria-label={`View ${slide.label}`}
                      >
                        <span className="text-[0.62rem] font-700 uppercase tracking-tight truncate w-full">
                          {slide.tag}
                        </span>
                        {activeSlide === idx && (
                          <span className="mt-0.5 h-1 w-4 rounded-full bg-gold shadow-gold-glow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating Bottom Seal */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-full border border-gold/40 bg-navy-900/95 px-5 py-2 shadow-2xl backdrop-blur-md">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden bg-white p-0.5 ring-1 ring-gold/80 shadow-sm">
                    <Image src="/images/logo.png" alt="Navi Mumbai Merchants Chamber Seal" fill className="object-contain" />
                  </div>
                  <span className="text-xs font-700 text-white whitespace-nowrap">
                    Navi Mumbai APMC • 50-Acre Trade Complex
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
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
    <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:border-gold/30">
      <span className="block font-heading text-xl sm:text-2xl font-800 text-gold-gradient">
        {value}
      </span>
      <span className="mt-0.5 block text-[0.72rem] font-500 uppercase tracking-wider text-white/70">
        {label}
      </span>
    </div>
  );
}
