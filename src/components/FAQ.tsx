import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
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

  const townData = towns[cleanTownKey];
  const townName =
    townData?.name ||
    cleanTownKey
      .split('-')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') ||
    'Leicestershire';

  const postcodes = townData?.postcodes?.length
    ? townData.postcodes.join(', ')
    : 'LE67, LE65';

  const nearbyTowns = townData?.nearbyTowns?.length
    ? townData.nearbyTowns.join(', ')
    : 'Coalville, Ashby-de-la-Zouch, Ibstock and surrounding areas';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSets = useMemo(() => {
    const drainFAQs: FAQItem[] = [
      {
        question: `Do you provide drain unblocking in ${townName}?`,
        answer: `Yes, we provide professional drain unblocking in ${townName} and surrounding areas. We clear blocked drains, blocked sinks, blocked toilets, showers, gullies, manholes and outside drains for homes and businesses.`,
      },
      {
        question: `How quickly can you attend a blocked drain in ${townName}?`,
        answer: `Because we are based near Coalville, we can usually provide a fast local response to blocked drains in ${townName} and surrounding areas, including ${postcodes}.`,
      },
      {
        question: `Do you clear blocked outside drains in ${townName}?`,
        answer: `Yes, we clear blocked outside drains, gullies, manholes and waste pipes in ${townName}. Common causes include grease, wipes, leaves, silt and general debris.`,
      },
      {
        question: `Can you unblock toilets, sinks and showers in ${townName}?`,
        answer: `Yes, we unblock toilets, sinks, showers and internal waste pipes throughout ${townName}. We deal with slow draining fixtures, recurring blockages and full drain stoppages.`,
      },
      {
        question: `Do you cover North West Leicestershire for drain unblocking?`,
        answer: `Yes, we provide drain unblocking across ${townName} and wider North West Leicestershire, covering nearby areas such as ${nearbyTowns} and postcode areas including ${postcodes}.`,
      },
      {
        question: `Do you charge a call out fee for drain unblocking in ${townName}?`,
        answer: `No. We offer £0 call out fees in ${townName}. You only pay for the drainage work carried out.`,
      },
    ];

    const emergencyPlumberFAQs: FAQItem[] = [
      {
        question: `Do you provide emergency plumber callouts in ${townName}?`,
        answer: `Yes, we provide emergency plumber callouts in ${townName} and surrounding areas for urgent leaks, burst pipes, no water, blocked toilets and other plumbing emergencies.`,
      },
      {
        question: `How quickly can an emergency plumber attend in ${townName}?`,
        answer: `Because we are based near Coalville, we can usually provide a rapid response in ${townName} and surrounding areas, including ${postcodes}.`,
      },
      {
        question: `What plumbing emergencies do you deal with in ${townName}?`,
        answer: `We attend burst pipes, severe leaks, overflowing toilets, blocked drains, faulty stop taps, no hot water and urgent plumbing issues in ${townName}.`,
      },
      {
        question: `Do you charge a call out fee for emergency plumbing in ${townName}?`,
        answer: `No. We offer £0 call out fees in ${townName}. You only pay for the work carried out.`,
      },
      {
        question: `Do you cover homes and businesses in ${townName}?`,
        answer: `Yes, we provide emergency plumbing services for homeowners, landlords and businesses across ${townName} and surrounding areas.`,
      },
      {
        question: `Do you cover North West Leicestershire for emergency plumber callouts?`,
        answer: `Yes, we cover ${townName} and wider North West Leicestershire, including nearby areas such as ${nearbyTowns}.`,
      },
    ];

    const leakDetectionFAQs: FAQItem[] = [
      {
        question: `Do you provide leak detection in ${townName}?`,
        answer: `Yes, we provide leak detection in ${townName} for hidden water leaks, internal plumbing leaks and suspected pipework problems in homes and businesses.`,
      },
      {
        question: `Can you find hidden leaks in walls or under floors in ${townName}?`,
        answer: `Yes, we help locate hidden leaks in ${townName}, including leaks under floors, behind walls and within internal plumbing systems.`,
      },
      {
        question: `What are the signs of a hidden water leak in ${townName}?`,
        answer: `Common signs include damp patches, low water pressure, unexplained water usage, musty smells, staining and the sound of running water when no taps are in use.`,
      },
      {
        question: `Do you repair leaks after detecting them in ${townName}?`,
        answer: `Yes, once the source of the leak is identified, we can usually carry out the plumbing repair or advise on the next steps needed.`,
      },
      {
        question: `How quickly can you attend a leak detection job in ${townName}?`,
        answer: `We provide a fast local response in ${townName} and surrounding areas, including ${postcodes}, especially where active leaks may be causing damage.`,
      },
      {
        question: `Do you charge a call out fee for leak detection in ${townName}?`,
        answer: `No. We offer £0 call out fees in ${townName}. You only pay for the work carried out.`,
      },
    ];

    const heatingFAQs: FAQItem[] = [
      {
        question: `Do you provide heating repairs in ${townName}?`,
        answer: `Yes, we provide heating repairs in ${townName} and surrounding areas, helping with heating faults, radiator issues, pressure problems and loss of heating or hot water.`,
      },
      {
        question: `Can you fix radiators not heating properly in ${townName}?`,
        answer: `Yes, we deal with common radiator issues in ${townName}, including cold spots, balancing problems, trapped air and circulation faults.`,
      },
      {
        question: `Do you help with low boiler pressure and heating faults in ${townName}?`,
        answer: `Yes, we attend common heating system faults in ${townName}, including low pressure, poor circulation, thermostat issues and no heating or hot water.`,
      },
      {
        question: `How quickly can you attend a heating issue in ${townName}?`,
        answer: `Because we are based near Coalville, we can usually provide a fast local response in ${townName} and surrounding areas, including ${postcodes}.`,
      },
      {
        question: `Do you cover North West Leicestershire for heating repairs?`,
        answer: `Yes, we cover ${townName} and wider North West Leicestershire, including nearby areas such as ${nearbyTowns}.`,
      },
      {
        question: `Do you charge a call out fee for heating repairs in ${townName}?`,
        answer: `No. We offer £0 call out fees in ${townName}. You only pay for the work carried out.`,
      },
    ];

    const plumbingFAQs: FAQItem[] = [
      {
        question: `Do you provide plumbing services in ${townName}?`,
        answer: `Yes, we provide local plumbing services in ${townName} and surrounding areas for leaks, taps, toilets, pipework, blockages and general plumbing repairs.`,
      },
      {
        question: `How quickly can a local plumber attend in ${townName}?`,
        answer: `Because we are based near Coalville, we can usually provide a fast local response in ${townName} and surrounding areas, including ${postcodes}.`,
      },
      {
        question: `Do you charge a call out fee for plumbing jobs in ${townName}?`,
        answer: `No. We offer £0 call out fees in ${townName}. You only pay for the plumbing work carried out.`,
      },
      {
        question: `Do you cover homes and businesses in ${townName}?`,
        answer: `Yes, we support homeowners, landlords and businesses across ${townName} and surrounding areas.`,
      },
      {
        question: `What areas do you cover near ${townName}?`,
        answer: `We cover ${townName}, nearby areas such as ${nearbyTowns}, and surrounding postcode areas including ${postcodes}.`,
      },
      {
        question: `Do you also deal with blocked toilets and drainage problems in ${townName}?`,
        answer: `Yes, alongside general plumbing we also attend blocked toilets, blocked sinks and drainage issues in ${townName}.`,
      },
    ];

    return {
      'drain-unblocking': {
        heading: `${townName} Drain Unblocking FAQ`,
        subheading: `Trusted Local Drainage Advice For ${townName}`,
        items: drainFAQs,
      },
      'blocked-drain-clearing': {
        heading: `${townName} Blocked Drain FAQ`,
        subheading: `Trusted Local Drain Clearing Advice For ${townName}`,
        items: drainFAQs,
      },
      'emergency-drain-unblocking': {
        heading: `${townName} Emergency Drain FAQ`,
        subheading: `Trusted Local Emergency Drain Advice For ${townName}`,
        items: drainFAQs,
      },
      'outside-drain-unblocking': {
        heading: `${townName} Outside Drain FAQ`,
        subheading: `Trusted Local Outside Drain Advice For ${townName}`,
        items: drainFAQs,
      },
      'blocked-toilet': {
        heading: `${townName} Blocked Toilet FAQ`,
        subheading: `Trusted Local Toilet Unblocking Advice For ${townName}`,
        items: drainFAQs,
      },
      'emergency-plumber': {
        heading: `${townName} Emergency Plumber FAQ`,
        subheading: `Trusted Local Emergency Plumbing Advice For ${townName}`,
        items: emergencyPlumberFAQs,
      },
      'leak-detection': {
        heading: `${townName} Leak Detection FAQ`,
        subheading: `Trusted Local Leak Detection Advice For ${townName}`,
        items: leakDetectionFAQs,
      },
      heating: {
        heading: `${townName} Heating FAQ`,
        subheading: `Trusted Local Heating Repair Advice For ${townName}`,
        items: heatingFAQs,
      },
      'heating-repairs': {
        heading: `${townName} Heating Repair FAQ`,
        subheading: `Trusted Local Heating Repair Advice For ${townName}`,
        items: heatingFAQs,
      },
      plumber: {
        heading: `${townName} Plumbing FAQ`,
        subheading: `Trusted Local Plumbing Advice For ${townName}`,
        items: plumbingFAQs,
      },
      default: {
        heading: `${townName} Plumbing FAQ`,
        subheading: `Trusted Local Plumbing Advice For ${townName}`,
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
    <section id="faq" className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </Helmet>

        <div className="mb-12">
          <div className="w-12 h-1 bg-[#A6892C] mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
            {selectedFAQSet.heading}
          </h2>
          <p className="text-gray-500 mt-2 font-bold uppercase text-xs tracking-widest">
            {selectedFAQSet.subheading}
          </p>
        </div>

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
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center gap-4">
                  <HelpCircle
                    className={`w-6 h-6 flex-shrink-0 ${
                      openIndex === index ? 'text-[#A6892C]' : 'text-gray-300'
                    }`}
                  />
                  <span
                    className={`text-sm md:text-lg font-bold uppercase tracking-wide ${
                      openIndex === index ? 'text-slate-900' : 'text-slate-600'
                    }`}
                  >
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
                id={`faq-answer-${index}`}
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