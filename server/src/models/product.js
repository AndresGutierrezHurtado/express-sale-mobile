import { DataTypes } from "sequelize";
<<<<<<<< HEAD:server/models/product.model.js
import sequelize from "../config/database.js";
========
import sequelize from "../configs/database.js";
>>>>>>>> develop:server/src/models/product.js

const Product = sequelize.define(
    "Product",
    {
<<<<<<<< HEAD:server/models/product.model.js
        producto_id: {
            type: DataTypes.STRING(60),
========
        product_id: {
            type: DataTypes.UUID,
>>>>>>>> develop:server/src/models/product.js
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
<<<<<<<< HEAD:server/models/product.model.js
        usuario_id: {
            type: DataTypes.STRING(60),
========
        user_id: {
            type: DataTypes.UUID,
>>>>>>>> develop:server/src/models/product.js
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
<<<<<<<< HEAD:server/models/product.model.js
        multimedia_id: {
            type: DataTypes.STRING(60),
========
        media_id: {
            type: DataTypes.UUID,
>>>>>>>> develop:server/src/models/product.js
            primaryKey: true,
        },
        media_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
<<<<<<<< HEAD:server/models/product.model.js
        producto_id: {
            type: DataTypes.STRING(60),
========
        product_id: {
            type: DataTypes.UUID,
>>>>>>>> develop:server/src/models/product.js
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
