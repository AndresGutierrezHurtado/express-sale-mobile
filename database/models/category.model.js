const { DataTypes } = require('sequelize');
const conn = require('../config/connection');

const Category = conn.define('Category', {
    categoria_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria_nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'categorias',
    timestamps: false
});

module.exports = Category;