import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react'; // Added Calendar icon

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 1. Handle Scroll (Change header style on scroll)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Close menu automatically when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // 3. CORRECTED NAVIGATION LINKS
  // Updated to point to your new dedicated SEO pages
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Areas', path: '/areas' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/logo-square.webp" 
              alt="RKM Logo" 
              className="w-12 h-12 object-contain" 
            />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 leading-none tracking-tight">
                RKM<span className="text-[#A6892C]">24/7</span>
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-0.5">
                Plumbing & Heating Services
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  location.pathname === link.path ? 'text-[#A6892C]' : 'text-slate-900 hover:text-[#A6892C]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* ADDED: BOOK ONLINE BUTTON (Matches your design) */}
            <a 
              href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
              target="_blank"
              rel="noreferrer"
              className="bg-slate-100 text-slate-900 px-4 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online</span>
            </a>

            <a 
              href="tel:01530654062" 
              className="bg-[#A6892C] hover:bg-[#c4a030] text-slate-900 px-6 py-3 rounded-lg font-black flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>01530 654 062</span>
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="lg:hidden text-slate-900 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-xl font-bold py-3 border-b border-gray-100 ${
                  location.pathname === link.path ? 'text-[#A6892C]' : 'text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <a 
               href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
               target="_blank"
               rel="noreferrer"
               className="mt-2 bg-slate-100 text-slate-900 text-center py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
             >
               <Calendar className="w-5 h-5" />
               Book Online
             </a>

            <a 
              href="tel:01530654062" 
              className="bg-[#A6892C] text-slate-900 text-center py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call 01530 654 062
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;