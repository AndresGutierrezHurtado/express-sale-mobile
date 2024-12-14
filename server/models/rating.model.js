import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Rating = sequelize.define(
    "Rating",
    {
        calificacion_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        calificacion_comentario: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        calificacion_imagen_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        calificacion_fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        calificacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuario_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    {
        tableName: "calificaciones",
        timestamps: false,
    }
);

const ProductsCalifications = sequelize.define(
    "productsCalifications",
    {
        calificacion_id: {
            type: DataTypes.STRING(60),
        },
        producto_id: {
            type: DataTypes.STRING(60),
        },
    },
    {
        tableName: "calificaciones_productos",
        timestamps: false,
    }
);

const UsersCalifications = sequelize.define(
    "usersCalifications",
    {
        calificacion_id: {
            type: DataTypes.STRING(60),
        },
        usuario_id: {
            type: DataTypes.STRING(60),
        },
    },
    {
        tableName: "calificaciones_usuarios",
        timestamps: false,
    }
);

export { Rating, ProductsCalifications, UsersCalifications };
