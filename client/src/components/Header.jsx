import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleOrderCall = () => {
    console.log('Opening order modal');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <div className="logo-icon-inner">
                <PipeIcon />
              </div>
            </div>
            <div className="logo-text">
              <span className="logo-name">Штуцер</span>
              <span className="logo-subtitle">Сантехнический бутик</span>
            </div>
          </Link>
        </div>

        <nav className="header-center">
          <div className="nav-links">
            <NavLink to="/" current={location.pathname === '/'}>
              <HomeIcon />
              Главная
            </NavLink>
            
            <NavLink to="/catalog" current={location.pathname === '/catalog'}>
              <CatalogIcon />
              Каталог
            </NavLink>

            <NavLink to="/services" current={location.pathname === '/services'}>
              <ServicesIcon />
              Услуги
            </NavLink>

            <NavLink to="/about" current={location.pathname === '/about'}>
              <AboutIcon />
              О нас
            </NavLink>

            <NavLink to="/contacts" current={location.pathname === '/contacts'}>
              <ContactIcon />
              Контакты
            </NavLink>
          </div>
        </nav>

        <div className="header-right">
          <div className="contact-info">
            <a href="tel:+79281553965" className="phone-number">
              <PhoneIcon />
              +7 (928) 155-39-65
            </a>
            <span className="work-hours">Ежедневно 9:00–21:00</span>
          </div>
          
              <button 
        className="order-btn" 
        onClick={() => window.location.href = 'tel:+79281553965'}
      >
        <PhoneIcon />
        Заказать звонок
      </button>
        </div>

        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <div className="logo-icon">
                <PipeIcon />
              </div>
              <div className="logo-text">
                <span className="logo-name">Штуцер</span>
                <span className="logo-subtitle">Сантехнический бутик</span>
              </div>
            </div>
            <button className="mobile-close" onClick={() => setIsMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          
          <div className="mobile-menu-body">
            <nav className="mobile-nav">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
                <HomeIcon />
                Главная
              </MobileNavLink>
              
              <MobileNavLink to="/catalog" onClick={() => setIsMenuOpen(false)}>
                <CatalogIcon />
                Каталог
              </MobileNavLink>
              
              <MobileNavLink to="/services" onClick={() => setIsMenuOpen(false)}>
                <ServicesIcon />
                Услуги
              </MobileNavLink>
              
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                <AboutIcon />
                О нас
              </MobileNavLink>

              <MobileNavLink to="/contacts" onClick={() => setIsMenuOpen(false)}>
                <ContactIcon />
                Контакты
              </MobileNavLink>
            </nav>
            
            <div className="mobile-contact-info">
              <a href="tel:+79281553965" className="mobile-phone">
                <PhoneIcon />
                <div>
                  <div className="phone-number">+7 (928) 155-39-65</div>
                  <div className="phone-label">Ежедневно 9:00–21:00</div>
                </div>
              </a>
              
              <div className="mobile-actions">
                <button className="btn btn-primary" onClick={handleOrderCall}>
                  <PhoneIcon />
                  Заказать звонок
                </button>
                
                <div className="mobile-social">
                  <a href="https://wa.me/79281553965" className="social-btn whatsapp">
                    <WhatsAppIcon />
                  </a>
                  <a href="https://t.me/shtucer" className="social-btn telegram">
                    <TelegramIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

const PipeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const CatalogIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const ServicesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M16 3l4 4-4 4"/>
  </svg>
);

const AboutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.968.625 3.789 1.687 5.273L2 22l4.724-1.687A9.95 9.95 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.944 12.348c-.178.497-1.04.909-1.433.961-.388.052-.884.07-1.943-.378-1.428-.61-2.362-2.068-2.434-2.163-.07-.095-.584-.796-.584-1.518 0-.722.378-1.075.511-1.226.133-.15.295-.188.393-.188.098 0 .197 0 .282.007.086.006.193-.029.3.445.108.475.368 1.637.401 1.755.033.118.066.265.033.413-.033.148-.066.236-.133.348-.067.113-.148.265-.213.354-.067.09-.142.186-.213.297-.071.111-.15.236-.064.461.086.224.384.964.82 1.562.568.782 1.05 1.235 1.893 1.573.393.16.699.128.934-.085.235-.213.537-.585.678-.862.141-.277.282-.236.473-.138.19.098 1.21.638 1.418.754.208.116.348.173.399.271.05.099.05.563-.128 1.06z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.07-.06-.17-.04-.24-.02-.1.02-1.68 1.09-4.74 3.2-.45.33-.86.49-1.23.48-.41-.01-1.2-.23-1.79-.42-.72-.23-1.29-.36-1.24-.76.02-.18.27-.36.75-.55 2.89-1.26 4.83-2.1 5.82-2.51 2.78-1.16 3.36-1.36 3.74-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 0z"/>
  </svg>
);

const NavLink = ({ to, current, children }) => (
  <Link to={to} className={`nav-link ${current ? 'active' : ''}`}>
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children, className = '' }) => (
  <Link to={to} className={`mobile-nav-link ${className}`} onClick={onClick}>
    {children}
  </Link>
);

export default Header;