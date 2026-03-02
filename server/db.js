// server/db.js
const mysql = require('mysql2');

// Настройки подключения к MySQL для XAMPP
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // для XAMPP пароль пустой
    database: 'shtucer_shop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0, 
    port:3307
});

// Создаем промис для удобной работы с запросами
const db = pool.promise();

// Проверка подключения
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('✅ База данных подключена');
        console.log('📊 Подключение к MySQL успешно!');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Ошибка подключения к БД:', error.message);
        return false;
    }
}

module.exports = { db, testConnection };