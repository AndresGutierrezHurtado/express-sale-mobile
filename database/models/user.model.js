const { DataTypes } = require("sequelize");
const conn = require("../config/connection");
const Product = require("./product.model");
const Role = require("./role.model");
const Recovery = require("./recovery.model");
const Worker = require("./worker.model");
const Rating = require("./rating.model");

const User = conn.define(
    "User",
    {
        usuario_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        usuario_apellido: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        usuario_correo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        usuario_alias: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        usuario_telefono: {
            type: DataTypes.DECIMAL(10, 0),
            unique: true,
        },
        usuario_direccion: {
            type: DataTypes.TEXT,
        },
        usuario_contra: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        usuario_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        usuario_actualizacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
        usuario_imagen_url: {
            type: DataTypes.STRING(255),
            defaultValue: "/public/images/users/default.jpg",
        },
        rol_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        tableName: "usuarios",
        timestamps: false,
    }
);

// Association one to many with Product
User.hasMany(Product, {
    foreignKey: "usuario_id",
    as: "products",
});
Product.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// Association one to many with Role
User.belongsTo(Role, {
    foreignKey: "rol_id",
    as: "role",
});
Role.hasMany(User, {
    foreignKey: "rol_id",
    as: "users",
});

// Association one to many with Recovery
User.hasMany(Recovery, {
    foreignKey: "usuario_id",
    as: "recovery",
});
Recovery.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// Association one to many with Worker
User.hasOne(Worker, {
    foreignKey: "usuario_id",
    as: "worker",
});
Worker.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// Association many to many with Ratings
User.belongsToMany(Rating, {
    through: "calificaciones_usuarios",
    foreignKey: "usuario_id",
    otherKey: "calificacion_id",
    as: "ratings",
});
Rating.belongsToMany(User, {
    through: "calificaciones_usuarios",
    foreignKey: "calificacion_id",
    otherKey: "usuario_id",
    as: "users",
});

module.exports = User;
