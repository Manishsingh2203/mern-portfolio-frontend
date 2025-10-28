
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { projects } from '../../data/portfolioData';
import { FiGithub, FiX, FiArrowRight, FiCode, FiExternalLink, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Projects.module.css';

const Projects = () => {
  const { ref, isInView } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const navigate = useNavigate();

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = ['all', ...new Set(projects.flatMap(project => project.category || 'web'))];

  const filterProjects = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.category?.toLowerCase() === category.toLowerCase()
      ));
    }
    setShowFilterDropdown(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    }
  };

  const cardHoverVariants = {
    rest: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
    },
    hover: { 
      scale: isMobile ? 1 : 1.02, 
      y: isMobile ? 0 : -15,
      boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    }
  };

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: isMobile ? 1 : 1.05, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    }
  };

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  // Check if GitHub URL is valid (not '#' or empty)
  const isValidGitHubUrl = (url) => {
    return url && url !== '#' && url !== '';
  };

  return (
    <section id="projects" className={styles.projects}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <motion.div 
          className={styles.bgOrb1}
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className={styles.bgOrb2}
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className={styles.container}>
        {/* Header with Animated Title */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>
              <span className={`${styles.titlePart} ${styles.featuredText}`}>
                Featured
              </span>
              <span className={`${styles.titlePart} ${styles.projectsText}`}>
                Projects
              </span>
            </h2>
          </div>
          <p className={styles.subtitle}>
            Crafting digital experiences that merge innovation with functionality
          </p>
        </motion.div>

        {/* Filter Buttons - Responsive */}
        <motion.div
          className={styles.filterContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {!isMobile ? (
            // Desktop filter buttons
            <div className={styles.filterButtons}>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`${styles.filterButton} ${activeFilter === category ? styles.activeFilter : ''}`}
                  onClick={() => filterProjects(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          ) : (
            // Mobile filter dropdown
            <div className={styles.filterDropdown}>
              <motion.button
                className={styles.dropdownToggle}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                whileTap={{ scale: 0.95 }}
              >
                <FiFilter className={styles.filterIcon} />
                {activeFilter === 'all' ? 'All Projects' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
              </motion.button>
              
              <AnimatePresence>
                {showFilterDropdown && (
                  <motion.div
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`${styles.dropdownItem} ${activeFilter === category ? styles.activeFilter : ''}`}
                        onClick={() => filterProjects(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          className={styles.projectsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                layout
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {/* Card Glow Effect */}
                <div className={styles.cardGlow}></div>

                <motion.div
                  className={styles.projectImage}
                  variants={imageHoverVariants}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.image}
                    loading="lazy"
                  />
                  <motion.div 
                    className={styles.imageOverlay}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: isMobile ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.overlayContent}>
   {/* In Projects.jsx - Update the quick view button*/}
<motion.button
  className={styles.viewButton}
  onClick={() => navigate(`/quick-view/${project.id}`)}
  whileHover={{ scale: 1.1, y: -2 }}
  whileTap={{ scale: 0.95 }}
>
  <FiCode className={styles.buttonIcon} />
  Quick View
</motion.button>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className={styles.projectContent}
                  variants={cardHoverVariants}
                >
                  <div className={styles.projectHeader}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <div className={styles.projectCategory}>
                      {project.category || 'Web App'}
                    </div>
                  </div>
                  
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>

                  <div className={styles.techStack}>
                    {project.technologies.slice(0, isMobile ? 3 : 4).map((tech, index) => (
                      <span
                        key={index}
                        className={styles.techTag}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > (isMobile ? 3 : 4) && (
                      <span className={styles.moreTech}>
                        +{project.technologies.length - (isMobile ? 3 : 4)}
                      </span>
                    )}
                  </div>

                  {/* Project Actions */}
                  <div className={styles.projectActions}>
                    {/* View Project Button */}
                    <motion.button
                      className={styles.primaryButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <FiArrowRight className={styles.buttonIcon} />
                      {isMobile ? 'View' : 'View Project'}
                    </motion.button>

                    {/* GitHub Button - Only show if valid URL */}
                    {isValidGitHubUrl(project.githubUrl) && (
                      <motion.a
                        href={project.githubUrl}
                        className={styles.secondaryButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiGithub className={styles.buttonIcon} />
                        {isMobile ? 'Code' : 'Source Code'}
                      </motion.a>
                    )}

                    {/* Show message if no GitHub URL */}
                    {!isValidGitHubUrl(project.githubUrl) && (
                      <motion.button
                        className={styles.disabledButton}
                        whileHover={{ scale: 1.02 }}
                        title="GitHub repository not available"
                      >
                        <FiGithub className={styles.buttonIcon} />
                        {isMobile ? 'Private' : 'Code Private'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Projects Found Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className={styles.noProjects}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>No projects found</h3>
            <p>Try selecting a different category</p>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className={styles.modal}
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button 
                  className={styles.closeButton}
                  onClick={closeModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX />
                </motion.button>

                <div className={styles.modalContent}>
                  <div className={styles.modalImageSection}>
                    <motion.div
                      className={styles.modalImage}
                      initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className={styles.modalImageContent}
                        loading="lazy"
                      />
                    </motion.div>
                    
                    <motion.div
                      className={styles.modalInfo}
                      initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className={styles.modalHeader}>
                        <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                        <div className={styles.modalCategory}>
                          {selectedProject.category || 'Web Application'}
                        </div>
                      </div>
                      
                      <p className={styles.modalDescription}>
                        {selectedProject.description}
                      </p>

                      <div className={styles.modalTechStack}>
                        <h4>Technologies Used</h4>
                        <div className={styles.techTags}>
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className={styles.techTag}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.modalActions}>
                        <motion.button
                          className={styles.modalPrimaryButton}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            navigate(`/project/${selectedProject.id}`);
                            closeModal();
                          }}
                        >
                          <FiExternalLink className={styles.modalButtonIcon} />
                          {isMobile ? 'Screenshots' : 'View All Screenshots'}
                        </motion.button>
                        
                        {isValidGitHubUrl(selectedProject.githubUrl) && (
                          <motion.a
                            href={selectedProject.githubUrl}
                            className={styles.modalSecondaryButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiGithub className={styles.modalButtonIcon} />
                            {isMobile ? 'Code' : 'Source Code'}
                          </motion.a>
                        )}

                        {!isValidGitHubUrl(selectedProject.githubUrl) && (
                          <motion.button
                            className={styles.modalDisabledButton}
                            whileHover={{ scale: 1.02 }}
                            title="GitHub repository not available"
                          >
                            <FiGithub className={styles.modalButtonIcon} />
                            {isMobile ? 'Private' : 'Code Private'}
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {selectedProject.features && (
                    <motion.div
                      className={styles.projectFeatures}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4>Key Features</h4>
                      <div className={styles.featuresList}>
                        {selectedProject.features.map((feature, index) => (
                          <div
                            key={index}
                            className={styles.featureItem}
                          >
                            <div className={styles.featureDot}></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;