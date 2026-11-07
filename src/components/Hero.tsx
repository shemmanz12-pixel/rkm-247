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
  const serviceLabel = serviceData.title || "Plumbing Heating & Drainage";
  const phone = townData.phone || '01530 654 062';
  const landmark = townData.landmark || 'the local area';
  const road = townData.road || 'main routes';

  // WhatsApp setup
  const targetWhatsApp = '447848969229';
  const defaultWhatsAppText = encodeURIComponent(
    `Hi RKM, I'd like to ask a question / arrange a booking for ${serviceLabel} in ${displayLocation}.`
  );
  const whatsAppUrl = `https://wa.me/${targetWhatsApp}?text=${defaultWhatsAppText}`;

  const localSpice = (townData as any).localSpice
    || `Serving ${displayLocation} near ${landmark}, covering ${road} and all surrounding areas.`;

  const heroDescription = townData.description
    || `RKM provides domestic plumbing repairs, heating engineering, drain unblocking, and fast 24/7 emergency response across ${displayLocation} and Leicestershire. £0 call-out fee.`;

  // Fallback meta tags (only used if standalone=true)
  const metaDescription = (townData as any).metaDescription
    || `Looking for Emergency plumbers in Coalville? Expert domestic plumbing, heating, boiler installs & blocked drainage. Fast 24/7 emergency service. £0 call out.`;

  const pageTitle = isLandingPage 
    ? `${serviceLabel} in ${displayLocation} | 60 Min Response | RKM`
    : `Plumbers Coalville | RKM Plumbing Heating & Drainage 24/7`;

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
    "name": "RKM Plumbing Heating & Drainage Services",
    "url": schemaUrl,
    "logo": "https://rkm247.co.uk/logo-square.webp",
    "telephone": phone,
    "image": absoluteImageUrl,
    "priceRange": "££",
    "description": metaDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hodgetts Street",
      "addressLocality": displayLocation,
      "addressRegion": "Leicestershire",
      "postalCode": "LE67 2JH",
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
                  <p className="text-[10px] text-white uppercase tracking-[0.2em] text-center mt-2">Plumbing Heating &amp; Drainage</p>
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

              {/* H1 HEADLINE */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] mb-6 tracking-tight">
                {isLandingPage ? (
                  <>
                    {serviceLabel} <br />
                    <span className="text-[#A6892C]">in {displayLocation}</span>
                  </>
                ) : (
                  <>
                    <span>Plumbing Heating</span>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl text-black font-bold tracking-normal my-1">
                      &amp; Drainage Services
                    </span>
                    <span className="text-[#A6892C]">in Coalville</span>
                  </>
                )}
              </h1>

              {/* HERO DESCRIPTION */}
              <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed max-w-lg font-medium">
                {isLandingPage 
                  ? heroDescription 
                  : 'RKM provides 24/7 emergency callouts, domestic plumbing repairs, boiler installations, and drain unblocking across Coalville & North West Leicestershire. £0 Call-Out Fee.'}
              </p>

              {/* LOCAL SPICE */}
              {isLandingPage && (
                <p className="text-[#A6892C] font-bold uppercase text-sm tracking-widest mb-10">
                  {localSpice}
                </p>
              )}

              {/* ACTION BUTTONS GROUP */}
              <div className="flex flex-col gap-2.5 sm:gap-4 my-6">
                
                {/* Row 1: Side-by-Side Call & Book Online on Mobile, Regular Flow on Desktop */}
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2.5 sm:gap-4">
                  <a 
                    href={`tel:${phone.replace(/\s+/g, '')}`} 
                    className="bg-[#A6892C] hover:bg-[#c4a030] text-slate-950 font-black py-3 sm:py-4 px-3 sm:px-8 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all text-sm sm:text-lg"
                  >
                    <Phone className="w-4 h-4 sm:w-6 sm:h-6 shrink-0" />
                    <span className="truncate">{phone}</span>
                  </a>

                  <a 
                    href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black hover:bg-slate-800 text-white font-bold py-3 sm:py-4 px-3 sm:px-8 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all text-sm sm:text-lg"
                  >
                    <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-[#A6892C] shrink-0" />
                    <span className="whitespace-nowrap">Book Online</span>
                  </a>
                </div>

                {/* Row 2: WhatsApp Bar (Compact & Full-Width on Mobile) */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 fill-white shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>

              </div>

              {/* MOBILE IMAGE */}
              <div className="mt-8 lg:hidden">
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