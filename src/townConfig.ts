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
  waterPressureNotes: string;
  soilType: string;
  floodRisk: string;
  insuranceNotes: string;
  typicalCallouts: string[];
  authorityParagraphs: string[];
}

const MAIN_MAP_LINK = "https://share.google/vCD4kQc8elUleD1EE";

function buildTown(data: Partial<TownData> & { name: string; phone: string; landmark: string; road: string; postcodes: string[] }): TownData {
  // Extract defaults for dynamic SEO paragraph generation
  const housingStr = data.housingTypes ? data.housingTypes[0].toLowerCase() : "mix of residential properties";
  const problemStr = data.commonProblems ? data.commonProblems[0].toLowerCase() : "unexpected boiler breakdowns";
  const heatingStr = data.heatingTypes ? data.heatingTypes[0].toLowerCase() : "gas central heating systems";
  const soilStr = data.soilType ? data.soilType.toLowerCase() : "local ground conditions";

  return {
    name: data.name,
    phone: data.phone,
    landmark: data.landmark,
    road: data.road,
    postcodes: data.postcodes,
    description: data.description || `Professional emergency plumbing, heating, and drainage services across ${data.name} and the surrounding ${data.postcodes.join(', ')} postcodes. Available 24/7.`,
    mapSrc: data.mapSrc || MAIN_MAP_LINK,
    housingTypes: data.housingTypes || ["Victorian Terraces", "Suburban Semi-Detached Properties", "Modern Housing Developments"],
    commonProblems: data.commonProblems || ["Hard water limescale scaling", "Boiler baseline pressure loss", "Blocked localized external grid networks"],
    drainageTypes: data.drainageTypes || ["Vitrified Clay Infrastructure Tracks", "Modern High-Flow PVC Radial Systems"],
    heatingTypes: data.heatingTypes || ["High-Efficiency Condensing Combi Boilers", "Traditional Flow Unvented Systems"],
    propertyAgeProfile: data.propertyAgeProfile || "Mixed residential stock spanning historic cores to late-20th-century expansions.",
    commercialAreas: data.commercialAreas || [`${data.name} High Street Outlets`, "Local Corporate Trade Hubs"],
    nearbyAreas: data.nearbyAreas || ["Surrounding District Commuter Arteries"],
    waterPressureNotes: data.waterPressureNotes || "Maintains high baseline structural parameters across the central sector.",
    soilType: data.soilType || "Heavy localized clay structures.",
    floodRisk: data.floodRisk || "Low overall risk profile.",
    insuranceNotes: data.insuranceNotes || "Trace and access tracking documentation provided seamlessly for policy validation.",
    typicalCallouts: data.typicalCallouts || ["Emergency fluid isolation", "Main structural drain descaling", "Combi boiler flame diagnostics"],
    
    // SMART GENERATOR: If you don't write custom paragraphs, it builds highly specific ones using the town's exact data profile
    authorityParagraphs: data.authorityParagraphs || [
      `Our emergency plumbing engineers operate daily across ${data.name}, navigating the specific structural challenges of the local water network. Because the area features a heavy concentration of ${housingStr}, we are frequently deployed to resolve localized issues like ${problemStr} along ${data.road} and its surrounding residential streets.`,
      `We maintain rapid response times across the ${data.postcodes[0]} postcode district by keeping fully stocked service units stationed near ${data.landmark}. Our engineers carry specialized components suited for the ${heatingStr} common to the area, while our drainage teams are fully equipped to handle structural pipe shifts caused by the underlying ${soilStr}.`
    ]
  };
}

