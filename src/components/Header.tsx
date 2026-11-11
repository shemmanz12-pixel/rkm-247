import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, ChevronDown, MapPin, Tag } from 'lucide-react';
import { towns } from '../townConfig';

interface HeaderProps {
  customPhone?: string;
}

// 1. High-value areas list
const FEATURED_AREAS = [
  { name: 'Coalville', slug: 'coalville' },
  { name: 'Ashby de la Zouch', slug: 'ashby-de-la-zouch' },
  { name: 'Loughborough', slug: 'loughborough' },
  { name: 'Market Bosworth', slug: 'market-bosworth' },
  { name: 'Melbourne', slug: 'melbourne' },
  { name: 'Castle Donington', slug: 'castle-donington' },
  { name: 'Repton', slug: 'repton' },
  { name: 'Rothley', slug: 'rothley' },
  { name: 'Quorn', slug: 'quorn' },
  { name: 'Woodhouse Eaves', slug: 'woodhouse-eaves' },
  { name: 'Kirby Muxloe', slug: 'kirby-muxloe' },
  { name: 'Swadlincote', slug: 'swadlincote' },
  { name: 'Ibstock', slug: 'ibstock' },
  { name: 'Whitwick', slug: 'whitwick' }
];

// 2. Services list
const CORE_SERVICES = [
  { id: 'emergency-plumber', name: 'Emergency Plumbing', hasPage: true },
  { id: 'heating-engineer', name: 'Heating & Boiler Installs', hasPage: true },
  { id: 'drain-unblocking', name: 'Drain Unblocking & Jetting', hasPage: true },
  { id: 'local-plumber', name: 'General Plumbing Repairs', hasPage: true },
  { id: 'leak-detection', name: 'Leak Detection (Trace & Access)', hasPage: true },
  { id: 'plumbing-installations', name: 'New Installations & Upgrades', hasPage: true },
  { id: 'boiler-finance', name: 'Boiler Finance (Spread the Cost)', hasPage: false, hashTarget: '#offers' },
  { id: 'radiator-power-flushing', name: 'Radiator Power Flushing', hasPage: false, hashTarget: '#services' },
  { id: 'cctv-drain-surveys', name: 'CCTV Drain Surveys', hasPage: false, hashTarget: '#services' },
  { id: 'bathroom-plumbing', name: 'Bathroom & Kitchen Plumbing', hasPage: false, hashTarget: '#services' },
  { id: 'gas-safety-certs', name: 'Landlord Gas Safety (CP12)', hasPage: false, hashTarget: '#services' }
];

