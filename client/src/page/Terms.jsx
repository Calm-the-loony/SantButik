import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/page/Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-page__bg">
        <div className="terms-page__bg-line terms-page__bg-line--vertical"></div>
        <div className="terms-page__bg-line terms-page__bg-line--horizontal"></div>
      </div>

      <div className="terms-page__container">
        <div className="terms-page__header">
          <span className="terms-page__tag">/ ДОКУМЕНТЫ /</span>
          <h1 className="terms-page__title">ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</h1>
          <p className="terms-page__subtitle">Последнее обновление: 16 февраля 2026 г.</p>
        </div>

        <div className="terms-page__content">
          <div className="terms-page__section">
            <h2 className="terms-page__section-title">1. ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ</h2>
            <p className="terms-page__text">
              1.1. В настоящем Пользовательском соглашении, если контекст не требует иного, приведенные ниже термины имеют следующие значения:
            </p>
            <p className="terms-page__text">
              <strong>Сайт</strong> — совокупность информации, текстов, графических элементов, дизайна, изображений, фото и видеоматериалов, и иных результатов интеллектуальной деятельности, содержащихся в сети Интернет.
            </p>
            <p className="terms-page__text">
              <strong>Администрация Сайта</strong> — Владелей Сайта и уполномоченный на управление Сайтом.
            </p>
            <p className="terms-page__text">
              <strong>Пользователь</strong> — любое лицо, осуществляющее доступ к Сайту посредством сети Интернет и использующее Сайт.
            </p>
            <p className="terms-page__text">
              <strong>Товар</strong> — сантехническое оборудование, материалы и сопутствующие товары, представленные на Сайте.
            </p>
          </div>

          <div className="terms-page__section">
            <h2 className="terms-page__section-title">2. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
            <p className="terms-page__text">
              2.1. Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между Администрацией Сайта и Пользователем по использованию Сайта и приобретению Товаров.
            </p>
            <p className="terms-page__text">
              2.2. Использование Сайта означает безоговорочное согласие Пользователя с настоящим Соглашением. В случае несогласия с условиями Соглашения Пользователь обязан немедленно прекратить использование Сайта.
            </p>
            <p className="terms-page__text">
              2.3. Администрация Сайта вправе в любое время в одностороннем порядке изменять условия настоящего Соглашения без уведомления Пользователя. Новая редакция Соглашения вступает в силу с момента ее опубликования на Сайте.
            </p>
          </div>

          <div className="terms-page__section">
            <h2 className="terms-page__section-title">3. ПРЕДМЕТ СОГЛАШЕНИЯ</h2>
            <p className="terms-page__text">
              3.1. Предметом настоящего Соглашения является предоставление Пользователю доступа к информации о Товарах, возможность оформления заказа, а также использование сервисов Сайта.
            </p>
            <p className="terms-page__text">
              3.2. Сайт предоставляет Пользователю следующие виды сервисов:
            </p>
            <ul className="terms-page__list">
              <li className="terms-page__list-item">доступ к электронному каталогу Товаров;</li>
              <li className="terms-page__list-item">оформление заказов на приобретение Товаров;</li>
              <li className="terms-page__list-item">информационная поддержка Пользователей;</li>
              <li className="terms-page__list-item">иные сервисы, реализованные на Сайте.</li>
            </ul>
          </div>

          <div className="terms-page__section">
            <h2 className="terms-page__section-title">4. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h2>
            <p className="terms-page__text">
              <strong>4.1. Администрация Сайта имеет право:</strong>
            </p>
            <ul className="terms-page__list">
              <li className="terms-page__list-item">изменять правила пользования Сайтом, а также изменять содержание Сайта;</li>
              <li className="terms-page__list-item">проводить профилактические работы, влекущие временную приостановку работы Сайта;</li>
              <li className="terms-page__list-item">отказать Пользователю в оформлении заказа при наличии подозрений в мошеннических действиях.</li>
            </ul>
            <p className="terms-page__text">
              <strong>4.2. Администрация Сайта обязана:</strong>
            </p>
            <ul className="terms-page__list">
              <li className="terms-page__list-item">обеспечить работу Сайта в соответствии с условиями настоящего Соглашения;</li>
              <li className="terms-page__list-item">обрабатывать заказы Пользователей в порядке, предусмотренном настоящим Соглашением;</li>
              <li className="terms-page__list-item">обеспечить конфиденциальность персональных данных Пользователей.</li>
            </ul>
            <p className="terms-page__text">
              <strong>4.3. Пользователь имеет право:</strong>
            </p>
            <ul className="terms-page__list">
              <li className="terms-page__list-item">осуществлять поиск и просмотр информации о Товарах;</li>
              <li className="terms-page__list-item">оформлять заказы на приобретение Товаров;</li>
              <li className="terms-page__list-item">получать информационную поддержку.</li>
            </ul>
            <p className="terms-page__text">
              <strong>4.4. Пользователь обязуется:</strong>
            </p>
            <ul className="terms-page__list">
              <li className="terms-page__list-item">предоставлять достоверную информацию при оформлении заказа;</li>
              <li className="terms-page__list-item">не предпринимать действий, которые могут нарушить работоспособность Сайта;</li>
              <li className="terms-page__list-item">не использовать Сайт для распространения противоправной информации.</li>
            </ul>
          </div>

          <div className="terms-page__section">
            <h2 className="terms-page__section-title">5. УСЛОВИЯ ОФОРМЛЕНИЯ ЗАКАЗА</h2>
            <p className="terms-page__text">
              5.1. Заказ Товара осуществляется Пользователем путем добавления Товара в корзину и заполнения формы заказа.
            </p>
            <p className="terms-page__text">
              5.2. После оформления заказа Пользователь получает подтверждение на указанный им адрес электронной почты.
            </p>
            <p className="terms-page__text">
              5.3. Договор купли-продажи считается заключенным с момента подтверждения заказа Администрацией Сайта.
            </p>
            <p className="terms-page__text">
              5.4. Информация о Товаре, представленная на Сайте, носит справочный характер. Технические характеристики и внешний вид Товара могут быть изменены производителем без уведомления.
            </p>
          </div>

          <div className="terms-page__section">
            <h2 className="terms-page__section-title">6. ОПЛАТА И ДОСТАВКА</h2>
            <p className="terms-page__text">
              6.1. Оплата Товара осуществляется способами, указанными на Сайте в момент оформления заказа.
            </p>
            <p className="terms-page__text">
              6.2. Доставка Товара осуществляется по согласованию с Пользователем после подтверждения заказа.
            </p>
            <p className="terms-page__text">
              6.3. Стоимость доставки рассчитывается индивидуально и зависит от адреса доставки и веса заказа.
            </p>
          </div>

          <div className="terms-page__section">
            <h2 className="terms-page__section-title">7. ОТВЕТСТВЕННОСТЬ</h2>
            <p className="terms-page__text">
              7.1. Администрация Сайта не несет ответственности за ущерб, причиненный Пользователю в результате использования или невозможности использования Сайта.
            </p>
            <p className="terms-page__text">
              7.2. Администрация Сайта не несет ответственности за несоответствие предоставленной услуги ожиданиям Пользователя.
            </p>
            <p className="terms-page__text">
              7.3. Совокупная ответственность Администрации Сайта по настоящему Соглашению ограничена стоимостью приобретенного Пользователем Товара.
            </p>
          </div>

          <div className="terms-page__section">
            <h2 className="terms-page__section-title">8. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
            <p className="terms-page__text">
              8.1. Настоящее Соглашение регулируется и толкуется в соответствии с законодательством Российской Федерации.
            </p>
            <p className="terms-page__text">
              8.2. Все споры, возникающие между сторонами, подлежат разрешению в судебном порядке по месту нахождения Администрации Сайта.
            </p>
            <p className="terms-page__text">
              8.3. По всем вопросам, связанным с использованием Сайта, Пользователь может обращаться по адресу электронной почты info@shtucer.ru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;