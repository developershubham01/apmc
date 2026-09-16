import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3.5 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-150 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#042017] text-white [a&]:hover:bg-[#06281E]",
        secondary:
          "border-[#D1E7DD] bg-[#F0FDF4] text-[#042017] [a&]:hover:bg-[#D1E7DD]",
        destructive:
          "border-transparent bg-[#E41E3F] text-white [a&]:hover:bg-[#C01533]",
        outline:
          "border-[#042017] text-[#042017] [a&]:hover:bg-[#042017] [a&]:hover:text-white",
        metaBlue:
          "border-transparent bg-[#ECFDF5] text-[#047857] [a&]:hover:bg-[#D1E7DD]",
        metaDark:
          "border-transparent bg-[#042017] text-white [a&]:hover:bg-[#06281E]",
        metaSuccess:
          "border-transparent bg-[#ECFDF5] text-[#059669] [a&]:hover:bg-[#D1E7DD]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
