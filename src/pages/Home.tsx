import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// --- THIS WAS MISSING ---
import LiveActivity from '../components/LiveActivity';

// Standard Imports
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import Services from '../components/Services';
import Process from '../components/Process';
import About from '../components/About';
import Reviews from '../components/Reviews';
import AreasCovered from '../components/AreasCovered';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();

  // Scroll to homepage section when URL contains a hash (e.g. /#faq)
  useEffect(() => {
    if (!location.hash) return;

    const el = document.querySelector(location.hash);
    if (!el) return;

    // Delay ensures DOM is painted before scrolling
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [location.hash]);

  return (
    <>
      <Header />

      <main>
        <Hero />

        {/* Now this will work because we imported it above */}
        <LiveActivity />

        <TrustBadges />

        <div id="services" className="-mx-4 sm:mx-0">
          <Services />
        </div>

        <div id="process">
          <Process />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="reviews">
          <Reviews />
        </div>

        <div id="areas-covered">
          <AreasCovered />
        </div>

        <div id="faq">
          <FAQ />
        </div>

        <div id="contact">
          <ContactSection />
        </div>

        <div id="map">
          <MapSection />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
