import { Link, useLocation, useParams } from 'react-router-dom';
import { Wrench, Phone, Droplets, Flame, Search, ArrowRight } from 'lucide-react';

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

  // 1. Detect location slug from Props, Route Params, or URL path
  const pathSegments = pathname.split('/').filter(Boolean);
  const detectedFromPath = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : '';

  const activeSlug = currentLocation || params.town || params.slug || params.location || detectedFromPath || '';

  // 2. Format location name dynamically
  const activeTownName = activeSlug
    ? activeSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : '';

  // 3. Helper to build dynamic location URLs cleanly
  const buildServiceUrl = (servicePrefix: string) => {
    return activeSlug ? `/${servicePrefix}/${activeSlug}/` : `/${servicePrefix}/`;
  };

  // Google Booking Calendar Link
  const CALENDAR_LINK = "https://calendar.app.google/pbb7EJraxjMQd1xS9";

  const services = [
    {
      icon: Flame,
      title: "Heating Engineer",
      desc: activeTownName
        ? `Boiler installs, repairs, radiator replacements, and heating diagnostics in ${activeTownName}.`
        : "Boiler installs and repairs, radiator replacements, system flushing, and thermostat upgrades for efficiency.",
      actionText: activeTownName ? `Heating in ${activeTownName}` : "Heating Services",
      href: buildServiceUrl("heating-engineer"),
      isExternal: false
    },
    {
      icon: Phone,
      title: "Emergency Plumber",
      desc: activeTownName
        ? `Rapid 24/7 emergency response across ${activeTownName} for burst pipes and urgent leaks.`
        : "Rapid assistance for burst pipes and leak repairs when you need us most.",
      actionText: activeTownName ? `24/7 Cover in ${activeTownName}` : "Emergency Coverage",
      href: buildServiceUrl("emergency-plumber"),
      isExternal: false
    },
    {
      icon: Droplets,
      title: "Drains Unblocking",
      desc: activeTownName
        ? `Specialist drain unblocking in ${activeTownName} for manholes, soil stacks, and main sewer lines.`
        : "Specialist Drain unblocking for manholes, soil stacks, and main drains using high-pressure jetting.",
      actionText: activeTownName ? `Drainage in ${activeTownName}` : "Drainage Services",
      href: buildServiceUrl("drain-unblocking"),
      isExternal: false
    },
    {
      icon: Wrench,
      title: "General Plumbing",
      desc: activeTownName
        ? `Leaking pipes, tap repairs, toilet fixes, and domestic maintenance in ${activeTownName}.`
        : "Leaking pipes, tap repairs, toilet fixes, and general maintenance for your home.",
      actionText: "Book Online",
      href: CALENDAR_LINK,
      isExternal: true
    },
    {
      icon: Search,
      title: "Leak Detection",
      desc: activeTownName
        ? `Visual inspections and non-invasive trace & access to find hidden leaks across ${activeTownName}.`
        : "Visual plumbing inspections and trace & access to find hidden leaks.",
      actionText: activeTownName ? `Find Leaks in ${activeTownName}` : "Leak Detection",
      href: buildServiceUrl("leak-detection"),
      isExternal: false
    },
    {
      icon: Wrench,
      title: "New Install Plumbing",
      desc: "Dishwasher and washing machine installs, sink replacements, and tap upgrades.",
      actionText: "Book Online",
      href: CALENDAR_LINK,
      isExternal: true
    }
  ];

  return (
    <section id="services" className="pt-20 pb-40 bg-slate-50 relative z-10">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="w-12 h-1 bg-[#A6892C] mb-6"></div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
              Our <span className="text-[#A6892C]">Services</span> {activeTownName ? `in ${activeTownName}` : ''}
            </h2>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const cardClasses =
              "relative z-30 block bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-start border border-gray-100 cursor-pointer";

            const cardContent = (
              <>
                <div className="bg-[#A6892C] w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-slate-900" />
                </div>

                <h3 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed text-sm font-medium flex-grow">
                  {service.desc}
                </p>

                <div className="mt-auto flex items-center text-[#c5a021] font-bold text-sm uppercase tracking-wider group-hover:text-[#A6892C]">
                  {service.actionText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </>
            );

            return service.isExternal ? (
              <a
                key={index}
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
              >
                {cardContent}
              </a>
            ) : (
              <Link key={index} to={service.href} className={cardClasses}>
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