import { useState, useEffect, useRef } from "react"
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, ArrowDown, Menu, X, Star, Zap, Heart } from "lucide-react"

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    overflow-x: hidden;
    line-height: 1.6;
    cursor: none; /* Hide default cursor */
  }

  /* Universe Background */
  .background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(to bottom, #000428, #000000); /* Dark gradient for space */
  }

  .stars {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle 2s infinite;
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  /* Enhanced Mouse Follower */
  // .mouse-follower {
  //   position: fixed;
  //   width: 40px;
  //   height: 40px;
  //   background: rgba(102, 126, 234, 0.6); /* Core color */
  //   border-radius: 50%;
  //   pointer-events: none;
  //   z-index: 0;
  //   mix-blend-mode: none; /* Creates a cool interaction with content */
  //   transform: translate(-50%, -50%); /* Centers the cursor on the mouse */
  //   transition: transform 0.1s ease-out, box-shadow 0.2s ease-out; /* Smooth movement and glow transition */
  //   box-shadow: 0 0 15px 5px rgba(102, 126, 234, 0.8), /* Inner glow */
  //               0 0 20px 10px rgba(118, 75, 162, 0.5); /* Outer, softer glow */
  // }

  // /* Optional: Trail effect (requires JavaScript update) */
  // .trail {
  //   position: fixed;
  //   width: 15px; /* Slightly larger trail */
  //   height: 15px;
  //   background: rgba(255, 255, 255, 0.15); /* Softer white for trail */
  //   border-radius: 50%;
  //   pointer-events: none;
  //   mix-blend-mode: exclusion;
  //   transform: translate(-50%, -50%);
  //   animation: fadeAndShrink 0.3s forwards ease-out; /* Smoother animation */
  //   opacity: 0.8;
  // }

  // @keyframes fadeAndShrink {
  //   0% { opacity: 1; transform: scale(1) translate(-50%, -50%); }
  //   100% { opacity: 0; transform: scale(0.6) translate(-50%, -50%); } /* Shrinks slightly */
  // }

  /* Navigation */
  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
  }

  .nav.loaded {
    transform: translateY(0);
  }

  .nav:not(.loaded) {
    transform: translateY(-100%);
  }

  .nav-content {
    backdrop-filter: blur(20px);
    background: rgba(0,0,0,0.3);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 1rem 0;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: pulse 2s infinite;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-links li {
    position: relative;
  }

  .nav-link {
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    text-transform: capitalize;
  }

  .nav-link:hover {
    color: #667eea;
    background: rgba(255,255,255,0.1);
    transform: translateY(-2px);
  }

  .nav-link.active {
    color: #667eea;
    background: rgba(102,126,234,0.2);
  }

  .mobile-menu-btn {
    display: none;
    background: rgba(255,255,255,0.1);
    border: none;
    color: white;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .mobile-menu-btn:hover {
    background: rgba(255,255,255,0.2);
  }

  .mobile-menu {
    display: none;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 1rem;
  }

  .mobile-menu.open {
    display: block;
  }

  .mobile-menu-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .mobile-menu-link {
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    padding: 0.5rem;
    text-transform: capitalize;
    transition: color 0.3s ease;
  }

  .mobile-menu-link:hover {
    color: #667eea;
  }

  /* Hero Section */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    padding: 2rem;
  }

  .hero-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease;
  }

  .hero-content.loaded {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-title {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: bold;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 300%;
    animation: gradientText 3s ease infinite;
  }

  @keyframes gradientText {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .hero-letter {
    display: inline-block;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
  }

  .typewriter-container {
    font-size: clamp(1.2rem, 4vw, 1.8rem);
    color: rgba(255,255,255,0.8);
    margin-bottom: 2rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .typewriter-text {
    margin-right: 2px;
  }

  .cursor {
    animation: blink 1s infinite;
    color: #667eea;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .social-link {
    width: 50px;
    height: 50px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    animation: socialBounce 2s infinite;
  }

  .social-link:hover {
    background: linear-gradient(45deg, #667eea, #764ba2);
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 10px 20px rgba(102,126,234,0.3);
  }

  @keyframes socialBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .cta-button {
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    border: none;
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    animation: glow 2s infinite alternate;
  }

  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(102,126,234,0.4);
  }

  @keyframes glow {
    0% { box-shadow: 0 0 20px rgba(102,126,234,0.3); }
    100% { box-shadow: 0 0 30px rgba(118,75,162,0.5); }
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
  }

  /* Section Styles */
  .section {
    padding: 5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-title h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: bold;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  .section-divider {
    width: 80px;
    height: 4px;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    margin: 0 auto;
    border-radius: 2px;
  }

  /* About Section */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .about-text {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.8);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }

  .badge {
    background: rgba(102,126,234,0.2);
    color: #667eea;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .badge:hover {
    background: rgba(102,126,234,0.3);
    transform: scale(1.05);
  }

  .avatar-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }

  .avatar-ring {
    position: absolute;
    border: 2px solid;
    border-radius: 50%;
    animation: spin 10s linear infinite;
  }

  .avatar-ring:nth-child(1) {
    inset: 0;
    border-color: rgba(102,126,234,0.3);
  }

  .avatar-ring:nth-child(2) {
    inset: 20px;
    border-color: rgba(118,75,162,0.3);
    animation-direction: reverse;
    animation-duration: 8s;
  }

  .avatar-ring:nth-child(3) {
    inset: 40px;
    border-color: rgba(240,147,251,0.3);
    animation-duration: 6s;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .avatar {
    position: absolute;
    inset: 60px; /* Adjust this value if your image needs more or less space from the rings */
    border-radius: 50%;
    overflow: hidden; /* Ensures the image stays within the circle */
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite; /* Keep the pulse animation for the container */
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the circle without distortion */
    border-radius: 50%; /* Ensures the image itself is also circular */
  }

  /* Skills Section */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Adjusted for more columns, smaller items */
    gap: 1.5rem; /* Reduced gap */
    justify-content: center; /* Center items */
  }

  .skill-item {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 15px;
    padding: 1rem; /* Reduced padding */
    transition: all 0.3s ease;
    text-align: center; /* Center text and icon */
    display: flex; /* Use flex to align content */
    flex-direction: column; /* Stack content vertically */
    align-items: center; /* Center content horizontally */
    justify-content: center; /* Center content vertically */
    min-height: 120px; /* Minimum height for consistency */
  }

  .skill-item:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-5px);
  }

  .skill-name {
    font-weight: 600;
    color: white;
    margin-top: 0.5rem; /* Space between icon and name */
  }

  /* Projects Section */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .project-card:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(102,126,234,0.2);
  }

  .project-image {
    height: 200px;
    background: linear-gradient(45deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2), rgba(240,147,251,0.2));
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .project-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .project-card:hover .project-image::before {
    transform: translateX(100%);
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }

  .project-card:hover .project-title {
    color: #667eea;
  }

  .project-description {
    color: rgba(255,255,255,0.7);
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tech-tag {
    background: linear-gradient(45deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2));
    color: #667eea;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    transition: all 0.3s ease;
  }

  .tech-tag:hover {
    background: linear-gradient(45deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3));
    transform: scale(1.05);
  }

  .project-links {
    display: flex;
    gap: 1rem;
  }

  .project-link {
    background: transparent;
    border: 1px solid rgba(102,126,234,0.5);
    color: #667eea;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .project-link:hover {
    background: rgba(102,126,234,0.2);
    border-color: #667eea;
    transform: translateY(-2px);
  }

  /* Contact Section */
  .contact-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .contact-text {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.8);
    margin-bottom: 2rem;
    line-height: 1.8;
  }

  .contact-button {
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    border: none;
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .contact-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(102,126,234,0.4);
  }

  /* Footer */
  .footer {
    padding: 2rem;
    text-align: center;
    border-top: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    color: rgba(255,255,255,0.6);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .mobile-menu-btn {
      display: block;
    }

    .about-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .avatar-container {
      width: 250px;
      height: 250px;
    }

    .skills-grid {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); /* Further adjustment for smaller screens */
    }

    .skill-item {
      padding: 0.8rem;
      min-height: 100px;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .social-links {
      gap: 0.5rem;
    }

    .social-link {
      width: 45px;
      height: 45px;
    }

    .section {
      padding: 3rem 1rem;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 1rem;
    }

    .hero-title {
      font-size: 2rem;
    }

    .typewriter-container {
      font-size: 1rem;
    }

    .cta-button {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
    }

    .project-card {
      margin: 0 0.5rem;
    }
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Loading animation */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Utility classes */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
    /* Inline Text Highlight Animation */
  .highlight-text {
    color: #f093fb; /* A vibrant color for the highlight */
    font-weight: bold; /* Make it bold for emphasis */
    text-shadow: 0 0 8px rgba(240, 147, 251, 0.7); /* Subtle glow */
    transition: all 0.3s ease-in-out; /* Smooth transition for any hover effects if added */
    animation: textGlowPulse 2s infinite alternate; /* A subtle pulsing glow */
  }

  @keyframes textGlowPulse {
    0% {
      text-shadow: 0 0 8px rgba(240, 147, 251, 0.7);
    }
    100% {
      text-shadow: 0 0 15px rgba(240, 147, 251, 1);
    }
  }
`

export default function DynamicPortfolio() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
 // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const typewriterTextRef = useRef(null)

  const roles = ["A Web Developer", "A Problem Solver", "A Full-Stack Developer","A Hardworking young boy who chasing his dream"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // Initial typing speed

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Mouse trail and position
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
      
  //     // Optional: Create trail elements
  //     const trailElement = document.createElement('div');
  //     trailElement.className = 'trail';
  //     trailElement.style.left = `${e.clientX}px`;
  //     trailElement.style.top = `${e.clientY}px`;
  //     document.body.appendChild(trailElement);
      
  //     setTimeout(() => {
  //       if (document.body.contains(trailElement)) { // Check if element still exists before trying to remove
  //         document.body.removeChild(trailElement);
  //       }
  //     }, 300); // Matches the new animation duration
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  // Generate stars for universe background
  useEffect(() => {
    const generateStars = () => {
      const backgroundContainer = document.querySelector('.background-container');
      if (!backgroundContainer) return; // Ensure container exists

      const starsContainer = document.createElement('div');
      starsContainer.className = 'stars';

      for (let i = 0; i < 200; i++) { // Adjust number of stars as needed
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 2 + 1}px`; // Random size
        star.style.height = `${Math.random() * 2 + 1}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`; // Random delay
        starsContainer.appendChild(star);
      }
      backgroundContainer.appendChild(starsContainer);
    };

    generateStars(); 

    return () => {
      const starsContainer = document.querySelector('.stars');
      if (starsContainer) {
        starsContainer.remove(); // Clean up stars on unmount
      }
    };
  }, []); // Run only once on mount


  // Scroll handling and section visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Fade-in effect for sections
      const fadeElements = document.querySelectorAll('.section:not(#home) .section-title, .section:not(#home) .about-grid, .section:not(#home) .skills-grid, .section:not(#home) .projects-grid, .section:not(#home) .contact-content');
      fadeElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        if (elementTop < viewportHeight * 0.8) {
          el.classList.add('visible');
        } else {
          el.classList.remove('visible');
        }
      });
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check on load
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Typewriter effect logic
  useEffect(() => {
    let typeEffect;
    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
      setTypingSpeed(100); // Faster deleting speed
      typeEffect = setTimeout(() => {
        setCurrentText(currentRole.substring(0, currentText.length - 1));
      }, typingSpeed);
    } else {
      setTypingSpeed(200); // Normal typing speed
      typeEffect = setTimeout(() => {
        setCurrentText(currentRole.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000); // Pause at end of typing
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => clearTimeout(typeEffect);
  }, [currentText, isDeleting, currentRoleIndex, roles]);


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const skills = [
    { name: "React", icon: <Code size={30} /> },
    { name: "JavaScript", icon: <Code size={30} /> },
    { name: "Node.js", icon: <Code size={30} /> },
    { name: "Java", icon: <Code size={30} /> },
    { name: "MongoDB", icon: <Code size={30} /> },
    { name: "Git & GitHub", icon: <Github size={30} /> },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB featuring real-time inventory management and secure payment processing.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates, team collaboration features, and advanced project tracking capabilities.",
      tech: ["Next.js", "Socket.io", "PostgreSQL", "Redis"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "AI Chat Interface",
      description: "Modern chat interface with AI integration, natural language processing, and context-aware responses for enhanced user experience.",
      tech: ["React", "OpenAI API", "WebSocket", "TypeScript"],
      liveLink: "#",
      githubLink: "#",
    },
  ]

  return (
    <div>
      <style>{styles}</style>
      
      {/* Background */}
      <div className="background-container">
        {/* Stars will be generated here by JavaScript */}
      </div>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Navigation */}
      <nav className={`nav ${isLoaded ? 'loaded' : ''}`}>
        <div className="nav-content">
          <div className="nav-container">
            <div className="logo">Jay Patel-Portfolio</div>
            
            <ul className="nav-links">
              {["home", "about", "skills", "projects", "contact"].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section)
                    }}
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  >
                    {section}
                  </a>
                </li>
              ))}
            </ul>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu open">
            <div className="mobile-menu-links">
              {["home", "about", "skills", "projects", "contact"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(section)
                  }}
                  className="mobile-menu-link"
                >
                  {section}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          <h1 className="hero-title">
            {"Hi, I'm Jay Patel.".split("").map((char, index) => (
              <span key={index} className="hero-letter" style={{ animationDelay: `${index * 0.1}s` }}>
                {char}
              </span>
            ))}
          </h1>
          <div className="typewriter-container">
            <span ref={typewriterTextRef} className="typewriter-text">
              {currentText}
            </span>
            <span className="cursor">|</span>
          </div>
          <div className="social-links">
            <a href="https://github.com/jaypatel131005" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/jaypa" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin size={24} />
            </a>
            <a href="mailto:jaypatelin2005@gmail.com" className="social-link">
              <Mail size={24} />
            </a>
          </div>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="cta-button">
            View My Work <ExternalLink size={20} style={{ marginLeft: '8px' }} />
          </a>
        </div>
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="scroll-indicator">
          <ArrowDown size={30} color="#667eea" />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-title fade-in">
          <h2>About Me</h2>
          <div className="section-divider"></div>
        </div>
        <div className="about-grid fade-in">
          <div className="about-info">
            <div className="about-info">
            <p className="about-text">
              Hello! I'm <span className="highlight-text">JAY PATEL</span>, a dedicated and enthusiastic <span className="highlight-text">WEB DEVELOPER</span> with a passion for creating dynamic and intuitive user experiences.
              My journey into the world of web development began with a fascination for how digital products come to life, and it has since grown into a relentless pursuit of mastering the craft.
            </p>
            <p className="about-text">
              I specialize in <span className="highlight-text">Full Stack Development</span>, crafting responsive and performant applications from front to back.
              I leverage modern frameworks like <span className="highlight-text">REACT</span> for engaging user interfaces, combined with robust back-end technologies such as <span className="highlight-text">Node.js</span> and database like <span className="highlight-text">MongoDB</span>.
            </p>
            <p className="about-text">
              I thrive on learning new technologies and solving complex problems, always eager to <span className="highlight-text">quickly understand and adapt</span> to new challenges.
              When I'm not coding, you can find me exploring new design 9trends, contributing to open-source projects, or diving into a good book.
              I'm always eager to collaborate on exciting projects and contribute to innovative solutions.
            </p>
            {/* You can keep these general badges as they are, or remove if you prefer only inline highlights */}
            <div className="badges">
              <span className="badge"><Code size={16} /> Clean Code</span>
              <span className="badge"><Zap size={16} /> Fast Learner</span>
              <span className="badge"><Heart size={16} /> Passionate</span>
              <span className="badge"><Star size={16} /> Problem Solver</span>
            </div>
          </div>
          </div>
        <div className="avatar-container">
            <div className="avatar-ring"></div>
            <div className="avatar-ring"></div>
            <div className="avatar-ring"></div>
            <div className="avatar">
              {/* Replace 'your-image-url.jpg' with the actual path to your image */}
              <img src="https://avatar.iran.liara.run/public/boy" alt="Your Avatar" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="section-title fade-in">
          <h2>My Skills</h2>
          <div className="section-divider"></div>
        </div>
        <div className="skills-grid fade-in">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              {skill.icon}
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="section-title fade-in">
          <h2>Featured Projects</h2>
          <div className="section-divider"></div>
        </div>
        <div className="projects-grid fade-in">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                {/* Placeholder for project image/icon */}
                <Smartphone size={60} color="rgba(255,255,255,0.3)" /> 
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github size={16} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="section-title fade-in">
          <h2>Get In Touch</h2>
          <div className="section-divider"></div>
        </div>
        <div className="contact-content fade-in">
          <p className="contact-text">
            I'm always open to new opportunities, collaborations, and interesting conversations.
            Whether you have a project in mind, a question, or just want to say hello, feel free to reach out!
          </p>
          <a href="mailto:Jaypatelin2005@gmail.com" className="contact-button">
            Say Hello <Mail size={20} style={{ marginLeft: '8px' }} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Jay Patel. All rights reserved.</p>
      </footer>
    </div>
  )
}