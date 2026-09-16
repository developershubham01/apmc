import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

type CTAButton = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
};

type CTASectionProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  buttons?: CTAButton[];
  icon?: LucideIcon;
  variant?: "navy" | "light" | "gradient";
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
};

export function CTASection({
  eyebrow,
  title,
  description,
  buttons = [],
  icon: Icon,
  variant = "navy",
  backgroundImage = "/images/hero/hero-trading-bg.jpg",
  className,
  children,
}: CTASectionProps) {
  return (
    <section className={cn("relative bg-white", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <ScrollReveal variant="scale">
          <div className="relative overflow-hidden rounded-[32px] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 bg-white text-[#042017] border-2 border-[#D1E7DD] shadow-md">
            {/* Background Image Layer — 90% Visibility */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src={backgroundImage}
                alt="Chamber Trade Network"
                fill
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-[#042017]/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#042017]/95 via-[#042017]/80 to-[#042017]/45" />
            </div>

            {/* Decorative Glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#059669]/20 blur-3xl z-0"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-[#10B981]/20 blur-3xl z-0"
            />

            <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                {Icon && (
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#059669]/40 text-[#34D399] ring-1 ring-[#059669]/50 shadow-sm backdrop-blur-md">
                    <Icon className="h-6 w-6" />
                  </span>
                )}
                {eyebrow && (
                  <span className="eyebrow inline-flex items-center gap-1.5 text-[#34D399] font-bold uppercase tracking-wider text-xs rounded-full bg-[#059669]/30 border border-[#059669]/40 px-3 py-1">
                    <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                    {eyebrow}
                  </span>
                )}
                <h3 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-balance tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {title}
                </h3>
                {description && (
                  <p className="mt-4 text-pretty text-base sm:text-lg leading-relaxed text-slate-200">
                    {description}
                  </p>
                )}
                {children}
              </div>

              {buttons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
                  {buttons.map((btn) => {
                    const primary = btn.variant !== "secondary";
                    const external = btn.external;
                    const cls = cn(
                      "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5",
                      primary
                        ? "bg-[#059669] text-white hover:bg-[#047857] shadow-lg"
                        : "border-2 border-white/80 bg-white/10 text-white hover:bg-white hover:text-[#042017] shadow-sm backdrop-blur-md"
                    );
                    if (external) {
                      return (
                        <a
                          key={btn.label}
                          href={btn.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cls}
                        >
                          {btn.label}
                          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      );
                    }
                    return (
                      <Link key={btn.label} href={btn.href} className={cls}>
                        {btn.label}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
