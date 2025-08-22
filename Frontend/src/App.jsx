import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import SignupPage from "./pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import LearnMore from "./pages/LearnMore.jsx";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlantUploader from "./components/PlantUploader";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/advisor" element={<AdvisorDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/upload" element={<PlantUploader />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
