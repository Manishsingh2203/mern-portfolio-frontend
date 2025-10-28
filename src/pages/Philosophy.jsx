
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FiPlay, FiStar, FiAward, FiTrendingUp, FiFilm, FiBarChart2, FiMusic } from 'react-icons/fi';
import styles from './Philosophy.module.css';
import IndianFlag from '../components/IndianFlag';

// Import all personality images
import apjAbdulKalam from '../assets/images/personalities/apj-abdul-kalam.jpg';
import swamiVivekananda from '../assets/images/personalities/swami-vivekananda.jpg';
import steveJobs from '../assets/images/personalities/steve-jobs.jpg';
import nelsonMandela from '../assets/images/personalities/nelson-mandela.jpg';
import marieCurie from '../assets/images/personalities/marie-curie.jpg';
import albertEinstein from '../assets/images/personalities/albert-einstein.jpg';
import mahatmaGandhi from '../assets/images/personalities/mahatma-gandhi.jpg';
import martinLutherKing from '../assets/images/personalities/martin-luther-king.jpg';
import leonardoDaVinci from '../assets/images/personalities/leonardo-da-vinci.jpg';
import waltDisney from '../assets/images/personalities/walt-disney.jpg';
import motherTeresa from '../assets/images/personalities/mother-teresa.jpg';
import elonMusk from '../assets/images/personalities/elon-musk.jpg';

// Import offline audio files - you'll need to add these to your project
import oceanWaves from '../assets/audio/ocean-waves.mp3';
import forestAmbience from '../assets/audio/forest-ambience.mp3';
import breathingExercise from '../assets/audio/breathing-exercise.mp3';
import singingBowls from '../assets/audio/singing-bowl.mp3';
import pianoMelody from '../assets/audio/piano-melody.mp3';
import rainSounds from '../assets/audio/rain-sounds.mp3';

