import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { towns } from '../townConfig'; 

const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const params = useParams();
  const location = useLocation();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const slugFromPath = pathParts[pathParts.length - 1]; 
  const activeSlug = params.townSlug || params.town || slugFromPath || '';

  const normalize = (value: string) => value.toLowerCase().replace('.html', '').trim();
  const cleanTownKey = normalize(activeSlug);
  const customPhone = towns[cleanTownKey]?.phone || "01530 654 062";

  useEffect(() => {
    // 1. SSG Safety Check: Only run this if we are actually in a web browser
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };
    
    // Initial check on load
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
        <a 
          href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-slate-900 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-slate-800 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-sm sm:text-base">BOOK ONLINE</span>
        </a>

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