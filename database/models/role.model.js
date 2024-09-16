const { DataTypes } = require('sequelize');
const conn = require('../config/connection');

const Role = conn.define('Role', {
    rol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol_nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;