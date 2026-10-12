import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const TrustBadges = () => {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-slate-50 border-y border-slate-200/80 relative z-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* TRUST BANNER HEADER */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-[#A6892C] bg-[#A6892C]/10 px-3.5 py-1.5 rounded-full border border-[#A6892C]/25 shadow-sm mb-2.5 sm:mb-3">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A6892C] shrink-0" />
            <span>Verified Independent Accreditations</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight px-2">
            Trusted &amp; Reviewed Across the UK&apos;s Leading Platforms
          </h3>
        </div>

        {/* 3 COMPACT & BALANCED TRUST TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* 1. GOOGLE REVIEWS */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
            <div className="h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-5">
              <img 
                src="/google-logo.webp" 
                alt="Google Verified Reviews RKM Plumbing" 
                className="max-h-10 sm:max-h-14 w-auto max-w-[150px] object-contain group-hover:scale-105 transition-transform duration-200" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Google Verified Reviews
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                5.0-star customer satisfaction for repairs &amp; 24/7 callouts.
              </p>
            </div>
          </div>

          {/* 2. CHECKATRADE */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
            <div className="h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-5">
              <img 
                src="/checkatrade.webp" 
                alt="Checkatrade Vetted and Monitored Tradesperson" 
                className="max-h-11 sm:max-h-14 w-auto max-w-[150px] object-contain group-hover:scale-105 transition-transform duration-200" 
              />
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
              <div className="inline-flex items-center gap-1 text-[#A6892C] font-black text-[10px] sm:text-xs uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A6892C] shrink-0" />
                <span>Background Checked</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Checkatrade Approved
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Fully vetted, insured, and verified trade compliance.
              </p>
            </div>
          </div>

          {/* 3. YELL.COM */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#A6892C] rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
            <div className="h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-5">
              <img 
                src="/yell.com.webp" 
                alt="Yell.com Local Business Profile" 
                className="max-h-9 sm:max-h-12 w-auto max-w-[130px] object-contain group-hover:scale-105 transition-transform duration-200" 
              />
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center">
              <div className="inline-flex items-center gap-1 text-[#A6892C] font-black text-[10px] sm:text-xs uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A6892C] shrink-0" />
                <span>Verified Business</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                Yell.com Listed
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                Official local directory member with authentic customer reviews.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustBadges;