'use client'; 

import { useParams, useLocation } from 'react-router-dom';
import { CheckCircle, Phone, Calendar, Wrench, ShieldCheck, Flame, Droplets } from 'lucide-react';
import { towns, TownData } from '../townConfig'; 
import Slideshow from './slideshow'; 

const RKM_GUARANTEES = [
  '24/7 Rapid Emergency Response (Within 60 Minutes)',
  'Boiler Installs, Repairs & Servicing with Finance Available',
  'Blocked Drains & HD CCTV Drain Surveys',
  'Full Plumbing Repairs & Sanitary Installs',
  'Gas Safe Registered Business (Reg #987039)',
  'Transparent Pricing with Zero Hidden Callout Fees'
];

interface AboutProps {
  townSlug?: string;
  serviceSlug?: string;
}

const About = ({ townSlug: propTownSlug, serviceSlug: propServiceSlug }: AboutProps) => {
  const params = useParams<{ serviceSlug?: string; townSlug?: string; service?: string; town?: string; slug?: string }>();
  const location = useLocation();

  // 1. ROBUST MULTI-ROUTE SLUG DETECTION
  const detectedLocationSlug = (() => {
    if (propTownSlug) return propTownSlug.toLowerCase().trim();

    if (params.townSlug) return params.townSlug.toLowerCase().trim();
    if (params.town) return params.town.toLowerCase().trim();
    if (params.slug && towns[params.slug.toLowerCase().trim()]) return params.slug.toLowerCase().trim();

    const lowerPath = location.pathname.toLowerCase();
    const segments = lowerPath.split('/').filter(Boolean);

    for (const segment of segments) {
      const clean = segment
        .replace('.html', '')
        .replace(/^(plumber|emergency-plumber|heating|boiler)-in-/, '')
        .replace(/^(plumbers?|heating|boilers?)-/, '');

      if (towns[clean]) {
        return clean;
      }
    }

    for (const slug of Object.keys(towns)) {
      if (lowerPath.includes(`/${slug}`) || lowerPath.endsWith(slug)) {
        return slug;
      }
    }

    return 'coalville';
  })();

  // 2. DETECT SERVICE FROM PROPS, PARAMS, OR PATH
  const detectedServiceSlug = (() => {
    if (propServiceSlug) return propServiceSlug;
    if (params.serviceSlug) return params.serviceSlug;
    if (params.service) return params.service;

    const lowerPath = location.pathname.toLowerCase();
    const serviceKeys = [
      'emergency-plumber',
      'heating-engineer',
      'drain-unblocking',
      'local-plumber',
      'leak-detection',
      'plumbing-installations'
    ];

    for (const key of serviceKeys) {
      if (lowerPath.includes(key)) {
        return key;
      }
    }

    return '';
  })();

  // 3. RETRIEVE TOWN CONFIGURATION WITH FALLBACKS
  const isHomepage = location.pathname === '/' || location.pathname === '';
  const currentTownKey = isHomepage ? 'coalville' : detectedLocationSlug;
  const townData: Partial<TownData> = towns[currentTownKey] || towns['coalville'] || {};

  const displayLocation = isHomepage
    ? 'Coalville and Surrounding Areas'
    : (townData.name || currentTownKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));

  const customPhone = townData.phone || '01530 654 062';
  const landmark = townData.landmark || (isHomepage ? 'the Clock Tower' : 'the local town centre');
  const road = townData.road || (isHomepage ? 'Memorial Square' : 'main transport routes');
  const postcodes = townData.postcodes ? townData.postcodes.join(', ') : 'LE65 and LE67';

  const formatServiceTitle = (slug: string) => {
    if (!slug) return 'Plumbing & Heating';
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const displayService = formatServiceTitle(detectedServiceSlug);

  // 4. DYNAMIC IMAGE ROUTING FOR TOWN & SERVICE
  const normalizedService = detectedServiceSlug.toLowerCase();
  let images: string[] = [];

  if (isHomepage) {
    images = [
      '/team-photo.webp',
      '/emergency-plumber.webp',
      '/camera-survey.webp',
      '/leak-detection.webp',
      '/general-plumbing.webp',
      '/appliance-install.webp',
      '/vaillant-boiler.webp',
      '/boiler-install.webp',
    ];
  } else {
    if (normalizedService.includes('drain') || normalizedService.includes('cctv') || normalizedService.includes('unblock') || normalizedService.includes('toilet')) {
      images = [
        '/camera-survey.webp',
        '/drain-unblock.webp',
        '/drain-unblocking.webp',
        '/drainage-cctv-survey.webp',
        '/drain-unblocked.webp',
        '/blocked-drain.webp',
      ];
    } else if (normalizedService.includes('boiler') || normalizedService.includes('heat') || normalizedService.includes('gas')) {
      images = [
        '/team-photo.webp',
        '/boiler-repair.webp',
        '/boiler-install.webp',
        '/vaillant-boiler.webp',
      ];
    } else if (normalizedService.includes('leak')) {
      images = [
        '/leak-detection.webp',
        '/emergency-plumber.webp',
        '/general-plumbing.webp',
        '/team-photo.webp',
      ];
    } else if (normalizedService.includes('emergency')) {
      images = [
        '/emergency-plumber.webp',
        '/leak-detection.webp',
        '/general-plumbing.webp',
        '/team-photo.webp',
      ];
    } else if (normalizedService.includes('install') || normalizedService.includes('appliance')) {
      images = [
        '/appliance-install.webp',
        '/general-plumbing.webp',
        '/outside-tap-install.webp',
        '/kitchen-tap.webp',
      ];
    } else if (normalizedService.includes('plumb')) {
      images = [
        '/general-plumbing.webp',
        '/appliance-install.webp',
        '/emergency-plumber.webp',
        '/outside-tap-install.webp',
        '/kitchen-tap.webp',
      ];
    } else {
      images = [
        '/team-photo.webp',
        '/emergency-plumber.webp',
        '/camera-survey.webp',
        '/leak-detection.webp',
        '/general-plumbing.webp',
        '/appliance-install.webp',
      ];
    }

    if (currentTownKey.includes('hugglescote')) {
      images = ['/hugglescote-bear.webp', ...images];
    } else if (currentTownKey.includes('ashby')) {
      images = ['/ashby-de-la-zouch-rkm.webp', ...images];
    }
  }

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          
          {/* PHOTO SLIDESHOW: Always on top for mobile */}
          <div className="order-1 relative lg:pt-8">
            <Slideshow 
              images={images} 
              displayService={displayService} 
              displayLocation={displayLocation} 
            />

            {/* Decorative Offset Border */}
            <div className="absolute inset-0 border-2 border-[#A6892C] rounded-[2rem] -z-10 translate-x-4 translate-y-4 lg:mt-8 hidden lg:block transition-transform duration-500"></div>
          </div>

          {/* TEXT CONTENT */}
          <div className="order-2">
            <h2 className="text-xs sm:text-sm font-black text-[#A6892C] uppercase tracking-[0.2em] mb-2">
              About RKM Plumbing Heating &amp; Drainage Services
            </h2>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 sm:mb-6 tracking-tight">
              Trusted {displayService} Experts <br />
              <span className="text-[#A6892C] text-2xl sm:text-3xl md:text-4xl">in {displayLocation}</span>
            </h3>
            
            {/* SEO PARAGRAPH 1: Core Services & Authority */}
            <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed font-medium">
              RKM Plumbing Heating &amp; Drainage Services has been the premier choice for fast-response plumbing, Gas Safe boiler maintenance, and drainage in <strong>{displayLocation}</strong>. From high-efficiency <strong>boiler installs and emergency repairs</strong> to persistent <strong>blocked drains, CCTV surveys, and burst pipe repairs</strong>, our local engineers deliver fast, guaranteed solutions for domestic and commercial properties.
            </p>

            {/* SEO PARAGRAPH 2: Geographic Density & Response */}
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Whether you require urgent {displayService.toLowerCase()} assistance near <strong>{landmark}</strong>, are situated along <strong>{road}</strong>, or operate anywhere within the <strong>{postcodes}</strong> postcode districts, our team provides rapid 60-minute emergency callouts across <strong>{displayLocation}</strong> with transparent pricing and £0 call-out fees.
            </p>

            {/* CORE SERVICES QUICK BADGES */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              <div className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#A6892C] shrink-0" />
                <span className="text-xs font-bold text-slate-800">Boiler Installs &amp; Repairs</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
                <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-[#A6892C] shrink-0" />
                <span className="text-xs font-bold text-slate-800">Blocked Drains &amp; CCTV</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-[#A6892C] shrink-0" />
                <span className="text-xs font-bold text-slate-800">Emergency Pipe Repairs</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#A6892C] shrink-0" />
                <span className="text-xs font-bold text-slate-800">Full Plumbing Installs</span>
              </div>
            </div>
            
            {/* BULLET POINTS */}
            <ul className="space-y-2.5 mb-8">
              {RKM_GUARANTEES.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 group cursor-default">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#A6892C] shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-bold text-xs sm:text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CALL TO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href={`tel:${customPhone.replace(/\s+/g, '')}`} 
                className="inline-flex bg-[#A6892C] hover:bg-[#c4a030] text-slate-900 font-black text-base sm:text-lg py-3.5 px-6 rounded-xl items-center justify-center gap-2.5 shadow-md transition-all active:scale-95"
              >
                <Phone className="w-5 h-5 animate-pulse" />
                <span>Call {customPhone}</span>
              </a>

              <a 
                href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-slate-900 hover:bg-slate-800 text-white font-bold text-base sm:text-lg py-3.5 px-6 rounded-xl items-center justify-center gap-2.5 shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-5 h-5 text-[#A6892C]" />
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