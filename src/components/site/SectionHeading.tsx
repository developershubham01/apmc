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
            light ? "text-[#10B981] font-bold" : "text-[#059669] font-bold"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "inline-block h-0.5 w-5 rounded-full",
              light ? "bg-[#10B981]" : "bg-[#059669]"
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-heading font-bold text-balance text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.14] tracking-tight",
          light ? "text-white" : "text-[#042017]"
        )}
      >
        {title}
      </h2>
      <span aria-hidden className="meta-hairline" />
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base sm:text-lg leading-relaxed",
            light ? "text-slate-200" : "text-[#4B5563]"
          )}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
