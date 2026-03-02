import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-about">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <div className="footer-logo-icon-inner">
                  <PipeIcon />
                </div>
              </div>
              <div className="footer-logo-text">
                <span className="footer-logo-name">Штуцер</span>
                <span className="footer-logo-subtitle">Сантехнический бутик</span>
              </div>
            </Link>
            <p className="footer-description">
              Инженерный подход к созданию систем водоснабжения и отопления. 
              Только оригинальное оборудование от ведущих европейских производителей.
            </p>
          </div>

          {/* Навигация */}
          <div className="footer-nav">
            <h4 className="footer-title">Навигация</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Главная</Link>
              <Link to="/catalog" className="footer-link">Каталог</Link>
              <Link to="/services" className="footer-link">Услуги</Link>
              <Link to="/about" className="footer-link">О нас</Link>
              <Link to="/contacts" className="footer-link">Контакты</Link>
            </div>
          </div>

          {/* Контакты */}
          <div className="footer-contact">
            <h4 className="footer-title">Контакты</h4>
            <div className="footer-contact-items">
              <a href="tel:+79281553965" className="footer-contact-item">
                <PhoneIcon />
                <span>+7 (928) 155-39-65</span>
              </a>
              <a href="mailto:info@shtucer.ru" className="footer-contact-item">
                <EmailIcon />
                <span>info@shtucer.ru</span>
              </a>
              <div className="footer-contact-item">
                <ClockIcon />
                <span>Ежедневно 9:00–21:00</span>
              </div>
              <div className="footer-contact-item footer-address">
                <LocationIcon />
                <span>Авиаторов 16В, Ростов-на-Дону</span>
              </div>
            </div>
          </div>
        </div>

        {/* Удален блок с социальными сетями */}

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © {currentYear} Штуцер. Все права защищены.
            </div>
            <div className="footer-legal">
              <Link to="/privacy" className="footer-legal-link">Политика конфиденциальности</Link>
              <span className="footer-legal-separator">/</span>
              <Link to="/terms" className="footer-legal-link">Пользовательское соглашение</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PipeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 6H20V18H4V6Z" fill="url(#gradient)" stroke="url(#gradient)" strokeWidth="1.5"/>
    <rect x="7" y="9" width="10" height="6" fill="white" rx="1"/>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1A7F5C" />
        <stop offset="100%" stopColor="#2B9B76" />
      </linearGradient>
    </defs>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 7L2 7"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default Footer;