import { useLocation, useParams } from 'react-router-dom';
import { Wrench, Phone, Droplets, Flame, Search, CheckCircle2, Calendar } from 'lucide-react';
import { towns } from '../townConfig';

interface ServicesProps {
  currentLocation?: string;
}

const Services = ({ currentLocation }: ServicesProps) => {
  let pathname = '';
  let params: { town?: string; townSlug?: string; slug?: string; location?: string } = {};

  try {
    const loc = useLocation();
    pathname = loc?.pathname || '';
  } catch (e) {
    pathname = '';
  }

  try {
    params = useParams<{ town?: string; townSlug?: string; slug?: string; location?: string }>() || {};
  } catch (e) {
    params = {};
  }

  const normalizeKey = (value?: string) =>
    (value || '')
      .toLowerCase()
      .replace(/\/$/, '')
      .replace(/\.html$/, '')
      .trim()
      .replace(/\s+/g, '-');

  const pathSegments = pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || '';
  const detectedFromPath = towns[normalizeKey(lastSegment)] ? lastSegment : '';

  const rawSlug =
    currentLocation ||
    params.town ||
    params.townSlug ||
    params.slug ||
    params.location ||
    detectedFromPath ||
    'coalville';

  const activeSlug = normalizeKey(rawSlug) || 'coalville';

  // Direct key match first, fallback to matching townData.name if a display name was passed
  const townData =
    towns[activeSlug] ||
    Object.values(towns).find((t) => normalizeKey(t.name) === activeSlug) ||
    towns['coalville'];

  const activeTownName =
    townData?.name ||
    activeSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  const phone = townData?.phone || '01530 654062';
  const cleanPhone = phone.replace(/\s+/g, '');
  const TEL_LINK = `tel:${cleanPhone}`;
  const CALENDAR_LINK = 'https://calendar.app.google/pbb7EJraxjMQd1xS9';

  const services = [
    {
      icon: Phone,
      title: 'Emergency Plumbing',
      image: '/emergency-plumber.webp',
      badgeBg: 'bg-[#A6892C] text-slate-950',
      desc: `24/7 immediate dispatch across ${activeTownName} for burst pipes and sudden water leaks.`,
      items: [
        'Burst pipes & active water leaks',
        'Failed stopcocks & isolation valves',
        'Rapid 60-minute emergency response',
      ],
      href: TEL_LINK,
      ctaLabel: `Call ${phone}`,
      isBooking: false,
    },
    {
      icon: Droplets,
      title: 'Drain Unblocking',
      image: '/drain-unblock.webp',
      badgeBg: 'bg-slate-900 text-[#A6892C]',
      desc: `High-pressure water jetting for blocked outdoor drains, toilets, and gullies in ${activeTownName}.`,
      items: [
        'High-pressure drain jetting',
        'Blocked toilets, sinks & outside drains',
        'HD CCTV drain camera surveys',
      ],
      href: TEL_LINK,
      ctaLabel: `Call ${phone}`,
      isBooking: false,
    },
    {
      icon: Flame,
      title: 'Boilers & Heating',
      image: '/team-photo.webp',
      badgeBg: 'bg-slate-900 text-[#A6892C]',
      desc: `Gas Safe boiler installs, annual servicing, and breakdown repairs in ${activeTownName}.`,
      items: [
        'Combi replacements & annual servicing',
        'Boiler breakdown diagnostics',
        'Radiator valves & power flushing',
      ],
      href: TEL_LINK,
      ctaLabel: `Call ${phone}`,
      isBooking: false,
    },
    {
      icon: Search,
      title: 'Leak Detection',
      image: '/leak-detection.webp',
      badgeBg: 'bg-[#A6892C] text-slate-950',
      desc: `Thermal imaging and acoustic trace & access to pinpoint hidden floor and wall leaks in ${activeTownName}.`,
      items: [
        'Thermal imaging camera inspections',
        'Non-destructive floor & wall tracing',
        'Insurance-approved leak reports',
      ],
      href: TEL_LINK,
      ctaLabel: `Call ${phone}`,
      isBooking: false,
    },
    {
      icon: Wrench,
      title: 'General Plumbing',
      image: '/general-plumbing.webp',
      badgeBg: 'bg-slate-900 text-[#A6892C]',
      desc: `Everyday domestic repairs, shower valves, dripping taps, and pipework across ${activeTownName}.`,
      items: [
        'Shower mixer valves & cartridges',
        'Dripping taps & running toilets',
        'Waste pipe & trap repairs',
      ],
      href: CALENDAR_LINK,
      ctaLabel: 'Book Online',
      isBooking: true,
    },
    {
      icon: Wrench,
      title: 'Appliance & Installs',
      image: '/appliance-install.webp',
      badgeBg: 'bg-slate-900 text-[#A6892C]',
      desc: `Professional plumbing installation of washing machines, dishwashers, and kitchen fixtures in ${activeTownName}.`,
      items: [
        'Washing machines & dishwashers',
        'Kitchen sinks, mixer & outside taps',
        'Instant online slot confirmation',
      ],
      href: CALENDAR_LINK,
      ctaLabel: 'Book Online',
      isBooking: true,
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-[#FAF8F5] relative z-10 border-b border-slate-200/80">
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
            Gas Safe registered (#987039) plumbing, heating, and drainage engineers available 24/7 for domestic homes and commercial sites.
          </p>
        </div>

        {/* PHOTO CARD GRID (Mobile 1-Col -> Tablet 2-Col -> Desktop 3-Col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <a
                key={index}
                href={service.href}
                target={service.isBooking ? '_blank' : undefined}
                rel={service.isBooking ? 'noopener noreferrer' : undefined}
                aria-label={`${service.ctaLabel} for ${service.title} in ${activeTownName}`}
                className="group bg-white border border-slate-200/90 hover:border-[#A6892C] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col active:scale-[0.99]"
              >
                {/* Top Photo (Clean, zero pricing overlays) */}
                <div className="relative aspect-[16/10] w-full bg-slate-200 overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} in ${activeTownName}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content with Overlapping Circular Badge */}
                <div className="relative px-5 sm:px-6 pt-9 pb-6 flex-1 flex flex-col justify-between">
                  {/* Circular Icon Badge straddling the photo bottom border */}
                  <div
                    className={`absolute -top-7 left-5 sm:left-6 w-14 h-14 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${service.badgeBg}`}
                  >
                    <IconComponent className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <div>
                    {/* Title & Description */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 tracking-tight group-hover:text-[#A6892C] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                      {service.desc}
                    </p>

                    {/* Problem Checkmarks */}
                    <ul className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A6892C] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct Town-Specific Call / Book Online CTA */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-sm font-extrabold text-[#A6892C] group-hover:text-slate-900 underline decoration-2 underline-offset-4 transition-colors">
                      {service.isBooking ? (
                        <Calendar className="w-4 h-4 shrink-0" />
                      ) : (
                        <Phone className="w-4 h-4 shrink-0" />
                      )}
                      <span>{service.ctaLabel}</span>
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;