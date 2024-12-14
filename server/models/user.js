import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
    "users",
    {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        user_lastname: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        user_phone: {
            type: DataTypes.DECIMAL(10, 0),
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        user_password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

export const Session = sequelize.define(
    "sessions",
    {
        sid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "sessions",
        timestamps: false,
    }
);

export const Recovery = sequelize.define(
    "recoveries",
    {
        recovery_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        recovery_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "recoveries",
        timestamps: false,
    }
);

export const Role = sequelize.define(
    "roles",
    {
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        tableName: "roles",
        timestamps: false,
    }
);
