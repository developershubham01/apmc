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
  imageOpacity = 85,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-white text-[#042017] border-b border-[#D1E7DD] min-h-[260px] sm:min-h-[300px] flex items-center">
      {/* Subtle Architectural Watermark — visible but separate from content */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={backgroundImage}
          alt="Navi Mumbai Merchants Chamber Architectural Background"
          fill
          priority
          className="object-cover object-center opacity-[0.08]"
        />

        {/* Gentle directional scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      {/* Radial Lighting Highlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#059669]/10 blur-3xl z-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-[#10B981]/10 blur-3xl z-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-16 w-full">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol
            className={cn(
              "flex flex-wrap items-center gap-1.5 text-xs text-[#4B5563]",
              align === "center" && "justify-center"
            )}
          >
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 font-medium transition-colors hover:text-[#059669]"
              >
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="inline-flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="font-medium transition-colors hover:text-[#059669]"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[#059669] font-bold">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <ScrollReveal
          variant="up"
          className={cn(
            "flex flex-col gap-3 sm:gap-4",
            align === "center" && "items-center text-center"
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
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#059669] ring-1 ring-[#059669]/30 shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              {eyebrow && (
                <span className="eyebrow inline-flex items-center gap-1.5 text-[#059669] font-bold uppercase tracking-wider text-xs">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#059669]" />
                  {eyebrow}
                </span>
              )}
            </div>
          )}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.12] text-balance tracking-tight text-[#042017]">
            {title}
          </h1>
          {description && (
            <p className="max-w-3xl text-pretty text-sm sm:text-base lg:text-lg leading-relaxed text-[#4B5563]">
              {description}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
