import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const TrustBadges = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80 relative z-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* TRUST BANNER HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#A6892C] bg-[#A6892C]/10 px-4 py-1.5 rounded-full border border-[#A6892C]/25 shadow-sm mb-3">
            <ShieldCheck className="w-4 h-4 text-[#A6892C]" />
            <span>Verified Independent Accreditations</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted &amp; Reviewed Across the UK&apos;s Leading Platforms
          </h3>
        </div>

        {/* 3 EXPANSIVE TRUST TILES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* 1. GOOGLE REVIEWS */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-24 sm:h-28 flex items-center justify-center mb-6">
              <img 
                src="/google-logo.webp" 
                alt="Google Verified Reviews RKM Plumbing" 
                className="h-16 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h4 className="text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Google Verified Reviews
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                5.0-star customer satisfaction rating for domestic repairs &amp; 24/7 callouts.
              </p>
            </div>
          </div>

          {/* 2. CHECKATRADE */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-24 sm:h-28 flex items-center justify-center mb-6">
              <img 
                src="/checkatrade.webp" 
                alt="Checkatrade Vetted and Monitored Tradesperson" 
                className="h-18 sm:h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 text-emerald-600 font-black text-xs uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Background Checked</span>
              </div>
              <h4 className="text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Checkatrade Approved
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Fully vetted, insured, and verified trade compliance across Leicestershire.
              </p>
            </div>
          </div>

          {/* 3. YELL.COM */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-24 sm:h-28 flex items-center justify-center mb-6">
              <img 
                src="/yell.com.webp" 
                alt="Yell.com Local Business Profile" 
                className="h-16 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
              <div className="inline-flex items-center gap-1 text-[#A6892C] font-black text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-[#A6892C]" />
                <span>Verified Business</span>
              </div>
              <h4 className="text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Yell.com Listed
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Official local directory member with authentic customer testimonials.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustBadges;