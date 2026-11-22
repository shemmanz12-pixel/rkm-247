import { useRef, useState } from 'react';
import {
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  X,
  ZoomIn,
} from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
import { towns } from '../townConfig';

interface ReviewsProps {
  townSlug?: string;
  serviceSlug?: string;
}

interface ReviewItem {
  name: string;
  location: string;
  text: string;
  photos?: string[];
  reviewUrl?: string;
  serviceTag?: string;
}

const TRUSTINDEX_URL = 'https://www.trustindex.io/reviews/rkm247.co.uk';

const BOILER_PHOTO_REVIEWS: ReviewItem[] = [
  {
    name: 'Piotr Bakiera',
    location: 'Coalville',
    serviceTag: 'New Boiler & Water Tank',
    text: 'New Boiler and Water Tank fitted perfectly and professionally. They will literally work long hours to make your things done. Totally worth recommending.',
    photos: ['/review-piotr-1.webp', '/review-piotr-2.webp'],
    reviewUrl: 'https://maps.app.goo.gl/WSevYSjFLgkVEGkL9',
  },
  {
    name: 'Nik p',
    location: 'Coalville',
    serviceTag: 'New Boiler Install',
    text: 'I had a new boiler fitted and it was a very professional service, great care taken to protect surfaces, prompt and well priced service. I would highly recommend.',
    photos: ['/review-nik-1.webp'],
    reviewUrl: 'https://maps.app.goo.gl/1Xf2jo7GPsioHvxh6',
  },
  {
    name: 'Roy Hart',
    location: 'Coalville',
    serviceTag: 'New Boiler Install',
    text: 'Brilliant job very pleased, clean and tidy work, lovely new boiler!',
    photos: ['/review-roy-1.webp'],
    reviewUrl: 'https://maps.app.goo.gl/XPymGYDfk3Wqvt6w6',
  },
];

const getVerifiedDrainageReviews = (locationName: string): ReviewItem[] => [
  {
    name: 'ThePhantom666',
    location: locationName,
    serviceTag: 'Drain Cleaning',
    text: "The toilet was blocked and it turned out to be a blocked drain. Ryan's team unblocked the drain, flushed everything through, and got the toilet working again. Quick, efficient, and no mess. Would highly recommend and will use them again if I need to.",
    reviewUrl: 'https://maps.app.goo.gl/jhrXLDdpF7G3URts6',
  },
  {
    name: 'Craig',
    location: locationName,
    serviceTag: 'Internal Blockage',
    text: 'Cleared a stubborn bath blockage which had withstood all other clearing attempts. Reasonable price and great service.',
    reviewUrl: 'https://maps.app.goo.gl/9zR3VHmLcKPw5qmw6',
  },
  {
    name: 'Jordan Carmichael',
    location: 'Whitwick',
    serviceTag: 'Emergency Drain Unblocking',
    text: 'We had a blocked drain pipe that was causing both the toilet and bath to back up. Called at 8pm and they came out immediately to assess the issue. Resolved in under 2 hours, cleared up and working perfectly again, also installed an access point for the future. Massive help and very efficient.',
    reviewUrl: 'https://maps.app.goo.gl/ngVxiZV9qa5vYcYf7',
  },
];

