import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  return (
    <>
<Helmet>
  <title>Plumber Coalville | Local & Emergency Plumbing 24/7 | RKM</title>
  <meta name="description" content="Need a reliable plumber in Coalville? RKM Plumbing offers 24/7 emergency repairs, boiler servicing, and local plumbing support across LE67. Fast response guaranteed." />
  <link rel="canonical" href="https://rkm247.co.uk/" />
</Helmet>

      <Header />

      <main>
        <Hero />
        
        {/* Now this will work because we imported it above */}
        <LiveActivity />
        
        <TrustBadges />

        <div className="-mx-4 sm:mx-0">
          <Services />
        </div>

        <Process />
        <div id="about"><About /></div>
        <div id="reviews"><Reviews /></div>
        <div id="areas-covered"><AreasCovered /></div>
        <div id="faq"><FAQ /></div>
        <ContactSection />
        <MapSection />
      </main>

      <Footer />
    </>
  );
};

export default Home;