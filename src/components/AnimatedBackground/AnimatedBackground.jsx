// src/components/AnimatedBackground/AnimatedBackground.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './AnimatedBackground.module.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size with device pixel ratio for crisp rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      
      // Draw the dots immediately after resize
      drawDots();
    };

    const drawDots = () => {
      // Clear canvas with dark background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dot properties - increased density with smaller spacing
      const dotSpacing = 8; // Reduced from 15 to 8 for more dots
      const dotColor = '#343434'; // Dot color
      const dotSize = 1; // Slightly smaller dot size
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.fillStyle = dotColor;
      
      // Draw dots in grid pattern - now much denser
      for (let x = dotSpacing; x < width; x += dotSpacing) {
        for (let y = dotSpacing; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Initialize and draw dots
    resizeCanvas();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <motion.div 
      className={styles.background}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;