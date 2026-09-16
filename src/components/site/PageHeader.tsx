import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

type Crumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  align?: "left" | "center";
  /** Optional lucide icon rendered as a chip beside the heading. */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional background image path (e.g. /images/hero/chamber-headquarters-hero.jpg) */
  backgroundImage?: string;
  /** Image opacity percentage between 10 and 100 (defaults to 85) */
  imageOpacity?: number;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs = [],
  align = "left",
  icon: Icon,
  backgroundImage = "/images/hero/chamber-headquarters-hero.jpg",
  imageOpacity = 90,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#042017] text-white border-b border-[#059669]/30 min-h-[260px] sm:min-h-[320px] flex items-center">
      {/* High Visibility Background Layer - 90% Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={backgroundImage}
          alt="Navi Mumbai Merchants Chamber Architectural Background"
          fill
          priority
          className="object-cover object-center opacity-90 scale-100"
        />

        {/* Directional Scrim for High Image Visibility + Crisp Text Contrast */}
        <div className="absolute inset-0 bg-[#042017]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#042017]/95 via-[#042017]/80 via-55% to-[#042017]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#042017]/90 via-transparent to-[#042017]/50" />
      </div>

      {/* Radial Lighting Highlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#059669]/20 blur-3xl z-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-[#10B981]/20 blur-3xl z-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-16 w-full">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol
            className={cn(
              "flex flex-wrap items-center gap-1.5 text-xs text-slate-300 font-medium",
              align === "center" && "justify-center"
            )}
          >
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-white"
              >
                <Home className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="hover:underline">Home</span>
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="inline-flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-white hover:underline"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[#34D399] font-bold">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <ScrollReveal
          variant="up"
          className={cn(
            "flex flex-col gap-3 sm:gap-4 max-w-4xl",
            align === "center" && "items-center text-center mx-auto"
          )}
        >
          {(Icon || eyebrow) && (
            <div
              className={cn(
                "flex items-center gap-3",
                align === "center" && "flex-col"
              )}
            >
              {Icon && (
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#059669]/40 text-[#34D399] ring-1 ring-[#059669]/60 shadow-md backdrop-blur-md">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              {eyebrow && (
                <span className="eyebrow inline-flex items-center gap-1.5 text-[#34D399] font-bold uppercase tracking-wider text-xs rounded-full bg-[#059669]/30 border border-[#059669]/50 px-3 py-1 backdrop-blur-md">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                  {eyebrow}
                </span>
              )}
            </div>
          )}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.12] text-balance tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {title}
          </h1>
          {description && (
            <p className="max-w-3xl text-pretty text-sm sm:text-base lg:text-lg leading-relaxed text-slate-200 font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              {description}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
