import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/page/Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'ПРОФЕССИОНАЛЬНАЯ КОНСУЛЬТАЦИЯ',
      description: 'Поможем подобрать оборудование под ваш проект, рассчитаем мощность, учтем все нюансы помещения.',
      features: ['Выезд на объект', 'Расчет мощности', 'Подбор аналогов'],
      icon: '💬',
      color: 'var(--emerald-base)',
      link: '/consultation'
    },
    {
      id: 2,
      title: 'ДОСТАВКА',
      description: 'Быстрая доставка по Ростову-на-Дону и области. Аккуратно, вовремя, с заботой о вашем грузе.',
      features: ['По Ростову — 500 ₽', 'По области — договорная', 'Самовывоз — бесплатно'],
      icon: '🚚',
      color: 'var(--emerald-primary)',
      link: '/delivery'
    },
    {
      id: 3,
      title: 'ПРЕДПРОДАЖНАЯ ПОДГОТОВКА',
      description: 'Подготовим материалы к монтажу: нарежем резьбу, отрежем трубы по вашим размерам.',
      features: ['Нарезка резьбы', 'Резка труб в размер', 'Подготовка комплектов'],
      icon: '⚙️',
      color: 'var(--emerald-secondary)',
      link: '/preparation'
    },
    {
      id: 4,
      title: 'КОМПЛЕКТАЦИЯ ОБЪЕКТОВ',
      description: 'Соберем полный комплект под ваш проект: от труб до крепежа. Все совместимо и точно.',
      features: ['Подбор по спецификации', 'Проверка совместимости', 'Комплексные решения'],
      icon: '📦',
      color: 'var(--gold-primary)',
      link: '/complectation'
    }
  ];

  const process = [
    { number: '01', title: 'ЗАЯВКА', description: 'Оставляете заявку на сайте или по телефону' },
    { number: '02', title: 'ВЫЕЗД', description: 'Инженер приезжает на объект, делает замеры' },
    { number: '03', title: 'СМЕТА', description: 'Рассчитываем стоимость и сроки работ' },
    { number: '04', title: 'МОНТАЖ', description: 'Выполняем работы, сдаем объект' }
  ];

  return (
    <div className="services-page">
      <div className="services-page__bg">
        <div className="services-page__bg-line services-page__bg-line--vertical"></div>
        <div className="services-page__bg-line services-page__bg-line--horizontal"></div>
      </div>

      <div className="services-page__container">
        <div className="services-page__header">
          <span className="services-page__tag">/ УСЛУГИ /</span>
          <h1 className="services-page__title">ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ</h1>
          <p className="services-page__subtitle">
            Мы не только продаем, но и помогаем в монтаже
          </p>
        </div>

        <div className="services-page__grid">
          {services.map((service) => (
            <div key={service.id} className="services-page__card">
              <div className="services-page__card-icon" style={{ color: service.color }}>
                {service.icon}
              </div>
              <h3 className="services-page__card-title">{service.title}</h3>
              <p className="services-page__card-description">{service.description}</p>
              <ul className="services-page__card-features">
                {service.features.map((feature, index) => (
                  <li key={index} className="services-page__card-feature">
                    <span className="services-page__card-dot" style={{ backgroundColor: service.color }}></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={service.link} className="services-page__card-link" style={{ color: service.color }}>
                Заказать услугу
                <span className="services-page__card-arrow">→</span>
              </Link>
              <div className="services-page__card-line" style={{ backgroundColor: service.color }}></div>
            </div>
          ))}
        </div>

        {/* Процесс работы */}
        <div className="services-page__process">
          <div className="services-page__header">
            <span className="services-page__tag">КАК МЫ РАБОТАЕМ</span>
          </div>

          <div className="services-page__process-grid">
            {process.map((item) => (
              <div key={item.number} className="services-page__process-item">
                <span className="services-page__process-number">{item.number}</span>
                <h3 className="services-page__process-title">{item.title}</h3>
                <p className="services-page__process-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="services-page__cta">
          <p className="services-page__cta-text">
            Нужна консультация по услугам?
          </p>
          <Link to="/consultation" className="services-page__cta-link">
            СВЯЗАТЬСЯ
            <span className="services-page__cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;