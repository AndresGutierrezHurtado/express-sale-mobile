import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Product = sequelize.define(
    "products",
    {
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        product_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        product_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        product_discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        product_image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "/images/products/default.jpg",
        },
        product_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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

export const Category = sequelize.define(
    "categories",
    {
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    {
        tableName: "categories",
        timestamps: false,
    }
);

export const Multimedia = sequelize.define(
    "multimedias",
    {
        media_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
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
        tableName: "multimedias",
        timestamps: false,
    }
);

export const Spec = sequelize.define(
    "specs",
    {
        spec_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        spec_key: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        spec_value: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "specs",
        timestamps: false,
    }
);
