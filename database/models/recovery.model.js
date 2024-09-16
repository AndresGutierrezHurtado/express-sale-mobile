const { DataTypes } = require('sequelize');
const conn = require('../config/connection');

const Recovery = conn.define('Recovery', {
    recuperacion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_expiracion: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(new Date().getTime() + 60 * 60 * 1000)
    }
}, {
    tableName: 'recuperacion_cuentas',
    timestamps: false
});

module.exports = Recovery;