export const towns: Record<string, TownData> = {
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
  'quorn': buildTown({
    name: "Quorn", phone: "01509 447469", landmark: "Great Central Railway", road: "High Street", postcodes: ["LE12"],
    authorityParagraphs: [
      "The premium housing stock in Quorn often demands high-end plumbing solutions, from unvented Megaflo cylinder installations in large detached properties to careful heritage plumbing near the Great Central Railway.",
      "Our teams operate discreetly and efficiently along High Street, understanding that LE12 homeowners expect clean, damage-free trace and access for hidden leaks in complex central heating systems."
    ]
  }),

  // ==========================================
  // === 0116 LEICESTER & LE6 REGIONAL AREA ===
  // ==========================================
  'groby': buildTown({
    name: "Groby", phone: "01164 105069", landmark: "Groby Pool", road: "Leicester Road", postcodes: ["LE6"],
    authorityParagraphs: [
      "Groby's expansion from a historic village to a major LE6 commuter hub means our vans navigate a mix of old stone drainage networks and 1980s plastic microbore heating systems daily.",
      "Positioned near Leicester Road, we can isolate burst pipes rapidly before they cause structural water damage. We carry specialized fittings to bridge imperial copper pipes with modern metric adaptations."
    ]
  }),
  'glenfield': buildTown({
    name: "Glenfield", phone: "01164 105069", landmark: "Leicestershire County Council HQ", road: "Station Road", postcodes: ["LE3"],
    authorityParagraphs: [
      "With proximity to major civic buildings and a dense suburban sprawl, Glenfield requires highly responsive plumbing operations. We tackle localized hard-water scale buildup in combi-boilers across the LE3 postcodes.",
      "Our rapid deployment from Station Road ensures that whether you have a collapsed external drain or a seized stopcock, our commercial and residential teams clear the fault within strict timeline parameters."
    ]
  }),

  // ==========================================
  // === 01283 BURTON & SOUTH DERBYSHIRE =====
  // ==========================================
  'burton-upon-trent': buildTown({
    name: "Burton upon Trent", phone: "01283 890215", landmark: "The National Brewery Centre", road: "High Street", postcodes: ["DE14"],
    authorityParagraphs: [
      "Burton's world-famous brewing heritage means the municipal water network is intrinsically tied to the local water table, known for its high mineral content. This 'Burton Snatch' translates to aggressive limescale scaling in domestic DE14 boilers.",
      "Our engineers install heavy-duty magnetic filters and scale reducers daily across High Street and the surrounding terraces, ensuring optimal heat transfer and extending boiler lifespans in hard-water zones."
    ]
  }),
  'swadlincote': buildTown({
    name: "Swadlincote", phone: "01283 890215", landmark: "Swadlincote Ski Centre", road: "High Street", postcodes: ["DE11"],
    authorityParagraphs: [
      "Sitting on a bed of heavy clay historically used for pottery, Swadlincote properties are prone to ground shifting during extreme weather, frequently resulting in misaligned external clay drainage tracks.",
      "Operating across the DE11 postcodes, our CCTV drain surveying equipment pinpoints these structural fractures near High Street without the need for destructive, exploratory digging."
    ]
  }),

  // ==========================================
  // === 01332 DERBY SUBURBAN BORDERS =========
  // ==========================================
  'melbourne': buildTown({
    name: "Melbourne", phone: "01332 806148", landmark: "Melbourne Hall", road: "High Street", postcodes: ["DE73"],
    authorityParagraphs: [
      "The historic conservation constraints in Melbourne demand precision plumbing. We navigate the complex rooflines and heritage pipework surrounding Melbourne Hall, ensuring aesthetic compliance while upgrading to high-efficiency condensing systems.",
      "Properties along High Street often suffer from shared drainage restrictions. Our high-pressure water jetting teams clear fatbergs and root ingress in DE73 without risking damage to 18th-century infrastructure."
    ]
  }),
  'kings-newton': buildTown({
    name: "Kings Newton", phone: "01332 806148", landmark: "Kings Newton Hall", road: "Main Street", postcodes: ["DE73"],
    authorityParagraphs: [
      "Kings Newton requires bespoke plumbing approaches, particularly for the larger properties transitioning away from older oil or conventional flow boilers to modern, pressurized unvented systems.",
      "We position fully loaded service units on Main Street, allowing us to respond to emergency fluid isolation and thermal breakdown calls across DE73 with zero merge delay."
    ]
  }),

  // ==========================================
  // === 01827 TAMWORTH & WARWICK BORDERS =====
  // ==========================================
  'tamworth': buildTown({
    name: "Tamworth", phone: "01827 802163", landmark: "Tamworth Castle", road: "Market Street", postcodes: ["B77", "B78", "B79"],
    authorityParagraphs: [
      "Spanning multiple B-postcode sectors, Tamworth presents a diverse plumbing landscape. We routinely execute trace and access operations in the historic areas near Tamworth Castle, while managing high-pressure unvented installations in the modern suburban rings.",
      "Our rapid response teams operate on a 60-minute SLA for burst pipes and boiler lockouts across Market Street, utilizing the A5 corridor to ensure swift geographical coverage."
    ]
  }),
  
  // =========================================================
  // VILLAGES (Automatically populated via the Smart Generator)
  // =========================================================
  'albert-village': buildTown({ name: "Albert Village", phone: "01530 654062", landmark: "Albert Village Lake", road: "Occupation Road", postcodes: ["DE11"] }),
  'bagworth': buildTown({ name: "Bagworth", phone: "01530 654062", landmark: "Bagworth Heath Woods", road: "Station Road", postcodes: ["LE67 1"] }),
  'bardon-hill': buildTown({ name: "Bardon Hill", phone: "01530 654062", landmark: "Bardon Truck Park", road: "Beveridge Lane", postcodes: ["LE67 1"] }),
  'battram': buildTown({ name: "Battram", phone: "01530 654062", landmark: "Battram Woods", road: "Wood Road", postcodes: ["LE67"] }),
  'blackfordby': buildTown({ name: "Blackfordby", phone: "01530 654062", landmark: "The Black Lion", road: "Main Street", postcodes: ["DE11 8"] }),
  'boundary': buildTown({ name: "Boundary", phone: "01530 654062", landmark: "Ashby Road", road: "Ashby Road", postcodes: ["DE11"] }),
  'breedon-on-the-hill': buildTown({ name: "Breedon on the Hill", phone: "01530 654062", landmark: "The Priory Church", road: "Ashby Road", postcodes: ["DE73"] }),
  'coleorton': buildTown({ name: "Coleorton", phone: "01530 654062", landmark: "Coleorton Hall", road: "The Moorlands", postcodes: ["LE67 8"] }),
  'copt-oak': buildTown({ name: "Copt Oak", phone: "01530 654062", landmark: "The Copt Oak Pub", road: "Whitwick Road", postcodes: ["LE67"] }),
  'donington-le-heath': buildTown({ name: "Donington le Heath", phone: "01530 654062", landmark: "The Manor House", road: "Manor Road", postcodes: ["LE67 2"] }),
  'donisthorpe': buildTown({ name: "Donisthorpe", phone: "01530 654062", landmark: "Donisthorpe Woodland Park", road: "Church Street", postcodes: ["DE12"] }),
  'ellistown': buildTown({ name: "Ellistown", phone: "01530 654062", landmark: "South Leicestershire College", road: "Beveridge Lane", postcodes: ["LE67 1"] }),
  'griffydam': buildTown({ name: "Griffydam", phone: "01530 654062", landmark: "The Griffin Inn", road: "Top Road", postcodes: ["LE67 8"] }),
  'heather': buildTown({ name: "Heather", phone: "01530 654062", landmark: "Sence Valley", road: "Swepstone Road", postcodes: ["LE67 6"] }),
  'hugglescote': buildTown({ name: "Hugglescote", phone: "01530 654062", landmark: "The Gate Inn", road: "Ashby Road", postcodes: ["LE67 2"] }),
  'leicestershire': buildTown({ name: "Leicestershire", phone: "01530 654062", landmark: "Charnwood Forest", road: "The M1 Corridor", postcodes: ["LE"] }),
  'lount': buildTown({ name: "Lount", phone: "01530 654062", landmark: "The Ferrers Arms", road: "Nottingham Road", postcodes: ["LE65 1"] }),
  'moira': buildTown({ name: "Moira", phone: "01530 654062", landmark: "Moira Furnace", road: "Ashby Road", postcodes: ["DE12 6"] }),
  'newbold-coleorton': buildTown({ name: "Newbold Coleorton", phone: "01530 654062", landmark: "The Cross Keys", road: "Ashby Road", postcodes: ["LE67 8"] }),
  'normanton-le-heath': buildTown({ name: "Normanton le Heath", phone: "01530 654062", landmark: "The Packington Border", road: "Ashby Road", postcodes: ["LE67 2"] }),
  'oakthorpe': buildTown({ name: "Oakthorpe", phone: "01530 654062", landmark: "The Holly Bush", road: "Measham Road", postcodes: ["DE12"] }),
  'osgathorpe': buildTown({ name: "Osgathorpe", phone: "01530 654062", landmark: "St Mary's Church", road: "Ashby Road", postcodes: ["LE12"] }),
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
  'willesley': buildTown({ name: "Willesley", phone: "01530 654062", landmark: "Willesley Park Golf Club", road: "Willesley Road", postcodes: ["LE65 2"] }),
  'wilson': buildTown({ name: "Wilson", phone: "01530 654062", landmark: "The Bulls Head", road: "Main Street", postcodes: ["DE73"] }),
  'worthington': buildTown({ name: "Worthington", phone: "01530 654062", landmark: "The Malt Shovel", road: "Main Street", postcodes: ["LE65 1"] }),
  'mountsorrel': buildTown({ name: "Mountsorrel", phone: "01509 447469", landmark: "The Buttercross", road: "Leicester Road", postcodes: ["LE12"] }),
  'barrow-upon-soar': buildTown({ name: "Barrow upon Soar", phone: "01509 447469", landmark: "River Soar", road: "High Street", postcodes: ["LE12"] }),
  'sileby': buildTown({ name: "Sileby", phone: "01509 447469", landmark: "Sileby Mill", road: "King Street", postcodes: ["LE12"] }),
  'woodhouse-eaves': buildTown({ name: "Woodhouse Eaves", phone: "01509 447469", landmark: "Beacon Hill", road: "Main Street", postcodes: ["LE12"] }),
  'swithland': buildTown({ name: "Swithland", phone: "01509 447469", landmark: "Swithland Reservoir", road: "Main Street", postcodes: ["LE12"] }),
  'cossington': buildTown({ name: "Cossington", phone: "01509 447469", landmark: "Cossington Meadows", road: "Main Street", postcodes: ["LE7"] }),
  'shepshed': buildTown({ name: "Shepshed", phone: "01509 642158", landmark: "Garendon Park", road: "Market Place", postcodes: ["LE12"] }),
  'hathern': buildTown({ name: "Hathern", phone: "01509 642158", landmark: "Dishley Grange", road: "Wide Street", postcodes: ["LE12"] }),
  'rothley': buildTown({ name: "Rothley", phone: "01509 447469", landmark: "Rothley Court", road: "Cross Green", postcodes: ["LE7"] }),
  'woodhouse': buildTown({ name: "Woodhouse", phone: "01509 447469", landmark: "St Mary's Church", road: "Forest Road", postcodes: ["LE12"] }),
  'east-leake': buildTown({ name: "East Leake", phone: "01509 642158", landmark: "British Gypsum Works", road: "Main Street", postcodes: ["LE12"] }),
  'wymeswold': buildTown({ name: "Wymeswold", phone: "01509 642158", landmark: "Old RAF Airfield", road: "Far Street", postcodes: ["LE12"] }),
  'burton-on-the-wolds': buildTown({ name: "Burton on the Wolds", phone: "01509 642158", landmark: "Burton Hall", road: "Melton Road", postcodes: ["LE12"] }),
  'cotes': buildTown({ name: "Cotes", phone: "01509 642158", landmark: "Cotes Bridge", road: "Nottingham Road", postcodes: ["LE12"] }),
  'prestwold': buildTown({ name: "Prestwold", phone: "01509 642158", landmark: "Prestwold Hall", road: "Prestwold Lane", postcodes: ["LE12"] }),
  'walton-on-the-wolds': buildTown({ name: "Walton on the Wolds", phone: "01509 642158", landmark: "The Village Green", road: "New Lane", postcodes: ["LE12"] }),
  'hoton': buildTown({ name: "Hoton", phone: "01509 642158", landmark: "Hoton Village Hall", road: "Wymeswold Road", postcodes: ["LE12"] }),
  'seagrave': buildTown({ name: "Seagrave", phone: "01509 642158", landmark: "Leicester City Training Ground", road: "King Street", postcodes: ["LE12"] }),
  'thrussington': buildTown({ name: "Thrussington", phone: "01509 642158", landmark: "The Holy Trinity Church", road: "Seagrave Road", postcodes: ["LE7"] }),
  'rearsby': buildTown({ name: "Rearsby", phone: "01509 642158", landmark: "The Rearsby Brook", road: "Melton Road", postcodes: ["LE7"] }),
  'east-goscote': buildTown({ name: "East Goscote", phone: "01509 642158", landmark: "The Plough", road: "Long Furrow", postcodes: ["LE7"] }),
  'queniborough': buildTown({ name: "Queniborough", phone: "01509 642158", landmark: "St Mary's Church", road: "Main Street", postcodes: ["LE7"] }),
  'syston': buildTown({ name: "Syston", phone: "01509 642158", landmark: "Syston Train Station", road: "Melton Road", postcodes: ["LE7"] }),
  'barkby': buildTown({ name: "Barkby", phone: "01509 642158", landmark: "Barkby Brook", road: "Main Street", postcodes: ["LE7"] }),
  'barkby-thorpe': buildTown({ name: "Barkby Thorpe", phone: "01509 642158", landmark: "The Thorpes Stretch", road: "Barkby Thorpe Lane", postcodes: ["LE7"] }),
  'thurmaston': buildTown({ name: "Thurmaston", phone: "01509 642158", landmark: "Thurmaston Retail Park", road: "Melton Road", postcodes: ["LE4"] }),
  'birstall': buildTown({ name: "Birstall", phone: "01509 642158", landmark: "Watermead Country Park", road: "Sibson Road", postcodes: ["LE4"] }),
  'wanlip': buildTown({ name: "Wanlip", phone: "01509 642158", landmark: "Wanlip Sewage Works", road: "Wanlip Lane", postcodes: ["LE7"] }),
  'ulverscroft': buildTown({ name: "Ulverscroft", phone: "01509 447469", landmark: "Ulverscroft Priory", road: "Priory Lane", postcodes: ["LE67"] }),
  'cropston': buildTown({ name: "Cropston", phone: "01509 447469", landmark: "Cropston Reservoir", road: "Station Road", postcodes: ["LE7"] }),
  'anstey': buildTown({ name: "Anstey", phone: "01509 447469", landmark: "The Anstey Packhorse Bridge", road: "Cropston Road", postcodes: ["LE7"] }),
  'charley': buildTown({ name: "Charley", phone: "01509 447469", landmark: "Charley Woods", road: "Charley Road", postcodes: ["LE12"] }),
  'ratby': buildTown({ name: "Ratby", phone: "01164 105069", landmark: "the Burroughs", road: "Main Street", postcodes: ["LE6"] }),
  'newtown-linford': buildTown({ name: "Newtown Linford", phone: "01164 105069", landmark: "Bradgate Park", road: "Bradgate Road", postcodes: ["LE6"] }),
  'field-head': buildTown({ name: "Field Head", phone: "01164 105069", landmark: "Markfield Court", road: "Ashby Road", postcodes: ["LE67"] }),
  'kirby-muxloe': buildTown({ name: "Kirby Muxloe", phone: "01164 105069", landmark: "Kirby Muxloe Castle", road: "Main Street", postcodes: ["LE9"] }),
  'leicester-forest-east': buildTown({ name: "Leicester Forest East", phone: "01164 105069", landmark: "LFE Service Station", road: "Hinckley Road", postcodes: ["LE3"] }),
  'desford': buildTown({ name: "Desford", phone: "01164 105069", landmark: "Caterpillar Factory", road: "Leicester Lane", postcodes: ["LE9"] }),
  'botcheston': buildTown({ name: "Botcheston", phone: "01164 105069", landmark: "The Greyhound Inn", road: "Main Street", postcodes: ["LE9"] }),
  'newbold-verdon': buildTown({ name: "Newbold Verdon", phone: "01164 105069", landmark: "Newbold Verdon Library", road: "Main Street", postcodes: ["LE9"] }),
  'braunstone': buildTown({ name: "Braunstone", phone: "01164 105069", landmark: "Braunstone Park", road: "Braunstone Lane", postcodes: ["LE3"] }),
  'oadby': buildTown({ name: "Oadby", phone: "01164 105069", landmark: "Leicester Racecourse", road: "The Parade", postcodes: ["LE2"] }),
  'wigston': buildTown({ name: "Wigston", phone: "01164 105069", landmark: "Wigston Magna Framework", road: "Bull Head Street", postcodes: ["LE18"] }),
  'stretton': buildTown({ name: "Stretton", phone: "01283 890215", landmark: "St Mary's Church", road: "Main Street", postcodes: ["DE13"] }),
  'branston': buildTown({ name: "Branston", phone: "01283 890215", landmark: "Branston Water Park", road: "Main Street", postcodes: ["DE14"] }),
  'horninglow': buildTown({ name: "Horninglow", phone: "01283 890215", landmark: "The Horninglow Hub", road: "Tutbury Road", postcodes: ["DE13"] }),
  'stapenhill': buildTown({ name: "Stapenhill", phone: "01283 890215", landmark: "Stapenhill Gardens", road: "St Peter's Street", postcodes: ["DE15"] }),
  'winshill': buildTown({ name: "Winshill", phone: "01283 890215", landmark: "Newton Park", road: "Church Hill", postcodes: ["DE15"] }),
  'rolleston-on-dove': buildTown({ name: "Rolleston on Dove", phone: "01283 890215", landmark: "The Croft", road: "Station Road", postcodes: ["DE13"] }),
  'tutbury': buildTown({ name: "Tutbury", phone: "01283 890215", landmark: "Tutbury Castle", road: "High Street", postcodes: ["DE13"] }),
  'barton-under-needwood': buildTown({ name: "Barton-under-Needwood", phone: "01283 890215", landmark: "Barton Marina", road: "Main Street", postcodes: ["DE13"] }),
  'anslow': buildTown({ name: "Anslow", phone: "01283 890215", landmark: "The Holy Trinity Church", road: "Main Road", postcodes: ["DE13"] }),
  'tatenhill': buildTown({ name: "Tatenhill", phone: "01283 890215", landmark: "Tatenhill Brook", road: "Main Street", postcodes: ["DE13"] }),
  'church-broughton': buildTown({ name: "Church Broughton", phone: "01283 890215", landmark: "Church Broughton School", road: "Main Street", postcodes: ["DE65"] }),
  'sutton-on-the-hill': buildTown({ name: "Sutton on the Hill", phone: "01283 890215", landmark: "St Michael's Church", road: "Church Lane", postcodes: ["DE65"] }),
  'overseal': buildTown({ name: "Overseal", phone: "01283 890215", landmark: "Overseal Village Hall", road: "Main Street", postcodes: ["DE12"] }),
  'netherseal': buildTown({ name: "Netherseal", phone: "01283 890215", landmark: "St Peter's Church", road: "Main Street", postcodes: ["DE12"] }),
  'coton-in-the-elms': buildTown({ name: "Coton in the Elms", phone: "01283 890215", landmark: "The Village Green", road: "Burton Road", postcodes: ["DE12"] }),
  'lullington': buildTown({ name: "Lullington", phone: "01283 890215", landmark: "All Saints Church", road: "Main Street", postcodes: ["DE12"] }),
  'rosliston': buildTown({ name: "Rosliston", phone: "01283 890215", landmark: "Rosliston Forestry Centre", road: "Main Street", postcodes: ["DE12"] }),
  'walton-on-trent': buildTown({ name: "Walton-on-Trent", phone: "01283 890215", landmark: "Walton Bridge", road: "Main Street", postcodes: ["DE12"] }),
  'cauldwell': buildTown({ name: "Cauldwell", phone: "01283 890215", landmark: "Cauldwell Hall", road: "Sandy Lane", postcodes: ["DE12"] }),
  'bretby': buildTown({ name: "Bretby", phone: "01283 890215", landmark: "Bretby Hall", road: "Ashby Road", postcodes: ["DE15"] }),
  'newton-solney': buildTown({ name: "Newton Solney", phone: "01283 890215", landmark: "The Unicorn Inn", road: "Main Street", postcodes: ["DE15"] }),
  'hartshorne': buildTown({ name: "Hartshorne", phone: "01283 890215", landmark: "The Bull's Head", road: "Main Street", postcodes: ["DE11"] }),
  'etwall': buildTown({ name: "Etwall", phone: "01283 890215", landmark: "Etwall Leisure Centre", road: "Main Street", postcodes: ["DE65"] }),
  'hilton': buildTown({ name: "Hilton", phone: "01283 890215", landmark: "Hilton Village Hall", road: "Derby Road", postcodes: ["DE65"] }),
  'hatton': buildTown({ name: "Hatton", phone: "01283 890215", landmark: "Hatton Station", road: "Station Road", postcodes: ["DE65"] }),
  'scropton': buildTown({ name: "Scropton", phone: "01283 890215", landmark: "Scropton Church", road: "Main Street", postcodes: ["DE65"] }),
  'marston-on-dove': buildTown({ name: "Marston on Dove", phone: "01283 890215", landmark: "St Mary's Church", road: "Marston Lane", postcodes: ["DE65"] }),
  'egginton': buildTown({ name: "Egginton", phone: "01283 890215", landmark: "Egginton Hall", road: "Main Street", postcodes: ["DE65"] }),
  'burnaston': buildTown({ name: "Burnaston", phone: "01283 890215", landmark: "Toyota Factory", road: "Egginton Road", postcodes: ["DE65"] }),
  'dalbury-lees': buildTown({ name: "Dalbury Lees", phone: "01283 890215", landmark: "The Village Green", road: "Lees Road", postcodes: ["DE65"] }),
  'aston-on-trent': buildTown({ name: "Aston-on-Trent", phone: "01332 806148", landmark: "Aston Hall", road: "Derby Road", postcodes: ["DE72"] }),
  'weston-on-trent': buildTown({ name: "Weston-on-Trent", phone: "01332 806148", landmark: "St Mary's Church", road: "Main Street", postcodes: ["DE72"] }),
  'shardlow': buildTown({ name: "Shardlow", phone: "01332 806148", landmark: "Shardlow Wharf Canal Village", road: "London Road", postcodes: ["DE72"] }),
  'great-wilne': buildTown({ name: "Great Wilne", phone: "01332 806148", landmark: "The River Derwent", road: "Wilne Lane", postcodes: ["DE72"] }),
  'thulston': buildTown({ name: "Thulston", phone: "01332 806148", landmark: "The Harrington Arms", road: "Snelsmoor Lane", postcodes: ["DE72"] }),
  'elvaston': buildTown({ name: "Elvaston", phone: "01332 806148", landmark: "Elvaston Castle Country Park", road: "Borrowash Road", postcodes: ["DE72"] }),
  'ambaston': buildTown({ name: "Ambaston", phone: "01332 806148", landmark: "The Ambaston Lanes", road: "Ambaston Lane", postcodes: ["DE72"] }),
  'barrow-upon-trent': buildTown({ name: "Barrow upon Trent", phone: "01332 806148", landmark: "St Wilfrid's Church", road: "Twyford Road", postcodes: ["DE73"] }),
  'stenson-fields': buildTown({ name: "Stenson Fields", phone: "01332 806148", landmark: "Stenson Lock Marina", road: "Pilgrims Way", postcodes: ["DE24"] }),
  'willington': buildTown({ name: "Willington", phone: "01332 806148", landmark: "Willington Power Station Towers", road: "Repton Road", postcodes: ["DE65"] }),
  'findern': buildTown({ name: "Findern", phone: "01332 806148", landmark: "Findern Green", road: "Dunsmoore Lane", postcodes: ["DE65"] }),
  'repton': buildTown({ name: "Repton", phone: "01332 806148", landmark: "Repton School Crypt", road: "Willesley Road", postcodes: ["DE65"] }),
  'milton': buildTown({ name: "Milton", phone: "01332 806148", landmark: "The Milton Hamlets", road: "Main Street", postcodes: ["DE65"] }),
  'foremark': buildTown({ name: "Foremark", phone: "01332 806148", landmark: "Foremark Reservoir", road: "Milton Road", postcodes: ["DE65"] }),
  'chellaston': buildTown({ name: "Chellaston", phone: "01332 806148", landmark: "Chellaston Academy", road: "High Street", postcodes: ["DE73"] }),
  'alvaston': buildTown({ name: "Alvaston", phone: "01332 806148", landmark: "Alvaston Park", road: "London Road", postcodes: ["DE24"] }),
  'boulton-moor': buildTown({ name: "Boulton Moor", phone: "01332 806148", landmark: "Boulton Moor Expansion", road: "Chellaston Lane", postcodes: ["DE24"] }),
  'castle-donington': buildTown({ name: "Castle Donington", phone: "01332 806148", landmark: "Donington Park Circuit", road: "High Street", postcodes: ["DE74"] }),
  'hemington': buildTown({ name: "Hemington", phone: "01332 806148", landmark: "The Jolly Sailor", road: "Main Street", postcodes: ["DE74"] }),
  'lockington': buildTown({ name: "Lockington", phone: "01332 806148", landmark: "Lockington Church", road: "Church Lane", postcodes: ["DE74"] }),
  'fazeley': buildTown({ name: "Fazeley", phone: "01827 802163", landmark: "Fazeley Junction", road: "Lichfield Road", postcodes: ["B78"] }),
  'wilnecote': buildTown({ name: "Wilnecote", phone: "01827 802163", landmark: "Wilnecote Train Station", road: "Watling Street", postcodes: ["B77"] }),
  'amington': buildTown({ name: "Amington", phone: "01827 802163", landmark: "Amington Hall", road: "Tamworth Road", postcodes: ["B79"] }),
  'dosthill': buildTown({ name: "Dosthill", phone: "01827 802163", landmark: "Dosthill Quarry", road: "High Street", postcodes: ["B77"] }),
  'two-gates': buildTown({ name: "Two Gates", phone: "01827 802163", landmark: "The Two Gates Crossroads", road: "Tamworth Road", postcodes: ["B77"] }),
  'stonydelph': buildTown({ name: "Stonydelph", phone: "01827 802163", landmark: "Stonydelph Corner", road: "Pennine Way", postcodes: ["B77"] }),
  'glascote': buildTown({ name: "Glascote", phone: "01827 802163", landmark: "Glascote Basin", road: "Glascote Road", postcodes: ["B77"] }),
  'bolehall': buildTown({ name: "Bolehall", phone: "01827 802163", landmark: "Bolehall Manor", road: "Ambleside", postcodes: ["B77"] }),
  'hopwas': buildTown({ name: "Hopwas", phone: "01827 802163", landmark: "Hopwas Woods", road: "Hints Road", postcodes: ["B78"] }),
  'dordon': buildTown({ name: "Dordon", phone: "01827 802163", landmark: "Dordon Activity Centre", road: "Watling Street", postcodes: ["B78"] }),
  'polesworth': buildTown({ name: "Polesworth", phone: "01827 802163", landmark: "Polesworth Abbey", road: "High Street", postcodes: ["B78"] }),
  'kingsbury': buildTown({ name: "Kingsbury", phone: "01827 802163", landmark: "Kingsbury Water Park", road: "Coventry Road", postcodes: ["B78"] }),
  'warton': buildTown({ name: "Warton", phone: "01827 802163", landmark: "The Office Park", road: "Main Street", postcodes: ["B79"] }),
  'grendon': buildTown({ name: "Grendon", phone: "01827 802163", landmark: "Grendon Church", road: "Boot Hill", postcodes: ["CV9"] }),
  'baddesley-ensor': buildTown({ name: "Baddesley Ensor", phone: "01827 802163", landmark: "Baddesley Common", road: "New Street", postcodes: ["CV9"] }),
  'atherstone': buildTown({ name: "Atherstone", phone: "01827 802163", landmark: "Atherstone Red Lion", road: "Long Street", postcodes: ["CV9"] }),
  'mancetter': buildTown({ name: "Mancetter", phone: "01827 802163", landmark: "Mancetter Manor", road: "Watling Street", postcodes: ["CV9"] }),
  'clifton-campville': buildTown({ name: "Clifton Campville", phone: "01827 802163", landmark: "St Andrew's Church", road: "Main Street", postcodes: ["B79"] }),
  'haunton': buildTown({ name: "Haunton", phone: "01827 802163", landmark: "Haunton Hall", road: "Main Road", postcodes: ["B79"] }),
  'elford': buildTown({ name: "Elford", phone: "01827 802163", landmark: "Elford Walled Gardens", road: "Church Road", postcodes: ["B79"] }),
  'harlaston': buildTown({ name: "Harlaston", phone: "01827 802163", landmark: "The White Lion", road: "Main Street", postcodes: ["B79"] }),
  'edingale': buildTown({ name: "Edingale", phone: "01827 802163", landmark: "Edingale Village Hall", road: "Croxall Road", postcodes: ["B79"] }),
  'drayton-bassett': buildTown({ name: "Drayton Bassett", phone: "01827 802163", landmark: "Drayton Manor", road: "Salters Lane", postcodes: ["B78"] }),
  'hints': buildTown({ name: "Hints", phone: "01827 802163", landmark: "Hints Quarry", road: "Watling Street", postcodes: ["B78"] }),
  'mile-oak': buildTown({ name: "Mile Oak", phone: "01827 802163", landmark: "Mile Oak Primary", road: "Mile Oak Road", postcodes: ["B78"] }),
  'ansley': buildTown({ name: "Ansley", phone: "01827 802163", landmark: "Ansley Church", road: "Birmingham Road", postcodes: ["CV10"] }),
  'arley': buildTown({ name: "Arley", phone: "01827 802163", landmark: "Arley Train Station", road: "Spring Hill", postcodes: ["CV7"] }),
  'astley': buildTown({ name: "Astley", phone: "01827 802163", landmark: "Astley Castle", road: "Astley Lane", postcodes: ["CV10"] }),
  'austrey': buildTown({ name: "Austrey", phone: "01827 802163", landmark: "The Bird in Hand", road: "Main Street", postcodes: ["CV9"] }),
  'baxterley': buildTown({ name: "Baxterley", phone: "01827 802163", landmark: "Baxterley Church", road: "Main Road", postcodes: ["CV9"] }),
  'bentley': buildTown({ name: "Bentley", phone: "01827 802163", landmark: "Bentley Woods", road: "Bentley Lane", postcodes: ["CV9"] }),
  'caldecote': buildTown({ name: "Caldecote", phone: "01827 802163", landmark: "Caldecote Hall", road: "Weddington Lane", postcodes: ["CV10"] }),
  'lea-marston': buildTown({ name: "Lea Marston", phone: "01827 802163", landmark: "Lea Marston Hotel", road: "Church Lane", postcodes: ["B76"] }),
  'middleton': buildTown({ name: "Middleton", phone: "01827 802163", landmark: "Middleton Hall", road: "Bodymoor Heath Road", postcodes: ["B78"] }),
  'nether-whitacre': buildTown({ name: "Nether Whitacre", phone: "01827 802163", landmark: "The Gate Inn", road: "Station Road", postcodes: ["B46"] }),
  'newton-regis': buildTown({ name: "Newton Regis", phone: "01827 802163", landmark: "Newton Regis Village Hall", road: "Main Street", postcodes: ["B79"] }),
  'seckington': buildTown({ name: "Seckington", phone: "01827 802163", landmark: "Seckington Mount", road: "Shuttington Road", postcodes: ["B79"] }),
  'no-mans-heath': buildTown({ name: "No Mans Heath", phone: "01827 802163", landmark: "The Four Counties Border", road: "Ashby Road", postcodes: ["B79"] }),
  'over-whitacre': buildTown({ name: "Over Whitacre", phone: "01827 802163", landmark: "St Mary's Church", road: "Nuneaton Road", postcodes: ["B46"] }),
  'shuttington': buildTown({ name: "Shuttington", phone: "01827 802163", landmark: "Shuttington Bridge", road: "Main Road", postcodes: ["B79"] })
};