// server/categories.js
const { db } = require('./db');

class Categories {
    // Получить все категории
    static async getAll(includeInactive = false) {
        try {
            let query = 'SELECT * FROM categories';
            if (!includeInactive) {
                query += ' WHERE is_active = 1';
            }
            query += ' ORDER BY sort_order';
            
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            console.error('Ошибка при получении категорий:', error);
            throw error;
        }
    }

    // Получить категорию по ID
    static async getById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM categories WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Ошибка при получении категории:', error);
            throw error;
        }
    }

    // Получить категорию по slug
    static async getBySlug(slug) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM categories WHERE slug = ?',
                [slug]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Ошибка при получении категории:', error);
            throw error;
        }
    }

    // Получить дочерние категории
    static async getChildren(parentId) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM categories WHERE parent_id = ? AND is_active = 1 ORDER BY sort_order',
                [parentId]
            );
            return rows;
        } catch (error) {
            console.error('Ошибка при получении дочерних категорий:', error);
            throw error;
        }
    }
}

module.exports = Categories;