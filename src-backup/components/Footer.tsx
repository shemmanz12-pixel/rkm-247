import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Shield, CheckCircle, Percent, GraduationCap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-[#A6892C]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* COL 1: BRAND & OAP DISCOUNT */}
          <div>
            <h3 className="text-[#A6892C] font-black text-2xl mb-6 uppercase tracking-wider">
              RKM Plumbing & Heating Services
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
              RKM Plumbing & Heating Services is a specialist <strong>24/7 emergency plumbing and heating company</strong> based in <strong>Coalville, Leicestershire</strong>. We provide rapid response (typically 60 minutes) for residential emergencies across Leicestershire.
            </p>

            {/* OAP DISCOUNT BOX */}
            <div className="border border-[#A6892C]/30 bg-[#A6892C]/5 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Percent className="w-5 h-5 text-[#A6892C]" />
                <span className="text-[#A6892C] font-bold text-lg">10% OAP Discount</span>
              </div>
              <p className="text-gray-500 text-xs">Available for all seniors in LE65 & LE67.</p>
            </div>
          </div>

          {/* COL 2: WHY CHOOSE RKM */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Why Choose RKM?</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#A6892C] flex-shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-1">No Call Out Charge:</span>
                  <span className="text-gray-400 text-sm">You only pay for the work we do. Transparent pricing.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#A6892C] flex-shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-1">24/7 Emergency Response:</span>
                  <span className="text-gray-400 text-sm">Immediate attendance for burst pipes and heating failures.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#A6892C] flex-shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-1">Local Specialist:</span>
                  <span className="text-gray-400 text-sm">Not a call centre. Trusted Checkatrade member based in Coalville (HQ).</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COL 3: CONTACT US */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#A6892C]" />
                <a href="tel:01530654062" className="text-2xl font-bold hover:text-[#A6892C] transition-colors">
                  01530 654 062
                </a>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#A6892C] mt-1" />
                <span className="text-gray-300 text-lg">
                  Hodgetts Street,<br/>
                  Coalville, Leicestershire,<br/>
                  LE67 2JH
                </span>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-gray-500 text-xs leading-relaxed">
                  Serving: Coalville, Ashby De La Zouch, Markfield, Whitwick, Ellistown, Hugglescote, Ravenstone, and surrounding villages.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* REGIONAL AUTHORITY SECTION */}
        <div className="border-t border-gray-800 py-8 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#A6892C]/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-[#A6892C]" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-sm uppercase tracking-tight">Regional Training Standards</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Certified Emergency Response for North West Leicestershire</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <Link to="/training-register" className="hover:text-[#A6892C] border border-gray-800 px-4 py-2 rounded-md transition-colors bg-white/5">
                S-Plan Diagnostics
              </Link>
              <Link to="/training-register" className="hover:text-[#A6892C] border border-gray-800 px-4 py-2 rounded-md transition-colors bg-white/5">
                Leak Detection Tech
              </Link>
              <Link to="/training-register" className="hover:text-[#A6892C] border border-gray-800 px-4 py-2 rounded-md transition-colors bg-white/5">
                WRAS Compliance
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <p>&copy; {currentYear} RKM Plumbing & Heating Services. All rights reserved.</p>
            
            <div className="flex gap-4 items-center">
              <Link to="/training-register" className="hover:text-gray-400 transition-colors opacity-50">
                 Training Register (Internal)
              </Link>
              <span className="opacity-30">|</span>
              
              <Link to="/privacy-policy" className="hover:text-gray-400 transition-colors opacity-50">
                 Privacy Policy
              </Link>
              <span className="opacity-30">|</span>

              <Link to="/locations" className="hover:text-[#A6892C] transition-colors font-medium">
                 Areas We Cover
              </Link>
            </div>
          </div>
          <p className="text-[#A6892C]"> Plumber North West Leicestershire</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;