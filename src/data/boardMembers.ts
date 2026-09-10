// ============================================================
// Board of Directors — Navi Mumbai Merchants Chamber
// ============================================================

export type BoardCategory = "chairman" | "office-bearer" | "director";

export type BoardMember = {
  id?: string;
  name: string;
  designation: string;
  category?: BoardCategory;
  image?: string;
  sortOrder?: number;
};

export const determineBoardCategory = (designation: string): BoardCategory => {
  if (/chairman/i.test(designation)) return "chairman";
  if (/secretary|treasurer|vice/i.test(designation)) return "office-bearer";
  return "director";
};

export const boardMembers: BoardMember[] = [
  {
    name: "Kirti Rana",
    designation: "Chairman",
    category: "chairman",
    image: "/images/kirti-rana/portrait-lead.jpg",
    sortOrder: 0,
  },
  {
    name: "Jayesh Sheth",
    designation: "Vice-Chairman",
    category: "office-bearer",
    sortOrder: 1,
  },
  {
    name: "Amarshi Karia",
    designation: "Vice-Chairman",
    category: "office-bearer",
    sortOrder: 2,
  },
  {
    name: "Vinesh Shah",
    designation: "Hon. Secretary",
    category: "office-bearer",
    sortOrder: 3,
  },
  {
    name: "Tejas Parekh",
    designation: "Jt. Secretary",
    category: "office-bearer",
    sortOrder: 4,
  },
  {
    name: "Amrutlal Savla",
    designation: "Treasurer",
    category: "office-bearer",
    sortOrder: 5,
  },
  {
    name: "Ramniklal Chheda",
    designation: "Director",
    category: "director",
    sortOrder: 6,
  },
  {
    name: "Anil Damani",
    designation: "Director",
    category: "director",
    sortOrder: 7,
  },
  {
    name: "Divesh Shah",
    designation: "Director",
    category: "director",
    sortOrder: 8,
  },
  {
    name: "Mukesh Shah",
    designation: "Director",
    category: "director",
    sortOrder: 9,
  },
  {
    name: "Gopal Ahuja",
    designation: "Director",
    category: "director",
    sortOrder: 10,
  },
  {
    name: "Yogesh Trivedi",
    designation: "Director",
    category: "director",
    sortOrder: 11,
  },
  {
    name: "Mahesh Bhanushali",
    designation: "Director",
    category: "director",
    sortOrder: 12,
  },
  {
    name: "Bhavesh Shethia",
    designation: "Director",
    category: "director",
    sortOrder: 13,
  },
  {
    name: "Kantilal Shah",
    designation: "Director",
    category: "director",
    sortOrder: 14,
  },
  {
    name: "Vishal Shah",
    designation: "Director",
    category: "director",
    sortOrder: 15,
  },
];

// Derive initials for monogram avatars
export const getInitials = (name: string): string => {
  const clean = name.replace(/^(Mr\.|Shri|Smt\.|Dr\.)\s+/i, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
