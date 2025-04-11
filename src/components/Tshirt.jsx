 import React, { useEffect, useState } from 'react';
import supabase from './supabase.js';
import { useNavigate } from 'react-router-dom';

// Theme Palette for Tshirts
const themeTshirts = {
  midnightBlack: '#2C2C2C',
  neonBlue: '#00E5FF',
  heistRed: '#FF4D4D',
  silverLining: '#D9D9D9',
  stealthGray: '#5A5A5A',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

// Enhanced Theme Palette for ProductDetails
const themePopup = {
  darkGray: '#2C2C2C',
  subtleCyan: '#A3D8F4',
  accentRed: '#CC3333',
  silver: '#D9D8D9',
  shadow: 'rgba(0, 0, 0, 0.15)',
  gradient: 'linear-gradient(135deg, #333333 0%, #1A1A1A 100%)',
  subtleGlow: 'rgba(163, 216, 244, 0.05)',
  backdrop: 'rgba(0, 0, 0, 0.6)',
  glow: '0 0 10px rgba(163, 216, 244, 0.3)',
  cardBackground: '#3A3A3A',
};

// Utility function for responsive values
const getResponsiveValue = (mobile, desktop) =>
  window.innerWidth <= 768 ? mobile : desktop;

// Debounce utility
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Product Card Component
const ProductCard = ({ name, imageUrl, prices, sources, productLinks, onProductClick }) => {
  const cardWidth = '200px';
  const imageHeight = '200px';

  const handleClick = () => {
    onProductClick({ name, imageUrl, prices, sources, productLinks });
  };

  return (
    <div
      style={{
        background: themeTshirts.midnightBlack,
        borderRadius: '8px',
        padding: '10px',
        boxShadow: `0 4px 12px ${themeTshirts.shadow}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'pointer',
        border: `2px solid ${themeTshirts.neonBlue}`,
        width: cardWidth,
        minWidth: cardWidth,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = `0 8px 20px ${themeTshirts.neonBlue}80`;
        e.currentTarget.style.borderColor = themeTshirts.heistRed;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `0 4px 12px ${themeTshirts.shadow}`;
        e.currentTarget.style.borderColor = themeTshirts.neonBlue;
      }}
    >
      <img
        src={imageUrl || 'https://via.placeholder.com/240?text=No+Image'}
        alt={name}
        loading="lazy"
        style={{
          width: '100%',
          height: imageHeight,
          objectFit: 'cover',
          borderRadius: '6px',
          marginBottom: '8px',
          transition: 'transform 0.3s ease',
        }}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/240?text=No+Image')}
      />
      <p
        style={{
          color: themeTshirts.silverLining,
          margin: '0 0 6px',
          fontSize: '15px',
          fontWeight: '600',
          textAlign: 'center',
          fontFamily: '"Courier New", monospace',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </p>
      {prices && prices.length > 0 && (
        <div
          style={{
            margin: '4px 0 0',
            fontSize: '0.85em',
            color: themeTshirts.neonBlue,
            textAlign: 'center',
            fontFamily: '"Courier New", monospace',
            fontWeight: '500',
            width: '100%',
          }}
        >
          {prices.map((priceObj, index) => (
            <p key={index} style={{ margin: '2px 0' }}>
              <span style={{ color: themeTshirts.silverLining }}>
                ₹{priceObj.price}.00
              </span>
              <a
                href={productLinks[index]}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: themeTshirts.heistRed,
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = themeTshirts.neonBlue)}
                onMouseLeave={(e) => (e.target.style.color = themeTshirts.heistRed)}
              >
                ({sources[index]})
              </a>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// Recommended Product Card for Popup
const RecommendedProductCard = ({ name = 'T-Shirt' }) => {
  return (
    <div
      style={{
        background: themePopup.cardBackground,
        border: `1px solid ${themePopup.darkGray}`,
        borderRadius: '6px',
        padding: '8px',
        boxShadow: `0 2px 6px ${themePopup.shadow}`,
        transition: 'all 0.2s ease-in-out',
        width: getResponsiveValue('90px', '140px'),
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        margin: '0 0 10px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = `0 4px 10px ${themePopup.shadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = `0 2px 6px ${themePopup.shadow}`;
      }}
      onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
      onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div
        style={{
          width: '100%',
          height: getResponsiveValue('70px', '100px'),
          background: '#555',
          borderRadius: '4px',
          marginBottom: '6px',
        }}
      />
      <div
        style={{
          color: themePopup.silver,
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

// ProductDetails Popup Component
 // Product Details Popup Component (aligned with Sneakers/Smartphones/Jeans design)
const ProductDetails = ({ product, onClose }) => {
  const [fetchedDescription, setFetchedDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFirstTwo, setShowFirstTwo] = useState(true);

  const {
    name = 'Unknown Product',
    imageUrl = 'https://via.placeholder.com/300?text=No+Image',
    prices = [],
    sources = [],
    productLinks = [],
  } = product || {};

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
              : 'No description available';

        setFetchedDescription(fetchedDesc);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details.');
        setFetchedDescription('No description available');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [name, imageUrl]);

  const displayDescription = fetchedDescription;

  const recommendedProducts = [
    { name: "Men's Classic Cotton T-Shirt" },
    { name: "Women's Graphic Tee" },
    { name: "Unisex Oversized T-Shirt" },
    { name: "Men's Sports T-Shirt" },
  ];

  const handleToggleProducts = () => {
    setShowFirstTwo(!showFirstTwo);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'fadeIn 0.3s ease-in-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1C1C1C',
          width: '90vw',
          maxWidth: '1200px',
          height: 'auto',
          maxHeight: '90vh',
          borderRadius: '12px',
          boxShadow: `0 10px 30px ${themePopup.shadow}`,
          display: 'flex',
          flexDirection: getResponsiveValue('column', 'row'),
          alignItems: 'stretch',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1001,
          border: `1px solid ${themeTshirts.stealthGray}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: `1px solid ${themeTshirts.silverLining}`,
            color: themeTshirts.silverLining,
            cursor: 'pointer',
            fontSize: '24px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = themeTshirts.heistRed;
            e.target.style.color = '#1C1C1C';
            e.target.style.borderColor = themeTshirts.heistRed;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = themeTshirts.silverLining;
            e.target.style.borderColor = themeTshirts.silverLining;
          }}
        >
          ×
        </button>

        <div
          style={{
            width: getResponsiveValue('100%', '65%'),
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#1C1C1C',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              marginBottom: '20px',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              border: `1px solid ${themeTshirts.stealthGray}`,
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
              onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=No+Image')}
            />
          </div>

          <h2
            style={{
              color: themeTshirts.silverLining,
              fontSize: getResponsiveValue('22px', '28px'),
              fontWeight: '700',
              marginBottom: '15px',
              textAlign: 'center',
              letterSpacing: '1px',
              fontFamily: '"Courier New", monospace',
            }}
          >
            {name}
          </h2>

          <div
            style={{
              color: themeTshirts.silverLining,
              fontSize: '15px',
              lineHeight: '1.6',
              marginBottom: '20px',
              overflowY: 'auto',
              maxHeight: '180px',
              textAlign: 'center',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            {loading ? (
              <p style={{ color: themeTshirts.neonBlue }}>Loading...</p>
            ) : error ? (
              <p style={{ color: themeTshirts.heistRed }}>{error}</p>
            ) : (
              <p>{displayDescription}</p>
            )}
          </div>

          {prices && prices.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '10px',
                width: '100%',
                maxWidth: '350px',
              }}
            >
              {prices.map((priceObj, index) => (
                <a
                  key={index}
                  href={productLinks[index] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 20px',
                    background: '#252525',
                    color: themeTshirts.silverLining,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${themeTshirts.stealthGray}`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = themeTshirts.neonBlue;
                    e.target.style.color = '#1C1C1C';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#252525';
                    e.target.style.color = themeTshirts.silverLining;
                  }}
                >
                  <span>₹{priceObj.price}.00</span>
                  <span>{sources[index]}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            width: getResponsiveValue('100%', '35%'),
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#1C1C1C',
            overflowY: 'auto',
            boxSizing: 'border-box',
            borderLeft: getResponsiveValue('none', `1px solid ${themeTshirts.stealthGray}`),
          }}
        >
          <h3
            style={{
              color: themeTshirts.silverLining,
              fontSize: getResponsiveValue('20px', '24px'),
              fontWeight: '700',
              marginBottom: '20px',
              letterSpacing: '1px',
              fontFamily: '"Courier New", monospace',
            }}
          >
            RECOMMENDED
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: getResponsiveValue('repeat(2, 1fr)', '1fr'),
              gap: '15px',
              width: '100%',
              justifyItems: 'center',
              flexGrow: 1,
            }}
          >
            {(showFirstTwo ? recommendedProducts.slice(0, 2) : recommendedProducts.slice(2, 4)).map(
              (product, index) => (
                <div
                  key={index}
                  style={{
                    background: '#252525',
                    border: `1px solid ${themeTshirts.stealthGray}`,
                    borderRadius: '8px',
                    padding: '12px',
                    width: getResponsiveValue('140px', '200px'),
                    height: getResponsiveValue('180px', '260px'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#2F2F2F';
                    e.target.style.borderColor = themeTshirts.neonBlue;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#252525';
                    e.target.style.borderColor = themeTshirts.stealthGray;
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: getResponsiveValue('120px', '180px'),
                      background: '#333333',
                      borderRadius: '6px',
                      marginBottom: '12px',
                    }}
                  />
                  <div
                    style={{
                      color: themeTshirts.silverLining,
                      fontSize: getResponsiveValue('14px', '16px'),
                      textAlign: 'center',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      width: '100%',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = themeTshirts.neonBlue;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = themeTshirts.silverLining;
                    }}
                  >
                    {product.name}
                  </div>
                </div>
              )
            )}
          </div>
          {recommendedProducts.length > 2 && (
            <button
              onClick={handleToggleProducts}
              style={{
                marginTop: '15px',
                padding: '10px 25px',
                background: '#252525',
                color: themeTshirts.silverLining,
                border: `1px solid ${themeTshirts.stealthGray}`,
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Courier New", monospace',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = themeTshirts.neonBlue;
                e.target.style.color = '#1C1C1C';
                e.target.style.borderColor = themeTshirts.neonBlue;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#252525';
                e.target.style.color = themeTshirts.silverLining;
                e.target.style.borderColor = themeTshirts.stealthGray;
              }}
            >
              {showFirstTwo ? '▼' : '▲'}
            </button>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};
// Main Tshirts Component
const Tshirts = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 100; // 4 columns × 25 rows
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchTshirts = async () => {
      try {
        setLoading(true);
        setError(null);

        let amazonQuery = supabase
          .from('Amazon')
          .select('Name, "Image Link", Description, "Product Link", Price')
          .ilike('Description', '%T-Shirt%');

        let flipkartQuery = supabase
          .from('Flipkart')
          .select('Name, "Image Link", Description, "Product Link", Price')
          .ilike('Description', '%T-Shirt%');

        if (genderFilter === 'men') {
          amazonQuery = amazonQuery.or('Description.ilike.%men%,Description.ilike.%male%');
          flipkartQuery = flipkartQuery.or('Description.ilike.%men%,Description.ilike.%male%');
        } else if (genderFilter === 'women') {
          amazonQuery = amazonQuery.or('Description.ilike.%women%,Description.ilike.%female%');
          flipkartQuery = flipkartQuery.or('Description.ilike.%women%,Description.ilike.%female%');
        }

        if (searchQuery) {
          amazonQuery = amazonQuery.ilike('Name', `%${searchQuery}%`).ilike('Description', `%${searchQuery}%`);
          flipkartQuery = flipkartQuery.ilike('Name', `%${searchQuery}%`).ilike('Description', `%${searchQuery}%`);
        }

        let amazonData = [];
        let flipkartData = [];

        if (sourceFilter === 'all' || sourceFilter === 'amazon') {
          const { data, error } = await amazonQuery;
          if (error) throw new Error(`Amazon fetch error: ${error.message}`);
          amazonData = data || [];
        }

        if (sourceFilter === 'all' || sourceFilter === 'flipkart') {
          const { data, error } = await flipkartQuery;
          if (error) throw new Error(`Flipkart fetch error: ${error.message}`);
          flipkartData = data || [];
        }

        const productMap = new Map();

        const processData = (data, source) => {
          data.forEach((item) => {
            const key = `${item.Name}|${item.Description}`;
            if (!productMap.has(key)) {
              productMap.set(key, {
                Name: item.Name,
                Description: item.Description,
                'Image Link': item['Image Link'],
                sources: [],
                productLinks: [],
                prices: [],
              });
            }
            const product = productMap.get(key);
            if (!product.sources.includes(source)) {
              product.sources.push(source);
              product.productLinks.push(item['Product Link']);
              product.prices.push({ source, price: item.Price });
            }
          });
        };

        processData(amazonData, 'Amazon');
        processData(flipkartData, 'Flipkart');

        let allProducts = Array.from(productMap.values());
        allProducts = [...allProducts].sort((a, b) => (a.prices[0]?.price || 0) - (b.prices[0]?.price || 0));
        setTotalPages(Math.ceil(allProducts.length / productsPerPage));

        const from = (currentPage - 1) * productsPerPage;
        const to = from + productsPerPage;
        const paginatedData = allProducts.slice(from, to);

        setProductsData(paginatedData);
      } catch (err) {
        console.error('Error fetching tshirts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTshirts();
  }, [genderFilter, sourceFilter, searchQuery, currentPage]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearch = (e) => debouncedSearch(e.target.value);

  const handleGenderFilterChange = (value) => {
    setGenderFilter(value);
    setCurrentPage(1);
  };

  const handleSourceFilterChange = (value) => {
    setSourceFilter(value);
    setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={`page-${i}`}
          onClick={() => setCurrentPage(i)}
          style={{
            margin: '0 5px',
            padding: '8px 12px',
            border: `1px solid ${themeTshirts.neonBlue}`,
            borderRadius: '12px',
            background: currentPage === i ? themeTshirts.neonBlue : themeTshirts.midnightBlack,
            color: currentPage === i ? themeTshirts.midnightBlack : themeTshirts.silverLining,
            cursor: 'pointer',
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (currentPage !== i) {
              e.target.style.background = themeTshirts.heistRed;
              e.target.style.color = themeTshirts.silverLining;
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.background = currentPage === i ? themeTshirts.neonBlue : themeTshirts.midnightBlack;
            e.target.style.color = currentPage === i ? themeTshirts.midnightBlack : themeTshirts.silverLining;
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: themeTshirts.midnightBlack,
        fontFamily: '"Courier New", monospace',
        padding: getResponsiveValue('20px 5%', '40px 5%'),
        overflowX: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
      }}
    >
      {/* Sidebar - Filters */}
      <div
        style={{
          width: getResponsiveValue('100%', '250px'),
          marginRight: getResponsiveValue('0', '20px'),
          marginBottom: getResponsiveValue('20px', '0'),
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* PRICIFY, T-Shirts Title, and Search Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: '20px',
          }}
        >
          {/* PRICIFY Logo */}
          <div
            onClick={() => navigate('/')}
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '10px',
            }}
          >
            <h1
              style={{
                color: themeTshirts.neonBlue,
                fontSize: getResponsiveValue('28px', '36px'),
                fontWeight: '700',
                margin: 0,
                transition: 'color 0.3s ease',
                textShadow: `0 0 8px ${themeTshirts.neonBlue}80`,
                fontFamily: '"Courier New", monospace',
              }}
              onMouseEnter={(e) => (e.target.style.color = themeTshirts.heistRed)}
              onMouseLeave={(e) => (e.target.style.color = themeTshirts.neonBlue)}
            >
              PRICIFY
            </h1>
          </div>

          {/* T-Shirts Title */}
          <h1
            style={{
              color: themeTshirts.silverLining,
              fontSize: getResponsiveValue('20px', '28px'),
              fontWeight: '700',
              margin: '10px 0',
              textAlign: 'left',
              transition: 'color 0.3s ease',
              textShadow: `0 0 8px ${themeTshirts.neonBlue}80`,
              display: 'block',
            }}
            onMouseEnter={(e) => (e.target.style.color = themeTshirts.neonBlue)}
            onMouseLeave={(e) => (e.target.style.color = themeTshirts.silverLining)}
          >
            T-SHIRTS
          </h1>

          {/* Search Bar */}
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            style={{
              width: getResponsiveValue('100%', '100%'),
              padding: getResponsiveValue('10px 15px', '12px 20px'),
              borderRadius: '12px',
              border: `1px solid ${themeTshirts.neonBlue}`,
              background: themeTshirts.midnightBlack,
              fontSize: getResponsiveValue('14px', '16px'),
              color: themeTshirts.silverLining,
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              fontFamily: '"Courier New", monospace',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = themeTshirts.heistRed;
              e.target.style.boxShadow = `0 0 8px ${themeTshirts.heistRed}80`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = themeTshirts.neonBlue;
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Gender Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
          <span
            style={{
              color: themeTshirts.silverLining,
              fontWeight: '500',
              marginBottom: '10px',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderLeft: `3px solid ${themeTshirts.neonBlue}`,
              paddingLeft: '8px',
            }}
          >
            GENDER
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['all', 'men', 'women'].map((option) => (
              <button
                key={option}
                onClick={() => handleGenderFilterChange(option)}
                style={{
                  background: genderFilter === option ? themeTshirts.stealthGray : 'transparent',
                  color: genderFilter === option ? themeTshirts.neonBlue : themeTshirts.silverLining,
                  border: `1px solid ${themeTshirts.stealthGray}`,
                  borderRadius: '6px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '13px',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseEnter={(e) => {
                  if (genderFilter !== option) {
                    e.target.style.borderColor = themeTshirts.neonBlue;
                    e.target.style.color = themeTshirts.neonBlue;
                    e.target.style.boxShadow = `inset 0 0 8px ${themeTshirts.neonBlue}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (genderFilter !== option) {
                    e.target.style.borderColor = themeTshirts.stealthGray;
                    e.target.style.color = themeTshirts.silverLining;
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    background:
                      option === 'all'
                        ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeTshirts.neonBlue}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm4 0h-2v-2h2v2zM9 10V8h6v2H9z"/></svg>')`
                        : option === 'men'
                          ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeTshirts.neonBlue}"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16v4h4a8 8 0 0 1-4 12z"/></svg>')`
                          : `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeTshirts.neonBlue}"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16v2h2v2h-2v2h-2v-2H8v-2h2V4a8 8 0 0 1 2 16z"/></svg>')`,
                    backgroundSize: 'contain',
                    transition: 'transform 0.3s ease',
                  }}
                />
                {option === 'all' ? 'Both' : option.charAt(0).toUpperCase() + option.slice(1)}
                {genderFilter === option && (
                  <span
                    style={{
                      position: 'absolute',
                      right: '8px',
                      width: '6px',
                      height: '6px',
                      background: themeTshirts.heistRed,
                      borderRadius: '50%',
                      animation: 'pulse 1.5s infinite',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Source Filter */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              color: themeTshirts.silverLining,
              fontWeight: '500',
              marginBottom: '10px',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderLeft: `3px solid ${themeTshirts.neonBlue}`,
              paddingLeft: '8px',
            }}
          >
            Shop From
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['all', 'amazon', 'flipkart'].map((option) => (
              <button
                key={option}
                onClick={() => handleSourceFilterChange(option)}
                style={{
                  background: sourceFilter === option ? themeTshirts.stealthGray : 'transparent',
                  color: sourceFilter === option ? themeTshirts.neonBlue : themeTshirts.silverLining,
                  border: `1px solid ${themeTshirts.stealthGray}`,
                  borderRadius: '6px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '13px',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseEnter={(e) => {
                  if (sourceFilter !== option) {
                    e.target.style.borderColor = themeTshirts.neonBlue;
                    e.target.style.color = themeTshirts.neonBlue;
                    e.target.style.boxShadow = `inset 0 0 8px ${themeTshirts.neonBlue}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (sourceFilter !== option) {
                    e.target.style.borderColor = themeTshirts.stealthGray;
                    e.target.style.color = themeTshirts.silverLining;
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    background:
                      option === 'all'
                        ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeTshirts.neonBlue}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14v12"/></svg>')`
                        : option === 'amazon'
                          ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeTshirts.neonBlue}"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>')`
                          : `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${themeTshirts.neonBlue}"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 16H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V8h12v2z"/></svg>')`,
                    backgroundSize: 'contain',
                    transition: 'transform 0.3s ease',
                  }}
                />
                {option === 'all' ? 'Both' : option.charAt(0).toUpperCase() + option.slice(1)}
                {sourceFilter === option && (
                  <span
                    style={{
                      position: 'absolute',
                      right: '8px',
                      width: '6px',
                      height: '6px',
                      background: themeTshirts.heistRed,
                      borderRadius: '50%',
                      animation: 'pulse 1.5s infinite',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Inline CSS for Animations */}
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.5); opacity: 0.7; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes neonPulse {
              0% { text-shadow: 0 0 8px ${themeTshirts.neonBlue}80; }
              50% { text-shadow: 0 0 12px ${themeTshirts.neonBlue}ff; }
              100% { text-shadow: 0 0 8px ${themeTshirts.neonBlue}80; }
            }
          `}
        </style>
      </div>

      {/* Product Section */}
      <div
        style={{
          width: '80%',
          maxWidth: 'calc(1400px - 250px - 20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: themeTshirts.midnightBlack,
          margin: '0 auto',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px', width: '100%' }}>
            <p
              style={{
                color: themeTshirts.neonBlue,
                fontSize: getResponsiveValue('18px', '20px'),
                fontFamily: '"Courier New", monospace',
                transition: 'opacity 0.3s ease',
              }}
            >
              Loading T-Shirts...
            </p>
          </div>
        ) : error ? (
          <p
            style={{
              color: themeTshirts.heistRed,
              fontSize: getResponsiveValue('18px', '20px'),
              textAlign: 'center',
              padding: '30px',
              fontFamily: '"Courier New", monospace',
              width: '100%',
            }}
          >
            Heist Failed: {error}
          </p>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: getResponsiveValue(
                  'repeat(2, minmax(150px, 1fr))',
                  'repeat(4, minmax(200px, 1fr))'
                ),
                gap: getResponsiveValue('15px', '20px'),
                width: '100%',
                maxWidth: '100%',
                padding: '0',
                boxSizing: 'border-box',
                justifyItems: 'center',
                alignItems: 'start',
              }}
            >
              {productsData.length > 0 ? (
                productsData.map((product, index) => (
                  <ProductCard
                    key={index}
                    name={product.Name}
                    imageUrl={product['Image Link']}
                    sources={product.sources}
                    productLinks={product.productLinks}
                    prices={product.prices}
                    onProductClick={handleProductClick}
                  />
                ))
              ) : (
                <p
                  style={{
                    color: themeTshirts.silverLining,
                    fontSize: getResponsiveValue('16px', '18px'),
                    textAlign: 'center',
                    width: '100%',
                    gridColumn: '1 / -1',
                    padding: '20px',
                    fontFamily: '"Courier New", monospace',
                  }}
                >
                  No T-shirts acquired in this vault.
                </p>
              )}
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '30px',
                  flexWrap: 'wrap',
                  gap: '10px',
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${themeTshirts.neonBlue}`,
                    borderRadius: '12px',
                    background: themeTshirts.midnightBlack,
                    color: themeTshirts.neonBlue,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) e.target.style.background = themeTshirts.heistRed;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = themeTshirts.midnightBlack;
                  }}
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${themeTshirts.neonBlue}`,
                    borderRadius: '12px',
                    background: themeTshirts.midnightBlack,
                    color: themeTshirts.neonBlue,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) e.target.style.background = themeTshirts.heistRed;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = themeTshirts.midnightBlack;
                  }}
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${themeTshirts.neonBlue}`,
                    borderRadius: '12px',
                    background: themeTshirts.midnightBlack,
                    color: themeTshirts.neonBlue,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) e.target.style.background = themeTshirts.heistRed;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = themeTshirts.midnightBlack;
                  }}
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${themeTshirts.neonBlue}`,
                    borderRadius: '12px',
                    background: themeTshirts.midnightBlack,
                    color: themeTshirts.neonBlue,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) e.target.style.background = themeTshirts.heistRed;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = themeTshirts.midnightBlack;
                  }}
                >
                  Last
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Render ProductDetails Popup */}
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Tshirts;
