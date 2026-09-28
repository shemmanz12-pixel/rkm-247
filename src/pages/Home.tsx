import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Components
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import LiveActivity from '../components/LiveActivity';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Process from '../components/Process';
import About from '../components/About';
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

  // Enhanced Homepage Schema with Explicit Drainage Entity Mapping
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": ["PlumbingService", "HomeAndConstructionBusiness"],
    "@id": "https://rkm247.co.uk/#business",
    "name": "RKM Plumbing Heating & Drainage Services",
    "alternateName": "RKM Drainage Coalville",
    "url": "https://rkm247.co.uk/",
    "logo": "https://rkm247.co.uk/logo-square.webp",
    "image": "https://rkm247.co.uk/team-photo.webp",
    "telephone": "+441530654062",
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "22 Primrose Walk",
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
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 52.723,
          "longitude": -1.369
        },
        "geoRadius": "25000"
      },
      {
        "@type": "City",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Drainage & Plumbing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Drain Unblocking Coalville",
            "description": "24/7 high-pressure drain jetting, blocked toilet clearance, and external sewer unblocking.",
            "url": "https://rkm247.co.uk/drain-unblocking/coalville/",
            "sameAs": "https://en.wikipedia.org/wiki/Drain_(plumbing)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CCTV Drain Surveys",
            "description": "Full camera inspection for collapsed pipes, root ingress, and structural drain issues.",
            "url": "https://rkm247.co.uk/drain-unblocking/coalville/"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Plumbing & Boiler Installs",
            "description": "Burst pipe repair, boiler breakdown diagnostics, and general domestic plumbing.",
            "url": "https://rkm247.co.uk/"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/rkmplumbingandheatingservices",
      "https://www.google.com/maps?cid=3XtXaKCXHVDlgzSLh",
      "https://www.yell.com/biz/rkm-plumbing-and-heating-services-ltd-coalville-100007379/",
      "https://www.checkatrade.com/trades/rkmplumbingandheatingservices",
      "https://www.thomsonlocal.com/search/plumbers/burton-loughborough/rkm-plumbing-heating-services/3496846/01530654062",
      "https://118businessdirectory.co.uk/listing/rkm-plumbing-heating-services-ltd"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Plumbers Coalville | RKM Plumbing Heating &amp; Drainage 24/7</title>
        <meta 
          name="description" 
          content="Looking for Emergency plumbers in Coalville? Expert domestic plumbing, heating, boiler installs &amp; blocked drainage. Fast 24/7 emergency service. £0 call out." 
        />
        <link rel="canonical" href="https://rkm247.co.uk/" />
        <meta property="og:title" content="Plumbers Coalville | 24/7 Plumbing, Heating &amp; Drainage" />
        <meta property="og:description" content="Looking for local plumbers in Coalville? Expert domestic plumbing, heating, boiler installs &amp; blocked drainage. Fast 24/7 emergency service. £0 call out." />
        <meta property="og:url" content="https://rkm247.co.uk/" />
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
      </Helmet>

      {/* 1. HEADER (Top Navigation) */}
      <Header />

      <main>
        {/* 2. HERO (Primary Value Prop & Immediate Phone CTA) */}
        <Hero />

        {/* 3. TRUST BADGES (Instant Credibility & Core Guarantees) */}
        <TrustBadges />

        {/* 4. LIVE ACTIVITY (Urgency & Real-time Local Proof) */}
        <LiveActivity />

        {/* 5. SERVICES (Problem Identification & Deep Links) */}
        <section id="services" className="scroll-mt-20">
          <div className="-mx-4 sm:mx-0">
            <Services />
          </div>
        </section>

        {/* 6. REVIEWS (Social Proof & 5-Star Testimonials) */}
        <section id="reviews" className="scroll-mt-20">
          <Reviews />
        </section>

        {/* 7. PROCESS (Clear 4-Step Customer Journey) */}
        <section id="process" className="scroll-mt-20">
          <Process />
        </section>

        {/* 8. ABOUT (Local Authority, Landmarks & Team Guarantee) */}
        <section id="about" className="scroll-mt-20">
          <About />
        </section>

        {/* 9. AREAS COVERED (Internal SEO Matrix & Local Hubs) */}
        <section id="areas-covered" className="scroll-mt-20">
          <AreasCovered />
        </section>

        {/* 10. FAQ (Objection Handling & Schema Rich Snippets) */}
        <section id="faq" className="scroll-mt-20">
          <FAQ />
        </section>

        {/* 11. CONTACT (Primary Conversion Box & Booking System) */}
        <section id="contact" className="scroll-mt-20">
          <ContactSection />
        </section>

        {/* 12. MAP (Local Physical Radius) */}
        <section id="map" className="scroll-mt-20">
          <MapSection />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;