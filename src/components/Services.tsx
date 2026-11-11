import { Link, useLocation, useParams } from 'react-router-dom';
import { Wrench, Phone, Droplets, Flame, Search, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  currentLocation?: string;
}

const Services = ({ currentLocation }: ServicesProps) => {
  let pathname = '';
  let params: { town?: string; slug?: string; location?: string } = {};

  try {
    const loc = useLocation();
    pathname = loc?.pathname || '';
  } catch (e) {
    pathname = '';
  }

  try {
    params = useParams<{ town?: string; slug?: string; location?: string }>() || {};
  } catch (e) {
    params = {};
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  const detectedFromPath = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : '';

  const rawSlug = currentLocation || params.town || params.slug || params.location || detectedFromPath || '';
  const activeSlug = rawSlug.toLowerCase() || 'coalville';

  const activeTownName = activeSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const buildServiceUrl = (servicePrefix: string) => {
    return `/${servicePrefix}/${activeSlug}/`;
  };

  const CALENDAR_LINK = "https://calendar.app.google/pbb7EJraxjMQd1xS9";

  const services = [
    {
      icon: Droplets,
      title: "Drain Unblocking",
      badge: "£0 Call-Out",
      desc: `Rapid clearance for external drains, toilets, and sewer blockages in ${activeTownName}.`,
      items: [
        "High-pressure water jetting",
        "Blocked toilets, sinks & gullies",
        "Full CCTV camera inspections"
      ],
      actionText: "Clear Blocked Drain",
      href: buildServiceUrl("drain-unblocking"),
      isExternal: false
    },
    {
      icon: Phone,
      title: "Emergency Plumbing",
      badge: "60-90 Min Arrival",
      desc: `24/7 immediate dispatch across ${activeTownName} for domestic flooding and leaks.`,
      items: [
        "Burst pipes & sudden floods",
        "Failed stopcocks & valves",
        "Radiator leaks & water isolation"
      ],
      actionText: "Request Emergency Callout",
      href: buildServiceUrl("emergency-plumber"),
      isExternal: false
    },
    {
      icon: Flame,
      title: "Boilers & Heating",
      badge: "Gas Safe #987039",
      desc: `Certified gas boiler installs, annual servicing, and breakdown repairs in ${activeTownName}.`,
      items: [
        "Combi replacements & 0% finance",
        "Boiler breakdown diagnostics",
        "Radiator valves & power flushing"
      ],
      actionText: "Book Heating Engineer",
      href: buildServiceUrl("heating-engineer"),
      isExternal: false
    },
    {
      icon: Wrench,
      title: "General Plumbing",
      badge: "Fixed Quotes",
      desc: `Everyday domestic repairs, maintenance, and fixture replacements across ${activeTownName}.`,
      items: [
        "Dripping taps & running toilets",
        "Waste pipe repairs & traps",
        "Shower valves & water pressure"
      ],
      actionText: "View Plumbing Services",
      href: buildServiceUrl("plumber"),
      isExternal: false
    },
    {
      icon: Search,
      title: "Leak Detection",
      badge: "Non-Destructive",
      desc: `Pinpoint hidden leaks beneath concrete, floorboards, and cavity walls in ${activeTownName}.`,
      items: [
        "Acoustic pipe listening tech",
        "Thermal imaging cameras",
        "Insurance-approved trace reports"
      ],
      actionText: "Locate Hidden Leak",
      href: buildServiceUrl("leak-detection"),
      isExternal: false
    },
    {
      icon: Wrench,
      title: "Appliance & Installs",
      badge: "Online Booking",
      desc: `Professional installation of home appliances, fixtures, and modern fittings.`,
      items: [
        "Washing machines & dishwashers",
        "Kitchen sinks & new mixer taps",
        "Instant confirmation calendar"
      ],
      actionText: "Book Installation Online",
      href: CALENDAR_LINK,
      isExternal: true
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-slate-50 relative z-10 border-b border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* HEADER */}
        <div className="text-center sm:text-left max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6892C] bg-[#A6892C]/10 px-3 py-1 rounded-full mb-2.5">
            <span>Direct Local Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Services <span className="text-[#A6892C]">in {activeTownName}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
            Clear fixed pricing, Gas Safe registered engineers, and £0 call-out fees for domestic homes and commercial sites.
          </p>
        </div>

        {/* COMPACT & TRANSPARENT SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const cardClasses =
              "bg-white border border-slate-200/90 hover:border-[#A6892C] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group";

            const cardContent = (
              <>
                <div>
                  {/* Top Row: Icon + Guarantee Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#A6892C]/10 border border-[#A6892C]/20 flex items-center justify-center text-[#A6892C] group-hover:bg-[#A6892C] group-hover:text-slate-950 transition-colors">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/60">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 tracking-tight group-hover:text-[#A6892C] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  {/* Problem Checkmarks (Transparent What-We-Do) */}
                  <ul className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A6892C] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Action Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#A6892C] transition-colors">
                  <span>{service.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-[#A6892C] group-hover:translate-x-1 transition-transform" />
                </div>
              </>
            );

            return service.isExternal ? (
              <a
                key={index}
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={service.title}
                className={cardClasses}
              >
                {cardContent}
              </a>
            ) : (
              <Link 
                key={index} 
                to={service.href} 
                aria-label={service.title}
                className={cardClasses}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;