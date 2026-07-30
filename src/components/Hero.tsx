import { Helmet } from 'react-helmet-async';
import { Phone, Calendar, Star, MapPin } from 'lucide-react';
import { towns } from '../townConfig';
import { serviceContent } from '../data/serviceData';

interface HeroProps {
  town?: string;
  service?: string;
}

const Hero = ({ town: townSlug, service: serviceSlug }: HeroProps) => {
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

  // SEO FIX 1: Fixed duplicated "Coalville Coalville" text string bug
  const metaDescription = (townData as any).metaDescription
    || `24/7 Emergency Plumber in ${displayLocation} & North West Leicestershire. Fast 60-minute response for Blocked Drains, Emergency Plumbing, Boiler Installs, and Central Heating. No call-out fee.`;

  // SEO FIX 2: High-converting Page Titles
  const pageTitle = isLandingPage 
    ? `${serviceLabel} in ${displayLocation} | 24/7 Local Engineers | RKM`
    : `24/7 Emergency Plumber Coalville & Leicestershire | RKM Plumbing`;

  // SEO FIX 3: Dynamic Canonical URL matching current route
  const schemaUrl = isLandingPage 
    ? `https://rkm247.co.uk/${serviceKey}/${townKey}`
    : "https://rkm247.co.uk/";

  // Dynamic Image Logic
  let heroImage = "/team-photo.webp"; 
  if (serviceKey.includes('drain') || serviceKey.includes('cctv') || serviceKey.includes('unblock') || serviceKey.includes('blockage')) {
    heroImage = "/drainage-cctv-survey.webp";
  } else if (serviceKey.includes('boiler') || serviceKey.includes('heating') || serviceKey.includes('gas')) {
    heroImage = "/boiler-install.webp";
  } else if (serviceKey.includes('plumb') || serviceKey.includes('leak') || serviceKey.includes('emergency')) {
    heroImage = "/team-photo.webp";
  }

  const absoluteImageUrl = `https://rkm247.co.uk${heroImage}`;

  // SEO FIX 4: Upgraded Schema to official "Plumber" type + 24/7 Hours + Exact Clean Name
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${schemaUrl}#organization`,
    "name": "RKM Plumbing & Heating Services",
    "url": schemaUrl,
    "telephone": phone,
    "image": absoluteImageUrl,
    "priceRange": "££",
    "description": metaDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": displayLocation,
      "addressRegion": "Leicestershire",
      "addressCountry": "GB"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": displayLocation
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        
        {/* SEO FIX 5: Self-Referencing Canonical Tag (Essential for Page 1) */}
        <link rel="canonical" href={schemaUrl} />

        {/* SEO FIX 6: OpenGraph Meta Tags for Social & Link Previews */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={schemaUrl} />
        <meta property="og:image" content={absoluteImageUrl} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: TEXT CONTENT */}
            <div className="max-w-2xl">

              {/* SEO FIX 7: Swapped <h3> to <div> so the <h1> is the undisputed first heading on the page */}
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

              {/* H1 HEADLINE */}
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
                {isLandingPage ? (
                  <>
                    {serviceLabel} <br />
                    <span className="text-[#A6892C]">in {displayLocation}</span>
                  </>
                ) : (
                  <>
                    24/7 Emergency Plumber <br />
                    <span className="text-[#A6892C]">in Coalville</span>
                  </>
                )}
              </h1>

              {/* HERO DESCRIPTION */}
              <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-lg font-medium">
                {isLandingPage 
                  ? heroDescription 
                  : 'RKM Plumbing & Heating Services provides 24/7 emergency repairs, professional maintenance, and reliable plumbing solutions across Coalville, North West Leicestershire. We arrive in 60 minutes or less.'}
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
                  {/* SEO FIX 8: Added loading="eager" & fetchPriority="high" for LCP performance */}
                  <img
                    src={heroImage}
                    alt={`Emergency ${serviceLabel} engineer in ${displayLocation}`}
                    loading="eager"
                    // @ts-ignore
                    fetchpriority="high"
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
                  // @ts-ignore
                  fetchpriority="high"
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