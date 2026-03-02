// server/products.js
const { db } = require('./db');

class Products {
    // Получить все товары с фильтрацией
    static async getAll(filters = {}) {
        try {
            let query = `
                SELECT 
                    p.*,
                    b.name as brand_name,
                    b.slug as brand_slug,
                    b.main_color as brand_color,
                    c.name as category_name,
                    c.slug as category_slug
                FROM products p
                LEFT JOIN brands b ON p.brand_id = b.id
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.is_active = 1
            `;
            
            const params = [];

            // Фильтр по категории
            if (filters.category_id && filters.category_id !== 'all') {
                query += ' AND p.category_id = ?';
                params.push(filters.category_id);
            }

            // Фильтр по бренду
            if (filters.brand_id) {
                query += ' AND p.brand_id = ?';
                params.push(filters.brand_id);
            }

            // Фильтр по наличию
            if (filters.in_stock === 'true') {
                query += ' AND p.in_stock = 1';
            }

            // Фильтр по распродаже
            if (filters.sale === 'true') {
                query += ' AND p.is_sale = 1';
            }

            // Фильтр по новинкам
            if (filters.new === 'true') {
                query += ' AND p.is_new = 1';
            }

            // Поиск по названию
            if (filters.search) {
                query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
                params.push(`%${filters.search}%`, `%${filters.search}%`);
            }

            // Ценовой диапазон
            if (filters.min_price) {
                query += ' AND p.price >= ?';
                params.push(filters.min_price);
            }
            if (filters.max_price) {
                query += ' AND p.price <= ?';
                params.push(filters.max_price);
            }

            // Сортировка
            const sortField = filters.sort_by || 'p.sort_order';
            const sortOrder = filters.sort_order || 'ASC';
            query += ` ORDER BY ${sortField} ${sortOrder}`;

            // Лимит и пагинация
            if (filters.limit) {
                query += ' LIMIT ?';
                params.push(parseInt(filters.limit));
            }
            if (filters.offset) {
                query += ' OFFSET ?';
                params.push(parseInt(filters.offset));
            }

            const [rows] = await db.query(query, params);
            return rows;
        } catch (error) {
            console.error('Ошибка при получении товаров:', error);
            throw error;
        }
    }

