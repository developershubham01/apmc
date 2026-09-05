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
  established?: string;
};

export const organizations: Organization[] = [
  {
    slug: "navi-mumbai-merchants-chamber",
    name: "Navi Mumbai Merchants Chamber",
    shortName: "NMMC",
    role: "Chairman",
    designation: "Chairman",
    tagline: "Voice of Navi Mumbai's Business & Merchant Community",
    description:
      "Navi Mumbai Merchants Chamber is a representative body of the trading and merchant community of Navi Mumbai. Under the chairmanship of Kirti Rana, the Chamber works towards the welfare, representation and development of merchants and enterprises associated with the region's commercial ecosystem, including the APMC market at Turbhe.",
    highlights: [
      "Representation of merchant interests",
      "Engagement with civic & market authorities",
      "Business development & networking",
      "Community welfare initiatives",
    ],
    focus: [
      "Merchant welfare",
      "Policy representation",
      "Trade facilitation",
      "Community development",
    ],
    image: "/images/organizations/nmmc.jpg",
  },
  {
    slug: "bombay-mudibazar-kariana-merchants-association",
    name: "Bombay Mudibazar Kariana Merchants Association",
    shortName: "BMKMA",
    role: "Chairman",
    designation: "Chairman",
    tagline: "Representing the Kariana Merchant Community of Bombay",
    description:
      "Bombay Mudibazar Kariana Merchants Association represents the kariana (provisions & grocery) merchant community. As Chairman, Kirti Rana leads the Association's efforts in safeguarding the interests of traders, fostering fair trade practices and strengthening the traditional merchant community network.",
    highlights: [
      "Kariana trade community representation",
      "Fair trade practice advocacy",
      "Merchant networking & support",
      "Preservation of merchant heritage",
    ],
    focus: [
      "Kariana merchants",
      "Trade advocacy",
      "Community solidarity",
      "Heritage & values",
    ],
    image: "/images/organizations/bmkma.jpg",
  },
];

export const getOrganization = (slug: string) =>
  organizations.find((o) => o.slug === slug);
