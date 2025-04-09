import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from './supabase.js';

// Enhanced Theme Palette
const theme = {
  darkGray: '#2C2C2C',
  subtleCyan: '#A3D8F4',
  accentRed: '#CC3333',
  silver: '#D9D8D9', // Slightly adjusted silver for contrast
  shadow: 'rgba(0, 0, 0, 0.15)', // Subtler shadow
  gradient: 'linear-gradient(135deg, #333333 0%, #1A1A1A 100%)', // Darker, more subtle gradient
  subtleGlow: 'rgba(163, 216, 244, 0.05)', // Very subtle glow
  backdrop: 'rgba(0, 0, 0, 0.6)', // Slightly lighter backdrop
  glow: '0 0 10px rgba(163, 216, 244, 0.3)', // Softer glow
  cardBackground: '#3A3A3A', // Darker card background
};

// Utility function for responsive values
const getResponsiveValue = (mobile, desktop) =>
  window.innerWidth <= 768 ? mobile : desktop;

// Enhanced Recommended Product Card
const RecommendedProductCard = ({ name = 'Product' }) => {
  return (
    <div
      style={{
        background: theme.cardBackground,
        border: `1px solid ${theme.darkGray}`, // Darker border
        borderRadius: '6px',
        padding: '8px',
        boxShadow: `0 2px 6px ${theme.shadow}`, // Subtler shadow
        transition: 'all 0.2s ease-in-out',
        width: getResponsiveValue('90px', '140px'), // Increased width
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        margin: '0 0 10px 0', // Adjusted vertical margin
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = `0 4px 10px ${theme.shadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = `0 2px 6px ${theme.shadow}`;
      }}
      onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
      onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div
        style={{
          width: '100%',
          height: getResponsiveValue('70px', '100px'), // Increased height
          background: '#555',
          borderRadius: '4px',
          marginBottom: '6px',
        }}
      />
      <div
        style={{
          color: theme.silver,
          fontSize: '11px',
          textAlign: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: '100%',
        }}
      >
        {name}
      </div>
    </div>
  );
};

// Main ProductDetails Component as a Popup
const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [fetchedDescription, setFetchedDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // Controlled by parent or initial state
  const [showFirstTwo, setShowFirstTwo] = useState(true); // State to toggle between product sets

  const {
    name = 'Unknown Product',
    imageUrl = '',
    prices = [],
    sources = [],
    productLinks = [],
    description = 'No description available',
  } = location.state || {};

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        let amazonQuery = supabase
          .from('Amazon')
          .select('Description')
          .eq('Name', name)
          .eq('Image Link', imageUrl);
        let flipkartQuery = supabase
          .from('Flipkart')
          .select('Description')
          .eq('Name', name)
          .eq('Image Link', imageUrl);

        const [amazonRes, flipkartRes] = await Promise.all([amazonQuery, flipkartQuery]);

        if (amazonRes.error) throw new Error(`Amazon fetch error: ${amazonRes.error.message}`);
        if (flipkartRes.error) throw new Error(`Flipkart fetch error: ${flipkartRes.error.message}`);

        const amazonData = amazonRes.data || [];
        const flipkartData = flipkartRes.data || [];

        const fetchedDesc =
          amazonData.length > 0
            ? amazonData[0].Description
            : flipkartData.length > 0
              ? flipkartData[0].Description
              : null;

        setFetchedDescription(fetchedDesc || description);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details.');
        setFetchedDescription(description);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [name, imageUrl, description]);

  const displayDescription = fetchedDescription || description;

  // Mock recommended products with names for demonstration
  const recommendedProducts = [
    { name: 'Product 1' },
    { name: 'Product 2' },
    { name: 'Product 3' },
    { name: 'Product 4' },
  ];

  // Toggle between first two and last two products
  const handleToggleProducts = () => {
    setShowFirstTwo(!showFirstTwo);
  };

  // Close the popup
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 100);
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: theme.backdrop,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleClose}
        >
          <div
            style={{
              background: theme.gradient,
              width: '90vw',
              maxWidth: '1000px',
              height: 'auto',
              maxHeight: '80vh',
              borderRadius: '8px',
              boxShadow: `0 8px 20px ${theme.shadow}`,
              display: 'flex',
              flexDirection: getResponsiveValue('column', 'row'),
              alignItems: 'flex-start',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1001,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: theme.silver,
                cursor: 'pointer',
                fontSize: '20px',
                padding: '5px',
                borderRadius: '50%',
                transition: 'color 0.2s ease-in-out',
                outline: 'none',
              }}
              onMouseEnter={(e) => (e.target.style.color = theme.subtleCyan)}
              onMouseLeave={(e) => (e.target.style.color = theme.silver)}
            >
              ×
            </button>

            {/* Product Details (Left Half) */}
            <div
              style={{
                width: getResponsiveValue('100%', '50%'),
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto',
                boxSizing: 'border-box',
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  marginBottom: '20px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  boxShadow: `0 4px 10px ${theme.shadow}`,
                  border: `1px solid ${theme.darkGray}`,
                }}
              >
                <img
                  src={imageUrl}
                  alt={name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    maxHeight: '200px',
                  }}
                />
              </div>

              {/* Product Name */}
              <h2
                style={{
                  color: theme.silver,
                  fontSize: getResponsiveValue('18px', '22px'),
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {name}
              </h2>

              {/* Product Description */}
              <div
                style={{
                  color: theme.silver,
                  fontSize: '14px',
                  lineHeight: '1.5',
                  marginBottom: '15px',
                  overflowY: 'auto',
                  maxHeight: '150px',
                  textAlign: 'center',
                }}
              >
                {loading ? (
                  <p style={{ color: theme.subtleCyan }}>Loading...</p>
                ) : error ? (
                  <p style={{ color: theme.accentRed }}>{error}</p>
                ) : (
                  <p>{displayDescription}</p>
                )}
              </div>

              {/* Buy Now Button */}
              {productLinks.length > 0 && (
                <a
                  href={productLinks[0] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: theme.subtleCyan,
                    color: theme.darkGray,
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 'semibold',
                    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    boxShadow: `0 2px 6px ${theme.shadow}`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.accentRed;
                    e.target.style.color = theme.silver;
                    e.target.style.boxShadow = `0 4px 8px ${theme.shadow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme.subtleCyan;
                    e.target.style.color = theme.darkGray;
                    e.target.style.boxShadow = `0 2px 6px ${theme.shadow}`;
                  }}
                >
                  Buy Now
                </a>
              )}
            </div>

            {/* Recommended Products (Right Half) */}
            <div
              style={{
                width: getResponsiveValue('100%', '50%'),
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto',
                boxSizing: 'border-box',
                borderLeft: getResponsiveValue('none', `1px solid ${theme.darkGray}`),
              }}
            >
              <h3
                style={{
                  color: theme.accentRed,
                  fontSize: getResponsiveValue('16px', '18px'),
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                }}
              >
                Recommended
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: getResponsiveValue('row', 'column'), // Vertical on desktop, row on mobile
                  gap: '15px', // Increased gap for larger cards
                  overflowX: getResponsiveValue('auto', 'hidden'),
                  paddingBottom: '10px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {showFirstTwo
                  ? recommendedProducts.slice(0, 2).map((product, index) => (
                      <RecommendedProductCard key={index} name={product.name} />
                    ))
                  : recommendedProducts.slice(2, 4).map((product, index) => (
                      <RecommendedProductCard key={index} name={product.name} />
                    ))}
              </div>
              {recommendedProducts.length > 2 && (
                <button
                  onClick={handleToggleProducts}
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    background: theme.subtleCyan,
                    color: theme.darkGray,
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                    boxShadow: `0 2px 6px ${theme.shadow}`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.accentRed;
                    e.target.style.color = theme.silver;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme.subtleCyan;
                    e.target.style.color = theme.darkGray;
                  }}
                >
                  ↓
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;