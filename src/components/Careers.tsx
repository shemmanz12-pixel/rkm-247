import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  GraduationCap, BookOpen, MapPin, ArrowRight, 
  Hammer, Target, CheckCircle, Shield, Award 
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Careers: React.FC = () => {
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Apprentice Plumber (2026 Intake Register)",
    "description": "<p>RKM Plumbing & Heating is opening its register for aspiring plumbing apprentices in Coalville and Ashby.</p>",
    "datePosted": "2026-02-10",
    "validThrough": "2026-12-31",
    "employmentType": "APPRENTICE",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "RKM Plumbing & Heating Services LTD",
      "sameAs": "https://rkm247.co.uk",
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "51 Hodgetts Street",
        "addressLocality": "Coalville",
        "postalCode": "LE67 2JH",
        "addressCountry": "UK"
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 pt-32 pb-12 font-sans">
        
        {/* FIXED: Removed the direct script injection that causes the White Screen of Death */}
        <Helmet>
          <title>Careers & Apprentice Register | RKM Plumbing</title>
          <meta name="description" content="Join the RKM Plumbing & Heating future talent register. We are looking for aspiring apprentice plumbers in the Coalville and Ashby-de-la-Zouch area." />
          <link rel="canonical" href="https://rkm247.co.uk/training-register/" />
        </Helmet>

        {/* FIXED: Standard React implementation for schema injection */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />

        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* MAIN HEADER */}
          <div className="bg-white rounded-2xl p-8 md:p-16 shadow-sm border border-gray-100 mb-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Shield className="w-32 h-32" />
            </div>
            <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-2xl mb-6">
              <GraduationCap className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tight">
              Future <span className="text-indigo-600">Talent</span> Register
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Investing in the next generation of <span className="text-slate-900 font-bold underline decoration-[#A6892C]">Heating Engineers</span> across North West Leicestershire.
            </p>
          </div>

          {/* THE SEO HUB GRID */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-6 h-6 text-[#A6892C]" />
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Training Specialisms</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/heating-engineer/ashby-de-la-zouch" className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#A6892C] hover:shadow-xl transition-all duration-300">
                <Award className="w-8 h-8 text-[#A6892C] mb-4" />
                <h4 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-[#A6892C]">Central Heating</h4>
                <p className="text-sm text-gray-500 mb-4">Focusing on Ashby S-Plan & Y-Plan diagnostics.</p>
                <span className="text-xs font-black text-indigo-600 uppercase flex items-center gap-2">View Ashby Standards <ArrowRight className="w-4 h-4" /></span>
              </Link>

              <Link to="/leak-detection/coalville" className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#A6892C] hover:shadow-xl transition-all duration-300">
                <Target className="w-8 h-8 text-indigo-600 mb-4" />
                <h4 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-indigo-600">Leak Detection</h4>
                <p className="text-sm text-gray-500 mb-4">Advanced trace and access training for Coalville residents.</p>
                <span className="text-xs font-black text-indigo-600 uppercase flex items-center gap-2">View Coalville Tech <ArrowRight className="w-4 h-4" /></span>
              </Link>

              <Link to="/local-plumber/coalville" className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#A6892C] hover:shadow-xl transition-all duration-300">
                <Shield className="w-8 h-8 text-slate-900 mb-4" />
                <h4 className="font-bold text-lg text-slate-900 mb-2 underline decoration-[#A6892C]">Emergency Response</h4>
                <p className="text-sm text-gray-500 mb-4">Rapid 60-minute response training for the LE67 district.</p>
                <span className="text-xs font-black text-indigo-600 uppercase flex items-center gap-2">Service Levels <ArrowRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="bg-[#A6892C] rounded-3xl p-10 md:p-16 text-center text-slate-900 shadow-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter">Ready to join the register?</h2>
            <p className="text-slate-800 font-medium mb-10 max-w-xl mx-auto">
              We are currently building our shortlist for the 2026 intake. Submit your CV and a brief cover letter today.
            </p>
            <a href="mailto:plumbersnearme.rkm@outlook.com?subject=Apprentice Interest 2026" className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 shadow-lg">
              Email Your CV <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Careers;