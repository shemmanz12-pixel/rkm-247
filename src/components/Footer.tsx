import { Link } from 'react-router-dom';
import { Phone, MapPin, Shield, CheckCircle, Percent, GraduationCap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-[#A6892C]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* COL 1: BRAND & AUTHORITY */}
          <div>
            <h3 className="text-[#A6892C] font-black text-2xl mb-6 uppercase tracking-wider">
              RKM Plumbing & Heating
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
              RKM Plumbing & Heating Services is a specialist <strong>24/7 emergency plumbing company</strong> based in <strong>Coalville</strong>. We provide rapid 60-minute response for burst pipes, leaks, and heating failures across North West Leicestershire.
            </p>

            {/* OAP DISCOUNT BOX - High conversion element */}
            <div className="border border-[#A6892C]/30 bg-[#A6892C]/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Percent className="w-5 h-5 text-[#A6892C]" />
                <span className="text-[#A6892C] font-bold text-lg">10% OAP Discount</span>
              </div>
              <p className="text-gray-500 text-xs font-medium">Available for all seniors in the LE65, LE67, DE11 & DE12 areas.</p>
            </div>
          </div>

          {/* COL 2: TRUST SIGNALS */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Why Choose RKM?</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#A6892C] flex-shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-1 uppercase text-xs tracking-widest">No Call Out Charge</span>
                  <span className="text-gray-400 text-sm">Transparent local pricing. You only pay for the expert repairs we complete.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#A6892C] flex-shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-1 uppercase text-xs tracking-widest">24/7 Rapid Response</span>
                  <span className="text-gray-400 text-sm">On-site within 60 minutes for emergencies in Ashby, Coalville, and Ibstock.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#A6892C] flex-shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-1 uppercase text-xs tracking-widest">Heating Experts</span>
                  <span className="text-gray-400 text-sm">Qualified experts for boiler repairs and central heating diagnostics.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COL 3: CONTACT & LOCAL AREA */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#A6892C]" />
                <a href="tel:01530654062" className="text-2xl font-black hover:text-[#A6892C] transition-colors tracking-tight">
                  01530 654 062
                </a>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#A6892C] mt-1" />
                <span className="text-gray-300 text-lg leading-snug">
                  Hodgetts Street,<br/>
                  Coalville, Leicestershire,<br/>
                  LE67 2JH
                </span>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 text-[#A6892C]">Primary Coverage:</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Coalville, Ashby De La Zouch, Whitwick, Ibstock, Measham, Markfield, Ellistown, and all surrounding NW Leicestershire villages.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* REGIONAL AUTHORITY / TRAINING BAR */}
        <div className="border-t border-gray-800 py-10 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#A6892C]/10 rounded-xl border border-[#A6892C]/20">
                <GraduationCap className="w-7 h-7 text-[#A6892C]" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-black text-sm uppercase tracking-tight">Regional Training Standards</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">Approved Emergency Response: North West Leicestershire</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/training-register" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#A6892C] border border-gray-800 px-4 py-2 rounded-lg transition-all bg-white/5 hover:bg-white/10">
                S-Plan Diagnostics
              </Link>
              <Link to="/training-register" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#A6892C] border border-gray-800 px-4 py-2 rounded-lg transition-all bg-white/5 hover:bg-white/10">
                Leak Detection Tech
              </Link>
              <Link to="/training-register" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#A6892C] border border-gray-800 px-4 py-2 rounded-lg transition-all bg-white/5 hover:bg-white/10">
                WRAS Compliance
              </Link>
            </div>
          </div>
        </div>

        {/* FINAL FOOTER BAR */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
          <div className="flex flex-col md:flex-row gap-6 items-center mb-4 md:mb-0">
            <p>&copy; {currentYear} RKM Plumbing & Heating Services.</p>
            
            <div className="flex gap-4 items-center">
              <Link to="/training-register" className="hover:text-gray-300 transition-colors opacity-60">
                 Training Register
              </Link>
              <span className="opacity-20">|</span>
              
              <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors opacity-60">
                 Privacy Policy
              </Link>
              <span className="opacity-20">|</span>

              <Link to="/locations" className="text-[#A6892C] hover:text-white transition-colors">
                 Areas We Cover
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6892C] animate-pulse"></span>
            <p className="text-gray-400 tracking-[0.3em]">NW Leicestershire</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;