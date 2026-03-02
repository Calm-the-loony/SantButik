// server/server.js
const express = require('express');
const cors = require('cors');
const { db, testConnection } = require('./db');
const Brands = require('./brands');
const Categories = require('./categories');
const Products = require('./products');
const Applications = require('./applications');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Проверка подключения к БД при старте
testConnection();

// ========== МАРШРУТЫ ДЛЯ КАТЕГОРИЙ ==========

// Получить все категории
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT * FROM categories 
            WHERE is_active = 1 
            ORDER BY sort_order
        `);
        
        res.json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Получить категорию с количеством товаров
app.get('/api/categories/with-products', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                c.*,
                COUNT(p.id) as products_count
            FROM categories c
            LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
            WHERE c.is_active = 1
            GROUP BY c.id
            ORDER BY c.sort_order
        `);
        
        res.json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// ========== МАРШРУТЫ ДЛЯ БРЕНДОВ ==========

// Получить все бренды
app.get('/api/brands', async (req, res) => {
    try {
        const { country, search, premium } = req.query;
        
        let result;
        
        if (premium === 'true') {
            result = await Brands.getPremium();
        } else if (country) {
            result = await Brands.getByCountry(country);
        } else if (search) {
            result = await Brands.search(search);
        } else {
            result = await Brands.getAll();
        }
        
        res.json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Получить бренд по ID
app.get('/api/brands/:id', async (req, res) => {
    try {
        const brand = await Brands.getById(req.params.id);
        
        if (!brand) {
            return res.status(404).json({
                success: false,
                error: 'Бренд не найден'
            });
        }
        
        res.json({
            success: true,
            data: brand
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Получить товары бренда
app.get('/api/brands/:id/products', async (req, res) => {
    try {
        const products = await Products.getByBrand(req.params.id, req.query.limit);
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// ========== МАРШРУТЫ ДЛЯ ТОВАРОВ ==========

// Получить все товары с фильтрацией
app.get('/api/products', async (req, res) => {
    try {
        const filters = {
            category_id: req.query.category,
            brand_id: req.query.brand,
            in_stock: req.query.in_stock,
            sale: req.query.sale,
            new: req.query.new,
            search: req.query.search,
            min_price: req.query.min_price,
            max_price: req.query.max_price,
            sort_by: req.query.sort_by,
            sort_order: req.query.sort_order,
            limit: req.query.limit,
            offset: req.query.offset
        };
        
        const products = await Products.getAll(filters);
        
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Получить популярные товары
app.get('/api/products/popular', async (req, res) => {
    try {
        const products = await Products.getPopular(req.query.limit || 8);
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Получить новинки
app.get('/api/products/new', async (req, res) => {
    try {
        const products = await Products.getNew(req.query.limit || 8);
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Получить товары со скидкой
app.get('/api/products/sale', async (req, res) => {
    try {
        const products = await Products.getSale(req.query.limit || 8);
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Получить статистику товаров
app.get('/api/products/stats', async (req, res) => {
    try {
        const stats = await Products.getStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Поиск товаров
app.get('/api/products/search', async (req, res) => {
    try {
        const { q, limit } = req.query;
        if (!q) {
            return res.json({ success: true, count: 0, data: [] });
        }
        
        const products = await Products.search(q, limit || 20);
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// Получить товар по ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Products.getById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Товар не найден'
            });
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера'
        });
    }
});

// ========== МАРШРУТЫ ДЛЯ ЗАЯВОК ==========

// Создать новую заявку
app.post('/api/applications', async (req, res) => {
    try {
        const { name, phone, message } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                error: 'Имя и телефон обязательны для заполнения'
            });
        }

        const result = await Applications.create(req.body, req);

        res.status(201).json({
            success: true,
            message: 'Заявка успешно отправлена',
            data: result
        });
    } catch (error) {
        console.error('Ошибка при создании заявки:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка сервера при отправке заявки'
        });
    }
});

// ========== ТЕСТОВЫЙ МАРШРУТ ==========
app.get('/api', (req, res) => {
    res.json({
        name: 'Штуцер API',
        version: '1.0',
        endpoints: {
            categories: [
                'GET /api/categories - все категории',
                'GET /api/categories/with-products - категории с количеством товаров'
            ],
            brands: [
                'GET /api/brands - все бренды',
                'GET /api/brands/:id - бренд по ID',
                'GET /api/brands/:id/products - товары бренда'
            ],
            products: [
                'GET /api/products - все товары (с фильтрацией)',
                'GET /api/products/popular - популярные',
                'GET /api/products/new - новинки',
                'GET /api/products/sale - товары со скидкой',
                'GET /api/products/stats - статистика',
                'GET /api/products/search?q=запрос - поиск',
                'GET /api/products/:id - товар по ID'
            ],
            applications: [
                'POST /api/applications - создать заявку'
            ]
        }
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`\n🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📡 API доступно по адресу http://localhost:${PORT}/api\n`);
});