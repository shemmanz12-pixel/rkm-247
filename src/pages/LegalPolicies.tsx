import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const LegalPolicies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'cookies' | 'services'>('privacy');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    // pb-32 added here to ensure StickyFooter doesn't cover the bottom text
    <div className="bg-white min-h-screen py-20 pb-32">
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

        <div className="bg-gray-50 p-8 md:p-12 rounded-xl border border-gray-200 shadow-sm">
          
          {/* PRIVACY POLICY TAB */}
          {activeTab === 'privacy' && (
            <section className="animate-in fade-in duration-500">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">
                Privacy Policy
                <br /><span className="text-sm font-normal normal-case block mt-2 text-gray-500 italic">Last Updated On 10-Feb-2026 | Effective Date 10-Feb-2026</span>
              </h1>

              <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-6 mt-8">
                <p>
                  This Privacy Policy describes the policies of <strong>RKM Plumbing & Heating Services LTD</strong>, 
                  51 Hodgetts Street, Leicestershire LE67 2JH, United Kingdom (the), 
                  email: <a href="mailto:ryan_shemmans@outlook.com" className="text-[#A6892C]">ryan_shemmans@outlook.com</a>, 
                  phone: 07848969229 on the collection, use and disclosure of your information that we collect 
                  when you use our website (<a href="https://rkm247.co.uk" className="text-[#A6892C]">https://rkm247.co.uk</a>) 
                  (the “Service”). By accessing or using the Service, you are consenting to the collection, 
                  use and disclosure of your information in accordance with this Privacy Policy. 
                  If you do not consent to the same, please do not access or use the Service.
                </p>

                <p>
                  We may modify this Privacy Policy at any time without any prior notice to you and will post the revised Privacy Policy on the Service. 
                  The revised Policy will be effective 180 days from when the revised Policy is posted in the Service and your continued access or 
                  use of the Service after such time will constitute your acceptance of the revised Privacy Policy. We therefore recommend that you periodically review this page.
                </p>

                <ol className="list-decimal pl-5 space-y-8">
                  <li>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">How We Use Your Information:</h2>
                    <p>We will use the information that we collect about you for the following purposes:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Site protection</li>
                    </ul>
                    <p className="mt-4">
                      If we want to use your information for any other purpose, we will ask you for consent and will use your information only on receiving your consent and then, only for the purpose(s) for which grant consent unless we are required to do otherwise by law.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Your Rights:</h2>
                    <p>
                      Depending on the law that applies, you may have a right to access and rectify or erase your personal data or receive a copy of your personal data, restrict or object to the active processing of your data, ask us to share (port) your personal information to another entity, withdraw any consent you provided to us to process your data, a right to lodge a complaint with a statutory authority and such other rights as may be relevant under applicable laws. To exercise these rights, you can write to us at <strong>ryan_shemmans@outlook.com</strong>. We will respond to your request in accordance with applicable law.
                    </p>
                    <p className="mt-4 italic text-sm">
                      Do note that if you do not allow us to collect or process the required personal information or withdraw the consent to process the same for the required purposes, you may not be able to access or use the services for which your information was sought.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies Etc.</h2>
                    <p>
                      To learn more about how we use these and your choices in relation to these tracking technologies, please refer to our <button onClick={() => setActiveTab('cookies')} className="text-[#A6892C] underline">Cookie Policy.</button>
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Security:</h2>
                    <p>
                      The security of your information is important to us and we will use reasonable security measures to prevent the loss, misuse or unauthorized alteration of your information under our control. However, given the inherent risks, we cannot guarantee absolute security and consequently, we cannot ensure or warrant the security of any information you transmit to us and you do so at your own risk.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Grievance / Data Protection Officer:</h2>
                    <p>
                      If you have any queries or concerns about the processing of your information that is available with us, you may email our Grievance Officer at <strong>RKM Plumbing & Heating Services LTD</strong>, 51 Hodgetts Street, email: <strong>ryan_shemmans@outlook.com</strong>. We will address your concerns in accordance with applicable law.
                    </p>
                  </li>
                </ol>
                
                <p className="text-xs pt-6 border-t">
                  Privacy Policy generated with <a target="_blank" rel="noreferrer" href="https://www.cookieyes.com/?utm_source=PP&utm_medium=footer&utm_campaign=UW" className="underline">CookieYes</a>.
                </p>
              </div>
            </section>
          )}

          {/* COOKIE POLICY TAB */}
          {activeTab === 'cookies' && (
            <section className="animate-in fade-in duration-500">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">Cookie Policy</h1>
              <p className="text-sm text-gray-500 mb-8 italic text-[#A6892C]">Last Updated: 10-Feb-2026</p>
              <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>We use cookies to optimize our service pages for users searching for local engineers in <strong>Coalville</strong> and <strong>Ashby</strong>. Cookies allow us to remember your preferences and ensure our emergency contact forms function correctly.</p>
              </div>
            </section>
          )}

          {/* SERVICE SCOPE TAB */}
          {activeTab === 'services' && (
            <section className="animate-in fade-in duration-500">
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
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase underline decoration-[#A6892C]">Drains Unblocking</h3>
                    <p className="text-gray-600">Specialist high-pressure jetting for toilets, sinks, and main drains.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase underline decoration-[#A6892C]">Heating Engineer</h3>
                    <p className="text-gray-600">Radiator replacements, system flushing, and thermostat upgrades.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase underline decoration-[#A6892C]">New Install Plumbing</h3>
                    <p className="text-gray-600">Appliance installs (dishwashers/washing machines) and sink upgrades.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase underline decoration-[#A6892C]">Leak Detection</h3>
                    <p className="text-gray-600">Trace and access services using visual and technical inspection methods.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white border-l-4 border-[#A6892C] text-gray-600 text-xs italic">
                All services are subject to availability. RKM Plumbing & Heating Services LTD reserves the right to prioritize emergency heating failures during peak winter periods.
              </div>
            </section>
          )}

          <div className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            <p>© 2026 RKM Plumbing & Heating Services LTD</p>
            <p className="opacity-70 font-bold uppercase tracking-tighter">Plumber Coalville | LE67</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPolicies;