import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Components
import Header from '../components/Header';
import Hero from '../components/Hero';
import LiveActivity from '../components/LiveActivity';
import About from '../components/About';
import Reviews from '../components/Reviews';
import TrustBadges from '../components/TrustBadges';
import Services from '../components/Services';
import Process from '../components/Process';
import AreasCovered from '../components/AreasCovered';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();

  // Scroll to homepage section when URL contains a hash (e.g. /#faq)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.hash]);

  // Homepage Specific Schema
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PlumbingService"],
    "@id": "https://rkm247.co.uk/#business",
    "name": "RKM Plumbing & Heating Services LTD",
    "url": "https://rkm247.co.uk/",
    "logo": "https://rkm247.co.uk/logo-square.webp",
    "image": "https://rkm247.co.uk/team-photo.webp",
    "telephone": "+441530654062",
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12 Primrose Walk",
      "addressLocality": "Coalville",
      "addressRegion": "Leicestershire",
      "postalCode": "LE67 2PA",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.723,
      "longitude": -1.369
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Coalville"
      },
      {
        "@type": "PostalCode",
        "name": "LE67"
      },
      {
        "@type": "PostalCode",
        "name": "LE65"
      }
    ],
    "sameAs": [
      "https://maps.app.goo.gl/hgp9JFbxQPbibPrd6",
      "https://share.google/3XtXaKCXHVDlgzSLh",
      "https://www.yell.com/biz/rkm-plumbing-and-heating-services-ltd-coalville-100007379/",
      "https://www.checkatrade.com/trades/rkmplumbingandheatingservices",
      "https://www.thomsonlocal.com/search/plumbers/burton-loughborough/rkm-plumbing-heating-services/3496846/01530654062",
      "https://118businessdirectory.co.uk/listing/rkm-plumbing-heating-services-ltd"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Plumber Coalville | 24/7 Emergency Plumbing | RKM Plumbing & Heating</title>
        <meta 
          name="description" 
          content="Need a plumber in Coalville? RKM provides fast 24/7 emergency response, boiler repairs & drainage across North West Leicestershire. £0 Call-Out Fee. Call 01530 654062." 
        />
        <link rel="canonical" href="https://rkm247.co.uk/" />
        <meta property="og:title" content="Plumber Coalville | 24/7 Emergency Plumbing | RKM Plumbing & Heating" />
        <meta property="og:description" content="Rapid 60-minute emergency response in Coalville. No call-out charge. Local plumbing and heating experts you can trust." />
        <meta property="og:url" content="https://rkm247.co.uk/" />
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
      </Helmet>

      {/* 1. HEADER (Top Navigation) */}
      <Header />

      <main>
        {/* 2. HERO (Primary Value Prop & Immediate Phone CTA) */}
        <Hero />

        {/* 3. LIVE ACTIVITY (Urgency & Real-time Local Proof) */}
        <LiveActivity />

        {/* 4. ABOUT (Local Authority, Landmarks & Team Guarantee) */}
        <section id="about" className="scroll-mt-20">
          <About />
        </section>

        {/* 5. REVIEWS (Social Proof & 5-Star Testimonials) */}
        <section id="reviews" className="scroll-mt-20">
          <Reviews />
        </section>

        {/* --- REST OF THE PAGE --- */}
        <TrustBadges />

        <section id="services" className="scroll-mt-20">
          <div className="-mx-4 sm:mx-0">
            <Services />
          </div>
        </section>

        <section id="process" className="scroll-mt-20">
          <Process />
        </section>

        <section id="areas-covered" className="scroll-mt-20">
          <AreasCovered />
        </section>

        <section id="faq" className="scroll-mt-20">
          <FAQ />
        </section>

        <section id="contact" className="scroll-mt-20">
          <ContactSection />
        </section>

        <section id="map" className="scroll-mt-20">
          <MapSection />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;