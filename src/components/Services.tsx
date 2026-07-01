// React import not required with the new jsx transform when not referencing React directly
import { Wrench, Phone, Droplets, Flame, Search, ArrowRight } from 'lucide-react';

const Services = () => {

  // 1. YOUR DESIGNATED PHONE NUMBER (Hides natively inside the link tag protocol until clicked)
  const PHONE_NUMBER = "07848969229"; 

  // 2. YOUR GOOGLE CALENDAR LINK
  const CALENDAR_LINK = "https://calendar.app.google/pbb7EJraxjMQd1xS9";

  const services = [
    {
      icon: Flame,
      title: "Heating Engineer",
      desc: "Boiler Installs and Repairs, Radiator replacements, system flushing, and thermostat upgrades for efficiency.",
      actionText: "Call Us Now",
      href: `tel:${PHONE_NUMBER}`,
      isExternal: false
    },
    {
      icon: Phone,
      title: "Emergency Plumber",
      desc: "Rapid assistance for burst pipes and leak repairs when you need us most.",
      actionText: "Call Us Now",
      href: `tel:${PHONE_NUMBER}`,
      isExternal: false
    },
    {
      icon: Droplets,
      title: "Drains Unblocking",
      desc: "Specialist Drain unblocking for manholes, soil stacks, and main drains using high-pressure jetting.",
      actionText: "Call Us Now",
      href: `tel:${PHONE_NUMBER}`,
      isExternal: false
    },
    {
      icon: Wrench,
      title: "General Plumbing",
      desc: "Leaking pipes, tap repairs, toilet fixes, and general maintenance for your home.",
      actionText: "Book Online",
      href: CALENDAR_LINK,
      isExternal: true
    },
    {
      icon: Search,
      title: "Leak Detection",
      desc: "Visual plumbing inspections and trace & access to find hidden leaks.",
      actionText: "Book Online",
      href: CALENDAR_LINK,
      isExternal: true
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
              Our <span className="text-[#A6892C]">Services</span>
            </h2>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <a 
              key={index} 
              href={service.href}
              // Opens calendar in a new tab; calls natively from current tab
              target={service.isExternal ? "_blank" : "_self"}
              rel={service.isExternal ? "noopener noreferrer" : ""}
              className="relative z-30 block bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-start border border-gray-100 cursor-pointer"
            >
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;