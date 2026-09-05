import Link from "next/link";
import { ArrowRight, Building2, ChevronRight, Wheat, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      aria-label="Kirti Rana — introduction"
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 bg-heritage-grid opacity-70" />
      <div
        aria-hidden
        className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-royal-50 blur-3xl opacity-60"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-gold-50 blur-3xl opacity-70"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-12 py-12 lg:py-20 lg:grid-cols-2">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <ScrollReveal variant="up">
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-50 px-4 py-1.5 text-gold-600">
                <Sparkles className="h-3.5 w-3.5" />
                Business Leadership • Merchant Community • Agriculture &amp; Trade
              </span>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={80}>
              <h1 className="mt-6 font-heading font-800 tracking-tight text-navy text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
                KIRTI RANA
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={160}>
              <div className="mt-5 flex flex-col gap-2">
                <p className="flex items-center gap-2 text-base sm:text-lg font-500 text-royal">
                  <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                  Chairman — Navi Mumbai Merchants Chamber
                </p>
                <p className="flex items-center gap-2 text-base sm:text-lg font-500 text-royal">
                  <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                  Chairman — Bombay Mudibazar Kariana Merchants Association
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={240}>
              <p className="mt-6 max-w-xl text-pretty text-base sm:text-lg leading-relaxed text-ink-600">
                An established presence in Navi Mumbai&apos;s business and
                merchant community, representing leadership, business
                development and the interests of traders and enterprises.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={320}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-sm font-600 text-white shadow-premium transition-all hover:bg-navy-700 hover:shadow-premium-lg hover:-translate-y-0.5"
                >
                  Explore Profile
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/organizations"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-navy/15 bg-white px-6 py-3.5 text-sm font-600 text-navy transition-all hover:border-gold hover:text-royal hover:-translate-y-0.5"
                >
                  View Organizations
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={400}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6">
                <Stat value="2" label="Chamber Chairmanships" />
                <span aria-hidden className="hidden sm:block h-8 w-px bg-border" />
                <Stat value="APMC" label="Turbhe • Navi Mumbai" />
                <span aria-hidden className="hidden sm:block h-8 w-px bg-border" />
                <Stat value="Agro" label="Kisan Kirti Agro Pvt. Ltd." />
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT — Portrait */}
          <div className="order-1 lg:order-2">
            <ScrollReveal variant="scale" delay={120}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative outer frame */}
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/30 via-transparent to-royal/20 blur-xl"
                />
                <div
                  aria-hidden
                  className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl border-2 border-gold/40 rotate-12"
                />
                <div
                  aria-hidden
                  className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full border-2 border-royal/30"
                />

                {/* Portrait card */}
                <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-gold/50 bg-gradient-to-br from-navy via-navy-700 to-royal shadow-premium-lg">
                  <div className="relative aspect-[4/5] w-full">
                    {/* Monogram portrait (placeholder until verified photo) */}
                    <div aria-hidden className="absolute inset-0 bg-navy-grid opacity-40" />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(80% 60% at 50% 18%, rgba(201,162,39,0.28) 0%, transparent 60%)",
                      }}
                    />
                    <div className="relative flex h-full flex-col items-center justify-center px-6 py-10 text-center">
                      <div className="relative">
                        <span
                          aria-hidden
                          className="absolute -inset-4 rounded-full border border-gold/30 animate-pulse-ring"
                        />
                        <span className="relative inline-flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full bg-white/5 ring-2 ring-gold/50 backdrop-blur">
                          <span className="font-heading text-6xl sm:text-7xl font-800 text-gold-gradient">
                            KR
                          </span>
                        </span>
                      </div>
                      <p className="mt-8 font-heading text-2xl font-700 text-white">
                        Kirti Rana
                      </p>
                      <p className="mt-2 text-sm text-gold/90 uppercase tracking-[0.18em]">
                        Chairman
                      </p>
                      <p className="mt-1 text-xs text-white/60 max-w-[16rem]">
                        Navi Mumbai Merchants Chamber
                      </p>
                    </div>
                  </div>

                  {/* Bottom emblem bar */}
                  <div className="relative flex items-center justify-center gap-3 border-t border-white/10 bg-black/20 px-6 py-4">
                    <Wheat className="h-4 w-4 text-gold" />
                    <span className="text-[0.7rem] uppercase tracking-[0.22em] text-white/70">
                      Agriculture • Trade • Heritage
                    </span>
                    <Building2 className="h-4 w-4 text-gold" />
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2.5 shadow-premium ring-1 ring-border">
                  <span className="text-xs font-600 text-navy whitespace-nowrap">
                    Navi Mumbai APMC • Turbhe
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div aria-hidden className="relative">
        <svg
          className="block w-full h-[40px] sm:h-[60px] text-mist"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,40 C240,10 480,10 720,30 C960,50 1200,50 1440,20 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-heading text-xl font-700 text-navy">{value}</span>
      <span className="text-xs text-ink-600/80">{label}</span>
    </div>
  );
}
