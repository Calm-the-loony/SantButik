import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-gradient" />
      <div className="hero-texture" />
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-line" />
            Сантехнический бутик
          </div>

          <h1 className="hero-title">
            <span className="title-line" style={{ color: 'var(--emerald-base)' }}>Штуцер</span>
            <span className="title-line-small">Инженерная сантехника</span>
          </h1>

          <p className="hero-description">
            Профессиональное оборудование для водоснабжения и отопления. 
            Комплексные решения для частных домов и квартир.
          </p>

          <div className="hero-actions">
            <Link to="/catalog" className="btn-primary">
              Каталог
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
            
            <Link to="/contacts" className="btn-outline">
              Контакты
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value" style={{ color: 'var(--emerald-base)' }}>15+</span>
              <span className="stat-label">лет на рынке</span>
            </div>
            <div className="stat-item">
              <span className="stat-value" style={{ color: 'var(--emerald-base)' }}>500+</span>
              <span className="stat-label">объектов</span>
            </div>
            <div className="stat-item">
              <span className="stat-value" style={{ color: 'var(--emerald-base)' }}>∞</span>
              <span className="stat-label">гарантия</span>
            </div>
          </div>
        </div>

        <div className="hero-graphic">
          <div className="graphic-container">
            <svg className="graphic-lines" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid meet">
              <line x1="200" y1="100" x2="200" y2="700" stroke="var(--emerald-base)" strokeWidth="1" opacity="0.15" />
              <line x1="400" y1="100" x2="400" y2="700" stroke="var(--emerald-base)" strokeWidth="1" opacity="0.15" />
              <line x1="100" y1="250" x2="500" y2="250" stroke="var(--emerald-base)" strokeWidth="1" opacity="0.15" />
              <line x1="100" y1="450" x2="500" y2="450" stroke="var(--emerald-base)" strokeWidth="1" opacity="0.15" />
              <line x1="100" y1="650" x2="500" y2="650" stroke="var(--emerald-base)" strokeWidth="1" opacity="0.15" />

              <path 
                d="M300 150 L300 650 M200 250 L400 250 M200 450 L400 450 M200 650 L400 650" 
                stroke="var(--emerald-base)" 
                strokeWidth="1.5" 
                opacity="0.3"
              />
            
              <line x1="200" y1="250" x2="400" y2="450" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.2" />
              <line x1="400" y1="250" x2="200" y2="450" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.2" />
              
              <circle 
                cx="300" 
                cy="450" 
                r="60" 
                fill="none" 
                stroke="var(--emerald-base)" 
                strokeWidth="1" 
                opacity="0.2"
              />
              <circle 
                cx="300" 
                cy="450" 
                r="30" 
                fill="none" 
                stroke="var(--gold-primary)" 
                strokeWidth="1" 
                opacity="0.3"
              />
              
              <circle cx="200" cy="250" r="4" fill="var(--emerald-base)" opacity="0.3" />
              <circle cx="400" cy="250" r="4" fill="var(--emerald-base)" opacity="0.3" />
              <circle cx="200" cy="450" r="4" fill="var(--emerald-base)" opacity="0.3" />
              <circle cx="400" cy="450" r="4" fill="var(--emerald-base)" opacity="0.3" />
              <circle cx="300" cy="650" r="4" fill="var(--emerald-base)" opacity="0.3" />
            </svg>

            <div 
              className="graphic-element element-1"
              style={{
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
              }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120">
                <rect x="10" y="10" width="100" height="100" rx="4" fill="none" stroke="var(--emerald-base)" strokeWidth="1" opacity="0.1" />
                <rect x="30" y="30" width="60" height="60" rx="2" fill="none" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.1" />
              </svg>
            </div>

            <div 
              className="graphic-element element-2"
              style={{
                transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" fill="none" stroke="var(--emerald-base)" strokeWidth="1" opacity="0.1" />
                <circle cx="40" cy="40" r="15" fill="none" stroke="var(--gold-primary)" strokeWidth="1" opacity="0.1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer">
        <div className="hero-line" />
        <div className="hero-scroll">
          <span className="scroll-text">Прокрутить</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default Hero;