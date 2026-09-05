import Link from "next/link";
import { Building2, ChevronRight, Check } from "lucide-react";
import type { Organization } from "@/data/organizations";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

type OrganizationCardProps = {
  organization: Organization;
  index?: number;
  detailed?: boolean;
};

export function OrganizationCard({
  organization,
  index = 0,
  detailed = false,
}: OrganizationCardProps) {
  return (
    <ScrollReveal
      variant="up"
      delay={index * 120}
      className="h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
        {/* Top accent */}
        <div
          aria-hidden
          className="h-1.5 w-full bg-gradient-to-r from-navy via-royal to-gold"
        />

        {/* Header band */}
        <div className="relative overflow-hidden bg-navy px-6 py-7">
          <div aria-hidden className="absolute inset-0 bg-navy-grid opacity-50" />
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl"
          />
          <div className="relative flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-gold/40 text-gold">
              <Building2 className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-gold/90">
                {organization.shortName}
              </p>
              <h3 className="mt-1 font-heading text-lg font-700 leading-tight text-white">
                {organization.name}
              </h3>
            </div>
          </div>

          {/* Role badge */}
          <div className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 ring-1 ring-gold/30">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-600 text-gold">
              {organization.designation} • Kirti Rana
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-6 py-6">
          <p className="text-sm italic text-royal">{organization.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            {detailed
              ? organization.description
              : `${organization.description.slice(0, 150)}…`}
          </p>

          <ul className="mt-5 space-y-2.5">
            {organization.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-ink">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold/30">
                  <Check className="h-3 w-3" />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <Link
              href="/organizations"
              className={cn(
                "group/btn inline-flex items-center justify-center gap-2 rounded-xl border border-navy/15 bg-mist px-5 py-3 text-sm font-600 text-navy transition-all",
                "hover:bg-navy hover:text-white hover:border-navy"
              )}
            >
              View Details
              <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
