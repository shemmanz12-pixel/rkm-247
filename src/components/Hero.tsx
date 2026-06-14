import { useState, useEffect } from 'react';
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

  const displayLocation = townData.name || formatName(townKey) || 'Leicestershire';
  const serviceLabel = serviceData.title || "Plumbing & Heating";
  const phone = townData.phone || '01530 654 062';
  const landmark = townData.landmark || 'the local area';
  const road = townData.road || 'main routes';

  const localSpice = (townData as any).localSpice
    || `Serving ${displayLocation} near ${landmark}, covering ${road} and all surrounding areas.`;

  const heroDescription = townData.description
    || `RKM Plumbing & Heating Services provides 24/7 emergency repairs, professional maintenance, and reliable plumbing solutions for ${displayLocation}. We arrive in 60 minutes or less.`;

  const metaDescription = (townData as any).metaDescription
    || `${serviceLabel} in ${displayLocation}. ${heroDescription}`;

  const pageTitle = `${serviceLabel} in ${displayLocation} | RKM Plumbing & Heating`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `RKM Plumbing & Heating - ${serviceLabel} in ${displayLocation}`,
    "telephone": phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": displayLocation,
      "addressRegion": "Leicestershire",
      "addressCountry": "UK"
    },
    "description": metaDescription,
    "areaServed": displayLocation,
    "url": `https://rkm247.co.uk/${serviceKey}/${townKey}`
  };

  // --- SLIDESHOW LOGIC ---
  // You can expand this array with any real project photos you have in your public folder
  const images = [
    "/team-photo.webp",
    "/bathroom.webp",
    "/Outside-Tap-Install.webp",
    "/Boiler-Install.webp",
    "/Drain-Unblocking.webp",
    "/Drainage-CCTV-Survey.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Changes image every 4 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: TEXT CONTENT */}
            <div className="max-w-2xl">

              {/* BLACK LOGO BOX */}
              <div className="bg-black text-[#A6892C] inline-block p-4 mb-8 rounded-sm shadow-xl">
                <div className="border border-[#A6892C] p-3 px-6">
                  <h3 className="font-serif text-3xl leading-none text-center">RKM</h3>
                  <p className="text-[10px] text-white uppercase tracking-[0.2em] text-center mt-2">Plumbing & Heating</p>
                  <p className="text-[8px] text-[#A6892C] uppercase tracking-[0.3em] text-center mt-0.5">Services</p>
                </div>
              </div>

              {/* BADGES ROW */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="bg-black text-white px-5 py-2 rounded-full inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-md">
                  <Star className="w-3 h-3 text-[#A6892C] fill-[#A6892C]" />
                  Local Expert Since 2004
                </div>
                {isLandingPage && (
                  <div className="bg-[#A6892C]/10 text-[#A6892C] px-5 py-2 rounded-full inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider border border-[#A6892C]/20">
                    <MapPin className="w-3 h-3" />
                    Available in {displayLocation}
                  </div>
                )}
              </div>

              {/* HEADLINE */}
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
                {isLandingPage ? (
                  <>
                    {serviceLabel} <br />
                    <span className="text-[#A6892C]">in {displayLocation}</span>
                  </>
                ) : (
                  <>
                    Local Emergency Plumber & <span className="text-[#A6892C]">Heating Specialist</span>
                  </>
                )}
              </h1>

              {/* LOCAL SPICE */}
              {isLandingPage && (
                <p className="text-[#A6892C] font-bold uppercase text-sm tracking-widest mb-4">
                  {localSpice}
                </p>
              )}

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg font-medium">
                {isLandingPage ? heroDescription : 'RKM Plumbing & Heating Services provides 24/7 emergency repairs, professional maintenance, and reliable plumbing solutions across North West Leicestershire. We arrive in 60 minutes or less.'}
              </p>

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

              {/* MOBILE SLIDESHOW */}
              <div className="mt-10 lg:hidden">
                <div className="relative w-full aspect-[4/3] rounded-2xl shadow-2xl border-4 border-white overflow-hidden">
                   {images.map((img, index) => (
                    <img
                      key={img}
                      src={img}
                      alt={`RKM Plumbing Work ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: DESKTOP SLIDESHOW */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                {images.map((img, index) => (
                  <img 
                    key={img}
                    src={img} 
                    alt={`RKM Plumbing Work in ${displayLocation}`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 border-2 border-[#A6892C] rounded-[3rem] -z-10 translate-x-6 translate-y-6"></div>
              
              {/* Slideshow Indicators */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-[#A6892C] scale-125" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;