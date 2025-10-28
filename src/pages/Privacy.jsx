import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Privacy.module.css';

const Privacy = () => {
  const [isPageReady, setIsPageReady] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Enhanced page animations
  const pageVariants = {
    initial: { opacity: 0 },
    in: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    out: { 
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  // Staggered container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
        duration: 0.8
      }
    }
  };

  // Enhanced item animations
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Floating animation for background elements
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={styles.privacy}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {/* Enhanced Background Elements */}
      <div className={styles.background}>
        <motion.div 
          className={styles.floatingOrbs}
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.div 
            className={`${styles.orb} ${styles.orb1}`}
            variants={floatingVariants}
            animate="float"
          />
          <motion.div 
            className={`${styles.orb} ${styles.orb2}`}
            variants={floatingVariants}
            animate="float"
            transition={{ delay: 2 }}
          />
          <motion.div 
            className={`${styles.orb} ${styles.orb3}`}
            variants={floatingVariants}
            animate="float"
            transition={{ delay: 4 }}
          />
        </motion.div>
        <div className={styles.gridPattern}></div>
        <div className={styles.gradientOverlay}></div>
      </div>

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate={isPageReady ? "show" : "hidden"}
      >
        {/* Enhanced Header */}
        <motion.header className={styles.header} variants={itemVariants}>
          <motion.div 
            className={styles.backButtonContainer}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className={styles.backButton}>
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                whileHover={{ x: -3 }}
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </motion.svg>
              Back to Home
            </Link>
          </motion.div>
          
          <motion.div className={styles.titleSection}>
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Privacy <span className={styles.titleAccent}>Policy</span>
            </motion.h1>
            <motion.div 
              className={styles.titleUnderline}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </motion.p>
        </motion.header>

        {/* Enhanced Content Sections */}
        <motion.div className={styles.content} variants={itemVariants}>
          <div className={styles.sections}>
            {/* Introduction */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>01</div>
                <h2>Introduction</h2>
              </div>
              <p className={styles.sectionText}>
                Welcome to Manish Singh's portfolio website. I respect your privacy and am committed to protecting 
                your personal data. This privacy policy will inform you about how I look after your personal data 
                when you visit my website and tell you about your privacy rights.
              </p>
            </motion.section>

            {/* Data Collection */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>02</div>
                <h2>Data I Collect</h2>
              </div>
              
              <div className={styles.dataGrid}>
                <motion.div 
                  className={styles.dataCard}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={styles.dataIcon}>👤</div>
                  <h3>Personal Data</h3>
                  <p>Information that identifies you personally</p>
                  <ul className={styles.dataList}>
                    <li><strong>Identity Data:</strong> Name, username, identifier</li>
                    <li><strong>Contact Data:</strong> Email, phone number</li>
                    <li><strong>Technical Data:</strong> IP address, browser type</li>
                    <li><strong>Usage Data:</strong> How you use my website</li>
                  </ul>
                </motion.div>

                <motion.div 
                  className={styles.dataCard}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={styles.dataIcon}>🤖</div>
                  <h3>Automated Collection</h3>
                  <p>Data collected through technology</p>
                  <p className={styles.dataDescription}>
                    As you interact with my website, I may automatically collect Technical Data about your equipment, 
                    browsing actions and patterns using cookies, server logs and similar technologies.
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* How I Use Your Data */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>03</div>
                <h2>How I Use Your Data</h2>
              </div>
              
              <p className={styles.sectionText}>
                I will only use your personal data when the law allows me to. Most commonly, I will use your personal data in the following circumstances:
              </p>
              
              <div className={styles.usageGrid}>
                {[
                  { icon: '🚀', title: 'Website Functionality', desc: 'To deliver and improve my website functionality and user experience' },
                  { icon: '📧', title: 'Communication', desc: 'To respond to your inquiries and provide customer support' },
                  { icon: '🔒', title: 'Security', desc: 'To protect my website and prevent fraud' },
                  { icon: '📊', title: 'Analytics', desc: 'To analyze and improve my website performance' },
                  { icon: '⚖️', title: 'Legal Compliance', desc: 'To comply with legal obligations and regulations' },
                  { icon: '💡', title: 'Improvements', desc: 'To enhance user experience and service quality' }
                ].map((usage, index) => (
                  <motion.div
                    key={index}
                    className={styles.usageCard}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={styles.usageIcon}>{usage.icon}</div>
                    <h4>{usage.title}</h4>
                    <p>{usage.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Data Security */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>04</div>
                <h2>Data Security</h2>
              </div>
              <div className={styles.securityContent}>
                <div className={styles.securityIcon}>🛡️</div>
                <p className={styles.sectionText}>
                  I have implemented appropriate security measures to prevent your personal data from being accidentally 
                  lost, used, or accessed in an unauthorized way. I limit access to your personal data to those who 
                  have a genuine business need to know it.
                </p>
              </div>
            </motion.section>

            {/* Data Retention */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>05</div>
                <h2>Data Retention</h2>
              </div>
              <p className={styles.sectionText}>
                I will only retain your personal data for as long as reasonably necessary to fulfill the purposes 
                I collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting 
                or reporting requirements.
              </p>
            </motion.section>

            {/* Your Legal Rights */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>06</div>
                <h2>Your Legal Rights</h2>
              </div>
              
              <p className={styles.sectionText}>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data:
              </p>
              
              <div className={styles.rightsGrid}>
                {[
                  { title: 'Request Access', desc: 'To your personal data' },
                  { title: 'Request Correction', desc: 'Of your personal data' },
                  { title: 'Request Erasure', desc: 'Of your personal data' },
                  { title: 'Object to Processing', desc: 'Of your personal data' },
                  { title: 'Request Restriction', desc: 'Of processing your data' },
                  { title: 'Data Portability', desc: 'Right to data portability' }
                ].map((right, index) => (
                  <motion.div
                    key={index}
                    className={styles.rightItem}
                    whileHover={{ 
                      backgroundColor: 'var(--card-hover-bg)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className={styles.rightNumber}>{index + 1}</div>
                    <div>
                      <h4>{right.title}</h4>
                      <p>{right.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>07</div>
                <h2>Contact Information</h2>
              </div>
              
              <p className={styles.sectionText}>
                If you have any questions about this privacy policy or my privacy practices, please contact me:
              </p>
              
              <motion.div 
                className={styles.contactInfo}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📧</div>
                  <div>
                    <strong>Email</strong>
                    <p>manishsinghbst0322@gmail.com</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📱</div>
                  <div>
                    <strong>Phone</strong>
                    <p>+91 7317084444</p>
                  </div>
                </div>
              </motion.div>
            </motion.section>
          </div>
        </motion.div>

        {/* Enhanced Footer */}
        <motion.footer 
          className={styles.pageFooter}
          variants={itemVariants}
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div 
            className={styles.footerContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              This privacy policy may be updated from time to time. Please check this page periodically for any changes.
            </p>
            <motion.div 
              className={styles.footerNote}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span>Thank you for trusting me with your information.</span>
            </motion.div>
          </motion.div>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default Privacy;