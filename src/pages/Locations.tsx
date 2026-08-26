import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, ChevronRight, Search } from 'lucide-react';

interface LocationItem {
  slug: string;
  name: string;
  postcode: string;
}

const ALL_SITEMAP_LOCATIONS: LocationItem[] = [
  { slug: "albert-village", name: "Albert Village", postcode: "LE67" },
  { slug: "alvaston", name: "Alvaston", postcode: "DE73" },
  { slug: "ambaston", name: "Ambaston", postcode: "DE73" },
  { slug: "amington", name: "Amington", postcode: "B79" },
  { slug: "ansley", name: "Ansley", postcode: "CV9" },
  { slug: "anslow", name: "Anslow", postcode: "DE13" },
  { slug: "anstey", name: "Anstey", postcode: "LE6" },
  { slug: "appleby-magna", name: "Appleby Magna", postcode: "DE12" },
  { slug: "appleby-parva", name: "Appleby Parva", postcode: "DE12" },
  { slug: "arley", name: "Arley", postcode: "CV9" },
  { slug: "ashby-de-la-zouch", name: "Ashby de la Zouch", postcode: "LE65" },
  { slug: "astley", name: "Astley", postcode: "CV9" },
  { slug: "aston-on-trent", name: "Aston on Trent", postcode: "DE73" },
  { slug: "atherstone", name: "Atherstone", postcode: "CV9" },
  { slug: "austrey", name: "Austrey", postcode: "B79" },
  { slug: "baddesley-ensor", name: "Baddesley Ensor", postcode: "B79" },
  { slug: "bagworth", name: "Bagworth", postcode: "LE67" },
  { slug: "bardon-hill", name: "Bardon Hill", postcode: "LE67" },
  { slug: "barkby", name: "Barkby", postcode: "LE7" },
  { slug: "barkby-thorpe", name: "Barkby Thorpe", postcode: "LE7" },
  { slug: "barlestone", name: "Barlestone", postcode: "CV13" },
  { slug: "barrow-upon-soar", name: "Barrow upon Soar", postcode: "LE12" },
  { slug: "barrow-upon-trent", name: "Barrow upon Trent", postcode: "DE73" },
  { slug: "barton-in-the-beans", name: "Barton in the Beans", postcode: "CV13" },
  { slug: "barton-under-needwood", name: "Barton under Needwood", postcode: "DE13" },
  { slug: "battram", name: "Battram", postcode: "LE67" },
  { slug: "baxterley", name: "Baxterley", postcode: "CV9" },
  { slug: "belton", name: "Belton", postcode: "LE12" },
  { slug: "bentley", name: "Bentley", postcode: "CV9" },
  { slug: "bilstone", name: "Bilstone", postcode: "CV13" },
  { slug: "birstall", name: "Birstall", postcode: "LE7" },
  { slug: "blackfordby", name: "Blackfordby", postcode: "LE65" },
  { slug: "bolehall", name: "Bolehall", postcode: "B77" },
  { slug: "botcheston", name: "Botcheston", postcode: "LE3" },
  { slug: "boulton-moor", name: "Boulton Moor", postcode: "DE73" },
  { slug: "boundary", name: "Boundary", postcode: "LE67" },
  { slug: "branston", name: "Branston", postcode: "DE15" },
  { slug: "braunstone", name: "Braunstone", postcode: "LE3" },
  { slug: "breedon-on-the-hill", name: "Breedon on the Hill", postcode: "LE67" },
  { slug: "bretby", name: "Bretby", postcode: "DE11" },
  { slug: "burnaston", name: "Burnaston", postcode: "DE15" },
  { slug: "burton-on-the-wolds", name: "Burton on the Wolds", postcode: "LE12" },
  { slug: "burton-upon-trent", name: "Burton upon Trent", postcode: "DE14" },
  { slug: "cadeby", name: "Cadeby", postcode: "CV13" },
  { slug: "caldecote", name: "Caldecote", postcode: "CV9" },
  { slug: "carlton", name: "Carlton", postcode: "CV13" },
  { slug: "castle-donington", name: "Castle Donington", postcode: "DE74" },
  { slug: "castle-gresley", name: "Castle Gresley", postcode: "DE11" },
  { slug: "cauldwell", name: "Cauldwell", postcode: "DE12" },
  { slug: "charley", name: "Charley", postcode: "LE12" },
  { slug: "chellaston", name: "Chellaston", postcode: "DE73" },
  { slug: "church-broughton", name: "Church Broughton", postcode: "DE15" },
  { slug: "church-gresley", name: "Church Gresley", postcode: "DE11" },
  { slug: "clifton-campville", name: "Clifton Campville", postcode: "B79" },
  { slug: "coalville", name: "Coalville", postcode: "LE67" },
  { slug: "coleorton", name: "Coleorton", postcode: "LE67" },
  { slug: "congerstone", name: "Congerstone", postcode: "CV13" },
  { slug: "copt-oak", name: "Copt Oak", postcode: "LE67" },
  { slug: "cossington", name: "Cossington", postcode: "LE12" },
  { slug: "cotes", name: "Cotes", postcode: "LE12" },
  { slug: "coton-in-the-elms", name: "Coton in the Elms", postcode: "DE12" },
  { slug: "cropston", name: "Cropston", postcode: "LE7" },
  { slug: "dadlington", name: "Dadlington", postcode: "CV13" },
  { slug: "dalbury-lees", name: "Dalbury Lees", postcode: "DE15" },
  { slug: "desford", name: "Desford", postcode: "LE3" },
  { slug: "diseworth", name: "Diseworth", postcode: "DE74" },
  { slug: "donington-le-heath", name: "Donington le Heath", postcode: "LE67" },
  { slug: "donisthorpe", name: "Donisthorpe", postcode: "DE12" },
  { slug: "dordon", name: "Dordon", postcode: "B79" },
  { slug: "dosthill", name: "Dosthill", postcode: "B79" },
  { slug: "drayton-bassett", name: "Drayton Bassett", postcode: "B79" },
  { slug: "east-goscote", name: "East Goscote", postcode: "LE7" },
  { slug: "east-leake", name: "East Leake", postcode: "LE12" },
  { slug: "edingale", name: "Edingale", postcode: "B79" },
  { slug: "egginton", name: "Egginton", postcode: "DE15" },
  { slug: "elford", name: "Elford", postcode: "B79" },
  { slug: "ellistown", name: "Ellistown", postcode: "LE67" },
  { slug: "elvaston", name: "Elvaston", postcode: "DE73" },
  { slug: "etwall", name: "Etwall", postcode: "DE15" },
  { slug: "fazeley", name: "Fazeley", postcode: "B79" },
  { slug: "fenny-drayton", name: "Fenny Drayton", postcode: "CV13" },
  { slug: "field-head", name: "Field Head", postcode: "LE7" },
  { slug: "findern", name: "Findern", postcode: "DE73" },
  { slug: "foremark", name: "Foremark", postcode: "DE73" },
  { slug: "glascote", name: "Glascote", postcode: "B77" },
  { slug: "glenfield", name: "Glenfield", postcode: "LE3" },
  { slug: "great-wilne", name: "Great Wilne", postcode: "DE73" },
  { slug: "grendon", name: "Grendon", postcode: "B79" },
  { slug: "griffydam", name: "Griffydam", postcode: "LE67" },
  { slug: "groby", name: "Groby", postcode: "LE6" },
  { slug: "harlaston", name: "Harlaston", postcode: "B79" },
  { slug: "hartshorne", name: "Hartshorne", postcode: "DE11" },
  { slug: "hathern", name: "Hathern", postcode: "LE12" },
  { slug: "hatton", name: "Hatton", postcode: "DE15" },
  { slug: "haunton", name: "Haunton", postcode: "B79" },
  { slug: "heather", name: "Heather", postcode: "LE67" },
  { slug: "hemington", name: "Hemington", postcode: "DE74" },
  { slug: "higham-on-the-hill", name: "Higham on the Hill", postcode: "CV13" },
  { slug: "hilton", name: "Hilton", postcode: "DE15" },
  { slug: "hints", name: "Hints", postcode: "B79" },
  { slug: "hopwas", name: "Hopwas", postcode: "B79" },
  { slug: "horninglow", name: "Horninglow", postcode: "DE15" },
  { slug: "hoton", name: "Hoton", postcode: "LE12" },
  { slug: "hugglescote", name: "Hugglescote", postcode: "LE67" },
  { slug: "ibstock", name: "Ibstock", postcode: "LE67" },
  { slug: "isley-walton", name: "Isley Walton", postcode: "DE74" },
  { slug: "kegworth", name: "Kegworth", postcode: "DE74" },
  { slug: "kings-newton", name: "Kings Newton", postcode: "DE73" },
  { slug: "kingsbury", name: "Kingsbury", postcode: "B79" },
  { slug: "kirby-muxloe", name: "Kirby Muxloe", postcode: "LE3" },
  { slug: "lea-marston", name: "Lea Marston", postcode: "B79" },
  { slug: "leicester-forest-east", name: "Leicester Forest East", postcode: "LE3" },
  { slug: "leicestershire", name: "Leicestershire", postcode: "LE" },
  { slug: "linton", name: "Linton", postcode: "DE12" },
  { slug: "lockington", name: "Lockington", postcode: "DE74" },
  { slug: "long-whatton", name: "Long Whatton", postcode: "LE12" },
  { slug: "loughborough", name: "Loughborough", postcode: "LE11" },
  { slug: "lount", name: "Lount", postcode: "LE65" },
  { slug: "lullington", name: "Lullington", postcode: "DE12" },
  { slug: "mancetter", name: "Mancetter", postcode: "CV9" },
  { slug: "markfield", name: "Markfield", postcode: "LE67" },
  { slug: "market-bosworth", name: "Market Bosworth", postcode: "CV13" },
  { slug: "marston-on-dove", name: "Marston on Dove", postcode: "DE15" },
  { slug: "measham", name: "Measham", postcode: "DE12" },
  { slug: "melbourne", name: "Melbourne", postcode: "DE73" },
  { slug: "middleton", name: "Middleton", postcode: "B79" },
  { slug: "mile-oak", name: "Mile Oak", postcode: "B79" },
  { slug: "milton", name: "Milton", postcode: "DE73" },
  { slug: "moira", name: "Moira", postcode: "DE12" },
  { slug: "mountsorrel", name: "Mountsorrel", postcode: "LE12" },
  { slug: "nailstone", name: "Nailstone", postcode: "CV13" },
  { slug: "nether-whitacre", name: "Nether Whitacre", postcode: "B79" },
  { slug: "netherseal", name: "Netherseal", postcode: "DE12" },
  { slug: "newbold-coleorton", name: "Newbold Coleorton", postcode: "LE67" },
  { slug: "newbold-verdon", name: "Newbold Verdon", postcode: "LE3" },
  { slug: "newton-regis", name: "Newton Regis", postcode: "B79" },
  { slug: "newton-solney", name: "Newton Solney", postcode: "DE11" },
  { slug: "newtown-linford", name: "Newtown Linford", postcode: "LE6" },
  { slug: "no-mans-heath", name: "No Mans Heath", postcode: "B79" },
  { slug: "normanton-le-heath", name: "Normanton le Heath", postcode: "LE67" },
  { slug: "oadby", name: "Oadby", postcode: "LE7" },
  { slug: "oakthorpe", name: "Oakthorpe", postcode: "DE12" },
  { slug: "odstone", name: "Odstone", postcode: "CV13" },
  { slug: "osbaston", name: "Osbaston", postcode: "CV13" },
  { slug: "osgathorpe", name: "Osgathorpe", postcode: "LE67" },
  { slug: "over-whitacre", name: "Over Whitacre", postcode: "B79" },
  { slug: "overseal", name: "Overseal", postcode: "DE12" },
  { slug: "packington", name: "Packington", postcode: "LE65" },
  { slug: "peggs-green", name: "Peggs Green", postcode: "LE67" },
  { slug: "polesworth", name: "Polesworth", postcode: "B79" },
  { slug: "prestwold", name: "Prestwold", postcode: "LE12" },
  { slug: "queniborough", name: "Queniborough", postcode: "LE7" },
  { slug: "quorn", name: "Quorn", postcode: "LE12" },
  { slug: "ratby", name: "Ratby", postcode: "LE6" },
  { slug: "ravenstone", name: "Ravenstone", postcode: "LE67" },
  { slug: "rearsby", name: "Rearsby", postcode: "LE7" },
  { slug: "repton", name: "Repton", postcode: "DE73" },
  { slug: "rolleston-on-dove", name: "Rolleston on Dove", postcode: "DE13" },
  { slug: "rosliston", name: "Rosliston", postcode: "DE12" },
  { slug: "rothley", name: "Rothley", postcode: "LE12" },
  { slug: "scropton", name: "Scropton", postcode: "DE15" },
  { slug: "seagrave", name: "Seagrave", postcode: "LE12" },
  { slug: "seckington", name: "Seckington", postcode: "B79" },
  { slug: "shackerstone", name: "Shackerstone", postcode: "CV13" },
  { slug: "shardlow", name: "Shardlow", postcode: "DE73" },
  { slug: "sheepy-magna", name: "Sheepy Magna", postcode: "CV13" },
  { slug: "sheepy-parva", name: "Sheepy Parva", postcode: "CV13" },
  { slug: "shellbrook", name: "Shellbrook", postcode: "LE65" },
  { slug: "shenton", name: "Shenton", postcode: "CV13" },
  { slug: "shepshed", name: "Shepshed", postcode: "LE12" },
  { slug: "shuttington", name: "Shuttington", postcode: "B79" },
  { slug: "sileby", name: "Sileby", postcode: "LE12" },
  { slug: "sinope", name: "Sinope", postcode: "LE67" },
  { slug: "smisby", name: "Smisby", postcode: "LE65" },
  { slug: "snibston", name: "Snibston", postcode: "LE67" },
  { slug: "stanton-under-bardon", name: "Stanton under Bardon", postcode: "LE67" },
  { slug: "stapenhill", name: "Stapenhill", postcode: "DE15" },
  { slug: "staunton-harold", name: "Staunton Harold", postcode: "LE65" },
  { slug: "stenson-fields", name: "Stenson Fields", postcode: "DE73" },
  { slug: "stoke-golding", name: "Stoke Golding", postcode: "CV13" },
  { slug: "stonydelph", name: "Stonydelph", postcode: "B77" },
  { slug: "stretton", name: "Stretton", postcode: "DE13" },
  { slug: "sutton-cheney", name: "Sutton Cheney", postcode: "CV13" },
  { slug: "sutton-on-the-hill", name: "Sutton on the Hill", postcode: "DE15" },
  { slug: "swadlincote", name: "Swadlincote", postcode: "DE11" },
  { slug: "swannington", name: "Swannington", postcode: "LE67" },
  { slug: "swithland", name: "Swithland", postcode: "LE12" },
  { slug: "syston", name: "Syston", postcode: "LE7" },
  { slug: "tamworth", name: "Tamworth", postcode: "B77" },
  { slug: "tatenhill", name: "Tatenhill", postcode: "DE13" },
  { slug: "thringstone", name: "Thringstone", postcode: "LE67" },
  { slug: "thrussington", name: "Thrussington", postcode: "LE12" },
  { slug: "thulston", name: "Thulston", postcode: "DE73" },
  { slug: "thurmaston", name: "Thurmaston", postcode: "LE7" },
  { slug: "ticknall", name: "Ticknall", postcode: "DE73" },
  { slug: "tonge", name: "Tonge", postcode: "DE73" },
  { slug: "tutbury", name: "Tutbury", postcode: "DE13" },
  { slug: "two-gates", name: "Two Gates", postcode: "B77" },
  { slug: "twycross", name: "Twycross", postcode: "CV13" },
  { slug: "ulverscroft", name: "Ulverscroft", postcode: "LE7" },
  { slug: "upton", name: "Upton", postcode: "CV13" },
  { slug: "walton-on-the-wolds", name: "Walton on the Wolds", postcode: "LE12" },
  { slug: "walton-on-trent", name: "Walton on Trent", postcode: "DE12" },
  { slug: "wanlip", name: "Wanlip", postcode: "LE7" },
  { slug: "warton", name: "Warton", postcode: "B79" },
  { slug: "wellsborough", name: "Wellsborough", postcode: "CV13" },
  { slug: "weston-on-trent", name: "Weston on Trent", postcode: "DE73" },
  { slug: "whitwick", name: "Whitwick", postcode: "LE67" },
  { slug: "wigston", name: "Wigston", postcode: "LE7" },
  { slug: "willesley", name: "Willesley", postcode: "LE65" },
  { slug: "willington", name: "Willington", postcode: "DE73" },
  { slug: "wilnecote", name: "Wilnecote", postcode: "B77" },
  { slug: "wilson", name: "Wilson", postcode: "DE73" },
  { slug: "winshill", name: "Winshill", postcode: "DE15" },
  { slug: "witherley", name: "Witherley", postcode: "CV13" },
  { slug: "woodhouse", name: "Woodhouse", postcode: "LE12" },
  { slug: "woodhouse-eaves", name: "Woodhouse Eaves", postcode: "LE12" },
  { slug: "woodville", name: "Woodville", postcode: "DE11" },
  { slug: "worthington", name: "Worthington", postcode: "LE65" },
  { slug: "wymeswold", name: "Wymeswold", postcode: "LE12" }
];

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedTowns = useMemo(() => {
    return [...ALL_SITEMAP_LOCATIONS].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredTowns = useMemo(() => {
    if (!searchQuery.trim()) return sortedTowns;
    const query = searchQuery.toLowerCase().trim();
    return sortedTowns.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.slug.toLowerCase().includes(query) ||
      item.postcode.toLowerCase().includes(query)
    );
  }, [sortedTowns, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-10 border-l-4 border-amber-600 pl-6">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                Areas <span className="text-[#A6892C]">We Cover</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mb-6">
                RKM provides 24/7 emergency response and expert plumbing across our entire expanded network of {sortedTowns.length} towns and villages.
                Select your area below to see local services and response times.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search town, village, or postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A6892C] focus:border-transparent transition-all shadow-sm text-sm"
                />
              </div>
            </div>

            {/* Location Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTowns.map((item) => (
                <div
                  key={item.slug}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#A6892C] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#A6892C]" />
                      <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight group-hover:text-[#A6892C] transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    {item.postcode && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {item.postcode}
                      </span>
                    )}
                  </div>

                  <nav className="flex flex-col space-y-1.5">
                    <Link
                      to={`/local-plumber/${item.slug}/`}
                      className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      Local Plumber <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to={`/emergency-plumber/${item.slug}/`}
                      className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      Emergency 24/7 <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to={`/heating-engineer/${item.slug}/`}
                      className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      Heating Expert <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to={`/drain-unblocking/${item.slug}/`}
                      className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      Drainage <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to={`/leak-detection/${item.slug}/`}
                      className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      Leak Detection <ChevronRight className="w-3 h-3" />
                    </Link>
                  </nav>
                </div>
              ))}
            </div>

            {filteredTowns.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <p className="text-lg font-bold text-slate-700 mb-2">No matching areas found for "{searchQuery}"</p>
                <p className="text-sm text-slate-500 mb-6">We provide 24/7 dispatch coverage across the entire region even if not listed.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-black uppercase text-[#A6892C] hover:underline"
                >
                  Clear search query
                </button>
              </div>
            )}

            {/* Bottom Call-to-Action */}
            <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-black uppercase mb-4">Don't see your area listed?</h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">We provide full dynamic response assets across our entire regional plumbing grid map.</p>
                <a href="tel:01530654062" className="inline-block bg-[#A6892C] text-slate-900 font-black px-10 py-4 rounded-xl hover:bg-white transition-colors">
                  Call 01530 654 062
                </a>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#A6892C] opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Locations;