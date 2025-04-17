import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

// Enhanced Deal Heist Theme Palette
const theme = {
  midnightBlack: '#2C2C2C',
  neonBlue: '#00E5FF',
  heistRed: '#FF4D4D',
  silverLining: '#D9D9D9',
  stealthGray: '#5A5A5A',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

// Navbar Component: The Heist Control Panel
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact', path: '#' },
    { label: 'Reviews', path: '#' },
  ];

  return (
    <nav style={{
      background: isScrolled ? `${theme.midnightBlack}cc` : 'transparent',
      padding: '20px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      boxSizing: 'border-box',
      transition: 'background 0.8s ease-in-out',
    }}>
      <h1
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: window.innerWidth <= 768 ? '36px' : '48px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          margin: 0,
          cursor: 'pointer',
          color: theme.neonBlue,
          textShadow: `
            0 0 5px ${theme.neonBlue},
            0 0 10px ${theme.neonBlue}80,
            0 0 15px ${theme.neonBlue}50
          `,
          position: 'relative',
          animation: 'neonPulse 2s infinite alternate',
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          e.target.style.textShadow = `
            0 0 10px ${theme.neonBlue},
            0 0 20px ${theme.neonBlue}aa,
            0 0 25px ${theme.heistRed}80
          `;
          e.target.style.color = theme.heistRed;
        }}
        onMouseLeave={(e) => {
          e.target.style.textShadow = `
            0 0 5px ${theme.neonBlue},
            0 0 10px ${theme.neonBlue}80,
            0 0 15px ${theme.neonBlue}50
          `;
          e.target.style.color = theme.neonBlue;
        }}
      >
        PRICIFY
      </h1>
      <div style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
      }}>
        {menuItems.map((item, index) => (
          <span
            key={item.label}
            style={{
              color: theme.silverLining,
              fontFamily: '"Courier New", monospace',
              fontSize: window.innerWidth <= 768 ? '16px' : '20px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              animation: `panelScan ${index * 0.5 + 2}s infinite linear`,
              padding: '5px 15px',
              borderRadius: '5px',
              background: `${theme.stealthGray}20`,
              textShadow: `0 0 5px ${theme.neonBlue}40`,
            }}
            onClick={() => navigate(item.path)}
            onMouseEnter={(e) => {
              e.target.style.color = theme.neonBlue;
              e.target.style.textShadow = `0 0 10px ${theme.neonBlue}, 0 0 15px ${theme.neonBlue}80`;
              e.target.style.transform = 'scale(1.1) translateY(-2px)';
              e.target.style.background = `${theme.neonBlue}20`;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = theme.silverLining;
              e.target.style.textShadow = `0 0 5px ${theme.neonBlue}40`;
              e.target.style.transform = 'scale(1) translateY(0)';
              e.target.style.background = `${theme.stealthGray}20`;
            }}
          >
            {item.label}
            <span
              style={{
                position: 'absolute',
                bottom: '-2px',
                left: 0,
                width: '0',
                height: '2px',
                background: theme.neonBlue,
                transition: 'width 0.3s ease-in-out',
              }}
            />
          </span>
        ))}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200px',
            height: '1px',
            background: `linear-gradient(to right, transparent, ${theme.heistRed}80, transparent)`,
            transform: 'translate(-50%, -50%)',
            animation: 'controlPulse 3s infinite ease-in-out',
            zIndex: -1,
          }}
        />
      </div>
    </nav>
  );
};

// Hero Section: The Heist Plan
const HeroSection = ({ currentSlide, slides }) => {
  return (
    <div style={{
      height: '90vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: `${slides[currentSlide].background}, url('https://www.transparenttextures.com/patterns/grid-me.png')`,
      backgroundBlendMode: 'overlay',
      position: 'relative',
      animation: 'heistFade 2.5s ease-in-out',
      transition: 'background 1.5s ease-in-out',
    }}>
      <h1 style={{
        color: theme.silverLining,
        fontSize: window.innerWidth <= 768 ? '40px' : '72px',
        fontWeight: '800',
        textShadow: `0 0 10px ${theme.neonBlue}80`,
        animation: 'alertFlash 2s ease-in-out',
        lineHeight: '1.1',
        transition: 'text-shadow 0.8s ease-in-out',
      }}>
        {slides[currentSlide].tagline}
      </h1>
      <button
        onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          background: theme.neonBlue,
          color: theme.midnightBlack,
          border: `2px solid ${theme.heistRed}aa`,
          padding: window.innerWidth <= 768 ? '12px 30px' : '15px 50px',
          borderRadius: '25px',
          fontSize: window.innerWidth <= 768 ? '18px' : '22px',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          boxShadow: `0 0 10px ${theme.neonBlue}50`,
        }}
        onMouseEnter={(e) => {
          e.target.style.background = theme.heistRed;
          e.target.style.color = theme.silverLining;
          e.target.style.boxShadow = `0 0 20px ${theme.heistRed}aa`;
          e.target.style.transform = 'scale(1.05) translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = theme.neonBlue;
          e.target.style.color = theme.midnightBlack;
          e.target.style.boxShadow = `0 0 10px ${theme.neonBlue}50`;
          e.target.style.transform = 'scale(1) translateY(0)';
        }}
      >
        EXPLORE CATEGORIES 
      </button>
      <div style={{
        marginTop: '30px',
        color: theme.silverLining,
        fontSize: '18px',
        textShadow: `0 0 5px ${theme.neonBlue}50`,
        transition: 'text-shadow 0.8s ease-in-out',
      }}>
        ↓ Infiltrate the Deals ↓
      </div>
    </div>
  );
};

