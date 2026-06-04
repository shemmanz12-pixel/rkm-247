// 1. DEFINE THE STRUCTURE (Type Safety)
export interface TownData {
  // Existing fields
  name: string;
  phone?: string; 
  landmark?: string;
  road?: string;
  postcodes?: string[];
  description?: string;
  mapSrc?: string;

  // Optional fields used by newer SEO content
  postcode?: string;
  localSpice?: string;
  metaDescription?: string;

  // --- NEW SEO FIELDS (Fixes the 29 Errors) ---
  housingTypes?: string[];
  commonProblems?: string[];
  drainageTypes?: string[];
  heatingTypes?: string[];
  propertyAgeProfile?: string;
  soilType?: string;
  waterPressureNotes?: string;
  floodRisk?: string;
  insuranceNotes?: string;
  typicalCallouts?: string[];
  authorityParagraphs?: string[];
  commercialAreas?: string[];
  nearbyAreas?: string[];
}

// 2. DEFINE YOUR GOOGLE MAPS LINK
const MAIN_MAP_LINK = "https://share.google/vCD4kQc8elUleD1EE"; 

// 3. EXPORT AS A SINGLE OBJECT
// Notice there is only ONE "export const towns" now.
export const towns: Record<string, TownData> = {
  // --- TIER 1: MAJOR HUBS ---
  'coalville': {
    name: "Coalville",
    phone: "01530 654062",
    landmark: "the Clock Tower",
    road: "Memorial Square",
    postcodes: ["LE67 3", "LE67 4"],
    description: "We are the local emergency plumbers for LE67. Whether you are near the Clock Tower or have a blocked pipe near Coalville Park, our team is minutes away.",
    localSpice: "Fast, friendly service for homes and businesses near Coalville’s iconic Clock Tower and Memorial Square.",
    metaDescription: "Coalville plumbers for LE67. Emergency and routine plumbing near the Clock Tower, Memorial Square, and Coalville Park. Call 01530 654062.",
    mapSrc: MAIN_MAP_LINK,
    housingTypes: ["Victorian Terraces", "1950s Mining Cottages", "New Build Estates", "Commercial Retail Units"],
    commonProblems: ["Subsidence-related pipe cracks", "Blocked external drains", "Boiler pressure loss", "Leaking stopcocks"],
    drainageTypes: ["Combined Sewerage (Victorian)", "Modern Plastic Systems", "Clay Pipework"],
    heatingTypes: ["Combi Boilers", "System Boilers", "Gas Fires"],
    propertyAgeProfile: "Mixed: Heavy concentration of late 19th-century stock vs modern outskirts.",
    commercialAreas: ["Belvoir Shopping Centre", "Whitwick Business Park", "Hotel Street"],
    nearbyAreas: ["Whitwick", "Hugglescote", "Snibston"],
    waterPressureNotes: "Generally stable, though fluctuations occur near the higher ground of London Road.",
    soilType: "Heavy Clay / Coal Measures",
    floodRisk: "Moderate surface water risk in lower town centre areas during storms.",
    insuranceNotes: "Trace and access is frequently required for older terraced properties with shared supplies.",
    typicalCallouts: ["Unblocking shared drains", "Boiler repairs", "Emergency leak detection"],
    authorityParagraphs: [
      "Coalville's infrastructure presents a unique challenge due to its mining heritage. The ground movement over decades has left many older clay drainage systems vulnerable to hairline fractures, particularly in the Victorian terraces surrounding the town centre.",
      "In the LE67 3 and LE67 4 postcodes, we frequently encounter mixed plumbing systems where modern internal renovations meet original external cast iron stacks. This interface is a common failure point that our team is specifically trained to manage.",
      "Our engineers operate daily along the Memorial Square and High Street axis, giving us rapid access to both commercial businesses in the precinct and residential homes. We understand the specific pressure zones of the local water network, ensuring accurate diagnostics for boiler lockout issues."
    ]
  },
  'ashby-de-la-zouch': {
    name: "Ashby de la Zouch",
    phone: "01530 654062",
    landmark: "Ashby Castle",
    road: "Market Street",
    postcodes: ["LE65 1", "LE65 2"],
    description: "Serving the LE65 area. From commercial plumbing near The Bath Grounds to residential leaks near The Lamb Inn, we cover it all.",
    localSpice: "Expert plumbing for Ashby’s historic Market Street, Ashby Castle, and The Bath Grounds.",
    metaDescription: "Ashby de la Zouch plumbers for LE65. Local and emergency plumbing near Ashby Castle and Market Street. Call 01530 654062.",
    mapSrc: MAIN_MAP_LINK,
    housingTypes: ["Georgian Townhouses", "Grade II Listed Buildings", "Luxury Detached", "Modern Apartments"],
    commonProblems: ["Hard water limescale", "Lead pipe replacement", "Complex heating controls", "Shower pump failures"],
    drainageTypes: ["Victorian Brick Sewers", "Modern Separate Systems"],
    heatingTypes: ["High-flow System Boilers", "Underfloor Heating", "Unvented Cylinders"],
    propertyAgeProfile: "Historic Core (Pre-1900) with extensive 1990s-2000s expansion.",
    commercialAreas: ["Market Street High Street", "Ashby Business Park", "Smisby Road Industrial"],
    nearbyAreas: ["Smisby", "Packington", "Shellbrook"],
    waterPressureNotes: "Variable. High pressure in lower areas, can struggle in top-floor historic conversions.",
    soilType: "Sandy Loam / Clay Mix",
    floodRisk: "Localized risk near the Gilwiskaw Brook.",
    insuranceNotes: "Listed building consent often required for external pipework changes in the town centre.",
    typicalCallouts: ["Cylinder replacements", "Commercial kitchen plumbing", "Designer radiator installation"],
    authorityParagraphs: [
      "Ashby de la Zouch requires a delicate approach to plumbing, particularly within the conservation area near the Castle. Many properties here utilize complex unvented hot water systems to cope with high demand, which requires our specialized G3-qualified engineers.",
      "The water hardness levels in Ashby are noticeably higher than in the surrounding Charnwood villages. We frequently install scale reducers and powerflush heating systems along Market Street to combat the calcification that damages heat exchangers.",
      "From the historic townhouses near the Bath Grounds to the modern executive homes on the Smisby Road outskirts, our team understands the disparity in plumbing architecture. We carry stock suitable for both imperial copper sizes found in older homes and modern metric plastic fittings."
    ]
  },
  'ibstock': {
    name: "Ibstock",
    phone: "01530 654062",
    landmark: "Sence Valley Forest Park",
    road: "Melbourne Road",
    postcodes: ["LE67 6"],
    description: "Your local LE67 6 plumbers. We frequently attend burst pipes near Sence Valley and handle repairs for homes near The Ram Inn.",
    localSpice: "Prompt plumbing for Ibstock’s homes and businesses near Sence Valley Forest Park and Melbourne Road.",
    metaDescription: "Ibstock plumbers for LE67 6. Fast repairs near Sence Valley, The Ram Inn, and Melbourne Road. Call 01530 654062.",
    mapSrc: MAIN_MAP_LINK,
    housingTypes: ["Brick-built Terraces", "1960s Semis", "New Housing Developments"],
    commonProblems: ["Root ingress in drains", "Radiator cold spots", "Toilet flush failures"],
    drainageTypes: ["Clay Pipes (Local Brick)", "PVC Retrofits"],
    heatingTypes: ["Combi Boilers", "Gas Fires"],
    propertyAgeProfile: "Predominantly mid-20th century with significant recent expansion.",
    commercialAreas: ["Ashby Road Shops", "Ibstock Business Centre"],
    nearbyAreas: ["Heather", "Ellistown", "Ravenstone"],
    waterPressureNotes: "Good mains pressure generally, occasional drops during peak demand in new estates.",
    soilType: "Heavy Clay (Brick Earth)",
    floodRisk: "Low risk, though garden waterlogging is common due to clay soil.",
    insuranceNotes: "Standard residential policies apply; few specific exclusions.",
    typicalCallouts: ["Blocked toilets", "Leaking mixer taps", "Boiler servicing"],
    authorityParagraphs: [
      "Ibstock's plumbing infrastructure is heavily influenced by the local clay soil, which is famous for brick-making. This heavy soil type often leads to ground shifting that can misalign older clay drainage pipes, a common issue we resolve for residents near Melbourne Road.",
      "We see a high volume of boiler upgrades in the 1960s semi-detached housing stock that typifies the area. Many of these properties are transitioning from older back boilers to modern energy-efficient combi systems.",
      "Our proximity to Sence Valley means we are the first choice for the new developments expanding on that side of the village. We are intimately familiar with the layout of the new mains water feeds in these estates, allowing for rapid isolation in emergencies."
    ]
  },
  'whitwick': {
    name: "Whitwick",
    phone: "01530 654062",
    landmark: "The Black Horse",
    road: "City of Dan",
    postcodes: ["LE67 5"],
    description: "Emergency plumbing for LE67 5. We cover the steep residential streets near The Black Horse and properties bordering Holly Hayes Wood.",
    localSpice: "Serving Whitwick’s unique City of Dan and the area around The Black Horse and Holly Hayes Wood.",
    metaDescription: "Whitwick plumbers for LE67 5. Emergency and local plumbing near The Black Horse, City of Dan, and Holly Hayes Wood. Call 01530 654062.",
    mapSrc: MAIN_MAP_LINK,
    housingTypes: ["Stone Cottages", "Steep Driveway Detached", "Post-war Social Housing"],
    commonProblems: ["High water pressure issues", "Storm drain overflow", "External pipe freezing"],
    drainageTypes: ["Steep Gradient Sewers", "Surface Water Runoff Systems"],
    heatingTypes: ["Gas Combi", "Electric Showers"],
    propertyAgeProfile: "Varied: Ancient foundations with 20th-century infill.",
    commercialAreas: ["Market Place", "Hall Lane Industrial"],
    nearbyAreas: ["Thringstone", "Coalville", "Swannington"],
    waterPressureNotes: "Very high in valley bottoms due to steep topography.",
    soilType: "Granite Bedrock (Charnwood Forest)",
    floodRisk: "Flash flooding risk in dip areas due to rapid runoff from rocky ground.",
    insuranceNotes: "Check policy for 'escape of water' excess due to high pressure systems.",
    typicalCallouts: ["Burst flexible hoses", "PRV (Pressure Reducing Valve) installation", "Guttering repairs"],
    authorityParagraphs: [
      "Whitwick's unique topography, sitting on the edge of the Charnwood Forest granite, creates specific plumbing challenges. The steep gradient of streets like City of Dan results in exceptionally high water pressure in lower properties, often necessitating the installation of Pressure Reducing Valves (PRVs).",
      "Excavation for drainage repair in Whitwick is notoriously difficult due to the bedrock. Our team uses specialized investigation techniques to minimize digging, relying heavily on CCTV surveys to pinpoint blockages in the winding pipework characteristic of the village.",
      "The older stone cottages near the Black Horse often suffer from frozen external pipes due to their exposed position. We frequently upgrade insulation on condensate pipes and external taps throughout LE67 5 to prevent winter breakdowns."
    ]
  },
  'measham': {
    name: "Measham",
    phone: "01530 654062",
    landmark: "The Library",
    road: "High Street",
    postcodes: ["DE12 7"],
    description: "Covering Measham and the DE12 area. We attend plumbing issues near the Tesco Express and residential streets off Bosworth Road.",
    localSpice: "Trusted plumbing for Measham’s High Street, The Library, and the Tesco Express area.",
    metaDescription: "Measham plumbers for DE12 7. Local and emergency plumbing near High Street, The Library, and Bosworth Road. Call 01530 654062.",
    mapSrc: MAIN_MAP_LINK,
    housingTypes: ["Red Brick Terraces", "Modern Estates", "Industrial Units"],
    commonProblems: ["Blocked gullies", "Saniflo failures", "Commercial heating faults"],
    drainageTypes: ["Combined Systems", "Industrial Interceptors"],
    heatingTypes: ["Gas Central Heating", "Commercial Blowers"],
    propertyAgeProfile: "Industrial Revolution era mixed with 2000s expansion.",
    commercialAreas: ["Westminster Industrial Estate", "High Street"],
    nearbyAreas: ["Oakthorpe", "Donisthorpe", "Snarestone"],
    waterPressureNotes: "Stable, but flow rates can drop in industrial zones during working hours.",
    soilType: "Clay / Loam",
    floodRisk: "River Mease proximity creates localized alerts.",
    insuranceNotes: "Properties near the River Mease may require specific flood prevention valves.",
    typicalCallouts: ["Factory toilet block unblocking", "Home tap replacements", "Heating checks"],
    authorityParagraphs: [
      "Measham serves as a bridge between the industrial heritage of the Midlands and the rural National Forest. This mix sees our engineers attending complex commercial heating failures in the Westminster Industrial Estate as often as residential leaks on the High Street.",
      "The River Mease catchment area affects the water table here. We often advise homeowners on Bosworth Road regarding backflow prevention valves for their drainage systems to protect against surcharging during heavy rainfall."
    ]
  },
  'markfield': {
    name: "Markfield",
    phone: "01530 654062",
    landmark: "Hill Hole Quarry",
    road: "Main Street",
    postcodes: ["LE67 9"],
    description: "Covering LE67 9. We attend plumbing jobs near The Queens Head and properties up by Hill Hole Quarry.",
    localSpice: "Expert plumbing for Markfield’s Main Street, Hill Hole Quarry, and The Queens Head area.",
    metaDescription: "Markfield plumbers for LE67 9. Local and emergency plumbing near Main Street, Hill Hole Quarry, and The Queens Head. Call 01530 654062.",
    mapSrc: MAIN_MAP_LINK,
    housingTypes: ["Stone-built cottages", "1970s Detached", "Bungalows"],
    commonProblems: ["Stopcock seizures", "Header tank leaks", "Airlocks in systems"],
    drainageTypes: ["Septic Tanks (Outskirts)", "Mains Drainage"],
    heatingTypes: ["System Boilers", "Oil Heating (Rural fringe)"],
    propertyAgeProfile: "Village core is 18th/19th century; surrounding estates are 1970s/80s.",
    commercialAreas: ["Markfield Industrial Estate", "M1 Junction Services"],
    nearbyAreas: ["Stanton under Bardon", "Copt Oak", "Groby"],
    waterPressureNotes: "Variable due to elevation changes near the quarry.",
    soilType: "Rocky / Granite",
    floodRisk: "Low, rapid runoff area.",
    insuranceNotes: "High winds on exposed properties can affect flue terminals.",
    typicalCallouts: ["Cold water storage tank replacement", "Shower replacements", "Burst pipes"],
    authorityParagraphs: [
      "Markfield's elevated position near Hill Hole Quarry means properties here are exposed to colder ambient temperatures, increasing the risk of loft pipe freezing. We strongly recommend upgraded lagging for all roof-space plumbing in LE67 9.",
      "The housing stock, particularly the 1970s estates off Main Street, is now reaching the age where galvanized steel pipework and original copper cylinders require replacement. We specialize in system upgrades that respect the existing fabric of these buildings."
    ]
  },

  // --- THE VILLAGES (A-Z) ---
  'albert-village': {
    name: "Albert Village",
    phone: "01530 654062",
    landmark: "Albert Village Lake",
    road: "Occupation Road",
    postcodes: ["DE11"],
    description: "Serving Albert Village. We cover homes near the Lake and the primary school area.",
    mapSrc: MAIN_MAP_LINK
  },
  'bagworth': {
    name: "Bagworth",
    phone: "01530 654062",
    landmark: "Bagworth Heath Woods",
    road: "Station Road",
    postcodes: ["LE67 1"],
    description: "Serving Bagworth. We cover the village and properties near the Community Centre and Heath Woods.",
    mapSrc: MAIN_MAP_LINK
  },
  'bardon-hill': {
    name: "Bardon Hill",
    phone: "01530 654062",
    landmark: "Bardon Truck Park",
    road: "Beveridge Lane",
    postcodes: ["LE67 1"],
    description: "Commercial and residential plumbing for LE67 1, near the Bardon Truck Park and Birch Tree pub.",
    mapSrc: MAIN_MAP_LINK
  },
  'battram': {
    name: "Battram",
    phone: "01530 654062",
    landmark: "Battram Woods",
    road: "Wood Road",
    postcodes: ["LE67"],
    description: "Local plumbing for Battram. We attend properties near the Woods and the surrounding rural lanes.",
    mapSrc: MAIN_MAP_LINK
  },
  'blackfordby': {
    name: "Blackfordby",
    phone: "01530 654062",
    landmark: "The Black Lion",
    road: "Main Street",
    postcodes: ["DE11 8"],
    description: "Covering DE11 8. We fix plumbing issues for homes near The Black Lion and the village school.",
    mapSrc: MAIN_MAP_LINK
  },
  'boundary': {
    name: "Boundary",
    phone: "01530 654062",
    landmark: "Ashby Road",
    road: "Ashby Road",
    postcodes: ["DE11"],
    description: "Serving the Boundary area between Woodville and Ashby. Fast response along the main road.",
    mapSrc: MAIN_MAP_LINK
  },
  'breedon-on-the-hill': {
    name: "Breedon on the Hill",
    phone: "01530 654062",
    landmark: "The Priory Church",
    road: "Ashby Road",
    postcodes: ["DE73"],
    description: "Specialist plumbing for Breedon. We serve properties near the famous hilltop church and the Three Horseshoes.",
    mapSrc: MAIN_MAP_LINK
  },
  'coleorton': {
    name: "Coleorton",
    phone: "01530 654062",
    landmark: "Coleorton Hall",
    road: "The Moorlands",
    postcodes: ["LE67 8"],
    description: "Specialist plumbing for LE67 8, attending properties near the Kings Arms and Coleorton Hall.",
    mapSrc: MAIN_MAP_LINK
  },
  'copt-oak': {
    name: "Copt Oak",
    phone: "01530 654062",
    landmark: "The Copt Oak Pub",
    road: "Whitwick Road",
    postcodes: ["LE67"],
    description: "High-ground plumbing for LE67. We attend properties near the Copt Oak pub and the M1 junction.",
    mapSrc: MAIN_MAP_LINK
  },
  'donington-le-heath': {
    name: "Donington le Heath",
    phone: "01530 654062",
    landmark: "The Manor House",
    road: "Manor Road",
    postcodes: ["LE67 2"],
    description: "Local plumbing for LE67 2, covering the area around the historic Manor House.",
    mapSrc: MAIN_MAP_LINK
  },
  'donisthorpe': {
    name: "Donisthorpe",
    phone: "01530 654062",
    landmark: "Donisthorpe Woodland Park",
    road: "Church Street",
    postcodes: ["DE12"],
    description: "Serving Donisthorpe. We cover homes near the Woodland Park and the Halfway House.",
    mapSrc: MAIN_MAP_LINK
  },
  'ellistown': {
    name: "Ellistown",
    phone: "01530 654062",
    landmark: "South Leicestershire College",
    road: "Beveridge Lane",
    postcodes: ["LE67 1"],
    description: "Covering LE67 1. We fix leaks and plumbing issues near the Ellistown Inn and South Leicestershire College.",
    mapSrc: MAIN_MAP_LINK
  },
  'griffydam': {
    name: "Griffydam",
    phone: "01530 654062",
    landmark: "The Griffin Inn",
    road: "Top Road",
    postcodes: ["LE67 8"],
    description: "Local plumbing for LE67 8, covering the village and homes near The Griffin Inn.",
    mapSrc: MAIN_MAP_LINK
  },
  'heather': {
    name: "Heather",
    phone: "01530 654062",
    landmark: "Sence Valley",
    road: "Swepstone Road",
    postcodes: ["LE67 6"],
    description: "Serving LE67 6. We attend plumbing jobs near the Queen's Head and properties around Sence Valley.",
    mapSrc: MAIN_MAP_LINK
  },
  'hugglescote': {
    name: "Hugglescote",
    phone: "01530 654062",
    landmark: "The Gate Inn",
    road: "Ashby Road",
    postcodes: ["LE67 2"],
    description: "Plumbing repairs for LE67 2. We cover the new developments and older terraces near The Gate Inn and The Bear and Swan.",
    mapSrc: MAIN_MAP_LINK 
  },
  'leicestershire': {
    name: "Leicestershire",
    phone: "01530 654062",
    landmark: "Charnwood Forest",
    road: "The M1 Corridor",
    postcodes: ["LE"],
    description: "We are proud to serve North West Leicestershire, providing trusted plumbing across the entire county.",
    mapSrc: MAIN_MAP_LINK
  },
  'lount': {
    name: "Lount",
    phone: "01530 654062",
    landmark: "The Ferrers Arms",
    road: "Nottingham Road",
    postcodes: ["LE65 1"],
    description: "Serving LE65 1 and residents near the Ferrers Arms.",
    mapSrc: MAIN_MAP_LINK
  },
  'moira': {
    name: "Moira",
    phone: "01530 654062",
    landmark: "Moira Furnace",
    road: "Ashby Road",
    postcodes: ["DE12 6"],
    description: "Serving Moira. We cover the new estates near the National Forest and older homes near the Furnace.",
    mapSrc: MAIN_MAP_LINK
  },
  'newbold-coleorton': {
    name: "Newbold Coleorton",
    phone: "01530 654062",
    landmark: "The Cross Keys",
    road: "Ashby Road",
    postcodes: ["LE67 8"],
    description: "Covering LE67 8. Rural plumbing near The Cross Keys.",
    mapSrc: MAIN_MAP_LINK
  },
  'normanton-le-heath': {
    name: "Normanton le Heath",
    phone: "01530 654062",
    landmark: "The Packington Border",
    road: "Ashby Road",
    postcodes: ["LE67 2"],
    description: "Rural plumbing for LE67 2. We cover the outlying properties and farms near the darker lanes of Normanton.",
    mapSrc: MAIN_MAP_LINK
  },
  'oakthorpe': {
    name: "Oakthorpe",
    phone: "01530 654062",
    landmark: "The Holly Bush",
    road: "Measham Road",
    postcodes: ["DE12"],
    description: "Local plumbing for Oakthorpe. We handle repairs for properties near the Leisure Centre and village hall.",
    mapSrc: MAIN_MAP_LINK
  },
  'osgathorpe': {
    name: "Osgathorpe",
    phone: "01530 654062",
    landmark: "St Mary's Church",
    road: "Ashby Road",
    postcodes: ["LE12"],
    description: "Serving the Osgathorpe community. We attend rural properties near the Storey Arms.",
    mapSrc: MAIN_MAP_LINK
  },
  'packington': {
    name: "Packington",
    phone: "01530 654062",
    landmark: "The Bull & Lion",
    road: "High Street",
    postcodes: ["LE65 1"],
    description: "Serving LE65 1. We attend leaks and repairs near The Bull & Lion on High Street.",
    mapSrc: MAIN_MAP_LINK
  },
  'peggs-green': {
    name: "Peggs Green",
    phone: "01530 654062",
    landmark: "The New Inn",
    road: "Nottingham Road",
    postcodes: ["LE67 8"],
    description: "Serving LE67 8. We cover the residential stretch near the New Inn and Coleorton border.",
    mapSrc: MAIN_MAP_LINK
  },
  'ravenstone': {
    name: "Ravenstone",
    phone: "01530 654062",
    landmark: "The Kings Arms",
    road: "Beeswax Lane",
    postcodes: ["LE67 2"],
    description: "Based locally for LE67 2. Fast response to plumbing issues near The Kings Arms and the Beeswax Lane area.",
    mapSrc: MAIN_MAP_LINK
  },
  'shellbrook': {
    name: "Shellbrook",
    phone: "01530 654062",
    landmark: "Ashby Road",
    road: "Ashby Road",
    postcodes: ["LE65"],
    description: "Fast repairs for the LE65 outskirts along the Ashby Road.",
    mapSrc: MAIN_MAP_LINK
  },
  'sinope': {
    name: "Sinope",
    phone: "01530 654062",
    landmark: "The Moorlands",
    road: "A511",
    postcodes: ["LE67"],
    description: "Covering properties along the A511 in Sinope. Fast access for main road residents.",
    mapSrc: MAIN_MAP_LINK
  },
  'smisby': {
    name: "Smisby",
    phone: "01530 654062",
    landmark: "The Smisby Arms",
    road: "Main Street",
    postcodes: ["LE65 2"],
    description: "Rural plumbing support for LE65 2, covering properties near The Smisby Arms.",
    mapSrc: MAIN_MAP_LINK
  },
  'snibston': {
    name: "Snibston",
    phone: "01530 654062",
    landmark: "Snibston Colliery Park",
    road: "Chiswell Drive",
    postcodes: ["LE67 3"],
    description: "Serving LE67 3 properties bordering Snibston Colliery Park. We handle residential leaks and pipe repairs.",
    mapSrc: MAIN_MAP_LINK
  },
  'stanton-under-bardon': {
    name: "Stanton under Bardon",
    phone: "01530 654062",
    landmark: "The Plough Inn",
    road: "Main Street",
    postcodes: ["LE67 9"],
    description: "Serving LE67 9, specifically homes near The Plough Inn and the Cliffe Hill area.",
    mapSrc: MAIN_MAP_LINK
  },
  'staunton-harold': {
    name: "Staunton Harold",
    phone: "01530 654062",
    landmark: "Staunton Harold Hall",
    road: "The Drive",
    postcodes: ["LE65"],
    description: "Specialist plumbing for the Staunton Harold estate and surrounding garden centre areas.",
    mapSrc: MAIN_MAP_LINK
  },
  'swannington': {
    name: "Swannington",
    phone: "01530 654062",
    landmark: "Hough Mill",
    road: "Main Street",
    postcodes: ["LE67 8"],
    description: "Your local Swannington plumber. We cover LE67 8, attending leaks near The Robin Hood pub and homes around Hough Mill.",
    mapSrc: MAIN_MAP_LINK
  },
  'thringstone': {
    name: "Thringstone",
    phone: "01530 654062",
    landmark: "Grace Dieu Priory",
    road: "Loughborough Road",
    postcodes: ["LE67 8"],
    description: "Serving LE67 8. We attend plumbing emergencies near The Rose & Crown and properties around Grace Dieu Priory.",
    mapSrc: MAIN_MAP_LINK
  },
  'tonge': {
    name: "Tonge",
    phone: "01530 654062",
    landmark: "The Cloud Trail",
    road: "Moor Lane",
    postcodes: ["DE73"],
    description: "Rural plumbing services for Tonge and the surrounding hamlets.",
    mapSrc: MAIN_MAP_LINK
  },
  'willesley': {
    name: "Willesley",
    phone: "01530 654062",
    landmark: "Willesley Park Golf Club",
    road: "Willesley Road",
    postcodes: ["LE65 2"],
    description: "Plumbing cover for LE65 2, serving the residential area near Willesley Park Golf Club.",
    mapSrc: MAIN_MAP_LINK
  },
  'wilson': {
    name: "Wilson",
    phone: "01530 654062",
    landmark: "The Bulls Head",
    road: "Main Street",
    postcodes: ["DE73"],
    description: "Covering the village of Wilson. We attend properties near the Bulls Head and golf club.",
    mapSrc: MAIN_MAP_LINK
  },
  'worthington': {
    name: "Worthington",
    phone: "01530 654062",
    landmark: "The Malt Shovel",
    road: "Main Street",
    postcodes: ["LE65 1"],
    description: "Serving LE65 1. We handle plumbing jobs near The Malt Shovel and the Cloud Trail.",
    mapSrc: MAIN_MAP_LINK
  },

  // --- ADDED: Additional Charnwood-area towns provided by user ---
  'quorn': {
    name: "Quorn",
    postcode: "LE12",
    road: "High Street",
    postcodes: ["LE12"],
    phone: "01509 447469",
    localSpice: "Reliable service just a stone's throw from the Great Central Railway and Quorn Cross.",
    landmark: "Great Central Railway",
    metaDescription: "Professional services in Quorn LE12. Local experts serving the High Street and surrounding Charnwood area. Call 01509 447469 today.",
    mapSrc: MAIN_MAP_LINK,
    authorityParagraphs: [
      "Quorn features a blend of beautiful historic homes and high-end modern developments. We frequently upgrade heating systems here, installing smart thermostats like Hive and Nest to improve efficiency in larger properties.",
      "Hard water is a notable issue in the LE12 area. We protect expensive bathroom suites and boiler heat exchangers in Quorn by installing high-quality inline water softeners."
    ]
  },
  'mountsorrel': {
    name: "Mountsorrel",
    postcode: "LE12",
    road: "The Green",
    postcodes: ["LE12"],
    phone: "01509 447469",
    localSpice: "Your local specialist near the historic Buttercross and Mountsorrel Quarry.",
    landmark: "The Buttercross",
    metaDescription: "Trusted local support in Mountsorrel. Expert service near the granite heritage sites. Contact our 01509 447469 line for fast response.",
    mapSrc: MAIN_MAP_LINK
  },
  'barrow-upon-soar': {
    name: "Barrow upon Soar",
    postcode: "LE12",
    road: "High Street",
    postcodes: ["LE12"],
    phone: "01509 447469",
    localSpice: "Serving the community from the banks of the River Soar to the home of the Barrow Kipper.",
    landmark: "River Soar",
    metaDescription: "Serving Barrow upon Soar with expert local care. From the riverside to the village center, call 01509 447469.",
    mapSrc: MAIN_MAP_LINK,
    authorityParagraphs: [
      "Barrow upon Soar's defining feature is the river, which brings specific plumbing challenges. We frequently install non-return valves on drainage systems for riverside properties to prevent sewage backup during high water events.",
      "For the older Victorian terraces near the High Street, we specialize in replacing deteriorating iron soil pipes with modern, durable alternatives while minimizing disruption."
    ]
  },
  'sileby': {
    name: "Sileby",
    postcode: "LE12",
    road: "King Street",
    postcodes: ["LE12"],
    phone: "01509 447469",
    localSpice: "Reliable local experts serving residents near Sileby Mill and the Brook.",
    landmark: "Sileby Mill",
    metaDescription: "Need a local expert in Sileby? We serve the whole LE12 area near the Brook. Reach us locally at 01509 447469.",
    mapSrc: MAIN_MAP_LINK
  },
  'woodhouse-eaves': {
    name: "Woodhouse Eaves",
    postcode: "LE12",
    road: "Main Street",
    postcodes: ["LE12"],
    phone: "01509 447469",
    localSpice: "Providing expert care in the heart of Charnwood Forest, just below Beacon Hill.",
    landmark: "Beacon Hill",
    metaDescription: "Expert services in Woodhouse Eaves and the Charnwood Forest area. Local 01509 447469 number for all residents.",
    mapSrc: MAIN_MAP_LINK,
    authorityParagraphs: [
      "Woodhouse Eaves features some of the most prestigious properties in the Charnwood area. We regularly service complex, multi-zone heating systems and unvented 'Megaflo' cylinders in these large homes.",
      "Due to the slate and granite bedrock near Beacon Hill, external drainage repairs require specialist equipment. We use non-destructive CCTV surveys to accurately diagnose issues before any excavation begins."
    ]
  },
  'swithland': {
    name: "Swithland",
    postcode: "LE12",
    road: "Main Street",
    postcodes: ["LE12"],
    phone: "01509 447469",
    localSpice: "Dedicated service for the Swithland Slate area and near the Reservoir.",
    landmark: "Swithland Reservoir",
    metaDescription: "Professional local service in Swithland. Serving the prestigious reservoir and forest area. Call 01509 447469.",
    mapSrc: MAIN_MAP_LINK,
    authorityParagraphs: [
      "Working in Swithland means working with history. Many properties utilize the famous local slate, and we ensure our plumbing and flue installations respect the aesthetic integrity of these beautiful buildings.",
      "With Swithland Reservoir so close, the local water table can fluctuate. We provide expert advice on drainage fields and septic tank compliance for homes not connected to the main sewer system."
    ]
  },
  'cossington': {
    name: "Cossington",
    postcode: "LE7",
    road: "Main Street",
    postcodes: ["LE7"],
    phone: "01509 447469",
    localSpice: "Your trusted partner serving the quiet village of Cossington and near the Meadows.",
    landmark: "Cossington Meadows",
    metaDescription: "Local support for the Cossington community. Reliable service near the nature reserve. Dial 01509 447469.",
    mapSrc: MAIN_MAP_LINK
  }
};