import { useEffect, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Zap, Clock, Shield } from 'lucide-react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import MapSection from '../components/MapSection';
import Process from '../components/Process';
import Services from '../components/Services';

import { towns } from '../townConfig';
import { serviceContent } from '../data/serviceData';
import About from '../components/About';

const DRAINAGE_SERVICE_KEYS = new Set([
  'drain-unblocking',
  'blocked-drain-clearing',
  'emergency-drain-unblocking',
  'blocked-toilet',
  'outside-drain-unblocking',
]);

const HEATING_SERVICE_KEYS = new Set([
  'heating',
  'heating-repairs',
  'central-heating',
  'central-heating-repairs',
  'radiator-repairs',
  'boiler-repairs',
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

  // 1. Convert any active router parameters to lowercase strings safely
  let cleanTownKey = (townSlug || '').toLowerCase().trim();
  let cleanServiceKey = (serviceSlug || '').toLowerCase().trim();

  // 2. ABSOLUTE URL PATH SCANNER:
  // Decodes the browser URL or the offline build path string into variables,
  // making it compatible with flat (/coalville) and nested layouts (/local-plumber/coalville).
  if (location.pathname) {
    const segments = location.pathname.toLowerCase().split('/').filter(Boolean);
    
    if (segments.length === 1) {
      // Handles flat layouts like /coalville/ or /ashby-de-la-zouch/
      if (towns[segments[0]]) {
        cleanTownKey = segments[0];
      }
      cleanServiceKey = 'emergency-plumber'; 
    } else if (segments.length >= 2) {
      // Handles nested layout routes like /emergency-plumber/coalville/
      cleanServiceKey = segments[0];
      cleanTownKey = segments[1];
    }
  }

  // 3. Fallback defaults if the path strings are missing
  if (!cleanTownKey || cleanTownKey === 'index.html') {
    cleanTownKey = 'coalville';
  }
  if (!cleanServiceKey) {
    cleanServiceKey = 'emergency-plumber';
  }

  // 4. Map values from your data configuration imports
  const town = towns[cleanTownKey] || towns['coalville'] || {};
  const service = serviceContent[cleanServiceKey] || serviceContent['emergency-plumber'];

  // Construct the proper town display name
  const townName = town.name || cleanTownKey
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const landmark = town.landmark || 'the local area';
  const road = town.road || 'main access routes';
  const postcodes = town.postcodes?.length ? town.postcodes.join(', ') : 'LE65, LE67';
  
  // FIXED: Use fallback for nearby area names
  const nearbyAreaNames = 'Coalville, Ashby-de-la-Zouch, Ibstock, Whitwick and surrounding areas';

  const isDrainagePage = DRAINAGE_SERVICE_KEYS.has(cleanServiceKey);
  const isHeatingPage = HEATING_SERVICE_KEYS.has(cleanServiceKey);
  const isEmergencyPage = EMERGENCY_SERVICE_KEYS.has(cleanServiceKey);
  const isLeakPage = LEAK_SERVICE_KEYS.has(cleanServiceKey);

  const canonicalUrl = `https://rkm247.co.uk/${cleanServiceKey}/${cleanTownKey}/`;

  const pageTitle = isDrainagePage
    ? `${service.title} in ${townName} | Blocked Drains & Outside Drains | RKM Plumbing`
    : isHeatingPage
    ? `${service.title} in ${townName} | Central Heating Repairs | RKM Plumbing`
    : isEmergencyPage
    ? `${service.title} in ${townName} | Fast Local Emergency Repairs | RKM Plumbing`
    : isLeakPage
    ? `${service.title} in ${townName} | Hidden Water Leak Detection | RKM Plumbing`
    : `${service.title} in ${townName} | RKM Plumbing & Heating`;

  const metaDesc =
    town.description ||
    (isDrainagePage
      ? `${service.title} in ${townName}. We clear blocked drains, sinks, toilets, showers and outside drains across ${postcodes}. Fast local response from RKM Plumbing & Heating with no call out fee.`
      : isHeatingPage
      ? `${service.title} in ${townName}. We fix central heating faults, radiator issues, low pressure and heating breakdowns across ${postcodes}. Fast local response with no call out fee.`
      : isEmergencyPage
      ? `${service.title} in ${townName}. Fast local emergency repairs for burst pipes, leaks, blocked toilets and urgent plumbing issues across ${postcodes}. No call out fee.`
      : isLeakPage
      ? `${service.title} in ${townName}. We locate hidden water leaks, damp-related plumbing issues and pipework faults across ${postcodes}. Fast local response with no call out fee.`
      : `${service.title} in ${townName}. Serving ${postcodes} near ${landmark}. 24/7 local response with no call out fee.`);

  const introLead = isDrainagePage
    ? `Professional ${service.title.toLowerCase()} in ${townName} for blocked drains, blocked toilets, blocked sinks, slow showers, gullies, manholes and outside drains across ${postcodes}.`
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
        `We provide professional ${service.title.toLowerCase()} in ${townName}, helping homeowners, landlords and businesses with blocked drains, blocked sinks, blocked toilets, overflowing gullies and outside drainage issues.`,
        `Common drainage problems in ${townName} include grease build-up, wipes, silt, waste pipe blockages, bad drain smells and recurring external drain problems. We attend properties near ${landmark}, across ${road}, and throughout ${postcodes}.`,
        `As a local business based near Coalville, we provide fast response across ${townName} and North West Leicestershire with £0 call out fees and a strong focus on reliable local service.`,
      ];
    }

    if (isHeatingPage) {
      return [
        `We provide professional ${service.title.toLowerCase()} in ${townName}, helping homeowners, landlords and businesses with central heating breakdowns, cold radiators, circulation issues, low pressure and loss of heating or hot water.`,
        `Common heating problems in ${townName} include radiators not warming properly, pressure loss, thermostat faults, noisy pipework and system performance issues. We attend properties near ${landmark}, across ${road}, and throughout ${postcodes}.`,
        `As a local business based near Coalville, we provide fast response across ${townName} and North West Leicestershire with £0 call out fees and a strong focus on reliable local heating repairs.`,
      ];
    }

    if (isEmergencyPage) {
      return [
        `We provide fast ${service.title.toLowerCase()} in ${townName}, helping homeowners, landlords and businesses with burst pipes, severe leaks, blocked toilets, no water, overflowing fittings and urgent plumbing faults.`,
        `Common emergency callouts in ${townName} include burst pipes, active leaks, failed stop taps, blocked waste pipes and sudden plumbing breakdowns. We attend properties near ${landmark}, across ${road}, and throughout ${postcodes}.`,
        `As a local business based near Coalville, we provide fast response across ${townName} and North West Leicestershire with £0 call out fees and a strong focus on making properties safe quickly.`,
      ];
    }

    if (isLeakPage) {
      return [
        `We provide professional ${service.title.toLowerCase()} in ${townName}, helping homeowners, landlords and businesses find hidden water leaks, plumbing leaks and pipework issues before they cause further damage.`,
        `Common leak problems in ${townName} include hidden leaks under floors, damp patches, unexplained water loss, stained walls, low pressure and suspected pipework faults. We attend properties near ${landmark}, across ${road}, and throughout ${postcodes}.`,
        `As a local business based near Coalville, we provide fast response across ${townName} and North West Leicestershire with £0 call out fees and a strong focus on reliable fault finding and repair.`,
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

 // 1. NEARBY LINKS (Auto-groups by matching Postcode Prefix)
  const nearbyLinks = useMemo(() => {
    
    const currentPrefix = town.postcodes[0].split(' ')[0]; 

    return Object.entries(towns)
      .filter(([, t]) => t.name !== town.name && t.postcodes.some(pc => pc.startsWith(currentPrefix)))
      .slice(0, 6)
      .map(([slug, t]) => ({
        slug,
        name: `Local Plumber ${t.name}`,
        url: `/${cleanServiceKey}/${slug}/`,
      }));
  }, [town.postcodes, cleanServiceKey]);

  // 2. HUB LINKS (Auto-generates Region based on Postcode Letters)
  const supportingHubLinks = useMemo(() => {
    const links = [];
    const areaCode = town.postcodes[0].substring(0, 2); // e.g., "LE", "DE", "B7"
    
    // Assign regions dynamically based on postcode area
    let hubName = 'North West Leicestershire';
    if (areaCode === 'DE') hubName = 'South Derbyshire';
    if (areaCode === 'B7' || areaCode === 'CV') hubName = 'Tamworth & Warwickshire';
    if (town.postcodes[0].startsWith('LE11') || town.postcodes[0].startsWith('LE12')) hubName = 'Loughborough District';
    
    const hubSlug = hubName.toLowerCase().replace(/\s+/g, '-').replace('&', 'and');

    if (isDrainagePage) links.push({ name: `Drain Unblocking ${hubName}`, url: `/drain-unblocking/${hubSlug}/` });
    if (isHeatingPage) links.push({ name: `Central Heating Repairs ${hubName}`, url: `/central-heating-repairs/${hubSlug}/` });
    if (isEmergencyPage) links.push({ name: `Emergency Repairs ${hubName}`, url: `/emergency-repairs/${hubSlug}/` });
    if (isLeakPage) links.push({ name: `Leak Detection ${hubName}`, url: `/leak-detection/${hubSlug}/` });

    return links;
  }, [isDrainagePage, isHeatingPage, isEmergencyPage, isLeakPage, town.postcodes]);
 
// Helper to format "01530 654 062" into "+441530654062" for Google Schema
  const schemaPhone = town.phone 
    ? `+44${town.phone.replace(/^0/, '').replace(/\s+/g, '')}` 
    : '+441530654062';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        "@type": ["LocalBusiness", "PlumbingService"],
        '@id': 'https://rkm247.co.uk/#business',
        name: 'RKM Plumbing & Heating Services LTD',
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
        areaServed: [
          { '@type': 'Place', name: 'North West Leicestershire' },
          { '@type': 'Place', name: townName },
        ],
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
        name: `${service.title} in ${townName}`,
        serviceType: service.title,
        url: canonicalUrl,
        description: metaDesc,
        provider: {
          '@id': 'https://rkm247.co.uk/#business',
        },
        areaServed: {
          '@type': 'Place',
          name: `${townName}, Leicestershire`,
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          servicePhone: {
            '@type': 'ContactPoint',
            telephone: schemaPhone,
            contactType: 'customer service',
            areaServed: `${townName}, Leicestershire`,
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
          name: 'RKM Plumbing & Heating Services LTD',
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
    // FIXED: Protect the build runner engine from crashing when window doesn't exist offline
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [cleanServiceKey, cleanTownKey]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />

        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* ✅ Added dynamic phone to Header */}
      <Header customPhone={town.phone} />
      
      <Hero town={cleanTownKey} service={cleanServiceKey} />

      <main className="flex-grow">
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

        <TrustBadges />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 uppercase leading-tight">
                {service.title} <span className="text-[#A6892C]">in {townName}</span>
              </h1>

              <div className="prose prose-lg text-gray-600 mb-12 max-w-none">
                <p className="font-bold text-xl text-slate-800 border-l-4 border-[#A6892C] pl-4 mb-6">
                  {introLead}
                </p>

                {bodyParagraphs.map((p, i) => (
                  <p key={i} className="mb-4">
                    {p}
                  </p>
                ))}
              </div>

              {isDrainagePage && (
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    Common Drain Problems in <span className="text-[#A6892C]">North West Leicestershire</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We regularly help customers with blocked drains and drainage problems across {townName} and wider North West Leicestershire, including:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Blocked outside drains and gullies</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Blocked toilets and slow flushing issues</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Blocked sinks and waste pipe build-up</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Slow shower and bath drainage</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Bad drain smells and recurring blockages</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Overflowing manholes and external drain issues</div>
                  </div>
                </section>
              )}

              {isDrainagePage && (
                <section className="mb-16 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    What Causes Drains to Block in <span className="text-[#A6892C]">{townName}</span>
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Common causes of blocked drains in {townName} include grease build-up, wet wipes, food waste, silt, leaves, scale, soap residue and general debris collecting in waste pipes and outside drains.
                    </p>
                    <p>
                      We regularly attend blocked drains near {landmark}, along {road}, and across {postcodes}, where recurring drainage issues are often caused by poor disposal habits, slow-flowing waste pipes or external gullies filling with debris.
                    </p>
                    <p>
                      If your outside drain keeps blocking, your toilet backs up, or your sink drains slowly, fast local drain unblocking can usually restore normal flow before the problem gets worse.
                    </p>
                  </div>
                </section>
              )}

              {isHeatingPage && (
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    Common Central Heating Problems in <span className="text-[#A6892C]">North West Leicestershire</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We regularly help customers with heating problems across {townName} and wider North West Leicestershire, including:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Radiators not heating properly</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Low boiler pressure and poor circulation</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Cold spots on radiators</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">No heating or no hot water</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Noisy pipes and system issues</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Thermostat and heating control faults</div>
                  </div>
                </section>
              )}

              {isHeatingPage && (
                <section className="mb-16 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    What Causes Heating Problems in <span className="text-[#A6892C]">{townName}</span>
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Common causes of central heating problems in {townName} include trapped air in radiators, circulation faults, pressure loss, sludge build-up, faulty valves, thermostat issues and general wear in the heating system.
                    </p>
                    <p>
                      We regularly attend heating faults near {landmark}, along {road}, and across {postcodes}, where poor radiator performance, heating breakdowns and low system pressure can affect comfort and reliability.
                    </p>
                    <p>
                      If your radiators stay cold, your boiler keeps losing pressure, or you have no heating or hot water, fast local heating repairs can often restore the system before the fault becomes more serious.
                    </p>
                  </div>
                </section>
              )}

              {isEmergencyPage && (
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    Common Emergency Plumbing Problems in <span className="text-[#A6892C]">North West Leicestershire</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We regularly help customers with urgent plumbing problems across {townName} and wider North West Leicestershire, including:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Burst pipes and major leaks</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Overflowing toilets and blocked waste pipes</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">No water or loss of supply</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Faulty stop taps and isolation issues</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Urgent leaks under sinks or from pipework</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Water damage risk from active plumbing faults</div>
                  </div>
                </section>
              )}

              {isEmergencyPage && (
                <section className="mb-16 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    What Causes Emergency Plumbing Issues in <span className="text-[#A6892C]">{townName}</span>
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Common causes of emergency plumbing problems in {townName} include burst or split pipes, failed joints, worn fittings, severe blockages, failed valves and leaks that worsen suddenly and start causing damage.
                    </p>
                    <p>
                      We regularly attend urgent plumbing problems near {landmark}, along {road}, and across {postcodes}, where active leaks and overflowing fittings need a fast local response to reduce property damage.
                    </p>
                    <p>
                      If you have a burst pipe, severe leak, blocked toilet overflow or another urgent plumbing problem, quick emergency repairs can make the property safe and limit disruption.
                    </p>
                  </div>
                </section>
              )}

              {isLeakPage && (
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    Common Leak Detection Problems in <span className="text-[#A6892C]">North West Leicestershire</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We regularly help customers with hidden leak problems across {townName} and wider North West Leicestershire, including:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Hidden leaks under floors</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Leaks behind walls and boxed-in pipework</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Damp patches and staining</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Unexplained water usage or pressure loss</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Musty smells linked to hidden moisture</div>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5">Suspected pipework faults and trace and access needs</div>
                  </div>
                </section>
              )}

              {isLeakPage && (
                <section className="mb-16 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    What Causes Hidden Leaks in <span className="text-[#A6892C]">{townName}</span>
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Common causes of hidden leaks in {townName} include worn pipework, failed fittings, small joint failures, corrosion, movement in older plumbing systems and leaks concealed beneath floors or behind walls.
                    </p>
                    <p>
                      We regularly attend suspected hidden leaks near {landmark}, along {road}, and across {postcodes}, where damp patches, staining, pressure loss and unexplained water issues suggest a plumbing fault that needs tracing.
                    </p>
                    <p>
                      If you suspect a hidden leak in your property, fast local leak detection can help identify the problem early and reduce unnecessary damage and repair costs.
                    </p>
                  </div>
                </section>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <Zap className="text-[#A6892C] w-5 h-5" /> Area Expertise
                  </h2>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <strong>Housing Style:</strong> {town.propertyAgeProfile || 'Mixed Residential'}
                    </li>
                    <li>
                      <strong>Ground Conditions:</strong> {town.soilType || 'Local Clay/Soil'}
                    </li>
                    <li>
                      <strong>Coverage:</strong> {postcodes}
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <Shield className="text-[#A6892C] w-5 h-5" /> Verified Local Service
                  </h2>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <strong>Common Callouts:</strong>{' '}
                      {isDrainagePage
                        ? 'Blocked drains, blocked toilets, blocked sinks'
                        : isHeatingPage
                        ? 'Cold radiators, low pressure, no heating'
                        : isEmergencyPage
                        ? 'Burst pipes, urgent leaks, overflowing toilets'
                        : isLeakPage
                        ? 'Hidden leaks, damp patches, pressure loss'
                        : town.commonProblems?.slice(0, 2).join(', ') || 'Leaks & Blockages'}
                    </li>
                    <li>
                      <strong>Flood Risk:</strong> {town.floodRisk || 'Low'}
                    </li>
                    <li>
                      <strong>Call Out Fee:</strong> £0.00
                    </li>
                  </ul>
                </div>
              </div>

              <section className="mb-16 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-4">
                  Areas We Cover Near <span className="text-[#A6892C]">{townName}</span>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We provide {service.title.toLowerCase()} across {townName}, nearby areas, and surrounding parts of North West Leicestershire, covering {postcodes}, close to {landmark} and along {road}.
                </p>
              </section>

              {(isDrainagePage || isHeatingPage || isEmergencyPage || isLeakPage) && (
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    Local Problems We Regularly Fix in <span className="text-[#A6892C]">{townName}</span>
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    {isDrainagePage && (
                      <>
                        <p>
                          We regularly help customers in {townName} with blocked outside drains, overflowing gullies, blocked toilets, slow draining sinks, bad drain smells and recurring waste pipe problems.
                        </p>
                        <p>
                          These are the kinds of drainage searches people often make when they need urgent help, and they are exactly the kinds of local drain problems we deal with across {nearbyAreaNames}.
                        </p>
                      </>
                    )}

                    {isHeatingPage && (
                      <>
                        <p>
                          We regularly help customers in {townName} with radiators not heating properly, low pressure, noisy heating systems, hot water issues and central heating faults affecting comfort and performance.
                        </p>
                        <p>
                          These are the kinds of heating searches people often make when they need urgent or same-day help, and they are exactly the kinds of local heating problems we deal with across {nearbyAreaNames}.
                        </p>
                      </>
                    )}

                    {isEmergencyPage && (
                      <>
                        <p>
                          We regularly help customers in {townName} with burst pipes, severe plumbing leaks, overflowing toilets, urgent blockages and other emergency repairs where fast local response is important.
                        </p>
                        <p>
                          These are the kinds of emergency plumbing searches people often make when they need urgent help, and they are exactly the kinds of local emergency repairs we deal with across {nearbyAreaNames}.
                        </p>
                      </>
                    )}

                    {isLeakPage && (
                      <>
                        <p>
                          We regularly help customers in {townName} with hidden leaks, damp patches, unexplained water loss, low pressure and suspected pipework faults that need tracing before more damage occurs.
                        </p>
                        <p>
                          These are the kinds of leak detection searches people often make when they need accurate local fault finding, and they are exactly the kinds of hidden leak problems we deal with across {nearbyAreaNames}.
                        </p>
                      </>
                    )}
                  </div>
                </section>
              )}

              {(isDrainagePage || isHeatingPage || isEmergencyPage || isLeakPage) && supportingHubLinks.length > 0 && (
                <section className="mb-16 bg-white border border-slate-100 rounded-3xl p-8">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-4">
                    Wider Area Service Hub
                  </h2>
                  <p className="text-gray-700 mb-6">
                    We also cover wider North West Leicestershire for this service. You can view the broader area page below:
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {supportingHubLinks.map(link => (
                      <Link
                        key={link.url}
                        to={link.url}
                        className="rounded-2xl border border-slate-200 px-5 py-4 font-bold text-slate-800 hover:border-[#A6892C] hover:text-[#A6892C] transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {nearbyLinks.length > 0 && (
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    Nearby {service.title} Areas
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {nearbyLinks.map(link => (
                      <Link
                        key={link.slug}
                        to={link.url}
                        className="rounded-2xl border border-slate-200 px-5 py-4 font-bold text-slate-800 hover:border-[#A6892C] hover:text-[#A6892C] transition-colors"
                      >
                        {service.title} {link.name}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {(isDrainagePage || isHeatingPage || isEmergencyPage || isLeakPage) && (
                <section className="mb-16 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-6">
                    Recent Local {service.title} Work
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    {isDrainagePage && (
                      <>
                        <p>
                          Recent examples of local drainage work include blocked outside drains in {townName}, toilet blockages near {landmark}, slow kitchen waste pipes along {road}, and urgent drain unblocking across {postcodes}.
                        </p>
                        <p>
                          Adding short local drain job updates as separate pages can strengthen relevance for searches around blocked drains, outside drain blockages and recurring drainage problems in North West Leicestershire.
                        </p>
                      </>
                    )}

                    {isHeatingPage && (
                      <>
                        <p>
                          Recent examples of local heating work include radiator faults in {townName}, low pressure issues near {landmark}, no-heating callouts along {road}, and same-day central heating repairs across {postcodes}.
                        </p>
                        <p>
                          Adding short local heating job updates as separate pages can strengthen relevance for searches around radiator problems, heating breakdowns and urgent heating repairs in North West Leicestershire.
                        </p>
                      </>
                    )}

                    {isEmergencyPage && (
                      <>
                        <p>
                          Recent examples of local emergency work include burst pipe repairs in {townName}, severe leaks near {landmark}, urgent toilet overflows along {road}, and same-day emergency plumber callouts across {postcodes}.
                        </p>
                        <p>
                          Adding short local emergency job updates as separate pages can strengthen relevance for searches around burst pipes, urgent leaks and emergency plumbing repairs in North West Leicestershire.
                        </p>
                      </>
                    )}

                    {isLeakPage && (
                      <>
                        <p>
                          Recent examples of local leak detection work include hidden leak tracing in {townName}, damp-related plumbing checks near {landmark}, low-pressure investigations along {road}, and same-day leak fault finding across {postcodes}.
                        </p>
                        <p>
                          Adding short local leak detection job updates as separate pages can strengthen relevance for searches around hidden water leaks, damp-linked plumbing faults and trace and access work in North West Leicestershire.
                        </p>
                      </>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>

        <About />
        <Process />
        <Services />
        <Reviews townSlug={cleanTownKey} serviceSlug={cleanServiceKey} />
        <MapSection townSlug={cleanTownKey} serviceSlug={cleanServiceKey} />
        <FAQ townSlug={cleanTownKey} serviceSlug={cleanServiceKey} />
        <ContactSection customPhone={town.phone} />
      </main>

      {/* ✅ Added dynamic location data to Footer */}
      <Footer 
        customPhone={town.phone}
        townName={townName}
        postcodeLabel={town.postcodes ? town.postcodes[0] : 'LE67 2JH'}
        roadName={road}
      />
    </div>
  );
};

export default ServicePage;