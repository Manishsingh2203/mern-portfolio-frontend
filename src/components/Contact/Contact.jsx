
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './Contact.module.css';

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
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Email: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
    </svg>
  )
};

const Contact = () => {
  const { ref, isInView } = useScrollAnimation();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Backend API URL - adjust based on your environment
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://manishbackend22.onrender.com/api';


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        console.error('Submission error:', data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset error status after 5 seconds
      if (submitStatus === 'error') {
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: SocialIcons.GitHub,
      url: 'https://github.com/Manishsingh2203',
      color: '#333',
      username: '@manish-singh'
    },
    {
      name: 'LinkedIn',
      icon: SocialIcons.LinkedIn,
      url: 'https://www.linkedin.com/in/manish-singh-967o4o42',
      color: '#0077b5',
      username: 'manish-singh'
    },
    {
      name: 'Twitter',
      icon: SocialIcons.Twitter,
      url: 'https://x.com/_ManishSingh01',
      color: '#1da1f2',
      username: '@manish_singh'
    },
    {
      name: 'Instagram',
      icon: SocialIcons.Instagram,
      url: 'https://www.instagram.com/_manishsinghh',
      color: '#e4405f',
      username: '@manish.singh'
    }
  ];

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'manishsinghbst0322@gmail.com',
      link: 'mailto:manishsinghbst0322@gmail.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+91 7317084444',
      link: 'tel:+917317084444'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Noida, India',
      link: 'https://maps.google.com/?q=New+Delhi,India'
    },
    {
      icon: '💼',
      title: 'Freelance',
      value: 'Available',
      status: 'available'
    }
  ];

  // Safe function to check if a link is external
  const isExternalLink = (link) => {
    return link && typeof link === 'string' && link.startsWith('http');
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>


        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>
              <span className={`${styles.titlePart} ${styles.getInText}`}>
                Get In
              </span>
              <span className={`${styles.titlePart} ${styles.touchText}`}>
                Touch
              </span>
            </h2>
          </div>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Let's work together to bring your ideas to life
          </motion.p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            ref={ref}
            className={styles.contactInfo}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className={styles.infoCard}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.infoTitle}>Let's Talk</h3>
                <div className={styles.availability}>
                  <span className={styles.statusIndicator}></span>
                  Available for new projects
                </div>
              </div>
              <p className={styles.infoText}>
                I'm always interested in new opportunities and exciting projects.
                Whether you have a question or just want to say hi, I'll get back to you within 24 hours!
              </p>

              <div className={styles.contactDetails}>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className={styles.contactItem}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => {
                      if (item.link) {
                        if (isExternalLink(item.link)) {
                          window.open(item.link, '_blank', 'noopener,noreferrer');
                        } else {
                          window.location.href = item.link;
                        }
                      }
                    }}
                    style={{
                      cursor: item.link ? 'pointer' : 'default',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <span
                      className={styles.contactIcon}
                      style={item.status === 'available' ? { color: '#10b981' } : {}}
                    >
                      {item.icon}
                    </span>
                    <div className={styles.contactText}>
                      <h4>{item.title}</h4>
                      <p>{item.value}</p>
                    </div>
                    {item.link && (
                      <span className={styles.externalIcon}>↗</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.contactForm}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className={styles.formHeader}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3>Send Me a Message</h3>
              <p>I'll get back to you as soon as possible</p>
            </motion.div>

            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    placeholder="Enter your full name"
                    minLength="2"
                    maxLength="50"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  placeholder="What's this about?"
                  minLength="5"
                  maxLength="100"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows="6"
                  required
                  placeholder="Tell me about your project or inquiry..."
                  minLength="10"
                  maxLength="1000"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className={styles.buttonContent}>
                    <div className={styles.spinner}></div>
                    Sending...
                  </div>
                ) : (
                  <div className={styles.buttonContent}>
                    <span>Send Message</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.button>

              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    className={`${styles.statusMessage} ${submitStatus === 'success' ? styles.success : styles.error
                      }`}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <span className={styles.statusIcon}>✅</span>
                        Message sent successfully! I'll get back to you within 24 hours.
                      </>
                    ) : (
                      <>
                        <span className={styles.statusIcon}>❌</span>
                        Failed to send message. Please try again or email me directly.
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;