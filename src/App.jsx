import React, { useState, useEffect } from 'react';

// Simple icon components since you might not have Lucide React installed
const ChevronDown = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const Github = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Linkedin = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const Mail = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m4 4 7.07 7.07a1 1 0 0 0 1.41 0L20 4"/>
    <path d="m20 4-8.5 8.5a1 1 0 0 1-1.41 0L2 4"/>
    <rect width="20" height="16" x="2" y="4" rx="2"/>
  </svg>
);

const ExternalLink = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const Code = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6"/>
    <polyline points="8,6 2,12 8,18"/>
  </svg>
);

const FuturisticPortfolio = () => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const [brokenPieces, setBrokenPieces] = useState([]);

  // Generate initial particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(initialParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + particle.vx;
        const newY = particle.y + particle.vy;
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        
        return {
          ...particle,
          x: newX > screenWidth ? 0 : newX < 0 ? screenWidth : newX,
          y: newY > screenHeight ? 0 : newY < 0 ? screenHeight : newY,
        };
      }));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Create ripple effect
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  // Create soap breaking effect
  const createBreakEffect = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pieces = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      vx: (Math.random() - 0.5) * 400,
      vy: (Math.random() - 0.5) * 400,
      rotation: Math.random() * 360,
      size: Math.random() * 20 + 10,
    }));
    
    setBrokenPieces(prev => [...prev, ...pieces]);
    
    setTimeout(() => {
      setBrokenPieces(prev => prev.filter(p => !pieces.some(piece => piece.id === p.id)));
    }, 2000);
  };

  const skills = [
    { name: 'C++', level: 100 },
    { name: 'Python', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'Java', level: 70 },
    { name: 'Machine Learning', level: 80 },
    { name: 'Data Structures', level: 100 },
    { name: 'MySQL', level: 70 },
    { name: 'Git', level: 85 },
  ];

  const projects = [
    {
      title: 'DialectRewriterAI',
      description: 'Implemented Groq Deepseek R1 Model to crease simple AI that rewrites sentences in many dialects',
      tech: ['Python', 'Groq'],
      link: 'https://github.com/syafino/Dialect-Rewriter-Groq'
    },
    {
      title: 'Oil Price Forecasting with ML',
      description: 'Forecasted oil price direction with a Random Forest model, achieving 100% accuracy using conflict-based features.',
      tech: ['Python', 'Scikit-learn', 'Jupyter', 'Pandas', 'Matplotlib'],
      link: 'https://github.com/syafino/geopolitics-oil-price-model'
    },
    {
      title: 'Full Stack Web Application (OOP)',
      description: 'Full-stack website with C/C++ CGI and JavaScript, featuring a checkers engine and financial tools, hosted on Parkland’s Linux servers.',
      tech: ['C++', 'HTML5', 'CSS', 'JavaScript'],
      link: 'https://remy.parkland.edu/~syunalfian1/personal_projects/checkers_backup/'
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      position: 'relative',
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    },
    particlesContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    },
    particle: {
      position: 'absolute',
      width: '4px',
      height: '4px',
      backgroundColor: '#00bcd4',
      borderRadius: '50%',
      boxShadow: '0 0 10px #00bcd4',
    },
    mouseFollower: {
      position: 'fixed',
      width: '32px',
      height: '32px',
      background: 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, transparent 70%)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 50,
      mixBlendMode: 'difference',
      transition: 'transform 0.1s ease-out',
    },
    heroSection: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '0 1rem',
      zIndex: 10,
      width: '100%'
    },
    heroContent: {
      textAlign: 'center',
      zIndex: 10,
      position: 'relative',
      width: '100%',
      maxWidth: '1200px'
    },
    title: {
      fontSize: 'clamp(3rem, 10vw, 7rem)',
      fontWeight: '900',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0, #e91e63)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem',
      animation: 'pulse 2s ease-in-out infinite',
      lineHeight: '1.1'
    },
    subtitle: {
      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
      marginBottom: '3rem',
      color: '#ccc',
      fontWeight: '300',
      letterSpacing: '0.1em'
    },
    socialContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      marginBottom: '3rem',
      flexWrap: 'wrap'
    },
    socialButton: {
      padding: '1rem',
      borderRadius: '50%',
      background: 'rgba(0, 188, 212, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 188, 212, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      color: '#00bcd4'
    },
    section: {
      padding: '4rem 1rem',
      position: 'relative',
      zIndex: 10,
      width: '100%'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '3rem',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    card: {
      padding: '1.5rem',
      borderRadius: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 188, 212, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.5s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    skillBar: {
      position: 'relative',
      height: '10px',
      backgroundColor: '#374151',
      borderRadius: '5px',
      overflow: 'hidden',
      marginTop: '1rem'
    },
    skillBarFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0)',
      borderRadius: '5px',
      transition: 'width 2s ease-out'
    },
    projectCard: {
      padding: '1.5rem',
      borderRadius: '1rem',
      background: 'rgba(156, 39, 176, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(156, 39, 176, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.5s ease',
      overflow: 'hidden'
    },
    techTag: {
      padding: '0.25rem 0.75rem',
      fontSize: '0.875rem',
      borderRadius: '9999px',
      background: 'rgba(156, 39, 176, 0.2)',
      border: '1px solid rgba(156, 39, 176, 0.3)',
      color: '#c084fc',
      margin: '0.25rem',
      display: 'inline-block'
    },
    contactButton: {
      padding: '1.25rem 2.5rem',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      borderRadius: '9999px',
      background: 'linear-gradient(45deg, #10b981, #3b82f6)',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    ripple: {
      position: 'absolute',
      borderRadius: '50%',
      border: '2px solid #00bcd4',
      pointerEvents: 'none',
      animation: 'ripple 1s ease-out forwards',
    },
    brokenPiece: {
      position: 'absolute',
      background: 'linear-gradient(45deg, #00bcd4, #9c27b0)',
      pointerEvents: 'none',
      animation: 'breakPiece 2s ease-out forwards',
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          @keyframes ripple {
            0% { width: 0; height: 0; opacity: 1; }
            100% { width: 300px; height: 300px; opacity: 0; }
          }
          @keyframes breakPiece {
            0% { opacity: 1; transform: scale(1) rotate(0deg); }
            100% { opacity: 0; transform: scale(0) rotate(720deg) translate(200px, 200px); }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
            40%, 43% { transform: translate3d(0,-30px,0); }
            70% { transform: translate3d(0,-15px,0); }
            90% { transform: translate3d(0,-4px,0); }
          }
          .bounce { animation: bounce 1s infinite; }
        `}
      </style>

      {/* Animated Background Particles */}
      <div style={styles.particlesContainer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              ...styles.particle,
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <div
        style={{
          ...styles.mouseFollower,
          left: mousePos.x - 16,
          top: mousePos.y - 16,
        }}
      />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>SYAFINO YUNALFIAN</h1>
          <p style={styles.subtitle}>FUTURISTIC DEVELOPER</p>
          
          <div style={styles.socialContainer}>
            <a href="https://github.com/syafino" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button
                style={styles.socialButton}
                onClick={createBreakEffect}
                onMouseDown={createRipple}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 0 30px rgba(0, 188, 212, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Github />
                {/* Ripple effects */}
                {ripples.map(ripple => (
                  <div
                    key={ripple.id}
                    style={{
                      ...styles.ripple,
                      left: ripple.x - 150,
                      top: ripple.y - 150,
                      width: 0,
                      height: 0,
                    }}
                  />
                ))}
              </button>
            </a>
            
            <a href="https://www.linkedin.com/in/syafino-yunalfian/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button
                style={styles.socialButton}
                onClick={createBreakEffect}
                onMouseDown={createRipple}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 0 30px rgba(0, 188, 212, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Linkedin />
              </button>
            </a>
            
            <a href="mailto:syafino2005@gmail.com" style={{ textDecoration: 'none' }}>
              <button
                style={styles.socialButton}
                onClick={createBreakEffect}
                onMouseDown={createRipple}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 0 30px rgba(0, 188, 212, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Mail />
              </button>
            </a>
          </div>

          <div className="bounce" style={{ color: '#00bcd4' }}>
            <ChevronDown />
          </div>
        </div>

        {/* Broken pieces animation */}
        {brokenPieces.map(piece => (
          <div
            key={piece.id}
            style={{
              ...styles.brokenPiece,
              left: piece.x,
              top: piece.y,
              width: piece.size,
              height: piece.size,
              transform: `rotate(${piece.rotation}deg)`,
            }}
          />
        ))}
      </section>

      {/* Skills Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>NEURAL PATHWAYS</h2>
        <div style={styles.grid}>
          {skills.map((skill, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={createBreakEffect}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) rotateY(5deg)';
                e.target.style.borderColor = 'rgba(0, 188, 212, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotateY(0deg)';
                e.target.style.borderColor = 'rgba(0, 188, 212, 0.2)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ 
                  padding: '0.75rem', 
                  borderRadius: '0.5rem', 
                  background: 'rgba(0, 188, 212, 0.2)', 
                  marginRight: '1rem',
                  color: '#00bcd4'
                }}>
                  <Code />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{skill.name}</h3>
              </div>
              
              <div style={styles.skillBar}>
                <div
                  style={{
                    ...styles.skillBarFill,
                    width: `${skill.level}%`,
                    animationDelay: `${index * 0.2}s`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section style={styles.section}>
        <h2 style={{
          ...styles.sectionTitle,
          background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>PROJECTS</h2>
        <div style={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={index}
              style={styles.projectCard}
              onClick={createBreakEffect}
              onMouseEnter={(e) => {
                e.target.style.transform = 'perspective(1000px) rotateX(-5deg) translateY(-10px)';
                e.target.style.borderColor = 'rgba(156, 39, 176, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
                e.target.style.borderColor = 'rgba(156, 39, 176, 0.2)';
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {project.title}
              </h3>
              <p style={{ color: '#ccc', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                {project.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} style={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
              
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'none' }}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#c084fc',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#fff';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#c084fc';
                    e.target.style.transform = 'translateX(0px)';
                  }}
                >
                  <span style={{ marginRight: '0.5rem' }}>Explore</span>
                  <ExternalLink />
                </button>
              </a>

            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.section}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
          <h2 style={{
            ...styles.sectionTitle,
            background: 'linear-gradient(45deg, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>INITIATE CONTACT</h2>
          <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '3rem' }}>
            Ready to build the future together?
          </p>
          
          <a href="mailto:syafino2005@gmail.com" style={{ textDecoration: 'none' }}>
            <button
              style={styles.contactButton}
              onClick={createBreakEffect}
              onMouseDown={createRipple}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              CONNECT NOW
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default FuturisticPortfolio;