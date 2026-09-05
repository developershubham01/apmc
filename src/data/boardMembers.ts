// ============================================================
// Board of Directors — Navi Mumbai Merchants Chamber
// ============================================================
// NOTE TO DEVELOPERS / CONTENT TEAM:
// These names and designations have been transcribed from the
// supplied newspaper reference image.
// Please verify all names and designations with the organization
// before production deployment.
// ============================================================

export type BoardMember = {
  name: string;
  designation: string;
  // Photo path — left undefined because no verified photograph is
  // available yet. The BoardMemberCard renders an elegant monogram
  // avatar when no image is supplied.
  image?: string;
};

export const boardMembers: BoardMember[] = [
  { name: "Kirti Rana", designation: "Chairman" },
  { name: "Jayesh Sheth", designation: "Vice-Chairman" },
  { name: "Amarshi Karia", designation: "Vice-Chairman" },
  { name: "Vinesh Shah", designation: "Hon. Secretary" },
  { name: "Tejas Parekh", designation: "Jt. Secretary" },
  { name: "Amrutlal Savla", designation: "Treasurer" },
  { name: "Ramniklal Chheda", designation: "Director" },
  { name: "Anil Damani", designation: "Director" },
  { name: "Divesh Shah", designation: "Director" },
  { name: "Mukesh Shah", designation: "Director" },
  { name: "Gopal Ahuja", designation: "Director" },
  { name: "Yogesh Trivedi", designation: "Director" },
  { name: "Mahesh Bhanushali", designation: "Director" },
  { name: "Bhavesh Shethia", designation: "Director" },
  { name: "Kantilal Shah", designation: "Director" },
  { name: "Vishal Shah", designation: "Director" },
];

// Derive initials for monogram avatars
export const getInitials = (name: string): string => {
  const clean = name.replace(/^(Mr\.|Shri|Smt\.|Dr\.)\s+/i, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
