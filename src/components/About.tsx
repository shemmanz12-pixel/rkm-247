'use client'; 

import { useParams } from 'react-router-dom';
import { CheckCircle, Phone, Calendar, Wrench, ShieldCheck, Flame, Droplets } from 'lucide-react';
import { towns } from '../townConfig'; 
import Slideshow from './slideshow'; 

const RKM_GUARANTEES = [
  '24/7 Rapid Emergency Response (Within 60 Minutes)',
  'Boiler Installs, Repairs & Servicing',
  'Blocked Drains & HD CCTV Drain Surveys',
  'Full Plumbing Repairs & Sanitary Installs',
  'Fully Certified, Insured & Gas Safe Ready',
  'Transparent Pricing with Zero Hidden Callout Fees'
];

const About = () => {
  const { serviceSlug, townSlug } = useParams();

  // --- DYNAMIC SEO DATA ROUTING ---
  const normalize = (value: string) => value?.toLowerCase().replace('.html', '').trim() || '';
  const cleanTownKey = normalize(townSlug || '');
  
  const townData = towns[cleanTownKey] || {};
  
  // SEO Variables with smart fallbacks
  const displayLocation = townData.name || (cleanTownKey ? cleanTownKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Coalville and Surrounding Areas');
  const customPhone = townData.phone || "01530 654 062";
  const landmark = townData.landmark || "the local town centre";
  const road = townData.road || "main transport routes";
  const postcodes = townData.postcodes ? townData.postcodes.join(', ') : "LE65 and LE67";
  
  const displayService = serviceSlug 
    ? serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) 
    : 'Plumbing & Heating';

  // --- DYNAMIC IMAGE ROUTING ENHANCED FOR ALL SERVICES ---
  const normalizedService = (serviceSlug || '').toLowerCase();
  let images: string[] = [];

  const isHomepage = !cleanTownKey && !normalizedService;
  const isHugglescote = cleanTownKey.includes('hugglescote');
  const isAshby = cleanTownKey.includes('ashby');

  if (isHomepage) {
    // Standard homepage using the clocktower filename
    images = [
      "/clocktower-coalville.webp",
      "/bathroom.webp",
      "/boiler-install.webp",
      "/hugglescote-bear.webp",
      "/drain-unblocking.webp",
      "/ball-valve.webp",
    ];
  } else {
    // 1. Determine service-specific background images first
    if (normalizedService.includes('drain') || normalizedService.includes('cctv') || normalizedService.includes('unblock') || normalizedService.includes('blockage') || normalizedService.includes('survey')) {
      images = [
        "/drain-unblocking.webp",
        "/drainage-cctv-survey.webp",
        "/unblocked-drain.webp",
      ];
    } else if (normalizedService.includes('boiler') || normalizedService.includes('heat') || normalizedService.includes('gas') || normalizedService.includes('repair') || normalizedService.includes('install')) {
      images = [
        "/boiler-install.webp",
        "/two-port-valve.webp",
        "/ball-valve.webp",
      ];
    } else if (normalizedService.includes('plumb') || normalizedService.includes('leak') || normalizedService.includes('emergency') || normalizedService.includes('water')) {
      images = [
        "/bathroom.webp",
        "/outside-tap-install.webp",
        "/kitchen-tap.webp",
      ];
    } else {
      images = [
        "/bathroom.webp",
        "/boiler-install.webp",
        "/drain-unblocking.webp",
        "/ball-valve.webp",
      ];
    }

    // 2. Prepend location-specific landmark photos to dedicated town pages
    if (isHugglescote) {
      images = ["/hugglescote-bear.webp", ...images];
    } else if (isAshby) {
      images = ["/ashby-de-la-zouch-rkm.webp", ...images];
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: ISOLATED SLIDESHOW COMPONENT */}
          <div className="order-2 lg:order-1 relative">
            
            <Slideshow 
              images={images} 
              displayService={displayService} 
              displayLocation={displayLocation} 
            />

            {/* Decorative Offset Border (Desktop Only) */}
            <div className="absolute inset-0 border-2 border-[#A6892C] rounded-[2rem] -z-10 translate-x-4 translate-y-4 hidden lg:block transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"></div>
          </div>

          {/* RIGHT: TEXT CONTENT & HEAVY SEO */}
          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-black text-[#A6892C] uppercase tracking-[0.2em] mb-3">
              About RKM Plumbing Heating & Drainage
            </h2>
            
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              Trusted {displayService} Experts <br />
              <span className="text-[#A6892C] text-3xl md:text-4xl">in {displayLocation}</span>
            </h3>
            
            {/* HEAVY SEO PARAGRAPH 1: Core Services & Authority */}
            <p className="text-lg text-gray-600 mb-4 leading-relaxed font-medium">
              Since 2004, RKM Plumbing Heating & Drainage Services has been the premier choice for fast-response plumbing, heating, and drainage in <strong>{displayLocation}</strong>. From high-efficiency <strong>boiler installs and emergency boiler repairs</strong> to persistent <strong>blocked drains, CCTV drain surveys, emergency plumbing repairs</strong>, and complete system <strong>installations</strong>, our local engineers deliver fast, guaranteed solutions for domestic and commercial properties alike.
            </p>

            {/* HEAVY SEO PARAGRAPH 2: Geographic Density & Response */}
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Whether you require urgent {displayService.toLowerCase()} assistance near <strong>{landmark}</strong>, are situated along <strong>{road}</strong>, or operate anywhere within the <strong>{postcodes}</strong> postcode districts, our dedicated local team is equipped to handle the job safely and efficiently. We provide rapid 60-minute emergency callouts across the community with transparent pricing and zero hidden fees.
            </p>

            {/* CORE SERVICES QUICK BADGES (For Speed Scanning) */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <Flame className="w-5 h-5 text-[#A6892C] shrink-0" />
                <span className="text-xs font-bold text-slate-800">Boiler Installs & Repairs</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <Droplets className="w-5 h-5 text-[#A6892C] shrink-0" />
                <span className="text-xs font-bold text-slate-800">Blocked Drains & CCTV</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <Wrench className="w-5 h-5 text-[#A6892C] shrink-0" />
                <span className="text-xs font-bold text-slate-800">Emergency Pipe Repairs</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#A6892C] shrink-0" />
                <span className="text-xs font-bold text-slate-800">Full Plumbing Installs</span>
              </div>
            </div>
            
            {/* BULLET POINTS */}
            <ul className="space-y-3 mb-10">
              {RKM_GUARANTEES.map((item, index) => (
                <li key={index} className="flex items-start gap-3 group cursor-default">
                  <CheckCircle className="w-5 h-5 text-[#A6892C] shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <span className="text-slate-800 font-bold text-sm transition-colors group-hover:text-black">{item}</span>
                </li>
              ))}
            </ul>

            {/* CALL TO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`tel:${customPhone.replace(/\s+/g, '')}`} 
                className="inline-flex bg-[#A6892C] hover:bg-[#c4a030] text-slate-900 font-black text-lg py-4 px-8 rounded-xl items-center justify-center gap-3 shadow-lg transition-transform hover:-translate-y-1"
              >
                <Phone className="w-6 h-6 animate-pulse" />
                <span>Call {customPhone}</span>
              </a>

              <a 
                href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-black hover:bg-slate-800 text-white font-bold text-lg py-4 px-8 rounded-xl items-center justify-center gap-3 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <Calendar className="w-6 h-6 text-[#A6892C]" />
                <span>Book Online</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;