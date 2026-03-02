import React from 'react';
import { Phone, Calendar, Star } from 'lucide-react';
import { towns } from '../townConfig';
import { serviceContent } from '../serviceData';

const services = Object.keys(serviceContent).map(slug => ({
  slug,
  label: serviceContent[slug].title 
}));

interface HeroProps {
  town?: string;
  service?: string;
}

const Hero = ({ town: townSlug, service: serviceSlug }: HeroProps) => {
  const isLandingPage = !!townSlug || !!serviceSlug;

  const service = services.find(s => s.slug === serviceSlug);
  const town = towns[townSlug as keyof typeof towns];

  const displayLocation = town ? town.name : "Leicestershire";
  const serviceLabel = service ? service.label : "Plumbing & Heating";

  let title: React.ReactNode;
  if (isLandingPage) {
    title = `${serviceLabel} in ${displayLocation}`;
  } else {
    title = (
      <>
        local Emergency Plumber & <span className="text-[#A6892C]">Heating Specialist</span>
      </>
    );
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white">
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
              <div className="bg-black text-[#A6892C] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-md border border-[#A6892C]/20">
                No Call Out Charge
              </div>
            </div>

            {/* HEADLINE */}
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              {title}
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg font-medium">
              RKM Plumbing & Heating Services provides 24/7 emergency repairs, professional maintenance, and reliable plumbing solutions across North West Leicestershire. We arrive in 60 minutes or less.
            </p>

            {/* BUTTONS ROW */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:01530654062" 
                className="bg-[#A6892C] hover:bg-[#c4a030] text-slate-900 font-black text-lg py-4 px-8 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-transform hover:-translate-y-1"
              >
                <Phone className="w-6 h-6" />
                <span>01530 654 062</span>
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

            {/* ✅ MOBILE TEAM PHOTO (ADDED, DOES NOT AFFECT DESKTOP) */}
            <div className="mt-10 lg:hidden">
              <img
                src="/team-photo.webp"
                alt="RKM Engineers"
                className="w-full rounded-2xl shadow-2xl border-4 border-white"
              />
            </div>

          </div>

          {/* RIGHT: DESKTOP PHOTO (UNCHANGED) */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/team-photo.webp" 
                alt="RKM Engineers" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 border-2 border-[#A6892C] rounded-[3rem] -z-10 translate-x-6 translate-y-6"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
