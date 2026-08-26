import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, ChevronRight, Search } from 'lucide-react';

// Import the unified towns object
import { towns } from '../townConfig'; 

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Directly sort and process towns from your master object config
  const sortedTowns = useMemo(() => {
    return Object.entries(towns).sort((a, b) => 
      a[1].name.localeCompare(b[1].name)
    );
  }, []);

  // Filtered list based on search input
  const filteredTowns = useMemo(() => {
    if (!searchQuery.trim()) return sortedTowns;
    const query = searchQuery.toLowerCase().trim();
    return sortedTowns.filter(([slug, data]) => 
      data.name.toLowerCase().includes(query) ||
      slug.toLowerCase().includes(query) ||
      data.postcodes.some(pc => pc.toLowerCase().includes(query))
    );
  }, [sortedTowns, searchQuery]);

  // Dynamic Schema.org ItemList for Google Bot indexing
  const schemaItemList = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "RKM Plumbing & Heating Service Coverage Areas",
      "description": "Comprehensive directory of 24/7 emergency plumbing, heating, and drainage service areas across Leicestershire, Derbyshire, and Warwickshire.",
      "numberOfItems": sortedTowns.length,
      "itemListElement": sortedTowns.map(([slug, data], index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": data.name,
        "url": `https://rkm247.co.uk/local-plumber/${slug}/`
      }))
    };
  }, [sortedTowns]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Helmet>
        <title>All Service Locations | RKM Plumbing & Heating</title>
        <meta name="description" content="Find your local RKM Plumbing & Heating engineer. We cover Leicestershire, Derbyshire, and Warwickshire with a 24/7 rapid emergency response." />
        <link rel="canonical" href="https://rkm247.co.uk/locations/" />
        <script type="application/ld+json">
          {JSON.stringify(schemaItemList)}
        </script>
      </Helmet>

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

              {/* Live Search Bar */}
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

            {/* Responsive Grid for All Towns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTowns.map(([slug, data]) => (
                <div 
                  key={slug} 
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#A6892C] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#A6892C]" />
                      <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight group-hover:text-[#A6892C] transition-colors">
                        {data.name}
                      </h3>
                    </div>
                    {data.postcodes[0] && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {data.postcodes[0]}
                      </span>
                    )}
                  </div>
                  
                  <nav className="flex flex-col space-y-1.5">
                    <Link to={`/local-plumber/${slug}/`} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all">
                      Local Plumber <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link to={`/emergency-plumber/${slug}/`} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all">
                      Emergency 24/7 <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link to={`/heating-engineer/${slug}/`} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all">
                      Heating Expert <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link to={`/drain-unblocking/${slug}/`} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all">
                      Drainage <ChevronRight className="w-3 h-3" />
                    </Link>
                    <Link to={`/leak-detection/${slug}/`} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#A6892C] p-2 rounded-lg hover:bg-slate-50 transition-all">
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