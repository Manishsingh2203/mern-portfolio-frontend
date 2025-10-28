
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { FiArrowLeft, FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiClock, FiUsers, FiCode } from 'react-icons/fi';
import styles from './QuickView.module.css';

const QuickView = () => {
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
          <FiArrowLeft /> Back to Projects
        </button>
      </div>
    );
  }

  // Helper functions to handle image objects
  const getImageSrc = (image) => {
    return typeof image === 'object' ? image.src : image;
  };

  const getImageTitle = (image, fallback = 'Project Image') => {
    return typeof image === 'object' ? image.title : fallback;
  };

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

  const isValidUrl = (url) => {
    return url && url !== '#' && url !== '';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div 
      className={styles.quickView}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Minimal Header */}
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button 
          className={styles.backButton}
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to Projects
        </motion.button>
        
        <div className={styles.projectLinks}>
          {isValidUrl(project.githubUrl) && (
            <motion.a
              href={project.githubUrl}
              className={styles.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub /> Code
            </motion.a>
          )}
          {isValidUrl(project.liveUrl) && (
            <motion.a
              href={project.liveUrl}
              className={styles.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink /> Live
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Project Image Gallery */}
        <motion.div 
          className={styles.imageSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
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

        {/* Basic Project Info */}
        <motion.div 
          className={styles.infoSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.projectInfo}>
            <motion.span 
              className={styles.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {project.category || 'Web Application'}
            </motion.span>
            
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {project.title}
            </motion.h1>
            
            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {project.description}
            </motion.p>

            {/* Project Stats */}
            <motion.div 
              className={styles.projectStats}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <div className={styles.statItem}>
                <FiClock className={styles.statIcon} />
                <span>{project.timeTaken || 'N/A'}</span>
              </div>
              <div className={styles.statItem}>
                <FiUsers className={styles.statIcon} />
                <span>{project.teamSize || 'Solo'}</span>
              </div>
              <div className={styles.statItem}>
                <FiCode className={styles.statIcon} />
                <span>{project.technologies?.length || 0} Tech</span>
              </div>
            </motion.div>

            {/* Quick Tech Stack (Limited) */}
            {project.technologies && (
              <motion.div 
                className={styles.techSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3>Main Technologies</h3>
                <div className={styles.techTags}>
                  {project.technologies.slice(0, 6).map((tech, index) => (
                    <motion.span
                      key={index}
                      className={styles.techTag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className={styles.moreTech}>
                      +{project.technologies.length - 6} more
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Key Features Preview */}
            {project.features && (
              <motion.div 
                className={styles.featuresPreview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                <h3>Key Features</h3>
                <ul className={styles.featuresList}>
                  {project.features.slice(0, 4).map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.95 + index * 0.1 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                {project.features.length > 4 && (
                  <p className={styles.moreFeatures}>
                    +{project.features.length - 4} more features
                  </p>
                )}
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div 
              className={styles.quickActions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <motion.button
                className={styles.viewDetailsButton}
                onClick={() => navigate(`/project/${project.id}`)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Details
              </motion.button>
              
              {isValidUrl(project.githubUrl) && (
                <motion.a
                  href={project.githubUrl}
                  className={styles.githubButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub /> Source Code
                </motion.a>
              )}
              
              {isValidUrl(project.liveUrl) && (
                <motion.a
                  href={project.liveUrl}
                  className={styles.liveDemoButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiExternalLink /> Live Demo
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuickView;