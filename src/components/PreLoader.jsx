import React, { useEffect, useState } from 'react';

// Theme (consistent with your site)
const theme = {
  midnightBlack: '#2C2C2C',
  neonBlue: '#00E5FF',
  heistRed: '#FF4D4D',
  silverLining: '#D9D9D9',
  stealthGray: '#5A5A5A',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

const PreLoader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [heistPhase, setHeistPhase] = useState('INFILTRATING PRICES...');

  // Price tags for comparison simulation
  const priceTags = [
    { id: 1, original: '$99', best: '$49' },
    { id: 2, original: '$150', best: '$89' },
    { id: 3, original: '$75', best: '$59' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setHeistPhase('BEST DEAL SECURED');
          setTimeout(onLoadingComplete, 1000); // Dramatic final reveal
          return 100;
        }
        return prev + 15; // Slower for cinematic effect
      });
    }, 60); // Smooth progression
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  useEffect(() => {
    if (progress < 50) setHeistPhase('COMPARING...');
    else if (progress < 100) setHeistPhase('ANALYZING DEALS...');
  }, [progress]);
  

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: theme.midnightBlack,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      overflow: 'hidden',
      fontFamily: 'monospace',
    }}>
      {/* Background Noise Texture */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `url('https://www.transparenttextures.com/patterns/noisy-grid.png')`,
        opacity: 0.1,
        animation: 'noiseShift 5s infinite linear',
      }} />

      {/* Heist Crew Silhouettes */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        display: 'flex',
        gap: '20px',
      }}>
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} style={{
            width: '40px',
            height: '80px',
            background: `linear-gradient(${theme.heistRed}80, ${theme.stealthGray})`,
            borderRadius: '5px',
            opacity: 0.7,
            animation: `crewMove ${2 + idx * 0.5}s infinite ease-in-out`,
            transform: `translateX(${progress >= 100 ? 50 : 0}px)`,
            transition: 'transform 0.5s ease-in-out',
          }} />
        ))}
      </div>

      {/* Price Tag Grid (Horizontal Accordion Style) */}
      <div style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginBottom: '40px',
      }}>
        {priceTags.map((tag) => (
          <div key={tag.id} style={{
            width: `${progress < 100 ? '100px' : '150px'}`,
            height: '60px',
            background: theme.stealthGray,
            border: `2px solid ${progress >= 100 ? theme.neonBlue : theme.heistRed}80`,
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.silverLining,
            fontSize: '24px',
            fontWeight: 'bold',
            textShadow: `0 0 10px ${theme.neonBlue}80`,
            animation: progress < 100 ? 'priceFlicker 0.3s infinite' : 'none',
            transition: 'width 0.5s ease-in-out, border-color 0.5s ease-in-out',
          }}>
            {progress < 100 ? tag.original : tag.best}
          </div>
        ))}
      </div>

      {/* Horizontal Progress Bar (Harmonium Expansion) */}
      <div style={{
        width: '80%',
        height: '40px',
        background: theme.stealthGray,
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: `0 0 20px ${theme.heistRed}40`,
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: `linear-gradient(to right, ${theme.neonBlue}, ${theme.heistRed})`,
          borderRadius: '20px',
          transition: 'width 0.3s ease-in-out',
          animation: progress < 100 ? 'barExpand 1s infinite' : 'none',
          boxShadow: `0 0 15px ${theme.neonBlue}80`,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: `${progress}%`,
          transform: 'translate(-50%, -50%)',
          color: theme.silverLining,
          fontSize: '18px',
          fontWeight: 'bold',
          textShadow: `0 0 10px ${theme.neonBlue}`,
          animation: progress < 100 ? 'phasePulse 1.5s infinite' : 'none',
        }}>
          {heistPhase}
        </div>
      </div>

      {/* Currency Particles */}
      {progress < 100 && Array.from({ length: 10 }).map((_, idx) => (
        <div key={idx} style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          background: idx % 2 === 0 ? theme.neonBlue : theme.heistRed,
          borderRadius: '50%',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `particleFloat ${2 + Math.random()}s infinite ease-in-out`,
          opacity: 0.8,
        }} />
      ))}
    {progress >= 100 && (
    <div style={{
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '48px',
    color: theme.neonBlue,
    textShadow: `0 0 20px ${theme.neonBlue}aa, 0 0 30px ${theme.heistRed}80`,
    animation: 'revealFlash 1s ease-in-out',
    textTransform: 'uppercase',
  }}>
    BEST DEALS UNLOCKED
  </div>
)}
 {/* Skip Button */}
      <button
        onClick={onLoadingComplete}
        style={{
          position: 'absolute',
          bottom: '20px',
          background: 'transparent',
          border: `2px solid ${theme.silverLining}80`,
          color: theme.silverLining,
          padding: '10px 25px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease-in-out',
          boxShadow: `0 0 10px ${theme.neonBlue}40`,
        }}
        onMouseEnter={(e) => {
          e.target.style.background = theme.heistRed;
          e.target.style.color = theme.midnightBlack;
          e.target.style.boxShadow = `0 0 20px ${theme.heistRed}aa`;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = theme.silverLining;
          e.target.style.boxShadow = `0 0 10px ${theme.neonBlue}40`;
        }}
      >
        Skip Heist
      </button>

      <style>{`
        @keyframes noiseShift {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        @keyframes crewMove {
          0% { transform: translateX(0); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(0); }
        }
        @keyframes priceFlicker {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes barExpand {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(1.05); }
          100% { transform: scaleX(1); }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0.8; }
          50% { transform: translateY(-50px) translateX(${Math.random() * 20 - 10}px); opacity: 0.5; }
          100% { transform: translateY(-100px) translateX(${Math.random() * 20 - 10}px); opacity: 0; }
        }
        @keyframes phasePulse {
          0% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.8; transform: scale(1); }
        }
        @keyframes revealFlash {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default PreLoader;