import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import Locations from "./pages/Locations";
import LegalPolicies from './pages/LegalPolicies';
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from './pages/ServicesPage';
import LandingPage from './pages/LandingPage';
import FAQPage from "./pages/FAQPage";

import StickyFooter from "./components/StickyFooter";




function App() {
  return (
    <div className="flex flex-col min-h-screen relative font-sans text-gray-900">
  {/* App no longer injects a top-level Helmet; pages provide their own Helmet tags */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/services" element={<ServicesPage />} />
  <Route path="/locations" element={<Locations />} />
  {/* Support legacy flat plumber-in-<town> routes used by the static route generator */}
  <Route path="/plumber-in-:townSlug" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<LegalPolicies />} />
        <Route path="/training-register" element={<LegalPolicies />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/:serviceSlug/:townSlug" element={<ServicePage />} />
        <Route path="/:serviceSlug" element={<LandingPage />} />
      </Routes>

      <StickyFooter />
    </div>
  );
}

export default App;