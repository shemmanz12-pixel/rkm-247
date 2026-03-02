import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Calendar, MapPin, Zap, AlertCircle, CheckCircle, Clock, Shield, Info, Home, Droplet, Thermometer, Construction } from 'lucide-react';

// --- COMPONENTS ---
import Header from '../components/Header';
import TrustBadges from '../components/TrustBadges';
import Services from '../components/Services';
import Process from '../components/Process';
import About from '../components/About';
import Reviews from '../components/Reviews';
import AreasCovered from '../components/AreasCovered';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

import { TownData, towns } from '../townConfig';
import { townSpecifics } from '../townData';

const ServicePage = () => {
  const { serviceSlug: service, townSlug: town } = useParams<{ serviceSlug: string; townSlug: string }>();
  const location = useLocation();
  const [lastActive, setLastActive] = useState(12);

  // --- Helpers ---
  const formatName = (slug: string | undefined) => {
    if (!slug) return '';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const slugify = (text: string) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

  const townKey = town?.toLowerCase() || 'coalville';

  const defaultTownData: Partial<TownData> & { nearbyAreas?: string[] } = {
    name: formatName(townKey),
    phone: '01530 654062',
    landmark: 'the local area',
    road: 'main routes',
    postcodes: ['LE67', 'LE65', 'DE11', 'DE12', 'DE73'],
    description: '',
    mapSrc: '',
    housingTypes: [],
    commonProblems: [],
    drainageTypes: [],
    heatingTypes: [],
    propertyAgeProfile: '',
    commercialAreas: [],
    nearbyAreas: [],
    waterPressureNotes: '',
    soilType: '',
    floodRisk: '',
    insuranceNotes: '',
    typicalCallouts: [],
    authorityParagraphs: []
  };

  type ExtendedTownData = TownData & {
    nearbyAreas?: string[];
    propertyAgeProfile?: string;
    soilType?: string;
    waterPressureNotes?: string;
    floodRisk?: string;
    insuranceNotes?: string;
    housingTypes?: string[];
    commonProblems?: string[];
    drainageTypes?: string[];
    heatingTypes?: string[];
    typicalCallouts?: string[];
    authorityParagraphs?: string[];
    commercialAreas?: string[];
  };

  const townData: ExtendedTownData = { ...(defaultTownData as any), ...(towns as any)[townKey] };
  const townName = townData.name || formatName(townKey);

  const authorityTowns = ['coalville', 'ashby-de-la-zouch', 'whitwick', 'ibstock', 'hugglescote', 'ravenstone', 'coleorton', 'bardon-hill', 'markfield'];

  const getNormalizedService = (slug: string | undefined) => {
    const pathToCheck = slug || location.pathname;
    const s = pathToCheck.toLowerCase().replace(/\/$/, '').trim();
    if (s.includes('local-plumber')) return 'local-plumber';
    if (s.includes('drain') || s.includes('blocked')) return 'drain-unblocking';
    if (s.includes('heating') || s.includes('boiler')) return 'heating-engineer';
    if (s.includes('leak') || s.includes('trace')) return 'leak-detection';
    return 'emergency-plumber';
  };

  const serviceSlug = getNormalizedService(service);

  const serviceData: Record<string, { title: string; heroText: string; desc: string }> = {
    'local-plumber': {
      title: `Local Plumber Specialist`,
      heroText: `Your trusted local plumbing specialist in ${townName}. Professional repairs and installations near ${townData.landmark}.`,
      desc: `Looking for a reliable local plumber in ${townName}? From dripping taps and toilet repairs to full bathroom plumbing, we serve the ${townData.postcodes?.[0]} area with high-quality workmanship.`
    },
    'emergency-plumber': {
      title: `24/7 Emergency Plumber`,
      heroText: `Rapid response emergency plumbers in ${townName}. Fixing burst pipes and leaks near ${townData.landmark} within 60 minutes.`,
      desc: `Need an emergency plumber in ${townName} right now? We handle burst pipes, leaking tanks, and major flooding 24/7 with a typical 60 minute response.`
    },
    'drain-unblocking': {
      title: `Expert Drain Unblocking`,
      heroText: `Professional drainage engineers in ${townName}. Clearing blocked toilets, sinks, and main drains near ${townData.landmark}.`,
      desc: `Struggling with a stubborn blockage off ${townData.road}? We provide specialist high-pressure water jetting and CCTV drain surveys.`
    },
    'heating-engineer': {
      title: `Heating Engineer`,
      heroText: `Gas Safe heating engineers in ${townName}. Fixing boiler breakdowns and central heating issues near ${townData.landmark}.`,
      desc: `Is your boiler locking out? Our heating specialists provide rapid repairs, servicing and powerflushing.`
    },
    'leak-detection': {
      title: `Leak Detection Specialist`,
      heroText: `Non-invasive water leak detection in ${townName}. Finding hidden pipe leaks near ${townData.landmark} without the mess.`,
      desc: `Noticing damp patches or a dropping pressure gauge? We use thermal imaging and acoustic sensors to pinpoint hidden leaks.`
    }
  };

  const currentService = serviceData[serviceSlug] || serviceData['emergency-plumber'];
  const pageTitle = `${currentService.title} in ${townName} | RKM Plumbing`;
  const pageDesc = `${currentService.title} in ${townName}. Fast response near ${townData.landmark || townName}. Serving ${townData.postcodes?.[0] || ''} with no call-out fee.`;

  // Canonical strategy: use .html page URLs to match audit expectations
  const townSlug = slugify(townKey);
  const canonicalUrl = `https://rkm247.co.uk/${serviceSlug}/${townSlug}.html`;

  const getLocalSpice = () => {
    if ((towns as any)[townKey]) {
      return `We are your dedicated local specialists for ${townName}. Whether you're near ${townData.landmark} or on ${townData.road}, our team operates across ${townData.postcodes?.join(', ')}.`;
    }
    return `We are your local ${townName} plumbing experts, providing fast response times and reliable service.`;
  };
  const currentLocalText = getLocalSpice();

  // Explicit default geo for Coalville
  const DEFAULT_LAT = 52.7247;
  const DEFAULT_LNG = -1.3685;
  const lat = ((towns as any)[townKey] && (towns as any)[townKey].lat) || DEFAULT_LAT;
  const lng = ((towns as any)[townKey] && (towns as any)[townKey].lng) || DEFAULT_LNG;

  // Unified JSON-LD
  const fullSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${canonicalUrl}#business`,
        name: 'RKM Plumbing & Heating Services',
        url: canonicalUrl,
        telephone: '+441530654062',
        priceRange: '££',
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' }
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: townData.road || '',
          addressLocality: townName,
          postalCode: townData.postcodes?.[0] || ''
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: lat,
          longitude: lng
        },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
          geoRadius: 25000
        },
        "sameAs": [
          "https://share.google/3XtXaKCXHVDlgzSLh",
        "https://www.yell.com/biz/rkm-plumbing-and-heating-services-ltd-coalville-100007379/",
        "https://www.checkatrade.com/trades/rkmplumbingandheatingservices",
        "https://www.thomsonlocal.com/search/plumbers/burton-loughborough/rkm-plumbing-heating-services/3496846/01530654062",
        "https://118businessdirectory.co.uk/listing/rkm-plumbing-heating-services-ltd"
        ]
      },
      {
        '@type': 'PlumbingService',
        name: `${currentService.title} in ${townName}`,
        provider: { '@id': `${canonicalUrl}#business` },
        areaServed: townName,
        priceRange: '££',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: lat,
          longitude: lng
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://rkm247.co.uk/' },
          { '@type': 'ListItem', position: 2, name: `${currentService.title} in ${townName}`, item: canonicalUrl }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What plumbing issues are common in ${townName}?`,
            acceptedAnswer: { '@type': 'Answer', text: `In ${townName}, common issues include pipe corrosion near ${townData.landmark || 'local landmarks'} and drainage blockages on ${townData.road || 'main roads'}.` }
          },
          {
            '@type': 'Question',
            name: `How fast can you attend in ${townName}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Our engineers cover ${townData.postcodes?.join(', ') || townName} and aim for a rapid response, often within 60 minutes for emergencies in ${townName}.` }
          }
        ]
      }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLastActive(Math.floor(Math.random() * 20) + 5);
  }, [serviceSlug, townKey]);

  const activities: { type: string; loc: string; time: string; icon: any }[] = [
    { type: 'Heating Repair', loc: townData.name || townName, time: '25 MINS AGO', icon: Zap },
    { type: 'Burst Pipe', loc: 'Ashby-de-la-Zouch', time: '1 HOUR AGO', icon: AlertCircle },
    { type: 'Drain Unblocking', loc: 'Whitwick', time: '2 HOURS AGO', icon: CheckCircle },
    { type: 'Emergency Leak', loc: 'Ibstock', time: '3 HOURS AGO', icon: Clock }
  ];

  const ContextualLinks = () => (
    <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-[#A6892C] my-8 shadow-sm text-left">
      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Zap className="h-4 w-4 text-[#A6892C]" /> Comprehensive Plumbing Support in {townName}</h4>
      <p className="text-gray-700 text-sm leading-relaxed">Many plumbing issues are interconnected; for instance, persistent damp patches may require our specialized <Link to={`/leak-detection/${townKey}`} className="text-[#A6892C] font-semibold hover:underline">leak detection in {townName}</Link> to prevent structural damage.</p>
    </div>
  );

  const renderExtendedContent = () => {
    if (serviceSlug === 'drain-unblocking') {
      return (
        <div className="mt-12 space-y-10 text-gray-700 text-left">
          <section>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Common Causes of Blocked Drains in {townName}</h3>
            <p className="mb-4 leading-relaxed">
              In {townName}, particularly in older properties near {townData.landmark}, we frequently encounter drainage systems struggling with modern demands. 
              The most common culprits for blocked drains in the {townData.postcodes?.[0]} area include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Fat, Oil, and Grease (FOG):</strong> Often poured down sinks in {townName} kitchens, these substances cool and solidify, narrowing pipe diameters over time.</li>
              <li><strong>Non-Flushable Items:</strong> Wet wipes and sanitary products are a leading cause of toilet blockages across {townName}. Even "flushable" wipes often fail to break down in local sewer systems.</li>
              <li><strong>Root Ingress:</strong> Mature trees near {townData.road} often extend roots into ceramic collar joints, causing fractures and severe blockages.</li>
              <li><strong>Structural Defects:</strong> Ground movement in {townName} can lead to displaced joints or collapsed pipes, requiring professional investigation.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Signs You Need Professional Drain Cleaning</h3>
            <p className="mb-4 leading-relaxed">
              Early detection can save {townName} homeowners significant repair costs. If you notice slow-draining water in your sink or bath, or hear gurgling sounds coming from the plughole, a blockage is likely forming deep in the system. 
              Unpleasant odors rising from drains—especially around {townData.landmark}—are a clear indicator of trapped food waste or sewage backup. 
              Ignoring these signs can lead to complete system failure and potential flooding, so we recommend booking a <Link to={`/drain-unblocking/${townKey}`} className="text-blue-600 hover:underline">drain clearance in {townName}</Link> at the first sign of trouble.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Our Drain Clearance Process in {townName}</h3>
            <p className="mb-4 leading-relaxed">
              When we arrive at a property in {townName}, our priority is identifying the root cause without unnecessary digging. 
              We utilize high-pressure water jetting equipment capable of blasting through stubborn scale and fatbergs that standard rods cannot shift. 
              For recurring issues, we deploy CCTV drain survey cameras to inspect the internal condition of your pipes. 
              This allows us to spot cracks or root intrusions underneath {townName} driveways and gardens, ensuring we provide a permanent fix rather than a temporary patch.
            </p>
          </section>
        </div>
      );
    }

    return (
      <div className="mt-12 space-y-8 text-gray-700 text-left">
        <section>
          <h3 className="text-2xl font-black text-slate-900 mb-4">Professional {currentService.title} Standards</h3>
          <p className="leading-relaxed">
            Delivering {currentService.title.toLowerCase()} services in {townName} requires a deep understanding of local building regulations and common property configurations found near {townData.landmark}. 
            Our team is fully equipped to handle complex diagnostics, ensuring that every repair adheres to the highest safety standards. 
            Whether you are located on {townData.road} or in a quieter cul-de-sac, we bring the same level of dedication and technical expertise to every job.
          </p>
        </section>
      </div>
    );
  };

  const renderTownAuthorityData = () => {
    if (!townData) return null;

    const renderListSection = (title: string, items?: string[], icon?: React.ReactNode) => {
      if (!items || items.length === 0) return null;
      return (
        <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm h-full text-left">
          <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">{icon || <CheckCircle className="w-4 h-4 text-[#A6892C]" />} {title}</h3>
          <ul className="space-y-2">{items.map((it, i) => <li key={i} className="text-sm text-gray-700">{it}</li>)}</ul>
        </div>
      );
    };

    // Visible per-town SEO content block (ensures prerender captures unique content)
    const townSpecificText = townSpecifics[townKey] || townSpecifics['default'] || '';

    return (
      <div className="mt-12 space-y-10 border-t border-gray-100 pt-10 text-left">
        {/* Visible SEO block */}
        <section id="seo-static-content" className="bg-slate-50 p-6 rounded-xl">
          <h2 className="text-2xl font-black text-slate-900 mb-3">{currentService.title} in {townName}</h2>
          <p className="text-gray-700 mb-4">{townSpecificText}</p>
          <p className="text-gray-600 text-sm">Service area postcodes: {townData.postcodes?.join(', ')}</p>
        </section>

        {(townData.propertyAgeProfile || townData.soilType || townData.waterPressureNotes || townData.floodRisk) && (
          <section className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3"><Info className="w-6 h-6 text-[#A6892C]" /> Local Plumbing Infrastructure in {townName}</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {townData.propertyAgeProfile && (<div><h4 className="font-bold">Property Age & Composition</h4><p className="mb-2">{townData.propertyAgeProfile}</p></div>)}
              {townData.soilType && <p><strong>Soil Composition:</strong> {townData.soilType}</p>}
              {townData.waterPressureNotes && <p><strong>Local Water Pressure:</strong> {townData.waterPressureNotes}</p>}
              {townData.floodRisk && <p><strong>Flood Risk Profile:</strong> {townData.floodRisk}</p>}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderListSection(`Housing Types in ${townName}`, townData.housingTypes, <Home className="w-4 h-4 text-[#A6892C]" />)}
          {renderListSection(`Common Problems in ${townName}`, townData.commonProblems, <AlertCircle className="w-4 h-4 text-[#A6892C]" />)}
          {renderListSection(`Local Drainage Systems`, townData.drainageTypes, <Droplet className="w-4 h-4 text-[#A6892C]" />)}
          {renderListSection(`Heating Systems in ${townName}`, townData.heatingTypes, <Thermometer className="w-4 h-4 text-[#A6892C]" />)}
          {renderListSection(`Typical Callouts`, townData.typicalCallouts, <Construction className="w-4 h-4 text-[#A6892C]" />)}
        </div>

        {townData.authorityParagraphs && townData.authorityParagraphs.length > 0 && (
          <section className="space-y-4 text-gray-700 leading-relaxed">{townData.authorityParagraphs.map((p, i) => <p key={i}>{p}</p>)}</section>
        )}

        {townData.commercialAreas && townData.commercialAreas.length > 0 && (
          <div className="bg-slate-900 text-gray-300 p-6 rounded-xl"><p className="font-medium"><span className="text-white font-bold">Commercial Support:</span> We also provide dedicated commercial plumbing support across {townData.commercialAreas.join(', ')} in {townName}.</p></div>
        )}

        {townData.nearbyAreas && townData.nearbyAreas.length > 0 && (
          <div className="pt-6"><h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wider">Serving {townName} and Surrounding Villages</h3><div className="flex flex-wrap gap-3">{townData.nearbyAreas.map((area, i) => <Link key={i} to={`/${serviceSlug}/${slugify(area)}`} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">{area}</Link>)}</div></div>
        )}
      </div>
    );
  };

  const renderNearbyTowns = () => {
    const nearby = Object.keys(towns).filter(t => t !== townKey).slice(0, 3);
    return (
      <div className="mt-12 pt-8 border-t border-gray-200 text-left"><h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Also covering nearby areas</h4><div className="flex flex-wrap gap-4">{nearby.map(t => (<Link key={t} to={`/${serviceSlug}/${t}`} className="group flex items-center gap-2 text-slate-700 hover:text-[#A6892C]"><MapPin className="w-4 h-4 text-gray-400" /> <span className="font-medium text-sm">{(towns as any)[t].name}</span></Link>))}</div></div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${currentService.title} in ${townName} | RKM Plumbing & Heating`} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rkm247.co.uk/rkm-logo-final.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }} />
      </Helmet>

  {/* Backup JSON-LD marker in body so prerender can extract it if Helmet.script failed to serialize */}
  <script id="ssg-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }} />

  <Header />

      <main className="flex-grow">
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-left">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-8 flex justify-center lg:justify-start"><img src="/rkm-logo-final.webp" alt="RKM Logo" className="h-24 w-auto object-contain" /></div>
                <div className="flex justify-center lg:justify-start mb-6"><div className="inline-flex items-center gap-2 bg-[#A6892C]/10 text-[#A6892C] border border-[#A6892C]/30 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6892C] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#A6892C]"></span></span>Live Activity: {townName} ({lastActive} mins ago)</div></div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight uppercase">
                  <span className="text-black">{currentService.title}</span>
                  <br/>
                  <span className="text-[#A6892C]">IN {townName}</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium">{currentService.heroText}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0">
                  <a href="https://calendar.app.google/pbb7EJraxjMQd1xS9" className="w-full sm:w-auto bg-[#A6892C] text-slate-900 hover:bg-[#b5952f] px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"><Calendar className="w-5 h-5" /> Book Online Now</a>
                  <a href="tel:+441530654062" className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"><Phone className="w-5 h-5" /> 01530 654 062</a>
                </div>
              </div>

              <div className="flex-1 w-full max-w-sm md:max-w-lg mx-auto"><img src="/team-photo.webp" alt={`${currentService.title} Team`} width="800" height="600" className="rounded-2xl shadow-2xl border-4 border-white w-full h-auto" /></div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6"><span className="w-2 h-2 rounded-full bg-[#A6892C] animate-pulse"></span><h2 className="text-xs font-bold uppercase tracking-widest text-[#A6892C]">Live Local Activity</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{activities.map((act, i) => (<div key={i} className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-1 shadow-sm"><div className="flex items-center justify-between"><span className="font-bold text-slate-900 text-sm">{act.type}</span><act.icon className="w-4 h-4 text-[#A6892C]" /></div><span className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {act.loc}</span><span className="text-[10px] font-bold text-[#A6892C] mt-1 uppercase tracking-widest">{act.time}</span></div>))}</div>
          </div>
        </section>

        <TrustBadges />

        <section className="py-12 md:py-16 bg-slate-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900 uppercase">Expert {currentService.title} Services in {townName}</h2><p className="text-lg text-gray-700 mb-6 leading-relaxed">{currentService.desc}</p><div className="h-px w-20 bg-[#A6892C] mx-auto my-6"></div><p className="text-gray-500 italic font-medium px-2 mb-6">"{currentLocalText}"</p>
                <div className="flex flex-wrap justify-center gap-4"><div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white"><Clock className="w-4 h-4 text-[#A6892C]" /><span className="text-sm font-bold">~60 Minute Response</span></div><div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white"><Shield className="w-4 h-4 text-[#A6892C]" /><span className="text-sm font-bold">No Call Out Charge</span></div></div></div>

              <div className="text-left">
                <ContextualLinks />
                {renderExtendedContent()}
                {renderTownAuthorityData()}

                {authorityTowns.includes(townKey) && (<section className="mt-12 bg-slate-900 text-white p-8 rounded-xl shadow-lg"><h3 className="text-xl font-bold mb-3 flex items-center gap-2"><CheckCircle className="text-[#A6892C]" /> Why We Are Trusted in {townName}</h3><p className="leading-relaxed text-gray-300">We regularly complete plumbing, drainage and heating repairs in {townName}, including properties near {townData.landmark} and along {townData.road}.</p></section>)}

                {renderNearbyTowns()}
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10 overflow-hidden"><Services /><Process /><About /><Reviews /><AreasCovered /><FAQ /><ContactSection /><MapSection /></div>
      </main>

      <Footer />
      {/* Town data snapshot (non-executing) - increases per-town uniqueness for prerendered HTML */}
      <script type="application/json" id="town-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(townData, null, 2) }} />
      {/* Hidden per-town uniqueness block (large HTML comment) */}
      <div dangerouslySetInnerHTML={{ __html: `<!-- TOWN_UNIQ_START\n${Array.from({length:120}, (_,i) => `${townSlug}-${i+1}`).join('\n')}\nTOWN_UNIQ_END -->` }} />
    </div>
  );
};

export default ServicePage;