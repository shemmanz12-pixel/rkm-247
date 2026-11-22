import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, Phone, ArrowRight, MessageSquareQuote } from 'lucide-react';
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

  // Prevent duplicate town repetition (e.g. Coalville, Coalville)
  const nearbyTowns = useMemo(() => {
    if (townData?.nearbyTowns?.length) {
      const filtered = townData.nearbyTowns.filter(
        (t: string) => t.toLowerCase() !== townName.toLowerCase()
      );
      return filtered.length > 0
        ? filtered.join(', ')
        : 'Whitwick, Ibstock and surrounding areas';
    }
    return townName.toLowerCase() === 'coalville'
      ? 'Whitwick, Ibstock, Hugglescote and surrounding areas'
      : 'Coalville, Whitwick and surrounding areas';
  }, [townData, townName]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSets = useMemo(() => {
    // 1. Drain Unblocking & Specialist Drainage FAQs
    const drainFAQs: FAQItem[] = [
      {
        question: `Do you provide 24/7 emergency drain unblocking in ${townName}?`,
        answer: `Yes, we provide 24/7 emergency drain unblocking across ${townName} and ${postcodes}, typically arriving within 60–90 minutes. We use commercial high-pressure water jetting to clear blocked outside drains, overflowing manholes, gullies, and main sewer lines.`,
      },
      {
        question: `Do you carry out HD CCTV drain surveys in ${townName}?`,
        answer: `Yes, we carry out full HD CCTV drain camera surveys across ${townName} and ${nearbyTowns}. We provide video footage and written reports for recurring blockages, pre-purchase homebuyer surveys, Severn Trent build-over agreements, and home insurance claims.`,
      },
      {
        question: `Can you remove tree roots from blocked drains in ${townName}?`,
        answer: `Yes. Older clay pipes around ${townName} are prone to tree root intrusion. We use specialist mechanical rotary root cutting equipment and high-pressure jetting to cut away roots and heavy limescale, followed by a CCTV check to confirm full flow is restored.`,
      },
      {
        question: `Do you offer no-dig drain relining and pipe repairs in ${townName}?`,
        answer: `Yes, we repair cracked, displaced, and pitch fibre drains using no-dig CIPP patch repairs and full-length drain relining. This permanently strengthens the pipe from the inside without digging up your driveway, patio, or garden.`,
      },
      {
        question: `Can you clear internal blockages like toilets, sinks, and showers in ${townName}?`,
        answer: `Yes, we clear stubborn internal blockages across ${townName} including blocked toilets, macerators, soil stacks, kitchen sinks, baths, and slow-draining showers cleanly and with zero mess left behind.`,
      },
      {
        question: `Can you stop rats getting into my property through the drains in ${townName}?`,
        answer: `Yes. If you have rodent activity, we can run a CCTV drain survey to locate broken or disused pipes where rats are entering, repair the defect, and fit stainless-steel non-return rat flaps to block future entry.`,
      },
      {
        question: `Is a blocked drain in ${townName} my responsibility or Severn Trent Water's?`,
        answer: `Generally, drains serving only your property within your boundary are your responsibility, while shared drains serving more than one property or pipes outside your boundary are usually managed by Severn Trent Water. If you are unsure, our engineers can quickly check and advise on-site.`,
      },
      {
        question: `Do you charge a call out fee for drain unblocking in ${townName}?`,
        answer: `No. We operate with £0 call-out fees across ${townName} and ${postcodes}. You receive a clear, fixed upfront price before any work starts, with no hidden extras or half-hourly surprises.`,
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
        answer: `Yes, all our engineers are fully insured, highly qualified, and Gas Safe registered (#987039) where heating and boiler work is involved.`,
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
        answer: `Yes, we provide Gas Safe (#987039) boiler installations, servicing, breakdown repairs, radiator power flushing, pump replacements, and thermostat upgrades across ${townName} and ${nearbyTowns}.`,
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
        answer: `Yes, RKM is a trusted local business serving homeowners, landlords, and local commercial properties across ${townName}, ${nearbyTowns}, and postcode districts ${postcodes}.`,
      },
      {
        question: `Do you provide free estimates for plumbing work in ${townName}?`,
        answer: `Yes, we provide free, upfront, transparent estimates with no obligation before any repair or installation begins.`,
      },
    ];

    const drainSet = {
      heading: `Frequently Asked Drainage Questions in ${townName}`,
      subheading: `Expert answers on blocked drains, HD CCTV surveys, root cutting, and no-dig relining across ${townName}`,
      items: drainFAQs,
    };

    const heatingSet = {
      heading: `Heating & Boiler Servicing FAQ in ${townName}`,
      subheading: `Boiler breakdown diagnostics, radiator fixes, and heating repairs in ${townName}`,
      items: heatingFAQs,
    };

    const emergencySet = {
      heading: `Emergency Plumbing FAQ in ${townName}`,
      subheading: `24/7 callout policies, response times, and emergency rates in ${townName}`,
      items: emergencyPlumberFAQs,
    };

    const leakSet = {
      heading: `Water Leak Detection FAQ in ${townName}`,
      subheading: `Non-invasive trace & access leak pinpointing advice for ${townName}`,
      items: leakDetectionFAQs,
    };

    const plumbingSet = {
      heading: `Plumbing & Heating FAQ in ${townName}`,
      subheading: `Common questions regarding domestic repairs, quotes, and callouts in ${townName}`,
      items: plumbingFAQs,
    };

    return {
      'drain-unblocking': drainSet,
      'blocked-drain-clearing': drainSet,
      'emergency-drain-unblocking': drainSet,
      'blocked-toilet': drainSet,
      'outside-drain-unblocking': drainSet,
      'cctv-drain-surveys': drainSet,
      'drain-relining': drainSet,
      'drain-root-cutting': drainSet,
      'emergency-plumber': emergencySet,
      'emergency-plumbing': emergencySet,
      'emergency-repairs': emergencySet,
      '24-7-plumber': emergencySet,
      'burst-pipe-repair': emergencySet,
      'leak-detection': leakSet,
      'water-leak-detection': leakSet,
      'trace-and-access': leakSet,
      'hidden-leak-detection': leakSet,
      heating: heatingSet,
      'heating-repairs': heatingSet,
      'heating-engineer': heatingSet,
      'central-heating': heatingSet,
      'central-heating-repairs': heatingSet,
      'radiator-repairs': heatingSet,
      'boiler-installs': heatingSet,
      plumber: plumbingSet,
      'local-plumber': plumbingSet,
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
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-t border-slate-200/90 relative">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        </Helmet>

        {/* SECTION HEADER */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A6892C]/10 border border-[#A6892C]/25 text-[#A6892C] font-bold text-xs uppercase tracking-wider mb-2.5">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#A6892C]" />
            <span>Help &amp; Clear Advice</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            {selectedFAQSet.heading.split(townName)[0]}
            <span className="text-[#A6892C]">{townName}</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {selectedFAQSet.subheading}
          </p>
        </div>

        {/* COMPACT CLEAN ACCORDION */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="transition-colors duration-150">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none gap-3 hover:bg-slate-50/70"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span
                    className={`text-sm sm:text-base font-bold tracking-tight leading-snug ${
                      isOpen ? 'text-[#A6892C]' : 'text-slate-900'
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#A6892C]/15 text-[#A6892C]' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-slate-600 leading-relaxed text-xs sm:text-sm border-t border-slate-100"
                  >
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* COMPACT BOTTOM CALLOUT */}
        <div className="mt-8 bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-slate-900 font-bold text-sm">Have a question not answered here?</p>
            <p className="text-slate-500 text-xs">Speak directly with an on-call engineer in {townName} 24/7.</p>
          </div>

          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 bg-[#A6892C] hover:bg-[#bfa03a] text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-sm transition-all active:scale-95 flex-shrink-0"
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