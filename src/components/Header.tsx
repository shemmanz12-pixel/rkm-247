import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';

interface HeaderProps {
  customPhone?: string;
}

const Header = ({ customPhone = "01530 654 062" }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Areas', path: '/#areas-covered' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'About', path: '/#about' },
    { name: 'FAQ', path: '/#faq' },
  ];

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
                Plumbing Heating & Drainage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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

          {/* Mobile Right Controls: Compact Header Call + Burger Menu */}
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
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-lg font-bold py-2.5 border-b border-gray-100 ${
                  location.pathname === link.path ? 'text-[#A6892C]' : 'text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
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

              {/* Large, Unsquashed Mobile Call Button with Number Display */}
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