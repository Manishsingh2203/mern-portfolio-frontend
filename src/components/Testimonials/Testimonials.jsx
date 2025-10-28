
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { testimonials } from '../../data/portfolioData';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const { ref, isInView } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`${styles.star} ${index < rating ? styles.filled : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className={styles.testimonials}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.bgOrb1}></div>
        <div className={styles.bgOrb2}></div>
      </div>

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
              <span className={`${styles.titlePart} ${styles.testimonialsText}`}>
                Testimonials
              </span>
            </h2>
          </div>
          <p className={styles.subtitle}>
            What clients and colleagues say about working with me
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          ref={ref}
          className={styles.carouselContainer}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className={styles.carousel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={styles.testimonialCard}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.quoteIcon}>"</div>

                <div className={styles.rating}>
                  {renderStars(testimonials[currentIndex].rating)}
                </div>

                <p className={styles.testimonialText}>
                  {testimonials[currentIndex].feedback}
                </p>

                <div className={styles.clientInfo}>
                  <div className={styles.avatar}>
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className={styles.avatarImg}
                    />
                  </div>
                  <div className={styles.clientDetails}>
                    <h4 className={styles.clientName}>
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className={styles.clientPosition}>
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className={styles.carouselControls}>
            <motion.button 
              className={styles.controlButton} 
              onClick={prevTestimonial} 
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </motion.button>

            <div className={styles.dots}>
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button 
              className={styles.controlButton} 
              onClick={nextTestimonial} 
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.button>
          </div>
        </motion.div>

        {/* Grid Section */}
        <motion.div
          className={styles.testimonialsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={styles.testimonialItem}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => goToTestimonial(index)}
            >
              <div className={styles.itemQuoteIcon}>"</div>

              <div className={styles.itemRating}>
                {renderStars(testimonial.rating)}
              </div>

              <p className={styles.itemText}>{testimonial.feedback}</p>

              <div className={styles.itemClient}>
                <div className={styles.itemAvatar}>
                  <img src={testimonial.image} alt={testimonial.name} className={styles.avatarImg} />
                </div>
                <div className={styles.itemClientInfo}>
                  <h4 className={styles.itemName}>{testimonial.name}</h4>
                  <p className={styles.itemPosition}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;