const Philosophy = () => {
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation(0.3);
  const { ref: cardsRef, isInView: cardsInView } = useScrollAnimation(0.2);
  const { ref: moviesRef, isInView: moviesInView } = useScrollAnimation(0.2);
  const { ref: graphRef, isInView: graphInView } = useScrollAnimation(0.3);
  const { ref: musicRef, isInView: musicInView } = useScrollAnimation(0.2);

  const [activeTab, setActiveTab] = useState('success');
  const canvasRef = useRef(null);

  // Set page as ready and scroll to top when component mounts
  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
    
    // Set a small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  const inspirationalFigures = [
    {
      name: "Dr. APJ Abdul Kalam",
      title: "Missile Man of India",
      bio: "Aerospace scientist and 11th President of India who inspired millions with his vision and humility.",
      thought: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
      image: apjAbdulKalam,
      color: "#3B82F6",
      quote: "If you want to shine like a sun, first burn like a sun.",
      achievements: ["Lead India's missile development", "People's President", "Inspirational educator"]
    },
    {
      name: "Swami Vivekananda",
      title: "Spiritual Leader & Philosopher",
      bio: "Indian monk and key figure in introducing Indian philosophies of Vedanta and Yoga to the Western world.",
      thought: "Arise, awake, and stop not until the goal is reached.",
      image: swamiVivekananda,
      color: "#8B5CF6",
      quote: "Take risks in your life. If you win, you can lead; if you lose, you can guide.",
      achievements: ["Chicago Speech at Parliament", "Founded Ramakrishna Mission", "Modernized Hinduism"]
    },
    {
      name: "Steve Jobs",
      title: "Visionary Entrepreneur",
      bio: "Co-founder of Apple Inc. who revolutionized personal computing, music, and mobile phone industries.",
      thought: "Stay hungry, stay foolish.",
      image: steveJobs,
      color: "#FF6B6B",
      quote: "The only way to do great work is to love what you do.",
      achievements: ["iPhone Revolution", "Apple's resurgence", "Pixar Animation"]
    },
    {
      name: "Nelson Mandela",
      title: "Freedom Fighter & Statesman",
      bio: "South African anti-apartheid revolutionary who became the country's first black president.",
      thought: "It always seems impossible until it's done.",
      image: nelsonMandela,
      color: "#10B981",
      quote: "Education is the most powerful weapon which you can use to change the world.",
      achievements: ["27 years imprisonment", "Nobel Peace Prize", "Ended apartheid"]
    },
    {
      name: "Marie Curie",
      title: "Pioneering Scientist",
      bio: "First woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences.",
      thought: "Nothing in life is to be feared, it is only to be understood.",
      image: marieCurie,
      color: "#EC4899",
      quote: "Be less curious about people and more curious about ideas.",
      achievements: ["Nobel in Physics & Chemistry", "Discovered Radium", "Pioneered radioactivity research"]
    },
    {
      name: "Albert Einstein",
      title: "Theoretical Physicist",
      bio: "Developed the theory of relativity and made fundamental contributions to quantum mechanics.",
      thought: "Imagination is more important than knowledge.",
      image: albertEinstein,
      color: "#F59E0B",
      quote: "Strive not to be a success, but rather to be of value.",
      achievements: ["Theory of Relativity", "Nobel Prize in Physics", "Mass-energy equivalence"]
    },
    {
      name: "Mahatma Gandhi",
      title: "Father of Indian Nation",
      bio: "Leader of Indian independence movement and pioneer of non-violent civil disobedience.",
      thought: "Be the change you wish to see in the world.",
      image: mahatmaGandhi,
      color: "#059669",
      quote: "The future depends on what you do today.",
      achievements: ["Non-violent resistance", "Indian independence", "Civil rights movements"]
    },
    {
      name: "Martin Luther King Jr.",
      title: "Civil Rights Leader",
      bio: "Baptist minister and activist who became the most visible spokesperson for civil rights.",
      thought: "Darkness cannot drive out darkness; only light can do that.",
      image: martinLutherKing,
      color: "#DC2626",
      quote: "The time is always right to do what is right.",
      achievements: ["I Have a Dream speech", "Civil Rights Act", "Nobel Peace Prize"]
    },
    {
      name: "Leonardo da Vinci",
      title: "Renaissance Polymath",
      bio: "Italian polymath whose areas of interest included invention, painting, and science.",
      thought: "Simplicity is the ultimate sophistication.",
      image: leonardoDaVinci,
      color: "#7C3AED",
      quote: "Learning never exhausts the mind.",
      achievements: ["Mona Lisa", "The Last Supper", "Scientific discoveries"]
    },
    {
      name: "Walt Disney",
      title: "Entertainment Pioneer",
      bio: "American entrepreneur, animator, and film producer who revolutionized entertainment.",
      thought: "All our dreams can come true, if we have the courage to pursue them.",
      image: waltDisney,
      color: "#0369A1",
      quote: "The way to get started is to quit talking and begin doing.",
      achievements: ["Disney animation", "Theme parks", "Entertainment empire"]
    },
    {
      name: "Mother Teresa",
      title: "Humanitarian Saint",
      bio: "Catholic nun who dedicated her life to serving the poor and destitute in Kolkata.",
      thought: "Not all of us can do great things. But we can do small things with great love.",
      image: motherTeresa,
      color: "#7DD3FC",
      quote: "If you can't feed a hundred people, then feed just one.",
      achievements: ["Missionaries of Charity", "Nobel Peace Prize", "Global humanitarian work"]
    },
    {
      name: "Elon Musk",
      title: "Innovation Entrepreneur",
      bio: "Business magnate working to revolutionize transportation and energy sustainability.",
      thought: "When something is important enough, you do it even if the odds are not in your favor.",
      image: elonMusk,
      color: "#00DC82",
      quote: "Failure is an option here. If things are not failing, you are not innovating enough.",
      achievements: ["SpaceX rockets", "Tesla electric cars", "Neuralink & SolarCity"]
    }
  ];

  // Top 6 Inspirational Movies
  const inspirationalMovies = [
    {
      title: "3 Idiots",
      year: 2009,
      rating: 8.4,
      director: "Rajkumar Hirani",
      starring: "Aamir Khan, Kareena Kapoor, R. Madhavan",
      description: "Two friends search for their long-lost companion who inspired them to think differently, even as the rest of the world called them 'idiots'.",
      inspiration: "Challenges the education system and teaches to follow passion over societal pressure.",
      poster: "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      color: "#FFD700",
      keyTakeaway: "Pursue excellence, success will follow",
      watchLink: "https://www.netflix.com/title/70125518",
      duration: "170 min",
      genre: "Comedy, Drama"
    },
    {
      title: "The Pursuit of Happyness",
      year: 2006,
      rating: 8.0,
      director: "Gabriele Muccino",
      starring: "Will Smith, Jaden Smith",
      description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
      inspiration: "Teaches perseverance through homelessness and the power of never giving up on your dreams.",
      poster: "https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_.jpg",
      color: "#FF6B6B",
      keyTakeaway: "Persistence turns obstacles into opportunities",
      watchLink: "https://www.netflix.com/title/70044689",
      duration: "117 min",
      genre: "Biography, Drama"
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      rating: 9.3,
      director: "Frank Darabont",
      starring: "Tim Robbins, Morgan Freeman",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      inspiration: "Shows how hope and patience can overcome even the most dire circumstances.",
      poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      color: "#3B82F6",
      keyTakeaway: "Hope is a good thing, maybe the best of things",
      watchLink: "https://www.netflix.com/title/70005379",
      duration: "142 min",
      genre: "Drama"
    },
    {
      title: "Rocky",
      year: 1976,
      rating: 8.1,
      director: "John G. Avildsen",
      starring: "Sylvester Stallone",
      description: "A small-time boxer gets a supremely rare chance to fight the heavy-weight champion in a bout in which he strives to go the distance for his self-respect.",
      inspiration: "Demonstrates that winning isn't everything - going the distance and proving your worth matters most.",
      poster: "https://m.media-amazon.com/images/M/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_.jpg",
      color: "#DC2626",
      keyTakeaway: "It's not about how hard you hit, but how hard you can get hit and keep moving forward",
      watchLink: "https://www.amazon.com/Rocky-Sylvester-Stallone/dp/B000I9W69W",
      duration: "120 min",
      genre: "Drama, Sports"
    },
    {
      title: "Good Will Hunting",
      year: 1997,
      rating: 8.3,
      director: "Gus Van Sant",
      starring: "Matt Damon, Robin Williams",
      description: "Will Hunting, a janitor at M.I.T., has a gift for mathematics but needs help from a psychologist to find direction in his life.",
      inspiration: "Shows that intelligence alone isn't enough - emotional growth and relationships are equally important.",
      poster: "https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      color: "#059669",
      keyTakeaway: "Your past doesn't define your future",
      watchLink: "https://www.netflix.com/title/17405997",
      duration: "126 min",
      genre: "Drama, Romance"
    },
    {
      title: "Forrest Gump",
      year: 1994,
      rating: 8.8,
      director: "Robert Zemeckis",
      starring: "Tom Hanks, Robin Wright",
      description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
      inspiration: "Proves that simplicity, honesty, and love can lead to an extraordinary life.",
      poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      color: "#F59E0B",
      keyTakeaway: "Life is like a box of chocolates - you never know what you're gonna get",
      watchLink: "https://www.netflix.com/title/60000724",
      duration: "142 min",
      genre: "Drama, Romance"
    }
  ];

  // Success/Failure Journey Data
  const journeyData = {
    success: [
      { year: "2005", attempts: 3, successes: 1, description: "First major project - 66% failure rate" },
      { year: "2008", attempts: 8, successes: 3, description: "Learning phase - 62% failure rate" },
      { year: "2012", attempts: 12, successes: 8, description: "Breakthrough period - 33% failure rate" },
      { year: "2016", attempts: 15, successes: 12, description: "Mastery achieved - 20% failure rate" },
      { year: "2020", attempts: 20, successes: 18, description: "Expert level - 10% failure rate" },
      { year: "2024", attempts: 25, successes: 23, description: "Current performance - 8% failure rate" }
    ],
    famousFailures: [
      { name: "Thomas Edison", failures: 1000, success: "Light Bulb", quote: "I have not failed. I've just found 10,000 ways that won't work." },
      { name: "Steve Jobs", failures: "Multiple product failures", success: "iPhone, iPad", quote: "Getting fired from Apple was the best thing that could have ever happened to me." },
      { name: "J.K. Rowling", failures: "12 rejections", success: "Harry Potter", quote: "It is impossible to live without failing at something." },
      { name: "Walt Disney", failures: "Bankrupt, fired for 'lack of imagination'", success: "Disney Empire", quote: "All the adversity I've had in my life has strengthened me." },
      { name: "Albert Einstein", failures: "Failed university entrance exam", success: "Theory of Relativity", quote: "A person who never made a mistake never tried anything new." }
    ]
  };

  // Music Player Component
