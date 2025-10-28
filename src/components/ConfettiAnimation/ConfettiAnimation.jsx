import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ConfettiAnimation.module.css';

const ConfettiAnimation = ({
  pieceCount = 200, // Reduced for faster performance
  colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b', '#38f9d7', '#ffd93d', '#ff6b6b', '#a8e6cf'],
  sizeRange = { min: 8, max: 20 }, // Smaller sizes for faster animation
  fallDuration = { min: 1.5, max: 3 } // Much faster fall speed
}) => {
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only generate confetti once when component mounts
    if (hasAnimated) return;

    const generateConfetti = () => {
      const actualPieceCount = isMobile ? Math.floor(pieceCount / 1.5) : pieceCount;
      
      const pieces = Array.from({ length: actualPieceCount }, (_, i) => {
        const size = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
        const duration = Math.random() * (fallDuration.max - fallDuration.min) + fallDuration.min;
        const rotation = Math.random() * 720; // Reduced rotation for faster animation
        const delay = Math.random() * 0.3; // Much shorter delay for instant start
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Different square styles for variety
        const squareStyle = Math.random();
        let borderRadius = '2px';
        let shadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
        
        if (squareStyle > 0.8) {
          borderRadius = '4px';
        } else if (squareStyle > 0.6) {
          borderRadius = '0px';
          shadow = '0 1px 4px rgba(0, 0, 0, 0.4)';
        }
        
        return {
          id: i,
          size,
          duration,
          rotation,
          delay,
          color,
          left: Math.random() * 105 - 2.5,
          opacity: 0.9 + Math.random() * 0.1,
          scale: 0.9 + Math.random() * 0.2,
          borderRadius,
          shadow,
          spinDirection: Math.random() > 0.5 ? 1 : -1,
        };
      });
      
      setConfettiPieces(pieces);
      setHasAnimated(true);

      // Auto cleanup after maximum animation time
      const maxAnimationTime = Math.max(...pieces.map(p => p.duration + p.delay)) * 1000;
      setTimeout(() => {
        setConfettiPieces([]);
      }, maxAnimationTime + 100); // Small buffer
    };

    generateConfetti();
  }, [pieceCount, colors, sizeRange, fallDuration, isMobile, hasAnimated]);

  if (hasAnimated && confettiPieces.length === 0) {
    return null;
  }

  return (
    <div className={styles.confettiContainer}>
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={styles.confettiPiece}
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.borderRadius,
            boxShadow: piece.shadow,
            filter: `brightness(1.1) saturate(1.1)`,
          }}
          initial={{
            y: -100,
            x: 0,
            rotate: 0,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: '110vh',
            x: 0,
            rotate: piece.rotation * piece.spinDirection,
            opacity: [0, piece.opacity, piece.opacity, 0],
            scale: [0, piece.scale, piece.scale, 0.3], // Scale down more aggressively
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeInOut",
            opacity: {
              times: [0, 0.1, 0.7, 1], // Faster opacity transitions
              duration: piece.duration,
            },
            scale: {
              times: [0, 0.15, 0.8, 1], // Faster scale transitions
              duration: piece.duration,
            },
            rotate: {
              duration: piece.duration,
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;