import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/page/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__bg">
        <div className="not-found-page__bg-line not-found-page__bg-line--vertical"></div>
        <div className="not-found-page__bg-line not-found-page__bg-line--horizontal"></div>
      </div>

      <div className="not-found-page__container">
        <div className="not-found-page__content">
          <div className="not-found-page__digits">
            <span className="not-found-page__digit not-found-page__digit--4">4</span>
            <span className="not-found-page__digit not-found-page__digit--0">0</span>
            <span className="not-found-page__digit not-found-page__digit--4">4</span>
          </div>
          <h1 className="not-found-page__title">СТРАНИЦА НЕ НАЙДЕНА</h1>
          <p className="not-found-page__text">
            Запрашиваемая страница не существует или была перемещена.<br />
            Проверьте правильность введенного адреса или вернитесь в каталог.
          </p>
          <div className="not-found-page__actions">
            <Link to="/" className="not-found-page__button not-found-page__button--primary">
              <span>НА ГЛАВНУЮ</span>
              <span className="not-found-page__button-arrow">→</span>
            </Link>
            <Link to="/catalog" className="not-found-page__button not-found-page__button--outline">
              <span>В КАТАЛОГ</span>
              <span className="not-found-page__button-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;