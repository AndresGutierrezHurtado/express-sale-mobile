import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Product = sequelize.define(
    "Product",
    {
        product_id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        product_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        product_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_price: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        product_image_url: {
            type: DataTypes.STRING(255),
            defaultValue: "/images/default.jpg",
        },
        product_status: {
            type: DataTypes.ENUM("privado", "publico"),
            defaultValue: "publico",
        },
        product_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "products",
        timestamps: false,
    }
);

const Media = sequelize.define(
    "Media",
    {
        media_id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        media_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "medias",
        timestamps: false,
    }
);

const Category = sequelize.define(
    "Category",
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "categories",
        timestamps: false,
    }
);

export { Product, Media, Category };
