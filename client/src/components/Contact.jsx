import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      const response = await fetch('http://localhost:3001/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', phone: '', message: '' });
        
        // Скрываем сообщение об успехе через 5 секунд
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setStatus({ 
          submitting: false, 
          success: false, 
          error: data.error || 'Ошибка при отправке' 
        });
      }
    } catch (error) {
      setStatus({ 
        submitting: false, 
        success: false, 
        error: 'Ошибка соединения с сервером' 
      });
    }
  };

  return (
    <div className="contact">
      <div className="contact__header">
        <div className="container">
          <span className="contact__tag">/ СВЯЗЬ /</span>
          <h1 className="contact__title">ШТУЦЕР</h1>
          <p className="contact__subtitle">Сантехнический бутик</p>
        </div>
      </div>

      <div className="contact__main">
        <div className="container">
          <div className="contact__grid">
            <div className="contact__info">
              <div className="contact__block">
                <h2 className="contact__block-title">ТЕЛЕФОН</h2>
                <a href="tel:+79281553965" className="contact__block-value">
                  +7 (928) 155-39-65
                </a>
                <p className="contact__block-note">ежедневно / 9:00–21:00</p>
              </div>

              <div className="contact__block">
                <h2 className="contact__block-title">ПОЧТА</h2>
                <a href="mailto:info@shtucer.ru" className="contact__block-value">
                  info@shtucer.ru
                </a>
                <p className="contact__block-note">ответ / 2 часа</p>
              </div>

              <div className="contact__block">
                <h2 className="contact__block-title">АДРЕС</h2>
                <p className="contact__block-value">Авиаторов 16В, Ростов-на-Дону</p>
                <p className="contact__block-note">бутик / ежедневно</p>
              </div>

              <div className="contact__social">
                <a 
                  href="https://wa.me/79281553965" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact__social-link"
                >
                  <span>WHATSAPP</span>
                  <span className="contact__social-arrow">→</span>
                </a>
                <a 
                  href="https://t.me/shtucer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact__social-link"
                >
                  <span>TELEGRAM</span>
                  <span className="contact__social-arrow">→</span>
                </a>
              </div>
            </div>

            <div className="contact__form">
              <h2 className="contact__form-title">НАПИСАТЬ</h2>
              
              {status.success && (
                <div className="contact__success">
                  Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                </div>
              )}
              
              {status.error && (
                <div className="contact__error">
                  {status.error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="contact__field">
                  <input
                    type="text"
                    name="name"
                    placeholder="ИМЯ"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact__input"
                    required
                    disabled={status.submitting}
                  />
                  <span className="contact__line"></span>
                </div>

                <div className="contact__field">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="ТЕЛЕФОН"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact__input"
                    required
                    disabled={status.submitting}
                  />
                  <span className="contact__line"></span>
                </div>

                <div className="contact__field">
                  <textarea
                    name="message"
                    placeholder="СООБЩЕНИЕ"
                    value={formData.message}
                    onChange={handleChange}
                    className="contact__textarea"
                    rows="3"
                    disabled={status.submitting}
                  />
                  <span className="contact__line"></span>
                </div>

                <button 
                  type="submit" 
                  className="contact__button"
                  disabled={status.submitting}
                >
                  {status.submitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
                  {!status.submitting && (
                    <span className="contact__button-arrow">→</span>
                  )}
                </button>
              </form>

              <p className="contact__policy">
                * Отправляя форму, вы соглашаетесь с{' '}
                <Link to="/privacy" className="contact__policy-link">
                  политикой конфиденциальности
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact__footer">
        <div className="container">
          <div className="contact__line"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;