    // Получить товар по ID
    static async getById(id) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    p.*,
                    b.name as brand_name,
                    b.slug as brand_slug,
                    b.country as brand_country,
                    b.description as brand_description,
                    c.name as category_name,
                    c.slug as category_slug
                FROM products p
                LEFT JOIN brands b ON p.brand_id = b.id
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.id = ? AND p.is_active = 1
            `, [id]);
            
            return rows[0] || null;
        } catch (error) {
            console.error('Ошибка при получении товара:', error);
            throw error;
        }
    }

    // Получить товары по бренду
    static async getByBrand(brandId, limit = null) {
        try {
            let query = `
                SELECT * FROM products 
                WHERE brand_id = ? AND is_active = 1 
                ORDER BY sort_order
            `;
            const params = [brandId];
            
            if (limit) {
                query += ' LIMIT ?';
                params.push(limit);
            }
            
            const [rows] = await db.query(query, params);
            return rows;
        } catch (error) {
            console.error('Ошибка при получении товаров бренда:', error);
            throw error;
        }
    }

    // Получить популярные товары
    static async getPopular(limit = 8) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    p.*,
                    b.name as brand_name,
                    b.main_color as brand_color
                FROM products p
                LEFT JOIN brands b ON p.brand_id = b.id
                WHERE p.is_active = 1 AND p.is_popular = 1
                ORDER BY p.rating DESC, p.reviews_count DESC
                LIMIT ?
            `, [limit]);
            
            return rows;
        } catch (error) {
            console.error('Ошибка при получении популярных товаров:', error);
            throw error;
        }
    }

    // Получить новинки
    static async getNew(limit = 8) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    p.*,
                    b.name as brand_name,
                    b.main_color as brand_color
                FROM products p
                LEFT JOIN brands b ON p.brand_id = b.id
                WHERE p.is_active = 1 AND p.is_new = 1
                ORDER BY p.created_at DESC
                LIMIT ?
            `, [limit]);
            
            return rows;
        } catch (error) {
            console.error('Ошибка при получении новинок:', error);
            throw error;
        }
    }

    // Получить товары со скидкой
    static async getSale(limit = 8) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    p.*,
                    b.name as brand_name,
                    b.main_color as brand_color
                FROM products p
                LEFT JOIN brands b ON p.brand_id = b.id
                WHERE p.is_active = 1 AND p.is_sale = 1 AND p.old_price IS NOT NULL
                ORDER BY (p.old_price - p.price) DESC
                LIMIT ?
            `, [limit]);
            
            return rows;
        } catch (error) {
            console.error('Ошибка при получении товаров со скидкой:', error);
            throw error;
        }
    }

    // Поиск товаров
    static async search(query, limit = 20) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    p.*,
                    b.name as brand_name
                FROM products p
                LEFT JOIN brands b ON p.brand_id = b.id
                WHERE 
                    p.is_active = 1 AND 
                    (p.name LIKE ? OR p.description LIKE ? OR b.name LIKE ?)
                ORDER BY 
                    CASE 
                        WHEN p.name LIKE ? THEN 1
                        WHEN b.name LIKE ? THEN 2
                        ELSE 3
                    END,
                    p.popularity DESC
                LIMIT ?
            `, [
                `%${query}%`, `%${query}%`, `%${query}%`,
                `%${query}%`, `%${query}%`,
                limit
            ]);
            
            return rows;
        } catch (error) {
            console.error('Ошибка при поиске товаров:', error);
            throw error;
        }
    }

    // Получить статистику по товарам
    static async getStats() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN in_stock = 1 THEN 1 ELSE 0 END) as in_stock,
                    SUM(CASE WHEN is_sale = 1 THEN 1 ELSE 0 END) as on_sale,
                    SUM(CASE WHEN is_new = 1 THEN 1 ELSE 0 END) as new,
                    SUM(CASE WHEN is_popular = 1 THEN 1 ELSE 0 END) as popular,
                    MIN(price) as min_price,
                    MAX(price) as max_price,
                    AVG(price) as avg_price
                FROM products
                WHERE is_active = 1
            `);
            
            return rows[0];
        } catch (error) {
            console.error('Ошибка при получении статистики:', error);
            throw error;
        }
    }

    // Создать товар
    static async create(productData) {
        try {
            const {
                name, slug, brand_id, category_id, price, old_price,
                unit, in_stock, is_sale, is_new, is_popular,
                description, short_description, image_url,
                additional_images, specifications, sort_order
            } = productData;

            const [result] = await db.query(
                `INSERT INTO products (
                    name, slug, brand_id, category_id, price, old_price,
                    unit, in_stock, is_sale, is_new, is_popular,
                    description, short_description, image_url,
                    additional_images, specifications, sort_order
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    name, slug, brand_id, category_id, price, old_price || null,
                    unit || 'шт', in_stock || 1, is_sale || 0, is_new || 0, is_popular || 0,
                    description, short_description, image_url,
                    additional_images ? JSON.stringify(additional_images) : null,
                    specifications ? JSON.stringify(specifications) : null,
                    sort_order || 0
                ]
            );

            return {
                success: true,
                id: result.insertId,
                message: 'Товар успешно создан'
            };
        } catch (error) {
            console.error('Ошибка при создании товара:', error);
            throw error;
        }
    }

    // Обновить товар
    static async update(id, productData) {
        try {
            const fields = [];
            const values = [];

            Object.keys(productData).forEach(key => {
                if (key !== 'id') {
                    fields.push(`${key} = ?`);
                    values.push(productData[key]);
                }
            });

            if (fields.length === 0) {
                return { success: false, message: 'Нет данных для обновления' };
            }

            values.push(id);
            const query = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
            
            const [result] = await db.query(query, values);
            
            return {
                success: result.affectedRows > 0,
                message: result.affectedRows > 0 ? 'Товар обновлен' : 'Товар не найден'
            };
        } catch (error) {
            console.error('Ошибка при обновлении товара:', error);
            throw error;
        }
    }

    // Удалить товар (мягкое удаление)
    static async delete(id) {
        try {
            const [result] = await db.query(
                'UPDATE products SET is_active = 0 WHERE id = ?',
                [id]
            );
            
            return {
                success: result.affectedRows > 0,
                message: result.affectedRows > 0 ? 'Товар удален' : 'Товар не найден'
            };
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
            throw error;
        }
    }
}

module.exports = Products;