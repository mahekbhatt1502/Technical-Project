import React, { useState, useEffect } from 'react';

// Reusable FeedItem component
const FeedItem = ({ message, timestamp }) => (
  <div style={{
    padding: '8px',
    backgroundColor: 'rgba(44, 44, 44, 0.5)',
    borderRadius: '4px',
    animation: 'pulseOnce 1.5s ease-in-out',
    width: '300px',
  }}>
    <p style={{ margin: 0, fontSize: '12px', color: '#D9D9D9' }}>{message}</p>
    <span style={{ fontSize: '10px', color: '#00E5FF' }}>{timestamp}</span>
  </div>
);

const AboutUs = () => {
  const [savedAmount, setSavedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [feedItems] = useState([
    { id: 1, message: "Cracked a 30% discount on smartphones!", timestamp: "2025-04-16 10:15" },
    { id: 2, message: "Unlocked 500 off jeans deal!", timestamp: "2025-04-16 09:45" },
    { id: 3, message: "Broke into a 25% shoe sale vault!", timestamp: "2025-04-16 09:00" },
  ]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    // Savings animation
    const target = 1250000;
    const duration = 3000;
    const start = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      setSavedAmount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);
  return (
    <div style={{
      backgroundColor: '#2C2C2C',
      color: '#D9D9D9',
      fontFamily: 'monospace',
      position: 'relative',
      overflow: 'hidden',
      height: '800px', // Fixed height to contain all content without scrolling
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Loading State */}
      {isLoading ? (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2C2C2C',
          animation: 'fadeOut 1s ease-in-out forwards',
          zIndex: 20,
        }}>
          <div style={{
            fontSize: '24px',
            color: '#00E5FF',
            animation: 'pulse 1.5s infinite alternate',
          }}>
            Loading Heist...
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header style={{
            position: 'relative',
            zIndex: 10,
            padding: '10px',
            textAlign: 'center',
            animation: 'slideIn 0.8s ease-out',
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#00E5FF',
              textShadow: '0 0 8px #00E5FF',
              animation: 'pulse 2s infinite alternate',
              margin: '5px 0',
            }}>
              PRICIFY
            </h1>
            <p style={{
              fontSize: '16px',
              marginTop: '5px',
              color: '#D9D9D9',
              textShadow: '0 0 4px #00E5FF',
            }}>
              Your Partners in Smart Shopping
            </p>
          </header>

          {/* Origin Story */}
          <section style={{
            position: 'relative',
            zIndex: 10,
            width: '80%',
            margin: '10px auto',
            padding: '10px',
            backgroundColor: 'rgba(90, 90, 90, 0.2)',
            borderRadius: '6px',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
            animation: 'fadeIn 0.5s ease-out',
            maxWidth: 'auto',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#FF4D4D',
              marginBottom: '10px',
            }}>
              OUR STORY
            </h2>
            <p style={{ fontSize: '12px' }}>
              We started Pricify with one simple goal: help you save money.
              Tired of overpaying for things online? So were we.
              That’s why we built a platform that compares prices across websites, so you always find the best deal – no more searching, no more guessing.
              With smart technology and a little bit of cleverness, we uncover hidden savings and bring them right to your screen.
            </p>
          </section>

          {/* Crew Profiles */}
          <section style={{
            position: 'relative',
            zIndex: 10,
            margin: '10px auto',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-around',
            width: '60%',
          }}>
            {[
              'Smart Price Finder',
              'Deal Hunter',
              'Smart Deal Recommender',
            ].map((name, index) => (
              <div
                key={index}
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#00E5FF',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => { e.target.style.color = '#FF4D4D'; }}
                onMouseLeave={(e) => { e.target.style.color = '#00E5FF'; }}
              >
                {name}
              </div>
            ))}
          </section>

          {/* Mission and Progress */}
          <section style={{
            position: 'relative',
            zIndex: 10,
            margin: '10px auto',
            padding: '10px',
            textAlign: 'center',
            width: '80%',
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#FF4D4D',
              marginBottom: '10px',
            }}>
              CUSTOMERS SERVED
            </h2>
            <p style={{ fontSize: '12px', marginBottom: '10px' }}>
              Globally reached users till date
            </p>
            <div style={{
              width: '100%',
              backgroundColor: '#5A5A5A',
              height: '15px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(to right, #FF4D4D, #00E5FF)',
                width: `${(savedAmount / 1250000) * 100}%`,
                transition: 'width 3s ease-in-out',
              }} />
            </div>
            <p style={{ fontSize: '14px', marginTop: '5px' }}>
              Our Family : {savedAmount.toLocaleString()} and counting...
            </p>
          </section>

          {/* Live Heist Feed */}
          <section style={{
            position: 'relative',
            zIndex: 10,
            margin: '10px auto',
            padding: '10px',
            backgroundColor: 'rgba(90, 90, 90, 0.2)',
            borderRadius: '6px',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
            width: '80%',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#FF4D4D',
              marginBottom: '5px',
            }}>
              Milestones Reached
            </h2>
            <div style={{ display: 'flex', gap: '5px' }}>
              {feedItems.map((item) => (
                <FeedItem key={item.id} {...item} />
              ))}
            </div>
          </section>
          {/* CSS Animations */}
          <style>
            {`
              @keyframes pulse {
                0% { text-shadow: 0 0 5px #00E5FF, 0 0 8px rgba(0, 229, 255, 0.8); }
                100% { text-shadow: 0 0 8px #00E5FF, 0 0 15px rgba(0, 229, 255, 0.8); }
              }
              @keyframes laserSweep {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              @keyframes pulseOnce {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes slideIn {
                from { opacity: 0; transform: translateY(-30px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
              }
            `}
          </style>
        </>
      )}
    </div>
  );
};

export default AboutUs;