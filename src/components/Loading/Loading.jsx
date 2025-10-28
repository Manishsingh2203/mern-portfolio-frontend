
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Loading.module.css';

const Loading = () => {
  const logoVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      rotate: -180 
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.1, 0.9]
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className={styles.loadingContainer}
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }}
    >
      {/* Background Glow Effects */}
      <div className={styles.backgroundGlow}>
        <div className={styles.glowOrb1}></div>
        <div className={styles.glowOrb2}></div>
        <div className={styles.glowOrb3}></div>
      </div>

      <div className={styles.loadingContent}>
        {/* Main Logo with Spinner Ring */}
        <div className={styles.logoContainer}>
          <motion.div
            className={styles.spinnerRing}
            variants={spinnerVariants}
            animate="animate"
          >
            <div className={styles.spinnerGradient}></div>
          </motion.div>
          
          <motion.div
            className={styles.logo}
            variants={logoVariants}
            initial="initial"
            animate={["animate", "pulse"]}
          >
            <span className={styles.logoText}>M</span>
            <div className={styles.logoGlow}></div>
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          className={styles.loadingText}
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Portfolio
          </motion.p>
          <div className={styles.dots}>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >.</motion.span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className={styles.progressContainer}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "200px" }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className={styles.progressBar}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loading;