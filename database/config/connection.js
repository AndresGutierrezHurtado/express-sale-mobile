const { Sequelize } = require('sequelize');

const conn = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

async function testConnection() {
    try {
        await conn.authenticate();
    } catch (error) {
        console.error("Couldn't connect, error: " + error);
    }
}

testConnection();

module.exports = conn