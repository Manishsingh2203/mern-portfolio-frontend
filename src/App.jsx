import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar/Navbar';
import Philosophy from './pages/Philosophy';
import Home from './pages/Home';
import CursorFollower from './components/CursorFollower/CursorFollower';
import ProjectPreview from './pages/ProjectPreview';
import Chatbot from './components/Chatbot/Chatbot';
import Footer from './components/Footer/Footer';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import QuickView from './pages/QuickView';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import GoTripPrivate from "./pages/GoTripPrivate"; // ✅ Added

import './styles/globals.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Prevent unwanted scroll restore
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    if (window.location.hash) {
      window.location.hash = '';
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <AnimatedBackground />
        <CursorFollower />
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes>

            {/* 🏠 Home */}
            <Route
              path="/"
              element={
                <div className="page-container">
                  <Home />
                  <Footer />
                </div>
              }
            />

            {/* 🧠 Philosophy */}
            <Route
              path="/philosophy"
              element={
                <div className="page-container">
                  <Philosophy />
                  <Footer />
                </div>
              }
            />

            {/* 🔒 Privacy */}
            <Route
              path="/privacy"
              element={
                <div className="page-container">
                  <Privacy />
                  <Footer />
                </div>
              }
            />

            {/* 📜 Terms */}
            <Route
              path="/terms"
              element={
                <div className="page-container">
                  <Terms />
                  <Footer />
                </div>
              }
            />

            {/* 👁 Quick View */}
            <Route
              path="/quick-view/:id"
              element={
                <div className="page-container">
                  <QuickView />
                  <Footer />
                </div>
              }
            />

            {/* 🔍 Project Preview */}
            <Route
              path="/project/:id"
              element={
                <div className="page-container">
                  <ProjectPreview />
                  <Footer />
                </div>
              }
            />

            {/* 🔒 GoTrip Private Route (NEW) */}
            <Route
              path="/gotrip-private"
              element={
                <div className="page-container">
                  <GoTripPrivate />
                  <Footer />
                </div>
              }
            />

          </Routes>
        </AnimatePresence>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
