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
      !/chairman/i.test(m.designation) &&
      /secretary|treasurer|vice/i.test(m.designation)
  );
  const directors = members.filter(
    (m) =>
      !/chairman/i.test(m.designation) &&
      !/secretary|treasurer|vice/i.test(m.designation) &&
      !/co[\s.-]*op/i.test(m.designation) &&
      !/invitee/i.test(m.designation)
  );
  const coOpDirectors = members.filter(
    (m) => /co[\s.-]*op/i.test(m.designation)
  );
  const invitees = members.filter(
    (m) => /invitee/i.test(m.designation)
  );

  return (
    <>
      <PageHeader
        eyebrow="Board of Directors"
        title="Board of Directors"
        description="The governing leadership body of the Navi Mumbai Merchants Chamber, chaired by Shri Kirti Rana — comprising Office Bearers, Directors, Co-Opted Directors and Special Invitees."
        crumbs={[{ label: "Board" }]}
        backgroundImage="/images/events/board-meeting.jpg"
        imageOpacity={90}
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
                description="The Board of Directors guides the Chamber's mission of representing and supporting 400+ member enterprises across the 50-acre APMC complex."
              />
            </ScrollReveal>
            <ScrollReveal variant="up" delay={120}>
              <div className="grid grid-cols-3 gap-3">
                <Stat value={chairman.length} label="Chairman" />
                <Stat value={officeBearers.length} label="Office Bearers" />
                <Stat value={directors.length + coOpDirectors.length + invitees.length} label="Directors & Invitees" />
              </div>
            </ScrollReveal>
          </div>

          {/* Verification / Leadership notice */}
          <ScrollReveal variant="up" className="mt-10">
            <div className="flex items-start gap-3 rounded-2xl border border-[#D1E7DD] bg-[#F0FDF4] p-5">
              <Info className="h-5 w-5 shrink-0 text-[#059669]" />
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Official governing council of the Navi Mumbai Merchants Chamber. All board members are seasoned leaders dedicated to trade ethics, merchant welfare, dispute redressal, and market modernization across Maharashtra.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Chairman */}
      <section className="bg-[#F0FDF4] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="up">
            <div className="mb-8 flex items-center gap-3">
              <Crown className="h-6 w-6 text-[#059669]" />
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[#042017]">
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
              <Users className="h-6 w-6 text-[#059669]" />
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[#042017]">
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
      <section className="bg-[#F0FDF4] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="up">
            <div className="mb-8 flex items-center gap-3">
              <Users className="h-6 w-6 text-[#059669]" />
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[#042017]">
                Directors
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {directors.map((m, i) => (
              <BoardMemberCard key={m.id || m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Co-Opted Directors & Special Invitees */}
      {(coOpDirectors.length > 0 || invitees.length > 0) && (
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal variant="up">
              <div className="mb-8 flex items-center gap-3">
                <Users className="h-6 w-6 text-[#059669]" />
                <h2 className="font-heading text-2xl font-bold tracking-tight text-[#042017]">
                  Co-Opted Directors &amp; Special Invitees
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {[...coOpDirectors, ...invitees].map((m, i) => (
                <BoardMemberCard key={m.id || m.name} member={m} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

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
    <div className="rounded-[24px] border border-[#D1E7DD] bg-white p-4 text-center shadow-sm">
      <p className="font-heading text-2xl sm:text-3xl font-bold text-[#042017] tracking-tight">{value}</p>
      <p className="mt-1 text-[0.66rem] uppercase tracking-wider text-[#059669] font-bold">
        {label}
      </p>
    </div>
  );
}