// Enhanced Music Component with Offline Songs and Mobile Responsiveness
const MusicForMind = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);

  // Check if mobile on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const meditationTracks = [
    {
      id: 1,
      title: "Calm Ocean Waves",
      description: "Gentle waves to reduce stress and anxiety",
      icon: "🌊",
      color: "#3B82F6",
      audioFile: oceanWaves, // Using imported file
      duration: "15:00",
      benefits: ["Reduces anxiety", "Improves focus", "Promotes relaxation"]
    },
    {
      id: 2,
      title: "Forest Ambience",
      description: "Peaceful forest sounds with birds and gentle wind",
      icon: "🌳", 
      color: "#10B981",
      audioFile: forestAmbience, // Using imported file
      duration: "20:00",
      benefits: ["Mental clarity", "Deep relaxation", "Nature connection"]
    },
    {
      id: 3,
      title: "Mindful Breathing",
      description: "Breathing exercises for instant calm and focus",
      icon: "💨",
      color: "#8B5CF6",
      audioFile: breathingExercise, // Using imported file
      duration: "10:00",
      benefits: ["Instant calm", "Better focus", "Oxygenates brain"]
    },
    {
      id: 4,
      title: "Tibetan Singing Bowls",
      description: "Healing frequencies for emotional balance",
      icon: "🪷",
      color: "#F59E0B",
      audioFile: singingBowls, // Using imported file
      duration: "18:00",
      benefits: ["Emotional healing", "Chakra balance", "Deep meditation"]
    },
    {
      id: 5,
      title: "Stress Relief Piano",
      description: "Soothing piano melodies to melt away stress",
      icon: "🎹",
      color: "#EC4899",
      audioFile: pianoMelody, // Using imported file
      duration: "14:45",
      benefits: ["Stress reduction", "Mood elevation", "Creative flow"]
    },
    {
      id: 6,
      title: "Rain Meditation",
      description: "Gentle rain sounds for deep relaxation",
      icon: "🌧️",
      color: "#6366F1",
      audioFile: rainSounds, // Using imported file
      duration: "12:30",
      benefits: ["Sleep aid", "White noise", "Mental calmness"]
    }
  ];

  // Audio functionality with offline files
  const togglePlay = () => {
    if (!audioRef.current) {
      // Create audio element with offline file
      audioRef.current = new Audio(meditationTracks[currentTrack].audioFile);
      audioRef.current.volume = volume;
      
      // Set up event listeners
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current.duration) {
          const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(newProgress);
        }
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
        playNextTrack();
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
      });
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error('Playback failed:', error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const playTrack = (index) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setCurrentTrack(index);
    setProgress(0);
    setIsPlaying(false);
    
    // Reset audio for new track
    audioRef.current = null;
    
    // Auto-play the new track after a short delay
    setTimeout(() => {
      togglePlay();
    }, 100);
  };

  const playNextTrack = () => {
    const nextTrack = (currentTrack + 1) % meditationTracks.length;
    playTrack(nextTrack);
  };

  const playPreviousTrack = () => {
    const prevTrack = (currentTrack - 1 + meditationTracks.length) % meditationTracks.length;
    playTrack(prevTrack);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && audioRef.current.duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / progressBar.offsetWidth;
      const newTime = clickPosition * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(clickPosition * 100);
    }
  };

  const getCurrentTime = () => {
    if (audioRef.current && audioRef.current.currentTime) {
      const mins = Math.floor(audioRef.current.currentTime / 60);
      const secs = Math.floor(audioRef.current.currentTime % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return "0:00";
  };

  const getTotalTime = () => {
    if (audioRef.current && audioRef.current.duration) {
      const mins = Math.floor(audioRef.current.duration / 60);
      const secs = Math.floor(audioRef.current.duration % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return meditationTracks[currentTrack].duration;
  };

  // Responsive styles
  const responsiveStyles = {
    section: {
      padding: isMobile ? '2rem 1rem' : '4rem 2rem',
      color: 'white',
      minHeight: '100vh',
      margin: '2rem 0'
    },
    header: {
      textAlign: 'center',
      marginBottom: isMobile ? '2rem' : '3rem'
    },
    headerIcon: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      marginBottom: '1rem',
      animation: 'pulse 2s infinite'
    },
    headerTitle: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      marginBottom: '1rem',
      fontWeight: '700',
      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
    },
    headerSubtitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      opacity: 0.8,
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '1.5rem' : '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    player: {
      background: 'rgba(255,255,255,0.1)',
      padding: isMobile ? '1.5rem' : '2rem',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    },
    trackInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '1rem' : '0'
    },
    trackDetails: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      width: isMobile ? '100%' : 'auto'
    },
    trackIcon: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      animation: isPlaying ? 'pulse 1.5s infinite' : 'none'
    },
    trackText: {
      flex: 1
    },
    trackTitle: {
      margin: 0,
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontWeight: '600'
    },
    trackStatus: {
      margin: 0,
      opacity: 0.7,
      fontSize: isMobile ? '0.8rem' : '0.9rem'
    },
    durationBadge: {
      background: 'rgba(255,255,255,0.2)',
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      width: isMobile ? '100%' : 'auto',
      textAlign: 'center'
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '0.5rem' : '1rem',
      marginBottom: isMobile ? '1.5rem' : '2rem'
    },
    controlButton: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: 'white',
      padding: isMobile ? '10px' : '12px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.2rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    playButton: {
      width: isMobile ? '60px' : '70px',
      height: isMobile ? '60px' : '70px',
      background: meditationTracks[currentTrack].color,
      border: 'none',
      borderRadius: '50%',
      color: 'white',
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 15px ${meditationTracks[currentTrack].color}40`
    },
    progressContainer: {
      marginBottom: isMobile ? '1rem' : '1.5rem'
    },
    progressBar: {
      width: '100%',
      height: '6px',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '3px',
      marginBottom: '8px',
      cursor: 'pointer',
      position: 'relative'
    },
    progressFill: {
      width: `${progress}%`,
      height: '100%',
      background: meditationTracks[currentTrack].color,
      borderRadius: '3px',
      position: 'relative',
      transition: 'width 0.1s ease'
    },
    progressTime: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'rgba(255,255,255,0.7)',
      fontSize: isMobile ? '0.8rem' : '0.9rem'
    },
    volumeControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      color: 'rgba(255,255,255,0.7)'
    },
    trackList: {
      maxHeight: isMobile ? '400px' : '500px',
      overflowY: 'auto',
      paddingRight: '0.5rem'
    },
    trackItem: {
      background: 'rgba(255,255,255,0.1)',
      padding: isMobile ? '1rem' : '1.5rem',
      borderRadius: '15px',
      cursor: 'pointer',
      borderLeft: `4px solid ${meditationTracks[currentTrack].color}`,
      transition: 'all 0.3s ease',
      position: 'relative',
      backdropFilter: 'blur(10px)',
      marginBottom: isMobile ? '0.8rem' : '1rem'
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: isMobile ? '1rem' : '1.5rem',
      maxWidth: '1000px',
      margin: '4rem auto 0',
      textAlign: 'center'
    },
    benefitCard: {
      background: 'rgba(255,255,255,0.05)',
      padding: isMobile ? '1.5rem 0.5rem' : '2rem 1rem',
      borderRadius: '15px',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <section style={responsiveStyles.section}>
      {/* Header */}
      <div style={responsiveStyles.header}>
        <div style={responsiveStyles.headerIcon}>🎵</div>
        <h2 style={responsiveStyles.headerTitle}>
          Mindful Music for Inner Peace
        </h2>
        <p style={responsiveStyles.headerSubtitle}>
          Curated audio experiences for relaxation, focus, and emotional balance
        </p>
      </div>

      <div style={responsiveStyles.grid}>
        {/* Music Player */}
        <div style={responsiveStyles.player}>
          <div style={responsiveStyles.trackInfo}>
            <div style={responsiveStyles.trackDetails}>
              <div style={responsiveStyles.trackIcon}>
                {meditationTracks[currentTrack].icon}
              </div>
              <div style={responsiveStyles.trackText}>
                <h3 style={responsiveStyles.trackTitle}>
                  {meditationTracks[currentTrack].title}
                </h3>
                <p style={responsiveStyles.trackStatus}>
                  {isPlaying ? 'Now Playing' : 'Paused'}
                </p>
              </div>
            </div>
            <div style={responsiveStyles.durationBadge}>
              {meditationTracks[currentTrack].duration}
            </div>
          </div>

          {/* Player Controls */}
          <div style={responsiveStyles.controls}>
            <button 
              onClick={playPreviousTrack}
              style={responsiveStyles.controlButton}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              ⏮
            </button>
            
            <button 
              onClick={togglePlay}
              style={{
                ...responsiveStyles.playButton,
                transform: isMobile ? 'none' : undefined
              }}
              onMouseOver={(e) => !isMobile && (e.target.style.transform = 'scale(1.1)')}
              onMouseOut={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <button 
              onClick={playNextTrack}
              style={responsiveStyles.controlButton}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              ⏭
            </button>
          </div>

          {/* Progress Bar */}
          <div style={responsiveStyles.progressContainer}>
            <div 
              style={responsiveStyles.progressBar}
              onClick={handleProgressClick}
            >
              <div 
                style={responsiveStyles.progressFill}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: '-6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '12px',
                    height: '12px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              </div>
            </div>
            <div style={responsiveStyles.progressTime}>
              <span>{getCurrentTime()}</span>
              <span>{getTotalTime()}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div style={responsiveStyles.volumeControl}>
            <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>🔊</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                flex: 1,
                height: '4px',
                background: `linear-gradient(90deg, ${meditationTracks[currentTrack].color} ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
                borderRadius: '2px',
                outline: 'none',
                WebkitAppearance: 'none'
              }}
            />
            <span style={{ 
              fontSize: isMobile ? '0.8rem' : '0.9rem', 
              minWidth: '30px',
              fontWeight: '600'
            }}>
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Track List */}
        <div>
          <h3 style={{ 
            marginBottom: isMobile ? '1rem' : '1.5rem', 
            fontSize: isMobile ? '1.3rem' : '1.5rem', 
            fontWeight: '600' 
          }}>
            Meditation Tracks ({meditationTracks.length})
          </h3>
          <div style={responsiveStyles.trackList}>
            {meditationTracks.map((track, index) => (
              <div 
                key={track.id}
                onClick={() => playTrack(index)}
                style={{
                  ...responsiveStyles.trackItem,
                  background: currentTrack === index ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                  borderLeft: `4px solid ${track.color}`
                }}
                onMouseOver={(e) => {
                  if (!isMobile && currentTrack !== index) {
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'translateX(5px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isMobile && currentTrack !== index) {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.transform = 'translateX(0)';
                  }
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: isMobile ? '0.8rem' : '1rem' 
                }}>
                  <span style={{ fontSize: isMobile ? '1.5rem' : '1.8rem' }}>{track.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: 0, 
                      fontSize: isMobile ? '1rem' : '1.1rem', 
                      fontWeight: '600' 
                    }}>
                      {track.title}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      opacity: 0.7, 
                      fontSize: isMobile ? '0.8rem' : '0.9rem' 
                    }}>
                      {track.description}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      marginBottom: '4px', 
                      fontSize: isMobile ? '0.8rem' : '0.9rem' 
                    }}>
                      {track.duration}
                    </div>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      opacity: 0.7
                    }}>
                      Track {index + 1}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {track.benefits.map((benefit, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: isMobile ? '0.7rem' : '0.75rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                {currentTrack === index && (
                  <div style={{
                    position: 'absolute',
                    top: isMobile ? '0.5rem' : '1rem',
                    right: isMobile ? '0.5rem' : '1rem',
                    background: track.color,
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    animation: 'pulse 2s infinite'
                  }}>
                    {isPlaying ? '🔊 Playing' : '⏸️ Paused'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{ 
        maxWidth: '1000px', 
        margin: '4rem auto 0', 
        textAlign: 'center' 
      }}>
        <h3 style={{ 
          marginBottom: isMobile ? '1.5rem' : '2rem', 
          fontSize: isMobile ? '1.5rem' : '1.8rem', 
          fontWeight: '600' 
        }}>
          Benefits of Mindful Listening
        </h3>
        <div style={responsiveStyles.benefitsGrid}>
          {[
            { icon: '😌', title: 'Stress Reduction', desc: 'Lowers cortisol levels and promotes deep relaxation' },
            { icon: '🎯', title: 'Better Focus', desc: 'Improves concentration and mental clarity throughout the day' },
            { icon: '❤️', title: 'Emotional Balance', desc: 'Helps manage anger and maintain emotional stability' },
            { icon: '💤', title: 'Improved Sleep', desc: 'Promotes deeper and more restful sleep patterns' },
            { icon: '🧠', title: 'Mental Clarity', desc: 'Clears mind fog and enhances cognitive function' },
            { icon: '⚡', title: 'Energy Boost', desc: 'Natural energy restoration without stimulants' }
          ].map((benefit, index) => (
            <div 
              key={index}
              style={responsiveStyles.benefitCard}
              onMouseOver={(e) => {
                if (!isMobile) {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (!isMobile) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
            >
              <span style={{ 
                fontSize: isMobile ? '2rem' : '2.5rem', 
                display: 'block', 
                marginBottom: '1rem' 
              }}>
                {benefit.icon}
              </span>
              <h4 style={{ 
                marginBottom: '0.5rem', 
                fontSize: isMobile ? '1rem' : '1.1rem', 
                fontWeight: '600' 
              }}>
                {benefit.title}
              </h4>
              <p style={{ 
                margin: 0, 
                opacity: 0.7, 
                fontSize: isMobile ? '0.8rem' : '0.9rem', 
                lineHeight: '1.4' 
              }}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          /* Custom scrollbar for track list */
          .track-list::-webkit-scrollbar {
            width: 6px;
          }
          
          .track-list::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.1);
            border-radius: 3px;
          }
          
          .track-list::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.3);
            border-radius: 3px;
          }
          
          .track-list::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.5);
          }
        `}
      </style>
    </section>
  );
};

  // Draw success/failure graph
  useEffect(() => {
    if (!canvasRef.current || !graphInView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= width; i += width / 6) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= height; i += height / 5) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    if (activeTab === 'success') {
      drawSuccessGraph(ctx, width, height);
    } else {
      drawFailureStories(ctx, width, height);
    }
  }, [activeTab, graphInView]);

  const drawSuccessGraph = (ctx, width, height) => {
    const data = journeyData.success;
    const maxAttempts = Math.max(...data.map(d => d.attempts));
    const padding = 60;

    // Draw axes
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw success line (green)
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
      const x = padding + (index * (width - 2 * padding) / (data.length - 1));
      const y = height - padding - ((point.successes / maxAttempts) * (height - 2 * padding));
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw points
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.stroke();

    // Draw failure line (red)
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
      const x = padding + (index * (width - 2 * padding) / (data.length - 1));
      const failures = point.attempts - point.successes;
      const y = height - padding - ((failures / maxAttempts) * (height - 2 * padding));
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw points
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.stroke();

    // Add labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    data.forEach((point, index) => {
      const x = padding + (index * (width - 2 * padding) / (data.length - 1));
      ctx.fillText(point.year, x, height - padding + 20);
    });

    // Add legend
    ctx.fillStyle = '#10B981';
    ctx.fillText('Successes', width - 80, padding - 10);
    ctx.fillStyle = '#EF4444';
    ctx.fillText('Failures', width - 80, padding + 10);
  };

  const drawFailureStories = (ctx, width, height) => {
    const data = journeyData.famousFailures;
    const padding = 40;
    const barWidth = (width - 2 * padding) / data.length - 20;

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';

    data.forEach((person, index) => {
      const x = padding + (index * (barWidth + 20));
      const barHeight = (height - 2 * padding) * 0.6;
      const y = height - padding - barHeight;

      // Draw bar
      ctx.fillStyle = '#8B5CF6';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw name
      ctx.fillStyle = '#ffffff';
      ctx.fillText(person.name, x + barWidth / 2, height - padding + 20);

      // Draw quote excerpt
      ctx.font = '10px Arial';
      const words = person.quote.split(' ');
      const excerpt = words.slice(0, 6).join(' ') + '...';
      ctx.fillText(excerpt, x + barWidth / 2, y - 10);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      rotateX: -15
    },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const movieCardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      rotateY: -15
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -15,
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={styles.philosophyContainer}>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className={styles.philosophyHero}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={heroInView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className={styles.heroTitle}
        >
          <span className={styles.inspirationalText}>Inspirational</span>
          <span className={styles.philosophyText}>
            Philosophy
            <motion.span 
              className={styles.flagUnderline}
              initial={{ scaleX: 0 }}
              animate={heroInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            />
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={styles.heroSubtitle}
        >
          Wisdom from extraordinary individuals who shaped our world with their vision and perseverance
        </motion.p>
      </motion.section>

      <motion.section
  className={styles.flagSection}
  initial={{ opacity: 0 }}
  animate={heroInView ? { opacity: 1 } : {}}
  transition={{ duration: 0.8, delay: 1 }}
>
  <div className={styles.flagContainer}>
    <IndianFlag />
    <motion.div 
      className={styles.flagMessage}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <h3>Unity in Diversity</h3>
      <p>Drawing inspiration from India's rich heritage of wisdom and resilience</p>
    </motion.div>
  </div>
</motion.section>

      {/* Inspirational Figures Section */}
      <motion.section
        ref={cardsRef}
        className={styles.figuresContainer}
        variants={containerVariants}
        initial="hidden"
        animate={cardsInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className={styles.sectionTitle}
          variants={itemVariants}
        >
          Guiding Lights
        </motion.h2>
        
        <motion.p 
          className={styles.sectionSubtitle}
          variants={itemVariants}
        >
          Learn from those who dared to dream differently
        </motion.p>

        <div className={styles.figuresGrid}>
          {inspirationalFigures.map((figure, index) => (
            <motion.div
              key={figure.name}
              className={styles.figureCard}
              style={{ 
                '--accent-color': figure.color,
                '--card-bg': `${figure.color}15`
              }}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={cardsInView ? "visible" : "hidden"}
              whileHover="hover"
            >
              {/* Card Header with Image */}
              <div className={styles.cardHeader}>
                <motion.div 
                  className={styles.figureImageContainer}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={figure.image} 
                    alt={figure.name}
                    className={styles.figureImage}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay} />
                </motion.div>
                <div className={styles.figureInfo}>
                  <h3>{figure.name}</h3>
                  <span className={styles.figureTitle}>{figure.title}</span>
                </div>
              </div>

              {/* Bio */}
              <motion.p 
                className={styles.figureBio}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {figure.bio}
              </motion.p>

              {/* Main Thought */}
              <motion.blockquote 
                className={styles.mainThought}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                "{figure.thought}"
              </motion.blockquote>

              {/* Additional Quote */}
              <motion.p 
                className={styles.additionalQuote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {figure.quote}
              </motion.p>

              {/* Achievements */}
              <motion.div 
                className={styles.achievements}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                <h4>Key Contributions:</h4>
                <ul>
                  {figure.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.7 + i * 0.1 }}
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Gradient Border Effect */}
              <div className={styles.cardGradientBorder} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Inspirational Movies Section */}
      <motion.section
        ref={moviesRef}
        className={styles.moviesSection}
        initial="hidden"
        animate={moviesInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <FiFilm className={styles.sectionIcon} />
          <h2>Must-Watch Inspirational Movies</h2>
          <p>Stories that will motivate and transform your perspective</p>
        </motion.div>

        <div className={styles.moviesGrid}>
          {inspirationalMovies.map((movie, index) => (
            <motion.div
              key={movie.title}
              className={styles.movieCard}
              style={{ '--movie-color': movie.color }}
              custom={index}
              variants={movieCardVariants}
              whileHover="hover"
            >
              <div className={styles.moviePoster}>
                <img src={movie.poster} alt={movie.title} />
                <div className={styles.movieOverlay}>
                  <motion.a
                    href={movie.watchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.watchButton}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiPlay /> Watch Now
                  </motion.a>
                </div>
                <div className={styles.movieRating}>
                  <FiStar />
                  <span>{movie.rating}</span>
                </div>
              </div>

              <div className={styles.movieInfo}>
                <h3>{movie.title} ({movie.year})</h3>
                <div className={styles.movieMeta}>
                  <span>{movie.duration}</span>
                  <span>•</span>
                  <span>{movie.genre}</span>
                </div>
                <p className={styles.movieDescription}>{movie.description}</p>
                <div className={styles.inspiration}>
                  <strong>Key Takeaway:</strong> {movie.keyTakeaway}
                </div>
                <div className={styles.movieDetails}>
                  <div><strong>Director:</strong> {movie.director}</div>
                  <div><strong>Starring:</strong> {movie.starring}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Success/Failure Journey Graph */}
      <motion.section
        ref={graphRef}
        className={styles.graphSection}
        initial={{ opacity: 0, y: 50 }}
        animate={graphInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div className={styles.sectionHeader}>
          <FiTrendingUp className={styles.sectionIcon} />
          <h2>The Success-Failure Journey</h2>
          <p>Understanding that failure is part of every success story</p>
        </motion.div>

        <div className={styles.graphContainer}>
          <div className={styles.graphTabs}>
            <button
              className={`${styles.tab} ${activeTab === 'success' ? styles.active : ''}`}
              onClick={() => setActiveTab('success')}
            >
              <FiBarChart2 /> Success Progression
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'failure' ? styles.active : ''}`}
              onClick={() => setActiveTab('failure')}
            >
              <FiAward /> Famous Failures
            </button>
          </div>

          <div className={styles.graphContent}>
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className={styles.graphCanvas}
            />
            
            <div className={styles.graphInsights}>
              {activeTab === 'success' ? (
                <div className={styles.insightContent}>
                  <h4>📈 Growth Insights</h4>
                  <ul>
                    <li>Failure rate decreased from 66% to 8% over 19 years</li>
                    <li>Consistent improvement through learning and adaptation</li>
                    <li>Each failure provided valuable lessons for future success</li>
                  </ul>
                </div>
              ) : (
                <div className={styles.insightContent}>
                  <h4>🎯 Failure Lessons</h4>
                  <ul>
                    {journeyData.famousFailures.map((person, index) => (
                      <li key={index}>
                        <strong>{person.name}:</strong> {person.failures} → {person.success}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Music for Mind Section - NOW PROPERLY RENDERED */}
      <MusicForMind />

      {/* Final Inspiration Section */}
      <motion.section 
        className={styles.inspirationFooter}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={cardsInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Your Journey Awaits
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Let these stories inspire your own path to greatness. Every extraordinary achievement began as a simple dream.
        </motion.p>
        <motion.div
          className={styles.inspirationQuote}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
        >
          "The only limit to our realization of tomorrow will be our doubts of today." - Franklin D. Roosevelt
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Philosophy;