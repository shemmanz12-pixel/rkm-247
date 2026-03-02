// This file provides the unique "Spice" for each town
// Keys must match the URL slug exactly (e.g. "ashby-de-la-zouch")

export const townSpecifics: Record<string, string> = {
  "default": "We are your local plumbing experts, providing 24/7 emergency response with no call-out charges.",

  // --- MAJOR HUBS ---
  "coalville": "Based right here in Coalville, our engineers can be with you in under 30 minutes. From the Clock Tower to Snibston, we cover every street.",
  "ashby-de-la-zouch": "Serving the historic market town of Ashby. Whether you're near the Castle or on Smisby Road, our local team provides rapid boiler repairs and emergency plumbing.",
  "ibstock": "We have engineers active in Ibstock daily. We specialize in older property plumbing repairs along High Street and Melbourne Road.",
  "whitwick": "Our Whitwick team is ready to respond. We handle emergency leaks and heating repairs near the Market Place and Hermitage Road.",
  "markfield": "Covering Markfield and the A50 corridor. Fast response for Field Head and the village centre.",
  "shepshed": "Our Shepshed engineers carry standard parts for 90% of boiler brands, ensuring a first-time fix for LE12 residents.",
  "measham": "Local to Measham? We offer 60-minute response times for blocked drains and burst pipes throughout the village.",
  
  // --- SURROUNDING VILLAGES ---
  "albert-village": "Emergency plumbing support for Albert Village. We are just minutes away for quick leaks and boiler fixes.",
  "bagworth": "Serving Bagworth and the surrounding areas. Our vans are fully stocked to handle heating repairs on the first visit.",
  "bardon-hill": "Covering properties around Bardon Hill. Fast response times for both residential and commercial plumbing issues.",
  "battram": "Local plumbing services for Battram. No call-out charges for our neighbors in the LE67 area.",
  "blackfordby": "Supporting Blackfordby village with honest, fixed-price plumbing repairs. We respect your home and leave no mess.",
  "boundary": "Emergency cover for Boundary. We solve heating issues and leaks quickly for all local residents.",
  "breedon-on-the-hill": "Covering the hilltop and surrounding lanes. We get to Breedon fast when you have an emergency.",
  "coleorton": "Specialist care for Coleorton's mix of modern and heritage properties. We know the local systems well.",
  "copt-oak": "Fast response for Copt Oak. We handle boiler breakdowns and emergency leaks near the motorway junctions.",
  "donington-le-heath": "Just around the corner from the Manor House, we provide rapid plumbing repairs for Donington le Heath.",
  "donisthorpe": "Emergency cover for Donisthorpe. We solve heating issues and leaks quickly near the Woodland Park.",
  "ellistown": "Reliable plumbing for Ellistown. No call out charge for local residents near South Street and Beveridge Lane.",
  "griffydam": "Serving the Griffydam community with professional heating and plumbing services. Fast, local, and reliable.",
  "heather": "We are frequently in Heather village. Call us for boiler servicing or emergency leak repairs.",
  "hugglescote": "Serving the growing Hugglescote community. We are experts in new build plumbing systems and emergency repairs.",
  "leicestershire": "Your trusted emergency plumbers for North West Leicestershire. 60-minute response across the county."
  "lount": "Covering Lount and the surrounding areas. Quick response for emergency plumbing needs.",
  "moira": "Based near the National Forest? Our Moira engineers are equipped for all boiler and plumbing emergencies.",
  "newbold-coleorton": "Local engineers for Newbold Coleorton. We handle everything from dripping taps to full heating failures.",
  "normanton-le-heath": "Serving the rural community of Normanton le Heath. We never charge extra for travel time.",
  "oakthorpe": "Reliable plumbing for Oakthorpe. We are your local, trusted engineers for all emergency work.",
  "osgathorpe": "Serving Osgathorpe with reliable, local plumbing. No call out fees for our rural neighbors.",
  "packington": "Fast, discreet plumbing services for Packington village. We respect your property and leave no mess.",
  "peggs-green": "Emergency assistance for Peggs Green. We are just down the road and can be with you quickly.",
  "ravenstone": "Just minutes away from our HQ, Ravenstone residents get our fastest priority response times.",
  "shellbrook": "Covering the Shellbrook area. Fast, effective plumbing repairs with 12-month guarantees.",
  "sinope": "Local plumbing support for Sinope. We handle boiler issues and leaks along the A511 corridor.",
  "smisby": "Serving Smisby village. Our local engineers provide rapid response without the national franchise price tag.",
  "snibston": "Right on our doorstep in Snibston. We offer immediate assistance for all plumbing emergencies.",
  "stanton-under-bardon": "Covering Stanton under Bardon. Fast, reliable service for Cliffe Lane and Main Street residents.",
  "staunton-harold": "Respectful, professional plumbing services for the Staunton Harold area and surrounding estates.",
  "swannington": "Specialist heating repairs for Swannington's mix of modern and heritage properties.",
  "thringstone": "We cover all of Thringstone. From The Green to Loughborough Road, our local plumbers are nearby.",
  "tonge": "Emergency plumbing for Tonge. We respond quickly to boiler breakdowns and water leaks.",
  "willesley": "Serving the Willesley area. We provide expert heating and plumbing services with no hidden fees.",
  "wilson": "Local plumbing coverage for Wilson. Fast response times for all residential emergencies.",
  "worthington": "Serving Worthington village. We are your local, trusted experts for boiler repairs and plumbing needs.",

};

