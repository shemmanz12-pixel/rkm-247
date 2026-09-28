import { useLocation, useParams } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import BookingCard from './BookingCard';

interface ContactSectionProps {
  customPhone?: string;
  townName?: string;
  serviceName?: string;
  customImage?: string;
}

const ContactSection = ({ 
  customPhone = "01530 654 062", 
  townName,
  serviceName,
  customImage
}: ContactSectionProps) => {
  const location = useLocation();
  const params = useParams<{ service?: string; town?: string; slug?: string }>();

  // 1. DYNAMIC ROUTE & LOCATION PARSING
  const pathSegments = (location?.pathname || '').split('/').filter(Boolean);
  const detectedService = serviceName || params.service || (pathSegments.length > 1 ? pathSegments[0] : '');
  const detectedTown = townName || params.town || params.slug || (pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : '');

  const formatName = (slug?: string) => 
    slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';

  const activeTown = formatName(detectedTown) || 'Coalville';
  const serviceKey = (detectedService || '').toLowerCase();

  // 2. DYNAMIC SEO COPY & ASSET CONFIGURATION
  let seoData = {
    badge: "Plumbing & Heating Dispatch",
    title: `Plumbers & Heating Engineers in ${activeTown}`,
    desc: `Need emergency plumbing, boiler servicing, or drain clearance in ${activeTown}? Our mobile engineers provide rapid 24/7 domestic repairs with zero call-out charges.`,
    photo: "/kitchen-tap.webp",
    photoTag: `Domestic Plumbing & Heating Engineers in ${activeTown}`,
    chips: ["Domestic Plumbing Repairs", "Boiler Servicing & Installs", "Drain Unblocking & Jetting"]
  };

  if (serviceKey.includes('drain') || serviceKey.includes('cctv') || serviceKey.includes('unblock') || serviceKey.includes('blockage')) {
    seoData = {
      badge: "Emergency Drainage Engineers",
      title: `Blocked Drain Specialists in ${activeTown}`,
      desc: `Specialist drain unblocking, high-pressure water jetting, and CCTV drain surveys across ${activeTown} & Leicestershire. Fast clearance for manholes, toilets, and sewer lines.`,
      photo: "/drain-unblocking.webp",
      photoTag: `CCTV Drain Surveys & High-Pressure Jetting in ${activeTown}`,
      chips: ["High-Pressure Drain Jetting", "CCTV Camera Surveys", "Blocked Toilets & Sinks", "Main Sewer Unblocking"]
    };
  } else if (serviceKey.includes('boiler') || serviceKey.includes('heating') || serviceKey.includes('gas')) {
    seoData = {
      badge: "Gas Safe Heating Engineers",
      title: `Boiler Installs & Heating in ${activeTown}`,
      desc: `Certified heating engineering across ${activeTown}. Rapid boiler breakdown diagnostics, radiator replacements, central heating repairs, and combi boiler installations.`,
      photo: "/two-port-vale.webp",
      photoTag: `Gas Safe Boiler Installation & Heating Repairs in ${activeTown}`,
      chips: ["Combi Boiler Repairs", "Radiator Power Flushing", "Thermostat Upgrades", "Annual Boiler Servicing"]
    };
  } else if (serviceKey.includes('leak') || serviceKey.includes('detection')) {
    seoData = {
      badge: "Trace & Access Specialists",
      title: `Water Leak Detection in ${activeTown}`,
      desc: `Non-invasive water leak detection and urgent pipe repairs throughout ${activeTown}. Fast identification of hidden ceiling, floor, and central heating leaks.`,
      photo: "/drain-cctv-survey.webp",
      photoTag: `Acoustic & Thermal Leak Detection in ${activeTown}`,
      chips: ["Hidden Pipe Leak Detection", "Thermal Imaging Scans", "Ceiling Leak Repair", "Trace & Access Reports"]
    };
  } else if (serviceKey.includes('emergency')) {
    seoData = {
      badge: "24/7 Rapid Response Unit",
      title: `24/7 Emergency Plumber in ${activeTown}`,
      desc: `Immediate 60-minute dispatch for burst pipes, flooding, leaking stopcocks, and boiler breakdowns across ${activeTown}. Available 24 hours a day, 365 days a year.`,
      photo: "/team-photo.webp",
      photoTag: `24/7 Emergency Callout Plumber in ${activeTown}`,
      chips: ["Burst Pipe Isolation", "Emergency Leak Stoppage", "Flooding Mitigation", "60-Min Target Arrival"]
    };
  }

  const activePhoto = customImage || seoData.photo;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="container mx-auto px-4 relative z-10">

        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A6892C]/10 border border-[#A6892C]/25 text-[#A6892C] font-bold text-xs uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 fill-[#A6892C]" />
            <span>{seoData.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            {seoData.title.split(activeTown)[0]}
            <span className="text-[#A6892C]">{activeTown}</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {seoData.desc}
          </p>
        </div>

        {/* 2-COLUMN BALANCED LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT 7 COLS: SPACIOUS PHOTO, SEO CHIPS & DIRECT CALL */}
          <div className="lg:col-span-7 space-y-6">

            {/* 4:3 RATIO STANDALONE PHOTO VIEWPORT */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-white shadow-xl aspect-[4/3] w-full">
              <img 
                src={activePhoto} 
                alt={seoData.photoTag}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />

              {/* LOCATION/STATUS BADGE OVERLAY */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-slate-950/85 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 shadow-lg">
                <MapPin className="w-4 h-4 text-[#A6892C] flex-shrink-0" />
                <span className="truncate">Active Coverage: <strong className="text-white font-bold">{activeTown}</strong> &amp; Surrounding Parishes</span>
              </div>
            </div>

            {/* SERVICE SPECIFIC SEO CHIPS */}
            <div className="flex flex-wrap gap-2 pt-1">
              {seoData.chips.map((chip, i) => (
                <span 
                  key={i} 
                  className="bg-white text-slate-700 font-bold text-xs px-3.5 py-1.5 rounded-lg border border-slate-200/80 shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* DIRECT CALL ACTION CARD */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-[#A6892C]/40 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-[#A6892C]" />
                  <span>Direct Dispatch &amp; Free Quote Line</span>
                </div>
                <a 
                  href={`tel:${customPhone.replace(/\s+/g, '')}`} 
                  className="text-2xl sm:text-3xl font-black text-slate-900 hover:text-[#A6892C] transition-colors block"
                >
                  {customPhone}
                </a>
              </div>

              <a 
                href={`tel:${customPhone.replace(/\s+/g, '')}`} 
                className="inline-flex items-center gap-2 bg-[#A6892C] hover:bg-[#c4a030] text-slate-950 font-black text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
              >
                <span>Call Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* SECONDARY TILES */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#A6892C]/10 flex items-center justify-center text-[#A6892C] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Email Support</p>
                  <a 
                    href="mailto:plumbersnearme.rkm@outlook.com" 
                    className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#A6892C] transition-colors block truncate"
                  >
                    plumbersnearme.rkm@outlook.com
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#A6892C]/10 flex items-center justify-center text-[#A6892C] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Response Guarantee</p>
                  <p className="text-sm font-extrabold text-slate-900">Under 60 Minutes</p>
                </div>
              </div>
            </div>

            {/* TRUST GUARANTEES */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A6892C]" /> £0 Call-Out Charges
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A6892C]" /> 24/7 Availability
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#A6892C]" /> Gas Safe &amp; Drainage Insured
              </span>
            </div>

          </div>

          {/* RIGHT 5 COLS: CALENDAR BOOKING CARD */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-2 sm:p-4 border border-slate-200/80 shadow-lg">
              <BookingCard />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;