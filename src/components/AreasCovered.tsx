// React import not required with the new jsx transform when not referencing React directly
import { Link, useParams } from 'react-router-dom'; // Added useParams
import { MapPin, Droplets, PhoneCall, Thermometer, Wrench, PlusCircle, Search, ArrowRight } from 'lucide-react';

const AreasCovered = () => {
  // 1. GET CURRENT PARAMS TO MAKE LINKS SMART
  const { service } = useParams<{ service: string }>();
  
  // YOUR EXACT LIST FROM SITEMAP
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

  // YOUR SERVICES
  const services = [
    { id: 'local-plumber', name: 'Plumber', icon: <Wrench className="w-3 h-3" /> },
    { id: 'emergency-plumber', name: 'Emergency', icon: <PhoneCall className="w-3 h-3" /> },
    { id: 'drain-unblocking', name: 'Drains', icon: <Droplets className="w-3 h-3" /> },
    { id: 'heating-engineer', name: 'Heating', icon: <Thermometer className="w-3 h-3" /> },
    { id: 'plumbing-installations', name: 'Installs', icon: <PlusCircle className="w-3 h-3" /> },
    { id: 'leak-detection', name: 'Leaks', icon: <Search className="w-3 h-3" /> }
  ];

  return (
    <section id="areas-covered" className="py-20 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-[#A6892C] font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-5 h-5" />
            <span>24/7 Local Coverage</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-6">
            Find a Local <span className="text-[#A6892C] font-bold italic">Plumber</span> Near You
          </h2>
          <p className="text-xl text-gray-600">
            Our plumbing experts provide rapid 60-minute response times across the 
            <strong> North West Leicestershire</strong> Coverage. 
            Click your local village below for immediate assistance.
          </p>
        </div>

        {/* GRID OF TOWNS AND SERVICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => {
            const slug = area.toLowerCase().replace(/ /g, '-');
            return (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-[#A6892C]/30 transition-all">
                <h4 className="font-bold text-slate-700 mb-3 text-lg">{area}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {services.map(svc => {
                    // Smart Highlight: If user is on 'heating-engineer' page, highlight that button
                    const isCurrentContext = service === svc.id;
                    
                    return (
                      <Link 
                        key={svc.id}
                        to={`/${svc.id}/${slug}`}
                        title={`${svc.name} in ${area}`}
                        className={`flex items-center gap-1 text-[10px] font-bold uppercase border px-2 py-2 rounded transition-all shadow-sm ${
                          isCurrentContext 
                            ? 'bg-slate-900 text-white border-slate-900' // Highlight active service
                            : 'bg-slate-50 border-slate-100 text-gray-600 hover:bg-[#A6892C] hover:text-white hover:border-[#A6892C]'
                        }`}
                      >
                        {svc.icon} {svc.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* YOUR ORIGINAL CALL ACTION & FOOTNOTE */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto italic">
            RKM Plumbing Services is a dedicated local company. If you don't see your village listed above, 
            please call us directly. We cover the entire North West Leicestershire area (including **LE67, LE65, DE11, DE12, and DE73**) 24 hours a day.
          </p>
          <a href="tel:01530654062" className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg">
            Call 01530 654 062 <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AreasCovered;