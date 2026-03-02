import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import BookingCard from './BookingCard'; // REUSING THE CARD

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: CONTACT INFO */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 uppercase tracking-tight">
              Contact Information
            </h2>
            
            <div className="space-y-10">
              
              {/* PHONE */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold-500/20">
                  <Phone className="w-7 h-7 text-slate-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Call for Assistance</p>
                  <a href="tel:01530654062" className="text-3xl font-black text-slate-900 hover:text-gold-500 transition-colors block mb-2">
                    01530 654 062
                  </a>
                  <span className="bg-gold-500 text-slate-900 text-xs font-bold px-3 py-1 rounded uppercase">
                    Call Now — Emergency Plumber
                  </span>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-gold-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:plumbersnearme.rkm@outlook.com" className="text-lg font-bold text-slate-900 hover:text-gold-500 transition-colors break-all">
                    plumbersnearme.rkm@outlook.com
                  </a>
                </div>
              </div>

              {/* HOURS */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-gold-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Operating Hours</p>
                  <p className="text-2xl font-bold text-slate-900">
                    24 Hours / 7 Days
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: BOOKING CARD */}
          <div className="relative">
             {/* Decorative background blob */}
            <div className="absolute -inset-4 bg-slate-50 rounded-3xl transform rotate-2 z-0"></div>
            <div className="relative z-10">
              <BookingCard />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;