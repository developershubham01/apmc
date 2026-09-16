import { cn } from "@/lib/utils";

type MonogramAvatarProps = {
  initials: string;
  name?: string;
  designation?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  sm: "h-12 w-12 text-sm",
  md: "h-20 w-20 text-xl",
  lg: "h-28 w-28 text-2xl",
  xl: "h-40 w-40 text-4xl",
};

/**
 * Elegant monogram avatar used in place of a photograph when a
 * verified image is not yet available. Designed to look intentional
 * and premium in Green and White theme.
 */
export function MonogramAvatar({
  initials,
  name,
  designation,
  size = "md",
  className,
}: MonogramAvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl",
        "bg-[#042017] text-white",
        "shadow-sm ring-1 ring-[#059669]/30",
        sizeMap[size],
        className
      )}
      role="img"
      aria-label={name ? `${name}${designation ? `, ${designation}` : ""}` : initials}
    >
      {/* Decorative mint corner */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, rgba(16,185,129,0.28) 0%, transparent 45%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#10B981]"
      />
      <span className="font-heading font-bold tracking-tight text-[#10B981]">
        {initials}
      </span>
    </div>
  );
}
