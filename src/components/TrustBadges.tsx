import { useLocation } from 'react-router-dom';
import { Star, ShieldCheck, CheckCircle2, BadgePercent } from 'lucide-react';
import { towns } from '@/townConfig'; // Adjust relative import path (e.g. '../townConfig') if needed

interface TrustBadgesProps {
  location?: string;
  service?: string;
}

const TrustBadges = ({ location: explicitLocation, service: explicitService }: TrustBadgesProps) => {
  const { pathname } = useLocation();

  const lowerPath = pathname.toLowerCase();
  const segments = lowerPath.split('/').filter(Boolean);
  const isHomepage = segments.length === 0 || pathname === '/';
  const townsMap = towns as Record<string, any>;

  // 1. Resolve Town Name
  const detectedLocation = (() => {
    if (explicitLocation) return explicitLocation;

    for (const segment of segments) {
      const cleanSlug = segment
        .replace(/^(plumber|emergency-plumber|heating|boiler)-in-/, '')
        .replace(/^(plumbers?|heating|boilers?)-/, '');

      if (townsMap[cleanSlug]) {
        return townsMap[cleanSlug].name;
      }
    }

    for (const slug of Object.keys(townsMap)) {
      if (lowerPath.includes(`/${slug}`) || lowerPath.endsWith(slug)) {
        return townsMap[slug]?.name;
      }
    }

    return townsMap['coalville']?.name || 'Coalville';
  })();

  // 2. Resolve Active Service from URL or Props
  const detectedService = (() => {
    if (explicitService) return explicitService.toLowerCase();

    if (lowerPath.includes('drain') || lowerPath.includes('cctv') || lowerPath.includes('unblock')) {
      return 'drainage';
    }
    if (lowerPath.includes('emergency')) {
      return 'emergency';
    }
    if (lowerPath.includes('heating') || lowerPath.includes('boiler') || lowerPath.includes('gas')) {
      return 'heating';
    }
    if (lowerPath.includes('leak') || lowerPath.includes('detection')) {
      return 'leak';
    }
    if (lowerPath.includes('plumb')) {
      return 'plumbing';
    }

    return '';
  })();

  // 3. Dynamic Title & Subtitle Mapping (Location explicitly broken onto a new line)
  const headerContent = (() => {
    if (isHomepage) {
      return {
        pill: "Gas Safe Registered #987039 · 24/7 Response",
        title: (
          <>
            Trusted Plumbing, Heating &amp; Drainage in
            <span className="block text-[#A6892C] mt-1 sm:mt-1.5">{detectedLocation}</span>
          </>
        ),
        desc: `Accredited local tradespeople providing 5-star customer repairs, certified boiler installs, unblocking & rapid emergency callouts across ${detectedLocation}.`
      };
    }

    if (detectedService === 'drainage') {
      return {
        pill: "High-Pressure Jetting & CCTV Surveys · £0 Call Out",
        title: (
          <>
            Emergency Drain Unblocking &amp; Sewer Clearance in
            <span className="block text-[#A6892C] mt-1 sm:mt-1.5">{detectedLocation}</span>
          </>
        ),
        desc: `Fast-response drainage engineers equipped with high-pressure water jetting and full CCTV camera diagnostics across ${detectedLocation}.`
      };
    }

    if (detectedService === 'emergency') {
      return {
        pill: "24/7 Rapid Emergency Response · Within 60 Mins",
        title: (
          <>
            24/7 Emergency Plumbers in
            <span className="block text-[#A6892C] mt-1 sm:mt-1.5">{detectedLocation}</span>
          </>
        ),
        desc: `Immediate emergency response for burst pipes, active flooding, uncontrollable leaks, and urgent repairs across ${detectedLocation}.`
      };
    }

    if (detectedService === 'heating') {
      return {
        pill: "Gas Safe Registered #987039 · Flexible Finance",
        title: (
          <>
            Gas Safe Boiler Installations &amp; Heating in
            <span className="block text-[#A6892C] mt-1 sm:mt-1.5">{detectedLocation}</span>
          </>
        ),
        desc: `Accredited gas engineers providing diagnostics, annual servicing, combi replacements, and low monthly finance plans across ${detectedLocation}.`
      };
    }

    if (detectedService === 'leak') {
      return {
        pill: "Trace & Access Tech · Non-Destructive",
        title: (
          <>
            Water Leak Detection &amp; Pipe Repairs in
            <span className="block text-[#A6892C] mt-1 sm:mt-1.5">{detectedLocation}</span>
          </>
        ),
        desc: `Advanced acoustic and thermal imaging equipment to pinpoint hidden subfloor and wall leaks without unnecessary damage in ${detectedLocation}.`
      };
    }

    // Default Town Landing Page (e.g. /market-bosworth/)
    return {
      pill: "Gas Safe Registered #987039 · £0 Call Out Charge",
      title: (
        <>
          Local Plumbing, Heating &amp; Drainage in
          <span className="block text-[#A6892C] mt-1 sm:mt-1.5">{detectedLocation}</span>
        </>
      ),
      desc: `Fully accredited local engineers providing emergency repairs, boiler maintenance, and drain unblocking across ${detectedLocation} and surrounding areas.`
    };
  })();

  const handleScrollToOffers = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('offers');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `${pathname}#offers`);
    }
  };

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-slate-50 border-y border-slate-200/80 relative z-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* TRUST BANNER HEADER */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-[#A6892C] bg-[#A6892C]/10 px-3.5 py-1.5 rounded-full border border-[#A6892C]/25 shadow-sm mb-2.5 sm:mb-3">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A6892C] shrink-0" />
            <span>{headerContent.pill}</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight px-2 max-w-4xl mx-auto uppercase">
            {headerContent.title}
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 max-w-2xl mx-auto px-4">
            {headerContent.desc}
          </p>
        </div>

        {/* 4 COMPACT & BALANCED TRUST TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-6 items-stretch">
          
          {/* 1. GAS SAFE REGISTER */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
            <div className="h-14 sm:h-20 flex items-center justify-center mb-2 sm:mb-3">
              <img 
                src="/gas safe register.webp" 
                alt={`Gas Safe Registered Business RKM Plumbing ${detectedLocation}`} 
                className="max-h-14 sm:max-h-20 w-auto max-w-[170px] scale-110 object-contain group-hover:scale-115 transition-transform duration-200" 
              />
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
              <div className="inline-flex items-center gap-1 text-[#A6892C] font-black text-[10px] sm:text-xs uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A6892C] shrink-0" />
                <span>Reg: 987039</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Gas Safe Registered
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Legally registered &amp; certified for gas boiler installations &amp; repairs.
              </p>
            </div>
          </div>

          {/* 2. GOOGLE REVIEWS */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
            <div className="h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-5">
              <img 
                src="/google-logo.webp" 
                alt={`Google Verified Reviews RKM Plumbing ${detectedLocation}`} 
                className="max-h-10 sm:max-h-14 w-auto max-w-[150px] object-contain group-hover:scale-105 transition-transform duration-200" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Google Verified Reviews
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                5.0-star customer satisfaction for repairs &amp; 24/7 callouts.
              </p>
            </div>
          </div>

          {/* 3. CHECKATRADE */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
            <div className="h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-5">
              <img 
                src="/checkatrade.webp" 
                alt={`Checkatrade Vetted Tradesperson RKM Plumbing ${detectedLocation}`} 
                className="max-h-11 sm:max-h-14 w-auto max-w-[150px] object-contain group-hover:scale-105 transition-transform duration-200" 
              />
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
              <div className="inline-flex items-center gap-1 text-[#A6892C] font-black text-[10px] sm:text-xs uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A6892C] shrink-0" />
                <span>Background Checked</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Checkatrade Approved
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Fully vetted, insured, and verified trade compliance.
              </p>
            </div>
          </div>

          {/* 4. BOILER FINANCE */}
          <a 
            href="#offers"
            onClick={handleScrollToOffers}
            className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer block"
          >
            <div className="h-14 sm:h-20 flex items-center justify-center mb-2 sm:mb-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#A6892C]/10 border border-[#A6892C]/20 flex items-center justify-center text-[#A6892C] group-hover:scale-105 transition-transform duration-200">
                <BadgePercent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              </div>
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
              <div className="inline-flex items-center gap-1 text-[#A6892C] font-black text-[10px] sm:text-xs uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A6892C] shrink-0" />
                <span>Spread The Cost</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Boiler Finance Options
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Flexible monthly payment plans on new boiler installations. Subject to status.
              </p>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};

export default TrustBadges;