const Header = ({ customPhone = "01530 654 062" }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Dropdown states
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  // Mobile drawer accordions
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setAreasOpen(false);
    setMobileServicesOpen(false);
    setMobileAreasOpen(false);
  }, [location.pathname]);

  // Click outside listener for desktop popovers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (areasRef.current && !areasRef.current.contains(e.target as Node)) {
        setAreasOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect active town slug from URL
  const currentTownSlug = (() => {
    const lower = location.pathname.toLowerCase();
    const segments = lower.split('/').filter(Boolean);

    for (const segment of segments) {
      const cleanSlug = segment
        .replace(/^(plumber|emergency-plumber|heating|boiler)-in-/, '')
        .replace(/^(plumbers?|heating|boilers?)-/, '');

      if ((towns as any)?.[cleanSlug]) {
        return cleanSlug;
      }
    }

    for (const slug of Object.keys(towns)) {
      if (lower.includes(`/${slug}`) || lower.endsWith(slug)) {
        return slug;
      }
    }

    return 'coalville';
  })();

  // Dynamically resolve the base page URL the customer is currently looking at
  const getBasePath = () => {
    const cleanPath = location.pathname.replace(/\/+$/, '');
    return cleanPath || '';
  };

  // Build anchor targets preserving current page location
  const getAnchorTarget = (hash: string) => {
    const cleanHash = hash.startsWith('#') ? hash : `#${hash}`;
    const basePath = getBasePath();
    return `${basePath}/${cleanHash}`;
  };

  // Smooth scroll handler on the current landing page
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    const cleanId = hash.replace('#', '');
    const element = document.getElementById(cleanId);

    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setServicesOpen(false);
      setAreasOpen(false);
      setIsOpen(false);
      window.history.pushState(null, '', `${location.pathname}#${cleanId}`);
    } else {
      setServicesOpen(false);
      setAreasOpen(false);
      setIsOpen(false);
    }
  };

  const rawPhone = customPhone.replace(/\s+/g, '');

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2.5 sm:py-3' : 'bg-white py-3.5 sm:py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img 
              src="/logo-square.webp" 
              alt="RKM Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none tracking-tight">
                RKM<span className="text-[#A6892C]">24/7</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-0.5">
                Plumbing Heating &amp; Drainage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            <Link 
              to="/" 
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                location.pathname === '/' ? 'text-[#A6892C]' : 'text-slate-900 hover:text-[#A6892C]'
              }`}
            >
              Home
            </Link>

            {/* 1. SERVICES DROPDOWN */}
            <div 
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1 py-2 ${
                  servicesOpen ? 'text-[#A6892C]' : 'text-slate-900 hover:text-[#A6892C]'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-[#A6892C]' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-2.5 py-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-3 py-1 mb-1 border-b border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Our Core Services
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {CORE_SERVICES.map((svc) => {
                      const destination = svc.hasPage 
                        ? `/${svc.id}/${currentTownSlug}/` 
                        : getAnchorTarget(svc.hashTarget || '#services');

                      return (
                        <Link
                          key={svc.id}
                          to={destination}
                          onClick={(e) => {
                            if (!svc.hasPage) {
                              handleAnchorClick(e, svc.hashTarget || '#services');
                            }
                          }}
                          className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#A6892C] transition-colors"
                        >
                          {svc.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. AREAS DROPDOWN */}
            <div 
              ref={areasRef}
              className="relative"
              onMouseEnter={() => setAreasOpen(true)}
              onMouseLeave={() => setAreasOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAreasOpen(!areasOpen)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1 py-2 ${
                  areasOpen ? 'text-[#A6892C]' : 'text-slate-900 hover:text-[#A6892C]'
                }`}
              >
                <span>Areas</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${areasOpen ? 'rotate-180 text-[#A6892C]' : ''}`} />
              </button>

              {areasOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-2.5 py-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-3 py-1 mb-1 border-b border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Locations We Cover
                    </span>
                  </div>

                  <div className="max-h-[380px] overflow-y-auto space-y-0.5 pr-1">
                    {FEATURED_AREAS.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/${item.slug}/`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors group ${
                          currentTownSlug === item.slug 
                            ? 'bg-slate-100 text-[#A6892C]' 
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#A6892C]'
                        }`}
                      >
                        <MapPin className={`w-3.5 h-3.5 ${currentTownSlug === item.slug ? 'text-[#A6892C]' : 'text-slate-400 group-hover:text-[#A6892C]'}`} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 px-2">
                    <Link
                      to="/locations"
                      className="block text-center text-[11px] font-black text-[#A6892C] hover:underline py-1"
                    >
                      View All 220 Locations →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. REVIEWS */}
            <Link 
              to={getAnchorTarget('#reviews')}
              onClick={(e) => handleAnchorClick(e, '#reviews')}
              className="text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-[#A6892C] transition-colors"
            >
              Reviews
            </Link>

            {/* 4. OFFERS */}
            <Link 
              to={getAnchorTarget('#offers')} 
              onClick={(e) => handleAnchorClick(e, '#offers')}
              className="text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-[#A6892C] transition-colors flex items-center gap-1.5"
            >
              <Tag className="w-3.5 h-3.5 text-[#A6892C]" />
              <span>Offers</span>
            </Link>

            {/* 5. ABOUT */}
            <Link 
              to={getAnchorTarget('#about')} 
              onClick={(e) => handleAnchorClick(e, '#about')}
              className="text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-[#A6892C] transition-colors"
            >
              About
            </Link>

            {/* 6. FAQ */}
            <Link 
              to={getAnchorTarget('#faq')} 
              onClick={(e) => handleAnchorClick(e, '#faq')}
              className="text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-[#A6892C] transition-colors"
            >
              FAQ
            </Link>
            
            <a 
              href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
              target="_blank"
              rel="noreferrer"
              className="bg-slate-100 text-slate-900 px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online</span>
            </a>

            <a 
              href={`tel:${rawPhone}`} 
              className="bg-[#A6892C] hover:bg-[#c4a030] text-slate-900 px-5 py-2.5 rounded-lg font-black flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-md whitespace-nowrap"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>{customPhone}</span>
            </a>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a 
              href={`tel:${rawPhone}`}
              aria-label={`Call ${customPhone}`}
              className="bg-[#A6892C] text-slate-900 font-black p-2.5 rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-all text-xs"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span className="font-extrabold hidden xs:inline">CALL</span>
            </a>

            <button 
              className="text-slate-900 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col p-5 gap-3">
            <Link to="/" className="text-lg font-bold py-2 border-b border-gray-100 text-slate-900">
              Home
            </Link>
            
            {/* Mobile Services Accordion */}
            <div className="border-b border-gray-100 pb-2">
              <button 
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between text-lg font-bold py-2 text-slate-900"
              >
                <span>Services</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#A6892C]' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="bg-slate-50 rounded-xl p-3 mt-1 flex flex-col gap-1 max-h-60 overflow-y-auto">
                  {CORE_SERVICES.map((svc) => {
                    const destination = svc.hasPage 
                      ? `/${svc.id}/${currentTownSlug}/` 
                      : getAnchorTarget(svc.hashTarget || '#services');

                    return (
                      <Link
                        key={svc.id}
                        to={destination}
                        onClick={(e) => {
                          if (!svc.hasPage) {
                            handleAnchorClick(e, svc.hashTarget || '#services');
                          }
                        }}
                        className="text-xs font-bold text-slate-700 py-1.5 px-2 rounded hover:bg-white hover:text-[#A6892C]"
                      >
                        {svc.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Areas Accordion */}
            <div className="border-b border-gray-100 pb-2">
              <button 
                onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                className="w-full flex items-center justify-between text-lg font-bold py-2 text-slate-900"
              >
                <span>Areas</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileAreasOpen ? 'rotate-180 text-[#A6892C]' : ''}`} />
              </button>

              {mobileAreasOpen && (
                <div className="bg-slate-50 rounded-xl p-3 mt-1 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {FEATURED_AREAS.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/${item.slug}/`}
                      className={`text-xs font-bold py-1.5 px-2 rounded hover:bg-white hover:text-[#A6892C] ${
                        currentTownSlug === item.slug ? 'text-[#A6892C] font-black' : 'text-slate-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-200 text-center">
                    <Link to="/locations" className="text-xs font-black text-[#A6892C]">
                      View All 220 Locations →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to={getAnchorTarget('#reviews')} 
              onClick={(e) => handleAnchorClick(e, '#reviews')}
              className="text-lg font-bold py-2 border-b border-gray-100 text-slate-900"
            >
              Reviews
            </Link>

            <Link 
              to={getAnchorTarget('#offers')} 
              onClick={(e) => handleAnchorClick(e, '#offers')}
              className="text-lg font-bold py-2 border-b border-gray-100 text-[#A6892C] flex items-center gap-2"
            >
              <Tag className="w-5 h-5" />
              <span>Offers &amp; Discounts</span>
            </Link>

            <Link 
              to={getAnchorTarget('#about')} 
              onClick={(e) => handleAnchorClick(e, '#about')}
              className="text-lg font-bold py-2 border-b border-gray-100 text-slate-900"
            >
              About
            </Link>

            <Link 
              to={getAnchorTarget('#faq')} 
              onClick={(e) => handleAnchorClick(e, '#faq')}
              className="text-lg font-bold py-2 border-b border-gray-100 text-slate-900"
            >
              FAQ
            </Link>
            
            <div className="pt-2 flex flex-col gap-2.5">
              <a 
                href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
                target="_blank"
                rel="noreferrer"
                className="bg-slate-100 active:bg-slate-200 text-slate-900 py-3.5 px-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 shrink-0" />
                <span>Book Appointment Online</span>
              </a>

              <a 
                href={`tel:${rawPhone}`} 
                className="bg-[#A6892C] active:bg-[#927725] text-slate-900 py-3.5 px-4 rounded-xl font-black text-base flex items-center justify-center gap-2.5 shadow-md"
              >
                <div className="bg-slate-900/10 p-1.5 rounded-full shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold opacity-80">Tap to Call 24/7</span>
                  <span className="text-base sm:text-lg font-black tracking-tight">{customPhone}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;