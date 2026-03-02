import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      title: 'Эксклюзивные бренды',
      description: 'Только премиальные производители с безупречной репутацией',
      stats: '30+',
      statLabel: 'брендов',
      color: 'var(--emerald-base)'
    },
    {
      id: 2,
      title: 'Опытные мастера',
      description: 'Специалисты с профильным образованием и стажем от 7 лет',
      stats: '15',
      statLabel: 'лет средний стаж',
      color: 'var(--emerald-primary)'
    },
    {
      id: 3,
      title: 'Гарантия',
      description: 'Расширенное гарантийное обслуживание всех работ',
      stats: '10',
      statLabel: 'лет гарантии',
      color: 'var(--emerald-secondary)'
    },
    {
      id: 4,
      title: 'Под ключ',
      description: 'Пройдем с вами полный цикл работ от замера до установки',
      stats: '100%',
      statLabel: 'готовность',
      color: 'var(--gold-primary)'
    }
  ];

  return (
    <section className="benefits">
      <div className="benefits-bg">
        <div className="bg-line vertical" />
        <div className="bg-line horizontal" />
      </div>

      <div className="container">
        <div className="section-header">
          <span className="section-tag">Преимущества</span>
          <h2 className="section-title">
            Почему выбирают нас
          </h2>
          <p className="section-description">
            Инженерный подход и внимание к деталям
          </p>
        </div>

        {/* Сетка преимуществ */}
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className="benefit-card">
              <div className="benefit-number" style={{ color: benefit.color }}>
                {(index + 1).toString().padStart(2, '0')}
              </div>
              
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
              
              <div className="benefit-stat">
                <span className="stat-value" style={{ color: benefit.color }}>
                  {benefit.stats}
                </span>
                <span className="stat-label">{benefit.statLabel}</span>
              </div>

              <div className="benefit-line" style={{ background: benefit.color }} />
            </div>
          ))}
        </div>

        <div className="stats-row">
          <div className="stat-block">
            <span className="stat-number">500+</span>
            <span className="stat-text">реализованных проектов</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <span className="stat-number">98%</span>
            <span className="stat-text">довольных клиентов</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <span className="stat-number">24/7</span>
            <span className="stat-text">техническая поддержка</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;