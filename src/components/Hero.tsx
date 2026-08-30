import { Helmet } from 'react-helmet-async';
import { Phone, Calendar, Star, MapPin } from 'lucide-react';
import { towns } from '../townConfig';
import { serviceContent } from '../data/serviceData';

interface HeroProps {
  town?: string;
  service?: string;
  /** Pass false when rendered inside ServicePage.tsx to avoid duplicate Helmet/Schema */
  standalone?: boolean; 
}

const Hero = ({ town: townSlug, service: serviceSlug, standalone = false }: HeroProps) => {
  // Normalize keys
  const normalize = (slug?: string) => (slug || '').toLowerCase().replace(/\/$/, "").replace(/\.html$/, "");
  const formatName = (slug?: string) => slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';
  
  const townKey = normalize(townSlug);
  const serviceKey = normalize(serviceSlug);

  const isLandingPage = !!townKey || !!serviceKey;

  const townData = towns[townKey] || {};
  const serviceData = serviceContent[serviceKey] || serviceContent['emergency-plumber'];

  // Default location for homepage set to 'Coalville'
  const displayLocation = townData.name || formatName(townKey) || 'Coalville';
  const serviceLabel = serviceData.title || "Plumbing & Heating";
  const phone = townData.phone || '01530 654 062';
  const landmark = townData.landmark || 'the local area';
  const road = townData.road || 'main routes';

  const localSpice = (townData as any).localSpice
    || `Serving ${displayLocation} near ${landmark}, covering ${road} and all surrounding areas.`;

  const heroDescription = townData.description
    || `RKM Plumbing & Heating Services provides 24/7 emergency repairs, professional maintenance, and reliable plumbing solutions for ${displayLocation}. We arrive in 60 minutes or less.`;

  // Optimized meta description for maximum CTR & keyword density
  const metaDescription = (townData as any).metaDescription
    || `Looking for local plumbers in Coalville? Expert domestic plumbing, heating, boiler repairs & blocked drainage. Fast 24/7 emergency service. £0 call out.`;

  // Optimized title tag: Front-loaded generic priority while retaining 24/7, heating & drainage
  const pageTitle = isLandingPage 
    ? `${serviceLabel} in ${displayLocation} | 60 Min Response | RKM`
    : `Plumbers Coalville | 24/7 Plumbing, Heating & Drainage`;

  // Standardized with trailing slash to match ServicePage canonical format
  const schemaUrl = isLandingPage 
    ? `https://rkm247.co.uk/${serviceKey}/${townKey}/`
    : "https://rkm247.co.uk/";

  // Dynamic Image Selection
  let heroImage = "/team-photo.webp"; 
  if (serviceKey.includes('drain') || serviceKey.includes('cctv') || serviceKey.includes('unblock') || serviceKey.includes('blockage')) {
    heroImage = "/drainage-cctv-survey.webp";
  } else if (serviceKey.includes('boiler') || serviceKey.includes('heating') || serviceKey.includes('gas')) {
    heroImage = "/boiler-install.webp";
  } else if (serviceKey.includes('plumb') || serviceKey.includes('leak') || serviceKey.includes('emergency')) {
    heroImage = "/team-photo.webp";
  }

  const absoluteImageUrl = `https://rkm247.co.uk${heroImage}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PlumbingService"],
    "@id": `${schemaUrl}#business`,
    "name": "RKM Plumbing & Heating Services LTD",
    "url": schemaUrl,
    "logo": "https://rkm247.co.uk/logo-square.webp",
    "telephone": phone,
    "image": absoluteImageUrl,
    "priceRange": "££",
    "description": metaDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "22 Primrose Walk",
      "addressLocality": displayLocation,
      "addressRegion": "Leicestershire",
      "postalCode": "LE67 2PA",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.723,
      "longitude": -1.369
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": displayLocation
      },
      {
        "@type": "PostalCode",
        "name": "LE67"
      },
      {
        "@type": "PostalCode",
        "name": "LE65"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/rkmplumbingandheatingservices",
      "https://share.google/3XtXaKCXHVDlgzSLh",
      "https://www.yell.com/biz/rkm-plumbing-and-heating-services-ltd-coalville-100007379/",
      "https://www.checkatrade.com/trades/rkmplumbingandheatingservices",
      "https://www.thomsonlocal.com/search/plumbers/burton-loughborough/rkm-plumbing-heating-services/3496846/01530654062",
      "https://118businessdirectory.co.uk/listing/rkm-plumbing-heating-services-ltd"
    ]
  };

  return (
    <>
      {/* Render Helmet ONLY if standalone is explicitly enabled */}
      {standalone && (
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={metaDescription} />
          <link rel="canonical" href={schemaUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={schemaUrl} />
          <meta property="og:image" content={absoluteImageUrl} />
          <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        </Helmet>
      )}

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: TEXT CONTENT */}
            <div className="max-w-2xl">

              {/* LOGO BOX */}
              <div className="bg-black text-[#A6892C] inline-block p-4 mb-8 rounded-sm shadow-xl">
                <div className="border border-[#A6892C] p-3 px-6">
                  <div className="font-serif text-3xl font-bold leading-none text-center">RKM</div>
                  <p className="text-[10px] text-white uppercase tracking-[0.2em] text-center mt-2">Plumbing & Heating</p>
                  <p className="text-[8px] text-[#A6892C] uppercase tracking-[0.3em] text-center mt-0.5">Services</p>
                </div>
              </div>

              {/* BADGES ROW */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="bg-black text-white px-5 py-2 rounded-full inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-md">
                  <Star className="w-3 h-3 text-[#A6892C] fill-[#A6892C]" />
                  Local 24/7 Emergency Engineers
                </div>
                {isLandingPage && (
                  <div className="bg-[#A6892C]/10 text-[#A6892C] px-5 py-2 rounded-full inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider border border-[#A6892C]/20">
                    <MapPin className="w-3 h-3" />
                    Available in {displayLocation}
                  </div>
                )}
              </div>

              {/* H1 HEADLINE: Balanced for both standard and emergency queries */}
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
                {isLandingPage ? (
                  <>
                    {serviceLabel} <br />
                    <span className="text-[#A6892C]">in {displayLocation}</span>
                  </>
                ) : (
                  <>
                    Plumbers & 24/7 Heating <br />
                    <span className="text-[#A6892C]">in Coalville</span>
                  </>
                )}
              </h1>

              {/* HERO DESCRIPTION */}
              <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-lg font-medium">
                {isLandingPage 
                  ? heroDescription 
                  : 'RKM provides 24/7 emergency callouts, domestic plumbing repairs, boiler maintenance, and drainage solutions across Coalville & North West Leicestershire.'}
              </p>

              {/* LOCAL SPICE */}
              {isLandingPage && (
                <p className="text-[#A6892C] font-bold uppercase text-sm tracking-widest mb-10">
                  {localSpice}
                </p>
              )}

              {/* BUTTONS ROW */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`tel:${phone.replace(/\s+/g, '')}`} 
                  className="bg-[#A6892C] hover:bg-[#c4a030] text-slate-900 font-black text-lg py-4 px-8 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-transform hover:-translate-y-1"
                >
                  <Phone className="w-6 h-6" />
                  <span>{phone}</span>
                </a>

                <a 
                  href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-slate-800 text-white font-bold text-lg py-4 px-8 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-transform hover:-translate-y-1"
                >
                  <Calendar className="w-6 h-6 text-[#A6892C]" />
                  <span>Book Online</span>
                </a>
              </div>

              {/* MOBILE IMAGE */}
              <div className="mt-10 lg:hidden">
                <div className="relative w-full aspect-[4/3] rounded-2xl shadow-2xl border-4 border-white overflow-hidden">
                  <img
                    src={heroImage}
                    alt={`Emergency ${serviceLabel} engineer in ${displayLocation}`}
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                </div>
              </div>

            </div>

            {/* RIGHT: DESKTOP IMAGE */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={heroImage} 
                  alt={`Emergency ${serviceLabel} engineer in ${displayLocation}`} 
                  loading="eager"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
              </div>
              <div className="absolute inset-0 border-2 border-[#A6892C] rounded-[3rem] -z-10 translate-x-6 translate-y-6"></div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;