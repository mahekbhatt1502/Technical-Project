import React, { useEffect, useState } from 'react';
import supabase from './supabase.js';
import { useNavigate } from 'react-router-dom';

// Money Heist Theme Palette
const theme = {
  midnightBlack: '#2C2C2C',
  neonBlue: '#00E5FF',
  heistRed: '#FF4D4D',
  silverLining: '#D9D9D9',
  stealthGray: '#5A5A5A',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

// List of Smartphone Brands
const smartphoneBrands = [
  "Apple", "MOTOROLA", "Samsung", "OnePlus", "Xiaomi", "Realme", "Vivo",
  "Asus", "Motorola", "Nokia", "Sony", "Huawei", "iQOO", "Nothing",
  "Infinix", "REDMI", "POCO", "TECNO", "Lava", "itel ZENO",
  "HONOR", "SAMSUNG", "Poco", "vivo", "realme", "OPPO", "Tecno", "iPhone"
];

// Keywords to detect smartphones
const smartphoneKeywords = ["RAM", "ROM", "Battery", "Camera", "Display", "Processor", "Chipset", "Expandable", "5G"];
const excludedKeywords = ["charger", "charging", "cable", "adapter", "power bank", "dock", "EarPods"];

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
    onProductClick(name, imageUrl, prices, sources, productLinks);
  };

  return (
    <div
      style={{
        background: theme.midnightBlack,
        borderRadius: '8px',
        padding: '10px',
        boxShadow: `0 4px 12px ${theme.shadow}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        border: `2px solid ${theme.neonBlue}`,
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
        e.currentTarget.style.boxShadow = `0 8px 20px ${theme.neonBlue}80`;
        e.currentTarget.style.borderColor = theme.heistRed;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `0 4px 12px ${theme.shadow}`;
        e.currentTarget.style.borderColor = theme.neonBlue;
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
          color: theme.silverLining,
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
            color: theme.neonBlue,
            textAlign: 'center',
            fontFamily: '"Courier New", monospace',
            fontWeight: '500',
            width: '100%',
          }}
        >
          {prices.map((priceObj, index) => (
            <p key={index} style={{ margin: '2px 0' }}>
              <span style={{ color: theme.silverLining }}>
                ₹{parseFloat(priceObj.price).toFixed(2)}{' '}
              </span>
              <span style={{ color: theme.heistRed }}>
                ({sources[index]})
              </span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Smartphones Component
const Smartphones = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 100; // 4 columns × 25 rows
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSmartphones = async () => {
      try {
        setLoading(true);
        setError(null);

        let amazonQuery = supabase
          .from('Amazon')
          .select('Name, "Image Link", Description, "Product Link", Price');
        let flipkartQuery = supabase
          .from('Flipkart')
          .select('Name, "Image Link", Description, "Product Link", Price')
          .or(smartphoneKeywords.map(k => `Description.ilike.%${k}%`).join(','))
          .not('Description', 'ilike', `%${excludedKeywords.join('%')}%`);

        if (searchQuery) {
          amazonQuery = amazonQuery.or(`Name.ilike.%${searchQuery}%,Description.ilike.%${searchQuery}%`);
          flipkartQuery = flipkartQuery.or(`Name.ilike.%${searchQuery}%,Description.ilike.%${searchQuery}%`);
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
          data.forEach(item => {
            if (!smartphoneBrands.some(brand => item.Name.toLowerCase().includes(brand.toLowerCase()))) return;
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
              product.price = parseFloat(item.Price)
              product.prices.push({ source, price: item.Price });
            }
          });
        };

        processData(amazonData, 'Amazon');
        processData(flipkartData, 'Flipkart');

        let allProducts = Array.from(productMap.values());
        allProducts = [...allProducts].sort((a, b) => b.price - a.price)
        setTotalPages(Math.ceil(allProducts.length / productsPerPage));

        const from = (currentPage - 1) * productsPerPage;
        const to = from + productsPerPage;
        const paginatedData = allProducts.slice(from, to);

        setProductsData(paginatedData);
      } catch (err) {
        console.error('Error fetching smartphones:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSmartphones();
  }, [searchQuery, sourceFilter, currentPage]);

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

  const handleSourceFilterChange = (value) => {
    setSourceFilter(value);
    setCurrentPage(1);
  };

  const handleProductClick = (name, imageUrl, prices, sources, productLinks) => {
    navigate(`/product/${encodeURIComponent(name)}`, {
      state: { name, imageUrl, prices, sources, productLinks }
    });
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
            border: `1px solid ${theme.neonBlue}`,
            borderRadius: '12px',
            background: currentPage === i ? theme.neonBlue : theme.midnightBlack,
            color: currentPage === i ? theme.midnightBlack : theme.silverLining,
            cursor: 'pointer',
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (currentPage !== i) {
              e.target.style.background = theme.heistRed;
              e.target.style.color = theme.silverLining;
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.background = currentPage === i ? theme.neonBlue : theme.midnightBlack;
            e.target.style.color = currentPage === i ? theme.midnightBlack : theme.silverLining;
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
        background: theme.midnightBlack,
        fontFamily: '"Courier New", monospace',
        padding: getResponsiveValue('20px 5%', '40px 5%'),
        overflowX: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
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
        {/* PRICIFY, Smartphones Title, and Search Bar */}
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
                color: theme.neonBlue,
                fontSize: getResponsiveValue('28px', '36px'),
                fontWeight: '700',
                margin: 0,
                transition: 'color 0.3s ease',
                textShadow: `0 0 8px ${theme.neonBlue}80`,
                fontFamily: '"Courier New", monospace',
              }}
              onMouseEnter={(e) => (e.target.style.color = theme.heistRed)}
              onMouseLeave={(e) => (e.target.style.color = theme.neonBlue)}
            >
              PRICIFY
            </h1>
          </div>

          {/* Smartphones Title */}
          <h1
            style={{
              color: theme.silverLining,
              fontSize: getResponsiveValue('20px', '28px'),
              fontWeight: '700',
              margin: '10px 0',
              textAlign: 'left',
              transition: 'color 0.3s ease',
              textShadow: `0 0 8px ${theme.neonBlue}80`,
              display: 'block',
            }}
            onMouseEnter={(e) => (e.target.style.color = theme.neonBlue)}
            onMouseLeave={(e) => (e.target.style.color = theme.silverLining)}
          >
            SMARTPHONES
          </h1>

          {/* Search Bar */}
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search by brand..."
            style={{
              width: getResponsiveValue('100%', '100%'),
              padding: getResponsiveValue('10px 15px', '12px 20px'),
              borderRadius: '12px',
              border: `1px solid ${theme.neonBlue}`,
              background: theme.midnightBlack,
              fontSize: getResponsiveValue('14px', '16px'),
              color: theme.silverLining,
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              fontFamily: '"Courier New", monospace',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.heistRed;
              e.target.style.boxShadow = `0 0 8px ${theme.heistRed}80`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.neonBlue;
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Source Filter */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              color: theme.silverLining,
              fontWeight: '500',
              marginBottom: '10px',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderLeft: `3px solid ${theme.neonBlue}`,
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
                  background: sourceFilter === option ? theme.stealthGray : 'transparent',
                  color: sourceFilter === option ? theme.neonBlue : theme.silverLining,
                  border: `1px solid ${theme.stealthGray}`,
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
                    e.target.style.borderColor = theme.neonBlue;
                    e.target.style.color = theme.neonBlue;
                    e.target.style.boxShadow = `inset 0 0 8px ${theme.neonBlue}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (sourceFilter !== option) {
                    e.target.style.borderColor = theme.stealthGray;
                    e.target.style.color = theme.silverLining;
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
                        ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${theme.neonBlue}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14v12"/></svg>')`
                        : option === 'amazon'
                          ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${theme.neonBlue}"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>')`
                          : `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${theme.neonBlue}"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 16H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V8h12v2z"/></svg>')`,
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
                      background: theme.heistRed,
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
              0% { text-shadow: 0 0 8px ${theme.neonBlue}80; }
              50% { text-shadow: 0 0 12px ${theme.neonBlue}ff; }
              100% { text-shadow: 0 0 8px ${theme.neonBlue}80; }
            }
          `}
        </style>
      </div>

      {/* Product Section */}
      <div
        style={{
          width: '100%',
          maxWidth: 'calc(1400px - 250px - 20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: theme.midnightBlack,
          margin: '0 auto',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Main Content */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Removed Header Section */}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px', width: '100%' }}>
            <p
              style={{
                color: theme.neonBlue, // Fixed typo from 'newBlue' to 'neonBlue'
                fontSize: getResponsiveValue('18px', '20px'),
                fontFamily: '"Courier New", monospace',
                transition: 'opacity 0.3s ease',
              }}
            >
              Loading Smartphones...
            </p>
          </div>
        ) : error ? (
          <p
            style={{
              color: theme.heistRed,
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
                  'repeat(2, minmax(150px, 1fr))', // 2 columns on mobile
                  'repeat(4, minmax(200px, 1fr))'  // 4 columns on desktop
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
                    color: theme.silverLining,
                    fontSize: getResponsiveValue('16px', '18px'),
                    textAlign: 'center',
                    width: '100%',
                    gridColumn: '1 / -1',
                    padding: '20px',
                    fontFamily: '"Courier New", monospace',
                  }}
                >
                  No smartphones acquired in this vault.
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
                    border: `1px solid ${theme.neonBlue}`,
                    borderRadius: '12px',
                    background: theme.midnightBlack,
                    color: theme.neonBlue,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) e.target.style.background = theme.heistRed;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = theme.midnightBlack;
                  }}
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${theme.neonBlue}`,
                    borderRadius: '12px',
                    background: theme.midnightBlack,
                    color: theme.neonBlue,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) e.target.style.background = theme.heistRed;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = theme.midnightBlack;
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
                    border: `1px solid ${theme.neonBlue}`,
                    borderRadius: '12px',
                    background: theme.midnightBlack,
                    color: theme.neonBlue,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) e.target.style.background = theme.heistRed;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = theme.midnightBlack;
                  }}
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${theme.neonBlue}`,
                    borderRadius: '12px',
                    background: theme.midnightBlack,
                    color: theme.neonBlue,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) e.target.style.background = theme.heistRed;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = theme.midnightBlack;
                  }}
                >
                  Last
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Smartphones;
