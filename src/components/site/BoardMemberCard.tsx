import { LightboxImage } from "./LightboxImage";
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
          "group relative flex h-full flex-col items-center justify-between rounded-[28px] border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#059669] hover:shadow-[0_12px_32px_-8px_rgba(4,32,23,0.08)]",
          chair ? "border-[#059669]/40 shadow-sm ring-1 ring-[#059669]/20" : "border-[#D1E7DD]"
        )}
      >
        {/* Badge for chair / office */}
        {chair && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#042017] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-sm z-10">
            Chairman
          </span>
        )}

        <div className="flex flex-col items-center w-full">
          {/* Avatar */}
          <div className="relative mt-2">
            {member.image ? (
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-[#D1E7DD] shadow-sm">
                <LightboxImage
                  src={member.image}
                  alt={member.name}
                  title={member.name}
                  description={`${member.designation} — Governing Board of Directors, Navi Mumbai Merchants Chamber`}
                  category="BOARD MEMBER"
                  caption={`${member.name} — ${member.designation}`}
                  sizes="112px"
                  className="h-full w-full rounded-2xl border-0 ring-0"
                  imgClassName="object-cover object-top"
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
          <h3 className="mt-4 font-heading text-base font-bold tracking-tight text-[#042017]">
            {member.name}
          </h3>
          <p
            className={cn(
              "mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
              chair
                ? "bg-[#ECFDF5] text-[#047857] font-bold"
                : office
                  ? "bg-[#ECFDF5] text-[#047857] font-semibold"
                  : "bg-[#F0FDF4] text-[#4B5563]"
            )}
          >
            {member.designation}
          </p>
        </div>

        {/* Green subtle hairline hover indicator */}
        <span
          aria-hidden
          className="mt-4 h-0.5 w-6 rounded-full bg-[#059669] opacity-0 transition-all duration-300 group-hover:w-12 group-hover:opacity-100"
        />
      </article>
    </ScrollReveal>
  );
}
