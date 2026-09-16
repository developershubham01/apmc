import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { MediaCategoryPageBody } from "@/components/site/MediaCategoryPageBody";

export const metadata: Metadata = {
  title: "News | Media Desk",
  description:
    "Announcements, press mentions and updates from the Navi Mumbai Merchants Chamber, the trade associations and the APMC ecosystem.",
  alternates: { canonical: "/media/news" },
};

export default function MediaNewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media Desk — News"
        title="News & Announcements"
        description="Announcements, press mentions and updates from the chamber, the associations and the APMC trade ecosystem."
        crumbs={[{ label: "Media", href: "/media" }, { label: "News" }]}
        icon={Megaphone}
        backgroundImage="/images/events/bharatiya-vyapar-mahotsav-2026.jpg"
        imageOpacity={90}
      />
      <MediaCategoryPageBody slug="news" />
    </>
  );
}
