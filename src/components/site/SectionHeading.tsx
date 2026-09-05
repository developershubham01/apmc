import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      id={id}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow inline-flex items-center gap-2",
            light ? "text-gold" : "text-royal"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "inline-block h-px w-6",
              light ? "bg-gold/60" : "bg-gold"
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-heading font-700 text-balance text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.1]",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      <span aria-hidden className="gold-hairline" />
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base sm:text-lg leading-relaxed",
            light ? "text-white/75" : "text-ink-600"
          )}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
