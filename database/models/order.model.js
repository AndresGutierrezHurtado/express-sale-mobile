// models/order.js
const { DataTypes } = require('sequelize');
const conn = require('../config/connection');

const Order = conn.define('Order', {
    pedido_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pedido_fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    pedido_estado: {
        type: DataTypes.ENUM('pendiente', 'enviando', 'entregado', 'recibido'),
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'pedidos',
    timestamps: false
});

module.exports = Order;
