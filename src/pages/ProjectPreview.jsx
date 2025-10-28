
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { FiArrowLeft, FiGithub, FiChevronLeft, FiChevronRight, FiExternalLink, FiClock, FiUsers, FiCode, FiStar } from 'react-icons/fi';
import styles from './ProjectPreview.module.css';

const ProjectPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const project = projects.find(p => p.id === parseInt(id));

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    }, 50);

    return () => clearTimeout(timer);
  }, [id]);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h2>Project Not Found</h2>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (project.screenshots?.length - 1 || 0) ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (project.screenshots?.length - 1 || 0) : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Helper function to get image source (handles both string and object formats)
  const getImageSrc = (image) => {
    return typeof image === 'object' ? image.src : image;
  };

  // Helper function to get image title
  const getImageTitle = (image, fallback = 'Project Image') => {
    return typeof image === 'object' ? image.title : fallback;
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#4CAF50';
      case 'In Progress': return '#2196F3';
      case 'Planning': return '#FF9800';
      default: return '#666';
    }
  };

  return (
    <motion.div 
      className={styles.previewContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <motion.button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to Projects
        </motion.button>
        
        <div className={styles.projectLinks}>
          {project.githubUrl && project.githubUrl !== '#' && (
            <motion.a
              href={project.githubUrl}
              className={styles.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub /> Source Code
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Hero */}
      <motion.div 
        className={styles.heroSection}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.titleContainer}>
          <motion.h1 
            className={styles.title}
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          >
            {project.title}
          </motion.h1>
          <motion.div 
            className={styles.underline}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className={styles.description}>{project.description}</p>
        
        {/* Project Stats */}
        <motion.div 
          className={styles.projectStats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.statItem}>
            <FiClock className={styles.statIcon} />
            <span>{project.timeTaken}</span>
          </div>
          <div className={styles.statItem}>
            <FiUsers className={styles.statIcon} />
            <span>{project.teamSize}</span>
          </div>
          <div className={styles.statItem}>
            <FiCode className={styles.statIcon} />
            <span>{project.technologies.length} Technologies</span>
          </div>
          <div 
            className={styles.complexityBadge}
            style={{ backgroundColor: getComplexityColor(project.complexity) }}
          >
            {project.complexity}
          </div>
          <div 
            className={styles.statusBadge}
            style={{ backgroundColor: getStatusColor(project.status) }}
          >
            {project.status}
          </div>
        </motion.div>
      </motion.div>

      {/* Image Gallery */}
      <motion.div 
        className={styles.gallerySection}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <motion.img
              key={currentImageIndex}
              src={getImageSrc(project.screenshots?.[currentImageIndex] || project.image)}
              alt={getImageTitle(project.screenshots?.[currentImageIndex] || project.image, `${project.title} screenshot`)}
              className={styles.image}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Image Title Overlay */}
            <div className={styles.imageTitle}>
              {getImageTitle(project.screenshots?.[currentImageIndex] || project.image)}
            </div>
            
            {project.screenshots && project.screenshots.length > 1 && (
              <>
                <motion.button 
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={prevImage}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(102, 126, 234, 0.9)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiChevronLeft />
                </motion.button>
                
                <motion.button 
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={nextImage}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(102, 126, 234, 0.9)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiChevronRight />
                </motion.button>

                <div className={styles.imageCounter}>
                  {currentImageIndex + 1} / {project.screenshots.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {project.screenshots && project.screenshots.length > 1 && (
            <div className={styles.thumbnails}>
              {project.screenshots.map((screenshot, index) => (
                <motion.button
                  key={index}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
                  onClick={() => goToImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={getImageSrc(screenshot)} 
                    alt={getImageTitle(screenshot, `Thumbnail ${index + 1}`)}
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Project Highlights */}
      {project.highlights && (
        <motion.div 
          className={styles.highlightsSection}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <h3>✨ Project Highlights</h3>
          <div className={styles.highlightsGrid}>
            {project.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                className={styles.highlightCard}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <FiStar className={styles.highlightIcon} />
                <span>{highlight}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Project Details Grid */}
      <motion.div 
        className={styles.detailsGrid}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Technologies */}
        <div className={styles.detailCard}>
          <h3>🛠 Technologies Used</h3>
          <div className={styles.techList}>
            {project.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className={styles.techTag}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Features */}
        {project.features && (
          <div className={styles.detailCard}>
            <h3>⭐ Key Features</h3>
            <ul className={styles.featureList}>
              {project.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && (
          <div className={styles.detailCard}>
            <h3>🚧 Challenges & Solutions</h3>
            <ul className={styles.challengeList}>
              {project.challenges.map((challenge, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  {challenge}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {project.achievements && (
          <div className={styles.detailCard}>
            <h3>🏆 Achievements</h3>
            <ul className={styles.achievementList}>
              {project.achievements.map((achievement, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                >
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className={styles.ctaSection}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <div className={styles.ctaContent}>
          <h3>Like what you see?</h3>
          <p>Check out the code or get in touch to discuss your project!</p>
          <div className={styles.ctaButtons}>
            {project.githubUrl && project.githubUrl !== '#' && (
              <motion.a
                href={project.githubUrl}
                className={styles.ctaButton}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub /> View Source Code
              </motion.a>
            )}
            <motion.button
              className={styles.ctaButtonSecondary}
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectPreview;