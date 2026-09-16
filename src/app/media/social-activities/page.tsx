import type { Metadata } from "next";
import { HeartHandshake } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { MediaCategoryPageBody } from "@/components/site/MediaCategoryPageBody";

export const metadata: Metadata = {
  title: "Social Activities | Media Desk",
  description:
    "Community welfare drives, farmer support initiatives and charity activity connected with Kirti Rana and the merchant community of Navi Mumbai.",
  alternates: { canonical: "/media/social-activities" },
};

export default function MediaSocialActivitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media Desk — Social Activities"
        title="Social Activities & Welfare"
        description="Welfare drives and community work in and around the market yard — supporting farmers, traders and families of the merchant community."
        crumbs={[
          { label: "Media", href: "/media" },
          { label: "Social Activities" },
        ]}
        icon={HeartHandshake}
        backgroundImage="/images/events/community.jpg"
        imageOpacity={90}
      />
      <MediaCategoryPageBody slug="social-activities" />
    </>
  );
}
