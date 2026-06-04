import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, CheckCircle, Clock, Zap, Shield } from 'lucide-react';
import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { towns } from '../townConfig';
import { serviceContent } from '../serviceData';

const LandingPage = () => {
  // Capture ALL common parameter names to be safe
  const params = useParams();
  const rawService = params.serviceSlug || params.service;
  const rawTown = params.townSlug || params.town;

  // 1. AGGRESSIVE NORMALIZATION
  // This strips trailing slashes, .html, and query strings that cause lookup failures
  const normalize = (str: any) => {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .split('?')[0]      // Remove query strings
      .split('#')[0]      // Remove hashes
      .replace(/\/$/, "") // Remove trailing slash
      .replace(".html", "") // Remove .html
      .trim();
  };
  
  const serviceKey = normalize(rawService);
  const townKey = normalize(rawTown);

  // 2. DATA LOOKUP
  const service = serviceContent[serviceKey] || serviceContent['emergency-plumber'];
  
  // Strict check: if townKey exists but is not in our data, we still try to format the name
  const town = towns[townKey] || {};

  // Formatting helpers to prevent "undefined" appearing in strings
  // This automatically turns 'ashby-de-la-zouch' into 'Ashby De La Zouch' if lookup fails
  const townName = town.name || (townKey ? townKey.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Leicestershire');
  const landmark = town.landmark || 'local landmarks';
  const road = town.road || 'main access routes';
  const postcodes = town.postcodes?.length ? town.postcodes.join(', ') : 'the local area';

  // 3. Dynamic SEO Metadata
  const pageTitle = `${service.title} in ${townName} | RKM Plumbing & Heating`;
  const metaDescription = town.metaDescription || 
    `${service.title} in ${townName}. We cover ${postcodes} near ${landmark}. 24/7 emergency response, no call out fee. Call 01530 654062.`;
  
  const canonicalUrl = `https://rkm247.co.uk/${serviceKey}/${townKey}/`;

  // 4. Local Spice / Authority Text
  const localSpice = town.localSpice || 
    `Reliable local service across ${townName}, covering ${road} and all surrounding ${postcodes} postcodes.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rkm247.co.uk/logo-square.webp" />
      </Helmet>

      <Header />

      <main>
        <Hero town={townKey} service={serviceKey} />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#A6892C]/10 text-[#A6892C] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Verified Local Service
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase leading-tight">
                {service.title} in <span className="text-[#A6892C]">{townName}</span>
              </h1>

              <div className="prose prose-lg text-gray-600 mb-8 max-w-none">
                <p className="font-bold text-xl text-slate-800 mb-4">
                  {localSpice}
                </p>
                
                {town.authorityParagraphs ? (
                  town.authorityParagraphs.map((para: string, index: number) => (
                    <p key={index} className="mb-4">{para}</p>
                  ))
                ) : (
                  <p>
                    RKM Plumbing & Heating provides expert assistance throughout <strong>{townName}</strong>. 
                    Whether you're facing an emergency near {landmark} or require routine maintenance along {road}, 
                    our Heating engineers are available 24/7 to ensure your home stays safe and functional.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="text-[#A6892C] w-5 h-5" /> Local Knowledge
                  </h3>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Specialist service for <strong>{town.propertyAgeProfile || 'all property ages'}</strong></li>
                    <li>• Knowledge of <strong>{town.soilType || 'local'}</strong> ground conditions</li>
                    <li>• Coverage for <strong>{postcodes}</strong></li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Shield className="text-[#A6892C] w-5 h-5" /> RKM Guarantee
                  </h3>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• 60 Minute Emergency Response</li>
                    <li>• No Call Out Fees in {townName}</li>
                    <li>• Fully Insured</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Reviews />
        <FAQ townSlug={townKey} />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;