
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiCode, FiLayout, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Typewriter } from 'react-simple-typewriter';
import ConfettiAnimation from '../ConfettiAnimation/ConfettiAnimation';
import styles from './Hero.module.css';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState('');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get current time-based greeting
  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        return 'Good Morning';
      } else if (hour >= 12 && hour < 17) {
        return 'Good Afternoon';
      } else if (hour >= 17 && hour < 21) {
        return 'Good Evening';
      } else {
        return 'Good Night';
      }
    };

    // Set initial greeting
    setCurrentGreeting(getGreeting());

    // Update greeting every minute
    const interval = setInterval(() => {
      setCurrentGreeting(getGreeting());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Enhanced text variants with more dynamic animations
  const textVariants = {
    hidden: { opacity: 0, y: 80, rotateX: 45 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.15,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.8 },
        y: { duration: 1, ease: "circOut" },
        rotateX: { duration: 1 }
      }
    })
  };

  // Staggered title animation for dramatic effect
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 60 : 120,
      scale: 0.9,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.6, 0.05, 0.1, 0.9],
        scale: {
          duration: 1.2,
          ease: "backOut"
        }
      }
    }
  };

  // Greeting animation variants
  const greetingVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut",
        delay: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  // Enhanced floating animation with 3D rotation
  const floatingVariants = {
    animate: (custom) => ({
      y: [0, -25, 0],
      x: custom?.x || [0, 10, 0],
      rotateZ: [0, custom?.rotate || 5, 0],
      rotateY: [0, 10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: custom?.duration || 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom?.delay || 0
      }
    })
  };

  // 3D avatar animation with depth
  const avatarVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      rotateY: 180,
      filter: "blur(20px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.8, 
        delay: 0.3, 
        ease: [0.68, -0.55, 0.265, 1.55],
        rotateY: { duration: 1.5 },
        scale: { type: "spring", stiffness: 100 }
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 10,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Advanced background orb animations
  const backgroundOrbVariants = {
    orb1: {
      x: isMobile ? [0, 80, 0] : [0, 200, -100, 0],
      y: isMobile ? [0, -60, 0] : [0, -150, 100, 0],
      scale: [1, 1.3, 1.1, 1],
      opacity: [0.7, 0.9, 0.6, 0.7],
    },
    orb2: {
      x: isMobile ? [0, -60, 0] : [0, -180, 120, 0],
      y: isMobile ? [0, 40, 0] : [0, 120, -80, 0],
      scale: [1, 1.4, 1.2, 1],
      opacity: [0.6, 0.8, 0.5, 0.6],
    },
    orb3: {
      x: isMobile ? [0, 40, -20, 0] : [0, 150, -120, 0],
      y: isMobile ? [0, 30, -10, 0] : [0, 80, -60, 0],
      scale: [1, 1.2, 1.1, 1],
      opacity: [0.5, 0.7, 0.4, 0.5],
    }
  };

  const backgroundOrbTransition = {
    orb1: {
      duration: isMobile ? 20 : 25,
      repeat: Infinity,
      ease: "easeInOut"
    },
    orb2: {
      duration: isMobile ? 22 : 28,
      repeat: Infinity,
      ease: "easeInOut"
    },
    orb3: {
      duration: isMobile ? 18 : 23,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Particle burst animation for social icons
  const socialIconVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      x: -50 
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: 2 + (i * 0.2),
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.3,
      y: -5,
      color: "#667eea",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Enhanced gradient text animation
  const gradientTextVariants = {
    hidden: { 
      backgroundPosition: "0% 50%",
      opacity: 0 
    },
    visible: {
      opacity: 1,
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        opacity: { duration: 1, delay: 0.5 },
        backgroundPosition: {
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  };

  return (
    <section className={styles.hero} id="home">
      {/* Enhanced Confetti Animation */}
      <ConfettiAnimation 
        pieceCount={isMobile ? 60 : 120}
        colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b', '#38f9d7', '#ffd93d', '#ff6b6b', '#ffd93d']}
        sizeRange={{ min: 8, max: 20 }}
        fallDuration={{ min: 6, max: 12 }}
        windStrength={isMobile ? 40 : 80}
        rotationRange={{ min: -360, max: 360 }}
      />
      
      {/* Enhanced Animated Background Elements */}
      <div className={styles.backgroundElements}>
        <motion.div 
          className={styles.bgOrb1}
          animate={backgroundOrbVariants.orb1}
          transition={backgroundOrbTransition.orb1}
        />
        <motion.div 
          className={styles.bgOrb2}
          animate={backgroundOrbVariants.orb2}
          transition={backgroundOrbTransition.orb2}
        />
        <motion.div 
          className={styles.bgOrb3}
          animate={backgroundOrbVariants.orb3}
          transition={backgroundOrbTransition.orb3}
        />
        
        {/* Animated Grid Background */}
        <div className={styles.animatedGrid}>
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.gridCell}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: 1 
              }}
              transition={{
                duration: 4,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className={styles.heroContent}>
          {/* Text Content */}
          <motion.div
            className={styles.heroText}
            initial="hidden"
            animate="visible"
          >
            {/* Time-based Greeting */}
            <motion.div
              className={styles.greetingContainer}
              key={currentGreeting}
              variants={greetingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.span
                className={styles.greeting}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(102, 126, 234, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {currentGreeting}!
              </motion.span>
            </motion.div>

            {/* Enhanced Title with Staggered Letters */}
            <motion.div className={styles.heroTitleContainer}>
              <motion.h1
                className={styles.heroTitle}
                variants={titleVariants}
              >
                {"I'm".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05 + 0.3,
                      duration: 0.8,
                      ease: "backOut"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                <br />
                <span className={styles.gradientText}>
                  <motion.span
                    variants={gradientTextVariants}
                    initial="hidden"
                    animate="visible"
                    className={styles.nameText}
                  >
                    {"Manish Singh".split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.8 + (i * 0.1),
                          duration: 0.6,
                          ease: "backOut"
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.2,
                          color: "#667eea",
                          transition: { type: "spring", stiffness: 400 }
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </span>
              </motion.h1>
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.h2
              className={styles.heroSubtitle}
              variants={textVariants}
              custom={1}
            >
              <Typewriter
                words={[
                  'Full Stack Developer',
                  'Beautiful Designer',
                  'Problem Solver',
                  'Tech Enthusiast',
                  'Creative Thinker',
                  'Innovation Driver'
                ]}
                loop={true}
                cursor
                cursorStyle='▊'
                cursorClassName={styles.typewriterCursor}
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </motion.h2>
            
            {/* Enhanced Location */}
            <motion.div
              className={styles.location}
              variants={textVariants}
              custom={2}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FiMapPin className={styles.locationIcon} />
              </motion.div>
              <span>Based in Noida, India</span>
            </motion.div>
            
            {/* Enhanced Description */}
            <motion.p
              className={styles.heroDescription}
              variants={textVariants}
              custom={3}
            >
              I create exceptional digital experiences by combining innovative full-stack development with intuitive UI design. Passionate about clean code and modern technologies, I transform complex ideas into seamless, scalable solutions that enhance user engagement and drive business growth.
            </motion.p>
            
            {/* Enhanced Buttons with Magnetic Effect */}
            <motion.div
              className={styles.heroButtons}
              variants={textVariants}
              custom={4}
            >
              <motion.a
                href="#projects"
                className={`${styles.ctaButton} ${styles.primaryButton}`}
                whileHover="hover"
                whileTap="tap"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={{
                  hover: { 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  },
                  tap: { scale: 0.95 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span>View My Work</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.div>
              </motion.a>
              
              <motion.a
                href="#contact"
                className={`${styles.ctaButton} ${styles.secondaryButton}`}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 25px 50px rgba(34, 197, 94, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Hire Me
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className={styles.socialLinks}
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: <FiGithub />, href: "https://github.com/Manishsingh2203", delay: 0 },
                { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/manish-singh-967o4o42", delay: 1 },
                { icon: <FiInstagram />, href: "https://www.instagram.com/_manishsinghh", delay: 2 }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={styles.socialIcon}
                  variants={socialIconVariants}
                  custom={{ delay: social.delay * 0.2 }}
                  whileHover="hover"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced Visual Section */}
          <motion.div
            className={styles.heroVisual}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className={styles.avatarContainer}
              variants={avatarVariants}
              whileHover="hover"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <div className={styles.avatar}>
                <div className={styles.avatarImage} />
                <div className={styles.avatarGlow} />
                
                {/* Animated Rings */}
                <motion.div 
                  className={styles.avatarRing}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className={styles.avatarRing}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
              
              {/* Enhanced Floating Tech Icons */}
              {!isMobile && (
                <>
                  <motion.div 
                    className={styles.floatingIcon1}
                    custom={{ duration: 7, rotate: 8, delay: 0 }}
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <FiCode />
                  </motion.div>
                  <motion.div 
                    className={styles.floatingIcon2}
                    custom={{ duration: 6, rotate: -6, x: [0, -15, 0], delay: 1 }}
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <FiLayout />
                  </motion.div>
                  <motion.div 
                    className={styles.floatingIcon3}
                    custom={{ duration: 8, rotate: 10, delay: 2 }}
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <div className={styles.reactLogo}>⚛️</div>
                  </motion.div>
                  <motion.div 
                    className={styles.floatingIcon4}
                    custom={{ duration: 5, rotate: -8, x: [0, 20, 0], delay: 1.5 }}
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <div className={styles.nodeLogo}>⬢</div>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Enhanced Animated Code Snippets - Fixed Section */}
            {!isMobile && (
              <div className={styles.codeElements}>
                <motion.div
                  className={styles.codeSnippet}
                  initial={{ opacity: 0, x: -80, rotateZ: -8, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, rotateZ: 0, scale: 1 }}
                  transition={{ delay: 1.5, duration: 1, ease: "backOut" }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -8,
                    rotateZ: -2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                >
                  <div className={styles.codeHeader}>
                    <div className={styles.codeDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <pre>{`function createMagic() {\n  return innovation;\n}`}</pre>
                </motion.div>
                
                <motion.div
                  className={styles.codeSnippet}
                  initial={{ opacity: 0, x: 80, rotateZ: 8, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, rotateZ: 0, scale: 1 }}
                  transition={{ delay: 1.8, duration: 1, ease: "backOut" }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -8,
                    rotateZ: 2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                >
                  <div className={styles.codeHeader}>
                    <div className={styles.codeDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <pre>{`<Code \n  quality="excellent"\n  performance="optimal"\n/>`}</pre>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
        
        
      </div>
    </section>
  );
};

export default Hero;