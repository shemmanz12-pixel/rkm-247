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
  "LE7":  { lat: 52.6841, lng: -1.0941 },
  "DE14": { lat: 52.8061, lng: -1.6312 },
  "DE13": { lat: 52.8251, lng: -1.6541 },
  "DE15": { lat: 52.7911, lng: -1.6021 },
  "DE11": { lat: 52.7731, lng: -1.5591 },
  "DE73": { lat: 52.8391, lng: -1.4241 },
  "DE74": { lat: 52.8381, lng: -1.3391 },
  "B77":  { lat: 52.6181, lng: -1.6691 },
  "B79":  { lat: 52.6481, lng: -1.6891 },
  "CV9":  { lat: 52.5781, lng: -1.5421 },
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
  const metaTitle = data.metaTitle || `24/7 Emergency Plumber in ${data.name} (${data.postcodes.join(', ')}) | 60-90 Min Arrival`;
  const metaDescription = data.metaDescription || `Local 24/7 emergency plumbing & drainage services in ${data.name}. Rapid response for burst pipes, blocked toilets & boiler failures. Call ${data.phone} now.`;

  // Content Variation Generator
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
      answer: `We maintain active response units near ${data.landmark}, allowing an average arrival time of 60 to 90 minutes for emergency callouts across ${data.name} and the ${data.postcodes.join(', ')} postcode area.`
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
    description: data.description || `24/7 emergency plumbing, heating, and drainage services across ${data.name} (${data.postcodes.join(', ')}). Rapid 60-90 minute local deployment.`,
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
  // ==========================================
  // === ALL 220 SITEMAP LOCATIONS (A-Z) ======
  // ==========================================
  'albert-village': buildTown({ name: "Albert Village", phone: "01530 654062", landmark: "Albert Village Lake", road: "Occupation Road", postcodes: ["DE11 9"] }),
  'alvaston': buildTown({ name: "Alvaston", phone: "01332 806148", landmark: "Alvaston Park", road: "London Road", postcodes: ["DE73 8"] }),
  'ambaston': buildTown({ name: "Ambaston", phone: "01332 806148", landmark: "Ambaston Lane", road: "Ambaston Lane", postcodes: ["DE73 8"] }),
  'amington': buildTown({ name: "Amington", phone: "01827 802163", landmark: "Amington Hall", road: "Amington Road", postcodes: ["B77 1"] }),
  'ansley': buildTown({ name: "Ansley", phone: "01827 802163", landmark: "St Laurence Church", road: "Birmingham Road", postcodes: ["CV9 2"] }),
  'anslow': buildTown({ name: "Anslow", phone: "01283 890215", landmark: "The Bell Inn", road: "Main Road", postcodes: ["DE13 9"] }),
  'anstey': buildTown({ name: "Anstey", phone: "01164 105069", landmark: "The Nook", road: "Bradgate Road", postcodes: ["LE6 0"] }),
  'appleby-magna': buildTown({ name: "Appleby Magna", phone: "01530 654062", landmark: "Sir John Moore Foundation", road: "Top Street", postcodes: ["DE12 7"] }),
  'appleby-parva': buildTown({ name: "Appleby Parva", phone: "01530 654062", landmark: "Appleby Inn", road: "A444", postcodes: ["DE12 7"] }),
  'arley': buildTown({ name: "Arley", phone: "01827 802163", landmark: "Arley Community Centre", road: "Gun Hill", postcodes: ["CV9 2"] }),
  'ashby-de-la-zouch': buildTown({ name: "Ashby de la Zouch", phone: "01530 654062", landmark: "Ashby Castle", road: "Market Street", postcodes: ["LE65 1", "LE65 2"] }),
  'astley': buildTown({ name: "Astley", phone: "01827 802163", landmark: "Astley Castle", road: "Astley Lane", postcodes: ["CV9 2"] }),
  'aston-on-trent': buildTown({ name: "Aston on Trent", phone: "01332 806148", landmark: "Aston Hall", road: "Derby Road", postcodes: ["DE73 8"] }),
  'atherstone': buildTown({ name: "Atherstone", phone: "01827 802163", landmark: "Atherstone Market Square", road: "Long Street", postcodes: ["CV9 1"] }),
  'austrey': buildTown({ name: "Austrey", phone: "01827 802163", landmark: "The Bird in Hand", road: "Main Road", postcodes: ["B79 0"] }),
  'baddesley-ensor': buildTown({ name: "Baddesley Ensor", phone: "01827 802163", landmark: "Baddesley Common", road: "New Street", postcodes: ["CV9 2"] }),
  'bagworth': buildTown({ name: "Bagworth", phone: "01530 654062", landmark: "Bagworth Heath Woods", road: "Station Road", postcodes: ["LE67 1"] }),
  'bardon-hill': buildTown({ name: "Bardon Hill", phone: "01530 654062", landmark: "Bardon Truck Park", road: "Beveridge Lane", postcodes: ["LE67 1"] }),
  'barkby': buildTown({ name: "Barkby", phone: "01164 105069", landmark: "The Malt Shovel", road: "Main Street", postcodes: ["LE7 3"] }),
  'barkby-thorpe': buildTown({ name: "Barkby Thorpe", phone: "01164 105069", landmark: "Barkby Thorpe Hall", road: "King Street", postcodes: ["LE7 3"] }),
  'barlestone': buildTown({ name: "Barlestone", phone: "01455 244 706", landmark: "St Giles Church", road: "Main Street", postcodes: ["CV13 0"] }),
  'barrow-upon-soar': buildTown({ name: "Barrow upon Soar", phone: "01509 642158", landmark: "The Navigation Inn", road: "High Street", postcodes: ["LE12 8"] }),
  'barrow-upon-trent': buildTown({ name: "Barrow upon Trent", phone: "01332 806148", landmark: "St Wilfrid's Church", road: "Sinfin Lane", postcodes: ["DE73 8"] }),
  'barton-in-the-beans': buildTown({ name: "Barton in the Beans", phone: "01455 244 706", landmark: "The Baptist Chapel", road: "Main Street", postcodes: ["CV13 0"] }),
  'barton-under-needwood': buildTown({ name: "Barton under Needwood", phone: "01283 890215", landmark: "Barton Marina", road: "Main Street", postcodes: ["DE13 8"] }),
  'battram': buildTown({ name: "Battram", phone: "01530 654062", landmark: "Battram Woods", road: "Wood Road", postcodes: ["LE67 1"] }),
  'baxterley': buildTown({ name: "Baxterley", phone: "01827 802163", landmark: "The Rose & Crown", road: "Main Road", postcodes: ["CV9 2"] }),
  'belton': buildTown({ name: "Belton", phone: "01509 642158", landmark: "The George Hotel", road: "Market Place", postcodes: ["LE12 9"] }),
  'bentley': buildTown({ name: "Bentley", phone: "01827 802163", landmark: "Bentley Woods", road: "Bentley Common", postcodes: ["CV9 2"] }),
  'bilstone': buildTown({ name: "Bilstone", phone: "01455 244 706", landmark: "Bilstone House", road: "Gibbet Lane", postcodes: ["CV13 0"] }),
  'birstall': buildTown({ name: "Birstall", phone: "01164 105069", landmark: "Watermead Country Park", road: "Sibson Road", postcodes: ["LE4 4"] }),
  'blackfordby': buildTown({ name: "Blackfordby", phone: "01530 654062", landmark: "The Black Lion", road: "Main Street", postcodes: ["DE11 8"] }),
  'bolehall': buildTown({ name: "Bolehall", phone: "01827 802163", landmark: "Bolehall Swifts Club", road: "Amington Road", postcodes: ["B77 3"] }),
  'botcheston': buildTown({ name: "Botcheston", phone: "01164 105069", landmark: "The Greyhound", road: "Main Street", postcodes: ["LE9 9"] }),
  'boulton-moor': buildTown({ name: "Boulton Moor", phone: "01332 806148", landmark: "Boulton Moor Woods", road: "Chellaston Lane", postcodes: ["DE73 5"] }),
  'boundary': buildTown({ name: "Boundary", phone: "01530 654062", landmark: "Ashby Road", road: "Ashby Road", postcodes: ["DE11 7"] }),
  'branston': buildTown({ name: "Branston", phone: "01283 890215", landmark: "Branston Water Park", road: "Main Street", postcodes: ["DE14 3"] }),
  'braunstone': buildTown({ name: "Braunstone", phone: "01164 105069", landmark: "Braunstone Park", road: "Braunstone Way", postcodes: ["LE3 1"] }),
  'breedon-on-the-hill': buildTown({ name: "Breedon on the Hill", phone: "01530 654062", landmark: "The Priory Church", road: "Ashby Road", postcodes: ["DE73 8"] }),
  'bretby': buildTown({ name: "Bretby", phone: "01283 890215", landmark: "Bretby Hall", road: "Ashby Road", postcodes: ["DE15 0"] }),
  'burnaston': buildTown({ name: "Burnaston", phone: "01283 890215", landmark: "Toyota Manufacturing UK", road: "Burnaston Lane", postcodes: ["DE65 6"] }),
  'burton-on-the-wolds': buildTown({ name: "Burton on the Wolds", phone: "01509 642158", landmark: "The Greyhound Inn", road: "Melton Road", postcodes: ["LE12 5"] }),
  'burton-upon-trent': buildTown({ name: "Burton upon Trent", phone: "01283 890215", landmark: "The National Brewery Centre", road: "High Street", postcodes: ["DE14 1"] }),
  'cadeby': buildTown({ name: "Cadeby", phone: "01455 244 706", landmark: "Cadeby Hall", road: "Main Street", postcodes: ["CV13 0"] }),
  'caldecote': buildTown({ name: "Caldecote", phone: "01827 802163", landmark: "Caldecote Hall", road: "Weddington Road", postcodes: ["CV10 0"] }),
  'carlton': buildTown({ name: "Carlton", phone: "01455 244 706", landmark: "The Gate Hangs Well", road: "Main Street", postcodes: ["CV13 0"] }),
  'castle-donington': buildTown({ name: "Castle Donington", phone: "01509 642158", landmark: "Donington Park", road: "High Street", postcodes: ["DE74 2"] }),
  'castle-gresley': buildTown({ name: "Castle Gresley", phone: "01283 890215", landmark: "Gresley Old Hall", road: "Burton Road", postcodes: ["DE11 9"] }),
  'cauldwell': buildTown({ name: "Cauldwell", phone: "01283 890215", landmark: "Cauldwell Hall", road: "Main Street", postcodes: ["DE12 6"] }),
  'charley': buildTown({ name: "Charley", phone: "01530 654062", landmark: "Mount St Bernard Abbey", road: "Abbey Road", postcodes: ["LE67 4"] }),
  'chellaston': buildTown({ name: "Chellaston", phone: "01332 806148", landmark: "The Bonnie Prince", road: "Swarkestone Road", postcodes: ["DE73 6"] }),
  'church-broughton': buildTown({ name: "Church Broughton", phone: "01283 890215", landmark: "St Michael's Church", road: "Main Street", postcodes: ["DE65 5"] }),
  'church-gresley': buildTown({ name: "Church Gresley", phone: "01283 890215", landmark: "Maurice Lea Memorial Park", road: "Market Street", postcodes: ["DE11 9"] }),
  'clifton-campville': buildTown({ name: "Clifton Campville", phone: "01827 802163", landmark: "St Andrew's Church", road: "Main Street", postcodes: ["B79 0"] }),
  'coalville': buildTown({ name: "Coalville", phone: "01530 654062", landmark: "the Clock Tower", road: "Memorial Square", postcodes: ["LE67 3", "LE67 4"] }),
  'coleorton': buildTown({ name: "Coleorton", phone: "01530 654062", landmark: "Coleorton Hall", road: "The Moorlands", postcodes: ["LE67 8"] }),
  'congerstone': buildTown({ name: "Congerstone", phone: "01455 244 706", landmark: "The Horse & Jockey", road: "Shadowlane", postcodes: ["CV13 0"] }),
  'copt-oak': buildTown({ name: "Copt Oak", phone: "01530 654062", landmark: "The Copt Oak Pub", road: "Whitwick Road", postcodes: ["LE67 9"] }),
  'cossington': buildTown({ name: "Cossington", phone: "01509 642158", landmark: "The Royal Oak", road: "Main Street", postcodes: ["LE7 4"] }),
  'cotes': buildTown({ name: "Cotes", phone: "01509 642158", landmark: "Cotes Mill", road: "Nottingham Road", postcodes: ["LE12 5"] }),
  'coton-in-the-elms': buildTown({ name: "Coton in the Elms", phone: "01283 890215", landmark: "The Black Horse", road: "Church Street", postcodes: ["DE12 8"] }),
  'cropston': buildTown({ name: "Cropston", phone: "01164 105069", landmark: "Cropston Reservoir", road: "Station Road", postcodes: ["LE7 7"] }),
  'dadlington': buildTown({ name: "Dadlington", phone: "01455 244 706", landmark: "The Dog & Hedgehog", road: "The Green", postcodes: ["CV13 0"] }),
  'dalbury-lees': buildTown({ name: "Dalbury Lees", phone: "01283 890215", landmark: "The Cow Dalbury", road: "The Green", postcodes: ["DE6 5"] }),
  'desford': buildTown({ name: "Desford", phone: "01164 105069", landmark: "Bosworth Academy", road: "High Street", postcodes: ["LE9 9"] }),
  'diseworth': buildTown({ name: "Diseworth", phone: "01509 642158", landmark: "Diseworth Heritage Centre", road: "Hall Gate", postcodes: ["DE74 2"] }),
  'donington-le-heath': buildTown({ name: "Donington le Heath", phone: "01530 654062", landmark: "The Manor House", road: "Manor Road", postcodes: ["LE67 2"] }),
  'donisthorpe': buildTown({ name: "Donisthorpe", phone: "01530 654062", landmark: "Donisthorpe Woodland Park", road: "Church Street", postcodes: ["DE12 7"] }),
  'dordon': buildTown({ name: "Dordon", phone: "01827 802163", landmark: "Dordon Hall", road: "Long Street", postcodes: ["B78 1"] }),
  'dosthill': buildTown({ name: "Dosthill", phone: "01827 802163", landmark: "Dosthill Quarry", road: "Dosthill Road", postcodes: ["B77 1"] }),
  'drayton-bassett': buildTown({ name: "Drayton Bassett", phone: "01827 802163", landmark: "Drayton Manor Park", road: "Drayton Lane", postcodes: ["B78 3"] }),
  'east-goscote': buildTown({ name: "East Goscote", phone: "01164 105069", landmark: "The Plough", road: "Merchants Common", postcodes: ["LE7 3"] }),
  'east-leake': buildTown({ name: "East Leake", phone: "01509 642158", landmark: "St Mary's Church", road: "Main Street", postcodes: ["LE12 6"] }),
  'edingale': buildTown({ name: "Edingale", phone: "01827 802163", landmark: "The Black Horse", road: "Pessall Lane", postcodes: ["B79 9"] }),
  'egginton': buildTown({ name: "Egginton", phone: "01283 890215", landmark: "Egginton Hall", road: "Duck Street", postcodes: ["DE65 6"] }),
  'elford': buildTown({ name: "Elford", phone: "01827 802163", landmark: "Elford Walled Gardens", road: "Church Road", postcodes: ["B79 9"] }),
  'ellistown': buildTown({ name: "Ellistown", phone: "01530 654062", landmark: "South Leicestershire College", road: "Beveridge Lane", postcodes: ["LE67 1"] }),
  'elvaston': buildTown({ name: "Elvaston", phone: "01332 806148", landmark: "Elvaston Castle", road: "Borrowash Road", postcodes: ["DE72 3"] }),
  'etwall': buildTown({ name: "Etwall", phone: "01283 890215", landmark: "John Port Academy", road: "Main Street", postcodes: ["DE65 6"] }),
  'fazeley': buildTown({ name: "Fazeley", phone: "01827 802163", landmark: "Fazeley Junction", road: "Lichfield Street", postcodes: ["B78 3"] }),
  'fenny-drayton': buildTown({ name: "Fenny Drayton", phone: "01455 244 706", landmark: "George Fox Monument", road: "Drayton Lane", postcodes: ["CV13 0"] }),
  'field-head': buildTown({ name: "Field Head", phone: "01164 105069", landmark: "The Field Head Hotel", road: "Markfield Road", postcodes: ["LE67 9"] }),
  'findern': buildTown({ name: "Findern", phone: "01332 806148", landmark: "Findern Green", road: "Main Street", postcodes: ["DE65 6"] }),
  'foremark': buildTown({ name: "Foremark", phone: "01332 806148", landmark: "Foremark Reservoir", road: "Milton Road", postcodes: ["DE65 6"] }),
  'glascote': buildTown({ name: "Glascote", phone: "01827 802163", landmark: "Glascote Basin", road: "Glascote Road", postcodes: ["B77 2"] }),
  'glenfield': buildTown({ name: "Glenfield", phone: "01164 105069", landmark: "Leicestershire County Council HQ", road: "Station Road", postcodes: ["LE3 8"] }),
  'great-wilne': buildTown({ name: "Great Wilne", phone: "01332 806148", landmark: "St Chad's Church", road: "Wilne Lane", postcodes: ["DE72 2"] }),
  'grendon': buildTown({ name: "Grendon", phone: "01827 802163", landmark: "Grendon Community Centre", road: "Watling Street", postcodes: ["CV9 2"] }),
  'griffydam': buildTown({ name: "Griffydam", phone: "01530 654062", landmark: "The Griffin Inn", road: "Top Road", postcodes: ["LE67 8"] }),
  'groby': buildTown({ name: "Groby", phone: "01164 105069", landmark: "Groby Pool", road: "Leicester Road", postcodes: ["LE6 0"] }),
  'harlaston': buildTown({ name: "Harlaston", phone: "01827 802163", landmark: "The White Lion", road: "Main Road", postcodes: ["B79 9"] }),
  'hartshorne': buildTown({ name: "Hartshorne", phone: "01283 890215", landmark: "The Admiral Rodney", road: "Main Street", postcodes: ["DE11 7"] }),
  'hathern': buildTown({ name: "Hathern", phone: "01509 642158", landmark: "The Anchor Inn", road: "Loughborough Road", postcodes: ["LE12 5"] }),
  'hatton': buildTown({ name: "Hatton", phone: "01283 890215", landmark: "Tutbury and Hatton Station", road: "Station Road", postcodes: ["DE65 5"] }),
  'haunton': buildTown({ name: "Haunton", phone: "01827 802163", landmark: "St Michael's Church", road: "Main Road", postcodes: ["B79 9"] }),
  'heather': buildTown({ name: "Heather", phone: "01530 654062", landmark: "Sence Valley", road: "Swepstone Road", postcodes: ["LE67 6"] }),
  'hemington': buildTown({ name: "Hemington", phone: "01509 642158", landmark: "Hemington Primary School", road: "Main Street", postcodes: ["DE74 2"] }),
  'higham-on-the-hill': buildTown({ name: "Higham on the Hill", phone: "01455 244 706", landmark: "St Peter's Church", road: "Main Street", postcodes: ["CV13 0"] }),
  'hilton': buildTown({ name: "Hilton", phone: "01283 890215", landmark: "Hilton Village Hall", road: "Main Street", postcodes: ["DE65 5"] }),
  'hints': buildTown({ name: "Hints", phone: "01827 802163", landmark: "Hints Hall", road: "School Lane", postcodes: ["B78 3"] }),
  'hopwas': buildTown({ name: "Hopwas", phone: "01827 802163", landmark: "The Red Lion", road: "Lichfield Road", postcodes: ["B78 3"] }),
  'horninglow': buildTown({ name: "Horninglow", phone: "01283 890215", landmark: "Horninglow Basin", road: "Horninglow Road", postcodes: ["DE13 0"] }),
  'hoton': buildTown({ name: "Hoton", phone: "01509 642158", landmark: "The Packe Arms", road: "Loughborough Road", postcodes: ["LE12 5"] }),
  'hugglescote': buildTown({ name: "Hugglescote", phone: "01530 654062", landmark: "The Gate Inn", road: "Ashby Road", postcodes: ["LE67 2"] }),
  'ibstock': buildTown({ name: "Ibstock", phone: "01530 654062", landmark: "Sence Valley Forest Park", road: "Melbourne Road", postcodes: ["LE67 6"] }),
  'isley-walton': buildTown({ name: "Isley Walton", phone: "01509 642158", landmark: "All Saints Church", road: "Melbourne Road", postcodes: ["DE74 2"] }),
  'kegworth': buildTown({ name: "Kegworth", phone: "01509 642158", landmark: "Kegworth Village Hall", road: "High Street", postcodes: ["DE74 2"] }),
  'kings-newton': buildTown({ name: "Kings Newton", phone: "01332 806148", landmark: "Kings Newton Hall", road: "Trent Lane", postcodes: ["DE73 8"] }),
  'kingsbury': buildTown({ name: "Kingsbury", phone: "01827 802163", landmark: "Kingsbury Water Park", road: "Tamworth Road", postcodes: ["B78 2"] }),
  'kirby-muxloe': buildTown({ name: "Kirby Muxloe", phone: "01164 105069", landmark: "Kirby Muxloe Castle", road: "Mainfield Road", postcodes: ["LE9 2"] }),
  'lea-marston': buildTown({ name: "Lea Marston", phone: "01827 802163", landmark: "Lea Marston Hotel", road: "Coton Road", postcodes: ["B76 0"] }),
  'leicester-forest-east': buildTown({ name: "Leicester Forest East", phone: "01164 105069", landmark: "LFE Services", road: "Hinckley Road", postcodes: ["LE3 3"] }),
  'leicestershire': buildTown({ name: "Leicestershire", phone: "01530 654062", landmark: "Charnwood Forest", road: "The M1 Corridor", postcodes: ["LE67 3"] }),
  'linton': buildTown({ name: "Linton", phone: "01283 890215", landmark: "The Brickmakers Arms", road: "Main Street", postcodes: ["DE12 6"] }),
  'lockington': buildTown({ name: "Lockington", phone: "01509 642158", landmark: "St Nicholas Church", road: "Main Street", postcodes: ["DE74 2"] }),
  'long-whatton': buildTown({ name: "Long Whatton", phone: "01509 642158", landmark: "The Falcon Inn", road: "Main Street", postcodes: ["LE12 5"] }),
  'loughborough': buildTown({ name: "Loughborough", phone: "01509 642158", landmark: "Loughborough University", road: "Market Place", postcodes: ["LE11 1"] }),
  'lount': buildTown({ name: "Lount", phone: "01530 654062", landmark: "The Ferrers Arms", road: "Nottingham Road", postcodes: ["LE65 1"] }),
  'lullington': buildTown({ name: "Lullington", phone: "01283 890215", landmark: "The Colvile Arms", road: "Main Street", postcodes: ["DE12 8"] }),
  'mancetter': buildTown({ name: "Mancetter", phone: "01827 802163", landmark: "St Peter's Church", road: "Manor Road", postcodes: ["CV9 1"] }),
  'markfield': buildTown({ name: "Markfield", phone: "01530 654062", landmark: "Hill Hole Quarry", road: "Main Street", postcodes: ["LE67 9"] }),
  'market-bosworth': buildTown({ name: "Market Bosworth", phone: "01455 244 706", landmark: "Bosworth Country Park", road: "The Square", postcodes: ["CV13 0"] }),
  'marston-on-dove': buildTown({ name: "Marston on Dove", phone: "01283 890215", landmark: "St Mary's Church", road: "Marston Lane", postcodes: ["DE65 5"] }),
  'measham': buildTown({ name: "Measham", phone: "01530 654062", landmark: "The Library", road: "High Street", postcodes: ["DE12 7"] }),
  'melbourne': buildTown({ name: "Melbourne", phone: "01332 806148", landmark: "Melbourne Hall", road: "High Street", postcodes: ["DE73 8"] }),
  'middleton': buildTown({ name: "Middleton", phone: "01827 802163", landmark: "Middleton Hall", road: "Church Lane", postcodes: ["B78 2"] }),
  'mile-oak': buildTown({ name: "Mile Oak", phone: "01827 802163", landmark: "Mile Oak Community Centre", road: "Bonehill Road", postcodes: ["B78 3"] }),
  'milton': buildTown({ name: "Milton", phone: "01332 806148", landmark: "The Swan Inn", road: "Main Street", postcodes: ["DE65 6"] }),
  'moira': buildTown({ name: "Moira", phone: "01530 654062", landmark: "Moira Furnace", road: "Ashby Road", postcodes: ["DE12 6"] }),
  'mountsorrel': buildTown({ name: "Mountsorrel", phone: "01509 642158", landmark: "Mountsorrel Buttercross", road: "Market Place", postcodes: ["LE12 7"] }),
  'nailstone': buildTown({ name: "Nailstone", phone: "01455 244 706", landmark: "All Saints Church", road: "Rectory Lane", postcodes: ["CV13 0"] }),
  'nether-whitacre': buildTown({ name: "Nether Whitacre", phone: "01827 802163", landmark: "The Gate Inn", road: "Station Road", postcodes: ["B46 2"] }),
  'netherseal': buildTown({ name: "Netherseal", phone: "01283 890215", landmark: "The Seal Inn", road: "Main Street", postcodes: ["DE12 8"] }),
  'newbold-coleorton': buildTown({ name: "Newbold Coleorton", phone: "01530 654062", landmark: "The Cross Keys", road: "Ashby Road", postcodes: ["LE67 8"] }),
  'newbold-verdon': buildTown({ name: "Newbold Verdon", phone: "01164 105069", landmark: "Newbold Verdon Hall", road: "Main Street", postcodes: ["LE9 9"] }),
  'newton-regis': buildTown({ name: "Newton Regis", phone: "01827 802163", landmark: "The Queen's Head", road: "Main Street", postcodes: ["B79 0"] }),
  'newton-solney': buildTown({ name: "Newton Solney", phone: "01283 890215", landmark: "Newton Park Hotel", road: "Main Street", postcodes: ["DE15 0"] }),
  'newtown-linford': buildTown({ name: "Newtown Linford", phone: "01164 105069", landmark: "Bradgate Park", road: "Main Street", postcodes: ["LE6 0"] }),
  'no-mans-heath': buildTown({ name: "No Mans Heath", phone: "01827 802163", landmark: "The Four Counties Inn", road: "Mercian Way", postcodes: ["B79 0"] }),
  'normanton-le-heath': buildTown({ name: "Normanton le Heath", phone: "01530 654062", landmark: "The Packington Border", road: "Ashby Road", postcodes: ["LE67 2"] }),
  'oadby': buildTown({ name: "Oadby", phone: "01164 105069", landmark: "Leicester Racecourse", road: "The Parade", postcodes: ["LE2 5"] }),
  'oakthorpe': buildTown({ name: "Oakthorpe", phone: "01530 654062", landmark: "The Holly Bush", road: "Measham Road", postcodes: ["DE12 7"] }),
  'odstone': buildTown({ name: "Odstone", phone: "01455 244 706", landmark: "Odstone Hall", road: "Rayns Lane", postcodes: ["CV13 0"] }),
  'osbaston': buildTown({ name: "Osbaston", phone: "01455 244 706", landmark: "Osbaston Hall", road: "Lount Road", postcodes: ["CV13 0"] }),
  'osgathorpe': buildTown({ name: "Osgathorpe", phone: "01530 654062", landmark: "St Mary's Church", road: "Ashby Road", postcodes: ["LE12 9"] }),
  'over-whitacre': buildTown({ name: "Over Whitacre", phone: "01827 802163", landmark: "The Swan Inn", road: "Nuneaton Road", postcodes: ["B46 2"] }),
  'overseal': buildTown({ name: "Overseal", phone: "01283 890215", landmark: "The Robin Hood Inn", road: "Burton Road", postcodes: ["DE12 6"] }),
  'packington': buildTown({ name: "Packington", phone: "01530 654062", landmark: "The Bull & Lion", road: "High Street", postcodes: ["LE65 1"] }),
  'peggs-green': buildTown({ name: "Peggs Green", phone: "01530 654062", landmark: "The New Inn", road: "Nottingham Road", postcodes: ["LE67 8"] }),
  'polesworth': buildTown({ name: "Polesworth", phone: "01827 802163", landmark: "Polesworth Abbey", road: "Bridge Street", postcodes: ["B78 1"] }),
  'prestwold': buildTown({ name: "Prestwold", phone: "01509 642158", landmark: "Prestwold Hall", road: "Prestwold Lane", postcodes: ["LE12 5"] }),
  'queniborough': buildTown({ name: "Queniborough", phone: "01164 105069", landmark: "The Horse and Groom", road: "Main Street", postcodes: ["LE7 3"] }),
  'quorn': buildTown({ name: "Quorn", phone: "01509 447469", landmark: "Great Central Railway", road: "High Street", postcodes: ["LE12 8"] }),
  'ratby': buildTown({ name: "Ratby", phone: "01164 105069", landmark: "The Bull's Head", road: "Main Street", postcodes: ["LE6 0"] }),
  'ravenstone': buildTown({ name: "Ravenstone", phone: "01530 654062", landmark: "The Kings Arms", road: "Beeswax Lane", postcodes: ["LE67 2"] }),
  'rearsby': buildTown({ name: "Rearsby", phone: "01164 105069", landmark: "The Wheel Inn", road: "Melton Road", postcodes: ["LE7 4"] }),
  'repton': buildTown({ name: "Repton", phone: "01332 806148", landmark: "Repton School", road: "High Street", postcodes: ["DE65 6"] }),
  'rolleston-on-dove': buildTown({ name: "Rolleston on Dove", phone: "01283 890215", landmark: "The Spread Eagle", road: "Burnside", postcodes: ["DE13 9"] }),
  'rosliston': buildTown({ name: "Rosliston", phone: "01283 890215", landmark: "Rosliston Forestry Centre", road: "Main Street", postcodes: ["DE12 8"] }),
  'rothley': buildTown({ name: "Rothley", phone: "01509 642158", landmark: "Rothley Court", road: "Woodgate", postcodes: ["LE7 7"] }),
  'scropton': buildTown({ name: "Scropton", phone: "01283 890215", landmark: "St John the Baptist Church", road: "Watery Lane", postcodes: ["DE65 5"] }),
  'seagrave': buildTown({ name: "Seagrave", phone: "01509 642158", landmark: "The White Horse", road: "Church Street", postcodes: ["LE12 7"] }),
  'seckington': buildTown({ name: "Seckington", phone: "01827 802163", landmark: "Seckington Castle Mound", road: "Church Lane", postcodes: ["B79 0"] }),
  'shackerstone': buildTown({ name: "Shackerstone", phone: "01455 244 706", landmark: "Battle of Bosworth Railway", road: "Station Road", postcodes: ["CV13 0"] }),
  'shardlow': buildTown({ name: "Shardlow", phone: "01332 806148", landmark: "The Clock Warehouse", road: "London Road", postcodes: ["DE72 2"] }),
  'sheepy-magna': buildTown({ name: "Sheepy Magna", phone: "01455 244 706", landmark: "The Black Horse", road: "Main Street", postcodes: ["CV13 0"] }),
  'sheepy-parva': buildTown({ name: "Sheepy Parva", phone: "01455 244 706", landmark: "Sheepy Mill", road: "Twycross Road", postcodes: ["CV13 0"] }),
  'shellbrook': buildTown({ name: "Shellbrook", phone: "01530 654062", landmark: "Ashby Road", road: "Ashby Road", postcodes: ["LE65 1"] }),
  'shenton': buildTown({ name: "Shenton", phone: "01455 244 706", landmark: "Bosworth Battlefield Heritage Centre", road: "Mill Lane", postcodes: ["CV13 0"] }),
  'shepshed': buildTown({ name: "Shepshed", phone: "01509 642158", landmark: "St Botolph's Church", road: "Market Place", postcodes: ["LE12 9"] }),
  'shuttington': buildTown({ name: "Shuttington", phone: "01827 802163", landmark: "The Wolferstan Arms", road: "Main Road", postcodes: ["B79 0"] }),
  'sileby': buildTown({ name: "Sileby", phone: "01509 642158", landmark: "Sileby Mill Marina", road: "High Street", postcodes: ["LE12 7"] }),
  'sinope': buildTown({ name: "Sinope", phone: "01530 654062", landmark: "The Moorlands", road: "A511", postcodes: ["LE67 8"] }),
  'smisby': buildTown({ name: "Smisby", phone: "01530 654062", landmark: "The Smisby Arms", road: "Main Street", postcodes: ["LE65 2"] }),
  'snibston': buildTown({ name: "Snibston", phone: "01530 654062", landmark: "Snibston Colliery Park", road: "Chiswell Drive", postcodes: ["LE67 3"] }),
  'stanton-under-bardon': buildTown({ name: "Stanton under Bardon", phone: "01530 654062", landmark: "The Plough Inn", road: "Main Street", postcodes: ["LE67 9"] }),
  'stapenhill': buildTown({ name: "Stapenhill", phone: "01283 890215", landmark: "Stapenhill Gardens", road: "Main Street", postcodes: ["DE15 9"] }),
  'staunton-harold': buildTown({ name: "Staunton Harold", phone: "01530 654062", landmark: "Staunton Harold Hall", road: "The Drive", postcodes: ["LE65 1"] }),
  'stenson-fields': buildTown({ name: "Stenson Fields", phone: "01332 806148", landmark: "Stenson Bubble", road: "Stenson Road", postcodes: ["DE73 6"] }),
  'stoke-golding': buildTown({ name: "Stoke Golding", phone: "01455 244 706", landmark: "St Margaret's Church", road: "High Street", postcodes: ["CV13 0"] }),
  'stonydelph': buildTown({ name: "Stonydelph", phone: "01827 802163", landmark: "Stonydelph Centre", road: "Pennine Way", postcodes: ["B77 4"] }),
  'stretton': buildTown({ name: "Stretton", phone: "01283 890215", landmark: "The Monks Bridge", road: "Main Street", postcodes: ["DE13 0"] }),
  'sutton-cheney': buildTown({ name: "Sutton Cheney", phone: "01455 244 706", landmark: "Hercules Revived", road: "Main Street", postcodes: ["CV13 0"] }),
  'sutton-on-the-hill': buildTown({ name: "Sutton on the Hill", phone: "01283 890215", landmark: "St Michael's Church", road: "Common Lane", postcodes: ["DE6 5"] }),
  'swadlincote': buildTown({ name: "Swadlincote", phone: "01283 890215", landmark: "Swadlincote Ski Centre", road: "High Street", postcodes: ["DE11 9"] }),
  'swannington': buildTown({ name: "Swannington", phone: "01530 654062", landmark: "Hough Mill", road: "Main Street", postcodes: ["LE67 8"] }),
  'swithland': buildTown({ name: "Swithland", phone: "01509 642158", landmark: "Swithland Woods", road: "Main Street", postcodes: ["LE12 8"] }),
  'syston': buildTown({ name: "Syston", phone: "01164 105069", landmark: "Syston Square", road: "High Street", postcodes: ["LE7 1"] }),
  'tamworth': buildTown({ name: "Tamworth", phone: "01827 802163", landmark: "Tamworth Castle", road: "Market Street", postcodes: ["B77 1", "B78 1", "B79 1"] }),
  'tatenhill': buildTown({ name: "Tatenhill", phone: "01283 890215", landmark: "St Michael's Church", road: "Main Street", postcodes: ["DE13 9"] }),
  'thringstone': buildTown({ name: "Thringstone", phone: "01530 654062", landmark: "Grace Dieu Priory", road: "Loughborough Road", postcodes: ["LE67 8"] }),
  'thrussington': buildTown({ name: "Thrussington", phone: "01509 642158", landmark: "The Star Inn", road: "The Green", postcodes: ["LE7 4"] }),
  'thulston': buildTown({ name: "Thulston", phone: "01332 806148", landmark: "The Harrington Arms", road: "Broad Lane", postcodes: ["DE72 3"] }),
  'thurmaston': buildTown({ name: "Thurmaston", phone: "01164 105069", landmark: "Thurmaston Shopping Centre", road: "Melton Road", postcodes: ["LE4 8"] }),
  'ticknall': buildTown({ name: "Ticknall", phone: "01332 806148", landmark: "Calke Abbey", road: "Main Street", postcodes: ["DE73 7"] }),
  'tonge': buildTown({ name: "Tonge", phone: "01530 654062", landmark: "Breedon Priory Golf Club", road: "Tonge Station Road", postcodes: ["DE73 8"] }),
  'tutbury': buildTown({ name: "Tutbury", phone: "01283 890215", landmark: "Tutbury Castle", road: "High Street", postcodes: ["DE13 9"] }),
  'two-gates': buildTown({ name: "Two Gates", phone: "01827 802163", landmark: "Two Gates Ragged School", road: "Watling Street", postcodes: ["B77 1"] }),
  'twycross': buildTown({ name: "Twycross", phone: "01455 244 706", landmark: "Twycross Zoo", road: "Burton Road", postcodes: ["CV13 0"] }),
  'ulverscroft': buildTown({ name: "Ulverscroft", phone: "01164 105069", landmark: "Ulverscroft Priory", road: "Priory Lane", postcodes: ["LE67 9"] }),
  'upton': buildTown({ name: "Upton", phone: "01455 244 706", landmark: "Upton House", road: "A444", postcodes: ["CV13 0"] }),
  'walton-on-the-wolds': buildTown({ name: "Walton on the Wolds", phone: "01509 642158", landmark: "The Anchor", road: "New Lane", postcodes: ["LE12 8"] }),
  'walton-on-trent': buildTown({ name: "Walton on Trent", phone: "01283 890215", landmark: "The White Swan", road: "Main Street", postcodes: ["DE12 8"] }),
  'wanlip': buildTown({ name: "Wanlip", phone: "01164 105069", landmark: "Wanlip Hall", road: "Rectory Lane", postcodes: ["LE7 4"] }),
  'warton': buildTown({ name: "Warton", phone: "01827 802163", landmark: "The Office at Warton", road: "Church Road", postcodes: ["B79 0"] }),
  'wellsborough': buildTown({ name: "Wellsborough", phone: "01455 244 706", landmark: "Wellsborough Hall", road: "Bosworth Road", postcodes: ["CV13 0"] }),
  'weston-on-trent': buildTown({ name: "Weston on Trent", phone: "01332 806148", landmark: "The Coopers Arms", road: "The Green", postcodes: ["DE72 2"] }),
  'whitwick': buildTown({ name: "Whitwick", phone: "01530 654062", landmark: "The Black Horse", road: "City of Dan", postcodes: ["LE67 5"] }),
  'wigston': buildTown({ name: "Wigston", phone: "01164 105069", landmark: "Wigston Framework Knitters Museum", road: "Leicester Road", postcodes: ["LE18 1"] }),
  'willesley': buildTown({ name: "Willesley", phone: "01530 654062", landmark: "Willesley Park Golf Club", road: "Willesley Road", postcodes: ["LE65 2"] }),
  'willington': buildTown({ name: "Willington", phone: "01332 806148", landmark: "Mercia Marina", road: "Twiggys Way", postcodes: ["DE65 6"] }),
  'wilnecote': buildTown({ name: "Wilnecote", phone: "01827 802163", landmark: "Wilnecote Station", road: "Watling Street", postcodes: ["B77 5"] }),
  'wilson': buildTown({ name: "Wilson", phone: "01530 654062", landmark: "The Bulls Head", road: "Main Street", postcodes: ["DE73 8"] }),
  'winshill': buildTown({ name: "Winshill", phone: "01283 890215", landmark: "Winshill Water Tower", road: "High Bank Road", postcodes: ["DE15 0"] }),
  'witherley': buildTown({ name: "Witherley", phone: "01455 244 706", landmark: "The Blue Lion", road: "Post Office Lane", postcodes: ["CV13 0"] }),
  'woodhouse': buildTown({ name: "Woodhouse", phone: "01509 642158", landmark: "St Mary in the Elms", road: "School Lane", postcodes: ["LE12 8"] }),
  'woodhouse-eaves': buildTown({ name: "Woodhouse Eaves", phone: "01509 642158", landmark: "The Curzon Arms", road: "Maplewell Road", postcodes: ["LE12 8"] }),
  'woodville': buildTown({ name: "Woodville", phone: "01283 890215", landmark: "Woodville Clock Tower", road: "High Street", postcodes: ["DE11 7"] }),
  'worthington': buildTown({ name: "Worthington", phone: "01530 654062", landmark: "The Malt Shovel", road: "Main Street", postcodes: ["LE65 1"] }),
  'wymeswold': buildTown({ name: "Wymeswold", phone: "01509 642158", landmark: "The Three Crowns", road: "Far Street", postcodes: ["LE12 6"] })
};

// =========================================================
// === HELPER EXPORTS FOR PAGE RENDERING & SCHEMA GENERATION
// =========================================================

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