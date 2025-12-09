

import ecommerce1 from '../assets/projects/ecommerce1.png';//demo image
import ecommerce21 from '../assets/ecommerce/ecommerce1.jpg';
import ecommerce2 from '../assets/ecommerce/ecommerce2.jpg';
import ecommerce3 from '../assets/ecommerce/ecommerce3.jpg';
import ecommerce4 from '../assets/ecommerce/ecommerce4.jpg';
import ecommerce5 from '../assets/ecommerce/ecommerce5.jpg';
import ecommerce6 from '../assets/ecommerce/ecommerce6.png';
import chatapp from '../assets/projects/chatapp.png'; //demo image
import chatapp1 from '../assets/chat-app/chatapp1.jpg';
import chatapp2 from '../assets/chat-app/chatapp2.jpg';
import chatapp3 from '../assets/chat-app/chatapp3.jpg';
import chatapp4 from '../assets/chat-app/chatapp4.jpg';
import chatapp5 from '../assets/chat-app/chatapp5.jpg';
import chatapp6 from '../assets/chat-app/chatapp6.jpg';
import Gotrip0 from '../assets/go-trip/gotrip0.png';//demo image
import Gotrip1 from '../assets/go-trip/gotrip1.png';
import Gotrip2 from '../assets/go-trip/gotrip2.png';
import Gotrip3 from '../assets/go-trip/gotrip3.png';
import Gotrip4 from '../assets/go-trip/gotrip4.png';
import Gotrip5 from '../assets/go-trip/gotrip5.png';
import Gotrip6 from '../assets/go-trip/gotrip6.png';
import Gotrip7 from '../assets/go-trip/gotrip7.png';
import cloneapp from '../assets/projects/cloneapp.png'; //demo image
import cloneapp1 from '../assets/clone-app/clone1.jpg';
import cloneapp2 from '../assets/clone-app/clone2.jpg';
import cloneapp3 from '../assets/clone-app/clone3.jpg';
import cloneapp4 from '../assets/clone-app/clone4.jpg';
import cloneapp5 from '../assets/clone-app/clone5.jpg';
import cloneapp6 from '../assets/clone-app/clone6.jpg';
import profile1 from "../assets/gallery/profile1.jpg";

import profile2 from "../assets/gallery/profile2.jpg";
import profile3 from "../assets/gallery/profile3.jpg";
import Rahul from '../assets/testimonials/rahul.jpg';
import Ashi from '../assets/testimonials/ashi.jpg';
import Ayush from '../assets/testimonials/ayush.jpg';
import Virendra from '../assets/testimonials/virendra.jpg';
import Anant from '../assets/testimonials/anant.jpg';
import Umang from '../assets/testimonials/umang.jpg';

export const skills = [
  { id: 1, name: 'React', level: 90, color: '#61DAFB' },
  { id: 2, name: 'JavaScript', level: 85, color: '#F7DF1E' },
  { id: 3, name: 'Node.js', level: 80, color: '#339933' },
  { id: 4, name: 'MongoDB', level: 75, color: '#47A248' },
  { id: 5, name: 'Express.js', level: 80, color: '#000000' },
  { id: 6, name: 'CSS3', level: 85, color: '#1572B6' },
  { id: 7, name: 'HTML5', level: 90, color: '#E34F26' },
  { id: 8, name: 'Java', level: 70, color: '#3776AB' },
  { id: 9, name: 'TypeScript', level: 75, color: '#3178C6' },
  { id: 10, name: 'Git', level: 85, color: '#F05032' },
  { id: 11, name: 'C++', level: 65, color: '#FF9900' },
  { id: 12, name: 'Docker', level: 60, color: '#2496ED' }
];

