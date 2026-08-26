// src/townConfig.ts

export interface TownData {
  name: string;
  phone: string;
  landmark: string;
  road: string;
  postcodes: string[];
  description: string;
  mapSrc: string;
  housingTypes: string[];
  commonProblems: string[];
  drainageTypes: string[];
  heatingTypes: string[];
  propertyAgeProfile: string;
  commercialAreas: string[];
  nearbyAreas: string[];
  nearbyVillages: string[];
  waterPressureNotes: string;
  soilType: string;
  floodRisk: string;
  insuranceNotes: string;
  typicalCallouts: string[];
  authorityParagraphs: string[];
  // === Advanced SEO & Schema Attributes ===
  metaTitle: string;
  metaDescription: string;
  geoCoordinates: { lat: number; lng: number };
  hubTown?: string;
  customFAQ: { question: string; answer: string }[];
}

const MAIN_MAP_LINK = "https://share.google/vCD4kQc8elUleD1EE";

// Postcode center coordinate lookup for Google Local Schema
const POSTCODE_COORDS: Record<string, { lat: number; lng: number }> = {
  "CV13": { lat: 52.6247, lng: -1.4014 },
  "LE67": { lat: 52.7233, lng: -1.3683 },
  "LE65": { lat: 52.7471, lng: -1.4721 },
  "LE11": { lat: 52.7721, lng: -1.2062 },
  "LE12": { lat: 52.7291, lng: -1.1492 },
  "LE6":  { lat: 52.6580, lng: -1.2290 },
  "LE3":  { lat: 52.6341, lng: -1.1891 },
  "DE14": { lat: 52.8061, lng: -1.6312 },
  "DE11": { lat: 52.7731, lng: -1.5591 },
  "DE73": { lat: 52.8391, lng: -1.4241 },
  "DE74": { lat: 52.8381, lng: -1.3391 },
  "B77":  { lat: 52.6181, lng: -1.6691 },
  "DE12": { lat: 52.7121, lng: -1.5421 }
};

