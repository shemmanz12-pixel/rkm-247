import { useLocation, useParams, Link } from 'react-router-dom';
import { Phone, MapPin, Shield, CheckCircle, Percent, GraduationCap } from 'lucide-react';
import { towns } from '../townConfig';

interface FooterProps {
  customPhone?: string;
  townName?: string;
  postcodeLabel?: string;
  roadName?: string;
  serviceName?: string;
}

const Footer = ({
  customPhone,
  townName,
  postcodeLabel,
  roadName,
  serviceName
}: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const params = useParams<{ service?: string; town?: string; slug?: string }>();

  // 1. DYNAMIC LOCATION & SERVICE DETECTION
  const pathSegments = (location?.pathname || '').split('/').filter(Boolean);
  const detectedService = serviceName || params.service || (pathSegments.length > 1 ? pathSegments[0] : '');
  const detectedTownSlug = (townName || params.town || params.slug || (pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : '')).toLowerCase().replace(/ /g, '-');

  const townData = (towns as any)?.[detectedTownSlug] || {};

  const formatName = (slug?: string) => 
    slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';

  const activeTown = townData.name || formatName(detectedTownSlug) || 'Coalville';
  const activePhone = customPhone || townData.phone || '01530 654 062';
  const activeRoad = roadName || townData.road || '12 Primrose Walk';
  const activePostcode = postcodeLabel || townData.postcode || 'LE67 2PA';
  const serviceKey = (detectedService || '').toLowerCase();

  // 2. DYNAMIC SEO CONTENT PER SERVICE / LANDING PAGE
  let seoData = {
    brandTitle: "RKM Plumbing Heating & Drainage",
    desc: `RKM provides expert domestic plumbing, boiler maintenance, drain clearance, and rapid 24/7 emergency response across ${activeTown} and North West Leicestershire. We offer fast 60-minute dispatch with £0 call-out fees.`,
    trustSignal3Title: "Heating & Gas Experts",
    trustSignal3Desc: `Qualified local engineers for boiler repairs, radiator replacements, and central heating diagnostics in ${activeTown}.`
  };

  if (serviceKey.includes('drain') || serviceKey.includes('cctv') || serviceKey.includes('unblock')) {
    seoData = {
      brandTitle: "Drainage & Sewer Clearance",
      desc: `Specialist blocked drain clearance, high-pressure jetting, and CCTV drain surveys across ${activeTown} and surrounding areas. Fast unblocking for toilets, sinks, gullies, and main sewer pipes.`,
      trustSignal3Title: "Drainage Specialists",
      trustSignal3Desc: `High-pressure water jetting and CCTV video surveys to locate and clear stubborn blockages fast across ${activeTown}.`
    };
  } else if (serviceKey.includes('boiler') || serviceKey.includes('heating') || serviceKey.includes('gas')) {
    seoData = {
      brandTitle: "Heating & Boiler Engineering",
      desc: `Certified heating engineering services across ${activeTown}. Rapid breakdown diagnosis, combi boiler installations, radiator power flushing, and annual gas boiler servicing.`,
      trustSignal3Title: "Gas & Boiler Certified",
      trustSignal3Desc: `Fully qualified heating technicians providing diagnostic repairs and combi boiler servicing in ${activeTown}.`
    };
  } else if (serviceKey.includes('leak') || serviceKey.includes('detection')) {
    seoData = {
      brandTitle: "Water Leak Detection & Repair",
      desc: `Non-invasive water leak detection and urgent burst pipe repairs across ${activeTown}. Fast identification of hidden subfloor, wall cavity, and central heating pipe leaks.`,
      trustSignal3Title: "Trace & Access Specialists",
      trustSignal3Desc: `Acoustic and thermal detection technology to locate hidden leaks without property damage in ${activeTown}.`
    };
  }

  return (
    <footer className="bg-slate-50 text-slate-700 pt-20 pb-12 border-t-2 border-[#A6892C] relative">
      <div className="container mx-auto px-4">
        
        {/* 3-COLUMN MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* COL 1: BRAND & AUTHORITY */}
          <div>
            <h3 className="text-slate-900 font-extrabold text-2xl mb-3 tracking-tight">
              {seoData.brandTitle} <span className="text-[#A6892C]">in {activeTown}</span>
            </h3>

            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
              {seoData.desc}
            </p>

            {/* OAP DISCOUNT BOX */}
            <div className="border border-[#A6892C]/30 bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-1.5">
                <Percent className="w-5 h-5 text-[#A6892C]" />
                <span className="text-[#A6892C] font-black text-base uppercase tracking-wide">10% OAP Discount</span>
              </div>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                Available for seniors and pensioners across {activeTown} and surrounding areas.
              </p>
            </div>
          </div>

          {/* COL 2: TRUST SIGNALS */}
          <div>
            <h3 className="text-slate-900 font-black text-lg mb-8 uppercase tracking-wider">Why Choose RKM?</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3.5">
                <Shield className="w-6 h-6 text-[#A6892C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block mb-1 uppercase text-xs tracking-wider">No Call Out Charge</span>
                  <span className="text-slate-600 text-sm leading-relaxed">Transparent local pricing with £0 dispatch fee. You only pay for completed repairs.</span>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <CheckCircle className="w-6 h-6 text-[#A6892C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block mb-1 uppercase text-xs tracking-wider">24/7 Rapid Response</span>
                  <span className="text-slate-600 text-sm leading-relaxed">On-site within 60 minutes for urgent burst pipes, leaks, and emergencies in {activeTown}.</span>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <Shield className="w-6 h-6 text-[#A6892C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block mb-1 uppercase text-xs tracking-wider">{seoData.trustSignal3Title}</span>
                  <span className="text-slate-600 text-sm leading-relaxed">{seoData.trustSignal3Desc}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COL 3: CONTACT & LOCAL AREA */}
          <div>
            <h3 className="text-slate-900 font-black text-lg mb-8 uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-6">
              
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Direct Telephone</p>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#A6892C]" />
                  <a href={`tel:${activePhone.replace(/\s+/g, '')}`} className="text-2xl sm:text-3xl font-black text-slate-900 hover:text-[#A6892C] transition-colors tracking-tight">
                    {activePhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#A6892C] mt-1 flex-shrink-0" />
                <span className="text-slate-700 text-sm font-medium leading-relaxed">
                  {activeRoad},<br />
                  {activeTown}, United Kingdom,<br />
                  {activePostcode}
                </span>
              </div>
              
              <div className="pt-6 border-t border-slate-200">
                <p className="text-[#A6892C] text-xs font-black uppercase tracking-wider mb-2">Local Service Coverage:</p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Serving {activeTown} and all neighbouring regional communities 24 hours a day, 365 days a year.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* REGIONAL AUTHORITY / TRAINING BAR */}
        <div className="border-t border-slate-200 py-8 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#A6892C]/10 rounded-xl border border-[#A6892C]/20">
                <GraduationCap className="w-6 h-6 text-[#A6892C]" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider">Regional Trade &amp; Safety Standards</h4>
                <p className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold mt-0.5">Compliant Diagnostic &amp; Domestic Installation Protocols</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                S-Plan Diagnostics
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                Trace &amp; Access Tech
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                High-Pressure Jetting
              </span>
            </div>
          </div>
        </div>

        {/* FINAL FOOTER BAR */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-slate-500 gap-4">
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center">
            <p>&copy; {currentYear} RKM Plumbing &amp; Heating Services LTD.</p>
            
            <div className="flex gap-4 items-center">
              <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-300">|</span>
              <Link to="/locations" className="text-[#A6892C] hover:underline">
                Areas We Cover
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A6892C] animate-pulse"></span>
            <p className="text-slate-600 uppercase tracking-widest text-[11px]">{activeTown} Active Unit</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;