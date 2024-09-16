// models/paymentDetail.js
const { DataTypes } = require('sequelize');
const conn = require('../config/connection');

const PaymentDetail = conn.define('PaymentDetail', {
    pago_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pago_metodo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pago_valor: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false
    },
    comprador_nombre: {
        type: DataTypes.STRING(100)
    },
    comprador_correo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    comprador_tipo_documento: {
        type: DataTypes.ENUM('CC', 'CE', 'TI', 'PPN', 'NIT', 'SSN', 'EIN'),
        defaultValue: 'CC'
    },
    comprador_numero_documento: {
        type: DataTypes.DECIMAL(20, 0)
    },
    comprador_direccion: {
        type: DataTypes.STRING(255)
    },
    comprador_telefono: {
        type: DataTypes.DECIMAL(10, 0)
    },
    comprador_fecha_nacimiento: {
        type: DataTypes.DATE
    },
    comprador_pais: {
        type: DataTypes.STRING(100)
    },
    comprador_departamento: {
        type: DataTypes.STRING(100)
    },
    comprador_ciudad: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'detalle_pagos',
    timestamps: false
});

module.exports = PaymentDetail;
