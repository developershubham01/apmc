export type Organization = {
  slug: string;
  name: string;
  shortName: string;
  role: string;
  designation: string;
  tagline: string;
  description: string;
  highlights: string[];
  focus: string[];
  image?: string;
  stats?: { value: string; label: string }[];
  established?: string;
};

export const organizations: Organization[] = [
  {
    slug: "navi-mumbai-merchants-chamber",
    name: "Navi Mumbai Merchants Chamber",
    shortName: "NMMC",
    role: "President / Chairman",
    designation: "Chairman",
    tagline: "Premier 30+ Year Old Association of Spice & Commodity Leaders",
    description:
      "Navi Mumbai Merchants Chamber is a 30+ year old apex representative body representing 400+ spice processors, spice specialists, exporters, wholesalers, distributors, retailers and cold chain owners operating across a dedicated 50-acre complex for domestic and international trade of spices and condiments.",
    stats: [
      { value: "30+ Years", label: "Heritage of Trade Leadership" },
      { value: "400+", label: "Spice & Condiment Specialists" },
      { value: "50 Acres", label: "Dedicated Trade Complex" },
      { value: "Global", label: "Domestic & Export Reach" },
    ],
    highlights: [
      "Dedicated 50-acre specialized trading & cold chain complex",
      "400+ member network of processors, exporters & wholesalers",
      "Official representation at state, national and international trade summits",
      "Continuous policy advocacy and merchant welfare initiatives",
    ],
    focus: [
      "Spice processing & trade",
      "Export facilitation",
      "Cold chain & logistics",
      "Policy representation",
    ],
    image: "/images/association/salient-features-merchants-chamber.jpg",
  },
  {
    slug: "cait-national-trade-board",
    name: "Confederation of All India Traders (CAIT)",
    shortName: "CAIT",
    role: "President / National Chairman",
    designation: "National Chairman",
    tagline: "Voice of 80 Million Indian Traders & Bharat Vyapar Mahotsav Organizer",
    description:
      "In leadership association with CAIT and the CAIT Research & Trade Development Society, Shri Kirti Rana actively steers major national initiatives including the landmark 'Bharatiya Vyapar Mahotsav 2026' (12-15 August 2026 at Bharat Mandapam, New Delhi) held in collaboration with ITPO.",
    stats: [
      { value: "CAIT", label: "National Apex Body" },
      { value: "2026", label: "Bharatiya Vyapar Mahotsav" },
      { value: "Bharat Mandapam", label: "Pragati Maidan, New Delhi" },
    ],
    highlights: [
      "Leadership in national trader welfare and policy development",
      "Core organizer of Bharatiya Vyapar Mahotsav 2026 at Bharat Mandapam",
      "Fostering 'Aatmanirbhar Bharat' & Made-in-India retail innovation",
      "High-level policy dialogue with central ministries and trade authorities",
    ],
    focus: [
      "Retail & wholesale policy",
      "National trade expos",
      "MSME financing & digitization",
      "Swadeshi trade promotion",
    ],
    image: "/images/events/bharatiya-vyapar-mahotsav-2026.jpg",
  },
  {
    slug: "bombay-mudibazar-kariana-merchants-association",
    name: "Bombay Mudibazar Kariana Merchants Association",
    shortName: "BMKMA",
    role: "Chairman",
    designation: "Chairman",
    tagline: "Representing the Historic Kariana Merchant Community of Mumbai",
    description:
      "Bombay Mudibazar Kariana Merchants Association represents the historic kariana (provisions, grains & grocery) wholesale merchant community. As Chairman, Kirti Rana leads the Association's efforts in safeguarding traditional merchant rights and fostering fair trade practices.",
    stats: [
      { value: "Mudibazar", label: "Historic Trade Hub" },
      { value: "100%", label: "Merchant Solidarity" },
    ],
    highlights: [
      "Kariana trade community representation across Mumbai & Maharashtra",
      "Fair trade practice advocacy & statutory compliance guidance",
      "Merchant networking, conflict resolution and solidarity",
      "Preservation of traditional merchant heritage and business values",
    ],
    focus: [
      "Kariana wholesale merchants",
      "Trade dispute mediation",
      "Community solidarity",
      "Heritage & values",
    ],
    image: "/images/awards/achievements-awards-record.jpg",
  },
  {
    slug: "bjp-vyapari-aghadi-maharashtra",
    name: "BJP Vyapari Aghadi Maharashtra Pradesh",
    shortName: "BJP Vyapari Aghadi",
    role: "State Leadership",
    designation: "Office Bearer / Leader",
    tagline: "Empowering Traders and Commerce Across Maharashtra",
    description:
      "Active in state-level commercial leadership with BJP Vyapari Aghadi Maharashtra Pradesh, facilitating dialogue between policymakers, trade bodies and local merchants to resolve regulatory and taxation bottlenecks.",
    highlights: [
      "State-wide trader representation and coordination",
      "Facilitating ease of doing business for traders across Maharashtra",
      "Regular coordination meetings with state and central leadership",
      "Advocacy for market yard infrastructure and merchant welfare funds",
    ],
    focus: [
      "Merchant policy advocacy",
      "Statewide trade coordination",
      "APMC reforms & welfare",
      "Commercial infrastructure",
    ],
    image: "/images/events/bjp-vyapari-aghadi-meeting.jpg",
  },
  {
    slug: "federation-of-associations-of-maharashtra",
    name: "Federation of Associations of Maharashtra (FAM)",
    shortName: "FAM",
    role: "Senior Trade Leader / Apex Council",
    designation: "Apex Council",
    tagline: "Apex Commercial Federation Representing 750+ Trade Bodies",
    description:
      "Federation of Associations of Maharashtra (FAM) is the premier umbrella body uniting over 750 trade and commercial associations representing over 1.5 million traders across Maharashtra. Shri Kirti Rana actively participates in state and national representations concerning GST simplification, local body taxes, and market regulation.",
    stats: [
      { value: "750+", label: "Affiliated Associations" },
      { value: "1.5M+", label: "Traders Represented" },
      { value: "Statewide", label: "Maharashtra Coverage" },
    ],
    highlights: [
      "Apex collective voice for wholesale and retail trade in Maharashtra",
      "High-level representations to State Finance Ministry and Central GST Council",
      "Unified coordination during market reforms and statutory disputes",
      "Promotion of commercial harmony and modern supply chain infrastructure",
    ],
    focus: [
      "Statewide commercial advocacy",
      "GST & regulatory compliance",
      "Trader grievance redressal",
      "Commercial consensus building",
    ],
    image: "/images/association/salient-features-merchants-chamber.jpg",
  },
  {
    slug: "grain-rice-oilseeds-merchants-association",
    name: "Grain, Rice & Oilseeds Merchants Association (GROMA)",
    shortName: "GROMA",
    role: "Senior Member & Advisor",
    designation: "Senior Advisor",
    tagline: "Premier Wholesale Grain & Agri-Commodity Association Established in 1947",
    description:
      "Established in 1947, GROMA represents the foundational grain, pulse, and edible oilseed merchants of Maharashtra. Operating prominently out of the Navi Mumbai APMC Grain Market, GROMA oversees daily wholesale auctions, supply stabilization, and farmer-to-merchant linkages across the country.",
    stats: [
      { value: "1947", label: "Year Established" },
      { value: "Market-II", label: "APMC Grain Complex" },
      { value: "National", label: "Grain Supply Network" },
    ],
    highlights: [
      "Over 75 years of continuous service to India's staple foodgrain trade",
      "Key stakeholder in APMC Market-II Grain & Pulse wholesale operations",
      "Collaborative policy initiatives ensuring national food security and price stability",
      "Robust merchant welfare, warehousing and transport facilitation",
    ],
    focus: [
      "Grain & pulse wholesale",
      "Edible oilseeds trade",
      "Market-II yard logistics",
      "Price stabilization & supply",
    ],
    image: "/images/apmc/grain-market.jpg",
  },
];

export const getOrganization = (slug: string) =>
  organizations.find((o) => o.slug === slug);