// Deterministic hash helper to vary paragraph templates without content duplication flags
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildTown(
  data: Partial<TownData> & { name: string; phone: string; landmark: string; road: string; postcodes: string[] }
): TownData {
  const primaryPostcode = data.postcodes[0] ? data.postcodes[0].split(" ")[0] : "CV13";
  const housingStr = data.housingTypes ? data.housingTypes[0].toLowerCase() : "mix of residential properties";
  const problemStr = data.commonProblems ? data.commonProblems[0].toLowerCase() : "emergency boiler lockouts and main drain blockages";
  const heatingStr = data.heatingTypes ? data.heatingTypes[0].toLowerCase() : "gas combi and unvented heating systems";
  const soilStr = data.soilType ? data.soilType.toLowerCase() : "heavy local clay ground structures";
  const hubName = data.hubTown || "Market Bosworth";

  // Compute Geo Coordinates
  const coords = POSTCODE_COORDS[primaryPostcode] || { lat: 52.6247, lng: -1.4014 };

  // SEO Metadata Generators
  const metaTitle = data.metaTitle || `24/7 Emergency Plumber in ${data.name} (${data.postcodes.join(', ')}) | 30-60 Min Arrival`;
  const metaDescription = data.metaDescription || `Local 24/7 emergency plumbing & drainage services in ${data.name}. Rapid response for burst pipes, blocked toilets & boiler failures. Call ${data.phone} now.`;

  // Content Variation Generator (rotates between 3 distinct paragraph styles to prevent duplicate pattern footprint)
  const templateVariant = hashString(data.name) % 3;
  let defaultParagraphs: string[] = [];

  if (templateVariant === 0) {
    defaultParagraphs = [
      `Our 24/7 emergency response units operate continuously across ${data.name}, specifically equipped to address the structural demands of the local network. With a high density of ${housingStr} situated along ${data.road} and neighboring streets, our engineers frequently resolve acute faults such as ${problemStr}.`,
      `We maintain rapid dispatch windows throughout the ${data.postcodes[0]} area by stationing mobile engineering teams near ${data.landmark}. Whether handling system pressure drops in ${heatingStr} or unblocking subsoil lines affected by ${soilStr}, our teams deliver permanent isolation and repair solutions.`
    ];
  } else if (templateVariant === 1) {
    defaultParagraphs = [
      `When urgent plumbing or drainage failures occur in ${data.name}, local residents benefit from our direct rapid-deployment service. Operating routinely past ${data.landmark}, our vans carry full inventory to resolve ${problemStr} on the first visit across ${data.road} and surrounding developments.`,
      `Properties within the ${data.postcodes.join('/')} sector feature a diverse operational mix of ${housingStr}. Ground shifts caused by ${soilStr} often compromise underground drainage—our team uses non-destructive high-pressure water jetting and CCTV surveying to restore full flow capacity.`
    ];
  } else {
    defaultParagraphs = [
      `Securing fast emergency plumbing coverage in ${data.name} is essential when facing sudden pipe ruptures or drainage backups. Our G3-certified engineers cover the ${data.postcodes[0]} district around the clock, prioritizing urgent callouts near ${data.landmark} and the broader ${data.road} corridor.`,
      `Due to local conditions characterized by ${soilStr}, infrastructure in ${data.name} requires precise diagnostic care. From resolving limescale scaling in modern ${heatingStr} to clear severe blockage points in ${housingStr}, we guarantee 60-minute emergency arrival times.`
    ];
  }

  // Schema FAQ generator
  const defaultFAQ = [
    {
      question: `How fast can an emergency plumber arrive in ${data.name}?`,
      answer: `We maintain active response units near ${data.landmark}, allowing an average arrival time of 30 to 60 minutes for emergency callouts across ${data.name} and the ${data.postcodes.join(', ')} postcode area.`
    },
    {
      question: `Do you provide 24/7 drain jetting and toilet unblocking in ${data.name}?`,
      answer: `Yes. Our engineers carry high-pressure jetting units and specialized CCTV drain inspection cameras to clear severe main drain blockages, blocked toilets, and root ingress instantly.`
    }
  ];

  return {
    name: data.name,
    phone: data.phone,
    landmark: data.landmark,
    road: data.road,
    postcodes: data.postcodes,
    description: data.description || `24/7 emergency plumbing, heating, and drainage services across ${data.name} (${data.postcodes.join(', ')}). Rapid 30-60 minute local deployment.`,
    mapSrc: data.mapSrc || MAIN_MAP_LINK,
    housingTypes: data.housingTypes || ["Victorian Terraces", "Suburban Semi-Detached Properties", "Modern Housing Developments"],
    commonProblems: data.commonProblems || ["Hard water limescale scaling", "Boiler baseline pressure loss", "Blocked localized external grid networks"],
    drainageTypes: data.drainageTypes || ["Vitrified Clay Infrastructure Tracks", "Modern High-Flow PVC Radial Systems"],
    heatingTypes: data.heatingTypes || ["High-Efficiency Condensing Combi Boilers", "Traditional Flow Unvented Systems"],
    propertyAgeProfile: data.propertyAgeProfile || "Mixed residential stock spanning historic cores to late-20th-century expansions.",
    commercialAreas: data.commercialAreas || [`${data.name} High Street Outlets`, "Local Corporate Trade Hubs"],
    nearbyAreas: data.nearbyAreas || [hubName, "Surrounding District Commuter Arteries"],
    nearbyVillages: data.nearbyVillages || ["market-bosworth", "barlestone", "stoke-golding", "twycross"],
    waterPressureNotes: data.waterPressureNotes || "Maintains high baseline structural parameters across the central sector.",
    soilType: data.soilType || "Heavy localized clay structures.",
    floodRisk: data.floodRisk || "Low overall risk profile.",
    insuranceNotes: data.insuranceNotes || "Trace and access tracking documentation provided seamlessly for policy validation.",
    typicalCallouts: data.typicalCallouts || ["Emergency fluid isolation", "Main structural drain descaling", "Combi boiler flame diagnostics"],
    authorityParagraphs: data.authorityParagraphs || defaultParagraphs,
    metaTitle,
    metaDescription,
    geoCoordinates: data.geoCoordinates || coords,
    hubTown: hubName,
    customFAQ: data.customFAQ || defaultFAQ
  };
}

