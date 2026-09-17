import { MapPin, CalendarDays, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { LightboxImage } from "./LightboxImage";
import type { MediaEntry } from "@/data/media";
import { cn } from "@/lib/utils";

type Props = {
  entry: MediaEntry;
  index: number;
  /** Flip the image side for visual rhythm. */
  flip?: boolean;
};

export function MediaEntryCard({ entry, index, flip = false }: Props) {
  return (
    <ScrollReveal variant="up">
      <article className="group overflow-hidden rounded-2xl border border-border bg-white shadow-premium transition-shadow hover:shadow-premium-lg">
        <div className="grid items-stretch gap-0 lg:grid-cols-2">
          {/* Image */}
          <div
            className={cn(
              "relative min-h-[220px]",
              flip ? "lg:order-2" : "lg:order-1"
            )}
          >
            <LightboxImage
              src={entry.image}
              alt={entry.imageAlt}
              title={entry.title}
              description={entry.summary}
              category={entry.date}
              caption={entry.title}
              overlay
              className="h-full w-full"
              imgClassName="object-cover"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-3 font-heading text-5xl font-800 leading-none text-white/25 drop-shadow-sm"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content */}
          <div
            className={cn(
              "flex flex-col justify-center p-6 sm:p-8",
              flip ? "lg:order-1" : "lg:order-2"
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[0.68rem] font-700 uppercase tracking-[0.12em] text-amber-700 ring-1 ring-amber-200">
                <CalendarDays className="h-3 w-3" />
                {entry.date}
              </span>
              {entry.location && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[0.68rem] font-600 text-ink-600 ring-1 ring-border">
                  <MapPin className="h-3 w-3 text-royal" />
                  {entry.location}
                </span>
              )}
            </div>

            <h2 className="mt-4 font-heading text-xl font-700 text-navy transition-colors group-hover:text-royal sm:text-2xl">
              {entry.title}
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-600">
              {entry.summary}
            </p>

            <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
              {entry.highlights.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-ink"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
