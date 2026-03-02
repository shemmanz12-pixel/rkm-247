// React import not required with the new jsx transform when not referencing React directly
import { Calendar, ArrowUpRight } from 'lucide-react';

const BookingCard = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl text-slate-900 text-center border border-gray-100 h-full flex flex-col justify-center">
      <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Calendar className="w-8 h-8 text-gold-500" />
      </div>
      
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">
        Book Your Visit Online
      </h3>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        Pick a date and time that suits you best using our live calendar. 
        No need to wait for a call back — get your plumbing visit confirmed instantly.
      </p>
      
      <a 
        href="https://calendar.app.google/pbb7EJraxjMQd1xS9" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg"
      >
        OPEN BOOKING CALENDAR
        <ArrowUpRight className="w-5 h-5" />
      </a>
      
      <p className="text-xs text-gray-400 mt-4 italic">
        Securely powered by Google Calendar
      </p>
    </div>
  );
};

export default BookingCard;