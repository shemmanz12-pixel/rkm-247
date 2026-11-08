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

  // 2. DYNAMIC SEO CONTENT PER SERVICE / LANDING PAGE (OPTIMIZED WITH "SERVICES IN [LOCATION]")
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
    <footer className="bg-slate-50 text-slate-700 pt-20 pb-12 border-t-2 border-[#A6892C] relative">
      <div className="container mx-auto px-4">
        
        {/* 3-COLUMN MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* COL 1: BRAND, SEO AUTHORITY & OFFERS HUB */}
          <div>
            <h3 className="text-slate-900 font-extrabold text-2xl mb-3 tracking-tight">
              {seoData.brandTitle} <span className="text-[#A6892C]">in {activeTown}</span>
            </h3>

            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
              {seoData.desc}
            </p>

            {/* OFFERS CONTAINER (TARGET ANCHOR: #offers) */}
            <div id="offers" className="space-y-3 scroll-mt-24">
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#A6892C]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Current Customer Promotions &amp; Discounts</span>
              </div>

              {/* OFFER 1: BOILER FINANCE */}
              <div className="border border-[#A6892C]/30 bg-white rounded-xl p-3.5 shadow-sm hover:border-[#A6892C] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <BadgePercent className="w-4 h-4 text-[#A6892C] shrink-0" />
                    <span className="text-[#A6892C] font-black text-xs uppercase tracking-wide">
                      Boiler Finance Available
                    </span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#A6892C]/10 text-[#A6892C]">
                    £0 Deposit
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Spread the cost of your replacement A-rated boiler with low monthly repayment options. Instant soft credit check available.
                </p>
              </div>

              {/* OFFER 2: REFER A FRIEND */}
              <div className="border border-slate-200 bg-white rounded-xl p-3.5 shadow-sm hover:border-[#A6892C] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#A6892C] shrink-0" />
                    <span className="text-[#A6892C] font-black text-xs uppercase tracking-wide">
                      £50 Refer-A-Friend Reward
                    </span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Cash / Voucher
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Know someone in {activeTown} who needs a new boiler or major plumbing work? Recommend RKM and receive a £50 reward upon job completion.
                </p>
              </div>

              {/* OFFER 3: OAP DISCOUNT */}
              <div className="border border-slate-200 bg-white rounded-xl p-3.5 shadow-sm hover:border-[#A6892C] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#A6892C] shrink-0" />
                    <span className="text-[#A6892C] font-black text-xs uppercase tracking-wide">
                      10% Senior &amp; OAP Discount
                    </span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    Labour Discount
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Dedicated 10% labour deduction on domestic repairs and servicing for pensioners across {activeTown} and local parishes.
                </p>
              </div>
            </div>
          </div>

          {/* COL 2: TRUST SIGNALS & LOCAL SEO CREDENTIALS */}
          <div>
            <h3 className="text-slate-900 font-black text-lg mb-8 uppercase tracking-wider">Why Choose RKM?</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3.5">
                <Shield className="w-6 h-6 text-[#A6892C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block mb-1 uppercase text-xs tracking-wider">No Call Out Charge</span>
                  <span className="text-slate-600 text-sm leading-relaxed">Transparent fixed quotes with £0 dispatch fee. You only pay when repair or install work is undertaken.</span>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <CheckCircle className="w-6 h-6 text-[#A6892C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block mb-1 uppercase text-xs tracking-wider">24/7 Rapid Emergency Response</span>
                  <span className="text-slate-600 text-sm leading-relaxed">Direct dispatch reaching urgent boiler breakdowns, burst pipes, and sewer back-ups across {activeTown} in 60-90 minutes.</span>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <Flame className="w-6 h-6 text-[#A6892C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block mb-1 uppercase text-xs tracking-wider">{seoData.trustSignal3Title}</span>
                  <span className="text-slate-600 text-sm leading-relaxed">{seoData.trustSignal3Desc}</span>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <Award className="w-6 h-6 text-[#A6892C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 font-bold block mb-1 uppercase text-xs tracking-wider">Verified 5-Star Reputation</span>
                  <span className="text-slate-600 text-sm leading-relaxed">Top-rated independent domestic heating and drainage contractors backed by 100+ verified customer reviews.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COL 3: CONTACT, NAP DATA & ENQUIRIES */}
          <div>
            <h3 className="text-slate-900 font-black text-lg mb-8 uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-6">
              
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Direct Telephone Dispatch</p>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#A6892C]" />
                  <a href={`tel:${activePhone.replace(/\s+/g, '')}`} className="text-2xl sm:text-3xl font-black text-slate-900 hover:text-[#A6892C] transition-colors tracking-tight">
                    {activePhone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Lines Open 24 Hours / 7 Days A Week</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#A6892C] mt-1 flex-shrink-0" />
                <span className="text-slate-700 text-sm font-medium leading-relaxed">
                  {activeRoad},<br />
                  {activeTown}, Leicestershire,<br />
                  {activePostcode}, United Kingdom
                </span>
              </div>
              
              {/* REPLACED ZONE: DIRECT EMAIL ENQUIRIES */}
              <div className="pt-6 border-t border-slate-200">
                <p className="text-[#A6892C] text-xs font-black uppercase tracking-wider mb-2">Domestic &amp; Commercial Enquiries</p>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">
                  For tender documents, formal quotations, commercial contracts, or general domestic enquiries, email us directly:
                </p>
                <a 
                  href="mailto:plumbersnearme.rkm@outlook.com"
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#A6892C] px-3.5 py-2.5 rounded-xl shadow-sm text-slate-800 hover:text-[#A6892C] transition-all group"
                >
                  <Mail className="w-4 h-4 text-[#A6892C] group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-bold break-all">plumbersnearme.rkm@outlook.com</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* REGIONAL AUTHORITY / ACCREDITATION BADGES BAR */}
        <div className="border-t border-slate-200 py-8 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#A6892C]/10 rounded-xl border border-[#A6892C]/20">
                <GraduationCap className="w-6 h-6 text-[#A6892C]" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider">Gas Safe &amp; Regional Trade Standards</h4>
                <p className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold mt-0.5">Gas Safe Reg No. 987039 · Compliant Installation &amp; Building Control Protocols</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 border border-[#A6892C]/40 bg-[#A6892C]/15 px-3.5 py-1.5 rounded-lg shadow-sm">
                Gas Safe #987039
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                Boiler Finance Available
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                Checkatrade Approved
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                High-Pressure Jetting
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                Trace &amp; Access Tech
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 border border-slate-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm">
                Water Regulations (WRAS)
              </span>
            </div>
          </div>
        </div>

        {/* REGULATORY COMPLIANCE & FCA LEGAL DISCLAIMER */}
        <div className="border-t border-slate-200 pt-6 pb-4 text-[11px] text-slate-500 leading-relaxed">
          <p className="mb-2">
            <strong className="text-slate-700">Gas Safety Compliance:</strong> RKM Plumbing Heating &amp; Drainage Services LTD is an officially registered business on the Gas Safe Register (Registration No. <strong>987039</strong>). All gas engineering works, boiler installations, heating diagnostics, and landlord gas safety inspections (CP12) are carried out strictly in accordance with the Gas Safety (Installation and Use) Regulations.
          </p>
          <p>
            <strong className="text-slate-700">Financial Conduct Authority (FCA) Notice:</strong> RKM Plumbing Heating &amp; Drainage Services LTD acts as an Introducer Appointed Representative (IAR) of TradeHelp Ltd, who are authorised and regulated by the Financial Conduct Authority (FRN: 679812). TradeHelp acts as a credit broker, not a lender, and offers credit products from a panel of lenders. Credit is subject to status, affordability, and UK residency requirements. Terms and conditions apply.
          </p>
        </div>

        {/* FINAL FOOTER BAR */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-slate-500 gap-4">
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center">
            <p>&copy; {currentYear} RKM Plumbing Heating &amp; Drainage Services LTD. Reg: 987039.</p>
            
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
            <p className="text-slate-600 uppercase tracking-widest text-[11px]">
              {activeTown} Dedicated Response Unit
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;