import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

// 1. IMPORT THE REAL DATA (Keep this)
import { locations } from '../data/locations'; 

// (Note: I have deleted the "const locations = [...]" block here because it caused the duplicate error)

const Locations = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>Areas We Cover | RKM Plumbing Coalville</title>
        <meta
          name="description"
          content="Find local plumbers, heating engineers, and drain specialists across Leicestershire. We cover Coalville, Ashby, and all surrounding villages."
        />
        <link rel="canonical" href="https://rkm247.co.uk/locations" />
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

            {/* Now this uses the imported list from your data file */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((loc) => (
                <div 
                  key={loc.slug} 
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-extrabold text-xl text-slate-900 mb-4 border-b pb-2">
                    {loc.name}
                  </h3>
                  
                  <div className="flex flex-col space-y-2">
                    <Link
                      to={`/local-plumber/${loc.slug}`}
                      className="text-sm font-bold text-[#A6892C] hover:underline"
                    >
                      → Local Plumber
                    </Link>

                    <Link
                      to={`/emergency-plumber/${loc.slug}`}
                      className="text-sm font-semibold text-slate-700 hover:text-[#A6892C] hover:underline"
                    >
                      → 24/7 Emergency Plumber
                    </Link>

                    <Link
                      to={`/heating-engineer/${loc.slug}`}
                      className="text-sm font-semibold text-slate-700 hover:text-[#A6892C] hover:underline"
                    >
                      → Heating Engineer
                    </Link>

                    <Link
                      to={`/drain-unblocking/${loc.slug}`}
                      className="text-sm font-semibold text-slate-700 hover:text-[#A6892C] hover:underline"
                    >
                      → Drain Unblocking
                    </Link>

                    <Link
                      to={`/leak-detection/${loc.slug}`}
                      className="text-sm font-semibold text-slate-700 hover:text-[#A6892C] hover:underline"
                    >
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