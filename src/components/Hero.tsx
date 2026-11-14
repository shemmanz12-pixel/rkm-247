import { Helmet } from 'react-helmet-async';
import { Phone, Calendar, Star, CheckCircle2, BadgePercent } from 'lucide-react';
import { towns } from '../townConfig';
import { serviceContent } from '../data/serviceData';

interface HeroProps {
  town?: string;
  service?: string;
  standalone?: boolean;
}

const Hero = ({ town: townSlug, service: serviceSlug, standalone = false }: HeroProps) => {
  const normalize = (slug?: string) => (slug || '').toLowerCase().replace(/\/$/, '').replace(/\.html$/, '');
  const formatName = (slug?: string) => slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';
  
  const townKey = normalize(townSlug);
  const serviceKey = normalize(serviceSlug);
  const isLandingPage = !!townKey || !!serviceKey;

  const townData = towns[townKey] || {};
  const serviceData = serviceContent[serviceKey] || serviceContent['emergency-plumber'];

  const displayLocation = townData.name || formatName(townKey) || 'Coalville';
  const serviceLabel = serviceData.title || 'Plumbing Heating & Drainage Services';
  const phone = townData.phone || '01530 654 062';
  const cleanPhone = phone.replace(/\s+/g, '');

  const targetWhatsApp = '447848969229';
  const formattedWhatsAppText = 
    `*New Hero Inquiry (RKM Plumbing & Heating)*\n\n` +
    `*Service Required:* ${serviceLabel}\n` +
    `*Target Town:* ${displayLocation}\n` +
    `*Message:* Hi RKM, I'd like to ask a question / arrange an appointment.`;
  const whatsAppUrl = `https://api.whatsapp.com/send/?phone=${targetWhatsApp}&text=${encodeURIComponent(formattedWhatsAppText)}&type=phone_number&app_absent=0`;

  const heroDescription = townData.description
    || `RKM provides domestic plumbing repairs, heating engineering, drain unblocking, and rapid 24/7 emergency response across ${displayLocation} and Leicestershire. £0 call-out fee.`;

  const metaDescription = (townData as any).metaDescription
    || `Looking for ${serviceLabel} in ${displayLocation}? Expert domestic plumbing, heating, boiler installs & blocked drainage. Fast 24/7 emergency service. £0 call out.`;

  const pageTitle = isLandingPage 
    ? `${serviceLabel} in ${displayLocation} | 60 Min Response | RKM`
    : `Plumbers Coalville | RKM Plumbing Heating & Drainage 24/7`;

  const canonicalPath = [serviceKey, townKey].filter(Boolean).join('/');
  const schemaUrl = canonicalPath 
    ? `https://rkm247.co.uk/${canonicalPath}/`
    : 'https://rkm247.co.uk/';

  // Match service slug to its specific .webp hero image
  const heroPhoto = (() => {
    if (!serviceKey) return '/team-photo.webp';

    if (serviceKey.includes('drain') || serviceKey.includes('toilet') || serviceKey.includes('jetting')) {
      return '/camera-survey.webp';
    }
    if (serviceKey.includes('leak')) {
      return '/leak-detection.webp';
    }
    if (serviceKey.includes('emergency')) {
      return '/emergency-plumber.webp';
    }
    if (serviceKey.includes('install') || serviceKey.includes('appliance')) {
      return '/appliance-install.webp';
    }
    if (serviceKey.includes('heat') || serviceKey.includes('boiler') || serviceKey.includes('gas')) {
      return '/team-photo.webp';
    }
    if (serviceKey.includes('plumber')) {
      return '/general-plumbing.webp';
    }

    return '/team-photo.webp';
  })();

  const absoluteImageUrl = `https://rkm247.co.uk${heroPhoto}`;

  const townPostcodes = Array.isArray((townData as any).postcodes) && (townData as any).postcodes.length > 0
    ? (townData as any).postcodes
    : ['LE67', 'LE65'];

  const areaServedList = [
    { "@type": "City", "name": displayLocation },
    ...townPostcodes.map((pc: string) => ({ "@type": "PostalCode", "name": pc }))
  ];

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://rkm247.co.uk/"
    }
  ];

  if (serviceKey) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": serviceLabel,
      "item": `https://rkm247.co.uk/${serviceKey}/`
    });
  }

  if (townKey) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": breadcrumbItems.length + 1,
      "name": displayLocation,
      "item": schemaUrl
    });
  }

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "PlumbingService"],
        "@id": "https://rkm247.co.uk/#business",
        "name": "RKM Plumbing Heating & Drainage Services",
        "url": "https://rkm247.co.uk/",
        "logo": "https://rkm247.co.uk/logo-square.webp",
        "telephone": phone,
        "image": absoluteImageUrl,
        "priceRange": "££",
        "description": metaDescription,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hodgetts Street",
          "addressLocality": "Coalville",
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
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "48",
          "bestRating": "5",
          "worstRating": "1"
        },
        "areaServed": areaServedList,
        "sameAs": [
          "https://www.checkatrade.com/"
        ]
      },
      {
        "@type": "Service",
        "@id": `${schemaUrl}#service`,
        "name": `${serviceLabel} in ${displayLocation}`,
        "serviceType": serviceLabel,
        "provider": { "@id": "https://rkm247.co.uk/#business" },
        "areaServed": { "@type": "City", "name": displayLocation },
        "description": metaDescription
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      }
    ]
  };

  const handleScrollToReviews = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
      e.preventDefault();
      reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {standalone && (
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={metaDescription} />
          <link rel="canonical" href={schemaUrl} />
          <link rel="preload" as="image" href={heroPhoto} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={schemaUrl} />
          <meta property="og:image" content={absoluteImageUrl} />
          <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
        </Helmet>
      )}

      <section className="relative pt-20 pb-8 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 bg-slate-50 border-b border-slate-200/90 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* LEFT / HERO COPY & ACTIONS */}
            <div className="lg:col-span-7 flex flex-col">

              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide w-fit mb-3.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Local 24/7 Emergency Engineers</span>
                <span className="text-slate-500 font-normal">|</span>
                <span className="text-[#c4a030] font-bold">60 Min Arrival</span>
              </div>

              {/* Primary Headline */}
              <h1 className="text-[28px] sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight font-extrabold text-slate-900 mb-3">
                {isLandingPage ? (
                  <>
                    <span>{serviceLabel}</span>
                    <span className="block text-[#A6892C] font-black mt-0.5">in {displayLocation}</span>
                  </>
                ) : (
                  <>
                    <span className="block">Plumbing Heating</span>
                    <span className="block text-xl sm:text-2xl lg:text-3xl text-slate-800 font-bold tracking-normal my-0.5">
                      &amp; Drainage Services
                    </span>
                    <span className="block text-[#A6892C] font-black">in Coalville</span>
                  </>
                )}
              </h1>

              {/* Sub-headline / Core Offer */}
              <p className="text-xs sm:text-base text-slate-600 font-medium leading-relaxed mb-5 max-w-xl">
                {heroDescription}
              </p>

              {/* Action Buttons: 2-Col on Mobile (Call + WhatsApp), 3-Col on Desktop */}
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2.5 sm:gap-3.5 mb-5 sm:mb-6">
                <a 
                  href={`tel:${cleanPhone}`} 
                  className="bg-[#A6892C] hover:bg-[#bfa03a] text-slate-950 font-bold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-95 transition-all text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 fill-slate-950 shrink-0" />
                  <span className="truncate">Call {phone}</span>
                </a>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-95 transition-all text-sm sm:text-base"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a 
                  href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl items-center justify-center gap-2 shadow-sm hover:shadow active:scale-95 transition-all text-sm sm:text-base"
                >
                  <Calendar className="w-4 h-4 text-[#A6892C] shrink-0" />
                  <span>Book Online</span>
                </a>
              </div>

              {/* Compact Responsive Trust Strip */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm mb-4 lg:mb-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  
                  {/* Gas Safe */}
                  <div className="flex items-center gap-2.5 px-1">
                    <img 
                      src="/gas safe register.webp" 
                      alt="Gas Safe Registered" 
                      className="h-9 sm:h-10 w-auto object-contain shrink-0" 
                    />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Gas Safe</p>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Reg #987039</p>
                    </div>
                  </div>

                  {/* Google Reviews — Interactive Anchor to #reviews */}
                  <a
                    href="#reviews"
                    onClick={handleScrollToReviews}
                    aria-label="Read our 5-star Google reviews"
                    className="flex items-center gap-2.5 px-1.5 py-1 pt-2 sm:pt-1 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer group"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-50 border border-slate-100 group-hover:border-[#A6892C]/40 flex items-center justify-center shrink-0 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#A6892C] mt-0.5 leading-tight transition-colors">
                        5.0 Star Rated
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium underline decoration-slate-300 underline-offset-2">
                        Read Reviews
                      </p>
                    </div>
                  </a>

                  {/* Checkatrade */}
                  <div className="flex items-center gap-2.5 px-1 pt-2 sm:pt-0">
                    <img 
                      src="/checkatrade.webp" 
                      alt="Checkatrade Approved" 
                      className="h-8 sm:h-9 w-auto object-contain shrink-0" 
                    />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Checkatrade</p>
                      <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold">Vetted &amp; Insured</p>
                    </div>
                  </div>

                  {/* £0 Call Out / Finance */}
                  <div className="flex items-center gap-2.5 px-1 pt-2 sm:pt-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#A6892C]/10 border border-[#A6892C]/20 flex items-center justify-center text-[#A6892C] shrink-0">
                      <BadgePercent className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">£0 Call-Out</p>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Finance Available</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT / DYNAMIC SERVICE HERO IMAGE */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-200">
                  <img
                    src={heroPhoto}
                    alt={`${serviceLabel} engineers in ${displayLocation}`}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-slate-950/85 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A6892C]" />
                    <span>Serving {displayLocation} &amp; Surrounds</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;