const g = "https://share.google/vCD4kQc8elUleD1EE", y = {
  CV13: { lat: 52.6247, lng: -1.4014 },
  LE67: { lat: 52.7233, lng: -1.3683 },
  LE65: { lat: 52.7471, lng: -1.4721 },
  LE11: { lat: 52.7721, lng: -1.2062 },
  LE12: { lat: 52.7291, lng: -1.1492 },
  LE6: { lat: 52.658, lng: -1.229 },
  LE3: { lat: 52.6341, lng: -1.1891 },
  DE14: { lat: 52.8061, lng: -1.6312 },
  DE11: { lat: 52.7731, lng: -1.5591 },
  DE73: { lat: 52.8391, lng: -1.4241 },
  B77: { lat: 52.6181, lng: -1.6691 },
  DE12: { lat: 52.7121, lng: -1.5421 }
};
function k(o) {
  let n = 0;
  for (let r = 0; r < o.length; r++)
    n = (n << 5) - n + o.charCodeAt(r), n |= 0;
  return Math.abs(n);
}
function e(o) {
  const n = o.postcodes[0] ? o.postcodes[0].split(" ")[0] : "CV13", r = o.housingTypes ? o.housingTypes[0].toLowerCase() : "mix of residential properties", i = o.commonProblems ? o.commonProblems[0].toLowerCase() : "emergency boiler lockouts and main drain blockages", l = o.heatingTypes ? o.heatingTypes[0].toLowerCase() : "gas combi and unvented heating systems", s = o.soilType ? o.soilType.toLowerCase() : "heavy local clay ground structures", h = o.hubTown || "Market Bosworth", c = y[n] || { lat: 52.6247, lng: -1.4014 }, p = o.metaTitle || `24/7 Emergency Plumber in ${o.name} (${o.postcodes.join(", ")}) | 30-60 Min Arrival`, m = o.metaDescription || `Local 24/7 emergency plumbing & drainage services in ${o.name}. Rapid response for burst pipes, blocked toilets & boiler failures. Call ${o.phone} now.`, d = k(o.name) % 3;
  let t = [];
  d === 0 ? t = [
    `Our 24/7 emergency response units operate continuously across ${o.name}, specifically equipped to address the structural demands of the local network. With a high density of ${r} situated along ${o.road} and neighboring streets, our engineers frequently resolve acute faults such as ${i}.`,
    `We maintain rapid dispatch windows throughout the ${o.postcodes[0]} area by stationing mobile engineering teams near ${o.landmark}. Whether handling system pressure drops in ${l} or unblocking subsoil lines affected by ${s}, our teams deliver permanent isolation and repair solutions.`
  ] : d === 1 ? t = [
    `When urgent plumbing or drainage failures occur in ${o.name}, local residents benefit from our direct rapid-deployment service. Operating routinely past ${o.landmark}, our vans carry full inventory to resolve ${i} on the first visit across ${o.road} and surrounding developments.`,
    `Properties within the ${o.postcodes.join("/")} sector feature a diverse operational mix of ${r}. Ground shifts caused by ${s} often compromise underground drainage—our team uses non-destructive high-pressure water jetting and CCTV surveying to restore full flow capacity.`
  ] : t = [
    `Securing fast emergency plumbing coverage in ${o.name} is essential when facing sudden pipe ruptures or drainage backups. Our G3-certified engineers cover the ${o.postcodes[0]} district around the clock, prioritizing urgent callouts near ${o.landmark} and the broader ${o.road} corridor.`,
    `Due to local conditions characterized by ${s}, infrastructure in ${o.name} requires precise diagnostic care. From resolving limescale scaling in modern ${l} to clear severe blockage points in ${r}, we guarantee 60-minute emergency arrival times.`
  ];
  const u = [
    {
      question: `How fast can an emergency plumber arrive in ${o.name}?`,
      answer: `We maintain active response units near ${o.landmark}, allowing an average arrival time of 30 to 60 minutes for emergency callouts across ${o.name} and the ${o.postcodes.join(", ")} postcode area.`
    },
    {
      question: `Do you provide 24/7 drain jetting and toilet unblocking in ${o.name}?`,
      answer: "Yes. Our engineers carry high-pressure jetting units and specialized CCTV drain inspection cameras to clear severe main drain blockages, blocked toilets, and root ingress instantly."
    }
  ];
  return {
    name: o.name,
    phone: o.phone,
    landmark: o.landmark,
    road: o.road,
    postcodes: o.postcodes,
    description: o.description || `24/7 emergency plumbing, heating, and drainage services across ${o.name} (${o.postcodes.join(", ")}). Rapid 30-60 minute local deployment.`,
    mapSrc: o.mapSrc || g,
    housingTypes: o.housingTypes || ["Victorian Terraces", "Suburban Semi-Detached Properties", "Modern Housing Developments"],
    commonProblems: o.commonProblems || ["Hard water limescale scaling", "Boiler baseline pressure loss", "Blocked localized external grid networks"],
    drainageTypes: o.drainageTypes || ["Vitrified Clay Infrastructure Tracks", "Modern High-Flow PVC Radial Systems"],
    heatingTypes: o.heatingTypes || ["High-Efficiency Condensing Combi Boilers", "Traditional Flow Unvented Systems"],
    propertyAgeProfile: o.propertyAgeProfile || "Mixed residential stock spanning historic cores to late-20th-century expansions.",
    commercialAreas: o.commercialAreas || [`${o.name} High Street Outlets`, "Local Corporate Trade Hubs"],
    nearbyAreas: o.nearbyAreas || [h, "Surrounding District Commuter Arteries"],
    nearbyVillages: o.nearbyVillages || ["market-bosworth", "barlestone", "stoke-golding", "twycross"],
    waterPressureNotes: o.waterPressureNotes || "Maintains high baseline structural parameters across the central sector.",
    soilType: o.soilType || "Heavy localized clay structures.",
    floodRisk: o.floodRisk || "Low overall risk profile.",
    insuranceNotes: o.insuranceNotes || "Trace and access tracking documentation provided seamlessly for policy validation.",
    typicalCallouts: o.typicalCallouts || ["Emergency fluid isolation", "Main structural drain descaling", "Combi boiler flame diagnostics"],
    authorityParagraphs: o.authorityParagraphs || t,
    metaTitle: p,
    metaDescription: m,
    geoCoordinates: o.geoCoordinates || c,
    hubTown: h,
    customFAQ: o.customFAQ || u
  };
}
const b = {
  // =========================================================
  // === CV13 MARKET BOSWORTH & WEST LEICESTERSHIRE CORE =====
  // =========================================================
  "market-bosworth": e({
    name: "Market Bosworth",
    phone: "01455 244 706",
    landmark: "Bosworth Country Park",
    road: "The Square",
    postcodes: ["CV13 0"],
    metaTitle: "24/7 Emergency Plumber Market Bosworth (CV13) | 30-Min Response",
    metaDescription: "Emergency plumbing & drainage specialist in Market Bosworth. Boiler repairs, blocked drains & pipe bursts cleared 24/7. Call 01455 244 706.",
    geoCoordinates: { lat: 52.6247, lng: -1.4014 },
    nearbyVillages: ["barlestone", "stoke-golding", "twycross", "cadeby", "carlton", "congerstone", "shenton", "sutton-cheney"],
    authorityParagraphs: [
      "Market Bosworth's rich architectural heritage features a dense mix of listed Georgian and Victorian properties centered around The Square. Plumbing works in this historic core require non-invasive diagnostic equipment to preserve structural integrity while rectifying low pressure and aged unvented systems.",
      "With heavy clay subsoil across the CV13 0 area, properties frequently experience ground-movement fractures in older clay soil stacks. Our local engineers maintain fully equipped response vehicles stationed near Bosworth Country Park for immediate 60-minute emergency turnarounds."
    ]
  }),
  barlestone: e({ name: "Barlestone", phone: "01455 244 706", landmark: "St Giles Church", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  "stoke-golding": e({ name: "Stoke Golding", phone: "01455 244 706", landmark: "St Margaret's Church", road: "High Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  twycross: e({ name: "Twycross", phone: "01455 244 706", landmark: "Twycross Zoo", road: "Burton Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  "higham-on-the-hill": e({ name: "Higham on the Hill", phone: "01455 244 706", landmark: "St Peter's Church", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  "barton-in-the-beans": e({ name: "Barton in the Beans", phone: "01455 244 706", landmark: "The Baptist Chapel", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  bilstone: e({ name: "Bilstone", phone: "01455 244 706", landmark: "Bilstone House", road: "Gibbet Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  cadeby: e({ name: "Cadeby", phone: "01455 244 706", landmark: "Cadeby Hall", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  carlton: e({ name: "Carlton", phone: "01455 244 706", landmark: "The Gate Hangs Well", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  congerstone: e({ name: "Congerstone", phone: "01455 244 706", landmark: "The Horse & Jockey", road: "Shadowlane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  dadlington: e({ name: "Dadlington", phone: "01455 244 706", landmark: "The Dog & Hedgehog", road: "The Green", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  "fenny-drayton": e({ name: "Fenny Drayton", phone: "01455 244 706", landmark: "George Fox Monument", road: "Drayton Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  nailstone: e({ name: "Nailstone", phone: "01455 244 706", landmark: "All Saints Church", road: "Rectory Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  odstone: e({ name: "Odstone", phone: "01455 244 706", landmark: "Odstone Hall", road: "Rayns Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  osbaston: e({ name: "Osbaston", phone: "01455 244 706", landmark: "Osbaston Hall", road: "Lount Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  shackerstone: e({ name: "Shackerstone", phone: "01455 244 706", landmark: "Battle of Bosworth Railway", road: "Station Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  "sheepy-magna": e({ name: "Sheepy Magna", phone: "01455 244 706", landmark: "The Black Horse", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  "sheepy-parva": e({ name: "Sheepy Parva", phone: "01455 244 706", landmark: "Sheepy Mill", road: "Twycross Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  shenton: e({ name: "Shenton", phone: "01455 244 706", landmark: "Bosworth Battlefield Heritage Centre", road: "Mill Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  "sutton-cheney": e({ name: "Sutton Cheney", phone: "01455 244 706", landmark: "Hercules Revived", road: "Main Street", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  upton: e({ name: "Upton", phone: "01455 244 706", landmark: "Upton House", road: "A444", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  wellsborough: e({ name: "Wellsborough", phone: "01455 244 706", landmark: "Wellsborough Hall", road: "Bosworth Road", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  witherley: e({ name: "Witherley", phone: "01455 244 706", landmark: "The Blue Lion", road: "Post Office Lane", postcodes: ["CV13 0"], hubTown: "Market Bosworth" }),
  // ==========================================
  // === 01530 TRADITIONAL HOME CORE (NW LEICS) ===
  // ==========================================
  coalville: e({
    name: "Coalville",
    phone: "01530 654062",
    landmark: "the Clock Tower",
    road: "Memorial Square",
    postcodes: ["LE67 3", "LE67 4"],
    authorityParagraphs: [
      "Coalville's infrastructure presents a unique challenge due to its mining heritage. The ground movement over decades has left many older clay drainage systems vulnerable to hairline fractures, particularly in the Victorian terraces surrounding the town centre.",
      "In the LE67 3 and LE67 4 postcodes, we frequently encounter mixed plumbing systems where modern internal renovations meet original external cast iron stacks. Our engineers operate daily along the Memorial Square axis, ensuring rapid, zero-delay callouts."
    ]
  }),
  "ashby-de-la-zouch": e({
    name: "Ashby de la Zouch",
    phone: "01530 654062",
    landmark: "Ashby Castle",
    road: "Market Street",
    postcodes: ["LE65 1", "LE65 2"],
    authorityParagraphs: [
      "Ashby de la Zouch requires a delicate approach to plumbing, particularly within the conservation area near the Castle. Many properties here utilize complex unvented hot water systems to cope with high demand, requiring our G3-qualified engineers.",
      "The water hardness levels in Ashby are noticeably higher than in surrounding villages. We frequently install scale reducers and powerflush heating systems along Market Street to combat the calcification that damages heat exchangers."
    ]
  }),
  ibstock: e({
    name: "Ibstock",
    phone: "01530 654062",
    landmark: "Sence Valley Forest Park",
    road: "Melbourne Road",
    postcodes: ["LE67 6"],
    authorityParagraphs: [
      "Ibstock's plumbing infrastructure is heavily influenced by the local clay soil, which is famous for brick-making. This heavy soil type often leads to ground shifting that can misalign older clay drainage pipes, a common issue we resolve near Melbourne Road.",
      "We see a high volume of boiler upgrades in the 1960s semi-detached housing stock that typifies the area, alongside providing rapid isolation for new housing developments near Sence Valley."
    ]
  }),
  whitwick: e({
    name: "Whitwick",
    phone: "01530 654062",
    landmark: "The Black Horse",
    road: "City of Dan",
    postcodes: ["LE67 5"],
    authorityParagraphs: [
      "Whitwick's unique topography, sitting on the edge of the Charnwood Forest granite, creates specific plumbing challenges. The steep gradient of streets like City of Dan results in exceptionally high water pressure in lower properties, often necessitating Pressure Reducing Valves (PRVs).",
      "The older stone cottages near the Black Horse often suffer from frozen external pipes due to their exposed position. We frequently upgrade insulation on condensate pipes throughout LE67 5."
    ]
  }),
  measham: e({
    name: "Measham",
    phone: "01530 654062",
    landmark: "The Library",
    road: "High Street",
    postcodes: ["DE12 7"],
    authorityParagraphs: [
      "Measham serves as a bridge between the industrial heritage of the Midlands and the rural National Forest. This mix sees our engineers attending complex commercial heating failures in the Westminster Industrial Estate as often as residential leaks on the High Street.",
      "With a high density of rental properties in the town centre, we provide rapid legionella checks and tenant emergency response services, ensuring DE12 7 properties remain compliant and safe."
    ]
  }),
  markfield: e({
    name: "Markfield",
    phone: "01530 654062",
    landmark: "Hill Hole Quarry",
    road: "Main Street",
    postcodes: ["LE67 9"],
    authorityParagraphs: [
      "Markfield's elevated position near Hill Hole Quarry means properties here are exposed to colder ambient temperatures, increasing the risk of loft pipe freezing. We strongly recommend upgraded lagging for all roof-space plumbing in LE67 9.",
      "The 1970s estates off Main Street are reaching the age where galvanized steel pipework requires replacement. We specialize in system upgrades that respect the existing fabric of these buildings."
    ]
  }),
  // ==========================================
  // === 01509 LOUGHBOROUGH REGIONAL AREA =====
  // ==========================================
  loughborough: e({
    name: "Loughborough",
    phone: "01509 642158",
    landmark: "Loughborough University",
    road: "Market Place",
    postcodes: ["LE11"],
    authorityParagraphs: [
      "As a major university town, Loughborough's plumbing infrastructure is heavily focused on high-density HMOs (Houses in Multiple Occupation). Our engineers frequently upgrade multi-bathroom water pressure systems and handle rapid-response boiler lockouts across the LE11 student corridors.",
      "From commercial retail unblocking in the Market Place to maintaining traditional heating systems in the Victorian terraces of the Golden Triangle, we position fully stocked vans centrally for 60-minute emergency turnarounds."
    ]
  }),
  quorn: e({ name: "Quorn", phone: "01509 447469", landmark: "Great Central Railway", road: "High Street", postcodes: ["LE12"] }),
  groby: e({ name: "Groby", phone: "01164 105069", landmark: "Groby Pool", road: "Leicester Road", postcodes: ["LE6"] }),
  glenfield: e({ name: "Glenfield", phone: "01164 105069", landmark: "Leicestershire County Council HQ", road: "Station Road", postcodes: ["LE3"] }),
  "burton-upon-trent": e({ name: "Burton upon Trent", phone: "01283 890215", landmark: "The National Brewery Centre", road: "High Street", postcodes: ["DE14"] }),
  swadlincote: e({ name: "Swadlincote", phone: "01283 890215", landmark: "Swadlincote Ski Centre", road: "High Street", postcodes: ["DE11"] }),
  melbourne: e({ name: "Melbourne", phone: "01332 806148", landmark: "Melbourne Hall", road: "High Street", postcodes: ["DE73"] }),
  tamworth: e({ name: "Tamworth", phone: "01827 802163", landmark: "Tamworth Castle", road: "Market Street", postcodes: ["B77", "B78", "B79"] }),
  // =========================================================
  // VILLAGES (Automatically populated via the Smart Generator)
  // =========================================================
  "albert-village": e({ name: "Albert Village", phone: "01530 654062", landmark: "Albert Village Lake", road: "Occupation Road", postcodes: ["DE11"] }),
  bagworth: e({ name: "Bagworth", phone: "01530 654062", landmark: "Bagworth Heath Woods", road: "Station Road", postcodes: ["LE67 1"] }),
  "bardon-hill": e({ name: "Bardon Hill", phone: "01530 654062", landmark: "Bardon Truck Park", road: "Beveridge Lane", postcodes: ["LE67 1"] }),
  battram: e({ name: "Battram", phone: "01530 654062", landmark: "Battram Woods", road: "Wood Road", postcodes: ["LE67"] }),
  blackfordby: e({ name: "Blackfordby", phone: "01530 654062", landmark: "The Black Lion", road: "Main Street", postcodes: ["DE11 8"] }),
  boundary: e({ name: "Boundary", phone: "01530 654062", landmark: "Ashby Road", road: "Ashby Road", postcodes: ["DE11"] }),
  "breedon-on-the-hill": e({ name: "Breedon on the Hill", phone: "01530 654062", landmark: "The Priory Church", road: "Ashby Road", postcodes: ["DE73"] }),
  coleorton: e({ name: "Coleorton", phone: "01530 654062", landmark: "Coleorton Hall", road: "The Moorlands", postcodes: ["LE67 8"] }),
  "copt-oak": e({ name: "Copt Oak", phone: "01530 654062", landmark: "The Copt Oak Pub", road: "Whitwick Road", postcodes: ["LE67"] }),
  "donington-le-heath": e({ name: "Donington le Heath", phone: "01530 654062", landmark: "The Manor House", road: "Manor Road", postcodes: ["LE67 2"] }),
  donisthorpe: e({ name: "Donisthorpe", phone: "01530 654062", landmark: "Donisthorpe Woodland Park", road: "Church Street", postcodes: ["DE12"] }),
  ellistown: e({ name: "Ellistown", phone: "01530 654062", landmark: "South Leicestershire College", road: "Beveridge Lane", postcodes: ["LE67 1"] }),
  griffydam: e({ name: "Griffydam", phone: "01530 654062", landmark: "The Griffin Inn", road: "Top Road", postcodes: ["LE67 8"] }),
  heather: e({ name: "Heather", phone: "01530 654062", landmark: "Sence Valley", road: "Swepstone Road", postcodes: ["LE67 6"] }),
  hugglescote: e({ name: "Hugglescote", phone: "01530 654062", landmark: "The Gate Inn", road: "Ashby Road", postcodes: ["LE67 2"] }),
  leicestershire: e({ name: "Leicestershire", phone: "01530 654062", landmark: "Charnwood Forest", road: "The M1 Corridor", postcodes: ["LE"] }),
  lount: e({ name: "Lount", phone: "01530 654062", landmark: "The Ferrers Arms", road: "Nottingham Road", postcodes: ["LE65 1"] }),
  moira: e({ name: "Moira", phone: "01530 654062", landmark: "Moira Furnace", road: "Ashby Road", postcodes: ["DE12 6"] }),
  "newbold-coleorton": e({ name: "Newbold Coleorton", phone: "01530 654062", landmark: "The Cross Keys", road: "Ashby Road", postcodes: ["LE67 8"] }),
  "normanton-le-heath": e({ name: "Normanton le Heath", phone: "01530 654062", landmark: "The Packington Border", road: "Ashby Road", postcodes: ["LE67 2"] }),
  oakthorpe: e({ name: "Oakthorpe", phone: "01530 654062", landmark: "The Holly Bush", road: "Measham Road", postcodes: ["DE12"] }),
  osgathorpe: e({ name: "Osgathorpe", phone: "01530 654062", landmark: "St Mary's Church", road: "Ashby Road", postcodes: ["LE12"] }),
  packington: e({ name: "Packington", phone: "01530 654062", landmark: "The Bull & Lion", road: "High Street", postcodes: ["LE65 1"] }),
  "peggs-green": e({ name: "Peggs Green", phone: "01530 654062", landmark: "The New Inn", road: "Nottingham Road", postcodes: ["LE67 8"] }),
  ravenstone: e({ name: "Ravenstone", phone: "01530 654062", landmark: "The Kings Arms", road: "Beeswax Lane", postcodes: ["LE67 2"] }),
  shellbrook: e({ name: "Shellbrook", phone: "01530 654062", landmark: "Ashby Road", road: "Ashby Road", postcodes: ["LE65"] }),
  sinope: e({ name: "Sinope", phone: "01530 654062", landmark: "The Moorlands", road: "A511", postcodes: ["LE67"] }),
  snibston: e({ name: "Snibston", phone: "01530 654062", landmark: "Snibston Colliery Park", road: "Chiswell Drive", postcodes: ["LE67 3"] }),
  "stanton-under-bardon": e({ name: "Stanton under Bardon", phone: "01530 654062", landmark: "The Plough Inn", road: "Main Street", postcodes: ["LE67 9"] }),
  "staunton-harold": e({ name: "Staunton Harold", phone: "01530 654062", landmark: "Staunton Harold Hall", road: "The Drive", postcodes: ["LE65"] }),
  swannington: e({ name: "Swannington", phone: "01530 654062", landmark: "Hough Mill", road: "Main Street", postcodes: ["LE67 8"] }),
  thringstone: e({ name: "Thringstone", phone: "01530 654062", landmark: "Grace Dieu Priory", road: "Loughborough Road", postcodes: ["LE67 8"] }),
  willesley: e({ name: "Willesley", phone: "01530 654062", landmark: "Willesley Park Golf Club", road: "Willesley Road", postcodes: ["LE65 2"] }),
  wilson: e({ name: "Wilson", phone: "01530 654062", landmark: "The Bulls Head", road: "Main Street", postcodes: ["DE73"] }),
  worthington: e({ name: "Worthington", phone: "01530 654062", landmark: "The Malt Shovel", road: "Main Street", postcodes: ["LE65 1"] })
}, w = [
  "/",
  "/about",
  "/services",
  "/reviews",
  "/faq",
  "/locations"
  // This is the main grid page you were looking at!
], a = [];
Object.keys(b).forEach((o) => {
  a.push(`/local-plumber/${o}/`), a.push(`/emergency-plumber/${o}/`), a.push(`/heating-engineer/${o}/`), a.push(`/drain-unblocking/${o}/`), a.push(`/leak-detection/${o}/`);
});
const f = [...w, ...a];
export {
  f as default
};
