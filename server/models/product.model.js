import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
    "Product",
    {
        producto_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
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
            defaultValue: "/images/default.jpg",
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
            type: DataTypes.STRING(60),
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

const Media = sequelize.define(
    "Media",
    {
        multimedia_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        multimedia_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        producto_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    {
        tableName: "multimedias",
        timestamps: false,
    }
);

const Category = sequelize.define(
    "Category",
    {
        categoria_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        categoria_nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "categorias",
        timestamps: false,
    }
);

export { Product, Media, Category };
