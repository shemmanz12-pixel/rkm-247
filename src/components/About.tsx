'use client';

import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle,
  Phone,
  Calendar,
  Wrench,
  ShieldCheck,
  Flame,
  Droplets,
  Camera,
  Layers,
  Scissors,
  Search,
  Clock,
} from 'lucide-react';
import { towns, TownData } from '../townConfig';
import Slideshow from './slideshow';

const DEFAULT_GUARANTEES = [
  '24/7 Rapid Emergency Response (Within 60 Minutes)',
  'Boiler Installs, Repairs & Servicing with Finance Available',
  'Blocked Drains & HD CCTV Drain Surveys',
  'Full Plumbing Repairs & Sanitary Installs',
  'Gas Safe Registered Business (Reg #987039)',
  'Transparent Pricing with Zero Hidden Callout Fees',
];

const DRAINAGE_GUARANTEES = [
  '24/7 Rapid Emergency Drain Clearance (60–90 Minutes)',
  'High-Pressure Water Jetting & Internal Blockages',
  'HD CCTV Drain Surveys (Homebuyer, Insurance & Build-Over)',
  'Mechanical Root Cutting & Heavy Scale Descaling',
  'No-Dig Drain Relining & Stainless-Steel Rat Flaps',
  'Fixed Upfront Pricing with £0 Call-Out Fees',
];

const HEATING_GUARANTEES = [
  'Gas Safe Registered Engineers (Reg #987039)',
  'Combi Boiler Installs & Upgrades with Finance Available',
  'Fast Same-Day Boiler Breakdown Diagnostics & Repairs',
  'Annual Boiler Servicing & Landlord CP12 Certificates',
  'Radiator Repairs, Balancing & System Power Flushing',
  'Transparent Pricing with £0 Call-Out Fees',
];

const EMERGENCY_GUARANTEES = [
  '24/7 Rapid Emergency Dispatch (Within 60 Minutes)',
  'Burst Pipes, Active Water Leaks & Flood Prevention',
  'Failed Stopcocks, Isolation Valves & Pipe Repairs',
  'Urgent Overflowing Toilets & Blocked Waste Pipes',
  'Gas Safe Registered & Fully Insured Local Engineers',
  'Clear Upfront Pricing with £0 Call-Out Fees',
];

const LEAK_GUARANTEES = [
  'Non-Destructive Thermal Imaging & Acoustic Tracing',
  'Hidden Floor, Wall & Underground Pipe Leak Detection',
  'Detailed Insurance-Approved Trace & Access Reports',
  'Same-Day Pipework Repair & System Pressure Testing',
  'Minimal Disruption to Floors, Tiles & Decor',
  'Transparent Pricing with £0 Call-Out Fees',
];

interface AboutProps {
  townSlug?: string;
  serviceSlug?: string;
}

