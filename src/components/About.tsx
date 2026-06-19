'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Phone, Calendar, MapPin } from 'lucide-react';
import { towns } from '../townConfig'; 

const RKM_GUARANTEES = [
  'Available 24/7 for emergency callouts',
  'Fully certified and highly experienced engineers',
  'Transparent, upfront pricing with no hidden fees',
  'We aim to arrive within 60 minutes for emergencies'
];

const About = () => {
  const { serviceSlug, townSlug } = useParams();

  // --- DYNAMIC SEO DATA ROUTING ---
  const normalize = (value: string) => value?.toLowerCase().replace('.html', '').trim() || '';
  const cleanTownKey = normalize(townSlug || '');
  
  const townData = towns[cleanTownKey] || {};
  
  // SEO Variables with smart fallbacks
  const displayLocation = townData.name || (cleanTownKey ? cleanTownKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'North West Leicestershire');
  const customPhone = townData.phone || "01530 654 062";
  const landmark = townData.landmark || "the local town centre";
  const road = townData.road || "main transport routes";
  const postcodes = townData.postcodes ? townData.postcodes.join(', ') : "LE65 and LE67";
  
  const displayService = serviceSlug 
    ? serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) 
    : 'Plumbing & Heating';

  // --- DYNAMIC SLIDESHOW LOGIC ---
  const normalizedService = (serviceSlug || '').toLowerCase();
  let images: string[] = [];

  if (normalizedService.includes('drain') || normalizedService.includes('cctv') || normalizedService.includes('unblock') || normalizedService.includes('blockage')) {
    // Drainage Images
    images = [
      "/drain-unblocking.webp",
      "/drainage-cctv-survey.webp",
      "/unblocked-drain.webp",
    ];
  } else if (normalizedService.includes('boiler') || normalizedService.includes('heat') || normalizedService.includes('gas')) {
    // Heating Images (Team photo removed)
    images = [
      "/boiler-install.webp",
      "/two-port-valve.webp",
      "/ball-valve.webp",
      "/shower-pump.webp"
    ];
  } else if (normalizedService.includes('plumb') || normalizedService.includes('leak') || normalizedService.includes('emergency') || normalizedService.includes('water')) {
    // Plumbing Images (Team photo removed)
    images = [
      "/bathroom.webp",
      "/outside-tap-install.webp",
      "/kitchen-tap.webp",
      "/shower-pump.webp"
    ];
  } else {
    // Fallback/General Images (Team photo removed)
    images = [
      "/bathroom.webp",
      "/boiler-install.webp",
      "/drain-unblocking.webp",
      "/ball-valve.webp",
      "/shower-pump.webp"
    ];
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index if the URL/service changes so we don't get out-of-bounds errors
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [serviceSlug]);

  // Slideshow Timer
  useEffect(() => {
    // Prevent interval from running if there are no images
    if (images.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Changes image every 4 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: SLIDESHOW */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group">
              
              {/* Slideshow Images */}
              {images.map((img, index) => (
                <img 
                  key={img}
                  src={img} 
                  alt={`RKM ${displayService} Portfolio ${index + 1}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}

              {/* Location Tag Overlay */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl z-30">
                <MapPin className="w-4 h-4 text-[#A6892C]" />
                Serving {displayLocation}
              </div>

              {/* Slideshow Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-[#A6892C] scale-150" : "bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Offset Border (Desktop Only) */}
            <div className="absolute inset-0 border-2 border-[#A6892C] rounded-[2rem] -z-10 translate-x-4 translate-y-4 hidden lg:block transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"></div>
          </div>

          {/* RIGHT: TEXT CONTENT & HEAVY SEO */}
          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-black text-[#A6892C] uppercase tracking-[0.2em] mb-3">
              About RKM Plumbing & Heating
            </h2>
            
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              Trusted {displayService} Experts <br />
              <span className="text-gray-500 text-3xl md:text-4xl">in {displayLocation}</span>
            </h3>
            
            {/* HEAVY SEO PARAGRAPH 1: General Authority */}
            <p className="text-lg text-gray-600 mb-4 leading-relaxed font-medium">
              Since 2004, RKM Plumbing & Heating Services has been the premier choice for reliable, fast-response plumbing in <strong>{displayLocation}</strong>. As an independent, locally trusted business, we understand the specific domestic and commercial infrastructure of the region, allowing us to diagnose faults quickly and safely.
            </p>

            {/* HEAVY SEO PARAGRAPH 2: Geographic Density */}
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Whether you require urgent {displayService.toLowerCase()} assistance near <strong>{landmark}</strong>, are situated along <strong>{road}</strong>, or are located anywhere within the <strong>{postcodes}</strong> postcode districts, our dedicated network ensures we are never far away. We are proud to provide rapid 60-minute emergency response times to our neighbours across the community without ever charging a call-out fee.
            </p>
            
            {/* BULLET POINTS */}
            <ul className="space-y-4 mb-10">
              {RKM_GUARANTEES.map((item, index) => (
                <li key={index} className="flex items-start gap-4 group cursor-default">
                  <CheckCircle className="w-6 h-6 text-[#A6892C] shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <span className="text-slate-800 font-bold transition-colors group-hover:text-black">{item}</span>
                </li>
              ))}
            </ul>

            {/* CALL TO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`tel:${customPhone.replace(/\s+/g, '')}`} 
                className="inline-flex bg-[#A6892C] hover:bg-[#c4a030] text-slate-900 font-black text-lg py-4 px-8 rounded-xl items-center justify-center gap-3 shadow-lg transition-transform hover:-translate-y-1"
              >
                <Phone className="w-6 h-6 animate-pulse" />
                <span>Call {customPhone}</span>
              </a>

              <a 
                href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-black hover:bg-slate-800 text-white font-bold text-lg py-4 px-8 rounded-xl items-center justify-center gap-3 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <Calendar className="w-6 h-6 text-[#A6892C]" />
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