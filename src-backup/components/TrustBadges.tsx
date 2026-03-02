import React from 'react';
// Removed Star import as it is no longer needed

const TrustBadges = () => {
  return (
    <section className="py-10 bg-slate-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Increased gap for better spacing with larger logos */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-90 grayscale hover:grayscale-0 transition-all duration-300">
          
          {/* 1. GOOGLE REVIEWS (Logo Only) */}
          <div className="flex items-center gap-3">
            <img 
              src="/google-logo.webp" 
              alt="Google Reviews" 
              className="h-10 w-auto object-contain" 
              onError={(e) => e.currentTarget.style.display = 'none'} 
            />
          </div>

          {/* 2. YELL.COM */}
          <div className="flex items-center gap-2">
            <img 
              src="/yell.com.webp" 
              alt="Yell.com Reviews" 
              className="h-14 w-auto object-contain" 
            />
          </div>

          {/* 3. CHECKATRADE */}
          <div className="flex items-center gap-2">
            <img 
              src="/checkatrade.webp" 
              alt="Checkatrade Vetted" 
              className="h-16 w-auto object-contain" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBadges;