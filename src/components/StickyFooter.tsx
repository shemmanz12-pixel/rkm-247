import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Phone, Calendar, ChevronDown, Send, MapPin, Mail } from 'lucide-react';
import { towns } from '../townConfig'; 

const StickyFooter = () => {
  const params = useParams();
  const location = useLocation();

  // Widget state (tooltip popup state removed)
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [addressArea, setAddressArea] = useState('');
  const [service, setService] = useState('Emergency Plumbing');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);

  // Target WhatsApp mobile number (UK format without leading 0)
  const targetWhatsApp = '447848969229';

  // Route matching logic
  const pathParts = location.pathname.split('/').filter(Boolean);
  const slugFromPath = pathParts[pathParts.length - 1]; 
  const activeSlug = params.townSlug || params.town || slugFromPath || '';

  const normalize = (value: string) => value.toLowerCase().replace('.html', '').trim();
  const cleanTownKey = normalize(activeSlug);
  const townData = towns[cleanTownKey];
  const customPhone = townData?.phone || "01530 654 062";
  const displayTown = townData?.name || (cleanTownKey ? cleanTownKey.charAt(0).toUpperCase() + cleanTownKey.slice(1) : "");

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!addressArea.trim()) {
      alert('Please enter your address or area');
      return;
    }

    if (!consent) {
      alert('Please agree to receive a message response');
      return;
    }

    const formattedText = 
      `*New WhatsApp Lead (RKM Plumbing & Heating)*\n\n` +
      `*Name:* ${name.trim()}\n` +
      `*Address/Area:* ${addressArea.trim()}\n` +
      `*Service Required:* ${service}\n` +
      (displayTown ? `*Target Town:* ${displayTown}\n` : '') +
      `*Job Details:* ${message.trim() || 'No additional details provided'}`;

    const waUrl = `https://api.whatsapp.com/send/?phone=${targetWhatsApp}&text=${encodeURIComponent(formattedText)}&type=phone_number&app_absent=0`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay - closes popup if tapped outside */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[105]"
          aria-hidden="true"
        />
      )}

      {/* WhatsApp Query Modal */}
      {isOpen && (
        <div className="fixed right-3 bottom-[76px] sm:bottom-[86px] z-[110] w-[calc(100vw-1.5rem)] max-w-[360px] max-h-[82vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-200 transition-all duration-200 animate-in fade-in slide-in-from-bottom-3">
          
          {/* Header */}
          <div 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white cursor-pointer hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A6892C] text-slate-900 font-extrabold text-[10px] shadow-inner shrink-0">
                24/7
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold leading-tight truncate">WhatsApp RKM</h4>
                <p className="text-[11px] text-[#A6892C] font-semibold truncate">
                  {displayTown ? `Serving ${displayTown} & Surrounding Areas` : 'Fast Direct Response'}
                </p>
              </div>
            </div>

            <button 
              type="button" 
              aria-label="Close widget"
              className="text-gray-300 hover:text-white p-1"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3.5 bg-gray-50/70">
            {/* Operator / Lead Context Message */}
            <div className="flex gap-2.5 mb-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A6892C] text-slate-900 font-black text-[10px]">
                HQ
              </div>
              <div className="rounded-2xl rounded-tl-none bg-white p-2.5 text-xs leading-relaxed text-gray-700 shadow-sm border border-gray-200">
                <span className="font-semibold text-slate-900">WhatsApp RKM</span> for 
                <span className="font-semibold text-amber-700"> Emergency Callouts</span>, 
                <span className="font-semibold text-slate-900"> Boiler Quotes</span> &amp; 
                <span className="font-semibold text-slate-900"> Online Bookings</span>. Works on mobile &amp; web!
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleWhatsAppSubmit} className="space-y-2">
              <div>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 focus:border-[#A6892C] focus:outline-none focus:ring-1 focus:ring-[#A6892C]"
                >
                  <option value="Emergency Plumbing">🚨 Emergency Plumbing</option>
                  <option value="New Boiler / Boiler Quote">🔥 Boiler Quotes &amp; Repairs</option>
                  <option value="External Drain Unblocking">🚰 External Drain Unblocking</option>
                  <option value="Book Online / General Plumbing">📅 Book Appointment / General Work</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base sm:text-xs text-gray-800 placeholder-gray-400 focus:border-[#A6892C] focus:outline-none focus:ring-1 focus:ring-[#A6892C]"
                />
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#A6892C]" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Address or Area *"
                  value={addressArea}
                  onChange={(e) => setAddressArea(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-base sm:text-xs text-gray-800 placeholder-gray-400 focus:border-[#A6892C] focus:outline-none focus:ring-1 focus:ring-[#A6892C]"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Write job description..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-base sm:text-xs text-gray-800 placeholder-gray-400 focus:border-[#A6892C] focus:outline-none focus:ring-1 focus:ring-[#A6892C]"
                />
              </div>

              <label className="flex items-start gap-2 pt-0.5 text-[11px] leading-tight text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#25D366] focus:ring-[#25D366]"
                />
                <span>I agree to receive a response on WhatsApp.</span>
              </label>

              <button
                type="submit"
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5 fill-white" />
                <span>Open in WhatsApp</span>
              </button>

              {/* Direct Email & Call Fallback */}
              <div className="pt-2 text-center border-t border-gray-200 mt-2 space-y-1">
                <div>
                  <a
                    href={`mailto:info@rkm247.co.uk?subject=${encodeURIComponent(
                      service + (displayTown ? ` - ${displayTown}` : '')
                    )}&body=${encodeURIComponent(
                      `Name: ${name || 'N/A'}\nAddress/Area: ${addressArea || 'N/A'}\n\nDetails: ${message || ''}`
                    )}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 hover:text-[#A6892C] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#A6892C]" />
                    <span>Prefer email? Send to info@rkm247.co.uk</span>
                  </a>
                </div>

                <p className="text-[10px] text-slate-500">
                  Or call 24/7:{' '}
                  <a 
                    href={`tel:${customPhone.replace(/\s+/g, '')}`} 
                    className="font-bold text-[#A6892C] hover:underline"
                  >
                    {customPhone}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Sticky Bottom Bar */}
      <div 
        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2 sm:p-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.12)] z-[100]"
      >
        <div className="relative flex items-center gap-2 sm:gap-3 max-w-4xl mx-auto">
          
          {/* BOOK ONLINE BUTTON */}
          <a 
            href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0 bg-slate-900 hover:bg-slate-800 text-white font-black py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 shadow-md active:scale-[0.98] transition-all border border-slate-800"
          >
            <div className="bg-white/10 p-1 sm:p-1.5 rounded-full shrink-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A6892C]" />
            </div>
            <div className="flex flex-col items-start leading-none min-w-0 truncate">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#A6892C] mb-0.5">
                Book Online
              </span>
              <span className="text-xs sm:text-sm font-black tracking-tight whitespace-nowrap truncate">
                Schedule Visit
              </span>
            </div>
          </a>

          {/* CALL 24/7 BUTTON */}
          <a 
            href={`tel:${customPhone.replace(/\s+/g, '')}`} 
            className="flex-1 min-w-0 bg-[#A6892C] hover:bg-[#b5952f] text-slate-950 font-black py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 shadow-md active:scale-[0.98] transition-all border border-[#927725]"
          >
            <div className="bg-slate-950/10 p-1 sm:p-1.5 rounded-full shrink-0">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
            </div>
            <div className="flex flex-col items-start leading-none min-w-0 truncate">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-900/80 mb-0.5">
                Call 24/7
              </span>
              <span className="text-xs sm:text-sm font-black tracking-tight whitespace-nowrap truncate">
                {customPhone}
              </span>
            </div>
          </a>

          {/* WHATSAPP BUTTON */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="WhatsApp RKM for Emergency Plumbing, Boiler Quotes and Drain Unblocking"
              className={`h-[44px] w-[44px] sm:h-[48px] sm:w-[48px] rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 ${
                isOpen 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-[#25D366] text-white hover:bg-[#20ba59]'
              }`}
            >
              {isOpen ? (
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white drop-shadow-sm"
                  aria-hidden="true"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default StickyFooter;