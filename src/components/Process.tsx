import { Phone, ClipboardCheck, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

const Process = () => {
  const steps = [
    { 
      number: "1",
      icon: Phone, 
      title: 'Contact Us 24/7', 
      desc: 'Call or book online. Tell us what you need, whether it is an emergency leak, boiler failure, or drain blockage.' 
    },
    { 
      number: "2",
      icon: ClipboardCheck, 
      title: 'Honest Assessment', 
      desc: 'Our local engineer arrives with £0 call-out charge, inspects the fault, and gives a clear fixed quote before work starts.' 
    },
    { 
      number: "3",
      icon: Wrench, 
      title: 'Quality Completion', 
      desc: 'Work is carried out to certified trade standards using premium materials, fully tested for leaks, flow, and safety.' 
    },
    { 
      number: "4",
      icon: ShieldCheck, 
      title: 'Payment & Guarantee', 
      desc: 'Pay on completion by card, bank transfer, or spread the cost with flexible boiler finance. Full warranty provided.' 
    }
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* SECTION HEADER (PHACS Style) */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-xs font-black text-[#A6892C] uppercase tracking-[0.25em] block mb-3">
            How We Work With You
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            A Clear Journey From First Call to Finish
          </h2>
          <p className="mt-4 text-slate-500 font-medium text-sm sm:text-base">
            Simple, honest local plumbing and heating. No call-out charges and no surprise bills.
          </p>
        </div>

        {/* 4-STEP CARDS WITH CONNECTING LINE */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-slate-200/80 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative group pt-4">
                  {/* Floating Number Badge */}
                  <div className="absolute top-0 left-6 sm:left-8 w-8 h-8 rounded-full bg-[#A6892C] text-slate-950 font-black text-sm flex items-center justify-center shadow-md ring-4 ring-white z-20 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-[#A6892C] transition-all duration-200">
                    {step.number}
                  </div>

                  {/* Card Container */}
                  <div className="bg-white rounded-3xl p-7 pt-9 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#A6892C]/50 transition-all duration-300 h-full flex flex-col justify-between group-hover:-translate-y-1">
                    <div>
                      {/* Soft Icon Pod */}
                      <div className="w-14 h-14 rounded-2xl bg-[#A6892C]/10 border border-[#A6892C]/20 flex items-center justify-center mb-6 text-[#A6892C] group-hover:bg-[#A6892C] group-hover:text-slate-950 transition-colors duration-200">
                        <IconComponent className="w-6 h-6 stroke-[2.2]" />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-2.5">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#A6892C] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Step {step.number} Verified</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;