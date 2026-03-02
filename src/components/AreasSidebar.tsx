import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Search, X, ChevronsUpDown } from 'lucide-react';

const AREAS = [
  "Albert Village", "Ashby de la Zouch", "Bagworth", "Bardon Hill", "Battram",
  "Blackfordby", "Boundary", "Breedon on the Hill", "Coalville", "Coleorton",
  "Copt Oak", "Donington le Heath", "Donisthorpe", "Ellistown", "Griffydam",
  "Heather", "Hugglescote", "Ibstock", "Leicestershire", "Lount", "Markfield", "Measham",
  "Moira", "Newbold Coleorton", "Normanton le Heath", "Oakthorpe", "Osgathorpe",
  "Packington", "Peggs Green", "Ravenstone", "Shellbrook", "Sinope", "Smisby",
  "Snibston", "Stanton under Bardon", "Staunton Harold", "Swannington",
  "Thringstone", "Tonge", "Whitwick", "Willesley", "Wilson", "Worthington",
  // Charnwood Forest / Leicestershire villages (added)
  "Quorn", "Swithland", "Mountsorrel", "Sileby", "Barrow upon Soar", "Woodhouse Eaves", "Cossington"
];

const defaultService = 'local-plumber';

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AreasSidebar() {
  const { service } = useParams<{ service?: string }>();
  const initialOpen = typeof window !== 'undefined' && localStorage.getItem('areasSidebarOpen') === '1';
  const [open, setOpen] = useState<boolean>(!!initialOpen);
  const [query, setQuery] = useState('');

  useEffect(() => {
    try { localStorage.setItem('areasSidebarOpen', open ? '1' : '0'); } catch (e) {}
  }, [open]);

  const serviceId = service || defaultService;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AREAS;
    return AREAS.filter(a => a.toLowerCase().includes(q));
  }, [query]);

  // height in px when open/closed
  const openHeight = 420;
  const closedHeight = 56;

  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 60 }}>
      <div
        style={{
          width: 320,
          height: open ? openHeight : closedHeight,
          transition: 'height 260ms cubic-bezier(.2,.9,.2,1)',
          overflow: 'hidden',
          borderRadius: 12,
          boxShadow: '0 8px 30px rgba(2,6,23,0.2)'
        }}
        className="bg-white border border-gray-100"
        aria-hidden={!open}
      >
        {/* Header / handle */}
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#A6892C]" />
            <div>
              <div className="text-xs text-gray-500">Areas Covered</div>
              <div className="text-sm font-bold text-slate-900">Local Villages & Towns</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close areas' : 'Open areas'}
              className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-50 hover:bg-slate-100 border border-gray-100"
            >
              {open ? <X className="w-4 h-4 text-gray-700" /> : <ChevronsUpDown className="w-4 h-4 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 12 }}>
          <div className="mb-3">
            <label className="relative block">
              <span className="sr-only">Search areas</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search towns (e.g. Quorn)"
                className="placeholder-gray-400 text-sm pl-10 pr-3 py-2 w-full border border-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A6892C]"
              />
            </label>
          </div>

          <div style={{ maxHeight: open ? (openHeight - 140) : 0, transition: 'max-height 260ms cubic-bezier(.2,.9,.2,1)', overflowY: 'auto' }}>
            <ul className="space-y-2">
              {filtered.map((area) => {
                const slug = slugify(area);
                return (
                  <li key={area} className="">
                    <Link
                      to={`/${serviceId}/${slug}`}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors border border-transparent"
                    >
                      <div className="text-sm font-medium text-slate-800">{area}</div>
                      <div className="text-xs text-gray-400">{slug}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 text-center">
              <Link to={`/locations`} className="text-xs text-[#A6892C] font-semibold">See full coverage page</Link>
            </div>
          </div>

        </div>
      </div>

      {/* Collapsed floating hint when closed - shows a small pill */}
      {!open && (
        <div className="mt-2 text-right">
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-100 shadow-sm">
            <MapPin className="w-4 h-4 text-[#A6892C]" />
            <span className="text-xs font-semibold text-slate-700">Areas</span>
          </button>
        </div>
      )}
    </div>
  );
}
