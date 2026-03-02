import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/page/Contacts.css';

const Contacts = () => {
  return (
    <div className="contacts-page">
      <div className="contacts-page__bg">
        <div className="contacts-page__bg-texture"></div>
      </div>

      <div className="contacts-page__container">
        <div className="contacts-page__header">
          <span className="contacts-page__tag">/ КОНТАКТЫ /</span>
          <h1 className="contacts-page__title">КОНТАКТЫ</h1>
          <p className="contacts-page__subtitle">Как с нами связаться</p>
        </div>

        <div className="contacts-page__grid">
          <div className="contacts-page__block">
            <h3 className="contacts-page__block-title">АДРЕС</h3>
            <p className="contacts-page__address">
              <strong>Наш магазин:</strong><br />
              Авиаторов 16В, Ростов-на-Дону
            </p>
          </div>

          <div className="contacts-page__block">
            <h3 className="contacts-page__block-title">ТЕЛЕФОН</h3>
            <p className="contacts-page__phone">
              <a href="tel:+79281553965" className="contacts-page__phone-link">+7 (928) 155-39-65</a>
            </p>
          </div>

          <div className="contacts-page__block">
            <h3 className="contacts-page__block-title">ГРАФИК РАБОТЫ</h3>
            <p className="contacts-page__schedule">
              <strong>Ежедневно:</strong> 9:00 – 21:00
            </p>
          </div>

          <div className="contacts-page__block">
            <h3 className="contacts-page__block-title">EMAIL</h3>
            <p className="contacts-page__email">
              <a href="mailto:info@shtucer.ru" className="contacts-page__email-link">info@shtucer.ru</a>
            </p>
          </div>

          <div className="contacts-page__block contacts-page__block--full">
            <div className="contacts-page__messengers">
              <a href="https://wa.me/79281553965" className="contacts-page__messenger contacts-page__messenger--whatsapp" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
              <a href="https://t.me/shtucer" className="contacts-page__messenger contacts-page__messenger--telegram" target="_blank" rel="noopener noreferrer">
                <TelegramIcon />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contacts-page__directions">
          <h3 className="contacts-page__directions-title">КАК ДОБРАТЬСЯ</h3>
          <div className="contacts-page__directions-grid">
            <div className="contacts-page__direction">
              <h4 className="contacts-page__direction-title">На общественном транспорте:</h4>
              <p className="contacts-page__direction-text">
                Автобусы № 15, 32, 67 до остановки «Авиаторов».<br />
                Маршрутное такси № 45, 78 до остановки «Улица Авиаторов».<br />
                От остановки 3 минуты пешком.
              </p>
            </div>
            <div className="contacts-page__direction">
              <h4 className="contacts-page__direction-title">На автомобиле:</h4>
              <p className="contacts-page__direction-text">
                Следуйте по проспекту Стачки до поворота на улицу Авиаторов. 
                Магазин находится в жилом комплексе, есть парковка для клиентов.
              </p>
            </div>
          </div>
        </div>

        <div className="contacts-page__map">
          <h3 className="contacts-page__map-title">МЫ НА КАРТЕ</h3>
          <div className="contacts-page__map-container">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A8e8b7f7b7b8f8b7f7b7b8f8b7f7b7b8f8b7f7b7b8f8b7f7b7b8f8b7f7b7b8f8b&amp;source=constructor"
              width="100%"
              height="400"
              frameBorder="0"
              title="Карта"
              className="contacts-page__map-iframe"
            ></iframe>
            <div className="contacts-page__map-marker">
              <span className="contacts-page__map-marker-text">Авиаторов 16В</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.968.625 3.789 1.687 5.273L2 22l4.724-1.687A9.95 9.95 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.944 12.348c-.178.497-1.04.909-1.433.961-.388.052-.884.07-1.943-.378-1.428-.61-2.362-2.068-2.434-2.163-.07-.095-.584-.796-.584-1.518 0-.722.378-1.075.511-1.226.133-.15.295-.188.393-.188.098 0 .197 0 .282.007.086.006.193-.029.3.445.108.475.368 1.637.401 1.755.033.118.066.265.033.413-.033.148-.066.236-.133.348-.067.113-.148.265-.213.354-.067.09-.142.186-.213.297-.071.111-.15.236-.064.461.086.224.384.964.82 1.562.568.782 1.05 1.235 1.893 1.573.393.16.699.128.934-.085.235-.213.537-.585.678-.862.141-.277.282-.236.473-.138.19.098 1.21.638 1.418.754.208.116.348.173.399.271.05.099.05.563-.128 1.06z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.07-.06-.17-.04-.24-.02-.1.02-1.68 1.09-4.74 3.2-.45.33-.86.49-1.23.48-.41-.01-1.2-.23-1.79-.42-.72-.23-1.29-.36-1.24-.76.02-.18.27-.36.75-.55 2.89-1.26 4.83-2.1 5.82-2.51 2.78-1.16 3.36-1.36 3.74-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 0z"/>
  </svg>
);

export default Contacts;