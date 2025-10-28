
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Skills.module.css';
import { 
  FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaBootstrap, FaGitAlt 
} from "react-icons/fa";
import { 
  SiExpress, SiMongodb, SiTypescript, SiRedux, SiTailwindcss, SiPostman, 
  SiPython, SiDocker, SiPostgresql
} from "react-icons/si";

const Skills = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [connections, setConnections] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Skill data with icons
  const skillData = [
    { 
      id: 1, 
      name: 'React', 
      icon: <FaReact />,
      category: 'frontend', 
      level: 90, 
      description: 'Building dynamic user interfaces with reusable components and modern hooks',
      color: '#61DAFB'
    },
    { 
      id: 2, 
      name: 'TypeScript', 
      icon: <SiTypescript />,
      category: 'frontend', 
      level: 85, 
      description: 'Creating type-safe applications with enhanced developer experience',
      color: '#3178C6'
    },
    { 
      id: 3, 
      name: 'Node.js', 
      icon: <FaNodeJs />,
      category: 'backend', 
      level: 88, 
      description: 'Developing scalable server-side applications and RESTful APIs',
      color: '#68A063'
    },
    { 
      id: 4, 
      name: 'Express.js', 
      icon: <SiExpress />,
      category: 'backend', 
      level: 87, 
      description: 'Creating robust web servers and API endpoints',
      color: '#000000'
    },
    { 
      id: 5, 
      name: 'MongoDB', 
      icon: <SiMongodb />,
      category: 'database', 
      level: 80, 
      description: 'Working with NoSQL databases for flexible and efficient data storage',
      color: '#47A248'
    },
    { 
      id: 6, 
      name: 'JavaScript', 
      icon: <FaJs />,
      category: 'frontend', 
      level: 88, 
      description: 'Writing modern, efficient, and dynamic front-end functionality',
      color: '#F7DF1E'
    },
    { 
      id: 7, 
      name: 'Redux', 
      icon: <SiRedux />,
      category: 'frontend', 
      level: 83, 
      description: 'Managing predictable state for complex React applications',
      color: '#764ABC'
    },
    { 
      id: 8, 
      name: 'HTML5', 
      icon: <FaHtml5 />,
      category: 'frontend', 
      level: 95, 
      description: 'Creating semantic and accessible web page structures',
      color: '#E34F26'
    },
    { 
      id: 9, 
      name: 'CSS3', 
      icon: <FaCss3Alt />,
      category: 'frontend', 
      level: 90, 
      description: 'Designing modern, responsive layouts with animations and transitions',
      color: '#1572B6'
    },
    { 
      id: 10, 
      name: 'Tailwind CSS', 
      icon: <SiTailwindcss />,
      category: 'frontend', 
      level: 88, 
      description: 'Building sleek, responsive interfaces using utility-first CSS',
      color: '#38B2AC'
    },
    { 
      id: 11, 
      name: 'Bootstrap', 
      icon: <FaBootstrap />,
      category: 'frontend', 
      level: 82, 
      description: 'Rapidly prototyping responsive designs using prebuilt components',
      color: '#7952B3'
    },
    { 
      id: 12, 
      name: 'Git', 
      icon: <FaGitAlt />,
      category: 'tools', 
      level: 92, 
      description: 'Version control and collaborative development workflows',
      color: '#F05032'
    },
    { 
      id: 13, 
      name: 'Postman', 
      icon: <SiPostman />,
      category: 'tools', 
      level: 85, 
      description: 'Testing, debugging, and documenting REST APIs efficiently',
      color: '#FF6C37'
    },
    { 
      id: 14, 
      name: 'Python', 
      icon: <SiPython />,
      category: 'backend', 
      level: 82, 
      description: 'Developing scripts, automation tools, and backend services',
      color: '#3776AB'
    },
  
    { 
      id: 15, 
      name: 'Docker', 
      icon: <SiDocker />,
      category: 'devops', 
      level: 75, 
      description: 'Containerizing applications for consistent development and deployment',
      color: '#2496ED'
    },
    { 
      id: 16, 
      name: 'PostgreSQL', 
      icon: <SiPostgresql />,
      category: 'database', 
      level: 78, 
      description: 'Working with advanced SQL features and database optimization',
      color: '#336791'
    }
  ];

  // Calculate positions based on container size
  const getSkillsWithPositions = (width, height) => {
    if (width === 0 || height === 0) return [];
    
    return skillData.map((skill, index) => {
      // Define positions as percentages of container size
      const positions = [
        { x: 0.15, y: 0.2 },    // React
        { x: 0.4, y: 0.16 },    // TypeScript
        { x: 0.65, y: 0.24 },   // Node.js
        { x: 0.25, y: 0.5 },    // Express.js
        { x: 0.5, y: 0.56 },    // MongoDB
        { x: 0.75, y: 0.4 },    // JavaScript
        { x: 0.2, y: 0.8 },     // Redux
        { x: 0.45, y: 0.76 },   // HTML5
        { x: 0.7, y: 0.7 },     // CSS3
        { x: 0.3, y: 0.36 },    // Tailwind CSS
        { x: 0.6, y: 0.85 },    // Bootstrap
        { x: 0.85, y: 0.6 },    // Git
        { x: 0.1, y: 0.6 },     // Postman
        { x: 0.4, y: 0.9 },     // Python
        { x: 0.8, y: 0.2 },     // AWS
        { x: 0.15, y: 0.4 },    // Docker
        { x: 0.9, y: 0.8 }      // PostgreSQL
      ];
      
      const pos = positions[index] || { x: 0.5, y: 0.5 };
      
      return {
        ...skill,
        x: width * pos.x,
        y: height * pos.y
      };
    });
  };

  const [skills, setSkills] = useState([]);

  // Update container size and visibility
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
        setSkills(getSkillsWithPositions(width, height));
      }
    };

    // Initial size
    updateSize();

    // Add resize listener with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSize, 100);
    };

    window.addEventListener('resize', handleResize);
    
    // Intersection Observer for visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Initialize connections
  useEffect(() => {
    const newConnections = [
      { from: 1, to: 2, strength: 0.9 },
      { from: 1, to: 3, strength: 0.8 },
      { from: 2, to: 3, strength: 0.7 },
      { from: 3, to: 4, strength: 0.9 },
      { from: 3, to: 5, strength: 0.85 },
      { from: 4, to: 5, strength: 0.8 },
      { from: 1, to: 6, strength: 0.95 },
      { from: 1, to: 7, strength: 0.8 },
      { from: 6, to: 8, strength: 0.9 },
      { from: 6, to: 9, strength: 0.9 },
      { from: 8, to: 9, strength: 0.95 },
      { from: 8, to: 10, strength: 0.7 },
      { from: 9, to: 10, strength: 0.7 },
      { from: 8, to: 11, strength: 0.6 },
      { from: 3, to: 12, strength: 0.8 },
      { from: 4, to: 12, strength: 0.7 },
      { from: 3, to: 13, strength: 0.7 },
      { from: 14, to: 3, strength: 0.6 },
      { from: 14, to: 5, strength: 0.5 },
      { from: 3, to: 15, strength: 0.6 },
      { from: 15, to: 16, strength: 0.8 },
      { from: 3, to: 17, strength: 0.7 },
      { from: 4, to: 17, strength: 0.8 }
    ];
    setConnections(newConnections);
  }, []);

  const getSkillById = (id) => skills.find(skill => skill.id === id);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Don't render if container size is not set
  if (containerSize.width === 0) {
    return (
      <section className={styles.skillsNeural}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              Neural <span className={styles.titleAccent}>Network</span>
            </h2>
          </div>
          <div 
            ref={containerRef} 
            className={styles.networkContainer}
            style={{ height: '500px' }}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className={styles.skillsNeural}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.floatingParticles}>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              animate={isVisible ? {
                y: [0, -60, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.1, 0.4, 0.1],
              } : {}}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, #667eea40, transparent)`
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Neural <span className={styles.titleAccent}>Network</span>
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore how my skills interconnect in this interactive neural network
          </motion.p>
        </motion.div>

        {/* Neural Network Visualization */}
        <motion.div
          ref={containerRef}
          className={styles.networkContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          style={{ position: 'relative', width: '100%', height: '500px' }}
        >
          {/* SVG Connections */}
          {containerSize.width > 0 && containerSize.height > 0 && (
            <svg 
              className={styles.connections} 
              width="100%" 
              height="100%"
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0,
                pointerEvents: 'none'
              }}
            >
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#667eea" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#764ba2" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              
              {connections.map((conn, index) => {
                const fromSkill = getSkillById(conn.from);
                const toSkill = getSkillById(conn.to);
                
                if (!fromSkill || !toSkill) return null;
                
                return (
                  <motion.line
                    key={index}
                    x1={fromSkill.x}
                    y1={fromSkill.y}
                    x2={toSkill.x}
                    y2={toSkill.y}
                    stroke="url(#connectionGradient)"
                    strokeWidth={Math.max(conn.strength * 2, 1)}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 0.4
                    }}
                    transition={{ 
                      pathLength: { duration: 1.5, delay: index * 0.05 },
                      opacity: { duration: 0.5, delay: index * 0.05 }
                    }}
                  />
                );
              })}
            </svg>
          )}

          {/* Skill Nodes */}
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className={`${styles.node} ${styles[skill.category]}`}
              style={{ 
                position: 'absolute',
                left: skill.x - 25,
                top: skill.y - 25,
                transform: 'translate(-50%, -50%)',
                '--node-color': skill.color
              }}
              variants={nodeVariants}
              whileHover="hover"
              onMouseEnter={() => setActiveNode(skill)}
              onMouseLeave={() => setActiveNode(null)}
              onTouchStart={() => setActiveNode(skill)}
            >
              <div className={styles.nodeCore}>
                <div 
                  className={styles.nodeIcon}
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </div>
              </div>
              <div className={styles.nodeGlow} />
              <div className={styles.nodePulse} />
              <motion.span 
                className={styles.nodeName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {skill.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Node Details */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              className={styles.nodeDetails}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ 
                borderColor: activeNode.color,
                background: `linear-gradient(135deg, ${activeNode.color}15, transparent)`
              }}
            >
              <div className={styles.detailsHeader}>
                <div 
                  className={styles.detailsIcon}
                  style={{ 
                    backgroundColor: `${activeNode.color}20`,
                    borderColor: activeNode.color
                  }}
                >
                  {activeNode.icon}
                </div>
                <div className={styles.detailsTitle}>
                  <h3>{activeNode.name}</h3>
                  <span 
                    className={styles.detailsCategory}
                    style={{ color: activeNode.color }}
                  >
                    {activeNode.category}
                  </span>
                </div>
                <div 
                  className={styles.skillLevel}
                  style={{ color: activeNode.color }}
                >
                  {activeNode.level}%
                </div>
              </div>
              
              <div className={styles.skillProgress}>
                <motion.div
                  className={styles.progressBar}
                  initial={{ width: 0 }}
                  animate={{ width: `${activeNode.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  style={{ backgroundColor: activeNode.color }}
                />
              </div>
              
              <p className={styles.skillDescription}>
                {activeNode.description}
              </p>

              {/* Related Skills */}
              <div className={styles.relatedSkills}>
                <h4>Connected Skills</h4>
                <div className={styles.relatedList}>
                  {connections
                    .filter(conn => conn.from === activeNode.id || conn.to === activeNode.id)
                    .map(conn => {
                      const relatedId = conn.from === activeNode.id ? conn.to : conn.from;
                      const relatedSkill = getSkillById(relatedId);
                      return relatedSkill ? (
                        <span 
                          key={relatedId}
                          className={styles.relatedSkill}
                          style={{ color: relatedSkill.color }}
                        >
                          {relatedSkill.name}
                        </span>
                      ) : null;
                    })
                  }
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div 
          className={styles.legend}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          <h4>Skill Categories</h4>
          <div className={styles.legendItems}>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.frontend}`}></div>
              <span>Frontend</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.backend}`}></div>
              <span>Backend</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.database}`}></div>
              <span>Database</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.devops}`}></div>
              <span>DevOps</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.tools}`}></div>
              <span>Tools</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;