import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/page/About.css';

const About = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/brands');
      const data = await response.json();
      if (data.success) {
        setBrands(data.data.slice(0, 12));
      }
    } catch (error) {
      console.error('Ошибка загрузки брендов:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="about-page">
      <div className="about-page__bg">
        <div className="about-page__bg-line about-page__bg-line--vertical"></div>
        <div className="about-page__bg-line about-page__bg-line--horizontal"></div>
      </div>

      <div className="about-page__container">
        <div className="about-page__header">
          <span className="about-page__tag">/ О НАС /</span>
          <h1 className="about-page__title">ШТУЦЕР</h1>
          <p className="about-page__subtitle">Сантехнический бутик в Ростове-на-Дону</p>
        </div>

        <div className="about-page__description">
          <p>
            Сантехнический бутик «Штуцер» — это инженерный подход к созданию 
            систем водоснабжения и отопления. Мы работаем с 2010 года и за это время 
            реализовали сотни успешных проектов.
          </p>
          <p>
            Наш шоурум находится по адресу: <strong>Авиаторов 16В, Ростов-на-Дону</strong>. 
            Здесь вы можете увидеть образцы продукции, получить профессиональную консультацию 
            и сделать заказ.
          </p>
          <p>
            Только оригинальное оборудование от ведущих европейских производителей. 
            Профессиональный монтаж. Гарантия на все работы.
          </p>
        </div>

        <div className="about-page__stats">
          <div className="about-page__stat-item">
            <span className="about-page__stat-number">15</span>
            <span className="about-page__stat-label">лет на рынке</span>
          </div>
          <div className="about-page__stat-item">
            <span className="about-page__stat-number">500+</span>
            <span className="about-page__stat-label">объектов</span>
          </div>
          <div className="about-page__stat-item">
            <span className="about-page__stat-number">50+</span>
            <span className="about-page__stat-label">брендов</span>
          </div>
        </div>

        <div className="about-page__principles">
          <div className="about-page__header">
            <span className="about-page__tag">ПРИНЦИПЫ</span>
          </div>

          <div className="about-page__principles-grid">
            <div className="about-page__principle-card">
              <span className="about-page__principle-number">01</span>
              <h3 className="about-page__principle-title">КАЧЕСТВО</h3>
              <p className="about-page__principle-text">Только оригинальная продукция. Никаких подделок и аналогов.</p>
              <div className="about-page__principle-line"></div>
            </div>

            <div className="about-page__principle-card">
              <span className="about-page__principle-number">02</span>
              <h3 className="about-page__principle-title">ОПЫТ</h3>
              <p className="about-page__principle-text">Инженеры со стажем от 10 лет. Решаем сложные задачи.</p>
              <div className="about-page__principle-line"></div>
            </div>

            <div className="about-page__principle-card">
              <span className="about-page__principle-number">03</span>
              <h3 className="about-page__principle-title">ГАРАНТИЯ</h3>
              <p className="about-page__principle-text">5 лет на работы. 10 лет на оборудование.</p>
              <div className="about-page__principle-line"></div>
            </div>

            <div className="about-page__principle-card">
              <span className="about-page__principle-number">04</span>
              <h3 className="about-page__principle-title">ЧЕСТНОСТЬ</h3>
              <p className="about-page__principle-text">Прозрачные цены. Без скрытых платежей.</p>
              <div className="about-page__principle-line"></div>
            </div>
          </div>
        </div>

        <div className="about-page__brands">
          <div className="about-page__header">
            <span className="about-page__tag">БРЕНДЫ</span>
          </div>

          {loading ? (
            <div className="about-page__brands-loading">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="about-page__brands-grid">
              {brands.map((brand) => (
                <div key={brand.id} className="about-page__brand-card">
                  <h3 className="about-page__brand-name">{brand.name}</h3>
                  <p className="about-page__brand-country">{brand.country}</p>
                </div>
              ))}
            </div>
          )}

          <div className="about-page__brands-more">
            <Link to="/catalog" className="about-page__brands-link">
              <span>Смотреть все бренды</span>
              <span className="about-page__brands-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="about-page__catalog">
          <Link to="/catalog" className="about-page__catalog-link">
            <span>ПЕРЕЙТИ В КАТАЛОГ</span>
            <span className="about-page__catalog-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;