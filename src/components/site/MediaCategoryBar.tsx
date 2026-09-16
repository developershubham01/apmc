import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { mediaCategories, type MediaCategorySlug } from "@/data/media";
import { MediaCategorySelect } from "./MediaCategorySelect";

type Props = {
  /** The category page we are on (undefined on the /media overview). */
  current?: MediaCategorySlug;
  className?: string;
};

/**
 * Bar shown under the page header on /media and the three media category
 * pages: a dropdown selector plus quick-link pills for desktop users.
 */
export function MediaCategoryBar({ current, className }: Props) {
  return (
    <section
      aria-label="Media sections"
      className={cn("border-b border-border bg-mist/70", className)}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-amber-400 ring-1 ring-amber-500/30 sm:inline-flex">
            <LayoutGrid className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[0.66rem] font-700 uppercase tracking-[0.16em] text-amber-600">
              Media Desk
            </p>
            <p className="text-xs text-ink-600">
              Browse coverage by section — events, social work and news.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
          <MediaCategorySelect current={current} />

          {/* Quick-link pills (desktop) */}
          <nav aria-label="Media sections quick links" className="hidden lg:flex lg:items-center lg:gap-1.5">
            <Link
              href="/media"
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-600 transition-colors",
                !current
                  ? "bg-navy text-white shadow-premium"
                  : "bg-white text-ink-600 ring-1 ring-border hover:text-amber-600"
              )}
            >
              All Media
            </Link>
            {mediaCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/media/${category.slug}`}
                aria-current={current === category.slug ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-600 transition-colors",
                  current === category.slug
                    ? "bg-navy text-white shadow-premium"
                    : "bg-white text-ink-600 ring-1 ring-border hover:text-amber-600"
                )}
              >
                {category.label}
                <ArrowRight
                  className={cn(
                    "h-3 w-3",
                    current === category.slug ? "text-amber-400" : "text-ink-600/50"
                  )}
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
