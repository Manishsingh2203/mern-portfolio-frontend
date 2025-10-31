import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../../data/portfolioData';
import styles from './GalleryPage.module.css';

const GalleryPage = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Show images from index 0 to 2 (first 3 images)
  const displayedImages = galleryImages.slice(0, 3).map(image => ({
    ...image,
    category: image.category || 'uncategorized'
  }));

  // Get unique categories safely
  const categories = ['all', ...new Set(displayedImages.map(img => img.category).filter(Boolean))];

  const filteredImages = filter === 'all'
    ? displayedImages
    : displayedImages.filter(img => img.category === filter);

  // Create masonry layout columns
  const getMasonryColumns = () => {
    const columns = [[], [], []];
    filteredImages.forEach((image, index) => {
      columns[index % 3].push(image);
    });
    return columns;
  };

  const masonryColumns = getMasonryColumns();

  // Safe category name formatting
  const formatCategoryName = (category) => {
    if (!category) return 'Uncategorized';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Handle image click for modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Modal backdrop click handler
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <motion.div
      className={styles.galleryPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        {/* Enhanced Header */}
        <div className={styles.header}>
          <motion.div
            className={styles.titleContainer}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.title}>
              Creative <span className={styles.titleAccent}>Gallery</span>
            </h1>
            <motion.div
              className={styles.titleUnderline}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          <motion.p
            className={styles.subtitle}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Captured moments and creative works that define my journey
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            className={styles.statsBar}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{displayedImages.length}</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{categories.length - 1}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2024</span>
              <span className={styles.statLabel}>Collection</span>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Filter Buttons */}
        <motion.div
          className={styles.filterContainer}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.filterScroll}>
            {categories.map(category => (
              <motion.button
                key={category}
                className={`${styles.filterButton} ${filter === category ? styles.activeFilter : ''
                  }`}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: categories.indexOf(category) * 0.1
                }}
              >
                <span className={styles.filterText}>
                  {formatCategoryName(category)}
                </span>
                {filter === category && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeFilter"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className={styles.masonryGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {masonryColumns.map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                className={styles.masonryColumn}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + columnIndex * 0.1 }}
              >
                {column.map((image, imageIndex) => (
                  <motion.div
                    key={image.id}
                    className={styles.masonryItem}
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + (columnIndex * 0.2) + (imageIndex * 0.1),
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    onHoverStart={() => setHoveredImage(image.id)}
                    onHoverEnd={() => setHoveredImage(null)}
                    onClick={() => handleImageClick(image)}
                  >
                    <div className={styles.imageContainer}>
                      <motion.img
                        src={image.src}
                        alt={image.alt}
                        className={styles.galleryImage}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Enhanced Overlay */}
                      <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.overlayContent}>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h3 className={styles.imageTitle}>{image.alt}</h3>
                          </motion.div>

                          {image.category && image.category !== 'uncategorized' && (
                            <motion.span
                              className={styles.imageCategory}
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              {formatCategoryName(image.category)}
                            </motion.span>
                          )}

                          {image.description && (
                            <motion.p
                              className={styles.imageDescription}
                              initial={{ y: 10, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              {image.description}
                            </motion.p>
                          )}

                          {/* Action Buttons */}
                          <motion.div
                            className={styles.actionButtons}
                            initial={{ y: 10, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <button className={styles.viewButton}>
                              👁️ View
                            </button>
                            <button className={styles.infoButton}>
                              ℹ️ Info
                            </button>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Enhanced Shine Effect */}
                      <motion.div
                        className={styles.shine}
                        animate={{
                          x: hoveredImage === image.id ? '100%' : '-100%',
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Category Badge */}
                      {image.category && image.category !== 'uncategorized' && (
                        <div className={styles.categoryBadge}>
                          {formatCategoryName(image.category)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={styles.emptyIcon}
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              📷
            </motion.div>
            <h3>No Projects Found</h3>
            <p>Try selecting a different category or check back later for new additions.</p>
            <motion.button
              className={styles.resetFilterButton}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show All Projects
            </motion.button>
          </motion.div>
        )}

        {/* Footer CTA */}
        {filteredImages.length > 0 && (
          <motion.div
            className={styles.ctaSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <p>Like what you see? Let's create something amazing together!</p>
            <motion.button
              className={styles.resetFilterButton}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start project
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.modalBackdrop}
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                className={styles.closeButton}
                onClick={closeModal}
              >
                ✕
              </button>

              <div className={styles.modalImageContainer}>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className={styles.modalImage}
                />
              </div>

              <div className={styles.modalInfo}>
                <h3>{selectedImage.alt}</h3>
                {selectedImage.category && (
                  <span className={styles.modalCategory}>
                    {formatCategoryName(selectedImage.category)}
                  </span>
                )}
                {selectedImage.description && (
                  <p>{selectedImage.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;