"use client";

import { useRouter } from "next/navigation";
import { Compass } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mediaCategories, type MediaCategorySlug } from "@/data/media";

type Props = {
  /** Preselected category (used on the category pages themselves). */
  current?: MediaCategorySlug;
};

/**
 * Category dropdown for the Media Desk — navigates between the Events,
 * Social Activities and News pages.
 */
export function MediaCategorySelect({ current }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2.5">
      <Compass
        aria-hidden
        className="h-4 w-4 shrink-0 text-gold-600"
      />
      <Select
        value={current}
        onValueChange={(value) => {
          if (mediaCategories.some((c) => c.slug === value)) {
            router.push(`/media/${value}`);
          }
        }}
      >
        <SelectTrigger
          aria-label="Choose a media section"
          className="w-full gap-2 rounded-xl border-border bg-white px-3.5 py-2.5 text-sm font-600 text-navy shadow-sm transition-colors hover:border-gold focus:ring-2 focus:ring-gold/30 focus:ring-offset-0 data-[state=open]:border-gold sm:w-[240px]"
        >
          <SelectValue placeholder="Jump to a section…" />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-border shadow-premium-lg">
          {mediaCategories.map((category) => (
            <SelectItem
              key={category.slug}
              value={category.slug}
              className="rounded-lg text-sm font-600 text-ink data-[highlighted]:bg-gold-50 data-[highlighted]:text-navy data-[state=checked]:text-royal data-[state=checked]:font-700"
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
