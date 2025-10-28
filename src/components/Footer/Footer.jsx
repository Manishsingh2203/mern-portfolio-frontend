import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

// Social Icons as SVG Components
const SocialIcons = {
  GitHub: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Twitter: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  Email: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Facebook: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time to HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Format date to Day, Month Date, Year
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: SocialIcons.GitHub,
      url: 'https://github.com/Manishsingh2203',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      icon: SocialIcons.LinkedIn,
      url: 'https://www.linkedin.com/in/manish-singh-967o4o42',
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      icon: SocialIcons.Twitter,
      url: 'https://x.com/_ManishSingh01',
      color: '#1da1f2'
    },
    {
      name: 'Email',
      icon: SocialIcons.Email,
      url: 'mailto:manishsinghbst0322@gmail.com',
      color: '#ea4335'
    },
    {
      name: 'Instagram',
      icon: SocialIcons.Instagram,
      url: 'https://www.instagram.com/_manishsinghh',
      color: '#e4405f'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'About', path: '/', section: 'about' },
    { name: 'Skills', path: '/', section: 'skills' },
    { name: 'Projects', path: '/', section: 'projects' },
    { name: 'Testimonials', path: '/', section: 'testimonials' },
    { name: 'Contact', path: '/', section: 'contact' },
    { name: 'Philosophy', path: '/philosophy', section: null }
  ];

  // Legal links for Privacy and Terms
  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' }
  ];

  // Handle navigation properly
  const handleLinkClick = (link) => {
    if (link.path === '/philosophy') {
      // Navigate to Philosophy page
      navigate('/philosophy');
    } else if (link.section && location.pathname === '/') {
      // On home page, scroll to section
      const element = document.getElementById(link.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.path === '/' && location.pathname !== '/') {
      // On another page, navigate to home
      navigate('/');
      // Scroll to section after navigation
      setTimeout(() => {
        const element = document.getElementById(link.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (link.path === '/' && location.pathname === '/') {
      // On home page and clicking home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle home logo click
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      navigate('/');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.mainSection}>
            <motion.div
              className={styles.brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className={styles.logo}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={handleHomeClick}
                style={{ cursor: 'pointer' }}
              >
                Manish Singh
              </motion.h3>
              <p className={styles.tagline}>
                Full Stack Developer passionate about creating amazing web experiences
              </p>
              
             {/* Time Display */}
<motion.div 
  className={styles.timeDisplay}
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  viewport={{ once: true }}
>
  <div className={styles.timeHeader}>
    <span className={styles.timeIcon}>🕒</span>
    <span className={styles.timeLabel}>Current Time</span>
  </div>
  <div className={styles.timeText}>
    {formatTime(currentTime)}
  </div>
  <div className={styles.currentDate}>
    {formatDate(currentTime)}
  </div>
</motion.div>

              <div className={styles.contactInfo}>
                <p className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  manishsinghbst0322@gmail.com
                </p>
                <p className={styles.contactItem}>
                  <span className={styles.contactIcon}>📱</span>
                  +91 7317084444
                </p>
              </div>
            </motion.div>

            <motion.div
              className={styles.links}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className={styles.linksTitle}>Quick Links</h4>
              <div className={styles.linksList}>
                {quickLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    className={styles.link}
                    onClick={() => handleLinkClick(link)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={styles.social}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className={styles.socialTitle}>Connect With Me</h4>
              <p className={styles.socialSubtitle}>
                Let's build something amazing together
              </p>
              <div className={styles.socialIcons}>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={styles.socialIcon}
                    style={{ '--icon-color': social.color }}
                    whileHover={{
                      scale: 1.2,
                      y: -5
                    }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${social.name}`}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
              <div className={styles.socialStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>5+</span>
                  <span className={styles.statLabel}>Projects</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>10+</span>
                  <span className={styles.statLabel}>Tools Mastered</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>Quick</span>
                  <span className={styles.statLabel}>Learner</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.bottomSection}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={styles.copyright}>
              <p>&copy; {currentYear} Manish Singh. All rights reserved.</p>
              <div className={styles.legalLinks}>
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={styles.legalLink}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <motion.div
              className={styles.scrollTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated border */}
        <motion.div
          className={styles.animatedBorder}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </footer>
  );
};

export default Footer;