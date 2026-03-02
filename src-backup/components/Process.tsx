import React from 'react';
import { Phone, Truck, Wrench, CheckCircle } from 'lucide-react';

const Process = () => {
  const steps = [
    { 
      number: "01",
      icon: Phone, 
      title: 'Contact Us', 
      desc: 'Call 01530 654 062. We answer 24/7 immediately.' 
    },
    { 
      number: "02",
      icon: Truck, 
      title: 'We Arrive', 
      desc: 'Our engineer is dispatched and arrives within the hour.' 
    },
    { 
      number: "03",
      icon: Wrench, 
      title: 'The Repair', 
      desc: 'We diagnose the issue and fix it safely on the spot.' 
    },
    { 
      number: "04",
      icon: CheckCircle, 
      title: 'Job Done', 
      desc: 'You only pay when the work is complete and you are happy.' 
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase mb-6 tracking-tight">
            Simple & Transparent
          </h2>
          <p className="text-xl text-slate-600">No Call Out Charge. No Hidden Fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Card */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:bg-slate-900 hover:text-white transition-all duration-300 h-full border border-slate-100 hover:border-slate-900 hover:-translate-y-2">
                
                {/* Number */}
                <div className="text-6xl font-black text-slate-200 group-hover:text-slate-800 mb-4 transition-colors">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-[#A6892C] rounded-xl flex items-center justify-center mb-6 text-slate-900 shadow-lg">
                  <step.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-500 group-hover:text-slate-300 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;