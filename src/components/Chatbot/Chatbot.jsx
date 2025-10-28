
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMessageCircle, 
  FiX, 
  FiTrash2, 
  FiSend,
  FiCode,
  FiBriefcase,
  FiFolder,
  FiMail,
  FiUser,
  FiCpu,
  FiZap
} from 'react-icons/fi';
import { 
  RiRobotLine, 
  RiUserLine, 
  RiSendPlaneLine,
  RiLightbulbFlashLine
} from 'react-icons/ri';
import styles from './Chatbot.module.css';

const EnhancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced bot responses with more detailed and structured data
  const botResponses = {
    greetings: [
      "👋 Hello! I'm Manish's AI assistant, designed to showcase his professional portfolio and expertise. I can provide detailed insights about his technical skills, project experience, and professional background. How can I assist you today?",
      "🌟 Hi there! Welcome to Manish's interactive portfolio assistant. I'm here to give you comprehensive information about his web development journey, technical capabilities, and career achievements. What would you like to explore first?",
      "💫 Welcome! I'm your guide to Manish Singh's professional world. With 3+ years in full-stack development, he's delivered exceptional digital solutions. I can walk you through his skills, projects, and collaboration opportunities.",
      "🚀 Hello! Ready to discover what makes Manish an outstanding developer? I can provide in-depth details about his technical stack, project portfolio, and professional experience. Where shall we begin?"
    ],
    skills: [
      `🎯 **Technical Mastery**

💻 Frontend Development:
• React.js, JavaScript (ES6+), TypeScript
• HTML5, CSS3, Sass, CSS Modules, Styled Components
• Redux, Context API, React Hooks, Custom Hooks
• Responsive Web Design, Progressive Web Apps (PWA)
• Web Performance Optimization, Lighthouse CI

⚡ Backend Development:
• Node.js, Express.js, RESTful APIs, GraphQL
• Python, FastAPI, Django, Flask
• Authentication & Authorization (JWT, OAuth 2.0)
• WebSockets, Real-time Communication
• Microservices Architecture, API Design

🗄️ Databases & DevOps:
• MongoDB, MySQL, PostgreSQL, Redis
• AWS (EC2, S3, Lambda), Docker, Kubernetes
• CI/CD Pipelines, GitHub Actions, Jenkins
• Git Version Control, Vercel, Netlify
• Testing (Jest, Cypress, React Testing Library)

🎨 Specializations:
• Full Stack Architecture & Development
• Performance Optimization & Scalability
• Clean Code & Best Practices
• Agile Methodology & Scrum
• UI/UX Implementation`,

      `🏆 **Core Competencies**

Manish excels in modern web technologies with a proven track record in:
• Building scalable, maintainable applications
• Creating intuitive and engaging user experiences
• Implementing industry best practices and standards
• Continuous learning and technology adaptation
• Problem-solving and innovative thinking

He actively contributes to open-source projects and stays updated with the latest industry trends and emerging technologies.`
    ],
    experience: [
      `📈 **Professional Journey**

💼 Full Stack Developer @ TechCorp Solutions (2021 - Present)
• Led end-to-end development of 3 major SaaS applications
• Improved application performance by 40% through code optimization
• Mentored and guided 2 junior developers in best practices
• Implemented CI/CD pipelines reducing deployment time by 60%
• Collaborated with cross-functional teams in Agile environment

🎨 Frontend Developer @ StartUp Innovations (2020 - 2021)
• Built responsive and accessible user interfaces for web applications
• Collaborated closely with UX/UI design teams for pixel-perfect implementation
• Reduced initial load time by 60% through performance optimization
• Implemented component libraries and design systems

🚀 Freelance Developer (2019 - 2020)
• Successfully delivered 15+ projects for diverse clients across industries
• Specialized in React and Node.js based solutions
• Provided end-to-end development services from concept to deployment
• Built long-term relationships with satisfied clients`,

      `✨ **Career Highlights**

• 3+ years of progressive experience in web development
• 20+ successful projects delivered with positive client feedback
• Expertise spanning both startup agility and enterprise scalability
• Strong analytical, problem-solving, and communication skills
• Proven ability to learn quickly and adapt to new technologies
• Track record of delivering projects on time and exceeding expectations`
    ],
    projects: [
      `🚀 **Featured Portfolio Projects**

🛒 E-Commerce Platform (Full Stack MERN)
• Technology Stack: React, Node.js, Express, MongoDB, Stripe, Redux
• Key Features: User authentication, payment processing, admin dashboard, inventory management, order tracking
• Impact: Successfully served 10,000+ active users with 99.9% uptime
• Innovation: Implemented real-time inventory updates and personalized recommendations

📋 TaskFlow Pro (Real-time Collaboration)
• Technology Stack: React, Firebase, Material-UI, WebSockets
• Key Features: Real-time collaboration, drag-drop interface, file attachments, team management
• Impact: Improved team productivity by 35% through streamlined task management
• Innovation: Offline-first PWA with seamless synchronization

🌤️ Weather Insights Dashboard (Data Visualization)
• Technology Stack: React, Chart.js, D3.js, Weather APIs, Leaflet
• Key Features: Interactive maps, historical data analytics, predictive modeling, customizable dashboards
• Impact: Provided beautiful and intuitive data representation for complex meteorological data
• Innovation: Machine learning integration for weather pattern predictions

🔍 Explore the Projects section for detailed case studies and live demos!`,

      `🎨 **Project Development Philosophy**

Manish believes in creating solutions that are:
• User-Centered: Prioritizing intuitive and engaging user experiences
• Scalable: Building architectures that grow with business needs
• Maintainable: Writing clean, documented, and testable code
• Innovative: Leveraging cutting-edge technologies for optimal solutions
• Impactful: Delivering measurable value and positive user outcomes

Each project in his portfolio demonstrates different aspects of his technical expertise and problem-solving approach.`
    ],
    contact: [
      `📞 **Get In Touch**

📧 Professional Communication:
• Email: manishsinghbst0322@gmail.com
• LinkedIn: linkedin.com/in/manishsingh
• GitHub: github.com/manishsingh
• Portfolio: manishsingh.dev

🎯 Professional Availability:
• Open to full-time opportunities and challenging roles
• Available for freelance projects and consulting
• Interested in mentorship and technical collaboration
• Excited about innovative startup opportunities

⏰ Response & Engagement:
• Typically responds within 24 hours
• Always open to technical discussions and brainstorming
• Available for video calls and in-person meetings
• Committed to building meaningful professional relationships`,

      `🤝 **Collaboration Opportunities**

Manish is particularly interested in:
• Innovative web and mobile application projects
• Startup collaborations with passionate teams
• Open-source contributions and community projects
• Technical consulting and architecture reviews
• Long-term partnerships with growth-oriented companies

He values projects that challenge his skills and allow him to create meaningful impact through technology.`
    ],
    services: [
      `💼 **Professional Services**

🛠️ Web Development Services:
• Custom web application development
• E-commerce solutions and platform development
• SaaS product development and scaling
• API development and third-party integrations
• Progressive Web Apps (PWA) development

🎯 Technical Consulting:
• Technical architecture review and optimization
• Performance auditing and optimization strategies
• Code review and best practices implementation
• Team mentoring and technical training sessions
• Technology stack selection and migration planning

🔧 Technologies & Expertise:
• Modern JavaScript frameworks and libraries
• Cloud infrastructure setup and management
• Database design, optimization, and migration
• DevOps practices and deployment automation
• Security implementation and best practices`,

      `⭐ **Why Choose Manish?**

• 3+ Years of Proven Excellence: Demonstrated success across diverse projects
• Comprehensive Skill Set: Full-stack capabilities with deep expertise
• Strong Communication: Clear, timely, and effective collaboration
• Quality Commitment: Attention to detail and best practices
• Continuous Learning: Always updated with latest technologies
• Problem-Solving Mindset: Creative solutions to complex challenges
• Reliability: Consistent delivery and professional integrity`
    ],
    default: [
      `🤔 I want to make sure I understand your question perfectly. Here's how I can assist you:

🔍 **Areas I Can Help With:**
• Manish's comprehensive technical skills and expertise
• Detailed professional experience and career journey
• In-depth project case studies and portfolio insights
• Contact information and collaboration opportunities
• Services offered and technology specializations

💡 **Try Asking Me:**
"What specific technologies are you most experienced with?"
"Can you walk me through your professional background?"
"Show me some of your most challenging projects"
"How do you approach problem-solving in development?"
"What's your experience with cloud technologies?"

I'm here to provide detailed, specific information about Manish's capabilities and achievements.`,

      `🎯 I specialize in delivering comprehensive insights about Manish's professional profile. Here's what I can elaborate on:

📊 **Detailed Information Available:**
• Technical skills with specific framework experience
• Work history with project impact and achievements
• Portfolio projects with technical implementation details
• Professional availability and collaboration models
• Technology preferences and specialization areas

🌟 **Let Me Help You Discover:**
His approach to complex technical challenges
Experience with specific technologies or frameworks
Project success stories and lessons learned
Professional growth and learning journey
Future goals and areas of interest

What specific aspect of his professional profile would you like me to elaborate on?`
    ]
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('greeting')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    } else if (message.includes('skill') || message.includes('tech') || message.includes('stack') || message.includes('technology') || message.includes('framework')) {
      return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
    } else if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('career') || message.includes('background')) {
      return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
    } else if (message.includes('project') || message.includes('portfolio') || message.includes('work sample') || message.includes('case study')) {
      return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
    } else if (message.includes('contact') || message.includes('email') || message.includes('hire') || message.includes('reach') || message.includes('connect')) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    } else if (message.includes('service') || message.includes('offer') || message.includes('provide') || message.includes('do') || message.includes('work on')) {
      return botResponses.services[Math.floor(Math.random() * botResponses.services.length)];
    } else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Add to chat history
    setChatHistory(prev => [...prev, userMessage]);

    // Simulate bot typing delay with realistic timing
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setChatHistory(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Check for emoji headers (lines starting with emoji)
      if (/^[^\w\s]/.test(line.trim()) && line.trim().length > 2) {
        return (
          <div key={index} className={styles.emojiHeader}>
            {line}
          </div>
        );
      }
      
      // Check for bold text (using **text** format)
      if (line.includes('**') && line.split('**').length === 3) {
        const parts = line.split('**');
        return (
          <div key={index} className={styles.boldText}>
            {parts[0]}
            <strong>{parts[1]}</strong>
            {parts[2]}
          </div>
        );
      }
      
      // Check for section headers (text ending with :)
      if (line.trim().endsWith(':') && !line.trim().startsWith('•')) {
        return (
          <div key={index} className={styles.sectionHeader}>
            {line}
          </div>
        );
      }
      
      // Check for list items
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={index} className={styles.listItem}>
            <span className={styles.bullet}>•</span>
            <span className={styles.listText}>{line.substring(1)}</span>
          </div>
        );
      }
      
      return (
        <div key={index} className={styles.messageLine}>
          {line}
        </div>
      );
    });
  };

  const clearChat = () => {
    setMessages([]);
    setChatHistory([]);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <>
      {/* Enhanced Chatbot Toggle Button */}
      <motion.button
        className={styles.chatbotToggle}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 2
        }}
      >
        <div className={styles.toggleContent}>
          <FiMessageCircle className={styles.toggleIcon} />
          <span className={styles.pulse}></span>
          <span className={styles.notificationDot}></span>
        </div>
        <span className={styles.tooltip}>Chat with AI Assistant</span>
      </motion.button>

      {/* Enhanced Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.chatbotWindow} ${isMinimized ? styles.minimized : ''}`}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {/* Enhanced Chat Header */}
            <motion.div 
              className={styles.chatHeader}
              whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.9)' }}
            >
              <div className={styles.botInfo}>
                <motion.div 
                  className={styles.botAvatar}
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    repeatDelay: 10 
                  }}
                >
                  <RiRobotLine className={styles.botIcon} />
                  <div className={styles.statusIndicator}></div>
                </motion.div>
                <div className={styles.botDetails}>
                  <h3>Manish's AI Assistant</h3>
                  <p>
                    {isTyping ? (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🤖 Typing...
                      </motion.span>
                    ) : (
                      '🟢 Online • Ready to help'
                    )}
                  </p>
                </div>
              </div>
              <div className={styles.headerActions}>
                <motion.button 
                  className={styles.minimizeButton}
                  onClick={toggleMinimize}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? '📂' : '📁'}
                </motion.button>
                <motion.button 
                  className={styles.clearButton}
                  onClick={clearChat}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  title="Clear conversation"
                >
                  <FiTrash2 />
                </motion.button>
                <motion.button 
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX />
                </motion.button>
              </div>
            </motion.div>

            {/* Chat Messages - Hidden when minimized */}
            {!isMinimized && (
              <>
                <div className={styles.chatMessages}>
                  {messages.length === 0 && (
                    <motion.div
                      className={styles.welcomeMessage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className={styles.welcomeContent}>
                        <div className={styles.welcomeHeader}>
                          <RiLightbulbFlashLine className={styles.welcomeIcon} />
                          <h3>Welcome to Manish's AI Assistant</h3>
                        </div>
                        <p>I'm your interactive guide to exploring Manish's professional portfolio and expertise in web development.</p>
                        <div className={styles.featureGrid}>
                          <div className={styles.featureItem}>
                            <FiCode />
                            <span>Technical Skills</span>
                          </div>
                          <div className={styles.featureItem}>
                            <FiBriefcase />
                            <span>Work Experience</span>
                          </div>
                          <div className={styles.featureItem}>
                            <FiFolder />
                            <span>Project Portfolio</span>
                          </div>
                          <div className={styles.featureItem}>
                            <FiMail />
                            <span>Contact Info</span>
                          </div>
                        </div>
                        <motion.p 
                          className={styles.readyText}
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          💬 Ask me anything about his professional background...
                        </motion.p>
                      </div>
                    </motion.div>
                  )}

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`${styles.message} ${
                        message.sender === 'user' ? styles.userMessage : styles.botMessage
                      }`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className={styles.messageAvatar}>
                        {message.sender === 'user' ? 
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <RiUserLine className={styles.userIcon} />
                          </motion.div> : 
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                          >
                            <RiRobotLine className={styles.botMessageIcon} />
                          </motion.div>
                        }
                      </div>
                      <div className={styles.messageContent}>
                        <div className={styles.messageBubble}>
                          <div className={styles.messageText}>
                            {formatMessage(message.text)}
                          </div>
                          <div className={styles.messageTime}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      className={`${styles.message} ${styles.botMessage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.messageAvatar}>
                        <RiRobotLine className={styles.botMessageIcon} />
                      </div>
                      <div className={styles.messageContent}>
                        <div className={styles.typingContainer}>
                          <div className={styles.typingIndicator}>
                            <motion.span
                              animate={{ scale: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            />
                            <motion.span
                              animate={{ scale: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.span
                              animate={{ scale: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                          <motion.span 
                            className={styles.typingText}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            AI Assistant is crafting response...
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Chat Input */}
                <motion.div 
                  className={styles.chatInput}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className={styles.inputContainer}>
                    <motion.textarea
                      value={inputMessage}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="💭 Ask about skills, projects, experience, or services..."
                      className={styles.textInput}
                      rows="1"
                      whileFocus={{ 
                        boxShadow: "0 0 0 2px rgba(102, 126, 234, 0.3)" 
                      }}
                    />
                    <motion.button
                      className={`${styles.sendButton} ${
                        inputMessage.trim() ? styles.active : ''
                      }`}
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      whileHover={inputMessage.trim() ? { 
                        scale: 1.05,
                        rotate: 5 
                      } : {}}
                      whileTap={inputMessage.trim() ? { scale: 0.95 } : {}}
                      animate={
                        inputMessage.trim() ? {
                          boxShadow: [
                            "0 4px 14px 0 rgba(102, 126, 234, 0.3)",
                            "0 6px 20px 0 rgba(102, 126, 234, 0.4)",
                            "0 4px 14px 0 rgba(102, 126, 234, 0.3)"
                          ]
                        } : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <RiSendPlaneLine />
                    </motion.button>
                  </div>
                  <motion.div 
                    className={styles.inputHint}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    ⏎ Press Enter to send • ⇧ Shift+Enter for new line
                  </motion.div>
                </motion.div>
              </>
            )}

            {/* Enhanced Minimized State */}
            {isMinimized && (
              <motion.div 
                className={styles.minimizedState}
                whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}
              >
                <div className={styles.minimizedContent}>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <RiRobotLine className={styles.minimizedIcon} />
                  </motion.div>
                  <span>AI Assistant</span>
                  <motion.div 
                    className={styles.minimizedStatus}
                    animate={isTyping ? {
                      backgroundColor: ['#4cd964', '#ffd93d', '#4cd964']
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {isTyping ? '✍️ Typing...' : '🟢 Online'}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedChatbot;