export type LocationItem = {
  slug: string;
  name: string;
};

export const locations: LocationItem[] = [
  // --- Core & Surrounding Leicestershire Locations ---
  { slug: "coalville", name: "Coalville" },
  { slug: "ashby-de-la-zouch", name: "Ashby-de-la-Zouch" },
  { slug: "ibstock", name: "Ibstock" },
  { slug: "whitwick", name: "Whitwick" },
  { slug: "measham", name: "Measham" },
  { slug: "shepshed", name: "Shepshed" },
  { slug: "hugglescote", name: "Hugglescote" },
  { slug: "thringstone", name: "Thringstone" },
  { slug: "swannington", name: "Swannington" },
  { slug: "ravenstone", name: "Ravenstone" },
  { slug: "ellistown", name: "Ellistown" },
  { slug: "donington-le-heath", name: "Donington le Heath" },
  { slug: "bardon-hill", name: "Bardon Hill" },
  { slug: "markfield", name: "Markfield" },
  { slug: "heather", name: "Heather" },
  { slug: "normanton-le-heath", name: "Normanton le Heath" },
  { slug: "packington", name: "Packington" },
  { slug: "willesley", name: "Willesley" },
  { slug: "worthington", name: "Worthington" },
  { slug: "newbold-coleorton", name: "Newbold Coleorton" },
  { slug: "coleorton", name: "Coleorton" },
  { slug: "griffydam", name: "Griffydam" },
  { slug: "peggs-green", name: "Peggs Green" },
  { slug: "moira", name: "Moira" },
  { slug: "donisthorpe", name: "Donisthorpe" },
  { slug: "albert-village", name: "Albert Village" },
  { slug: "oakthorpe", name: "Oakthorpe" },
  { slug: "breedon-on-the-hill", name: "Breedon-on-the-Hill" },
  { slug: "osgathorpe", name: "Osgathorpe" },
  { slug: "belton", name: "Belton" },
  { slug: "bagworth", name: "Bagworth" },
  { slug: "battram", name: "Battram" },
  { slug: "blackfordby", name: "Blackfordby" },
  { slug: "boundary", name: "Boundary" },
  { slug: "copt-oak", name: "Copt Oak" },
  { slug: "lount", name: "Lount" },
  { slug: "shellbrook", name: "Shellbrook" },
  { slug: "sinope", name: "Sinope" },
  { slug: "snibston", name: "Snibston" },
  { slug: "stanton-under-bardon", name: "Stanton under Bardon" },
  { slug: "staunton-harold", name: "Staunton Harold" },
  { slug: "wilson", name: "Wilson" },
  { slug: "leicestershire", name: "Leicestershire" },

  // --- Market Bosworth & West Leicestershire ---
  { slug: "market-bosworth", name: "Market Bosworth" },
  { slug: "barlestone", name: "Barlestone" },
  { slug: "stoke-golding", name: "Stoke Golding" },
  { slug: "twycross", name: "Twycross" },
  { slug: "higham-on-the-hill", name: "Higham on the Hill" },
  { slug: "barton-in-the-beans", name: "Barton in the Beans" },
  { slug: "bilstone", name: "Bilstone" },
  { slug: "cadeby", name: "Cadeby" },
  { slug: "carlton", name: "Carlton" },
  { slug: "congerstone", name: "Congerstone" },
  { slug: "dadlington", name: "Dadlington" },
  { slug: "fenny-drayton", name: "Fenny Drayton" },
  { slug: "nailstone", name: "Nailstone" },
  { slug: "odstone", name: "Odstone" },
  { slug: "osbaston", name: "Osbaston" },
  { slug: "shackerstone", name: "Shackerstone" },
  { slug: "sheepy-magna", name: "Sheepy Magna" },
  { slug: "sheepy-parva", name: "Sheepy Parva" },
  { slug: "shenton", name: "Shenton" },
  { slug: "sutton-cheney", name: "Sutton Cheney" },
  { slug: "upton", name: "Upton" },
  { slug: "wellsborough", name: "Wellsborough" },
  { slug: "witherley", name: "Witherley" },

  // --- Charnwood, Loughborough & M1 North Corridor ---
  { slug: "loughborough", name: "Loughborough" },
  { slug: "castle-donington", name: "Castle Donington" },
  { slug: "kegworth", name: "Kegworth" },
  { slug: "diseworth", name: "Diseworth" },
  { slug: "hemington", name: "Hemington" },
  { slug: "isley-walton", name: "Isley Walton" },
  { slug: "lockington", name: "Lockington" },
  { slug: "long-whatton", name: "Long Whatton" },
  { slug: "charley", name: "Charley" },
  { slug: "hathern", name: "Hathern" },
  { slug: "tonge", name: "Tonge" },
  { slug: "quorn", name: "Quorn" },
  { slug: "groby", name: "Groby" },
  { slug: "glenfield", name: "Glenfield" },

  // --- South Derbyshire & SW Borders ---
  { slug: "swadlincote", name: "Swadlincote" },
  { slug: "church-gresley", name: "Church Gresley" },
  { slug: "castle-gresley", name: "Castle Gresley" },
  { slug: "woodville", name: "Woodville" },
  { slug: "hartshorne", name: "Hartshorne" },
  { slug: "linton", name: "Linton" },
  { slug: "overseal", name: "Overseal" },
  { slug: "netherseal", name: "Netherseal" },
  { slug: "appleby-magna", name: "Appleby Magna" },
  { slug: "appleby-parva", name: "Appleby Parva" },
  { slug: "ticknall", name: "Ticknall" },
  { slug: "melbourne", name: "Melbourne" },
  { slug: "burton-upon-trent", name: "Burton upon Trent" },
  { slug: "tamworth", name: "Tamworth" }
];

// Optional helper if you want name formatting fallback elsewhere
export function formatLocationNameFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}