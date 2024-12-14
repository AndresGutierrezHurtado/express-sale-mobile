import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const User = sequelize.define(
    "User",
    {
        usuario_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
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
            defaultValue: "/images/default.jpg",
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

export const Role = sequelize.define(
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

export const Worker = sequelize.define(
    "Worker",
    {
        trabajador_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        trabajador_descripcion: {
            type: DataTypes.TEXT,
            defaultValue: "usuario nuevo.",
        },
        trabajador_saldo: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0,
        },
        usuario_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    {
        tableName: "trabajadores",
        timestamps: false,
    }
);

export const Recovery = sequelize.define(
    "Recovery",
    {
        recuperacion_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.STRING(60),
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

export const Session = sequelize.define(
    "Session",
    {
        sid: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "sesiones",
        timestamps: true,
    }
);

export const Cart = sequelize.define(
    "Cart",
    {
        carrito_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        producto_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        producto_cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: "carritos",
        timestamps: false,
    }
);

export const Withdrawal = sequelize.define(
    "Withdrawal",
    {
        retiro_id: {
            type: DataTypes.STRING(60),
            primaryKey: true,
        },
        trabajador_id: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        retiro_valor: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        retiro_fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "retiros",
        timestamps: false,
    }
);
