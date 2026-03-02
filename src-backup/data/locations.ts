export type LocationItem = {
  slug: string;
  name: string;
};

export const locations: LocationItem[] = [
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
  { slug: "leicestershire", name: "Leicestershire" }
];

// Optional helper if you want name formatting fallback elsewhere
export function formatLocationNameFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
