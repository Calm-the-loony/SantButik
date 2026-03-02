import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Collections.css';

const Collections = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, [activeFilter]);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:3001/api/brands';
      
      if (activeFilter === 'premium') {
        url += '?premium=true';
      } else if (activeFilter !== 'all') {
        url += `?category=${activeFilter}`;
      }
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        const limitedBrands = result.data.slice(0, 6);
        setBrands(limitedBrands);
        console.log('Загружены бренды:', limitedBrands);
      } else {
        throw new Error(result.error || 'Ошибка загрузки');
      }
      
      setError(null);
    } catch (err) {
      console.error('Ошибка:', err);
      setError('Не удалось загрузить бренды');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const killZero = setTimeout(() => {
      const cards = document.querySelectorAll('.brand-card');
      cards.forEach(card => {
        const walker = document.createTreeWalker(
          card,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              if (node.textContent.trim() === '0') {
                return NodeFilter.FILTER_ACCEPT;
              }
              return NodeFilter.FILTER_REJECT;
            }
          }
        );
        while (walker.nextNode()) {
          walker.currentNode.remove();
        }
      });
    }, 100);
    return () => clearTimeout(killZero);
  }, [brands]);

  const categories = [
    { id: 'all', name: 'Все бренды' },
    { id: 'premium', name: 'Премиум' },
    { id: 'standard', name: 'Стандарт' }
  ];

  return (
    <section className="collections">
      <div className="collections-bg">
        <div className="bg-solid" />
        <div className="bg-overlay" />
        <div className="bg-pattern" />
        <div className="bg-accent-block" style={{ backgroundColor: 'var(--gold-primary)' }} />
        <div className="bg-accent-block-2" style={{ backgroundColor: 'var(--emerald-base)' }} />
      </div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-main">Бренды</span>
            <span className="title-dot" style={{ color: 'var(--gold-primary)' }}>✦</span>
          </h2>
          <p className="section-description">
            Официальные партнеры ведущих производителей
          </p>
        </div>

        <div className="collections-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Загружаем бренды...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchBrands} className="retry-btn">
              Попробовать снова
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="brands-grid">
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <div key={brand.id} className={`brand-card ${brand.is_premium ? 'premium' : ''}`}>
                    <div className="card-decoration">
                      <div className="decoration-dot" style={{ 
                        backgroundColor: brand.is_premium ? 'var(--gold-primary)' : 'var(--emerald-base)' 
                      }} />
                      <div className="decoration-line" />
                    </div>

                    <div className="card-content">                  
                      <div className="brand-header">
                        <h3 className="brand-name">{brand.name}</h3>
                        <span className="brand-country">{brand.country || 'Страна не указана'}</span>
                      </div>
                      
                      <div className="brand-badge-container">
                        <span className={`brand-product-badge ${brand.is_premium ? 'premium-badge-style' : ''}`}>
                          <span className="badge-icon">📦</span>
                          {brand.products_count} {brand.products_count === 1 ? 'товар' : 
                            brand.products_count >= 2 && brand.products_count <= 4 ? 'товара' : 'товаров'}
                        </span>
                      </div>
                      
                      <p className="brand-description">
                        {brand.description || 'Описание отсутствует'}
                      </p>
                      
                      {brand.is_premium && (
                        <div className="premium-badge">
                          <span>Премиум бренд</span>
                        </div>
                      )}
                      
                      <Link to={`/brand/${brand.id}`} className="brand-link">
                        <span>Подробнее о бренде</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </Link>
                    </div>

                    <div 
                      className="card-accent" 
                      style={{ 
                        backgroundColor: brand.is_premium ? 'var(--gold-primary)' : 'var(--emerald-base)',
                        opacity: brand.is_premium ? 0.5 : 0.3
                      }} 
                    />
                  </div>
                ))
              ) : (
                <div className="no-brands">
                  <p>Бренды не найдены</p>
                </div>
              )}
            </div>

            {brands.length === 6 && (
              <div className="show-more-container">
                <Link to="/catalog" className="show-more-btn">
                  <span>Показать все бренды</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}

        <div className="collections-cta">
          <div className="cta-decoration">
            <span className="cta-star" style={{ color: 'var(--gold-primary)' }}>✦</span>
          </div>
          <p className="cta-text">
            Хотите стать нашим партнером?
          </p>
          <Link to="/contacts" className="cta-button">
            Связаться с нами
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collections;