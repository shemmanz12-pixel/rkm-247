import { Star, CheckCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { towns } from '../townConfig';

interface ReviewsProps {
  townSlug?: string;
  serviceSlug?: string;
}

const Reviews = ({ townSlug, serviceSlug }: ReviewsProps) => {
  const params = useParams<{ townSlug?: string; serviceSlug?: string }>();

  const normalize = (value: string | undefined) =>
    (value || '').toLowerCase().replace(/\/$/, '').replace(/\.html$/, '').trim();

  const cleanTownKey = normalize(townSlug || params.townSlug);
  const cleanServiceKey = normalize(serviceSlug || params.serviceSlug);

  const townName = towns[cleanTownKey]?.name || 'Leicestershire';

  const isDrainagePage = [
    'drain-unblocking',
    'blocked-drain-clearing',
    'emergency-drain-unblocking',
    'outside-drain-unblocking',
    'blocked-toilet',
  ].includes(cleanServiceKey);

  const isHeatingPage = ['heating', 'heating-repairs'].includes(cleanServiceKey);
  const isLeakPage = cleanServiceKey === 'leak-detection';
  const isEmergencyPage = cleanServiceKey === 'emergency-plumber';

  let sectionTitle = 'Verified 5-Star Service';
  let sectionSubtitle = `Trusted by the local community in ${townName}`;
  let footerText = 'Read 40+ More Google Reviews';

  let reviews = [
    {
      name: 'Sarah J.',
      location: 'Coalville',
      text: 'Arrived within the hour and fixed the leak immediately. Very polite and professional service.',
    },
    {
      name: 'Mike T.',
      location: 'Ashby De La Zouch',
      text: 'No call out charge was a huge plus. Professional job, would definitely use RKM again.',
    },
    {
      name: 'Emma W.',
      location: 'Whitwick',
      text: 'Saved us from a flooded kitchen late at night. Highly recommend for any emergency work.',
    },
  ];

  if (isDrainagePage) {
    sectionTitle = 'Verified 5-Star Drainage Service';
    sectionSubtitle = `Trusted for drain unblocking in ${townName}`;
    footerText = 'Read More Drainage Reviews';

    reviews = [
      {
        name: 'Sarah J.',
        location: 'Coalville',
        text: 'Cleared our blocked outside drain quickly and left everything clean. Excellent local service.',
      },
      {
        name: 'Mike T.',
        location: 'Ashby De La Zouch',
        text: 'Sorted a badly blocked kitchen drain fast. Very professional and no call out fee.',
      },
      {
        name: 'Emma W.',
        location: 'Whitwick',
        text: 'Came out quickly for a blocked toilet and drain issue. Would definitely recommend.',
      },
    ];
  } else if (isHeatingPage) {
    sectionTitle = 'Verified 5-Star Heating Service';
    sectionSubtitle = `Trusted for heating repairs in ${townName}`;
    footerText = 'Read More Heating Reviews';

    reviews = [
      {
        name: 'Sarah J.',
        location: 'Coalville',
        text: 'Fixed our heating problem quickly and got the radiators working properly again.',
      },
      {
        name: 'Mike T.',
        location: 'Ashby De La Zouch',
        text: 'Fast response, clear advice and a professional heating repair from start to finish.',
      },
      {
        name: 'Emma W.',
        location: 'Whitwick',
        text: 'Sorted our no-heat issue the same day. Great local service and very reliable.',
      },
    ];
  } else if (isLeakPage) {
    sectionTitle = 'Verified 5-Star Leak Detection Service';
    sectionSubtitle = `Trusted for leak detection in ${townName}`;
    footerText = 'Read More Leak Detection Reviews';

    reviews = [
      {
        name: 'Sarah J.',
        location: 'Coalville',
        text: 'Found the hidden leak quickly and explained everything clearly. Excellent service.',
      },
      {
        name: 'Mike T.',
        location: 'Ashby De La Zouch',
        text: 'Very thorough leak detection service and saved us from more damage.',
      },
      {
        name: 'Emma W.',
        location: 'Whitwick',
        text: 'Tracked down a leak we could not find for weeks. Professional and efficient.',
      },
    ];
  } else if (isEmergencyPage) {
    sectionTitle = 'Verified 5-Star Emergency Plumbing Service';
    sectionSubtitle = `Trusted for emergency plumber callouts in ${townName}`;
    footerText = 'Read More Emergency Plumbing Reviews';

    reviews = [
      {
        name: 'Sarah J.',
        location: 'Coalville',
        text: 'Arrived fast for an emergency leak and got everything under control straight away.',
      },
      {
        name: 'Mike T.',
        location: 'Ashby De La Zouch',
        text: 'Quick emergency plumber response and a very professional repair.',
      },
      {
        name: 'Emma W.',
        location: 'Whitwick',
        text: 'Saved us late at night when a pipe burst. Excellent emergency service.',
      },
    ];
  }

  return (
    <section id="reviews" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase mb-4 tracking-tight">
            {sectionTitle.split('5-Star')[0]}5-Star <span className="text-[#A6892C]">{sectionTitle.split('5-Star')[1]?.trim() || 'Service'}</span>
          </h2>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex text-[#A6892C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span className="font-black text-2xl text-slate-900">5.0</span>
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">
              {sectionSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="relative bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-6 right-6">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex text-[#A6892C] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                "{rev.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#A6892C] font-black text-xl shadow-inner">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-lg">
                    {rev.name}
                    <CheckCircle className="w-4 h-4 text-[#A6892C]" />
                  </h4>
                  <p className="text-xs text-[#A6892C] font-black uppercase tracking-widest">
                    {rev.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.google.com/search?q=RKM+Plumbing+%26+Heating+Services+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white border border-slate-200 px-8 py-4 rounded-2xl text-slate-900 font-bold hover:border-[#A6892C] hover:text-[#A6892C] transition-all shadow-sm hover:shadow-md"
          >
            <span className="flex items-center gap-2">{footerText}</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;