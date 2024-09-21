const { DataTypes } = require("sequelize");
const conn = require("../config/connection");
const Category = require("./category.model");
const Media = require("./media.model");
const Rating = require("./rating.model");

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

// Association one to many with Category
Product.belongsTo(Category, {
    foreignKey: "categoria_id",
    as: "category",
});
Category.hasMany(Product, { 
    foreignKey: "categoria_id",
    as: "products",
});

// Association one to many with Media
Product.hasMany(Media, {
    foreignKey: "producto_id",
    as: "media",
});
Media.belongsTo(Product, {
    foreignKey: "producto_id",
    as: "product",
});

// Association many to many with Ratings
Product.belongsToMany(Rating, {
    through: "calificaciones_productos",
    foreignKey: "producto_id",
    otherKey: "calificacion_id",
    as: "ratings",
});
Rating.belongsToMany(Product, {
    through: "calificaciones_productos",
    foreignKey: "calificacion_id",
    otherKey: "producto_id",
    as: "products",
});

module.exports = Product;
