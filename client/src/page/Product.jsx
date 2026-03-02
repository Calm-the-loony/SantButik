// src/page/Product.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/page/Product.css';

const Product = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('characteristics');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });
  const [agreement, setAgreement] = useState(false);
  const [formStatus, setFormStatus] = useState({ 
    submitting: false, 
    success: false, 
    error: null 
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Удаление нулей
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
            !node.parentElement.classList.contains('product-page__price') &&
            !node.parentElement.classList.contains('product-page__current-price')) {
          node.parentElement.removeChild(node);
        }
      });
    }, 100);

    return () => clearTimeout(killZeros);
  }, [product]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const productResponse = await fetch(`http://localhost:3001/api/products/${id}`);
      const productData = await productResponse.json();
      
      if (productData.success) {
        setProduct(productData.data);
        
        if (productData.data.category_id) {
          const relatedResponse = await fetch(`http://localhost:3001/api/products?category=${productData.data.category_id}&limit=5`);
          const relatedData = await relatedResponse.json();
          
          if (relatedData.success) {
            const filtered = relatedData.data.filter(p => p.id !== productData.data.id);
            setRelatedProducts(filtered.slice(0, 4));
          }
        }
      } else {
        setError('Товар не найден');
      }
    } catch (error) {
      console.error('Ошибка загрузки товара:', error);
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAgreementChange = (e) => {
    setAgreement(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreement) {
      alert('Необходимо согласие на обработку персональных данных');
      return;
    }
    
    setFormStatus({ submitting: true, success: false, error: null });
    
    try {
      const response = await fetch('http://localhost:3001/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: `Товар: ${product?.name} (ID: ${product?.id})\nКомментарий: ${formData.comment}`
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', phone: '', comment: '' });
        setAgreement(false);
        setTimeout(() => setFormStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setFormStatus({ 
          submitting: false, 
          success: false, 
          error: data.error || 'Ошибка при отправке' 
        });
      }
    } catch (error) {
      setFormStatus({ 
        submitting: false, 
        success: false, 
        error: 'Ошибка соединения с сервером' 
      });
    }
  };

  // Получение изображений
  const getImages = () => {
    const images = [];
    if (product?.image_url && !product.image_url.includes('placeholder')) {
      images.push(product.image_url);
    }
    if (product?.additional_images) {
      try {
        const additional = typeof product.additional_images === 'string' 
          ? JSON.parse(product.additional_images) 
          : product.additional_images;
        if (Array.isArray(additional)) {
          additional.forEach(img => {
            if (!img.includes('placeholder')) images.push(img);
          });
        }
      } catch {}
    }
    if (images.length === 0) {
      images.push('https://via.placeholder.com/800x600?text=Нет+фото');
    }
    return images;
  };

  // Парсинг спецификаций
  const parseSpecifications = () => {
    if (!product?.specifications) return [];
    try {
      if (typeof product.specifications === 'string') {
        return JSON.parse(product.specifications);
      }
      return product.specifications || [];
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-page__container">
          <div className="product-page__loading">
            <div className="loader"></div>
            <p>Загрузка товара...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <div className="product-page__container">
          <div className="product-page__error">
            <p>{error || 'Товар не найден'}</p>
            <Link to="/catalog" className="product-page__back-btn">
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = getImages();
  const specifications = parseSpecifications();

  return (
    <div className="product-page">
      {/* Фоновые линии */}
      <div className="product-page__bg">
        <div className="product-page__bg-line product-page__bg-line--vertical"></div>
        <div className="product-page__bg-line product-page__bg-line--horizontal"></div>
      </div>

      <div className="product-page__container">
        {/* Хлебные крошки */}
        <div className="product-page__breadcrumbs">
          <Link to="/" className="product-page__breadcrumb-link">Главная</Link>
          <span className="product-page__breadcrumb-separator">/</span>
          <Link to="/catalog" className="product-page__breadcrumb-link">Каталог</Link>
          <span className="product-page__breadcrumb-separator">/</span>
          {product.category_name && (
            <>
              <Link to={`/catalog?category=${product.category_id}`} className="product-page__breadcrumb-link">
                {product.category_name}
              </Link>
              <span className="product-page__breadcrumb-separator">/</span>
            </>
          )}
          <span className="product-page__breadcrumb-current">{product.name}</span>
        </div>

        {/* Основная информация о товаре */}
        <div className="product-page__main">
          {/* Галерея изображений */}
          <div className="product-page__gallery">
            <div className="product-page__main-image">
              <img src={images[selectedImage]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="product-page__thumbnails">
                {images.map((img, index) => (
                  <button 
                    key={index} 
                    className={`product-page__thumbnail ${selectedImage === index ? 'product-page__thumbnail--active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="product-page__info">
            <div className="product-page__header">
              {product.brand_name && (
                <span className="product-page__brand">{product.brand_name}</span>
              )}
              <h1 className="product-page__title">{product.name}</h1>
              <div className="product-page__meta">
                <span className="product-page__article">Артикул: {product.id}</span>
                <span className={`product-page__stock-badge ${product.in_stock ? 'product-page__stock-badge--in' : 'product-page__stock-badge--out'}`}>
                  {product.in_stock ? 'В наличии' : 'Под заказ'}
                </span>
              </div>
            </div>

            {product.short_description && (
              <div className="product-page__short-desc">
                <p>{product.short_description}</p>
              </div>
            )}

            {/* Цена */}
            <div className="product-page__price-section">
              <div className="product-page__price-wrapper">
                {product.old_price && (
                  <span className="product-page__old-price">
                    {new Intl.NumberFormat('ru-RU').format(product.old_price)} ₽
                  </span>
                )}
                <span className="product-page__current-price">
                  {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
                </span>
                <span className="product-page__unit">/{product.unit || 'шт'}</span>
              </div>
            </div>

            {/* Контакты для быстрого заказа */}
            <div className="product-page__contacts">
              <h3 className="product-page__contacts-title">Быстрый заказ</h3>
              <div className="product-page__contacts-grid">
                <a href="tel:+79281553965" className="product-page__contact-card product-page__contact-card--phone">
                  <PhoneIcon />
                  <div className="product-page__contact-info">
                    <span className="product-page__contact-label">Позвоните нам</span>
                    <span className="product-page__contact-value">+7 (928) 155-39-65</span>
                  </div>
                </a>
                
                <a href="https://wa.me/79281553965" className="product-page__contact-card product-page__contact-card--whatsapp">
                  <WhatsAppIcon />
                  <div className="product-page__contact-info">
                    <span className="product-page__contact-label">Напишите в WhatsApp</span>
                    <span className="product-page__contact-value">+7 (928) 155-39-65</span>
                  </div>
                </a>
                
                <a href="https://t.me/shtucer" className="product-page__contact-card product-page__contact-card--telegram">
                  <TelegramIcon />
                  <div className="product-page__contact-info">
                    <span className="product-page__contact-label">Напишите в Telegram</span>
                    <span className="product-page__contact-value">@shtucer</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Вкладки с подробной информацией */}
        <div className="product-page__tabs">
          <div className="product-page__tabs-header">
            <button 
              className={`product-page__tab-btn ${activeTab === 'characteristics' ? 'product-page__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('characteristics')}
            >
              Характеристики и габариты
            </button>
            <button 
              className={`product-page__tab-btn ${activeTab === 'description' ? 'product-page__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Подробное описание
            </button>
          </div>

          <div className="product-page__tabs-content">
            {activeTab === 'characteristics' && (
              <div className="product-page__characteristics">
                {/* Габариты */}
                {(product.width || product.height || product.depth || product.weight) && (
                  <div className="product-page__dimensions">
                    <h3 className="product-page__dimensions-title">Габариты и вес</h3>
                    <div className="product-page__dimensions-grid">
                      {product.width && (
                        <div className="product-page__dimensions-item">
                          <span className="product-page__dimensions-label">Ширина:</span>
                          <span className="product-page__dimensions-value">{product.width}</span>
                        </div>
                      )}
                      {product.height && (
                        <div className="product-page__dimensions-item">
                          <span className="product-page__dimensions-label">Высота:</span>
                          <span className="product-page__dimensions-value">{product.height}</span>
                        </div>
                      )}
                      {product.depth && (
                        <div className="product-page__dimensions-item">
                          <span className="product-page__dimensions-label">Глубина:</span>
                          <span className="product-page__dimensions-value">{product.depth}</span>
                        </div>
                      )}
                      {product.weight && (
                        <div className="product-page__dimensions-item">
                          <span className="product-page__dimensions-label">Вес:</span>
                          <span className="product-page__dimensions-value">{product.weight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Характеристики */}
                {specifications.length > 0 ? (
                  <div className="product-page__specs">
                    <h3 className="product-page__specs-title">Характеристики</h3>
                    <div className="product-page__specs-list">
                      {specifications.map((spec, index) => (
                        <div key={index} className="product-page__specs-row">
                          <span className="product-page__specs-name">{spec.name}</span>
                          <span className="product-page__specs-dots"></span>
                          <span className="product-page__specs-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="product-page__no-info">Характеристики отсутствуют</p>
                )}
              </div>
            )}

            {activeTab === 'description' && (
              <div className="product-page__description">
                {product.description ? (
                  <>
                    <p>{product.description}</p>
                    <h4>Особенности:</h4>
                    <ul>
                      <li>Высокое качество материалов</li>
                      <li>Надежность и долговечность</li>
                      <li>Современный дизайн</li>
                      <li>Простота установки</li>
                    </ul>
                  </>
                ) : (
                  <p className="product-page__no-info">Описание отсутствует</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* С этим товаром покупают */}
        {relatedProducts.length > 0 && (
          <div className="product-page__related">
            <h2 className="product-page__related-title">С этим товаром покупают</h2>
            <div className="product-page__related-grid">
              {relatedProducts.map((item) => (
                <Link to={`/product/${item.id}`} key={item.id} className="product-page__related-card">
                  <div className="product-page__related-image">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/400x300?text=Нет+фото'} 
                      alt={item.name} 
                    />
                  </div>
                  <div className="product-page__related-content">
                    {item.brand_name && (
                      <span className="product-page__related-brand">{item.brand_name}</span>
                    )}
                    <h3 className="product-page__related-name">{item.name}</h3>
                    <div className="product-page__related-price">
                      <span className="product-page__related-current">
                        {new Intl.NumberFormat('ru-RU').format(item.price)} ₽
                      </span>
                      <span className="product-page__related-unit">/{item.unit || 'шт'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Форма заказа */}
        <div className="product-page__order">
          <div className="product-page__order-content">
            <div className="product-page__order-left">
              <h2 className="product-page__order-title">
                Заказать товар
              </h2>
              <p className="product-page__order-subtitle">
                Мы свяжемся с вами в ближайшее время для уточнения деталей заказа
              </p>
              
              <div className="product-page__order-features">
                <div className="product-page__order-feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <span>Быстрая обработка заявок</span>
                </div>
                <div className="product-page__order-feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>Индивидуальный подход</span>
                </div>
                <div className="product-page__order-feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>Консультация по товару</span>
                </div>
              </div>
            </div>

            <div className="product-page__order-right">
              {formStatus.success && (
                <div className="product-page__form-success">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                </div>
              )}
              
              {formStatus.error && (
                <div className="product-page__form-error">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {formStatus.error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="product-page__form">
                <input type="hidden" name="product" value={product.name} />
                
                <div className="product-page__form-group">
                  <label className="product-page__form-label">Ваше имя *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={handleChange}
                    className="product-page__form-input"
                    required
                    disabled={formStatus.submitting}
                  />
                </div>

                <div className="product-page__form-group">
                  <label className="product-page__form-label">Телефон *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={handleChange}
                    className="product-page__form-input"
                    required
                    disabled={formStatus.submitting}
                  />
                </div>

                <div className="product-page__form-group">
                  <label className="product-page__form-label">Комментарий</label>
                  <textarea
                    name="comment"
                    placeholder="Дополнительная информация по заказу"
                    value={formData.comment}
                    onChange={handleChange}
                    className="product-page__form-textarea"
                    rows="3"
                    disabled={formStatus.submitting}
                  />
                </div>

                <div className="product-page__form-agreement">
                  <label className="product-page__checkbox">
                    <input
                      type="checkbox"
                      checked={agreement}
                      onChange={handleAgreementChange}
                      disabled={formStatus.submitting}
                    />
                    <span className="product-page__checkbox-mark"></span>
                    <span className="product-page__checkbox-text">
                      Я согласен на обработку персональных данных в соответствии с 
                      <Link to="/privacy" target="_blank" className="product-page__agreement-link"> политикой конфиденциальности</Link>
                      {` `}и 
                      <Link to="/terms" target="_blank" className="product-page__agreement-link"> пользовательским соглашением</Link>
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="product-page__form-btn"
                  disabled={formStatus.submitting || !agreement}
                >
                  {formStatus.submitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                <p className="product-page__form-note">
                  * Поля обязательные для заполнения
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
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

export default Product;