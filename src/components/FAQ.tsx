import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, HelpCircle, Phone, ArrowRight, MessageSquareQuote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { towns } from '../townConfig';

interface FAQProps {
  townSlug?: string;
  serviceSlug?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = ({ townSlug, serviceSlug }: FAQProps) => {
  const params = useParams<{
    town?: string;
    townSlug?: string;
    service?: string;
    serviceSlug?: string;
  }>();

  const normalize = (value: string) =>
    value.toLowerCase().replace(/\/$/, '').replace(/\.html$/, '').trim();

  const rawTown = townSlug || params.townSlug || params.town || '';
  const rawService = serviceSlug || params.serviceSlug || params.service || '';

  const cleanTownKey = normalize(rawTown);
  const cleanServiceKey = normalize(rawService);

  const townData = (towns as any)?.[cleanTownKey];
  const townName =
    townData?.name ||
    cleanTownKey
      .split('-')
      .filter(Boolean)
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') ||
    'Coalville';

  const phone = townData?.phone || '01530 654 062';

  const postcodes = townData?.postcodes?.length
    ? townData.postcodes.join(', ')
    : 'LE67, LE65';

  const nearbyTowns = townData?.nearbyTowns?.length
    ? townData.nearbyTowns.join(', ')
    : 'Coalville, Whitwick, Ibstock and surrounding areas';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSets = useMemo(() => {
    // 1. Drain Unblocking FAQs
    const drainFAQs: FAQItem[] = [
      {
        question: `Do you provide emergency drain unblocking in ${townName}?`,
        answer: `Yes, we provide 24/7 emergency drain unblocking across ${townName} and surrounding areas. We clear blocked outside drains, manholes, soil stacks, gullies, sinks, and overflowing toilets for domestic and commercial properties.`,
      },
      {
        question: `How quickly can you attend a blocked drain in ${townName}?`,
        answer: `Because our engineers operate locally near Coalville and North West Leicestershire, we typically arrive on-site within 60 minutes for urgent blockages across ${townName} and postcode areas including ${postcodes}.`,
      },
      {
        question: `Do you clear blocked outside drains and gullies in ${townName}?`,
        answer: `Yes, we use commercial high-pressure water jetting and mechanical rotary equipment in ${townName} to clear grease, wet wipes, tree roots, silt, and foreign debris from external drains and main sewer lines.`,
      },
      {
        question: `Can you unblock slow-draining toilets, sinks, and showers in ${townName}?`,
        answer: `Yes, we clear internal waste pipe blockages, stubborn toilet clogs, and slow-draining shower traps throughout ${townName}, resolving bad smells and preventing indoor flooding.`,
      },
      {
        question: `Do you charge a call out fee for drain unblocking in ${townName}?`,
        answer: `No. We offer £0 call-out fees across ${townName}. You only pay a transparent, fixed price for the drain clearance work carried out with no hidden extras.`,
      },
    ];

    // 2. Emergency Plumbing FAQs
    const emergencyPlumberFAQs: FAQItem[] = [
      {
        question: `Do you provide a 24/7 emergency plumber in ${townName}?`,
        answer: `Yes, we offer round-the-clock emergency plumbing across ${townName} 365 days a year. We handle burst pipes, severe ceiling leaks, failed stopcocks, overflowing toilets, and boiler breakdowns.`,
      },
      {
        question: `How quickly can an emergency plumber arrive in ${townName}?`,
        answer: `Our response target is within 60 minutes across ${townName}, ${nearbyTowns}, and postal districts ${postcodes}.`,
      },
      {
        question: `Do you charge call out fees for emergency callouts in ${townName}?`,
        answer: `No. We maintain a strict £0 call-out fee policy in ${townName}. You receive an upfront, honest quote before we begin any emergency repairs.`,
      },
      {
        question: `What plumbing emergencies do you fix in ${townName}?`,
        answer: `We attend burst copper and plastic pipes, dripping stopcocks, emergency water isolation, leaking radiators, failing immersion heaters, and urgent domestic drainage problems in ${townName}.`,
      },
      {
        question: `Are your emergency engineers certified and insured in ${townName}?`,
        answer: `Yes, all our engineers are fully insured, highly qualified, and Gas Safe registered where heating and boiler work is involved.`,
      },
    ];

    // 3. Leak Detection FAQs
    const leakDetectionFAQs: FAQItem[] = [
      {
        question: `How do you find hidden water leaks in ${townName}?`,
        answer: `We utilize non-invasive trace and access methods in ${townName}, including acoustic pipe listening equipment, thermal imaging cameras, and moisture meters to pinpoint leaks behind plasterboard or beneath floorboards without destructive digging.`,
      },
      {
        question: `What are the common signs of a hidden leak in my ${townName} home?`,
        answer: `Signs include damp spots on walls or ceilings, unexplained drops in boiler pressure, spinning water meters when taps are turned off, warm floor patches, and musty odours.`,
      },
      {
        question: `Do you repair the pipe once the leak is detected in ${townName}?`,
        answer: `Yes, once located, our plumbers isolate the supply, access the damaged section cleanly, and replace or repair the pipework to prevent further structural damage.`,
      },
      {
        question: `Do you charge a call out fee for leak detection in ${townName}?`,
        answer: `No. We operate with £0 call-out fees across ${townName} and provide full diagnostic reports suitable for home insurance claims.`,
      },
    ];

    // 4. Heating & Boiler FAQs
    const heatingFAQs: FAQItem[] = [
      {
        question: `Do you provide boiler repairs and central heating maintenance in ${townName}?`,
        answer: `Yes, we provide gas boiler servicing, breakdown repairs, radiator power flushing, pump replacements, and thermostat upgrades across ${townName} and ${nearbyTowns}.`,
      },
      {
        question: `Can you fix cold radiators and circulation issues in ${townName}?`,
        answer: `Yes, we diagnose radiator cold spots, air locks, sludge build-up, and faulty thermostatic valves (TRVs) to restore balanced heating efficiency across ${townName}.`,
      },
      {
        question: `What should I do if my boiler loses pressure in ${townName}?`,
        answer: `If topping up your filling loop does not resolve the issue, you likely have an internal expansion vessel fault or a hidden central heating leak. Our engineers can diagnose and fix this rapidly in ${townName}.`,
      },
      {
        question: `Do you charge a call out fee for heating diagnostics in ${townName}?`,
        answer: `No. We offer £0 call-out fees in ${townName}. You only pay for the inspection, diagnostics, and repairs completed.`,
      },
    ];

    // 5. General Plumbing FAQs
    const plumbingFAQs: FAQItem[] = [
      {
        question: `What plumbing services do you offer in ${townName}?`,
        answer: `We cover all domestic plumbing across ${townName}, including leaking taps, running toilets, waste pipe repairs, shower installations, washing machine hookups, radiator moves, and emergency callouts.`,
      },
      {
        question: `Do you charge call out fees for routine plumbing jobs in ${townName}?`,
        answer: `No. We operate with £0 call-out fees throughout ${townName}. You only pay for the actual labour and materials required for your job.`,
      },
      {
        question: `Are you an independent local business covering ${townName}?`,
        answer: `Yes, RKM is a trusted local company based near Coalville, serving homeowners, landlords, and local businesses across ${townName}, ${nearbyTowns}, and ${postcodes}.`,
      },
      {
        question: `Do you provide free estimates for plumbing work in ${townName}?`,
        answer: `Yes, we provide free, upfront, transparent estimates with no obligation before any repair or installation begins.`,
      },
    ];

    return {
      'drain-unblocking': {
        heading: `Frequently Asked Drainage Questions in ${townName}`,
        subheading: `Expert answers on blocked drains, CCTV surveys, and jetting across ${townName}`,
        items: drainFAQs,
      },
      'blocked-drain-clearing': {
        heading: `Blocked Drain Questions in ${townName}`,
        subheading: `Clear advice on external drain clearance and waste pipe jetting in ${townName}`,
        items: drainFAQs,
      },
      'emergency-drain-unblocking': {
        heading: `24/7 Emergency Drainage FAQ in ${townName}`,
        subheading: `Rapid drain unblocking details for ${townName} homeowners and businesses`,
        items: drainFAQs,
      },
      'emergency-plumber': {
        heading: `Emergency Plumbing FAQ in ${townName}`,
        subheading: `24/7 callout policies, response times, and emergency rates in ${townName}`,
        items: emergencyPlumberFAQs,
      },
      'leak-detection': {
        heading: `Water Leak Detection FAQ in ${townName}`,
        subheading: `Non-invasive trace & access leak pinpointing advice for ${townName}`,
        items: leakDetectionFAQs,
      },
      heating: {
        heading: `Heating & Boiler Servicing FAQ in ${townName}`,
        subheading: `Boiler breakdown diagnostics, radiator fixes, and heating repairs in ${townName}`,
        items: heatingFAQs,
      },
      'heating-repairs': {
        heading: `Heating Repairs FAQ in ${townName}`,
        subheading: `Central heating troubleshooting and boiler advice across ${townName}`,
        items: heatingFAQs,
      },
      plumber: {
        heading: `Plumbing & Heating FAQ in ${townName}`,
        subheading: `Common questions regarding domestic repairs, quotes, and callouts in ${townName}`,
        items: plumbingFAQs,
      },
      default: {
        heading: `Frequently Asked Questions in ${townName}`,
        subheading: `Trusted plumbing, heating & drainage advice for ${townName} and Leicestershire`,
        items: plumbingFAQs,
      },
    };
  }, [townName, postcodes, nearbyTowns]);

  const selectedFAQSet = faqSets[cleanServiceKey as keyof typeof faqSets] || faqSets.default;
  const faqs = selectedFAQSet.items;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </Helmet>

        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A6892C]/10 border border-[#A6892C]/25 text-[#A6892C] font-bold text-xs uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#A6892C]" />
            <span>Help &amp; Clear Advice</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            {selectedFAQSet.heading.split(townName)[0]}
            <span className="text-[#A6892C]">{townName}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {selectedFAQSet.subheading}
          </p>
        </div>

        {/* FAQ ACCORDION LIST */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border bg-white overflow-hidden ${
                  isOpen
                    ? 'border-[#A6892C]/60 shadow-md ring-1 ring-[#A6892C]/20'
                    : 'border-slate-200/80 hover:border-[#A6892C]/40 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? 'bg-[#A6892C] text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>

                    <span className={`text-base sm:text-lg font-bold tracking-tight leading-snug ${
                      isOpen ? 'text-slate-950' : 'text-slate-800'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#A6892C]/10 text-[#A6892C]' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-slate-600 leading-relaxed text-sm sm:text-base border-t border-dashed border-slate-200/80 mt-1"
                  >
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM QUICK ASSISTANCE PROMPT */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-slate-900 font-bold text-base">Have a question not answered here?</p>
            <p className="text-slate-500 text-xs sm:text-sm">Speak directly with an on-call engineer in {townName} 24 hours a day.</p>
          </div>

          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 bg-[#A6892C] hover:bg-[#c4a030] text-slate-950 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {phone}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;