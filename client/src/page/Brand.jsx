import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/page/Brand.css';

const Brand = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const brandRef = React.useRef(null);

  useEffect(() => {
    fetchBrand();
  }, [id]);

  useEffect(() => {
    const killZeros = setTimeout(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (node.textContent && /^\s*0+\s*$/.test(node.textContent)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      const nodesToRemove = [];
      while (walker.nextNode()) {
        nodesToRemove.push(walker.currentNode);
      }
      
      nodesToRemove.forEach(node => {
        if (node.parentElement && 
            !node.parentElement.classList.contains('rating-value') &&
            !node.parentElement.classList.contains('spec-value')) {
          node.parentElement.removeChild(node);
        }
      });
    }, 100);

    return () => clearTimeout(killZeros);
  }, [brand]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!brandRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = brandRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchBrand = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/brands/${id}`);
      const result = await response.json();
      
      if (result.success) {
        console.log('Данные бренда:', result.data); 
        setBrand(result.data);
      } else {
        throw new Error(result.error || 'Ошибка загрузки');
      }
    } catch (err) {
      console.error('Ошибка:', err);
      setError('Не удалось загрузить информацию о бренде');
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения флага страны
  const getCountryFlag = (country) => {
    const flags = {
      'Германия': '🇩🇪',
      'Испания': '🇪🇸',
      'Швейцария': '🇨🇭',
      'Россия': '🇷🇺',
      'Польша': '🇵🇱',
      'Турция': '🇹🇷',
      'Болгария': '🇧🇬',
      'Чехия': '🇨🇿',
      'Франция': '🇫🇷',
      'Италия': '🇮🇹',
      'Япония': '🇯🇵',
      'Австрия': '🇦🇹'
    };
    return flags[country] || '🌍';
  };

  if (loading) {
    return (
      <section className="brand-page">
        <div className="brand-container">
          <div className="brand-loading">
            <div className="brand-spinner"></div>
            <p>Загрузка...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !brand) {
    return (
      <section className="brand-page">
        <div className="brand-container">
          <div className="brand-error">
            <h2>Упс!</h2>
            <p>{error || 'Бренд не найден'}</p>
            <Link to="/" className="brand-back-link">
              <span>←</span> На главную
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="brand-page" ref={brandRef}>
      <div className="brand-bg" />
      <div className="brand-texture" />

      <div className="brand-container">
        <div className="brand-breadcrumbs">
          <Link to="/">Главная</Link>
          <span className="separator">/</span>
          <Link to="/catalog">Каталог</Link>
          <span className="separator">/</span>
          <span className="current">Бренды</span>
          <span className="separator">/</span>
          <span className="current">{brand.name}</span>
        </div>

        {/* Основной контент */}
        <div className="brand-content">
          {/* Левая колонка - информация */}
          <div className="brand-info">
            <div className="brand-header">
              <span className="brand-badge">
                <span className="badge-line" />
                {brand.country}
              </span>

              <h1 className="brand-name">
                <span className="name-main">{brand.name}</span>
                {brand.founded_year && (
                  <span className="name-year">с {brand.founded_year}</span>
                )}
              </h1>
            </div>

            {brand.description && (
              <p className="brand-description">{brand.description}</p>
            )}

            {/* Характеристики */}
            <div className="brand-specs">
              <div className="specs-grid">
                {brand.country && (
                  <div className="spec-item">
                    <span className="spec-label">Страна</span>
                    <span className="spec-value">
                      <span className="spec-flag">{getCountryFlag(brand.country)}</span>
                      {brand.country}
                    </span>
                  </div>
                )}
                
                {brand.products_count !== undefined && brand.products_count !== null && brand.products_count > 0 && (
                  <div className="spec-item">
                    <span className="spec-label">Товаров</span>
                    <span className="spec-value">{brand.products_count}</span>
                  </div>
                )}
                
                {brand.is_premium && (
                  <div className="spec-item">
                    <span className="spec-label">Категория</span>
                    <span className="spec-value premium">Премиум</span>
                  </div>
                )}
                
                {brand.website && (
                  <div className="spec-item">
                    <span className="spec-label">Сайт</span>
                    <a href={brand.website} target="_blank" rel="noopener noreferrer" className="spec-link">
                      {brand.website.replace('https://', '').replace('http://', '')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeWidth="1.5"/>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Рейтинг */}
            {brand.rating > 0 && (
              <div className="brand-rating">
                <div className="rating-stars">
                  {'★'.repeat(Math.floor(brand.rating))}
                  {brand.rating % 1 >= 0.5 && '½'}
                  {'☆'.repeat(5 - Math.ceil(brand.rating))}
                </div>
                <span className="rating-value">{brand.rating}</span>
              </div>
            )}

            {/* Кнопка */}
            <Link to={`/catalog?brand=${brand.id}`} className="brand-button">
              <span>Смотреть товары бренда</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>

          {/* Правая колонка - логотип и графика */}
          <div className="brand-graphic">
            <div 
              className="brand-logo"
              style={{
                transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
              }}
            >
              {brand.logo_url ? (
                <img src={brand.logo_url} alt={brand.name} />
              ) : (
                <span className="brand-initial">{brand.name.charAt(0)}</span>
              )}
            </div>

            <div className="graphic-container">
              <svg className="graphic-lines" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid meet">
                <line x1="200" y1="100" x2="200" y2="500" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.1" />
                <line x1="100" y1="300" x2="300" y2="300" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.1" />
                <line x1="150" y1="200" x2="250" y2="400" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.1" />
                <circle cx="200" cy="200" r="3" fill="var(--gold-primary)" opacity="0.2" />
                <circle cx="200" cy="400" r="3" fill="var(--gold-primary)" opacity="0.2" />
                <circle cx="120" cy="300" r="3" fill="var(--gold-primary)" opacity="0.2" />
                <circle cx="280" cy="300" r="3" fill="var(--gold-primary)" opacity="0.2" />
              </svg>

              <div 
                className="graphic-element element-1"
                style={{
                  transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                }}
              >
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <rect x="10" y="10" width="40" height="40" rx="2" fill="none" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.1" />
                </svg>
              </div>

              <div 
                className="graphic-element element-2"
                style={{
                  transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="15" fill="none" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-footer">
        <div className="brand-line" />
        <div className="brand-scroll">
          <span className="scroll-text">Прокрутить</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default Brand;