// server/applications.js
const { db } = require('./db');

class Applications {
    // Создать новую заявку
    static async create(applicationData, req = null) {
        try {
            const { name, phone, message } = applicationData;
            
            // Получаем IP и User-Agent если есть запрос
            let ip_address = null;
            let user_agent = null;
            
            if (req) {
                ip_address = req.ip || 
                            req.connection.remoteAddress || 
                            req.socket.remoteAddress || 
                            null;
                user_agent = req.headers['user-agent'] || null;
            }

            const [result] = await db.query(
                `INSERT INTO applications (name, phone, message, ip_address, user_agent) 
                 VALUES (?, ?, ?, ?, ?)`,
                [name, phone, message, ip_address, user_agent]
            );

            return {
                success: true,
                id: result.insertId,
                message: 'Заявка успешно создана'
            };
        } catch (error) {
            console.error('Ошибка при создании заявки:', error);
            throw error;
        }
    }

    // Получить все заявки
    static async getAll(status = null) {
        try {
            let query = 'SELECT * FROM applications ORDER BY created_at DESC';
            let params = [];

            if (status) {
                query = 'SELECT * FROM applications WHERE status = ? ORDER BY created_at DESC';
                params = [status];
            }

            const [rows] = await db.query(query, params);
            return rows;
        } catch (error) {
            console.error('Ошибка при получении заявок:', error);
            throw error;
        }
    }

    // Получить заявку по ID
    static async getById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM applications WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Ошибка при получении заявки:', error);
            throw error;
        }
    }

    // Обновить статус заявки
    static async updateStatus(id, status) {
        try {
            const [result] = await db.query(
                'UPDATE applications SET status = ? WHERE id = ?',
                [status, id]
            );
            
            return {
                success: result.affectedRows > 0,
                message: result.affectedRows > 0 ? 'Статус обновлен' : 'Заявка не найдена'
            };
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            throw error;
        }
    }

    // Получить статистику по заявкам
    static async getStats() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new,
                    SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
                    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
                    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
                    SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) as today
                FROM applications
            `);
            
            return rows[0];
        } catch (error) {
            console.error('Ошибка при получении статистики:', error);
            throw error;
        }
    }

    // Удалить заявку
    static async delete(id) {
        try {
            const [result] = await db.query(
                'DELETE FROM applications WHERE id = ?',
                [id]
            );
            
            return {
                success: result.affectedRows > 0,
                message: result.affectedRows > 0 ? 'Заявка удалена' : 'Заявка не найдена'
            };
        } catch (error) {
            console.error('Ошибка при удалении заявки:', error);
            throw error;
        }
    }
}

module.exports = Applications;