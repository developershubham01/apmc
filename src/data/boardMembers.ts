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
    name: "Mr. Kirti Rana",
    designation: "Chairman",
    category: "chairman",
    image: "/images/board/kirti-rana.jpg",
    sortOrder: 0,
  },
  {
    name: "Mr. Divyesh Shah",
    designation: "Vice Chairman",
    category: "office-bearer",
    image: "/images/board/divyesh-shah.jpg",
    sortOrder: 1,
  },
  {
    name: "Mr. Jayesh Sheth",
    designation: "Secretary",
    category: "office-bearer",
    image: "/images/board/jayesh-sheth.jpg",
    sortOrder: 2,
  },
  {
    name: "Mr. Kantilal Bhatt",
    designation: "Jt. Secretary",
    category: "office-bearer",
    image: "/images/board/kantilal-bhatt.jpg",
    sortOrder: 3,
  },
  {
    name: "Mr. Ajay Mehta",
    designation: "Treasurer",
    category: "office-bearer",
    image: "/images/board/ajay-mehta.jpg",
    sortOrder: 4,
  },
  {
    name: "Mr. Ketan Shah",
    designation: "Director",
    category: "director",
    image: "/images/board/ketan-shah.jpg",
    sortOrder: 5,
  },
  {
    name: "Mr. Rajesh Trivedi",
    designation: "Director",
    category: "director",
    image: "/images/board/rajesh-trivedi.jpg",
    sortOrder: 6,
  },
  {
    name: "Mr. Nitin Patel",
    designation: "Director",
    category: "director",
    image: "/images/board/nitin-patel.jpg",
    sortOrder: 7,
  },
  {
    name: "Mr. Kamlesh Patel",
    designation: "Co. Op. Director",
    category: "director",
    image: "/images/board/kamlesh-patel.jpg",
    sortOrder: 8,
  },
  {
    name: "Mr. Bhupendra Shah",
    designation: "Co. Op. Director",
    category: "director",
    image: "/images/board/bhupendra-shah.jpg",
    sortOrder: 9,
  },
  {
    name: "Mr. Harshad Trivedi",
    designation: "Sp. Invitee",
    category: "director",
    image: "/images/board/harshad-trivedi.jpg",
    sortOrder: 10,
  },
  {
    name: "Mr. Hemal Shah",
    designation: "Sp. Invitee",
    category: "director",
    image: "/images/board/hemal-shah.jpg",
    sortOrder: 11,
  },
  {
    name: "Mr. Amritlal Pandya",
    designation: "Sp. Invitee",
    category: "director",
    image: "/images/board/amritlal-pandya.jpg",
    sortOrder: 12,
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
