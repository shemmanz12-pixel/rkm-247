import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, ChevronRight } from 'lucide-react';

// Import the unified towns object
import { towns } from '../townConfig'; 

const Locations = () => {
  // Sort towns alphabetically by name for better user experience
  const sortedTowns = Object.entries(towns).sort((a, b) => 
    a[1].name.localeCompare(b[1].name)
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Helmet>
        <title>All Service Locations | RKM Plumbing & Heating</title>
        <meta name="description" content="Find your local RKM Plumbing & Heating engineer. We cover Coalville, Ashby-de-la-Zouch, and all surrounding areas in North West Leicestershire with a 60-minute response." />
        <link rel="canonical" href="https://rkm247.co.uk/locations/" />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="mb-12 border-l-4 border-[#A6892C] pl-6">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                Areas <span className="text-[#A6892C]">We Cover</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                RKM provides 24/7 emergency response and expert plumbing across 40+ locations. 
                Select your area below to see local services and response times.
              </p>
            </div>

            {/* Responsive Grid for 40+ Towns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedTowns.map(([slug, data]) => (
                <div 
                  key={slug} 
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#A6892C] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-[#A6892C]" />
                    <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight group-hover:text-[#A6892C] transition-colors">
                      {data.name}
                    </h3>
                  </div>
                  
                  <nav className="flex flex-col space-y-1.5">
                    {/* Link paths updated to ensure consistency with SSG structure */}
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

            {/* Bottom Call-to-Action */}
            <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-3xl font-black uppercase mb-4">Don't see your area listed?</h2>
                 <p className="text-slate-400 mb-8 max-w-xl mx-auto">We cover a 20-mile radius around Coalville, including all LE67, LE65, DE11, and DE12 postcodes.</p>
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