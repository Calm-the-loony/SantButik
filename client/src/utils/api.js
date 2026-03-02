// src/utils/api.js
const API_BASE_URL = 'http://localhost:3001/api';

class Api {
  static async get(endpoint, params = {}) {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    const response = await fetch(url);
    return response.json();
  }

  static async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // Категории
  static getCategories() {
    return this.get('/categories/with-products');
  }

  // Бренды
  static getBrands(params = {}) {
    return this.get('/brands', params);
  }

  // Товары
  static getProducts(params = {}) {
    return this.get('/products', params);
  }

  static getPopularProducts(limit = 8) {
    return this.get('/products/popular', { limit });
  }

  static getNewProducts(limit = 8) {
    return this.get('/products/new', { limit });
  }

  static getSaleProducts(limit = 8) {
    return this.get('/products/sale', { limit });
  }

  static searchProducts(query, limit = 20) {
    return this.get('/products/search', { q: query, limit });
  }

  static getProduct(id) {
    return this.get(`/products/${id}`);
  }

  // Заявки
  static createApplication(data) {
    return this.post('/applications', data);
  }
}

export default Api;