const { DataTypes } = require("sequelize");
const conn = require("../config/connection");

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

const Role = conn.define(
    "Role",
    {
        rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rol_nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: "roles",
        timestamps: false,
    }
);

const Worker = conn.define(
    "Worker",
    {
        trabajador_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trabajador_descripcion: {
            type: DataTypes.TEXT,
            defaultValue: "usuario nuevo.",
        },
        trabajador_numero_trabajos: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        trabajador_saldo: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "trabajadores",
        timestamps: false,
    }
);

const Recovery = conn.define(
    "Recovery",
    {
        recuperacion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        fecha_expiracion: {
            type: DataTypes.DATE,
            defaultValue: () => new Date(new Date().getTime() + 60 * 60 * 1000),
        },
    },
    {
        tableName: "recuperacion_cuentas",
        timestamps: false,
    }
);

module.exports = { User, Role, Worker, Recovery };
