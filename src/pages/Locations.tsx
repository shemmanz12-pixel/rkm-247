// React import not required with the new jsx transform when not referencing React directly
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 1. FIXED: Import 'towns' instead of 'locations'
import { towns } from '../townConfig'; 

const Locations = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>All Service Locations | RKM Plumbing & Heating</title>
        <meta name="description" content="Find your local RKM Plumbing & Heating engineer. We cover Coalville, Ashby-de-la-Zouch, and all surrounding areas in North West Leicestershire." />
        <link rel="canonical" href="https://rkm247.co.uk/locations/" />
      </Helmet>
      <Header />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 uppercase">
              Areas We Cover
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Select a specialized service in your local area for immediate assistance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 2. FIXED: Use Object.entries because 'towns' is an object, not an array */}
              {Object.entries(towns).map(([slug, data]) => (
                <div 
                  key={slug} 
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-extrabold text-xl text-slate-900 mb-4 border-b pb-2">
                    {data.name}
                  </h3>
                  
                  <div className="flex flex-col space-y-2">
                    <Link to={`/local-plumber/${slug}`} className="text-sm font-bold text-[#A6892C] hover:underline">
                      → Local Plumber
                    </Link>
                    <Link to={`/emergency-plumber/${slug}`} className="text-sm font-semibold text-slate-700 hover:text-[#A6892C] hover:underline">
                      → 24/7 Emergency Plumber
                    </Link>
                    <Link to={`/heating-engineer/${slug}`} className="text-sm font-semibold text-slate-700 hover:text-[#A6892C] hover:underline">
                      → Heating Engineer
                    </Link>
                    <Link to={`/drain-unblocking/${slug}`} className="text-sm font-semibold text-slate-700 hover:text-[#A6892C] hover:underline">
                      → Drain Unblocking
                    </Link>
                    <Link to={`/leak-detection/${slug}`} className="text-sm font-semibold text-slate-700 hover:text-[#A6892C] hover:underline">
                      → Leak Detection
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Locations;