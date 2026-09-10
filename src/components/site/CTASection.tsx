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
  className,
  children,
}: CTASectionProps) {
  const isNavy = variant === "navy" || variant === "gradient";

  return (
    <section className={cn("relative", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <ScrollReveal variant="scale">
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16",
              isNavy
                ? "bg-gradient-to-br from-navy via-navy-700 to-royal text-white shadow-premium-lg"
                : "bg-white text-navy shadow-premium ring-1 ring-border"
            )}
          >
            {/* Decorative */}
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-royal/20 blur-3xl"
            />

            <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                {Icon && (
                  <span
                    className={cn(
                      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
                      isNavy ? "bg-white/10 text-gold ring-1 ring-gold/30" : "bg-royal-50 text-royal"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                )}
                {eyebrow && (
                  <span
                    className={cn(
                      "eyebrow",
                      isNavy ? "text-gold" : "text-royal"
                    )}
                  >
                    {eyebrow}
                  </span>
                )}
                <h3
                  className={cn(
                    "mt-3 font-heading text-2xl sm:text-3xl lg:text-4xl font-700 leading-tight text-balance",
                    isNavy ? "text-white" : "text-navy"
                  )}
                >
                  {title}
                </h3>
                {description && (
                  <p
                    className={cn(
                      "mt-4 text-pretty text-base sm:text-lg leading-relaxed",
                      isNavy ? "text-white/75" : "text-ink-600"
                    )}
                  >
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
                      "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-600 transition-all hover:-translate-y-0.5",
                      isNavy
                        ? primary
                          ? "bg-gold text-navy hover:bg-gold-600 shadow-gold-glow"
                          : "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20"
                        : primary
                          ? "bg-navy text-white hover:bg-navy-700 shadow-premium"
                          : "border border-navy/15 bg-white text-navy hover:border-gold hover:text-royal"
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
