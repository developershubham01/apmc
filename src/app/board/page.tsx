import type { Metadata } from "next";
import { Users, Info, Crown } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { BoardMemberCard } from "@/components/site/BoardMemberCard";
import { CTASection } from "@/components/site/CTASection";
import { boardMembers as defaultBoardMembers, type BoardMember } from "@/data/boardMembers";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Board of Directors | Navi Mumbai Merchants Chamber",
  description:
    "Board of Directors of the Navi Mumbai Merchants Chamber, chaired by Kirti Rana — Vice-Chairmen, Secretaries, Treasurer and Directors.",
  alternates: { canonical: "/board" },
};

export const dynamic = "force-dynamic";

async function getBoardMembers(): Promise<BoardMember[]> {
  try {
    const dbMembers = await db.boardMember.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (dbMembers.length > 0) {
      return dbMembers.map((m) => ({
        id: m.id,
        name: m.name,
        designation: m.designation,
        category: m.category as "chairman" | "office-bearer" | "director",
        image: m.image || undefined,
        sortOrder: m.sortOrder,
      }));
    }
  } catch (err) {
    console.warn("Could not query DB for board members, using default data:", err);
  }
  return defaultBoardMembers;
}

export default async function BoardPage() {
  const members = await getBoardMembers();

  const chairman = members.filter(
    (m) => m.category === "chairman" || /chairman/i.test(m.designation)
  );
  const officeBearers = members.filter(
    (m) =>
      m.category === "office-bearer" ||
      (!/chairman/i.test(m.designation) && /secretary|treasurer|vice/i.test(m.designation))
  );
  const directors = members.filter(
    (m) =>
      m.category === "director" ||
      (!/chairman/i.test(m.designation) && !/secretary|treasurer|vice/i.test(m.designation))
  );

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

          {/* Verification / Leadership notice */}
          <ScrollReveal variant="up" className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold-50/50 p-5">
              <Info className="h-5 w-5 shrink-0 text-gold-600" />
              <p className="text-sm text-ink-600">
                Official leadership body of the Navi Mumbai Merchants Chamber. All board members are elected to champion wholesale merchant welfare, trade facilitation, and market development across Navi Mumbai APMC.
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
              <BoardMemberCard key={m.id || m.name} member={m} index={i} />
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
              <BoardMemberCard key={m.id || m.name} member={m} index={i} />
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
              <BoardMemberCard key={m.id || m.name} member={m} index={i} />
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
