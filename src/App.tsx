import { Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage"; 
import Locations from "./pages/Locations";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from './pages/ServicesPage';
import FAQPage from "./pages/FAQPage";


import LegalPolicies from "./pages/LegalPolicies";
import Careers from './components/Careers'; 

// Component Imports
import StickyFooter from "./components/StickyFooter";

function App() {
  return (
    <div className="flex flex-col min-h-screen relative font-sans text-gray-900">
      <Routes>
        {/* --- CORE PAGES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* --- LEGAL & INTERNAL PAGES --- */}
        {/* Privacy Policy now uses LegalPolicies, Training Register uses Careers */}
        <Route path="/privacy-policy" element={<LegalPolicies />} />
        <Route path="/training-register" element={<Careers />} />

        {/* --- DYNAMIC LANDING PAGES (The SEO Engine) --- */}
        
        {/* 1. Primary Clean Route: /local-plumber/ashby-de-la-zouch */}
        <Route path="/:serviceSlug/:townSlug" element={<ServicePage />} />

        {/* 2. Legacy Route: /local-plumber/in-ashby-de-la-zouch */}
        <Route path="/:serviceSlug/in-:townSlug" element={<ServicePage />} />

        {/* 3. Service Hub Route: /local-plumber */}
        <Route path="/:serviceSlug" element={<ServicePage />} />

        {/* --- ERROR HANDLING --- */}
        <Route path="*" element={<Navigate to="/locations" replace />} />
      </Routes>

      <StickyFooter />
    </div>
  );
}

export default App;