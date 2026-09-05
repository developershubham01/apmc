import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Market } from "@/data/markets";
import { ScrollReveal } from "./ScrollReveal";

type MarketCardProps = {
  market: Market;
  index?: number;
};

export function MarketCard({ market, index = 0 }: MarketCardProps) {
  const Icon = market.icon;
  return (
    <ScrollReveal variant="up" delay={index * 90} className="h-full">
      <article
        id={market.slug}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-premium scroll-mt-28 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
      >
        {/* Image */}
        <div className="img-zoom relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={market.image}
            alt={market.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-106"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"
          />
          {/* Icon chip */}
          <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-royal shadow-premium ring-1 ring-white/60 backdrop-blur">
            <Icon className="h-5 w-5" />
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-heading text-lg font-700 text-white drop-shadow">
              {market.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm leading-relaxed text-ink-600">
            {market.description}
          </p>

          {/* commodity chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {market.commodities.slice(0, 4).map((c) => (
              <span
                key={c}
                className="rounded-full bg-mist px-2.5 py-1 text-[0.7rem] font-500 text-ink-600 ring-1 ring-border"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-5">
            <Link
              href={market.href}
              className="group/btn inline-flex items-center gap-1.5 text-sm font-600 text-royal transition-colors hover:text-navy"
            >
              Explore
              <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