export const projects = [

{
  id: 1,
  title: "GoTrip – AI Powered Travel Planner & Real-Time Booking Platform",

  description:
    "GoTrip is an advanced MERN + AI powered travel planning platform that fetches real-time hotel, flight, and train data from live travel APIs. Users can explore real destinations or generate AI-created fictional places, plan complete trips, and get redirected to official booking providers (like IRCTC, MakeMyTrip, Agoda, etc.) for secure reservations. The platform also detects the user’s current city and recommends nearby attractions, food spots, and local activities, creating a fully personalized travel experience.",

  shortDescription:
    "AI-powered travel planner with real-time hotels, flights, trains & smart booking redirects",

  image: Gotrip0,

 screenshots: [
  { src: Gotrip1, title: "User Login & Signup Authentication" },
  { src: Gotrip2, title: "Home Page – Trip Planner with Hotel, Flight & Train Form" },
  { src: Gotrip3, title: "AI Destination Search – Explore Any Place Worldwide" },
  { src: Gotrip4, title: "Popular & Recommended Places Based on User Search" },
  { src: Gotrip5, title: "Place Details – Attractions, Spots & Travel Insights" },
  { src: Gotrip6, title: "Real-Time Flight Search & Suggestions" },
  { src: Gotrip7, title: "Train Search – Live Availability & Booking Redirect" }
],


  features: [
    "AI-powered trip planning with personalized multi-day itineraries",
    "Real-time hotel, flight, and train data using live travel APIs",
    "Redirect users to official hotel/flight/train provider websites for secure bookings",
    "Detect user's current city and recommend top nearby attractions and local spots",
    "Generate fictional yet realistic destinations if user dislikes DB results",
    "Advanced search with filters, budget selection & AI relevance ranking",
    "Secure authentication with JWT & personalized user profiles",
    "Dynamic pricing, seasonal offers & discount management",
    "Admin dashboard for managing destinations, listings, and offers",
    "Automated email notifications for booking confirmation"
  ],

  technologies: [
    "React", "Node.js", "MongoDB", "Express",
    "GemniAI API", "Stripe", "JWT", "Mongoose", "Brevo"
  ],

  githubUrl: "/gotrip-private",

  projectType: "screenshots",
  category: "fullstack",
  timeTaken: "10 days",
  complexity: "Advanced",
  teamSize: "Solo",
  status: "Completed",

  highlights: [
    "Real Travel API Integration (Hotels, Flights, Trains)",
    "Secure redirection to official travel provider sites",
    "User city detection & local attraction recommendations",
    "AI Trip Planner Engine with itinerary generation",
    "AI-based fictional destination generator",
    "Advanced filtering & personalized travel suggestions",
    "Dynamic Pricing + Seasonal Offers",
    "Admin Management Panel"
  ],

  challenges: [
    "Integrating real travel APIs for accurate hotel/flight/train data",
    "Creating reliable redirection flows for external booking providers",
    "Building AI-powered city generation & itinerary planning",
    "Maintaining real-time availability & preventing booking conflicts",
    "Optimizing search speed with filters + AI scoring",
    "Handling secure authentication and data privacy",
    "Designing dynamic pricing & seasonal discount logic",
    "Building a responsive UI for all device sizes",
    "Efficient database structuring for trips, users, bookings & destinations"
  ],

  achievements: [
    "Enabled users to access real-time hotel, flight, and train data instantly",
    "Achieved seamless booking redirection to trusted travel platforms",
    "Created a location-aware recommendation system for local attractions",
    "Reduced trip planning time by 70% using AI automation",
    "Developed a scalable admin dashboard for travel and pricing management"
  ]
},


  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB featuring user authentication, payment integration, and admin dashboard.',
    shortDescription: 'Complete online shopping platform with secure payments and admin management',
    image:   ecommerce1, 
    screenshots: [
      { src: ecommerce21, title: 'Home Page' },
      { src: ecommerce2, title: 'User Authentication & Login' },
      { src: ecommerce3, title: 'Product Catalog & Search' },
      { src: ecommerce4, title: '100+ Product Catalog' },
      { src: ecommerce5, title: 'Footer which have many features like amazon' },
      { src: ecommerce6, title: 'User Order Management' }
    ],
    features: [
      'User Authentication & Authorization',
      'Product Catalog & Search',
      'Shopping Cart & Wishlist',
      'Payment Integration (Stripe)',
      'Admin Dashboard',
      'Order Management System',
      'Inventory Management',
      'Customer Reviews & Ratings'
    ],
    technologies: ['EJS', 'Node.js', 'MongoDB','Nodemailer', 'Express', 'Stripe', 'JWT',],
    githubUrl: 'https://github.com/Manishsingh2203/E-Commerce.git',
    projectType: 'screenshots',
    category: 'fullstack',
    timeTaken: '1 months',
    complexity: 'Advanced',
    teamSize: 'Solo',
    status: 'Completed',
    highlights: ['Payment Integration', 'Admin Panel', 'Real-time Updates', 'Scalable Architecture'],
    challenges: [
  'Payment gateway integration',
  'Shopping cart state management',
  'User authentication security',
  'Responsive design across devices',
  'Optimizing page load speed',
  'Handling API errors and edge cases',
  'Search and filter functionality for products',
  'Managing product inventory and dynamic updates',
  
],

    achievements: [
      'Built a feature-rich application demonstrating handling of multiple transactions',
  'Ensured smooth performance and optimized page load times during development',
  'Implemented best practices for scalable and maintainable code'
    ]
  },
  {
    id: 3,
    title: 'Real Time Chat App',
    description: 'A real-time chat application with user authentication, group chats, and media sharing features built with React and Firebase.',
    shortDescription: 'Instant messaging platform with real-time communication and media sharing',
    image:  chatapp, 
    screenshots: [
      { src: chatapp1, title: 'User Authentication & Signup' },
      { src: chatapp2, title: 'WhatsApp like chat Section' },
      { src: chatapp3, title: 'Emoji features with real time chat' },
      { src: chatapp4, title: 'Video Call features' },
      { src: chatapp5, title: 'Allow User to choose theme according to their preference' },
      { src: chatapp6, title: 'Audio Call features' }
    ],
    features: [
      'Send and receive messages instantly between users without page refresh.',
      'Secure login/signup system to verify and protect user accounts.',
      'Create and participate in multi-user group conversations for collaboration.',
      'Send images, videos, and documents directly within chat threads.',
      'End-to-end encryption ensures that messages remain private and secure.',
     'See which users are currently online or active in real-time.',
      'Maintain a searchable history of all past conversations for easy reference.'
    ],
    technologies: ['React', 'Material-UI','MongoDB' ,'Node.JS', 'WebSocket.IO', 'Framer Motion', 'Express.js', 'Firestore', 'Cloud Storage'],
    githubUrl: 'https://github.com/Manishsingh2203/Chat-App.git',
    projectType: 'screenshots',
    category: 'frontend',
    timeTaken: '2 weeks',
    complexity: 'Intermediate',
    teamSize: 'Solo',
    status: 'Completed',
    highlights: ['Real-time Communication', 'Media Sharing', 'Group Chats', 'Secure Messaging'],
    challenges: [
        'Real-time message synchronization between multiple users',
  'User authentication and session management',
  'Managing online/offline user presence',
  'Typing indicators and read receipts',
  'Group chat management and permissions',
  'Efficient database storage for chat history',
  'Handling large media file uploads (images, videos)',
  'Cross-device compatibility and responsive design',
    ],
    achievements: [
      'Achieved <100ms message delivery',
      'Supported 50+ concurrent users',
      'Implemented end-to-end encryption'
    ]
  },
  {
    id: 4,
    title: 'Modern UI Clone Application',
    description: 'A collection of modern UI clone applications showcasing responsive design, cross-browser compatibility, and performance optimization.',
    shortDescription: 'Modern UI clones with responsive design and optimized performance',
    image:  cloneapp, 
    screenshots: [
      { src: cloneapp1, title: 'WhatsApp UI Clone - Homepage' },
      { src: cloneapp2, title: 'Calculator with working functionality' },
      { src: cloneapp3, title: 'Amazon UI Clone - Product Page' },
      { src: cloneapp4, title: 'Spotify UI Clone - Music Player' },
      { src: cloneapp5, title: 'Snake Game With Scoring System' },
      { src: cloneapp6, title: 'Netflix UI Clone - Homepage' }
    ],
    features: [
      'Responsive Design',
      'Modern UI/UX',
      'Cross-browser Compatibility',
      'Performance Optimized',
      'Mobile-First Approach',
      'Accessibility Features',
      'SEO Friendly',
      'Fast Loading Times'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'SASS', 'Canva', 'Figma'],
    githubUrl: 'https://github.com/Manishsingh2203',
    projectType: 'screenshots',
    category: 'frontend',
    timeTaken: '3 weeks',
    complexity: 'Beginner',
    teamSize: 'Solo',
    status: 'Completed',
    highlights: ['Responsive Design', 'Modern UI', 'Performance', 'Cross-browser Support'],
    challenges: [
      'Pixel-perfect design implementation',
      'Cross-browser compatibility',
      'Mobile responsiveness optimization'
    ],
    achievements: [
      'Achieved 95+ Google PageSpeed score',
      'Perfect responsive design across all devices',
      'Implemented modern CSS animations'
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Rahul Singh",
    feedback: "Manish delivered exceptional work on our e-commerce platform. His attention to detail and problem-solving skills are remarkable. The project was completed ahead of schedule!",
    role: "Software Engineer at Intellect",
    rating: 5,
    image: Rahul,
    companyLogo: "/images/companies/intellect-logo.png",
    project: "E-Commerce Platform",
    duration: "3 months collaboration"
  },
  {
    id: 2,
    name: "Ashi Kashyap",
    feedback: "Working with Manish was a great experience. His React expertise helped us build a scalable admin dashboard that improved our team's productivity by 40%.",
    role: "Full Stack Developer",
    rating: 5,
    image: Ashi,
    companyLogo: "/images/companies/techcorp-logo.png",
    project: "Admin Dashboard System",
    duration: "2 months collaboration"
  },
  {
    id: 3,
    name: "Ayush Aggrawal",
    feedback: "Manish's design-to-code implementation was flawless. He perfectly captured our vision and delivered a responsive website that exceeded our expectations.",
    role: "Mobile App Developer at GeeksforGeeks",
    rating: 5,
    image: Ayush,
    companyLogo: "/images/companies/geeksforgeeks-logo.png",
    project: "Company Website Redesign",
    duration: "6 weeks collaboration"
  },
  {
    id: 4,
    name: "Virendra Vikram Singh",
    feedback: "Outstanding full-stack developer! Manish built our REST API and frontend with clean, maintainable code. His technical knowledge is impressive.",
    role: "Software Engineer at CollegeDunia",
    rating: 5,
    image: Virendra,
    companyLogo: "/images/companies/collegedunia-logo.png",
    project: "REST API Development",
    duration: "4 months collaboration"
  },
  {
    id: 5,
    name: "Anant Mishra",
    feedback: "Manish transformed our legacy system into a modern web application. His ability to understand complex requirements and deliver quality solutions is exceptional.",
    role: "Associate Software Engineer at Successive Technologies",
    rating: 5,
    image: Anant,
    companyLogo: "/images/companies/successive-logo.png",
    project: "Legacy System Modernization",
    duration: "5 months collaboration"
  },
  {
    id: 6,
    name: "Umang Kumar",
    feedback: "Reliable and skilled developer. Manish consistently delivered high-quality code and was always available for discussions and improvements.",
    role: "Software Engineer at FanTopark",
    rating: 5,
    image: Umang,
    companyLogo: "/images/companies/fantopark-logo.png",
    project: "Web Application Development",
    duration: "3 months collaboration"
  },
];

