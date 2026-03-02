// server/brands.js
const { db } = require('./db');

class Brands {
    // Получить все бренды
    static async getAll() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    id,
                    name,
                    country,
                    founded_year,
                    description,
                    logo_url,
                    website,
                    is_premium,
                    rating,
                    products_count,
                    main_color
                FROM brands 
                ORDER BY sort_order ASC, name ASC
            `);
            return rows;
        } catch (error) {
            console.error('Ошибка получения брендов:', error);
            throw error;
        }
    }

    // Получить премиум бренды
    static async getPremium() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    id,
                    name,
                    country,
                    founded_year,
                    description,
                    logo_url,
                    website,
                    is_premium,
                    rating,
                    products_count,
                    main_color
                FROM brands 
                WHERE is_premium = true 
                ORDER BY rating DESC, name ASC
            `);
            return rows;
        } catch (error) {
            console.error('Ошибка получения премиум брендов:', error);
            throw error;
        }
    }

    // Получить бренд по ID
    static async getById(id) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    id,
                    name,
                    country,
                    founded_year,
                    description,
                    logo_url,
                    website,
                    is_premium,
                    rating,
                    products_count,
                    main_color
                FROM brands 
                WHERE id = ?
            `, [id]);
            return rows[0] || null;
        } catch (error) {
            console.error('Ошибка получения бренда:', error);
            throw error;
        }
    }

    // Получить бренды по стране
    static async getByCountry(country) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    id,
                    name,
                    country,
                    founded_year,
                    description,
                    logo_url,
                    website,
                    is_premium,
                    rating,
                    products_count,
                    main_color
                FROM brands 
                WHERE country = ? 
                ORDER BY name ASC
            `, [country]);
            return rows;
        } catch (error) {
            console.error('Ошибка получения брендов по стране:', error);
            throw error;
        }
    }

    // Поиск брендов
    static async search(query) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    id,
                    name,
                    country,
                    founded_year,
                    description,
                    logo_url,
                    website,
                    is_premium,
                    rating,
                    products_count,
                    main_color
                FROM brands 
                WHERE name LIKE ? OR description LIKE ?
                ORDER BY 
                    CASE 
                        WHEN is_premium = true THEN 1
                        ELSE 2
                    END,
                    rating DESC
            `, [`%${query}%`, `%${query}%`]);
            return rows;
        } catch (error) {
            console.error('Ошибка поиска брендов:', error);
            throw error;
        }
    }

    // Получить статистику
    static async getStats() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN is_premium = 1 THEN 1 ELSE 0 END) as premium,
                    COUNT(DISTINCT country) as countries,
                    AVG(rating) as avg_rating,
                    SUM(products_count) as total_products
                FROM brands
            `);
            return rows[0];
        } catch (error) {
            console.error('Ошибка получения статистики:', error);
            throw error;
        }
    }
}

module.exports = Brands;