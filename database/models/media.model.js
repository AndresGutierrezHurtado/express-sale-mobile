// models/media.js
const { DataTypes } = require('sequelize');
const conn = require('../config/connection');

const Media = conn.define('Media', {
    multimedia_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    multimedia_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    multimedia_tipo: {
        type: DataTypes.ENUM('imagen', 'video'),
        allowNull: false
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'multimedias',
    timestamps: false
});

module.exports = Media;