export const galleryImages = [
  { 
    id: 1, 
    src: profile1, 
    alt: 'Professional Headshot - Manish Singh',
    title: 'Professional Portfolio Headshot',
    description: 'Professional photography session for portfolio and LinkedIn profile'
  },
 {
  id: 2,
  src: profile2,
  alt: 'Smart India Hackathon',
  title: 'Smart India Hackathon',
  description: 'Building innovative real-world solutions under intense deadlines — a journey of teamwork, creativity, and problem-solving.'
},

 {
  id: 3,
  src: profile3,
  alt: 'Exploring Nature’s Beauty',
  title: 'Exploring Nature’s Beauty',
  description: 'Capturing serene landscapes and finding creative inspiration in the calm rhythm of nature.'
},

];

// Additional data for project categories
export const projectCategories = [
  { id: 'all', name: 'All Projects', count: projects.length },
  { id: 'fullstack', name: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
  { id: 'frontend', name: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
];

// Project statistics
export const projectStats = {
  totalProjects: projects.length,
  completedProjects: projects.filter(p => p.status === 'Completed').length,
  totalTechnologies: [...new Set(projects.flatMap(p => p.technologies))].length,
  averageCompletionTime: '2 months'
};

export default {
  skills,
  projects,
  testimonials,
  galleryImages,
  projectCategories,
  projectStats
};