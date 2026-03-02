import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Locations from "./pages/Locations";
import ServicesPage from "./pages/ServicesPage";
import ReviewsPage from "./pages/ReviewsPage";
import AreasPage from "./pages/AreasPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import LegalPolicies from './pages/LegalPolicies';

import Careers from "./components/Careers";
import ServicePage from "./pages/ServicePage";
import StickyFooter from "./components/StickyFooter";
const AreasSidebar: React.FC = () => {
  return (
    <aside className="fixed bottom-20 right-4 z-40 bg-white shadow-lg rounded-md p-4 w-72 max-w-full">
      <h3 className="font-semibold mb-2">Search Areas</h3>
      <input
        type="search"
        placeholder="Search town..."
        className="w-full px-3 py-2 border rounded"
        aria-label="Search areas"
      />
      {/* TODO: Replace with the real AreasSidebar component (list, search, links) */}
    </aside>
  );
};



function App() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "PlumbingService",
    "name": "RKM Plumbing & Heating Services",
    "url": "https://rkm247.co.uk",
    "logo": "https://rkm247.co.uk/logo-square.webp",
    "telephone": "+441530654062",
    "priceRange": "£",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hodgetts St",
      "addressLocality": "Coalville",
      "addressRegion": "Leicestershire",
      "postalCode": "LE67 2JH",
      "addressCountry": "GB",
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative font-sans text-gray-900">

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Static Content Pages */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/training-register" element={<Careers />} />
        <Route path="/privacy-policy" element={<LegalPolicies />} />
        
        {/* --- DYNAMIC SERVICE ROUTES --- */}
        {/* Note: Ensure these parameter names (:service and :town) match what you use in useParams() inside ServicePage.tsx */}
        
        <Route path="/local-plumber/:town" element={<ServicePage />} />
        <Route path="/emergency-plumber/:town" element={<ServicePage />} />
<AreasSidebar />
<StickyFooter />
        <Route path="/leak-detection/:town" element={<ServicePage />} />
        
        {/* Catch-all for any other service/town combinations */}
        <Route path="/:service/:town" element={<ServicePage />} />
        
        {/* Redirect unknown routes back home */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Floating areas sidebar (searchable, slide up/down) */}
      <AreasSidebar />
+
      <StickyFooter />
    </div>
  );
}

export default App;