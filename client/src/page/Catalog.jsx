import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/page/Catalog.css';

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]); 
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const productsPerPage = 6;
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    brands: [],
    inStock: false
  });

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, activeFilter, filters]);

  // Обновление отображаемых товаров при изменении списка или страницы
  useEffect(() => {
    if (allProducts.length > 0) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setDisplayedProducts(allProducts.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(allProducts.length / productsPerPage));
    } else {
      setDisplayedProducts([]);
      setTotalPages(1);
    }
  }, [allProducts, currentPage]);

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeFilter, filters]);

  useEffect(() => {
    const killAllZeros = () => {
      const allElements = document.querySelectorAll('*');
      
      allElements.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
          return;
        }
        
        const text = element.innerText || element.textContent;
        
        if (text && /^\s*0+\s*$/.test(text)) {
          element.style.display = 'none';
        }
        
        const walker = document.createTreeWalker(
          element,
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
          if (node.parentElement) {
            node.parentElement.removeChild(node);
          }
        });
      });
    };

    killAllZeros();
    const timeout1 = setTimeout(killAllZeros, 100);
    const timeout2 = setTimeout(killAllZeros, 300);
    const timeout3 = setTimeout(killAllZeros, 500);
    const timeout4 = setTimeout(killAllZeros, 1000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, [allProducts, categories, brands, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories');
      const data = await response.json();
      if (data.success) {
        const categoriesList = data.data.map(cat => ({
          id: cat.id,
          name: cat.name
        }));
        setCategories([
          { id: 'all', name: 'ВСЕ ТОВАРЫ' },
          ...categoriesList
        ]);
      }
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/brands');
      const data = await response.json();
      if (data.success) {
        setBrands(data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки брендов:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:3001/api/products?';
      
      if (activeCategory !== 'all') {
        url += `&category=${activeCategory}`;
      }
      
      if (activeFilter === 'instock') {
        url += '&in_stock=true';
      } else if (activeFilter === 'sale') {
        url += '&sale=true';
      } else if (activeFilter === 'new') {
        url += '&new=true';
      }

      if (filters.minPrice) {
        url += `&min_price=${filters.minPrice}`;
      }
      if (filters.maxPrice) {
        url += `&max_price=${filters.maxPrice}`;
      }
      if (filters.brands.length > 0) {
        url += `&brand=${filters.brands.join(',')}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setAllProducts(data.data);
      } else {
        setError('Ошибка загрузки товаров');
      }
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  const handleBrandChange = (brandId) => {
    setFilters(prev => {
      const newBrands = prev.brands.includes(brandId)
        ? prev.brands.filter(id => id !== brandId)
        : [...prev.brands, brandId];
      return { ...prev, brands: newBrands };
    });
  };

  const handlePriceFilter = () => {
    fetchProducts();
  };

  const handleSortChange = (e) => {
    const sorted = [...allProducts];
    switch(e.target.value) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    setAllProducts(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Функция для генерации номеров страниц
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const filterButtons = [
    { id: 'all', name: 'ВСЕ' },
    { id: 'instock', name: 'В НАЛИЧИИ' },
    { id: 'sale', name: 'СКИДКИ' },
    { id: 'new', name: 'НОВИНКИ' }
  ];

  if (loading && allProducts.length === 0) {
    return (
      <div className="catalog-page">
        <div className="catalog-page__container">
          <div className="catalog-page__loading">
            <div className="loader"></div>
            <p>Загрузка каталога...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <div className="catalog-page__bg">
        <div className="catalog-page__bg-line catalog-page__bg-line--vertical"></div>
        <div className="catalog-page__bg-line catalog-page__bg-line--horizontal"></div>
      </div>

      <div className="catalog-page__container">
        <div className="catalog-page__header">
          <span className="catalog-page__tag">/ КАТАЛОГ /</span>
          <h1 className="catalog-page__title">КАТАЛОГ</h1>
          <p className="catalog-page__subtitle">Сантехническое оборудование и комплектующие</p>
        </div>

        {error && (
          <div className="catalog-page__error">
            <p>{error}</p>
            <button onClick={fetchProducts} className="catalog-page__retry-btn">
              Попробовать снова
            </button>
          </div>
        )}

        <div className="catalog-page__categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`catalog-page__category-btn ${activeCategory === category.id.toString() ? 'catalog-page__category-btn--active' : ''}`}
              onClick={() => setActiveCategory(category.id.toString())}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="catalog-page__filters">
          <div className="catalog-page__filter-group">
            {filterButtons.map((filter) => (
              <button
                key={filter.id}
                className={`catalog-page__filter-btn ${activeFilter === filter.id ? 'catalog-page__filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <select className="catalog-page__sort" onChange={handleSortChange}>
            <option value="popular">По популярности</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="name">По названию</option>
          </select>
        </div>

        <div className="catalog-page__content">
          <div className="catalog-page__sidebar">
            <div className="catalog-page__sidebar-block">
              <h3 className="catalog-page__sidebar-title">ЦЕНА</h3>
              <div className="catalog-page__price-range">
                <input 
                  type="number" 
                  placeholder="от" 
                  className="catalog-page__price-input"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                />
                <span className="catalog-page__price-separator">—</span>
                <input 
                  type="number" 
                  placeholder="до" 
                  className="catalog-page__price-input"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                />
              </div>
              <button className="catalog-page__price-btn" onClick={handlePriceFilter}>
                Применить
              </button>
            </div>

            <div className="catalog-page__sidebar-block">
              <h3 className="catalog-page__sidebar-title">БРЕНДЫ</h3>
              <div className="catalog-page__brands">
                {brands.map((brand) => (
                  <label key={brand.id} className="catalog-page__brand-checkbox">
                    <input 
                      type="checkbox" 
                      checked={filters.brands.includes(brand.id)}
                      onChange={() => handleBrandChange(brand.id)}
                    />
                    <span className="catalog-page__brand-name">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="catalog-page__sidebar-block">
              <h3 className="catalog-page__sidebar-title">НАЛИЧИЕ</h3>
              <label className="catalog-page__stock-checkbox">
                <input 
                  type="checkbox" 
                  checked={filters.inStock}
                  onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                />
                <span>Только в наличии</span>
              </label>
            </div>
          </div>

          <div className="catalog-page__products">
            {displayedProducts.length === 0 ? (
              <div className="catalog-page__no-products">
                <p>Товары не найдены</p>
                <button onClick={() => {
                  setActiveCategory('all');
                  setActiveFilter('all');
                  setFilters({ minPrice: '', maxPrice: '', brands: [], inStock: false });
                  setCurrentPage(1);
                }} className="catalog-page__reset-btn">
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <>
                <div className="catalog-page__products-grid">
                  {displayedProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="catalog-page__product-card">
                      {product.is_sale && (
                        <span className="catalog-page__product-badge catalog-page__product-badge--sale">SALE</span>
                      )}
                      {product.is_new && (
                        <span className="catalog-page__product-badge catalog-page__product-badge--new">NEW</span>
                      )}
                      {!product.in_stock && (
                        <span className="catalog-page__product-badge catalog-page__product-badge--out">НЕТ</span>
                      )}
                      
                      <div className="catalog-page__product-image">
                        <img 
                          src={product.image_url || 'https://via.placeholder.com/400x300?text=Нет+фото'} 
                          alt={product.name} 
                        />
                      </div>
                      
                      <div className="catalog-page__product-content">
                        <span className="catalog-page__product-brand">{product.brand_name}</span>
                        <h3 className="catalog-page__product-name">{product.name}</h3>
                        
                        <div className="catalog-page__product-price">
                          <span className="catalog-page__product-current">
                            {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
                          </span>
                          {product.old_price && (
                            <span className="catalog-page__product-old">
                              {new Intl.NumberFormat('ru-RU').format(product.old_price)} ₽
                            </span>
                          )}
                          <span className="catalog-page__product-unit">/{product.unit}</span>
                        </div>

                        <div className="catalog-page__product-footer">
                          <span className="catalog-page__product-stock" style={{ 
                            color: product.in_stock ? 'var(--emerald-base)' : 'var(--emerald-secondary)' 
                          }}>
                            {product.in_stock ? 'В наличии' : 'Под заказ'}
                          </span>
                          <span className="catalog-page__product-link">
                            Подробнее
                            <span className="catalog-page__product-arrow">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="catalog-page__pagination">
                    <button 
                      className="catalog-page__pagination-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      ←
                    </button>
                    
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`dots-${index}`} className="catalog-page__pagination-dots">...</span>
                      ) : (
                        <button
                          key={page}
                          className={`catalog-page__pagination-btn ${currentPage === page ? 'catalog-page__pagination-btn--active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      )
                    ))}
                    
                    <button 
                      className="catalog-page__pagination-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;