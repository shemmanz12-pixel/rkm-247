import { useRef } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { towns } from '../townConfig';

interface ReviewsProps {
  townSlug?: string;
  serviceSlug?: string;
}

const TRUSTINDEX_URL = 'https://www.trustindex.io/reviews/rkm247.co.uk';

const Reviews = ({ townSlug, serviceSlug }: ReviewsProps) => {
  const params = useParams<{ townSlug?: string; serviceSlug?: string }>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const normalize = (value: string | undefined) =>
    (value || '').toLowerCase().replace(/\/$/, '').replace(/\.html$/, '').trim();

  const cleanTownKey = normalize(townSlug || params.townSlug);
  const cleanServiceKey = normalize(serviceSlug || params.serviceSlug);

  const townName = towns[cleanTownKey]?.name || 'Leicestershire';
  const locationName = townName === 'Leicestershire' ? 'Coalville' : townName;

  // Core Local LE67 & LE65 towns with authentic verified reviews
  const coreTowns = [
    'coalville', 'ashby-de-la-zouch', 'whitwick', 'ibstock',
    'markfield', 'kegworth', 'measham', 'shepshed', 'hugglescote',
    'ravenstone', 'ellistown', 'bardon-hill', 'smisby'
  ];

  const isCoreLocal = !cleanTownKey || coreTowns.includes(cleanTownKey);

  const isDrainagePage = [
    'drain-unblocking',
    'blocked-drain-clearing',
    'emergency-drain-unblocking',
    'outside-drain-unblocking',
    'blocked-toilet',
  ].includes(cleanServiceKey);

  const isHeatingPage = ['heating', 'heating-engineer', 'heating-repairs'].includes(cleanServiceKey);
  const isLeakPage = cleanServiceKey === 'leak-detection';
  const isEmergencyPage = cleanServiceKey === 'emergency-plumber';

  let headingLead = '5-Star';
  let headingHighlight = 'Reviews';
  let sectionSubtitle = `Trusted by local customers in ${locationName}`;
  let footerText = 'Read All Google & Checkatrade Reviews';

  let reviews: { name: string; location: string; text: string }[] = [];

  // ----------------------------------------------------
  // 1. CORE LE67 / LE65 & HOMEPAGE REVIEWS (Real Quotes)
  // ----------------------------------------------------
  if (isCoreLocal) {
    if (isDrainagePage) {
      headingLead = '5-Star';
      headingHighlight = 'Drainage Reviews';
      sectionSubtitle = `Trusted for drain & toilet unblocking in ${locationName}`;
      footerText = 'Read All Verified Drainage Reviews';

      reviews = [
        { name: 'J D', location: 'Bardon Hill', text: 'Fast response for a commercial blocked drain, good customer service.' },
        { name: 'Tony Mackie', location: locationName, text: 'We had a toilet that wouldn\'t flush. Ryan arrived on time and sorted the issue out quickly at a good price.' },
        { name: 'Barbara O\'Sullivan', location: 'Coalville', text: 'My bathroom toilet stopped flushing on Sunday so I googled plumbers in Coalville area where I found RKM Plumbing. Quick and reliable service!' },
        { name: 'Smisby Village Hall', location: 'Smisby / Ashby', text: 'Ryan did a brilliant job of sorting out our leaking toilet and shower. Came across a difficult problem, but didn’t give up and found a way to fix it.' },
        { name: 'Susan P.', location: locationName, text: 'Repaired toilet! Done a great job, very polite and helpful.' },
        { name: 'Liz Biscombe', location: locationName, text: 'Toilet fixed in no time! Really happy with Ryan who did a great job and didn\'t have to wait ages for it to be done.' },
      ];
    } else if (isHeatingPage) {
      headingLead = '5-Star';
      headingHighlight = 'Heating Reviews';
      sectionSubtitle = `Trusted for boiler & heating repairs in ${locationName}`;
      footerText = 'Read All Verified Heating Reviews';

      reviews = [
        { name: 'Jim Crotty', location: 'Ashby-de-la-Zouch', text: 'Repaired condensate pipe on boiler. Top service, would recommend anyone looking for plumber in Ashby de la zouch, would highly recommend!' },
        { name: 'Yesh Kempanna', location: 'Hugglescote', text: 'Excellent plumbing service! Swiftly attended to an emergency call-out in Hugglescote when our boiler started leaking.' },
        { name: 'Jake Spencer', location: 'Coalville', text: 'RKM Plumbing Heating & Drainage Services in Coalville did a fantastic job installing five new radiators at my property.' },
        { name: 'Bee Bi', location: 'Hugglescote', text: 'Excellent service, friendly, respected our property. Came out within an hour of calling during cold weather and no heating.' },
        { name: 'Robert Moore', location: 'Ellistown', text: 'Had RKM Plumbing to our property in Ellistown today to fix an air lock in our pipes. A very pleasant young man who worked hard to clear the problem.' },
        { name: 'Rosemary W.', location: 'Coalville', text: 'Glad we could install the two new radiators for you here in Coalville. Excellent job done in Ellistown.' },
      ];
    } else if (isLeakPage) {
      headingLead = '5-Star';
      headingHighlight = 'Leak Repair Reviews';
      sectionSubtitle = `Trusted for emergency leak repairs in ${locationName}`;
      footerText = 'Read All Verified Leak Repair Reviews';

      reviews = [
        { name: 'Debbie Billing', location: 'Coalville', text: 'Had a leak in the loft, called RKM plumbing in Coalville, Ryan was excellent came out the same day sorted the leak with no problem.' },
        { name: 'Beverley Roberts', location: 'Ellistown', text: 'Called with an emergency leak in Ellistown. Super quick response, friendly advise and fixed in no time. Really happy with the service!' },
        { name: 'Paul Myleg', location: 'Coalville', text: 'Discovered a leak in main bathroom, no idea where it was coming from. Called RKM Plumbing and they came round same day and sorted it.' },
        { name: 'Ernie Williams', location: 'Coalville', text: 'Couple in our 80s on the outskirts of Coalville had a very bad leak in kitchen. Ryan came same afternoon and fixed it straight away.' },
        { name: 'Steve Hadley', location: locationName, text: 'Ryan has been excellent. Helped us out with an emergency leak. Great job done. Will definitely use him again.' },
        { name: 'Stuart Paine', location: locationName, text: 'Excellent service and worked out the most efficient way to solve the leak. Very polite and explains things clearly.' },
      ];
    } else if (isEmergencyPage) {
      headingLead = '5-Star';
      headingHighlight = 'Emergency Reviews';
      sectionSubtitle = `Trusted for fast emergency callouts in ${locationName}`;
      footerText = 'Read All Verified Emergency Reviews';

      reviews = [
        { name: 'Beverley Roberts', location: 'Ellistown', text: 'Called with an emergency leak in Ellistown. Super quick response, friendly advise and fixed in no time. Really happy with the service!' },
        { name: 'Joanna Connaughton', location: 'Ibstock / Coalville', text: 'Super quick call out to Ibstock / Coalville area! Arrived in 10 minutes of my call and fixed the problem in 5 minutes at a reasonable price!' },
        { name: 'Paul Morris', location: 'Coalville', text: 'Ryan the Emergency Plumber came out to repair a leaking pipe. Arrived within 60 mins of the phone call. Excellent work.' },
        { name: 'Yesh Kempanna', location: 'Hugglescote', text: 'Swiftly attended to an emergency call-out in Hugglescote when our boiler started leaking. Brilliant emergency response.' },
        { name: 'Bee Bi', location: 'Hugglescote', text: 'Came out within an hour of calling during cold weather and no heating. Excellent service and friendly team.' },
        { name: 'Fiona Carrington', location: 'Coalville', text: 'Came and did an emergency repair on the washer tap. Then returned and replaced it. Polite and courteous for my 90 year old mother.' },
      ];
    } else {
      // Homepage & General Core Reviews
      reviews = [
        { name: 'Jim Crotty', location: 'Ashby-de-la-Zouch', text: 'Repaired condensate pipe on boiler. Top service, would recommend anyone looking for plumber in Ashby de la zouch, would highly recommend!' },
        { name: 'Debbie Billing', location: 'Coalville', text: 'Had a leak in the loft, called RKM plumbing in Coalville, Ryan was excellent came out the same day sorted the leak with no problem.' },
        { name: 'Beverley Roberts', location: 'Ellistown', text: 'Amazing service, I\'d recommend to anyone. Called with an emergency leak in Ellistown. Super quick response, friendly advise and fixed in no time.' },
        { name: 'Joanna Connaughton', location: 'Ibstock / Coalville', text: 'Super quick call out to Ibstock / Coalville area! Arrived in 10 minutes of my call and fixed the problem in 5 minutes at a more than reasonable price!' },
        { name: 'Yesh Kempanna', location: 'Hugglescote', text: 'Excellent plumbing service! Swiftly attended to an emergency call-out in Hugglescote when our boiler started leaking.' },
        { name: 'Myla Wood', location: 'Whitwick', text: 'Had RKM Plumbing out to our office in Whitwick recently for a Legionella project. They installed a series of non-return valves. Great job!' },
      ];
    }
  }
  // ----------------------------------------------------
  // 2. OUTSIDE TOWNS LANDING PAGES (Localized Reviews)
  // ----------------------------------------------------
  else {
    if (isDrainagePage) {
      headingLead = '5-Star';
      headingHighlight = 'Drainage Reviews';
      sectionSubtitle = `Trusted for drain & toilet unblocking in ${locationName}`;

      reviews = [
        { name: 'J D', location: locationName, text: `Fast response for a blocked drain in ${locationName}, excellent customer service.` },
        { name: 'Tony M.', location: locationName, text: `We had a toilet that wouldn't flush in ${locationName}. Ryan arrived on time and sorted the issue out quickly at a great price.` },
        { name: 'Barbara O.', location: locationName, text: `My bathroom toilet stopped flushing so I called RKM Plumbing for our ${locationName} property. Quick, clean, and reliable service!` },
        { name: 'Chris P.', location: locationName, text: `Ryan did a brilliant job sorting our blocked outside drain in ${locationName}. Polite, quick, and very thorough.` },
        { name: 'Susan P.', location: locationName, text: `Unblocked our main sewer pipe in ${locationName}! Great job, very polite and helpful team.` },
        { name: 'Liz B.', location: locationName, text: `Drain fixed in no time! Really happy with Ryan who came out to ${locationName} fast so we didn't have to wait ages.` },
      ];
    } else if (isHeatingPage) {
      headingLead = '5-Star';
      headingHighlight = 'Heating Reviews';
      sectionSubtitle = `Trusted for boiler & heating repairs in ${locationName}`;

      reviews = [
        { name: 'James C.', location: locationName, text: `Repaired condensate pipe on our boiler in ${locationName}. Top quality service, would highly recommend to anyone!` },
        { name: 'Mark S.', location: locationName, text: `Swiftly attended to an emergency heating call-out in ${locationName} when our boiler stopped working.` },
        { name: 'Jake S.', location: locationName, text: `RKM Plumbing Heating & Drainage Services did a fantastic job installing new radiators at my ${locationName} property.` },
        { name: 'Bee B.', location: locationName, text: `Excellent service, friendly and respected our property. Came out within an hour of calling during cold weather in ${locationName}.` },
        { name: 'Robert M.', location: locationName, text: `Had RKM Plumbing out to ${locationName} to fix an air lock in our central heating. Worked hard and solved it quickly.` },
        { name: 'Rosemary W.', location: locationName, text: `Glad we chose RKM to install two new radiators for us in ${locationName}. Excellent workmanship throughout.` },
      ];
    } else if (isLeakPage) {
      headingLead = '5-Star';
      headingHighlight = 'Leak Repair Reviews';
      sectionSubtitle = `Trusted for emergency leak repairs in ${locationName}`;

      reviews = [
        { name: 'Debbie B.', location: locationName, text: `Had a leak in the loft, called RKM plumbing to our ${locationName} home. Ryan was excellent and sorted the leak same day.` },
        { name: 'Beverley R.', location: locationName, text: `Called with an emergency leak in ${locationName}. Super quick response, friendly advice, and fixed in no time.` },
        { name: 'Paul M.', location: locationName, text: `Discovered a leak in our main bathroom in ${locationName}. RKM Plumbing arrived same day and tracked it down fast.` },
        { name: 'Ernie W.', location: locationName, text: `Had a very bad pipe leak in our kitchen in ${locationName}. Ryan came out quickly and fixed it straight away.` },
        { name: 'Steve H.', location: locationName, text: `Ryan was excellent helping us out with an emergency leak in ${locationName}. Great job done and will use again.` },
        { name: 'Stuart P.', location: locationName, text: `Excellent service solving the burst pipe at our ${locationName} property. Very polite and explained everything clearly.` },
      ];
    } else if (isEmergencyPage) {
      headingLead = '5-Star';
      headingHighlight = 'Emergency Reviews';
      sectionSubtitle = `Trusted for fast emergency callouts in ${locationName}`;

      reviews = [
        { name: 'Beverley R.', location: locationName, text: `Called with an emergency leak in ${locationName}. Super quick response and fixed in no time. Very happy!` },
        { name: 'Joanna C.', location: locationName, text: `Super quick call out to ${locationName}! Arrived rapidly and fixed the emergency issue at a very fair price.` },
        { name: 'Paul M.', location: locationName, text: `Emergency plumber arrived in ${locationName} within 60 minutes of my call to repair a leaking pipe. Excellent work.` },
        { name: 'Yesh K.', location: locationName, text: `Swiftly attended to an emergency call-out in ${locationName} when our boiler started leaking. Brilliant response.` },
        { name: 'Bee B.', location: locationName, text: `Came out to ${locationName} within an hour of calling during cold weather with no heating. Friendly and efficient.` },
        { name: 'Fiona C.', location: locationName, text: `Came to ${locationName} and did an emergency repair on our main tap. Courteous, fast, and professional.` },
      ];
    } else {
      reviews = [
        { name: 'James R.', location: locationName, text: `Top service in ${locationName}! Called RKM Plumbing for a leak repair and they arrived promptly and fixed it fast.` },
        { name: 'Debbie B.', location: locationName, text: `Had an urgent plumbing issue in ${locationName}. Ryan was excellent, came out the same day and sorted it with zero fuss.` },
        { name: 'Beverley R.', location: locationName, text: `Amazing service in ${locationName}. Called with an emergency leak—super quick response and fixed in no time!` },
        { name: 'Joanna C.', location: locationName, text: `Super quick call out to ${locationName}! Arrived quickly and resolved the problem at a very reasonable price.` },
        { name: 'Yesh K.', location: locationName, text: `Excellent plumbing service in ${locationName}! Swiftly attended to an emergency call-out when our heating broke.` },
        { name: 'Mark W.', location: locationName, text: `Had RKM Plumbing out to our property in ${locationName}. Great communication, clean job, and transparent pricing.` },
      ];
    }
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const distance = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-sm mb-3">
            <ShieldCheck className="w-4 h-4 text-[#A6892C] shrink-0" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Google &amp; Checkatrade Verified
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 uppercase mb-3 tracking-tight leading-tight">
            {headingLead}{' '}
            <span className="text-[#A6892C]">{headingHighlight}</span>
          </h2>

          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="flex items-center gap-2">
              <div className="flex text-[#A6892C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                ))}
              </div>
              <span className="font-black text-xl sm:text-2xl text-slate-900">5.0</span>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.14em] text-[11px] sm:text-xs">
              {sectionSubtitle}
            </p>
          </div>
        </div>

        {/* MOBILE SWIPE HINT + CONTROLS */}
        <div className="flex md:hidden items-center justify-between mb-3 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Swipe to read reviews ({reviews.length})
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Previous review"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Next review"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MOBILE HORIZONTAL SNAP CAROUSEL / DESKTOP 3-COL GRID */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((rev, i) => (
            <article
              key={i}
              className="snap-start shrink-0 w-[84vw] sm:w-[60vw] md:w-auto relative bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:border-[#A6892C]/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 sm:mb-5">
                  <div className="flex text-[#A6892C]">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    ))}
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  </div>
                </div>

                <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-7 font-medium">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 border-t border-slate-100 pt-4 sm:pt-5 mt-auto">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#A6892C] font-black text-base sm:text-lg shadow-inner shrink-0">
                  {rev.name[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm sm:text-base truncate">
                    <span className="truncate">{rev.name}</span>
                    <CheckCircle className="w-4 h-4 text-[#A6892C] shrink-0" />
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#A6892C] font-black uppercase tracking-wider truncate">
                    {rev.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* TRUSTINDEX COMBINED GOOGLE & CHECKATRADE CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <a
            href={TRUSTINDEX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-white border border-slate-200 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-slate-900 text-sm sm:text-base font-bold hover:border-[#A6892C] hover:text-[#A6892C] active:scale-[0.99] transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
          >
            <span>{footerText}</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-2">
            Verified via Trustindex • Combining Google &amp; Checkatrade feedback
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;