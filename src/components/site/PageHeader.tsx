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
};

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs = [],
  align = "left",
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 bg-navy-grid opacity-50" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-royal/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />
      {/* Bottom gold accent */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold via-saffron to-gold"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol
            className={cn(
              "flex flex-wrap items-center gap-1.5 text-xs text-white/60",
              align === "center" && "justify-center"
            )}
          >
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-gold"
              >
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="inline-flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-gold"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <ScrollReveal
          variant="up"
          className={cn(
            "flex flex-col gap-4",
            align === "center" && "items-center text-center"
          )}
        >
          {eyebrow && (
            <span className="eyebrow inline-flex items-center gap-2 text-gold">
              <span aria-hidden className="inline-block h-px w-6 bg-gold/60" />
              {eyebrow}
            </span>
          )}
          <h1 className="font-heading font-800 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            {title}
          </h1>
          <span aria-hidden className="gold-hairline" />
          {description && (
            <p
              className={cn(
                "max-w-2xl text-pretty text-base sm:text-lg leading-relaxed text-white/75",
                align === "center" && "mx-auto"
              )}
            >
              {description}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