// New CategoryCard Component: The Target Vault
const CategoryCard = ({ title, imageUrl, position }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false); // For click animation
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => {
      const routeMap = {
        'Shoes': '/category/shoes',
        'Smartphone': '/category/smartphone',
        'T-Shirt': '/category/t-shirt',
        'Jeans': '/category/jeans'
      };
      const path = routeMap[title];
      if (path) navigate(path);
      setIsActive(false);
    }, 600); // Matches the lockBreak animation duration
  };

  return (
    <div
      ref={cardRef}
      style={{
        width: '220px',
        height: '220px',
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 20}px)`,
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        cursor: 'pointer',
        animation: isActive ? 'lockBreak 0.6s ease-in-out' : 'none',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (isVisible) {
          e.target.querySelector('.vault-core').style.borderColor = theme.heistRed;
          e.target.querySelector('.vault-core').style.boxShadow = `0 0 30px ${theme.heistRed}aa`;
          e.target.querySelector('.vault-title').style.color = theme.neonBlue;
          e.target.querySelector('.scan-ring').style.opacity = '1';
          e.target.querySelector('.scan-ring').style.transform = 'scale(1.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (isVisible) {
          e.target.querySelector('.vault-core').style.borderColor = theme.neonBlue;
          e.target.querySelector('.vault-core').style.boxShadow = `0 0 15px ${theme.neonBlue}80`;
          e.target.querySelector('.vault-title').style.color = theme.silverLining;
          e.target.querySelector('.scan-ring').style.opacity = '0';
          e.target.querySelector('.scan-ring').style.transform = 'scale(1)';
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${title} category`}
    >
      <div
        className="vault-core"
        style={{
          width: '100%',
          height: '100%',
          background: `url(${imageUrl}) center/cover`,
          borderRadius: '50%',
          border: `3px solid ${theme.neonBlue}`,
          boxShadow: `0 0 15px ${theme.neonBlue}80`,
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(44, 44, 44, 0.7)',
        }}
      >
        {/* Scanning Ring */}
        <div
          className="scan-ring"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `2px dashed ${theme.neonBlue}`,
            opacity: 0,
            transform: 'scale(1)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            animation: 'scanRotate 3s infinite linear',
          }}
        />
        {/* Title */}
        <h3
          className="vault-title"
          style={{
            color: theme.silverLining,
            fontSize: '22px',
            fontWeight: '700',
            textShadow: `0 0 8px ${theme.neonBlue}80`,
            margin: 0,
            padding: '0 15px',
            textAlign: 'center',
            transition: 'color 0.5s ease-in-out',
            zIndex: 1,
            wordBreak: 'break-word',
            maxWidth: '90%',
          }}
        >
          {title}
        </h3>
        {/* Activation Overlay */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle, ${theme.heistRed}20, transparent 70%)`,
            opacity: isActive ? 0.8 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      </div>
    </div>
  );
};

// Footer: The Getaway
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{
      background: theme.midnightBlack,
      padding: '40px 5%',
      textAlign: 'center',
      color: theme.silverLining,
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      boxShadow: `0 -3px 10px ${theme.shadow}`,
      transition: 'background 0.8s ease-in-out',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '25px',
        marginBottom: '20px',
      }}>
        {[
          { label: 'About Us', path: '/about-us' },
          { label: 'Contact', path: '#' },
          { label: 'Privacy Policy', path: '#' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              navigate(item.path);
            }}
            style={{
              color: theme.silverLining,
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              background: `${theme.neonBlue}22`,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `${theme.neonBlue}66`;
              e.target.style.boxShadow = `0 0 15px ${theme.neonBlue}80`;
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `${theme.neonBlue}22`;
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
        © {new Date().getFullYear()} PRICIFY. Escape with Epic Savings.
      </p>
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        width: '80px',
        height: '1px',
        background: `linear-gradient(to right, transparent, ${theme.heistRed}80, transparent)`,
        animation: 'laserSweep 4s infinite ease-in-out',
      }} />
    </footer>
  );
};

// Homepage Component
const HomePage = () => {
  const initialCategories = [
    { title: 'Shoes', imageUrl: 'https://via.placeholder.com/150?text=Shoes' },
    { title: 'Smartphone', imageUrl: 'https://via.placeholder.com/150?text=Smartphone' },
    { title: 'T-Shirt', imageUrl: 'https://via.placeholder.com/150?text=T-Shirt' },
    { title: 'Jeans', imageUrl: 'https://via.placeholder.com/150?text=Jeans' },
  ];

  const [categories] = useState(initialCategories);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const slides = [
    {
      tagline: 'Amazon vs Flipkart? We Decide!',
      background: `radial-gradient(${theme.midnightBlack}, ${theme.neonBlue}cc)`,
    },
    {
      tagline: 'Your Deal Detector',
      background: `radial-gradient(${theme.midnightBlack}, ${theme.heistRed}cc)`,
    },
    {
      tagline: 'Price Battle, You Win!',
      background: `radial-gradient(${theme.midnightBlack}, ${theme.silverLining}cc)`,
    },
  ];

  useEffect(() => {
    const loadTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadTimer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(loadTimer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: theme.midnightBlack,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        flexDirection: 'column',
      }}>
        <div style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: theme.stealthGray,
          border: `4px solid ${theme.neonBlue}`,
          boxShadow: `0 0 20px ${theme.neonBlue}80`,
          position: 'relative',
          overflow: 'hidden',
          animation: 'vaultPulse 2s infinite ease-in-out',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: theme.silverLining,
            fontSize: '24px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            textShadow: `0 0 10px ${theme.neonBlue}`,
            animation: progress < 100 ? 'spinTumbler 0.5s infinite linear' : 'none',
          }}>
            {progress < 100 ? 'CRACKING...' : 'ACCESS GRANTED'}
          </div>
        </div>
        <div style={{
          width: '300px',
          height: '10px',
          background: theme.stealthGray,
          marginTop: '40px',
          position: 'relative',
          borderRadius: '5px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: `linear-gradient(to right, ${theme.heistRed}, ${theme.neonBlue})`,
            transition: 'width 0.3s ease-in-out',
            boxShadow: `0 0 15px ${theme.neonBlue}80`,
          }} />
        </div>
        <button
          onClick={() => setIsLoading(false)}
          style={{
            marginTop: '20px',
            background: 'transparent',
            border: `1px solid ${theme.silverLining}`,
            color: theme.silverLining,
            padding: '5px 15px',
            borderRadius: '15px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '14px',
            transition: 'all 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = `${theme.neonBlue}20`;
            e.target.style.boxShadow = `0 0 10px ${theme.neonBlue}50`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.boxShadow = 'none';
          }}
        >
          Skip
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      background: `url('https://www.transparenttextures.com/patterns/grid-me.png'), ${theme.midnightBlack}`,
      fontFamily: 'monospace',
      position: 'relative',
      transition: 'background 1.5s ease-in-out',
    }}>
      <Navbar />
      <div style={{ height: '20px' }} /> {/* Spacer */}
      <HeroSection currentSlide={currentSlide} slides={slides} />
      <div id="categories" style={{
        padding: '80px 5%',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        background: `radial-gradient(circle at center, ${theme.stealthGray}20, ${theme.midnightBlack} 70%)`,
        boxShadow: `inset 0 0 50px ${theme.shadow}`,
      }}>
        <h2 style={{
          color: theme.silverLining,
          fontSize: window.innerWidth <= 768 ? '36px' : '48px',
          marginBottom: '60px',
          fontWeight: '700',
          textShadow: `0 0 10px ${theme.neonBlue}80`,
          animation: 'heistGlow 3s infinite ease-in-out',
        }}>
          CATEGORIES 
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          background: `linear-gradient(45deg, ${theme.neonBlue}10, ${theme.heistRed}10)`,
          borderRadius: '15px',
          boxShadow: `0 0 20px ${theme.neonBlue}40`,
        }}>
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              imageUrl={category.title}
              position={index}
            />
          ))}
        </div>
      </div>
      <Footer />
      <style>{`
        @keyframes neonPulse {
          0% { text-shadow: 0 0 5px ${theme.neonBlue}, 0 0 10px ${theme.neonBlue}80, 0 0 15px ${theme.neonBlue}50; }
          100% { text-shadow: 0 0 10px ${theme.neonBlue}, 0 0 15px ${theme.neonBlue}aa, 0 0 20px ${theme.neonBlue}60; }
        }
        @keyframes panelScan {
          0% { text-shadow: 0 0 5px ${theme.neonBlue}40; }
          50% { text-shadow: 0 0 10px ${theme.neonBlue}60; }
          100% { text-shadow: 0 0 5px ${theme.neonBlue}40; }
        }
        @keyframes controlPulse {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes alertFlash {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heistFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes heistGlow {
          0% { text-shadow: 0 0 10px ${theme.neonBlue}80; }
          50% { text-shadow: 0 0 15px ${theme.neonBlue}aa; }
          100% { text-shadow: 0 0 10px ${theme.neonBlue}80; }
        }
        @keyframes vaultPulse {
          0% { box-shadow: 0 0 20px ${theme.neonBlue}80; }
          50% { box-shadow: 0 0 30px ${theme.neonBlue}aa; }
          100% { box-shadow: 0 0 20px ${theme.neonBlue}80; }
        }
        @keyframes spinTumbler {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes scanRotate {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        @keyframes lockBreak {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes laserSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (max-width: 768px) {
          .categories-container {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;