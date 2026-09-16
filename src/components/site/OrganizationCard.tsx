import Link from "next/link";
import { LightboxImage } from "./LightboxImage";
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
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#D1E7DD] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#059669] hover:shadow-[0_16px_40px_-10px_rgba(4,32,23,0.1)]">
        {/* Header band in Deep Forest Evergreen */}
        <div className="relative overflow-hidden bg-[#042017] px-6 py-6 text-white">
          <div className="relative flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 text-[#10B981]">
              <Building2 className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#10B981] font-bold">
                {organization.shortName}
              </p>
              <h3 className="mt-1 font-heading text-lg font-bold leading-tight text-white tracking-tight">
                {organization.name}
              </h3>
            </div>
          </div>

          {/* Role pill badge */}
          <div className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-100 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-[#059669] animate-pulse" />
            <span>
              {organization.designation} • Kirti Rana
            </span>
          </div>
        </div>

        {/* Optional Image Banner if provided */}
        {organization.image && detailed && (
          <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#D1E7DD] bg-[#042017]">
            <LightboxImage
              src={organization.image}
              alt={organization.name}
              caption={organization.name}
              className="h-full w-full rounded-none border-0 ring-0"
              imgClassName="object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="flex flex-1 flex-col px-6 py-6">
          <p className="text-sm italic font-semibold text-[#047857]">{organization.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
            {detailed
              ? organization.description
              : `${organization.description.slice(0, 160)}…`}
          </p>

          {/* Stats pills if available */}
          {organization.stats && organization.stats.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {organization.stats.slice(0, 3).map((st) => (
                <div
                  key={st.label}
                  className="rounded-full border border-[#D1E7DD] bg-[#F0FDF4] px-3 py-1 text-xs font-semibold"
                >
                  <span className="font-bold text-[#042017]">{st.value}</span>{" "}
                  <span className="text-[#4B5563]">{st.label}</span>
                </div>
              ))}
            </div>
          )}

          <ul className="mt-5 space-y-2.5">
            {organization.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-[#042017]">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] text-[#047857] ring-1 ring-[#059669]/20">
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
                "group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#059669] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all",
                "hover:bg-[#047857] hover:shadow-md"
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
