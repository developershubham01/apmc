import type { Metadata } from "next";
import Link from "next/link";
import { Users, Info, ArrowRight, Crown } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { BoardMemberCard } from "@/components/site/BoardMemberCard";
import { CTASection } from "@/components/site/CTASection";
import { boardMembers } from "@/data/boardMembers";

export const metadata: Metadata = {
  title: "Board of Directors | Navi Mumbai Merchants Chamber",
  description:
    "Board of Directors of the Navi Mumbai Merchants Chamber, chaired by Kirti Rana — Vice-Chairmen, Secretaries, Treasurer and Directors.",
  alternates: { canonical: "/board" },
};

export default function BoardPage() {
  const chairman = boardMembers.filter((m) => /chairman/i.test(m.designation));
  const officeBearers = boardMembers.filter(
    (m) =>
      !/chairman/i.test(m.designation) &&
      /secretary|treasurer/i.test(m.designation)
  );
  const directors = boardMembers.filter((m) => /director/i.test(m.designation));

  return (
    <>
      <PageHeader
        eyebrow="Board of Directors"
        title="Board of Directors"
        description="The leadership body of the Navi Mumbai Merchants Chamber, chaired by Kirti Rana — comprising Vice-Chairmen, Secretaries, the Treasurer and Directors."
        crumbs={[{ label: "Board" }]}
      />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 items-center">
            <ScrollReveal variant="up" className="lg:col-span-2">
              <SectionHeading
                align="left"
                eyebrow="Navi Mumbai Merchants Chamber"
                title="Leadership & Governance"
                description="The Board of Directors guides the Chamber's mission of representing and supporting the merchant community of Navi Mumbai."
              />
            </ScrollReveal>
            <ScrollReveal variant="up" delay={120}>
              <div className="grid grid-cols-3 gap-3">
                <Stat value={chairman.length} label="Chairman" />
                <Stat value={officeBearers.length} label="Office Bearers" />
                <Stat value={directors.length} label="Directors" />
              </div>
            </ScrollReveal>
          </div>

          {/* Verify note */}
          <ScrollReveal variant="up" className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold-50/50 p-5">
              <Info className="h-5 w-5 shrink-0 text-gold-600" />
              <p className="text-sm text-ink-600">
                Names and designations are transcribed from a reference source.
                Please verify all names and designations with the organization
                before production.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Chairman */}
      <section className="bg-mist py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="up">
            <div className="mb-8 flex items-center gap-3">
              <Crown className="h-6 w-6 text-gold" />
              <h2 className="font-heading text-2xl font-700 text-navy">
                Chairman
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {chairman.map((m, i) => (
              <BoardMemberCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Office Bearers */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="up">
            <div className="mb-8 flex items-center gap-3">
              <Users className="h-6 w-6 text-royal" />
              <h2 className="font-heading text-2xl font-700 text-navy">
                Office Bearers
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {officeBearers.map((m, i) => (
              <BoardMemberCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="bg-mist py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="up">
            <div className="mb-8 flex items-center gap-3">
              <Users className="h-6 w-6 text-royal" />
              <h2 className="font-heading text-2xl font-700 text-navy">
                Directors
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {directors.map((m, i) => (
              <BoardMemberCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="navy"
        eyebrow="Learn More"
        title="The Organization Behind the Board"
        description="Discover the work and focus areas of the Navi Mumbai Merchants Chamber."
        buttons={[
          { label: "View Organizations", href: "/organizations", variant: "primary" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 text-center shadow-premium">
      <p className="font-heading text-2xl font-800 text-navy">{value}</p>
      <p className="mt-1 text-[0.66rem] uppercase tracking-[0.12em] text-royal font-600">
        {label}
      </p>
    </div>
  );
}
