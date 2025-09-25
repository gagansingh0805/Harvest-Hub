import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import MarketAnalytics from "./pages/MarketAnalytics.jsx";
import CropRecommendation from "./pages/CropRecommendation.jsx";
import SignupPage from "./pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import LearnMore from "./pages/LearnMore.jsx";
import DoctorAI from "./pages/DoctorAI.jsx"; // New
import SchemesPage from "./pages/SchemesPage.jsx";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlantUploader from "./components/PlantUploader";
import WeatherPage from "./pages/WeatherPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="relative ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/farmer"
              element={
                <ProtectedRoute>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/advisor" element={
              <ProtectedRoute>
                <AdvisorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/market" element={<MarketAnalytics />} />
            <Route
              path="/crop-recommendation"
              element={<CropRecommendation />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/upload" element={
              <ProtectedRoute>
                <PlantUploader />
              </ProtectedRoute>
            } />
            <Route path="/doctor-ai" element={
              <ProtectedRoute>
                <DoctorAI />
              </ProtectedRoute>
            } />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/schemes" element={<SchemesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