const About = ({ townSlug: propTownSlug, serviceSlug: propServiceSlug }: AboutProps) => {
  const params = useParams<{
    serviceSlug?: string;
    townSlug?: string;
    service?: string;
    town?: string;
    slug?: string;
  }>();
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
      'emergency-plumbing',
      'emergency-repairs',
      'heating-engineer',
      'central-heating-repairs',
      'boiler-installs',
      'drain-unblocking',
      'cctv-drain-surveys',
      'drain-relining',
      'drain-root-cutting',
      'blocked-toilet',
      'local-plumber',
      'leak-detection',
      'plumbing-installations',
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
    : townData.name ||
      currentTownKey
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

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
  const normalizedService = detectedServiceSlug.toLowerCase();

  const isDrainage =
    !isHomepage &&
    (normalizedService.includes('drain') ||
      normalizedService.includes('cctv') ||
      normalizedService.includes('unblock') ||
      normalizedService.includes('toilet'));
  const isHeating =
    !isHomepage &&
    (normalizedService.includes('boiler') ||
      normalizedService.includes('heat') ||
      normalizedService.includes('gas') ||
      normalizedService.includes('radiator'));
  const isLeak =
    !isHomepage && (normalizedService.includes('leak') || normalizedService.includes('trace'));
  const isEmergency =
    !isHomepage &&
    !isDrainage &&
    (normalizedService.includes('emergency') || normalizedService.includes('burst'));

  // 4. DYNAMIC IMAGE ROUTING FOR TOWN & SERVICE
  let images: string[] = [];

  if (isHomepage) {
    images = [
      '/emergency-plumber.webp',
      '/vaillant-boiler.webp',
      '/boiler-install.webp',
      '/drainage-cctv-survey.webp',
      '/kitchen-tap.webp',
    ];
  } else {
    if (isDrainage) {
      images = [
        '/camera-survey.webp',
        '/drain-unblock.webp',
        '/drain-unblocking.webp',
        '/drainage-cctv-survey.webp',
        '/drain-unblocked.webp',
        '/blocked-drain.webp',
      ];
    } else if (isHeating) {
      images = [
        '/team-photo.webp',
        '/boiler-repair.webp',
        '/boiler-install.webp',
        '/vaillant-boiler.webp',
      ];
    } else if (isLeak) {
      images = [
        '/leak-detection.webp',
        '/emergency-plumber.webp',
        '/general-plumbing.webp',
        '/team-photo.webp',
      ];
    } else if (isEmergency) {
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

  // 5. SERVICE-SPECIFIC BADGES & GUARANTEES
  const quickBadges = isDrainage
    ? [
        { icon: Droplets, label: 'High-Pressure Jetting' },
        { icon: Camera, label: 'HD CCTV Drain Surveys' },
        { icon: Layers, label: 'No-Dig Drain Relining' },
        { icon: Scissors, label: 'Root Cutting & Descaling' },
      ]
    : isHeating
    ? [
        { icon: Flame, label: 'Boiler Installs & Finance' },
        { icon: Wrench, label: 'Breakdown Diagnostics' },
        { icon: Droplets, label: 'Radiators & Power Flush' },
        { icon: ShieldCheck, label: 'Gas Safe Reg #987039' },
      ]
    : isEmergency
    ? [
        { icon: Clock, label: '60-Min Rapid Dispatch' },
        { icon: Droplets, label: 'Burst Pipes & Leaks' },
        { icon: Wrench, label: 'Stopcocks & Isolation' },
        { icon: ShieldCheck, label: '24/7 Make-Safe Repairs' },
      ]
    : isLeak
    ? [
        { icon: Search, label: 'Thermal Imaging Trace' },
        { icon: ShieldCheck, label: 'Non-Destructive Access' },
        { icon: CheckCircle, label: 'Insurance Leak Reports' },
        { icon: Wrench, label: 'Same-Day Pipe Repairs' },
      ]
    : [
        { icon: Flame, label: 'Boiler Installs & Repairs' },
        { icon: Droplets, label: 'Blocked Drains & CCTV' },
        { icon: Wrench, label: 'Emergency Pipe Repairs' },
        { icon: ShieldCheck, label: 'Full Plumbing Installs' },
      ];

  const activeGuarantees = isDrainage
    ? DRAINAGE_GUARANTEES
    : isHeating
    ? HEATING_GUARANTEES
    : isEmergency
    ? EMERGENCY_GUARANTEES
    : isLeak
    ? LEAK_GUARANTEES
    : DEFAULT_GUARANTEES;

  const headingServiceLabel = isDrainage ? 'Drainage & Unblocking' : displayService;

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          {/* PHOTO SLIDESHOW: Always on top for mobile */}
          <div className="order-1 relative lg:pt-8">
            <Slideshow
              images={images}
              displayService={headingServiceLabel}
              displayLocation={displayLocation}
            />

            {/* Decorative Offset Border */}
            <div className="absolute inset-0 border-2 border-[#A6892C] rounded-[2rem] -z-10 translate-x-4 translate-y-4 lg:mt-8 hidden lg:block transition-transform duration-500"></div>
          </div>

          {/* TEXT CONTENT */}
          <div className="order-2">
            <h2 className="text-xs sm:text-sm font-black text-[#A6892C] uppercase tracking-[0.2em] mb-2">
              {isDrainage
                ? 'About RKM Drainage Services'
                : 'About RKM Plumbing Heating & Drainage Services'}
            </h2>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 sm:mb-6 tracking-tight">
              Trusted {headingServiceLabel} Experts <br />
              <span className="text-[#A6892C] text-2xl sm:text-3xl md:text-4xl">
                in {displayLocation}
              </span>
            </h3>

            {/* SEO PARAGRAPH 1: Service-Specific Authority */}
            {isDrainage ? (
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed font-medium">
                RKM Drainage Services is the trusted local choice for 24/7 <strong>blocked drains, high-pressure water jetting, and structural drain repairs</strong> in <strong>{displayLocation}</strong>. From overflowing outdoor manholes and stubborn <strong>internal toilet or sink blockages</strong> to <strong>HD CCTV drain surveys, mechanical root cutting, and no-dig drain relining</strong>, our local engineers carry full specialist equipment on board.
              </p>
            ) : isHeating ? (
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed font-medium">
                RKM Plumbing Heating &amp; Drainage Services is a <strong>Gas Safe registered (#987039)</strong> specialist for <strong>boiler installations, emergency breakdowns, and central heating repairs</strong> in <strong>{displayLocation}</strong>. From high-efficiency combi upgrades with finance available to cold radiators, pressure loss, and full system power flushing, our local engineers keep homes and commercial premises warm all year round.
              </p>
            ) : isEmergency ? (
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed font-medium">
                RKM Plumbing Heating &amp; Drainage Services provides rapid <strong>24/7 emergency plumbing</strong> across <strong>{displayLocation}</strong>. Whether you are dealing with a <strong>burst pipe, active water leak, failed stopcock, or overflowing toilet</strong>, our local engineers arrive fast to isolate the fault, prevent water damage, and complete a permanent repair.
              </p>
            ) : isLeak ? (
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed font-medium">
                RKM Plumbing Heating &amp; Drainage Services provides non-destructive <strong>water leak detection and trace &amp; access</strong> across <strong>{displayLocation}</strong>. Using <strong>thermal imaging cameras and acoustic equipment</strong>, we pinpoint hidden leaks beneath floors and behind walls accurately, providing insurance-approved reports and same-day pipe repairs.
              </p>
            ) : (
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed font-medium">
                RKM Plumbing Heating &amp; Drainage Services has been the premier choice for fast-response plumbing, Gas Safe boiler maintenance, and{' '}
                <Link
                  to={`/drain-unblocking/${currentTownKey}/`}
                  className="font-bold text-slate-900 underline decoration-[#A6892C] decoration-2 underline-offset-2 hover:text-[#A6892C] transition-colors"
                >
                  drain unblocking in {isHomepage ? 'Coalville' : displayLocation}
                </Link>
                . From high-efficiency <strong>boiler installs and emergency repairs</strong> to persistent{' '}
                <strong>blocked drains, CCTV surveys, and burst pipe repairs</strong>, our local engineers deliver fast, guaranteed solutions for domestic and commercial properties.
              </p>
            )}

            {/* SEO PARAGRAPH 2: Geographic Density & Response */}
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Whether you require urgent {headingServiceLabel.toLowerCase()} assistance near{' '}
              <strong>{landmark}</strong>, are situated along <strong>{road}</strong>, or operate anywhere within the{' '}
              <strong>{postcodes}</strong> postcode districts, our team provides rapid{' '}
              {isDrainage ? '60–90 minute' : '60-minute'} emergency callouts across{' '}
              <strong>{displayLocation}</strong> with fixed transparent pricing and £0 call-out fees.
            </p>

            {/* CORE SERVICES QUICK BADGES */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {quickBadges.map((badge, idx) => {
                const BadgeIcon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-sm"
                  >
                    <BadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#A6892C] shrink-0" />
                    <span className="text-xs font-bold text-slate-800">{badge.label}</span>
                  </div>
                );
              })}
            </div>

            {/* BULLET POINTS */}
            <ul className="space-y-2.5 mb-8">
              {activeGuarantees.map((item, index) => (
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