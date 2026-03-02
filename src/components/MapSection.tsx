import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MY_MAP_EMBED = 'https://www.google.com/maps/d/u/0/embed?mid=1obhs_FPtXngr_klCMB3xNwzIRqvXMN0';

const MapSection = () => {
  const { town } = useParams<{ town?: string }>();

  const formatTown = (slug: string | undefined) => {
    if (!slug) return 'Coalville';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const locationName = formatTown(town);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      setIframeLoaded(true);
      return;
    }
    if (!('IntersectionObserver' in window)) {
      setIframeLoaded(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setIframeLoaded(true);
          obs.disconnect();
          break;
        }
      }
    }, { rootMargin: '300px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="map" className="py-20 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-4">

        {/* HEADER TEXT */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 uppercase mb-4">
            Local Engineers in <span className="text-[#A6892C]">{locationName}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team is currently active in <strong>{locationName}</strong> and the surrounding villages.
            We aim to be with you in under 60 minutes.
          </p>
        </div>

        {/* MAP CONTAINER (lazy iframe) */}
        <div ref={containerRef} className="w-full h-[540px] bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white relative z-10">
          {iframeLoaded ? (
            <iframe
              src={MY_MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title={`RKM Plumbing Service Area Map - ${locationName}`}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">Loading map…</div>
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

        {/* FOOTER NOTE */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Note: We cover a 15-mile radius around {locationName}. If you are unsure if we cover your postcode, please call us.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MapSection;