export const townReviews: Record<string, Array<{name: string, location: string, text: string, stars: number}>> = {}

export const reviews = {
  "default": [
    { name: "Sarah J.", location: "Local Resident", text: "Arrived within the hour and fixed the leak immediately. Very polite.", stars: 5 },
    { name: "Mike T.", location: "Local Resident", text: "No call out charge was a huge plus. Professional job.", stars: 5 },
    { name: "Emma W.", location: "Local Resident", text: "Saved us from a flooded kitchen late at night. Highly recommend.", stars: 5 }
  ],
  "albert-village": [
    { name: "David L.", location: "Albert Village", text: "Needed an emergency plumber in Albert Village late at night. They used leak detection to find the issue fast.", stars: 5 },
    { name: "Susan P.", location: "Albert Village", text: "Fixed our central heating boiler just before winter. Great local service.", stars: 5 },
    { name: "James K.", location: "Albert Village", text: "Sorted out our drainage issues and did some general plumbing work in the bathroom. Very tidy.", stars: 5 }
  ],
  "ashby-de-la-zouch": [
    { name: "Richard B.", location: "Ashby de la Zouch", text: "The best emergency plumber in Ashby. Found the hidden burst pipe with leak detection equipment quickly.", stars: 5 },
    { name: "Claire D.", location: "Ashby de la Zouch", text: "Our central heating broke down and RKM fixed it same day. Highly reliable.", stars: 5 },
    { name: "Tom S.", location: "Ashby de la Zouch", text: "Great for general plumbing repairs and unblocking drainage. Fair prices too.", stars: 5 }
  ],
  "bagworth": [
    { name: "Paul M.", location: "Bagworth", text: "Called for an emergency plumber and they arrived in 30 mins. Spot on leak detection.", stars: 5 },
    { name: "Lisa G.", location: "Bagworth", text: "Serviced our central heating system. Very professional and polite.", stars: 5 },
    { name: "Mark H.", location: "Bagworth", text: "Helped with a blocked sink (drainage) and other general plumbing bits. Recommended.", stars: 5 }
  ],
  "bardon-hill": [
    { name: "Steve W.", location: "Bardon Hill", text: "Fast response emergency plumber. Used leak detection to save my ceiling from water damage.", stars: 5 },
    { name: "Jenny F.", location: "Bardon Hill", text: "Got our central heating up and running again quickly. No call out charge is great.", stars: 5 },
    { name: "Rob P.", location: "Bardon Hill", text: "Good honest general plumbing and drainage service. Will use again.", stars: 5 }
  ],
  "battram": [
    { name: "Chris T.", location: "Battram", text: "Emergency plumber arrived fast. Very skilled at leak detection.", stars: 5 },
    { name: "Amanda B.", location: "Battram", text: "Fixed a radiator issue on our central heating. Very happy with the work.", stars: 5 },
    { name: "Neil J.", location: "Battram", text: "Sorted our drainage problem and new taps. Excellent general plumbing service.", stars: 5 }
  ],
  "blackfordby": [
    { name: "Gavin Y.", location: "Blackfordby", text: "Needed an emergency plumber ASAP. They found the leak with detection gear instantly.", stars: 5 },
    { name: "Helen R.", location: "Blackfordby", text: "RKM repaired our central heating quickly. Very knowledgeable engineer.", stars: 5 },
    { name: "Ian M.", location: "Blackfordby", text: "Top notch general plumbing and drainage clearance. Very clean worker.", stars: 5 }
  ],
  "boundary": [
    { name: "Kevin L.", location: "Boundary", text: "Life savers! Emergency plumber came out and used leak detection to find the burst pipe.", stars: 5 },
    { name: "Sarah H.", location: "Boundary", text: "Service on our central heating was thorough. Friendly local team.", stars: 5 },
    { name: "Mike D.", location: "Boundary", text: "Fixed our drainage issue and did some general plumbing maintenance. 5 stars.", stars: 5 }
  ],
  "breedon-on-the-hill": [
    { name: "Tim C.", location: "Breedon on the Hill", text: "Excellent emergency plumber. Leak detection was precise and saved us money.", stars: 5 },
    { name: "Laura W.", location: "Breedon on the Hill", text: "Repaired our central heating boiler. Warm house again thanks to RKM.", stars: 5 },
    { name: "Gary N.", location: "Breedon on the Hill", text: "Reliable general plumbing and drainage service. Arrived on time.", stars: 5 }
  ],
  "coalville": [
    { name: "Dave P.", location: "Coalville", text: "Best emergency plumber in Coalville. Leak detection expert sorted my pipe.", stars: 5 },
    { name: "Susan M.", location: "Coalville", text: "Local lad who fixed our central heating. Very polite and tidy.", stars: 5 },
    { name: "John H.", location: "Coalville", text: "Burst pipe fixed fast. Also did some general plumbing and drainage work for us.", stars: 5 }
  ],
  "coleorton": [
    { name: "Peter K.", location: "Coleorton", text: "Fast emergency plumber response. Leak detection found the problem in the wall.", stars: 5 },
    { name: "Emma S.", location: "Coleorton", text: "Central heating service was great. Professional and friendly.", stars: 5 },
    { name: "Andrew T.", location: "Coleorton", text: "Great general plumbing work and sorted a bad drainage blockage.", stars: 5 }
  ],
  "copt-oak": [
    { name: "Martin B.", location: "Copt Oak", text: "Emergency plumber arrived in 20 mins. Leak detection was spot on.", stars: 5 },
    { name: "Lucy A.", location: "Copt Oak", text: "Fixed our central heating efficiently. Good price too.", stars: 5 },
    { name: "Simon L.", location: "Copt Oak", text: "Very helpful with drainage and general plumbing repairs. Recommended.", stars: 5 }
  ],
  "donington-le-heath": [
    { name: "Alan R.", location: "Donington le Heath", text: "Needed an emergency plumber and they didn't disappoint. Quick leak detection.", stars: 5 },
    { name: "Jessica M.", location: "Donington le Heath", text: "Our central heating is working perfectly now. Thank you RKM.", stars: 5 },
    { name: "Phil E.", location: "Donington le Heath", text: "Did a great job on our general plumbing and drainage.", stars: 5 }
  ],
  "donisthorpe": [
    { name: "Brian W.", location: "Donisthorpe", text: "Emergency plumber was here fast. Leak detection saved our floor.", stars: 5 },
    { name: "Karen J.", location: "Donisthorpe", text: "Expert central heating repair. Very knowledgeable.", stars: 5 },
    { name: "Terry G.", location: "Donisthorpe", text: "Sorted the drainage and general plumbing issues in one visit.", stars: 5 }
  ],
  "ellistown": [
    { name: "Colin F.", location: "Ellistown", text: "Great emergency plumber service. Used leak detection to find the hidden drip.", stars: 5 },
    { name: "Diane H.", location: "Ellistown", text: "Fixed the central heating quickly. No mess left behind.", stars: 5 },
    { name: "Roger P.", location: "Ellistown", text: "Reliable general plumbing and drainage help. Will call again.", stars: 5 }
  ],
  "griffydam": [
    { name: "Nigel T.", location: "Griffydam", text: "Emergency plumber came out late. Leak detection was instant.", stars: 5 },
    { name: "Sally V.", location: "Griffydam", text: "Central heating boiler repair. Very professional service.", stars: 5 },
    { name: "Derek S.", location: "Griffydam", text: "General plumbing and drainage sorted quickly. Good value.", stars: 5 }
  ],
  "heather": [
    { name: "Barry O.", location: "Heather", text: "Emergency plumber saved the day. Leak detection was impressive.", stars: 5 },
    { name: "Tina C.", location: "Heather", text: "Got the central heating working again. Warm and cosy now.", stars: 5 },
    { name: "Geoff M.", location: "Heather", text: "Excellent for drainage and general plumbing jobs.", stars: 5 }
  ],
  "hugglescote": [
    { name: "Keith L.", location: "Hugglescote", text: "Fast emergency plumber. Leak detection found the issue under the sink.", stars: 5 },
    { name: "Mary D.", location: "Hugglescote", text: "Central heating service was top class. Highly recommend.", stars: 5 },
    { name: "Stuart B.", location: "Hugglescote", text: "General plumbing and drainage work was done to a high standard.", stars: 5 }
  ],
  "ibstock": [
    { name: "Trevor N.", location: "Ibstock", text: "Emergency plumber arrived quickly. Leak detection pinpointed the fault.", stars: 5 },
    { name: "Jane P.", location: "Ibstock", text: "Fixed our central heating radiators. Very polite engineer.", stars: 5 },
    { name: "Graham K.", location: "Ibstock", text: "Great job on the drainage and general plumbing repairs.", stars: 5 }
  ],
  "leicestershire": [
    { name: "Local Resident", location: "Leicestershire", text: "Best emergency plumber in the county. Leak detection was fast.", stars: 5 },
    { name: "Homeowner", location: "Leicestershire", text: "Reliable central heating repair service across Leicestershire.", stars: 5 },
    { name: "Client", location: "Leicestershire", text: "Trusted for all general plumbing and drainage needs.", stars: 5 }
  ],
  "lount": [
    { name: "Harry E.", location: "Lount", text: "Emergency plumber was very professional. Leak detection sorted it.", stars: 5 },
    { name: "Linda W.", location: "Lount", text: "Central heating is back on thanks to RKM. Great service.", stars: 5 },
    { name: "Carl R.", location: "Lount", text: "Quick general plumbing fix and drainage clearance.", stars: 5 }
  ],
  "markfield": [
    { name: "Gordon A.", location: "Markfield", text: "Emergency plumber to the rescue. Leak detection was very accurate.", stars: 5 },
    { name: "Wendy S.", location: "Markfield", text: "Central heating boiler swap. Professional job.", stars: 5 },
    { name: "Adrian L.", location: "Markfield", text: "Sorted out our drainage and general plumbing. Very pleased.", stars: 5 }
  ],
  "measham": [
    { name: "Roy D.", location: "Measham", text: "Emergency plumber came out Sunday. Leak detection found the burst.", stars: 5 },
    { name: "Pat M.", location: "Measham", text: "Fixed our central heating thermostat. Nice friendly chap.", stars: 5 },
    { name: "Lesley G.", location: "Measham", text: "General plumbing and drainage work completed efficiently.", stars: 5 }
  ],
  "moira": [
    { name: "Frank H.", location: "Moira", text: "Emergency plumber arrived on time. Leak detection was spot on.", stars: 5 },
    { name: "Jeanette B.", location: "Moira", text: "Central heating repair was quick and affordable.", stars: 5 },
    { name: "Malcolm T.", location: "Moira", text: "Great service for drainage and general plumbing issues.", stars: 5 }
  ],
  "newbold-coleorton": [
    { name: "Julian F.", location: "Newbold Coleorton", text: "Emergency plumber fixed the leak fast. Great leak detection.", stars: 5 },
    { name: "Andrea K.", location: "Newbold Coleorton", text: "Central heating service was excellent. Very thorough.", stars: 5 },
    { name: "Clive W.", location: "Newbold Coleorton", text: "General plumbing and drainage problems solved instantly.", stars: 5 }
  ],
  "normanton-le-heath": [
    { name: "Bernard J.", location: "Normanton le Heath", text: "Emergency plumber response was amazing. Leak detection worked well.", stars: 5 },
    { name: "Shirley P.", location: "Normanton le Heath", text: "Central heating system flushed and working great.", stars: 5 },
    { name: "Dennis R.", location: "Normanton le Heath", text: "Reliable drainage and general plumbing expert.", stars: 5 }
  ],
  "oakthorpe": [
    { name: "Ray S.", location: "Oakthorpe", text: "Emergency plumber found the issue. Leak detection saved time.", stars: 5 },
    { name: "Brenda N.", location: "Oakthorpe", text: "Central heating check up. Very professional service.", stars: 5 },
    { name: "Mick C.", location: "Oakthorpe", text: "Good solid general plumbing and drainage work.", stars: 5 }
  ],
  "osgathorpe": [
    { name: "Eddie M.", location: "Osgathorpe", text: "Emergency plumber came quickly. Leak detection equipment is clever.", stars: 5 },
    { name: "Valerie H.", location: "Osgathorpe", text: "Fixed the central heating pump. House is warm again.", stars: 5 },
    { name: "Norman L.", location: "Osgathorpe", text: "General plumbing and drainage sorted without fuss.", stars: 5 }
  ],
  "packington": [
    { name: "Sid G.", location: "Packington", text: "Emergency plumber was brilliant. Leak detection was fast.", stars: 5 },
    { name: "Maureen D.", location: "Packington", text: "Central heating repair was done same day.", stars: 5 },
    { name: "Ken B.", location: "Packington", text: "Very good at general plumbing and drainage clearance.", stars: 5 }
  ],
  "peggs-green": [
    { name: "Arthur V.", location: "Peggs Green", text: "Emergency plumber arrived within the hour. Good leak detection.", stars: 5 },
    { name: "Doreen T.", location: "Peggs Green", text: "Central heating service was great value.", stars: 5 },
    { name: "Lenny W.", location: "Peggs Green", text: "Sorted the drainage and general plumbing. Highly recommend.", stars: 5 }
  ],
  "ravenstone": [
    { name: "Gerald F.", location: "Ravenstone", text: "Emergency plumber found the burst pipe. Leak detection expert.", stars: 5 },
    { name: "Audrey S.", location: "Ravenstone", text: "Central heating boiler fixed. Very happy customer.", stars: 5 },
    { name: "Ronnie P.", location: "Ravenstone", text: "General plumbing and drainage work done to a high standard.", stars: 5 }
  ],
  "shellbrook": [
    { name: "Sam K.", location: "Shellbrook", text: "Emergency plumber was fast. Leak detection found the problem.", stars: 5 },
    { name: "Louise M.", location: "Shellbrook", text: "Central heating radiators replaced. Good job.", stars: 5 },
    { name: "Tony R.", location: "Shellbrook", text: "Great drainage and general plumbing service.", stars: 5 }
  ],
  "sinope": [
    { name: "Cliff J.", location: "Sinope", text: "Emergency plumber came out late. Leak detection was vital.", stars: 5 },
    { name: "Barbara E.", location: "Sinope", text: "Central heating works perfectly now. Thanks RKM.", stars: 5 },
    { name: "Vince L.", location: "Sinope", text: "General plumbing and drainage issues resolved quickly.", stars: 5 }
  ],
  "smisby": [
    { name: "Darren Q.", location: "Smisby", text: "Emergency plumber was excellent. Leak detection found it fast.", stars: 5 },
    { name: "Tracey W.", location: "Smisby", text: "Central heating service. Very polite and tidy.", stars: 5 },
    { name: "Greg H.", location: "Smisby", text: "Sorted our drainage and general plumbing needs.", stars: 5 }
  ],
  "snibston": [
    { name: "Warren Z.", location: "Snibston", text: "Emergency plumber response was top notch. Leak detection worked.", stars: 5 },
    { name: "Paula X.", location: "Snibston", text: "Fixed our central heating boiler. Very knowledgeable.", stars: 5 },
    { name: "Russell C.", location: "Snibston", text: "Good general plumbing and drainage service in Snibston.", stars: 5 }
  ],
  "stanton-under-bardon": [
    { name: "Harvey V.", location: "Stanton under Bardon", text: "Emergency plumber saved us. Leak detection was quick.", stars: 5 },
    { name: "Joanne N.", location: "Stanton under Bardon", text: "Central heating repair was very professional.", stars: 5 },
    { name: "Marcus B.", location: "Stanton under Bardon", text: "Excellent drainage and general plumbing work.", stars: 5 }
  ],
  "staunton-harold": [
    { name: "Rupert K.", location: "Staunton Harold", text: "Emergency plumber arrived fast. Leak detection pinpointed it.", stars: 5 },
    { name: "Fiona G.", location: "Staunton Harold", text: "Central heating service was thorough and clean.", stars: 5 },
    { name: "Julian M.", location: "Staunton Harold", text: "General plumbing and drainage sorted out well.", stars: 5 }
  ],
  "swannington": [
    { name: "Miles T.", location: "Swannington", text: "Emergency plumber was great. Leak detection found the damp source.", stars: 5 },
    { name: "Caroline P.", location: "Swannington", text: "Fixed our central heating quickly. Very grateful.", stars: 5 },
    { name: "Damian R.", location: "Swannington", text: "Reliable drainage and general plumbing help.", stars: 5 }
  ],
  "thringstone": [
    { name: "Nathan S.", location: "Thringstone", text: "Emergency plumber came out fast. Leak detection was exact.", stars: 5 },
    { name: "Rachel D.", location: "Thringstone", text: "Central heating works great now. Good service.", stars: 5 },
    { name: "Justin F.", location: "Thringstone", text: "General plumbing and drainage issues fixed. 5 stars.", stars: 5 }
  ],
  "tonge": [
    { name: "Oliver G.", location: "Tonge", text: "Emergency plumber was a lifesaver. Leak detection found it.", stars: 5 },
    { name: "Sophie H.", location: "Tonge", text: "Central heating repair was spot on. Warm again.", stars: 5 },
    { name: "Elliot J.", location: "Tonge", text: "Great general plumbing and drainage service.", stars: 5 }
  ],
  "whitwick": [
    { name: "Paul R.", location: "Whitwick", text: "Came out to Whitwick for an emergency plumber job. Great leak detection.", stars: 5 },
    { name: "Lisa K.", location: "Whitwick", text: "Fixed our central heating and gave honest pricing.", stars: 5 },
    { name: "Mark D.", location: "Whitwick", text: "Used them for drainage and general plumbing. Very thorough.", stars: 5 }
  ],
  "willesley": [
    { name: "Dominic A.", location: "Willesley", text: "Emergency plumber response was quick. Leak detection successful.", stars: 5 },
    { name: "Hannah L.", location: "Willesley", text: "Central heating service was excellent. Nice guy.", stars: 5 },
    { name: "Sebastian K.", location: "Willesley", text: "Sorted drainage and general plumbing professionally.", stars: 5 }
  ],
  "wilson": [
    { name: "Lewis P.", location: "Wilson", text: "Emergency plumber arrived fast. Leak detection was good.", stars: 5 },
    { name: "Zoe M.", location: "Wilson", text: "Central heating back up and running. Thanks RKM.", stars: 5 },
    { name: "Connor W.", location: "Wilson", text: "General plumbing and drainage work was top quality.", stars: 5 }
  ],
  "worthington": [
    { name: "Jacob R.", location: "Worthington", text: "Emergency plumber fixed the issue. Leak detection was fast.", stars: 5 },
    { name: "Abigail S.", location: "Worthington", text: "Central heating repair was quick and easy.", stars: 5 },
    { name: "Ethan T.", location: "Worthington", text: "Great service for drainage and general plumbing.", stars: 5 }
  ]
};