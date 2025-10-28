import React, { useState, useEffect } from "react";
import styles from "./SolarSystem.module.css";

const SolarSystem = () => {
  // Generate MUCH more stars with enhanced properties
  const [stars] = useState(() => 
    Array.from({ length: 800 }).map((_, i) => {
      const starTypes = ['blue', 'white', 'yellow', 'orange', 'purple', 'red'];
      const starType = starTypes[Math.floor(Math.random() * starTypes.length)];
      
      // Create some bright stars and supernova effects
      const isBright = Math.random() < 0.1; // 10% bright stars
      const isSupernova = Math.random() < 0.02; // 2% supernova stars
      
      return {
        id: i,
        type: starType,
        size: Math.random() * 0.8 + 0.2, // Larger stars
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.9 + 0.1, // Higher opacity
        twinkleDelay: Math.random() * 8,
        twinkleDuration: Math.random() * 5 + 3, // Longer duration
        isBright: isBright,
        isSupernova: isSupernova
      }
    })
  );

  // Meteorites state
  const [meteorites, setMeteorites] = useState([]);

  useEffect(() => {
    const createMeteorite = () => ({
      id: Date.now(),
      x: 100 + Math.random() * 20,
      y: Math.random() * 30,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 1,
      angle: Math.random() * 30 - 15
    });

    const addMeteorite = () => {
      const newMeteorite = createMeteorite();
      setMeteorites(prev => [...prev, newMeteorite]);

      setTimeout(() => {
        setMeteorites(prev => prev.filter(m => m.id !== newMeteorite.id));
      }, newMeteorite.duration * 1000);
    };

    addMeteorite();
    const timer1 = setTimeout(addMeteorite, 1500);
    const timer2 = setTimeout(addMeteorite, 3000);
    const interval = setInterval(addMeteorite, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.solarSystem}>
      {/* Header Section - Fixed at Top */}
      <div className={styles.headerSection}>
        <h1 className={styles.headerTitle}>
          <span className={styles.whiteText}>Celestial </span>
          <span className={styles.gradientText}>Harmony</span>
        </h1>
        <p className={styles.headerDescription}>
          Witness the cosmic dance of planets, moons, and meteor showers in a breathtaking display of our solar system's natural beauty.
        </p>
      </div>

      {/* Enhanced Stars Container with MANY more stars */}
      <div className={styles.starsContainer}>
        {stars.map(star => {
          let starClass = styles.star + ' ' + styles[star.type];
          if (star.isBright) starClass += ' ' + styles.bright;
          if (star.isSupernova) starClass += ' ' + styles.supernova;
          
          return (
            <div 
              key={`star-${star.id}`}
              className={starClass}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDelay: `${star.twinkleDelay}s`,
                animationDuration: `${star.twinkleDuration}s`
              }}
            />
          );
        })}
      </div>

      {/* Solar System Container - Centered below header */}
      <div className={styles.solarSystemContainer}>
        {/* Meteorites */}
        {meteorites.map(meteorite => (
          <div
            key={`meteorite-${meteorite.id}`}
            className={styles.meteorite}
            style={{
              left: `${meteorite.x}%`,
              top: `${meteorite.y}%`,
              width: `${meteorite.size}px`,
              height: `${meteorite.size / 3}px`,
              transform: `rotate(${meteorite.angle}deg)`,
              animation: `meteor ${meteorite.duration}s linear forwards`
            }}
          />
        ))}

        {/* Sun and planets */}
        <div className={styles.sun}></div>
        <div className={styles.orbitMercury}><div className={styles.planetMercury}></div></div>
        <div className={styles.orbitVenus}><div className={styles.planetVenus}></div></div>
        <div className={styles.orbitEarth}>
          <div className={styles.planetEarth}>
            <div className={styles.moonOrbit}><div className={styles.moon}></div></div>
          </div>
        </div>
        <div className={styles.orbitMars}><div className={styles.planetMars}></div></div>
        <div className={styles.orbitJupiter}><div className={styles.planetJupiter}></div></div>
        <div className={styles.orbitSaturn}>
          <div className={styles.planetSaturn}><div className={styles.ring}></div></div>
        </div>
        <div className={styles.orbitUranus}><div className={styles.planetUranus}></div></div>
        <div className={styles.orbitNeptune}><div className={styles.planetNeptune}></div></div>
      </div>
    </div>
  );
};

export default SolarSystem;