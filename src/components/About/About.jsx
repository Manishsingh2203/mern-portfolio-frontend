
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
const avatar = "/manishavtar.png";
// adjust path based on folder depth


const About = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadResume = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/Manish_Resume08.pdf');
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Manish_Resume08.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      window.open('/resume.pdf', '_blank');
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  // Enhanced stats with better animations
  const stats = [
    { number: '10+', label: 'Projects Built', icon: '🚀', delay: 0.1 },
  { number: '20+', label: 'APIs Integrated', icon: '🔗', delay: 0.2 },
    { number: '99%', label: 'Code Quality', icon: '⭐', delay: 0.3 },
    { number: '∞', label: 'Creativity', icon: '✨', delay: 0.4 }
  ];

  // Development philosophy items
 const philosophies = [
  {
    icon: '💡',
    title: 'Innovative Solutions',
    description: 'Transforming bold ideas into impactful digital experiences that inspire and solve real-world problems.'
  },
  {
    icon: '🎨',
    title: 'Aesthetic Precision',
    description: 'Crafting designs where usability meets artistry — every pixel serves a purpose, every detail tells a story.'
  },
  {
    icon: '⚡',
    title: 'Performance Obsession',
    description: 'Engineering lightning-fast, seamless experiences that feel effortless and deliver maximum impact.'
  },
  {
    icon: '🔧',
    title: 'Code with Clarity',
    description: 'Writing clean, scalable, and thoughtful code that’s built to last — because great products start with solid foundations.'
  }
];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className={styles.about}>
      {/* Enhanced Animated Background */}
      <div className={styles.backgroundElements}>
        <motion.div 
          className={styles.floatingOrb1}
          animate={{
            x: [0, 100, 0, -50, 0],
            y: [0, -80, 40, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className={styles.floatingOrb2}
          animate={{
            x: [0, -120, 80, -30, 0],
            y: [0, 60, -40, 30, 0],
            scale: [1, 1.3, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div 
          className={styles.floatingOrb3}
          animate={{
            x: [0, 80, -60, 40, 0],
            y: [0, -40, 60, -30, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
        
        {/* Animated Code Background */}
        <div className={styles.codeBackground}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.codeLine}
              animate={{
                opacity: [0, 1, 0],
                x: [0, 100, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            >
              {['<div>', 'function()', 'const', 'return', 'import', 'export'].map((text, j) => (
                <motion.span
                  key={j}
                  className={styles.codeText}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: j * 0.5,
                  }}
                >
                  {text}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Enhanced Header Section */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className={styles.titleWrapper}
            variants={itemVariants}
          >
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              Creative <span className={styles.titleAccent}>Developer</span>
              <motion.div
                className={styles.titleUnderline}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              />
            </motion.h2>
          </motion.div>
          
          <motion.p
            className={styles.subtitle}
            variants={itemVariants}
          >
            Crafting <span className={styles.gradientText}>Digital Experiences</span> with Code & Creativity
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className={styles.content}
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {/* Left Column - Enhanced Profile & Stats */}
          <div className={styles.leftColumn}>
            {/* Animated Profile Section */}
            <motion.div
              className={styles.profileSection}
              variants={itemVariants}
            >
              <motion.div 
                className={styles.imageContainer}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className={styles.profileImage}>
                  <div className={styles.imageWrapper}>

                   {/* Animated Profile Orb */}
<motion.div 
  className={styles.profileOrb}
  animate={{
    rotateY: [0, 180, 360],
    boxShadow: [
      "0 0 0px rgba(102, 126, 234, 0.3)",
      "0 0 40px rgba(102, 126, 234, 0.8)",
      "0 0 0px rgba(102, 126, 234, 0.3)"
    ]
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  <motion.img
  src={avatar} // imported from assets
  alt="My Avatar"
  className={styles.avatarImage}
  animate={{ 
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9]
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>

</motion.div>

                    
                    {/* Enhanced Glow Effects */}
                    <motion.div 
                      className={styles.orbGlow}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className={styles.orbGlow2}
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </div>
                </div>

                {/* Animated Floating Elements */}
                <div className={styles.floatingElements}>
                  <motion.div 
                    className={styles.floatingElement}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, 15, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ⚡
                  </motion.div>
                  <motion.div 
                    className={styles.floatingElement}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, -20, 0],
                      rotate: [0, -15, 15, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    🎨
                  </motion.div>
                  <motion.div 
                    className={styles.floatingElement}
                    animate={{
                      y: [0, -25, 0],
                      x: [0, 18, 0],
                      rotate: [0, 12, -12, 0],
                    }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    🔥
                  </motion.div>
                  <motion.div 
                    className={styles.floatingElement}
                    animate={{
                      y: [0, -35, 0],
                      x: [0, -12, 0],
                      rotate: [0, -8, 8, 0],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    🚀
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div
              className={styles.statsGrid}
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={styles.statCard}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={styles.statIconWrapper}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <span className={styles.statIcon}>{stat.icon}</span>
                  </motion.div>
                  <motion.span 
                    className={styles.statNumber}
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(102, 126, 234, 0.5)",
                        "0 0 20px rgba(102, 126, 234, 1)",
                        "0 0 0px rgba(102, 126, 234, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Development Philosophy */}
          <div className={styles.rightColumn}>
            {/* Development Philosophy Section */}
            <motion.div
              className={styles.philosophySection}
              variants={itemVariants}
            >
              <motion.h3
                className={styles.philosophyTitle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              >
                Development <span className={styles.philosophyAccent}>Philosophy</span>
              </motion.h3>
              
              <motion.div
                className={styles.philosophyGrid}
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true }}
              >
                {philosophies.map((philosophy, index) => (
                  <motion.div
                    key={philosophy.title}
                    className={styles.philosophyCard}
                    variants={itemVariants}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={styles.philosophyIcon}
                      animate={{
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {philosophy.icon}
                    </motion.div>
                    <h4 className={styles.philosophyCardTitle}>{philosophy.title}</h4>
                    <p className={styles.philosophyDescription}>{philosophy.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Passion Statement */}
            <motion.div
              className={styles.passionSection}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
              viewport={{ once: true }}
            >
              <motion.div
                className={styles.passionText}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                "Turning ideas into interactive realities through clean code and creative design."
              </motion.div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className={styles.ctaSection}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
              viewport={{ once: true }}
            >
              <motion.button
                className={styles.primaryButton}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 15px 40px rgba(102, 126, 234, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💫
                </motion.span>
                Start a Project
              </motion.button>
              
              <motion.button
                className={`${styles.secondaryButton} ${isDownloading ? styles.downloading : ''}`}
                whileHover={{ 
                  scale: isDownloading ? 1 : 1.05, 
                  y: isDownloading ? 0 : -2 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className={styles.downloadSpinner}
                  >
                    ⚡
                  </motion.div>
                ) : (
                  <motion.span
                    animate={{ 
                      y: [0, -3, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    📄
                  </motion.span>
                )}
                {isDownloading ? 'Preparing...' : 'View Resume'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          viewport={{ once: true }}
        >
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
          
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default About;