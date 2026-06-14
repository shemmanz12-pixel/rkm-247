import { useParams } from 'react-router-dom';
import { CheckCircle, MapPin, ShieldCheck, Droplets, Wrench, Zap, Phone, Calendar } from 'lucide-react';
import { towns } from '../townConfig';

interface AboutProps {
  customPhone?: string;
  townSlugOverride?: string;
}

const About = ({ customPhone, townSlugOverride }: AboutProps) => {
  const params = useParams();
  
  // Use the override if provided (for landing pages), otherwise use the router param, otherwise fallback
  const activeSlug = townSlugOverride || params.townSlug || params.town;
  
  const formatName = (slug: string | undefined) => {
    if (!slug) return 'Coalville & Leicestershire';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const townKey = (activeSlug || '').toLowerCase();
  const townName = formatName(activeSlug);
  
  // Look up the town data from our config
  const localTownData = towns[townKey];
  
  // THIS IS THE FIX: Automatically pull the phone number based on the town!
  // If the town isn't in the config, it uses customPhone, or falls back to Coalville.
  const displayPhone = localTownData?.phone || customPhone || "01530 654 062";
  const coverageString = localTownData?.postcodes?.join(', ') || 'surrounding';

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 order-2 lg:order-1">
            {/* Trust Badges */}
            <div className="flex items-center gap-6 mb-8">
              <img 
                src="/checkatrade.webp" 
                alt="Checkatrade Approved - RKM Plumbing & Heating" 
                className="h-12 object-contain"
              />
              <div className="h-10 w-[1px] bg-gray-200"></div>
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-[#A6892C]" />
                Fully Insured & Checkatrade Approved
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase leading-tight">
              About RKM <span className="text-[#A6892C]">Plumbing & Heating Services</span> in {townName}
            </h2>
            <div className="w-20 h-1.5 bg-[#A6892C] mb-8"></div>

            {/* Body Content */}
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                <strong>RKM Plumbing & Heating Services</strong> is a premier <strong>24/7 emergency response firm</strong> dedicated to serving the community of <strong>{townName}</strong>. We specialize in rapid-intervention repairs for critical system failures, ranging from <strong>emergency boiler repairs</strong> and central heating diagnostics to burst pipe containment. Our local engineers maintain a strict <strong>60-minute response target</strong>, ensuring your home or business is protected around the clock.
              </p>
              
              <p>
                As a homegrown {townName} business, we bridge the gap between small local handymen and overpriced national franchises. We operate with <strong>no call-out charges</strong> and utilize advanced <strong>leak detection technology</strong> to find hidden water escapes before they compromise your property’s structure. From <strong>unvented cylinder servicing</strong> to complex heating system restores, we focus on high-quality, long-term reliability.
              </p>

              {/* Specialist Drainage Block */}
              <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-[#A6892C] mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="w-5 h-5 text-[#A6892C]" />
                  <p className="font-bold text-slate-900 uppercase text-sm tracking-widest">Drainage Specialist Division</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our expertise extends deep into <strong>specialist drainage solutions</strong>. We provide the most comprehensive <strong>drain unblocking in {townName}</strong>, utilizing <strong>high-pressure water jetting</strong> and <strong>professional CCTV drain surveys</strong> to clear main sewer lines, toilets, and external stacks. With a "Repair First" philosophy and <strong>OAP discounts</strong>, RKM remains the trusted choice for 24-hour drainage and plumbing support throughout the area.
                </p>
              </div>

              {/* Heating Specialist Block */}
              <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-slate-800 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-slate-800" />
                  <p className="font-bold text-slate-900 uppercase text-sm tracking-widest">Heating & Mechanical</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Beyond plumbing, we are experts in <strong>central heating diagnostics</strong>. If you are facing a boiler lockout, cold radiators, or a noisy pump in {townName}, our vans carry the components to fix 90% of issues on the first visit. We handle everything from <strong>motorised valve failures</strong> to full system powerflushing.
                </p>
              </div>

            </div>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 border-t border-gray-100 pt-8">
              {[
                "No Call Out Fee in {townName}",
                "60 Minute Emergency Response",
                "Burst Pipes & Major Leaks",
                "Advanced Leak Detection",
                "Special OAP Discounts",
                "Emergency Boiler Repairs",
                "CCTV Drain Surveys",
                "High Pressure Water Jetting"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A6892C] flex-shrink-0" />
                  <span className="font-bold text-slate-800 text-base">{item.replace('{townName}', townName)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-5 bg-slate-100 rounded-lg border border-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A6892C] mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>RKM Local Service Area:</strong> Serving <strong>{townName}</strong> and all {coverageString} regions directly.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {/* Uses dynamicPhone instead of customPhone */}
              <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="flex-1 bg-slate-900 text-white px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                <Phone className="w-5 h-5" /> Call {displayPhone}
              </a>
              <a href="https://calendar.app.google/pbb7EJraxjMQd1xS9" className="flex-1 bg-[#A6892C] text-slate-900 px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#b5952f] transition-colors shadow-lg shadow-[#A6892C]/20">
                <Calendar className="w-5 h-5" /> Book Online
              </a>
            </div>

          </div>

          {/* Image Section */}
          <div className="flex-1 relative order-1 lg:order-2">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#A6892C]/10 rounded-full -z-10"></div>
            <img 
              src="/bathroom.webp" 
              alt={`RKM Plumbing & Heating Services in ${townName}`} 
              className="rounded-2xl shadow-2xl border-4 border-white w-full object-cover h-[700px]"
            />
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-700">
               <div className="flex items-center gap-3">
                 <Zap className="w-6 h-6 text-[#A6892C]" />
                 <div>
                   <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Emergency Service</p>
                   <p className="font-black text-lg">24/7 RESPONSE</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;