import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Money Heist Theme Palette (matching HomePage)
const theme = {
  midnightBlack: '#2C2C2C',
  neonBlue: '#00E5FF',
  heistRed: '#FF4D4D',
  silverLining: '#D9D9D9',
  stealthGray: '#5A5A5A',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

// Utility function for responsive values
const getResponsiveValue = (mobile, desktop) => 
  window.innerWidth <= 768 ? mobile : desktop;

// Product Card Component with Heist Styling
const ProductCard = ({ name, imageUrl }) => (
  <div style={{
    background: `${theme.stealthGray}cc`,
    borderRadius: '50%',
    padding: '20px',
    boxShadow: `0 6px 20px ${theme.shadow}`,
    transition: 'all 0.5s ease-in-out',
    cursor: 'pointer',
    border: `2px solid ${theme.neonBlue}aa`,
    position: 'relative',
    overflow: 'hidden',
    width: getResponsiveValue('180px', '220px'),
    height: getResponsiveValue('180px', '220px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'targetPulse 3s infinite ease-in-out',
    boxSizing: 'border-box',
  }}
  onMouseEnter={(e) => {
    const target = e.currentTarget;
    target.style.transform = 'translateY(-10px) scale(1.05) rotate(5deg)';
    target.style.borderColor = theme.heistRed;
    target.style.boxShadow = `0 12px 40px ${theme.neonBlue}80`;
    target.querySelector('img').style.transform = 'scale(1.1)';
    target.querySelector('h3').style.color = theme.heistRed;
    target.querySelector('button').style.background = theme.heistRed;
    target.querySelector('button').style.color = theme.silverLining;
  }}
  onMouseLeave={(e) => {
    const target = e.currentTarget;
    target.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    target.style.borderColor = theme.neonBlue;
    target.style.boxShadow = `0 6px 20px ${theme.shadow}`;
    target.querySelector('img').style.transform = 'scale(1)';
    target.querySelector('h3').style.color = theme.silverLining;
    target.querySelector('button').style.background = theme.neonBlue;
    target.querySelector('button').style.color = theme.midnightBlack;
  }}>
    <img
      src={imageUrl}
      alt={name}
      loading="lazy"
      style={{
        width: '80%',
        height: '80%',
        objectFit: 'cover',
        borderRadius: '50%',
        marginBottom: '10px',
        transition: 'transform 0.5s ease-in-out',
        border: `1px solid ${theme.neonBlue}aa`,
      }}
    />
    <h3 style={{
      color: theme.silverLining,
      margin: '0 0 8px',
      fontSize: getResponsiveValue('16px', '18px'),
      fontWeight: '600',
      letterSpacing: '0.5px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textShadow: `0 0 5px ${theme.neonBlue}80`,
      transition: 'color 0.3s ease-in-out',
      fontFamily: '"Courier New", monospace',
    }}>{name}</h3>
    <button style={{
      background: theme.neonBlue,
      color: theme.midnightBlack,
      border: `1px solid ${theme.heistRed}aa`,
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: getResponsiveValue('12px', '14px'),
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.4s ease-in-out',
      boxShadow: `0 0 5px ${theme.neonBlue}50`,
      fontFamily: '"Courier New", monospace',
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'scale(1.1)';
      e.target.style.boxShadow = `0 4px 15px ${theme.heistRed}80`;
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'scale(1)';
      e.target.style.boxShadow = `0 0 5px ${theme.neonBlue}50`;
    }}
    onClick={() => console.log(`Compare ${name}`)}
    >
      Crack the Deal
    </button>
    <div style={{
      position: 'absolute',
      width: '120%',
      height: '120%',
      top: '-10%',
      left: '-10%',
      borderRadius: '50%',
      border: `1px dashed ${theme.neonBlue}aa`,
      animation: 'vaultSpin 10s linear infinite',
      opacity: 0.5,
      zIndex: 0,
      transition: 'border-color 0.4s ease-in-out',
    }}
    onMouseEnter={(e) => (e.target.style.borderColor = theme.heistRed)}
    onMouseLeave={(e) => (e.target.style.borderColor = `${theme.neonBlue}aa`)}
    />
  </div>
);

const TShirt = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const productsData = [
    { name: 'GRAPHIC T-SHIRT', imageUrl: 'https://via.placeholder.com/150?text=Graphic+T-Shirt' },
    { name: 'PLAIN T-SHIRT', imageUrl: 'https://via.placeholder.com/150?text=Plain+T-Shirt' },
    { name: 'POLO T-SHIRT', imageUrl: 'https://via.placeholder.com/150?text=Polo+T-Shirt' },
    { name: 'V-NECK T-SHIRT', imageUrl: 'https://via.placeholder.com/150?text=V-Neck+T-Shirt' },
  ];

  const filteredProducts = productsData
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      overflowX: 'hidden',
      background: `url('https://www.transparenttextures.com/patterns/grid-me.png'), ${theme.midnightBlack}`,
      fontFamily: '"Courier New", monospace',
      boxSizing: 'border-box',
      padding: getResponsiveValue('20px 5%', '50px 5%'),
      position: 'relative',
      animation: 'heistFade 1.5s ease-in-out',
    }}>
      {/* Heist Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at center, ${theme.neonBlue}10, transparent 70%)`,
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: getResponsiveValue('column', 'row'),
          justifyContent: 'space-between',
          alignItems: getResponsiveValue('flex-start', 'center'),
          gap: getResponsiveValue('15px', '0'),
          marginBottom: getResponsiveValue('30px', '40px'),
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: theme.neonBlue,
              color: theme.midnightBlack,
              border: `2px solid ${theme.heistRed}aa`,
              padding: getResponsiveValue('10px 25px', '15px 50px'),
              borderRadius: '20px',
              fontSize: getResponsiveValue('16px', '22px'),
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.5s ease-in-out',
              boxShadow: `0 0 10px ${theme.neonBlue}50`,
              width: getResponsiveValue('100%', 'auto'),
              position: 'relative',
              fontFamily: '"Courier New", monospace',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.heistRed;
              e.target.style.transform = 'scale(1.05) rotate(3deg)';
              e.target.style.boxShadow = `0 0 20px ${theme.heistRed}80`;
              e.target.style.color = theme.silverLining;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = theme.neonBlue;
              e.target.style.transform = 'scale(1) rotate(0deg)';
              e.target.style.boxShadow = `0 0 10px ${theme.neonBlue}50`;
              e.target.style.color = theme.midnightBlack;
            }}
          >
            Back to HQ
          </button>
          <h1 style={{
            color: theme.silverLining,
            fontSize: getResponsiveValue('28px', '44px'),
            fontWeight: '700',
            textShadow: `0 0 8px ${theme.neonBlue}80`,
            margin: 0,
            letterSpacing: '1px',
            textAlign: getResponsiveValue('center', 'left'),
            width: getResponsiveValue('100%', 'auto'),
            transition: 'all 0.5s ease-in-out',
            animation: 'neonPulse 2s infinite alternate',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.textShadow = `0 0 15px ${theme.heistRed}aa`;
            e.target.style.color = theme.heistRed;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.textShadow = `0 0 8px ${theme.neonBlue}80`;
            e.target.style.color = theme.silverLining;
          }}>
            T-SHIRT VAULT
          </h1>
          <select
            value={sortOption}
            onChange={handleSortChange}
            style={{
              background: `${theme.stealthGray}cc`,
              color: theme.silverLining,
              padding: getResponsiveValue('10px 20px', '15px 30px'),
              border: `2px solid ${theme.neonBlue}`,
              borderRadius: '20px',
              fontSize: getResponsiveValue('14px', '18px'),
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: `0 0 10px ${theme.neonBlue}50`,
              transition: 'all 0.5s ease-in-out',
              width: getResponsiveValue('100%', 'auto'),
              fontFamily: '"Courier New", monospace',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.neonBlue;
              e.target.style.borderColor = theme.heistRed;
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = `0 0 15px ${theme.neonBlue}80`;
              e.target.style.color = theme.midnightBlack;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `${theme.stealthGray}cc`;
              e.target.style.borderColor = theme.neonBlue;
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = `0 0 10px ${theme.neonBlue}50`;
              e.target.style.color = theme.silverLining;
            }}
          >
            <option value="default">Sort Intel</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>

        {/* Search Bar */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          marginBottom: getResponsiveValue('30px', '50px'),
          position: 'relative',
          animation: 'heistGlow 3s infinite ease-in-out',
        }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Scan Heist Targets..."
            style={{
              width: '100%',
              padding: getResponsiveValue('12px 40px 12px 15px', '18px 50px 18px 25px'),
              borderRadius: '25px',
              border: `2px solid ${theme.neonBlue}`,
              background: `${theme.midnightBlack}ee`,
              fontSize: getResponsiveValue('14px', '18px'),
              color: theme.silverLining,
              boxShadow: `0 0 10px ${theme.neonBlue}50`,
              outline: 'none',
              transition: 'all 0.5s ease-in-out',
              fontWeight: '500',
              boxSizing: 'border-box',
              fontFamily: '"Courier New", monospace',
              textShadow: `0 0 5px ${theme.neonBlue}40`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.heistRed;
              e.target.style.boxShadow = `0 0 15px ${theme.heistRed}80`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.neonBlue;
              e.target.style.boxShadow = `0 0 10px ${theme.neonBlue}50`;
            }}
            onMouseEnter={(e) => {
              if (document.activeElement !== e.target) {
                e.target.style.borderColor = theme.heistRed;
                e.target.style.transform = 'scale(1.03)';
                e.target.style.boxShadow = `0 0 12px ${theme.heistRed}80`;
              }
            }}
            onMouseLeave={(e) => {
              if (document.activeElement !== e.target) {
                e.target.style.borderColor = theme.neonBlue;
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = `0 0 10px ${theme.neonBlue}50`;
              }
            }}
          />
          <span style={{
            position: 'absolute',
            right: getResponsiveValue('10px', '15px'),
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: getResponsiveValue('20px', '24px'),
            color: theme.neonBlue,
            transition: 'all 0.5s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-50%) scale(1.3) rotate(15deg)';
            e.target.style.color = theme.heistRed;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(-50%) scale(1)';
            e.target.style.color = theme.neonBlue;
          }}
          >
            🔍
          </span>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'flex',
          flexWrap: getResponsiveValue('nowrap', 'wrap'),
          justifyContent: 'center',
          gap: getResponsiveValue('20px', '30px'),
          width: '100%',
          overflowX: getResponsiveValue('auto', 'hidden'),
          padding: getResponsiveValue('0 5px', '0 10px'),
          boxSizing: 'border-box',
          transition: 'all 0.5s ease-in-out',
          perspective: '1000px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateZ(10px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateZ(0)';
        }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                imageUrl={product.imageUrl}
              />
            ))
          ) : (
            <p style={{
              color: theme.silverLining,
              fontSize: getResponsiveValue('18px', '24px'),
              textAlign: 'center',
              width: '100%',
              opacity: 0.9,
              textShadow: `0 0 5px ${theme.neonBlue}80`,
              animation: 'heistFade 1s ease-out',
              padding: '20px',
              transition: 'all 0.5s ease-in-out',
              fontFamily: '"Courier New", monospace',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.opacity = '1';
              e.target.style.textShadow = `0 0 10px ${theme.heistRed}aa`;
              e.target.style.color = theme.heistRed;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.opacity = '0.9';
              e.target.style.textShadow = `0 0 5px ${theme.neonBlue}80`;
              e.target.style.color = theme.silverLining;
            }}>
              No targets acquired in this vault.
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes heistFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes targetPulse {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        @keyframes vaultSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes heistGlow {
          0% { box-shadow: 0 0 10px ${theme.neonBlue}80; }
          50% { box-shadow: 0 0 15px ${theme.neonBlue}aa; }
          100% { box-shadow: 0 0 10px ${theme.neonBlue}80; }
        }
        @keyframes neonPulse {
          0% { text-shadow: 0 0 5px ${theme.neonBlue}, 0 0 10px ${theme.neonBlue}80, 0 0 15px ${theme.neonBlue}50; }
          100% { text-shadow: 0 0 10px ${theme.neonBlue}, 0 0 15px ${theme.neonBlue}aa, 0 0 20px ${theme.neonBlue}60; }
        }
        @media (max-width: 768px) {
          div[style*="flex-wrap: nowrap"] {
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          div[style*="flex-wrap: nowrap"]::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default TShirt;