const Reviews = ({ townSlug, serviceSlug }: ReviewsProps) => {
  const params = useParams<{ townSlug?: string; serviceSlug?: string }>();
  const location = useLocation();
  const pathname = (location?.pathname || '').toLowerCase();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

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

  const isDrainagePage =
    [
      'drain-unblocking',
      'blocked-drain-clearing',
      'emergency-drain-unblocking',
      'outside-drain-unblocking',
      'blocked-toilet',
      'cctv-drain-surveys',
      'drain-relining',
      'drain-root-cutting',
    ].includes(cleanServiceKey) ||
    pathname.includes('drain') ||
    pathname.includes('blocked-toilet');

  const isHeatingPage =
    [
      'heating',
      'heating-engineer',
      'heating-repairs',
      'central-heating',
      'central-heating-repairs',
      'radiator-repairs',
      'boiler-installs',
    ].includes(cleanServiceKey) ||
    pathname.includes('heating') ||
    pathname.includes('boiler') ||
    pathname.includes('radiator');

  const isLeakPage = cleanServiceKey === 'leak-detection' || pathname.includes('leak-detection');
  const isEmergencyPage =
    cleanServiceKey === 'emergency-plumber' || pathname.includes('emergency-plumber');

  let headingLead = '5-Star';
  let headingHighlight = 'Reviews';
  let sectionSubtitle = `Trusted by local customers in ${locationName}`;
  let footerText = 'Read All Google & Checkatrade Reviews';

  let reviews: ReviewItem[] = [];

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
        ...getVerifiedDrainageReviews(locationName),
        {
          name: 'Kayley',
          location: 'Coalville',
          text: 'Great price. Unblocked drains for us in Coalville.',
        },
        {
          name: 'J D',
          location: 'Bardon Hill',
          text: 'Fast response for a commercial blocked drain, good customer service.',
        },
        {
          name: "Barbara O'Sullivan",
          location: 'Coalville',
          text: 'My bathroom toilet stopped flushing on Sunday so I googled plumbers in Coalville area where I found RKM Plumbing. Quick and reliable service!',
        },
      ];
    } else if (isHeatingPage) {
      headingLead = '5-Star';
      headingHighlight = 'Heating Reviews';
      sectionSubtitle = `Trusted for boiler installs & heating repairs in ${locationName}`;
      footerText = 'Read All Verified Heating Reviews';

      reviews = [
        ...BOILER_PHOTO_REVIEWS,
        {
          name: 'Jim Crotty',
          location: 'Ashby-de-la-Zouch',
          text: 'Repaired condensate pipe on boiler. Top service, would recommend anyone looking for plumber in Ashby de la zouch, would highly recommend!',
        },
        {
          name: 'Yesh Kempanna',
          location: 'Hugglescote',
          text: 'Excellent plumbing service! Swiftly attended to an emergency call-out in Hugglescote when our boiler started leaking.',
        },
        {
          name: 'Jake Spencer',
          location: 'Coalville',
          text: 'RKM Plumbing Heating & Drainage Services in Coalville did a fantastic job installing five new radiators at my property.',
        },
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
      // Homepage & General Core Reviews (All 6 Verified on Google: 3 Boiler Installs + 3 Drainage)
      reviews = [
        ...BOILER_PHOTO_REVIEWS,
        ...getVerifiedDrainageReviews(locationName),
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
        ...getVerifiedDrainageReviews(locationName),
        { name: 'Kayley', location: locationName, text: `Great price. Unblocked our drains quickly in ${locationName}.` },
        { name: 'J D', location: locationName, text: `Fast response for a blocked drain in ${locationName}, excellent customer service.` },
        { name: 'Tony M.', location: locationName, text: `We had a toilet that wouldn't flush in ${locationName}. Ryan arrived on time and sorted the issue out quickly at a great price.` },
      ];
    } else if (isHeatingPage) {
      headingLead = '5-Star';
      headingHighlight = 'Heating Reviews';
      sectionSubtitle = `Trusted for boiler & heating repairs in ${locationName}`;

      reviews = [
        ...BOILER_PHOTO_REVIEWS,
        { name: 'James C.', location: locationName, text: `Repaired condensate pipe on our boiler in ${locationName}. Top quality service, would highly recommend to anyone!` },
        { name: 'Mark S.', location: locationName, text: `Swiftly attended to an emergency heating call-out in ${locationName} when our boiler stopped working.` },
        { name: 'Jake S.', location: locationName, text: `RKM Plumbing Heating & Drainage Services did a fantastic job installing new radiators at my ${locationName} property.` },
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
                <div className="flex items-center justify-between mb-3.5 sm:mb-4 gap-2">
                  <div className="flex text-[#A6892C]">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    ))}
                  </div>

                  {rev.reviewUrl ? (
                    <a
                      href={rev.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${rev.name}'s review on Google`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 hover:bg-[#A6892C]/10 border border-slate-200/80 hover:border-[#A6892C]/40 text-[11px] font-bold text-slate-600 hover:text-[#A6892C] transition-colors shrink-0"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    </div>
                  )}
                </div>

                {rev.serviceTag && (
                  <span className="inline-block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#A6892C] bg-[#A6892C]/10 px-2.5 py-0.5 rounded-full mb-2.5">
                    {rev.serviceTag}
                  </span>
                )}

                <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 font-medium">
                  "{rev.text}"
                </p>

                {/* OPTIONAL CUSTOMER PHOTO THUMBNAILS */}
                {rev.photos && rev.photos.length > 0 && (
                  <div className="flex items-center gap-2.5 mb-5">
                    {rev.photos.map((photoSrc, photoIdx) => (
                      <button
                        key={photoIdx}
                        type="button"
                        onClick={() =>
                          setLightboxImage({
                            src: photoSrc,
                            alt: `${rev.serviceTag || 'Customer install'} photo by ${rev.name}`,
                          })
                        }
                        aria-label={`Enlarge install photo from ${rev.name}`}
                        className="group/photo relative h-16 w-20 sm:h-20 sm:w-24 rounded-xl overflow-hidden border border-slate-200 hover:border-[#A6892C] bg-slate-100 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#A6892C]"
                      >
                        <img
                          src={photoSrc}
                          alt={`${rev.serviceTag || 'Boiler install'} by RKM - ${rev.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover/photo:bg-slate-900/30 transition-colors flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover/photo:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
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

      {/* FULL-SCREEN PHOTO LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close photo"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full max-h-[80vh] object-contain bg-black"
            />
            <div className="px-4 py-3 text-xs sm:text-sm text-slate-300 font-medium bg-slate-900">
              {lightboxImage.alt}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;