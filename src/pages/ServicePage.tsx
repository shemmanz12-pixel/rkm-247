import { useEffect, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Zap,
  Clock,
  Shield,
  CheckCircle2,
  ArrowRight,
  Phone,
  Wrench,
} from 'lucide-react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Reviews from '../components/Reviews';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

import { towns } from '../townConfig';
import { serviceContent } from '../data/serviceData';

const DRAINAGE_SERVICE_KEYS = new Set([
  'drain-unblocking',
  'blocked-drain-clearing',
  'emergency-drain-unblocking',
  'blocked-toilet',
  'outside-drain-unblocking',
  'cctv-drain-surveys',
  'drain-relining',
  'drain-root-cutting',
]);

const HEATING_SERVICE_KEYS = new Set([
  'heating',
  'heating-repairs',
  'central-heating',
  'central-heating-repairs',
  'radiator-repairs',
  'boiler-installs',
  'heating-engineer',
]);

const EMERGENCY_SERVICE_KEYS = new Set([
  'emergency-plumber',
  'emergency-plumbing',
  'emergency-repairs',
  '24-7-plumber',
  'burst-pipe-repair',
]);

const LEAK_SERVICE_KEYS = new Set([
  'leak-detection',
  'water-leak-detection',
  'trace-and-access',
  'hidden-leak-detection',
]);

