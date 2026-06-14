import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { towns } from '../townConfig'; // Check this path matches your setup

const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Bring in both params (if it's inside the route) and location (if it's outside the route)
  const params = useParams();
  const location = useLocation();

  // Break down the URL to find the town name (e.g., "/local-plumber/alvaston/" becomes "alvaston")
  const pathParts = location.pathname.split('/').filter(Boolean);
  const slugFromPath = pathParts[pathParts.length - 1]; 

  // Try to get the town name from params first, if not, grab it directly from the URL path
  const activeSlug = params.townSlug || params.town || slugFromPath || '';

  // Clean it up to match the keys in your townConfig.ts
  const normalize = (value: string) => value.toLowerCase().replace('.html', '').trim();
  const cleanTownKey = normalize(activeSlug);
  
  // Look up the phone number, fallback to Coalville if not found
  const customPhone = towns[cleanTownKey]?.phone || "01530 654 062";

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] z-[100] transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full' 
      }`}
    >
      <div className="flex gap-3 max-w-4xl mx-auto">
        
        {/* BOOK BUTTON */}
        <a 
          href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-slate-900 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-slate-800 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-sm sm:text-base">BOOK ONLINE</span>
        </a>

        {/* CALL BUTTON - NOW PULLING DIRECTLY FROM URL LOCATION */}
        <a 
          href={`tel:${customPhone.replace(/\s+/g, '')}`} 
          className="flex-1 bg-[#A6892C] text-slate-900 font-black py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg animate-pulse hover:bg-[#b5952f] transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm sm:text-base">CALL {customPhone}</span>
        </a>

      </div>
    </div>
  );
};

export default StickyFooter;