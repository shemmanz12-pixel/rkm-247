import { useLocation, useParams, Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Shield, 
  CheckCircle, 
  Percent, 
  GraduationCap, 
  Flame, 
  BadgePercent, 
  Users, 
  Sparkles,
  Award,
  Clock,
  Mail
} from 'lucide-react';
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
  const activeRoad = roadName || townData.road || 'Hodgetts Street';
  const activePostcode = postcodeLabel || townData.postcode || 'LE67 2JH';
  const serviceKey = (detectedService || '').toLowerCase();

  // 2. DYNAMIC SEO CONTENT
  let seoData = {
    brandTitle: "RKM Plumbing Heating & Drainage Services",
    desc: `RKM provides certified domestic plumbing, Gas Safe boiler installations, emergency repairs, and rapid drain clearance across ${activeTown} and North West Leicestershire. Local 60-minute emergency dispatch with £0 call-out charges and 0% deposit boiler finance.`,
    trustSignal3Title: "Gas Safe & Heating Experts",
    trustSignal3Desc: `Gas Safe Registered (#987039) engineers for boiler replacements, heating upgrades, and gas safety certifications in ${activeTown}.`
  };

  if (serviceKey.includes('drain') || serviceKey.includes('cctv') || serviceKey.includes('unblock')) {
    seoData = {
      brandTitle: "Drainage, Jetting & Sewer Services",
      desc: `Specialist blocked drain clearance, high-pressure water jetting, and CCTV drain surveys across ${activeTown} and neighbouring postcodes. Fast clearance for blocked toilets, sinks, soil stacks, and external sewer runs.`,
      trustSignal3Title: "Drainage Specialists",
      trustSignal3Desc: `Commercial-grade electro-mechanical unblocking and colour CCTV surveys to locate and clear root ingress and collapsed drains fast in ${activeTown}.`
    };
  } else if (serviceKey.includes('boiler') || serviceKey.includes('heating') || serviceKey.includes('gas')) {
    seoData = {
      brandTitle: "Gas Safe Heating & Boiler Services",
      desc: `Certified Gas Safe (#987039) heating engineering across ${activeTown}. Emergency breakdown fault diagnostics, combi boiler upgrades with flexible finance, MagnaCleanse power flushing, and annual gas safety checks.`,
      trustSignal3Title: "Gas Safe Reg #987039",
      trustSignal3Desc: `Legally certified gas heating engineers installing A-rated Ideal, Worcester & Vaillant boilers with up to 12-year manufacturer warranties in ${activeTown}.`
    };
  } else if (serviceKey.includes('leak') || serviceKey.includes('detection')) {
    seoData = {
      brandTitle: "Water Leak Detection & Repair Services",
      desc: `Non-invasive acoustic leak detection, thermal imaging, and urgent burst pipe repairs across ${activeTown}. Fast tracing of hidden subfloor, under-screed, and cavity wall pipe leaks with full insurance reports.`,
      trustSignal3Title: "Trace & Access Specialists",
      trustSignal3Desc: `Precision acoustic microphones and thermographic cameras to pinpoint underground leaks with minimal damage in ${activeTown}.`
    };
  }

  return (
    <footer className="bg-slate-50 text-slate-700 pt-12 sm:pt-16 pb-24 sm:pb-12 border-t-2 border-[#A6892C] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* 3-COLUMN MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          
          {/* COL 1: BRAND, SEO AUTHORITY & COMPACT OFFERS HUB */}
          <div>
            <h3 className="text-slate-900 font-extrabold text-xl sm:text-2xl mb-2.5 tracking-tight">
              {seoData.brandTitle} <span className="text-[#A6892C]">in {activeTown}</span>
            </h3>

            <p className="text-slate-600 mb-5 leading-relaxed text-xs sm:text-sm">
              {seoData.desc}
            </p>

            {/* COMPACT OFFERS CONTAINER (TARGET ANCHOR: #offers) */}
            <div id="offers" className="space-y-2.5 scroll-mt-24">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#A6892C] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Current Customer Promotions &amp; Discounts</span>
              </div>

              {/* OFFER 1: BOILER FINANCE */}
              <div className="border border-[#A6892C]/30 bg-white rounded-xl p-3 shadow-sm hover:border-[#A6892C] transition-colors">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-2">
                    <BadgePercent className="w-3.5 h-3.5 text-[#A6892C] shrink-0" />
                    <span className="text-slate-900 font-bold text-xs">
                      Boiler Finance Available
                    </span>
                  </div>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#A6892C]/10 text-[#A6892C] shrink-0">
                    £0 Deposit
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Spread the cost of replacement A-rated boilers with flexible monthly plans. Instant soft check.
                </p>
              </div>

              {/* OFFER 2: REFER A FRIEND */}
              <div className="border border-slate-200 bg-white rounded-xl p-3 shadow-sm hover:border-[#A6892C] transition-colors">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#A6892C] shrink-0" />
                    <span className="text-slate-900 font-bold text-xs">
                      £50 Refer-A-Friend Reward
                    </span>
                  </div>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    Cash / Voucher
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Recommend a local friend or neighbour for boiler replacements or major repairs to receive £50.
                </p>
              </div>

              {/* OFFER 3: OAP DISCOUNT */}
              <div className="border border-slate-200 bg-white rounded-xl p-3 shadow-sm hover:border-[#A6892C] transition-colors">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-2">
                    <Percent className="w-3.5 h-3.5 text-[#A6892C] shrink-0" />
                    <span className="text-slate-900 font-bold text-xs">
                      10% Senior &amp; Pensioner Discount
                    </span>
                  </div>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                    Labour Discount
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  10% labour deduction on domestic repairs and servicing for senior residents across the area.
                </p>
              </div>
            </div>
          </div>

          {/* COL 2: TRUST SIGNALS */}
          <div>
            <h3 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">Why Choose RKM?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#A6892C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block text-xs uppercase tracking-wide">No Call Out Charge</span>
                  <span className="text-slate-600 text-xs leading-relaxed">Transparent fixed quotes with £0 dispatch fee. Pay only when work is carried out.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A6892C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block text-xs uppercase tracking-wide">24/7 Rapid Emergency Response</span>
                  <span className="text-slate-600 text-xs leading-relaxed">Local dispatch for urgent boiler breakdowns, burst pipes, and drains in 60–90 minutes.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#A6892C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block text-xs uppercase tracking-wide">{seoData.trustSignal3Title}</span>
                  <span className="text-slate-600 text-xs leading-relaxed">{seoData.trustSignal3Desc}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#A6892C] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block text-xs uppercase tracking-wide">Verified 5-Star Reputation</span>
                  <span className="text-slate-600 text-xs leading-relaxed">Top-rated independent contractors backed by 100+ verified customer reviews.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COL 3: CONTACT & BRANDED EMAIL */}
          <div>
            <h3 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-4">
              
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Telephone Dispatch</p>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#A6892C]" />
                  <a href={`tel:${activePhone.replace(/\s+/g, '')}`} className="text-xl sm:text-2xl font-black text-slate-900 hover:text-[#A6892C] transition-colors tracking-tight">
                    {activePhone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Lines Open 24 Hours / 7 Days A Week</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A6892C] mt-1 shrink-0" />
                <span className="text-slate-600 text-xs font-medium leading-relaxed">
                  {activeRoad}, {activeTown}, Leicestershire, {activePostcode}
                </span>
              </div>
              
              {/* BRANDED EMAIL SECTION */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-[#A6892C] text-xs font-bold uppercase tracking-wider mb-1">Direct Enquiries</p>
                <p className="text-slate-500 text-xs leading-relaxed mb-2.5">
                  For formal quotes, boiler enquiries, or domestic questions:
                </p>
                <a 
                  href="mailto:info@rkm247.co.uk"
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#A6892C] px-3 py-2 rounded-xl shadow-sm text-slate-800 hover:text-[#A6892C] transition-all"
                >
                  <Mail className="w-4 h-4 text-[#A6892C]" />
                  <span className="text-xs font-bold">info@rkm247.co.uk</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* REGIONAL ACCREDITATIONS */}
        <div className="border-t border-slate-200 py-6 mb-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#A6892C]/10 rounded-xl border border-[#A6892C]/20 shrink-0">
                <GraduationCap className="w-5 h-5 text-[#A6892C]" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Gas Safe &amp; Regional Trade Standards</h4>
                <p className="text-slate-500 text-[11px] font-medium mt-0.5">Gas Safe Reg No. 987039 · Fully Insured Local Engineers</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border border-[#A6892C]/40 bg-[#A6892C]/15 px-2.5 py-1 rounded-md">
                Gas Safe #987039
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-2.5 py-1 rounded-md">
                Checkatrade Approved
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-2.5 py-1 rounded-md">
                £0 Call Out
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-2.5 py-1 rounded-md">
                24/7 Response
              </span>
            </div>
          </div>
        </div>

        {/* FCA DISCLAIMER */}
        <div className="border-t border-slate-200 pt-4 pb-2 text-[10px] text-slate-400 leading-relaxed">
          <p>
            RKM Plumbing Heating &amp; Drainage Services LTD is Gas Safe Registered (No. <strong>987039</strong>). All heating works comply with Gas Safety Regulations. Introducer Appointed Representative (IAR) of TradeHelp Ltd, authorised and regulated by the Financial Conduct Authority (FRN: 679812). Credit subject to status.
          </p>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-slate-200 pt-4 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium text-slate-500 gap-2">
          <p>&copy; {currentYear} RKM Plumbing Heating &amp; Drainage Services LTD.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/locations" className="text-[#A6892C] hover:underline">Areas Covered</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;