import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Time display effect with hours, minutes, and seconds
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mobile detection and scroll handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      
      if (location.pathname === '/') {
        const sections = ['home', 'about', 'skills', 'projects', 'testimonials', 'contact'];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        if (currentSection) setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'About', path: '/', section: 'about' },
    { name: 'Gallery', path: '/', section: 'gallery' },
    { name: 'Skills', path: '/', section: 'skills' },
    { name: 'Projects', path: '/', section: 'projects' },
    { name: 'Testimonials', path: '/', section: 'testimonials' },
    { name: 'Contact', path: '/', section: 'contact' },
  ];

  const handleNavClick = (item) => {
    if (location.pathname === '/' && item.section) {
      const element = document.getElementById(item.section);
      if (element) {
        // Calculate offset based on navbar height
        const navbarHeight = isMobile ? 70 : 80;
        const elementPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        setActiveSection(item.section);
      }
    } else if (item.path === '/' && location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(item.section);
        if (element) {
          const navbarHeight = isMobile ? 70 : 80;
          const elementPosition = element.offsetTop - navbarHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
          setActiveSection(item.section);
        }
      }, 100);
    } else if (location.pathname === '/' && item.path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    }
    
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (item) => {
    if (item.section && location.pathname === '/') {
      return activeSection === item.section;
    }
    return location.pathname === item.path;
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 30 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${
        isMobileMenuOpen ? styles.menuOpen : ''
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.navBackground} />
      
      <div className={styles.navContainer}>
        {/* Time Display - Left side for both mobile and desktop */}
        <motion.div
          className={styles.timeDisplay}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onClick={handleHomeClick}
        >
          <div className={styles.timeContainer}>
            <span className={styles.timePrefix}>LOCAL/</span>
            <span className={styles.timeText}>
              {currentTime}
            </span>
            <div className={styles.timeGlow} />
          </div>
        </motion.div>

        {/* Desktop Navigation - Center */}
        <div className={styles.navLinks}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              className={styles.navItem}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.div
                className={`${styles.navLinkWrapper} ${
                  isActiveLink(item) ? styles.active : ''
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className={styles.navLink}
                >
                  {item.name}
                </Link>
                {isActiveLink(item) && (
                  <motion.span
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
          
          {/* Philosophy Button */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                key="philosophy-button"
                className={styles.navItem}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`${styles.navLinkWrapper} ${styles.philosophyButton} ${
                    location.pathname === '/philosophy' ? styles.active : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to="/philosophy"
                    className={styles.navLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Philosophy
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Button - Right side */}
        <motion.div
          className={styles.mobileMenuButton}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className={`${styles.menuButton} ${
              isMobileMenuOpen ? styles.menuButtonOpen : ''
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0, 
                y: isMobileMenuOpen ? 6 : 0
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0, 
                y: isMobileMenuOpen ? -6 : 0
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className={styles.mobileNav}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className={styles.mobileNavHeader}>
                {/* Mobile Time Display */}
                <motion.div
                  className={styles.mobileTimeDisplay}
                  onClick={handleHomeClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className={styles.mobileTimeContainer}>
                    <span className={styles.mobileTimePrefix}>LOCAL/</span>
                    <span className={styles.mobileTimeText}>
                      {currentTime}
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className={styles.mobileNavContent}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className={styles.mobileNavItem}
                    variants={itemVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className={`${styles.mobileNavLinkWrapper} ${
                        isActiveLink(item) ? styles.mobileActive : ''
                      }`}
                    >
                      <Link
                        to={item.path}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item);
                        }}
                        className={styles.mobileNavLink}
                      >
                        <span className={styles.mobileNavText}>
                          {item.name}
                        </span>
                        {isActiveLink(item) && (
                          <motion.span
                            className={styles.mobileActiveIndicator}
                            layoutId="mobileActiveIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </div>
                  </motion.div>
                ))}
                
                {/* Philosophy Link in Mobile Menu */}
                <motion.div
                  className={styles.mobileNavItem}
                  variants={itemVariants}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`${styles.mobileNavLinkWrapper} ${styles.mobilePhilosophyButton}`}>
                    <Link
                      to="/philosophy"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={styles.mobileNavLink}
                    >
                      <span className={styles.mobileNavText}>
                        Philosophy
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className={styles.mobileNavFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className={styles.mobileNavCaption}>
                  Let's build something amazing together
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;