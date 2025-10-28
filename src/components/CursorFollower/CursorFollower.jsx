// src/components/CursorFollower/MinimalTrailCursor.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './CursorFollower.module.css';

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Check if hovering over clickable element
      const target = e.target;
      const isClickable = target.closest('button') || 
                         target.closest('a') || 
                         target.closest('[role="button"]') ||
                         target.style.cursor === 'pointer';
      
      setIsPointer(isClickable);

      // Add to trail with enhanced data
      setTrail(prev => {
        const newTrail = [...prev, { 
          x: e.clientX, 
          y: e.clientY, 
          id: Date.now() + Math.random(),
          size: isClickable ? 4 : 2,
          colorIndex: Math.floor(Math.random() * 5)
        }];
        return newTrail.slice(-12); // Keep last 12 positions for smoother trail
      });
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);
    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseleave', mouseLeave);
    window.addEventListener('mouseenter', mouseEnter);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('mouseenter', mouseEnter);
    };
  }, [isVisible]);

  // Color palette for trail dots
  const trailColors = [
    'rgba(102, 126, 234, 0.8)',    // Primary blue
    'rgba(118, 75, 162, 0.8)',     // Purple
    'rgba(240, 147, 251, 0.8)',    // Pink
    'rgba(79, 172, 254, 0.8)',     // Light blue
    'rgba(16, 185, 129, 0.8)'      // Green
  ];

  return (
    <div className={styles.cursorContainer}>
      {/* Enhanced Trail dots with gradients */}
      {trail.map((pos, index) => (
        <motion.div
          key={pos.id}
          className={styles.trailDot}
          style={{
            left: pos.x,
            top: pos.y,
            background: trailColors[pos.colorIndex],
          }}
          initial={{ 
            scale: 0,
            opacity: 0,
            x: '-50%',
            y: '-50%'
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            x: '-50%',
            y: '-50%'
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
            delay: index * 0.02
          }}
        />
      ))}
      
      {/* Pulsing orb effect */}
      <motion.div
        className={styles.pulseOrb}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.05, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced Main cursor with multiple layers */}
      <motion.div
        className={`${styles.mainCursor} ${isPointer ? styles.pointer : ''} ${isClicking ? styles.clicking : ''}`}
        animate={{
          x: mousePosition.x - (isPointer ? 12 : 8),
          y: mousePosition.y - (isPointer ? 12 : 8),
          scale: isClicking ? 0.8 : (isPointer ? 1.2 : 1)
        }}
        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 35,
          mass: 0.5
        }}
      >
        {/* Inner dot */}
        <motion.div 
          className={styles.cursorInner}
          animate={{
            scale: isClicking ? 0.5 : (isPointer ? 0.8 : 1),
            backgroundColor: isPointer ? 'rgba(102, 126, 234, 1)' : 'rgba(255, 255, 255, 0.9)'
          }}
          transition={{ duration: 0.15 }}
        />
        
        {/* Outer ring */}
        <motion.div 
          className={styles.cursorRing}
          animate={{
            scale: isPointer ? 1.4 : 1,
            borderColor: isPointer ? 'rgba(102, 126, 234, 0.5)' : 'rgba(255, 255, 255, 0.6)'
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Magnetic attraction effect for interactive elements */}
      <motion.div
        className={styles.magneticField}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isPointer ? 2 : 0,
          opacity: isPointer ? 0.1 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Connection lines between trail dots (desktop only) */}
      {window.innerWidth > 768 && trail.length > 1 && (
        <svg className={styles.trailLines}>
          {trail.slice(0, -1).map((pos, index) => {
            const nextPos = trail[index + 1];
            return (
              <motion.line
                key={`line-${pos.id}`}
                x1={pos.x}
                y1={pos.y}
                x2={nextPos.x}
                y2={nextPos.y}
                stroke={trailColors[pos.colorIndex]}
                strokeWidth="1"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.3, pathLength: 1 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
              />
            );
          })}
        </svg>
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className={styles.clickRipple}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </div>
  );
};

export default CursorFollower;