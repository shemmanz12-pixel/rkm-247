import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const { town } = useParams<{ town: string }>();
  
  // Helper to format the town name nicely
  const formatName = (slug: string | undefined) => {
    if (!slug) return 'Coalville'; // Default fallback
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const townName = formatName(town);
  
  // State to handle which question is open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 1. DYNAMIC QUESTIONS
  const faqs: { question: React.ReactNode; answer: React.ReactNode }[] = [
    // --- EMERGENCY ---
    {
      question: (<span>Do you provide emergency plumbing services in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Yes, we provide fast-response emergency plumbing services in <span className="text-[#A6892C]">{townName}</span> and surrounding areas. Whether you are dealing with a burst pipe, major leak, blocked toilet, no hot water, or sudden pressure loss, we understand plumbing emergencies cannot wait. Because we operate locally, we aim to attend as quickly as possible to minimise water damage and disruption.</span>)
    },
    {
      question: (<span>How quickly can a plumber attend in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>For emergency plumbing in <span className="text-[#A6892C]">{townName}</span>, we aim for same-day attendance and often arrive within a few hours depending on availability. Being local means we are already working in and around <span className="text-[#A6892C]">{townName}</span>, allowing us to respond faster than national companies. Non-urgent jobs can usually be booked within a few days.</span>)
    },

    // --- PRICING ---
    {
      question: (<span>How much does a plumber cost in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>We work on fixed pricing rather than hourly rates. Most standard plumbing jobs in <span className="text-[#A6892C]">{townName}</span> start from £120+, depending on the type of repair, materials required, and access to the issue. We believe in clear, upfront pricing, so once we assess the problem, we confirm the cost before starting any work. There are no hidden fees and no unexpected surprises.</span>)
    },
    {
      question: (<span>What is a reasonable plumbing call out charge in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Many plumbing companies charge a separate call out fee just to attend your property. However, we charge £0 call out fee in <span className="text-[#A6892C]">{townName}</span>. You only pay for the work carried out. We believe this offers better value and full transparency for customers. All pricing is discussed clearly before work begins.</span>)
    },
    {
      question: (<span>How much does it cost to clear a blocked drain in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>The cost to clear a blocked drain in <span className="text-[#A6892C]">{townName}</span> typically starts from £120+, depending on the severity of the blockage and whether it is internal or external. Simple sink or toilet blockages can often be resolved quickly, while outside drains or recurring problems may require further investigation. We use professional equipment to properly clear the blockage rather than temporarily masking the issue.</span>)
    },

    // --- DIY & TRUST ---
    {
      question: (<span>Can I unblock a drain myself in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Minor sink blockages can sometimes be cleared using a plunger or by removing visible debris. However, chemical drain cleaners can damage pipework and rarely fix the root cause. If blockages keep returning or affect multiple fixtures, it usually indicates a deeper issue in the drainage system. In these cases, professional equipment is needed to fully resolve the problem.</span>)
    },
    {
      question: (<span>How do I know I am choosing a reliable plumber in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>A reliable plumber should provide transparent pricing, clear communication, and genuine local reviews. You should never feel pressured into unnecessary work. We pride ourselves on honest advice, fixed pricing, and professional workmanship throughout <span className="text-[#A6892C]">{townName}</span>. We explain the issue clearly and confirm costs before proceeding.</span>)
    },

    // --- LONG-TAIL SEO QUESTIONS ---
    {
      question: (<span>Why is my boiler losing pressure in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>If your boiler keeps losing pressure in <span className="text-[#A6892C]">{townName}</span>, it is often caused by a small system leak, a faulty pressure relief valve, or an issue with the expansion vessel. Topping up the pressure may provide a temporary fix, but repeated pressure loss usually indicates an underlying fault. Leaving it unresolved can eventually cause breakdowns or water damage.</span>)
    },
    {
      question: (<span>Why does my toilet keep blocking in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>A toilet that repeatedly blocks in <span className="text-[#A6892C]">{townName}</span> is often caused by a partial obstruction further down the pipework or a restriction in the external drain. If plunging only solves the issue temporarily, it usually means the blockage has not been fully cleared. Recurring blockages should be investigated properly to prevent overflow or damage.</span>)
    },
    {
      question: (<span>Why are my pipes making banging noises in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Banging or knocking pipes in <span className="text-[#A6892C]">{townName}</span> are commonly caused by water hammer, loose pipework, or pressure fluctuations within the system. While it may seem harmless at first, ongoing vibration can stress joints and fittings over time. Identifying and correcting the issue early helps prevent leaks and long-term damage.</span>)
    },

    // --- SERVICES ---
    {
      question: (<span>What types of blocked drains do you clear in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>We clear blocked toilets, sinks, baths, showers, and external drains throughout <span className="text-[#A6892C]">{townName}</span>. Whether caused by grease build-up, wipes, debris, or collapsed pipework, we use professional equipment to restore proper flow safely and effectively.</span>)
    },
    {
      question: (<span>Do you offer leak detection services in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Yes. If you notice damp patches, water stains, or pressure loss in <span className="text-[#A6892C]">{townName}</span>, these may indicate a hidden leak. We carefully investigate and locate the issue while keeping disruption to a minimum wherever possible. Early detection helps prevent more serious structural damage.</span>)
    },
    {
      question: (<span>Do you cover commercial properties in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Yes, we provide plumbing and drainage services for commercial properties in <span className="text-[#A6892C]">{townName}</span>. From offices and retail units to rental properties, we understand the need for fast response and minimal disruption to your business.</span>)
    },

        // --- RELIABILITY & OBJECTION HANDLING ---
    {
      question: (<span>Do you turn up at the agreed appointment time in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Yes. When we book an appointment in <span className="text-[#A6892C]">{townName}</span>, we commit to it. We understand how frustrating it is to wait in all day for a tradesperson who does not arrive. If we are ever delayed due to an emergency job overrunning, we will contact you immediately to keep you informed. Clear communication and reliability are a core part of our service, and we always respect your time.</span>)
    },
    {
      question: (<span>Will the price change after you start the job in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>No. We work on fixed pricing, not hourly rates. Once we assess the issue in <span className="text-[#A6892C]">{townName}</span>, we explain the problem clearly and confirm the agreed price before starting any work. There are no hidden fees and no surprise charges. If additional issues are discovered, we discuss your options first so you remain in full control of the decision.</span>)
    },
    {
      question: (<span>What happens if the repair does not fix the problem in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>We aim to diagnose plumbing issues correctly the first time. However, if a related issue develops after work has been carried out in <span className="text-[#A6892C]">{townName}</span>, we stand by our workmanship. If there is a genuine fault connected to the work completed, we will return to investigate and resolve it professionally. Our goal is long-term solutions rather than temporary fixes.</span>)
    },
    {
      question: (<span>Will you pressure me into replacing my boiler in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>No. We provide honest advice based on the condition and safety of your system. If a boiler in <span className="text-[#A6892C]">{townName}</span> can be safely repaired, we will explain that option clearly. If replacement is more cost-effective long term, we will outline why — but the final decision is always yours. We do not use pressure sales tactics.</span>)
    },
    {
      question: (<span>Will you explain the plumbing issue clearly before starting work in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Yes. Before carrying out any work in <span className="text-[#A6892C]">{townName}</span>, we explain the issue in straightforward terms so you understand exactly what the problem is and what needs to be done. We believe customers should feel confident and informed before approving any repair or installation.</span>)
    },

    // --- PAYMENTS & WARRANTY ---
    {
      question: (<span>How do I pay for plumbing services in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>We accept major debit and credit cards as well as bank transfers. Payment is taken once the work in <span className="text-[#A6892C]">{townName}</span> has been completed and you are satisfied with the result.</span>)
    },
    {
      question: (<span>Do you offer a guarantee on your plumbing work in <span className="text-[#A6892C]">{townName}</span>?</span>),
      answer: (<span>Yes, all workmanship carried out in <span className="text-[#A6892C]">{townName}</span> is backed by our guarantee for your peace of mind. Any supplied parts are covered by the manufacturer's warranty where applicable.</span>)
    }
   ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* HEADER */}
        <div className="mb-12">
          <div className="w-12 h-1 bg-[#A6892C] mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            FREQUENTLY ASKED <span className="text-[#A6892C]">QUESTIONS</span>
          </h2>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index 
                  ? 'border-[#A6892C] bg-yellow-50/10 shadow-sm' 
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className={`w-6 h-6 flex-shrink-0 ${openIndex === index ? 'text-[#A6892C]' : 'text-gray-300'}`} />
                  <span className={`text-lg font-bold uppercase tracking-wide ${openIndex === index ? 'text-slate-900' : 'text-slate-600'}`}>
                    {faq.question}
                  </span>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#A6892C]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-dashed border-[#A6892C]/20 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
