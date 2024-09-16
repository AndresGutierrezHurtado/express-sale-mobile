const { DataTypes } = require("sequelize");
const conn = require("../config/connection");
const Product = require("./product.model");
const Role = require("./role.model");
const Recovery = require("./recovery.model");
const Worker = require("./worker.model");

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

// Asociación uno a muchos con Productos
User.hasMany(Product, {
    foreignKey: "usuario_id",
    as: "products",
});
Product.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// Asociación muchos a uno con Roles
User.belongsTo(Role, {
    foreignKey: "rol_id",
    as: "role",
});
Role.hasMany(User, {
    foreignKey: "rol_id",
    as: "users",
});

// Asociación uno a muchos con Recovery
User.hasMany(Recovery, {
    foreignKey: "usuario_id",
    as: "recovery",
});
Recovery.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

// Asociación uno a uno con Trabajadores
User.hasOne(Worker, {
    foreignKey: "usuario_id",
    as: "worker",
});
Worker.belongsTo(User, {
    foreignKey: "usuario_id",
    as: "user",
});

module.exports = User;