export const towns: Record<string, TownData> = {
  // =========================================================
  // === CV13 MARKET BOSWORTH & WEST LEICESTERSHIRE CORE =====
  // =========================================================
  'market-bosworth': buildTown({
    name: "Market Bosworth", phone: "01455 244 706", landmark: "Bosworth Country Park", road: "The Square", postcodes: ["CV13 0"],
    metaTitle: "24/7 Emergency Plumber Market Bosworth (CV13) | 30-Min Response",
    metaDescription: "Emergency plumbing & drainage specialist in Market Bosworth. Boiler repairs, blocked drains & pipe bursts cleared 24/7. Call 01455 244 706.",
    geoCoordinates: { lat: 52.6247, lng: -1.4014 },
    nearbyVillages: ["barlestone", "stoke-golding", "twycross", "cadeby", "carlton", "congerstone", "shenton", "sutton-cheney"],
    authorityParagraphs: [
      "Market Bosworth's rich architectural heritage features a dense mix of listed Georgian and Victorian properties centered around The Square. Plumbing works in this historic core require non-invasive diagnostic equipment to preserve structural integrity while rectifying low pressure and aged unvented systems.",
      "With heavy clay subsoil across the CV13 0 area, properties frequently experience ground-movement fractures in older clay soil stacks. Our local engineers maintain fully equipped response vehicles stationed near Bosworth Country Park for immediate 60-minute emergency turnarounds."
    ]
  }),
  'barlestone': buildTown({ name: "Barlestone", phone: "01455 244 706", landmark: "St Giles Church", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'stoke-golding': buildTown({ name: "Stoke Golding", phone: "01455 244 706", landmark: "St Margaret's Church", road: "High Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'twycross': buildTown({ name: "Twycross", phone: "01455 244 706", landmark: "Twycross Zoo", road: "Burton Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'higham-on-the-hill': buildTown({ name: "Higham on the Hill", phone: "01455 244 706", landmark: "St Peter's Church", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'barton-in-the-beans': buildTown({ name: "Barton in the Beans", phone: "01455 244 706", landmark: "The Baptist Chapel", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'bilstone': buildTown({ name: "Bilstone", phone: "01455 244 706", landmark: "Bilstone House", road: "Gibbet Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'cadeby': buildTown({ name: "Cadeby", phone: "01455 244 706", landmark: "Cadeby Hall", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'carlton': buildTown({ name: "Carlton", phone: "01455 244 706", landmark: "The Gate Hangs Well", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'congerstone': buildTown({ name: "Congerstone", phone: "01455 244 706", landmark: "The Horse & Jockey", road: "Shadowlane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'dadlington': buildTown({ name: "Dadlington", phone: "01455 244 706", landmark: "The Dog & Hedgehog", road: "The Green", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'fenny-drayton': buildTown({ name: "Fenny Drayton", phone: "01455 244 706", landmark: "George Fox Monument", road: "Drayton Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'nailstone': buildTown({ name: "Nailstone", phone: "01455 244 706", landmark: "All Saints Church", road: "Rectory Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'odstone': buildTown({ name: "Odstone", phone: "01455 244 706", landmark: "Odstone Hall", road: "Rayns Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'osbaston': buildTown({ name: "Osbaston", phone: "01455 244 706", landmark: "Osbaston Hall", road: "Lount Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'shackerstone': buildTown({ name: "Shackerstone", phone: "01455 244 706", landmark: "Battle of Bosworth Railway", road: "Station Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'sheepy-magna': buildTown({ name: "Sheepy Magna", phone: "01455 244 706", landmark: "The Black Horse", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'sheepy-parva': buildTown({ name: "Sheepy Parva", phone: "01455 244 706", landmark: "Sheepy Mill", road: "Twycross Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'shenton': buildTown({ name: "Shenton", phone: "01455 244 706", landmark: "Bosworth Battlefield Heritage Centre", road: "Mill Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'sutton-cheney': buildTown({ name: "Sutton Cheney", phone: "01455 244 706", landmark: "Hercules Revived", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'upton': buildTown({ name: "Upton", phone: "01455 244 706", landmark: "Upton House", road: "A444", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'wellsborough': buildTown({ name: "Wellsborough", phone: "01455 244 706", landmark: "Wellsborough Hall", road: "Bosworth Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  'witherley': buildTown({ name: "Witherley", phone: "01455 244 706", landmark: "The Blue Lion", road: "Post Office Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),

  // ==========================================
  // === 01530 TRADITIONAL HOME CORE (NW LEICS) ===
  // ==========================================
  'coalville': buildTown({
    name: "Coalville", phone: "01530 654062", landmark: "the Clock Tower", road: "Memorial Square", postcodes: ["LE67 3", "LE67 4"],
    authorityParagraphs: [
      "Coalville's infrastructure presents a unique challenge due to its mining heritage. The ground movement over decades has left many older clay drainage systems vulnerable to hairline fractures, particularly in the Victorian terraces surrounding the town centre.",
      "In the LE67 3 and LE67 4 postcodes, we frequently encounter mixed plumbing systems where modern internal renovations meet original external cast iron stacks. Our engineers operate daily along the Memorial Square axis, ensuring rapid, zero-delay callouts."
    ]
  }),
  'ashby-de-la-zouch': buildTown({
    name: "Ashby de la Zouch", phone: "01530 654062", landmark: "Ashby Castle", road: "Market Street", postcodes: ["LE65 1", "LE65 2"],
    authorityParagraphs: [
      "Ashby de la Zouch requires a delicate approach to plumbing, particularly within the conservation area near the Castle. Many properties here utilize complex unvented hot water systems to cope with high demand, requiring our G3-qualified engineers.",
      "The water hardness levels in Ashby are noticeably higher than in surrounding villages. We frequently install scale reducers and powerflush heating systems along Market Street to combat the calcification that damages heat exchangers."
    ]
  }),
  'ibstock': buildTown({
    name: "Ibstock", phone: "01530 654062", landmark: "Sence Valley Forest Park", road: "Melbourne Road", postcodes: ["LE67 6"],
    authorityParagraphs: [
      "Ibstock's plumbing infrastructure is heavily influenced by the local clay soil, which is famous for brick-making. This heavy soil type often leads to ground shifting that can misalign older clay drainage pipes, a common issue we resolve near Melbourne Road.",
      "We see a high volume of boiler upgrades in the 1960s semi-detached housing stock that typifies the area, alongside providing rapid isolation for new housing developments near Sence Valley."
    ]
  }),
  'whitwick': buildTown({
    name: "Whitwick", phone: "01530 654062", landmark: "The Black Horse", road: "City of Dan", postcodes: ["LE67 5"],
    authorityParagraphs: [
      "Whitwick's unique topography, sitting on the edge of the Charnwood Forest granite, creates specific plumbing challenges. The steep gradient of streets like City of Dan results in exceptionally high water pressure in lower properties, often necessitating Pressure Reducing Valves (PRVs).",
      "The older stone cottages near the Black Horse often suffer from frozen external pipes due to their exposed position. We frequently upgrade insulation on condensate pipes throughout LE67 5."
    ]
  }),
  'measham': buildTown({
    name: "Measham", phone: "01530 654062", landmark: "The Library", road: "High Street", postcodes: ["DE12 7"],
    authorityParagraphs: [
      "Measham serves as a bridge between the industrial heritage of the Midlands and the rural National Forest. This mix sees our engineers attending complex commercial heating failures in the Westminster Industrial Estate as often as residential leaks on the High Street.",
      "With a high density of rental properties in the town centre, we provide rapid legionella checks and tenant emergency response services, ensuring DE12 7 properties remain compliant and safe."
    ]
  }),
  'markfield': buildTown({
    name: "Markfield", phone: "01530 654062", landmark: "Hill Hole Quarry", road: "Main Street", postcodes: ["LE67 9"],
    authorityParagraphs: [
      "Markfield's elevated position near Hill Hole Quarry means properties here are exposed to colder ambient temperatures, increasing the risk of loft pipe freezing. We strongly recommend upgraded lagging for all roof-space plumbing in LE67 9.",
      "The 1970s estates off Main Street are reaching the age where galvanized steel pipework requires replacement. We specialize in system upgrades that respect the existing fabric of these buildings."
    ]
  }),
  'shepshed': buildTown({
    name: "Shepshed", phone: "01509 642158", landmark: "St Botolph's Church", road: "Market Place", postcodes: ["LE12 9"],
    authorityParagraphs: [
      "Positioned along the A512 corridor between Coalville and Loughborough, Shepshed features a wide blend of older framework-knitting cottages and newer residential estates off Hathern Road. Our engineers provide rapid 30-60 minute callouts across LE12 9 for sudden combi boiler failures and mains pressure drops.",
      "With heavy clay soil leading to subsoil movement, we frequently resolve blocked external drains and misaligned pipe joints across Shepshed using high-pressure water jetting and precision CCTV drainage surveys."
    ]
  }),
  'castle-donington': buildTown({
    name: "Castle Donington", phone: "01509 642158", landmark: "Donington Park", road: "High Street", postcodes: ["DE74 2"],
    authorityParagraphs: [
      "Castle Donington requires specialized plumbing support spanning both historic hillside residences and major logistics hubs around the East Midlands Airport corridor. Our commercial and domestic emergency units are stationed minutes away for round-the-clock burst pipe isolation and drainage clearing.",
      "Properties around the High Street and Borough Street often feature traditional vented heating cylinders. We regularly perform conversions to high-efficiency combi units alongside emergency leak detection."
    ]
  }),

  // ==========================================
  // === 01509 LOUGHBOROUGH REGIONAL AREA =====
  // ==========================================
  'loughborough': buildTown({
    name: "Loughborough", phone: "01509 642158", landmark: "Loughborough University", road: "Market Place", postcodes: ["LE11"],
    authorityParagraphs: [
      "As a major university town, Loughborough's plumbing infrastructure is heavily focused on high-density HMOs (Houses in Multiple Occupation). Our engineers frequently upgrade multi-bathroom water pressure systems and handle rapid-response boiler lockouts across the LE11 student corridors.",
      "From commercial retail unblocking in the Market Place to maintaining traditional heating systems in the Victorian terraces of the Golden Triangle, we position fully stocked vans centrally for 60-minute emergency turnarounds."
    ]
  }),
  'quorn': buildTown({ name: "Quorn", phone: "01509 447469", landmark: "Great Central Railway", road: "High Street", postcodes: ["LE12"] }),
  'groby': buildTown({ name: "Groby", phone: "01164 105069", landmark: "Groby Pool", road: "Leicester Road", postcodes: ["LE6"] }),
  'glenfield': buildTown({ name: "Glenfield", phone: "01164 105069", landmark: "Leicestershire County Council HQ", road: "Station Road", postcodes: ["LE3"] }),
  'burton-upon-trent': buildTown({ name: "Burton upon Trent", phone: "01283 890215", landmark: "The National Brewery Centre", road: "High Street", postcodes: ["DE14"] }),
  'swadlincote': buildTown({ name: "Swadlincote", phone: "01283 890215", landmark: "Swadlincote Ski Centre", road: "High Street", postcodes: ["DE11"] }),
  'melbourne': buildTown({ name: "Melbourne", phone: "01332 806148", landmark: "Melbourne Hall", road: "High Street", postcodes: ["DE73"] }),
  'tamworth': buildTown({ name: "Tamworth", phone: "01827 802163", landmark: "Tamworth Castle", road: "Market Street", postcodes: ["B77", "B78", "B79"] }),

  // =========================================================
  // VILLAGES & LOCAL DISTRICT EXPANSIONS
  // =========================================================
  'albert-village': buildTown({ name: "Albert Village", phone: "01530 654062", landmark: "Albert Village Lake", road: "Occupation Road", postcodes: ["DE11"] }),
  'appleby-magna': buildTown({ name: "Appleby Magna", phone: "01530 654062", landmark: "Sir John Moore Foundation", road: "Top Street", postcodes: ["DE12 7"] }),
  'appleby-parva': buildTown({ name: "Appleby Parva", phone: "01530 654062", landmark: "Appleby Inn", road: "A444", postcodes: ["DE12 7"] }),
  'bagworth': buildTown({ name: "Bagworth", phone: "01530 654062", landmark: "Bagworth Heath Woods", road: "Station Road", postcodes: ["LE67 1"] }),
  'bardon-hill': buildTown({ name: "Bardon Hill", phone: "01530 654062", landmark: "Bardon Truck Park", road: "Beveridge Lane", postcodes: ["LE67 1"] }),
  'battram': buildTown({ name: "Battram", phone: "01530 654062", landmark: "Battram Woods", road: "Wood Road", postcodes: ["LE67"] }),
  'belton': buildTown({ name: "Belton", phone: "01530 654062", landmark: "The George Hotel", road: "Market Place", postcodes: ["LE12 9"] }),
  'blackfordby': buildTown({ name: "Blackfordby", phone: "01530 654062", landmark: "The Black Lion", road: "Main Street", postcodes: ["DE11 8"] }),
  'boundary': buildTown({ name: "Boundary", phone: "01530 654062", landmark: "Ashby Road", road: "Ashby Road", postcodes: ["DE11"] }),
  'breedon-on-the-hill': buildTown({ name: "Breedon on the Hill", phone: "01530 654062", landmark: "The Priory Church", road: "Ashby Road", postcodes: ["DE73"] }),
  'castle-gresley': buildTown({ name: "Castle Gresley", phone: "01283 890215", landmark: "Gresley Old Hall", road: "Burton Road", postcodes: ["DE11 9"] }),
  'charley': buildTown({ name: "Charley", phone: "01530 654062", landmark: "Mount St Bernard Abbey", road: "Abbey Road", postcodes: ["LE67 4"] }),
  'church-gresley': buildTown({ name: "Church Gresley", phone: "01283 890215", landmark: "Maurice Lea Memorial Park", road: "Market Street", postcodes: ["DE11 9"] }),
  'coleorton': buildTown({ name: "Coleorton", phone: "01530 654062", landmark: "Coleorton Hall", road: "The Moorlands", postcodes: ["LE67 8"] }),
  'copt-oak': buildTown({ name: "Copt Oak", phone: "01530 654062", landmark: "The Copt Oak Pub", road: "Whitwick Road", postcodes: ["LE67"] }),
  'diseworth': buildTown({ name: "Diseworth", phone: "01509 642158", landmark: "Diseworth Heritage Centre", road: "Hall Gate", postcodes: ["DE74 2"] }),
  'donington-le-heath': buildTown({ name: "Donington le Heath", phone: "01530 654062", landmark: "The Manor House", road: "Manor Road", postcodes: ["LE67 2"] }),
  'donisthorpe': buildTown({ name: "Donisthorpe", phone: "01530 654062", landmark: "Donisthorpe Woodland Park", road: "Church Street", postcodes: ["DE12"] }),
  'ellistown': buildTown({ name: "Ellistown", phone: "01530 654062", landmark: "South Leicestershire College", road: "Beveridge Lane", postcodes: ["LE67 1"] }),
  'griffydam': buildTown({ name: "Griffydam", phone: "01530 654062", landmark: "The Griffin Inn", road: "Top Road", postcodes: ["LE67 8"] }),
  'hartshorne': buildTown({ name: "Hartshorne", phone: "01283 890215", landmark: "The Admiral Rodney", road: "Main Street", postcodes: ["DE11 7"] }),
  'hathern': buildTown({ name: "Hathern", phone: "01509 642158", landmark: "The Anchor Inn", road: "Loughborough Road", postcodes: ["LE12 5"] }),
  'heather': buildTown({ name: "Heather", phone: "01530 654062", landmark: "Sence Valley", road: "Swepstone Road", postcodes: ["LE67 6"] }),
  'hemington': buildTown({ name: "Hemington", phone: "01509 642158", landmark: "Hemington Primary School", road: "Main Street", postcodes: ["DE74 2"] }),
  'hugglescote': buildTown({ name: "Hugglescote", phone: "01530 654062", landmark: "The Gate Inn", road: "Ashby Road", postcodes: ["LE67 2"] }),
  'isley-walton': buildTown({ name: "Isley Walton", phone: "01509 642158", landmark: "All Saints Church", road: "Melbourne Road", postcodes: ["DE74 2"] }),
  'kegworth': buildTown({ name: "Kegworth", phone: "01509 642158", landmark: "Kegworth Village Hall", road: "High Street", postcodes: ["DE74 2"] }),
  'leicestershire': buildTown({ name: "Leicestershire", phone: "01530 654062", landmark: "Charnwood Forest", road: "The M1 Corridor", postcodes: ["LE"] }),
  'linton': buildTown({ name: "Linton", phone: "01283 890215", landmark: "The Brickmakers Arms", road: "Main Street", postcodes: ["DE12 6"] }),
  'lockington': buildTown({ name: "Lockington", phone: "01509 642158", landmark: "St Nicholas Church", road: "Main Street", postcodes: ["DE74 2"] }),
  'long-whatton': buildTown({ name: "Long Whatton", phone: "01509 642158", landmark: "The Falcon Inn", road: "Main Street", postcodes: ["LE12 5"] }),
  'lount': buildTown({ name: "Lount", phone: "01530 654062", landmark: "The Ferrers Arms", road: "Nottingham Road", postcodes: ["LE65 1"] }),
  'moira': buildTown({ name: "Moira", phone: "01530 654062", landmark: "Moira Furnace", road: "Ashby Road", postcodes: ["DE12 6"] }),
  'netherseal': buildTown({ name: "Netherseal", phone: "01283 890215", landmark: "The Seal Inn", road: "Main Street", postcodes: ["DE12 8"] }),
  'newbold-coleorton': buildTown({ name: "Newbold Coleorton", phone: "01530 654062", landmark: "The Cross Keys", road: "Ashby Road", postcodes: ["LE67 8"] }),
  'normanton-le-heath': buildTown({ name: "Normanton le Heath", phone: "01530 654062", landmark: "The Packington Border", road: "Ashby Road", postcodes: ["LE67 2"] }),
  'oakthorpe': buildTown({ name: "Oakthorpe", phone: "01530 654062", landmark: "The Holly Bush", road: "Measham Road", postcodes: ["DE12"] }),
  'osgathorpe': buildTown({ name: "Osgathorpe", phone: "01530 654062", landmark: "St Mary's Church", road: "Ashby Road", postcodes: ["LE12"] }),
  'overseal': buildTown({ name: "Overseal", phone: "01283 890215", landmark: "The Robin Hood Inn", road: "Burton Road", postcodes: ["DE12 6"] }),
  'packington': buildTown({ name: "Packington", phone: "01530 654062", landmark: "The Bull & Lion", road: "High Street", postcodes: ["LE65 1"] }),
  'peggs-green': buildTown({ name: "Peggs Green", phone: "01530 654062", landmark: "The New Inn", road: "Nottingham Road", postcodes: ["LE67 8"] }),
  'ravenstone': buildTown({ name: "Ravenstone", phone: "01530 654062", landmark: "The Kings Arms", road: "Beeswax Lane", postcodes: ["LE67 2"] }),
  'shellbrook': buildTown({ name: "Shellbrook", phone: "01530 654062", landmark: "Ashby Road", road: "Ashby Road", postcodes: ["LE65"] }),
  'sinope': buildTown({ name: "Sinope", phone: "01530 654062", landmark: "The Moorlands", road: "A511", postcodes: ["LE67"] }),
  'snibston': buildTown({ name: "Snibston", phone: "01530 654062", landmark: "Snibston Colliery Park", road: "Chiswell Drive", postcodes: ["LE67 3"] }),
  'stanton-under-bardon': buildTown({ name: "Stanton under Bardon", phone: "01530 654062", landmark: "The Plough Inn", road: "Main Street", postcodes: ["LE67 9"] }),
  'staunton-harold': buildTown({ name: "Staunton Harold", phone: "01530 654062", landmark: "Staunton Harold Hall", road: "The Drive", postcodes: ["LE65"] }),
  'swannington': buildTown({ name: "Swannington", phone: "01530 654062", landmark: "Hough Mill", road: "Main Street", postcodes: ["LE67 8"] }),
  'thringstone': buildTown({ name: "Thringstone", phone: "01530 654062", landmark: "Grace Dieu Priory", road: "Loughborough Road", postcodes: ["LE67 8"] }),
  'ticknall': buildTown({ name: "Ticknall", phone: "01332 806148", landmark: "Calke Abbey", road: "Main Street", postcodes: ["DE73 7"] }),
  'tonge': buildTown({ name: "Tonge", phone: "01530 654062", landmark: "Breedon Priory Golf Club", road: "Tonge Station Road", postcodes: ["DE73 8"] }),
  'willesley': buildTown({ name: "Willesley", phone: "01530 654062", landmark: "Willesley Park Golf Club", road: "Willesley Road", postcodes: ["LE65 2"] }),
  'wilson': buildTown({ name: "Wilson", phone: "01530 654062", landmark: "The Bulls Head", road: "Main Street", postcodes: ["DE73"] }),
  'woodville': buildTown({ name: "Woodville", phone: "01283 890215", landmark: "Woodville Clock Tower", road: "High Street", postcodes: ["DE11 7"] }),
  'worthington': buildTown({ name: "Worthington", phone: "01530 654062", landmark: "The Malt Shovel", road: "Main Street", postcodes: ["LE65 1"] })
};

// =========================================================
// === HELPER EXPORTS FOR PAGE RENDERING & SCHEMA GENERATION
// =========================================================

/**
 * Returns JSON-LD Schema.org object for Google Local Business indexing
 */
export function generateLocalBusinessSchema(town: TownData, siteDomain: string = "https://rkm247.co.uk") {
  return {
    "@context": "https://schema.org",
    "@type": ["Plumber", "EmergencyService"],
    "name": `Emergency Plumbing & Drainage ${town.name}`,
    "url": `${siteDomain}/${town.name.toLowerCase().replace(/\s+/g, '-')}`,
    "telephone": town.phone,
    "priceRange": "££",
    "openingHours": "Mo-Su 00:00-23:59",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": town.geoCoordinates.lat,
      "longitude": town.geoCoordinates.lng
    },
    "areaServed": town.postcodes.map(pc => ({
      "@type": "AdministrativeArea",
      "name": `${town.name} (${pc})`
    })),
    "description": town.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": town.name,
      "addressRegion": "Leicestershire",
      "addressCountry": "GB"
    }
  };
}

/**
 * Quick accessor for Next.js / React page meta tags
 */
export function getTownSEO(slug: string) {
  const town = towns[slug];
  if (!town) return null;
  return {
    title: town.metaTitle,
    description: town.metaDescription,
    canonical: `/${slug}`,
    schema: generateLocalBusinessSchema(town)
  };
}