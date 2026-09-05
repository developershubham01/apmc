import Image from "next/image";
import { getInitials, type BoardMember } from "@/data/boardMembers";
import { MonogramAvatar } from "./MonogramAvatar";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

type BoardMemberCardProps = {
  member: BoardMember;
  index?: number;
};

const isChair = (designation: string) =>
  /chairman/i.test(designation);
const isOffice = (designation: string) =>
  /secretary|treasurer/i.test(designation);

export function BoardMemberCard({ member, index = 0 }: BoardMemberCardProps) {
  const initials = getInitials(member.name);
  const chair = isChair(member.designation);
  const office = isOffice(member.designation);

  return (
    <ScrollReveal variant="up" delay={(index % 4) * 80} className="h-full">
      <article
        className={cn(
          "group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border bg-white p-6 text-center shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg",
          chair ? "border-gold/50 ring-1 ring-gold/20" : "border-border"
        )}
      >
        {/* Decorative top corner */}
        <span
          aria-hidden
          className={cn(
            "absolute right-0 top-0 h-16 w-16 rounded-bl-[2rem] opacity-80",
            chair
              ? "bg-gradient-to-br from-gold/15 to-transparent"
              : "bg-gradient-to-br from-royal-50 to-transparent"
          )}
        />

        {/* Badge for chair */}
        {chair && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[0.62rem] font-700 uppercase tracking-[0.14em] text-navy">
            Chair
          </span>
        )}

        {/* Avatar */}
        <div className="relative mt-2">
          {member.image ? (
            <div className="img-zoom relative h-24 w-24 overflow-hidden rounded-2xl ring-2 ring-gold/30">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ) : (
            <MonogramAvatar
              initials={initials}
              name={member.name}
              designation={member.designation}
              size="lg"
            />
          )}
        </div>

        {/* Name + designation */}
        <h3 className="mt-5 font-heading text-base font-700 leading-tight text-navy">
          {member.name}
        </h3>
        <p
          className={cn(
            "mt-1.5 inline-block rounded-full px-3 py-1 text-xs font-600",
            chair
              ? "bg-gold-50 text-gold-600 ring-1 ring-gold/30"
              : office
                ? "bg-royal-50 text-royal ring-1 ring-royal/20"
                : "bg-mist text-ink-600 ring-1 ring-border"
          )}
        >
          {member.designation}
        </p>

        {/* Hover line */}
        <span
          aria-hidden
          className="mt-4 h-0.5 w-8 rounded-full bg-gold transition-all duration-300 group-hover:w-16"
        />
      </article>
    </ScrollReveal>
  );
}
