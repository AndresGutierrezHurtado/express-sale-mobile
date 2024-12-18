import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

export const User = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        user_lastname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        user_alias: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        user_phone: {
            type: DataTypes.DECIMAL(10, 0),
            unique: true,
        },
        user_address: {
            type: DataTypes.TEXT,
        },
        user_password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        user_update: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
        user_image_url: {
            type: DataTypes.STRING(255),
            defaultValue: "/images/default.jpg",
        },
        role_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

export const Role = sequelize.define(
    "Role",
    {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
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
        worker_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        worker_description: {
            type: DataTypes.TEXT,
            defaultValue: "usuario nuevo.",
            allowNull: false,
        },
        worker_balance: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "workers",
        timestamps: false,
    }
);

export const Recovery = sequelize.define(
    "Recovery",
    {
        recovery_id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        recovery_status: {
            type: DataTypes.ENUM("pending", "completed"),
            defaultValue: "pending",
            allowNull: false,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        tableName: "recoveries",
        timestamps: false,
    }
);

export const Session = sequelize.define(
    "Session",
    {
        sid: {
            type: DataTypes.UUID,
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
        tableName: "sessions",
        timestamps: true,
    }
);

export const Cart = sequelize.define(
    "Cart",
    {
        cart_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: "carts",
        timestamps: false,
    }
);

export const Withdrawal = sequelize.define(
    "Withdrawal",
    {
        withdrawal_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        worker_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        withdrawal_amount: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        withdrawal_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "withdrawals",
        timestamps: false,
    }
);
