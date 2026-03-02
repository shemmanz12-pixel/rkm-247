import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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
  const faqs = [
    // --- EXISTING QUESTIONS ---
    {
      question: `Do you provide emergency plumbing services in ${townName}?`,
      answer: `Yes, we provide 24/7 emergency plumbing callouts in ${townName} and the surrounding areas. We aim to be with you in under 60 minutes for urgent leaks and repairs.`
    },
    {
      question: `How quickly can a plumber attend in ${townName}?`,
      answer: `For emergency callouts in ${townName}, we provide fast response times. Because we are local, we don't have to travel far, meaning we can often fix your issue before other companies would even arrive.`
    },
    {
      question: `Do you offer local plumbing coverage in ${townName}?`,
      answer: `Yes, RKM Plumbing is a trusted local business serving ${townName}. We are not a national call centre. We handle everything from dripping taps to full boiler installations for residents in ${townName}.`
    },
    {
      question: `Is there a call out charge for jobs in ${townName}?`,
      answer: `No. Unlike many national chains, RKM Plumbing charges £0 call out fee. You only pay for the work we do at your property in ${townName}.`
    },

    // --- NEW QUESTIONS ADDED FOR SEO (Gas Safe Removed) ---
    {
      question: `What types of blocked drains do you clear in ${townName}?`,
      answer: `We clear all types of blockages in ${townName}, including blocked toilets, sinks, baths, and external main drains. Our vans are equipped with high-pressure water jetting and CCTV survey equipment to tackle even the most stubborn blockages.`
    },
    {
      question: `Do you offer leak detection services in ${townName}?`,
      answer: `Yes. If you have a hidden leak (like a damp patch on a ceiling or a drop in boiler pressure) in ${townName}, we use specialist thermal imaging and acoustic listening devices to trace the leak without causing unnecessary damage to your property.`
    },
    {
      question: `Do you cover commercial properties in ${townName}?`,
      answer: `Yes, we support local businesses in ${townName} with commercial plumbing and drainage services. From blocked staff toilets to commercial boiler repairs, we offer priority response for business customers to minimize downtime.`
    },
    {
      question: `How do I pay for the service?`,
      answer: `We accept all major credit and debit cards, as well as bank transfers. Our engineers carry card terminals for your convenience, so payment can be handled easily once the job in ${townName} is complete.`
    },
    {
      question: `Do you offer a warranty on your work?`,
      answer: `Yes, all workmanship carried out in ${townName} is backed by our guarantee. Parts are covered by the manufacturer's warranty (typically 12 months). We are proud of our reputation and always ensure you are satisfied before we leave.`
    }
  ];

  // 2. GOOGLE SCHEMA GENERATOR
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* INJECT SCHEMA FOR GOOGLE */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </Helmet>

        {/* HEADER */}
        <div className="mb-12">
          <div className="w-12 h-1 bg-[#A6892C] mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            Common <span className="text-[#A6892C]">Questions</span>
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
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
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