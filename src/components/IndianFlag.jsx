
import React, { useEffect } from 'react';
import './IndianFlag.css';

const IndianFlag = () => {
  useEffect(() => {
    const createConfetti = () => {
      const container = document.querySelector('.confetti-container');
      if (!container) return;

      // Clear existing confetti
      container.innerHTML = '';

      // Create confetti pieces
      for (let i = 0; i < 120; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Randomly assign flag colors
        const colors = ['saffron', 'white', 'green'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.classList.add(color);
        
        // Random position and animation
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 4}s`;
        confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
        confetti.style.opacity = `${0.6 + Math.random() * 0.4}`;
        confetti.style.transform = `scale(${0.4 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
      }
    };

    createConfetti();
    
    // Recreate confetti on window resize
    const handleResize = () => {
      createConfetti();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flag-container">
      {/* Confetti Container */}
      <div className="confetti-container"></div>

      {/* Flag Pole */}
      <div className="flag-pole">
        <div className="pole-top"></div>
        <div className="pole-main"></div>
        <div className="pole-base"></div>
      </div>

      {/* Flag */}
      <div className="flag-wrapper">
        <div className="indian-flag">
          {/* Saffron Stripe */}
          <div className="stripe saffron"></div>

          {/* White Stripe with Fixed Chakra */}
          <div className="stripe white">
            <div className="ashoka-chakra">
              <div className="chakra-center"></div>
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="chakra-spoke"
                  style={{
                    transform: `rotate(${i * 15}deg)`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Green Stripe */}
          <div className="stripe green"></div>

          {/* Optional shadow */}
          <div className="flag-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default IndianFlag;