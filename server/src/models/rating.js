import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Rating = sequelize.define(
    "Rating",
    {
        rating_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        rating_comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating_image_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        rating_value: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        rating_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "ratings",
        timestamps: false,
    }
);

const ProductsCalifications = sequelize.define(
    "productsCalifications",
    {
        rating_id: {
            type: DataTypes.UUID,
        },
        product_id: {
            type: DataTypes.UUID,
        },
    },
    {
        tableName: "product_ratings",
        timestamps: false,
    }
);

const UsersCalifications = sequelize.define(
    "usersCalifications",
    {
        rating_id: {
            type: DataTypes.UUID,
        },
        user_id: {
            type: DataTypes.UUID,
        },
    },
    {
        tableName: "user_ratings",
        timestamps: false,
    }
);

export { Rating, ProductsCalifications, UsersCalifications };
