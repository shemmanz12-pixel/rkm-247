import React, { useState, useEffect } from 'react';
import { Phone, Calendar } from 'lucide-react';

const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling down 100px
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="flex gap-3">
        
        {/* BOOK BUTTON - NOW ON THE LEFT */}
        <a 
          href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-slate-900 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm"
        >
          <Calendar className="w-5 h-5" />
          <span>BOOK ONLINE</span>
        </a>

        {/* CALL BUTTON - NOW ON THE RIGHT */}
        <a 
          href="tel:01530654062" 
          className="flex-1 bg-[#A6892C] text-slate-900 font-black py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg animate-pulse"
        >
          <Phone className="w-5 h-5" />
          <span>CALL NOW</span>
        </a>

      </div>
    </div>
  );
};

export default StickyFooter;