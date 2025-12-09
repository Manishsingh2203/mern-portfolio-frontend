
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';
import SolarSystem from '../components/SolarSystem/SolarSystem';
import GalleryPage from '../components/Gallery/GalleryPage';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle direct navigation to sections via URL hash
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut"
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Add proper section IDs that match your navbar */}
      <section id="home">
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>
      
      <section id="gallery">
        <GalleryPage />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="testimonials">
        <Testimonials />
      </section>
      
      {/* 
      <section id="solar">
        <SolarSystem />
      </section>
      */}
      <section id="contact">
        <Contact />
      </section>
    </motion.div>
  );
};

export default Home;