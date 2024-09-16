const { DataTypes } = require('sequelize');
const conn = require('../config/connection');

const Worker = conn.define('Worker', {
    trabajador_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    trabajador_descripcion: {
        type: DataTypes.TEXT,
        defaultValue: 'usuario nuevo.'
    },
    trabajador_numero_trabajos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    trabajador_saldo: {
        type: DataTypes.DECIMAL(10, 0),
        defaultValue: 0
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'trabajadores',
    timestamps: false
});

module.exports = Worker;