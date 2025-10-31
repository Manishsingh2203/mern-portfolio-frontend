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

    // Set canvas size with device pixel ratio for optimal rendering
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      
      drawResponsiveGrid();
    };

    const drawResponsiveGrid = () => {
      // Pure black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Responsive detection
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      
      // Reduced grid size to 20px for all devices
      const gridSize = 20;
      
      // Adaptive line properties for the denser grid
      const primaryLineColor = 'rgba(52, 52, 52, 0.35)'; // Slightly more subtle for density
      const glowLineColor = 'rgba(80, 80, 80, 0.12)'; // Softer glow
      const primaryLineWidth = isMobile ? 0.5 : 0.6; // Thinner lines for density
      const glowLineWidth = isMobile ? 1 : 1.2; // Thinner glow
      
      // Calculate optimal starting position for perfect alignment
      const startX = (width % gridSize) / 2;
      const startY = (height % gridSize) / 2;
      
      // Draw glow effect first
      ctx.strokeStyle = glowLineColor;
      ctx.lineWidth = glowLineWidth;
      ctx.beginPath();
      
      // Vertical glow lines
      for (let x = startX; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      
      // Horizontal glow lines
      for (let y = startY; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      
      // Draw primary grid lines
      ctx.strokeStyle = primaryLineColor;
      ctx.lineWidth = primaryLineWidth;
      ctx.beginPath();
      
      // Vertical primary lines
      for (let x = startX; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      
      // Horizontal primary lines
      for (let y = startY; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      
      // More subtle intersection points for the denser grid
      if (!isMobile) {
        const markerColor = 'rgba(100, 100, 100, 0.1)'; // More subtle
        const markerSize = 0.8; // Smaller markers
        
        ctx.fillStyle = markerColor;
        
        // Draw markers at key intersections (every 3rd grid point for better spacing)
        for (let x = startX; x <= width; x += gridSize * 3) {
          for (let y = startY; y <= height; y += gridSize * 3) {
            ctx.beginPath();
            ctx.arc(x, y, markerSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      // Enhanced corner accents for larger screens
      if (!isMobile && !isTablet) {
        const accentColor = 'rgba(120, 120, 120, 0.08)';
        const accentSize = 1.5;
        
        ctx.fillStyle = accentColor;
        
        // Add subtle corner accents
        const corners = [
          [startX, startY], 
          [width - startX, startY],
          [startX, height - startY],
          [width - startX, height - startY]
        ];
        
        corners.forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(x, y, accentSize, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    };

    // Initialize
    resizeCanvas();

    // Optimized resize handler
    let resizeTimeout;
    let animationFrameId;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(resizeCanvas);
      }, 100);
    };

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <motion.div 
      className={styles.background}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
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