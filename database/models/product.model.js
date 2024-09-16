const { DataTypes } = require("sequelize");
const conn = require("../config/connection");
const Category = require("./category.model");

const Product = conn.define(
    "Product",
    {
        producto_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        producto_nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        producto_descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        producto_cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        producto_precio: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        producto_imagen_url: {
            type: DataTypes.STRING(255),
            defaultValue: "/public/images/products/default.jpg",
        },
        producto_estado: {
            type: DataTypes.ENUM("privado", "publico"),
            defaultValue: "publico",
        },
        producto_fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "productos",
        timestamps: false,
    }
);

// Association between Product and Category
Product.belongsTo(Category, {
    foreignKey: "categoria_id",
    as: "category",
});
Category.hasMany(Product, { 
    foreignKey: "categoria_id",
    as: "products",
});

module.exports = Product;
