import React from 'react';
import { useParams } from 'react-router-dom';

const MapSection = () => {
  // We still capture the town name for the text above the map
  const { town } = useParams<{ town: string }>();
  
  // Format the town name nicely (e.g. "Ashby De La Zouch")
  const formatTown = (slug: string | undefined) => {
    if (!slug) return 'Coalville';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const locationName = formatTown(town);

  return (
    <section id="map" className="py-20 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* HEADER TEXT */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 uppercase mb-4">
            Local Engineers in <span className="text-[#A6892C]">{locationName}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team is currently active in <strong>{locationName}</strong> and the surrounding villages. 
            We aim to be with you in under 60 minutes.
          </p>
        </div>

        {/* MAP CONTAINER */}
        <div className="w-full h-[450px] bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white relative z-10">
          
          {/* YOUR MY MAP CODE EMBEDDED HERE */}
          <iframe 
            src="https://share.google/vCD4kQc8elUleD1EE" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="RKM Plumbing Service Area Map"
          ></iframe>

        </div>

        {/* FOOTER NOTE */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Note: We cover a 15-mile radius around {locationName}. If you are unsure if we cover your postcode, please call us.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MapSection;