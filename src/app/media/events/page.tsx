import type { Metadata } from "next";
import { CalendarRange } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { MediaCategoryPageBody } from "@/components/site/MediaCategoryPageBody";

export const metadata: Metadata = {
  title: "Events | Media Desk",
  description:
    "Chamber meets, trade sessions, felicitation programmes and trader interactions associated with Kirti Rana and the Navi Mumbai merchant community.",
  alternates: { canonical: "/media/events" },
};

export default function MediaEventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media Desk — Events"
        title="Events & Programmes"
        description="Trade meets, interactive sessions and chamber programmes that bring merchants, farmers and office-bearers onto one platform."
        crumbs={[{ label: "Media", href: "/media" }, { label: "Events" }]}
        icon={CalendarRange}
      />
      <MediaCategoryPageBody slug="events" />
    </>
  );
}
