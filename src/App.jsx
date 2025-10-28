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
//import Loading from './components/Loading/Loading';
import './styles/globals.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ADD THIS EFFECT TO PREVENT AUTO-SCROLL
  useEffect(() => {
    // Prevent scroll to bottom on page refresh
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    
    // Also ensure no hash in URL that might cause scrolling
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
            <Route path="/" element={
              <div className="page-container">
                <Home />
                <Footer />
              </div>
            } />
            {/* Add Philosophy Route */}
            <Route path="/philosophy" element={
              <div className="page-container">
                <Philosophy />
                <Footer />
              </div>
            } />
            {/* Add Privacy and Terms Routes */}
            <Route path="/privacy" element={
              <div className="page-container">
                <Privacy />
                <Footer />
              </div>
            } />
            <Route path="/terms" element={
              <div className="page-container">
                <Terms />
                <Footer />
              </div>
            } />
            <Route path="/quick-view/:id" element={
              <div className="page-container">
                <QuickView />
                <Footer />
              </div>
            } />
            <Route path="/project/:id" element={
              <div className="page-container">
                <ProjectPreview />
                <Footer />
              </div>
            } />
          </Routes>
        </AnimatePresence>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;