const ServicePage = () => {
  const { serviceSlug, townSlug } = useParams<{ serviceSlug: string; townSlug: string }>();
  const location = useLocation();

  let cleanTownKey = (townSlug || '').toLowerCase().trim();
  let cleanServiceKey = (serviceSlug || '').toLowerCase().trim();

  if (location.pathname) {
    const segments = location.pathname.toLowerCase().split('/').filter(Boolean);

    if (segments.length === 1) {
      if (towns[segments[0]]) {
        cleanTownKey = segments[0];
      }
      cleanServiceKey = 'emergency-plumber';
    } else if (segments.length >= 2) {
      cleanServiceKey = segments[0];
      cleanTownKey = segments[1];
    }
  }

  if (!cleanTownKey || cleanTownKey === 'index.html') {
    cleanTownKey = 'coalville';
  }
  if (!cleanServiceKey) {
    cleanServiceKey = 'emergency-plumber';
  }

  const town = towns[cleanTownKey] || towns['coalville'] || {};
  const service = serviceContent[cleanServiceKey] || serviceContent['emergency-plumber'];

  const townName =
    town.name ||
    cleanTownKey
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  const landmark = town.landmark || 'the local area';
  const road = town.road || 'main access routes';
  const postcodes = town.postcodes?.length ? town.postcodes.join(', ') : 'LE65, LE67';

  const isDrainagePage = DRAINAGE_SERVICE_KEYS.has(cleanServiceKey);
  const isHeatingPage = HEATING_SERVICE_KEYS.has(cleanServiceKey);
  const isEmergencyPage = EMERGENCY_SERVICE_KEYS.has(cleanServiceKey);
  const isLeakPage = LEAK_SERVICE_KEYS.has(cleanServiceKey);

  const canonicalUrl = `https://rkm247.co.uk/${cleanServiceKey}/${cleanTownKey}/`;
  const rawPhone = town.phone || '01530 654 062';
  const cleanPhone = rawPhone.replace(/\s+/g, '');

  // --- SEO FIX 1: HIGH-CTR DYNAMIC PAGE TITLES ---
  const pageTitle = isEmergencyPage
    ? `24/7 Emergency Plumber ${townName} | 60 Min Response | RKM`
    : isLeakPage
    ? `Leak Detection ${townName} | Trace & Access Experts | RKM`
    : isDrainagePage
    ? `Blocked Drains & Drain Unblocking ${townName} | Fixed Rates 24/7`
    : isHeatingPage
    ? `Heating Engineer ${townName} | Boiler Repairs & Installs | RKM`
    : `Local Plumber in ${townName} | 24/7 Emergency Repairs | RKM`;

  // --- SEO FIX 2: CTR-FOCUSED META DESCRIPTIONS ---
  const metaDesc = isDrainagePage
    ? `24/7 blocked drains & drain unblocking in ${townName} (${postcodes}). High-pressure jetting, HD CCTV drain surveys, root cutting & no-dig relining. £0 call-out fee. Call ${rawPhone}.`
    : town.description ||
      (isEmergencyPage
        ? `Need an emergency plumber in ${townName}? 24/7 fast response in 60 mins across ${postcodes}. Burst pipes, leaks & urgent repairs. No call out fee. Call ${rawPhone}.`
        : isLeakPage
        ? `Expert leak detection in ${townName}. We trace hidden water leaks in floors & walls fast across ${postcodes}. Fully insured engineers. No call out fee. Call ${rawPhone}.`
        : isHeatingPage
        ? `Reliable heating engineers in ${townName}. Central heating repairs, radiator faults & boiler issues across ${postcodes}. £0 call out fee. Call ${rawPhone}.`
        : `Trusted local plumbers in ${townName} covering ${postcodes} near ${landmark}. 24/7 emergency response, leak fixes & heating. No call out fee. Call ${rawPhone}.`);

  const introLead = isDrainagePage
    ? `24/7 blocked drains, high-pressure water jetting, HD CCTV drain surveys, mechanical root cutting, no-dig drain relining, and internal blockage clearance across ${townName} and ${postcodes}.`
    : isHeatingPage
    ? `Professional ${service.title.toLowerCase()} in ${townName} for central heating faults, radiator problems, no heating, low pressure and hot water issues across ${postcodes}.`
    : isEmergencyPage
    ? `Fast ${service.title.toLowerCase()} in ${townName} for burst pipes, urgent leaks, blocked toilets, no water and emergency plumbing repairs across ${postcodes}.`
    : isLeakPage
    ? `Professional ${service.title.toLowerCase()} in ${townName} for hidden water leaks, damp-related plumbing issues, pipework faults and trace and access support across ${postcodes}.`
    : `Providing expert plumbing across ${townName}, covering ${road} and all surrounding ${postcodes} areas.`;

  const bodyParagraphs = useMemo(() => {
    if (isDrainagePage) {
      return [
        `We provide specialist drain unblocking and drainage repairs in ${townName}, helping homeowners, landlords and commercial sites with blocked outdoor drains, overflowing manholes, internal toilet and sink blockages, and recurring drainage faults.`,
        `Beyond emergency high-pressure water jetting, our engineers carry HD CCTV drain survey cameras, mechanical root cutting heads, and no-dig drain relining equipment. We regularly resolve tree root intrusion, cracked clay and pitch fibre pipes, and rodent entry points near ${landmark}, across ${road}, and throughout ${postcodes}.`,
        `Whether you need urgent 60–90 minute drain clearance, a homebuyer or Severn Trent build-over CCTV survey, or an insurance-ready drain repair quote, we operate across ${townName} with fixed upfront pricing and £0 call-out fees.`,
      ];
    }

    if (isHeatingPage) {
      return [
        `We provide professional ${service.title.toLowerCase()} in ${townName}, helping homeowners, landlords and businesses with central heating breakdowns, cold radiators, circulation issues, low pressure and loss of heating or hot water.`,
        `Common heating problems in ${townName} include radiators not warming properly, pressure loss, thermostat faults, noisy pipework and system performance issues. We attend properties near ${landmark}, across ${road}, and throughout ${postcodes}.`,
        `As a local business, we provide fast response across ${townName} and surrounding areas with £0 call out fees and a strong focus on reliable local heating repairs.`,
      ];
    }

    if (isEmergencyPage) {
      return [
        `We provide fast ${service.title.toLowerCase()} in ${townName}, helping homeowners, landlords and businesses with burst pipes, severe leaks, blocked toilets, no water, overflowing fittings and urgent plumbing faults.`,
        `Common emergency callouts in ${townName} include burst pipes, active leaks, failed stop taps, blocked waste pipes and sudden plumbing breakdowns. We attend properties near ${landmark}, across ${road}, and throughout ${postcodes}.`,
        `As a local business, we provide fast response across ${townName} and surrounding areas with £0 call out fees and a strong focus on making properties safe quickly.`,
      ];
    }

    if (isLeakPage) {
      return [
        `We provide professional ${service.title.toLowerCase()} in ${townName}, helping homeowners, landlords and businesses find hidden water leaks, plumbing leaks and pipework issues before they cause further damage.`,
        `Common leak problems in ${townName} include hidden leaks under floors, damp patches, unexplained water loss, stained walls, low pressure and suspected pipework faults. We attend properties near ${landmark}, across ${road}, and throughout ${postcodes}.`,
        `As a local business, we provide fast response across ${townName} and surrounding areas with £0 call out fees and a strong focus on reliable fault finding and repair.`,
      ];
    }

    if (town.authorityParagraphs?.length) {
      return town.authorityParagraphs;
    }

    return [
      `Our engineers are local to the ${townName} area, meaning we can attend plumbing and heating issues near ${landmark} quickly and efficiently.`,
      `We cover properties across ${postcodes} and surrounding areas, providing reliable workmanship, clear pricing and fast response.`,
    ];
  }, [
    isDrainagePage,
    isHeatingPage,
    isEmergencyPage,
    isLeakPage,
    service.title,
    townName,
    landmark,
    road,
    postcodes,
    town.authorityParagraphs,
  ]);

  const nearbyLinks = useMemo(() => {
    const currentPrefix = town.postcodes?.[0]?.split(' ')[0] || 'LE67';

    return Object.entries(towns)
      .filter(([, t]) => t.name !== town.name && t.postcodes?.some((pc) => pc.startsWith(currentPrefix)))
      .slice(0, 6)
      .map(([slug, t]) => ({
        slug,
        name: `Local Plumber ${t.name}`,
        url: `/${cleanServiceKey}/${slug}/`,
      }));
  }, [town.name, town.postcodes, cleanServiceKey]);

  const supportingHubLinks = useMemo(() => {
    const links = [];
    const firstPostcode = town.postcodes?.[0] || 'LE67';
    const areaCode = firstPostcode.substring(0, 2);

    let hubName = ' Leicestershire';
    if (areaCode === 'DE') hubName = 'South Derbyshire';
    if (areaCode === 'B7' || areaCode === 'CV') hubName = 'Tamworth & Warwickshire';
    if (firstPostcode.startsWith('LE11') || firstPostcode.startsWith('LE12')) hubName = 'Loughborough District';

    const hubSlug = hubName.toLowerCase().replace(/\s+/g, '-').replace('&', 'and');

    if (isDrainagePage) links.push({ name: `Drain Unblocking ${hubName}`, url: `/drain-unblocking/${hubSlug}/` });
    if (isHeatingPage) links.push({ name: `Central Heating Repairs ${hubName}`, url: `/central-heating-repairs/${hubSlug}/` });
    if (isEmergencyPage) links.push({ name: `Emergency Repairs ${hubName}`, url: `/emergency-repairs/${hubSlug}/` });
    if (isLeakPage) links.push({ name: `Leak Detection ${hubName}`, url: `/leak-detection/${hubSlug}/` });

    return links;
  }, [isDrainagePage, isHeatingPage, isEmergencyPage, isLeakPage, town.postcodes]);

  const schemaPhone = town.phone
    ? `+44${town.phone.replace(/^0/, '').replace(/\s+/g, '')}`
    : '+441530654062';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'PlumbingService'],
        '@id': 'https://rkm247.co.uk/#business',
        name: 'RKM Plumbing Heating & Drainage Services',
        url: 'https://rkm247.co.uk/',
        logo: 'https://rkm247.co.uk/logo-square.webp',
        image: 'https://rkm247.co.uk/team-photo.webp',
        telephone: schemaPhone,
        priceRange: '££',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Hodgetts Street',
          addressLocality: 'Coalville',
          addressRegion: 'Leicestershire',
          postalCode: 'LE67 2JH',
          addressCountry: 'GB',
        },
        areaServed: [{ '@type': 'Place', name: townName }],
        sameAs: [
          'https://share.google/3XtXaKCXHVDlgzSLh',
          'https://www.yell.com/biz/rkm-plumbing-and-heating-services-ltd-coalville-100007379/',
          'https://www.checkatrade.com/trades/rkmplumbingandheatingservices',
          'https://www.thomsonlocal.com/search/plumbers/burton-loughborough/rkm-plumbing-heating-services/3496846/01530654062',
          'https://118businessdirectory.co.uk/listing/rkm-plumbing-heating-services-ltd',
        ],
      },
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: isDrainagePage
          ? `Blocked Drains & Drain Unblocking in ${townName}`
          : `${service.title} in ${townName}`,
        serviceType: isDrainagePage ? 'Drainage Service' : service.title,
        url: canonicalUrl,
        description: metaDesc,
        provider: {
          '@id': 'https://rkm247.co.uk/#business',
        },
        areaServed: {
          '@type': 'Place',
          name: townName,
        },
        ...(isDrainagePage && {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Drainage Services in ${townName}`,
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Drain Unblocking & High-Pressure Jetting' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HD CCTV Drain Surveys & Build-Over Inspections' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'No-Dig Drain Relining & Patch Repairs' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mechanical Root Cutting & Pipe Descaling' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Internal Toilet, Sink & Shower Blockage Clearance' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rat Flaps & Rodent Drain Investigations' } },
            ],
          },
        }),
        availableChannel: {
          '@type': 'ServiceChannel',
          servicePhone: {
            '@type': 'ContactPoint',
            telephone: schemaPhone,
            contactType: 'customer service',
            areaServed: townName,
          },
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: metaDesc,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://rkm247.co.uk/#website',
          url: 'https://rkm247.co.uk/',
          name: 'RKM Plumbing Heating & Drainage Services',
        },
        about: {
          '@id': `${canonicalUrl}#service`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://rkm247.co.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: service.title,
            item: `https://rkm247.co.uk/${cleanServiceKey}/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: townName,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [cleanServiceKey, cleanTownKey]);

  const commonProblemsList = isDrainagePage
    ? [
        'Blocked outside drains, manholes & gullies (High-Pressure Jetting)',
        'Internal blockages: toilets, sinks, baths & slow showers',
        'Tree root intrusion & heavy scale (Mechanical Root Cutting)',
        'Cracked clay & pitch fibre pipes (No-Dig Drain Relining)',
        'Homebuyer, insurance & Severn Trent build-over CCTV surveys',
        'Rodent drain entry investigations & stainless-steel rat flaps',
      ]
    : isHeatingPage
    ? [
        'Radiators not heating properly',
        'Low boiler pressure and poor circulation',
        'Cold spots on radiators',
        'No heating or no hot water',
        'Noisy pipes and system issues',
        'Thermostat and heating control faults',
      ]
    : isEmergencyPage
    ? [
        'Burst pipes and major leaks',
        'Overflowing toilets and blocked waste pipes',
        'No water or loss of supply',
        'Faulty stop taps and isolation issues',
        'Urgent leaks under sinks or from pipework',
        'Water damage risk from active plumbing faults',
      ]
    : isLeakPage
    ? [
        'Hidden leaks under floors',
        'Leaks behind walls and boxed-in pipework',
        'Damp patches and staining',
        'Unexplained water usage or pressure loss',
        'Musty smells linked to hidden moisture',
        'Suspected pipework faults and trace and access needs',
      ]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />

        {/* SEO FIX 3: OpenGraph Social Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://rkm247.co.uk/team-photo.webp" />

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* 1. HEADER */}
      <Header customPhone={town.phone} />

      <main className="flex-grow">
        {/* 1. HERO */}
        <Hero town={cleanTownKey} service={cleanServiceKey} />

        {/* 2. SERVICES */}
        <section id="services" className="scroll-mt-20">
          <section className="py-4 bg-slate-900 text-white overflow-hidden">
            <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 text-[10px] md:text-xs font-black uppercase tracking-widest">
              <div className="flex items-center gap-2 text-[#A6892C]">
                <MapPin className="w-4 h-4" /> Serving {townName}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A6892C]" /> 60 Min Arrival
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#A6892C]" /> Same Day Service
              </div>
            </div>
          </section>

          <div className="-mx-4 sm:mx-0">
            <Services currentLocation={cleanTownKey} isDrainage={isDrainagePage} />
          </div>
        </section>

        {/* 3. ABOUT */}
        <section id="about" className="scroll-mt-20">
          <About />
        </section>

        {/* Service details and local SEO content (Styled to match Services.tsx) */}
        <section className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-b border-slate-200/80">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* INTRO CARD */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6892C] bg-[#A6892C]/10 px-3 py-1 rounded-full mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Local {townName} Specialists</span>
              </div>

              {/* Demoted to h2 so Hero.tsx holds the sole h1 on the page */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                {isDrainagePage ? 'Blocked Drains & Drain Unblocking' : service.title}{' '}
                <span className="text-[#A6892C]">in {townName}</span>
              </h2>

              <div className="bg-[#FAF8F5] border-l-4 border-[#A6892C] rounded-r-2xl p-5 mb-6">
                <p className="font-bold text-base sm:text-lg text-slate-800 leading-relaxed">
                  {introLead}
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {bodyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* COMMON PROBLEMS GRID */}
            {commonProblemsList.length > 0 && (
              <div className="mb-10">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6892C] bg-[#A6892C]/10 px-3 py-1 rounded-full mb-2">
                    <span>Fast Local Solutions</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {isDrainagePage
                      ? 'Common Drain Problems We Fix'
                      : isHeatingPage
                      ? 'Common Central Heating Problems'
                      : isEmergencyPage
                      ? 'Common Emergency Plumbing Problems'
                      : 'Common Leak Detection Problems'}{' '}
                    <span className="text-[#A6892C]">in {townName}</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {commonProblemsList.map((problem, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200/90 hover:border-[#A6892C] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#A6892C]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-[#A6892C]" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                        {problem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHAT CAUSES SECTION */}
            {(isDrainagePage || isHeatingPage || isEmergencyPage || isLeakPage) && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm mb-10">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-full bg-slate-900 text-[#A6892C] flex items-center justify-center shrink-0 shadow-sm">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {isDrainagePage
                      ? 'What Causes Drains to Block'
                      : isHeatingPage
                      ? 'What Causes Heating Problems'
                      : isEmergencyPage
                      ? 'What Causes Emergency Plumbing Issues'
                      : 'What Causes Hidden Leaks'}{' '}
                    <span className="text-[#A6892C]">in {townName}</span>
                  </h2>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {isDrainagePage && (
                    <>
                      <p>
                        Common causes of blocked drains in {townName} include fat and grease build-up, wet wipes, limescale, silt, and tree root ingress into older clay and pitch fibre drainage pipes.
                      </p>
                      <p>
                        We regularly attend recurring blockages near {landmark}, along {road}, and across {postcodes}. Where ground movement or root damage has cracked a pipe, we can inspect it with our HD CCTV camera, cut out the roots mechanically, and install a permanent no-dig patch or full-length drain liner without excavating your driveway or garden.
                      </p>
                      <p>
                        If your outside drain keeps blocking, your toilet backs up, or you suspect a broken pipe, fast local jetting and CCTV diagnostics can solve the root cause before it leads to costly property damage.
                      </p>
                    </>
                  )}

                  {isHeatingPage && (
                    <>
                      <p>
                        Common causes of central heating problems in {townName} include trapped air in radiators, circulation faults, pressure loss, sludge build-up, faulty valves, thermostat issues and general wear in the heating system.
                      </p>
                      <p>
                        We regularly attend heating faults near {landmark}, along {road}, and across {postcodes}, where poor radiator performance, heating breakdowns and low system pressure can affect comfort and reliability.
                      </p>
                      <p>
                        If your radiators stay cold, your boiler keeps losing pressure, or you have no heating or hot water, fast local heating repairs can often restore the system before the fault becomes more serious.
                      </p>
                    </>
                  )}

                  {isEmergencyPage && (
                    <>
                      <p>
                        Common causes of emergency plumbing problems in {townName} include burst or split pipes, failed joints, worn fittings, severe blockages, failed valves and leaks that worsen suddenly and start causing damage.
                      </p>
                      <p>
                        We regularly attend urgent plumbing problems near {landmark}, along {road}, and across {postcodes}, where active leaks and overflowing fittings need a fast local response to reduce property damage.
                      </p>
                      <p>
                        If you have a burst pipe, severe leak, blocked toilet overflow or another urgent plumbing problem, quick emergency repairs can make the property safe and limit disruption.
                      </p>
                    </>
                  )}

                  {isLeakPage && (
                    <>
                      <p>
                        Common causes of hidden leaks in {townName} include worn pipework, failed fittings, small joint failures, corrosion, movement in older plumbing systems and leaks concealed beneath floors or behind walls.
                      </p>
                      <p>
                        We regularly attend suspected hidden leaks near {landmark}, along {road}, and across {postcodes}, where damp patches, staining, pressure loss and unexplained water issues suggest a plumbing fault that needs tracing.
                      </p>
                      <p>
                        If you suspect a hidden leak in your property, fast local leak detection can help identify the problem early and reduce unnecessary damage and repair costs.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* AREA EXPERTISE & VERIFIED LOCAL SERVICE (2-COL CARDS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-[#A6892C] flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-wide">
                    Area Expertise
                  </h2>
                </div>
                <ul className="divide-y divide-slate-100 text-sm">
                  <li className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Housing Style</span>
                    <span className="font-bold text-slate-900 text-right">{town.propertyAgeProfile || 'Mixed Residential'}</span>
                  </li>
                  <li className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Ground Conditions</span>
                    <span className="font-bold text-slate-900 text-right">{town.soilType || 'Local Clay/Soil'}</span>
                  </li>
                  <li className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Coverage</span>
                    <span className="font-bold text-[#A6892C] text-right">{postcodes}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#A6892C] text-slate-950 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-wide">
                    Verified Local Service
                  </h2>
                </div>
                <ul className="divide-y divide-slate-100 text-sm">
                  <li className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500 shrink-0">Common Callouts</span>
                    <span className="font-bold text-slate-900 text-right">
                      {isDrainagePage
                        ? 'Blocked drains, CCTV surveys, root cutting & relining'
                        : isHeatingPage
                        ? 'Cold radiators, low pressure, no heating'
                        : isEmergencyPage
                        ? 'Burst pipes, urgent leaks, overflowing toilets'
                        : isLeakPage
                        ? 'Hidden leaks, damp patches, pressure loss'
                        : town.commonProblems?.slice(0, 2).join(', ') || 'Leaks & Blockages'}
                    </span>
                  </li>
                  <li className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Flood Risk</span>
                    <span className="font-bold text-slate-900 text-right">{town.floodRisk || 'Low'}</span>
                  </li>
                  <li className="py-3 flex justify-between gap-4">
                    <span className="font-semibold text-slate-500">Call Out Fee</span>
                    <span className="font-extrabold text-emerald-600 text-right">£0.00</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* DARK CONTRAST AREAS WE COVER + DIRECT CALL CTA */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6892C] bg-[#A6892C]/15 px-3 py-1 rounded-full mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Rapid Local Dispatch</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  Areas We Cover Near <span className="text-[#A6892C]">{townName}</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  We provide {service.title.toLowerCase()} across {townName} and surrounding areas, covering {postcodes}, close to {landmark} and along {road}.
                </p>
              </div>
              <a
                href={`tel:${cleanPhone}`}
                className="bg-[#A6892C] hover:bg-[#bfa03a] text-slate-950 font-extrabold py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2.5 shadow-sm transition-all shrink-0 active:scale-95"
              >
                <Phone className="w-4 h-4 fill-slate-950" />
                <span>Call {rawPhone}</span>
              </a>
            </div>

            {/* LOCAL PROBLEMS WE REGULARLY FIX & RECENT WORK (2-COL ON DESKTOP) */}
            {(isDrainagePage || isHeatingPage || isEmergencyPage || isLeakPage) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Local Problems We Fix in <span className="text-[#A6892C]">{townName}</span>
                  </h2>
                  <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                    {isDrainagePage && (
                      <>
                        <p>
                          We regularly help customers in {townName} with blocked outside drains, overflowing gullies, internal toilet and sink blockages, tree root intrusion, and cracked underground pipework.
                        </p>
                        <p>
                          From urgent high-pressure jetting to full HD CCTV drain surveys, mechanical root cutting, and no-dig drain relining, our local engineers handle the entire job from diagnosis to permanent repair.
                        </p>
                      </>
                    )}

                    {isHeatingPage && (
                      <>
                        <p>
                          We regularly help customers in {townName} with radiators not heating properly, low pressure, noisy heating systems, hot water issues and central heating faults affecting comfort and performance.
                        </p>
                        <p>
                          These are the kinds of heating searches people often make when they need urgent or same-day help, and they are exactly the kinds of local heating problems we deal with across {townName} and surrounding areas.
                        </p>
                      </>
                    )}

                    {isEmergencyPage && (
                      <>
                        <p>
                          We regularly help customers in {townName} with burst pipes, severe plumbing leaks, overflowing toilets, urgent blockages and other emergency repairs where fast local response is important.
                        </p>
                        <p>
                          These are the kinds of emergency plumbing searches people often make when they need urgent help, and they are exactly the kinds of local emergency repairs we deal with across {townName} and surrounding areas.
                        </p>
                      </>
                    )}

                    {isLeakPage && (
                      <>
                        <p>
                          We regularly help customers in {townName} with hidden leaks, damp patches, unexplained water loss, low pressure and suspected pipework faults that need tracing before more damage occurs.
                        </p>
                        <p>
                          These are the kinds of leak detection searches people often make when they need accurate local fault finding, and they are exactly the kinds of hidden leak problems we deal with across {townName} and surrounding areas.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Recent Local <span className="text-[#A6892C]">{service.title}</span> Work
                  </h2>
                  <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                    {isDrainagePage && (
                      <>
                        <p>
                          Recent local drainage jobs include emergency high-pressure jetting in {townName}, internal toilet and kitchen waste clearances near {landmark}, mechanical root cutting along {road}, and HD CCTV drain surveys with no-dig patch relining across {postcodes}.
                        </p>
                        <p>
                          Every drainage callout is backed by fixed upfront pricing, £0 call-out fees, and full video footage whenever a CCTV inspection is carried out.
                        </p>
                      </>
                    )}

                    {isHeatingPage && (
                      <>
                        <p>
                          Recent examples of local heating work include radiator faults in {townName}, low pressure issues near {landmark}, no-heating callouts along {road}, and same-day central heating repairs across {postcodes}.
                        </p>
                        <p>
                          Every heating callout is carried out by Gas Safe registered engineers with clear upfront pricing and £0 call-out fees.
                        </p>
                      </>
                    )}

                    {isEmergencyPage && (
                      <>
                        <p>
                          Recent examples of local emergency work include burst pipe repairs in {townName}, severe leaks near {landmark}, urgent toilet overflows along {road}, and same-day emergency plumber callouts across {postcodes}.
                        </p>
                        <p>
                          Our local engineers aim to attend urgent emergencies within 60 minutes to make your property safe quickly.
                        </p>
                      </>
                    )}

                    {isLeakPage && (
                      <>
                        <p>
                          Recent examples of local leak detection work include hidden leak tracing in {townName}, damp-related plumbing checks near {landmark}, low-pressure investigations along {road}, and same-day leak fault finding across {postcodes}.
                        </p>
                        <p>
                          We use non-destructive thermal and acoustic tracing to pinpoint leaks accurately and keep disruption to a minimum.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* WIDER AREA HUB & NEARBY AREAS */}
            {(supportingHubLinks.length > 0 || nearbyLinks.length > 0) && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                {(isDrainagePage || isHeatingPage || isEmergencyPage || isLeakPage) && supportingHubLinks.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">
                      Wider Area Service Hub
                    </h2>
                    <p className="text-sm text-slate-600 mb-4">
                      We also cover wider regions for this service. View the broader area hub below:
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {supportingHubLinks.map((link) => (
                        <Link
                          key={link.url}
                          to={link.url}
                          className="group flex items-center justify-between rounded-2xl bg-[#FAF8F5] border border-slate-200/90 hover:border-[#A6892C] px-5 py-4 font-bold text-slate-800 hover:text-[#A6892C] transition-all"
                        >
                          <span className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-[#A6892C]" />
                            {link.name}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A6892C] group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {nearbyLinks.length > 0 && (
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight">
                      Nearby <span className="text-[#A6892C]">{service.title}</span> Areas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {nearbyLinks.map((link) => (
                        <Link
                          key={link.slug}
                          to={link.url}
                          className="group flex items-center justify-between rounded-2xl bg-[#FAF8F5] border border-slate-200/90 hover:border-[#A6892C] px-5 py-3.5 text-sm font-bold text-slate-800 hover:text-[#A6892C] transition-all"
                        >
                          <span>
                            {service.title} {link.name}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A6892C] group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 4. REVIEWS */}
        <section id="reviews" className="scroll-mt-20">
          <Reviews townSlug={cleanTownKey} serviceSlug={cleanServiceKey} />
        </section>

        {/* 5. CONTACT SECTION */}
        <section id="contact" className="scroll-mt-20">
          <ContactSection
            townName={townName}
            serviceName={cleanServiceKey}
            customPhone={rawPhone}
          />
        </section>

        {/* 6. PROCESS */}
        <section id="process" className="scroll-mt-20">
          <Process />
        </section>

        {/* 7. FAQ */}
        <section id="faq" className="scroll-mt-20">
          <FAQ townSlug={cleanTownKey} serviceSlug={cleanServiceKey} />
        </section>

        {/* 8. MAP SECTION */}
        <section id="map" className="scroll-mt-20">
          <MapSection townSlug={cleanTownKey} serviceSlug={cleanServiceKey} />
        </section>
      </main>

      {/* 13. FOOTER */}
      <Footer
        customPhone={rawPhone}
        townName={townName}
        postcodeLabel={town.postcodes ? town.postcodes[0] : 'LE67 2JH'}
        roadName={road}
        serviceName={cleanServiceKey}
      />
    </div>
  );
};

export default ServicePage;