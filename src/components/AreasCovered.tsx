import { Link, useParams } from 'react-router-dom';
import { 
  MapPin, 
  Droplets, 
  PhoneCall, 
  Flame, 
  Wrench, 
  Search, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

const AreasCovered = () => {
  const { service } = useParams<{ service: string }>();

  // SITEMAP REGIONS
  const areas = [
    "Albert Village", "Ashby de la Zouch", "Bagworth", "Bardon Hill", "Battram",
    "Blackfordby", "Boundary", "Breedon on the Hill", "Coalville", "Coleorton",
    "Copt Oak", "Donington le Heath", "Donisthorpe", "Ellistown", "Griffydam",
    "Heather", "Hugglescote", "Ibstock", "Leicestershire", "Lount", "Markfield", "Measham",
    "Moira", "Newbold Coleorton", "Normanton le Heath", "Oakthorpe", "Osgathorpe",
    "Packington", "Peggs Green", "Ravenstone", "Shellbrook", "Sinope", "Smisby",
    "Snibston", "Stanton under Bardon", "Staunton Harold", "Swannington",
    "Thringstone", "Tonge", "Whitwick", "Willesley", "Wilson", "Worthington"
  ];

  // PRIMARY SERVICES
  const services = [
    { id: 'emergency-plumber', name: 'Emergency', icon: <PhoneCall className="w-3 h-3" /> },
    { id: 'local-plumber', name: 'Plumber', icon: <Wrench className="w-3 h-3" /> },
    { id: 'heating-engineer', name: 'Heating', icon: <Flame className="w-3 h-3" /> },
    { id: 'drain-unblocking', name: 'Drains', icon: <Droplets className="w-3 h-3" /> },
    { id: 'leak-detection', name: 'Leaks', icon: <Search className="w-3 h-3" /> },
    { id: 'plumbing-installations', name: 'Installs', icon: <ShieldCheck className="w-3 h-3" /> }
  ];

  const postcodes = ["LE67", "LE65", "DE11", "DE12", "DE73", "LE6", "LE67 2PA"];

  return (
    <section id="areas-covered" className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-t border-slate-200/80 relative overflow-hidden">
      
      {/* BACKGROUND ACCENT GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#A6892C]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A6892C]/10 border border-[#A6892C]/30 text-[#A6892C] font-black text-xs uppercase tracking-widest mb-4 shadow-sm">
            <MapPin className="w-4 h-4 text-[#A6892C]" />
            <span>North West Leicestershire Hub</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Local <span className="text-[#A6892C]">Plumbing, Heating &amp; Drainage</span> Across Coalville &amp; Beyond
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Direct dispatch with rapid <span className="text-slate-900 font-bold">24/7 callouts</span> and scheduled maintenance. Select your town or village below to connect directly with an engineer.
          </p>
        </div>

        {/* TOWN & SERVICE CARD MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {areas.map((area, index) => {
            const slug = area.toLowerCase().replace(/ /g, '-');
            const isCoalville = area === "Coalville";

            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 ${
                  isCoalville 
                    ? 'border-[#A6892C] shadow-md ring-2 ring-[#A6892C]/20' 
                    : 'border-slate-200/70 hover:border-[#A6892C]/60'
                }`}
              >
                {/* Town Title */}
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isCoalville ? 'bg-[#A6892C] animate-pulse' : 'bg-slate-300'}`} />
                    <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
                      {area}
                    </h3>
                  </div>
                  {isCoalville && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#A6892C] text-slate-950 px-2 py-0.5 rounded-full">
                      HQ
                    </span>
                  )}
                </div>

                {/* Service Deep-Links */}
                <div className="grid grid-cols-2 gap-2">
                  {services.map(svc => {
                    const isCurrentContext = service === svc.id;

                    return (
                      <Link 
                        key={svc.id}
                        to={`/${svc.id}/${slug}/`}
                        title={`${svc.name} service in ${area}`}
                        className={`flex items-center justify-between gap-1.5 text-[11px] font-bold px-2.5 py-2 rounded-lg border transition-all duration-200 ${
                          isCurrentContext 
                            ? 'bg-slate-900 text-[#A6892C] border-slate-900 shadow-sm' 
                            : 'bg-slate-50/70 border-slate-200/60 text-slate-700 hover:bg-[#A6892C] hover:text-slate-950 hover:border-[#A6892C] hover:shadow-sm'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          {svc.icon}
                          <span className="truncate">{svc.name}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SEO ACCELERATOR & DISPATCH HUB */}
        <div className="mt-16 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            
            {/* Left Column: Local Authority Copy */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-[#A6892C] font-bold text-xs uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                <span>Round-The-Clock Dispatch</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Covering North West Leicestershire with <span className="text-[#A6892C]">£0 Call-Out Fees</span>
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                RKM Plumbing, Heating &amp; Drainage provides rapid domestic callouts, boiler breakdowns, trace &amp; access leak detection, and high-pressure drain jetting. Our mobile engineers operate locally across <strong>Coalville, Ashby-de-la-Zouch, Whitwick, Ibstock</strong>, and every surrounding parish.
              </p>

              {/* Postal Code Coverage Tags */}
              <div className="pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
                  Key Postal Districts Served:
                </span>
                <div className="flex flex-wrap gap-2">
                  {postcodes.map((code) => (
                    <span 
                      key={code} 
                      className="bg-slate-100 hover:bg-[#A6892C]/10 hover:text-[#A6892C] text-slate-700 font-bold text-xs px-3 py-1 rounded-md border border-slate-200 transition-colors"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guarantee Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A6892C]" />
                  <span>24/7 Rapid Emergency Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A6892C]" />
                  <span>Fully Insured &amp; Certified Engineers</span>
                </div>
              </div>
            </div>

            {/* Right Column: Direct CTA Box */}
            <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 text-center text-white flex flex-col justify-center items-center shadow-xl border border-slate-800">
              <span className="text-[#A6892C] font-black uppercase text-xs tracking-widest mb-2">
                Immediate Assistance
              </span>
              <p className="text-xl font-bold mb-6 text-slate-100">
                Need an engineer dispatched now?
              </p>
              
              <a 
                href="tel:01530654062" 
                className="w-full inline-flex items-center justify-center gap-3 bg-[#A6892C] hover:bg-[#c4a030] text-slate-950 px-6 py-4 rounded-xl font-black text-base uppercase tracking-wider transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              >
                <span>Call 01530 654 062</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <p className="text-slate-400 text-xs mt-4">
                Available 24/7 across all listed areas.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AreasCovered;