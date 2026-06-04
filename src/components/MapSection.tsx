import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { towns } from '../townConfig';

const MY_MAP_EMBED = 'https://www.google.com/maps/d/u/0/embed?mid=1obhs_FPtXngr_klCMB3xNwzIRqvXMN0';

interface MapSectionProps {
  townSlug?: string;
  serviceSlug?: string;
}

const MapSection = ({ townSlug, serviceSlug }: MapSectionProps) => {
  const params = useParams<{ townSlug?: string; serviceSlug?: string }>();

  const normalize = (value: string | undefined) =>
    (value || '').toLowerCase().replace(/\/$/, '').replace('.html', '').trim();

  const cleanTownKey = normalize(townSlug || params.townSlug);
  const cleanServiceKey = normalize(serviceSlug || params.serviceSlug);

  const townData = towns[cleanTownKey];

  const locationName =
    townData?.name ||
    (cleanTownKey
      ? cleanTownKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : 'Coalville');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

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

  let heading = `Local Engineers in ${locationName}`;
  let body = `Our team is currently responding to calls in ${locationName} and the surrounding villages. We aim for a 60-minute arrival for all emergency plumbing and heating repairs.`;
  let radiusNote = `Rapid Response Radius: 20 Miles from ${locationName}`;
  let coverageNote = `Covering LE65, LE67, DE11, DE12 and all North West Leicestershire postcodes`;

  if (isDrainagePage) {
    heading = `Local Drain Unblocking in ${locationName}`;
    body = `We provide drain unblocking in ${locationName} and surrounding areas, covering blocked drains, blocked toilets, sinks, gullies and outside drains with fast local response.`;
    radiusNote = `Fast Drainage Response Around ${locationName}`;
    coverageNote = `Covering North West Leicestershire including LE65, LE67, DE11 and DE12`;
  } else if (isHeatingPage) {
    heading = `Local Heating Repairs in ${locationName}`;
    body = `Our team provides heating repairs in ${locationName} and nearby areas, including radiator faults, low pressure, heating breakdowns and loss of hot water.`;
  } else if (isLeakPage) {
    heading = `Local Leak Detection in ${locationName}`;
    body = `We provide leak detection in ${locationName} and surrounding areas, helping locate hidden plumbing leaks quickly and safely.`;
  } else if (isEmergencyPage) {
    heading = `Emergency Plumber Coverage in ${locationName}`;
    body = `We provide fast emergency plumber callouts in ${locationName} and nearby villages for urgent leaks, burst pipes, blocked toilets and other plumbing emergencies.`;
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      setIframeLoaded(true);
      return;
    }

    const obs = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIframeLoaded(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: '300px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="map" className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6892C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A6892C]"></span>
            </span>
            <span className="text-[#A6892C] font-black uppercase tracking-[0.2em] text-xs">
              Live Area Coverage
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase mb-6 tracking-tight">
            {heading.split(locationName)[0]}
            <span className="text-[#A6892C]">{locationName}</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {body}
          </p>
        </div>

        <div
          ref={containerRef}
          className="w-full h-[500px] bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white relative"
        >
          {iframeLoaded ? (
            <iframe
              src={MY_MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title={`RKM Plumbing Service Area Map - ${locationName}`}
              className="grayscale-[20%] contrast-[1.1]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-sm text-gray-400 gap-3">
              <div className="w-8 h-8 border-4 border-[#A6892C] border-t-transparent rounded-full animate-spin"></div>
              Locating {locationName}...
            </div>
          )}

          <noscript>
            <iframe
              src={MY_MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title={`RKM Plumbing Service Area Map - ${locationName}`}
            />
          </noscript>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
            {radiusNote}
          </div>
          <p className="text-gray-400 text-[10px] mt-4 uppercase font-bold tracking-widest">
            {coverageNote}
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#A6892C]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    </section>
  );
};

export default MapSection;