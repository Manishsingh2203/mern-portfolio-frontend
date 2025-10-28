import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Terms.module.css';

const Terms = () => {
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
        staggerChildren: 0.15,
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
      y: [-15, 15, -15],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={styles.terms}
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
              Terms of <span className={styles.titleAccent}>Service</span>
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
            {/* Agreement */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>01</div>
                <h2>Agreement to Terms</h2>
              </div>
              <p className={styles.sectionText}>
                By accessing and using Manish Singh's portfolio website, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this site.
              </p>
              <motion.div 
                className={styles.agreementNote}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.noteIcon}>📝</div>
                <p>Your continued use of this website constitutes acceptance of these terms</p>
              </motion.div>
            </motion.section>

            {/* Use License */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>02</div>
                <h2>Use License</h2>
              </div>
              <p className={styles.sectionText}>
                Permission is granted to temporarily view the materials on Manish Singh's website for personal, 
                non-commercial transitory viewing only.
              </p>
              
              <div className={styles.licenseGrid}>
                <motion.div 
                  className={styles.licenseCard}
                  whileHover={{ 
                    y: -5,
                    borderColor: 'var(--success-color)',
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={styles.licenseHeader}>
                    <div className={styles.licenseIcon}>✅</div>
                    <h3>You May</h3>
                  </div>
                  <ul className={styles.licenseList}>
                    <li>View and browse the website content</li>
                    <li>Use contact forms to get in touch</li>
                    <li>Share links to the website</li>
                    <li>Use for personal, non-commercial purposes</li>
                    <li>Reference for educational purposes</li>
                  </ul>
                </motion.div>

                <motion.div 
                  className={styles.licenseCard}
                  whileHover={{ 
                    y: -5,
                    borderColor: 'var(--error-color)',
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={styles.licenseHeader}>
                    <div className={styles.licenseIcon}>❌</div>
                    <h3>You May Not</h3>
                  </div>
                  <ul className={styles.licenseList}>
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for commercial purpose</li>
                    <li>Attempt to decompile or reverse engineer any software</li>
                    <li>Remove any copyright or other proprietary notations</li>
                    <li>Transfer or "mirror" the materials without permission</li>
                  </ul>
                </motion.div>
              </div>
            </motion.section>

            {/* Disclaimer */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>03</div>
                <h2>Disclaimer</h2>
              </div>
              <div className={styles.disclaimerContent}>
                <div className={styles.disclaimerIcon}>⚠️</div>
                <div>
                  <p className={styles.sectionText}>
                    The materials on Manish Singh's website are provided on an 'as is' basis. Manish Singh makes no 
                    warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
                    without limitation, implied warranties or conditions of merchantability, fitness for a particular 
                    purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Limitations */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>04</div>
                <h2>Limitations</h2>
              </div>
              <div className={styles.limitationsContent}>
                <div className={styles.limitationItem}>
                  <div className={styles.limitationIcon}>💸</div>
                  <div>
                    <h4>Financial Loss</h4>
                    <p>Not liable for damages for loss of data or profit</p>
                  </div>
                </div>
                <div className={styles.limitationItem}>
                  <div className={styles.limitationIcon}>🏢</div>
                  <div>
                    <h4>Business Impact</h4>
                    <p>Not liable for business interruption damages</p>
                  </div>
                </div>
                <div className={styles.limitationItem}>
                  <div className={styles.limitationIcon}>🔧</div>
                  <div>
                    <h4>Technical Issues</h4>
                    <p>Not liable for inability to use website materials</p>
                  </div>
                </div>
              </div>
              <p className={styles.sectionText}>
                In no event shall Manish Singh or his suppliers be liable for any damages arising out of 
                the use or inability to use the materials on this website.
              </p>
            </motion.section>

            {/* Accuracy of Materials */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>05</div>
                <h2>Accuracy of Materials</h2>
              </div>
              <p className={styles.sectionText}>
                The materials appearing on Manish Singh's website could include technical, typographical, or 
                photographic errors. Manish Singh does not warrant that any of the materials on its website are 
                accurate, complete or current. Manish Singh may make changes to the materials contained on its 
                website at any time without notice.
              </p>
              <motion.div 
                className={styles.updateNote}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.updateIcon}>🔄</div>
                <p>Content may be updated periodically without prior notice</p>
              </motion.div>
            </motion.section>

            {/* Links */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>06</div>
                <h2>External Links</h2>
              </div>
              <p className={styles.sectionText}>
                Manish Singh has not reviewed all of the sites linked to its website and is not responsible for 
                the contents of any such linked site. The inclusion of any link does not imply endorsement by 
                Manish Singh of the site.
              </p>
              <div className={styles.linksWarning}>
                <div className={styles.warningIcon}>🔗</div>
                <p>Use of any external linked website is at your own risk</p>
              </div>
            </motion.section>

            {/* Modifications */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>07</div>
                <h2>Modifications</h2>
              </div>
              <p className={styles.sectionText}>
                Manish Singh may revise these terms of service for its website at any time without notice. By 
                using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
              <div className={styles.modificationInfo}>
                <div className={styles.infoItem}>
                  <strong>Review Frequency:</strong> Periodically
                </div>
                <div className={styles.infoItem}>
                  <strong>Effective Immediately:</strong> Upon posting
                </div>
                <div className={styles.infoItem}>
                  <strong>Your Responsibility:</strong> Stay informed of changes
                </div>
              </div>
            </motion.section>

            {/* Governing Law */}
            <motion.section 
              className={styles.section}
              variants={itemVariants}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>08</div>
                <h2>Governing Law</h2>
              </div>
              <div className={styles.lawContent}>
                <div className={styles.lawIcon}>⚖️</div>
                <div>
                  <p className={styles.sectionText}>
                    These terms and conditions are governed by and construed in accordance with the laws of India and 
                    you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                  <div className={styles.jurisdiction}>
                    <strong>Jurisdiction:</strong> Courts of India
                  </div>
                </div>
              </div>
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
              By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <motion.div 
              className={styles.footerNote}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span>Thank you for visiting my portfolio website.</span>
            </motion.div>
          </motion.div>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default Terms;