const i = {
  "local-plumber": {
    title: "Expert Local Plumber",
    heroText: "Your trusted neighborhood plumber for all general repairs. Reliable service for taps, toilets, and pipework.",
    description: "Looking for a reliable local plumber? We handle all non-emergency plumbing tasks including leaking taps, toilet repairs, bathroom plumbing, and appliance installations. Professional, tidy, and trusted by your local community."
  },
  "emergency-plumber": {
    title: "24/7 Emergency Plumber",
    heroText: "Rapid response for burst pipes, leaks, and plumbing disasters. Arriving in 60 minutes or less.",
    description: "Fast, local 24/7 emergency plumbing repairs. We handle burst pipes, leaking tanks, and bathroom disasters at any hour. Reliable service with no call out charge."
  },
  "drain-unblocking": {
    title: "Expert Drain Unblocking",
    heroText: "Fast, hygienic drainage clearance and toilet unblocking. We use high-pressure jetting to clear stubborn blockages in minutes.",
    description: "Got a blocked toilet, sink, or main sewer line? Our local drainage engineers carry professional high-pressure jetting equipment and CCTV cameras to clear obstructions instantly. No call out charge and fixed prices."
  },
  "heating-engineer": {
    title: "Emergency Heating Engineer",
    heroText: "Complete central heating diagnostics and repair. From cold radiators and airlocks to noisy pipes and pump failures.",
    description: "Heating system playing up? We specialize in fixing central heating issues and boiler breakdowns. Whether it's a single cold radiator or a full system failure, our Gas Safe engineers diagnose and fix it fast."
  },
  "leak-detection": {
    title: "Trace & Access Leak Detection",
    heroText: "Non-invasive leak detection experts. We find hidden leaks under floors and behind walls using thermal imaging.",
    description: "Water leak damaging your property? We specialize in finding and fixing hidden leaks using acoustic sensors and thermal imaging to stop water damage with minimal disruption to your home."
  }
}, e = "https://share.google/vCD4kQc8elUleD1EE", s = {
  // --- TIER 1: MAJOR HUBS ---
  coalville: {
    name: "Coalville",
    phone: "01530 654062",
    landmark: "the Clock Tower",
    road: "Memorial Square",
    postcodes: ["LE67 3", "LE67 4"],
    description: "We are the local emergency plumbers for LE67. Whether you are near the Clock Tower or have a blocked pipe near Coalville Park, our team is minutes away.",
    mapSrc: e
  },
  "ashby-de-la-zouch": {
    name: "Ashby de la Zouch",
    phone: "01530 654062",
    landmark: "Ashby Castle",
    road: "Market Street",
    postcodes: ["LE65 1", "LE65 2"],
    description: "Serving the LE65 area. From commercial plumbing near The Bath Grounds to residential leaks near The Lamb Inn, we cover it all.",
    mapSrc: e
  },
  ibstock: {
    name: "Ibstock",
    phone: "01530 654062",
    landmark: "Sence Valley Forest Park",
    road: "Melbourne Road",
    postcodes: ["LE67 6"],
    description: "Your local LE67 6 plumbers. We frequently attend burst pipes near Sence Valley and handle repairs for homes near The Ram Inn.",
    mapSrc: e
  },
  whitwick: {
    name: "Whitwick",
    phone: "01530 654062",
    landmark: "The Black Horse",
    road: "City of Dan",
    postcodes: ["LE67 5"],
    description: "Emergency plumbing for LE67 5. We cover the steep residential streets near The Black Horse and properties bordering Holly Hayes Wood.",
    mapSrc: e
  },
  measham: {
    name: "Measham",
    phone: "01530 654062",
    landmark: "The Library",
    road: "High Street",
    postcodes: ["DE12 7"],
    description: "Covering Measham and the DE12 area. We attend plumbing issues near the Tesco Express and residential streets off Bosworth Road.",
    mapSrc: e
  },
  markfield: {
    name: "Markfield",
    phone: "01530 654062",
    landmark: "Hill Hole Quarry",
    road: "Main Street",
    postcodes: ["LE67 9"],
    description: "Covering LE67 9. We attend plumbing jobs near The Queens Head and properties up by Hill Hole Quarry.",
    mapSrc: e
  },
  // --- THE VILLAGES (A-Z) ---
  "albert-village": {
    name: "Albert Village",
    phone: "01530 654062",
    landmark: "Albert Village Lake",
    road: "Occupation Road",
    postcodes: ["DE11"],
    description: "Serving Albert Village. We cover homes near the Lake and the primary school area.",
    mapSrc: e
  },
  bagworth: {
    name: "Bagworth",
    phone: "01530 654062",
    landmark: "Bagworth Heath Woods",
    road: "Station Road",
    postcodes: ["LE67 1"],
    description: "Serving Bagworth. We cover the village and properties near the Community Centre and Heath Woods.",
    mapSrc: e
  },
  "bardon-hill": {
    name: "Bardon Hill",
    phone: "01530 654062",
    landmark: "Bardon Truck Park",
    road: "Beveridge Lane",
    postcodes: ["LE67 1"],
    description: "Commercial and residential plumbing for LE67 1, near the Bardon Truck Park and Birch Tree pub.",
    mapSrc: e
  },
  battram: {
    name: "Battram",
    phone: "01530 654062",
    landmark: "Battram Woods",
    road: "Wood Road",
    postcodes: ["LE67"],
    description: "Local plumbing for Battram. We attend properties near the Woods and the surrounding rural lanes.",
    mapSrc: e
  },
  blackfordby: {
    name: "Blackfordby",
    phone: "01530 654062",
    landmark: "The Black Lion",
    road: "Main Street",
    postcodes: ["DE11 8"],
    description: "Covering DE11 8. We fix plumbing issues for homes near The Black Lion and the village school.",
    mapSrc: e
  },
  boundary: {
    name: "Boundary",
    phone: "01530 654062",
    landmark: "Ashby Road",
    road: "Ashby Road",
    postcodes: ["DE11"],
    description: "Serving the Boundary area between Woodville and Ashby. Fast response along the main road.",
    mapSrc: e
  },
  "breedon-on-the-hill": {
    name: "Breedon on the Hill",
    phone: "01530 654062",
    landmark: "The Priory Church",
    road: "Ashby Road",
    postcodes: ["DE73"],
    description: "Specialist plumbing for Breedon. We serve properties near the famous hilltop church and the Three Horseshoes.",
    mapSrc: e
  },
  coleorton: {
    name: "Coleorton",
    phone: "01530 654062",
    landmark: "Coleorton Hall",
    road: "The Moorlands",
    postcodes: ["LE67 8"],
    description: "Specialist plumbing for LE67 8, attending properties near the Kings Arms and Coleorton Hall.",
    mapSrc: e
  },
  "copt-oak": {
    name: "Copt Oak",
    phone: "01530 654062",
    landmark: "The Copt Oak Pub",
    road: "Whitwick Road",
    postcodes: ["LE67"],
    description: "High-ground plumbing for LE67. We attend properties near the Copt Oak pub and the M1 junction.",
    mapSrc: e
  },
  "donington-le-heath": {
    name: "Donington le Heath",
    phone: "01530 654062",
    landmark: "The Manor House",
    road: "Manor Road",
    postcodes: ["LE67 2"],
    description: "Local plumbing for LE67 2, covering the area around the historic Manor House.",
    mapSrc: e
  },
  donisthorpe: {
    name: "Donisthorpe",
    phone: "01530 654062",
    landmark: "Donisthorpe Woodland Park",
    road: "Church Street",
    postcodes: ["DE12"],
    description: "Serving Donisthorpe. We cover homes near the Woodland Park and the Halfway House.",
    mapSrc: e
  },
  ellistown: {
    name: "Ellistown",
    phone: "01530 654062",
    landmark: "South Leicestershire College",
    road: "Beveridge Lane",
    postcodes: ["LE67 1"],
    description: "Covering LE67 1. We fix leaks and plumbing issues near the Ellistown Inn and South Leicestershire College.",
    mapSrc: e
  },
  griffydam: {
    name: "Griffydam",
    phone: "01530 654062",
    landmark: "The Griffin Inn",
    road: "Top Road",
    postcodes: ["LE67 8"],
    description: "Local plumbing for LE67 8, covering the village and homes near The Griffin Inn.",
    mapSrc: e
  },
  heather: {
    name: "Heather",
    phone: "01530 654062",
    landmark: "Sence Valley",
    road: "Swepstone Road",
    postcodes: ["LE67 6"],
    description: "Serving LE67 6. We attend plumbing jobs near the Queen's Head and properties around Sence Valley.",
    mapSrc: e
  },
  hugglescote: {
    name: "Hugglescote",
    phone: "01530 654062",
    landmark: "The Gate Inn",
    road: "Ashby Road",
    postcodes: ["LE67 2"],
    description: "Plumbing repairs for LE67 2. We cover the new developments and older terraces near The Gate Inn and The Bear and Swan.",
    mapSrc: e
  },
  leicestershire: {
    name: "Leicestershire",
    phone: "01530 654062",
    landmark: "Charnwood Forest",
    road: "The M1 Corridor",
    postcodes: ["LE"],
    description: "We are proud to serve North West Leicestershire, providing trusted plumbing across the entire county.",
    mapSrc: e
  },
  lount: {
    name: "Lount",
    phone: "01530 654062",
    landmark: "The Ferrers Arms",
    road: "Nottingham Road",
    postcodes: ["LE65 1"],
    description: "Serving LE65 1 and residents near the Ferrers Arms.",
    mapSrc: e
  },
  moira: {
    name: "Moira",
    phone: "01530 654062",
    landmark: "Moira Furnace",
    road: "Ashby Road",
    postcodes: ["DE12 6"],
    description: "Serving Moira. We cover the new estates near the National Forest and older homes near the Furnace.",
    mapSrc: e
  },
  "newbold-coleorton": {
    name: "Newbold Coleorton",
    phone: "01530 654062",
    landmark: "The Cross Keys",
    road: "Ashby Road",
    postcodes: ["LE67 8"],
    description: "Covering LE67 8. Rural plumbing near The Cross Keys.",
    mapSrc: e
  },
  "normanton-le-heath": {
    name: "Normanton le Heath",
    phone: "01530 654062",
    landmark: "The Packington Border",
    road: "Ashby Road",
    postcodes: ["LE67 2"],
    description: "Rural plumbing for LE67 2. We cover the outlying properties and farms near the darker lanes of Normanton.",
    mapSrc: e
  },
  oakthorpe: {
    name: "Oakthorpe",
    phone: "01530 654062",
    landmark: "The Holly Bush",
    road: "Measham Road",
    postcodes: ["DE12"],
    description: "Local plumbing for Oakthorpe. We handle repairs for properties near the Leisure Centre and village hall.",
    mapSrc: e
  },
  osgathorpe: {
    name: "Osgathorpe",
    phone: "01530 654062",
    landmark: "St Mary's Church",
    road: "Ashby Road",
    postcodes: ["LE12"],
    description: "Serving the Osgathorpe community. We attend rural properties near the Storey Arms.",
    mapSrc: e
  },
  packington: {
    name: "Packington",
    phone: "01530 654062",
    landmark: "The Bull & Lion",
    road: "High Street",
    postcodes: ["LE65 1"],
    description: "Serving LE65 1. We attend leaks and repairs near The Bull & Lion on High Street.",
    mapSrc: e
  },
  "peggs-green": {
    name: "Peggs Green",
    phone: "01530 654062",
    landmark: "The New Inn",
    road: "Nottingham Road",
    postcodes: ["LE67 8"],
    description: "Serving LE67 8. We cover the residential stretch near the New Inn and Coleorton border.",
    mapSrc: e
  },
  ravenstone: {
    name: "Ravenstone",
    phone: "01530 654062",
    landmark: "The Kings Arms",
    road: "Beeswax Lane",
    postcodes: ["LE67 2"],
    description: "Based locally for LE67 2. Fast response to plumbing issues near The Kings Arms and the Beeswax Lane area.",
    mapSrc: e
  },
  shellbrook: {
    name: "Shellbrook",
    phone: "01530 654062",
    landmark: "Ashby Road",
    road: "Ashby Road",
    postcodes: ["LE65"],
    description: "Fast repairs for the LE65 outskirts along the Ashby Road.",
    mapSrc: e
  },
  sinope: {
    name: "Sinope",
    phone: "01530 654062",
    landmark: "The Moorlands",
    road: "A511",
    postcodes: ["LE67"],
    description: "Covering properties along the A511 in Sinope. Fast access for main road residents.",
    mapSrc: e
  },
  smisby: {
    name: "Smisby",
    phone: "01530 654062",
    landmark: "The Smisby Arms",
    road: "Main Street",
    postcodes: ["LE65 2"],
    description: "Rural plumbing support for LE65 2, covering properties near The Smisby Arms.",
    mapSrc: e
  },
  snibston: {
    name: "Snibston",
    phone: "01530 654062",
    landmark: "Snibston Colliery Park",
    road: "Chiswell Drive",
    postcodes: ["LE67 3"],
    description: "Serving LE67 3 properties bordering Snibston Colliery Park. We handle residential leaks and pipe repairs.",
    mapSrc: e
  },
  "stanton-under-bardon": {
    name: "Stanton under Bardon",
    phone: "01530 654062",
    landmark: "The Plough Inn",
    road: "Main Street",
    postcodes: ["LE67 9"],
    description: "Serving LE67 9, specifically homes near The Plough Inn and the Cliffe Hill area.",
    mapSrc: e
  },
  "staunton-harold": {
    name: "Staunton Harold",
    phone: "01530 654062",
    landmark: "Staunton Harold Hall",
    road: "The Drive",
    postcodes: ["LE65"],
    description: "Specialist plumbing for the Staunton Harold estate and surrounding garden centre areas.",
    mapSrc: e
  },
  swannington: {
    name: "Swannington",
    phone: "01530 654062",
    landmark: "Hough Mill",
    road: "Main Street",
    postcodes: ["LE67 8"],
    description: "Your local Swannington plumber. We cover LE67 8, attending leaks near The Robin Hood pub and homes around Hough Mill.",
    mapSrc: e
  },
  thringstone: {
    name: "Thringstone",
    phone: "01530 654062",
    landmark: "Grace Dieu Priory",
    road: "Loughborough Road",
    postcodes: ["LE67 8"],
    description: "Serving LE67 8. We attend plumbing emergencies near The Rose & Crown and properties around Grace Dieu Priory.",
    mapSrc: e
  },
  tonge: {
    name: "Tonge",
    phone: "01530 654062",
    landmark: "The Cloud Trail",
    road: "Moor Lane",
    postcodes: ["DE73"],
    description: "Rural plumbing services for Tonge and the surrounding hamlets.",
    mapSrc: e
  },
  willesley: {
    name: "Willesley",
    phone: "01530 654062",
    landmark: "Willesley Park Golf Club",
    road: "Willesley Road",
    postcodes: ["LE65 2"],
    description: "Plumbing cover for LE65 2, serving the residential area near Willesley Park Golf Club.",
    mapSrc: e
  },
  wilson: {
    name: "Wilson",
    phone: "01530 654062",
    landmark: "The Bulls Head",
    road: "Main Street",
    postcodes: ["DE73"],
    description: "Covering the village of Wilson. We attend properties near the Bulls Head and golf club.",
    mapSrc: e
  },
  worthington: {
    name: "Worthington",
    phone: "01530 654062",
    landmark: "The Malt Shovel",
    road: "Main Street",
    postcodes: ["LE65 1"],
    description: "Serving LE65 1. We handle plumbing jobs near The Malt Shovel and the Cloud Trail.",
    mapSrc: e
  },
  // --- ADDED: Additional Charnwood-area towns provided by user ---
  quorn: {
    name: "Quorn",
    postcode: "LE12",
    road: "High Street",
    // FIX
    postcodes: ["LE12"],
    // FIX
    phone: "01509 447469",
    localSpice: "Reliable service just a stone's throw from the Great Central Railway and Quorn Cross.",
    landmark: "Great Central Railway",
    metaDescription: "Professional services in Quorn LE12. Local experts serving the High Street and surrounding Charnwood area. Call 01509 447469 today.",
    mapSrc: e
  },
  mountsorrel: {
    name: "Mountsorrel",
    postcode: "LE12",
    road: "The Green",
    // FIX
    postcodes: ["LE12"],
    // FIX
    phone: "01509 447469",
    localSpice: "Your local specialist near the historic Buttercross and Mountsorrel Quarry.",
    landmark: "The Buttercross",
    metaDescription: "Trusted local support in Mountsorrel. Expert service near the granite heritage sites. Contact our 01509 447469 line for fast response.",
    mapSrc: e
  },
  "barrow-upon-soar": {
    name: "Barrow upon Soar",
    postcode: "LE12",
    road: "High Street",
    // FIX
    postcodes: ["LE12"],
    // FIX
    phone: "01509 447469",
    localSpice: "Serving the community from the banks of the River Soar to the home of the Barrow Kipper.",
    landmark: "River Soar",
    metaDescription: "Serving Barrow upon Soar with expert local care. From the riverside to the village center, call 01509 447469.",
    mapSrc: e
  },
  sileby: {
    name: "Sileby",
    postcode: "LE12",
    road: "King Street",
    // FIX
    postcodes: ["LE12"],
    // FIX
    phone: "01509 447469",
    localSpice: "Reliable local experts serving residents near Sileby Mill and the Brook.",
    landmark: "Sileby Mill",
    metaDescription: "Need a local expert in Sileby? We serve the whole LE12 area near the Brook. Reach us locally at 01509 447469.",
    mapSrc: e
  },
  "woodhouse-eaves": {
    name: "Woodhouse Eaves",
    postcode: "LE12",
    road: "Main Street",
    // FIX
    postcodes: ["LE12"],
    // FIX
    phone: "01509 447469",
    localSpice: "Providing expert care in the heart of Charnwood Forest, just below Beacon Hill.",
    landmark: "Beacon Hill",
    metaDescription: "Expert services in Woodhouse Eaves and the Charnwood Forest area. Local 01509 447469 number for all residents.",
    mapSrc: e
  },
  swithland: {
    name: "Swithland",
    postcode: "LE12",
    road: "Main Street",
    // FIX
    postcodes: ["LE12"],
    // FIX
    phone: "01509 447469",
    localSpice: "Dedicated service for the Swithland Slate area and near the Reservoir.",
    landmark: "Swithland Reservoir",
    metaDescription: "Professional local service in Swithland. Serving the prestigious reservoir and forest area. Call 01509 447469.",
    mapSrc: e
  },
  cossington: {
    name: "Cossington",
    postcode: "LE7",
    road: "Main Street",
    // FIX
    postcodes: ["LE7"],
    // FIX
    phone: "01509 447469",
    localSpice: "Your trusted partner serving the quiet village of Cossington and near the Meadows.",
    landmark: "Cossington Meadows",
    metaDescription: "Local support for the Cossington community. Reliable service near the nature reserve. Dial 01509 447469.",
    mapSrc: e
  }
}, r = Object.keys(i), n = Object.keys(s), o = ["/"];
r.forEach((a) => {
  o.push(`/${a}`);
});
n.forEach((a) => {
  o.push(`/plumber-in-${a}`);
});
r.forEach((a) => {
  n.forEach((t) => {
    o.push(`/${a}/in-${t}`);
  });
});
export {
  o as default
};
