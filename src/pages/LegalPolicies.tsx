import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LegalPolicies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'cookies' | 'services'>('privacy');

  useEffect(() => {
    // SSG Check just in case
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [activeTab]);

  return (
    <>
      <Header />
      <div className="bg-slate-50 min-h-screen pt-32 pb-32">
        <Helmet>
          <title>Privacy Policy & Terms of Service | RKM Plumbing</title>
          <meta name="description" content="Read the Privacy Policy, Cookie Policy, and Service Scope for RKM Plumbing & Heating Services LTD. Understand how we handle your data and our terms of service." />
          <link rel="canonical" href="https://rkm247.co.uk/privacy-policy/" />
        </Helmet>

        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 md:gap-8 mb-8 border-b border-gray-200">
            {['privacy', 'cookies', 'services'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab 
                  ? 'border-b-2 border-[#A6892C] text-[#A6892C]' 
                  : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.replace('-', ' ')} {tab === 'services' ? 'Scope' : 'Policy'}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-200 shadow-sm">
            
            {/* PRIVACY POLICY TAB */}
            {activeTab === 'privacy' && (
              <section className="transition-opacity duration-300">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">
                  Privacy Policy
                  <br /><span className="text-sm font-normal normal-case block mt-2 text-gray-500 italic">Last Updated On 10-Feb-2026 | Effective Date 10-Feb-2026</span>
                </h1>

                <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-6 mt-8">
                  <p>
                    This Privacy Policy describes the policies of <strong>RKM Plumbing & Heating Services LTD</strong>, 
                    51 Hodgetts Street, Leicestershire LE67 2JH, United Kingdom, 
                    email: <a href="mailto:ryan_shemmans@outlook.com" className="text-[#A6892C] font-bold">ryan_shemmans@outlook.com</a>. By accessing or using the Service, you are consenting to the collection, 
                    use and disclosure of your information in accordance with this Privacy Policy. 
                  </p>
                  <ol className="list-decimal pl-5 space-y-8 mt-6">
                    <li>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">How We Use Your Information:</h2>
                      <p>We will use the information that we collect about you for the following purposes:</p>
                      <ul className="list-disc pl-5 mt-2">
                        <li>Site protection and internal analytics</li>
                      </ul>
                    </li>
                    <li>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies Etc.</h2>
                      <p>
                        To learn more about how we use these and your choices in relation to these tracking technologies, please refer to our <button onClick={() => setActiveTab('cookies')} className="text-[#A6892C] font-bold hover:underline">Cookie Policy.</button>
                      </p>
                    </li>
                  </ol>
                </div>
              </section>
            )}

            {/* COOKIE POLICY TAB */}
            {activeTab === 'cookies' && (
              <section className="transition-opacity duration-300">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">Cookie Policy</h1>
                <p className="text-sm text-gray-500 mb-8 italic text-[#A6892C]">Last Updated: 10-Feb-2026</p>
                <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-6">
                  <p>We use cookies to optimize our service pages for users searching for local engineers in <strong>Coalville</strong> and <strong>Ashby</strong>. Cookies allow us to remember your preferences and ensure our emergency contact forms function correctly.</p>
                </div>
              </section>
            )}

            {/* SERVICE SCOPE TAB */}
            {activeTab === 'services' && (
              <section className="transition-opacity duration-300">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">Service Scope & Terms</h1>
                <p className="text-sm text-gray-500 mb-8 italic text-[#A6892C]">Comprehensive Coverage for LE65 & LE67</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 uppercase underline decoration-[#A6892C]">General Plumbing</h3>
                      <p className="text-gray-600">Maintenance including leaking pipes, tap repairs, and toilet fixes.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 uppercase underline decoration-[#A6892C]">Emergency Plumber</h3>
                      <p className="text-gray-600">24/7 rapid assistance for burst pipes and urgent leak repairs.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 uppercase underline decoration-[#A6892C]">Heating Engineer</h3>
                      <p className="text-gray-600">Radiator replacements, system flushing, and thermostat upgrades.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 uppercase underline decoration-[#A6892C]">Leak Detection</h3>
                      <p className="text-gray-600">Trace and access services using visual and technical inspection methods.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalPolicies;