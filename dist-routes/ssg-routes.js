const d = "https://share.google/vCD4kQc8elUleD1EE";
function e(o) {
  const n = o.housingTypes ? o.housingTypes[0].toLowerCase() : "mix of residential properties", r = o.commonProblems ? o.commonProblems[0].toLowerCase() : "unexpected boiler breakdowns", t = o.heatingTypes ? o.heatingTypes[0].toLowerCase() : "gas central heating systems", s = o.soilType ? o.soilType.toLowerCase() : "local ground conditions";
  return {
    name: o.name,
    phone: o.phone,
    landmark: o.landmark,
    road: o.road,
    postcodes: o.postcodes,
    description: o.description || `Professional emergency plumbing, heating, and drainage services across ${o.name} and the surrounding ${o.postcodes.join(", ")} postcodes. Available 24/7.`,
    mapSrc: o.mapSrc || d,
    housingTypes: o.housingTypes || ["Victorian Terraces", "Suburban Semi-Detached Properties", "Modern Housing Developments"],
    commonProblems: o.commonProblems || ["Hard water limescale scaling", "Boiler baseline pressure loss", "Blocked localized external grid networks"],
    drainageTypes: o.drainageTypes || ["Vitrified Clay Infrastructure Tracks", "Modern High-Flow PVC Radial Systems"],
    heatingTypes: o.heatingTypes || ["High-Efficiency Condensing Combi Boilers", "Traditional Flow Unvented Systems"],
    propertyAgeProfile: o.propertyAgeProfile || "Mixed residential stock spanning historic cores to late-20th-century expansions.",
    commercialAreas: o.commercialAreas || [`${o.name} High Street Outlets`, "Local Corporate Trade Hubs"],
    nearbyAreas: o.nearbyAreas || ["Surrounding District Commuter Arteries"],
    waterPressureNotes: o.waterPressureNotes || "Maintains high baseline structural parameters across the central sector.",
    soilType: o.soilType || "Heavy localized clay structures.",
    floodRisk: o.floodRisk || "Low overall risk profile.",
    insuranceNotes: o.insuranceNotes || "Trace and access tracking documentation provided seamlessly for policy validation.",
    typicalCallouts: o.typicalCallouts || ["Emergency fluid isolation", "Main structural drain descaling", "Combi boiler flame diagnostics"],
    // SMART GENERATOR: If you don't write custom paragraphs, it builds highly specific ones using the town's exact data profile
    authorityParagraphs: o.authorityParagraphs || [
      `Our emergency plumbing engineers operate daily across ${o.name}, navigating the specific structural challenges of the local water network. Because the area features a heavy concentration of ${n}, we are frequently deployed to resolve localized issues like ${r} along ${o.road} and its surrounding residential streets.`,
      `We maintain rapid response times across the ${o.postcodes[0]} postcode district by keeping fully stocked service units stationed near ${o.landmark}. Our engineers carry specialized components suited for the ${t} common to the area, while our drainage teams are fully equipped to handle structural pipe shifts caused by the underlying ${s}.`
    ]
  };
}
const l = {
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
  quorn: e({
    name: "Quorn",
    phone: "01509 447469",
    landmark: "Great Central Railway",
    road: "High Street",
    postcodes: ["LE12"],
    authorityParagraphs: [
      "The premium housing stock in Quorn often demands high-end plumbing solutions, from unvented Megaflo cylinder installations in large detached properties to careful heritage plumbing near the Great Central Railway.",
      "Our teams operate discreetly and efficiently along High Street, understanding that LE12 homeowners expect clean, damage-free trace and access for hidden leaks in complex central heating systems."
    ]
  }),
  // ==========================================
  // === 0116 LEICESTER & LE6 REGIONAL AREA ===
  // ==========================================
  groby: e({
    name: "Groby",
    phone: "01164 105069",
    landmark: "Groby Pool",
    road: "Leicester Road",
    postcodes: ["LE6"],
    authorityParagraphs: [
      "Groby's expansion from a historic village to a major LE6 commuter hub means our vans navigate a mix of old stone drainage networks and 1980s plastic microbore heating systems daily.",
      "Positioned near Leicester Road, we can isolate burst pipes rapidly before they cause structural water damage. We carry specialized fittings to bridge imperial copper pipes with modern metric adaptations."
    ]
  }),
  glenfield: e({
    name: "Glenfield",
    phone: "01164 105069",
    landmark: "Leicestershire County Council HQ",
    road: "Station Road",
    postcodes: ["LE3"],
    authorityParagraphs: [
      "With proximity to major civic buildings and a dense suburban sprawl, Glenfield requires highly responsive plumbing operations. We tackle localized hard-water scale buildup in combi-boilers across the LE3 postcodes.",
      "Our rapid deployment from Station Road ensures that whether you have a collapsed external drain or a seized stopcock, our commercial and residential teams clear the fault within strict timeline parameters."
    ]
  }),
  // ==========================================
  // === 01283 BURTON & SOUTH DERBYSHIRE =====
  // ==========================================
  "burton-upon-trent": e({
    name: "Burton upon Trent",
    phone: "01283 890215",
    landmark: "The National Brewery Centre",
    road: "High Street",
    postcodes: ["DE14"],
    authorityParagraphs: [
      "Burton's world-famous brewing heritage means the municipal water network is intrinsically tied to the local water table, known for its high mineral content. This 'Burton Snatch' translates to aggressive limescale scaling in domestic DE14 boilers.",
      "Our engineers install heavy-duty magnetic filters and scale reducers daily across High Street and the surrounding terraces, ensuring optimal heat transfer and extending boiler lifespans in hard-water zones."
    ]
  }),
  swadlincote: e({
    name: "Swadlincote",
    phone: "01283 890215",
    landmark: "Swadlincote Ski Centre",
    road: "High Street",
    postcodes: ["DE11"],
    authorityParagraphs: [
      "Sitting on a bed of heavy clay historically used for pottery, Swadlincote properties are prone to ground shifting during extreme weather, frequently resulting in misaligned external clay drainage tracks.",
      "Operating across the DE11 postcodes, our CCTV drain surveying equipment pinpoints these structural fractures near High Street without the need for destructive, exploratory digging."
    ]
  }),
  // ==========================================
  // === 01332 DERBY SUBURBAN BORDERS =========
  // ==========================================
  melbourne: e({
    name: "Melbourne",
    phone: "01332 806148",
    landmark: "Melbourne Hall",
    road: "High Street",
    postcodes: ["DE73"],
    authorityParagraphs: [
      "The historic conservation constraints in Melbourne demand precision plumbing. We navigate the complex rooflines and heritage pipework surrounding Melbourne Hall, ensuring aesthetic compliance while upgrading to high-efficiency condensing systems.",
      "Properties along High Street often suffer from shared drainage restrictions. Our high-pressure water jetting teams clear fatbergs and root ingress in DE73 without risking damage to 18th-century infrastructure."
    ]
  }),
  "kings-newton": e({
    name: "Kings Newton",
    phone: "01332 806148",
    landmark: "Kings Newton Hall",
    road: "Main Street",
    postcodes: ["DE73"],
    authorityParagraphs: [
      "Kings Newton requires bespoke plumbing approaches, particularly for the larger properties transitioning away from older oil or conventional flow boilers to modern, pressurized unvented systems.",
      "We position fully loaded service units on Main Street, allowing us to respond to emergency fluid isolation and thermal breakdown calls across DE73 with zero merge delay."
    ]
  }),
  // ==========================================
  // === 01827 TAMWORTH & WARWICK BORDERS =====
  // ==========================================
  tamworth: e({
    name: "Tamworth",
    phone: "01827 802163",
    landmark: "Tamworth Castle",
    road: "Market Street",
    postcodes: ["B77", "B78", "B79"],
    authorityParagraphs: [
      "Spanning multiple B-postcode sectors, Tamworth presents a diverse plumbing landscape. We routinely execute trace and access operations in the historic areas near Tamworth Castle, while managing high-pressure unvented installations in the modern suburban rings.",
      "Our rapid response teams operate on a 60-minute SLA for burst pipes and boiler lockouts across Market Street, utilizing the A5 corridor to ensure swift geographical coverage."
    ]
  }),
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
  worthington: e({ name: "Worthington", phone: "01530 654062", landmark: "The Malt Shovel", road: "Main Street", postcodes: ["LE65 1"] }),
  mountsorrel: e({ name: "Mountsorrel", phone: "01509 447469", landmark: "The Buttercross", road: "Leicester Road", postcodes: ["LE12"] }),
  "barrow-upon-soar": e({ name: "Barrow upon Soar", phone: "01509 447469", landmark: "River Soar", road: "High Street", postcodes: ["LE12"] }),
  sileby: e({ name: "Sileby", phone: "01509 447469", landmark: "Sileby Mill", road: "King Street", postcodes: ["LE12"] }),
  "woodhouse-eaves": e({ name: "Woodhouse Eaves", phone: "01509 447469", landmark: "Beacon Hill", road: "Main Street", postcodes: ["LE12"] }),
  swithland: e({ name: "Swithland", phone: "01509 447469", landmark: "Swithland Reservoir", road: "Main Street", postcodes: ["LE12"] }),
  cossington: e({ name: "Cossington", phone: "01509 447469", landmark: "Cossington Meadows", road: "Main Street", postcodes: ["LE7"] }),
  shepshed: e({ name: "Shepshed", phone: "01509 642158", landmark: "Garendon Park", road: "Market Place", postcodes: ["LE12"] }),
  hathern: e({ name: "Hathern", phone: "01509 642158", landmark: "Dishley Grange", road: "Wide Street", postcodes: ["LE12"] }),
  rothley: e({ name: "Rothley", phone: "01509 447469", landmark: "Rothley Court", road: "Cross Green", postcodes: ["LE7"] }),
  woodhouse: e({ name: "Woodhouse", phone: "01509 447469", landmark: "St Mary's Church", road: "Forest Road", postcodes: ["LE12"] }),
  "east-leake": e({ name: "East Leake", phone: "01509 642158", landmark: "British Gypsum Works", road: "Main Street", postcodes: ["LE12"] }),
  wymeswold: e({ name: "Wymeswold", phone: "01509 642158", landmark: "Old RAF Airfield", road: "Far Street", postcodes: ["LE12"] }),
  "burton-on-the-wolds": e({ name: "Burton on the Wolds", phone: "01509 642158", landmark: "Burton Hall", road: "Melton Road", postcodes: ["LE12"] }),
  cotes: e({ name: "Cotes", phone: "01509 642158", landmark: "Cotes Bridge", road: "Nottingham Road", postcodes: ["LE12"] }),
  prestwold: e({ name: "Prestwold", phone: "01509 642158", landmark: "Prestwold Hall", road: "Prestwold Lane", postcodes: ["LE12"] }),
  "walton-on-the-wolds": e({ name: "Walton on the Wolds", phone: "01509 642158", landmark: "The Village Green", road: "New Lane", postcodes: ["LE12"] }),
  hoton: e({ name: "Hoton", phone: "01509 642158", landmark: "Hoton Village Hall", road: "Wymeswold Road", postcodes: ["LE12"] }),
  seagrave: e({ name: "Seagrave", phone: "01509 642158", landmark: "Leicester City Training Ground", road: "King Street", postcodes: ["LE12"] }),
  thrussington: e({ name: "Thrussington", phone: "01509 642158", landmark: "The Holy Trinity Church", road: "Seagrave Road", postcodes: ["LE7"] }),
  rearsby: e({ name: "Rearsby", phone: "01509 642158", landmark: "The Rearsby Brook", road: "Melton Road", postcodes: ["LE7"] }),
  "east-goscote": e({ name: "East Goscote", phone: "01509 642158", landmark: "The Plough", road: "Long Furrow", postcodes: ["LE7"] }),
  queniborough: e({ name: "Queniborough", phone: "01509 642158", landmark: "St Mary's Church", road: "Main Street", postcodes: ["LE7"] }),
  syston: e({ name: "Syston", phone: "01509 642158", landmark: "Syston Train Station", road: "Melton Road", postcodes: ["LE7"] }),
  barkby: e({ name: "Barkby", phone: "01509 642158", landmark: "Barkby Brook", road: "Main Street", postcodes: ["LE7"] }),
  "barkby-thorpe": e({ name: "Barkby Thorpe", phone: "01509 642158", landmark: "The Thorpes Stretch", road: "Barkby Thorpe Lane", postcodes: ["LE7"] }),
  thurmaston: e({ name: "Thurmaston", phone: "01509 642158", landmark: "Thurmaston Retail Park", road: "Melton Road", postcodes: ["LE4"] }),
  birstall: e({ name: "Birstall", phone: "01509 642158", landmark: "Watermead Country Park", road: "Sibson Road", postcodes: ["LE4"] }),
  wanlip: e({ name: "Wanlip", phone: "01509 642158", landmark: "Wanlip Sewage Works", road: "Wanlip Lane", postcodes: ["LE7"] }),
  ulverscroft: e({ name: "Ulverscroft", phone: "01509 447469", landmark: "Ulverscroft Priory", road: "Priory Lane", postcodes: ["LE67"] }),
  cropston: e({ name: "Cropston", phone: "01509 447469", landmark: "Cropston Reservoir", road: "Station Road", postcodes: ["LE7"] }),
  anstey: e({ name: "Anstey", phone: "01509 447469", landmark: "The Anstey Packhorse Bridge", road: "Cropston Road", postcodes: ["LE7"] }),
  charley: e({ name: "Charley", phone: "01509 447469", landmark: "Charley Woods", road: "Charley Road", postcodes: ["LE12"] }),
  ratby: e({ name: "Ratby", phone: "01164 105069", landmark: "the Burroughs", road: "Main Street", postcodes: ["LE6"] }),
  "newtown-linford": e({ name: "Newtown Linford", phone: "01164 105069", landmark: "Bradgate Park", road: "Bradgate Road", postcodes: ["LE6"] }),
  "field-head": e({ name: "Field Head", phone: "01164 105069", landmark: "Markfield Court", road: "Ashby Road", postcodes: ["LE67"] }),
  "kirby-muxloe": e({ name: "Kirby Muxloe", phone: "01164 105069", landmark: "Kirby Muxloe Castle", road: "Main Street", postcodes: ["LE9"] }),
  "leicester-forest-east": e({ name: "Leicester Forest East", phone: "01164 105069", landmark: "LFE Service Station", road: "Hinckley Road", postcodes: ["LE3"] }),
  desford: e({ name: "Desford", phone: "01164 105069", landmark: "Caterpillar Factory", road: "Leicester Lane", postcodes: ["LE9"] }),
  botcheston: e({ name: "Botcheston", phone: "01164 105069", landmark: "The Greyhound Inn", road: "Main Street", postcodes: ["LE9"] }),
  "newbold-verdon": e({ name: "Newbold Verdon", phone: "01164 105069", landmark: "Newbold Verdon Library", road: "Main Street", postcodes: ["LE9"] }),
  braunstone: e({ name: "Braunstone", phone: "01164 105069", landmark: "Braunstone Park", road: "Braunstone Lane", postcodes: ["LE3"] }),
  oadby: e({ name: "Oadby", phone: "01164 105069", landmark: "Leicester Racecourse", road: "The Parade", postcodes: ["LE2"] }),
  wigston: e({ name: "Wigston", phone: "01164 105069", landmark: "Wigston Magna Framework", road: "Bull Head Street", postcodes: ["LE18"] }),
  stretton: e({ name: "Stretton", phone: "01283 890215", landmark: "St Mary's Church", road: "Main Street", postcodes: ["DE13"] }),
  branston: e({ name: "Branston", phone: "01283 890215", landmark: "Branston Water Park", road: "Main Street", postcodes: ["DE14"] }),
  horninglow: e({ name: "Horninglow", phone: "01283 890215", landmark: "The Horninglow Hub", road: "Tutbury Road", postcodes: ["DE13"] }),
  stapenhill: e({ name: "Stapenhill", phone: "01283 890215", landmark: "Stapenhill Gardens", road: "St Peter's Street", postcodes: ["DE15"] }),
  winshill: e({ name: "Winshill", phone: "01283 890215", landmark: "Newton Park", road: "Church Hill", postcodes: ["DE15"] }),
  "rolleston-on-dove": e({ name: "Rolleston on Dove", phone: "01283 890215", landmark: "The Croft", road: "Station Road", postcodes: ["DE13"] }),
  tutbury: e({ name: "Tutbury", phone: "01283 890215", landmark: "Tutbury Castle", road: "High Street", postcodes: ["DE13"] }),
  "barton-under-needwood": e({ name: "Barton-under-Needwood", phone: "01283 890215", landmark: "Barton Marina", road: "Main Street", postcodes: ["DE13"] }),
  anslow: e({ name: "Anslow", phone: "01283 890215", landmark: "The Holy Trinity Church", road: "Main Road", postcodes: ["DE13"] }),
  tatenhill: e({ name: "Tatenhill", phone: "01283 890215", landmark: "Tatenhill Brook", road: "Main Street", postcodes: ["DE13"] }),
  "church-broughton": e({ name: "Church Broughton", phone: "01283 890215", landmark: "Church Broughton School", road: "Main Street", postcodes: ["DE65"] }),
  "sutton-on-the-hill": e({ name: "Sutton on the Hill", phone: "01283 890215", landmark: "St Michael's Church", road: "Church Lane", postcodes: ["DE65"] }),
  overseal: e({ name: "Overseal", phone: "01283 890215", landmark: "Overseal Village Hall", road: "Main Street", postcodes: ["DE12"] }),
  netherseal: e({ name: "Netherseal", phone: "01283 890215", landmark: "St Peter's Church", road: "Main Street", postcodes: ["DE12"] }),
  "coton-in-the-elms": e({ name: "Coton in the Elms", phone: "01283 890215", landmark: "The Village Green", road: "Burton Road", postcodes: ["DE12"] }),
  lullington: e({ name: "Lullington", phone: "01283 890215", landmark: "All Saints Church", road: "Main Street", postcodes: ["DE12"] }),
  rosliston: e({ name: "Rosliston", phone: "01283 890215", landmark: "Rosliston Forestry Centre", road: "Main Street", postcodes: ["DE12"] }),
  "walton-on-trent": e({ name: "Walton-on-Trent", phone: "01283 890215", landmark: "Walton Bridge", road: "Main Street", postcodes: ["DE12"] }),
  cauldwell: e({ name: "Cauldwell", phone: "01283 890215", landmark: "Cauldwell Hall", road: "Sandy Lane", postcodes: ["DE12"] }),
  bretby: e({ name: "Bretby", phone: "01283 890215", landmark: "Bretby Hall", road: "Ashby Road", postcodes: ["DE15"] }),
  "newton-solney": e({ name: "Newton Solney", phone: "01283 890215", landmark: "The Unicorn Inn", road: "Main Street", postcodes: ["DE15"] }),
  hartshorne: e({ name: "Hartshorne", phone: "01283 890215", landmark: "The Bull's Head", road: "Main Street", postcodes: ["DE11"] }),
  etwall: e({ name: "Etwall", phone: "01283 890215", landmark: "Etwall Leisure Centre", road: "Main Street", postcodes: ["DE65"] }),
  hilton: e({ name: "Hilton", phone: "01283 890215", landmark: "Hilton Village Hall", road: "Derby Road", postcodes: ["DE65"] }),
  hatton: e({ name: "Hatton", phone: "01283 890215", landmark: "Hatton Station", road: "Station Road", postcodes: ["DE65"] }),
  scropton: e({ name: "Scropton", phone: "01283 890215", landmark: "Scropton Church", road: "Main Street", postcodes: ["DE65"] }),
  "marston-on-dove": e({ name: "Marston on Dove", phone: "01283 890215", landmark: "St Mary's Church", road: "Marston Lane", postcodes: ["DE65"] }),
  egginton: e({ name: "Egginton", phone: "01283 890215", landmark: "Egginton Hall", road: "Main Street", postcodes: ["DE65"] }),
  burnaston: e({ name: "Burnaston", phone: "01283 890215", landmark: "Toyota Factory", road: "Egginton Road", postcodes: ["DE65"] }),
  "dalbury-lees": e({ name: "Dalbury Lees", phone: "01283 890215", landmark: "The Village Green", road: "Lees Road", postcodes: ["DE65"] }),
  "aston-on-trent": e({ name: "Aston-on-Trent", phone: "01332 806148", landmark: "Aston Hall", road: "Derby Road", postcodes: ["DE72"] }),
  "weston-on-trent": e({ name: "Weston-on-Trent", phone: "01332 806148", landmark: "St Mary's Church", road: "Main Street", postcodes: ["DE72"] }),
  shardlow: e({ name: "Shardlow", phone: "01332 806148", landmark: "Shardlow Wharf Canal Village", road: "London Road", postcodes: ["DE72"] }),
  "great-wilne": e({ name: "Great Wilne", phone: "01332 806148", landmark: "The River Derwent", road: "Wilne Lane", postcodes: ["DE72"] }),
  thulston: e({ name: "Thulston", phone: "01332 806148", landmark: "The Harrington Arms", road: "Snelsmoor Lane", postcodes: ["DE72"] }),
  elvaston: e({ name: "Elvaston", phone: "01332 806148", landmark: "Elvaston Castle Country Park", road: "Borrowash Road", postcodes: ["DE72"] }),
  ambaston: e({ name: "Ambaston", phone: "01332 806148", landmark: "The Ambaston Lanes", road: "Ambaston Lane", postcodes: ["DE72"] }),
  "barrow-upon-trent": e({ name: "Barrow upon Trent", phone: "01332 806148", landmark: "St Wilfrid's Church", road: "Twyford Road", postcodes: ["DE73"] }),
  "stenson-fields": e({ name: "Stenson Fields", phone: "01332 806148", landmark: "Stenson Lock Marina", road: "Pilgrims Way", postcodes: ["DE24"] }),
  willington: e({ name: "Willington", phone: "01332 806148", landmark: "Willington Power Station Towers", road: "Repton Road", postcodes: ["DE65"] }),
  findern: e({ name: "Findern", phone: "01332 806148", landmark: "Findern Green", road: "Dunsmoore Lane", postcodes: ["DE65"] }),
  repton: e({ name: "Repton", phone: "01332 806148", landmark: "Repton School Crypt", road: "Willesley Road", postcodes: ["DE65"] }),
  milton: e({ name: "Milton", phone: "01332 806148", landmark: "The Milton Hamlets", road: "Main Street", postcodes: ["DE65"] }),
  foremark: e({ name: "Foremark", phone: "01332 806148", landmark: "Foremark Reservoir", road: "Milton Road", postcodes: ["DE65"] }),
  chellaston: e({ name: "Chellaston", phone: "01332 806148", landmark: "Chellaston Academy", road: "High Street", postcodes: ["DE73"] }),
  alvaston: e({ name: "Alvaston", phone: "01332 806148", landmark: "Alvaston Park", road: "London Road", postcodes: ["DE24"] }),
  "boulton-moor": e({ name: "Boulton Moor", phone: "01332 806148", landmark: "Boulton Moor Expansion", road: "Chellaston Lane", postcodes: ["DE24"] }),
  "castle-donington": e({ name: "Castle Donington", phone: "01332 806148", landmark: "Donington Park Circuit", road: "High Street", postcodes: ["DE74"] }),
  hemington: e({ name: "Hemington", phone: "01332 806148", landmark: "The Jolly Sailor", road: "Main Street", postcodes: ["DE74"] }),
  lockington: e({ name: "Lockington", phone: "01332 806148", landmark: "Lockington Church", road: "Church Lane", postcodes: ["DE74"] }),
  fazeley: e({ name: "Fazeley", phone: "01827 802163", landmark: "Fazeley Junction", road: "Lichfield Road", postcodes: ["B78"] }),
  wilnecote: e({ name: "Wilnecote", phone: "01827 802163", landmark: "Wilnecote Train Station", road: "Watling Street", postcodes: ["B77"] }),
  amington: e({ name: "Amington", phone: "01827 802163", landmark: "Amington Hall", road: "Tamworth Road", postcodes: ["B79"] }),
  dosthill: e({ name: "Dosthill", phone: "01827 802163", landmark: "Dosthill Quarry", road: "High Street", postcodes: ["B77"] }),
  "two-gates": e({ name: "Two Gates", phone: "01827 802163", landmark: "The Two Gates Crossroads", road: "Tamworth Road", postcodes: ["B77"] }),
  stonydelph: e({ name: "Stonydelph", phone: "01827 802163", landmark: "Stonydelph Corner", road: "Pennine Way", postcodes: ["B77"] }),
  glascote: e({ name: "Glascote", phone: "01827 802163", landmark: "Glascote Basin", road: "Glascote Road", postcodes: ["B77"] }),
  bolehall: e({ name: "Bolehall", phone: "01827 802163", landmark: "Bolehall Manor", road: "Ambleside", postcodes: ["B77"] }),
  hopwas: e({ name: "Hopwas", phone: "01827 802163", landmark: "Hopwas Woods", road: "Hints Road", postcodes: ["B78"] }),
  dordon: e({ name: "Dordon", phone: "01827 802163", landmark: "Dordon Activity Centre", road: "Watling Street", postcodes: ["B78"] }),
  polesworth: e({ name: "Polesworth", phone: "01827 802163", landmark: "Polesworth Abbey", road: "High Street", postcodes: ["B78"] }),
  kingsbury: e({ name: "Kingsbury", phone: "01827 802163", landmark: "Kingsbury Water Park", road: "Coventry Road", postcodes: ["B78"] }),
  warton: e({ name: "Warton", phone: "01827 802163", landmark: "The Office Park", road: "Main Street", postcodes: ["B79"] }),
  grendon: e({ name: "Grendon", phone: "01827 802163", landmark: "Grendon Church", road: "Boot Hill", postcodes: ["CV9"] }),
  "baddesley-ensor": e({ name: "Baddesley Ensor", phone: "01827 802163", landmark: "Baddesley Common", road: "New Street", postcodes: ["CV9"] }),
  atherstone: e({ name: "Atherstone", phone: "01827 802163", landmark: "Atherstone Red Lion", road: "Long Street", postcodes: ["CV9"] }),
  mancetter: e({ name: "Mancetter", phone: "01827 802163", landmark: "Mancetter Manor", road: "Watling Street", postcodes: ["CV9"] }),
  "clifton-campville": e({ name: "Clifton Campville", phone: "01827 802163", landmark: "St Andrew's Church", road: "Main Street", postcodes: ["B79"] }),
  haunton: e({ name: "Haunton", phone: "01827 802163", landmark: "Haunton Hall", road: "Main Road", postcodes: ["B79"] }),
  elford: e({ name: "Elford", phone: "01827 802163", landmark: "Elford Walled Gardens", road: "Church Road", postcodes: ["B79"] }),
  harlaston: e({ name: "Harlaston", phone: "01827 802163", landmark: "The White Lion", road: "Main Street", postcodes: ["B79"] }),
  edingale: e({ name: "Edingale", phone: "01827 802163", landmark: "Edingale Village Hall", road: "Croxall Road", postcodes: ["B79"] }),
  "drayton-bassett": e({ name: "Drayton Bassett", phone: "01827 802163", landmark: "Drayton Manor", road: "Salters Lane", postcodes: ["B78"] }),
  hints: e({ name: "Hints", phone: "01827 802163", landmark: "Hints Quarry", road: "Watling Street", postcodes: ["B78"] }),
  "mile-oak": e({ name: "Mile Oak", phone: "01827 802163", landmark: "Mile Oak Primary", road: "Mile Oak Road", postcodes: ["B78"] }),
  ansley: e({ name: "Ansley", phone: "01827 802163", landmark: "Ansley Church", road: "Birmingham Road", postcodes: ["CV10"] }),
  arley: e({ name: "Arley", phone: "01827 802163", landmark: "Arley Train Station", road: "Spring Hill", postcodes: ["CV7"] }),
  astley: e({ name: "Astley", phone: "01827 802163", landmark: "Astley Castle", road: "Astley Lane", postcodes: ["CV10"] }),
  austrey: e({ name: "Austrey", phone: "01827 802163", landmark: "The Bird in Hand", road: "Main Street", postcodes: ["CV9"] }),
  baxterley: e({ name: "Baxterley", phone: "01827 802163", landmark: "Baxterley Church", road: "Main Road", postcodes: ["CV9"] }),
  bentley: e({ name: "Bentley", phone: "01827 802163", landmark: "Bentley Woods", road: "Bentley Lane", postcodes: ["CV9"] }),
  caldecote: e({ name: "Caldecote", phone: "01827 802163", landmark: "Caldecote Hall", road: "Weddington Lane", postcodes: ["CV10"] }),
  "lea-marston": e({ name: "Lea Marston", phone: "01827 802163", landmark: "Lea Marston Hotel", road: "Church Lane", postcodes: ["B76"] }),
  middleton: e({ name: "Middleton", phone: "01827 802163", landmark: "Middleton Hall", road: "Bodymoor Heath Road", postcodes: ["B78"] }),
  "nether-whitacre": e({ name: "Nether Whitacre", phone: "01827 802163", landmark: "The Gate Inn", road: "Station Road", postcodes: ["B46"] }),
  "newton-regis": e({ name: "Newton Regis", phone: "01827 802163", landmark: "Newton Regis Village Hall", road: "Main Street", postcodes: ["B79"] }),
  seckington: e({ name: "Seckington", phone: "01827 802163", landmark: "Seckington Mount", road: "Shuttington Road", postcodes: ["B79"] }),
  "no-mans-heath": e({ name: "No Mans Heath", phone: "01827 802163", landmark: "The Four Counties Border", road: "Ashby Road", postcodes: ["B79"] }),
  "over-whitacre": e({ name: "Over Whitacre", phone: "01827 802163", landmark: "St Mary's Church", road: "Nuneaton Road", postcodes: ["B46"] }),
  shuttington: e({ name: "Shuttington", phone: "01827 802163", landmark: "Shuttington Bridge", road: "Main Road", postcodes: ["B79"] })
}, i = [
  "/",
  "/about",
  "/services",
  "/reviews",
  "/faq",
  "/locations"
  // This is the main grid page you were looking at!
], a = [];
Object.keys(l).forEach((o) => {
  a.push(`/local-plumber/${o}/`), a.push(`/emergency-plumber/${o}/`), a.push(`/heating-engineer/${o}/`), a.push(`/drain-unblocking/${o}/`), a.push(`/leak-detection/${o}/`);
});
const h = [...i, ...a];
export {
  h as default
};
